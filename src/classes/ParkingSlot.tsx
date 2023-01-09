import Car from "./Car";
import IParkingSlot from "./IParkingSlot";
import app from '../config/app.json';
import moment from "moment";

class ParkingSlot implements IParkingSlot{
    type_string: string;
    type: number;
    occupied: boolean;
    occupied_since: Date | null;
    x: number;
    y: number;
    private hourly_rates: any;
    // distance_from_entrances: Array<number>;
    
    constructor(x: number, y: number) {
        this.hourly_rates = app.hourly_rates
        this.type = 1;
        this.type_string = app.lot_types[this.type - 1];
        this.occupied = false;
        this.occupied_since = null;
        this.x = x;
        this.y = y;
    }

    occupy(car: Car) {
        if(this.carCanOccupy(car)) {
            this.occupied = true;
            this.occupied_since = new Date;
        }
    }

    unoccupy() {
        this.occupied = false;
        this.occupied_since = null;
    }

    calculatePaymentDue(): any {
        // try {
            if(this.occupied) {
                let flag_down_rate = app.flag_down_rate;
                let total_hours = Math.floor(((moment().diff(this.occupied_since, 'hours') - app.flag_down_hours)) - app.flag_down_hours ) > 0 ? Math.floor(((moment().diff(this.occupied_since, 'hours') - app.flag_down_hours)) - app.flag_down_hours ) : 0;
                // let total_hours = Math.floor(moment().diff(this.occupied_since, 'hours'))
                let total_days = Math.floor(total_hours / 24) > 0 ? Math.floor(total_hours / 24) : 0;
                total_hours = Math.floor(total_hours % 24);
                let daily_charge = total_days * app.daily_rate;
                let hourly_charge = total_hours * this.hourly_rates[this.type_string];
                let total_payment_due = daily_charge + hourly_charge + flag_down_rate;
                let parked_since = moment(this.occupied_since).format('LLL')

                console.log({
                    flag_down_rate,
                    days: total_days,
                    hours: total_hours,
                    daily_charge,
                    hourly_charge,
                    total_payment_due,
                    parked_since
                })

                return {
                    flag_down_rate,
                    days: total_days,
                    hours: total_hours,
                    daily_charge,
                    hourly_charge,
                    total_payment_due,
                    parked_since
                }
            }

            return false;
        // } catch (error) {
        //     return false;
        // }        
    }

    setType(type: number) {
        this.type = type;
        this.type_string = app.lot_types[this.type - 1];
    }

    carCanOccupy(car: Car) {
        return this.type && car.type <= this.type;
    }

    getDistanceFromEntry(x: number, y: number): number {
        return Math.sqrt(Math.pow((this.x - x), 2) + Math.pow((this.y - y), 2))
    }
}

export default ParkingSlot;