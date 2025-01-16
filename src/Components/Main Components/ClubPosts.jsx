import React from 'react'

const ClubPosts = () => {

    const postArray = [
        {
            postId: "01",
            userId: "@dimkanabhai",
            userPP: "aman.jpg",
            postHeading: "बेपत्ता व्यक्ति बारे जानकारी",
            postContent: "In the early morning of today's afternoon at evening 5pm, there was a sudden late noise and silence in the dark street of Kathmandu surrounded by flood lights, a person named Bhuwan is found in his room to be missing.",
            postImage: "bhuwan.png"
    },
]

  return (
    <div>
      <div className="maincontainer bg-[#1E1E1E] w-[80vw] min-h-screen">
        {
            postArray.map((item)=>{
                return(
                    <div key={item.postId} className='mainpost pt-5 pl-10 w-full flex flex-col gap-5'>
                        <div className="hr h-[2px] bg-slate-100 w-[70%]"></div>
                        <div className="userInfo flex gap-5"> <img className='w-[35px] h-[35px] rounded-full' src={`/${item.userPP}`} alt="image" /><div className="username text-white">{item.userId}</div></div>
                        <div className="postcontent flex flex-col gap-2 max-w-[60%] text-white">
                            <div className="postheading text-lg font-semibold">{item.postHeading}</div>
                            <div className="posttext">{item.postContent}</div>
                        </div>
                        <div className="postImage w-[60%]"><img className='w-full' src={`/${item.postImage}`} alt="postImage" /></div>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default ClubPosts
