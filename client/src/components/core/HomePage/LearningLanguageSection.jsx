import React from 'react'
import HighlightText from './HighlightText'
import Know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Compare_with_others from "../../../assets/Images/Compare_with_others.png"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./Button"

const LearningLanguageSection = () => {
  return (
    <div className='mt-[150px] mb-32'>

        <div className='flex flex-col gap-5 items-center'>

            <div className='text-4xl font-semibold text-center'>
                Your Swiss Knife For
                <HighlightText text={"learning any language"}/>
            </div>

            <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam repudiandae fuga quasi at laudantium eaque nostrum quod adipisicing elit. Laboriosam repudiandae fuga quasi at
            </div>

            <div className='flex flex-row items-center justify-center mt-5'>
                <img src={Know_your_progress} 
                alt="KnowYourprogessImgage"
                className='object-contain -mr-32'
                 />
                 <img src={Compare_with_others} 
                alt="CpmareWithOthersImgage"
                className='object-contain'
                 />
                 <img src={Plan_your_lessons} 
                alt="PlanYourLessonImgage"
                className='object-contain -ml-36'
                 />
            </div>

            <div className='w-fit'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div>
                        Learn More
                    </div>
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default LearningLanguageSection