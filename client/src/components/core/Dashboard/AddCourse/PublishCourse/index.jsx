// React aur required hooks ko import kar rahe hain
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// API call aur Redux actions ko import kar rahe hain
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../Common/IconBtn"

// PublishCourse component define kar rahe hain
export default function PublishCourse() {
  // react-hook-form se form handling ke liye hooks initialize kar rahe hain
  const { register, handleSubmit, setValue, getValues } = useForm()

  // Redux dispatch aur navigation hooks initialize kar rahe hain
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Redux store se token aur course details extract kar rahe hain
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  // Local state define kar rahe hain loading status manage karne ke liye
  const [loading, setLoading] = useState(false)

  // useEffect hook use kar rahe hain form value set karne ke liye course status ke basis par
  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [course?.status, setValue])

  // Function to navigate back to the previous step
  const goBack = () => {
    dispatch(setStep(2))
  }

  // Function to navigate to the courses page and reset course state
  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  // Function to handle course publishing
  const handleCoursePublish = async () => {
    // Check kar rahe hain ki form update hua hai ya nahi
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // Agar form update nahi hua, to API call ki zarurat nahi
      goToCourses()
      return
    }

    // Form data prepare kar rahe hain API call ke liye
    const formData = new FormData()
    formData.append("courseId", course._id)
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)
    
    // API call se pehle loading state ko true set kar rahe hain
    setLoading(true)
    try {
      // API call kar rahe hain course details edit karne ke liye
      const result = await editCourseDetails(formData, token)
      if (result) {
        goToCourses()
      }
    } catch (error) {
      console.error("Failed to edit course details:", error)
    } finally {
      // API call ke baad loading state ko false set kar rahe hain
      setLoading(false)
    }
  }

  // Function to handle form submission
  const onSubmit = (data) => {
    handleCoursePublish()
  }

  // Component render kar rahe hain
  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">
        Publish Settings
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox for making the course public */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              Make this course as public
            </span>
          </label>
        </div>

        {/* Buttons for navigating back and saving changes */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save Changes" />
        </div>
      </form>
    </div>
  )
}

/**
 * WORFLOW:
 * 1. PublishCourse component me react-hook-form se form handling ke liye hooks initialize kiye hain
 * 2. Redux dispatch aur navigation hooks initialize kiye hain
 * 3. Redux store se token aur course details extract kiye hain
 * 4. Local state define kiye hain loading status manage karne ke liye
 * 5. useEffect hook use karke form value set kiye hain course status ke basis par
 * 6. goBack function define kiye hain to navigate back to the previous step
 * 7. goToCourses function define kiye hain to navigate to the courses page and reset course state
 * 8. handleCoursePublish function define kiye hain to handle course publishing
 * 9. handleCoursePublish function me form update check kiya hai aur form data prepare kiya hai API call ke liye
 * 10. handleCoursePublish function me API call karke course details edit kiye hain
 * 11. handleCoursePublish function me API call ke baad loading state ko false set kiya hai
 * 12. onSubmit function define kiye hain to handle form submission
 * 13. Component render kiya hai 
 * 
 */