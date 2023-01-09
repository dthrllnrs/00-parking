import React, { useState } from 'react';
import ParkingSlot from '../classes/ParkingSlot';

interface ManageUnoccupiedSlotFormInterface {
    entryPoint: ParkingSlot
    submit: any
}

function ManageUnoccupiedSlotForm(props: any) {
    const {submit, entryPoint} = props;
    const [slotSize, setSlotSize] = useState(1);

    const handleSubmit = (e: any, slotSize: number) => {
        e.preventDefault();
        submit(slotSize, entryPoint);
    }


    return (
        <div className="container">
            <form onSubmit={e => handleSubmit(e, slotSize)}>
                <div className="mb-3">
                    <label className="form-label">Slot Size</label>
                    <select className='form-control' name="slot_size" id="slot-size" onChange={(e) => setSlotSize(parseInt(e.target.value))}>
                        <option value="1">SP</option>
                        <option value="2">MP</option>
                        <option value="3">LP</option>
                    </select>
                </div>
                <div className="mb-3">
                    <button className="btn btn-success float-end">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default ManageUnoccupiedSlotForm;