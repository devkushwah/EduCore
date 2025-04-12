import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  courseSectionData: [],   //  Course ke sections ka data store karega (e.g., Module 1, Module 2...).
  courseEntireData: [],    //  Pura course ka data store karega (title, description, instructor, etc.).
  completedLectures: [],   //  User ke complete kiye hue lectures ka record rakhega.
  totalNoOfLectures: 0,    //  Total kitne lectures hain, iska count rakhega.

}

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload
    },
    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload
    },
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload
    },
    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload]
    },
  },
})

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewCourseSlice.actions

export default viewCourseSlice.reducer