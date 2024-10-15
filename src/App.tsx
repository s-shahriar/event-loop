import React, { useState } from 'react';
import EventLoopVisualizer from './components/EventLoopVisualizer';
import ScenarioSelector from './components/ScenarioSelector';
import ControlPanel from './components/ControlPanel';
import { scenarios } from './data/scenarios';

function App() {
  const [currentScenario, setCurrentScenario] = useState(scenarios[0]);
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">JavaScript Event Loop Visualizer</h1>
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
        <ScenarioSelector
          scenarios={scenarios}
          currentScenario={currentScenario}
          onSelectScenario={setCurrentScenario}
        />
        <EventLoopVisualizer
          scenario={currentScenario}
          speed={speed}
          isPlaying={isPlaying}
        />
        <ControlPanel
          speed={speed}
          isPlaying={isPlaying}
          onSpeedChange={setSpeed}
          onPlayPause={() => setIsPlaying(!isPlaying)}
        />
      </div>
    </div>
  );
}

export default App;