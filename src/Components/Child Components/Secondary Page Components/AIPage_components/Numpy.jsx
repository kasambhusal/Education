import React from 'react'
import { motion } from 'framer-motion'

const Numpy = () => {
  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="project-section bg-slate-200 rounded-xl p-6 mt-8"
      >
        <h2 className="text-2xl font-bold text-purple-900">Numpy</h2>

        <div className="flex items-center gap-4 mt-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Difficulty: Easy
          </span>
          <span className="text-gray-600">⏱️ Estimated Time: 20 min</span>
        </div>

        <p className="text-gray-800 mb-4">Learn the fundamentals of Numpy, and it's basic usage</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Objectives:</h3>
          <ul className="list-disc pl-5">
            - To surfacely understand what Numpy is <br></br>
            - Learn some most common methods and usecases of Numpy
          </ul>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="second_topic p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-3xl text-purple-900 font-bold mb-2">What is NumPy? ⚡</h2>

        <p className="text-amber-800 text-md mt-10">
          NumPy, which stands for <strong>Numerical Python</strong>, is a Python library designed for fast mathematical and scientific computing.
          If pandas is like an advanced Excel for data, then NumPy is like a <strong>powerful calculator</strong> that works with large amounts of numbers.
        </p>

        <p className="text-gray-800 mt-7 text-lg">
          Why do we need NumPy? Python lists are flexible, but as you might have heard that python is <strong>slow</strong> when handling large numbers. Numpy is a library which helps to sort the operations with large data in smaller amount of time with minimal efforts. NumPy arrays are <strong>faster, more efficient, and use less memory</strong>.
        </p>
        <p>You might not feel the difference while working with smaller data sets, but when the number of data increases, saving computational time is very cruicial.</p>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Importing numpy</span><br />
            import numpy as np<br /><br />

            <span className="text-green-700"># Creating a simple array</span><br />
            arr = np.array([1, 2, 3, 4, 5])<br /><br />

            print(arr)
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          Output:
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-sm">
          <pre>
            [1 2 3 4 5]
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          <strong>NumPy Arrays vs Python Lists</strong>
        </p>

        <p className="text-gray-800 mt-4 text-lg">
          A <strong>NumPy array</strong> is similar to a Python list, but much more powerful:
        </p>

        <ul className="list-disc ml-6 text-lg text-gray-700">
          <li><strong>Faster:</strong> Works efficiently with large data</li>
          <li><strong>Uses less memory:</strong> Stores numbers compactly</li>
          <li><strong>Supports mathematical operations directly:</strong> No need for loops</li>
        </ul>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>1️⃣ Creating NumPy Arrays</strong><br />
          NumPy can create arrays in many ways:
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="text-sm text-red-700">
            np.zeros((3, 3))  <span className="text-green-700"># Creates a 3x3 array filled with 0s</span><br />
            np.ones((2, 4))  <span className="text-green-700"># Creates a 2x4 array filled with 1s</span><br />
            np.arange(1, 10, 2)  <span className="text-green-700"># Creates an array from 1 to 9 with step 2</span><br />
            np.linspace(1, 10, 5)  <span className="text-green-700"># Creates 5 evenly spaced numbers from 1 to 10</span>
          </pre>
        </div>
        <p className='text-gray-800 mt-7 text-lg'>np.linspace creates evenly spaced numbers within the given range. For instance- np.linspace(2, 20, 10) will give 10 different values from 2 to 20 with each being equally distanced from other, i.e 2, 4, 6, 8, ..., 20<br /> It is generally useful when creating data points</p>
        <p className="text-lg mt-6 text-green-900">
          Output of np.linspace(1, 10, 5):
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-sm">
          <pre>
            [ 1.   3.25  5.5  7.75 10.  ]
          </pre>
        </div>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>2️⃣ Reshaping and Accessing Arrays</strong><br />
          NumPy allows us to change the shape of arrays and access elements easily:
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="text-sm text-red-700">
            arr = np.array([[1, 2, 3], [4, 5, 6]])  <span className="text-green-700"># 2D array</span><br />
            arr.shape  <span className="text-green-700"># Tells the shape of array (rows, columns)</span><br />
            arr[0, 1]  <span className="text-green-700"># Accesses first row, second column (Output: 2)</span><br />
            arr[:, 0]  <span className="text-green-700"># Gets all rows, first column</span>
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          <strong>3️⃣ Basic Math Operations</strong>
        </p>

        <p className="text-gray-800 mt-4 text-lg">
          NumPy allows **fast** mathematical calculations without loops.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="text-sm text-red-700">
            arr1 = np.array([1, 2, 3])<br />
            arr2 = np.array([4, 5, 6])<br /><br />

            arr1 + arr2  <span className="text-green-700"># Adds two arrays element-wise</span><br />
            arr1 * arr2  <span className="text-green-700"># Multiplies element-wise</span><br />
            np.sqrt(arr1)  <span className="text-green-700"># Finds square root of each element</span>
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          Output of arr1 + arr2:
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-sm">
          <pre>
            [5 7 9]
          </pre>
        </div>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>4️⃣ Finding Mean, Max, Min</strong><br />
          These functions help summarize data:
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="text-sm text-red-700">
            arr = np.array([10, 20, 30, 40, 50])<br />
            arr.mean()  <span className="text-green-700"># Average (Output: 30.0)</span><br />
            arr.max()  <span className="text-green-700"># Maximum value (Output: 50)</span><br />
            arr.min()  <span className="text-green-700"># Minimum value (Output: 10)</span>
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          <strong>What’s Next?</strong>
        </p>

        <p className="text-gray-800 mt-7 text-lg">
          NumPy makes mathematical calculations **much faster** and **more efficient**.
          Next, we will use it in <strong>Machine Learning</strong> to work with datasets, perform calculations, and prepare data for AI models.
          Get ready for the next step! 🚀
        </p>

        <div id="ch-2_miniProject" className="miniproject w-full py-5 px-8 rounded-xl mt-5 flex flex-col gap-2 bg-slate-200">
          <h3 className="text-lg font-semibold">Project Section</h3>
          <div className="projectnamequest text-gray-700 mb-5">
            Try experimenting with NumPy by creating arrays, performing calculations, and reshaping them.
          </div>
          <button className="gotoproject px-4 py-2 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200">
            Try a simple project
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Numpy
