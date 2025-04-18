import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    // xl:w-fit:  content-fit
    // grid-cols-1: Iska matlb chhoti screen ke liye 1 columns
    // xl:grid-cols-4: Iska matlab badi screen ke liye 4 columns
    // w-[350px]: Chhoti screen ke liye
    // xl:w-fit: Large screens pe content ki width ke hisaab se adjust karega.
    <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            // NOTE: All dynamic_classes_based_on_conditions

            
            key={i}
            // sabse pehle first card( i===0 ) ka data render hoga, uske liye 2 columns chaiye badi screen ke liye
            className =
            {`
             ${i === 0 && "xl:col-span-2 xl:h-[294px]"} 
             ${
              // agar card order even nahi hai to bg-richblack-700 colour doge
              card.order % 2 === 1
                ? "bg-richblack-700 h-[294px]"
              // agar card order odd nahi hai to bg-richblack-700 colour doge
                : card.order % 2 === 0
                ? "bg-richblack-800 h-[294px]"
                // Agr order odd, even dono hee nahi hai to colour = transparent rakhenge
                : "bg-transparent"
            } 
             ${card.order === 3 && "xl:col-start-2"}  
             `}
            //  Agar card.order === 3, to ye 2nd column se start karega (only on large screens).





          >
             {/* NOTE: {conditional_content} */}

            {/* Iske matlb ye order: -1  ki baat kar rahe hai*/}
            {card.order < 0 ? (
              <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                <div className="text-4xl font-semibold ">
                  {card.heading}
                  <HighlightText text={card.highlightText} />
                </div>
                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              // Aur agar order = -1 nhi hai to ye deafult properties(-1 chhodkr saare orders ke liye)
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-richblack-5 text-lg">{card.heading}</h1>

                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;