import React from 'react'

export default function Home() {
    return (
        <div className='flex w-screen px-5 py-8 bg-gradient-to-b from-[rgb(229,244,255)] to-[rgb(185,229,255)]'>
            <div className="imageDiv flex-[1]">
            <img src="/homeImg.png" alt="HomeImage" />
            </div>
            <div className="homerightcontent flex-[1] flex flex-col gap-10">
                <div className="heading text-[rgb(59,66,108)] font-bold text-6xl w-[70%]">Opportunities For ALL</div>
                <div className="middle text-lg w-[70%]">We are on a mission to ensure equal and accessible opportunities for all students regardless of their location. </div>
                <div className="bg-[rgb(18,23,93)]"></div>
                <button className="explore px-4 py-3 font-bold text-2xl text-white rounded-full bg-[rgb(19,58,82)] w-[260px]">Explore More</button>
            </div>

        </div>

    )
}
