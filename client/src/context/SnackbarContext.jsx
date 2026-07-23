import { createContext, useContext, useState } from "react";

import AppSnackbar from "../components/AppSnackbar";

export const SnackbarContext = createContext();

export function SnackbarProvider({ children }) {

    const [snackbar, setSnackbar] = useState({

        open: false,

        message: "",

        severity: "success"

    });

    const showSnackbar = (

        message,

        severity = "success"

    ) => {

        setSnackbar({

            open: true,

            message,

            severity

        });

    };

    const closeSnackbar = () => {

        setSnackbar((prev) => ({

            ...prev,

            open: false

        }));

    };

    return (

        <SnackbarContext.Provider

            value={{

                showSnackbar

            }}

        >

            {children}

            <AppSnackbar

                open={snackbar.open}

                message={snackbar.message}

                severity={snackbar.severity}

                onClose={closeSnackbar}

            />

        </SnackbarContext.Provider>

    );

}

export const useSnackbar = () =>

    useContext(SnackbarContext);