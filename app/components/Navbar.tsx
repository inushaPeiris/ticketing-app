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
    <nav className="relative">
      <Image src={Logo} alt="iCare Helpdesk logo" width={70} placeholder="blur" quality={100} />
      <h1>iCare Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets">Tickets</Link>
      <div className="absolute right-4">{darkMode ? <button onClick={onShow}>Light 🌞</button> : <button onClick={onShow}>Dark 🌜</button>}</div>
    </nav>
  );
}
