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
    const [isMobile, setIsMobile] = useState(false)

    const { token, user } = useUser()

    // Check if we're on mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

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
                url: `/public/opportunities/get?category=${name.toLowerCase()}`,
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

    // Render filters for mobile
    const renderMobileFilters = () => {
        return (
            <div className="flex flex-col gap-3 mb-4">
                <input
                    type="text"
                    placeholder={`Search ${name}...`}
                    className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-2">
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
                </div>
                {user.role === "ADMIN" && (
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => setIsNewPostOpen(true)}
                    >
                        + Add New
                    </button>
                )}
            </div>
        )
    }

    // Render filters for desktop
    const renderDesktopFilters = () => {
        return (
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder={`Search ${name}...`}
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
                {user.role === "ADMIN" && (
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => setIsNewPostOpen(true)}
                    >
                        + Add New
                    </button>
                )}
            </div>
        )
    }

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="h-full">
            <div className={`${isMobile ? "flex flex-col" : "flex justify-between items-center"} mb-${isMobile ? "4" : "8"}`}>
                <h2 className={`text-2xl font-bold text-gray-800 ${isMobile ? "mb-3" : ""}`}>{name}</h2>
                {isMobile ? renderMobileFilters() : renderDesktopFilters()}
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
