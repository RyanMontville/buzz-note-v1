import React from 'react';
import { Accordion, Alert, Badge } from 'react-bootstrap';
import "../pages/Page.css";
import InspectionDetail from '../components/InspectionDetail';
import Notes from '../components/Notes';
import FramesDetail from '../components/FramesDetail';
import AverageDetails from './AverageDetail';

export function SearchResults(props) {

    return <div>
        {props.inspections.length === 0
            ? <Alert key="danger" variant="danger">No Results</Alert>
            : <>
                <Alert key="success" variant="success">{props.inspections.length} result{props.inspections.length>1?'s':''}. {props.numWithNotes} {props.inspections.length>1?'have':'has'} notes.</Alert>
                <Accordion>
                    {props.inspections.map(inspection => (
                        <Accordion.Item eventKey={inspection.inspectionId}>
                            <Accordion.Header><h3><Badge bg="secondary">#{inspection.inspectionId}</Badge> {inspection.inspectionDate} {inspection.startTime}</h3></Accordion.Header>
                            <Accordion.Body>
                                <InspectionDetail inspection={inspection} />
                                <AverageDetails id={inspection.inspectionId} />
                                <FramesDetail inspection={inspection} />
                                <Notes notes={inspection.notes} id={inspection.inspectionId} />
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </>
        }
    </div>;
};