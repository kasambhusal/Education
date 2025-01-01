import React from "react";
import { useTheme } from "../Context/ThemeContext";
import { ArrowRightOutlined, YoutubeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Contact from "../Child Components/Others/Contact";

const Footer = () => {
    const { themeColor } = useTheme();
    return (
        <>
            <div
                style={{
                    width: "100%",
                    // minHeight: "50vh",
                    background: `linear-gradient(to bottom,rgb(124, 148, 255),${themeColor} )`,
                }}
            >
                <hr
                    className="my-10"
                    style={{ border: "none", borderTop: "2px solidrgb(152, 153, 156)" }}
                />
                <div className="h-full" style={{ width: "95%", padding: "50px auto" }}>
                    <div className="grid grid-cols-4 h-full gap-[30px] sm:gap-0 py-[30px]">
                        <div className="col-span-4 sm:col-span-1 text-[#d9d9d9] flex flex-col  items-center h-full">
                            <img src="/logo.jpg" alt="logo" width={250} height={150} />

                            <div className="mt-4">
                                <h1 className="text-2xl font-[500] text-white">Follow Us </h1>
                                <Contact />
                            </div>
                        </div>

                        <div className="col-span-4 sm:col-span-1 flex flex-col  items-center gap-[10px] text-[#d9d9d9] text-[18px] text-underline">
                            <h2 style={{ color: themeColor }} className="font-bold">Oppourtunities</h2>
                            <ul style={{ listStyleType: "circle", listStyle: "outside" }}>
                                <li>Scholarships</li>
                                <li>Hackathon</li>
                                <li>Workshops</li>
                                <li>Olympiad</li>
                            </ul>
                        </div>
                        <div className="col-span-4 sm:col-span-1 flex flex-col  text-[#d9d9d9]  items-center gap-2">
                            <h2 style={{ color: themeColor }} className="font-bold">Exem-prep</h2>
                            <ul style={{ listStyleType: "circle", listStyle: "outside" }}>
                                <li>NePho</li>
                                <li>SAT</li>
                            </ul>
                        </div>
                        <div className="col-span-4 sm:col-span-1 flex flex-col  items-center gap-[10px]">
                            <h2 style={{ color: themeColor }} className="font-bold">Team Members</h2>
                            <div className="flex w-full flex-col items-center">
                                {" "}
                                <h2 className="text-[18px] font-bold text-[#d9d9d9]">
                                    CEO
                                </h2>
                                <h2 className="text-[14px] font-bold text-[#e1e1e3]">
                                    Kasam Bhusal
                                </h2>
                            </div>

                            <div className="flex w-full flex-col items-center">
                                <h2 className="text-[18px] font-bold text-[#d9d9d9]">CEO</h2>
                                <h2 className="text-[14px] font-bold text-[#e1e1e3]">
                                    Aman Bhandari
                                </h2>
                            </div>
                            <div className="flex w-full flex-col items-center">
                                <h2 className="text-[18px] font-bold text-[#d9d9d9]">CEO</h2>
                                <h2 className="text-[14px] font-bold text-[#e1e1e3]">
                                    Rohit Busal
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr style={{ border: "none", borderTop: "1px solid #ebebfa" }} />
            <div
                style={{
                    height: "70px",
                    width: "100%",
                    marginTop: "0", // Ensure no gap
                    backgroundColor: `${themeColor}`,
                }}
                className="flex justify-center items-center px-2 sm:px-0"
            >
                <h2 className="text-l" style={{ color: "#d9d9d9" }}>
                    Copyright © 2024 | all rights reserved by Education
                </h2>
                <hr className="border-l-2 border-gray-300 mx-2 h-[40px] sm:h-[30px]" />
                <h2 className="text-l" style={{ color: "#d9d9d9" }}>
                    Developed by{" "}
                    <a
                        href="https://kasambhusal.com.np/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                    >
                        KRA Group
                    </a>
                </h2>
            </div>
        </>
    );
};

export default Footer;
