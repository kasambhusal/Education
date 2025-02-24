import React, { useState } from "react";
import {motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AI_page from "../Child Components/Secondary Page Components/AI_page";
import QC_page from "../Child Components/Secondary Page Components/QC_page";

const AIandQC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState("home")
    const [hoverOn, setHoverOn] = useState("none")

    return (
        <div className="mainComponent flex gap-4">
            {/* Sidebar */}
            <motion.div
               
                initial={{ width: "15vw", scale: 0 }}
                animate={{ width: isCollapsed ? "4vw" : "20vw", scale: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`sidebar_of_AI flex flex-col gap-4 px-4 py-5 h-[100vh] bg-[#0349fc] text-slate-200 sticky top-0 ${isCollapsed ? "items-center px-2" : "px-4"
                    }`}
            >
                <div onClick={() => setSelectedTopic("home")} onMouseOver={()=>setHoverOn("return")} className="Home flex items-center gap-2 cursor-pointer mb-5 border-b-2 pb-2">
                    <img src="/back.svg" className={`${hoverOn == 'return'&&'translate-x-[-8px]'} w-8 h-8 transition-all duration-200`}/>
                    {!isCollapsed && <div className={`${hoverOn == 'return'?'text-white text-lg':'text-slate-200'} name font-semibold transition-all duration-100`}>Return</div>}
                </div>
                <div onClick={() => setSelectedTopic("ai")} onMouseOver={()=>setHoverOn("ai")} className="AI flex items-center gap-4 hover:text-white hover:font-semibold cursor-pointer">
                    <img src="/ai.svg"  className={`${hoverOn == 'ai'&&'rotate-[360deg]'} w-8 h-8 transition-all duration-200`} />
                    {!isCollapsed && <div className="name">AI</div>}
                </div>
                <div onClick={() => setSelectedTopic("qc")} onMouseOver={()=>setHoverOn("qc")} className="QC flex items-center gap-4 hover:text-white hover:font-semibold cursor-pointer">
                    <img src="/qc.svg"  className={`${hoverOn == 'qc'&&'rotate-[360deg]'} w-8 h-8 transition-all duration-200`} />
                    {!isCollapsed && <div className="name">Quantum Computing</div>}
                </div>
            </motion.div>


            <motion.button
                onClick={() => setIsCollapsed(!isCollapsed)}
                initial={{ left: "15vw" }}
                animate={{ left: isCollapsed ? "5vw" : "14vw" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-blue-600 text-white p-1 rounded-md shadow-md w-8 h-8 fixed z-10 top-[38vh]"
            >
                {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </motion.button>




            {/* Main Content */}


            <motion.div initial={{ scale: 0 }}  // Start from extremely small
                animate={{ scale: 1 }}  // Grow to normal size
                transition={{ duration: 0.25, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }} // Triggers when 50% of the element is in view 
                onMouseOver={()=>setHoverOn('cancel')}
                className={`${selectedTopic == "home" ? 'flex' : 'hidden'} Maindiv_of_AI flex-1 flex-col gap-10 pt-10 px-14 min-h-[100vh] bg-stone-100 pb-40`}>
                

                <div className="AI_Label flex justify-between hover:scale-105 hover:shadow-2xl transition-all duration-200 w-[70%] px-8 py-5 bg-gradient-to-r from-green-400 via-green-600 to-green-800 rounded-xl">
                    <div className="image hover:scale-125 transition-all duration-200"><img src="ai.png" alt="AI" /></div>
                    <div className="content flex flex-col gap-4 mt-16">
                        <div className="head font-semibold text-2xl">Artificial Intelligence</div>
                        <div className="extrainfo text-slate-200">Get ready to learn about different aspects of AI with hands on projects to experience great learning curve</div>
                        <button onClick={()=>setSelectedTopic('ai')} className="getinto mt-3 hover:scale-105 transition-all duration-200 hover:text-green-500 bg-stone-50 text-blue-800 px-4 py-2 rounded-2xl font-semibold w-24">Get into</button>
                    </div>
                </div>
                <div onClick={()=>setSelectedTopic('qc')} className="QC_Label flex items-center gap-5 justify-between hover:scale-105 hover:shadow-2xl transition-all duration-200 w-[70%] px-8 py-10 bg-gradient-to-r from-red-400 via-red-600 to-red-800 rounded-xl">
                    <div className="image w-[60%] hover:scale-125 transition-all duration-200"><img className="w-full h-full" src="qc.webp" alt="quantum computing" /></div>
                    <div className="content flex flex-col gap-4">
                        <div className="head font-semibold text-2xl">Quantum Computing</div>
                        <div className="extrainfo text-slate-200">Fulfill your hunger for physics and computers via Quantum Computing and learning along with some small projects</div>
                        <button className="getinto mt-3 hover:scale-105 transition-all duration-200 hover:text-red-500 bg-stone-50 text-blue-800 px-4 py-2 rounded-2xl font-semibold w-24">Get into</button>
                    </div>
                </div>


            </motion.div>
            <motion.div className={`${selectedTopic == "ai" ? 'flex' : 'hidden'} AI_Course`} onMouseOver={()=>setHoverOn('cancel')}>
                <AI_page />
            </motion.div>
            <motion.div className={`${selectedTopic == "qc" ? 'flex' : 'hidden'} QC_Course`} onMouseOver={()=>setHoverOn('cancel')}>
                <QC_page />
            </motion.div>
        </div >
    );
};

export default AIandQC;