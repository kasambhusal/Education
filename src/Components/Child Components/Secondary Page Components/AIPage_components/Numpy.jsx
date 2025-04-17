import React from 'react'
import { motion } from 'framer-motion'

const Numpy = () => {
  return (
    <div className="flex flex-col gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="project-section bg-zinc-50 border-2 border-green-600 shadow-2xl rounded-xl py-6 px-4"
      >
        <h2 className="text-2xl font-bold text-purple-900">NumPy: The Foundation of Scientific Computing</h2>

        <div className="flex items-center gap-4 mt-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-xl text-sm">
            Difficulty: Beginner
          </span>
          <span className="text-gray-600">⏱️ Estimated Time: 45 min</span>
        </div>

        <p className="text-gray-800 mb-4">Learn the basics of NumPy, the essential library for numerical operations in Python.</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Objectives:</h3>
          <ul className="list-disc pl-5">
            <li>Understand what NumPy is and why it is important</li>
            <li>Learn how to create and manipulate NumPy arrays</li>
            <li>Master array operations, broadcasting, and slicing</li>
            <li>Perform basic matrix operations using NumPy</li>
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
          Why do we need NumPy? Python lists are flexible, but as you might have heard, Python is <strong>slow</strong> when handling large numbers. NumPy is a library which helps to sort the operations with large data in smaller amount of time with minimal efforts. NumPy arrays are <strong>faster, more efficient, and use less memory</strong>.  
        </p>  
        <p>You might not feel the difference while working with smaller data sets, but when the number of data increases, saving computational time is very crucial.</p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-md">
          <h4 className="font-bold text-blue-800">Why NumPy is Essential for Data Science and AI:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>Foundation for other libraries:</strong> Libraries like Pandas, Matplotlib, and TensorFlow are built on NumPy</li>
            <li><strong>Efficient calculations:</strong> NumPy uses optimized C code behind the scenes</li>
            <li><strong>Memory efficiency:</strong> NumPy arrays use much less memory than Python lists</li>
            <li><strong>Vectorization:</strong> Perform operations on entire arrays without loops</li>
          </ul>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">1. Introduction to Arrays</h3>

        <p className="text-gray-800 mt-4 mb-4">
          At the core of NumPy is the <strong>array</strong> - a grid of values, all of the same type. Think of an array as a container that can hold many numbers in an organized way.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">Before We Start:</h4>
          <p className="mt-2 text-gray-700">
            To use NumPy, you first need to install it (if you haven't already) and import it in your code:
          </p>
          <pre className="bg-gray-100 p-2 rounded-md mt-2 text-sm">
            # Install NumPy (run this in your terminal or command prompt)
            pip install numpy
            
            # Import NumPy in your Python code
            import numpy as np
          </pre>
          <p className="mt-2 text-gray-700">
            Notice that we import NumPy as "np" - this is a common convention that makes our code shorter and easier to read.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Importing numpy</span><br/>
            import numpy as np<br/><br/>

            <span className="text-green-700"># Creating a simple array</span><br/>
            arr = np.array([1, 2, 3, 4, 5])<br/><br/>

            print(arr)<br/>
            print(type(arr))
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          Output:
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-sm">
          <pre>
            [1 2 3 4 5]
            &lt;class 'numpy.ndarray'&gt;
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Code Explanation:</h4>
          <ol className="list-decimal ml-5 mt-2 text-gray-700 space-y-2">
            <li><code>import numpy as np</code>: This imports the NumPy library with the alias "np".</li>
            <li><code>arr = np.array([1, 2, 3, 4, 5])</code>: This creates a NumPy array from a Python list.</li>
            <li><code>print(arr)</code>: This displays the array.</li>
            <li><code>print(type(arr))</code>: This shows the type of the variable, which is "numpy.ndarray" (NumPy N-dimensional array).</li>
          </ol>
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
          <strong>1️⃣ Creating NumPy Arrays</strong><br/>
          NumPy can create arrays in many ways:  
        </p>  

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Different ways to create NumPy arrays</span><br/>
            import numpy as np<br/><br/>

            <span className="text-green-700"># From a Python list</span><br/>
            list_array = np.array([1, 2, 3, 4, 5])<br/><br/>

            <span className="text-green-700"># Creating an array of zeros</span><br/>
            zeros_array = np.zeros(5)  <span className="text-green-700"># Creates an array with 5 zeros</span><br/><br/>

            <span className="text-green-700"># Creating an array of ones</span><br/>
            ones_array = np.ones(5)  <span className="text-green-700"># Creates an array with 5 ones</span><br/><br/>

            <span className="text-green-700"># Creating an array with a range of values</span><br/>
            range_array = np.arange(1, 10, 2)  <span className="text-green-700"># Creates an array from 1 to 9 with step 2</span><br/><br/>

            <span className="text-green-700"># Creating an array with evenly spaced values</span><br/>
            spaced_array = np.linspace(1, 10, 5)  <span className="text-green-700"># Creates 5 evenly spaced numbers from 1 to 10</span><br/><br/>

            print("List array:", list_array)<br/>
            print("Zeros array:", zeros_array)<br/>
            print("Ones array:", ones_array)<br/>
            print("Range array:", range_array)<br/>
            print("Evenly spaced array:", spaced_array)
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          Output:
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
          <pre>
            List array: [1 2 3 4 5]
            Zeros array: [0. 0. 0. 0. 0.]
            Ones array: [1. 1. 1. 1. 1.]
            Range array: [1 3 5 7 9]
            Evenly spaced array: [ 1.    3.25  5.5   7.75 10.  ]
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Code Explanation:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><code>np.zeros(5)</code>: Creates an array of 5 zeros. This is useful when you need to initialize an array before filling it with values.</li>
            <li><code>np.ones(5)</code>: Creates an array of 5 ones.</li>
            <li><code>np.arange(1, 10, 2)</code>: Creates an array with values starting from 1, ending before 10, with a step of 2 (so: 1, 3, 5, 7, 9).</li>
            <li><code>np.linspace(1, 10, 5)</code>: Creates 5 evenly spaced numbers between 1 and 10 (inclusive). This is useful for creating coordinate points or when you need equally spaced values.</li>
          </ul>
        </div>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>2️⃣ Multi-dimensional Arrays</strong><br/>
          NumPy can create arrays with multiple dimensions (2D, 3D, etc.):  
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Creating multi-dimensional arrays</span><br/>
            import numpy as np<br/><br/>

            <span className="text-green-700"># Creating a 2D array (matrix)</span><br/>
            matrix = np.array([[1, 2, 3], [4, 5, 6]])<br/><br/>

            <span className="text-green-700"># Creating a 2D array of zeros</span><br/>
            zeros_matrix = np.zeros((2, 3))  <span className="text-green-700"># 2 rows, 3 columns of zeros</span><br/><br/>

            <span className="text-green-700"># Creating a 3D array</span><br/>
            cube = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])<br/><br/>

            print("2D array (matrix):")<br/>
            print(matrix)<br/><br/>

            print("\nShape of the matrix:", matrix.shape)  <span className="text-green-700"># Shows dimensions (rows, columns)</span><br/><br/>

            print("\n2D array of zeros:")<br/>
            print(zeros_matrix)<br/><br/>

            print("\n3D array (cube):")<br/>
            print(cube)<br/><br/>

            print("\nShape of the cube:", cube.shape)  <span className="text-green-700"># Shows dimensions (depth, rows, columns)</span>
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          Output:
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
          <pre>
            2D array (matrix):
            [[1 2 3]
             [4 5 6]]

            Shape of the matrix: (2, 3)

            2D array of zeros:
            [[0. 0. 0.]
             [0. 0. 0.]]

            3D array (cube):
            [[[1 2]
              [3 4]]

             [[5 6]
              [7 8]]]

            Shape of the cube: (2, 2, 2)
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Understanding Array Shapes:</h4>
          <p className="mt-2 text-gray-700">
            The <code>shape</code> attribute tells us the dimensions of an array:
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><code>(2, 3)</code> means 2 rows and 3 columns (a 2D array)</li>
            <li><code>(2, 2, 2)</code> means a 3D array with 2 "layers", each containing a 2×2 matrix</li>
          </ul>
          <p className="mt-2 text-gray-700">
            Think of dimensions like this:
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li>1D array: a line of numbers</li>
            <li>2D array: a table of numbers (rows and columns)</li>
            <li>3D array: a stack of tables</li>
          </ul>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">2. Array Operations</h3>

        <p className="text-gray-800 mt-4 mb-4">
          One of the most powerful features of NumPy is the ability to perform operations on entire arrays at once, without using loops. This is called <strong>vectorization</strong> and it makes your code both faster and more readable.
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Basic array operations</span><br/>
            import numpy as np<br/><br/>

            <span className="text-green-700"># Create two arrays</span><br/>
            a = np.array([1, 2, 3, 4, 5])<br/>
            b = np.array([6, 7, 8, 9, 10])<br/><br/>

            <span className="text-green-700"># Addition</span><br/>
            addition = a + b<br/><br/>

            <span className="text-green-700"># Subtraction</span><br/>
            subtraction = b - a<br/><br/>

            <span className="text-green-700"># Multiplication (element-wise)</span><br/>
            multiplication = a * b<br/><br/>

            <span className="text-green-700"># Division</span><br/>
            division = b / a<br/><br/>

            <span className="text-green-700"># Exponentiation</span><br/>
            exponentiation = a ** 2  <span className="text-green-700"># Square each element in a</span><br/><br/>

            print("Array a:", a)<br/>
            print("Array b:", b)<br/>
            print("Addition (a + b):", addition)<br/>
            print("Subtraction (b - a):", subtraction)<br/>
            print("Multiplication (a * b):", multiplication)<br/>
            print("Division (b / a):", division)<br/>
            print("Exponentiation (a ** 2):", exponentiation)
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          Output:
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
          <pre>
            Array a: [1 2 3 4 5]
            Array b: [ 6  7  8  9 10]
            Addition (a + b): [ 7  9 11 13 15]
            Subtraction (b - a): [5 5 5 5 5]
            Multiplication (a * b): [ 6 14 24 36 50]
            Division (b / a): [6.  3.5 2.66666667 2.25 2. ]
            Exponentiation (a ** 2): [ 1  4  9 16 25]
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Code Explanation:</h4>
          <p className="mt-2 text-gray-700">
            In the example above, each operation is performed <strong>element-wise</strong>. This means:
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li>Addition: [1+6, 2+7, 3+8, 4+9, 5+10] = [7, 9, 11, 13, 15]</li>
            <li>Subtraction: [6-1, 7-2, 8-3, 9-4, 10-5] = [5, 5, 5, 5, 5]</li>
            <li>Multiplication: [1×6, 2×7, 3×8, 4×9, 5×10] = [6, 14, 24, 36, 50]</li>
            <li>Division: [6÷1, 7÷2, 8÷3, 9÷4, 10÷5] = [6.0, 3.5, 2.67, 2.25, 2.0]</li>
            <li>Exponentiation: [1², 2², 3², 4², 5²] = [1, 4, 9, 16, 25]</li>
          </ul>
          <p className="mt-2 text-gray-700">
            Without NumPy, you would need to use loops to perform these operations, which would be slower and require more code.
          </p>
        </div>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>Statistical Operations</strong><br/>
          NumPy provides many functions for statistical calculations:  
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Statistical operations</span><br/>
            import numpy as np<br/><br/>

            <span className="text-green-700"># Create an array</span><br/>
            arr = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])<br/><br/>

            <span className="text-green-700"># Calculate statistics</span><br/>
            mean_value = np.mean(arr)  <span className="text-green-700"># Average</span><br/>
            median_value = np.median(arr)  <span className="text-green-700"># Middle value</span><br/>
            min_value = np.min(arr)  <span className="text-green-700"># Minimum value</span><br/>
            max_value = np.max(arr)  <span className="text-green-700"># Maximum value</span><br/>
            sum_value = np.sum(arr)  <span className="text-green-700"># Sum of all elements</span><br/>
            std_value = np.std(arr)  <span className="text-green-700"># Standard deviation</span><br/><br/>

            print("Array:", arr)<br/>
            print("Mean:", mean_value)<br/>
            print("Median:", median_value)<br/>
            print("Minimum:", min_value)<br/>
            print("Maximum:", max_value)<br/>
            print("Sum:", sum_value)<br/>
            print("Standard Deviation:", std_value)
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          Output:
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
          <pre>
            Array: [ 1  2  3  4  5  6  7  8  9 10]
            Mean: 5.5
            Median: 5.5
            Minimum: 1
            Maximum: 10
            Sum: 55
            Standard Deviation: 2.8722813232690143
          </pre>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">3. Broadcasting</h3>

        <p className="text-gray-800 mt-4 mb-4">
          <strong>Broadcasting</strong> is a powerful feature in NumPy that allows arrays with different shapes to be used in operations together. NumPy automatically "broadcasts" the smaller array to match the shape of the larger array.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">What is Broadcasting?</h4>
          <p className="mt-2 text-gray-700">
            Broadcasting allows you to perform operations between arrays of different shapes. The smaller array is virtually "stretched" to match the shape of the larger array, without actually duplicating the data.
          </p>
          <p className="mt-2 text-gray-700">
            Think of it like this: if you have a single number and want to add it to every element in an array, broadcasting lets you do this without creating an array of the same number.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Broadcasting examples</span><br/>
            import numpy as np<br/><br/>

            <span className="text-green-700"># Example 1: Scalar and array</span><br/>
            arr = np.array([1, 2, 3, 4, 5])<br/>
            scalar = 10<br/><br/>

            <span className="text-green-700"># The scalar is broadcast to all elements of the array</span><br/>
            result1 = arr + scalar<br/><br/>

            <span className="text-green-700"># Example 2: Arrays of different shapes</span><br/>
            row_vector = np.array([1, 2, 3])  <span className="text-green-700"># Shape: (3,)</span><br/>
            column_vector = np.array([[10], [20], [30]])  <span className="text-green-700"># Shape: (3, 1)</span><br/><br/>

            <span className="text-green-700"># Broadcasting happens automatically</span><br/>
            result2 = row_vector + column_vector<br/><br/>

            print("Array:", arr)<br/>
            print("Scalar:", scalar)<br/>
            print("Array + Scalar:", result1)<br/><br/>

            print("Row vector:", row_vector)<br/>
            print("Column vector:")<br/>
            print(column_vector)<br/>
            print("Row + Column (broadcasting):")<br/>
            print(result2)
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          Output:
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
          <pre>
            Array: [1 2 3 4 5]
            Scalar: 10
            Array + Scalar: [11 12 13 14 15]

            Row vector: [1 2 3]
            Column vector:
            [[10]
             [20]
             [30]]
            Row + Column (broadcasting):
            [[11 12 13]
             [21 22 23]
             [31 32 33]]
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Broadcasting Explanation:</h4>
          <p className="mt-2 text-gray-700">
            In the first example, the scalar value 10 is automatically applied to each element of the array. Behind the scenes, NumPy treats this as if you had an array of [10, 10, 10, 10, 10] and adds it to [1, 2, 3, 4, 5].
          </p>
          <p className="mt-2 text-gray-700">
            In the second example:
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li>The row vector [1, 2, 3] has shape (3,)</li>
            <li>The column vector [[10], [20], [30]] has shape (3, 1)</li>
            <li>NumPy broadcasts both to a 2D array with shape (3, 3)</li>
            <li>The row vector is expanded to [[1, 2, 3], [1, 2, 3], [1, 2, 3]]</li>
            <li>The column vector is expanded to [[10, 10, 10], [20, 20, 20], [30, 30, 30]]</li>
            <li>The result is the sum of these expanded arrays</li>
          </ul>
          <p className="mt-2 text-gray-700">
            The beauty of broadcasting is that NumPy does this expansion conceptually, without actually creating the larger arrays in memory, which makes operations very efficient.
          </p>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">4. Indexing & Slicing</h3>

        <p className="text-gray-800 mt-4 mb-4">
          Indexing and slicing allow you to access specific elements or subsets of an array. This is similar to how you would access elements in a Python list, but with additional capabilities for multi-dimensional arrays.
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Indexing and slicing examples</span><br/>
            import numpy as np<br/><br/>

            <span className="text-green-700"># Create a 1D array</span><br/>
            arr_1d = np.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])<br/><br/>

            <span className="text-green-700"># Indexing: accessing single elements</span><br/>
            first_element = arr_1d[0]  <span className="text-green-700"># First element (index 0)</span><br/>
            fifth_element = arr_1d[4]  <span className="text-green-700"># Fifth element (index 4)</span><br/>
            last_element = arr_1d[-1]  <span className="text-green-700"># Last element</span><br/><br/>

            <span className="text-green-700"># Slicing: accessing a range of elements</span><br/>
            first_three = arr_1d[0:3]  <span className="text-green-700"># Elements from index 0 to 2</span><br/>
            middle_elements = arr_1d[3:7]  <span className="text-green-700"># Elements from index 3 to 6</span><br/>
            every_second = arr_1d[::2]  <span className="text-green-700"># Every second element</span><br/>
            reversed_array = arr_1d[::-1]  <span className="text-green-700"># Reverse the array</span><br/><br/>

            print("Original 1D array:", arr_1d)<br/>
            print("First element:", first_element)<br/>
            print("Fifth element:", fifth_element)<br/>
            print("Last element:", last_element)<br/>
            print("First three elements:", first_three)<br/>
            print("Middle elements (index 3-6):", middle_elements)<br/>
            print("Every second element:", every_second)<br/>
            print("Reversed array:", reversed_array)
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          Output:
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
          <pre>
            Original 1D array: [0 1 2 3 4 5 6 7 8 9]
            First element: 0
            Fifth element: 4
            Last element: 9
            First three elements: [0 1 2]
            Middle elements (index 3-6): [3 4 5 6]
            Every second element: [0 2 4 6 8]
            Reversed array: [9 8 7 6 5 4 3 2 1 0]
          </pre>
        </div>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>Indexing and Slicing 2D Arrays</strong><br/>
          For multi-dimensional arrays, we need to specify indices for each dimension:  
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Indexing and slicing 2D arrays</span><br/>
            import numpy as np<br/><br/>

            <span className="text-green-700"># Create a 2D array (3x4 matrix)</span><br/>
            arr_2d = np.array([[1, 2, 3, 4],<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5, 6, 7, 8],<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[9, 10, 11, 12]])<br/><br/>

            <span className="text-green-700"># Accessing single elements: arr_2d[row, column]</span><br/>
            element_1_1 = arr_2d[0, 0]  <span className="text-green-700"># First element (row 0, column 0)</span><br/>
            element_2_3 = arr_2d[1, 2]  <span className="text-green-700"># Element at row 1, column 2</span><br/><br/>

            <span className="text-green-700"># Accessing rows</span><br/>
            first_row = arr_2d[0]  <span className="text-green-700"># First row</span><br/>
            second_row = arr_2d[1, :]  <span className="text-green-700"># Second row (explicit slicing)</span><br/><br/>

            <span className="text-green-700"># Accessing columns</span><br/>
            first_column = arr_2d[:, 0]  <span className="text-green-700"># First column</span><br/>
            third_column = arr_2d[:, 2]  <span className="text-green-700"># Third column</span><br/><br/>

            <span className="text-green-700"># Slicing: arr_2d[row_start:row_end, col_start:col_end]</span><br/>
            top_left = arr_2d[0:2, 0:2]  <span className="text-green-700"># Top-left 2x2 submatrix</span><br/>
            bottom_right = arr_2d[1:3, 2:4]  <span className="text-green-700"># Bottom-right 2x2 submatrix</span><br/><br/>

            print("Original 2D array:")<br/>
            print(arr_2d)<br/>
            print("\nElement at row 0, column 0:", element_1_1)<br/>
            print("Element at row 1, column 2:", element_2_3)<br/>
            print("\nFirst row:", first_row)<br/>
            print("Second row:", second_row)<br/>
            print("\nFirst column:", first_column)<br/>
            print("Third column:", third_column)<br/>
            print("\nTop-left 2x2 submatrix:")<br/>
            print(top_left)<br/>
            print("\nBottom-right 2x2 submatrix:")<br/>
            print(bottom_right)
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          Output:
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
          <pre>
            Original 2D array:
            [[ 1  2  3  4]
             [ 5  6  7  8]
             [ 9 10 11 12]]

            Element at row 0, column 0: 1
            Element at row 1, column 2: 7

            First row: [1 2 3 4]
            Second row: [5 6 7 8]

            First column: [1 5 9]
            Third column: [ 3  7 11]

            Top-left 2x2 submatrix:
            [[1 2]
             [5 6]]

            Bottom-right 2x2 submatrix:
            [[ 7  8]
             [11 12]]
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Indexing and Slicing Explained:</h4>
          <p className="mt-2 text-gray-700">
            For 2D arrays (and higher dimensions), indexing and slicing works like this:
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><code>arr_2d[row, column]</code>: Access a single element</li>
            <li><code>arr_2d[row]</code> or <code>arr_2d[row, :]</code>: Access an entire row</li>
            <li><code>arr_2d[:, column]</code>: Access an entire column</li>
            <li><code>arr_2d[row_start:row_end, col_start:col_end]</code>: Access a submatrix</li>
          </ul>
          <p className="mt-2 text-gray-700">
            Remember that in Python (and NumPy), indexing starts at 0, and the end index in a slice is exclusive (not included).
          </p>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">5. Matrix Operations</h3>

        <p className="text-gray-800 mt-4 mb-4">
          NumPy provides powerful functions for matrix operations, which are essential for linear algebra, machine learning, and data analysis.
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Matrix operations</span><br/>
            import numpy as np<br/><br/>

            <span className="text-green-700"># Create two matrices</span><br/>
            A = np.array([[1, 2], [3, 4]])<br/>
            B = np.array([[5, 6], [7, 8]])<br/><br/>

            <span className="text-green-700"># Matrix addition</span><br/>
            matrix_sum = A + B<br/><br/>

            <span className="text-green-700"># Matrix multiplication (dot product)</span><br/>
            matrix_product = np.dot(A, B)<br/>
            <span className="text-green-700"># Alternative way to do matrix multiplication</span><br/>
            matrix_product_alt = A @ B  <span className="text-green-700"># The @ operator performs matrix multiplication</span><br/><br/>

            <span className="text-green-700"># Matrix transpose</span><br/>
            A_transpose = A.T<br/><br/>

            <span className="text-green-700"># Matrix determinant</span><br/>
            A_determinant = np.linalg.det(A)<br/><br/>

            <span className="text-green-700"># Matrix inverse</span><br/>
            A_inverse = np.linalg.inv(A)<br/><br/>

            print("Matrix A:")<br/>
            print(A)<br/>
            print("\nMatrix B:")<br/>
            print(B)<br/>
            print("\nMatrix Addition (A + B):")<br/>
            print(matrix_sum)<br/>
            print("\nMatrix Multiplication (A · B):")<br/>
            print(matrix_product)<br/>
            print("\nMatrix Transpose (A^T):")<br/>
            print(A_transpose)<br/>
            print("\nMatrix Determinant of A:", A_determinant)<br/>
            print("\nMatrix Inverse of A:")<br/>
            print(A_inverse)<br/><br/>

            <span className="text-green-700"># Verify that A · A^(-1) = Identity matrix</span><br/>
            identity_check = np.dot(A, A_inverse)<br/>
            print("\nA · A^(-1) (should be close to identity matrix):")<br/>
            print(np.round(identity_check, decimals=10))  <span className="text-green-700"># Rounding to handle floating-point errors</span>
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          Output:
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
          <pre>
            Matrix A:
            [[1 2]
             [3 4]]

            Matrix B:
            [[5 6]
             [7 8]]

            Matrix Addition (A + B):
            [[ 6  8]
             [10 12]]

            Matrix Multiplication (A · B):
            [[19 22]
             [43 50]]

            Matrix Transpose (A^T):
            [[1 3]
             [2 4]]

            Matrix Determinant of A: -2.0000000000000004

            Matrix Inverse of A:
            [[-2.   1. ]
             [ 1.5 -0.5]]

            A · A^(-1) (should be close to identity matrix):
            [[1. 0.]
             [0. 1.]]
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Matrix Operations Explained:</h4>
          <p className="mt-2 text-gray-700">
            Here's what each operation does:
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>Matrix Addition (A + B)</strong>: Adds corresponding elements of matrices A and B.</li>
            <li><strong>Matrix Multiplication (A · B)</strong>: Performs the dot product of matrices A and B. This is different from element-wise multiplication! For two 2×2 matrices, the result is calculated as:
              <pre className="bg-gray-100 p-2 rounded-md mt-2 text-sm">
                result[0,0] = A[0,0]*B[0,0] + A[0,1]*B[1,0] = 1*5 + 2*7 = 5 + 14 = 19
                result[0,1] = A[0,0]*B[0,1] + A[0,1]*B[1,1] = 1*6 + 2*8 = 6 + 16 = 22
                result[1,0] = A[1,0]*B[0,0] + A[1,1]*B[1,0] = 3*5 + 4*7 = 15 + 28 = 43
                result[1,1] = A[1,0]*B[0,1] + A[1,1]*B[1,1] = 3*6 + 4*8 = 18 + 32 = 50
              </pre>
            </li>
            <li><strong>Matrix Transpose (A^T)</strong>: Flips the matrix over its diagonal, switching rows and columns.</li>
            <li><strong>Matrix Determinant</strong>: A value calculated from the elements of a square matrix, useful in solving systems of linear equations.</li>
            <li><strong>Matrix Inverse (A^(-1))</strong>: A matrix that, when multiplied by the original matrix, gives the identity matrix.</li>
          </ul>
          <p className="mt-2 text-gray-700">
            These operations are fundamental in linear algebra and have many applications in data science, machine learning, computer graphics, and more.
          </p>
        </div>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>🔗 What's Next?</strong><br/><br/>
          Now that you understand the basics of NumPy, you're ready to use it for more advanced data manipulation and analysis. NumPy is the foundation for libraries like Pandas (for data analysis), Matplotlib (for visualization), and many machine learning frameworks.
        </p>

        <div id="numpy-project" className="miniproject w-full py-5 px-8 rounded-xl mt-5 flex flex-col gap-2 bg-slate-200">
          <h3 className="text-lg font-semibold">Project Section</h3>
          <div className="projectnamequest text-gray-700 mb-5">
            Try creating a program that uses NumPy to analyze a dataset of student grades. Calculate statistics like mean, median, and standard deviation, and find the top-performing students.
          </div>
          <button className="gotoproject px-4 py-2 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200">
            Start your NumPy project
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Numpy
