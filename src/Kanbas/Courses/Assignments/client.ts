import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
export const fetchAllAssignments = async () => {
    const { data } = await axios.get(ASSIGNMENTS_API);
    return data;
};
export const deleteAssignment = async (id: string) => {
    const { data } = await axios.delete(`${ASSIGNMENTS_API}/${id}`);
    return data;
};
export const updateAssignment = async (assignment: any) => {
    const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    return data;
};
export const createAssignment = async (assignment: any) => {
    const response = await axios.post(
        `${ASSIGNMENTS_API}`,
        assignment
    );
    return response.data;
};
export const fetchAssignmentsForCourse = async (cid: string) => {
    const { data } = await axios.get(`${COURSES_API}/${cid}/assignments`);
    return data;
}


