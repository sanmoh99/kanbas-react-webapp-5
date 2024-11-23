import {FaPlus} from "react-icons/fa6";
import {FaSearch} from "react-icons/fa";
import {BsGripVertical} from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import {BiBible} from "react-icons/bi";
import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {deleteAssignment, setAssignments} from "./reducer";
import AssignmentControlButton from "./AssignmentControlButton";
import * as client from "./client"

export default function Assignments() {
    const {cid} = useParams();
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const {assignments} = useSelector((state: any) => state.assignmentReducer);
    const fetchAssignments = async () => {
        try {
            dispatch(setAssignments( await client.fetchAssignmentsForCourse(cid as string) ));
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchAssignments();
    }, []);
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    const isFaculty = currentUser.role === "FACULTY";

    const removeAssignment = async (assignmentId: string) => {
        await client.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
    };

    return (
        <div id="wd-assignments">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="input-group" style={{maxWidth: "400px"}}>
                    <span className="input-group-text">
                        <FaSearch/>
                    </span>
                    <input
                        id="wd-search-assignment"
                        placeholder="Search for Assignments"
                        className="form-control"
                    />
                </div>
                {isFaculty &&
                    <div className={"d-flex"}>
                        <button id="wd-add-assignment-group"
                                className="btn btn-lg btn-secondary me-1 d-flex align-items-center">
                            <FaPlus className="fs-5 me-2"/> Group
                        </button>
                        <a href={`#` + pathname + `/Editor`}
                           className="btn btn-lg btn-danger me-1 d-flex align-items-center">
                            <FaPlus className="fs-5 me-2"/> Assignment
                        </a>
                    </div>
                }
            </div>
            <h3 id="wd-assignments-title"
                className="d-flex mb-0 justify-content-between align-items-center bg-light text-dark p-2">
                <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3"/>
                    <span className="me-2 fs-6">&#9660;</span>
                    ASSIGNMENTS
                </div>

                <div>
                    <div
                        className="d-inline-flex align-items-center justify-content-center border border-dark rounded-pill px-3 py-2 me-3">
                        <span className="fs-6"> 40% of Total</span>
                    </div>
                    <FaPlus className="me-3 fs-5"/>
                </div>
            </h3>

            <ul id="wd-assignment-list" className="list-group rounded-0 border border-muted">
                {assignments.filter((assignment: any) => assignment.course === cid)
                    .map((assignment: any) => (
                        <li className="wd-assignment-list-item d-flex justify-content-between align-items-center text-dark p-2 border border-muted">
                            <div className="d-flex justify-content-between align-items-center text-dark p-2">
                                <BsGripVertical className="me-2 fs-3"/>
                                <BiBible className="me-3 fs-3 text-success"/>
                                <div>
                                    {isFaculty &&
                                        <div>
                                            <a
                                                className="wd-assignment-link h5 text-decoration-none"
                                                href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                                            >
                                                {assignment.title}
                                            </a>
                                            <br/>
                                        </div>
                                    }
                                    {!isFaculty &&
                                        <h5 className="text-decoration-none"> {assignment.title} </h5>
                                    }
                                    <small>
                                        <span className="text-danger">Multiple Modules</span> |
                                        <b> Available from</b> {assignment.availableFrom} |
                                        <b> Available Until</b> {assignment.availableUntil} |
                                        <b> Due</b> {assignment.dueDate} |
                                        {assignment.points} pts
                                    </small>
                                </div>
                            </div>
                            <AssignmentControlButton
                                deleteAssignment={() => removeAssignment(assignment._id)}/>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
