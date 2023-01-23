import React, { useState } from 'react';
import "./NewInspection.css"
import { addNewFrame, addFrameAverage } from '../Services/InspectionService';
import { Alert } from 'react-bootstrap';
import { broodsArray, cellsArray } from './Arrays';

function Frames(props) {
    /*********************************** STATES ************************************************/
    const inspectionId = props.id;
    const [box, setBox] = useState(3);
    /*********************************** Frame ************************************************/
    const FRAME_INITIAL_STATE = {
        number: 1,
        side: "A",
    }
    const [frameNum, setFrameNum] = useState(FRAME_INITIAL_STATE);
    const [errorMessage, setErrorMessage] = useState("");
    const [honey, setHoney] = useState("");
    const [nectar, setNectar] = useState("");
    const BROOD_INITIAL_STATE = new Array(broodsArray.length).fill(false);
    const [broodChecked, setBroodChecked] = useState(BROOD_INITIAL_STATE);
    const [broods, setBroods] = useState("");
    const CELLS_INITIAL_STATE = new Array(cellsArray.length).fill(false);
    const [cellChecked, setCellChecked] = useState(CELLS_INITIAL_STATE);
    const [cells, setCells] = useState("");
    const [queen, setQueen] = useState(false);
    const [comb, setComb] = useState("");

    const [box3, setBox3] = useState("Box 3");
    const [box2, setBox2] = useState("Box 2");
    const [box1, setBox1] = useState("Box 1");

    /********************************** Average ***********************************************/
    const BROOD_COUNT_INITIAL_STATE = {
        eggs: 0,
        larve: 0,
        pupae: 0,
        none: 0
    }
    const CELLS_COUNT_INITIAL_STATE = {
        queen: 0,
        Supersedure: 0,
        none: 0
    }
    const COMBCOUNT_INITIAL_STATE = {
        good: 0,
        burr: 0
    }
    const [honeyTotal, setHoneyTotal] = useState(0);
    const [nectarTotal, setNectarTotal] = useState(0);
    const [broodCount, setBroodCount] = useState(BROOD_COUNT_INITIAL_STATE);
    const [cellsCount, setCellsCount] = useState(CELLS_COUNT_INITIAL_STATE);
    const [combCount, setCombCount] = useState(COMBCOUNT_INITIAL_STATE);
    const [queenAvg, setQueenAvg] = useState('');
    const [numberOfFrames, setNumberOfFrames] = useState(0);

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
            }, ""
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
            }, ""
        );
        setCells(cell);
    }

    /*************************** Next/Skip functions *******************************************/

    function nextBox() {
        //calculate box averages and post to database if "next box" was clicked, not "skip box"
        if (numberOfFrames !== 0) {
            let queenStr = '';
            if (queenAvg === '') {
                queenStr = 'Not Spotted';
            } else {
                queenStr = 'Frame ' + queenAvg;
            }
            let averageFrame = {
                inspectionId: inspectionId,
                boxNumber: box,
                honey: Math.round(honeyTotal * 5),
                nectar: Math.round(nectarTotal * 5),
                brood: Math.round((broodCount.eggs / numberOfFrames) * 100) + "% EggsX" + Math.round((broodCount.larve / numberOfFrames) * 100) + "% LarveX" + Math.round((broodCount.pupae / numberOfFrames) * 100) + "% PupaeX" + Math.round((broodCount.none / numberOfFrames) * 100) + "% None",
                cells: Math.round((cellsCount.queen / numberOfFrames) * 100) + "% QueenX" + Math.round((cellsCount.Supersedure / numberOfFrames) * 100) + "% SupersedureX" + Math.round((cellsCount.Supersedure / numberOfFrames) * 100) + "% None",
                combPattern: Math.round((combCount.good / numberOfFrames) * 100) + "% GoodX" + Math.round((combCount.burr / numberOfFrames) * 100) + "% Burr",
                queenSpotted: queenStr
            }
            addFrameAverage(averageFrame);
        }

        if (box === 1) {
            props.setFramesFinished(true);
            props.setBoxes({
                boxOne: box1,
                boxTwo: box2,
                boxThree: box3
            });
        }

        //get all states ready for next box
        //---------------------frame states
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
        //---------------------average state
        setNumberOfFrames(0);
        setHoneyTotal(0);
        setNectarTotal(0);
        setBroodCount(BROOD_COUNT_INITIAL_STATE);
        setCombCount(COMBCOUNT_INITIAL_STATE);
        setCombCount(COMBCOUNT_INITIAL_STATE);
        setQueenAvg('');
    }
    function nextFrame() {
        if (frameNum.number === 10 && frameNum.side === "B") {
            setFrameNum(FRAME_INITIAL_STATE);
        } else {
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
    }

    function handleSubmit(e) {
        e.preventDefault();

        //check if frame 10B
        if (frameNum.number === 10 && frameNum.side === 'B') {
            nextBox();
        }


        setErrorMessage("");
        if (honey !== "" && nectar !== "" && comb !== "") {
            if (queen === true) {
                setQueenAvg(frameNum.number + frameNum.side);
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
                frameName: frameNum.number + frameNum.side,
                combPattern: comb,
                honey: honey,
                nectar: nectar,
                brood: broods,
                cells: cells,
                queenSpotted: queen
            }
            addNewFrame(frame);

            setNumberOfFrames(numberOfFrames + 1);
            setHoneyTotal(honeyTotal + honey);
            setNectarTotal(nectarTotal + nectar);
            //brood parts count
            let broodWords = broods.split(' ');
            for (let i = 0; i < broodWords.length; i++) {
                let type = broodWords[i];
                let count = 0;
                switch (type) {
                    case 'Eggs': count = broodCount.eggs; break;
                    case 'Larvae': count = broodCount.larve; break;
                    case 'Pupae': count = broodCount.pupae; break;
                    case 'None': count = broodCount.none; break;
                    default: break;
                }
                setBroodCount(existingValues => ({
                    ...existingValues,
                    [type]: count + 1,
                }));
            }
            //cells parts count
            let cellsWords = cells.split(' ');
            for (let i = 0; i < cellsWords.length; i++) {
                let type = cellsWords[i];
                let count = 0;
                switch (type) {
                    case 'Queen': count = cellsCount.queen; break;
                    case 'Super': count = cellsCount.Supersedure; break;
                    case 'None': count = cellsCount.none; break;
                    default: break;
                }
                setCellsCount(existingValues => ({
                    ...existingValues,
                    [type]: count + 1,
                }));
            }
            //Comb pattern count
            if (comb === 'good') {
                setCombCount({ good: combCount.good + 1, burr: combCount.burr })
            }
            if (comb === 'burr') {
                setCombCount({ good: combCount.good, burr: combCount.burr + 1 })
            }

            //reset states
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
            if (honey === "") {
                notFilledIn.push("Honey");
            }
            if (nectar === "") {
                notFilledIn.push("Nectar");
            }
            if (comb === "") {
                notFilledIn.push("Comb Pattern")
            }
            let str = notFilledIn.toString();
            setErrorMessage("Please select a value for the following: " + str);
        }


    }

    return <form onSubmit={handleSubmit}>
        <section id="frame-header">
            <div>
                <h2>Box {box}</h2>
                <h2>Frame {frameNum.number}{frameNum.side}</h2>
            </div>
            <button type="button" className="button" onClick={nextBox}>Skip Box</button>
        </section>
        <h1>{numberOfFrames}</h1>
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
        {errorMessage.length > 0 &&
            <Alert key="danger" variant="danger">{errorMessage}</Alert>
        }

        {frameNum.number === 10 && frameNum.side === "B" &&
            <div>
                {box === 1 &&
                    <button type="submit" className="button">Finish Frames</button>
                }
                {box !== 1 &&
                    <button type="submit" className="button">Next Box</button>
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

function RadioButton({ label, id, value, name, color, onChange }) {
    return (
        <>
            <input type="radio" checked={value} name={name} id={id} onChange={onChange} />
            <label for={id} className={`full button ${color} half`}>{label}</label>
        </>

    );
};

export default Frames;