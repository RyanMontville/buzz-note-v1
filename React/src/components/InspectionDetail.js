import "../pages/Page.css";
function InspectionDetail(props) {
    const inspection = props.inspection;
    

    return <div>
        <table id="inspectionInfo">
                <thead>
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
            </table>
    </div>;
};

export default InspectionDetail;