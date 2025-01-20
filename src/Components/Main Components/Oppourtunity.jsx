import React, { useEffect } from 'react'
import SecondaryOpportunities from '../Child Components/Secondary Page Components/SecondaryOpportunities'

export default function Oppourtunity() {
    useEffect(() => {
        window.scrollTo({
            top: 100,
            behavior: 'smooth'
        })
    }, [])
    return (
        <div className=''>
            <SecondaryOpportunities />
        </div>
    )
}
