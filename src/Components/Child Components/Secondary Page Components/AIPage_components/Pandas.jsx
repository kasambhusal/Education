// import React from 'react'
// import { motion } from 'framer-motion'

// const Pandas = () => {
//   return (
//     <div className="flex flex-col gap-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="project-section bg-zinc-50 border-2 border-green-600 shadow-2xl rounded-xl py-6 px-4"
//       >
//         <h2 className="text-2xl font-bold text-purple-900">Pandas</h2>

//         <div className="flex items-center gap-4 mt-2 mb-4">
//           <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-xl text-sm">
//             Difficulty: Medium
//           </span>
//           <span className="text-gray-600">⏱️ Estimated Time: 30 min</span>
//         </div>

//         <p className="text-gray-800 mb-4">Learn the fundamentals of Pandas, and how it is operated on data before feeding data to models</p>

//         <div className="mb-6">
//           <h3 className="text-lg font-semibold mb-2">Objectives:</h3>
//           <ul className="list-disc pl-5">
//             - To surfacely understand what Pandas is <br></br>
//             - Learn some most common methods and usecases of Pandas
//           </ul>
//         </div>
//       </motion.div>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="second_topic p-6 bg-white shadow-lg rounded-lg"
//       >
//         <h2 className="text-3xl text-purple-900 font-bold mb-2">What is Pandas? 🐼</h2>

//         <p className="text-amber-800 text-md mt-10">
//           Ever wondered how AI models handle huge amounts of data? Before an AI can predict anything, the data needs to be organized, cleaned, and analyzed—that’s where <b>pandas</b> comes in!
//           Pandas is a Python library that helps us<i> store, explore, and manipulate</i> data efficiently. Think of it as a powerful Excel inside Python!
//         </p>

//         <p className="text-gray-800 mt-7 text-lg">
//           Let's say we have test scores of students. We can store them in a pandas DataFrame (a table-like structure) and analyze it easily.
//           A DataFrame is nothing but just a way to represent our data in tabular format as you see mostly in excel, i.e each column with a heading.
//         </p>

//         <div className="bg-gray-100 p-4 rounded-md">
//           <pre className="text-sm text-red-700">
//             <span className="text-green-700"># First, import pandas</span><br />
//             import pandas as pd<br /><br />

//             <span className="text-green-700"># Create a dictionary of student data where "Name", "Math Score", and "Science Score" will be headings for each column</span><br />
//             data = &#123; "Name": ["Alice", "Bob", "Charlie"],<br />
//             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Math Score": [85, 90, 78],<br />
//             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Science Score": [88, 92, 80] &#125;<br /><br />

//             <span className="text-green-700"># Convert it into a DataFrame</span><br />
//             df = pd.DataFrame(data)<br /><br />

//             print(df)
//           </pre>
//         </div>

//         <p className="text-lg mt-6 text-green-900">
//           Output:
//         </p>
//         <div className="bg-gray-100 p-4 rounded-md text-sm">
//           <pre>
//             Name     Math Score  Science Score<br />
//             Alice         85            88<br />
//             Bob           90            92<br />
//             Charlie       78            80
//           </pre>
//         </div>

//         <p className="text-lg mt-6 text-green-900">
//           Now let’s explore some essential pandas functions!
//         </p>

//         <p className="text-gray-800 mt-7 text-lg">
//           <strong>1️⃣ Reading Data from a CSV File</strong><br />
//           Most real-world data comes in CSV files. Instead of typing data manually, we can load a file into pandas like this:
//         </p>

//         <div className="bg-gray-100 p-4 rounded-md">
//           <pre className="text-sm text-red-700">
//             df = pd.read_csv("students.csv")  <span className="text-green-700"># Reads a CSV file into a DataFrame</span><br />
//             print(df.head())  <span className="text-green-700"># Shows first 5 rows</span>
//           </pre>
//         </div>

//         <p className="text-gray-800 mt-7 text-lg">
//           <strong>2️⃣ Getting Basic Info About Data</strong><br />
//           Before analyzing, we need to check if the data is complete and correct.
//         </p>

//         <div className="bg-gray-100 p-4 rounded-md">
//           <pre className="text-sm text-red-700">
//             df.info()  <span className="text-green-700"># Shows column names, data types, and missing values</span><br />
//             df.describe()  <span className="text-green-700"># Provides summary statistics (mean, min, max, etc.)</span>
//           </pre>
//         </div>

//         <p className="text-lg mt-6 text-green-900">
//           Output of df.describe():
//         </p>
//         <div className="bg-gray-100 p-4 rounded-md text-sm">
//           <pre>
//             Math Score  Science Score<br />
//             count     3.0        3.0<br />
//             mean      84.3       86.7<br />
//             min       78.0       80.0<br />
//             max       90.0       92.0
//           </pre>
//         </div>

//         <p className="text-gray-800 mt-7 text-lg">
//           <strong>3️⃣ Selecting and Filtering Data</strong><br />
//           We can pick specific columns, rows, or filter based on conditions:
//         </p>

//         <div className="bg-gray-100 p-4 rounded-md">
//           <pre className="text-sm text-red-700">
//             df["Math Score"]  <span className="text-green-700"># Selects one column</span><br />
//             df.loc[0]  <span className="text-green-700"># Selects first row</span><br />
//             df[df["Math Score"] &gt; 80]  <span className="text-green-700"># Filters students with math score &gt; 80</span>
//           </pre>
//         </div>

//         <p className="text-lg mt-6 text-green-900">
//           Output of df[df["Math Score"] &gt; 80]:
//         </p>
//         <div className="bg-gray-100 p-4 rounded-md text-sm">
//           <pre>
//             Name     Math Score  Science Score<br />
//             Alice         85            88<br />
//             Bob           90            92
//           </pre>
//         </div>

//         <p className="text-gray-800 mt-7 text-lg">
//           <strong>4️⃣ Sorting and Grouping Data</strong><br />
//           Sorting helps in ranking students, and grouping helps in analyzing categories.
//         </p>

//         <div className="bg-gray-100 p-4 rounded-md">
//           <pre className="text-sm text-red-700">
//             df.sort_values("Math Score", ascending=False)  <span className="text-green-700"># Sort by Math Score (highest first)</span><br />
//             df.groupby("Science Score").mean()  <span className="text-green-700"># Group by Science Score and take average</span>
//           </pre>
//         </div>

//         <p className="text-lg mt-6 text-green-900">
//           You can try out these functios in jupyter notebook. It's always better to try writing code than just watching it 😉
//         </p>

//         <p className="text-gray-800 mt-7 text-lg">
//           <strong>🔗 What’s Next?</strong><br /><br />
//           Now that we can organize data, we’ll move on to data visualization, handling real-world datasets, and preparing data for AI models.
//           Ready to dive deeper? Let’s go! 🚀
//         </p>

//         {/* <div id="ch-2_miniProject" className="miniproject w-full py-5 px-8 rounded-xl mt-5 flex flex-col gap-2 bg-slate-200">
//           <h3 className="text-lg font-semibold">Project Section</h3>
//           <div className="projectnamequest text-gray-700 mb-5">
//             Try analyzing real datasets using pandas. Load a dataset, clean it, and explore it! Play with all kind 
//           </div>
//           <button className="gotoproject px-4 py-2 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200">
//             Try a simple project
//           </button>
//         </div> */}
//       </motion.div>

//     </div>
//   )
// }

// export default Pandas

import React from 'react'
import { motion } from 'framer-motion'

const Pandas = () => {
  return (
    <div className="flex flex-col gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="project-section bg-zinc-50 border-2 border-green-600 shadow-2xl rounded-xl py-6 px-4"
      >
        <h2 className="text-2xl font-bold text-purple-900">Pandas: Data Analysis Made Easy</h2>

        <div className="flex items-center gap-4 mt-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-xl text-sm">
            Difficulty: Beginner-Intermediate
          </span>
          <span className="text-gray-600">⏱️ Estimated Time: 60 min</span>
        </div>

        <p className="text-gray-800 mb-4">Learn how to manipulate, analyze, and clean data efficiently with Python's most popular data analysis library.</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Objectives:</h3>
          <ul className="list-disc pl-5">
            <li>Understand DataFrames and Series, the core data structures of Pandas</li>
            <li>Learn to import data from various sources</li>
            <li>Master data cleaning and preprocessing techniques</li>
            <li>Use GroupBy, Merge, and Join operations for data analysis</li>
            <li>Effectively handle missing values in datasets</li>
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pandas-intro p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-3xl text-purple-900 font-bold mb-2">What is Pandas? 🐼</h2> 

        <p className="text-amber-800 text-md mt-10">
          Pandas is a powerful Python library for data manipulation and analysis. If NumPy is like a calculator for arrays, Pandas is like an advanced Excel spreadsheet that can handle millions of rows efficiently. It's the most widely used tool for data analysis in Python and an essential skill for data science and machine learning.
        </p> 

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-md">
          <h4 className="font-bold text-blue-800">Before We Start:</h4>
          <p className="mt-2 text-gray-700">
            To use Pandas, you first need to install it and import it in your code:
          </p>
          <pre className="bg-gray-100 p-2 rounded-md mt-2 text-sm">
            # Install Pandas (run this in your terminal or command prompt)
            pip install pandas
            
            # Import Pandas in your Python code
            import pandas as pd
          </pre>
          <p className="mt-2 text-gray-700">
            We import Pandas as "pd" - this is a standard convention that makes our code shorter and easier to read.
          </p>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">1. DataFrames and Series</h3>

        <p className="text-gray-800 mt-4 mb-4">
          Pandas has two main data structures that you'll use constantly: <strong>Series</strong> and <strong>DataFrame</strong>.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Key Pandas Data Structures:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>Series</strong>: A one-dimensional labeled array that can hold any data type. Think of it as a single column in a spreadsheet.</li>
            <li><strong>DataFrame</strong>: A two-dimensional labeled data structure with columns that can be of different types. Think of it as a spreadsheet or SQL table.</li>
          </ul>
        </div>

        <p className="text-gray-800 mt-4 mb-4">
          Let's see how to create and work with Series and DataFrames:
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Importing pandas</span><br/>
            import pandas as pd<br/>
            import numpy as np<br/><br/>

            <span className="text-green-700"># Creating a Series</span><br/>
            s = pd.Series([1, 3, 5, 7, 9])<br/>
            print("Simple Series:")<br/>
            print(s)<br/><br/>

            <span className="text-green-700"># Creating a Series with custom index</span><br/>
            s_custom = pd.Series([1, 3, 5, 7, 9], index=['a', 'b', 'c', 'd', 'e'])<br/>
            print("\nSeries with custom index:")<br/>
            print(s_custom)<br/><br/>

            <span className="text-green-700"># Accessing Series elements</span><br/>
            print("\nElement at index 'c':", s_custom['c'])<br/>
            print("Elements from 'b' to 'd':")<br/>
            print(s_custom['b':'d'])<br/><br/>

            <span className="text-green-700"># Creating a DataFrame from a dictionary</span><br/>
            data = &#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Name": ["Alice", "Bob", "Charlie", "David"],<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Age": [25, 30, 35, 40],<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"City": ["New York", "Boston", "Chicago", "Denver"]<br/>
            &#125;<br/>
            df = pd.DataFrame(data)<br/>
            print("\nDataFrame from dictionary:")<br/>
            print(df)
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          Output:
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
          <pre>
Simple Series:
0    1
1    3
2    5
3    7
4    9
dtype: int64

Series with custom index:
a    1
b    3
c    5
d    7
e    9
dtype: int64

Element at index 'c': 5
Elements from 'b' to 'd':
b    3
c    5
d    7
dtype: int64

DataFrame from dictionary:
      Name  Age     City
0    Alice   25  New York
1      Bob   30    Boston
2  Charlie   35   Chicago
3    David   40    Denver
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Code Explanation:</h4>
          <ol className="list-decimal ml-5 mt-2 text-gray-700 space-y-2">
            <li><code>pd.Series([1, 3, 5, 7, 9])</code>: Creates a Series with default integer indices (0, 1, 2, ...).</li>
            <li><code>pd.Series([1, 3, 5, 7, 9], index=['a', 'b', 'c', 'd', 'e'])</code>: Creates a Series with custom string indices.</li>
            <li><code>s_custom['c']</code>: Accesses the element at index 'c'.</li>
            <li><code>s_custom['b':'d']</code>: Slices the Series from index 'b' to 'd' (inclusive).</li>
            <li><code>pd.DataFrame(data)</code>: Creates a DataFrame from a dictionary where keys become column names and values become column data.</li>
          </ol>
        </div>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>Working with DataFrames</strong><br/>
          Let's explore more operations with DataFrames:
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Continue with the previous DataFrame</span><br/>
            <span className="text-green-700"># Accessing columns</span><br/>
            print("Names column:")<br/>
            print(df['Name'])<br/><br/>

            <span className="text-green-700"># Accessing multiple columns</span><br/>
            print("\nName and Age columns:")<br/>
            print(df[['Name', 'Age']])<br/><br/>

            <span className="text-green-700"># Accessing rows using .loc (label-based)</span><br/>
            print("\nRow with index 2 (using .loc):")<br/>
            print(df.loc[2])<br/><br/>

            <span className="text-green-700"># Accessing rows using .iloc (position-based)</span><br/>
            print("\nFirst two rows (using .iloc):")<br/>
            print(df.iloc[0:2])<br/><br/>

            <span className="text-green-700"># Adding a new column</span><br/>
            df['Salary'] = [70000, 80000, 90000, 100000]<br/>
            print("\nDataFrame with new Salary column:")<br/>
            print(df)<br/><br/>

            <span className="text-green-700"># Basic statistics</span><br/>
            print("\nSummary statistics for numerical columns:")<br/>
            print(df.describe())
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          Output:
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
          <pre>
Names column:
0      Alice
1        Bob
2    Charlie
3      David
Name: Name, dtype: object

Name and Age columns:
      Name  Age
0    Alice   25
1      Bob   30
2  Charlie   35
3    David   40

Row with index 2 (using .loc):
Name      Charlie
Age            35
City      Chicago
Name: 2, dtype: object

First two rows (using .iloc):
    Name  Age      City
0  Alice   25  New York
1    Bob   30    Boston

DataFrame with new Salary column:
      Name  Age     City  Salary
0    Alice   25  New York   70000
1      Bob   30    Boston   80000
2  Charlie   35   Chicago   90000
3    David   40    Denver  100000

Summary statistics for numerical columns:
             Age        Salary
count   4.000000      4.000000
mean   32.500000  85000.000000
std     6.454972  12909.944487
min    25.000000  70000.000000
25%    28.750000  77500.000000
50%    32.500000  85000.000000
75%    36.250000  92500.000000
max    40.000000 100000.000000
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">DataFrame Access Methods Explained:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><code>df['Name']</code>: Accesses a single column, returns a Series.</li>
            <li><code>df[['Name', 'Age']]</code>: Accesses multiple columns, returns a DataFrame.</li>
            <li><code>df.loc[2]</code>: Accesses a row by its label (index value).</li>
            <li><code>df.iloc[0:2]</code>: Accesses rows by their position (first two rows).</li>
            <li><code>df['Salary'] = [70000, 80000, 90000, 100000]</code>: Adds a new column to the DataFrame.</li>
            <li><code>df.describe()</code>: Generates summary statistics for numerical columns (count, mean, std, min, percentiles, max).</li>
          </ul>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">2. Importing Datasets</h3>

        <p className="text-gray-800 mt-4 mb-4">
          In real-world data analysis, you'll rarely create data manually. Instead, you'll import data from various sources like CSV files, Excel spreadsheets, databases, or web APIs. Pandas makes this process easy with built-in functions.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">Common Data Import Functions:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><code>pd.read_csv()</code>: Import data from CSV files</li>
            <li><code>pd.read_excel()</code>: Import data from Excel files</li>
            <li><code>pd.read_sql()</code>: Import data from SQL databases</li>
            <li><code>pd.read_json()</code>: Import data from JSON files</li>
            <li><code>pd.read_html()</code>: Import data from HTML tables</li>
          </ul>
        </div>

        <p className="text-gray-800 mt-4 mb-4">
          Let's see how to import data from different sources:
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Importing data from CSV file</span><br/>
            <span className="text-green-700"># For this example, imagine we have a file named 'students.csv'</span><br/>
            <span className="text-green-700"># with columns: 'Name', 'Age', 'Grade', 'Score'</span><br/>
            import pandas as pd<br/><br/>

            <span className="text-green-700"># Basic CSV import</span><br/>
            df_csv = pd.read_csv('students.csv')<br/>
            print("Data imported from CSV:")<br/>
            print(df_csv.head())  <span className="text-green-700"># .head() shows the first 5 rows</span><br/><br/>

            <span className="text-green-700"># CSV import with specific options</span><br/>
            df_csv_options = pd.read_csv('students.csv',<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;skiprows=1,  <span className="text-green-700"># Skip the first row</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;usecols=['Name', 'Score'],  <span className="text-green-700"># Only import specific columns</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;na_values=['N/A', 'Unknown']  <span className="text-green-700"># Convert these strings to NaN</span><br/>
            )<br/><br/>

            <span className="text-green-700"># Importing from Excel</span><br/>
            df_excel = pd.read_excel('students.xlsx', sheet_name='Sheet1')<br/><br/>

            <span className="text-green-700"># Importing from SQL database</span><br/>
            import sqlite3<br/>
            conn = sqlite3.connect('database.db')<br/>
            df_sql = pd.read_sql('SELECT * FROM students', conn)<br/><br/>

            <span className="text-green-700"># Importing from JSON</span><br/>
            df_json = pd.read_json('students.json')<br/><br/>

            <span className="text-green-700"># Importing from HTML table</span><br/>
            df_html = pd.read_html('https://example.com/students_table.html')[0]  <span className="text-green-700"># Returns a list of all tables</span>
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Import Functions Explained:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><code>pd.read_csv('students.csv')</code>: Reads a CSV file and returns a DataFrame.</li>
            <li><code>df_csv.head()</code>: Shows the first 5 rows of the DataFrame (useful for quickly checking data).</li>
            <li><code>skiprows=1</code>: Skips the first row of the file (useful if there's a header row you want to ignore).</li>
            <li><code>usecols=['Name', 'Score']</code>: Only imports the specified columns.</li>
            <li><code>na_values=['N/A', 'Unknown']</code>: Converts these strings to NaN (Not a Number) values.</li>
            <li><code>sheet_name='Sheet1'</code>: Specifies which sheet to read from an Excel file.</li>
            <li><code>pd.read_html(...)[0]</code>: Returns the first HTML table found on the webpage.</li>
          </ul>
        </div>

        <p className="text-gray-800 mt-4 mb-4">
          Once you've imported your data, it's a good idea to explore it to understand its structure and content:
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Exploring a DataFrame after import</span><br/>
            <span className="text-green-700"># Let's assume we've imported a CSV file as df</span><br/>
            import pandas as pd<br/>
            df = pd.read_csv('students.csv')<br/><br/>

            <span className="text-green-700"># Basic information about the DataFrame</span><br/>
            print("DataFrame shape (rows, columns):", df.shape)<br/>
            print("\nColumn names:", df.columns.tolist())<br/>
            print("\nData types:")<br/>
            print(df.dtypes)<br/><br/>

            <span className="text-green-700"># First and last rows</span><br/>
            print("\nFirst 5 rows:")<br/>
            print(df.head())<br/>
            print("\nLast 5 rows:")<br/>
            print(df.tail())<br/><br/>

            <span className="text-green-700"># Summary statistics</span><br/>
            print("\nSummary statistics:")<br/>
            print(df.describe())<br/><br/>

            <span className="text-green-700"># Check for missing values</span><br/>
            print("\nMissing values per column:")<br/>
            print(df.isnull().sum())<br/><br/>

            <span className="text-green-700"># Quick visualization</span><br/>
            <span className="text-green-700"># This requires matplotlib to be installed</span><br/>
            df.hist(figsize=(10, 8))  <span className="text-green-700"># Creates histograms for numerical columns</span>
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Data Exploration Functions Explained:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><code>df.shape</code>: Returns a tuple with (number of rows, number of columns).</li>
            <li><code>df.columns.tolist()</code>: Returns a list of column names.</li>
            <li><code>df.dtypes</code>: Shows the data type of each column.</li>
            <li><code>df.head()</code>: Shows the first 5 rows (you can specify a different number).</li>
            <li><code>df.tail()</code>: Shows the last 5 rows.</li>
            <li><code>df.describe()</code>: Generates summary statistics for numerical columns.</li>
            <li><code>df.isnull().sum()</code>: Counts missing values in each column.</li>
            <li><code>df.hist()</code>: Creates histograms for numerical columns to visualize distributions.</li>
          </ul>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">3. Data Cleaning and Preprocessing</h3>

        <p className="text-gray-800 mt-4 mb-4">
          Real-world data is rarely clean and ready for analysis. Data cleaning and preprocessing are crucial steps in any data analysis workflow. Pandas provides many functions to help with these tasks.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">Common Data Cleaning Tasks:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li>Handling missing values</li>
            <li>Removing duplicates</li>
            <li>Renaming columns</li>
            <li>Changing data types</li>
            <li>Creating new columns</li>
            <li>Filtering data</li>
            <li>Sorting data</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Data cleaning and preprocessing examples</span><br/>
            import pandas as pd<br/>
            import numpy as np<br/><br/>

            <span className="text-green-700"># Create a sample DataFrame with some issues</span><br/>
            data = &#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Name": ["Alice", "Bob", "Charlie", "Alice", None],<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Age": [25, 30, np.nan, 25, 40],<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"City": ["New York", "boston", "Chicago", "NEW YORK", "Denver"],<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Salary": ["70,000", "80,000", "90,000", "70,000", "100000"]<br/>
            &#125;<br/>
            df = pd.DataFrame(data)<br/>
            print("Original DataFrame:")<br/>
            print(df)<br/><br/>

            <span className="text-green-700"># 1. Removing duplicates</span><br/>
            df_no_dupes = df.drop_duplicates()<br/>
            print("\nAfter removing duplicates:")<br/>
            print(df_no_dupes)<br/><br/>

            <span className="text-green-700"># 2. Renaming columns</span><br/>
            df_renamed = df_no_dupes.rename(columns=&#123;"Name": "Full_Name", "City": "Location"&#125;)<br/>
            print("\nAfter renaming columns:")<br/>
            print(df_renamed)<br/><br/>

            <span className="text-green-700"># 3. Filling missing values</span><br/>
            df_filled = df_renamed.fillna(&#123;"Full_Name": "Unknown", "Age": df_renamed["Age"].mean()&#125;)<br/>
            print("\nAfter filling missing values:")<br/>
            print(df_filled)<br/><br/>

            <span className="text-green-700"># 4. Standardizing text data (making all city names consistent)</span><br/>
            df_filled["Location"] = df_filled["Location"].str.title()  <span className="text-green-700"># Convert to title case</span><br/>
            print("\nAfter standardizing city names:")<br/>
            print(df_filled)<br/><br/>

            <span className="text-green-700"># 5. Converting data types</span><br/>
            <span className="text-green-700"># First, clean the salary column by removing commas</span><br/>
            df_filled["Salary"] = df_filled["Salary"].str.replace(",", "")<br/>
            <span className="text-green-700"># Then convert to numeric</span><br/>
            df_filled["Salary"] = pd.to_numeric(df_filled["Salary"])<br/>
            print("\nAfter converting salary to numeric:")<br/>
            print(df_filled.dtypes)<br/><br/>

            <span className="text-green-700"># 6. Creating a new column</span><br/>
            df_filled["Salary_Category"] = pd.cut(df_filled["Salary"],<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;bins=[0, 75000, 90000, float('inf')],<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;labels=["Low", "Medium", "High"])<br/>
            print("\nAfter adding salary category:")<br/>
            print(df_filled)<br/><br/>

            <span className="text-green-700"># 7. Filtering data</span><br/>
            high_earners = df_filled[df_filled["Salary"] &gt; 80000]<br/>
            print("\nHigh earners (salary &gt; 80000):")<br/>
            print(high_earners)<br/><br/>

            <span className="text-green-700"># 8. Sorting data</span><br/>
            sorted_df = df_filled.sort_values(by=["Salary"], ascending=False)<br/>
            print("\nSorted by salary (highest first):")<br/>
            print(sorted_df)
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Data Cleaning Functions Explained:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><code>df.drop_duplicates()</code>: Removes duplicate rows from the DataFrame.</li>
            <li><code>df.rename(columns=&#123;...&#125;)</code>: Renames columns using a dictionary mapping old names to new names.</li>
            <li><code>df.fillna(&#123;...&#125;)</code>: Fills missing values with specified values (can be different for each column).</li>
            <li><code>df["Location"].str.title()</code>: Applies the title() string method to each value in the column.</li>
            <li><code>df["Salary"].str.replace(",", "")</code>: Removes commas from the salary strings.</li>
            <li><code>pd.to_numeric(df["Salary"])</code>: Converts the column to numeric data type.</li>
            <li><code>pd.cut()</code>: Bins continuous data into discrete categories.</li>
            <li><code>df[df["Salary"] &gt; 80000]</code>: Filters rows where the condition is True.</li>
            <li><code>df.sort_values(by=["Salary"], ascending=False)</code>: Sorts the DataFrame by the Salary column in descending order.</li>
          </ul>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">4. GroupBy, Merge, Join</h3>

        <p className="text-gray-800 mt-4 mb-4">
          These operations are essential for data analysis and are similar to operations in SQL databases. They allow you to aggregate data, combine datasets, and perform complex analyses.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">Key Operations:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>GroupBy</strong>: Groups data by one or more columns and applies aggregate functions.</li>
            <li><strong>Merge</strong>: Combines two DataFrames based on common columns (similar to SQL JOIN).</li>
            <li><strong>Join</strong>: Another way to combine DataFrames, based on indices.</li>
            <li><strong>Concat</strong>: Stacks DataFrames either vertically or horizontally.</li>
          </ul>
        </div>

        <p className="text-gray-800 mt-4 mb-4">
          Let's explore these operations:
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># GroupBy, Merge, Join examples</span><br/>
            import pandas as pd<br/><br/>

            <span className="text-green-700"># Create sample DataFrames</span><br/>
            <span className="text-green-700"># Sales data</span><br/>
            sales_data = &#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Date": ["2023-01-01", "2023-01-01", "2023-01-02", "2023-01-02", "2023-01-03"],<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Product_ID": [101, 102, 101, 103, 102],<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Quantity": [5, 3, 2, 7, 4],<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Sales_Amount": [500, 600, 200, 1400, 800]<br/>
            &#125;<br/>
            sales_df = pd.DataFrame(sales_data)<br/><br/>

            <span className="text-green-700"># Product data</span><br/>
            product_data = &#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Product_ID": [101, 102, 103, 104],<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Product_Name": ["Laptop", "Phone", "Tablet", "Monitor"],<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Category": ["Electronics", "Electronics", "Electronics", "Accessories"],<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Price": [1000, 800, 500, 300]<br/>
            &#125;<br/>
            product_df = pd.DataFrame(product_data)<br/><br/>

            print("Sales DataFrame:")<br/>
            print(sales_df)<br/><br/>

            print("Product DataFrame:")<br/>
            print(product_df)<br/><br/>

            <span className="text-green-700"># 1. GroupBy: Aggregate sales by date</span><br/>
            daily_sales = sales_df.groupby("Date").agg(&#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Total_Quantity": ("Quantity", "sum"),<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Total_Sales": ("Sales_Amount", "sum"),<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Average_Sale": ("Sales_Amount", "mean"),<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Number_of_Transactions": ("Product_ID", "count")<br/>
            &#125;)<br/>
            print("\nDaily Sales Summary:")<br/>
            print(daily_sales)<br/><br/>

            <span className="text-green-700"># 2. GroupBy: Aggregate sales by product</span><br/>
            product_sales = sales_df.groupby("Product_ID").agg(&#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Total_Quantity": ("Quantity", "sum"),<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Total_Sales": ("Sales_Amount", "sum")<br/>
            &#125;)<br/>
            print("\nSales by Product ID:")<br/>
            print(product_sales)<br/><br/>

            <span className="text-green-700"># 3. Merge: Combine sales and product data</span><br/>
            <span className="text-green-700"># Inner join: only keep rows where Product_ID exists in both DataFrames</span><br/>
            sales_with_product = sales_df.merge(product_df, on="Product_ID", how="inner")<br/>
            print("\nSales with Product Information (Inner Join):")<br/>
            print(sales_with_product)<br/><br/>

            <span className="text-green-700"># 4. Merge with different join types</span><br/>
            <span className="text-green-700"># Left join: keep all rows from the left DataFrame</span><br/>
            left_join = sales_df.merge(product_df, on="Product_ID", how="left")<br/>
            print("\nLeft Join (all sales, matching products):")<br/>
            print(left_join)<br/><br/>

            <span className="text-green-700"># Right join: keep all rows from the right DataFrame</span><br/>
            right_join = sales_df.merge(product_df, on="Product_ID", how="right")<br/>
            print("\nRight Join (all products, matching sales):")<br/>
            print(right_join)<br/><br/>

            <span className="text-green-700"># 5. Advanced analysis: Sales by category</span><br/>
            <span className="text-green-700"># First merge, then groupby</span><br/>
            category_sales = sales_with_product.groupby("Category").agg(&#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Total_Sales": ("Sales_Amount", "sum"),<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"Average_Price": ("Price", "mean")<br/>
            &#125;)<br/>
            print("\nSales by Category:")<br/>
            print(category_sales)
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">GroupBy and Merge Operations Explained:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><code>df.groupby("Date")</code>: Groups the DataFrame by the Date column.</li>
            <li><code>.agg(&#123;...&#125;)</code>: Applies aggregate functions to each group. The dictionary maps output column names to tuples of (input column, function).</li>
            <li><code>sales_df.merge(product_df, on="Product_ID", how="inner")</code>: Merges two DataFrames based on the Product_ID column using an inner join.</li>
            <li><code>how="inner"</code>: Only keeps rows where the join key exists in both DataFrames.</li>
            <li><code>how="left"</code>: Keeps all rows from the left DataFrame, adds NaN for missing matches from the right.</li>
            <li><code>how="right"</code>: Keeps all rows from the right DataFrame, adds NaN for missing matches from the left.</li>
          </ul>
          <p className="mt-2 text-gray-700">
            These operations are powerful for data analysis and are similar to SQL operations. They allow you to aggregate, combine, and transform data in many ways.
          </p>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">5. Handling Missing Values</h3>

        <p className="text-gray-800 mt-4 mb-4">
          Missing values are common in real-world datasets and can cause problems in analysis if not handled properly. Pandas provides several methods to detect and handle missing values.
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Handling missing values</span><br/>
            import pandas as pd<br/>
            import numpy as np<br/><br/>

            <span className="text-green-700"># Create a DataFrame with missing values</span><br/>
            data = &#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"A": [1, 2, np.nan, 4, 5],<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"B": [np.nan, 2, 3, 4, 5],<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"C": [1, 2, 3, np.nan, np.nan],<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"D": [1, 2, 3, 4, 5]<br/>
            &#125;<br/>
            df = pd.DataFrame(data)<br/>
            print("DataFrame with missing values:")<br/>
            print(df)<br/><br/>

            <span className="text-green-700"># 1. Detecting missing values</span><br/>
            print("\nDetecting missing values (True where missing):")<br/>
            print(df.isnull())<br/><br/>

            print("Count of missing values per column:")<br/>
            print(df.isnull().sum())<br/><br/>

            print("Total missing values in the DataFrame:", df.isnull().sum().sum())<br/><br/>

            <span className="text-green-700"># 2. Dropping rows with missing values</span><br/>
            <span className="text-green-700"># Drop rows where any column has a missing value</span><br/>
            df_dropped = df.dropna()<br/>
            print("\nAfter dropping rows with any missing value:")<br/>
            print(df_dropped)<br/><br/>

            <span className="text-green-700"># Drop rows only if all columns have missing values</span><br/>
            df_dropped_all = df.dropna(how="all")<br/>
            print("\nAfter dropping rows where all values are missing:")<br/>
            print(df_dropped_all)<br/><br/>

            <span className="text-green-700"># 3. Dropping columns with missing values</span><br/>
            <span className="text-green-700"># Drop columns with at least 2 missing values</span><br/>
            df_dropped_cols = df.dropna(axis=1, thresh=4)<br/>
            print("\nAfter dropping columns with fewer than 4 non-missing values:")<br/>
            print(df_dropped_cols)<br/><br/>

            <span className="text-green-700"># 4. Filling missing values</span><br/>
            <span className="text-green-700"># Fill all missing values with a single value</span><br/>
            df_filled_0 = df.fillna(0)<br/>
            print("\nAfter filling all missing values with 0:")<br/>
            print(df_filled_0)<br/><br/>

            <span className="text-green-700"># Fill missing values with different values for each column</span><br/>
            df_filled_dict = df.fillna(&#123;"A": 0, "B": 100, "C": df["C"].mean()&#125;)<br/>
            print("\nAfter filling missing values with column-specific values:")<br/>
            print(df_filled_dict)<br/><br/>

            <span className="text-green-700"># 5. Forward fill (use previous value)</span><br/>
            df_ffill = df.fillna(method="ffill")<br/>
            print("\nAfter forward fill:")<br/>
            print(df_ffill)<br/><br/>

            <span className="text-green-700"># 6. Backward fill (use next value)</span><br/>
            df_bfill = df.fillna(method="bfill")<br/>
            print("\nAfter backward fill:")<br/>
            print(df_bfill)<br/><br/>

            <span className="text-green-700"># 7. Interpolation (linear interpolation between values)</span><br/>
            df_interp = df.interpolate()<br/>
            print("\nAfter interpolation:")<br/>
            print(df_interp)
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Missing Value Handling Methods Explained:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><code>df.isnull()</code>: Returns a DataFrame of the same shape with True where values are missing.</li>
            <li><code>df.isnull().sum()</code>: Counts missing values in each column.</li>
            <li><code>df.dropna()</code>: Removes rows with any missing values.</li>
            <li><code>df.dropna(how="all")</code>: Removes rows only if all values in the row are missing.</li>
            <li><code>df.dropna(axis=1, thresh=4)</code>: Removes columns with fewer than 4 non-missing values.</li>
            <li><code>df.fillna(0)</code>: Replaces all missing values with 0.</li>
            <li><code>df.fillna(&#123;"A": 0, "B": 100, "C": df["C"].mean()&#125;)</code>: Fills missing values with different values for each column.</li>
            <li><code>df.fillna(method="ffill")</code>: Forward fill - replaces missing values with the previous valid value.</li>
            <li><code>df.fillna(method="bfill")</code>: Backward fill - replaces missing values with the next valid value.</li>
            <li><code>df.interpolate()</code>: Fills missing values using interpolation between valid values.</li>
          </ul>
        </div>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>🔗 What's Next?</strong><br/><br/>
          Now that you understand the basics of Pandas, you're ready to use it for real-world data analysis. Pandas is an essential tool for data preprocessing before applying machine learning algorithms, creating visualizations, or performing statistical analysis.
        </p>

        <div id="pandas-project" className="miniproject w-full py-5 px-8 rounded-xl mt-5 flex flex-col gap-2 bg-slate-200">
          <h3 className="text-lg font-semibold">Project Section</h3>
          <div className="projectnamequest text-gray-700 mb-5">
            Download a real-world dataset (e.g., from Kaggle) and use Pandas to clean, analyze, and extract insights from it. Try to apply all the techniques you've learned: importing data, cleaning it, handling missing values, grouping, and merging.
          </div>
          <button className="gotoproject px-4 py-2 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200">
            Start your Pandas project
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Pandas
