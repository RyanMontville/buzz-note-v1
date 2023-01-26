import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import loadingBee from "./loading.gif";
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NewInspection from "./pages/NewInspection";
import PastInspections from "./pages/PastInspections";
import Search from "./pages/Search";

export const LoadingContext = React.createContext();

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      {loading &&
        <div id="loading-screen"><img src={loadingBee} alt="" /></div>
      }
      <LoadingContext.Provider value={setLoading}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/newInspection/:id" element={<NewInspection />} />
            <Route path="/pastInspections" element={<PastInspections />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </BrowserRouter>
      </LoadingContext.Provider>
    </div>
  );
}

export default App;
