import "../pages/Page.css";
import { Table } from 'react-bootstrap';
function InspectionDetail(props) {
    const inspection = props.inspection;


    return <div>
        <Table responsive>
            <thead class="thead-light">
                <tr>
                    <th>Weather</th>
                    <th>Bee Temperament</th>
                    <th>Bee Population</th>
                    <th>Drone Population</th>
                    <th>layingPattern</th>
                    <th>Hive Beetles</th>
                    <th>Other Pests</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{inspection.weatherTemp} {inspection.weatherCondition}</td>
                    <td>{inspection.beeTemperament}</td>
                    <td>{inspection.beePopulation}</td>
                    <td>{inspection.dronePopulation}</td>
                    <td>{inspection.layingPattern}</td>
                    <td>{inspection.hiveBeetles}</td>
                    <td>{inspection.otherPests}</td>
                </tr>
            </tbody>
        </Table>
    </div>;
};

export default InspectionDetail;