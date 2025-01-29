import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import MainNav from './MainNav'
import SignUp from './SignUp'
import Clubs from './Clubs'
import ForgotPassword from './ForgotPassword'
import ScrollToTop from '../Child Components/Others/ScrollToTop'
import MainFooter from './MainFooter'
import Oppourtunity from './Oppourtunity'
import ErrorPage from '../Child Components/Others/ErrorPage'
import ExamPrep from './Exam-prep'

const PageUser = () => {
    const location = useLocation();
    return (
        <div>
            {
                !location.pathname.toLowerCase().includes("/user") && <MainNav />
            }
            <ScrollToTop />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="user/login" element={<Login />} />
                <Route path="user/sign-up" element={<SignUp />} />
                <Route path="user/password-forgot" element={<ForgotPassword />} />
                <Route path="/opportunities" element={<Oppourtunity />} />
                <Route path="/clubs" element={<Clubs />} />
                <Route path="/exam-prep" element={<ExamPrep />} />
                <Route path="*" element={<ErrorPage />} />

            </Routes>
            {
                !location.pathname.toLowerCase().includes("/user") && !location.pathname.toLowerCase().includes("/clubs") && <MainFooter />
            }

        </div>
    )
}

export default PageUser;