import React, { useState } from 'react';
import EntranceInit from './EntranceInit';
import IparkingSlot from '../classes/IParkingSlot';
import ParkingSlotObj from '../classes/ParkingSlot';
import ISlot from '../classes/ISlot';

interface CarEntryFormInterface {
    entryPoint: ISlot
    submit: any
}

function ManageOccupiedSlotForm(props: CarEntryFormInterface) {
    const {submit, entryPoint} = props;
    const [carSize, setCarSize] = useState(1);

    const handleSubmit = (e: any, carSize: number) => {
        e.preventDefault();
        submit(carSize, entryPoint);
    }

    return (
        <div className="container">
            <form onSubmit={e => handleSubmit(e, carSize)}>
                <div className="mb-3">
                    <label className="form-label">Car Size</label>
                    <select className='form-control' name="car_size" id="car-size" onChange={(e) => setCarSize(parseInt(e.target.value))}>
                        <option value="1">S</option>
                        <option value="2">M</option>
                        <option value="3">L</option>
                    </select>
                </div>
                <div className="mb-3">
                    <button className="btn btn-success float-end">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default ManageOccupiedSlotForm;