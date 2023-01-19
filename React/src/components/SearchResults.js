import React from 'react';
import { Accordion, Alert, Badge } from 'react-bootstrap';
import "../pages/Page.css";
import InspectionDetail from '../components/InspectionDetail';
import Notes from '../components/Notes';
import FramesDetail from '../components/FramesDetail';
function SearchResults(props) {

    return <div>
        {props.searchTerm.length > 0 &&
            <div>
                <Alert key="success" variant="success">Search Results for "{props.searchTerm}"</Alert>
                {props.inspections.length === 0 &&
                    <p>No Results</p>
                }
                <Accordion>
                    {props.inspections.map(inspection => (
                        <Accordion.Item eventKey={inspection.inspectionId}>
                            <Accordion.Header><h3><Badge bg="secondary">#{inspection.inspectionId}</Badge> {inspection.inspectionDate} {inspection.startTime}</h3></Accordion.Header>
                            <Accordion.Body>
                                <InspectionDetail inspection={inspection} />
                                <FramesDetail inspection={inspection} />
                                <Notes notes={inspection.notes} id={inspection.inspection} />
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        }
    </div>;
};

export default SearchResults;