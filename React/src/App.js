import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NewInspection from "./pages/NewInspection";
import PastInspections from "./pages/PastInspections";
import Search from "./pages/Search";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="newInspection" element={<NewInspection />} />
          <Route path="pastInspections" element={<PastInspections />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
