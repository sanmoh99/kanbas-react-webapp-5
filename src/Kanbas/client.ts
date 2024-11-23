import axios from "axios";

const axiosWithCredentials = axios.create({withCredentials: true});
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/users/enrollments`;

export const unenroll = async (cid: string) => {
    const { data } = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${cid}`);
    return data;
};

export const enroll = async (cid: string) => {
    const response = await axiosWithCredentials.post(`${ENROLLMENTS_API}/${cid}`, null);
    return response.data;
};

export const getEnrollments = async () => {
    const response = await axiosWithCredentials.get(`${ENROLLMENTS_API}`);
    return response.data;
}