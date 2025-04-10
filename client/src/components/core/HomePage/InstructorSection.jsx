import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import { FaArrowRight } from 'react-icons/fa'
import CTAButton from "./Button"

const InstructorSection = () => {
  return (
    <div className='mt-16'>
        
        <div className='flex flex-row  gap-20 items-center '>

            <div className='w-[50%]'>
                <img src={Instructor}
                 alt="InstructorImage" 
                 className='shadow-white'/>
            </div>
            
            <div className='w-[50%] flex flex-col gap-10 '>
                <div className='text-4xl font-semibold w-[65%]'>
                    Become an
                    <HighlightText text={"Instructor"}/>
                </div>

                <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quia eum ratione sapiente dolores hic magni eaque voluptatibus, 
                </p>

                <div className='w-fit'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                        Start Learning Today
                        <FaArrowRight />
                    </div>
                </CTAButton>
                </div>
            </div>

        </div>
    </div>
  )
}

export default InstructorSection