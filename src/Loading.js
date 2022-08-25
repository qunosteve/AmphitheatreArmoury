import React from "react";
import "./SpinKit.css";
import Logo from "./images/logo-apes.png";

const Loading = (props) => {
	return (
		<div>
			<div className="sk-grid-position">
				<div class="sk-grid">
					<div class="sk-grid-cube"></div>
					<div class="sk-grid-cube"></div>
					<div class="sk-grid-cube"></div>
					<div class="sk-grid-cube"></div>
					<div class="sk-grid-cube"></div>
					<div class="sk-grid-cube"></div>
					<div class="sk-grid-cube"></div>
					<div class="sk-grid-cube"></div>
					<div class="sk-grid-cube"></div>
				</div>
				<div>
					<img
						src={Logo}
						style={{
							width: "200px",
							marginLeft: "-118px",
							marginTop: "-165px",
							zIndex: "99",
						}}
					/>{" "}
				</div>
			</div>
		</div>
	);
};

Loading.defaultProps = {
	message: "Loading...",
};

export default Loading;
