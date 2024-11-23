import {Link, useLocation, useParams} from "react-router-dom";

export default function CoursesNavigation() {
    const {cid} = useParams();
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
    const { pathname } = useLocation();

    return (

        <div className="wd list-group rounded-0" id="wd-courses-navigation">
            {links.map((link) => (
                <Link
                    className={`list-group-item ${pathname.includes(link) ? "active" : "text-danger"} border-0`}
                    to={`/Kanbas/Courses/${cid}/${link}`}
                >
                    {link}
                </Link>
            ))}
        </div>
    );
}
