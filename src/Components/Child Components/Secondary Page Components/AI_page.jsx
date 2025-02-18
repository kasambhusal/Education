import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const topics = [
  { id: "topic1", title: "How Does a Computer Learn", description: "This is a topic whici is also called topic" },
  { id: "topic2", title: "Concepts", description: "This section explains key concepts." },
  { id: "topic3", title: "Implementation", description: "How to implement the ideas." },
  { id: "topic4", title: "Conclusion", description: "Wrapping up the topic." },
  { id: "topic5", title: "Introduction", description: "This is the introduction section." },
  { id: "topic6", title: "conceptual cnocept", description: "This section explains key concepts." },
  { id: "topic7", title: "Implementation of implementing", description: "How to implement the ideas." },
  { id: "topic8", title: "Conclusion of conclusions", description: "Wrapping up the topic." },
];

const ScrollableContent = () => {
  const [activeTopic, setActiveTopic] = useState("topic1");
  const contentRefs = useRef({});

  // Scroll-based highlighting logic
  useEffect(() => {
    const handleScroll = () => {
      let currentActive = "topic1";
      for (const topic of topics) {
        const section = contentRefs.current[topic.id];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentActive = topic.id;
          }
        }
      }
      setActiveTopic(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToTopic = (id) => {
    const section = contentRefs.current[id];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex h-screen overflow-y-auto w-full">
      {/* Sidebar (Table of Contents) */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[15vw] h-full p-5 sticky top-0 overflow-y-auto"
      >
        <h2 className="text-lg font-bold mb-4">Table of Contents</h2>
        {topics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => scrollToTopic(topic.id)}
            className={`cursor-pointer p-2 rounded-md transition-all ${
              activeTopic === topic.id ? "text-blue-500 font-semibold text-lg" : "hover:text-blue-600"
            }`}
          >
            {topic.title}
          </div>
        ))}
      </motion.div>

      {/* Content Section */}
      <div className="p-10 space-y-20 min-h-full w-[65vw] pb-10">
        {topics.map((topic) => (
          <motion.div
            key={topic.id}
            ref={(el) => (contentRefs.current[topic.id] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>
            <p className="text-gray-700">{topic.description}</p>
            <div id="ch-1_miniProject" className="miniproject w-full py-5 px-5 rounded-xl mt-5 flex flex-col gap-2 bg-slate-100">
                <h3 className="text-lg font-semibold">Project Section</h3>
                <div className="projectnamequest text-gray-700">A mini project to ....</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScrollableContent;
