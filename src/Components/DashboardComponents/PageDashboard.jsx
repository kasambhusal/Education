import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddCourse from './AddCourse'
import ErrorPage from '../Child Components/Others/ErrorPage'
import AddMCQ from './AddMCQ'
import DeleteMCQ from './DeleteMCQ'
const PageDashboard = () => {
    return (
        <div>

            <Routes>
                <Route path="/add-course" element={<AddCourse />} />
                <Route path="/add-mcq" element={<AddMCQ />} />
                <Route path="/delete-mcq" element={<DeleteMCQ />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>

        </div>
    )
}

export default PageDashboard;