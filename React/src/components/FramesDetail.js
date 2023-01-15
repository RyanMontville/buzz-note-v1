import { useEffect, useState } from 'react';
import "../pages/Page.css";
import loadingBee from "../loading.gif";
import { Table } from 'react-bootstrap';
import { getFramesForId } from '../Services/InspectionService';

function FramesDetail(props) {
    const inspection = props.inspection;
    const [frames, setFrames] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    function displayNumberAsWord(number) {
        switch(number) {
            case '1': return <td>Full</td>
            case '0.66': return <td>2/3</td>
            case '0.33': return <td>1/3</td>
            case '0': return <td>none</td>
            default: return <td>Not Recorded</td>
        }
    } 

    useEffect(() => {
        getFramesForId(inspection.inspectionId)
            .then((result) => {
                setIsLoaded(true);
                setFrames(result);
            })
    });

    return <div>
        {isLoaded
            ?
            <Table hover bordered responsive>
            <thead>
                <tr>
                    <th>Frame</th>
                    <th>Comb Pattern</th>
                    <th>Honey</th>
                    <th>Nectar</th>
                    <th>Brood</th>
                    <th>Cells</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {frames.boxThree.length !== 0 &&
                        <th className='box-num table-primary' colSpan="7">{inspection.boxThree}</th>
                    }
                </tr>
                {frames.boxThree.map(frame => (
                    <tr>
                        <td>{frame.frameName}</td>
                        <td>{frame.combPattern}</td>
                        {displayNumberAsWord(frame.honey)}
                        {displayNumberAsWord(frame.nectar)}
                        <td>{frame.brood}</td>
                        <td>{frame.cells}</td>
                    </tr>
                ))}
                <tr>
                    {frames.boxTwo.length !== 0 &&
                        <th className='box-num table-primary' colSpan="7">{inspection.boxTwo}</th>
                    }
                </tr>
                {frames.boxTwo.map(frame => (
                    <tr>
                        <td>{frame.frameName}</td>
                        <td>{frame.combPattern}</td>
                        {displayNumberAsWord(frame.honey)}
                        {displayNumberAsWord(frame.nectar)}
                        <td>{frame.brood}</td>
                        <td>{frame.cells}</td>
                    </tr>
                ))}
                <tr>
                    {frames.boxOne.length !== 0 &&
                        <th className='box-num table-primary' colSpan="7">{inspection.boxOne}</th>
                    }
                </tr>
                {frames.boxOne.map(frame => (
                    <tr key={frame.frameName}>
                        <td>{frame.frameName}</td>
                        <td>{frame.combPattern}</td>
                        {displayNumberAsWord(frame.honey)}
                        {displayNumberAsWord(frame.nectar)}
                        <td>{frame.brood}</td>
                        <td>{frame.cells}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
            :
            <img src={loadingBee} alt="loading" className='loading' />
        }
        
    </div>;
};

export default FramesDetail;