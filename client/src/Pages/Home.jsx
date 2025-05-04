import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/Common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";

const Home = () => {
  return (
    
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 text-white justify-between items-center max-w-maxContent gap-8">

      
      {/* Button Section */}
        <Link to={"/signup"}>
          <div
            className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">

       {/* Become a Instructor Button */}
            <div
              className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900" >
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>

            
          </div>
        </Link>

        {/* Heading */}
        <div className="text-center text-4xl font-semibold">
          Empower Your Future With <HighlightText text={"Coding Skills"} />
        </div>

        {/* Sub Heading */}
        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
        With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        {/* CTA Buttons */}
        {/* Two Buttons Black and Yellow Button Part */}
        <div className="mt-8 flex flex-row gap-7">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book Demo
          </CTAButton>
        </div>

        {/* Video */}
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1  */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* Code Section 2 - bss iski position reverse krdenge*/}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}  
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Unlock your <HighlightText text={"coding potential"} /> with our
                online courses.
              </div>
            }
            subheading={
              "Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love."
            }
            ctabtn1={{
              btnText: "Try it yourself",
              active: true,
              linkto: "/signup",
            }}
            ctabtn2={{
              btnText: "Learn more",
              active: false,
              linkto: "/login",
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        {/* Explore More Section */} 
        <ExploreMore />
      </div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
            {/* Part 1 */}
            <div className="homepage_bg h-[320px]">
             {/* Explore Full Catagory Section */}
                    <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
                        <div className="lg:h-[150px]"></div>

                        <div className="flex flex-row gap-7 text-white lg:mt-8">
                            
                                <CTAButton active={true} linkto={"/signup"}>
                                <div className="flex items-center gap-2">
                                    Explore Full Catalog
                                    <FaArrowRight/>
                                </div>
                                </CTAButton>
                                <CTAButton active={false} linkto={"/signup"}> 
                                    <div>
                                        Learn More
                                    </div>
                                </CTAButton>
                        </div>
                    </div>

            </div>

            {/* Part - 2 */}
            <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">

                <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
                    <div className="text-4xl font-semibold lg:w-[45%]">
                        Get the Skills you need for a
                        <HighlightText text={"Job that is in demand"}/>
                    </div>

                    <div className="flex flex-col gap-10  items-start lg:w-[40%]">
                        <div className="text-[16px]">
                            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                        </div>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div>
                                Learn More
                            </div>
                        </CTAButton>
                    </div>
                </div>
                 {/* Part - 3 */}
            <TimelineSection/>

            <LearningLanguageSection/>
          
            </div>

           
      </div>

      {/* Section - 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
          <InstructorSection />
          <h2 className="text-4xl font-semibold text-center mt-8">
            Reviews from Other Learners
          </h2>
      </div>    

        {/* Footer Section */}
        <Footer />
    </div>
  );
};

export default Home;
