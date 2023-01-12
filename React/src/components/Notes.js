import { useEffect, useState } from 'react';
import "../pages/Page.css";
function Notes(props) {
    const [newNotes, setNewNotes] = useState("");
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        setNewNotes(props.notes);
    }, [props.notes]);

    function handleChange(event) {
        setNewNotes(event.target.value,)
    };

    function handleSubmit() {
        setToggle(false);
    }

    return <div>
        <h2>Notes</h2>
            {newNotes.length===0 && !toggle &&
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