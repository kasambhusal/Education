import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Review from './Review'
import ErrorPage from '../../../Others/ErrorPage'
const PagePractise = () => {
    return (
        <div>

            <Routes>
                <Route path="/review" element={<Review />} />

                <Route path="*" element={<ErrorPage />} />
            </Routes>

        </div>
    )
}

export default PagePractise;