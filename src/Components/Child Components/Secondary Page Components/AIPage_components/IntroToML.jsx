import React from 'react'
import { motion } from 'framer-motion'

const IntroToML = () => {
  return (
    <div className="flex flex-col gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
       className="project-section bg-zinc-50 border-2 border-green-600 shadow-2xl rounded-xl py-6 px-4"
      >
        <h2 className="text-2xl font-bold text-purple-900">ML Basics</h2>

        <div className="flex items-center gap-4 mt-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-xl text-sm">
            Difficulty: Moderate
          </span>
          <span className="text-gray-600">⏱️ Estimated Time: 60 min</span>
        </div>

        <p className="text-gray-800 mb-4">Everything you need to know to start ML</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Objectives:</h3>
          <ul className="list-disc pl-5">
            - Introduction to Machine Learning and understanding it's working <br></br>
            - How to train a basic model and make predictions
          </ul>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="ml-intro p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-3xl text-purple-900 font-bold mb-2">Introduction to Machine Learning 🤖</h2>

        <p className="text-amber-800 text-md mt-10">
          Now that you've learned how to handle data with pandas and visualize it with matplotlib, let's dive into the exciting world of Machine Learning (ML)! ML is all about teaching computers to learn from data and make predictions or decisions without being explicitly programmed.
        </p>

        <p className="text-gray-800 mt-7 text-lg">
          Imagine you want to predict house prices. Instead of writing complex rules, you can feed historical house data to an ML model, and it will learn patterns to predict prices for new houses!
        </p>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">Types of Machine Learning</h3>

        <ol className="list-decimal list-inside space-y-4 text-gray-800">
          <li>
            <strong>Supervised Learning:</strong> We provide labeled data (input and expected output).
            Examples: Classification (spam detection) and Regression (price prediction).
          </li>
          <li>
            <strong>Unsupervised Learning:</strong> We provide data without labels. The model finds patterns on its own.
            Examples: Clustering (customer segmentation) and Dimensionality Reduction.
          </li>
          <li>
            <strong>Reinforcement Learning:</strong> The model learns by interacting with an environment, receiving rewards or penalties.
            Examples: Game playing AI, robotics.
          </li>
        </ol>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">A Simple ML Example: Linear Regression</h3>

        <p className="text-gray-800 mt-4 mb-4">
          Let's use scikit-learn, a popular ML library, to predict house prices based on their size. But first, let's understand what we'll be doing:
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">New Concepts You'll See:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>scikit-learn:</strong> A Python library that provides simple tools for data analysis and machine learning.</li>
            <li><strong>LinearRegression:</strong> A model that finds the best straight line to fit your data points.</li>
            <li><strong>model.fit():</strong> This is how we "train" the model using our data.</li>
            <li><strong>model.predict():</strong> After training, we use this to make predictions on new data.</li>
            <li><strong>Numpy arrays:</strong> We'll store our data in arrays for efficient processing.</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Import necessary libraries</span><br />
            import numpy as np<br />
            from sklearn.linear_model import LinearRegression<br />
            import matplotlib.pyplot as plt<br /><br />

            <span className="text-green-700"># Create sample data</span><br />
            X = np.array([[1000], [1500], [2000], [2500], [3000]])  <span className="text-green-700"># House sizes in sq ft</span><br />
            y = np.array([200000, 250000, 300000, 350000, 400000])  <span className="text-green-700"># House prices</span><br /><br />

            <span className="text-green-700"># Create and train the model</span><br />
            model = LinearRegression()<br />
            model.fit(X, y)<br /><br />

            <span className="text-green-700"># Make a prediction</span><br />
            new_house_size = np.array([[2200]])<br />
            predicted_price = model.predict(new_house_size)<br />
            print("Predicted price for a 2200 sq ft house: $" + str(round(predicted_price[0], 2)))<br /><br />

            <span className="text-green-700"># Visualize the results</span><br />
            plt.scatter(X, y, color='blue', label='Actual data')<br />
            plt.plot(X, model.predict(X), color='red', label='Regression line')<br />
            plt.scatter(new_house_size, predicted_price, color='green', marker='*', s=200, label='Prediction')<br />
            plt.xlabel('House Size (sq ft)')<br />
            plt.ylabel('Price ($)')<br />
            plt.legend()<br />
            plt.title('House Price Prediction')<br />
            plt.show()
          </pre>
        </div>

        <p className="text-lg mt-6 text-green-900">
          Output: Predicted price for a 2200 sq ft house: $320000.00
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Code Explanation:</h4>
          <ol className="list-decimal ml-5 mt-2 text-gray-700 space-y-2">
            <li>We first import the necessary libraries for our machine learning task.</li>
            <li>We create two arrays: X (house sizes) and y (house prices) to represent our training data.</li>
            <li>We create a LinearRegression model and train it using the .fit() method with our data.</li>
            <li>We use the trained model to predict the price of a house that's 2200 sq ft.</li>
            <li>Finally, we visualize our data points, the regression line, and our prediction using matplotlib.</li>
          </ol>
        </div>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>What's happening behind the scenes?</strong> The model is finding the best straight line that fits our data points. This line represents the relationship between house size and price. Once it finds this line, it can predict the price for any house size by finding the corresponding point on the line.
        </p>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>🔗 What's Next?</strong><br /><br />
          We'll dive deeper into various ML algorithms, learn how to prepare data for ML models, and explore more complex scenarios. Get ready to unlock the power of data! 🚀
        </p>

        <div id="intro-ml-project" className="miniproject w-full py-5 px-8 rounded-xl mt-5 flex flex-col gap-2 bg-slate-200">
          <h3 className="text-lg font-semibold">Project Section</h3>
          <div className="projectnamequest text-gray-700 mb-5">
            Try creating a simple ML model to predict student grades based on study hours. Use the concepts you've learned about pandas, matplotlib, and scikit-learn!
          </div>
          <button className="gotoproject px-4 py-2 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200">
            Start your ML project
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default IntroToML
