import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./NewInspection.css"
import { fillRestOfInspection } from '../Services/InspectionService';
import { Alert } from 'react-bootstrap';

function Inspection(props) {
    const inspectionId = props.id;
    const [errorMessage, setErrorMessage] = useState("");
    const [temperament, setTemperament] = useState("");
    const [beePopulation, setBeePopulation] = useState("");
    const [dronePopulation, setDronePopulation] = useState("");
    const [laying, setLaying] = useState("");
    const [beetles, setBeetles] = useState("");
    const [pests, setPests] = useState("");

    let navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage("");
        if(temperament!=="" && beePopulation!=="" && dronePopulation!=="" && laying!=="" && beetles!=="" && pests!=="") {
            const inspection = {
                inspectionId: inspectionId,
                weatherTemp: 0,
                weatherCondition: "Rain",
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
            fillRestOfInspection(inspection);
            navigate("/");
        } else {
            let notFilledIn = [];
            if(temperament===""){
                notFilledIn.push("Bee Temperament");
            }
            if(beePopulation===""){
                notFilledIn.push("Bee Population");
            }
            if(dronePopulation===""){
                notFilledIn.push("Drone Population");
            }
            if(laying===""){
                notFilledIn.push("Laying Pattern");
            }
            if(beetles===""){
                notFilledIn.push("Hive Beetles")
            }
            if(pests===""){
                notFilledIn.push("Other Pests");
            }
            let str = notFilledIn.toString();
            setErrorMessage("Please select a value for the following: " + str);
        }
        
    }

    return <form onSubmit={handleSubmit}>
        <section id="end-header">
            <h2>End of Inspection</h2>
        </section>
        <h3>Bee Temperament</h3>
        <section id="beeTemperament" className="button-group-row">
            <RadioButton label="Calm" value={temperament === 'calm'} name="temperament" color="green" id="tc" onChange={e => setTemperament('calm')} />
            <RadioButton label="Nervous" value={temperament === 'nervous'} name="temperament" color="yellow" id="tn" onChange={e => setTemperament('nervous')} />
            <RadioButton label="Angry" value={temperament === 'angry'} name="temperament" color="orange" id="ta" onChange={e => setTemperament('angry')} />
            <RadioButton label="Crazy" value={temperament === 'crazy'} name="temperament" color="red" id="tz" onChange={e => setTemperament('crazy')} />
        </section>
        <h3>Bee Population</h3>
        <section id="beePopulation" className="button-group-row">
            <RadioButton label="Low" value={beePopulation === 'low'} name="beePopulation" color="yellow" id="bpl" onChange={e => setBeePopulation('low')} />
            <RadioButton label="Normal" value={beePopulation === 'normal'} name="beePopulation" color="green" id="bpn" onChange={e => setBeePopulation('normal')} />
            <RadioButton label="Crowded" value={beePopulation === 'crowded'} name="beePopulation" color="yellow" id="bpc" onChange={e => setBeePopulation('crowded')} />
        </section>
        <h3>Drone Population</h3>
        <section id="dronePopulation" className="button-group-row">
            <RadioButton label="Low" value={dronePopulation === 'low'} name="dronePopulation" color="yellow" id="dpl" onChange={e => setDronePopulation('low')} />
            <RadioButton label="Normal" value={dronePopulation === 'normal'} name="dronePopulation" color="green" id="dpn" onChange={e => setDronePopulation('normal')} />
            <RadioButton label="Crowded" value={dronePopulation === 'crowded'} name="dronePopulation" color="yellow" id="dpc" onChange={e => setDronePopulation('crowded')} />
        </section>
        <h3>Laying Pattern</h3>
        <section id="layingPattern" className="button-group-row">
            <RadioButton label="Good" value={laying === 'good'} name="laying" color="green" id="lpg" onChange={e => setLaying('good')} />
            <RadioButton label="Spotty" value={laying === 'spotty'} name="laying" color="yellow" id="lps" onChange={e => setLaying('spotty')} />
        </section>
        <h3>Hive Beetles</h3>
        <section id="hiveBeetles" className="button-group-row">
            <RadioButton label="None" value={beetles === 'none'} name="beetles" color="green" id="hbn" onChange={e => setBeetles('none')} />
            <RadioButton label="Few" value={beetles === 'few'} name="beetles" color="yellow" id="hbf" onChange={e => setBeetles('few')} />
            <RadioButton label="Lots" value={beetles === 'lots'} name="beetles" color="red" id="hbl" onChange={e => setBeetles('lots')} />
        </section>
        <h3>Other Pests</h3>
        <section id="otherPests" className="button-group-row">
            <RadioButton label="None" value={pests === 'none'} name="pests" color="green" id="opn" onChange={e => setPests('none')} />
            <RadioButton label="Few" value={pests === 'few'} name="pests" color="yellow" id="opf" onChange={e => setPests('few')} />
            <RadioButton label="Lots" value={pests === 'lots'} name="pests" color="red" id="opl" onChange={e => setPests('lots')} />
        </section>
        {errorMessage.length>0 &&
            <Alert key="danger" variant="danger">{errorMessage}</Alert>
        }
        <button type="submit" className="button">Finish Inspection</button>
    </form>
};

const RadioButton = ({ label, id, value, name, color, onChange }) => {
    return (
        <>
            <input type="radio" checked={value} name={name} id={id} onChange={onChange} />
            <label for={id} className={`full button ${color} half`}>{label}</label>
        </>

    );
};

export default Inspection;