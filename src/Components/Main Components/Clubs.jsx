import React from 'react'
import ClubPosts from './ClubPosts'

const Clubs = () => {
  return (
    <div className='clubMainSection flex min-h-[87vh] w-[100vw] relative'>

      <div className="sidebarclub bg-[#0C0A0A] min-h-full w-[20%] border-r-2 border-white">

        <div className="home cursor-pointer flex gap-4 bg-slate-600 py-3 w-full justify-center mt-10">
          <img src="/home.svg" alt="home" className="homeicon" />
          <span className="hometext text-white text-lg font-semibold">Home</span>
        </div>

        <div className="clubs mt-10 flex flex-col gap-5 w-full">
          <div className="clubhead cursor-pointer ml-8 flex gap-4"><img src="/club.svg" alt="clubs" className="clubicon" /><div className="clubtext text-white text-xl font-semibold">Clubs</div></div>
          <div className="clubnames flex flex-col w-full pl-16 gap-1">
            <div className="computerscience cursor-pointer w-[220px] rounded-md px-1 py-1 hover:scale-x-105 hover:pl-2 hover:bg-slate-700 transition-all duration-300 flex gap-2"><img src="/club.svg" alt="icon" className="iconforclubnames" /><span className="clubname text-white text-lg">Computer Science</span></div>
            <div className="abroadstudies cursor-pointer w-[220px] rounded-md px-1 py-1 hover:scale-x-105 hover:pl-2 hover:bg-slate-700 transition-all duration-300 flex gap-2"><img src="/club.svg" alt="icon" className="iconforclubnames" /><span className="clubname text-white text-lg">Abroad Studies</span></div>
            <div className="scholarships cursor-pointer w-[220px] rounded-md px-1 py-1 hover:scale-x-105 hover:pl-2 hover:bg-slate-700 transition-all duration-300 flex gap-2"><img src="/club.svg" alt="icon" className="iconforclubnames" /><span className="clubname text-white text-lg">Scholarships</span></div>
            <div className="olympiad cursor-pointer w-[220px] rounded-md px-1 py-1 hover:scale-x-105 hover:pl-2 hover:bg-slate-700 transition-all duration-300 flex gap-2"><img src="/club.svg" alt="icon" className="iconforclubnames" /><span className="clubname text-white text-lg">Olympiad</span></div>
          </div>
        </div>

      </div>


      <ClubPosts/>
    </div>
  )
}

export default Clubs
