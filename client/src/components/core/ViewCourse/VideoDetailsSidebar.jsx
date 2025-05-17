import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector, useDispatch } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "../../Common/IconBtn"
import {
  markLectureAsComplete,
  unmarkLectureAsComplete, // keep this import, will add implementation in API file
} from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [checkboxLoading, setCheckboxLoading] = useState({})
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth) // <-- move useSelector here
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname])

  const handleLectureCheckbox = async (topicId) => {
    setCheckboxLoading((prev) => ({ ...prev, [topicId]: true }))
    const isCompleted = completedLectures.includes(topicId)
    let res = false
    if (isCompleted) {
      // Unmark as complete
      res = await unmarkLectureAsComplete(
        { courseId: courseEntireData?._id, subsectionId: topicId },
        token // use token from above
      )
    } else {
      // Mark as complete
      res = await markLectureAsComplete(
        { courseId: courseEntireData?._id, subsectionId: topicId },
        token // use token from above
      )
    }
    if (res) {
      dispatch(updateCompletedLectures(topicId))
    }
    setCheckboxLoading((prev) => ({ ...prev, [topicId]: false }))
  }

  return (
    <>
      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="sm:hidden fixed top-16 left-2 z-[1100] bg-richblack-700 text-white rounded-full p-2 shadow-md"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <svg
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {/* Sidebar Drawer for Mobile */}
      <div
        className={`fixed inset-0 z-[1200] bg-black bg-opacity-40 transition-all duration-300 sm:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className={`h-full w-[80vw] max-w-[320px] bg-richblack-800 border-r border-richblack-700 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="flex justify-end p-2">
            <button
              className="text-white text-2xl"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              &times;
            </button>
          </div>
          {/* Sidebar Content */}
          <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
            <div className="flex w-full items-center justify-between ">
              <div
                onClick={() => {
                  navigate(`/dashboard/enrolled-courses`)
                  setSidebarOpen(false)
                }}
                className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
                title="back"
              >
                <IoIosArrowBack size={30} />
              </div>
              <IconBtn
                text="Add Review"
                customClasses="ml-auto"
                onClick={() => {
                  setReviewModal(true)
                  setSidebarOpen(false)
                }}
              />
            </div>
            <div className="flex flex-col">
              <p>{courseEntireData?.courseName}</p>
              <p className="text-sm font-semibold text-richblack-500">
                {completedLectures?.length} / {totalNoOfLectures}
              </p>
            </div>
          </div>
          <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
            {courseSectionData.map((course, index) => (
              <div
                className="mt-2 cursor-pointer text-sm text-richblack-5"
                onClick={() => setActiveStatus(course?._id)}
                key={index}
              >
                {/* Section */}
                <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                  <div className="w-[70%] font-semibold">
                    {course?.sectionName}
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`${
                        activeStatus === course?.sectionName
                          ? "rotate-0"
                          : "rotate-180"
                      } transition-all duration-500`}
                    >
                      <BsChevronDown />
                    </span>
                  </div>
                </div>
                {/* Sub Sections */}
                {activeStatus === course?._id && (
                  <div className="transition-[height] duration-500 ease-in-out">
                    {course.subSection.map((topic, i) => (
                      <div
                        className={`flex gap-3  px-5 py-2 ${
                          videoBarActive === topic._id
                            ? "bg-yellow-200 font-semibold text-richblack-800"
                            : "hover:bg-richblack-900"
                        } `}
                        key={i}
                        onClick={() => {
                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                          )
                          setVideoBarActive(topic._id)
                          setSidebarOpen(false)
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(topic?._id)}
                          disabled={checkboxLoading[topic._id]}
                          onChange={(e) => {
                            e.stopPropagation()
                            handleLectureCheckbox(topic._id)
                          }}
                        />
                        {topic.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Sidebar for Desktop */}
      <div className="hidden sm:flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        {/* ...existing sidebar content... */}
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          {/* ...existing header code... */}
          <div className="flex w-full items-center justify-between ">
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`)
              }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowBack size={30} />
            </div>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onClick={() => setReviewModal(true)}
            />
          </div>
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>
        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {course?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`${
                      activeStatus === course?.sectionName
                        ? "rotate-0"
                        : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>
              {/* Sub Sections */}
              {activeStatus === course?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {course.subSection.map((topic, i) => (
                    <div
                      className={`flex gap-3  px-5 py-2 ${
                        videoBarActive === topic._id
                          ? "bg-yellow-200 font-semibold text-richblack-800"
                          : "hover:bg-richblack-900"
                      } `}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        )
                        setVideoBarActive(topic._id)
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        disabled={checkboxLoading[topic._id]}
                        onChange={(e) => {
                          e.stopPropagation()
                          handleLectureCheckbox(topic._id)
                        }}
                      />
                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}