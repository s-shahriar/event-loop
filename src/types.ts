export interface Task {
  name: string;
  type: 'sync' | 'async' | 'microtask';
}

export interface Step {
  callStack: Task[];
  callbackQueue: Task[];
  microtaskQueue: Task[];
  currentTask: Task | null;
}

export interface Scenario {
  id: string;
  name: string;
  code: string;
  steps: Step[];
}