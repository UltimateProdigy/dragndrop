import React from "react";
import "./Pages/Gallery/Gallery.css";
import Login from "./Pages/Login/Login";
import Gallery from "./Pages/Gallery/Gallery";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
