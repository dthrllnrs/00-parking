import React, { useEffect, useState, useRef } from 'react';
import Modal from "bootstrap/js/dist/modal";

// components
import EntranceSlot from './EntranceSlot';
import ParkingSlot from './ParkingSlot';
import ManageOccupiedSlotForm from './ManageOccupiedSlotForm';
import CarEntryForm from './CarEntryForm';
import ManageUnoccupiedSlotForm from './ManageUnoccupiedSlotForm';

// classess
import ParkingSlotObj from '../classes/ParkingSlot';
import Car from '../classes/Car';
import FenceSlotObj from '../classes/FenceSlot';
import EntranceSlotObj from '../classes/EntranceSlot';

// interfaces
import IparkingSlot from '../classes/IParkingSlot';
import ISlot from '../classes/ISlot';
import ToastComponent from './tools/Toast';

interface EntranceInterface {
    x: number;
    y: number;
}

interface ParkingLotInterface {
    x: number;
    y: number;
    entrances: Array<EntranceInterface>;
}

interface SelectedSlotInterface {
    slot: ISlot | IparkingSlot,
    x : number,
    y : number
}

function isParkingSlot(slot: ParkingSlotObj | EntranceSlotObj | FenceSlotObj): slot is ParkingSlotObj {
    return Object.prototype.hasOwnProperty.call(slot, 'occupied') &&
        Object.prototype.hasOwnProperty.call(slot, 'occupied_since');
}

function ParkingLot(props: ParkingLotInterface) {
    const {x, y, entrances} = props
    const [parkingSlots, setParkingSlots] = useState<Array<Array<any>>>([]);
    const [selectedParkingSlot, setSelectedParkingslot] = useState<SelectedSlotInterface | null>(null)
    const [paymentDue, setPaymentDue] = useState({
        days: 0,
        hours: 0,
        daily_charge: 0,
        hourly_charge: 0,
        total_payment_due: 0,
        parked_since: ''
    });
    const [formToShow, setFormToShow] = useState<any>({
        form: null,
        title: 'title'
    });
    const toastRef = useRef<any>();
    const [modalForm, setModalForm] = useState<any>(null)

    const handleCarEntry = (carSize: number, slot: ISlot) => {
        const car = new Car(carSize);
        let parking_slots = parkingSlots.flat();
        let priority_slots: Array<ParkingSlotObj> = [];
        let secondary_parking_slots: Array<ParkingSlotObj> = [];
        
        parking_slots.forEach(slot => {
            if(slot instanceof ParkingSlotObj) {
                if(!slot.occupied && slot.carCanOccupy(car)) {
                    if(slot.type == car.type) {
                        priority_slots.push(slot);
                    }else {
                        secondary_parking_slots.push(slot);
                    }
                }
            }
        });
        let available_parking_slots: Array<ParkingSlotObj> = [];
        if(priority_slots.length) {
            available_parking_slots = priority_slots;
        } else {
            available_parking_slots = secondary_parking_slots;
        }

        let closest_available_slot: number = 0;
        if(available_parking_slots.length && selectedParkingSlot) {

            available_parking_slots.forEach((parking_slot, i) => {
                if(i !== 0) {
                    if(parking_slot.getDistanceFromEntry(slot.x, slot.y) < available_parking_slots[closest_available_slot].getDistanceFromEntry(slot.x, slot.y)) {
                        closest_available_slot = i;
                    }
                }
            })

            parkingSlots[available_parking_slots[closest_available_slot].y][available_parking_slots[closest_available_slot].x].occupy(car)

            setParkingSlots([...parkingSlots]);
            toastRef.current.showSuccess('Car entry successful')
            modalHide()
        } else {
            toastRef.current.showError('No available slots')
            return;
        }
    }

    const handleSlotSizeChange = (slotSize: number, slot: ParkingSlotObj) => {
        parkingSlots[slot.y][slot.x].setType(slotSize);
        setParkingSlots([...parkingSlots]);
        toastRef.current.showSuccess('Slot size successful')
        modalHide()
    }

    const handleCheckout = (slot: ParkingSlotObj) => {
        parkingSlots[slot.y][slot.x].unoccupy();
        setParkingSlots([...parkingSlots]);
        toastRef.current.showSuccess('Checkout successful')
        modalHide()
    }

    const modalShow = () => {
        if(modalForm) {
            modalForm.show();
        }
    }

    const modalHide = () => {
        if(modalForm) {
            modalForm.hide();
        }
    }

    useEffect(() => {
        setModalForm(new Modal(document.querySelectorAll('#modal-form')[0], {}))
        const all_objects: Array<Array<ParkingSlotObj|EntranceSlotObj|FenceSlotObj>> = [];
        for (let index = 0; index < y; index++) {
            const parking_slot_objs: Array<ParkingSlotObj|EntranceSlotObj|FenceSlotObj> = [];
            for (let i = 0; i < x; i++) {
                let slot_index = entrances.findIndex(entrance => index === entrance.y && i === entrance.x);
                let slot_obj: ParkingSlotObj | EntranceSlotObj | FenceSlotObj = new ParkingSlotObj(i, index);
    
                if((index == 0 || i == 0) || (i == (x - 1) || index == (y - 1))) {
                    slot_obj = new  FenceSlotObj(i, index);
                    if(slot_index !== -1) {
                        slot_obj = new EntranceSlotObj(i, index);
                    }
                }

                parking_slot_objs.push(slot_obj);
                
            }
            all_objects.push(parking_slot_objs);
        }
        setParkingSlots(all_objects);
    
    }, [])

    useEffect(() => {
        if(formToShow.form !== null) {
            modalShow();
        }
    }, [formToShow])

    useEffect(() => {
        if(selectedParkingSlot) {
            if(isParkingSlot(selectedParkingSlot.slot)) {
                if(!selectedParkingSlot.slot.occupied) {
                    setFormToShow({
                        form: <ManageUnoccupiedSlotForm entryPoint={selectedParkingSlot.slot} submit={handleSlotSizeChange}></ManageUnoccupiedSlotForm>,
                        title: 'Change Slot Size'
                    })
                } else {
                    setFormToShow({
                        form: <ManageOccupiedSlotForm handleCheckout={handleCheckout} entryPoint={selectedParkingSlot.slot}></ManageOccupiedSlotForm>,
                        title: 'Checkout'
                    })
                }
            } else {
                setFormToShow({
                    form: <CarEntryForm entryPoint={selectedParkingSlot.slot} submit={handleCarEntry}></CarEntryForm>,
                    title: 'Checkin'
                })
            }
        }
    }, [selectedParkingSlot]);

    return (
        <div className="mx-3">
            <div className="d-flex flex-wrap justify-content-start">
                <table>
                    <tbody>
                        {parkingSlots && parkingSlots.map((parkingSlot, i) => {
                            return (
                                <tr key={i}>
                                    {parkingSlot && parkingSlot.map((slot, index) => {
                                        return (
                                            <> 
                                                {isParkingSlot(slot) && <td className='slot' key={`${i}-${index}`}><ParkingSlot parking_slot={parkingSlots[i][index]} setSelectedSlot={setSelectedParkingslot}></ParkingSlot></td>}
                                                {slot instanceof EntranceSlotObj && <td className='slot entrance-slot' key={`${i}-${index}`}><EntranceSlot setSelectedSlot={setSelectedParkingslot} x={index} y={i}></EntranceSlot></td>}
                                                {slot instanceof FenceSlotObj && <td className='slot fence-slot' key={`${i}-${index}`}><div></div></td>}
                                            </>
                                        )
                                    })}    
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="container-fluid mt-2">
                    <span className="h4">Instructions:</span>
                    <ul>
                        <li>Click on an unoccupied slot to change its size</li>
                        <li>Click on an occupied slot for checkout</li>
                        <li>Click on an entrance for checkin</li>
                    </ul>
                </div>
            </div>
            <div className="modal" id='modal-form'>
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{formToShow.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {formToShow.form}
                    </div>
                    </div>
                </div>
            </div>
            <ToastComponent ref={toastRef} identifier='toast-message'></ToastComponent>
        </div>
    )
}

export default ParkingLot;