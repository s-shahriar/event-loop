import React from 'react';
import { Play, Pause, FastForward, Rewind } from 'lucide-react';

interface ControlPanelProps {
  speed: number;
  isPlaying: boolean;
  onSpeedChange: (speed: number) => void;
  onPlayPause: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ speed, isPlaying, onSpeedChange, onPlayPause }) => {
  return (
    <div className="flex items-center justify-center mt-4">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={onPlayPause}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
        onClick={() => onSpeedChange(Math.max(0.5, speed - 0.5))}
      >
        <Rewind size={24} />
      </button>
      <span className="mx-2">Speed: {speed.toFixed(1)}x</span>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2"
        onClick={() => onSpeedChange(Math.min(3, speed + 0.5))}
      >
        <FastForward size={24} />
      </button>
    </div>
  );
};

export default ControlPanel;