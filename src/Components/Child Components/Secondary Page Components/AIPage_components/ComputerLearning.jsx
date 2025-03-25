import React from 'react'
import { motion } from 'framer-motion'

const ComputerLearning = () => {
  return (
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
          
        </motion.div>

  )
}

export default ComputerLearning
