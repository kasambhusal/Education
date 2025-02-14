import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainCourse from './MainCourse'
import ErrorPage from '../../Others/ErrorPage'
import SAT from './SAT'
import LearnReact from './LearnReact'
import PhysicsOlympaid from './PhysicsOlympaid'
import MathOlympaid from './MathOlympaid'
import Pending from './Pending'
import Completed from './Completed'
const PageCourse = () => {
    return (
        <div>

            <Routes>
                <Route path="/" element={<MainCourse />} />
                <Route path="/sat" element={<SAT />} />
                <Route path="/react" element={<LearnReact />} />
                <Route path="/physics" element={<PhysicsOlympaid />} />
                <Route path="/math" element={<MathOlympaid />} />
                <Route path="/pending" element={<Pending />} />
                <Route path="/completed" element={<Completed />} />

                <Route path="*" element={<ErrorPage />} />
            </Routes>

        </div>
    )
}

export default PageCourse;