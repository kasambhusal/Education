import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainCourse from './MainCourse'
import ErrorPage from '../../Others/ErrorPage'
import SAT from './SAT'
import LearnReact from './LearnReact'
import PhysicsOlympaid from './PhysicsOlympaid'
import MathOlympaid from './MathOlympaid'
import PageAssignment from './Assignment Page Components/PageAssignment'
const PageCourse = () => {
    return (
        <div>

            <Routes>
                <Route path="/" element={<MainCourse />} />
                <Route path="/sat-preparation" element={<SAT />} />
                <Route path="/web-development-with-react" element={<LearnReact />} />
                <Route path="/physics-olympaid-guide" element={<PhysicsOlympaid />} />
                <Route path="/math-olympaid-guide" element={<MathOlympaid />} />
                <Route path="/assignment/*" element={<PageAssignment />} />

                <Route path="*" element={<ErrorPage />} />
            </Routes>

        </div>
    )
}

export default PageCourse;