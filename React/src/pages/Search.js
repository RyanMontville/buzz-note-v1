import React, { useState } from 'react';
import Header from '../components/Header';
import "./Page.css";
import { SearchResults } from '../components/SearchResults';
import { getInspectionsBetweenDates } from '../Services/InspectionService';
import { weatherConditions } from '../components/Arrays';
import { Alert } from 'react-bootstrap';

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
    const [includeNotes, setIncludeNotes] = useState(false);
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
    });

    const includeNotesInSearch = hasNotes.filter(inspection => {
        if (tempSearch.minTemp !== "" && tempSearch.maxTemp !== "") {
            return inspection.weatherCondition.includes(weatherSearchTerm) && inspection.weatherTemp >= tempSearch.minTemp && inspection.weatherTemp <= tempSearch.maxTemp && inspection.notes.toLowerCase().includes(notesSearchTerm.toLowerCase());
        } else {
            return inspection.weatherCondition.toLowerCase().includes(weatherSearchTerm.toLowerCase()) && inspection.notes.toLowerCase().includes(notesSearchTerm.toLowerCase());
        }

    });

    const excludeNotesInSearch = inspectionList.filter(inspection => {
        if (tempSearch.minTemp !== "" && tempSearch.maxTemp !== "") {
            return inspection.weatherCondition.includes(weatherSearchTerm) && inspection.weatherTemp >= tempSearch.minTemp && inspection.weatherTemp <= tempSearch.maxTemp;
        } else {
            return inspection.weatherCondition.toLowerCase().includes(weatherSearchTerm.toLowerCase());
        }

    })

    return <div>
        <Header />
        <main>
            <button className='button red right' onClick={clearDateRange}>Clear Date Range</button>
            <h2>Select date range</h2>
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
            {datesSet && inspectionList.length > 0 &&
                <Alert key="success" variant="success">{inspectionList.length} inspections with dates between {dateSearch.startDate} and {dateSearch.endDate}</Alert>
            }
            {datesSet && inspectionList.length === 0 &&
                <Alert key="danger" variant="danger">{inspectionList.length} inspections with dates between {dateSearch.startDate} and {dateSearch.endDate}</Alert>
            }
            {datesSet && inspectionList.length > 0 &&
                <>
                    <button className='button red right' onClick={clearSearchTerms}>Clear Search Inputs</button>
                    <section className='include-notes'>
                        <label for="notesSearch"><h3>Search Notes: </h3></label>
                        <RadioButton label="Yes" value={includeNotes === true} name="include-notes" color="green" id="iny" onChange={e => setIncludeNotes(true)} />
                        <RadioButton label="No" value={includeNotes === false} name="include-notes" color="red" id="inn" onChange={e => setIncludeNotes(false)} />
                    </section>
                    {includeNotes && 
                        <input
                        type="text"
                        id="notesSearch"
                        onChange={e => setNotesSearchTerm(e.target.value)}
                        value={notesSearchTerm}
                        placeholder="Search Notes"
                        className='searchBox gap-10-0'
                    />
                    }
                    
                    <h3>Search Weather: </h3>
                    <section className='searchGroup'>
                        <Select
                            label="Condition: "
                            options={weatherConditions}
                            value={weatherSearchTerm}
                            onChange={e => setWeatherSearchTerm(e.target.value)}
                        />
                        <div>
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
                        </div>
                    </section>
                    {includeNotes 
                        ? <SearchResults inspections={includeNotesInSearch} numWithNotes={hasNotes.length} />
                        : <SearchResults inspections={excludeNotesInSearch} numWithNotes={hasNotes.length}/>
                    }
                    
                </>
            }
        </main>
    </div>;
};

function Select({ label, value, options, onChange, className }) {
    return <label>
        {label}
        <select value={value} onChange={onChange} className={className}>
            {options.map((option) => (
                <option value={option.value}>{option.label}</option>
            ))}
        </select>
    </label>
}

function RadioButton({ label, id, value, name, color, onChange }) {
    return (
        <>
            <input type="radio" checked={value} name={name} id={id} onChange={onChange} />
            <label for={id} className={`button ${color} half gap-0-10`}>{label}</label>
        </>

    );
};

export default Search;