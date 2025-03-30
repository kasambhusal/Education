import { useState, useEffect } from "react";
import { Sun, Moon, SunDim } from "lucide-react";

const Greeting = ({ name = "User" }) => {
    const [greeting, setGreeting] = useState("");
    const [icon, setIcon] = useState(<Sun />);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting("Good Morning");
            setIcon(<Sun className="text-yellow-500" />);
        } else if (hour < 18) {
            setGreeting("Good Afternoon");
            setIcon(<SunDim className="text-orange-500" />);
        } else {
            setGreeting("Good Evening");
            setIcon(<Moon className="text-blue-500" />);
        }
    }, []);

    return (
        <div className="flex items-center gap-3 px-4 h-full bg-gray-100 rounded-xl shadow-md">
            {icon}
            <h1 className="text-xl font-bold">
                {greeting}, {name}!
            </h1>
        </div>
    );
};

export default Greeting;
