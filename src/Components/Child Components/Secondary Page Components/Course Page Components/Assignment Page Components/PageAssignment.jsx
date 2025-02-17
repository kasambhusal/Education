import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../../../Others/ErrorPage'
import Pending from './Pending'
import Completed from './Completed'
const PageAssignment = () => {
    return (
        <div>

            <Routes>
                <Route path="/pending" element={<Pending />} />
                <Route path="/completed" element={<Completed />} />

                <Route path="*" element={<ErrorPage />} />
            </Routes>

        </div>
    )
}

export default PageAssignment;