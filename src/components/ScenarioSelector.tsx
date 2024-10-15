import React from 'react';
import { Scenario } from '../types';

interface ScenarioSelectorProps {
  scenarios: Scenario[];
  currentScenario: Scenario;
  onSelectScenario: (scenario: Scenario) => void;
}

const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({ scenarios, currentScenario, onSelectScenario }) => {
  return (
    <div className="mb-4">
      <label htmlFor="scenario-select" className="block text-sm font-medium text-gray-700 mb-1">
        Select Scenario:
      </label>
      <select
        id="scenario-select"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        value={currentScenario.id}
        onChange={(e) => onSelectScenario(scenarios.find((s) => s.id === e.target.value) || scenarios[0])}
      >
        {scenarios.map((scenario) => (
          <option key={scenario.id} value={scenario.id}>
            {scenario.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ScenarioSelector;