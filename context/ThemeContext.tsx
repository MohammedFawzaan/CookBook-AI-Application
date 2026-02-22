import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
    isDark: boolean;
    toggleTheme: () => void;
    colors: typeof lightColors;
}

export const lightColors = {
    primary: '#2e7d32',
    background: '#ffffff',
    surface: '#f8f9fa',
    card: '#ffffff',
    text: '#1a1a1a',
    textSecondary: '#666666',
    textMuted: '#888888',
    border: '#eeeeee',
    inputBg: '#ffffff',
    tabBar: '#ffffff',
    headerBorder: '#cccccc',
    placeholder: '#858b95',
    statsCard: '#f8f9fa',
    ingredientCard: '#f8f9fa',
    stepCard: '#f8f9fa',
    actionSheet: '#ffffff',
    icon: '#1a1a1a',
    success: '#2e7d32',
    error: '#c62828',
    warning: '#e65100',
    info: '#1565c0',
    danger: '#f44336',
    alertBg: 'rgba(255, 255, 255, 0.95)',
};

export const darkColors = {
    primary: '#43a047',
    background: '#121212',
    surface: '#1e1e1e',
    card: '#1e1e1e',
    text: '#f0f0f0',
    textSecondary: '#aaaaaa',
    textMuted: '#777777',
    border: '#333333',
    inputBg: '#2a2a2a',
    tabBar: '#1a1a1a',
    headerBorder: '#333333',
    placeholder: '#858b95',
    statsCard: '#252525',
    ingredientCard: '#252525',
    stepCard: '#252525',
    actionSheet: '#1e1e1e',
    icon: '#f0f0f0',
    success: '#66bb6a',
    error: '#e57373',
    warning: '#ffb74d',
    info: '#64b5f6',
    danger: '#ef5350',
    alertBg: '#1e1e1e',
};

const ThemeContext = createContext<ThemeContextType>({
    isDark: false,
    toggleTheme: () => { },
    colors: lightColors,
});

const THEME_KEY = '@cookbook_theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem(THEME_KEY).then(value => {
            if (value === 'dark') setIsDark(true);
        });
    }, []);

    const toggleTheme = async () => {
        const next = !isDark;
        setIsDark(next);
        await AsyncStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
    };

    const colors = isDark ? darkColors : lightColors;

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
