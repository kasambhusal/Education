"use client"

import { createContext, useState, useContext, useEffect } from "react"

// Creating User Context
const UserContext = createContext()

// Creating a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    fullname: "",
    email: "",
    image: "",
    address: "",
    gender: "",
    standard: "",
    goal: "",
    role: "",
  })
  const [token, setToken] = useState(localStorage.getItem("token") || null)

  // Update user state from localStorage if the token exists
  useEffect(() => {
    if (token) {
      const userData = JSON.parse(localStorage.getItem("userData"))
      if (userData) {
        setUser((prev) => ({
          ...prev,
          ...userData,
          role: userData.role || prev.role, // Default role if missing
        }))
      }
    }
  }, [token])

  const login = (userData, token) => {
    setUser(userData)
    setToken(`Bearer ${token}`)
    localStorage.setItem("token", `Bearer ${token}`)
    localStorage.setItem("userData", JSON.stringify(userData))
  }

  const logout = () => {
    setUser({
      id: null,
      fullname: "",
      email: "",
      image: "",
      address: "",
      gender: "",
      standard: "",
      role: "",
      goal: "",
    })
    setToken(null)
    localStorage.removeItem("token")
    localStorage.removeItem("userData")
    localStorage.removeItem("user")
  }

  // New function to update user profile
  const updateUserProfile = (updatedUserData) => {
    // Create a merged user object with updated data
    const updatedUser = {
      ...user,
      // Map fields from API response to user context fields
      fullname: updatedUserData.fullname,
      name: updatedUserData.fullname, // Update both properties to ensure compatibility
      email: updatedUserData.email,
      image: updatedUserData.image,
      // Keep other fields unchanged
    }

    // Update state
    setUser(updatedUser)

    // Update localStorage
    localStorage.setItem("userData", JSON.stringify(updatedUser))
  }

  return (
    <UserContext.Provider value={{ user, login, logout, token, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook to use the theme context
export const useUser = () => {
  return useContext(UserContext)
}
