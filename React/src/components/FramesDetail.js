import { useEffect, useState } from 'react';
import "../pages/Page.css";
function FramesDetail(props) {
    const inspection = props.inspection;
    const [frames, setFrames] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:9000/inspection/${inspection.inspectionId}/frames`).then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setFrames(result);
            })
    });

    return <div>
        {isLoaded
            ?
            <table id="inspection-table">
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
                        <th className='box-num' colspan="7">{inspection.boxThree}</th>
                    }
                </tr>
                {frames.boxThree.map(frame => (
                    <tr>
                        <td>{frame.frameName}</td>
                        <td>{frame.combPattern}</td>
                        <td>{frame.honey}</td>
                        <td>{frame.nectar}</td>
                        <td>{frame.brood}</td>
                        <td>{frame.cells}</td>
                    </tr>
                ))}
                <tr>
                    {frames.boxTwo.length !== 0 &&
                        <th className='box-num' colspan="7">{inspection.boxTwo}</th>
                    }
                </tr>
                {frames.boxTwo.map(frame => (
                    <tr>
                        <td>{frame.frameName}</td>
                        <td>{frame.combPattern}</td>
                        <td>{frame.honey}</td>
                        <td>{frame.nectar}</td>
                        <td>{frame.brood}</td>
                        <td>{frame.cells}</td>
                    </tr>
                ))}
                <tr>
                    {frames.boxOne.length !== 0 &&
                        <th className='box-num' colspan="7">{inspection.boxOne}</th>
                    }
                </tr>
                {frames.boxOne.map(frame => (
                    <tr>
                        <td>{frame.frameName}</td>
                        <td>{frame.combPattern}</td>
                        <td>{frame.honey}</td>
                        <td>{frame.nectar}</td>
                        <td>{frame.brood}</td>
                        <td>{frame.cells}</td>
                    </tr>
                ))}
            </tbody>
        </table>
            :
                <h2>Loading...</h2>
        }
        
    </div>;
};

export default FramesDetail;