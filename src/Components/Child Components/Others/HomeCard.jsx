import React from 'react'

const HomeCard = (props) => {
  return (
    <div className='mainCardBody h-[480px] flex flex-col gap-5 items-center p-2 w-[400px] bg-gradient-to-b from-purple-100 to-purple-400 rounded-2xl shadow-2xl hover:border-[3px] border-purple-950 hover:scale-105 transition:scale duration-200 hover:shadow-4xl'>
        <div className="topcardheading font-bold text-2xl text-purple-900">{props.heading}</div>
        <div className="cardImage w-[80%] h-[50%]"><img src={`/${props.image}`} alt="cardImage" className='h-full w-full'/></div>
        <div className="cardcontent text-center text-lg font-semibold">{props.text}</div>
        <button className="exploreButtonCard bg-gradient-to-b from-purple-300 to-purple-700 hover:border-[2px] border-white hover:from-purple-300 hover:to-purple-800 hover:bg-gradient-to-t transition-all duration-200 text-white px-8 py-2 rounded-xl font-semibold text-xl mt-5">Explore</button>
      
    </div>
  )
}

export default HomeCard
