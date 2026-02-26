import React, { createContext, useState } from "react";
import { lightTheme, darkTheme } from "./theme";

export const ThemeContext = createContext({
  colors: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const colors = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ colors, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};