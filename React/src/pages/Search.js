import React, { useState } from 'react';
import Header from '../components/Header';
import "./Page.css";
import { SearchResultsSingle, SearchResultsMinMax } from '../components/SearchResults';
import { getInspectionsBetweenDates } from '../Services/InspectionService';
import { weatherConditions } from '../components/Arrays';
import {  Alert } from 'react-bootstrap';

function Search(props) {

    function getBetweenDates() {
        getInspectionsBetweenDates(dateSearch.startDate, dateSearch.endDate)
            .then((result) => {
                setInspectionList(result);
            });
            setDatesSet(true);
    }

    const [inspectionList, setInspectionList] = useState([]);
    const [datesSet, setDatesSet] = useState(false);
    const [notesSearchTerm, setNotesSearchTerm] = useState("");
    const [weatherSearchTerm, setWeatherSearchTerm] = useState("");
    const [tempSearch, setTempSearch] = useState({
        minTemp: "",
        maxTemp: ""
    });
    const [dateSearch, setDateSearch] = useState({
        startDate: "",
        endDate: ""
    })

    function setTemps(number, position) {
        if (position === "min") {
            setTempSearch({
                minTemp: number,
                maxTemp: tempSearch.maxTemp
            });
        } else {
            setTempSearch({
                minTemp: tempSearch.minTemp,
                maxTemp: number
            });
        }
    }

    function setDates(date, position) {
        if (position === "start") {
            setDateSearch({
                startDate: date,
                endDate: dateSearch.endDate
            })
        } else {
            setDateSearch({
                startDate: dateSearch.startDate,
                endDate: date
            })
        }
    }

    function clearDateRange() {
        setDateSearch({
            startDate: "",
            endDate: ""
        });
        setInspectionList([]);
        setDatesSet(false);
        setNotesSearchTerm("");
        setWeatherSearchTerm("");
        setTempSearch({
            minTemp: "",
            maxTemp: ""
        });
    }

    function clearSearchTerms() {
        setNotesSearchTerm("");
        setWeatherSearchTerm("");
        setTempSearch({
            minTemp: "",
            maxTemp: ""
        });
    }

    const hasNotes = inspectionList.filter(inspection => {
        return inspection.notes !== null;
    })

    const searchNotes = hasNotes.filter(inspection => {
        return inspection.notes.toLowerCase().includes(notesSearchTerm.toLowerCase());
    });

    const searchWeather = inspectionList.filter(inspection => {
        return inspection.weatherCondition.toLowerCase().includes(weatherSearchTerm.toLowerCase());
    });

    const searchTemperature = inspectionList.filter(inspection => {
        if (tempSearch.minTemp !== "" && tempSearch.maxTemp !== "") {
            return (inspection.weatherTemp >= tempSearch.minTemp && inspection.weatherTemp <= tempSearch.maxTemp);
        } else {
            return inspectionList
        }
    })


    return <div>
        <Header />
        <main>
            <button className='button red right' onClick={clearDateRange}>Clear Date Range</button>
            <h2>Step 1: Select date range, then hit GO</h2>
            <label for="startDate">Dates between </label>
            <input
                type="date"
                id="startDate"
                value={dateSearch.startDate}
                onChange={e => setDates(e.target.value, "start")}
            />
            <label for="endDate"> and </label>
            <input
                type="date"
                id="endDate"
                value={dateSearch.endDate}
                onChange={e => setDates(e.target.value, "end")}
            />
            <button onClick={getBetweenDates} className='button green'>Go</button>
            {dateSearch.startDate!=="" && dateSearch.endDate!=="" && datesSet &&
                <Alert key="success" variant="success">{inspectionList.length} inspections with dates between {dateSearch.startDate} and {dateSearch.endDate}</Alert>
            }
            
            <hr />
            <button className='button red right' onClick={clearSearchTerms}>Clear Search Inputs</button>
            <h2>Step 2: Choose what to search for</h2>
            <label for="notesSearch"><h3>Search notes: </h3></label>
            <input
                type="text"
                id="notesSearch"
                onChange={e => setNotesSearchTerm(e.target.value)}
                value={notesSearchTerm}
                placeholder="search"
                className='searchBox'
            />
            <br />
            <h3>Search Weather</h3>
            <Select
                label="Condition: "
                options={weatherConditions}
                value={weatherSearchTerm}
                onChange={e => setWeatherSearchTerm(e.target.value)}
            />
            <br />
            <br />
            <label for="minTemp">Temperature between </label>
            <input
                type="number"
                id="minTemp"
                value={tempSearch.minTemp}
                placeholder="#"
                onChange={e => setTemps(e.target.value, "min")}
            />
            <label for="maxTemp"> and </label>
            <input
                type="number"
                id="maxTemp"
                value={tempSearch.maxTemp}
                placeholder="#"
                onChange={e => setTemps(e.target.value, "max")}
            />
            <hr />
            <h2>Step 3: Results</h2>
            <SearchResultsSingle searchTerm={notesSearchTerm} inspections={searchNotes} datesSet={datesSet} />
            <SearchResultsSingle searchTerm={weatherSearchTerm} inspections={searchWeather} datesSet={datesSet}/>
            <SearchResultsMinMax min={tempSearch.minTemp} max={tempSearch.maxTemp} term="temperatures" inspections={searchTemperature} datesSet={datesSet} />
        </main>
    </div>;
};

function Select({ label, value, options, onChange }) {
    return <label>
        {label}
        <select value={value} onChange={onChange}>
            {options.map((option) => (
                <option value={option.value}>{option.label}</option>
            ))}
        </select>
    </label>
}

export default Search;