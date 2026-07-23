import { Alert, Slide, Snackbar } from "@mui/material";

function SlideTransition(props) {

    return <Slide {...props} direction="left" />;

}

function AppSnackbar({

    open,

    message,

    severity,

    onClose

}) {

    return (

        <Snackbar

            open={open}

            autoHideDuration={3500}

            onClose={onClose}

            anchorOrigin={{

                vertical: "top",

                horizontal: "right"

            }}

            TransitionComponent={SlideTransition}

        >

            <Alert

                onClose={onClose}

                severity={severity}

                variant="filled"

                elevation={6}

                sx={{

                    minWidth: 320,

                    borderRadius: 3,

                    alignItems: "center",

                    fontWeight: 600,

                    boxShadow: 8

                }}

            >

                {message}

            </Alert>

        </Snackbar>

    );

}

export default AppSnackbar;