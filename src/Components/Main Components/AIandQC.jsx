import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AI_page from "../Child Components/Secondary Page Components/AI_page";
import QC_page from "../Child Components/Secondary Page Components/QC_page";
import { useMediaQuery } from 'react-responsive';

const AIandQC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState("home")
    const [hoverOn, setHoverOn] = useState("none")
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const isMdBreakpoint = useMediaQuery({ query: '(max-width: 768px)' });
    const islgBreakpoint = useMediaQuery({ query: '(max-width: 1024px)' });
    const sidebarGone = useMediaQuery({ query: '(max-width: 768px)' });
    const buttonRef = useRef(null)

    useEffect(() => {
        if (islgBreakpoint) {
            setIsCollapsed(true);
        } else {
            setIsCollapsed(false);
        }
    }, [islgBreakpoint]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log(buttonRef.current)
            // Check if the click is outside the button
            if (buttonRef.current) {
                setIsSidebarVisible(false); // Set issidebarvisible to false when clicking outside
                console.log("Clicked outside. sidebarvisible is now false.");
            }
        };

        // Add event listener for clicks anywhere on the screen
        window.addEventListener("click", handleClickOutside);

        return () => {
            // Cleanup event listener on component unmount
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);


    return (

        <div className="mainComponent flex lg:gap-4 gap-0">

            {/* Sidebar */}
            <motion.div

                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={`sidebar_of_AI ${sidebarGone && 'hidden'} flex flex-col gap-4 lg:px-4 px-1 py-5 h-[100vh] bg-gradient-to-r from-[#293b73] to-purple-600 text-slate-200 z-10 sticky top-0 ${isCollapsed && "items-center px-2"
                    }`}
            >
                <div onClick={() => setSelectedTopic("home")} onMouseOver={() => setHoverOn("return")} className="Home flex items-center gap-2 cursor-pointer mb-5 border-b-2 pb-2">
                    <img src="/back.svg" className={`${hoverOn == 'return' && 'translate-x-[-8px]'} w-8 hidden md:flex h-8 transition-all duration-200`} />
                    {!isCollapsed && <div className={`${hoverOn == 'return' ? 'text-white text-lg' : 'text-slate-200'} name font-semibold transition-all duration-100`}>Return</div>}
                </div>
                <div onClick={() => setSelectedTopic("ai")} onMouseOver={() => setHoverOn("ai")} className="AI flex items-center gap-4 hover:text-white hover:font-semibold cursor-pointer">
                    <img src="/ai.svg" className={`${hoverOn == 'ai' && 'rotate-[360deg]'} w-8 h-8 hidden md:flex transition-all duration-200`} />
                    {!isCollapsed && <div className="name">AI</div>}
                </div>
                <div onClick={() => setSelectedTopic("qc")} onMouseOver={() => setHoverOn("qc")} className="QC flex items-center gap-4 hover:text-white hover:font-semibold cursor-pointer">
                    <img src="/qc.svg" className={`${hoverOn == 'qc' && 'rotate-[360deg]'} w-8 h-8 hidden md:flex transition-all duration-200`} />
                    {!isCollapsed && <div className="name">Quantum Computing</div>}
                </div>
            </motion.div>


            <motion.button
                onClick={() => setIsCollapsed(!isCollapsed)}
                initial={{ left: "15vw" }}
                animate={{ left: isCollapsed ? "5vw" : "14vw" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`${sidebarGone && 'hidden'} bg-blue-600 text-white p-1 rounded-md shadow-md w-8 h-8 fixed z-10 top-[38vh]`}
            >
                {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </motion.button>




            {/* Main Content */}


            <motion.div initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                // Triggers when 50% of the element is in view 
                onMouseOver={() => setHoverOn('cancel')}
                className={`${selectedTopic == "home" ? 'flex' : 'hidden'} Maindiv_of_AI overflow-x-auto flex-1 flex-col gap-10 pt-10 450:px-14 px-2 min-h-[100vh] bg-stone-100 pb-40`}>


                <div className="AI_Label flex lg:flex-row flex-col justify-between hover:scale-105 hover:shadow-2xl transition-all duration-200 lg:w-[70%] w-[100%] px-8 py-5 bg-gradient-to-r from-green-300 via-green-500 to-green-700 rounded-xl">
                    <div className="lg:flex hidden image w-[50%] lg:h-auto h-[50%] hover:scale-125 transition-all duration-200"><img className='w-full h-full' src="/ai.png" alt="AI" /></div>
                    <div className="content flex flex-col gap-4 lg:mt-16 mt-0">
                        <div className="head font-semibold text-2xl">Artificial Intelligence</div>
                        <div className="extrainfo text-slate-200">Get ready to learn about different aspects of AI with hands on projects to experience great learning curve</div>
                        <button onClick={() => setSelectedTopic('ai')} className="getinto mt-3 hover:scale-105 transition-all duration-200 hover:text-green-500 bg-stone-50 text-blue-800 px-4 py-2 rounded-2xl font-semibold w-24">Get into</button>
                    </div>
                </div>
                <div className="QC_Label flex lg:flex-row flex-col items-center gap-5 justify-between hover:scale-105 hover:shadow-2xl transition-all duration-200 lg:w-[70%] w-[100%] px-10 py-10 bg-gradient-to-r from-red-300 via-red-500 to-red-700 rounded-xl">
                    <div className="image lg:flex hidden w-[60%] hover:scale-125 transition-all duration-200"><img className="w-full h-full" src="/qc.webp" alt="quantum computing" /></div>
                    <div className="content flex flex-col gap-4">
                        <div className="head font-semibold text-2xl">Quantum Computing</div>
                        <div className="extrainfo text-slate-200">Fulfill your hunger for physics and computers via Quantum Computing and learning along with some small projects</div>
                        <button onClick={() => setSelectedTopic('qc')} className="getinto mt-3 hover:scale-105 transition-all duration-200 hover:text-red-500 bg-stone-50 text-blue-800 px-4 py-2 rounded-2xl font-semibold w-24">Get into</button>
                    </div>
                </div>


            </motion.div>
            <motion.div className={`${selectedTopic == "ai" ? 'flex' : 'hidden'} AI_Course ${(sidebarGone || isCollapsed) ? 'w-[100vw]' : 'w-[75vw]'}`} onMouseOver={() => setHoverOn('cancel')}>
                <AI_page isCollapsed={isCollapsed} />
            </motion.div>
            <motion.div className={`${selectedTopic == "qc" ? 'flex' : 'hidden'} QC_Course ${(sidebarGone || isCollapsed) ? 'w-[100vw]' : 'w-[75vw]'}`} onMouseOver={() => setHoverOn('cancel')}>
                <QC_page />
            </motion.div>
            {/* Hamburger Menu */}
            {sidebarGone && (
                <button
                    ref={buttonRef} // Attach ref to the button
                    // Prevent the click from propagating to the window
                    onClick={(e) => {
                        setIsSidebarVisible(!isSidebarVisible)
                        e.stopPropagation();
                    }}
                    className={`${isSidebarVisible ? 'bottom-[35vh] right-[6vw] border-none' : 'bottom-5 right-5'} hamburger-menu bg-white fixed z-50 border-2 ${isSidebarVisible ? 'border-white' : 'border-black'} text-white p-2 transition-all duration-500 rounded-md shadow-md`}
                >
                    {isSidebarVisible ? (
                        <img src="/cross.svg" alt="Close Sidebar" className="w-6 h-6" />
                    ) : (
                        <img src="/ham.svg" alt="Open Sidebar" className="w-6 h-6" />
                    )}
                </button>
            )}
            <motion.div
                className={`sidebar_of_AI ${(sidebarGone && isSidebarVisible) ? 'bottom-0' : 'bottom-[-100%]'} w-[100vw] overflow-x-hidden rounded-t-xl flex flex-col gap-4 transition-all duration-500 lg:px-4 px-5 py-5 h-[40vh] bg-[#0349fc] text-slate-200 z-10 fixed`}
            >
                <div className="title_div bg-white text-black py-3 px-4 mt-[-20px] mx-[-20px]">AI and Quantum </div>
                <div onClick={() => setSelectedTopic("home")} onMouseOver={() => setHoverOn("return")} className="Home flex items-center gap-2 cursor-pointer mb-5 border-b-2 pb-2">
                    <img src="/back.svg" className={`${hoverOn == 'return' && 'translate-x-[-8px]'} w-8 h-8 transition-all duration-200`} />
                    <div className={`${hoverOn == 'return' ? 'text-white text-lg' : 'text-slate-200'} name font-semibold transition-all duration-100`}>Return</div>
                </div>
                <div onClick={() => setSelectedTopic("ai")} onMouseOver={() => setHoverOn("ai")} className="AI flex items-center gap-4 hover:text-white hover:font-semibold cursor-pointer">
                    <img src="/ai.svg" className={`${hoverOn == 'ai' && 'rotate-[360deg]'} w-8 h-8 transition-all duration-200`} />
                    <div className="name">AI</div>
                </div>
                <div onClick={() => setSelectedTopic("qc")} onMouseOver={() => setHoverOn("qc")} className="QC flex items-center gap-4 hover:text-white hover:font-semibold cursor-pointer">
                    <img src="/qc.svg" className={`${hoverOn == 'qc' && 'rotate-[360deg]'} w-8 h-8 transition-all duration-200`} />
                    <div className="name">Quantum Computing</div>
                </div>
            </motion.div>
        </div >
    );
};

export default AIandQC;
