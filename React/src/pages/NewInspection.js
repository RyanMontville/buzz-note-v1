import React, { useState } from 'react';
import Frames from '../components/Frames';
import Inspection from '../components/Inspection';
import { startNewInspection } from '../Services/InspectionService';
function NewInspection(props) {
  const [inspectionId, setInspectionId] = useState(0);
  const [hasInspectionStarted, setHasInspectionStarted] = useState(false);
  const [framesFinished, setFramesFinished] = useState(false);
  const [boxes, setBoxes] = useState({
    boxOne: "Box 1",
    boxTwo: "Box 2",
    boxThree: "Box 3"
  });

  function handleStartButton() {
    startNewInspection()
    .then(data => setInspectionId(data));
    setHasInspectionStarted(true);
  }


  return <div>
    {!hasInspectionStarted &&
      <form><br></br><button onClick={handleStartButton} class="large full button green">Start the Inspection</button></form>
    }
    {!framesFinished && hasInspectionStarted &&
      <Frames id={inspectionId} setFramesFinished={setFramesFinished} setBoxes={setBoxes}/>
    }
    {framesFinished && hasInspectionStarted &&
      <Inspection id={inspectionId} boxes={boxes} />
    }
  </div>;
};

export default NewInspection;