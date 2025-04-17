import React from 'react'
import { motion } from 'framer-motion'

const EnsembleLearning = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="project-section bg-zinc-50 border-2 border-green-600 shadow-2xl rounded-xl py-6 px-4"
      >
        <h2 className="text-2xl font-bold text-purple-900">Ensemble Learning</h2>
        <div className="flex items-center gap-4 mt-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-xl text-sm">
            Difficulty: Moderate
          </span>
          <span className="text-gray-600">⏱️ Estimated Time: 90 min</span>
        </div>
        <p className="text-gray-800 mb-4">
          Learn how combining multiple models can improve predictions and reduce errors.
        </p>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Objectives:</h3>
          <ul className="list-disc pl-5">
            <li>Understand what ensemble learning is and why it's useful</li>
            <li>Learn about different ensemble methods (Bagging, Boosting, Stacking)</li>
            <li>Implement Random Forest and Gradient Boosting models</li>
            <li>Apply ensemble techniques to real-world problems</li>
          </ul>
        </div>
      </motion.div>

      {/* Introduction to Ensemble Learning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="ensemble-intro p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-3xl text-purple-900 font-bold mb-2">What is Ensemble Learning? 🌟</h2>
        <p className="text-amber-800 text-md mt-10">
          Ensemble learning is a machine learning technique that combines predictions from multiple models to improve accuracy and robustness. Instead of relying on a single algorithm, ensemble methods aggregate the results of several models to make better decisions.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-md">
          <h4 className="font-bold text-blue-800">Why Use Ensemble Learning?</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>Improved Accuracy:</strong> Combining models often leads to better predictions.</li>
            <li><strong>Reduced Overfitting:</strong> Ensemble methods like bagging help reduce overfitting.</li>
            <li><strong>Robustness:</strong> Aggregating predictions makes the model less sensitive to noise.</li>
            <li><strong>Flexibility:</strong> Works well with both regression and classification tasks.</li>
          </ul>
        </div>

        {/* Types of Ensemble Methods */}
        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">Types of Ensemble Methods</h3>
        <ol className="list-decimal list-inside space-y-4 text-gray-800">
          <li>
            <strong>Bagging (Bootstrap Aggregating):</strong> Combines predictions from multiple models trained on different subsets of data.
            <br /><span className="text-gray-600">Example: Random Forest</span>
          </li>
          <li>
            <strong>Boosting:</strong> Sequentially trains models, focusing on correcting errors made by previous ones.
            <br /><span className="text-gray-600">Examples: Gradient Boosting, AdaBoost, XGBoost</span>
          </li>
          <li>
            <strong>Stacking:</strong> Combines predictions from multiple models using another model (meta-model) to make final predictions.
          </li>
        </ol>

        {/* Bagging Section */}
        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">1. Bagging: Random Forest 🌳</h3>
        <p className="text-gray-800 mt-4 mb-4">
          Random Forest is one of the most popular ensemble methods based on bagging. It builds multiple decision trees and averages their predictions to improve accuracy and reduce overfitting.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">New Concepts in the Code Below:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><b>RandomForestClassifier:</b> A model that builds many decision trees and combines their results.</li>
            <li><b>train_test_split:</b> A function to split your data into training and testing sets.</li>
            <li><b>fit():</b> Trains the model on your data.</li>
            <li><b>predict():</b> Uses the trained model to make predictions on new data.</li>
            <li><b>accuracy_score:</b> Measures how many predictions were correct.</li>
          </ul>
        </div>
        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Import necessary libraries</span><br />
            import numpy as np<br />
            from sklearn.ensemble import RandomForestClassifier<br />
            from sklearn.model_selection import train_test_split<br />
            from sklearn.metrics import accuracy_score<br /><br />

            <span className="text-green-700"># Create sample data</span><br />
            X = np.array([[5.1, 3.5], [4.9, 3.0], [4.7, 3.2], [6.3, 3.3], [7.0, 3.2]])<br />
            y = np.array([0, 0, 0, 1, 1])<br /><br />

            <span className="text-green-700"># Split data into training and testing sets</span><br />
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)<br /><br />

            <span className="text-green-700"># Create and train the Random Forest model</span><br />
            model = RandomForestClassifier(n_estimators=100)<br />
            model.fit(X_train, y_train)<br /><br />

            <span className="text-green-700"># Make predictions</span><br />
            y_pred = model.predict(X_test)<br /><br />

            <span className="text-green-700"># Evaluate the model</span><br />
            print("Accuracy:", accuracy_score(y_test, y_pred))
          </pre>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Code Explanation:</h4>
          <ol className="list-decimal ml-5 mt-2 text-gray-700 space-y-2">
            <li><b>import numpy as np</b>: Imports NumPy, a library for handling arrays and numerical data.</li>
            <li><b>from sklearn.ensemble import RandomForestClassifier</b>: Imports the Random Forest model from scikit-learn.</li>
            <li><b>from sklearn.model_selection import train_test_split</b>: Imports a function to split data into training and testing sets.</li>
            <li><b>from sklearn.metrics import accuracy_score</b>: Imports a function to measure model accuracy.</li>
            <li><b>X = np.array(...)</b>: Creates a NumPy array for features (inputs).</li>
            <li><b>y = np.array(...)</b>: Creates a NumPy array for labels (outputs).</li>
            <li><b>X_train, X_test, y_train, y_test = train_test_split(...)</b>: Splits data into training and testing sets (70% train, 30% test).</li>
            <li><b>model = RandomForestClassifier(n_estimators=100)</b>: Creates a Random Forest with 100 trees.</li>
            <li><b>model.fit(X_train, y_train)</b>: Trains the model on the training data.</li>
            <li><b>y_pred = model.predict(X_test)</b>: Predicts labels for the test data.</li>
            <li><b>accuracy_score(y_test, y_pred)</b>: Calculates the percentage of correct predictions.</li>
          </ol>
        </div>

        {/* Boosting Section */}
        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">2. Boosting: Gradient Boosting, AdaBoost, XGBoost 🚀</h3>
        <p className="text-gray-800 mt-4 mb-4">
          Boosting is another powerful ensemble technique. Unlike bagging, boosting trains models sequentially, each new model focusing on the mistakes of the previous ones. The final prediction is a weighted combination of all models.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">New Concepts in the Code Below:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><b>GradientBoostingClassifier:</b> A model that builds trees one after another, each learning from the errors of the previous.</li>
            <li><b>XGBoost:</b> An advanced, very fast boosting algorithm (you need to install the <b>xgboost</b> library).</li>
            <li><b>n_estimators:</b> The number of trees to build.</li>
          </ul>
        </div>
        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Gradient Boosting example</span><br />
            import numpy as np<br />
            from sklearn.ensemble import GradientBoostingClassifier<br />
            from sklearn.model_selection import train_test_split<br />
            from sklearn.metrics import accuracy_score<br /><br />
            X = np.array([[5.1, 3.5], [4.9, 3.0], [4.7, 3.2], [6.3, 3.3], [7.0, 3.2]])<br />
            y = np.array([0, 0, 0, 1, 1])<br /><br />
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)<br /><br />
            model = GradientBoostingClassifier(n_estimators=100)<br />
            model.fit(X_train, y_train)<br />
            y_pred = model.predict(X_test)<br />
            print("Accuracy:", accuracy_score(y_test, y_pred))
          </pre>
        </div>
        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto mt-4">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># XGBoost example (requires xgboost library)</span><br />
            import numpy as np<br />
            import xgboost as xgb<br />
            from sklearn.model_selection import train_test_split<br />
            from sklearn.metrics import accuracy_score<br /><br />
            X = np.array([[5.1, 3.5], [4.9, 3.0], [4.7, 3.2], [6.3, 3.3], [7.0, 3.2]])<br />
            y = np.array([0, 0, 0, 1, 1])<br /><br />
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)<br /><br />
            model = xgb.XGBClassifier(n_estimators=100)<br />
            model.fit(X_train, y_train)<br />
            y_pred = model.predict(X_test)<br />
            print("Accuracy:", accuracy_score(y_test, y_pred))
          </pre>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Code Explanation:</h4>
          <ol className="list-decimal ml-5 mt-2 text-gray-700 space-y-2">
            <li><b>from sklearn.ensemble import GradientBoostingClassifier</b>: Imports the Gradient Boosting model.</li>
            <li><b>import xgboost as xgb</b>: Imports the XGBoost library (must be installed separately).</li>
            <li><b>model = GradientBoostingClassifier(n_estimators=100)</b>: Creates a Gradient Boosting model with 100 trees.</li>
            <li><b>model = xgb.XGBClassifier(n_estimators=100)</b>: Creates an XGBoost model with 100 trees.</li>
            <li>All other steps are the same as in the Random Forest example.</li>
          </ol>
        </div>

        {/* Stacking Section */}
        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">3. Stacking: Combining Multiple Models 🏗️</h3>
        <p className="text-gray-800 mt-4 mb-4">
          Stacking is an ensemble technique that combines predictions from several different models (like logistic regression, decision trees, and SVMs) using another model (called a meta-model) to make the final prediction. This allows you to leverage the strengths of different algorithms.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">New Concepts in the Code Below:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><b>StackingClassifier:</b> A model that combines several base models and a meta-model.</li>
            <li><b>estimators:</b> A list of base models to combine.</li>
            <li><b>final_estimator:</b> The meta-model that learns how to best combine the base models' predictions.</li>
          </ul>
        </div>
        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Stacking example (using sklearn's StackingClassifier)</span><br />
            import numpy as np<br />
            from sklearn.ensemble import StackingClassifier<br />
            from sklearn.linear_model import LogisticRegression<br />
            from sklearn.tree import DecisionTreeClassifier<br />
            from sklearn.svm import SVC<br />
            from sklearn.model_selection import train_test_split<br />
            from sklearn.metrics import accuracy_score<br /><br />
            X = np.array([[5.1, 3.5], [4.9, 3.0], [4.7, 3.2], [6.3, 3.3], [7.0, 3.2]])<br />
            y = np.array([0, 0, 0, 1, 1])<br /><br />
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)<br /><br />
            estimators = [<br />
            &nbsp;&nbsp;('lr', LogisticRegression()),<br />
            &nbsp;&nbsp;('dt', DecisionTreeClassifier()),<br />
            &nbsp;&nbsp;('svc', SVC(probability=True))<br />
            ]<br />
            model = StackingClassifier(estimators=estimators, final_estimator=LogisticRegression())<br />
            model.fit(X_train, y_train)<br />
            y_pred = model.predict(X_test)<br />
            print("Accuracy:", accuracy_score(y_test, y_pred))
          </pre>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Code Explanation:</h4>
          <ol className="list-decimal ml-5 mt-2 text-gray-700 space-y-2">
            <li><b>from sklearn.ensemble import StackingClassifier</b>: Imports the stacking model.</li>
            <li><b>estimators = [...]:</b> Creates a list of base models (logistic regression, decision tree, SVM).</li>
            <li><b>final_estimator=LogisticRegression()</b>: The meta-model that combines the base models' predictions.</li>
            <li>All other steps are the same as before.</li>
          </ol>
        </div>

        {/* Practical Example Section */}
        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">Practical Example: Comparing Random Forest and Gradient Boosting</h3>
        <p className="text-gray-800 mt-4 mb-4">
          Let's see how Random Forest (bagging) and Gradient Boosting (boosting) perform on the same dataset. Try changing the data or parameters and see how the results change!
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">New Concepts in the Code Below:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><b>RandomForestClassifier</b> and <b>GradientBoostingClassifier</b> are both ensemble models, but they use different strategies (bagging vs. boosting).</li>
            <li>We train both models on the same data and compare their accuracy.</li>
          </ul>
        </div>
        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            import numpy as np<br />
            from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier<br />
            from sklearn.model_selection import train_test_split<br />
            from sklearn.metrics import accuracy_score<br /><br />
            X = np.array([[5.1, 3.5], [4.9, 3.0], [4.7, 3.2], [6.3, 3.3], [7.0, 3.2], [5.5, 2.3], [6.5, 2.8]])<br />
            y = np.array([0, 0, 0, 1, 1, 0, 1])<br /><br />
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)<br /><br />
            rf = RandomForestClassifier(n_estimators=100)<br />
            rf.fit(X_train, y_train)<br />
            rf_pred = rf.predict(X_test)<br />
            print("Random Forest Accuracy:", accuracy_score(y_test, rf_pred))<br /><br />
            gb = GradientBoostingClassifier(n_estimators=100)<br />
            gb.fit(X_train, y_train)<br />
            gb_pred = gb.predict(X_test)<br />
            print("Gradient Boosting Accuracy:", accuracy_score(y_test, gb_pred))
          </pre>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">Code Explanation:</h4>
          <ol className="list-decimal ml-5 mt-2 text-gray-700 space-y-2">
            <li>We import both RandomForestClassifier and GradientBoostingClassifier.</li>
            <li>We train both models on the same data.</li>
            <li>We compare their accuracy to see which performs better on this dataset.</li>
          </ol>
        </div>

        {/* Project Section */}
        <div id="ensemble-project" className="miniproject w-full py-5 px-8 rounded-xl mt-5 flex flex-col gap-2 bg-slate-200">
          <h3 className="text-lg font-semibold">Project Section</h3>
          <div className="projectnamequest text-gray-700 mb-5">
            Try building an ensemble model to classify flowers using the Iris dataset. Compare the performance of Random Forest, Gradient Boosting, and Stacking. Which one works best and why?
          </div>
          <button className="gotoproject px-4 py-2 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200">
            Start your ensemble project
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default EnsembleLearning
