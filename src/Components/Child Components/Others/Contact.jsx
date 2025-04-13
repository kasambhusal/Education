import React from "react";
import {
    FacebookOutlined,
    InstagramOutlined,
    TwitterOutlined,
    YoutubeOutlined,
} from "@ant-design/icons";
import "../../../CSS/Sidebar.css"
export default function Contact({ vertical = false }) {
    return (
        <div
            className={`contact_icon ${vertical
                ? "flex flex-col"
                : "flex justify-center items-center gap-6 my-6"
                }`}
            style={{
                width: "100%",
            }}
        >
            {/* Facebook Icon */}
            <span className="flex justify-center items-center">
                <a
                    href="https://www.facebook.com/profile.php?id=61574987500076"
                    target="_blank"
                    style={{ textDecoration: "none" }}
                    className="w-12 h-12  text-white rounded-full flex items-center justify-center shadow-md"
                >
                    <img src="/fb.png" width={40} height={40} alt="Fb" />
                </a>
            </span>

            {/* Instagram Icon */}
            <span className="flex justify-center items-center">
                <a
                    href="https://kasambhusal.com.np/"
                    target="_blank"
                    style={{ textDecoration: "none" }}
                    className="w-12 h-12 text-white rounded-full overflow-hidden flex items-center justify-center shadow-md"
                >
                    <img src="/insta.jpg" height={40} width={40} alt="Insta" />
                </a>
            </span>

            {/* Twitter Icon */}
            <span className="flex justify-center items-center">
                <a
                    href="https://kasambhusal.com.np/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                    className="w-12 h-12  text-white rounded-full flex items-center justify-center shadow-md"
                >
                    <img src="/x.png" width={40} height={40} alt="X" />
                </a>
            </span>

            {/* YouTube Icon */}
            <span className="flex justify-center items-center">
                <a
                    href="https://kasambhusal.com.np/"
                    target="_blank"
                    style={{ textDecoration: "none" }}
                    className="w-12 h-12  text-white rounded-full flex items-center justify-center shadow-md"
                >
                    <img src="/youtube.png" width={40} height={40} alt="Youtube" />
                </a>
            </span>
        </div>
    );
}
