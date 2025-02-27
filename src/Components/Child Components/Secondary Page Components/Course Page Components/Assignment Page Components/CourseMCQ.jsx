// CourseMCQ.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Spin } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useUser } from '../../../../Context/UserContext';
import { Get, Post } from '../../../../../utils/API';

const CourseMCQ = () => {
    const { courseName } = useParams();
    const [course, setCourse] = useState(null);
    const [currentMcqIndex, setCurrentMcqIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [loading, setLoading] = useState(true);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [results, setResults] = useState({ total: 0, correct: 0, incorrect: 0 });
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const { user, token } = useUser();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await Get({
                    url: `/public/courses/${courseName}`,
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                });
                setCourse(response.data);
                setResults(prev => ({ ...prev, total: response.data.mcqs.length }));
            } catch (error) {
                console.error('Failed to fetch course data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseName, token]);

    const handleSubmit = async () => {
        if (!selectedAnswer) {
            setNotificationMessage('Please select an answer');
            setShowNotification(true);
            setIsCorrect(false);
            return;
        }

        const currentMcq = course.mcqs[currentMcqIndex];
        const isAnswerCorrect = selectedAnswer === currentMcq.correct;

        try {
            const postData = {
                userId: user._id,
                questionId: currentMcq._id,
                courseId: course._id,
                courseName: course.name,
                isCorrect: isAnswerCorrect
            };

            await Post({
                url: "/public/courses/update-mcq",
                data: postData,
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });

            setNotificationMessage(isAnswerCorrect ? 'Correct answer!' : 'Incorrect. The correct answer is shown.');
            setShowNotification(true);
            setIsCorrect(isAnswerCorrect);
            setShowCorrectAnswer(true);

            if (isAnswerCorrect) {
                setResults(prev => ({
                    ...prev,
                    correct: prev.correct + 1,
                }));
            } else {
                setResults(prev => ({
                    ...prev,
                    incorrect: prev.incorrect + 1,
                }));
            }

            setTimeout(() => {
                if (currentMcqIndex < course.mcqs.length - 1) {
                    setCurrentMcqIndex(currentMcqIndex + 1);
                    setSelectedAnswer('');
                    setShowNotification(false);
                    setShowCorrectAnswer(false);
                } else {
                    setQuizCompleted(true);
                    setShowNotification(false);
                    setShowCorrectAnswer(false);
                }
            }, 2000);

        } catch (error) {
            console.error('Failed to update MCQ progress', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (!course || !course.mcqs || course.mcqs.length === 0) {
        return (
            <div className="text-center p-6">
                <h1 className="text-3xl font-bold mb-6">{courseName}</h1>
                <p>No MCQs available for this course.</p>
            </div>
        );
    }

    const currentMcq = course.mcqs[currentMcqIndex];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="p-6 min-h-screen flex flex-col items-center justify-center bg-gray-100"
        >
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">{course.name} MCQs</h1>
                {!quizCompleted ? (
                    <>
                        <div className="mb-6 bg-blue-100 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${((currentMcqIndex + 1) / course.mcqs.length) * 100}%` }}
                            ></div>
                        </div>
                        <div className="mb-4 flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-700">Question {currentMcqIndex + 1} of {course.mcqs.length}</span>
                            <div className="flex items-center">
                                <span className="mr-2 text-sm text-gray-600">Difficulty:</span>
                                {[...Array(4)].map((_, i) => (
                                    i < currentMcq.complexity ? (
                                        <StarFilled key={i} className="text-yellow-400" />
                                    ) : (
                                        <StarOutlined key={i} className="text-gray-300" />
                                    )
                                ))}
                            </div>
                        </div>
                        <h2 className="text-xl mb-6 text-gray-800">{currentMcq.question}</h2>
                        <div className="space-y-4">
                            {currentMcq.options.map((option, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedAnswer(String.fromCharCode(65 + index))}
                                    className={`w-full p-4 text-left rounded-lg transition-colors duration-200 ${selectedAnswer === String.fromCharCode(65 + index)
                                        ? 'bg-blue-500 text-white'
                                        : showCorrectAnswer && String.fromCharCode(65 + index) === currentMcq.correct
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                        }`}
                                    disabled={showCorrectAnswer}
                                >
                                    <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                                    {option}
                                </motion.button>
                            ))}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSubmit}
                            className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                            disabled={showCorrectAnswer}
                        >
                            Submit Answer
                        </motion.button>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-blue-600">Quiz Completed!</h2>
                        <div className="space-y-4">
                            <p className="text-lg">Total Questions: <span className="font-semibold">{results.total}</span></p>
                            <p className="text-lg text-green-600">Correct Answers: <span className="font-semibold">{results.correct}</span></p>
                            <p className="text-lg text-red-600">Incorrect Answers: <span className="font-semibold">{results.incorrect}</span></p>
                            <div className='flex w-full justify-end'> <Link to="/courses">Learn more from courses</Link> </div>
                        </div>
                    </motion.div>
                )}
            </div>
            <AnimatePresence>
                {showNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full text-white font-semibold ${isCorrect ? 'bg-green-500' : 'bg-red-500'
                            }`}
                    >
                        {notificationMessage}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CourseMCQ;