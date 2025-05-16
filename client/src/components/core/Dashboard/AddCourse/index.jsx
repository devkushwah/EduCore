import RenderSteps from "./RenderSteps"

export default function AddCourse() {
  return (
    <>
      <div className="flex w-full flex-col items-start gap-y-6 md:flex-row md:gap-x-6">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-6 text-2xl font-medium text-richblack-5 md:mb-14 md:text-3xl">
            Add Course
          </h1>
          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>
        {/* Course Upload Tips */}
        <div className="sticky top-10 hidden max-w-full flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 md:max-w-[400px] md:p-6 xl:block">
          <p className="mb-4 text-base text-richblack-5 md:mb-8 md:text-lg">⚡ Course Upload Tips</p>
          <ul className="ml-4 list-item list-disc space-y-2 text-xs text-richblack-5 md:ml-5 md:space-y-4">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
  )
}