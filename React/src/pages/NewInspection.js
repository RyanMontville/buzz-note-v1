import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Frames from '../components/Frames';
import Inspection from '../components/Inspection';
function NewInspection(props) {
  const {id} = useParams(); 
  const [framesFinished, setFramesFinished] = useState(false);
  const [boxes, setBoxes] = useState({
    boxOne: "Box 1",
    boxTwo: "Box 2",
    boxThree: "Box 3"
  });



  return <div>
    {!framesFinished &&
      <Frames id={id} setFramesFinished={setFramesFinished} setBoxes={setBoxes}/>
    }
    {framesFinished &&
      <Inspection id={id} boxes={boxes} />
    }
    <p>The id passed through the router is {id}</p>
  </div>;
};

export default NewInspection;