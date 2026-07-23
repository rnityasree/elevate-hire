import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [mode, setMode] = useState(() => {

        const savedMode = localStorage.getItem("themeMode");

        return savedMode || "dark";

    });

    useEffect(() => {

        localStorage.setItem("themeMode", mode);

    }, [mode]);

    const toggleTheme = () => {

        setMode((prevMode) =>
            prevMode === "dark" ? "light" : "dark"
        );

    };

    const value = useMemo(() => ({

        mode,

        toggleTheme,

        isDark: mode === "dark"

    }), [mode]);

    return (

        <ThemeContext.Provider value={value}>

            {children}

        </ThemeContext.Provider>

    );

}

export function useThemeContext() {

    const context = useContext(ThemeContext);

    if (!context) {

        throw new Error(
            "useThemeContext must be used within ThemeProvider"
        );

    }

    return context;

}