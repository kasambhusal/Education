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
        <h2 className="text-2xl font-bold text-purple-900">Introduction to Machine Learning</h2>
        <div className="flex items-center gap-4 mt-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-xl text-sm">
            Difficulty: Beginner-Intermediate
          </span>
          <span className="text-gray-600">⏱️ Estimated Time: 60 min</span>
        </div>
        <p className="text-gray-800 mb-4">
          Learn what machine learning is, how the ML pipeline works, and how to train, evaluate, and improve models.
        </p>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Objectives:</h3>
          <ul className="list-disc pl-5">
            <li>Understand the ML pipeline and its steps</li>
            <li>Learn about features, labels, and data splitting</li>
            <li>Train and evaluate a simple model</li>
            <li>Recognize overfitting and underfitting</li>
            <li>Use train-test split and cross-validation</li>
            <li>Interpret common performance metrics</li>
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="ml-intro p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-3xl text-purple-900 font-bold mb-2">What is Machine Learning?</h2>
        <p className="text-amber-800 text-md mt-10">
          Machine Learning (ML) is a way to teach computers to learn from examples or experience, instead of being explicitly programmed. You give data to an algorithm, and it figures out the rules or patterns by itself!
        </p>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">The ML Pipeline: How Does ML Work?</h3>
        <p className="text-gray-800 mt-4 mb-4">
          The ML process is like a recipe with several steps. Here’s a typical pipeline:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-800">
          <li><b>Collect Data:</b> Gather data relevant to your problem.</li>
          <li><b>Prepare Data:</b> Clean and organize the data (handle missing values, convert text to numbers, etc.).</li>
          <li><b>Choose a Model:</b> Pick an algorithm (e.g., linear regression, decision tree).</li>
          <li><b>Train the Model:</b> Show the model examples (inputs and correct outputs) so it can learn patterns.</li>
          <li><b>Evaluate the Model:</b> Test how well the model works on new, unseen data.</li>
          <li><b>Tune and Improve:</b> Adjust settings or try new algorithms to get better results.</li>
          <li><b>Predict:</b> Use the trained model to make predictions on new data.</li>
        </ol>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">Features and Labels</h3>
        <p className="text-gray-800 mt-4 mb-4">
          In ML, <b>features</b> are the input variables (the data you give to the model), and <b>labels</b> (or targets) are the outputs you want to predict.<br />
          <b>Example:</b> If you want to predict house prices:
        </p>
        <ul className="list-disc ml-5 text-gray-700">
          <li>Features: size of the house, number of bedrooms, location, etc.</li>
          <li>Label: the price of the house</li>
        </ul>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">Model Training and Evaluation</h3>
        <p className="text-gray-800 mt-4 mb-4">
          <b>Training</b> means showing the model lots of examples so it can learn the relationship between features and labels. <b>Evaluation</b> means checking how well the model predicts the labels for new data it hasn't seen before.
        </p>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">Overfitting &amp; Underfitting</h3>
        <p className="text-gray-800 mt-4 mb-4">
          <b>Overfitting</b> happens when a model learns the training data too well, including noise and details that don’t generalize to new data. It’s like memorizing answers to practice questions but failing the real test.<br/>
          <b>Underfitting</b> happens when a model is too simple to capture the underlying pattern in the data. It performs poorly on both training and new data.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <b>How to spot them?</b>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><b>Overfitting:</b> High accuracy on training data, low accuracy on test data.</li>
            <li><b>Underfitting:</b> Low accuracy on both training and test data.</li>
          </ul>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">Train-Test Split and Cross-Validation</h3>
        <p className="text-gray-800 mt-4 mb-4">
          To evaluate a model fairly, we split our data into two parts:
        </p>
        <ul className="list-disc ml-5 text-gray-700">
          <li><b>Training set:</b> Used to teach the model.</li>
          <li><b>Test set:</b> Used to check how well the model performs on new data.</li>
        </ul>
        <p className="text-gray-800 mt-4 mb-4">
          <b>Cross-validation</b> is a technique where the data is split into several parts, and the model is trained and tested on different combinations. This gives a more reliable estimate of how well the model will work on new data.
        </p>
        <p>In train_test_split function, we are dividing our data(X column and y column) into testing and training part. We are not that dumb to test on some data, and train on same data. So, this step is necessary to separate our data. <br/><br/>
        Here, random_state= 42 parameter is used to ensure that the same data gets split into test and train even after multiple run. <br/> test_size = 0.25 means to convert 25% of total data into testing side and remaining into training side. </p>
        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Example: Train-test split with scikit-learn</span><br/>
            import numpy as np<br/>
            from sklearn.model_selection import train_test_split<br/><br/>
            X = np.array([[1], [2], [3], [4], [5], [6], [7], [8]])  <span className="text-green-700"># Features</span><br/>
            y = np.array([10, 20, 30, 40, 50, 60, 70, 80])  <span className="text-green-700"># Labels</span><br/><br/>
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)<br/>
            print("Train features:", X_train)<br/>
            print("Test features:", X_test)<br/>
          </pre>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <b>Why do we split?</b>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li>To check if the model can generalize to new, unseen data.</li>
            <li>To avoid fooling ourselves by testing on the same data we trained on.</li>
          </ul>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">Performance Metrics: Accuracy, Precision, Recall, F1</h3>
        <p className="text-gray-800 mt-4 mb-4">
          After training a model, we need to measure how well it performs. Here are some common metrics:
        </p>
        <ul className="list-disc ml-5 text-gray-700">
          <li><b>Accuracy:</b> The percentage of correct predictions.<br/>
            <span className="text-sm text-gray-600">accuracy = (number of correct predictions) / (total number of predictions)</span>
          </li>
          <li><b>Precision:</b> Of all the items the model predicted as positive, how many were actually positive?</li>
          <li><b>Recall:</b> Of all the actual positive items, how many did the model correctly identify?</li>
          <li><b>F1 Score:</b> The harmonic mean of precision and recall (a balance between the two).</li>
        </ul>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <b>Why use these metrics?</b>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li>Accuracy is simple but can be misleading if the classes are imbalanced (e.g., 95% of emails are not spam).</li>
            <li>Precision and recall help us understand the types of mistakes the model makes.</li>
            <li>F1 score is useful when you need a balance between precision and recall.</li>
          </ul>
        </div>
        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Example: Calculating metrics with scikit-learn</span><br/>
            from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score<br/><br/>
            y_true = [1, 0, 1, 1, 0, 1, 0, 0]  <span className="text-green-700"># Actual labels</span><br/>
            y_pred = [1, 0, 0, 1, 0, 1, 1, 0]  <span className="text-green-700"># Model predictions</span><br/><br/>
            print("Accuracy:", accuracy_score(y_true, y_pred))<br/>
            print("Precision:", precision_score(y_true, y_pred))<br/>
            print("Recall:", recall_score(y_true, y_pred))<br/>
            print("F1 Score:", f1_score(y_true, y_pred))<br/>
          </pre>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">A Simple ML Pipeline Example</h3>
        <p className="text-gray-800 mt-4 mb-4">
          Let's put it all together! We'll train a simple model and evaluate it.<br/>
          Don't get overwhelmed by these new things in the following code block. We are using Linear Regression model, which we will discuss properly in upcoming chapters.<br/><br/>
          model.fit() is used to train our model.<br/>
          model.predict() is used to predict output given some feature.
        </p>
        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            import numpy as np<br/>
            from sklearn.linear_model import LinearRegression<br/>
            from sklearn.model_selection import train_test_split<br/>
            from sklearn.metrics import mean_squared_error<br/><br/>
            X = np.array([[1], [2], [3], [4], [5], [6], [7], [8]])<br/>
            y = np.array([10, 20, 30, 40, 50, 60, 70, 80])<br/><br/>
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)<br/>
            model = LinearRegression()<br/>
            model.fit(X_train, y_train)<br/>
            y_pred = model.predict(X_test)<br/>
            print("Test predictions:", y_pred)<br/>
            print("Test true values:", y_test)<br/>
            print("Mean Squared Error:", mean_squared_error(y_test, y_pred))<br/>
          </pre>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <b>Pipeline Recap:</b>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li>We split the data into training and test sets.</li>
            <li>We train a model on the training data.</li>
            <li>We make predictions on the test data.</li>
            <li>We evaluate the model using a performance metric (mean squared error).</li>
          </ul>
        </div>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>🔗 What's Next?</strong><br/><br/>
          Now you know the basics of the ML pipeline! Next, you'll learn about specific algorithms, how to tune models, and how to use ML for real-world problems.
        </p>

        <div id="intro-ml-project" className="miniproject w-full py-5 px-8 rounded-xl mt-5 flex flex-col gap-2 bg-slate-200">
          <h3 className="text-lg font-semibold">Project Section</h3>
          <div className="projectnamequest text-gray-700 mb-5">
            Try building a simple ML model to predict student grades based on study hours. Use train-test split, train a model, and evaluate it with accuracy or mean squared error!
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
