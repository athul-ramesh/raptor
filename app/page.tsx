import GridVisualizer from '../components/GridVisualizer';

export default function Home() {
  return (
    <main className="p-8 flex flex-col items-center space-y-4">
      <h1 className="text-3xl font-bold">BFS & DFS Visualizer</h1>
      <GridVisualizer />
    </main>
  );
}
