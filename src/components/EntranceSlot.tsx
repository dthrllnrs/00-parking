import React from 'react';

interface EntranceSlotInterface{
    x: number;
    y: number;
    setSelectedSlot: any;
}

function EntranceSlot(props: EntranceSlotInterface) {
    const {x, y, setSelectedSlot} = props;

    return (
        <div onClick={() => setSelectedSlot({slot: {x, y}, x, y})}>
            <span>Entrance</span>
        </div>
    );
}

export default EntranceSlot;