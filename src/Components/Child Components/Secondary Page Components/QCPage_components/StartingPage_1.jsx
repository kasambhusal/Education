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
        <h2 className="text-2xl font-bold text-purple-900">Introduction to Quantum Computing</h2>


        <div className="flex items-center gap-4 mt-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Difficulty: Beginner
          </span>
          <span className="text-gray-600">⏱️ Estimated Time: 25 min</span>
        </div>

        <p className="text-gray-800 mb-4">Explore the fascinating world of quantum computing, its history, and how it differs from classical computing</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Objectives:</h3>
          <ul className="list-disc pl-5">
            <li>Understand the fundamental concepts of quantum computing</li>
            <li>Learn about the historical development of quantum computing</li>
            <li>Compare classical and quantum computing paradigms</li>
            <li>Discover potential applications and impacts of quantum technology</li>
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
          Quantum computing is a revolutionary approach to computation that harnesses the strange and powerful principles of quantum physics to process information in ways that classical computers cannot. Instead of using traditional bits (0s and 1s), quantum computers use quantum bits or "qubits" that can exist in multiple states simultaneously, opening up entirely new possibilities for solving complex problems. 🌌
        </p>

        <p className="text-gray-800 mt-7 text-lg">
          Quantum computing is not the evolved form of classical computing. It's completely new form of technology based of completely new mechanism.<br/>
          The fundamental difference between classical and quantum computing lies in how information is processed:<br /><br />

          ➡️ <strong>Classical computers</strong> use bits that can be either 0 OR 1<br />
          ➡️ <strong>Quantum computers</strong> use qubits that can be 0, 1, or both at the same time (superposition)<br /><br />

          This quantum property, along with others like entanglement (where qubits become interconnected) and interference (where quantum states can cancel out or amplify each other), gives quantum computers unique advantages for certain types of problems.
        </p>
        <p><strong>Note: </strong>Do not posses misconception that quantum computers are superior in all tasks than regular computers. There are many scope of tasks which can be more effeciently computed via normal(classical) computers than quantum computers. An chainsaw is extremely powerful, but when the context is about cutting a piece of paper, we should use a scissor.</p>

        <h2 className="text-2xl text-purple-900 font-bold mt-10 mb-2">A Brief History of Quantum Computing 📜</h2>

        <p className="text-gray-800 mt-4 text-lg">
          The journey of quantum computing spans several decades:<br /><br />

          <strong>1980s:</strong> The concept of quantum computing was first proposed by physicist Richard Feynman in 1982. He suggested that quantum systems could be used to simulate other quantum systems more efficiently than classical computers.<br /><br />

          <strong>1985:</strong> David Deutsch described the first quantum algorithm, demonstrating that a quantum computer could solve certain problems faster than classical computers.<br /><br />

          <strong>1994:</strong> Peter Shor developed an algorithm that could efficiently factor large numbers—a task that would take classical computers billions of years but could potentially be done in hours on a quantum computer. This raised concerns about the security of modern encryption.<br /><br />

          <strong>1996:</strong> Lov Grover created a quantum algorithm for searching unsorted databases that offered a quadratic speedup over classical methods.<br /><br />

          <strong>2000s:</strong> The first rudimentary quantum computers with a few qubits were built, demonstrating the physical feasibility of quantum computing.<br /><br />

          <strong>2010s:</strong> Companies like IBM, Google, and D-Wave began developing more advanced quantum processors and making them accessible through cloud services.<br /><br />

          <strong>2019:</strong> Google claimed to achieve "quantum supremacy" by performing a calculation that would be practically impossible for classical supercomputers.<br /><br />

          <strong>Present day:</strong> Researchers continue to improve quantum hardware, develop error correction techniques, and create new quantum algorithms while exploring practical applications.
        </p>

        <h2 className="text-2xl text-purple-900 font-bold mt-10 mb-2">Classical vs. Quantum Computing: Key Differences 🔄</h2>

        <p className="text-gray-800 mt-4 text-lg">
          <strong>Information Units:</strong><br />
          - Classical: Bits (0 or 1)<br />
          - Quantum: Qubits (can represent 0, 1, or a superposition of both)<br /><br />

          <strong>Processing Power:</strong><br />
          - Classical: Processes information sequentially or with limited parallelism<br />
          - Quantum: Can process vast amounts of possibilities simultaneously through superposition<br /><br />

          <strong>Scaling:</strong><br />
          - Classical: Adding one bit doubles the states that can be represented<br />
          - Quantum: Adding one qubit doubles the dimensions of the quantum state space, creating exponential scaling in the states<br /><br />

          <strong>Error Handling:</strong><br />
          - Classical: Relatively straightforward error correction<br />
          - Quantum: Extremely sensitive to environmental interference (decoherence); requires complex error correction<br /><br />

          <strong>Programming Paradigm:</strong><br />
          - Classical: Well-established programming languages and techniques<br />
          - Quantum: Requires new approaches to algorithm design that leverage quantum properties
        </p>

        <h2 className="text-2xl text-purple-900 font-bold mt-10 mb-2">Potential Applications and Impact 🚀</h2>

        <p className="text-gray-800 mt-4 text-lg">
          Quantum computing has the potential to revolutionize numerous fields:<br /><br />

          <strong>Cryptography and Security:</strong><br />
          - Breaking current encryption methods (requiring new quantum-resistant cryptography)<br />
          - Creating unbreakable quantum encryption methods<br /><br />

          <strong>Drug Discovery and Healthcare:</strong><br />
          - Simulating molecular interactions at the quantum level<br />
          - Accelerating the discovery of new medicines and treatments<br /><br />

          <strong>Materials Science:</strong><br />
          - Designing new materials with specific properties<br />
          - Optimizing existing materials for better performance<br /><br />

          <strong>Artificial Intelligence:</strong><br />
          - Speeding up machine learning algorithms<br />
          - Solving complex optimization problems<br /><br />

          <strong>Financial Modeling:</strong><br />
          - Portfolio optimization<br />
          - Risk analysis and fraud detection<br /><br />

          <strong>Climate Modeling:</strong><br />
          - Creating more accurate climate simulations<br />
          - Developing better solutions for environmental challenges<br /><br />

          <strong>Logistics and Supply Chain:</strong><br />
          - Solving complex routing problems<br />
          - Optimizing resource allocation
        </p>

        <p className="text-lg mt-8 text-green-900">
          While fully functional, large-scale quantum computers are still being developed, the field is advancing rapidly. Quantum computing isn't just an incremental improvement over classical computing—it represents a fundamentally different approach to computation that could transform our technological capabilities in the coming decades. As we continue our journey through this course, we'll explore the fascinating principles that make quantum computing possible and learn how to harness its power. 🌟
        </p>
      </motion.div>
    </div>
  )
}

export default StartingPage_1