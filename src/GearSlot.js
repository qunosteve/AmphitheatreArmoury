import React, { useState } from 'react';
import './GearSlot.css'; // Import your CSS file for styling

const GearSlot = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={`gear-slot ${isHovered ? 'hovered' : ''}`} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      <div className="center-icon">Center</div>
      <div className="radial-icons">
        <div className="icon" data-text="Stats">Stats</div>
        <div className="icon" data-text="Craft">Craft</div>
        <div className="icon" data-text="Buy">Buy</div>
        <div className="icon" data-text="Equip">Equip</div>
        <div className="icon" data-text="Decorate">Decorate</div>
      </div>
    </div>
  );
};

export default GearSlot;
