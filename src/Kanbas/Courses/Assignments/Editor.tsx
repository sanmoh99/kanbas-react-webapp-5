import {useNavigate, useParams} from "react-router-dom";
import * as db from "../../Database"
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as client from "./client";
import {addAssignment, updateAssignment} from "./reducer";

export default function AssignmentEditor() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {cid, aid} = useParams();
    const adding = (aid === undefined);
    const {assignments} = useSelector((state: any) => state.assignmentReducer);
    const assignmentDB = assignments.find((assignment: any) => assignment._id === aid && assignment.course === cid)
    const [assignment, setAssignment] = useState(assignmentDB || {
        title: "", description: "", course: cid,
        points: 100, dueDate: "", availableFrom: "", availableUntil: ""
    });

    const createAssignment = async (assignment: any) => {
        const newAssignment = await client.createAssignment(assignment);
        dispatch(addAssignment(newAssignment));
    };
    const saveAssignment = async (assignment: any) => {
        await client.updateAssignment(assignment);
        dispatch(updateAssignment(assignment));
    };

    return (
        <div id="wd-assignments-editor" style={{maxWidth: "800px"}}>
            <div className="mb-3 row">
                <label htmlFor="wd-name" className="col-sm-3 col-form-label text-sm-end">Assignment Name</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" id="wd-name" value={assignment.title}
                           onChange={e => setAssignment({...assignment, title: e.target.value})}/>
                </div>
            </div>
            <textarea className="form-control" id="wd-description"
                      value={assignment.description}
                      onChange={e => setAssignment({...assignment, description: e.target.value})}
            >
            {assignment.description}
            </textarea>
            <br/>
            <div className="mb-3 row">
                <label htmlFor="wd-points" className="col-sm-3 col-form-label text-sm-end">Points</label>
                <div className="col-sm-9">
                    <input id="wd-points" className="form-control" value={assignment.points}
                           onChange={(e) => setAssignment({...assignment, points: e.target.value})}/>
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label text-sm-end" htmlFor="wd-group">Assignment Group</label>
                <div className="col-sm-9">
                    <select id="wd-group" className="form-control">
                        <option>ASSIGNMENTS</option>
                        <option>QUIZZES</option>
                        <option>EXAMS</option>
                        <option>PROJECTS</option>
                    </select>
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label text-sm-end" htmlFor="wd-display-grade-as">Display Grade
                    as</label>
                <div className="col-sm-9">
                    <select id="wd-display-grade-as" className="form-control">
                        <option>Percentage</option>
                        <option>Letter Grades</option>
                        <option>Pass/Fail</option>
                    </select>
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label text-sm-end" htmlFor="wd-submission-type">Submission
                    Type</label>
                <div className="col-sm-9">
                    <select id="wd-submission-type" className="form-control">
                        <option>Online</option>
                        <option>Offline?</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-9">
                    <label className="form-label"> Online Entry Options</label>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" name="submission type" id="wd-text-entry"/>
                        <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label> <br/>
                        <input type="radio" className="form-check-input" name="submission type" id="wd-website-url"/>
                        <label className="form-check-label" htmlFor="wd-website-url">Website URL</label> <br/>
                        <input type="radio" className="form-check-input" name="submission type"
                               id="wd-media-recordings"/>
                        <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label> <br/>
                        <input type="radio" className="form-check-input" name="submission type"
                               id="wd-student-annotation"/>
                        <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
                        <br/>
                        <input type="radio" className="form-check-input" name="submission type" id="wd-file-upload"/>
                        <label className="form-check-label" htmlFor="wd-file-upload">File Upload</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <label className="col-sm-3 form-label text-sm-end">Assign</label>
                <div className="col-sm-9">
                    <label className="form-label" htmlFor="wd-assign-to">Assign to</label> <br/>
                    <input className="form-control mb-1" type="text" id="wd-assign-to" defaultValue="Everyone"/>
                    <label className="form-label" htmlFor="wd-due-date">Due</label><br/>
                    <input className="form-control mb-1" type="date" id="wd-due-date" value={assignment.dueDate}
                           onChange={(e) => setAssignment({...assignment, dueDate: e.target.value})}/>
                    <div className="row">
                        <div className="col-sm-6">
                            <label className="form-label" htmlFor="wd-available-from">Available from</label>
                            <input className="form-control mb-1" type="date" id="wd-available-from"
                                   value={assignment.availableFrom}
                                   onChange={(e) => setAssignment({...assignment, availableFrom: e.target.value})}/>
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label" htmlFor="wd-available-until">Until</label>
                            <input className="form-control mb-1" type="date" id="wd-available-until"
                                   value={assignment.availableUntil}
                                   onChange={(e) => setAssignment({...assignment, availableUntil: e.target.value})}/>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-6">
                            <button className="btn btn-primary me-2 col-12"
                                    onClick={() => {
                                        if (adding)
                                            createAssignment(assignment);
                                        else
                                            saveAssignment(assignment);

                                        navigate(`/Kanbas/Courses/` + cid + `/Assignments`)
                                    }}
                            >Save
                            </button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-secondary col-12"
                                    onClick={() => navigate(`/Kanbas/Courses/` + cid + `/Assignments`)}
                            >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
