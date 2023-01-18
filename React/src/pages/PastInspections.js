import { useEffect, useState } from 'react';

import Header from '../components/Header';
import InspectionDetail from '../components/InspectionDetail';
import Notes from '../components/Notes';
import FramesDetail from '../components/FramesDetail';
import "./Page.css";
import loadingBee from "../loading.gif";
import { getListOfInspections } from '../Services/InspectionService';

function PastInspections(props) {
    const [numberOfInspections, setNumberOfInspections] = useState(0);
    const [inspectionList, setInspectionList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        getListOfInspections()
            .then((result) => {
                setIsLoaded(true);
                setInspectionList(result);
                setNumberOfInspections(inspectionList.length - 1);
            })
    });

    const [currentId, setCurrentId] = useState(0);
    let currentInspection = inspectionList[currentId];

    function plusOne() {
        if (currentId < numberOfInspections) {
            setCurrentId(currentId + 1);
        }
    }

    function minusOne() {
        if (currentId > 0) {
            setCurrentId(currentId - 1);
        }
    }

    return <div>
        <Header />
        <main>
            {isLoaded
                ?
                <div>
                    <section className="inspection-navigation">
                        <button className={`button ${currentId === numberOfInspections ? "disabled" : ""}`} onClick={plusOne}><i className="fa-solid fa-arrow-left"></i> Previous</button>
                        <span className="inspection-date"> {currentInspection.inspectionDate} - {currentInspection.startTime}</span>
                        <button className={`button ${currentId === 0 ? "disabled" : ""}`} onClick={minusOne}>Next <i className="fa-solid fa-arrow-right"></i></button>
                    </section>
                    <InspectionDetail inspection={currentInspection} />
                    <FramesDetail inspection={currentInspection} />
                    <Notes notes={currentInspection.notes} id={currentInspection.inspectionId} />
                    
                </div>
                :
                <img src={loadingBee} alt="loading" className='loading' />
            }

        </main>

    </div>;
};

export default PastInspections;