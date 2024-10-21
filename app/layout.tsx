"use client";

import "./globals.css";
import { Rubik } from "next/font/google";
import Navbar from "./components/Navbar";
import { useContext, useState } from "react";
import ThemeContext from "./Theme/themeContext";

const rubik = Rubik({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const dark = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(dark);


  return (
    <html lang="en">
      <body className={darkMode ? "bg-blue-950": ''}>
        <div className={rubik.className}>

        </div>
        <Navbar onShow={() => setDarkMode(() => !darkMode)} darkMode={darkMode} />
        <ThemeContext.Provider value={darkMode}> {children} </ThemeContext.Provider>
      </body>
    </html>
  );
}
