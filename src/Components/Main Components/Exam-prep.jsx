import { div } from 'framer-motion/client'
import React from 'react'
import { useState, useEffect } from 'react'
import ShowAnswerPage from './ShowAnswerPage'
import { motion } from "framer-motion"


const ExamPrep = () => {
    const [activeSubject, setActiveSubject] = useState('physics')
    const [isAnswer, setIsAnswer] = useState(false)
    const [currentID, setCurrentID] = useState('')

    // OrderIndex : physics-0,  chemistry-1

    const allSubjects = [
        {
            image: "/exam.svg",
            head: "Physics Olympiad",
            sub: "physics",
            index: [
                {
                    id: 'p1',
                    unit: "Force and Motion",
                    question: "According to the first law of motion, a body moving at a constant speed in a straight line or at rest will continue to be in that state until some external force is applied",
                    solution: "solution1.mp4"
                },
                {
                    id: 'p2',
                    unit: "Electrostatics",
                    question: "According 2 to the first law of motion, a body moving at a constant speed in a straight line or at rest will continue to be in that state until some external force is applied",
                    solution: "solution1.mp4"
                },
                {
                    id: 'p3',
                    unit: "Pelectrostatics",
                    question: "According to the first law of motion, a body moving at a constant speed in a straight line or at rest will continue to be in that state until some external force is applied",
                    solution: "solution1.mp4"
                },
            ],
            extra: "NePhO"
        },
        {
            image: "/exam.svg",
            head: "Chemistry Olympiad",
            sub: "chemistry",
            index: [
                {
                    id: 'c1',
                    unit: "Haloalkane",
                    question: "According to the first law of motion, a body moving at a constant speed in a straight line or at rest will continue to be in that state until some external force is applied",
                    solution: "solution1.mp4"
                },
                {
                    id: 'c2',
                    unit: "Radio Activity",
                    question: "According to the first law of motion, a body moving at a constant speed in a straight line or at rest will continue to be in that state until some external force is applied",
                    solution: "solution1.mp4"
                },
                {
                    id: 'c3',
                    unit: "Sedio Activity",
                    question: "According to the first law of motion, a body moving at a constant speed in a straight line or at rest will continue to be in that state until some external force is applied",
                    solution: "solution1.mp4"
                },
            ],
            extra: "Chemtion"
        },

    ]
    // const getCurrentQuestionList = () => {

    // }
    useEffect(() => {
        if (activeSubject == 'physics') {
            setCurrentQuestions(allSubjects[0])
        }
        else if (activeSubject == 'chemistry') {
            setCurrentQuestions(allSubjects[1])
        }
    }, [activeSubject])


    const subClicked = (sub) => {
        setActiveSubject(sub)
        setIsAnswer(false)
    }
    const toggleIsAnswer = (subId) => {
        if (currentID == subId && isAnswer) {
            setIsAnswer(false)
        }
        else if (isAnswer == false) {
            setIsAnswer(true)
        }
    }

    const [currentQuestions, setCurrentQuestions] = useState(allSubjects[0])

    return (
        <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mainContainerofExamPrep flex gap-2'>

            <motion.div initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }} className="sidebarExamPrep cursor-pointer w-[30vw] h-[80vh] overflow-auto gap-1 pt-5 sticky top-0 flex flex-col items-center">
                {allSubjects.map((item) => {
                    return (
                        <div key={item.head} className='w-full flex flex-col items-center gap-1'>
                            <div onClick={() => { subClicked(item.sub) }} className={`${activeSubject == item.sub && 'bg-blue-200 '}oneSubjectSectionPhysics hover:bg-blue-100 flex gap-8 pl-4 py-3 w-[85%] border-b border-b-slate-300 border-l-blue-600 border-l-4`}>
                                <img src={`${item.image}`} alt="subject" />
                                <div className="sideMiniDiv flex flex-col"><p className='font-semibold'>{item.head}</p><p className='text-slate-400 text-[13px] font-semibold'>{item.extra}</p></div>
                            </div>
                            <div className={`${activeSubject == item.sub ? 'flex' : 'hidden'} units flex-col gap-3 w-[90%] ml-6 rounded-sm`}>
                                {item.index.map((secondItem) => {
                                    return (

                                        <div key={secondItem.id} onClick={() => {
                                            setCurrentID(secondItem.id)
                                            setIsAnswer(true)
                                            toggleIsAnswer(secondItem.id)
                                        }} className={`${isAnswer & (currentID == secondItem.id) && 'bg-slate-200'} unit w-[calc(100%-20px)] flex flex-col gap-1 px-5 border-b rounded-md border-b-slate-300 py-4 hover:bg-slate-200`}><p className="unitName text-slate-400">{secondItem.unit}</p><p className="question line-clamp-1">{secondItem.question}</p></div>

                                    )
                                })}
                            </div>
                        </div>
                    )
                })}


            </motion.div>


            <div className="examPrepMain w-[67vw] flex flex-col gap-8 pt-8">
                {!isAnswer ? currentQuestions.index.map((item) => {
                    return (
                        <motion.div initial={{ scale: 0 }}  // Start from extremely small
                        animate={{ scale: 1 }}  // Grow to normal size
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.5 }} // Triggers when 50% of the element is in view
                        className="mainComponentExamSection flex flex-col gap-8 w-[90%] py-4 px-8 mx-auto border border-slate-300 border-t-blue-500 border-t-4 rounded-sm">
                            <div className="topExamComponent flex gap-2"><img src={`${currentQuestions.image}`} alt="image" /><div className='flex flex-col'><div className='text-blue-500 text-[14px] font-semibold'>{currentQuestions.head}</div><div className='font-semibold'>{item.unit}</div></div></div>
                            <div className="hrline w-[90%] h-[1px] mt-[-5px] bg-slate-300"></div>
                            <div className="midExamComponent text-slate-700">{item.question}</div>
                            <div className="bottomExamComponent"> <button onClick={() => {
                                setCurrentID(item.id)
                                setIsAnswer(true)
                                toggleIsAnswer(item.id)
                            }} className='bg-blue-600 rounded-md text-white px-10 py-2 font-semibold hover:outline outline-blue-600 outline-offset-1'>See More ..</button></div>
                        </motion.div>
                    )
                }) : <ShowAnswerPage questionList={currentQuestions.index} questionID={currentID} />}




            </div>

        </motion.div>
    )
}

export default ExamPrep
