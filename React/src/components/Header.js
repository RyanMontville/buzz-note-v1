import React from 'react';
import { Link } from "react-router-dom";
import "./Header.css"

const Header = (props) => {

  return <div>
    <header>
        <h1>Bee Tracker</h1>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/newInspection">New Inspection</Link>
            <Link to="/pastInspections">View Past Inspections</Link>
            <i class="fa-solid fa-magnifying-glass"></i>
            <a href="https://github.com/RyanMontville/Bee-Inspection" target="_blank" rel="noreferrer"><i class="fa-brands fa-github"></i></a>
        </nav>
    </header>
  </div>;
};

export default Header;