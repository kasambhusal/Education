"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Get } from "../../../utils/API"
import { useUser } from "../../Context/UserContext"
import NewOpportunity from "../Secondary Page Components/NewOpportunity"
import SingleOpportunity from "../Secondary Page Components/SingleOpportunity"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

export default function MainPageOpportunities({ name }) {
    const [opportunities, setOpportunities] = useState([])
    const [visibleOpportunities, setVisibleOpportunities] = useState(5)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedType, setSelectedType] = useState("All")
    const [selectedStatus, setSelectedStatus] = useState("All")
    const [isNewPostOpen, setIsNewPostOpen] = useState(false)
    const [uniqueTypes, setUniqueTypes] = useState([])

    const { token } = useUser()

    useEffect(() => {
        fetchOpportunities()
    }, [])

    useEffect(() => {
        // Extract unique types from opportunities
        const types = [...new Set(opportunities.map((opp) => opp.type))]
        setUniqueTypes(types)
    }, [opportunities])

    const fetchOpportunities = async () => {
        try {
            const response = await Get({
                url: `/opportunities/get?category=${name.toLowerCase()}`,
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            })
            setOpportunities(response)
        } catch (error) {
            console.error("Error fetching opportunities:", error)
        }
    }

    const filteredOpportunities = opportunities.filter(
        (opportunity) =>
            opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedType === "All" || opportunity.type === selectedType) &&
            (selectedStatus === "All" || opportunity.status === selectedStatus),
    )

    const handleShowMore = () => {
        setVisibleOpportunities((prevVisible) => prevVisible + 5)
    }

    const handleNewPost = () => {
        fetchOpportunities()
    }

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="h-full">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Search opportunities..."
                        className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="All">All Types</option>
                        {uniqueTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    <select
                        className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                        <option value="Coming Soon">Coming Soon</option>
                    </select>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => setIsNewPostOpen(true)}
                    >
                        + Add New
                    </button>
                </div>
            </div>

            <AnimatePresence>
                <motion.div className="grid gap-4">
                    {filteredOpportunities.slice(0, visibleOpportunities).map((opportunity, index) => (
                        <SingleOpportunity key={index} opportunity={opportunity} fetchOpportunities={handleNewPost} />
                    ))}
                </motion.div>
            </AnimatePresence>

            {visibleOpportunities < filteredOpportunities.length && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto block"
                    onClick={handleShowMore}
                >
                    Show More
                </motion.button>
            )}
            <NewOpportunity
                isOpen={isNewPostOpen}
                onClose={() => setIsNewPostOpen(false)}
                category={name}
                onPostCreated={handleNewPost}
            />
        </motion.div>
    )
}

