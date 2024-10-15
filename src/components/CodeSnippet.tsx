import React from 'react';
import { Task } from '../types';

interface CodeSnippetProps {
  code: string;
  currentTask: Task | null;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, currentTask }) => {
  const lines = code.split('\n');

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg mb-4 overflow-x-auto">
      <pre className="font-mono text-sm">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`${
              currentTask && line.includes(currentTask.name)
                ? 'bg-yellow-500 bg-opacity-30'
                : ''
            }`}
          >
            <span className="mr-2 text-gray-500">{index + 1}</span>
            {line}
          </div>
        ))}
      </pre>
    </div>
  );
};

export default CodeSnippet;