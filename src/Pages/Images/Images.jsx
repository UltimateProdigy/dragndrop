import React, { useEffect, useState } from "react";
import "./Images.css";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Images = () => {
  const UNSPLASH_BASE_URL = "https://api.unsplash.com/photos";
  const ACCESS_KEY = "rfYM405ooQVWaQSVVgQRC0rx16qqTX_eUEPbLDHelBU";
  const [images, setImages] = useState([]);

  const getImages = async () => {
    try {
      const response = await axios.get(`${UNSPLASH_BASE_URL}`, {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
      });
      setImages(response.data);
    } catch (err) {
      console.log("There was an error getting images", err);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    console.log(result)

    const reorderedItems = [...images];
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setImages(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="images">
        {(provided) => (
          <div
            className="images"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {images.map((image, index) => (
              <Draggable key={image.id} draggableId={image.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <img src={image.urls.small} alt={image.alt_description} />
                    <h1 className="imagename">{image.alt_description}</h1>
                    <h3 className="imagename">❤️ {image.likes}</h3>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Images;
