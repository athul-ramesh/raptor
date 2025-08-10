import GridVisualizer from '../components/GridVisualizer';

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">BFS & DFS Visualizer</h1>
      <GridVisualizer />
    </main>
  );
}
