import React from "react";
import "./App.css";

class SearchBar extends React.Component {
	state = { term: "" };

	constructor(props) {
		super(props);
	}

	OnTermChange = (event) => {
		this.setState({ term: event.target.value }, () => {
			this.props.OnInputSubmit(this.state.term.toLowerCase());
		});
	};

	OnSubmit = (event) => {
		event.preventDefault();
		this.props.OnInputSubmit(this.state.term);
	};

	render() {
		return (
			<div className="ui category search">
				{" "}
				<br />
				<div onSubmit={this.OnSubmit}>
					<label id="formHome"> {this.props.msg} </label>
					<input
						class="input"
						type="text"
						placeholder="Search Your Gear"
						value={this.state.term}
						onChange={this.OnTermChange}
					/>
					<i class="search icon"></i>
				</div>
			</div>
		);
	}
}

export default SearchBar;
