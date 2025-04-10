import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImage from "../../../assets/Images/TimelineImage.png"


const TimelineSection = () => {

    const timeline = [
        {
            logo: Logo1,
            heading: "Leadership",
            description: "Fully Commited to success company"
        },
        {
            logo: Logo2,
            heading: "Leadership",
            description: "Fully Commited to success company"
        },
        {
            logo: Logo3,
            heading: "Leadership",
            description: "Fully Commited to success company"
        },
        {
            logo: Logo4,
            heading: "Leadership",
            description: "Fully Commited to success company"
        },
    ]

  return (
    <div>
        <div className='flex flex-row gap-15px items-center'>

            {/* Left part */}
            <div className='w-[45%] flex flex-col gap-5'>
                {
                    timeline.map( (Element, index)  => {
                        return (
                            <div className='flex flex-row gap-6' key={index}>
                                {/* Image wala dabba */}
                                <div className='w-[50px] h-[50px] flex items-center text-white'>
                                    <img src={Element.logo} alt='logo'/>
                                </div>
                                {/* right wala dabba */}
                                <div>
                                    <h2 className='font-semibold text-[18px]'>{Element.heading}</h2>
                                    <p className='text-base'>{Element.description}</p>
                                </div>
                            </div>
                        )
                    } )
                }
            </div>

            {/* Right Part */}
            <div className='relative shadow-blue-200'>
                <img src={TimelineImage}
                 alt="TimelineImage"
                 className='shadow-white object-cover h-fit'
                 />

                 <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7
                                 left-[50%] translate-x-[-50%] translate-y-[-50%] '>
                     <div className='flex flex-row items-center gap-5 border-r border-caribbeangreen-300 px-7'>
                         <p className='text-3xl font-bold'>10</p>
                         <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                     </div>
                        
                      <div className='flex flex-row items-center gap-5 px-7'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300 text-sm'>Types of Courses</p>
                      </div>
                 </div>
            </div>
        </div>
    </div>
  )
}

export default TimelineSection