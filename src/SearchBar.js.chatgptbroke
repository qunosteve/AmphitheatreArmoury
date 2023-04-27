import React from "react";
import "./App.css";

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { term: "" };
	}

	onTermChange = ({ target: { value } }) => {
		this.setState({ term: value.toLowerCase() }, () => {
			this.props.onInputSubmit(this.state.term);
		});
	};

	onSubmit = (event) => {
		event.preventDefault();
		this.props.onInputSubmit(this.state.term);
	};

	render() {
		return (
			<div className="ui category search">
				<br />
				<form onSubmit={this.onSubmit}>
					<label id="formHome">{this.props.msg}</label>
					<input
						className="input"
						type="text"
						placeholder="search your gear"
						value={this.state.term}
						onChange={this.onTermChange}
					/>
					<i className="search icon"></i>
				</form>
			</div>
		);
	}
}

export default SearchBar;
