import Car from './Car';
import { IPaymentDue } from './IPaymentDue';
import ISlot from './ISlot';

export default interface IParkingSlot extends ISlot {
    type_string?: string;
    type: number;
    occupied: boolean;
    occupied_since: Date | null;
    occupy(car: Car): any;
    unoccupy(): any;
    carCanOccupy(car: Car): any;
    setType(type: number): any;
    getDistanceFromEntry(x: number, y: number): number;
    calculatePaymentDue(): any;
}