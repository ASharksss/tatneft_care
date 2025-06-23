import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Проверяем предпочтения пользователя или сохранённую тему
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) :
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Сохраняем в localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));

    // Применяем класс к body
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};