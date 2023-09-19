import React from "react";
import Gallery from "./Pages/Gallery/Gallery";
import "./Pages/Gallery/Gallery.css";
import Search from "./components/Search/Search";

function App() {
  return (
    <div>
      <h1 className="mygallery">MY GALLERY</h1>
      <Gallery />
    </div>
  );
}

export default App;
