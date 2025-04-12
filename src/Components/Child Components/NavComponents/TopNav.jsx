"use client"

import { Input } from "antd"
import { useEffect, useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../../Context/UserContext"
import { Settings, LogOut, UserPlus, Menu, X, SearchIcon, ArrowLeft, Zap } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Post } from "../../../utils/API"
import { DashboardOutlined } from "@ant-design/icons"
const { Search } = Input

// Search data
const searchData = [
  {
    id: 1,
    name: "Oppourtunities",
    URL: "/menu/opportunities",
    icon: "🚀",
  },
  {
    id: 2,
    name: "Clubs",
    URL: "/menu/clubs",
    icon: "🤝",
  },
  {
    id: 3,
    name: "Learn React js",
    URL: "/menu/courses/web-development-with-react",
    icon: "⚛️",
  },
  {
    id: 4,
    name: "SAT preparation",
    URL: "/menu/courses/sat-preparation",
    icon: "📚",
  },
  {
    id: 5,
    name: "Physics Olympiad",
    URL: "/menu/courses/physics-olympaid-guide",
    icon: "🔭",
  },
  {
    id: 6,
    name: "Math Olympiad",
    URL: "menu/courses/math-olympaid-guide",
    icon: "🧮",
  },
  {
    id: 7,
    name: "AI and Quantum",
    URL: "menu/courses/math-olympaid-guide",
    icon: "🤖",
  },
]

const AccountManagement = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <motion.div
      className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <h1 className="text-2xl font-bold mb-4">This is account management section</h1>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
      >
        Close
      </button>
    </motion.div>
  </motion.div>
)

export default function TopNav() {
  const { user, logout, token } = useUser()
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showAccountManagement, setShowAccountManagement] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isRotated, setIsRotated] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileSearchQuery, setMobileSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [mobileSearchResults, setMobileSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const searchResultsRef = useRef(null)
  const searchInputRef = useRef(null)
  const mobileSearchInputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (user._id && user.email) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [user])

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches).slice(0, 3))
      } catch (e) {
        console.error("Error parsing recent searches", e)
      }
    }
  }, [])

  useEffect(() => {
    // Close search results when clicking outside
    const handleClickOutside = (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (value) => {
    setSearchQuery(value)

    if (value.trim() === "") {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    // Filter search data based on query
    const filteredResults = searchData.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))

    setSearchResults(filteredResults)
    setShowSearchResults(true)
  }

  const handleMobileSearch = (value) => {
    setMobileSearchQuery(value)

    if (value.trim() === "") {
      setMobileSearchResults([])
      return
    }

    // Filter search data based on query
    const filteredResults = searchData.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))

    setMobileSearchResults(filteredResults)
  }

  const saveRecentSearch = (item) => {
    const newRecentSearches = [item, ...recentSearches.filter((search) => search.id !== item.id)].slice(0, 3)
    setRecentSearches(newRecentSearches)
    localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches))
  }

  const handleSearchItemClick = (item) => {
    setShowSearchResults(false)
    setSearchQuery("")
    saveRecentSearch(item)
    navigate(item.URL)
  }

  const handleMobileSearchItemClick = (item) => {
    setMobileSearchQuery("")
    setMobileSearchResults([])
    saveRecentSearch(item)
    setShowMobileSearch(false)
    navigate(item.URL)
  }

  const handleLogout = () => {
    setShowLogoutConfirm(true)
    setShowDropdown(false)
    setMobileMenuOpen(false)
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
    setMobileMenuOpen(false)
  }

  const handleTap = () => {
    setIsRotated(!isRotated)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    if (showDropdown) setShowDropdown(false)
  }

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch)
    // Reset mobile search when toggling
    if (!showMobileSearch) {
      setMobileSearchQuery("")
      setMobileSearchResults([])
    }
  }

  // Animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const mobileSearchVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  }

  const searchResultsVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  }

  const searchItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  }

  const menuItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  }

  const logoVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const searchVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const userProfileVariants = {
    initial: { opacity: 0, x: 20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.4,
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
  }

  const avatarContainerVariants = {
    initial: { scale: 0.8, rotate: -10 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  }

  return (
    <div className="w-full bg-white shadow-md">
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            className="flex-shrink-0 flex items-center"
          >
            <Link className="flex gap-2" to="/">
              <img className="h-10 w-auto sm:h-12" src="/logo.png" alt="logo" />
            </Link>
          </motion.div>

          {/* Desktop Search - Hidden on mobile */}
          <motion.div
            variants={searchVariants}
            initial="initial"
            animate="animate"
            className="hidden md:block flex-1 max-w-md mx-4 relative"
            ref={searchInputRef}
          >
            <Search
              placeholder="Search courses, opportunities..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onSearch={handleSearch}
              className="rounded-lg"
              style={{
                width: "100%",
              }}
            />

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {showSearchResults && searchResults.length > 0 && (
                <motion.div
                  ref={searchResultsRef}
                  className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-20 overflow-hidden"
                  variants={searchResultsVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="py-2 max-h-[300px] overflow-y-auto">
                    {searchResults.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={searchItemVariants}
                        className="px-4 py-2 hover:bg-indigo-50 cursor-pointer transition-colors duration-150"
                        onClick={() => handleSearchItemClick(item)}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mr-3">
                            {item.icon || item.id}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.URL}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Mobile Search Icon */}
          <div className="flex md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMobileSearch}
              className="p-2 rounded-full text-gray-600 hover:text-indigo-600 focus:outline-none"
            >
              <SearchIcon size={24} />
            </motion.button>
          </div>

          {/* User Profile / Login Button - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <motion.div
                  variants={userProfileVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className="flex items-center gap-4 p-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-md"
                >
                  <motion.div
                    variants={avatarContainerVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden"
                  >
                    {user?.image ? (
                      <img
                        src={user.image || "/placeholder.svg"}
                        alt={user.fullname}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-bold text-2xl text-indigo-600">
                        {user?.fullname?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </motion.div>
                  <h1 className="font-semibold text-lg">{`Hi, ${user?.fullname?.split(" ")[0]}`}</h1>
                </motion.div>
                <div className="relative">
                  <motion.button
                    onTap={handleTap}
                    animate={{ rotate: isRotated ? 90 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-indigo-50"
                  >
                    <Settings size={24} />
                  </motion.button>
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-100"
                      >
                        <motion.button
                          whileHover={{ backgroundColor: "#f3f4f6", x: 5 }}
                          onClick={handleManagement}
                          className="block px-4 py-3 text-sm text-gray-700 w-full text-left hover:text-indigo-600 transition-all duration-200"
                        >
                          <UserPlus className="inline-block mr-2" size={18} />
                          Manage Account
                        </motion.button>
                        {user?.role === "ADMIN" && (
                          <motion.div
                            whileHover={{ backgroundColor: "#f3f4f6", x: 5 }}
                            className="block px-4 py-3 text-sm text-gray-700 w-full text-left hover:text-indigo-600 transition-all duration-200"
                          >
                            <Link to="/dashboard/add-course" className="flex items-center">
                              <DashboardOutlined className="mr-2" />
                              Dashboard
                            </Link>
                          </motion.div>
                        )}

                        <motion.button
                          whileHover={{ backgroundColor: "#f3f4f6", x: 5 }}
                          onClick={handleLogout}
                          className="block px-4 py-3 text-sm text-gray-700 w-full text-left hover:text-red-600 transition-all duration-200"
                        >
                          <LogOut className="inline-block mr-2" size={18} />
                          Logout
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <motion.div variants={userProfileVariants} initial="initial" animate="animate">
                <Link to="/user/login">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    className="font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 py-2 px-6 rounded-full shadow-md transition-all duration-300"
                  >
                    Join / Login
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMobileMenu}
              className="p-2 rounded-full text-gray-600 hover:text-indigo-600 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Search Fullscreen */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 flex flex-col"
            style={{ height: "100vh" }}
          >
            {/* Search Header */}
            <div className="flex items-center p-4 border-b">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMobileSearch}
                className="p-2 mr-2 rounded-full text-gray-600 hover:text-indigo-600 focus:outline-none"
              >
                <ArrowLeft size={20} />
              </motion.button>
              <div className="flex-1 relative" ref={mobileSearchInputRef}>
                <Input
                  placeholder="Search courses, opportunities..."
                  value={mobileSearchQuery}
                  onChange={(e) => handleMobileSearch(e.target.value)}
                  autoFocus
                  suffix={
                    mobileSearchQuery ? (
                      <X
                        size={16}
                        className="text-gray-400 cursor-pointer"
                        onClick={() => {
                          setMobileSearchQuery("")
                          setMobileSearchResults([])
                        }}
                      />
                    ) : (
                      <SearchIcon size={16} className="text-gray-400" />
                    )
                  }
                  className="rounded-lg"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            {/* Search Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Recent Searches */}
              {mobileSearchQuery === "" && recentSearches.length > 0 && (
                <motion.div variants={mobileSearchVariants} initial="hidden" animate="visible" className="p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Searches</h3>
                  <div className="space-y-2">
                    {recentSearches.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={searchItemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-3 bg-gray-50 rounded-lg flex items-center cursor-pointer"
                        onClick={() => handleMobileSearchItemClick(item)}
                      >
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mr-3">
                          {item.icon || item.id}
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Search Results */}
              {mobileSearchQuery !== "" && (
                <div className="p-4">
                  {mobileSearchResults.length > 0 ? (
                    <motion.div
                      variants={searchResultsVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-2"
                    >
                      {mobileSearchResults.map((item) => (
                        <motion.div
                          key={item.id}
                          variants={searchItemVariants}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="p-3 bg-white border border-gray-100 rounded-lg shadow-sm flex items-center cursor-pointer"
                          onClick={() => handleMobileSearchItemClick(item)}
                        >
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mr-3 flex-shrink-0">
                            {item.icon || item.id}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.URL}</p>
                          </div>
                          <Zap size={16} className="text-indigo-400 ml-2" />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    mobileSearchQuery.length > 0 && (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                          <SearchIcon size={24} className="text-gray-400" />
                        </div>
                        <p className="text-gray-500">No results found for "{mobileSearchQuery}"</p>
                      </div>
                    )
                  )}
                </div>
              )}

              {/* Quick Links */}
              {mobileSearchQuery === "" && (
                <motion.div variants={mobileSearchVariants} initial="hidden" animate="visible" className="p-4 border-t">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Quick Links</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {searchData.slice(0, 4).map((item) => (
                      <motion.div
                        key={item.id}
                        variants={searchItemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-3 bg-gray-50 rounded-lg flex items-center cursor-pointer"
                        onClick={() => handleMobileSearchItemClick(item)}
                      >
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mr-2">
                          {item.icon || item.id}
                        </div>
                        <span className="font-medium text-sm truncate">{item.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-3">
              {isLoggedIn ? (
                <>
                  <motion.div
                    variants={menuItemVariants}
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-md"
                  >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
                      {user?.image ? (
                        <img
                          src={user.image || "/placeholder.svg"}
                          alt={user.fullname}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="font-bold text-3xl text-indigo-600">
                          {user?.fullname?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <h1 className="font-semibold text-lg">{user?.fullname}</h1>
                      <p className="text-xs text-indigo-100">{user?.email}</p>
                    </div>
                  </motion.div>

                  <motion.div variants={menuItemVariants} className="border-b border-gray-100 pb-2">
                    <button
                      onClick={handleManagement}
                      className="flex items-center w-full p-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all duration-200"
                    >
                      <UserPlus className="mr-3" size={20} />
                      <span>Manage Account</span>
                    </button>

                    {user?.role === "ADMIN" && (
                      <Link
                        to="/dashboard/add-course"
                        className="flex items-center w-full p-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all duration-200"
                      >
                        <DashboardOutlined className="mr-3" />
                        <span>Dashboard</span>
                      </Link>
                    )}
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <LogOut className="mr-3" size={20} />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                </>
              ) : (
                <motion.div variants={menuItemVariants} className="flex justify-center">
                  <Link to="/user/login" className="w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 py-3 px-6 rounded-lg shadow-md"
                    >
                      Join / Login
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Account Management Modal */}
      <AnimatePresence>
        {showAccountManagement && <AccountManagement onClose={() => setShowAccountManagement(false)} />}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4"
            >
              <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
              <p className="text-gray-600">Are you sure you want to logout?</p>
              <div className="mt-6 flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#ef4444" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  Logout
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
