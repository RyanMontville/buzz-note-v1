import React, { useState } from 'react';
import "./NewInspection.css"

function Frames(props) {
    const inspectionId = props.id;
    const [box, setBox] = useState(3);
    const [frameNum, setFrameNum] = useState({
        number: 2,
        side: "B",
    });
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

    function skipBox() {
        setBox(box-1);
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
    function honeyOnChange(event) {
        setFrame((frame) => ({
            inspectionId: frame.inspectionId,
            boxNumber: frame.boxNumber,
            frameName: frame.frameName,
            combPattern: frame.combPattern,
            honey: event.target.value,
            nectar: frame.nectar,
            brood: frame.brood,
            cells: frame.cells,
            queenSpotted: frame.queenSpotted
        }))
    }

    return <div>
        <form>
            <section id="frame-header">
                <div>
                    <h2>Box {box}</h2>
                    <h2>Frame {frame.frameName}</h2>
                </div>
                {box>1 &&
                    <button type="button" className="button" onClick={skipBox}>Skip Box</button>
                }
            </section>
            <h3>Honey</h3>
            <section id="honey" className="button-group-row" onChange={honeyOnChange}>
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
            <section id="nectar" class="button-group-row">
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
                <input type="checkbox" id="brood-eggs" name="brood-eggs" value="Eggs" />
                <label for="brood-eggs" class="full button white border half">Eggs</label>
                <input type="checkbox" id="brood-larvae" name="brood-larvae" value="Larvae" />
                <label for="brood-larvae" class="full button white border half">Larvae</label>
                <input type="checkbox" id="brood-pupae" name="brood-pupae" value="Pupae" />
                <label for="brood-pupae" class="full button white border half">Pupae</label>
                <input type="checkbox" id="brood-none" name="brood-none" value="None" />
                <label for="brood-none" class="full button white border half">None</label>
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
        </form>
        <p>{frame.honey} {frame.nectar} {frame.brood} {frame.queenSpotted} {frame.cells}</p>


    </div>;
};

export default Frames;