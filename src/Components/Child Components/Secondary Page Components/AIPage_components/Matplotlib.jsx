import React from 'react'
import { motion } from 'framer-motion'

const Matplotlib = () => {
  return (
    <div className="flex flex-col gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="project-section bg-zinc-50 border-2 border-green-600 shadow-2xl rounded-xl py-6 px-4"
      >
        <h2 className="text-2xl font-bold text-purple-900">Data Visualization with Matplotlib</h2>

        <div className="flex items-center gap-4 mt-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-xl text-sm">
            Difficulty: Beginner
          </span>
          <span className="text-gray-600">⏱️ Estimated Time: 45 min</span>
        </div>

        <p className="text-gray-800 mb-4">Learn how to create beautiful visualizations to understand your data better and communicate your findings effectively.</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Objectives:</h3>
          <ul className="list-disc pl-5">
            <li>Understand what data visualization is and why it's important</li>
            <li>Learn how to create basic plots with Matplotlib</li>
            <li>Master different types of plots: line, scatter, bar, histogram, and boxplot</li>
            <li>Customize your visualizations to make them more informative</li>
            <li>Explore how to visualize relationships in your data</li>
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="matplotlib-intro p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-3xl text-purple-900 font-bold mb-2">What is Data Visualization? 📊</h2> 

        <p className="text-amber-800 text-md mt-10">
          Data visualization is the art of presenting data in a graphical format. It helps us understand patterns, trends, and relationships that might be difficult to see in raw numbers. As the saying goes, "A picture is worth a thousand words" - and in data science, a good visualization can be worth a thousand spreadsheet rows!
        </p> 

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-md">
          <h4 className="font-bold text-blue-800">Why Visualization Matters:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>Understanding data quickly</strong>: Our brains process visual information much faster than text or numbers</li>
            <li><strong>Finding patterns</strong>: Visualizations help identify trends, outliers, and relationships</li>
            <li><strong>Communicating insights</strong>: Graphs make it easier to share your findings with others</li>
            <li><strong>Making better decisions</strong>: Visual data helps support decision-making processes</li>
          </ul>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">1. Introduction to Matplotlib</h3>

        <p className="text-gray-800 mt-4 mb-4">
          Matplotlib is the most popular data visualization library in Python. It was created in 2003 and has become the foundation for many other visualization tools. Think of Matplotlib as your digital canvas where you can create various types of plots and charts.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">Before We Start:</h4>
          <p className="mt-2 text-gray-700">
            To use Matplotlib, you first need to install it and import it in your code:
          </p>
          <pre className="bg-gray-100 p-2 rounded-md mt-2 text-sm">
            # Install Matplotlib (run this in your terminal or command prompt)
            pip install matplotlib
            
            # Import Matplotlib in your Python code
            import matplotlib.pyplot as plt
          </pre>
          <p className="mt-2 text-gray-700">
            We import Matplotlib's pyplot module as "plt" - this is a standard convention that makes our code shorter and easier to read.
          </p>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">2. Your First Plot: Line Plot</h3>

        <p className="text-gray-800 mt-4 mb-4">
          Let's start with the most basic type of plot: a line plot. Line plots are perfect for showing how values change over time or in a sequence.
        </p>

        <p className="text-gray-800 mt-4 mb-4">
          Before we dive into the code, let's understand the basic components of a Matplotlib plot:
        </p>

        <ul className="list-disc ml-6 text-gray-800 mb-4">
          <li><strong>Figure</strong>: The overall window or page that contains everything</li>
          <li><strong>Axes</strong>: The actual area where data is plotted</li>
          <li><strong>Plot elements</strong>: Lines, markers, text, legends, etc.</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Import matplotlib</span><br/>
            import matplotlib.pyplot as plt<br/><br/>

            <span className="text-green-700"># Create some simple data</span><br/>
            x = [1, 2, 3, 4, 5]  <span className="text-green-700"># X-axis values (horizontal)</span><br/>
            y = [1, 4, 9, 16, 25]  <span className="text-green-700"># Y-axis values (vertical)</span><br/><br/>

            <span className="text-green-700"># Create a figure (think of this as your canvas)</span><br/>
            plt.figure()<br/><br/>

            <span className="text-green-700"># Plot the data as a line</span><br/>
            plt.plot(x, y)<br/><br/>

            <span className="text-green-700"># Add a title to your plot</span><br/>
            plt.title('My First Plot: y = x²')<br/><br/>

            <span className="text-green-700"># Label the axes</span><br/>
            plt.xlabel('X values')<br/>
            plt.ylabel('Y values')<br/><br/>

            <span className="text-green-700"># Display the plot</span><br/>
            plt.show()
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Code Explanation:</h4>
          <ol className="list-decimal ml-5 mt-2 text-gray-700 space-y-2">
            <li><code>import matplotlib.pyplot as plt</code>: We import the pyplot module from Matplotlib and give it the alias "plt".</li>
            <li><code>x = [1, 2, 3, 4, 5]</code> and <code>y = [1, 4, 9, 16, 25]</code>: We create two lists of numbers to plot. The y values are the squares of the x values.</li>
            <li><code>plt.figure()</code>: We create a new figure (canvas) to draw on.</li>
            <li><code>plt.plot(x, y)</code>: This draws a line connecting the points defined by our x and y values.</li>
            <li><code>plt.title('My First Plot: y = x²')</code>: We add a title to our plot.</li>
            <li><code>plt.xlabel('X values')</code> and <code>plt.ylabel('Y values')</code>: We add labels to our axes to explain what the values represent.</li>
            <li><code>plt.show()</code>: This displays the plot we've created.</li>
          </ol>
        </div>

        <p className="text-gray-800 mt-4 mb-4">
          That's it! You've created your first plot. Now let's explore how to customize it and create different types of plots.
        </p>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">3. Customizing Your Line Plot</h3>

        <p className="text-gray-800 mt-4 mb-4">
          A basic plot is good, but a customized plot can convey information much more effectively. Let's see how to add some simple customizations:
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Import matplotlib</span><br/>
            import matplotlib.pyplot as plt<br/><br/>

            <span className="text-green-700"># Create some data</span><br/>
            x = [1, 2, 3, 4, 5]<br/>
            y = [1, 4, 9, 16, 25]<br/><br/>

            <span className="text-green-700"># Create a figure with a specific size (width, height in inches)</span><br/>
            plt.figure(figsize=(8, 5))<br/><br/>

            <span className="text-green-700"># Plot with customizations</span><br/>
            <span className="text-green-700"># 'b-o' means blue line with circle markers</span><br/>
            plt.plot(x, y, 'b-o', linewidth=2, markersize=8, label='y = x²')<br/><br/>

            <span className="text-green-700"># Add a title and labels</span><br/>
            plt.title('Customized Line Plot', fontsize=16)<br/>
            plt.xlabel('X values', fontsize=12)<br/>
            plt.ylabel('Y values', fontsize=12)<br/><br/>

            <span className="text-green-700"># Add a grid to make it easier to read values</span><br/>
            plt.grid(True)<br/><br/>

            <span className="text-green-700"># Add a legend to explain what the line represents</span><br/>
            plt.legend()<br/><br/>

            <span className="text-green-700"># Display the plot</span><br/>
            plt.show()
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">New Customization Options Explained:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><code>figsize=(8, 5)</code>: Sets the figure size to 8 inches wide by 5 inches tall.</li>
            <li><code>'b-o'</code>: A shorthand format string where:
              <ul className="list-disc ml-5 mt-1">
                <li>'b' means blue color</li>
                <li>'-' means solid line</li>
                <li>'o' means circle markers at each data point</li>
              </ul>
            </li>
            <li><code>linewidth=2</code>: Makes the line thicker (default is 1).</li>
            <li><code>markersize=8</code>: Sets the size of the circle markers.</li>
            <li><code>label='y = x²'</code>: Adds a label that will be used in the legend.</li>
            <li><code>plt.grid(True)</code>: Adds a grid to the plot for easier reading of values.</li>
            <li><code>plt.legend()</code>: Displays a legend using the labels we defined in the plot function.</li>
          </ul>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">4. Different Types of Plots</h3>

        <p className="text-gray-800 mt-4 mb-4">
          Matplotlib supports many types of plots. Let's explore some of the most common ones and understand when to use each type:
        </p>

        <h4 className="text-xl text-purple-600 font-semibold mt-6 mb-3">4.1 Scatter Plot</h4>

        <p className="text-gray-800 mt-4 mb-4">
          Scatter plots show the relationship between two variables. Each point represents an individual data point. They're great for identifying correlations, clusters, and outliers.
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Import libraries</span><br/>
            import matplotlib.pyplot as plt<br/>
            import numpy as np  <span className="text-green-700"># For generating random numbers</span><br/><br/>

            <span className="text-green-700"># Create some random data</span><br/>
            <span className="text-green-700"># Set a seed for reproducibility. It ensures same random value upon multiple run</span><br/>
            np.random.seed(42)<br/>
            <span className="text-green-700"># Generate 20 random x and y values</span><br/>
            x = np.random.rand(20) * 10<br/>
            y = np.random.rand(20) * 10<br/><br/>

            <span className="text-green-700"># Create a scatter plot</span><br/>
            plt.figure(figsize=(8, 6))<br/>
            plt.scatter(x, y, color='purple', s=100, alpha=0.7)<br/><br/>

            <span className="text-green-700"># Add labels and title</span><br/>
            plt.title('Simple Scatter Plot', fontsize=14)<br/>
            plt.xlabel('X values', fontsize=12)<br/>
            plt.ylabel('Y values', fontsize=12)<br/><br/>

            <span className="text-green-700"># Add grid</span><br/>
            plt.grid(True, linestyle='--', alpha=0.7)<br/><br/>

            <span className="text-green-700"># Show the plot</span><br/>
            plt.show()
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Scatter Plot Parameters Explained:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><code>np.random.seed(42)</code>: Sets a seed for the random number generator so we get the same "random" numbers each time.</li>
            <li><code>np.random.rand(20) * 10</code>: Generates 20 random numbers between 0 and 10.</li>
            <li><code>plt.scatter(x, y, ...)</code>: Creates a scatter plot with our x and y values.</li>
            <li><code>color='purple'</code>: Sets the color of the points.</li>
            <li><code>s=100</code>: Sets the size of the points (default is much smaller).</li>
            <li><code>alpha=0.7</code>: Sets the transparency of the points (0 is completely transparent, 1 is completely opaque).</li>
            <li><code>linestyle='--'</code>: Makes the grid lines dashed instead of solid.</li>
          </ul>
        </div>

        <h4 className="text-xl text-purple-600 font-semibold mt-6 mb-3">4.2 Bar Plot</h4>

        <p className="text-gray-800 mt-4 mb-4">
          Bar plots are perfect for comparing quantities across different categories. The height of each bar represents the value for that category.
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Import matplotlib</span><br/>
            import matplotlib.pyplot as plt<br/><br/>

            <span className="text-green-700"># Create data for our bar plot</span><br/>
            categories = ['Apples', 'Bananas', 'Oranges', 'Grapes', 'Berries']<br/>
            quantities = [30, 25, 22, 15, 28]<br/><br/>

            <span className="text-green-700"># Create a bar plot</span><br/>
            plt.figure(figsize=(10, 6))<br/>
            plt.bar(categories, quantities, color='skyblue', edgecolor='navy')<br/><br/>

            <span className="text-green-700"># Add title and labels</span><br/>
            plt.title('Fruit Sales Comparison', fontsize=14)<br/>
            plt.xlabel('Fruit Type', fontsize=12)<br/>
            plt.ylabel('Quantity Sold (kg)', fontsize=12)<br/><br/>

            <span className="text-green-700"># Add value labels on top of each bar</span><br/>
            for i, value in enumerate(quantities):<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;plt.text(i, value + 1, str(value), ha='center')<br/><br/>

            <span className="text-green-700"># Show the plot</span><br/>
            plt.show()
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Bar Plot Features Explained:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><code>plt.bar(categories, quantities, ...)</code>: Creates a bar plot with our categories and their corresponding values.</li>
            <li><code>color='skyblue'</code>: Sets the fill color of the bars.</li>
            <li><code>edgecolor='navy'</code>: Sets the color of the bar outlines.</li>
            <li><code>for i, value in enumerate(quantities):</code>: Loops through each value and its index.</li>
            <li><code>plt.text(i, value + 1, str(value), ha='center')</code>: Adds a text label above each bar:
              <ul className="list-disc ml-5 mt-1">
                <li><code>i</code>: The x-position (bar index)</li>
                <li><code>value + 1</code>: The y-position (slightly above the bar)</li>
                <li><code>str(value)</code>: The text to display</li>
                <li><code>ha='center'</code>: Horizontal alignment (centers the text)</li>
              </ul>
            </li>
          </ul>
        </div>

        <h4 className="text-xl text-purple-600 font-semibold mt-6 mb-3">4.3 Histogram</h4>

        <p className="text-gray-800 mt-4 mb-4">
          Histograms show the distribution of a dataset. They group data into bins (ranges) and show how many data points fall into each bin. Histograms are great for understanding the shape, center, and spread of your data.
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Import libraries</span><br/>
            import matplotlib.pyplot as plt<br/>
            import numpy as np<br/><br/>

            <span className="text-green-700"># Generate some random data that follows a normal distribution</span><br/>
            np.random.seed(42)  <span className="text-green-700"># For reproducibility</span><br/>
            data = np.random.normal(170, 10, 250)  <span className="text-green-700"># 250 heights with mean=170cm, std=10cm</span><br/><br/>

            <span className="text-green-700"># Create a histogram</span><br/>
            plt.figure(figsize=(10, 6))<br/>
            plt.hist(data, bins=15, color='green', alpha=0.7, edgecolor='black')<br/><br/>

            <span className="text-green-700"># Add title and labels</span><br/>
            plt.title('Distribution of Heights', fontsize=14)<br/>
            plt.xlabel('Height (cm)', fontsize=12)<br/>
            plt.ylabel('Frequency', fontsize=12)<br/><br/>

            <span className="text-green-700"># Add grid</span><br/>
            plt.grid(True, linestyle='--', alpha=0.7)<br/><br/>

            <span className="text-green-700"># Show the plot</span><br/>
            plt.show()
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Histogram Parameters Explained:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><code>np.random.normal(170, 10, 250)</code>: Generates 250 random numbers from a normal distribution with mean 170 and standard deviation 10.</li>
            <li><code>plt.hist(data, ...)</code>: Creates a histogram from our data.</li>
            <li><code>bins=15</code>: Divides the data into 15 bins (ranges).</li>
            <li><code>color='green'</code>: Sets the fill color of the bars.</li>
            <li><code>alpha=0.7</code>: Sets the transparency of the bars.</li>
            <li><code>edgecolor='black'</code>: Sets the color of the bar outlines.</li>
          </ul>
        </div>

        <h4 className="text-xl text-purple-600 font-semibold mt-6 mb-3">4.4 Box Plot</h4>

        <p className="text-gray-800 mt-4 mb-4">
          Box plots (also called box-and-whisker plots) show the distribution of data based on a five-number summary: minimum, first quartile (Q1), median, third quartile (Q3), and maximum. They're great for comparing distributions and identifying outliers.
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Import libraries</span><br/>
            import matplotlib.pyplot as plt<br/>
            import numpy as np<br/><br/>

            <span className="text-green-700"># Generate three sets of data with different distributions</span><br/>
            np.random.seed(42)<br/>
            data1 = np.random.normal(100, 10, 200)  <span className="text-green-700"># Normal distribution</span><br/>
            data2 = np.random.exponential(10, 200) + 80  <span className="text-green-700"># Exponential distribution</span><br/>
            data3 = np.random.uniform(70, 130, 200)  <span className="text-green-700"># Uniform distribution</span><br/><br/>

            <span className="text-green-700"># Combine data into a list</span><br/>
            data = [data1, data2, data3]<br/><br/>

            <span className="text-green-700"># Create a box plot</span><br/>
            plt.figure(figsize=(10, 6))<br/>
            plt.boxplot(data, labels=['Normal', 'Exponential', 'Uniform'], patch_artist=True)<br/><br/>

            <span className="text-green-700"># Add title and labels</span><br/>
            plt.title('Comparison of Different Distributions', fontsize=14)<br/>
            plt.xlabel('Distribution Type', fontsize=12)<br/>
            plt.ylabel('Values', fontsize=12)<br/><br/>

            <span className="text-green-700"># Add grid</span><br/>
            plt.grid(True, linestyle='--', alpha=0.7)<br/><br/>

            <span className="text-green-700"># Show the plot</span><br/>
            plt.show()
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Box Plot Explained:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><code>plt.boxplot(data, ...)</code>: Creates a box plot from our data.</li>
            <li><code>labels=['Normal', 'Exponential', 'Uniform']</code>: Adds labels for each box.</li>
            <li><code>patch_artist=True</code>: Fills the boxes with color instead of just outlining them.</li>
          </ul>
          <p className="mt-2 text-gray-700">
            The box plot shows:
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li>The box: The interquartile range (IQR) from Q1 (25th percentile) to Q3 (75th percentile)</li>
            <li>The line inside the box: The median (Q2, 50th percentile)</li>
            <li>The whiskers: Typically extend to the most extreme data points within 1.5 * IQR</li>
            <li>Points beyond the whiskers: Potential outliers</li>
          </ul>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">5. Multiple Plots in One Figure</h3>

        <p className="text-gray-800 mt-4 mb-4">
          Often, you'll want to compare different plots side by side. Matplotlib makes this easy with subplots.
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Import libraries</span><br/>
            import matplotlib.pyplot as plt<br/>
            import numpy as np<br/><br/>

            <span className="text-green-700"># Create some data</span><br/>
            x = np.linspace(0, 10, 100)  <span className="text-green-700"># 100 points from 0 to 10</span><br/>
            y1 = np.sin(x)  <span className="text-green-700"># Sine function</span><br/>
            y2 = np.cos(x)  <span className="text-green-700"># Cosine function</span><br/><br/>

            <span className="text-green-700"># Create a figure with 2 subplots (1 row, 2 columns)</span><br/>
            fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))<br/><br/>

            <span className="text-green-700"># First subplot: Sine function</span><br/>
            ax1.plot(x, y1, 'b-', label='sin(x)')<br/>
            ax1.set_title('Sine Function')<br/>
            ax1.set_xlabel('x')<br/>
            ax1.set_ylabel('sin(x)')<br/>
            ax1.grid(True)<br/>
            ax1.legend()<br/><br/>

            <span className="text-green-700"># Second subplot: Cosine function</span><br/>
            ax2.plot(x, y2, 'r-', label='cos(x)')<br/>
            ax2.set_title('Cosine Function')<br/>
            ax2.set_xlabel('x')<br/>
            ax2.set_ylabel('cos(x)')<br/>
            ax2.grid(True)<br/>
            ax2.legend()<br/><br/>

            <span className="text-green-700"># Adjust layout to prevent overlap</span><br/>
            plt.tight_layout()<br/><br/>

            <span className="text-green-700"># Show the figure</span><br/>
            plt.show()
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Subplots Explained:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><code>fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))</code>: Creates a figure with 1 row and 2 columns of subplots, and assigns the axes objects to variables <code>ax1</code> and <code>ax2</code>.</li>
            <li><code>ax1.plot(...)</code>, <code>ax2.plot(...)</code>: Plots data on each subplot.</li>
            <li><code>ax1.set_title(...)</code>, <code>ax1.set_xlabel(...)</code>, etc.: Sets properties for each subplot individually.</li>
            <li><code>plt.tight_layout()</code>: Automatically adjusts the spacing between subplots to prevent overlap.</li>
          </ul>
          <p className="mt-2 text-gray-700">
            This approach gives you more control over each subplot compared to using <code>plt.subplot()</code>.
          </p>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">6. Saving Your Plots</h3>

        <p className="text-gray-800 mt-4 mb-4">
          After creating a beautiful visualization, you'll often want to save it to use in a report, presentation, or website.
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Import libraries</span><br/>
            import matplotlib.pyplot as plt<br/>
            import numpy as np<br/><br/>

            <span className="text-green-700"># Create a simple plot</span><br/>
            x = np.linspace(0, 10, 100)<br/>
            y = np.sin(x)<br/><br/>

            plt.figure(figsize=(8, 6))<br/>
            plt.plot(x, y, 'b-', label='sin(x)')<br/>
            plt.title('Sine Function')<br/>
            plt.xlabel('x')<br/>
            plt.ylabel('sin(x)')<br/>
            plt.grid(True)<br/>
            plt.legend()<br/><br/>

            <span className="text-green-700"># Save the plot in different formats</span><br/>
            <span className="text-green-700"># PNG format (good for web)</span><br/>
            plt.savefig('sine_function.png', dpi=300, bbox_inches='tight')<br/><br/>

            <span className="text-green-700"># PDF format (good for printing)</span><br/>
            plt.savefig('sine_function.pdf', bbox_inches='tight')<br/><br/>

            <span className="text-green-700"># Display the plot</span><br/>
            plt.show()
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Saving Options Explained:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><code>plt.savefig('filename.png', ...)</code>: Saves the current figure to a file.</li>
            <li><code>dpi=300</code>: Sets the resolution (dots per inch) - higher values create larger, more detailed images.</li>
            <li><code>bbox_inches='tight'</code>: Trims extra whitespace around the figure.</li>
          </ul>
          <p className="mt-2 text-gray-700">
            Common file formats:
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>PNG</strong>: Good for web, presentations (supports transparency)</li>
            <li><strong>PDF</strong>: Good for printing, publications (vector format, scales well)</li>
            <li><strong>JPG</strong>: Good for photos, smaller file size (but doesn't support transparency)</li>
            <li><strong>SVG</strong>: Vector format, good for web (scales well, supports interactivity)</li>
          </ul>
        </div>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>🔗 What's Next?</strong><br/><br/>
          Now that you understand the basics of data visualization with Matplotlib, you can create compelling visualizations to explore your data and communicate your findings effectively. As you become more comfortable with these concepts, you can explore more advanced features like 3D plots, animations, and interactive visualizations.
        </p>

        <div id="matplotlib-project" className="miniproject w-full py-5 px-8 rounded-xl mt-5 flex flex-col gap-2 bg-slate-200">
          <h3 className="text-lg font-semibold">Project Section</h3>
          <div className="projectnamequest text-gray-700 mb-5">
            Create a visualization dashboard for a dataset of your choice. Include at least three different types of plots (e.g., line, bar, scatter) and make sure to customize them with appropriate titles, labels, and colors. Try to tell a story with your visualizations!
          </div>
          <button className="gotoproject px-4 py-2 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200">
            Start your visualization project
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Matplotlib
