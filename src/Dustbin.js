import { memo } from "react";
import { useDrop } from "react-dnd";
import React, { useState } from 'react';
import "./App.css";

const style = {
  height: "12rem",
  width: "12rem",
  //marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  //padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
};

export const Dustbin = memo(function Dustbin({
  accept,
  lastDroppedItem,
  onDrop,
  onClick,
  img,
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      
    }),
  });
  const isActive = isOver && canDrop;

  let backgroundColor = "none";
  return (
      <div
        className={isActive ? "loadout_box_incoming_item" : "loadout_box_empty"}
        ref={drop}
        style={{
          backgroundColor: "none",
        }}
        onClick={onClick}
        data-testid="dustbin"
      >
        
        {lastDroppedItem && (
          <img
            src={img}
            className="gear_img"
          />
          
        )}
      </div>
  );
});
