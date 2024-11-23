import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as db from "./Database";
import {useEffect, useState} from "react";
import {addEnrollment, deleteEnrollment, setEnrollments} from "./reducer";
import * as client from "./client"

export default function Dashboard({
                                      courses,
                                      setCourses,
                                      course,
                                      setCourse,
                                      addNewCourse,
                                      deleteCourse,
                                      updateCourse,
                                  }: {
    courses: any;
    setCourses: any;
    course: any;
    setCourse: any;
    addNewCourse: any;
    deleteCourse: any;
    updateCourse: any;
}) {
    const dispatch = useDispatch();
    const [filtering, setFiltering] = useState(true)
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const {enrollments} = useSelector((state: any) => state.enrollmentReducer);

    const fetchEnrollments = async () => {
        try {
            dispatch(setEnrollments( await client.getEnrollments() ));
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchEnrollments();
    }, []);

    const enroll = async(course: any) => {
        client.enroll(course._id)
        dispatch(addEnrollment({user: currentUser._id, course: course._id}))
    }

    const unenroll = async(course: any) => {
        const _id = enrollments.find((enrollment: any) => enrollment.user === currentUser._id &&
            enrollment.course === course._id)._id
        await client.unenroll(course._id);
        dispatch(deleteEnrollment(_id))
    }

    const filteredCourses = filtering ? courses.filter((course: any) =>
        enrollments.some(
            (enrollment: any) =>
                enrollment.user === currentUser._id &&
                enrollment.course === course._id
        )) : courses;
    const isFaculty = currentUser.role === "FACULTY";
    const isStudent = currentUser.role === "STUDENT";

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            {isFaculty &&
                <div>
                    <hr/>
                    <h5>
                        New Course
                        <button className="btn btn-primary float-end" onClick={addNewCourse}>
                            {" "}
                            Add{" "}
                        </button>
                        <button
                            className="btn btn-warning float-end me-2"
                            onClick={updateCourse}
                        >
                            Update
                        </button>
                    </h5>
                    <br/>
                    <input
                        value={course.name}
                        className="form-control mb-2"
                        onChange={(e) => setCourse({...course, name: e.target.value})}
                    />
                    <textarea
                        value={course.description}
                        className="form-control"
                        onChange={(e) => setCourse({...course, description: e.target.value})}
                    />
                </div>
            }
            <hr/>
            <h2 id="wd-dashboard-published">
                Published Courses ({filteredCourses.length})
                {/*{isStudent &&*/}
                <button className="btn btn-primary float-end"
                        onClick={() => (setFiltering(!filtering))}>
                    Enrollments
                </button>
                {/*}*/}
            </h2>
            {" "}
            <hr/>
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {filteredCourses.map((course: any) => (
                        <div className="wd-dashboard-course col" style={{width: "350px"}}>
                            <div className="card rounded-3 overflow-hidden">
                                <Link
                                    to={`/Kanbas/Courses/${course._id}/Home`}
                                    className="wd-dashboard-course-link text-decoration-none text-dark"
                                >
                                    <img src="/images/reactjs.jpg" width="100%" height={160}/>
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">
                                            {course.name}
                                        </h5>
                                        <p
                                            className="wd-dashboard-course-title card-text overflow-y-hidden"
                                            style={{maxHeight: 100}}
                                        >
                                            {course.description}
                                        </p>


                                        {isFaculty && <div>
                                            <button
                                                id="wd-edit-course-click"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setCourse(course);
                                                }}
                                                className="btn btn-warning me-2 float-end"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    deleteCourse(course._id);
                                                }}
                                                className="btn btn-danger float-end"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        }

                                        {enrollments.some((enrollment: any) => enrollment.user === currentUser._id &&
                                            enrollment.course === course._id) ?
                                            <button className="btn btn-danger float-end" onClick={(e) => {
                                                e.preventDefault()
                                                unenroll(course);
                                            }}>Unenroll</button> :
                                            <button className="btn btn-success float-end" onClick={(e) => {
                                                e.preventDefault()
                                                enroll(course);
                                            }}>Enroll</button>
                                        }


                                        <button className="btn btn-primary"> Go</button>


                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
