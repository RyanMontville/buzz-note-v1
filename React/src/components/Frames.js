import React, { useState } from 'react';
import "./NewInspection.css"
import { addNewFrame } from '../Services/InspectionService';
import { Alert } from 'react-bootstrap';

function Frames(props) {
    /*********************************** STATES ************************************************/
    const inspectionId = props.id;
    const [box, setBox] = useState(3);
    const FRAME_INITIAL_STATE = {
        number: 1,
        side: "A",
    }
    const [frameNum, setFrameNum] = useState(FRAME_INITIAL_STATE);
    const [errorMessage, setErrorMessage] = useState("");
    const [honey, setHoney] = useState("");
    const [nectar, setNectar] = useState("");
    const broodsArray = [
        {name: "Eggs",value: 0},
        {name: "Larvae",value: 1},
        {name: "Pupae", value: 2},
        {name: "None", value: 3}
    ];
    const BROOD_INITIAL_STATE = new Array(broodsArray.length).fill(false);
    const [broodChecked, setBroodChecked] = useState(BROOD_INITIAL_STATE);
    const [broods, setBroods] = useState("");
    const cellsArray = [
        {name: "Queen",value: 0},
        {name: "Super",value: 1},
        {name: "None", value: 2}
    ];
    const CELLS_INITIAL_STATE = new Array(cellsArray.length).fill(false);
    const [cellChecked, setCellChecked] = useState(CELLS_INITIAL_STATE);
    const [cells, setCells] = useState("");
    const [queen, setQueen] = useState(false);
    const [comb, setComb] = useState("");

    const [box3, setBox3] = useState("Box 3");
    const [box2, setBox2] = useState("Box 2");
    const [box1, setBox1] = useState("Box 1");

    /*************************** Checkbox functions *******************************************/
    const broodHandleChange = (position) => {
        const updateBroodChecked = broodChecked.map((item, index) =>
            index === position ? !item : item
        );

        setBroodChecked(updateBroodChecked);

        const brood = updateBroodChecked.reduce(
            (str, currentState, index) => {
                if (currentState === true) {
                    return str + " " + broodsArray[index].name;
                }
                return str;
            },""
        );
        setBroods(brood);
    }

    const cellHandleChange = (position) => {
        const updateCellChecked = cellChecked.map((item, index) => 
            index === position ? !item : item
        );

        setCellChecked(updateCellChecked);

        const cell = updateCellChecked.reduce(
            (str, currentState, index) => {
                if (currentState === true) {
                    return str + " " + cellsArray[index].name;
                }
                return str;
            },""
        );
        setCells(cell);
    }

    /*************************** Next/Skip functions *******************************************/

    function nextBox() {
        setBox(box - 1);
        setFrameNum(FRAME_INITIAL_STATE);
        setHoney("");
        setNectar("");
        setBroods("");
        setBroodChecked(BROOD_INITIAL_STATE);
        setCellChecked(CELLS_INITIAL_STATE);
        setCells("");
        setQueen(false);
        setComb("");
    }
    function nextFrame() {
        if (frameNum.side === "A") {
            setFrameNum({
                number: frameNum.number,
                side: "B"
            })
        } else {
            setFrameNum({
                number: frameNum.number + 1,
                side: "A"
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage(""); 
        if(honey !== "" && nectar !== "" && comb !== ""){
            if (queen === true) {
                if (box === 3) {
                    setBox3("Box 3 - " + frameNum.number + frameNum.side);
                }
                if (box === 2) {
                    setBox2("Box 2 - " + frameNum.number + frameNum.side);
                }
                if (box === 1) {
                    setBox1("Box 1 - " + frameNum.number + frameNum.side);
                }
            }
            let frame = {
                inspectionId: inspectionId,
                boxNumber: box,
                frameName: frameNum.number+frameNum.side,
                combPattern: comb,
                honey: honey,
                nectar: nectar,
                brood: broods,
                cells: cells,
                queenSpotted: queen
            }
            addNewFrame(frame);
            e.target.reset();
            nextFrame();
            setHoney("");
            setNectar("");
            setBroods("");
            setBroodChecked(BROOD_INITIAL_STATE);
            setCellChecked(CELLS_INITIAL_STATE);
            setCells("");
            setQueen(false);
            setComb("");
        } else {
            let notFilledIn = [];
            if(honey===""){
                notFilledIn.push("Honey");
            }
            if(nectar===""){
                notFilledIn.push("Nectar");
            }
            if(comb===""){
                notFilledIn.push("Comb Pattern")
            }
            let str = notFilledIn.toString();
            setErrorMessage("Please select a value for the following: " + str);
        }
        
        
    }

    function finishFrames() {
        props.setFramesFinished(true);
        props.setBoxes({
            boxOne: box1,
            boxTwo: box2,
            boxThree: box3
        })
    }

    return <form onSubmit={handleSubmit}>
        <section id="frame-header">
            <div>
                <h2>Box {box}</h2>
                <h2>Frame {frameNum.number}{frameNum.side}</h2>
            </div>
            {box > 1 &&
                <button type="button" className="button" onClick={nextBox}>Skip Box</button>
            }
            {box === 1 &&
                <button type="button" className="button" onClick={finishFrames}>Skip Box</button>
            }
        </section>
        <h3>Honey</h3>
        <section id="honey" className="button-group-row">
            <RadioButton label="Full" value={honey === 1} name="honey" color="green" id="h1" onChange={e => setHoney(1)} />
            <RadioButton label="2/3" value={honey === 0.66} name="honey" color="yellow" id="h6" onChange={e => setHoney(0.66)} />
            <RadioButton label="1/3" value={honey === 0.33} name="honey" color="orange" id="h3" onChange={e => setHoney(0.33)} />
            <RadioButton label="none" value={honey === 0} name="honey" color="black" id="h0" onChange={e => setHoney(0)} />
        </section>
        <h3>nectar</h3>
        <section id="nectar" className="button-group-row">
            <RadioButton label="Full" value={nectar === 1} name="nectar" color="green" id="n1" onChange={e => setNectar(1)} />
            <RadioButton label="2/3" value={nectar === 0.66} name="nectar" color="yellow" id="n6" onChange={e => setNectar(0.66)} />
            <RadioButton label="1/3" value={nectar === 0.33} name="nectar" color="orange" id="n3" onChange={e => setNectar(0.33)} />
            <RadioButton label="none" value={nectar === 0} name="nectar" color="black" id="n0" onChange={e => setNectar(0)} />
        </section>
        <h3>Brood (Select Multiple)</h3>
        <section id="brood" className="button-group-row">
            {broodsArray.map(({ name }, index) => {
                return (
                    <span key={index}>
                        <input
                            type="checkbox"
                            id={`brood-${index}`}
                            name={name}
                            value={name}
                            checked={broodChecked[index]}
                            onChange={() => broodHandleChange(index)}
                        />
                        <label for={`brood-${index}`} className="full button white border half">{name}</label>
                    </span>
                )
            })}
        </section>
        <h3>Queen Spotted</h3>
        <section id="queen" className="button-group-row">
        <RadioButton label="Yes" value={queen === true} name="queen" color="green" id="qTrue" onChange={e => setQueen(true)} />
        <RadioButton label="No" value={queen === false} name="queen" color="black" id="qFalse" onChange={e => setQueen(false)} />
        </section>
        <h3>Cells (Select Multiple)</h3>
        <section id="cells" className="button-group-row">
        {cellsArray.map(({ name }, index) => {
                return (
                    <span key={index}>
                        <input
                            type="checkbox"
                            id={`cell-${index}`}
                            name={name}
                            value={name}
                            checked={cellChecked[index]}
                            onChange={() => cellHandleChange(index)}
                        />
                        <label for={`cell-${index}`} className="full button white border half">{name}</label>
                    </span>
                )
            })}
        </section>
        <h3>Comb Pattern</h3>
        <section id="comb" className="button-group-row">
        <RadioButton label="Good" value={comb === 'good'} name="comb" color="green" id="cg" onChange={e => setComb('good')} />
        <RadioButton label="Burr" value={comb === 'burr'} name="comb" color="yellow" id="cb" onChange={e => setComb('burr')} />
        </section>
        {errorMessage.length>0 &&
            <Alert key="danger" variant="danger">{errorMessage}</Alert>
        }

        {frameNum.number === 10 && frameNum.side === "B" &&
            <div>
                {box === 1 &&
                    <button className="button" onClick={finishFrames}>Finish Frames</button>
                }
                {box !== 1 &&
                    <button onClick={nextBox} className="button">Next Box</button>
                }
            </div>

        }
        {frameNum.number === 10 && frameNum.side === "A" &&
            <button type="submit" className="button">Next Frame</button>
        }
        {frameNum.number < 10 &&
            <button type="submit" className="button">Next Frame</button>
        }
    </form>;
};

const RadioButton = ({ label, id, value, name, color, onChange }) => {
    return (
        <>
            <input type="radio" checked={value} name={name} id={id} onChange={onChange} />
            <label for={id} className={`full button ${color} half`}>{label}</label>
        </>

    );
};

export default Frames;