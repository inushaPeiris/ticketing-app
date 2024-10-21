"use client";

import { createContext } from "react";

const ThemeContext = createContext(false);

export const ThemeProvider = ThemeContext.Provider;

export default ThemeContext;
