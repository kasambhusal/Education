import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

function GettingStarted({ getStarted }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="getting-started-section bg-slate-200 rounded-xl p-6 mt-8"
    >
      <h2 className="text-2xl font-bold text-purple-900">{getStarted.title}</h2>
      
      <p className="text-gray-800 mb-4">{getStarted.description}</p>
      
      {getStarted.subtopics.map((subtopic) => (
        <div key={subtopic.id} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{subtopic.title}</h3>
          <ReactMarkdown>{subtopic.content}</ReactMarkdown>
          
          {subtopic.codeExamples && subtopic.codeExamples.map((example, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-md font-medium">Code Example:</h4>
              <pre className="bg-gray-100 p-4 rounded-md text-sm text-red-700">
                {example.code}
              </pre>
              {example.output && (
                <>
                  <h4 className="text-md font-medium mt-2">Output:</h4>
                  <pre className="bg-gray-100 p-4 rounded-md text-sm">
                    {example.output}
                  </pre>
                </>
              )}
            </div>
          ))}
          
          {subtopic.additionalContent && (
            <ReactMarkdown>{subtopic.additionalContent}</ReactMarkdown>
          )}
        </div>
      ))}
    </motion.div>
  );
}

export default GettingStarted;
