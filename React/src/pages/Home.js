import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Notes from '../components/Notes';
import "./Page.css";
const Home = (props) => {

    return <div>
        <Header />
        <main>
            <section className="button-group-column">
                <Link to="/newInspection" className="full button">Start a New Inspection</Link>
                <Link to="/pastInspections" className="full button">View Past Inspections</Link>
            </section>
        </main>
    </div>;
};

export default Home;