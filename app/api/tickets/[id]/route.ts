import { NextResponse } from "next/server";
import Client from "../../lib/connection";
import { Ticket } from "../../models/Ticket";
import { ObjectId } from "mongodb";

// GET /api/tickets/[id]
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const database = Client.db("ticketing-app");
    const tickets = database.collection<Ticket>("tickets");

    const id = params.id
    if (!id) {
      return NextResponse.json(
        { error: "Ticket ID is required" },
        { status: 400 }
      );
    }
    const ticket = await tickets.findOne({ _id: new ObjectId(id) });
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }
    const mappedTicket: Ticket = {
      id: ticket._id.toString(),
      title: ticket.title,
      body: ticket.body,
      priority: ticket.priority,
      user_email: ticket.user_email,
    };
    return NextResponse.json(mappedTicket);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch ticket" },
      { status: 500 }
    );
  }
}
