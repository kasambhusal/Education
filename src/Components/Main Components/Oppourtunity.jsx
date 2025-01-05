import React from 'react'
import Secondary from '../Child Components/Secondary Page Components/Secondary'
import { useTheme } from '../Context/ThemeContext'

export default function Oppourtunity() {
    const { themeColor } = useTheme()
    return (
        <div>
            <h1 className='py-4 text-center text-4xl font-bold my-2  bg-blue-100 h-[10vh] ' style={{ color: themeColor }}>Oppourtunities</h1>
            <Secondary />
        </div>
    )
}
