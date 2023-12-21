import React from "react";
import "./SpinKit.css";
import Logo from "./images/newamphilogo_beige_notext.png";

const Loading = (props) => {
	return (
		<div className="sk-grid-position" style={{ position: 'relative', backgroundColor: 'transparent' }}>
		  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
			<img src={Logo} alt="Logo" style={{ width: '600px' }} />
		  </div>
		  <div className="sk-grid" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50px', height: '50px'}}>
			<div className="sk-grid-cube"></div>
			<div className="sk-grid-cube"></div>
			<div className="sk-grid-cube"></div>
			<div className="sk-grid-cube"></div>
			<div className="sk-grid-cube"></div>
			<div className="sk-grid-cube"></div>
			<div className="sk-grid-cube"></div>
			<div className="sk-grid-cube"></div>
			<div className="sk-grid-cube"></div>
		  </div>
		</div>
	);
  };
  
  

Loading.defaultProps = {
	message: "Loading...",
};

export default Loading;
