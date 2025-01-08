import React from "react";
import { useTheme } from "../../Context/ThemeContext";
import { Link } from "react-router-dom"

export default function BottomNav() {
  const { themeColor } = useTheme()
  return (
    <div className="relative text-white flex justify-between items-center px-8 py-6 h-[50px]" style={{ backgroundColor: themeColor }}>

      <div className="flex w-[85%] gap-4 md:gap-10 md:pl-[150px] text-lg justify-center">
        <Link to="/oppourtunities" className="cursor-pointer hover:">Opportunities</Link>
        <Link to="/exam-prep" className="cursor-pointer hover:">Exam-Prep</Link>
        <Link to="/clubs" className="cursor-pointer hover:">Clubs</Link>
        
      </div>

      {/* Right Cutout */}
      <div
        className="absolute top-0 right-0 h-full w-[30px]"
        style={{
          clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
          background: "linear-gradient(to right,rgb(90, 90, 237),rgb(90, 90, 237)",
        }}
      ></div>
    </div>
  );
}
