import { stringify } from 'querystring';
import React, { useEffect, useRef, useState } from 'react';
import EntranceInit from './EntranceInit';
import ToastComponent from './tools/Toast';
import ISlot from '../classes/ISlot';
import EntranceSlot from './EntranceSlot';

function ParkingInitForm(props: any) {
    const {handleValidInput} = props;
    const [additionalEntrances, setAdditionalEntrances] = useState<Array<any>>([]);
    const [xValue, setXValue] = useState<number>(3);
    const [yValue, setYValue] = useState<number>(3);
    const [entrances, setEntrances] = useState<ISlot[]>([]);
    const toastRef = useRef<any>();

    useEffect(() => {
        setEntrances([]);
    }, [xValue, yValue])
        
    const handleSave = () => {
        if(xValue < 3 || yValue <3) {
            toastRef.current.showError('Please input X and Y value greater than 3');
            return;
        }

        if(entrances.length < 3) {
            toastRef.current.showError('Please select atleast 3 entrances');
            return;
        }

        handleValidInput(xValue, yValue, entrances);
    }
    
    const isEdge = (x: number, y: number) : boolean => {
        if((x == 0 || y == 0) || (x == xValue - 1 || y == yValue - 1)) {
            return true;
        }

        return false;
    }

    const isCorner = (x: number, y: number) : boolean => {
        if((x == 0 && y == 0) || (x == 0 && y == yValue - 1) || (x == xValue - 1 && y == 0) || (x == xValue - 1 && y == yValue - 1)) {
            return true;
        }

        return false;
    }

    const isEntrance = (x: number, y: number) => {
        let entrance_array = entrances;

        let entrance_index = entrance_array.findIndex(slot => slot.x == x && slot.y == y);

        return entrance_index !== -1;

    }

    const handleEdgeClicked = (x: number, y: number) => {
        let entrance_array = entrances;
        if(isEntrance(x, y)) {
            let entrance_index = entrance_array.findIndex(slot => slot.x == x && slot.y == y);
            entrance_array.splice(entrance_index, 1);
        } else {
            entrance_array.push({
                x,
                y
            })
        }

        setEntrances([...entrance_array]);
    }
    
    return (
        <form action="" className="container">
            <div className="mb-3">
                <label className="form-label">Parking Lot Size</label>
                <div className="input-group">
                    <span className="input-group-text">X</span>
                    <input type="number" value={xValue} className="form-control" placeholder='1' onChange={(e) => setXValue(parseInt(e.target.value))}/>
                    <span className="input-group-text">y</span>
                    <input type="number" value={yValue} className="form-control" placeholder='1' onChange={(e) => setYValue(parseInt(e.target.value))}/>
                </div>
            </div>
            <div className="container grid-wrapper">
                <i>Click on a slot to make it an entrance</i>
                <table className='init-grid'>
                    <tbody>
                        { (xValue && yValue) &&
                            [...new Array(yValue)].map((el, i) => {
                                return (
                                    <tr key={i}>
                                        {
                                            [...new Array(xValue)].map((el, index) => {
                                                return (
                                                    <>
                                                        {
                                                            isEdge(index, i) ? isCorner(index, i) ? <td className={`edge corner`} key={`${i}-${index}`}><span></span></td> : <td className={`edge${isEntrance(index, i) ? ' entrance' : ''}`} onClick={() => handleEdgeClicked(index, i)} key={`${i}-${index}`}><span></span></td> : <td key={`${i}-${index}`}><span></span></td>
                                                        }
                                                    </>
                                                    // <td key={`${i}-${index}`}><span></span></td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <button className="btn btn-success btn-lg" type='button' onClick={() => handleSave()}>Save</button>
            <ToastComponent ref={toastRef} identifier='toast-message'></ToastComponent>
        </form>
    );
}

export default ParkingInitForm;