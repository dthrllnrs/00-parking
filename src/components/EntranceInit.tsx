import React from 'react';

interface EntranceInterface{
    id: number;
    deletable: boolean;
}

function EntranceInit(props: EntranceInterface) {
    const {id, deletable} = props;

    const getSuffix = () => {
        let j = id% 10,
        k = id% 100;
        if (j == 1 && k != 11) {
            return id+ "st";
        }
        if (j == 2 && k != 12) {
            return id+ "nd";
        }
        if (j == 3 && k != 13) {
            return id+ "rd";
        }
        return id+ "th";
    }

    return (
        <div className="mb-3">
            <label className="form-label">{getSuffix()} Entrance Properties</label>
            <div className="input-group">
                <span className="input-group-text">X</span>
                <input type="text" className="form-control" placeholder='1'/>
                <span className="input-group-text">Y</span>
                <input type="text" className="form-control" placeholder='1'/>
            </div>
        </div>
    );
}

export default EntranceInit;