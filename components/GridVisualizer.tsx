'use client';

import { useState, ChangeEvent } from 'react';
import { bfs, dfs, Coord } from '../lib/algorithms';

const START: Coord = [0, 0];

export default function GridVisualizer() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [speed, setSpeed] = useState(300);
  const [walls, setWalls] = useState<Set<string>>(new Set());
  const [visited, setVisited] = useState<Coord[]>([]);
  const [path, setPath] = useState<Coord[]>([]);
  const [running, setRunning] = useState(false);

  const end: Coord = [rows - 1, cols - 1];

  const run = (type: 'bfs' | 'dfs') => {
    const { order, path: resultPath } =
      type === 'bfs'
        ? bfs(rows, cols, START, end, walls)
        : dfs(rows, cols, START, end, walls);
    setVisited([]);
    setPath([]);
    setRunning(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i >= order.length) {
        clearInterval(interval);
        setRunning(false);
        setPath(resultPath);
        return;
      }
      setVisited((prev) => [...prev, order[i]]);
      i++;
    }, speed);
  };

  const addRandomWalls = () => {
    const newWalls = new Set<string>();
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if ((r === START[0] && c === START[1]) || (r === end[0] && c === end[1]))
          continue;
        if (Math.random() < 0.3) newWalls.add(`${r},${c}`);
      }
    }
    setWalls(newWalls);
    setVisited([]);
    setPath([]);
  };

  const isVisited = (r: number, c: number) =>
    visited.some((coord) => coord && coord[0] === r && coord[1] === c);
  const isPath = (r: number, c: number) =>
    path.some((coord) => coord && coord[0] === r && coord[1] === c);
  const isStart = (r: number, c: number) => r === START[0] && c === START[1];
  const isEnd = (r: number, c: number) => r === end[0] && c === end[1];
  const isWall = (r: number, c: number) => walls.has(`${r},${c}`);

  const handleChangeRows = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 1;
    setRows(val);
    setVisited([]);
    setPath([]);
    setWalls(new Set());
  };

  const handleChangeCols = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 1;
    setCols(val);
    setVisited([]);
    setPath([]);
    setWalls(new Set());
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-white p-4 rounded shadow flex flex-wrap items-center gap-2 justify-center">
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
        <label className="flex items-center space-x-1">
          <span className="text-sm">Rows</span>
          <input
            type="number"
            min={2}
            value={rows}
            onChange={handleChangeRows}
            className="w-16 border rounded px-1 py-0.5"
            disabled={running}
          />
        </label>
        <label className="flex items-center space-x-1">
          <span className="text-sm">Cols</span>
          <input
            type="number"
            min={2}
            value={cols}
            onChange={handleChangeCols}
            className="w-16 border rounded px-1 py-0.5"
            disabled={running}
          />
        </label>
        <label className="flex items-center space-x-1">
          <span className="text-sm">Speed</span>
          <select
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="border rounded px-1 py-0.5"
            disabled={running}
          >
            <option value={100}>Fast</option>
            <option value={300}>Medium</option>
            <option value={500}>Slow</option>
          </select>
        </label>
        <button
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
          onClick={addRandomWalls}
          disabled={running}
        >
          Random Walls
        </button>
      </div>

      <div
        className={`grid gap-1 w-fit`}
        style={{ gridTemplateColumns: `repeat(${cols}, 2.5rem)` }}
      >
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((__, c) => (
            <div
              key={`${r}-${c}`}
              className={`h-10 w-10 border ${
                isStart(r, c)
                  ? 'bg-green-300'
                  : isEnd(r, c)
                  ? 'bg-red-300'
                  : isWall(r, c)
                  ? 'bg-gray-500'
                  : isPath(r, c)
                  ? 'bg-blue-300'
                  : isVisited(r, c)
                  ? 'bg-yellow-300'
                  : 'bg-white'
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
}

