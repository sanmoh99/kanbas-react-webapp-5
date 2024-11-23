import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
import {Routes, Route, Navigate} from "react-router";
import AccountNavigation from "./Navigation";
import {useSelector} from "react-redux";
import ProtectedRoute from "./ProtectedRoute";

export default function Account() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    return (
        <div>
            <div className="d-flex">
                <div className="d-none d-md-block me-4">
                    <AccountNavigation/>
                </div>
                <Routes>
                    <Route path="/" element={<Navigate
                        to={currentUser ? "/Kanbas/Account/Profile" : "/Kanbas/Account/Signin"}/>}/>
                    <Route path="/Signin" element={<Signin/>}/>
                    <Route path="/Profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                    <Route path="/Signup" element={<Signup/>}/>
                </Routes>
            </div>
        </div>
    );
}
