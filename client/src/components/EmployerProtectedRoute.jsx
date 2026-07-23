import { Navigate } from "react-router-dom";

function EmployerProtectedRoute({ children }) {

    const token = localStorage.getItem("employerToken");

    const employer = JSON.parse(
        localStorage.getItem("employerUser")
    );

    if (!token || !employer) {

        return (
            <Navigate
                to="/employer/login"
                replace
            />
        );

    }

    if (employer.role !== "employer") {

        localStorage.removeItem("employerToken");
        localStorage.removeItem("employer");
        localStorage.removeItem("employerUser");

        return (
            <Navigate
                to="/employer/login"
                replace
            />
        );

    }

    return children;

}

export default EmployerProtectedRoute;