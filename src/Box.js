import { memo } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import "./App.css";

const style = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left",
};
export const Box = memo(function Box({ name, type, isDropped, img, amount, onClick }) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.1 : 1,
      }),
    }),
    [name, type]
  );
  return (
    <div ref={drag} onClick={onClick} data-testid="box" className="inventory_box">
      <img src={img} className="gear_img" />
      {amount > 1 && <div className="amount">{amount}</div> }
    </div>
    
  );
});


