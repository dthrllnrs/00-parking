import ISlot from "./ISlot";

class FenceSlot implements ISlot{
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export default FenceSlot;