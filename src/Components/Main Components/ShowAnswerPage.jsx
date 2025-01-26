import React, {useState} from 'react'

const ShowAnswerPage = (props) => {
    const question = props.questionList.find(item => item.id === props.questionID) || {};
  return (
    <div className='mainAnswerDiv flex flex-col justify-between w-[90%] mx-auto min-h-[90vh]'>
      <div className="questionSection text-xl font-semibold">{question.question}</div>
    </div>
  )
}

export default ShowAnswerPage
