import { useEffect, useState } from 'react';
import "../pages/Page.css";
import loadingBee from "../loading.gif";
import { Table } from 'react-bootstrap';
import { getAverages } from '../Services/InspectionService';

function AverageDetails(props) {
    const id = props.id;
    const [averages, setAverages] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getAverages(id)
            .then((result) => {
                setIsLoaded(true);
                setAverages(result);
            })
    });

    return <div>
        {isLoaded
            ? <>
                {averages.map(average => (
                    <>
                        <h3>Box {average.boxNumber}</h3>
                        <ul>
                            <li>Honey: {average.honey} pound{average.honey>1 ? "s" : ""}</li>
                            <li>Nectar: {average.nectar} pound{average.honey>1 ? "s" : ""}</li>
                            <li>Brood: {average.brood}</li>
                            <li>Cells: {average.cells}</li>
                            <li>Comb Pattern: {average.combPattern}</li>
                            <li>{average.queenSpotted}</li>
                        </ul>
                    </>
                ))}
            </>
            : <img src={loadingBee} alt="loading" className='loading' />
        }

    </div>;
};

export default AverageDetails;