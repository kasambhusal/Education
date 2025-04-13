import React from 'react'
import { motion } from 'framer-motion';


const StartingPage_1 = () => {
  return (
    <div className="flex flex-col">
       <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="project-section bg-slate-200 rounded-xl p-6 mt-8"
            >
              <h2 className="text-2xl font-bold text-purple-900">Classification Algorithms</h2>
      
              <div className="flex items-center gap-4 mt-2 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Difficulty: Moderate
                </span>
                <span className="text-gray-600">⏱️ Estimated Time: 75 min</span>
              </div>
      
              <p className="text-gray-800 mb-4">Learn how to predict categories and make decisions with classification algorithms</p>
      
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Objectives:</h3>
                <ul className="list-disc pl-5">
                  <li>Understand what classification is and when to use it</li>
                  <li>Learn about different classification algorithms</li>
                  <li>Implement and evaluate classification models</li>
                  <li>Apply classification to real-world problems</li>
                </ul>
              </div>
            </motion.div>
      
       <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="first_topic p-6 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-3xl text-purple-900 font-bold mb-2">What is Quantum Computing? ⚛️💻</h2>

            <p className="text-amber-800 text-md mt-10">
              Imagine you’re in a huge maze, trying to find the quickest way out. A normal computer is like a person who checks every path one by one—it takes time. But a quantum computer? It’s like sending out a million clones of yourself at once, exploring all paths simultaneously and instantly finding the best way out! 🤯
            </p>

            <p className="text-gray-800 mt-7 text-lg">
              Unlike regular computers that process information using bits (which can be either 0 or 1), quantum computers use <strong>qubits</strong>, which can be 0, 1, or both at the same time! 🎭 This special ability is called <strong>superposition</strong>, and it’s what makes quantum computers so powerful.<br /><br />

              So, what makes quantum computing special?<br /><br />

              ➡️ <strong>Superposition (Doing everything at once!)</strong> 🔄<br />
              - Imagine flipping a coin. While it’s spinning in the air, it’s both heads and tails at the same time—until you catch it!
              - A <i>qubit</i> is like that spinning coin, except it never "lands" until we measure it.<br /><br />

              ➡️ <strong>Entanglement (Quantum teamwork!)</strong> 🤝<br />
              - Imagine two magical dice that always land on the same number—no matter how far apart they are! That’s how entangled qubits work—changing one instantly changes the other! 🚀<br /><br />

              ➡️ <strong>Quantum Speed (Breaking the limits of computing!)</strong> ⚡<br />
              - Because of superposition and entanglement, quantum computers can solve complex problems millions of times faster than today’s supercomputers! 💥<br /><br />
            </p>

            <p className="text-lg mt-4 text-green-900">
              This isn’t science fiction—companies like Google, IBM, and NASA are already using quantum computers to tackle <i>AI, cryptography, and even discovering new materials!</i> 🌍✨<br /><br />

              Ready to take your first step into the <i>quantum world</i>? Let’s run a simple experiment with a real quantum computer! 🚀
            </p>

            <div id="ch-2_miniProject" className="miniproject w-full py-5 px-8 rounded-xl mt-5 flex flex-col gap-2 bg-slate-200">
              <h3 className="text-lg font-semibold">Project Section</h3>
              <div className="projectnamequest text-gray-700 mb-5">
                Try running your first quantum program using <strong className="text-blue-600"><a href="https://quantum-computing.ibm.com/" target="_blank">IBM Quantum</a></strong>! ⚛️💻
              </div>
              <button className="gotoproject px-4 py-2 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200">
                Try a simple project
              </button>
            </div>
          </motion.div>
    </div>
  )
}

export default StartingPage_1
