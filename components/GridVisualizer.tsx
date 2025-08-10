'use client';

import { useState } from 'react';
import { bfs, dfs, Coord } from '../lib/algorithms';

const SIZE = 5;

export default function GridVisualizer() {
  const [visited, setVisited] = useState<Coord[]>([]);
  const [running, setRunning] = useState(false);

  const run = (type: 'bfs' | 'dfs') => {
    const order = type === 'bfs' ? bfs(SIZE, SIZE, [0, 0]) : dfs(SIZE, SIZE, [0, 0]);
    setVisited([]);
    setRunning(true);
    let i = 0;
    const interval = setInterval(() => {
      setVisited((prev) => [...prev, order[i]]);
      i++;
      if (i >= order.length) {
        clearInterval(interval);
        setRunning(false);
      }
    }, 300);
  };

  const isVisited = (r: number, c: number) =>
    visited.some(([vr, vc]) => vr === r && vc === c);

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() => run('bfs')}
          disabled={running}
        >
          BFS
        </button>
        <button
          className="px-3 py-1 bg-green-500 text-white rounded disabled:opacity-50"
          onClick={() => run('dfs')}
          disabled={running}
        >
          DFS
        </button>
      </div>
      <div className="grid grid-cols-5 gap-1">
        {Array.from({ length: SIZE }).map((_, r) =>
          Array.from({ length: SIZE }).map((__, c) => (
            <div
              key={`${r}-${c}`}
              className={`h-10 w-10 border ${isVisited(r, c) ? 'bg-yellow-300' : 'bg-white'}`}
            />
          ))
        )}
      </div>
    </div>
  );
}
