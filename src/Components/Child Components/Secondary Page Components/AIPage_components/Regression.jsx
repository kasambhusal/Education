import React from 'react'
import { motion } from 'framer-motion'

const Regression = () => {
  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="project-section bg-slate-200 rounded-xl p-6 mt-8"
      >
        <h2 className="text-2xl font-bold text-purple-900">Regression Algorithms</h2>

        <div className="flex items-center gap-4 mt-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Difficulty: Moderate
          </span>
          <span className="text-gray-600">⏱️ Estimated Time: 60 min</span>
        </div>

        <p className="text-gray-800 mb-4">Understanding different regression techniques and when to use each one</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Objectives:</h3>
          <ul className="list-disc pl-5">
            <li>Learn about different regression algorithms</li>
            <li>Understand when and why to use each technique</li>
            <li>Implement and evaluate regression models</li>
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="regression-intro p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-3xl text-purple-900 font-bold mb-2">Beyond Simple Linear Regression 📈</h2>

        <p className="text-amber-800 text-md mt-10">
          In our introduction to Machine Learning, we explored Simple Linear Regression to predict house prices based on a single feature (house size). But real-world problems are rarely that simple. What if we want to consider multiple factors or handle non-linear relationships?
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-md">
          <h4 className="font-bold text-blue-800">Why Do We Need Different Regression Algorithms?</h4>
          <p className="mt-2 text-gray-700">
            Different problems require different approaches. Here's why we need various regression techniques:
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>Multiple features:</strong> Real data often involves many variables (house price depends on size, location, age, etc.)</li>
            <li><strong>Non-linear relationships:</strong> Not all relationships follow a straight line</li>
            <li><strong>Overfitting concerns:</strong> Simple models might work too well on training data but fail on new data</li>
            <li><strong>Computational efficiency:</strong> Some algorithms work better for large datasets</li>
          </ul>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">1. Multiple Linear Regression</h3>

        <p className="text-gray-800 mt-4 mb-4">
          Multiple Linear Regression extends Simple Linear Regression by including multiple features instead of just one.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">When and Why to Use Multiple Linear Regression:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>When:</strong> You have multiple features that influence your target variable</li>
            <li><strong>Why:</strong> It helps understand how different factors collectively affect the outcome</li>
            <li><strong>Example:</strong> Predicting house prices based on size, number of bedrooms, age, and location</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Multiple Linear Regression example</span><br />
            import numpy as np<br />
            from sklearn.linear_model import LinearRegression<br />
            import matplotlib.pyplot as plt<br /><br />

            <span className="text-green-700"># Sample data with multiple features</span><br />
            X = np.array([<br />
            &nbsp;&nbsp;[1000, 1, 10],  <span className="text-green-700"># [size_sqft, bedrooms, house_age]</span><br />
            &nbsp;&nbsp;[1500, 2, 15],<br />
            &nbsp;&nbsp;[2000, 3, 5],<br />
            &nbsp;&nbsp;[2500, 4, 20],<br />
            &nbsp;&nbsp;[3000, 5, 2]<br />
            ])<br />
            y = np.array([200000, 250000, 300000, 350000, 400000])  <span className="text-green-700"># House prices</span><br /><br />

            <span className="text-green-700"># Create and train the model</span><br />
            model = LinearRegression()<br />
            model.fit(X, y)<br /><br />

            <span className="text-green-700"># Make a prediction for a 2200 sq ft house with 3 bedrooms that's 8 years old</span><br />
            new_house = np.array([[2200, 3, 8]])<br />
            predicted_price = model.predict(new_house)<br />
            print("Predicted price: $" + str(round(predicted_price[0], 2)))<br /><br />

            <span className="text-green-700"># Check the coefficients to understand feature importance</span><br />
            print("Coefficients:", model.coef_)<br />
            print("Intercept:", model.intercept_)
          </pre>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-green-800">Understanding the Output:</h4>
          <p className="mt-2 text-gray-700">
            The coefficients tell us how much each feature affects the price:
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li>If the coefficient for size is 100, it means each additional square foot adds $100 to the price</li>
            <li>If the coefficient for bedrooms is 10000, it means each additional bedroom adds $10,000 to the price</li>
            <li>If the coefficient for age is -2000, it means each additional year of age reduces the price by $2,000</li>
          </ul>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">2. Polynomial Regression</h3>

        <p className="text-gray-800 mt-4 mb-4">
          What if the relationship between features and the target isn't linear? Polynomial Regression allows us to model curved relationships.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">When and Why to Use Polynomial Regression:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>When:</strong> Your data shows a curved pattern rather than a straight line</li>
            <li><strong>Why:</strong> It captures non-linear relationships that linear models miss</li>
            <li><strong>Example:</strong> The relationship between a car's speed and fuel consumption (which follows a U-shaped curve)</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Polynomial Regression example</span><br />
            import numpy as np<br />
            from sklearn.preprocessing import PolynomialFeatures<br />
            from sklearn.linear_model import LinearRegression<br />
            import matplotlib.pyplot as plt<br /><br />

            <span className="text-green-700"># Sample data with non-linear relationship</span><br />
            X = np.array([[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]])<br />
            y = np.array([1, 4, 9, 16, 25, 36, 49, 64, 81, 100])  <span className="text-green-700"># y = x²</span><br /><br />

            <span className="text-green-700"># Create polynomial features (transforms X to [1, X, X²])</span><br />
            poly = PolynomialFeatures(degree=2)<br />
            X_poly = poly.fit_transform(X)<br /><br />

            <span className="text-green-700"># Train the model on polynomial features</span><br />
            model = LinearRegression()<br />
            model.fit(X_poly, y)<br /><br />

            <span className="text-green-700"># Predict and visualize</span><br />
            X_range = np.arange(0, 11, 0.1).reshape(-1, 1)<br />
            X_range_poly = poly.transform(X_range)<br />
            y_pred = model.predict(X_range_poly)<br /><br />

            plt.scatter(X, y, color='blue', label='Actual data')<br />
            plt.plot(X_range, y_pred, color='red', label='Polynomial regression')<br />
            plt.xlabel('X')<br />
            plt.ylabel('Y')<br />
            plt.legend()<br />
            plt.title('Polynomial Regression')<br />
            plt.show()
          </pre>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-red-800">Warning: Beware of Overfitting!</h4>
          <p className="mt-2 text-gray-700">
            While polynomial regression can capture complex patterns, using too high a degree can lead to overfitting:
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li>A model that fits training data perfectly but fails on new data</li>
            <li>Higher-degree polynomials (like degree=15) often overfit</li>
            <li>Always validate your model on test data to check for overfitting</li>
          </ul>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">3. Regularized Regression</h3>

        <p className="text-gray-800 mt-4 mb-4">
          To prevent overfitting, we can use regularization techniques that penalize overly complex models.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">When and Why to Use Regularized Regression:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>When:</strong> You have many features or are concerned about overfitting</li>
            <li><strong>Why:</strong> It helps create simpler models that generalize better to new data</li>
            <li><strong>Common types:</strong> Ridge Regression (L2), Lasso Regression (L1), and Elastic Net</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">Choosing Between Regularization Methods:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>Ridge (L2):</strong> Use when you have many features that all contribute somewhat</li>
            <li><strong>Lasso (L1):</strong> Use when you want to automatically select important features (it can zero out unimportant features)</li>
            <li><strong>Elastic Net:</strong> Use when you want a balance between Ridge and Lasso</li>
          </ul>
        </div>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>🔗 What's Next?</strong><br /><br />
          Now that you understand various regression techniques, we'll move on to classification algorithms, which help us predict categories rather than continuous values. You'll learn how to classify emails as spam/not spam, predict customer churn, and much more!
        </p>

        <div id="regression-project" className="miniproject w-full py-5 px-8 rounded-xl mt-5 flex flex-col gap-2 bg-slate-200">
          <h3 className="text-lg font-semibold">Project Section</h3>
          <div className="projectnamequest text-gray-700 mb-5">
            Compare different regression models (Linear, Polynomial, Ridge, Lasso) on a real dataset to predict car prices based on multiple features. Which model performs best and why?
          </div>
          <button className="gotoproject px-4 py-2 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200">
            Start your regression project
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Regression
