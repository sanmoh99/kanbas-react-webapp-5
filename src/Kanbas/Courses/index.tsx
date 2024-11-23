import { Routes, Route, Navigate, useParams } from "react-router";
import Home from "./Home";
import Modules from "./Modules";
import CoursesNavigation from "./Navigation";
// import { courses } from "../Database";
import { FaAlignJustify } from "react-icons/fa6";
import PeopleTable from "./People/Table";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import {useLocation} from "react-router-dom";
import ProtectedRoute from "../Account/ProtectedRoute";

export default function Courses({ courses }: { courses: any }) {
  const { cid } = useParams();
  // const parameters = useParams();
  const course = courses.find((course: any) => course._id === cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname && pathname.split("/")[4]}
      </h2>
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments/>} />
            <Route
              path="Assignments/:aid"
              element={<ProtectedRoute><AssignmentEditor/></ProtectedRoute>}
            />
            <Route
                path="Assignments/Editor"
                element={<ProtectedRoute><AssignmentEditor/></ProtectedRoute>}
            />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}