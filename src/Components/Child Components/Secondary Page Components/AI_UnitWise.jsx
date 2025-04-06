import React from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

const AI_UnitWise = ({ project }) => {
  if (!project) {
    return <p>Loading .......</p>;
  }

  console.log("Getting started:", project);

  return (
    <div className="flex flex-col">
      {/* Main Project Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="project-section bg-slate-200 rounded-xl p-6 mt-8"
      >
        <h2 className="text-2xl font-bold text-purple-900">{project.title}</h2>

        <div className="flex items-center gap-4 mt-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Difficulty: {project.difficulty}
          </span>
          <span className="text-gray-600">⏱️ Estimated Time: {project.estimatedTime}</span>
        </div>

        <p className="text-gray-800 mb-4">{project.description}</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Objectives:</h3>
          <ul className="list-disc pl-5">
            {(project.objectives || []).map((objective, index) => (
              <li key={index} className="text-gray-700">
                {objective}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Subtopics Section */}
      <div className="content-main-div">
        {project.subtopics && project.subtopics.length > 0 && (
          // <ReactMarkdown>
            <div className="my-6">
              <h3 className="text-xl font-semibold mb-4">Content</h3>
              {project.subtopics.map((subtopic, index) => (
                <div key={index} className="mb-4 text-lg">
                  {/* Subtopic Title */}
                  <h4 className="text-xl font-medium text-purple-700">{subtopic.title}</h4>

                  {/* Subtopic Content */}
                  <ReactMarkdown>{subtopic.content}</ReactMarkdown>

                  {/* Code Examples */}
                  {subtopic.codeExamples &&
                    subtopic.codeExamples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="mt-4 bg-gray-100 p-4 rounded-md">
                        <h5 className="font-medium text-md">Code Example:</h5>
                        <pre className="text-sm text-red-700">{example.code}</pre>
                        {example.output && (
                          <>
                            <h5 className="font-medium text-md mt-2">Output:</h5>
                            <pre className="text-sm bg-gray-200 p-2 rounded-md">{example.output}</pre>
                          </>
                        )}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          // </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default AI_UnitWise;
