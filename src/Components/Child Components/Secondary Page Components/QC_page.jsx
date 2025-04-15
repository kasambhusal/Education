import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import StartingPage_1 from "./QCPage_components/StartingPage_1";
import Fundamental_2 from "./QCPage_components/Fundamental_2";
import Mathematics_3 from "./QCPage_components/Mathematics_3";

const topics = [
  {
    id: "topic1",
    title: "Introduction to Quantum Computing",
  },
  {
    id: "topic2",
    title: "Fundamental of Quantum Mechanics"
  },
  {
    id: "topic3",
    title: "Mathematical Foundation"
  },
 
];


const QC_page = () => {

  const [activeTopic, setActiveTopic] = useState("Introduction to Quantum Computing");

  const topicClicked = (title) => setActiveTopic(title);

  const renderComponent = () => {
    switch (activeTopic) {
      case "Introduction to Quantum Computing": return <StartingPage_1 />; 
      case "Fundamental of Quantum Mechanics": return <Fundamental_2/>
      case "Mathematical Foundation": return <Mathematics_3/>
      default: return null;
    }
  };

  return (

      <div className="md:flex-row flex-col flex h-screen overflow-y-auto w-full">
        {/* Sidebar (Table of Contents) */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:w-[18vw] md:w-[25vw] w-[70vw] bg-purple-100 md:min-h-full min-h-[40vh] md:mx-0 mx-auto sm:px-0 md:px-5 px-8 py-5 md:sticky static top-0 overflow-y-scroll shadow-2xl rounded-lg"
        >
          <h2 className="text-2xl text-purple-900 font-bold mb-4">Table of Contents</h2>
          {topics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => topicClicked(topic.title)}
              className={`${activeTopic === topic.title ? 'text-blue-700 font-semibold scale-105' : ''} cursor-pointer duration-200 p-2 rounded-md transition-all`}
            >
              {topic.title}
            </div>
          ))}
        </motion.div>

        {/* Content Section */}

        <div className="contentContainer bg-blue-50 mx-auto md:px-10 sm:px-2 450:px-8 px-6 py-10 space-y-20 min-h-full md:w-[65vw] sm:w-[70vw] w-[92vw] pb-10">
        {renderComponent()}
        </div>
      </div>
  )
}

export default QC_page
