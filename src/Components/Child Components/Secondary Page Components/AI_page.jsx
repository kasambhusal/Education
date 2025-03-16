import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Pandas from "./AIPage_components/Pandas";
import ComputerLearning from "./AIPage_components/ComputerLearning";
import Numpy from "./AIPage_components/Numpy";
import Matplotlib from "./AIPage_components/Matplotlib";

const topics = [
  {
    id: "topic1",
    title: "Pandas",
  },
  {
    id: "topic2",
    title: "Numpy",
  },
  {
    id: "topic3",
    title: "Matplotlib",
  },
  {
    id: "topic4",
    title: "Computers' Learning Way",
  },
];

const AI_page = () => {

  const [activeTopic, setActiveTopic] = useState('Pandas')
  const topicClicked = (title) => {
    setActiveTopic(title)
  }
  const renderComponent = ()=>{
    if(activeTopic == 'Pandas'){
      return <Pandas/>
    }
    else if(activeTopic == 'Numpy'){
      return <Numpy/>
    }
    else if(activeTopic == 'Matplotlib'){
      return <Matplotlib/>
    }
    else if(activeTopic == "Computers' Learning Way"){
      return <ComputerLearning/>
    }
  }

  return (
    <div className="flex h-screen overflow-y-auto w-full">
      {/* Sidebar (Table of Contents) */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[18vw] h-full p-5 sticky top-0 overflow-y-scroll shadow-2xl rounded-lg"
      >
        <h2 className="text-2xl text-purple-900 font-bold mb-4">Table of Contents</h2>
        {topics.map((topic) => (
          <div
            key={topic.id}
            onClick={()=>topicClicked(topic.title)}
            className={`${activeTopic == topic.title && 'text-blue-700 font-semibold scale-105'} cursor-pointer duration-200 p-2 rounded-md transition-all`}
          >
            {topic.title}
          </div>
        ))}
      </motion.div>

      {/* Content Section */}

      <div className="contentContainer p-10 space-y-20 min-h-full w-[65vw] pb-10">
        {renderComponent()}

      </div>
    </div>
  );
};

export default AI_page;
