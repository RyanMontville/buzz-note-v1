import { useEffect, useState } from 'react';
import "../pages/Page.css";
import loadingBee from "../loading.gif";
import { Table } from 'react-bootstrap';
import { getAverages } from '../Services/InspectionService';

function AverageDetails(props) {
    const id = props.id;
    const [averages, setAverages] = useState([]);
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
            ? <Table hover bordered responsive striped >
                <thead>
                <tr>
                    <th>Box</th>
                    <th>Honey</th>
                    <th>Nectar</th>
                    <th>Brood</th>
                    <th>Cells</th>
                    <th>Comb Pattern</th>
                    <th>Queen Spotted</th>
                </tr>
            </thead>
            <tbody>
            {averages.map(average => (
                    <tr>
                        <td>{average.boxNumber}</td>
                        <td>{average.honey} lb{average.honey>1 ? "s" : ""}</td>
                        <td>{average.nectar} lb{average.honey>1 ? "s" : ""}</td>
                        <td><NewlineText text={average.brood} /></td>
                        <td><NewlineText text={average.cells} /></td>
                        <td><NewlineText text={average.combPattern} /></td>
                        <td>{average.queenSpotted}</td>
                    </tr>
                ))}
            </tbody>
            </Table>
            : <img src={loadingBee} alt="loading" className='loading' />
        }

    </div>;
};

function NewlineText(props) {
    const text = props.text;
    return text.split('X').map(str => <p className='margin-0'>{str}</p>);
  }

export default AverageDetails;