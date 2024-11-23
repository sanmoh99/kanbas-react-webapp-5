import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }: { children: any }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    // return children;
    if (currentUser) {
        return children;
    } else {
        return <Navigate to="/Kanbas/Account/Signin" />;
    }
}
