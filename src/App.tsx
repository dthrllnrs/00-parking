import React, { useState } from 'react';
import ParkingInitForm from './components/ParkingInitForm';
import ParkingLot from './components/ParkingLot';
import './App.css';
import ISlot from './classes/ISlot';

function App() {
  const [validInput, setValidInput] = useState<boolean>(false);
  const [gridProps, setGridProps] = useState<any>({});

  const handleValidInput = (x: number, y: number, entrances: ISlot[]) => {
    setGridProps({
      x,
      y,
      entrances
    })

    setValidInput(true);
  }
  return (
    <div className="mt-5">
      {
        validInput ? <ParkingLot x={gridProps.x} y={gridProps.y} entrances={gridProps.entrances}/> :
          <ParkingInitForm handleValidInput={handleValidInput}></ParkingInitForm>
      }
    </div>
  );
}

export default App;
