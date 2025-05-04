import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import { FaArrowRight } from 'react-icons/fa'
import CTAButton from "./Button"

const InstructorSection = () => {
  return (
    <div >
        
        <div className='flex flex-col lg:flex-row gap-20 items-center '>

            <div className='lg:w-[50%]'>
                <img src={Instructor}
                 alt="InstructorImage" 
                 className='shadow-white shadow-[-20px_-20px_0_0]'/>
            </div>
            
            <div className='lg:w-[50%] flex flex-col gap-10 '>
                <div className='lg:w-[50%] text-4xl font-semibold'>
                    Become an
                    <HighlightText text={"Instructor"}/>
                </div>

                <p className='font-medium text-[16px] w-[90%] text-justify  text-richblack-300'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quia eum ratione sapiente dolores hic magni eaque voluptatibus, 
                </p>

                <div className='w-fit'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex items-center gap-3'>
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