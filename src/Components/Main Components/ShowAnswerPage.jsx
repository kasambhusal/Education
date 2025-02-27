import React, {useState} from 'react'
import { motion } from 'framer-motion';

const ShowAnswerPage = (props) => {
    const question = props.questionList.find(item => item.id === props.questionID) || {};
  return (
    <motion.div initial={{ scale: 0 }}  // Start from extremely small
    animate={{ scale: 1 }}  // Grow to normal size
    transition={{ duration: 0.5, ease: "easeOut" }}
    viewport={{ once: false, amount: 0.5 }} // Triggers when 50% of the element is in view
    className='mainAnswerDiv flex flex-col justify-between w-[90%] mx-auto min-h-[90vh]'>
      <div className="questionSection text-xl font-semibold">{question.question}</div>
    </motion.div>
  )
}

export default ShowAnswerPage
