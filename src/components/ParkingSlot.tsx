import React from 'react';
import IParkingSlot from '../classes/IParkingSlot';
import ISlot from '../classes/ISlot';
import ParkingSlotObj from '../classes/ParkingSlot';

interface ParkingSlotInterface{
    parking_slot: IParkingSlot | ISlot | null;
    setSelectedSlot: any;
}

function ParkingSlot(props: ParkingSlotInterface) {
    const {parking_slot, setSelectedSlot} = props;

    const status = () => {
        if(parking_slot && parking_slot instanceof ParkingSlotObj && parking_slot.occupied) {
            return (<span className="badge rounded-pill text-bg-danger">Occupied</span>);
        }

        return (<span className="badge rounded-pill text-bg-success">Available</span>);
    }

    return (
        <div className='parking-slot' onClick={() => setSelectedSlot({
            slot: parking_slot && parking_slot,
            x: parking_slot && parking_slot.x,
            y: parking_slot && parking_slot.y
        })}>
            <span className="coordinates small">
                {parking_slot && parking_slot.x},{parking_slot && parking_slot.y}
            </span>
            <span className="type w-100 text-center d-block">
                {parking_slot && parking_slot instanceof ParkingSlotObj && parking_slot.type_string}
            </span>
            {status()}
        </div>
    );
}

export default ParkingSlot;