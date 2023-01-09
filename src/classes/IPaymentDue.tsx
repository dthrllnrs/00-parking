export interface IPaymentDue {
    days: number,
    hours: number,
    daily_charge: number,
    hourly_charge: number,
    total_payment_due: number,
    parked_since: string
}