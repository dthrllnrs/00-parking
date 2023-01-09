import React, { useEffect, useState } from 'react';
import ParkingSlot from '../classes/ParkingSlot';

interface OccupiedSlotInterface {
    entryPoint: ParkingSlot,
    handleCheckout: any,
}

function ManageOccupiedSlotForm(props: any) {
    const {entryPoint, handleCheckout} = props;
    const [paymentDue, setPaymentDue] = useState({
        days: 0,
        hours: 0,
        daily_charge: 0,
        hourly_charge: 0,
        total_payment_due: 0,
        parked_since: '',
        flag_down_rate: 0
    });

    useEffect(() => {
        let payment_due = entryPoint.calculatePaymentDue();
        setPaymentDue(payment_due);
    }, [entryPoint])

    const handleParkingPaid = () => {
        handleCheckout(entryPoint);
    }

    return (
        <div className="container">
            <table className='receipt-table w-100'>
                <tbody>
                    <tr>
                        <th><p className="font-weight-bold">Slot:</p></th>
                        <td><p>{entryPoint.x}, {entryPoint.y}</p></td>
                    </tr>
                    <tr>
                        <th><p className="font-weight-bold">Occupied Since:</p></th>
                        <td><p>{ paymentDue.parked_since || ''}</p></td>
                    </tr>
                    <tr>
                        <th><p className="font-weight-bold">Flag Down Rate: </p></th>
                        <td><p>{ paymentDue.flag_down_rate ? paymentDue.flag_down_rate.toLocaleString('en-US') : '0.00' }</p></td>
                    </tr>
                    <tr>
                        <th><p className="font-weight-bold">Days: {`(${paymentDue.days})`}</p></th>
                        <td><p>{ paymentDue.daily_charge ? paymentDue.daily_charge.toLocaleString('en-US') : '0.00' }</p></td>
                    </tr>
                    <tr>
                        <th><p className="font-weight-bold">Hours: {`(${paymentDue.hours})`}</p></th>
                        <td><p>{ paymentDue.hourly_charge ? paymentDue.hourly_charge.toLocaleString('en-US') : '0.00' }</p></td>
                    </tr>     
                    <tr>
                        <th><p className="font-weight-bold">Total Payment Due:</p></th>
                        <td><p className='font-weight-bold'>{ paymentDue.total_payment_due ? paymentDue.total_payment_due.toLocaleString('en-US') : '0.00' }</p></td>
                    </tr>                  
                </tbody>
            </table>
            <div className="mt-3">
                <button className="float-end btn btn-success" onClick={() => handleParkingPaid()}>Pay</button>
            </div>
        </div>
    );
}

export default ManageOccupiedSlotForm;