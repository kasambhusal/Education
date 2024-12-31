import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import MainNav from './MainNav'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword'
import ScrollToTop from '../Child Components/Others/ScrollToTop'
import MainFooter from './MainFooter'

const PageUser = () => {
    const location = useLocation();
    return (
        <div>
            {
                !location.pathname.toLowerCase().includes("/dashboard") && <MainNav />
            }
            <ScrollToTop />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="dashboard/login" element={<Login />} />
                <Route path="dashboard/sign-up" element={<SignUp />} />
                <Route path="dashboard/password-forgot" element={<ForgotPassword />} />
            </Routes>
            <div>
                <MainFooter />
            </div>
        </div>
    )
}

export default PageUser;