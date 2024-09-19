import React, { useState, useEffect } from "react";
import {
	Threedot,
	Add,
	Backlog,
	Canceled,
	Done,
	Todo,
	Inprog,
	Urg,
	High,
	Med,
	Low,
	No,
	Urg_col,
} from "./Icons";
import TicketCard from "./TicketCard";
import Header from "./Header";
import { fetchTickets } from "../utils/api";
import "../styles/Column.css";

const statusIcons = {
	Backlog: <Backlog />,
	Todo: <Todo />,
	"In progress": <Inprog />,
	Done: <Done />,
	Canceled: <Canceled />,
};

const priorityIcons = {
	4: { icon: <Urg_col />, name: "Urgent" },
	3: { icon: <High />, name: "High" },
	2: { icon: <Med />, name: "Medium" },
	1: { icon: <Low />, name: "Low" },
	0: { icon: <No />, name: "None" },
};

function KanbanBoard() {
	const [tickets, setTickets] = useState([]);
	const [users, setUsers] = useState([]);
	const [groupBy, setGroupBy] = useState("status");
	const [sortBy, setSortBy] = useState("priority");

	useEffect(() => {
		fetchTickets()
			.then((data) => {
				if (
					data &&
					Array.isArray(data.tickets) &&
					Array.isArray(data.users)
				) {
					setTickets(data.tickets);
					setUsers(data.users);
				} else {
					console.error("Unexpected API structure:", data);
					setTickets([]);
				}
			})
			.catch((error) => {
				console.error("Error fetching tickets:", error);
				setTickets([]);
			});
	}, []);

	const getUserName = (userId) => {
		const user = users.find((user) => user.id === userId);
		return user ? user.name : "Unknown User";
	};

	const sortedTickets = [...tickets].sort((a, b) => {
		if (sortBy === "priority") {
			return b.priority - a.priority;
		} else if (sortBy === "title") {
			return a.title.localeCompare(b.title);
		}
		return 0;
	});

	const statuses = ["Backlog", "Todo", "In progress", "Done", "Canceled"];

	const groupedTickets = sortedTickets.reduce((groups, ticket) => {
		let groupKey;
		if (groupBy === "status") {
			groupKey = ticket.status;
		} else if (groupBy === "user") {
			groupKey = getUserName(ticket.userId);
		} else if (groupBy === "priority") {
			groupKey = ticket.priority;
		}

		if (!groups[groupKey]) {
			groups[groupKey] = [];
		}
		groups[groupKey].push(ticket);
		return groups;
	}, {});

	return (
		<div>
			<Header setGroupBy={setGroupBy} setSortBy={setSortBy} />
			<div className="kanban-board">
				{groupBy === "status"
					? statuses.map((status) => (
							<div key={status} className="kanban-column">
								<div className="header-row">
									<div className="status-title">
										{statusIcons[status]}
										<h3>{status}</h3>
									</div>
									<div className="right-icons">
										<Add />
										<Threedot />
									</div>
								</div>
								{groupedTickets[status] &&
								groupedTickets[status].length > 0 ? (
									groupedTickets[status].map((ticket) => (
										<TicketCard
											key={ticket.id}
											ticket={ticket}
											user={getUserName(ticket.userId)}
										/>
									))
								) : (
									<p></p>
								)}
							</div>
					  ))
					: groupBy === "priority"
					? Object.keys(groupedTickets).map((priority) => (
							<div key={priority} className="kanban-column">
								<div className="header-row">
									<div className="status-title">
										{priorityIcons[priority].icon}
										<h3>{priorityIcons[priority].name}</h3>
									</div>
									<div className="right-icons">
										<Add />
										<Threedot />
									</div>
								</div>
								{groupedTickets[priority].map((ticket) => (
									<TicketCard
										key={ticket.id}
										ticket={ticket}
										user={getUserName(ticket.userId)}
									/>
								))}
							</div>
					  ))
					: Object.keys(groupedTickets).map((userName) => (
							<div key={userName} className="kanban-column">
								<div className="header-row">
									<div className="status-title">
										<div className="user-avatar">
											{userName[0]}
										</div>
										<h3>{userName}</h3>
									</div>
									<div className="right-icons">
										<Add />
										<Threedot />
									</div>
								</div>
								{groupedTickets[userName].map((ticket) => (
									<TicketCard
										key={ticket.id}
										ticket={ticket}
										user={getUserName(ticket.userId)}
									/>
								))}
							</div>
					  ))}
			</div>
		</div>
	);
}

export default KanbanBoard;
