import { div } from 'framer-motion/client'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import ShowAnswerPage from './ShowAnswerPage'
import { motion } from "framer-motion"
import { useMediaQuery } from 'react-responsive';



const ExamPrep = () => {
    const [activeSubject, setActiveSubject] = useState('physics-kinematics')
    const [isAnswer, setIsAnswer] = useState(false)
    const [currentID, setCurrentID] = useState('')

    // OrderIndex : physics-0,  chemistry-1

    const allSubjects = [
        {
            image: "/exam.svg",
            head: "Kinematics",
            sub: "physics-kinematics",
            index: [
                {
                    id: 'p1',
                    unit: "Kinematics",
                    question: "An airplane pilot wishes to fly due west. A wind of 80.0 km/h is blowing toward the south. </br> (a) In which direction should the pilot head if the airspeed of the plane in still air is 320.0 km/h?</br> (b) What is the speed of the plane over the ground?",
                    solution: `
                        <p><strong>Solution:</strong></p></br>
                        <p>We define the given velocities as:</p>
                        <ul>
                            <li><strong>v<sub>W/G</sub></strong> = Velocity of wind with respect to ground (80.0 km/h south)</li>
                            <li><strong>v<sub>P/G</sub></strong> = Velocity of the plane with respect to the ground (unknown)</li>
                            <li><strong>v<sub>P/W</sub></strong> = Velocity of the plane with respect to wind (320.0 km/h in still air)</li>
                        </ul></br>
                        <p>Using the relative velocity equation:</p>
                        <p>
                            <strong>v<sub>P/W</sub> = v<sub>P/G</sub> + v<sub>G/W</sub></strong></br>
                        </p>
                        <p>Since wind is blowing toward the south, the pilot must slightly adjust the plane's heading north of west to counteract the wind's effect. The situation forms a right triangle where:</p>
                        <ul>
                            <li>Hypotenuse = <strong>v<sub>P/W</sub></strong> = 320.0 km/h</li>
                            <li>One leg = <strong>v<sub>W/G</sub></strong> = 80.0 km/h</li>
                            <li>Other leg = <strong>v<sub>P/G</sub></strong> (to be determined)</li>
                        </ul></br>
                        <p>Using the Pythagorean theorem:</p>
                        <p>
                            v<sub>P/G</sub> = √( v<sub>P/W</sub><sup>2</sup> - v<sub>W/G</sub><sup>2</sup> )<br>
                            v<sub>P/G</sub> = √( (320.0)<sup>2</sup> - (80.0)<sup>2</sup> )<br>
                            v<sub>P/G</sub> = √(102400 - 6400)<br>
                            v<sub>P/G</sub> = √96000 ≈ <strong>309.8 km/h</strong>
                        </p></br>
                        <p>To find the angle <strong>θ</strong> (the direction north of west the pilot should head), we use:</p>
                        <p>
                            sinθ = v<sub>W/G</sub> / v<sub>P/W</sub><br>
                            θ = sin<sup>-1</sup>( 80.0 / 320.0 )<br>
                            θ = sin<sup>-1</sup>(0.25)<br>
                            θ ≈ <strong>14.5°</strong>
                        </p></br>
                        <p><strong>Final Answer:</strong></p>
                        <ul>
                            <li>The pilot should head <strong>14.5° north of west</strong>.</li>
                            <li>The speed of the plane over the ground is <strong>309.8 km/h</strong>.</li>
                        </ul></br>
                        <p><strong>Explanation:</strong></p>
                        <p>The wind is pushing the plane southward, so to compensate, the pilot must slightly steer northward to maintain a westward path. This is a classic example of vector resolution in two-dimensional motion. The actual ground speed of the plane is slightly less than its airspeed due to the southward wind component.</p>
                    `
                },
                {
                    id: 'p2',
                    unit: "Kinematics",
                    question: "A spaceship, while flying in space, splits into three equal parts due to an explosion. One fragment continues moving in the same direction, while the other two fly off at 60° on either side of the original path. If the energy released due to the explosion is twice the initial kinetic energy of the spaceship, find the kinetic energy of each fragment.",
                    solution: `
                        <p><strong>Solution:</strong></p>
                        <p>Let's define the given variables:</p>
                        <ul>
                            <li><strong>Mass of spaceship</strong> = 3m</li>
                            <li><strong>Initial velocity of spaceship</strong> = u</li>
                            <li><strong>Mass of each fragment after explosion</strong> = m</li>
                            <li>Velocities of fragments after explosion: <strong>v<sub>1</sub></strong> (for the forward-moving fragment) and <strong>v<sub>2</sub>, v<sub>3</sub></strong> (for the two fragments moving at 60°)</li>
                        </ul>
                        
                        <p><strong>Step 1: Applying Conservation of Momentum Perpendicular to Original Motion</strong></p>
                        <p classname="leading-4"><i>Since the spaceship was initially moving in a straight line, there was no momentum in the perpendicular direction. After the explosion, the two side fragments move symmetrically at 60° to the original path. The perpendicular components of their velocities must cancel out:</i></p>
                        
                        <p>
                            m v<sub>2</sub> sin 60° = m v<sub>3</sub> sin 60°
                        </p>
                        <p>Since the masses are equal, this implies:</p>
                        <p>
                            v<sub>2</sub> = v<sub>3</sub> = v  (say)
                        </p>
                        
                        <p><strong>Step 2: Applying Conservation of Momentum Along the Original Direction</strong></p>
                        <p>Before the explosion, the total momentum was:</p>
                        <p>
                            P<sub>initial</sub> = (3m)u
                        </p>
                        <p>After the explosion, the momentum is contributed by:</p>
                        <ul>
                            <li>The first fragment moving straight with velocity v<sub>1</sub></li>
                            <li>The two other fragments moving at 60°, contributing a horizontal component of velocity v cos 60° each.</li>
                        </ul>
                        
                        <p>Thus, using the law of conservation of linear momentum along the original direction:</p>
                        <p>
                            3mu = m v<sub>1</sub> + 2m v cos 60°
                        </p>
                        <p>Simplifying:</p>
                        <p>
                            3u = v<sub>1</sub> + v × (1/2)
                        </p>
                        <p>
                            3u = v<sub>1</sub> + v/2
                        </p>
                        <p>Rearrange:</p>
                        <p>
                            v<sub>1</sub> = 3u - v/2  ........(1)
                        </p>
                
                        <p><strong>Step 3: Energy Conservation and Explosion Energy</strong></p>
                        <p>The kinetic energy of the spaceship before the explosion was:</p>
                        <p>
                            E = (1/2) × 3m × u<sup>2</sup>
                        </p>
                        
                        <p>During the explosion, energy is released, which is given as:</p>
                        <p>
                            E<sub>r</sub> = 2E
                        </p>
                        
                        <p>The total kinetic energy of the fragments after explosion:</p>
                        <p>
                            E<sub>final</sub> = (1/2) m v<sub>1</sub><sup>2</sup> + 2 × (1/2) m v<sup>2</sup>
                        </p>
                        <p>According to the given condition:</p>
                        <p>
                            E<sub>r</sub> = E<sub>final</sub> - E
                        </p>
                        
                        <p>Substituting values:</p>
                        <p>
                            2E = (1/2) m (v<sub>1</sub><sup>2</sup> + 2v<sup>2</sup>) - (1/2) × 3m × u<sup>2</sup>
                        </p>
                        <p>Simplify:</p>
                        <p>
                            v<sub>1</sub><sup>2</sup> + 2v<sup>2</sup> - 3u<sup>2</sup> = 6u<sup>2</sup>
                        </p>
                        <p>
                            v<sub>1</sub><sup>2</sup> + 2v<sup>2</sup> = 9u<sup>2</sup> ........(2)
                        </p>
                
                        <p><strong>Step 4: Solving for v<sub>1</sub> and v</strong></p>
                        <p>From equations (1) and (2), solving simultaneously:</p>
                        <p>
                            v<sub>1</sub> = u
                        </p>
                        <p>
                            v = 2u
                        </p>
                
                        <p><strong>Step 5: Finding Kinetic Energy of Each Fragment</strong></p>
                        <p>Kinetic energy of the first fragment (moving in the original direction):</p>
                        <p>
                            KE<sub>1</sub> = (1/2) m v<sub>1</sub><sup>2</sup>
                        </p>
                        <p>
                            = (1/2) m u<sup>2</sup>
                        </p>
                        <p>
                            = (1/3)E
                        </p>
                
                        <p>Kinetic energy of each of the other two fragments:</p>
                        <p>
                            KE<sub>2</sub> = KE<sub>3</sub> = (1/2) m (2u)<sup>2</sup>
                        </p>
                        <p>
                            = (1/2) m × 4u<sup>2</sup>
                        </p>
                        <p>
                            = 2m u<sup>2</sup>
                        </p>
                        <p>
                            = (4/3)E
                        </p>
                
                        <p><strong>Final Answer:</strong></p>
                        <ul>
                            <li><strong>Kinetic energy of the first fragment:</strong> (1/3)E</li>
                            <li><strong>Kinetic energy of each of the other two fragments:</strong> (4/3)E</li>
                        </ul>
                
                        <p><strong>Explanation:</strong></p>
                        <p>After the explosion, the spaceship's mass is divided into three fragments moving at different velocities. Since momentum is conserved, the velocity components were calculated using vector resolution. The total kinetic energy after explosion includes the contribution from the released energy. Solving the energy equation provided the final velocities, which were used to compute kinetic energy for each fragment.</p>
                    `
                },


            ],
            extra: "NePhO"
        },
        {
            image: "/exam.svg",
            head: "Thermodynamics",
            sub: "physics-thermodynamics",
            index: [
                {
                    id: 'p3',
                    unit: "Thermodynamics",
                    question: "Find the entropy increment of an aluminum bar of mass m = 3.0 kg when heated from T1 = 300K to T2 = 600K, given that the specific heat capacity of aluminum varies as C = a + bT, where a = 0.77 J/(g.K), b = 0.46 mJ/(g.K²).",
                    solution: `
                        <p><strong>Step 1: Convert Given Units into SI Units</strong></p>
                        <p>Since the given values of heat capacity are in grams, we first convert:</p>
                        <p>a = 0.77 J/(g.K) = 770 J/(kg.K)</p>
                        <p>b = 0.46 mJ/(g.K²) = 0.46 J/(kg.K²)</p>
                
                        <p><strong>Step 2: Use the Entropy Change Formula</strong></p>
                        <p>The formula for entropy change is given by:</p>
                        <p><span style="font-size: larger;">ΔS = ∫<sub>T1</sub><sup>T2</sup> dQ/T</span></p>
                        <p>Since heat transfer dQ is given by:</p>
                        <p><span style="font-size: larger;">dQ = mC dT = m(a + bT) dT</span></p>
                        <p>Thus, the entropy change becomes:</p>
                        <p><span style="font-size: larger;">ΔS = m ∫<sub>T1</sub><sup>T2</sup> (a + bT)/T dT</span></p>
                        
                        <p>Splitting the integral:</p>
                        <p><span style="font-size: larger;">ΔS = m [∫<sub>T1</sub><sup>T2</sup> (a/T) dT + ∫<sub>T1</sub><sup>T2</sup> b dT]</span></p>
                
                        <p><strong>Step 3: Evaluating the Integrals</strong></p>
                        <p>The first integral is:</p>
                        <p><span style="font-size: larger;">∫ (a/T) dT = a ln(T2/T1)</span></p>
                        <p>The second integral is:</p>
                        <p><span style="font-size: larger;">∫ b dT = b(T2 - T1)</span></p>
                
                        <p>Thus, we get:</p>
                        <p><span style="font-size: larger;">ΔS = m [a ln(T2/T1) + b(T2 - T1)]</span></p>
                
                        <p><strong>Step 4: Substituting Values</strong></p>
                        <p>Given:</p>
                        <ul>
                            <li>m = 3.0 kg</li>
                            <li>T1 = 300K, T2 = 600K</li>
                            <li>a = 770 J/(kg.K)</li>
                            <li>b = 0.46 J/(kg.K²)</li>
                        </ul>
                        <p>We calculate:</p>
                        <p><span style="font-size: larger;">ΔS = 3 × [770 ln(600/300) + 0.46(600 - 300)]</span></p>
                        <p>Since ln(2) ≈ 0.693, we compute:</p>
                        <p><span style="font-size: larger;">ΔS = 3 × [770 × 0.693 + 0.46 × 300]</span></p>
                        <p><span style="font-size: larger;">ΔS = 3 × [533.61 + 138]</span></p>
                        <p><span style="font-size: larger;">ΔS = 3 × 671.61</span></p>
                        <p><span style="font-size: larger;">ΔS = 2015.17 J/K</span></p>
                
                        <p><strong>Final Answer:</strong></p>
                        <p><span style="font-size: larger; color: green;"><strong>ΔS = 2015.17 J/K</strong></span></p>
                        <p>This means that during the heating process, the entropy of the aluminum bar increases by 2015.17 J/K.</p>
                    `
                },
                {
                    id: 'p4',
                    unit: "Thermodynamics",
                    question: "Suppose 1.00 kg of water at 100°C is placed in thermal contact with 1.00 kg of water at 0°C. What is the total change in entropy? Assume that the specific heat of water is constant at 4190 J/kg·K over this temperature range.",
                    solution: `
                        <p><strong>Step 1: Understanding the Process</strong></p>
                        <p>This problem involves an <em>irreversible</em> heat transfer process. Two equal masses of water, one at <strong>100°C (373K)</strong> and the other at <strong>0°C (273K)</strong>, come into thermal contact. Eventually, they reach a common final temperature, which is the average of the two:</p>
                        <p><span style="font-size: larger;">T_f = (T_H + T_C)/2 = (373K + 273K)/2 = 323K</span></p>
                
                        <p><strong>Step 2: Using the Entropy Change Formula</strong></p>
                        <p>The entropy change for a system where heat is transferred at varying temperatures is given by:</p>
                        <p><span style="font-size: larger;">ΔS = mc ∫<sub>T1</sub><sup>T2</sup> dT/T</span></p>
                        <p>We calculate the entropy change for both hot and cold water separately.</p>
                
                        <p><strong>Step 3: Calculating Entropy Change for Hot Water</strong></p>
                        <p>Hot water cools down from 373K to 323K, so:</p>
                        <p><span style="font-size: larger;">ΔS_H = (1.00 kg) (4190 J/kg·K) ∫<sub>373</sub><sup>323</sup> dT/T</span></p>
                        <p>Evaluating the integral:</p>
                        <p><span style="font-size: larger;">ΔS_H = (4190 J/K) ln(323/373)</span></p>
                        <p>Since ln(323/373) ≈ -0.139:</p>
                        <p><span style="font-size: larger;">ΔS_H = (4190 × -0.139) J/K</span></p>
                        <p><span style="font-size: larger;">ΔS_H = -603 J/K</span></p>
                
                        <p><strong>Step 4: Calculating Entropy Change for Cold Water</strong></p>
                        <p>Cold water warms up from 273K to 323K, so:</p>
                        <p><span style="font-size: larger;">ΔS_C = (1.00 kg) (4190 J/kg·K) ∫<sub>273</sub><sup>323</sup> dT/T</span></p>
                        <p>Evaluating the integral:</p>
                        <p><span style="font-size: larger;">ΔS_C = (4190 J/K) ln(323/273)</span></p>
                        <p>Since ln(323/273) ≈ 0.168:</p>
                        <p><span style="font-size: larger;">ΔS_C = (4190 × 0.168) J/K</span></p>
                        <p><span style="font-size: larger;">ΔS_C = +705 J/K</span></p>
                
                        <p><strong>Step 5: Total Entropy Change of the System</strong></p>
                        <p>Since entropy is a state function, the total entropy change is:</p>
                        <p><span style="font-size: larger;">ΔS_total = ΔS_H + ΔS_C</span></p>
                        <p><span style="font-size: larger;">ΔS_total = (-603 J/K) + (705 J/K)</span></p>
                        <p><span style="font-size: larger;">ΔS_total = +102 J/K</span></p>
                
                        <p><strong>Final Answer:</strong></p>
                        <p><span style="font-size: larger; color: green;"><strong>ΔS_total = +102 J/K</strong></span></p>
                        <p>This means the total entropy of the system increases by 102 J/K due to the irreversible heat transfer process.</p>
                    `
                },
            ]
        }

    ]

    useEffect(() => {
        if (activeSubject == 'physics-kinematics') {
            setCurrentQuestions(allSubjects[0])
        }
        else if (activeSubject == 'physics-thermodynamics') {
            setCurrentQuestions(allSubjects[1])
        }
    }, [activeSubject])


    const subClicked = (sub) => {
        setActiveSubject(sub)
        setIsAnswer(false)
    }
    const toggleIsAnswer = (subId) => {
        if (currentID == subId && isAnswer) {
            setIsAnswer(false)
        }
        else if (isAnswer == false) {
            setIsAnswer(true)
        }
    }

    const [currentQuestions, setCurrentQuestions] = useState(allSubjects[0])
    const tableOfContentGone = useMediaQuery({ query: '(max-width: 768px)' });
    const [isSidebarVisible, setIsSidebarVisible] = useState(false)
    const buttonRef = useRef(null)

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
        <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mainContainerofExamPrep flex gap-2'>

            {/* Table of content */}

            <motion.div initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className={`${tableOfContentGone && 'hidden'} sidebarExamPrep cursor-pointer w-[30vw] h-[80vh] overflow-auto gap-1 pt-5 sticky top-0 flex flex-col items-center`}>
                {allSubjects.map((item) => {
                    return (
                        <div key={item.head} className='w-full flex flex-col items-center gap-1'>
                            <div onClick={() => { subClicked(item.sub) }} className={`${activeSubject == item.sub && 'bg-blue-200 '} oneSubjectSectionPhysics hover:bg-blue-100 flex lg:gap-8 gap-2 lg:pl-4 pl-1 py-3 w-[85%] border-b border-b-slate-300 border-l-blue-600 border-l-4`}>
                                <img src={`${item.image}`} alt="subject" />
                                <div className="sideMiniDiv flex flex-col"><p className='font-semibold'>{item.head}</p><p className='text-slate-400 text-[13px] font-semibold'>{item.extra}</p></div>
                            </div>
                            <div className={`${activeSubject == item.sub ? 'flex' : 'hidden'} units flex-col gap-3 w-[90%] ml-6 rounded-sm`}>
                                {item.index.map((secondItem) => {
                                    return (

                                        <div key={secondItem.id} onClick={() => {
                                            setCurrentID(secondItem.id)
                                            setIsAnswer(true)
                                            toggleIsAnswer(secondItem.id)
                                        }} className={`${isAnswer & (currentID == secondItem.id) && 'bg-slate-200'} unit w-[calc(100%-20px)] flex flex-col gap-1 px-5 border-b rounded-md border-b-slate-300 py-4 hover:bg-slate-200`}><p className="unitName text-slate-400">{secondItem.unit}</p><p className="question line-clamp-1">{secondItem.question}</p></div>

                                    )
                                })}
                            </div>
                        </div>
                    )
                })}


            </motion.div>


            <div className="examPrepMain md:w-[67vw] w-[95vw] mx-auto flex flex-col gap-8 pt-8">
                {!isAnswer ? currentQuestions.index.map((item) => {
                    return (
                        <motion.div initial={{ scale: 0 }}  // Start from extremely small
                            animate={{ scale: 1 }}  // Grow to normal size
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.5 }} // Triggers when 50% of the element is in view
                            className="mainComponentExamSection flex flex-col gap-8 w-[90%] py-4 px-8 mx-auto border border-slate-300 border-t-blue-500 border-t-4 rounded-sm">
                            <div className="topExamComponent flex gap-2"><img src={`${currentQuestions.image}`} alt="image" /><div className='flex flex-col'><div className='text-blue-500 text-[14px] font-semibold'>{currentQuestions.head}</div><div className='font-semibold'>{item.unit}</div></div></div>
                            <div className="hrline w-[90%] h-[1px] mt-[-5px] bg-slate-300"></div>
                            <div className="midExamComponent text-slate-700">{item.question}</div>
                            <div className="bottomExamComponent"> <button onClick={() => {
                                setCurrentID(item.id)
                                setIsAnswer(true)
                                toggleIsAnswer(item.id)
                            }} className='bg-blue-600 rounded-md text-white px-10 py-2 font-semibold hover:outline outline-blue-600 outline-offset-1'>See More ..</button></div>
                        </motion.div>
                    )
                }) : <ShowAnswerPage questionList={currentQuestions.index} questionID={currentID} />}




            </div>

            {/* Hamburger Menu */}
            {tableOfContentGone && (
                <button
                    ref={buttonRef} // Attach ref to the button
                    // Prevent the click from propagating to the window
                    onClick={(e) => {
                        setIsSidebarVisible(!isSidebarVisible)
                        e.stopPropagation();
                    }}
                    className={`${isSidebarVisible ? 'bottom-[44vh] right-[6vw] bg-white border-none' : 'bottom-5 right-5'} hamburger-menu bg-black fixed z-50 border-2 ${isSidebarVisible ? 'border-blue-700' : 'border-black'} text-white p-2 transition-all duration-500 rounded-md shadow-md`}
                >
                    {isSidebarVisible ? (
                        <img src="/cross.svg" alt="Close Sidebar" className="w-6 h-6" />
                    ) : (
                        <img src="/ham.svg" alt="Open Sidebar" className="w-6 h-6" />
                    )}
                </button>
            )}

            <motion.div initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className={`${(tableOfContentGone && isSidebarVisible) ? 'bottom-0' : 'bottom-[-100%]'} sidebarExamPrep cursor-pointer rounded-t-xl text-white bg-[#13096c] transition-all duration-500 w-[100vw] overflow-x-hidden h-[50vh] overflow-y-auto gap-1 pt-5 fixed flex flex-col items-center`}>
                <div className="title_examprep bg-white border-t-black border-[6px] text-black py-3 px-4 w-full mt-[-20px] mb-2">Physics Olympiad</div>
                {allSubjects.map((item) => {
                    return (
                        <div key={item.head} className='w-full flex flex-col items-center gap-1 rounded-lg'>
                            <div onClick={() => { subClicked(item.sub) }} className={`${activeSubject == item.sub && 'border-2 border-white border-l-[13px]'} oneSubjectSectionPhysics hover:bg-blue-800 flex lg:gap-8 gap-2 lg:pl-4 pl-1 py-3 mt-4 w-[90%] border-b border-b-slate-300 border-l-blue-600 border-l-4`}>
                                <img src={`${item.image}`} alt="subject" />
                                <div className="sideMiniDiv flex flex-col"><p className='font-semibold'>{item.head}</p><p className='text-[13px] font-semibold'>{item.extra}</p></div>
                            </div>
                            <div className={`${activeSubject == item.sub ? 'flex' : 'hidden'} units flex-col gap-3 w-[90%] ml-6 rounded-sm`}>
                                {item.index.map((secondItem) => {
                                    return (

                                        <div key={secondItem.id} onClick={() => {
                                            setCurrentID(secondItem.id)
                                            setIsAnswer(true)
                                            toggleIsAnswer(secondItem.id)
                                        }} className={`${isAnswer & (currentID == secondItem.id) && 'bg-blue-900'} unit w-[calc(100%-20px)] flex flex-col gap-1 px-5 border-b rounded-md border-b-slate-300 py-4 hover:bg-blue-800`}><p className="unitName">{secondItem.unit}</p><p className="question line-clamp-1">{secondItem.question}</p></div>

                                    )
                                })}
                            </div>
                        </div>
                    )
                })}


            </motion.div>

        </motion.div>
    )
}

export default ExamPrep
