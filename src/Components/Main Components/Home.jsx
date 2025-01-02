import React from 'react'

export default function Home() {
    return (
        <div>
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
            <div className="floatingbarinhome flex gap-5 justify-center w-[75vw] relative bottom-[50px] bg-white mx-auto shadow-lg p-5 rounded-lg">
                <div className="first w-[200px] flex flex-col gap-3 items-center justify-center">
                    <img src="uptodate.svg" className="1 w-1/3 h-[50%]"></img>
                    <div className="2 text-lg font-semibold">Up to Date</div>
                    <div className="3 w-[150px] text-[14px] text-center">Recent content and blogs</div>
                </div>
                <div className="second w-[200px] flex flex-col gap-3 items-center justify-center">
                    <img src="navigation.svg" className="1 w-1/3 h-[50%]"></img>
                    <div className="2 text-lg font-semibold">Navigation</div>
                    <div className="3 w-[150px] text-[14px] text-center">Throughout Guidance</div>
                </div>
                <div className="third w-[200px] flex flex-col gap-3 items-center justify-center">
                    <img src="expose.svg" className="1 w-1/3 h-[50%]"></img>
                    <div className="2 text-lg font-semibold">Exposure</div>
                    <div className="3 w-[150px] text-[14px] text-center">Information of upcoming events</div>
                </div>
                <div className="fourth w-[200px] flex flex-col gap-3 items-center justify-center">
                    <img src="exam.svg" className="1 w-1/3 h-[50%]"></img>
                    <div className="2 text-lg font-semibold">Preparation</div>
                    <div className="3 w-[150px] text-[14px] text-center">Making you ready for competitions</div>
                </div>
              
            </div>
        </div>
    )
}
