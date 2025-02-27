import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const themeColor = "#2C3E50";
    const bgColor = ""

    return (
        <ThemeContext.Provider value={{ themeColor, bgColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the theme context
export const useTheme = () => {
    return useContext(ThemeContext);
};
