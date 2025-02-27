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
import SinglePost from './SinglePost'
import Courses from './Courses'
<<<<<<< HEAD
import DashboardLayout from '../DashboardComponents/DashboardLayout'
import CourseMCQ from '../Child Components/Secondary Page Components/Course Page Components/Assignment Page Components/CourseMCQ'
=======
import AIandQC from './AIandQC'
>>>>>>> 3f1d3e403a2ff48ac20480a79661008a90dbdff1

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
                <Route path="/clubs/post/:id" element={<SinglePost />} />
                <Route path="/exam-prep" element={<ExamPrep />} />
                <Route path='/courses/*' element={<Courses />} />
<<<<<<< HEAD
                <Route path='/dashboard/*' element={<DashboardLayout />} />
                <Route path='/practise/:courseName' element={<CourseMCQ />} />

=======
                <Route path='/ai' element={<AIandQC/>}/>
>>>>>>> 3f1d3e403a2ff48ac20480a79661008a90dbdff1
                <Route path="*" element={<ErrorPage />} />

            </Routes>
            {
                !location.pathname.toLowerCase().includes("/user") && !location.pathname.toLowerCase().includes("/clubs") && !location.pathname.toLowerCase().includes("/opportunities") && !location.pathname.toLowerCase().includes("/courses") && !location.pathname.toLowerCase().includes("/dashboard") && <MainFooter />
            }

        </div>
    )
}

export default PageUser;