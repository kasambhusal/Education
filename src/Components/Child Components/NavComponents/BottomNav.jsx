import React from "react";

export default function BottomNav() {
  return (
    <div className="relative bg-[rgb(37,5,101)] text-white flex justify-between items-center px-8 py-6 h-[50px]">

      <div className="flex gap-4 md:gap-10 md:pl-[150px]">
        <span className="cursor-pointer hover:">Opportunities</span>
        <span className="cursor-pointer hover:">Exam-Prep</span>
        <span className="cursor-pointer hover:">Clubs</span>
        <span className="cursor-pointer hover:">Sign In</span>
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
