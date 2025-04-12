import React, { useState } from "react";
import { motion } from "framer-motion";
import Pandas from "./AIPage_components/Pandas";
import IntroToML from "./AIPage_components/IntroToML";
import Numpy from "./AIPage_components/Numpy";
import Matplotlib from "./AIPage_components/Matplotlib";
import GettingStarted from "./AIPage_components/GettingStarted";
import AI_UnitWise from "./AI_UnitWise";
import GettingStartedData from "./Course Page Components/JsonFile_AI/AI_1.json";
import Regression from "./AIPage_components/Regression";
import Classification from "./AIPage_components/Classification";

const topics = [
  { id: "topic0", title: "Getting Started" },
  { id: "topic1", title: "Numpy" },
  { id: "topic2", title: "Pandas" },
  { id: "topic3", title: "Matplotlib" },
  { id: "topic4", title: "Introduction to ML" },
  { id: "topic5", title: "Regression" },
  { id: "topic6", title: "Classification" },
];

const AI_page = () => {
  const [activeTopic, setActiveTopic] = useState("Getting Started");

  const topicClicked = (title) => setActiveTopic(title);

  const renderComponent = () => {
    switch (activeTopic) {
      case "Pandas": return <Pandas />;
      case "Getting Started": return <AI_UnitWise project={GettingStartedData.getStarted} />;
      case "Numpy": return <Numpy />;
      case "Matplotlib": return <Matplotlib />;
      case "Introduction to ML": return <IntroToML />;
      case "Regression": return <Regression />;
      case "Classification": return <Classification />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-y-auto w-full">
      
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="lg:w-[18vw] md:w-[25vw] w-[70vw] md:min-h-full min-h-[60vh] md:mx-0 mx-auto md:px-5 sm:px-0 px-8 py-5 md:sticky static top-0 overflow-y-scroll shadow-2xl rounded-lg"
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
      <div className="contentContainer mx-auto md:px-10 sm:px-2 450:px-8 px-6 py-10 space-y-20 min-h-full md:w-[65vw] sm:w-[70vw] w-[100vw] pb-10">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AI_page;
