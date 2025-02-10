import { Input } from "antd"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useUser } from "../../Context/UserContext"
import { Settings, LogOut, UserPlus } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Post } from "../../../utils/API"
// import Image from "next/image" //Removed import for Next.js Image
const { Search } = Input

const AccountManagement = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
      <h1 className="text-2xl font-bold mb-4">This is account management section</h1>
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Close
      </button>
    </div>
  </motion.div>
)

export default function TopNav() {
  const { user, logout, token } = useUser()
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showAccountManagement, setShowAccountManagement] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isRotated, setIsRotated] = useState(false)
  useEffect(() => {
    if (user._id && user.email) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [user])

  const onSearch = (value) => {
    console.log(value)
  }

  const handleLogout = () => {
    setShowLogoutConfirm(true)
    setShowDropdown(false)
  }

  const confirmLogout = () => {
    logout()
    const response = Post({ url: "/users/logout", headers: token })
    console.log(response)
    window.location.href = "/"
  }

  const handleManagement = () => {
    setShowAccountManagement(true)
    setShowDropdown(false)
  }

  const handleTap = () => {
    setIsRotated(!isRotated) // Toggle the rotation state
  }

  return (
    <div className="w-full flex justify-evenly md:h-[50px] items-center bg-[white]">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full flex items-center"
      >
        <Link className="flex gap-2" to="/">
          <img className="h-[48px] w-[180px]" src="/logo.png" alt="logo" />
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Search
          placeholder="Search"
          onSearch={onSearch}
          style={{
            maxWidth: 500,
          }}
          className="rounded-lg border-green-400"
        />
      </motion.div>
      {isLoggedIn ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-2 items-center"
        >
          <div className="flex items-center gap-4 p-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
              {user?.image ? (
                <img
                  src={user.image || "/placeholder.svg"}
                  alt={user.fullname}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-bold text-3xl text-blue-800">{user?.fullname?.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <h1 className="font-semibold text-xl">{`Hi, ${user?.fullname}`}</h1>
          </div>
          <div className="relative">
            <motion.button
              onTap={handleTap} // Trigger the rotation on tap
              animate={{ rotate: isRotated ? 45 : 0 }}
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              <Settings size={28} />
            </motion.button>
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md py-2 z-10"
                >
                  <motion.button
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    onClick={handleManagement}
                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                  >
                    <UserPlus className="inline-block mr-2" size={18} />
                    Manage Account
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                  >
                    <LogOut className="inline-block mr-2" size={18} />
                    Logout
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/user/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-[500] text-[#fff] bg-[#7ED321] py-[5px] px-[16px] rounded-3xl"
            >
              Join / Login
            </motion.button>
          </Link>
        </motion.div>
      )}
      <AnimatePresence>
        {showAccountManagement && <AccountManagement onClose={() => setShowAccountManagement(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-6 rounded-lg shadow-xl"
            >
              <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
              <p>Are you sure you want to logout?</p>
              <div className="mt-4 flex justify-end space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  No
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Yes
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

