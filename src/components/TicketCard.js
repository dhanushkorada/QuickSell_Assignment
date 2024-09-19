import React from "react";
import "../styles/TicketCard.css";
import { High, Med, Low, No, Urg } from "./Icons";

function TicketCard({ ticket, user }) {
	return (
		<div className="ticket-card">
			<div className="card-header">
				<div className="card-id">{ticket.id}</div>
				<div className="user-avatar">{user[0]}</div>
			</div>
			<h3 className="card-title">{ticket.title}</h3>
			<div className="card-status">
				<div className="priority">
					{ticket.priority === 4 ? (
						<Urg />
					) : ticket.priority === 3 ? (
						<High />
					) : ticket.priority === 2 ? (
						<Med />
					) : ticket.priority === 1 ? (
						<Low />
					) : (
						<No />
					)}
				</div>
				<div className="card-tag">
					{ticket.tag.map((t, index) => (
						<span key={index} className="tag">
							{t}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}

export default TicketCard;
