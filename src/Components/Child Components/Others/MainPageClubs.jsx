import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

export default function MainPageClubs({ name }) {
    const clubData = {
        "Physics Club": [
            {
                title: "Quantum Mechanics Workshop",
                date: "March 25, 2024",
                category: "Workshop",
                status: "Open",
            },
            {
                title: "Astrophysics Lecture Series",
                date: "April 15, 2024",
                category: "Lecture",
                status: "Open",
            },
            {
                title: "Electromagnetics Quiz",
                date: "May 10, 2024",
                category: "Competition",
                status: "Closed",
            },
        ],
        "Math Club": [
            {
                title: "Advanced Calculus Bootcamp",
                date: "April 5, 2024",
                category: "Workshop",
                status: "Open",
            },
            {
                title: "Number Theory Challenge",
                date: "May 15, 2024",
                category: "Competition",
                status: "Coming Soon",
            },
            {
                title: "Linear Algebra Seminar",
                date: "June 12, 2024",
                category: "Lecture",
                status: "Open",
            },
        ],
        "Computer Club": [
            {
                title: "AI & Machine Learning Meetup",
                date: "April 18, 2024",
                category: "Hackathon",
                status: "Open",
            },
            {
                title: "Web Development Workshop",
                date: "May 22, 2024",
                category: "Workshop",
                status: "Closed",
            },
            {
                title: "Programming Contest",
                date: "June 3, 2024",
                category: "Competition",
                status: "Coming Soon",
            },
        ],
        "Chemistry Club": [
            {
                title: "Organic Chemistry Lab",
                date: "April 10, 2024",
                category: "Workshop",
                status: "Open",
            },
            {
                title: "Periodic Table Quiz",
                date: "May 5, 2024",
                category: "Competition",
                status: "Closed",
            },
            {
                title: "Chemical Bonding Seminar",
                date: "June 20, 2024",
                category: "Lecture",
                status: "Open",
            },
        ],
        "Literature Club": [
            {
                title: "Poetry Slam",
                date: "March 30, 2024",
                category: "Event",
                status: "Open",
            },
            {
                title: "Creative Writing Workshop",
                date: "April 25, 2024",
                category: "Workshop",
                status: "Open",
            },
            {
                title: "Book Club Discussion: Classics",
                date: "May 10, 2024",
                category: "Discussion",
                status: "Coming Soon",
            },
        ],
        "Geography Club": [
            {
                title: "Cartography Basics Workshop",
                date: "April 20, 2024",
                category: "Workshop",
                status: "Open",
            },
            {
                title: "World Geography Quiz",
                date: "May 18, 2024",
                category: "Competition",
                status: "Open",
            },
            {
                title: "Climate Change Seminar",
                date: "June 15, 2024",
                category: "Lecture",
                status: "Closed",
            },
        ],
    };

    const selectedArray = clubData[name] || [];
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="h-full"
        >
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                <div className="flex gap-4">
                    <select className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500">
                        <option>All Activities</option>
                        {selectedArray.map((item, index) => (
                            <option key={index}>{item.category}</option>
                        ))}
                    </select>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        + Add New
                    </button>
                </div>
            </div>

            <div className="grid gap-4">
                {selectedArray.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                                <p className="text-gray-600 mt-1">Date: {item.date}</p>
                            </div>
                            <div className="flex gap-4 items-center">
                                <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                    {item.category}
                                </span>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${item.status === "Open"
                                        ? "bg-green-100 text-green-800"
                                        : item.status === "Coming Soon"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
