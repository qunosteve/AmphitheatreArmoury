import { memo } from "react";
import { useDrop } from "react-dnd";
import "./App.css";

const style = {
  height: "12rem",
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
};

const ImagePlaceHolders = {
  head:
    "https://cdn2.iconfinder.com/data/icons/rpg-fantasy-game-basic-ui/512/head_helmet_armor_warrior_knight_helm-512.png",
  shoulders:
    "https://cdn.iconscout.com/icon/free/png-256/shoulder-pads-4867477-4049103.png",
  torso:
    "https://cdn2.iconfinder.com/data/icons/rpg-fantasy-game-basic-ui/512/equipment_costume_armor_body_warrior_metal_knight_protection-512.png",
  arms:
    "https://cdn2.iconfinder.com/data/icons/rpg-fantasy-game-basic-ui/512/equipment_costume_armor_glove_hand_metal_knight_warrior_protection_2-512.png",
  legs:
    "https://cdn2.iconfinder.com/data/icons/rpg-fantasy-game-basic-ui/512/equipment_costume_armor_boot_foot_metal_knight_warrior_protection_leg_2-512.png",
  item0: "https://static.thenounproject.com/png/3401757-200.png",
  item1: "https://cdn-icons-png.flaticon.com/512/3455/3455304.png",
  item2: "https://static.thenounproject.com/png/1121420-200.png",
  item3: "https://freesvg.org/img/Scroll2Blank.png",
  horse: "http://cdn.onlinewebfonts.com/svg/img_91457.png",
  saddle: "https://freesvg.org/img/warszawianka_Jumping_horse_outline_2.png",
};
export const Dustbin = memo(function Dustbin({
  accept,
  lastDroppedItem,
  onDrop,
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
        className={isActive ? "small_box_body_ready" : "small_box_body"}
        ref={drop}
        style={{
          backgroundColor: lastDroppedItem ? "#963a3a" : "none",
        }}
        data-testid="dustbin"
      >
        {lastDroppedItem && (
          <img
            src={ImagePlaceHolders[accept]}
            className="loadout_img"
            style={{ background: "none !important" }}
          />
        )}
      </div>
      <div style={{ textAlign: "center", color: "wheat" }}>
        {isActive
          ? "Release to drop"
          : lastDroppedItem
          ? `${JSON.stringify(lastDroppedItem["name"])}`
          : `${accept}`}
      </div>
    </div>
  );
});
