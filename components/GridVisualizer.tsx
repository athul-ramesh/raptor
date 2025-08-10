'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { bfs, dfs, Coord } from '../lib/algorithms';

export default function GridVisualizer() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [start, setStart] = useState<Coord>([0, 0]);
  const [end, setEnd] = useState<Coord>([rows - 1, cols - 1]);
  const [speed, setSpeed] = useState(300);
  const [walls, setWalls] = useState<Set<string>>(new Set());
  const [visited, setVisited] = useState<Coord[]>([]);
  const [path, setPath] = useState<Coord[]>([]);
  const [running, setRunning] = useState(false);
  const [placing, setPlacing] = useState<'start' | 'end' | null>(null);

  useEffect(() => {
    setEnd([rows - 1, cols - 1]);
  }, [rows, cols]);

  const run = (type: 'bfs' | 'dfs') => {
    const { order, path: resultPath } =
      type === 'bfs'
        ? bfs(rows, cols, start, end, walls)
        : dfs(rows, cols, start, end, walls);
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
        if ((r === start[0] && c === start[1]) || (r === end[0] && c === end[1]))
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
  const isStart = (r: number, c: number) => r === start[0] && c === start[1];
  const isEnd = (r: number, c: number) => r === end[0] && c === end[1];
  const isWall = (r: number, c: number) => walls.has(`${r},${c}`);

  const handleCellClick = (r: number, c: number) => {
    if (running) return;
    const key = `${r},${c}`;
    if (placing === 'start') {
      if (!isEnd(r, c)) {
        setStart([r, c]);
        setWalls((prev) => {
          const nw = new Set(prev);
          nw.delete(key);
          return nw;
        });
      }
      setPlacing(null);
    } else if (placing === 'end') {
      if (!isStart(r, c)) {
        setEnd([r, c]);
        setWalls((prev) => {
          const nw = new Set(prev);
          nw.delete(key);
          return nw;
        });
      }
      setPlacing(null);
    } else {
      if (isStart(r, c) || isEnd(r, c)) return;
      setWalls((prev) => {
        const nw = new Set(prev);
        if (nw.has(key)) nw.delete(key);
        else nw.add(key);
        return nw;
      });
    }
    setVisited([]);
    setPath([]);
  };

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
      <div className="w-full max-w-3xl rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 sm:p-5 backdrop-blur shadow-md flex flex-wrap items-center gap-2 justify-center">
        <button
          className="px-4 py-2 rounded-full text-white disabled:opacity-50 bg-gradient-to-r from-indigo-600 to-violet-600 shadow hover:opacity-95 active:opacity-90 transition"
          onClick={() => run('bfs')}
          disabled={running}
        >
          BFS
        </button>
        <button
          className="px-4 py-2 rounded-full text-white disabled:opacity-50 bg-gradient-to-r from-emerald-600 to-teal-600 shadow hover:opacity-95 active:opacity-90 transition"
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
            className="w-16 border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/10 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
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
            className="w-16 border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/10 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            disabled={running}
          />
        </label>
        <label className="flex items-center space-x-1">
          <span className="text-sm">Speed</span>
          <select
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/10 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            disabled={running}
          >
            <option value={100}>Fast</option>
            <option value={300}>Medium</option>
            <option value={500}>Slow</option>
          </select>
        </label>
        <button
          className="px-4 py-2 rounded-full text-white disabled:opacity-50 bg-gray-800 hover:bg-gray-700 transition"
          onClick={addRandomWalls}
          disabled={running}
        >
          Random Walls
        </button>
        <button
          className={`px-4 py-2 rounded-full text-white disabled:opacity-50 transition ${
            placing === 'start'
              ? 'bg-purple-700'
              : 'bg-purple-600 hover:bg-purple-500'
          }`}
          onClick={() => setPlacing('start')}
          disabled={running}
        >
          Set Start
        </button>
        <button
          className={`px-4 py-2 rounded-full text-white disabled:opacity-50 transition ${
            placing === 'end' ? 'bg-pink-700' : 'bg-pink-600 hover:bg-pink-500'
          }`}
          onClick={() => setPlacing('end')}
          disabled={running}
        >
          Set End
        </button>
      </div>

      <div
        className={`grid gap-1.5 w-fit p-2 rounded-xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-white/5 backdrop-blur`}
        style={{ gridTemplateColumns: `repeat(${cols}, 2.5rem)` }}
      >
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((__, c) => (
            <div
              key={`${r}-${c}`}
              onClick={() => handleCellClick(r, c)}
              className={`h-10 w-10 rounded-md border border-black/10 dark:border-white/10 transition-colors ${
                isStart(r, c)
                  ? 'bg-green-400/80'
                  : isEnd(r, c)
                  ? 'bg-rose-400/80'
                  : isWall(r, c)
                  ? 'bg-gray-700/80 dark:bg-gray-600/80'
                  : isPath(r, c)
                  ? 'bg-blue-400/80'
                  : isVisited(r, c)
                  ? 'bg-yellow-300/80'
                  : 'bg-white/70 dark:bg-white/10'
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
}
