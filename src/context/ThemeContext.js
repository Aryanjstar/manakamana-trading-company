'use client';
import { createContext, useContext, useState, useEffect, useCallback, useSyncExternalStore } from 'react';

const ThemeContext = createContext();

function getStoredTheme() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('theme') === 'dark';
}

function subscribe(callback) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

export function ThemeProvider({ children }) {
  const storedDark = useSyncExternalStore(subscribe, getStoredTheme, () => false);
  const [isDark, setIsDark] = useState(storedDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
