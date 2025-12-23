import React, { useState } from "react";
import { delay, motion } from "framer-motion";
import { Link } from "react-router-dom";

const GetStarted = () => {
    //const MotionLink = motion.create(Link);
    const [startTyping, setStartTyping] = useState(false);
  const lines = [
    "Hello! I’m Baldev the educator, your personal learning tutor here to make your learning journey simple and effortless.Feel free to ask me anything. I’m less like a tutor and more like a friend… so you can call me Balu 😜",
    "So, shall we get started? Just click the ‘Get Started’ button below!",
  ];
  const wordVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="h-screen bg-Primary flex justify-between items-center">
      <div className="flex flex-col gap-5 container mx-auto items-center">
        <motion.div
          className="font-bold text-5xl md:text-8xl mb-5 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.60 }}
          onAnimationComplete={() => setStartTyping(true)}
        >
          EduQuery AI
        </motion.div>
        <div className="w-full md:w-[34%] text-center my-2 text-QuaternaryText text-xs px-2 md:px-0 md:text-lg flex flex-col gap-3 min-h-[120px]">
          {lines.map((line, lineIndex) => {
            const words = line.split(" ");

            return (
              <motion.div
                key={lineIndex}
                className="flex flex-wrap justify-center gap-1"
                initial="hidden"
                animate={startTyping ? "visible" : "hidden"}
                transition={{
                  staggerChildren: 0.08,
                  delayChildren: lineIndex * 2.90 // line appears after previous line
                }}
              >
                {words.map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    variants={wordVariants}
                    className="inline-block"
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </motion.div>
            );
          })}
        </div>
        <div className="flex flex-col items-center">
          <Link to={"/login"}>
          <motion.div
          className="w-fit bg-Tertiary text-SecondaryText text-2xl md:text-4xl font-semibold px-8 md:px-12 text-center pb-3 pt-2 rounded-xl cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          >
            Get started
          </motion.div>
          </Link>
          <div className="px-1 mt-6 flex justify-center gap-0 md:gap-1 text-[0.45rem] md:text-[0.55rem] lg:text-sm text-QuaternaryText">
            <p className="font-semibold">Disclaimer:</p>
            <p>
              EduQuery AI may make mistakes. Please double-check any important
              information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
