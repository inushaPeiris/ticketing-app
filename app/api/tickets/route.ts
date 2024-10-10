import { NextResponse } from "next/server";
import Client from "../lib/connection";
import { Ticket } from "../models/Ticket";

// POST /api/tickets
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: Ticket = await request.json();
    // Validate the parsed body
    if (!body.title || !body.body || !body.priority || !body.user_email) {
      return NextResponse.json(
        { error: "Title, body, priority, and user_email are required" },
        { status: 400 }
      );
    }
    const database = Client.db("ticketing-app");
    const tickets = database.collection<Ticket>("tickets");
    await tickets.insertOne({
      title: body.title,
      body: body.body,
      priority: body.priority,
      user_email: body.user_email,
    });
    return NextResponse.json({ message: "Ticket created successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create ticket" },
      { status: 500 }
    );
  }
}

// GET /api/tickets
export async function GET() {
  try {
    const database = Client.db("ticketing-app");
    const collection = database.collection<Ticket>("tickets");
    const ticketsList = await collection.find({}).toArray();
    const tickets: Ticket[] = ticketsList.map(ticket => ({
      id: ticket._id.toString(),
      title: ticket.title,
      body: ticket.body,
      priority: ticket.priority,
      user_email: ticket.user_email,
    }));
    return NextResponse.json(tickets);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}
