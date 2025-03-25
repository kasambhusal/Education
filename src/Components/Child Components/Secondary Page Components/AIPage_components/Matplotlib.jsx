import React from 'react'
import { motion } from 'framer-motion'

const Matplotlib = () => {
  return (
    <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="second_topic p-6 bg-white shadow-lg rounded-lg"
>
  <h2 className="text-3xl text-purple-900 font-bold mb-2">Introduction to Matplotlib 📊</h2>  

  <p className="text-amber-800 text-md mt-10">
    <strong>Matplotlib</strong> is a Python library used for <strong>creating visualizations</strong> like line graphs, bar charts, scatter plots, and histograms.  
    If <strong>NumPy</strong> helps with numbers and calculations, <strong>Matplotlib</strong> helps you <strong>see</strong> the data.  
    Visualizing data is crucial in <strong>Machine Learning and AI</strong> because it allows us to understand patterns, trends, and relationships.  
  </p>  

  <p className="text-gray-800 mt-7 text-lg">
    Let’s start by <strong>installing and importing</strong> Matplotlib.
  </p>  

  <div className="bg-gray-100 p-4 rounded-md">
    <pre className="text-sm text-red-700">
      <span className="text-green-700"># Install Matplotlib if you haven't already</span><br/>
      pip install matplotlib
    </pre>
  </div>

  <p className="text-lg mt-6 text-gray-800">
    Now, let’s create a <strong>simple line graph</strong> to visualize some data.
  </p>  

  <div className="bg-gray-100 p-4 rounded-md">
    <pre className="text-sm text-red-700">
      <span className="text-green-700"># Importing Matplotlib</span><br/>
      import matplotlib.pyplot as plt<br/><br/>

      <span className="text-green-700"># Sample data: Days and temperature</span><br/>
      days = ["Mon", "Tue", "Wed", "Thu", "Fri"]<br/>
      temperature = [30, 32, 33, 29, 35]<br/><br/>

      <span className="text-green-700"># Creating the line plot</span><br/>
      plt.plot(days, temperature, color='black')<br/>
      plt.xlabel("Days") <span className="text-green-700"># Label for X-axis</span><br/>
      plt.ylabel("Temperature (°C)") <span className="text-green-700"># Label for Y-axis</span><br/>
      plt.title("Temperature Trend Over a Week") <span className="text-green-700"># Title of the graph</span><br/>
      plt.show() <span className="text-green-700"># Display the plot</span>
    </pre>
  </div>

  <p className="text-lg mt-6 text-green-900">
    <strong>What happens here?</strong>  
    - X-axis will be plotted via the values of days, and y-axis will be plotted with the data values of temperature.  
    - We use <strong>plt.plot()</strong> to draw a line connecting the points, basically to make visual graph line.    
    - <strong>plt.xlabel()</strong> and <strong>plt.ylabel()</strong> add labels to the axes. It means we will get "Days" written in X-axis and "Temperature" written in y-axis.  
    - <strong>plt.title()</strong> gives the graph a title.  
    - <strong>plt.show()</strong> displays the graph.
  </p>

  <p className="text-lg mt-6 text-gray-800">
    <strong>We can use matplotlib to make more than graphical lines. For example:</strong>  <br/>
    - Line Plot (plt.plot()): Simple graphs that we discussed in previous temperature vs days graph  <br/>
    - Bar Chart (plt.bar()): Helps to make bar graphs  <br/>
    - Scatter Plot (plt.scatter()): Instead of creating graphical line, we can simply just plot the data points without connecting them  <br/>
    - Histogram (plt.hist()): This help us to make a visual Histogram graph  
  </p>

  <p className="text-lg mt-6 text-green-900">
    <strong>Why is this important in ML & AI?</strong>  
    - Helps us understand data trends.  
    - Allows us to detect anomalies.  
    - Makes machine learning models easier to interpret.  
  </p>

  <div id="ch-2_miniProject" className="miniproject w-full py-5 px-8 rounded-xl mt-5 flex flex-col gap-2 bg-slate-200">
    <h3 className="text-lg font-semibold">Project Section</h3>
    <div className="projectnamequest text-gray-700 mb-5">
      Try making your own visualization using Matplotlib! Experiment with different charts and datasets.
    </div>
    <button className="gotoproject px-4 py-2 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200">
      Try a simple project
    </button>
  </div>
</motion.div>

  )
}

export default Matplotlib
