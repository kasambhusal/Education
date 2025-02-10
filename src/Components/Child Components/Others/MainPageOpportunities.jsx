import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import UserAvatar from "../Secondary Page Components/UserAvatar"
import { Get } from "../../../utils/API"
import { useUser } from "../../Context/UserContext"
import PostTime from "../Secondary Page Components/PostTime"
import NewOpportunity from "../Secondary Page Components/NewOpportunity"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
}

export default function MainPageOpportunities({ name }) {
    const [opportunities, setOpportunities] = useState([])
    const [visibleOpportunities, setVisibleOpportunities] = useState(5)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedStatus, setSelectedStatus] = useState("All")
    const [isNewPostOpen, setIsNewPostOpen] = useState(false)

    const { token } = useUser()
    useEffect(() => {
        fetchOpportunities()
    }, [])

    const fetchOpportunities = async () => {
        try {
            const response = await Get({
                url: `http://localhost:4000/opportunities/get?category=${name}`,
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
            (selectedCategory === "All" || opportunity.category === selectedCategory) &&
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
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        <option value="Competitions">Competitions</option>
                        <option value="Hackathons">Hackathons</option>
                        <option value="Workshops">Workshops</option>
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
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => setIsNewPostOpen(true)}>
                        + Add New
                    </button>
                </div>
            </div>

            <AnimatePresence>
                <motion.div className="grid gap-4">
                    {filteredOpportunities.slice(0, visibleOpportunities).map((opportunity, index) => (
                        <motion.div
                            key={opportunity._id}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <UserAvatar user={opportunity.from} />
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{opportunity.title}</h3>
                                        <div className="mt-1">
                                            <PostTime date={opportunity.createdAt} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                        {opportunity.category}
                                    </span>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${opportunity.status === "Open"
                                            ? "bg-green-100 text-green-800"
                                            : opportunity.status === "Closed"
                                                ? "bg-red-100 text-red-800"
                                                : "bg-yellow-100 text-yellow-800"
                                            }`}
                                    >
                                        {opportunity.status}
                                    </span>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-700">{opportunity.text}</p>
                        </motion.div>
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

