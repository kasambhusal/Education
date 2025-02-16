import { BookOutlined, RocketOutlined, TrophyOutlined } from "@ant-design/icons";
import coursesData from "../../../../utils/JSON/courses.json"
import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import { setLocalStorage } from "../../../../utils/localStorageUtils";

const iconMap = {
    RocketOutlined: <RocketOutlined />,
    BookOutlined: <BookOutlined />,
    TrophyOutlined: <TrophyOutlined />,
};

const CourseGrid = () => {




    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
            {coursesData.map((course) => (
                <motion.div
                    key={course.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-6 rounded-lg shadow-lg  ${course.color} text-white`}
                >
                    <div className="text-4xl mb-4">{iconMap[course.icon]}</div>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p>{course.description}</p>
                    <Link to={`${course.url}`}
                        className="mt-4 inline-block bg-white text-blue-600 px-4 py-2 rounded-full font-semibold"
                        onClick={() => { setLocalStorage("selectedCourse", course.id, 300000); }}
                    >
                        Explore Course
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    )
}
export default CourseGrid