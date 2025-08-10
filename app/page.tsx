import GridVisualizer from '../components/GridVisualizer';

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-6 sm:px-8">
      <section className="relative pt-16 sm:pt-24 pb-12 sm:pb-16 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-1 text-xs text-gray-700 dark:text-gray-300 shadow-sm backdrop-blur">
          <span>Pathfinding</span>
          <span className="text-gray-400">•</span>
          <span>Interactive Visualizer</span>
        </div>
        <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            BFS & DFS Visualizer
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Explore breadth-first and depth-first search step-by-step. Add walls, set start and end, and watch algorithms discover paths in real time.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <a href="#visualizer" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-5 py-2.5 text-white shadow-lg shadow-fuchsia-600/20 hover:opacity-95 active:opacity-90 transition">
            Explore Visualizer
          </a>
          <a href="#features" className="inline-flex items-center justify-center rounded-full border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/5 px-5 py-2.5 text-gray-800 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-white/10 transition">
            Learn More
          </a>
        </div>
      </section>

      <section id="features" className="grid sm:grid-cols-3 gap-4 sm:gap-6 pb-8 sm:pb-10">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5 backdrop-blur shadow-sm">
          <div className="text-2xl">⚡</div>
          <h3 className="mt-2 font-semibold">Real-time Animation</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Watch visited nodes and final paths unfold step-by-step.</p>
        </div>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5 backdrop-blur shadow-sm">
          <div className="text-2xl">🎛️</div>
          <h3 className="mt-2 font-semibold">Interactive Controls</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Set grid size, speed, and place start, end, and walls.</p>
        </div>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5 backdrop-blur shadow-sm">
          <div className="text-2xl">🌗</div>
          <h3 className="mt-2 font-semibold">Light & Dark</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Looks great with your system theme automatically.</p>
        </div>
      </section>

      <section id="visualizer" className="pb-16">
        <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5 sm:p-6 backdrop-blur shadow-xl">
          <GridVisualizer />
        </div>
      </section>
    </main>
  );
}
