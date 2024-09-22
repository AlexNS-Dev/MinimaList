import React from 'react';
import useTheme from '../../hooks/useTheme';
import { SunIcon, MoonIcon } from 'lucide-react'
import './ThemeToggle.css'

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    /* Convertir en el tipo switch que enciende y apaga el dark mode */
    <div className="ThemeToggle">
      <input type='checkbox' id='darkMode-toggle' onChange={toggleTheme} checked={theme === 'dark'} />

      <label htmlFor='darkMode-toggle'>
        <div className="circle">
          <SunIcon className='sun' />
          <MoonIcon className='moon' />
        </div>
      </label>

    </div>
  );
};

export default ThemeToggle;