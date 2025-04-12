import React from 'react'
import { motion } from 'framer-motion'

const Classification = () => {
  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="project-section bg-slate-200 rounded-xl p-6 mt-8"
      >
        <h2 className="text-2xl font-bold text-purple-900">Classification Algorithms</h2>

        <div className="flex items-center gap-4 mt-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Difficulty: Moderate
          </span>
          <span className="text-gray-600">⏱️ Estimated Time: 75 min</span>
        </div>

        <p className="text-gray-800 mb-4">Learn how to predict categories and make decisions with classification algorithms</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Objectives:</h3>
          <ul className="list-disc pl-5">
            <li>Understand what classification is and when to use it</li>
            <li>Learn about different classification algorithms</li>
            <li>Implement and evaluate classification models</li>
            <li>Apply classification to real-world problems</li>
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="classification-intro p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-3xl text-purple-900 font-bold mb-2">Introduction to Classification 🏷️</h2> 

        <p className="text-amber-800 text-md mt-10">
          While regression helps us predict continuous values (like prices or temperatures), classification helps us predict categories or classes. Classification is one of the most common machine learning tasks and has countless real-world applications.
        </p> 

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-md">
          <h4 className="font-bold text-blue-800">What is Classification?</h4>
          <p className="mt-2 text-gray-700">
            Classification is a supervised learning technique where the model learns from labeled data to predict discrete categories. Unlike regression (which predicts continuous values), classification predicts which class or category something belongs to.
          </p>
          <h5 className="font-semibold mt-3 text-blue-700">Real-world Examples:</h5>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>Email spam detection:</strong> Is an email spam or not spam?</li>
            <li><strong>Medical diagnosis:</strong> Does a patient have a disease or not?</li>
            <li><strong>Image recognition:</strong> Is this image a cat, dog, or something else?</li>
            <li><strong>Customer churn prediction:</strong> Will a customer leave or stay?</li>
            <li><strong>Sentiment analysis:</strong> Is a review positive, negative, or neutral?</li>
          </ul>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">Types of Classification Problems</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-bold text-purple-800">Binary Classification</h4>
            <p className="mt-2 text-gray-700">Predicting one of two possible outcomes:</p>
            <ul className="list-disc ml-5 mt-2 text-gray-700">
              <li>Yes/No</li>
              <li>Spam/Not Spam</li>
              <li>Fraudulent/Legitimate</li>
              <li>Sick/Healthy</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-bold text-purple-800">Multi-class Classification</h4>
            <p className="mt-2 text-gray-700">Predicting one of several possible classes:</p>
            <ul className="list-disc ml-5 mt-2 text-gray-700">
              <li>Animal species (cat, dog, bird, etc.)</li>
              <li>Movie genres (action, comedy, drama, etc.)</li>
              <li>Digit recognition (0-9)</li>
              <li>Language detection</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">1. Logistic Regression</h3>

        <p className="text-gray-800 mt-4 mb-4">
          Despite its name, Logistic Regression is actually a classification algorithm, not a regression algorithm! It's often the first classification algorithm data scientists learn.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">When and Why to Use Logistic Regression:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>When:</strong> You need a simple, interpretable model for binary classification</li>
            <li><strong>Why:</strong> It's fast, efficient, and provides probability estimates</li>
            <li><strong>Strengths:</strong> Works well with linearly separable classes, provides probability scores</li>
            <li><strong>Limitations:</strong> Cannot capture complex, non-linear relationships without feature engineering</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">How Logistic Regression Works:</h4>
          <p className="mt-2 text-gray-700">
            Unlike Linear Regression which outputs continuous values, Logistic Regression uses the sigmoid function to transform its output to a probability between 0 and 1. If the probability is greater than 0.5, we classify it as class 1, otherwise as class 0.
          </p>
          <p className="mt-2 text-gray-700">
            The sigmoid function looks like an S-shaped curve that "squeezes" any input value to a range between 0 and 1.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Logistic Regression example for binary classification</span><br />
            import numpy as np<br />
            from sklearn.linear_model import LogisticRegression<br />
            from sklearn.model_selection import train_test_split<br />
            from sklearn.metrics import accuracy_score, classification_report<br />
            import matplotlib.pyplot as plt<br /><br />

            <span className="text-green-700"># Sample data: Student exam results</span><br />
            <span className="text-green-700"># Hours studied and previous GPA</span><br />
            X = np.array([[3, 2.5], [2, 3.0], [1, 2.0], [4, 3.6], [3, 3.0], <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5, 3.8], [1.5, 2.1], [2.8, 2.7], [3.2, 3.2], [4.5, 3.5]])<br />
            <span className="text-green-700"># Pass (1) or Fail (0)</span><br />
            y = np.array([0, 0, 0, 1, 0, 1, 0, 0, 1, 1])<br /><br />

            <span className="text-green-700"># Split data into training and testing sets</span><br />
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)<br /><br />

            <span className="text-green-700"># Create and train the logistic regression model</span><br />
            model = LogisticRegression()<br />
            model.fit(X_train, y_train)<br /><br />

            <span className="text-green-700"># Make predictions on test data</span><br />
            y_pred = model.predict(X_test)<br />
            y_prob = model.predict_proba(X_test)  <span className="text-green-700"># Probability estimates</span><br /><br />

            <span className="text-green-700"># Evaluate the model</span><br />
            accuracy = accuracy_score(y_test, y_pred)<br />
            print(f"Accuracy: &123;accuracy * 100:.2f&125;%")<br />
            print("\nClassification Report:")<br />
            print(classification_report(y_test, y_pred))<br /><br />

            <span className="text-green-700"># Predict for a new student who studied 4 hours and has a 3.2 GPA</span><br />
            new_student = np.array([[4, 3.2]])<br />
            prediction = model.predict(new_student)<br />
            probability = model.predict_proba(new_student)<br />
            print(f"Prediction for new student: &123;'Pass' if prediction[0] == 1 else 'Fail'&125;")<br />
            print(f"Probability of passing: &123;probability[0][1]:.2f&125; or &123;probability[0][1]*100:.2f&125;%")
          </pre>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-green-800">Understanding the Output:</h4>
          <p className="mt-2 text-gray-700">
            The model outputs several important metrics:
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>Accuracy:</strong> The percentage of correct predictions (e.g., 80%)</li>
            <li><strong>Classification Report:</strong> Detailed metrics including precision, recall, and F1-score</li>
            <li><strong>Prediction:</strong> The predicted class (Pass or Fail)</li>
            <li><strong>Probability:</strong> The likelihood of each class (e.g., 75% chance of passing)</li>
          </ul>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">2. K-Nearest Neighbors (KNN)</h3>

        <p className="text-gray-800 mt-4 mb-4">
          KNN is one of the simplest machine learning algorithms, based on the idea that similar things exist close to each other. It classifies a data point based on how its neighbors are classified.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">When and Why to Use KNN:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>When:</strong> You have a small dataset and need a simple, intuitive model</li>
            <li><strong>Why:</strong> It's easy to understand and implement with no assumptions about data</li>
            <li><strong>Strengths:</strong> Works well with multi-class problems and can capture complex decision boundaries</li>
            <li><strong>Limitations:</strong> Computationally expensive with large datasets and sensitive to irrelevant features</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">How KNN Works:</h4>
          <p className="mt-2 text-gray-700">
            1. When making a prediction, KNN finds the K nearest data points (neighbors) to the new data point.
          </p>
          <p className="mt-2 text-gray-700">
            2. It then takes a "vote" among these neighbors - the majority class wins.
          </p>
          <p className="mt-2 text-gray-700">
            3. The value of K is crucial: too small may lead to noise sensitivity, too large may include points from other classes.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># KNN example</span><br />
            import numpy as np<br />
            from sklearn.neighbors import KNeighborsClassifier<br />
            from sklearn.model_selection import train_test_split<br />
            from sklearn.preprocessing import StandardScaler<br />
            from sklearn.metrics import accuracy_score, classification_report<br />
            import matplotlib.pyplot as plt<br /><br />

            <span className="text-green-700"># Sample data: Iris flower dataset (simplified)</span><br />
            <span className="text-green-700"># Features: sepal length and width</span><br />
            X = np.array([[5.1, 3.5], [4.9, 3.0], [4.7, 3.2], [4.6, 3.1], [5.0, 3.6],<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[7.0, 3.2], [6.4, 3.2], [6.9, 3.1], [5.5, 2.3], [6.5, 2.8],<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[6.3, 3.3], [5.8, 2.7], [7.1, 3.0], [6.3, 2.9], [6.5, 3.0]])<br />
            <span className="text-green-700"># Classes: 0=setosa, 1=versicolor, 2=virginica</span><br />
            y = np.array([0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2])<br /><br />

            <span className="text-green-700"># Scale the features (important for KNN)</span><br />
            scaler = StandardScaler()<br />
            X_scaled = scaler.fit_transform(X)<br /><br />

            <span className="text-green-700"># Split data into training and testing sets</span><br />
            X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.3, random_state=42)<br /><br />

            <span className="text-green-700"># Create and train the KNN model with k=3</span><br />
            model = KNeighborsClassifier(n_neighbors=3)<br />
            model.fit(X_train, y_train)<br /><br />

            <span className="text-green-700"># Make predictions on test data</span><br />
            y_pred = model.predict(X_test)<br /><br />

            <span className="text-green-700"># Evaluate the model</span><br />
            accuracy = accuracy_score(y_test, y_pred)<br />
            print(f"Accuracy: &123;accuracy * 100:.2f&125;%")<br />
            print("\nClassification Report:")<br />
            print(classification_report(y_test, y_pred))<br /><br />

            <span className="text-green-700"># Predict for a new flower with sepal length=6.2 and width=2.9</span><br />
            new_flower = np.array([[6.2, 2.9]])<br />
            new_flower_scaled = scaler.transform(new_flower)<br />
            prediction = model.predict(new_flower_scaled)<br />
            flower_types = ["setosa", "versicolor", "virginica"]<br />
            print(f"Prediction for new flower: &123;flower_types[prediction[0]]&125;")
          </pre>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-red-800">Important Note: Feature Scaling</h4>
          <p className="mt-2 text-gray-700">
            Notice that we scaled our features using StandardScaler(). This is crucial for KNN because:
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li>KNN uses distance calculations to find neighbors</li>
            <li>Features with larger scales would dominate the distance calculation</li>
            <li>Scaling ensures all features contribute equally to the distance</li>
            <li>Always scale your features when using KNN!</li>
          </ul>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">3. Decision Trees</h3>

        <p className="text-gray-800 mt-4 mb-4">
          Decision Trees are intuitive models that make decisions based on a series of questions, similar to a flowchart. They're highly interpretable and can handle both numerical and categorical data.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">When and Why to Use Decision Trees:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>When:</strong> You need an interpretable model or have mixed data types</li>
            <li><strong>Why:</strong> They're easy to understand, visualize, and explain to non-technical stakeholders</li>
            <li><strong>Strengths:</strong> Handle both numerical and categorical data, require minimal data preparation</li>
            <li><strong>Limitations:</strong> Prone to overfitting and can be unstable (small changes in data can result in very different trees)</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">How Decision Trees Work:</h4>
          <p className="mt-2 text-gray-700">
            Decision trees work by repeatedly splitting the data based on feature values, creating a tree-like structure of decisions:
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li>Each internal node represents a "test" on a feature (e.g., "Is age &gt; 30?")</li>
            <li>Each branch represents the outcome of the test</li>
            <li>Each leaf node represents a class label or decision</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># Decision Tree example</span><br />
            import numpy as np<br />
            from sklearn.tree import DecisionTreeClassifier, plot_tree<br />
            from sklearn.model_selection import train_test_split<br />
            from sklearn.metrics import accuracy_score, classification_report<br />
            import matplotlib.pyplot as plt<br /><br />

            <span className="text-green-700"># Sample data: Loan approval</span><br />
            <span className="text-green-700"># Features: income (thousands), loan amount (thousands), credit score</span><br />
            X = np.array([[45, 100, 680], [30, 60, 640], [25, 30, 600], [75, 180, 700],<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[40, 70, 650], [35, 40, 660], [80, 150, 720], [60, 100, 690],<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[50, 130, 640], [65, 170, 710], [55, 120, 630], [70, 160, 730]])<br />
            <span className="text-green-700"># Approved (1) or Rejected (0)</span><br />
            y = np.array([1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1])<br /><br />

            <span className="text-green-700"># Split data into training and testing sets</span><br />
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)<br /><br />

            <span className="text-green-700"># Create and train the decision tree (limiting depth to prevent overfitting)</span><br />
            model = DecisionTreeClassifier(max_depth=3, random_state=42)<br />
            model.fit(X_train, y_train)<br /><br />

            <span className="text-green-700"># Make predictions on test data</span><br />
            y_pred = model.predict(X_test)<br /><br />

            <span className="text-green-700"># Evaluate the model</span><br />
            accuracy = accuracy_score(y_test, y_pred)<br />
            print(f"Accuracy: &123;accuracy * 100:.2f&125;%")<br />
            print("\nClassification Report:")<br />
            print(classification_report(y_test, y_pred))<br /><br />

            <span className="text-green-700"># Visualize the decision tree</span><br />
            plt.figure(figsize=(12, 6))<br />
            feature_names = ['Income', 'Loan Amount', 'Credit Score']<br />
            class_names = ['Rejected', 'Approved']<br />
            plot_tree(model, filled=True, feature_names=feature_names, class_names=class_names)<br />
            plt.title('Loan Approval Decision Tree')<br />
            plt.show()<br /><br />

            <span className="text-green-700"># Predict for a new applicant: income=$55k, loan=$120k, credit score=670</span><br />
            new_applicant = np.array([[55, 120, 670]])<br />
            prediction = model.predict(new_applicant)<br />
            print(f"Loan application: &123;'Approved' if prediction[0] == 1 else 'Rejected'&125;")
          </pre>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-green-800">Feature Importance:</h4>
          <p className="mt-2 text-gray-700">
            Decision trees can tell us which features are most important for making predictions:
          </p>
          <pre className="text-sm bg-gray-100 p-2 rounded-md mt-2">
            print("Feature importance:")<br />
            for feature, importance in zip(feature_names, model.feature_importances_):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;print(f"&123;feature&125;: &123;importance:.4f&125;")
          </pre>
          <p className="mt-2 text-gray-700">
            This helps us understand which factors (like income or credit score) most strongly influence loan approval decisions.
          </p>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">4. Support Vector Machines (SVM)</h3>

        <p className="text-gray-800 mt-4 mb-4">
          Support Vector Machines are powerful classifiers that find the optimal boundary (hyperplane) between classes. They're particularly effective in high-dimensional spaces and cases where the number of dimensions exceeds the number of samples.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-yellow-800">When and Why to Use SVM:</h4>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>When:</strong> You have complex classification tasks, especially with high-dimensional data</li>
            <li><strong>Why:</strong> They can handle non-linear boundaries and are effective when classes are separable</li>
            <li><strong>Strengths:</strong> Effective in high-dimensional spaces, memory efficient, versatile through different kernels</li>
            <li><strong>Limitations:</strong> Can be slow to train with large datasets, requires careful parameter tuning</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <h4 className="font-bold text-blue-800">How SVM Works:</h4>
          <p className="mt-2 text-gray-700">
            SVM finds the hyperplane (decision boundary) that maximizes the margin between classes:
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li>The margin is the distance between the hyperplane and the nearest data point from either class</li>
            <li>Data points that define this margin are called "support vectors"</li>
            <li>For non-linearly separable data, SVM uses a "kernel trick" to transform the data into a higher-dimensional space where it becomes linearly separable</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm text-red-700">
            <span className="text-green-700"># SVM example</span><br />
            import numpy as np<br />
            from sklearn.svm import SVC<br />
            from sklearn.model_selection import train_test_split<br />
            from sklearn.preprocessing import StandardScaler<br />
            from sklearn.metrics import accuracy_score, classification_report<br />
            import matplotlib.pyplot as plt<br /><br />

            <span className="text-green-700"># Sample data: Breast cancer diagnosis (simplified)</span><br />
            <span className="text-green-700"># Features: tumor size and texture</span><br />
            X = np.array([[15, 10], [12, 15], [14, 12], [18, 8], [16, 11],<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[22, 25], [25, 22], [20, 28], [24, 24], [23, 21],<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[10, 8], [8, 12], [11, 10], [9, 11], [13, 9]])<br />
            <span className="text-green-700"># Malignant (1) or Benign (0)</span><br />
            y = np.array([0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0])<br /><br />

            <span className="text-green-700"># Scale the features (important for SVM)</span><br />
            scaler = StandardScaler()<br />
            X_scaled = scaler.fit_transform(X)<br /><br />

            <span className="text-green-700"># Split data into training and testing sets</span><br />
            X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.3, random_state=42)<br /><br />

            <span className="text-green-700"># Create and train the SVM model with RBF kernel</span><br />
            model = SVC(kernel='rbf', probability=True)<br />
            model.fit(X_train, y_train)<br /><br />

            <span className="text-green-700"># Make predictions on test data</span><br />
            y_pred = model.predict(X_test)<br />
            y_prob = model.predict_proba(X_test)<br /><br />

            <span className="text-green-700"># Evaluate the model</span><br />
            accuracy = accuracy_score(y_test, y_pred)<br />
            print(f"Accuracy: &123;accuracy * 100:.2f&125;%")<br />
            print("\nClassification Report:")<br />
            print(classification_report(y_test, y_pred))<br /><br />

            <span className="text-green-700"># Predict for a new tumor: size=19, texture=18</span><br />
            new_tumor = np.array([[19, 18]])<br />
            new_tumor_scaled = scaler.transform(new_tumor)<br />
            prediction = model.predict(new_tumor_scaled)<br />
            probability = model.predict_proba(new_tumor_scaled)<br />
            print(f"Diagnosis: &123;'Malignant' if prediction[0] == 1 else 'Benign'&125;")<br />
            print(f"Probability of malignancy: &123;probability[0][1]:.2f&125; or &123;probability[0][1]*100:.2f&125;%")
          </pre>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-6 mb-6 rounded-md">
          <h4 className="font-bold text-red-800">Important: Kernel Selection</h4>
          <p className="mt-2 text-gray-700">
            SVM offers different kernels for different types of data:
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            <li><strong>Linear kernel:</strong> For linearly separable data</li>
            <li><strong>RBF (Radial Basis Function) kernel:</strong> For non-linear data (most commonly used)</li>
            <li><strong>Polynomial kernel:</strong> For data with curved decision boundaries</li>
            <li><strong>Sigmoid kernel:</strong> Similar to neural networks</li>
          </ul>
          <p className="mt-2 text-gray-700">
            Choosing the right kernel and tuning its parameters (like C and gamma) is crucial for SVM performance.
          </p>
        </div>

        <h3 className="text-2xl text-purple-700 font-bold mt-8 mb-4">Evaluating Classification Models</h3>

        <p className="text-gray-800 mt-4 mb-4">
          When evaluating classification models, accuracy alone isn't enough. We need to consider several metrics:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-bold text-purple-800">Accuracy</h4>
            <p className="mt-2 text-gray-700">The proportion of correct predictions among all predictions.</p>
            <p className="mt-2 text-gray-700"><strong>When it's misleading:</strong> With imbalanced classes (e.g., 95% of emails are not spam, so always predicting "not spam" gives 95% accuracy)</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-bold text-purple-800">Precision</h4>
            <p className="mt-2 text-gray-700">Of all instances predicted as positive, how many are actually positive?</p>
            <p className="mt-2 text-gray-700"><strong>Important when:</strong> False positives are costly (e.g., falsely flagging legitimate emails as spam)</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-bold text-purple-800">Recall (Sensitivity)</h4>
            <p className="mt-2 text-gray-700">Of all actual positive instances, how many did we predict correctly?</p>
            <p className="mt-2 text-gray-700"><strong>Important when:</strong> False negatives are costly (e.g., missing a cancer diagnosis)</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-bold text-purple-800">F1-Score</h4>
            <p className="mt-2 text-gray-700">The harmonic mean of precision and recall, providing a balance between the two.</p>
            <p className="mt-2 text-gray-700"><strong>Important when:</strong> You need a balance between precision and recall</p>
          </div>
        </div>

        <p className="text-gray-800 mt-7 text-lg">
          <strong>🔗 What's Next?</strong><br /><br />
          Now that you understand the fundamentals of classification algorithms, we'll explore more advanced topics like ensemble methods (combining multiple models) and neural networks. These techniques can achieve even higher performance on complex tasks!
        </p>

        <div id="classification-project" className="miniproject w-full py-5 px-8 rounded-xl mt-5 flex flex-col gap-2 bg-slate-200">
          <h3 className="text-lg font-semibold">Project Section</h3>
          <div className="projectnamequest text-gray-700 mb-5">
            Build a spam email classifier using multiple algorithms (Logistic Regression, KNN, Decision Tree, and SVM). Compare their performance and determine which works best for this task.
          </div>
          <button className="gotoproject px-4 py-2 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200">
            Start your classification project
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Classification

