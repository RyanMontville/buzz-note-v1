import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import "../pages/Page.css";
import { updateNotes } from '../Services/InspectionService';

function Notes(props) {
    const [newNotes, setNewNotes] = useState("");
    const [toggle, setToggle] = useState(false);
    const [updateAlert, setUpdateAlert] = useState(false);

    useEffect(() => {
        setNewNotes(props.notes);
    }, [props.notes]);

    function handleChange(event) {
        setNewNotes(event.target.value,)
    };

    function handleSubmit() {
        setToggle(false);
        updateNotes(props.id,newNotes)
            .then(data => {
                setNewNotes(data);
                setUpdateAlert(true);
                setTimeout(() => {
                    setUpdateAlert(false);
                  }, 2000)
            });
    }

    return <div>
        <h2>Notes</h2>
        {updateAlert &&
            <Alert key="success" variant="success">#{props.id} note's were updated to {newNotes}</Alert>
        }
        {newNotes === null && !toggle &&
            <p>No Notes</p>
        }
        {(toggle) ? (
            <div>
                <textarea
                    className='textbox'
                    id="notesTextbox"
                    onChange={handleChange}
                    value={newNotes}
                ></textarea>
                <section className='form-buttons'>
                    <button className='button' onClick={() => setToggle(false)}>Cancel</button>
                    <button className='button' onClick={handleSubmit}>Submit</button>
                </section>
            </div>
        ) : (
            <div>
                <p>{newNotes}</p>
                <button className='button' onClick={() => setToggle(true)}>Add Notes</button>
            </div>
        )}
    </div>;
};

export default Notes;