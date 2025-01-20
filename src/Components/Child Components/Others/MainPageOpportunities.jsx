import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

export default function MainPageOpportunities({ name }) {
    const Competitions = [
        {
            title: "International Physics Olympiad",
            date: "March 15, 2024",
            category: "Competition",
            status: "Open",
        },
        {
            title: "National Mathematics Olympiad",
            date: "April 10, 2024",
            category: "Competition",
            status: "Open",
        },
        {
            title: "Chemistry Challenge",
            date: "May 5, 2024",
            category: "Competition",
            status: "Closed",
        },
        {
            title: "Biology Quiz Contest",
            date: "June 20, 2024",
            category: "Competition",
            status: "Coming Soon",
        },
        {
            title: "Regional Astronomy Olympiad",
            date: "July 15, 2024",
            category: "Competition",
            status: "Open",
        },
    ];

    const Hackathons = [
        {
            title: "Global Hackathon Challenge",
            date: "April 1, 2024",
            category: "Hackathon",
            status: "Coming Soon",
        },
        {
            title: "AI Innovation Sprint",
            date: "May 20, 2024",
            category: "Hackathon",
            status: "Open",
        },
        {
            title: "Sustainable Tech Hack",
            date: "June 10, 2024",
            category: "Hackathon",
            status: "Closed",
        },
        {
            title: "Code for Climate",
            date: "July 1, 2024",
            category: "Hackathon",
            status: "Open",
        },
        {
            title: "Blockchain Buildathon",
            date: "August 5, 2024",
            category: "Hackathon",
            status: "Coming Soon",
        },
    ];

    const Workshops = [
        {
            title: "AI Workshop Series",
            date: "March 20, 2024",
            category: "Workshop",
            status: "Open",
        },
        {
            title: "Cybersecurity Essentials",
            date: "April 15, 2024",
            category: "Workshop",
            status: "Open",
        },
        {
            title: "Data Science Bootcamp",
            date: "May 25, 2024",
            category: "Workshop",
            status: "Coming Soon",
        },
        {
            title: "Web Development Masterclass",
            date: "June 30, 2024",
            category: "Workshop",
            status: "Closed",
        },
        {
            title: "Machine Learning Crash Course",
            date: "July 20, 2024",
            category: "Workshop",
            status: "Open",
        },
    ];

    const selectedArray = name === 'Competitions' ? Competitions : name === 'Hackathons' ? Hackathons : Workshops;
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
                        <option>All {name}</option>
                        <option>{name} 1</option>
                        <option>{name} 2</option>
                        <option>{name} 3</option>
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
                                <span className={`px-3 py-1 rounded-full text-sm ${item.status === 'Open'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                    }`}>
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

