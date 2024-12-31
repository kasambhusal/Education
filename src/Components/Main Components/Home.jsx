import React from 'react'

export default function Home() {
    return (
        <div className='flex w-screen px-5 py-8 bg-[rgb(214,214,251)]'>
            <div className="imageDiv flex-[1]">
            <img src="/homeImg.png" alt="HomeImage" />
            </div>
            <div className="homerightcontent flex-[1] flex flex-col gap-10">
                <div className="heading text-[rgb(0,130,33)] font-bold text-6xl w-[70%]">Opportunities For ALL</div>
                <div className="middle text-lg w-[70%]">We are on a mission to ensure equal and accessible opportunities for all students regardless of their location. </div>
                <button className="explore px-4 py-3 font-bold text-2xl text-white rounded-full bg-[rgb(107,89,172)] w-[260px]">Explore More</button>
            </div>

        </div>

    )
}
