import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import "./Page.css";
import SearchResults from '../components/SearchResults';
import { getListOfInspections } from '../Services/InspectionService';

function Search(props) {
    const [inspectionList, setInspectionList] = useState([]);
    const [notesSearchTerm, setNotesSearchTerm] = useState("");
    const [weatherSearchTerm, setWeatherSearchTerm] = useState("");

    useEffect(() => {
        getListOfInspections()
            .then((result) => {
                setInspectionList(result);
            })
    });

    const hasNotes = inspectionList.filter(inspection => {
        return inspection.notes !== null;
    })

    const searchNotes = hasNotes.filter(inspection => {
        return inspection.notes.toLowerCase().includes(notesSearchTerm.toLowerCase());
    });

    const searchWeather = inspectionList.filter(inspection => {
        return inspection.weatherCondition.toLowerCase().includes(weatherSearchTerm.toLowerCase());
    });

    return <div>
        <Header />
        <main>
            <label for="notesSearch">Search notes: </label>
            <input
                    type="text"
                    id="notesSearch"
                    onChange={e => setNotesSearchTerm(e.target.value)}
                    value={notesSearchTerm}
                    placeholder="search"
                    className='searchBox'
                />
            <label for="weatherSearch">Search weather: </label>
            <input
                    type="text"
                    id="weatherSearch"
                    onChange={e => setWeatherSearchTerm(e.target.value)}
                    value={weatherSearchTerm}
                    placeholder="search"
                    className='searchBox'
                />
            <SearchResults searchTerm={notesSearchTerm} inspections={searchNotes} />
            <SearchResults searchTerm={weatherSearchTerm} inspections={searchWeather} />
        </main>
    </div>;
};

export default Search;