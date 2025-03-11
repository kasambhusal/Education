import React, {useState} from 'react'
import { motion } from 'framer-motion';

const ShowAnswerPage = (props) => {
    const question = props.questionList.find(item => item.id === props.questionID) || {};
  return (
    <motion.div initial={{ scale: 0 }}  // Start from extremely small
    animate={{ scale: 1 }}  // Grow to normal size
    transition={{ duration: 0.3, ease: "circOut" }}
    viewport={{ once: false, amount: 0.5 }} // Triggers when 50% of the element is in view
    className='mainAnswerDiv flex flex-col gap-6 justify-between w-[90%] mx-auto min-h-[90vh]'>
      
      <div className="questionSection text-xl font-semibold px-5 py-3 bg-gradient-to-r text-white from-green-600 via-green-700 to-green-800 rounded-xl"
      dangerouslySetInnerHTML={{__html: question.question}}
    />
      <div className="answer Section text-lg leading-8"
        dangerouslySetInnerHTML={{__html: question.solution}}/>
    </motion.div>
  )
}

export default ShowAnswerPage
