import { motion } from "framer-motion"
import { HeartFilled } from "@ant-design/icons"

const AnimatedHeart = ({ isLiked, onClick }) => {
  return (
    <motion.div className="relative" initial={false} animate={isLiked ? "liked" : "unliked"}>
      <motion.div
        className="absolute"
        variants={{
          liked: { scale: 1 },
          unliked: { scale: 0 },
        }}
        transition={{ duration: 0.2 }}
      >
        <HeartFilled className="w-6 h-6 text-red-500" />
      </motion.div>
      <motion.div
        className="absolute"
        variants={{
          liked: { scale: 1.2, opacity: 0 },
          unliked: { scale: 1, opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
      >
        <HeartFilled className="w-6 h-6 text-gray-400" />
      </motion.div>
      <motion.div
        className="absolute"
        variants={{
          liked: {
            scale: [1, 1.2, 1],
            opacity: [0, 1, 0],
            transition: { duration: 0.4 },
          },
          unliked: { opacity: 0 },
        }}
      >
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 bg-red-500 rounded-full"
            variants={{
              liked: {
                x: Math.cos((index / 6) * Math.PI * 2) * 10,
                y: Math.sin((index / 6) * Math.PI * 2) * 10,
                opacity: [0, 1, 0],
                transition: { duration: 0.4, delay: 0.1 },
              },
            }}
          />
        ))}
      </motion.div>
      <motion.button className="opacity-0" onClick={onClick} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <HeartFilled className="w-6 h-6" />
      </motion.button>
    </motion.div>
  )
}

export default AnimatedHeart

