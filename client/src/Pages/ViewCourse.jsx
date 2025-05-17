import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

export default function ViewCourse() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);
  const fetched = useRef(false);  // Avoid multiple API calls in StrictMode

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    (async () => {
      try {
        const courseData = await getFullDetailsOfCourse(courseId, token);
        if (!courseData || !courseData.courseDetails) return;

        dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
        dispatch(setEntireCourseData(courseData.courseDetails));
        dispatch(setCompletedLectures(courseData.completedVideos));

        let lectures = 0;
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
          lectures += sec?.subSection?.length || 0;
        });
        dispatch(setTotalNoOfLectures(lectures));
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    })();
  }, [courseId, token]);  // Dependencies added

  return (
    <>
      <div className="relative flex flex-col sm:flex-row min-h-[calc(100vh-3.5rem)] w-full">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="flex-1 overflow-auto w-full">
          <div className="mx-2 sm:mx-6">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
}
