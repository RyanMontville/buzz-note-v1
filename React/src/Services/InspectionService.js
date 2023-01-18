
/***************************************** GETS *****************************************/
export function getListOfInspections() {
  return fetch('http://localhost:9000/inspections').then(res => res.json());
}

export function getFramesForId(id) {
  return fetch(`http://localhost:9000/inspection/${id}/frames`).then(res => res.json());
}

/**************************************** Posts *****************************************/
export function startNewInspection() {
  return fetch('http://localhost:9000/inspections',{
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({})
   }).then(data => data.json())
}

export function addNewFrame(frame) {
  return fetch('http://localhost:9000/frames',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify( frame )
  }).then(data => data.json())
}

/***************************************** PUTS *****************************************/

export function updateNotes(id, notes) {
  return fetch(`http://localhost:9000/inspections/${id}/notes`,{
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: notes
  }).then(data => data.json())
}

export function fillRestOfInspection(inspection) {
  return fetch(`http://localhost:9000/inspections`,{
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify( inspection )
  }).then(data => data.json())
}