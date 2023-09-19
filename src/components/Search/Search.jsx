import React from "react";
import "./Search.css";
import { Select } from "antd";
import imageList from "../../data";

const Search = ({ onFilterImages }) => {
  const options = [];
  const allTags = new Set();

  // Extract all unique tags from your image data
  imageList.forEach((image) => {
    image.tags.forEach((tag) => {
      allTags.add(tag);
    });
  });

  // Create options for the Select component with the tags
  allTags.forEach((tag) => {
    options.push({
      value: tag,
      label: tag,
    });
  });

  const handleChange = (selectedTags) => {
    // Pass the selected tags to the parent component for filtering
    onFilterImages(selectedTags);
  };

  return (
    <Select
      mode="tags"
      style={{
        width: "400px",
        height: "10%",
        marginBottom: "90px",
        border: "3px solid black",
        borderRadius: "10px",
      }}
      placeholder="Search"
      onChange={handleChange}
      options={options}
      className="search"
    />
  );
};

export default Search;
