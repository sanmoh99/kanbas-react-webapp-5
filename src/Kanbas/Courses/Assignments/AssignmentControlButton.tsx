import {IoEllipsisVertical} from "react-icons/io5";
// import GreenCheckmark from "./GreenCheckmark";
import {FaTrash} from "react-icons/fa";
import ConfirmDialog from "./ConfirmDialog";
import {useSelector} from "react-redux";

export default function AssignmentControlButton({deleteAssignment}: {
    deleteAssignment: () => void;
}) {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    return (
        <div className="float-end">
            {isFaculty && <FaTrash
                className="text-danger me-2 mb-1"
                data-bs-toggle="modal"
                data-bs-target="#wd-add-confirm-dialog"
            />}
            {/*<GreenCheckmark/>*/}
            <IoEllipsisVertical className="fs-4"/>
            <ConfirmDialog message={`Delete?`} action={deleteAssignment}/>
        </div>
    );
}
