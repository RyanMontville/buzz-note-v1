import React, { useState } from 'react';
import Frames from '../components/Frames';
import Inspection from '../components/Inspection';
function NewInspection(props) {
  const inspectionId = 1;
  const [framesFinished, setFramesFinished] = useState(false);
  const [boxes, setBoxes] = useState({
    boxOne: "Box 1",
    boxTwo: "Box 2",
    boxThree: "Box 3"
  });


  return <div>
    {!framesFinished &&
      <Frames id={inspectionId} setFramesFinished={setFramesFinished} setBoxes={setBoxes}/>
    }
    {framesFinished && 
      <Inspection id={inspectionId} boxes={boxes} />
    }
    <p>b3 is set to {boxes.boxThree}</p>
  </div>;
};

export default NewInspection;