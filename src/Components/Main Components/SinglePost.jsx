import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { CloseOutlined } from "@ant-design/icons"  // Import Ant Design icon
import Post from "../Child Components/Secondary Page Components/Post"
import { useUser } from "../Context/UserContext"
import { Get } from "../../utils/API"
import PleaseLogin from "../Child Components/Others/PleaseLogin"

const SinglePost = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { token } = useUser()

    useEffect(() => {
        window.scrollTo({ top: 100, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await Get({
                    url: `/clubs/get/id/${id}`,
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                })
                const data = await response?.data;
                setPost(data)
                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }

        fetchPost()
    }, [id, token])

    const handleCancel = () => {
        navigate("/clubs")
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }
    if (!token) {
        return <PleaseLogin />
    }
    if (loading) {
        return (
            <motion.div
                className="flex justify-center items-center min-h-screen bg-gray-100"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
                    <div className="animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-64 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                </div>
            </motion.div>
        )
    }

    if (error) {
        return (
            <motion.div
                className="flex justify-center items-center min-h-screen bg-gray-100"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
                    <p className="text-red-500">Error: {error}</p>
                    <button
                        onClick={handleCancel}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Back to Clubs
                    </button>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            className="flex justify-center items-start min-h-screen bg-gray-100 pt-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="w-full max-w-3xl relative ">
                <motion.button
                    onClick={handleCancel}
                    className="absolute  right-0 w-9 h-9 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <CloseOutlined className=" text-gray-600" />  {/* Ant Design icon */}
                </motion.button>
                {post && <Post post={post} />}
            </div>
        </motion.div>
    )
}

export default SinglePost
