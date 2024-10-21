"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "./icare-logo.jpg";

interface NavbarProps {
  onShow: () => void;
  darkMode: boolean;
}

export default function Navbar({ onShow, darkMode }: NavbarProps) {
  return (
    <nav>
      <Image src={Logo} alt="iCare Helpdesk logo" width={70} placeholder="blur" quality={100} />
      <h1>iCare Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets">Tickets</Link>
      {darkMode ? <button onClick={onShow}>Light 🌞</button> : <button onClick={onShow}>Dark 🌜</button>}
      <div>Mode: {darkMode ? "dark" : "light"}</div>
    </nav>
  );
}
