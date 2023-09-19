import React, { useState, useCallback, useRef } from "react";
import "./Gallery.css";
import imageList from "../../data";
import { useDrag, useDrop } from "react-dnd";
import { Tag } from "antd";

// Function to generate consistent colors based on the tag name
function getColorForTag(tag) {
  const hash = tag.split("").reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

const Card = ({ src, title, id, index, moveImage, tags }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "image",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      const dx = hoverClientX - hoverMiddleX;
      const dy = hoverClientY - hoverMiddleY;

      moveImage(dragIndex, hoverIndex, dx, dy);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} className="card">
      <img src={src} alt={title} />
      <div className="tags">
        {tags.map((tag, tagIndex) => (
          <Tag key={tagIndex} style={{ backgroundColor: getColorForTag(tag) }} className="tag">
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
};

const Gallery = () => {
  const [images, setImages] = useState(imageList);

  const moveImage = useCallback((dragIndex, hoverIndex, dx, dy) => {
    setImages((prevCards) => {
      const clonedCards = [...prevCards];
      const removedItem = clonedCards.splice(dragIndex, 1)[0];
      clonedCards.splice(hoverIndex, 0, removedItem);
      return clonedCards;
    });
  }, []);

  return (
    <div className="gallery">
      {images.map((image, index) => (
        <Card
          className="card"
          key={image.id}
          src={image.img}
          title={image.title}
          id={image.id}
          index={index}
          moveImage={moveImage}
          tags={image.tags}
        />
      ))}
    </div>
  );
};

export default Gallery;
