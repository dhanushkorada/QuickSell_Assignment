import React, { useState } from "react";
import { Down, Display } from "./Icons";

import "../styles/Header.css";

function Header({ setGroupBy, setSortBy }) {
	const [showOptions, setShowOptions] = useState(false);

	const handleDisplayClick = () => {
		setShowOptions(!showOptions);
	};

	return (
		<div className="header">
			<button onClick={handleDisplayClick} className="display-button">
				<Display />
				Display
				<Down />
			</button>
			{showOptions && (
				<div className="options-box">
					<div className="group-by">
						<label htmlFor="groupBy">Group by:</label>
						<select
							id="groupBy"
							onChange={(e) => setGroupBy(e.target.value)}
							defaultValue="status"
						>
							<option value="status">Status</option>
							<option value="user">User</option>
							<option value="priority">Priority</option>
						</select>
					</div>

					<div className="sort-by">
						<label htmlFor="sortBy">Sort by:</label>
						<select
							id="sortBy"
							onChange={(e) => setSortBy(e.target.value)}
							defaultValue="priority"
						>
							<option value="priority">Priority</option>
							<option value="title">Title</option>
						</select>
					</div>
				</div>
			)}
		</div>
	);
}

export default Header;
