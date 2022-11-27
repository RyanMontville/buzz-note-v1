const notesTextbox = document.getElementById('notesTextbox');
const notesP = document.getElementById('displayNotes');
const addNotes = document.getElementById('addNotes');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const inspection = [
    { 
        date: '11/1/2022 3:00:00', 
        weather: '85 Sunny', 
        beeTemperament: 'Calm', 
        beePopulation: 'Normal', 
        dronePopulation: 'Crowded', 
        layingPattern: 'good', 
        hiveBeetles: 'none', 
        otherPest: 'Few', 
        notes: 'This is notes #1',
        hasFramesThree: true,
        hasFramesTwo: true,
        hasFramesOne: true
     },
    { 
        date: '11/5/2022 1:32:42', 
        weather: '32 Snow', 
        beeTemperament: 'Angry', 
        beePopulation: 'Low', 
        dronePopulation: 'Normal', 
        layingPattern: 'Spotty', 
        hiveBeetles: 'Few', 
        otherPest: 'Lots', 
        notes: 'Now showing notes #2',
        hasFramesThree: false,
        hasFramesTwo: true,
        hasFramesOne: true
     },
    { 
        date: '11/10/2022 5:42:59',
        weather: '75 Cloudy', 
        beeTemperament: 'Nervous', 
        beePopulation: 'Crowded', 
        dronePopulation: 'Low', 
        layingPattern: 'Good', 
        hiveBeetles: 'Many', 
        otherPest: 'None', 
        notes: 'Here are the notes for #3',
        hasFramesThree: false,
        hasFramesTwo: false,
        hasFramesOne: true
     },
    { 
        date: '11/12/2022 12:03:03', 
        weather: '42 Windy', 
        beeTemperament: 'Crazy', 
        beePopulation: 'Normal', 
        dronePopulation: 'Normal', 
        layingPattern: 'Spotty', 
        hiveBeetles: 'None', 
        otherPest: 'Few', 
        notes: '0',
        hasFramesThree: true,
        hasFramesTwo: true,
        hasFramesOne: true
     }
];
const framesOneThree = [
    { inspectionId: 1, boxNum: 3, frameName: '1A',honey: 'Full', nectar: 'None', brood: 'Eggs Pupae', cells: 'Queen', combPattern: 'Good'},
    { inspectionId: 1, boxNum: 3, frameName: '1B',honey: '2/3', nectar: '1/3', brood: 'Larve Pupae', cells: 'Super', combPattern: 'Burr'},
    { inspectionId: 1, boxNum: 3, frameName: '2A',honey: '1/3', nectar: '2/3', brood: 'Pupae', cells: 'Queen Super', combPattern: 'Good'},
    { inspectionId: 1, boxNum: 3, frameName: '2B',honey: 'None', nectar: 'Full', brood: 'None', cells: 'None', combPattern: 'Burr'}
];
const framesOneTwo = [
    { inspectionId: 1, boxNum: 2, frameName: '1A',honey: 'Full', nectar: 'None', brood: 'Eggs Pupae', cells: 'Queen', combPattern: 'Good'},
    { inspectionId: 1, boxNum: 2, frameName: '1B',honey: '2/3', nectar: '1/3', brood: 'Larve Pupae', cells: 'Super', combPattern: 'Burr'},
    { inspectionId: 1, boxNum: 2, frameName: '2A',honey: '1/3', nectar: '2/3', brood: 'Pupae', cells: 'Queen Super', combPattern: 'Good'},
    { inspectionId: 1, boxNum: 2, frameName: '2B',honey: 'None', nectar: 'Full', brood: 'None', cells: 'None', combPattern: 'Burr'}
];
const framesOneOne = [
    { inspectionId: 1, boxNum: 1, frameName: '1A',honey: 'Full', nectar: 'None', brood: 'Eggs Pupae', cells: 'Queen', combPattern: 'Good'},
    { inspectionId: 1, boxNum: 1, frameName: '1B',honey: '2/3', nectar: '1/3', brood: 'Larve Pupae', cells: 'Super', combPattern: 'Burr'},
    { inspectionId: 1, boxNum: 1, frameName: '2A',honey: '1/3', nectar: '2/3', brood: 'Pupae', cells: 'Queen Super', combPattern: 'Good'},
    { inspectionId: 1, boxNum: 1, frameName: '2B',honey: 'None', nectar: 'Full', brood: 'None', cells: 'None', combPattern: 'Burr'}
];
const frames = [framesOneThree,framesOneTwo,framesOneOne];
let current = inspection.length - 1;
let currentInspection;


function setDateTime(inspectionObj) {
    const dateTime = document.getElementById('dateTime');
    dateTime.innerText = inspectionObj.date;
}

function setInspectionInfo(inspectionObj) {
    const info = document.getElementById('infoHeader');
    info.innerHTML = "";
    const weather = document.createElement('td');
    weather.innerText = inspectionObj.weather;
    infoHeader.insertAdjacentElement('beforeend', weather);
    const bTemperament = document.createElement('td');
    bTemperament.innerText = inspectionObj.beeTemperament;
    infoHeader.insertAdjacentElement('beforeend', bTemperament);
    const bPopulation = document.createElement('td');
    bPopulation.innerText = inspectionObj.beePopulation;
    infoHeader.insertAdjacentElement('beforeend', bPopulation);
    const dPopulation = document.createElement('td');
    dPopulation.innerText = inspectionObj.dronePopulation;
    infoHeader.insertAdjacentElement('beforeend', dPopulation);
    const laying = document.createElement('td');
    laying.innerText = inspectionObj.layingPattern;
    infoHeader.insertAdjacentElement('beforeend', laying);
    const hBeetles = document.createElement('td');
    hBeetles.innerText = inspectionObj.hiveBeetles;
    infoHeader.insertAdjacentElement('beforeend', hBeetles);
    const oPests = document.createElement('td');
    oPests.innerText = inspectionObj.otherPest;
    infoHeader.insertAdjacentElement('beforeend', oPests);
}

function showHideBoxes(inspectionObj){ 
    const framesGoHere = document.getElementById('framesGoHere');
    const boxThree = document.getElementById('boxThree');
    const boxTwo = document.getElementById('boxTwo');
    const boxOne = document.getElementById('boxOne');

    //if statements for hasFramesThree, hasFramesTwo, hasFramesOne to hide
}

function setInspectionTable(frameArray) {
    //create rows for every frame in the box
}


function setNotes(inspectionObj) {
    let currentNotes;
    if(inspectionObj.notes==0){
        currentNotes = 'No notes';
    } else {
        currentNotes = inspectionObj.notes;
    }
    notesP.innerText = currentNotes;
    notesTextbox.innerText = currentNotes;
}

function toggleNotesTextbox() {
    notesTextbox.classList.toggle('display-none');
    notesP.classList.toggle('display-none');
}

function toggleNavBtn() {
    if (current == inspection.length - 1) {
        next.disabled = true;
        next.classList.add('grey');
    } else {
        next.disabled = false;
        next.classList.remove('grey');
    }
    if (current == 0) {
        previous.disabled = true;
        previous.classList.add('grey');
    } else {
        previous.disabled = false;
        previous.classList.remove('grey');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    currentInspection = inspection[current];
    setDateTime(currentInspection);
    toggleNavBtn();
    setInspectionInfo(currentInspection);
    setInspectionTable(frames);
    //make a function for setInspectionTable
    setNotes(currentInspection);

    addNotes.addEventListener('click', (event) => {
        toggleNotesTextbox();
        if (notesP.classList.contains('display-none')) {
            addNotes.innerText = 'Submit';

        } else {
            addNotes.innerText = 'Add Notes';
        }
    });

    previous.addEventListener('click', (event) => {
        current--;
        toggleNavBtn();
        currentInspection = inspection[current];
        setDateTime(currentInspection);
        setInspectionInfo(currentInspection);
        //make a function for setInspectionTable
        setNotes(currentInspection);
    });
    next.addEventListener('click', (event) => {
        current++;
        toggleNavBtn();
        currentInspection = inspection[current];
        setDateTime(currentInspection);
        setInspectionInfo(currentInspection);
        //make a function for setInspectionTable
        setNotes(currentInspection);
    })

    //add if/else statements to determine if prev/next should be displayed based on if the current inspection is at the beginning or end of the array

    //make a function to call for the list of frames based on inspectionId and boxNum

    //add event listeners for prev/next buttons and have it call the set functions again 

});