import React from 'react'
import { motion } from 'framer-motion'

const Regression = () => {
  return (
    <div className="flex flex-col gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="project-section bg-zinc-50 border-2 border-green-600 shadow-2xl rounded-xl py-6 px-4"
      >
        <h2 className="text-2xl font-bold text-purple-900">Regression Techniques in Machine Learning</h2>

        <div className="flex items-center gap-4 mt-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-xl text-sm">
            Difficulty: Intermediate
          </span>
          <span className="text-gray-600">⏱️ Estimated Time: 75 min</span>
        </div>

        <p className="text-gray-800 mb-4">
          Learn about regression algorithms, cost functions, and how to improve your predictive models.
        </p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Objectives:</h3>
          <ul className="list-disc pl-5">
            <li>Understand supervised learning and regression</li>
            <li>Master Linear Regression and its implementation</li>
            <li>Learn about cost functions and gradient descent optimization</li>
            <li>Evaluate models using R² score</li>
            <li>Explore Polynomial Regression for non-linear relationships</li>
            <li>Understand regularization with Ridge and Lasso Regression</li>
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="regression-intro p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-3xl text-purple-900 font-bold mb-2">Supervised Learning: Teaching with Examples 📚</h2>

        <p className="text-amber-800 text-md mt-10">
          Supervised learning is like learning with a teacher. Imagine you're learning to identify fruits - your teacher shows you an apple and says "This is an apple," then shows you a banana and says "This is a banana." After seeing many examples, you learn to recognize these fruits on your own. That's supervised learning!
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-md">
          <h4 className="font-bold text-blue-800">Key Characteristics of Supervised Learning:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>Labeled Data:</strong> The algorithm learns from data where the correct answers (labels) are provided</li>
            <li><strong>Input-Output Pairs:</strong> Training consists of input features and their corresponding target values</li>
            <li><strong>Goal:</strong> Learn a mapping function that can predict the output for new, unseen inputs</li>
            <li><strong>Feedback Loop:</strong> The algorithm compares its predictions with the correct answers and adjusts itself</li>
          </ul>
        </div>

        <p className="text-gray-800 mt-4 mb-4">
          Supervised learning has two main categories:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-bold text-purple-800">Classification</h4>
            <p className="mt-2 text-gray-700">Predicts discrete categories or classes.</p>
            <p className="mt-2 text-gray-700"><strong>Examples:</strong></p>
            <ul className="list-disc ml-5 mt-1 text-gray-700">
              <li>Email spam detection (spam/not spam)</li>
              <li>Disease diagnosis (positive/negative)</li>
              <li>Handwritten digit recognition (0-9)</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-bold text-purple-800">Regression</h4>
            <p className="mt-2 text-gray-700">Predicts continuous numerical values.</p>
            <p className="mt-2 text-gray-700"><strong>Examples:</strong></p>
            <ul className="list-disc ml-5 mt-1 text-gray-700">
              <li>House price prediction</li>
              <li>Temperature forecasting</li>
              <li>Salary estimation based on experience</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">What is Regression?</h3>

        <p className="text-gray-800 mt-4 mb-4">
          Regression is a supervised learning technique used to predict continuous values. It helps us understand the relationship between independent variables (features) and a dependent variable (target). The goal is to find the best-fitting line or curve that minimizes the difference between predicted and actual values.
        </p>

        <p className="text-gray-800 mt-4 mb-4">
          Think of regression as drawing a line through scattered points that best represents their overall trend. This line then helps us make predictions for new data points.
        </p>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">1. Linear Regression: The Foundation</h3>

        <p className="text-gray-800 mt-4 mb-4">
          Linear Regression is the simplest and most widely used regression algorithm. It assumes a linear relationship between the input features and the target variable. The goal is to find a line that best fits the data points.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">The Linear Regression Equation:</h4>
          <p className="mt-2 text-gray-700">
            For a single feature (simple linear regression):
          </p>
          <p className="mt-2 text-gray-700 font-mono">
            y = w*x + b
          </p>
          <p className="mt-2 text-gray-700">
            Where:
          </p>
          <ul className="list-disc ml-5 mt-1 text-gray-700">
            <li><strong>y</strong> is the predicted value</li>
            <li><strong>x</strong> is the feature value</li>
            <li><strong>w</strong> is the weight (or slope)</li>
            <li><strong>b</strong> is the bias (or y-intercept)</li>
          </ul>
          <p className="mt-2 text-gray-700">
            For multiple features (multiple linear regression):
          </p>
          <p className="mt-2 text-gray-700 font-mono">
            y = w₁x₁ + w₂x₂ + ... + wₙxₙ + b
          </p>
        </div>

        <p className="text-gray-800 mt-4 mb-4">
          Let's implement a simple linear regression model using scikit-learn:
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Import necessary libraries</span><br/>
            import numpy as np<br/>
            import matplotlib.pyplot as plt<br/>
            from sklearn.linear_model import LinearRegression<br/>
            from sklearn.model_selection import train_test_split<br/><br/>

            <span className="text-green-700"># Create some sample data</span><br/>
            np.random.seed(42)  <span className="text-green-700"># For reproducibility<br/>
            # We are creating synthetic dataset(x and y). X becomes a column vector, basically a series.<br/>
            # We are trying to mimic y=mx+c equation for y with some extra unwanted stuff by adding np.random(100,1) because in real life, things are not perfectly linear.</span><br/>
            X = 2 * np.random.rand(100, 1)  <span className="text-green-700"># Generate array of 100 rows and 1 column between 0 and 2(since we multiply it by 2 infront, it's range changed from 0 to 1 to 0 to 2)</span><br/>
            y = 4 + 3 * X + np.random.randn(100, 1)  <span className="text-green-700"># y = 4 + 3x + noise</span><br/><br/>

            <span className="text-green-700"># Split the data into training and testing sets</span><br/>
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)<br/><br/>

            <span className="text-green-700"># Create and train the model</span><br/>
            model = LinearRegression()<br/>
            model.fit(X_train, y_train)<br/><br/>

            <span className="text-green-700"># Get the model parameters</span><br/>
            print(f"Weight (slope): {'{'} model.coef_[0][0]:.4f {'}'}")<br/>
            print(f"Bias (intercept): {'{'} model.intercept_[0]:.4f {'}'}")<br/><br/>

            <span className="text-green-700"># Make predictions</span><br/>
            y_pred = model.predict(X_test)<br/><br/>

            <span className="text-green-700"># Visualize the results</span><br/>
            plt.figure(figsize=(10, 6))<br/>
            plt.scatter(X_test, y_test, color='blue', label='Actual data')<br/>
            plt.plot(X_test, y_pred, color='red', linewidth=2, label='Predicted line')<br/>
            plt.xlabel('X')<br/>
            plt.ylabel('y')<br/>
            plt.title('Linear Regression')<br/>
            plt.legend()<br/>
            plt.show()
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Code Explanation:</h4>
          <ol className="list-decimal ml-5 mt-2 text-gray-700 space-y-2">
            <li><code>np.random.seed(42)</code>: Sets a seed for reproducible results.</li>
            <li><code>X = 2 * np.random.rand(100, 1)</code>: Creates 100 random x values between 0 and 2.</li>
            <li><code>y = 4 + 3 * X + np.random.randn(100, 1)</code>: Creates y values following a linear pattern (y = 4 + 3x) with some random noise added.</li>
            <li><code>train_test_split(X, y, test_size=0.2, random_state=42)</code>: Splits the data into 80% training and 20% testing sets.</li>
            <li><code>model = LinearRegression()</code>: Creates a linear regression model.</li>
            <li><code>model.fit(X_train, y_train)</code>: Trains the model on the training data.</li>
            <li><code>model.coef_</code> and <code>model.intercept_</code>: These are the learned parameters (weight and bias).</li>
            <li><code>model.predict(X_test)</code>: Uses the trained model to make predictions on the test data.</li>
            <li>The visualization code plots the actual test data points and the predicted regression line.</li>
          </ol>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">2. Cost Function & Gradient Descent</h3>

        <p className="text-gray-800 mt-4 mb-4">
          How does the model learn the best values for the weight and bias? This is where the cost function and gradient descent come in.
        </p>

        <h4 className="text-xl text-purple-600 font-semibold mt-6 mb-3">Cost Function</h4>

        <p className="text-gray-800 mt-4 mb-4">
          A cost function measures how well our model is performing. For linear regression, we typically use the Mean Squared Error (MSE) as the cost function. It calculates the average squared difference between the predicted values and the actual values.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">Mean Squared Error (MSE):</h4>
          <p className="mt-2 text-gray-700 font-mono">
            MSE = (1/m) * Σ(y_pred - y_actual)²
          </p>
          <p className="mt-2 text-gray-700">
            Where:
          </p>
          <ul className="list-disc ml-5 mt-1 text-gray-700">
            <li><strong>m</strong> is the number of samples</li>
            <li><strong>y_pred</strong> is the predicted value</li>
            <li><strong>y_actual</strong> is the actual value</li>
          </ul>
          <p className="mt-2 text-gray-700">
            The goal is to find the values of w and b that minimize this cost function.
          </p>
        </div>

        <h4 className="text-xl text-purple-600 font-semibold mt-6 mb-3">Gradient Descent</h4>

        <p className="text-gray-800 mt-4 mb-4">
          Gradient Descent is an optimization algorithm used to minimize the cost function. It works by iteratively adjusting the model parameters (weights and bias) in the direction that reduces the cost the most.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">How Gradient Descent Works:</h4>
          <ol className="list-decimal ml-5 mt-2 text-gray-700 space-y-1">
            <li>Start with random values for the parameters (w and b).</li>
            <li>Calculate the gradient (slope) of the cost function with respect to each parameter.</li>
            <li>Update each parameter by moving in the opposite direction of the gradient.</li>
            <li>Repeat until the cost function converges to a minimum.</li>
          </ol>
          <p className="mt-2 text-gray-700">
            The update rules are:
          </p>
          <p className="mt-2 text-gray-700 font-mono">
            w = w - α * ∂J/∂w<br/>
            b = b - α * ∂J/∂b
          </p>
          <p className="mt-2 text-gray-700">
            Where:
          </p>
          <ul className="list-disc ml-5 mt-1 text-gray-700">
            <li><strong>α</strong> is the learning rate (how big of a step to take)</li>
            <li><strong>∂J/∂w</strong> is the partial derivative of the cost function with respect to w</li>
            <li><strong>∂J/∂b</strong> is the partial derivative of the cost function with respect to b</li>
          </ul>
        </div>

        <p className="text-gray-800 mt-4 mb-4">
          Let's implement gradient descent for linear regression from scratch:
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Implementing gradient descent for linear regression</span><br/>
            import numpy as np<br/>
            import matplotlib.pyplot as plt<br/><br/>

            <span className="text-green-700"># Create some sample data</span><br/>
            np.random.seed(42)<br/>
            X = 2 * np.random.rand(100, 1)<br/>
            y = 4 + 3 * X + np.random.randn(100, 1)<br/><br/>

            <span className="text-green-700"># Add a bias term (x0 = 1) to X</span><br/>
            X_b = np.c_[np.ones((100, 1)), X]  <span className="text-green-700"># Add x0 = 1 to each instance</span><br/><br/>

            <span className="text-green-700"># Initialize parameters</span><br/>
            theta = np.random.randn(2, 1)  <span className="text-green-700"># Random initialization</span><br/>
            learning_rate = 0.1<br/>
            n_iterations = 1000<br/><br/>

            <span className="text-green-700"># Gradient descent</span><br/>
            m = len(X_b)<br/>
            for iteration in range(n_iterations):<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-700"># Compute predictions</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;y_pred = X_b.dot(theta)<br/><br/>
            
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-700"># Compute error</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;error = y_pred - y<br/><br/>
            
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-700"># Compute gradients</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;gradients = (2/m) * X_b.T.dot(error)<br/><br/>
            
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-700"># Update parameters</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;theta = theta - learning_rate * gradients<br/><br/>

            <span className="text-green-700"># Print final parameters</span><br/>
            print(f"Bias (theta_0): {'{'}theta[0][0]:.4f{'}'}")<br/>
            print(f"Weight (theta_1): {'{'}theta[1][0]:.4f{'}'}")<br/><br/>

            <span className="text-green-700"># Make predictions</span><br/>
            X_new = np.array([[0], [2]])  <span className="text-green-700"># Min and max values</span><br/>
            X_new_b = np.c_[np.ones((2, 1)), X_new]  <span className="text-green-700"># Add x0 = 1 to each instance</span><br/>
            y_pred = X_new_b.dot(theta)<br/><br/>

            <span className="text-green-700"># Plot the results</span><br/>
            plt.figure(figsize=(10, 6))<br/>
            plt.scatter(X, y, color='blue', label='Actual data')<br/>
            plt.plot(X_new, y_pred, 'r-', linewidth=2, label='Predicted line')<br/>
            plt.xlabel('X')<br/>
            plt.ylabel('y')<br/>
            plt.title('Linear Regression with Gradient Descent')<br/>
            plt.legend()<br/>
            plt.show()
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Gradient Descent Code Explanation:</h4>
          <ol className="list-decimal ml-5 mt-2 text-gray-700 space-y-2">
            <li><code>X_b = np.c_[np.ones((100, 1)), X]</code>: Adds a column of ones to X to represent the bias term. This allows us to treat the bias as another weight.</li>
            <li><code>theta = np.random.randn(2, 1)</code>: Initializes the parameters randomly. theta[0] is the bias, and theta[1] is the weight.</li>
            <li><code>y_pred = X_b.dot(theta)</code>: Computes the predictions using the current parameters.</li>
            <li><code>error = y_pred - y</code>: Calculates the error between predictions and actual values.</li>
            <li><code>gradients = (2/m) * X_b.T.dot(error)</code>: Computes the gradients of the cost function with respect to the parameters. This is the derivative of the MSE.</li>
            <li><code>theta = theta - learning_rate * gradients</code>: Updates the parameters using the gradient descent rule.</li>
            <li>After training, we use the learned parameters to make predictions on new data points and visualize the regression line.</li>
          </ol>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">3. R² Score: Evaluating Regression Models</h3>

        <p className="text-gray-800 mt-4 mb-4">
          The R² score (coefficient of determination) is a statistical measure that represents the proportion of the variance in the dependent variable that is predictable from the independent variables. It's a way to evaluate how well your regression model fits the data.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">R² Score Formula:</h4>
          <p className="mt-2 text-gray-700 font-mono">
            R² = 1 - (SSres / SStot)
          </p>
          <p className="mt-2 text-gray-700">
            Where:
          </p>
          <ul className="list-disc ml-5 mt-1 text-gray-700">
            <li><strong>SSres</strong> is the sum of squared residuals (Σ(y_actual - y_pred)²)</li>
            <li><strong>SStot</strong> is the total sum of squares (Σ(y_actual - y_mean)²)</li>
          </ul>
          <p className="mt-2 text-gray-700">
            R² ranges from 0 to 1, where:
          </p>
          <ul className="list-disc ml-5 mt-1 text-gray-700">
            <li><strong>R² = 1</strong>: The model explains all the variability in the data (perfect fit)</li>
            <li><strong>R² = 0</strong>: The model doesn't explain any of the variability</li>
            <li><strong>R² &lt; 0</strong>: The model is worse than a horizontal line (the mean)</li>
          </ul>
        </div>

        <p className="text-gray-800 mt-4 mb-4">
          Let's calculate the R² score for our linear regression model:
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Calculating R² score</span><br/>
            from sklearn.metrics import r2_score<br/><br/>

            <span className="text-green-700"># Using the previous model and predictions</span><br/>
            r2 = r2_score(y_test, y_pred)<br/>
            print(f"R² Score: {'{'}r2:.4f{'}'}")<br/><br/>

            <span className="text-green-700"># Alternatively, you can use the model's score method</span><br/>
            r2_alt = model.score(X_test, y_test)<br/>
            print(f"R² Score (alternative): {'{'}r2_alt:.4f{'}'}")
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Interpreting R² Score:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li>An R² of 0.8 means that 80% of the variance in the target variable is explained by the features.</li>
            <li>Higher R² values indicate a better fit, but be cautious of overfitting when R² is very close to 1.</li>
            <li>R² should be used alongside other metrics like Mean Absolute Error (MAE) or Root Mean Squared Error (RMSE) for a comprehensive evaluation.</li>
          </ul>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">4. Polynomial Regression: Handling Non-Linear Relationships</h3>

        <p className="text-gray-800 mt-4 mb-4">
          Linear regression works well when the relationship between features and the target is linear. But what if the relationship is more complex? Polynomial regression extends linear regression by adding polynomial terms to the features.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">Polynomial Regression Equation:</h4>
          <p className="mt-2 text-gray-700 font-mono">
            y = b + w₁x + w₂x² + w₃x³ + ... + wₙxⁿ
          </p>
          <p className="mt-2 text-gray-700">
            This is still a linear regression model, but with transformed features (x, x², x³, etc.).
          </p>
        </div>

        <p className="text-gray-800 mt-4 mb-4">
          Let's implement polynomial regression using scikit-learn:
        </p>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Polynomial Regression</span><br/>
            import numpy as np<br/>
            import matplotlib.pyplot as plt<br/>
            from sklearn.preprocessing import PolynomialFeatures<br/>
            from sklearn.linear_model import LinearRegression<br/>
            from sklearn.pipeline import Pipeline<br/><br/>

            <span className="text-green-700"># Create some non-linear data</span><br/>
            np.random.seed(42)<br/>
            X = 6 * np.random.rand(100, 1) - 3  <span className="text-green-700"># Values between -3 and 3</span><br/>
            y = 0.5 * X**2 + X + 2 + np.random.randn(100, 1)  <span className="text-green-700"># Quadratic function with noise</span><br/><br/>

            <span className="text-green-700"># Create a pipeline with polynomial features and linear regression</span><br/>
            polynomial_regression = Pipeline([<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;("poly_features", PolynomialFeatures(degree=2, include_bias=True)),<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;("lin_reg", LinearRegression())<br/>
            ])<br/><br/>

            <span className="text-green-700"># Train the model</span><br/>
            polynomial_regression.fit(X, y)<br/><br/>

            <span className="text-green-700"># Get the linear regression model from the pipeline</span><br/>
            lin_reg = polynomial_regression.named_steps["lin_reg"]<br/>
            print(f"Coefficients: {'{'}lin_reg.coef_{'{'}")<br/>
            print(f"Intercept: {'{'}lin_reg.intercept_{'{'}")<br/><br/>

            <span className="text-green-700"># Generate points for plotting the curve</span><br/>
            X_new = np.linspace(-3, 3, 100).reshape(-1, 1)<br/>
            y_pred = polynomial_regression.predict(X_new)<br/><br/>

            <span className="text-green-700"># Plot the results</span><br/>
            plt.figure(figsize=(10, 6))<br/>
            plt.scatter(X, y, color='blue', label='Actual data')<br/>
            plt.plot(X_new, y_pred, color='red', linewidth=2, label='Polynomial regression')<br/>
            plt.xlabel('X')<br/>
            plt.ylabel('y')<br/>
            plt.title('Polynomial Regression (degree=2)')<br/>
            plt.legend()<br/>
            plt.show()
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Polynomial Regression Code Explanation:</h4>
          <ol className="list-decimal ml-5 mt-2 text-gray-700 space-y-2">
            <li><code>y = 0.5 * X**2 + X + 2 + np.random.randn(100, 1)</code>: Creates data following a quadratic pattern (y = 0.5x² + x + 2) with some random noise.</li>
            <li><code>PolynomialFeatures(degree=2, include_bias=True)</code>: Transforms the features by adding polynomial terms up to degree 2. For a single feature x, it creates [1, x, x²].</li>
            <li><code>Pipeline([...])</code>: Creates a pipeline that first transforms the features and then applies linear regression.</li>
            <li><code>polynomial_regression.fit(X, y)</code>: Trains the model on the data.</li>
            <li><code>lin_reg = polynomial_regression.named_steps["lin_reg"]</code>: Extracts the linear regression model from the pipeline to access its coefficients.</li>
            <li><code>X_new = np.linspace(-3, 3, 100).reshape(-1, 1)</code>: Creates 100 evenly spaced points between -3 and 3 for plotting the curve.</li>
            <li><code>y_pred = polynomial_regression.predict(X_new)</code>: Makes predictions for these points.</li>
          </ol>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">Choosing the Right Polynomial Degree:</h4>
          <p className="mt-2 text-gray-700">
            The degree of the polynomial is a hyperparameter that you need to choose carefully:
          </p>
          <ul className="list-disc ml-5 mt-1 text-gray-700">
            <li><strong>Too low</strong>: The model might underfit (not capture the true pattern).</li>
            <li><strong>Too high</strong>: The model might overfit (capture noise instead of the true pattern).</li>
          </ul>
          <p className="mt-2 text-gray-700">
            You can use techniques like cross-validation to find the optimal degree.
          </p>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">5. Ridge & Lasso Regression: Preventing Overfitting</h3>

        <p className="text-gray-800 mt-4 mb-4">
          When working with many features or polynomial terms, linear regression can overfit the training data. Ridge and Lasso regression are regularization techniques that prevent overfitting by penalizing large coefficients.
        </p>

        <h4 className="text-xl text-purple-600 font-semibold mt-6 mb-3">Ridge Regression (L2 Regularization)</h4>

        <p className="text-gray-800 mt-4 mb-4">
          Ridge regression adds a penalty term proportional to the square of the magnitude of coefficients.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">Ridge Regression Cost Function:</h4>
          <p className="mt-2 text-gray-700 font-mono">
            J(w) = MSE(w) + α * Σ(w_j²)
          </p>
          <p className="mt-2 text-gray-700">
            Where:
          </p>
          <ul className="list-disc ml-5 mt-1 text-gray-700">
            <li><strong>MSE(w)</strong> is the mean squared error</li>
            <li><strong>α</strong> is the regularization parameter (controls the amount of regularization)</li>
            <li><strong>Σ(w_j²)</strong> is the sum of squared weights (excluding the bias term)</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Ridge Regression</span><br/>
            from sklearn.linear_model import Ridge<br/>
            from sklearn.preprocessing import StandardScaler<br/>
            from sklearn.pipeline import Pipeline<br/><br/>

            <span className="text-green-700"># Create a more complex dataset with multiple features</span><br/>
            np.random.seed(42)<br/>
            X = 2 * np.random.rand(100, 5)  <span className="text-green-700"># 5 features</span><br/>
            y = 4 + np.sum(X, axis=1) + np.random.randn(100)  <span className="text-green-700"># y depends on sum of features</span><br/><br/>

            <span className="text-green-700"># Split the data</span><br/>
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)<br/><br/>

            <span className="text-green-700"># Create a pipeline with scaling and Ridge regression</span><br/>
            ridge_reg = Pipeline([<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;("scaler", StandardScaler()),<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;("ridge", Ridge(alpha=1.0))<br/>
            ])<br/><br/>

            <span className="text-green-700"># Train the model</span><br/>
            ridge_reg.fit(X_train, y_train)<br/><br/>

            <span className="text-green-700"># Evaluate the model</span><br/>
            ridge_score = ridge_reg.score(X_test, y_test)<br/>
            print(f"Ridge R² Score: {'{'}ridge_score:.4f{'}'}")<br/><br/>

            <span className="text-green-700"># For comparison, train a standard linear regression model</span><br/>
            lin_reg = Pipeline([<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;("scaler", StandardScaler()),<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;("lin_reg", LinearRegression())<br/>
            ])<br/>
            lin_reg.fit(X_train, y_train)<br/>
            lin_score = lin_reg.score(X_test, y_test)<br/>
            print(f"Linear Regression R² Score: {'{'}lin_score:.4f{'}'}")
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Ridge Regression Code Explanation:</h4>
          <ol className="list-decimal ml-5 mt-2 text-gray-700 space-y-2">
            <li><code>X = 2 * np.random.rand(100, 5)</code>: Creates a dataset with 5 features.</li>
            <li><code>y = 4 + np.sum(X, axis=1) + np.random.randn(100)</code>: Creates a target variable that depends on the sum of all features plus some noise.</li>
            <li><code>StandardScaler()</code>: Standardizes the features by removing the mean and scaling to unit variance. This is important for regularization.</li>
            <li><code>Ridge(alpha=1.0)</code>: Creates a Ridge regression model with a regularization parameter of 1.0.</li>
            <li><code>Pipeline([...])</code>: Creates a pipeline that first scales the features and then applies Ridge regression.</li>
            <li>We compare the performance of Ridge regression with standard linear regression using the R² score.</li>
          </ol>
        </div>

        <h4 className="text-xl text-purple-600 font-semibold mt-6 mb-3">Lasso Regression (L1 Regularization)</h4>

        <p className="text-gray-800 mt-4 mb-4">
          Lasso regression adds a penalty term proportional to the absolute value of coefficients. This can lead to some coefficients becoming exactly zero, effectively performing feature selection.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">Lasso Regression Cost Function:</h4>
          <p className="mt-2 text-gray-700 font-mono">
            J(w) = MSE(w) + α * Σ|w_j|
          </p>
          <p className="mt-2 text-gray-700">
            Where:
          </p>
          <ul className="list-disc ml-5 mt-1 text-gray-700">
            <li><strong>MSE(w)</strong> is the mean squared error</li>
            <li><strong>α</strong> is the regularization parameter</li>
            <li><strong>Σ|w_j|</strong> is the sum of absolute weights (excluding the bias term)</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Lasso Regression</span><br/>
            from sklearn.linear_model import Lasso<br/><br/>

            <span className="text-green-700"># Create a pipeline with scaling and Lasso regression</span><br/>
            lasso_reg = Pipeline([<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;("scaler", StandardScaler()),<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;("lasso", Lasso(alpha=0.1))<br/>
            ])<br/><br/>

            <span className="text-green-700"># Train the model</span><br/>
            lasso_reg.fit(X_train, y_train)<br/><br/>

            <span className="text-green-700"># Evaluate the model</span><br/>
            lasso_score = lasso_reg.score(X_test, y_test)<br/>
            print(f"Lasso R² Score: {'{'}lasso_score:.4f{'}'}")<br/><br/>

            <span className="text-green-700"># Get the Lasso model from the pipeline</span><br/>
            lasso = lasso_reg.named_steps["lasso"]<br/><br/>

            <span className="text-green-700"># Print the coefficients</span><br/>
            print("Lasso Coefficients:")<br/>
            for i, coef in enumerate(lasso.coef_):<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;print(f"Feature {'{'}i+1{'}'}: {'{'}coef:.4f{'}'}")<br/><br/>

            <span className="text-green-700"># Compare with Ridge coefficients</span><br/>
            ridge = ridge_reg.named_steps["ridge"]<br/>
            print("\nRidge Coefficients:")<br/>
            for i, coef in enumerate(ridge.coef_):<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;print(f"Feature {'{'}i+1{'}'}: {'{'}coef:.4f{'}'}")
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Lasso Regression Code Explanation:</h4>
          <ol className="list-decimal ml-5 mt-2 text-gray-700 space-y-2">
            <li><code>Lasso(alpha=0.1)</code>: Creates a Lasso regression model with a regularization parameter of 0.1.</li>
            <li><code>lasso = lasso_reg.named_steps["lasso"]</code>: Extracts the Lasso model from the pipeline to access its coefficients.</li>
            <li><code>lasso.coef_</code>: These are the learned coefficients. Some might be exactly zero due to the L1 penalty.</li>
            <li>We compare the coefficients of Lasso and Ridge to see the difference in their regularization effects.</li>
          </ol>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">Ridge vs. Lasso: When to Use Each?</h4>
          <p className="mt-2 text-gray-700">
            <strong>Use Ridge when:</strong>
          </p>
          <ul className="list-disc ml-5 mt-1 text-gray-700">
            <li>You have many small/medium effects</li>
            <li>Most features are likely relevant</li>
            <li>There is high multicollinearity (features are correlated)</li>
          </ul>
          <p className="mt-2 text-gray-700">
            <strong>Use Lasso when:</strong>
          </p>
          <ul className="list-disc ml-5 mt-1 text-gray-700">
            <li>You want to perform feature selection (get a simpler model)</li>
            <li>You suspect only a few features are important</li>
            <li>You want some coefficients to be exactly zero</li>
          </ul>
          <p className="mt-2 text-gray-700">
            <strong>Consider Elastic Net (a combination of Ridge and Lasso) when:</strong>
          </p>
          <ul className="list-disc ml-5 mt-1 text-gray-700">
            <li>You're not sure which one to use</li>
            <li>You want the benefits of both methods</li>
          </ul>
        </div>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>🔗 What's Next?</strong><br/><br/>
          Now that you understand various regression techniques, you can apply them to real-world problems. The next steps would be to explore more advanced topics like:
        </p>
        <ul className="list-disc ml-6 text-gray-800">
          <li>Feature engineering and selection</li>
          <li>Cross-validation for model evaluation</li>
          <li>Hyperparameter tuning</li>
          <li>More complex models like decision trees and ensemble methods</li>
        </ul>

        <div id="regression-project" className="miniproject w-full py-5 px-8 rounded-xl mt-5 flex flex-col gap-2 bg-slate-200">
          <h3 className="text-lg font-semibold">Project Section</h3>
          <div className="projectnamequest text-gray-700 mb-5">
            Build a regression model to predict house prices using a real dataset (like the Boston Housing dataset). Compare the performance of Linear Regression, Polynomial Regression, Ridge, and Lasso. Which model works best and why?
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
