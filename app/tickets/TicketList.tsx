import Link from "next/link";
import { Ticket } from "../api/models/Ticket";

export default async function TicketList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/tickets`, { cache: "no-store" });
  const ticketsList: Ticket[] = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return (
    <>
      {ticketsList.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {ticketsList.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  );
}
