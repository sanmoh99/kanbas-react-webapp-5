import {MdDoNotDisturbAlt} from "react-icons/md";
import {FaCheckCircle} from "react-icons/fa";
import {BiImport} from "react-icons/bi";
import {LiaFileImportSolid} from "react-icons/lia";
import {useSelector} from "react-redux";

export default function CourseStatus() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    return (
        <div id="wd-course-status" style={{width: "300px", marginLeft: "20px"}}>
            <h2>Course Status</h2>
            {isFaculty &&
                <div>
                    <div className="d-flex">
                        <div className="w-50 pe-1">
                            <button className="btn btn-lg btn-secondary w-100 text-nowrap ">
                                <MdDoNotDisturbAlt className="me-2 fs-5"/> Unpublish
                            </button>
                        </div>
                        <div className="w-50">
                            <button className="btn btn-lg btn-success w-100">
                                <FaCheckCircle className="me-2 fs-5"/> Publish
                            </button>
                        </div>
                    </div>
                    <br/>
                    <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                        <BiImport className="me-2 fs-5"/> Import Existing Content
                    </button>
                    <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                        <LiaFileImportSolid className="me-2 fs-5"/> Import from Commons
                    </button>
                    <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                        Choose Home Page
                    </button>
                </div>
            }
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                View Course Stream
            </button>
            {isFaculty &&
                <div>
                    <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                        New Announcement
                    </button>
                    <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                        New Analytics
                    </button>
                </div>
            }
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                View Course Notifications
            </button>
        </div>
    );
}