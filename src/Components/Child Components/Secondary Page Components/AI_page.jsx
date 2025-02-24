import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const topics = [
  {
    id: "topic1",
    title: "How Does a Computer Learn?",
  },
  {
    id: "topic2",
    title: "Image Recognization",
  },
  {
    id: "topic3",
    title: "Neural Network",
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
        className="w-[18vw] h-full p-5 sticky top-0 overflow-y-scroll shadow-2xl rounded-lg"
      >
        <h2 className="text-2xl text-purple-900 font-bold mb-4">Table of Contents</h2>
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
          <h2 className="text-3xl text-purple-900 font-bold mb-2">How Does a Computer Learn </h2>
          <p className="text-amber-800 text-md mt-10">Ever wondered how a lifeless box of metal and wires can recognize faces, recommend movies, or even chat like a human? Let’s break it down in the simplest way possible.</p>
          <p className="text-gray-800 mt-7 text-lg"> Imagine you found an alien on Earth who doesn’t know anything about human life. It has no idea what a dog is, what a cat is, or even what food tastes good. The only way it can learn is if you show it thousands of pictures of dogs and say, "This is a dog," and do the same for cats. Eventually, when it sees a new furry creature, it can take a guess—"Hey, that looks like a dog!" That’s exactly how a computer learns.<br /><br />
            We will throughly discuss and write code to <strong>train our models</strong> and predict new things based on that experience.<br /><br />
            <strong>Here is how this process is carried out</strong><br /><br />
            ➡️ At first we make a file (commonly in excel or dictionary) where known data is stored<br /><br />
            ➡️ Then, we will use <strong className="text-blue-600"><a href="https://numpy.org/doc/stable/user/absolute_beginners.html" target="_blank">Numpy</a></strong> and <strong className="text-blue-600"><a href="https://pandas.pydata.org/docs/getting_started/index.html#getting-started" target="_blank">Pandas</a></strong> to format data in proper order, so that we can accurately fed the data to our model.<br /><br />
            ➡️ Next, we will import any model based on our preferance. There are lot of models available for different complexities of operations.<br />  (eg. Linear, Polynomial, Neural Networks, etc)<br /><br />
            ➡️ We will show our known data to this model, where it identifies patterns and trends in data. Suppose we have data on free fall of objects, it's height and corresponding time of flight.<br /><br />
            ➡️ Finally we can input a variable(suppose height) and get the computer predicted value(time) without using formula, just by analyzing previous data.<br /><br />
          </p>
          <div id="ch-1_miniProject" className="miniproject w-full py-5 px-8 rounded-xl mt-5 flex flex-col gap-2 bg-slate-200">
            <h3 className="text-lg font-semibold">Project Section</h3>
            <div className="projectnamequest text-gray-700 mb-5">A mini project to understand how computer learns and predicts</div>
            <button className="gotoproject px-4 py-2 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200">Try a simple project </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="second_topic p-6 bg-white shadow-lg rounded-lg"
        >

          <div id="ch-2_miniProject" className="miniproject w-full py-5 px-8 rounded-xl mt-5 flex flex-col gap-2 bg-slate-200">
            <h3 className="text-lg font-semibold">Project Section</h3>
            <div className="projectnamequest text-gray-700 mb-5">A small project to understand how computer imaging works by actually creating one on you own</div>
            <button className="gotoproject px-4 py-2 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200">Try a simple project </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AI_page;
