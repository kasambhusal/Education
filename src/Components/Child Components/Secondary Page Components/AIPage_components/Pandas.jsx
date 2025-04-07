import React from 'react'
import { motion } from 'framer-motion'

const Pandas = () => {
  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="project-section bg-slate-200 rounded-xl p-6 mt-8"
      >
        <h2 className="text-2xl font-bold text-purple-900">Pandas</h2>

        <div className="flex items-center gap-4 mt-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Difficulty: Medium
          </span>
          <span className="text-gray-600">⏱️ Estimated Time: 20 min</span>
        </div>

        <p className="text-gray-800 mb-4">Learn the fundamentals of Pandas, and how it is operated on data before feeding data to models</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Objectives:</h3>
          <ul className="list-disc pl-5">
            - To surfacely understand what Pandas is <br></br>
            - Learn some most common methods and usecases of Pandas
          </ul>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="second_topic p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-3xl text-purple-900 font-bold mb-2">What is Pandas? 🐼</h2>

        <p className="text-amber-800 text-md mt-10">
          Ever wondered how AI models handle huge amounts of data? Before an AI can predict anything, the data needs to be organized, cleaned, and analyzed—that’s where <b>pandas</b> comes in!
          Pandas is a Python library that helps us<i> store, explore, and manipulate</i> data efficiently. Think of it as a powerful Excel inside Python!
        </p>

        <p className="text-gray-800 mt-7 text-lg">
          Let's say we have test scores of students. We can store them in a pandas DataFrame (a table-like structure) and analyze it easily.
          A DataFrame is nothing but just a way to represent our data in tabular format as you see mostly in excel, i.e each column with a heading.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># First, import pandas</span><br />
            import pandas as pd<br /><br />

            <span className="text-green-700"># Create a dictionary of student data where "Name", "Math Score", and "Science Score" will be headings for each column</span><br />
            data = &#123; "Name": ["Alice", "Bob", "Charlie"],<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Math Score": [85, 90, 78],<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Science Score": [88, 92, 80] &#125;<br /><br />

            <span className="text-green-700"># Convert it into a DataFrame</span><br />
            df = pd.DataFrame(data)<br /><br />

            print(df)
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          Output:
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-sm">
          <pre>
            Name     Math Score  Science Score<br />
            Alice         85            88<br />
            Bob           90            92<br />
            Charlie       78            80
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          Now let’s explore some essential pandas functions!
        </p>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>1️⃣ Reading Data from a CSV File</strong><br />
          Most real-world data comes in CSV files. Instead of typing data manually, we can load a file into pandas like this:
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="text-sm text-red-700">
            df = pd.read_csv("students.csv")  <span className="text-green-700"># Reads a CSV file into a DataFrame</span><br />
            print(df.head())  <span className="text-green-700"># Shows first 5 rows</span>
          </pre>
        </div>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>2️⃣ Getting Basic Info About Data</strong><br />
          Before analyzing, we need to check if the data is complete and correct.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="text-sm text-red-700">
            df.info()  <span className="text-green-700"># Shows column names, data types, and missing values</span><br />
            df.describe()  <span className="text-green-700"># Provides summary statistics (mean, min, max, etc.)</span>
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          Output of df.describe():
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-sm">
          <pre>
            Math Score  Science Score<br />
            count     3.0        3.0<br />
            mean      84.3       86.7<br />
            min       78.0       80.0<br />
            max       90.0       92.0
          </pre>
        </div>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>3️⃣ Selecting and Filtering Data</strong><br />
          We can pick specific columns, rows, or filter based on conditions:
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="text-sm text-red-700">
            df["Math Score"]  <span className="text-green-700"># Selects one column</span><br />
            df.loc[0]  <span className="text-green-700"># Selects first row</span><br />
            df[df["Math Score"] &gt; 80]  <span className="text-green-700"># Filters students with math score &gt; 80</span>
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          Output of df[df["Math Score"] &gt; 80]:
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-sm">
          <pre>
            Name     Math Score  Science Score<br />
            Alice         85            88<br />
            Bob           90            92
          </pre>
        </div>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>4️⃣ Sorting and Grouping Data</strong><br />
          Sorting helps in ranking students, and grouping helps in analyzing categories.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="text-sm text-red-700">
            df.sort_values("Math Score", ascending=False)  <span className="text-green-700"># Sort by Math Score (highest first)</span><br />
            df.groupby("Science Score").mean()  <span className="text-green-700"># Group by Science Score and take average</span>
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          You can try out these functios in jupyter notebook. It's always better to try writing code than just watching it 😉
        </p>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>🔗 What’s Next?</strong><br /><br />
          Now that we can organize data, we’ll move on to data visualization, handling real-world datasets, and preparing data for AI models.
          Ready to dive deeper? Let’s go! 🚀
        </p>

        <div id="ch-2_miniProject" className="miniproject w-full py-5 px-8 rounded-xl mt-5 flex flex-col gap-2 bg-slate-200">
          <h3 className="text-lg font-semibold">Project Section</h3>
          <div className="projectnamequest text-gray-700 mb-5">
            Try analyzing real datasets using pandas. Load a dataset, clean it, and explore it!
          </div>
          <button className="gotoproject px-4 py-2 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200">
            Try a simple project
          </button>
        </div>
      </motion.div>

    </div>
  )
}

export default Pandas
