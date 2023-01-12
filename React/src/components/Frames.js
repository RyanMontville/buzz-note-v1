import React, { useState } from 'react';
import { broods } from "./broods";
import "./NewInspection.css"

function Frames(props) {
    const inspectionId = props.id;
    const [box, setBox] = useState(3);
    const [frameNum, setFrameNum] = useState({
        number: 1,
        side: "A",
    });
    const [honey, setHoney] = useState("");
    const [nectar, setNectar] = useState("");
    const [brood, setBrood] = useState("");
    const [broodChecked, setBroodChecked] = useState(new Array(broods.length).fill(false));
    const broodHandleChange = (position) => {
        const updateBroodChecked = broodChecked.map((item, index) =>
            index === position ? !item : item
        );

        setBroodChecked(updateBroodChecked);

        const brood = updateBroodChecked.reduce(
            (str, currentState, index) => {
                if (currentState === true) {
                    return str + " " + broods[index].name;
                }
                return str;
            },
            ""
        );
        setBrood(brood);
    }
    const [cells, setCells] = useState("");
    const [queen, setQueen] = useState(false);
    const [comb, setComb] = useState("");
    const [box3, setBox3] = useState("");
    const [box2, setBox2] = useState("");
    const [box1, setBox1] = useState("");
    const [frame, setFrame] = useState({
        inspectionId: inspectionId,
        boxNumber: box,
        frameName: frameNum.number + frameNum.side,
        combPattern: "",
        honey: "",
        nectar: "",
        brood: "",
        cells: "",
        queenSpotted: ""
    });

    function nextBox() {
        setBox(box - 1);
        setFrameNum({
            number: 1,
            side: "A"
        });
        setFrame({
            inspectionId: inspectionId,
            boxNumber: box,
            frameName: frameNum.number + frameNum.side,
            combPattern: "",
            honey: "",
            nectar: "",
            brood: "",
            cells: "",
            queenSpotted: ""
        })
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
        //send through api
        if(queen==="true"){
            if(box===3){
                setBox3("Box 3 - " + frameNum.number + frameNum.side);
            }
            if(box===2){
                setBox2("Box 2 - " + frameNum.number + frameNum.side);
            }
            if(box===1){
                setBox1("Box 1 - "+ frameNum.number + frameNum.side);
            }
        }
        e.target.reset();
        nextFrame();
        setHoney("");
        setNectar("");
        setBrood("");
        setCells("");
        setQueen(false);
        setComb("");
        brood.reset();
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
            {box===1 &&
                <button type="button" className="button" onClick={finishFrames}>Skip Box</button>
            }
        </section>
        <h3>Honey</h3>
        <section id="honey" className="button-group-row" onChange={e => setHoney(e.target.value)}>
            <input type="radio" id="honey-full" name="honey" value="1" />
            <label for="honey-full" className="full button green half">Full</label>
            <input type="radio" id="honey-two" name="honey" value="0.66" />
            <label for="honey-two" className="full button yellow half">2/3</label>
            <input type="radio" id="honey-one" name="honey" value="0.33" />
            <label for="honey-one" className="full button orange half">1/3</label>
            <input type="radio" id="honey-none" name="honey" value="0" />
            <label for="honey-none" className="full button black half">None</label>
        </section>
        <h3>nectar</h3>
        <section id="nectar" class="button-group-row" onChange={e => setNectar(e.target.value)}>
            <input type="radio" id="nectar-full" name="nectar" value="1" />
            <label for="nectar-full" class="full button green half">Full</label>
            <input type="radio" id="nectar-two" name="nectar" value="0.66" />
            <label for="nectar-two" class="full button yellow half">2/3</label>
            <input type="radio" id="nectar-one" name="nectar" value="0.33" />
            <label for="nectar-one" class="full button orange half">1/3</label>
            <input type="radio" id="nectar-none" name="nectar" value="0" />
            <label for="nectar-none" class="full button black half">None</label>
        </section>
        <h3>Brood (Select Multiple)</h3>
        <section id="brood" class="button-group-row">
            {broods.map(({ name }, index) => {
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
        <section id="queen" class="button-group-row">
            <input type="radio" id="queen-yes" name="queen" value="true" />
            <label for="queen-yes" class="full button green half">Yes</label>
            <input type="radio" id="queen-no" name="queen" value="false" />
            <label for="queen-no" class="full button black half">No</label>
        </section>
        <h3>Cells (Select Multiple)</h3>
        <section id="cells" class="button-group-row">
            <input type="checkbox" id="cells-queen" name="cells-queen" value="Queen" />
            <label for="cells-queen" class="full button white border half">Queen</label>
            <input type="checkbox" id="cells-super" name="cells-super" value="Super" />
            <label for="cells-super" class="full button white border half">Super</label>
            <input type="checkbox" id="cells-none" name="cells-none" value="None" />
            <label for="cells-none" class="full button white border half">None</label>
        </section>
        <h3>Comb Pattern</h3>
        <section id="comb" class="button-group-row">
            <input type="radio" id="comb-good" name="comb" value="Good" />
            <label for="comb-good" class="full button green half">Good</label>
            <input type="radio" id="comb-burr" name="comb" value="Burr" />
            <label for="comb-burr" class="full button yellow half">Burr</label>
        </section>

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
        <p>{inspectionId}</p>
        <p>frame: {frameNum.number}{frameNum.side}</p>
        <p>honey: {honey} nectar: {nectar} brood: {brood}</p>
    </form>;
};

export default Frames;