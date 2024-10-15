import { Scenario, Task } from '../types';

const createTask = (name: string, type: Task['type']): Task => ({ name, type });

export const scenarios: Scenario[] = [
  {
    id: 'simple-async',
    name: 'Simple Async Operations',
    code: `console.log(1);

setTimeout(() => {
  console.log(2);
}, 1000);

setTimeout(() => {
  console.log(3);
}, 0);

Promise.resolve(1).then(function resolve() {
  setTimeout(() => {
    console.log(4);
  }, 0);
});

console.log(5);`,
    steps: [
      {
        callStack: [createTask('console.log(1)', 'sync')],
        callbackQueue: [],
        microtaskQueue: [],
        currentTask: createTask('console.log(1)', 'sync'),
      },
      {
        callStack: [createTask('setTimeout (1000ms)', 'sync')],
        callbackQueue: [],
        microtaskQueue: [],
        currentTask: createTask('setTimeout (1000ms)', 'sync'),
      },
      {
        callStack: [createTask('setTimeout (0ms)', 'sync')],
        callbackQueue: [createTask('console.log(2)', 'async')],
        microtaskQueue: [],
        currentTask: createTask('setTimeout (0ms)', 'sync'),
      },
      {
        callStack: [createTask('Promise.resolve().then()', 'sync')],
        callbackQueue: [
          createTask('console.log(2)', 'async'),
          createTask('console.log(3)', 'async'),
        ],
        microtaskQueue: [],
        currentTask: createTask('Promise.resolve().then()', 'sync'),
      },
      {
        callStack: [createTask('console.log(5)', 'sync')],
        callbackQueue: [
          createTask('console.log(2)', 'async'),
          createTask('console.log(3)', 'async'),
        ],
        microtaskQueue: [createTask('resolve function', 'microtask')],
        currentTask: createTask('console.log(5)', 'sync'),
      },
      {
        callStack: [createTask('resolve function', 'microtask')],
        callbackQueue: [
          createTask('console.log(2)', 'async'),
          createTask('console.log(3)', 'async'),
        ],
        microtaskQueue: [],
        currentTask: createTask('resolve function', 'microtask'),
      },
      {
        callStack: [createTask('setTimeout (0ms)', 'sync')],
        callbackQueue: [
          createTask('console.log(2)', 'async'),
          createTask('console.log(3)', 'async'),
        ],
        microtaskQueue: [],
        currentTask: createTask('setTimeout (0ms)', 'sync'),
      },
      {
        callStack: [createTask('console.log(3)', 'async')],
        callbackQueue: [
          createTask('console.log(2)', 'async'),
          createTask('console.log(4)', 'async'),
        ],
        microtaskQueue: [],
        currentTask: createTask('console.log(3)', 'async'),
      },
      {
        callStack: [createTask('console.log(2)', 'async')],
        callbackQueue: [createTask('console.log(4)', 'async')],
        microtaskQueue: [],
        currentTask: createTask('console.log(2)', 'async'),
      },
      {
        callStack: [createTask('console.log(4)', 'async')],
        callbackQueue: [],
        microtaskQueue: [],
        currentTask: createTask('console.log(4)', 'async'),
      },
    ],
  },
  // Add other scenarios here with default steps
  {
    id: 'promise-chaining',
    name: 'Promise Chaining and Microtasks',
    code: `console.log('Start');

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
    return Promise.resolve();
  })
  .then(() => {
    console.log('Promise 2');
  });

setTimeout(() => {
  console.log('Timeout');
}, 0);

console.log('End');`,
    steps: [{ callStack: [], callbackQueue: [], microtaskQueue: [], currentTask: null }],
  },
  // ... (keep other scenarios with default steps)
];