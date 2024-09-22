import { createContext, ReactNode, useEffect, useState } from "react"

type Theme = 'light' | 'dark';

interface ThemeContextProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    // Detect system color-scheme
    const getSystemTheme = (): Theme => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // State with the current theme
    const [theme, setTheme] = useState<Theme>(getSystemTheme);

    // Applies the system corresponding theme
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme]);

    // Effect to adjust theme based on system
    useEffect(() => {
        // Handles the correct theme to be displayed
        const handleSystemThemeChange = () => {
            const systemTheme = getSystemTheme();
            const currentTheme = document.documentElement.getAttribute('data-theme') as Theme;

            if (currentTheme !== systemTheme) {
                console.log('cambiamos el tema');
                
                setTheme(systemTheme);
            }
        };

        // Listener for system color-scheme detection
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', handleSystemThemeChange);

        // Clean
        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export type { ThemeContextProps };
export default ThemeContext;