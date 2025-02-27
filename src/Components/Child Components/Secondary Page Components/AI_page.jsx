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
          <p className="text-lg mt-4 text-green-900">If it felt like overwhelming at first, <strong>No Need To Worry !!</strong> You can understand things more easily via a simple project.<br /> Are you ready to train your first AI model and predict new things !!!!</p>
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
          <h2 className="text-3xl text-purple-900 font-bold mb-2">How Does a Computer "See" Images?</h2> <p className="text-amber-800 text-md mt-10">Ever wondered how your phone unlocks by recognizing your face, or how social media tags your friends in photos? Let’s demystify how computers “see” and understand images!</p> <p className="text-gray-800 mt-7 text-lg"> Imagine teaching a toddler to recognize a cat. You’d point at a fluffy creature and say, “That’s a cat!”—over and over, with different cats. Eventually, the toddler learns to spot cats in new pictures. Computers learn the same way! Instead of eyes, they use **pixels** (tiny color dots) and patterns to “see.”<br /><br />
            We’ll show the computer thousands of labeled images (e.g., “cat,” “dog”) so it learns to spot differences. Let’s break it down:<br /><br />


            <strong>Here’s how image recognition works:</strong><br /><br />


            ➡️ Collect labeled images: We gather folders of pictures (e.g., 1,000 cat photos, 1,000 dog photos) and tag them. This is our “training data.” <br /><br />
            ➡️ Simplify the images: Computers don’t see colors or shapes like we do—they see numbers! Tools like <strong className="text-blue-600"><a href="https://numpy.org/" target="_blank">NumPy</a></strong> and <strong className="text-blue-600"><a href="https://pillow.readthedocs.io/en/stable/" target="_blank">PIL</a></strong> convert images into grids of numbers representing pixel colors.<br /><br />
            ➡️ Train a “visual brain”: We use special models called <strong>neural networks</strong> (like <strong className="text-blue-600"><a href="https://www.tensorflow.org/tutorials/images/cnn" target="_blank">CNNs</a></strong>) designed to spot edges, textures, and shapes. The model studies patterns in the pixel grids to learn differences between cats and dogs.<br /><br />
            ➡️ Test with new images: After training, we show the computer a photo it’s never seen. It checks the pixel patterns and guesses, “This looks 90% like a cat!”<br /><br />
          </p> <p className="text-lg mt-4 text-green-900"> If this sounds complex, <strong>don’t stress!</strong> You’ll be amazed how quickly it clicks with a hands-on project.<br /> Ready to teach a computer to recognize handwritten digits or sort photos of pizza vs. burgers? Let’s go! 🚀 </p>

          <div id="ch-2_miniProject" className="miniproject w-full py-5 px-8 rounded-xl mt-5 flex flex-col gap-2 bg-slate-200">
            <h3 className="text-lg font-semibold">Project Section</h3>
            <div className="projectnamequest text-gray-700 mb-5">A small project to understand how computer imaging works by actually creating one on you own</div>
            <button className="gotoproject px-4 py-2 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200">Try a simple project </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="second_topic p-6 bg-white shadow-lg rounded-lg"
        >
          <h2 className="text-3xl text-purple-900 font-bold mb-2">What Are Neural Networks? 🤖🧠</h2>

          <p className="text-amber-800 text-md mt-10">
            Ever wondered how self-driving cars recognize people, or how Google Translate understands languages? <br />
            The secret behind these amazing AI systems is something called <strong>Neural Networks!</strong>
          </p>

          <p className="text-gray-800 mt-7 text-lg">
            Imagine you’re teaching a baby how to recognize apples. You don’t give them a list of apple rules, to memorize every characterstics of apple right? 🍎<br />
            Instead, you show them lots of apples, and over time, they just “get it.” Neural networks work the same way!<br /><br />

            Instead of a brain, a computer has layers of <strong>artificial neurons.</strong> These neurons don’t "think" like humans, but they <strong>analyze patterns</strong> and learn from examples like you can recognize new people after looking them once or twice. Like a person notices a new person's nose, hair, face shape, eyes, etc; the computer does the same stuffs with a bunch of code.<br /><br />
            Just like creating a <strong>New Brain</strong> from some code 😎<br />

            <strong>Let’s break it down:</strong><br /><br />

            ➡️ <strong>Input Layer (What the computer sees 👀)</strong>: Just like our eyes see objects, the network starts by receiving raw data (e.g., an image, text, or sound).<br /><br />

            ➡️ <strong>Hidden Layers (The thinking process 🧠)</strong>: The magic happens here! The network looks for patterns, like the shape of a letter in handwriting or the edges of a face in an image.<br /><br />

            ➡️ <strong>Output Layer (The final decision 🎯)</strong>: After analyzing patterns, the model makes a prediction. For example, "This is a cat with 95% confidence!"<br /><br />

            <strong>Think of it like a giant game of ‘Guess the Object’:</strong><br />
            The first layer sees raw details (colors, shapes), the next layers refine them (curves, edges), and the final layer makes a smart guess!<br /><br />
          </p>

          <p className="text-lg mt-4 text-green-900">
            Sounds cool, right? Don’t worry if it feels complex at first! With a fun hands-on project, you’ll get the hang of it in no time. 🚀<br />
            Let’s train a neural network to recognize hand-drawn digits or even detect cats vs. dogs! 🐱🐶
          </p>

          <div id="ch-2_miniProject" className="miniproject w-full py-5 px-8 rounded-xl mt-5 flex flex-col gap-2 bg-slate-200">
            <h3 className="text-lg font-semibold">Project Section</h3>
            <div className="projectnamequest text-gray-700 mb-5">
              Let’s build a simple AI that can recognize handwritten numbers! 🎨🖊️
            </div>
            <button className="gotoproject px-4 py-2 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200">
              Try a simple project
            </button>
          </div>
        </motion.div>


      </div>
    </div>
  );
};

export default AI_page;
