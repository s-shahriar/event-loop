import React, { useEffect, useState } from 'react';
import { Scenario, Task, Step } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import CodeSnippet from './CodeSnippet';

interface EventLoopVisualizerProps {
  scenario: Scenario;
  speed: number;
  isPlaying: boolean;
}

const defaultStep: Step = {
  callStack: [],
  callbackQueue: [],
  microtaskQueue: [],
  currentTask: null,
};

const EventLoopVisualizer: React.FC<EventLoopVisualizerProps> = ({ scenario, speed, isPlaying }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [step, setStep] = useState<Step>(defaultStep);

  useEffect(() => {
    setCurrentStep(0);
    setStep(scenario.steps[0] || defaultStep);
  }, [scenario]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          const nextStep = prev + 1;
          if (nextStep < scenario.steps.length) {
            setStep(scenario.steps[nextStep]);
            return nextStep;
          } else {
            return 0;
          }
        });
      }, 2000 / speed);

      return () => clearInterval(interval);
    }
  }, [isPlaying, speed, scenario]);

  const TaskItem: React.FC<{ task: Task }> = ({ task }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`p-2 mb-2 rounded ${
        task.type === 'sync'
          ? 'bg-blue-100 border-blue-300'
          : task.type === 'async'
          ? 'bg-green-100 border-green-300'
          : 'bg-purple-100 border-purple-300'
      } border`}
    >
      {task.name}
    </motion.div>
  );

  return (
    <div className="mt-4">
      <CodeSnippet code={scenario.code} currentTask={step.currentTask} />
      <div className="flex justify-between">
        <div className="w-1/3 px-2">
          <h3 className="text-lg font-semibold mb-2">Call Stack</h3>
          <div className="bg-gray-100 p-2 rounded min-h-[200px]">
            <AnimatePresence>
              {step.callStack.map((task, index) => (
                <TaskItem key={`${task.name}-${index}`} task={task} />
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="w-1/3 px-2">
          <h3 className="text-lg font-semibold mb-2">Callback Queue</h3>
          <div className="bg-gray-100 p-2 rounded min-h-[200px]">
            <AnimatePresence>
              {step.callbackQueue.map((task, index) => (
                <TaskItem key={`${task.name}-${index}`} task={task} />
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="w-1/3 px-2">
          <h3 className="text-lg font-semibold mb-2">Microtask Queue</h3>
          <div className="bg-gray-100 p-2 rounded min-h-[200px]">
            <AnimatePresence>
              {step.microtaskQueue.map((task, index) => (
                <TaskItem key={`${task.name}-${index}`} task={task} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventLoopVisualizer;