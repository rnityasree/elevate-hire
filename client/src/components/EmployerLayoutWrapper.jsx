import EmployerProtectedRoute from "./EmployerProtectedRoute";
import EmployerLayout from "../layouts/EmployerLayout";

function EmployerLayoutWrapper() {

    return (

        <EmployerProtectedRoute>

            <EmployerLayout />

        </EmployerProtectedRoute>

    );

}

export default EmployerLayoutWrapper;