import { useEffect, useState } from 'react';
import Header from '../components/Header';
import InspectionDetail from '../components/InspectionDetail';
import Notes from '../components/Notes';
import FramesDetail from '../components/FramesDetail';
import "./Page.css";
function PastInspections(props) {
    const [numberOfInspections, setNumberOfInspections] = useState(0);
    const [inspectionList, setInspectionList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        fetch('http://localhost:9000/inspections').then(res => res.json())
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
    //let jsonstr = JSON.stringify(currentInspection);

    return <div>
        <Header />
        <main>
            {isLoaded
                ?
                <div>
                    <section className="inspection-navigation">
                        <button className={`button ${currentId === numberOfInspections ? "disabled" : ""}`} onClick={plusOne}><i class="fa-solid fa-arrow-left"></i> Previous</button>
                        <span class="inspection-date">{currentInspection.inspectionDate} - {currentInspection.startTime}</span>
                        <button className={`button ${currentId === 0 ? "disabled" : ""}`} onClick={minusOne}>Next <i class="fa-solid fa-arrow-right"></i></button>
                    </section>
                    <InspectionDetail inspection={currentInspection} />
                    <FramesDetail inspection={currentInspection} />
                    <Notes notes={currentInspection.notes} id={currentId} />
                </div>
                :
                <h3>Loading...</h3>
            }

        </main>

    </div>;
};

export default PastInspections;