import { Ticket } from "@/app/api/models/Ticket";
import { notFound } from "next/navigation";

export const dynamicParams = true; // default val = true

interface Params {
  id: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/tickets`);

  if (!res.ok) {
    throw new Error("Failed to fetch tickets");
  }
  const ticketsList: Ticket[] = await res.json();

  return ticketsList.map((ticket) => ({
    id: ticket.id as string,
  }));
}

export default async function TicketDetails({ params }: { params: Params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/tickets/${params.id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch tickets");
  }
  const ticket: Ticket = await res.json();
  if (ticket === null) {
    notFound();
  }
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
