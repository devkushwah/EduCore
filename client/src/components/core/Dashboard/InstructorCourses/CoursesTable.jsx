// Required modules aur hooks ko import kar rahe hain
import { useDispatch, useSelector } from "react-redux"
 import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
// ^ Responsive table ke components ko import kiya hai, jo different screen sizes par acche se display honge
import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
// ^ Responsive table ke CSS styles ko import kiya hai
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
// ^ Check icon import kiya hai jo published courses ke liye use hoga
import { FiEdit2 } from "react-icons/fi"
// ^ Edit icon import kiya hai jo course edit button ke liye use hoga
import { HiClock } from "react-icons/hi"
// ^ Clock icon import kiya hai jo draft courses ke liye use hoga
import { RiDeleteBin6Line } from "react-icons/ri"
// ^ Delete bin icon import kiya hai jo course delete button ke liye use hoga
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../../../services/formatDate"
// ^ Date formatting utility function ko import kiya hai, jo dates ko readable format me convert karega

import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"
// ^ API functions ko import kiya hai courses delete karne aur instructor ke courses fetch karne ke liye

import { COURSE_STATUS } from "../../../../utils/constants"
// ^ Course status constants ko import kiya hai (PUBLISHED, DRAFT) jisse status check kiya ja sake

import ConfirmationModal from "../../../Common/ConfirmationModal"
// ^ Confirmation modal component ko import kiya hai jo delete confirmation ke liye use hoga

// CoursesTable component define kar rahe hain
export default function CoursesTable({ courses, setCourses }) {
// ^ Component ko define kiya hai jisme courses array aur setCourses function as props pass kiye gaye hain

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { token } = useSelector((state) => state.auth)
  // ^ Redux store se authentication token extract kiya hai API calls me use karne ke liye
  
  // Local state define kar rahe hain loading status aur confirmation modal manage karne ke liye
  const [loading, setLoading] = useState(false)
  // ^ Loading state define kiya hai jo API calls ke time par true hoga
  
  const [confirmationModal, setConfirmationModal] = useState(null)
  // ^ Confirmation modal state define kiya hai jo delete confirmation ke liye use hoga
  
  // Constant define kar rahe hain description truncate karne ke liye
  const TRUNCATE_LENGTH = 30
  // ^ Ye constant define kiya hai jo course description ko truncate karne ke liye max word limit set karta hai

  // Function to handle course deletion
  const handleCourseDelete = async (courseId) => {
    // ^ Course delete karne ka async function hai jo courseId parameter leta hai
    
    setLoading(true)
    // ^ API call se pehle loading state ko true set kar rahe hain
    
    await deleteCourse({ courseId: courseId }, token)
    // ^ API call kar rahe hain course delete karne ke liye, courseId aur token pass karke
    
    const result = await fetchInstructorCourses(token)
    // ^ API call kar rahe hain updated courses list fetch karne ke liye
    
    if (result) {
      setCourses(result)
    }
    // ^ Agar API call successful hai, to courses list update kar rahe hain
    
    setConfirmationModal(null)
    // ^ Confirmation modal ko close kar rahe hain
    
    setLoading(false)
    // ^ Loading state ko false set kar rahe hain kyunki API call complete ho gaya hai
  }

  // Component render kar rahe hain
  return (
    <>
      {/* Table render kar rahe hain */}
      <Table className="rounded-xl border border-richblack-800 ">
      {/* // ^ Table component render kar rahe hain with border styling */}
      
        <Thead>
        {/* // ^ Table header section define kar rahe hain */}
        
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
          {/* // ^ Table row with styling define kar rahe hain */}
          
            <Th className="flex-1 text-left text-sm font-medium uppercase text-white md:text-richblack-100">
              Courses
            </Th>
            {/* // ^ Course column header define kar rahe hain */}
            
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Duration
            </Th>
            {/* // ^ Duration column header define kar rahe hain */}
            
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>
            {/* // ^ Price column header define kar rahe hain */}
            
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
            {/* // ^ Actions column header define kar rahe hain */}
            
          </Tr>
        </Thead>
        
        <Tbody>
        {/* // ^ Table body section define kar rahe hain */}
        
          {courses?.length === 0 ? (
          // ^ Conditional rendering: agar courses array empty hai to
          
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses found
                {/* TODO: Need to change this state */}
              </Td>
              {/* // ^ "No courses found" message display kar rahe hain */}
              
            </Tr>
          ) : (
          // ^ Conditional rendering: agar courses available hain to
          
            courses?.map((course) => (
            // ^ Har course ke liye map function se table row create kar rahe hain
            
              <Tr
                key={course._id}
                // ^ Unique key provide kar rahe hain react ke liye
                
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
                // ^ Row ki styling define kar rahe hain
              >
                <Td className="flex flex-1 gap-x-4">
                {/* // ^ Course details column define kar rahe hain */}
                
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  {/* // ^ Course thumbnail image display kar rahe hain */}
                  
                  <div className="flex flex-col justify-between">
                  {/* // ^ Course details ka container define kar rahe hain */}
                  
                    <p className="text-lg font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    {/* // ^ Course name display kar rahe hain */}
                    
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    {/* // ^ Course description display kar rahe hain, agar words TRUNCATE_LENGTH se jyada hain to truncate kar rahe hain */}
                    
                    <p className="text-[12px] text-white">
                      Created: {formatDate(course.createdAt)}
                    </p>
                    {/* // ^ Course creation date formatDate function ke through format karke display kar rahe hain */}
                    
                    {course.status === COURSE_STATUS.DRAFT ? (
                    // ^ Conditional rendering: agar course ka status DRAFT hai to
                    
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                      // ^ Draft status badge display kar rahe hain with clock icon
                      
                    ) : (
                    // ^ Conditional rendering: agar course ka status PUBLISHED hai to
                    
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                      // ^ Published status badge display kar rahe hain with check icon
                      
                    )}
                  </div>
                </Td>
                
                <Td className="text-sm font-medium text-richblack-100">
                  2hr 30min
                </Td>
                {/* // ^ Course duration display kar rahe hain (static value hai) */}
                
                <Td className="text-sm font-medium text-richblack-100">
                  ₹{course.price}
                </Td>
                {/* // ^ Course price display kar rahe hain with Rupee symbol */}
                
                <Td className="text-sm font-medium text-richblack-100 ">
                {/* // ^ Actions column define kar rahe hain */}
                
                  <button
                    disabled={loading}
                    // ^ Loading ke time par button disabled kar rahe hain
                    
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }}
                    // ^ Click handler define kar rahe hain jo edit course page par redirect karega
                    
                    title="Edit"
                    // ^ Button ka tooltip text set kar rahe hain
                    
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                    // ^ Button ki styling define kar rahe hain with hover effect
                  >
                    <FiEdit2 size={20} />
                    {/* // ^ Edit icon display kar rahe hain */}
                    
                  </button>
                  
                  <button
                    disabled={loading}
                    // ^ Loading ke time par button disabled kar rahe hain
                    
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }}
                    // ^ Click handler define kar rahe hain jo confirmation modal show karega with delete related information
                    
                    title="Delete"
                    // ^ Button ka tooltip text set kar rahe hain
                    
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                    // ^ Button ki styling define kar rahe hain with hover effect (red color on hover)
                  >
                    <RiDeleteBin6Line size={20} />
                    {/* // ^ Delete bin icon display kar rahe hain */}
                    
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      {/* // ^ Conditional rendering: agar confirmationModal state null nahi hai to ConfirmationModal component render kar rahe hain */}
    </>
  )
}


/**
 * WORKFLOW:
 * 1. CoursesTable component me courses array aur setCourses function props ke roop me pass kiye gaye hain
 * 2. Redux dispatch aur navigation hooks initialize kiye gaye hain 
 * 3. Redux store se token extract kiya gaya hai
 * 4. Local state define kiya gaya hai loading status aur confirmation modal ke liye 
 * 5. handleCourseDelete function define kiya gaya hai course deletion ke liye
 * 6. Component me table render kiya gaya hai courses ke liye with course details, duration, price, action columns   
 * 7. Courses array ke length ke basis par conditional rendering kiya gaya hai 
 * 8. Har course ke liye map function se table row create kiya gaya hai 
 * 9. Course details, duration, price, actions display kiye gaye hain
 * 10. Edit button click par edit course page par redirect kiya gaya hai
 * 11. Delete button click par confirmation modal show kiya gaya hai delete confirmation ke liye 
 * 12. Confirmation modal me delete course confirmation message display kiya gaya hai
 * 13. Confirmation modal me delete button click par handleCourseDelete function call kiya gaya hai
 * 14. Confirmation modal me cancel button click par modal ko close kiya gaya hai
 * 15. Component me confirmationModal state ke basis par ConfirmationModal component render kiya gaya hai
 *  
 */