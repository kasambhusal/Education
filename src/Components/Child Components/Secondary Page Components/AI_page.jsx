import React, { useState, useEffect, useRef } from "react";
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
  {
    id: "topic0",
    title: "Getting Started"
  },
  
  {
    id: "topic1",
    title: "Numpy",
  },
  {
    id: "topic2",
    title: "Pandas",
  },
  {
    id: "topic3",
    title: "Matplotlib",
  },
  {
    id: "topic4",
    title: "Introduction to ML"
  },
  {
    id: "topic5",
    title: "Regression"
  },
  {
    id: "topic6",
    title: "Classification"
  }
];


const AI_page = () => {
console.log("getting started: ", GettingStartedData.getStarted)

  const [activeTopic, setActiveTopic] = useState('Getting Started')
  const topicClicked = (title) => {
    setActiveTopic(title)
  }
  const renderComponent = ()=>{

    if(activeTopic == 'Pandas'){
      return <Pandas/>
    }
    else if(activeTopic == 'Getting Started'){
      return <AI_UnitWise project={GettingStartedData.getStarted}/>
    }
    else if(activeTopic == 'Numpy'){
      return <Numpy/>
    }
    else if(activeTopic == 'Matplotlib'){
      return <Matplotlib/>
    }
    else if(activeTopic == "Introduction to ML"){
      return <IntroToML/>
    }
    else if(activeTopic == "Regression"){
      return <Regression/>
    }
    else if(activeTopic == "Classification"){
      return <Classification/>
    }
  }

  return (
    <div className="flex lg:flex-row flex-col lg:min-h-screen min-h-[60vh] overflow-y-auto w-full">
     
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
