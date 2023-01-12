import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./NewInspection.css"

function Inspection(props) {
    const inspectionId = props.id;
    const [temperament, setTemperament] = useState("");
    const [beePopulation, setBeePopulation] = useState("");
    const [dronePopulation, setDronePopulation] = useState("");
    const [laying, setLaying] = useState("");
    const [beetles, setBettles] = useState("");
    const [pests, setPests] = useState("");

    let navigate = useNavigate();
    function finish() {
        const inspection = {
            inspectionId: inspectionId,
            weatherTemp: 0,
            weatherCondition: "",
            startTime: "",
            inspectionDate: "",
            beeTemperament: temperament,
            beePopulation: beePopulation,
            dronePopulation: dronePopulation,
            layingPattern: laying,
            hiveBeetles: beetles,
            otherPests: pests,
            notes: "",
            boxThree: props.boxes.boxThree,
            boxTwo: props.boxes.boxTwo,
            boxOne: props.boxes.boxOne
        }
        navigate("/");
    }

    return <form>
        <section id="end-header">
            <h2>End of Inspection</h2>
        </section>
        <h3>Bee Temperament</h3>
        <section id="beeTemperament" class="button-group-row" onChange={e => setTemperament(e.target.value)}>
            <input type="radio" id="temperament-calm" name="beeTemperament" value="Calm" />
            <label for="temperament-calm" class="full button green half">Calm</label>
            <input type="radio" id="temperament-nervous" name="beeTemperament" value="Nervous" />
            <label for="temperament-nervous" class="full button yellow half">Nervous</label>
            <input type="radio" id="temperament-angry" name="beeTemperament" value="Angry" />
            <label for="temperament-angry" class="full button orange half">Angry</label>
            <input type="radio" id="temperament-crazy" name="beeTemperament" value="Crazy" />
            <label for="temperament-crazy" class="full button red half">Crazy</label>
        </section>
        <h3>Bee Population</h3>
        <section id="beePopulation" class="button-group-row" onChange={e => setBeePopulation(e.target.value)}>
            <input type="radio" id="beePopulation-low" name="beePopulation" value="Low" />
            <label for="beePopulation-low" class="full button yellow half">Low</label>
            <input type="radio" id="beePopulation-normal" name="beePopulation" value="Normal" />
            <label for="beePopulation-normal" class="full button green half">Normal</label>
            <input type="radio" id="beePopulation-crowded" name="beePopulation" value="Crowded" />
            <label for="beePopulation-crowded" class="full button yellow half">Crowded</label>
        </section>
        <h3>Drone Population</h3>
        <section id="dronePopulation" class="button-group-row" onChange={e => setDronePopulation(e.target.value)}>
            <input type="radio" id="dronePopulation-low" name="dronePopulation" value="Low" />
            <label for="dronePopulation-low" class="full button yellow half">Low</label>
            <input type="radio" id="dronePopulation-normal" name="dronePopulation" value="Normal" />
            <label for="dronePopulation-normal" class="full button green half">Normal</label>
            <input type="radio" id="dronePopulation-crowded" name="dronePopulation" value="Crowded" />
            <label for="dronePopulation-crowded" class="full button yellow half">Crowded</label>
        </section>
        <h3>Laying Pattern</h3>
        <section id="layingPattern" class="button-group-row" onChange={e => setLaying(e.target.value)}>
            <input type="radio" id="layingPattern-good" name="layingPattern" value="Good" />
            <label for="layingPattern-good" class="full button green half">Good</label>
            <input type="radio" id="layingPattern-spotty" name="layingPattern" value="Spotty" />
            <label for="layingPattern-spotty" class="full button yellow half">Spotty</label>
        </section>
        <h3>Hive Beetles</h3>
        <section id="hiveBeetles" class="button-group-row" onChange={e => setBettles(e.target.value)}>
            <input type="radio" id="hiveBeetles-none" name="hiveBeetles" value="None" />
            <label for="hiveBeetles-none" class="full button green half">None</label>
            <input type="radio" id="hiveBeetles-few" name="hiveBeetles" value="Few" />
            <label for="hiveBeetles-few" class="full button yellow half">Few</label>
            <input type="radio" id="hiveBeetles-lots" name="hiveBeetles" value="Lots" />
            <label for="hiveBeetles-lots" class="full button red half">Lots</label>
        </section>
        <h3>Other Pests</h3>
        <section id="otherPests" class="button-group-row" onChange={e => setPests(e.target.value)}>
            <input type="radio" id="otherPests-none" name="otherPests" value="None" />
            <label for="otherPests-none" class="full button green half">None</label>
            <input type="radio" id="otherPests-few" name="otherPests" value="Few" />
            <label for="otherPests-few" class="full button yellow half">Few</label>
            <input type="radio" id="otherPests-lots" name="otherPests" value="Lots" />
            <label for="otherPests-lots" class="full button red half">Lots</label>
        </section>
        <p>Temperament: {temperament} bee: {beePopulation} drone: {dronePopulation}
        laying: {laying} hive: {beetles} other: {pests}</p>
        <button className="button" onClick={finish}>Finish Inspection</button>
        <p>inspection #{props.id}</p>
        <p>B3 - {props.boxes.boxThree}</p>
        <p>{props.boxes.boxTwo}</p>
        <p>{props.boxes.boxOne}</p>
        <p>{props.boxes.boxThree}</p>
    </form>
};
export default Inspection;