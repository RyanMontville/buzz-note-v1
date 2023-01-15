import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import "./Page.css";
function Home(props) {

    return <div>
        <Header />
        <main>
            <section className="button-group-column">
                <Link to="/newInspection" className="large full button green">Start a New Inspection</Link>
                <Link to="/pastInspections" className="large full button orange">View Past Inspections</Link>
            </section>
        </main>
    </div>;
};

export default Home;