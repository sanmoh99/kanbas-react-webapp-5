import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {useSelector} from "react-redux";

export default function AccountNavigation() {
    const {pathname} = useLocation();
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
    return (
        <div id="wd-account-navigation" className="wd list-group rounded-0 border-0">
            {links.map( (link) =>(
                <Link to={`/Kanbas/Account/${link}`}
                      className={`list-group-item border border-0
                       ${pathname.includes(`Account/${link}`) ? "active" : "text-danger"}`}> {link} </Link>
                ))}
        </div>
    );
}
