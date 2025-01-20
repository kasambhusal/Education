import React, { useEffect } from 'react'
import SecondaryClubs from '../Child Components/Secondary Page Components/SecondaryClubs'

export default function Clubs() {
  useEffect(() => {
    window.scrollTo({
      top: 100,
      behavior: 'smooth'
    })
  }, [])
  return (
    <div>
      <SecondaryClubs />
    </div>
  )
}
