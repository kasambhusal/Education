import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const topics = [
  {
    id: "topic1",
    title: "How Does a Computer Learn?",
  },
  {
    id: "topic2",
    title: "Concepts",
  },
  {
    id: "topic3",
    title: "Implementation",
  },
];

const AI_page = () => {

  return (
    <div className="flex h-screen overflow-y-auto w-full">
      {/* Sidebar (Table of Contents) */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[15vw] h-full p-5 sticky top-0 overflow-y-scroll"
      >
        <h2 className="text-lg font-bold mb-4">Table of Contents</h2>
        {topics.map((topic) => (
          <div
            key={topic.id}
            className={`cursor-pointer p-2 rounded-md transition-all`}
          >
            {topic.title}
          </div>
        ))}
      </motion.div>

      {/* Content Section */}

      <div className="contentContainer p-10 space-y-20 min-h-full w-[65vw] pb-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-white shadow-lg rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-2">How Does a Computer Learn </h2>
          <p className="text-gray-700 text-sm">Ever wondered how a lifeless box of metal and wires can recognize faces, recommend movies, or even chat like a human? Let’s break it down in the simplest way possible.</p>
          <p className="text-gray-800 mt-10 text-md"> Imagine you found an alien on Earth who doesn’t know anything about human life. It has no idea what a dog is, what a cat is, or even what food tastes good. The only way it can learn is if you show it thousands of pictures of dogs and say, "This is a dog," and do the same for cats. Eventually, when it sees a new furry creature, it can take a guess—"Hey, that looks like a dog!" That’s exactly how a computer learns.<br/><br/>

            <strong>Computers don’t think like humans.</strong> They don’t have instincts or common sense. Instead, they learn through <strong>patterns in data.</strong> Every time you type on your phone, search for something online, or watch a video, computers collect and analyze this data to recognize trends and make predictions.
        <br/><br/>
            Here's how it works:
            - A computer is fed <strong>huge amounts of data</strong> (just like showing the alien many pictures of dogs and cats).
            - It identifies <strong>patterns and relationships</strong> in the data.
            - When given a <strong>new situation</strong>, it makes a prediction based on what it learned.

            This process is called <strong>Machine Learning</strong>. The more data it gets, the better it becomes at making accurate decisions. That’s why your phone gets better at <strong>predicting text</strong>, your social media suggests posts you’d like, and YouTube keeps recommending videos that match your interests.

            So the next time your phone suggests a song you love, just remember—it’s not because your phone has good taste. It just learned from what you played before!
          </p>
          <div id="ch-1_miniProject" className="miniproject w-full py-5 px-5 rounded-xl mt-5 flex flex-col gap-2 bg-slate-100">
            <h3 className="text-lg font-semibold">Project Section</h3>
            <div className="projectnamequest text-gray-700">A mini project to ....</div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AI_page;
