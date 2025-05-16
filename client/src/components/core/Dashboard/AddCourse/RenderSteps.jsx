import React from "react"
import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseInformationForm from "./CourseInformation/CourseInformationForm"   // step1
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"       // step2
import PublishCourse from "./PublishCourse"                       // step3


export default function RenderSteps() {


  // Redux store se current step (step) ko fetch kiya jata hai aur uske hisab se UI update hota hai, isse pata chalta hai ki user kis step par hai 1,2 ya 3
  const { step } = useSelector((state) => state.course)


  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {  
      id: 3,
      title: "Publish",
    },
  ]


  /**
   * Ye section steps ko visually represent karta hai.

      Har step ke liye ek button render hota hai. Agar current step (step) us step ke equal hai (step === item.id), to uska background aur border color change ho jata hai.

      Agar current step us step se bada hai (step > item.id), to check mark (FaCheck) display hota hai.

      Har step ke beech mein ek dashed line bhi display hoti hai, jo steps ko visually connect karti hai.


      Example:
          Agar step ki value 2 hai, to:

          Step 1 (Course Information) completed dikhega (check mark ke saath).

          Step 2 (Course Builder) current step dikhega (highlighted button ke saath).

          Step 3 (Publish) pending dikhega (normal button ke saath).


          If step === item.id, the step is highlighted with a yellow background.
          If step > item.id, it means the step is completed, so a ✅ (FaCheck) is shown.
          If step < item.id, it remains inactive with a gray background.



   */

  return (
    <>
      <div className="relative mb-2 flex w-full flex-wrap justify-center md:flex-nowrap">
        {steps.map((item) => (

            <React.Fragment key={item.id}>
              
            {/* Ye har step ko unique karne ke liye, aur unique behavior ke liye */}
            <div className="flex flex-col items-center">

               {/* Step Button */}
              <button
                className={`grid cursor-default aspect-square w-[28px] place-items-center rounded-full border-[1px] md:w-[34px]
                   ${
                  step === item.id  
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"  // Current Step (step === item.id)
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"   // Pending Step(step < item.id)
                   } 
                ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}   // Completed Step (step > item.id)
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />   // Check Mark
                ) : (
                  item.id   // Step Number
                )}
              </button>
              
            </div>
            {/* If the current step is completed, the line turns yellow (border-yellow-50). */}
            {/* If it is pending, the line remains gray (border-richblack-500) */}
            {item.id !== steps.length && (
              <div
                className={`h-[1px] w-[20%] border-dashed border-b-2 md:h-[calc(34px/2)] md:w-[33%]
                  ${step > item.id ? "border-yellow-50" : "border-richblack-500"}`}
              ></div>
            )}
            </React.Fragment>
        ))}
      </div>




      {/* Step Titles (Step ke Naam Dikhana): */}
      <div className="relative mb-8 flex w-full flex-wrap justify-between md:mb-16 md:flex-nowrap">
        {steps.map((item) => (
                    <React.Fragment key={item.id}>

            <div
              className="flex min-w-[100px] flex-col items-center gap-y-1 md:min-w-[130px] md:gap-y-2"
              key={item.id}
            >
              
              {/* If the step is active or completed (step >= item.id), the title appears in white (text-richblack-5). */}
              {/* If it is pending, the title appears in gray (text-richblack-500). */}
              <p
                className={`text-xs md:text-sm ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
            
            </React.Fragment>
        ))}
      </div>
      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 &&  <PublishCourse /> }
    </>
  )
}