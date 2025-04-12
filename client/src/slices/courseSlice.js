import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,    // ye bataayga ki course kis step par hai cousre add karte time (1 ya 2 ya 3)
  course: null,  // Course ka data store karega
  editCourse: false,  // ye bataayga ki course edit mode me hai ya nahi
  paymentLoading: false,   // Payment processing ho rahi hai ya nahi
}   

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, action) => {      // setStep(state, action) → Course creation ka step change karna
      state.step = action.payload  // action.payload se naye step ka number milega aur state.step update ho jayega.
    },                                //  Example: dispatch(setStep(2)) → Step 2 par shift ho jayega.


    setCourse: (state, action) => {   //  setCourse(state, action) → Course data update karna
      state.course = action.payload   // action.payload me course ka data aayega jo state.course me store hoga.
    },                                // Example: dispatch(setCourse({ title: "React Course", price: 499 }))
                                      // Course data update ho jayega.


    setEditCourse: (state, action) => {  // setEditCourse(state, action) → Course editing mode enable/disable karna
      state.editCourse = action.payload  // action.payload me true ya false aayega.
    },                                   // Example:
                                            // dispatch(setEditCourse(true)) → Editing mode enable ho jayega.
                                            // dispatch(setEditCourse(false)) → Editing mode disable ho jayega.


    setPaymentLoading: (state, action) => {   // setPaymentLoading(state, action) → Payment processing status update karna
      state.paymentLoading = action.payload   // action.payload me true ya false aayega.
    },                                        // Example:
                                              // dispatch(setPaymentLoading(true)) → Loading active ho jayega.
                                              // dispatch(setPaymentLoading(false)) → Loading hat jayega.



    resetCourseState: (state) => {   // resetCourseState(state) → Course state reset karna
      state.step = 1   // step ko 1 kar dega.
      state.course = null  // course ko null kar dega.
      state.editCourse = false  // editCourse ko false kar dega.
//       Payment loading reset nahi karega (paymentLoading same rahega).
// Example: dispatch(resetCourseState()) → Pure course state ko reset karega.
    },
  },
})

/**
 * Workflow (Kaise Kaam Karega Yeh Code?)
1️⃣ Jab user course create kar raha hoga

dispatch(setStep(n)) → Current step number update hoga.
dispatch(setCourse(courseData)) → Course data update hoga.
2️⃣ Agar user course edit mode me aayega

dispatch(setEditCourse(true)) → Edit mode enable hoga.
dispatch(setCourse(existingCourseData)) → Existing course load hoga.
3️⃣ Jab user payment process karega

dispatch(setPaymentLoading(true)) → Loading active hoga.
dispatch(setPaymentLoading(false)) → Loading off hoga jab payment complete ho jayega.
4️⃣ Agar user course creation cancel karega ya complete karega

dispatch(resetCourseState()) → Pura state reset ho jayega.
 */

export const {
  setStep,
  setCourse,
  setEditCourse,
  setPaymentLoading,
  resetCourseState,
} = courseSlice.actions

export default courseSlice.reducer