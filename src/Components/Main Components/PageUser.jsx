import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import MainNav from './MainNav'

const PageUser = () => {
    const location = useLocation();
    return (
        <div>
            {
                !location.pathname.toLowerCase().includes("/dashboard") && <MainNav />
            }

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="dashboard/login" element={<Login />} />
            </Routes>
        </div>
    )
}

export default PageUser;