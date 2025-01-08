import { ArrowRightOutlined } from '@ant-design/icons'
import React from 'react'
import HomeCard from '../Child Components/Others/HomeCard'

export default function Home() {
    return (
        <div>
            <div className='flex w-screen px-5 py-8 bg-gradient-to-b from-[rgb(229,244,255)] to-[rgb(185,229,255)] md:h-[70vh]'>
                <div className="imageDiv ml-28 flex-[1] h-full">
                    <img src="/homeImg.png" alt="Main Image" className='w-[500px]' />
                </div>
                <div className="homerightcontent flex-[1] flex flex-col gap-6">
                    <h1 className="heading text-[rgb(59,66,108)] font-bold text-6xl w-[70%]">Learn, Explore,
                        and Empower</h1>
                    <p className="middle text-lg w-[70%]">Committed to creating equal and accessible opportunities for students everywhere. </p>
                    <h2 className="text-[rgb(18,23,93)] font-bold">10K + learners</h2>
                    <div className='w-full flex justify-center'>
                        <button className="explore px-4 py-3  font-bold text-2xl text-white rounded-full bg-[rgb(19,58,82)] w-[260px]">Explore More
                            <ArrowRightOutlined style={{ marginLeft: "8px" }} />
                        </button>
                    </div>
                </div>

            </div>
            <div className="floatingbarinhome flex gap-5 justify-center w-[75vw] relative bottom-[50px] bg-gray-100 mx-auto shadow-lg p-5 rounded-lg">
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
            <div className="homecardsection flex flex-col items-center justify-center gap-20 mt-8">
                <div className="topcontent flex flex-col gap-3 w-[500px]">
                    <p className="toptextheading text-3xl font-bold text-center w-full">A collection of opportunities to uplift you</p>
                    <p className="toptext w-full text-center">Indulge in vast things outside your schoool curriculum to see the word around you better</p>
                </div>
                <div className="cardgrid grid grid-cols-2 gap-x-20 gap-y-28">
                    <HomeCard heading = 'Olympiads for You' image='homeImg.png' text='Explore different opportunities for olympiads across various fields'/>
                    <HomeCard heading = 'Prepare for NePhO' image='homeImg.png' text='Learn concepts and practice for Nepal Physics Olympiad'/>
                    <HomeCard heading = 'Upcoming Hackathons' image='homeImg.png' text='Be up-to-date about upcoming hackathon opportunities.'/>
                    <HomeCard heading = 'Events that aligns with you' image='homeImg.png' text='Explore more workshops and events where you can be a part of'/>
                </div>
            </div>
        </div>
    )
}
