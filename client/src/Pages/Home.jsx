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
      <div className="relative mx-auto flex flex-col w-11/12 text-white justify-between items-center max-w-maxContent">

      
      {/* Button Section */}
        <Link to={"/signup"}>
          <div
            className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-100
            transition-all duration-200 hover:scale-95 w-fit">

            <div
              className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
              transition-all duration-200 group-hover:bg-richblack-900" >
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>

            
          </div>
        </Link>

        {/* Text Part */}
        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future With <HighlightText text={"Coding Skills"} />
        </div>

        <div className="mt-6 w-[90%] text-center text-lg font-bold text-richblack-200">
        With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        {/* Two Buttons Black and Yellow Button Part */}
        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book Demo
          </CTAButton>
        </div>

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
              <div className="text-4xl font-semibold">
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
            <div className="homepage_bg h-[310px]">

                    <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto ">
                        <div className="h-[200px]"></div>

                        <div className="flex flex-row gap-7 text-white">
                            
                                <CTAButton active={true} linkto={"/signup"}>
                                <div className="flex items-center gap-3">
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
            <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-7 mx-auto">

                <div className="flex flex-row gap-5 mb-10 mt-[95px]">
                    <div className="text-4xl font-semibold w-[45%]">
                        Get the Skills you need for a
                        <HighlightText text={"Job that is in demand"}/>
                    </div>

                    <div className="flex flex-col gap-10  items-start w-[40%]">
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
      <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900
                       text-white mx-auto my-20">
          <InstructorSection />
          <h2 className="text-4xl font-semibold text-center mt-10">
            Reviews from Other Learners
          </h2>
      </div>    

        {/* Footer Section */}
        <Footer />
    </div>
  );
};

export default Home;
