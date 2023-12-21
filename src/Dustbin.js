import { memo } from "react";
import { useDrop } from "react-dnd";
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

  // if (isActive) {
  //   backgroundColor = "darkgreen";
  // } else if (canDrop) {
  //   backgroundColor = "darkkhaki";
  // }
  return (
    <div>
      <div
        className={isActive ? "loadout_box_incoming_item" : "loadout_box_empty"}
        ref={drop}
        style={{
          backgroundColor: "none",
        }}
        data-testid="dustbin"
      >
        {lastDroppedItem && (
          <img
            src={img}
            className="gear_img"
            style={{ background: "none !important" }}
          />
        )}
      </div>
      {/* <div
        style={{
          textAlign: "center",
          color: "wheat",
          fontFamily: "Cabin, sans-serif",
          fontSize: "16px",
        }}
      >
        {isActive
          ? "Release to drop"
          : lastDroppedItem
          ? `${shortenTokenLength(lastDroppedItem["name"])}`
          : `${accept}`}
      </div>*/}
        </div> 
  );
});
