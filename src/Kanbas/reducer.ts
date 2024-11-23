import { createSlice } from "@reduxjs/toolkit";
// import { enrollments } from "./Database";
const initialState = {
    enrollments: [],
};
const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        setEnrollments: (state, action) => {
            state.enrollments = action.payload;
        },
        addEnrollment: (state, { payload: enrollment }) => {
            const newEnrollment: any = {
                // _id: new Date().getTime().toString(),
                ...enrollment
            };
            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },
        deleteEnrollment: (state, { payload: enrollmentId }) => {
            state.enrollments = state.enrollments.filter((m: any) => m._id !== enrollmentId);
        },
    },
});

export const { addEnrollment, deleteEnrollment, setEnrollments } =
    enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
