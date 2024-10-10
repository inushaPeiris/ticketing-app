"use client";

import { Ticket } from "@/app/api/models/Ticket";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("low");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    const newTicket: Ticket = {
      title,
      body,
      priority,
      user_email: "inusha@dev.com",
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/tickets`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTicket),
    });

    if (!res.ok) {
      throw new Error("Failed to create ticket");
    }

    if (res.ok) {
      // Optionally, add a small delay to give the database some time.
      await new Promise(resolve => setTimeout(resolve, 3000));
      router.push("/tickets");
    }

    // if (res.ok) {
    //   router.refresh();
    //   router.push("/tickets");
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select onChange={(e) => setPriority(e.target.value)} value={priority}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>
    </form>
  );
}
