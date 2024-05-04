import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedText from "./animatedText";
import information from "../../../data/information.json";

const AboutMeComponent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <section id="about" className="h-screen">
      <div className="flex flex-col">
        <AnimatedText 
          text="A little about me..."
          className="font-bold text-center text-4xl laptop:text-5xl desktop:text-5xl"
        />
        <div 
          className="mt-16 mx-auto justify-center items-center gap-56 flex
            laptop:w-8/12 desktop:w-8/12
            phone:mt-8
            tablet:gap-40 tablet:mt-10"
        >
          {isInView && (
            <>
            <motion.img
              src={information.AboutMe.profilePic}
              alt="profile display"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0}}
              transition={{ duration: 1.5 }}
              className="rounded-full w-auto h-auto justify-start phone:hidden tablet:w-60 tablet:h-60"
            />
          </>
          )}
          <div ref={ref} className="flex flex-col">
            {isInView && information.AboutMe.information.map((text, index) => (
              <motion.span 
                key={index}
                className="text-justify text-2xl mb-10 phone:text-base phone:mb-5 tablet:text-sm tablet:mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0}}
                transition={{ duration: 1.5, delay: index * 0.5}}
              >
                {text}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMeComponent;