export type Coord = [number, number];

const directions: Coord[] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

export function bfs(rows: number, cols: number, start: Coord): Coord[] {
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );
  const order: Coord[] = [];
  const queue: Coord[] = [start];
  visited[start[0]][start[1]] = true;

  while (queue.length) {
    const [r, c] = queue.shift()!;
    order.push([r, c]);
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
        visited[nr][nc] = true;
        queue.push([nr, nc]);
      }
    }
  }

  return order;
}

export function dfs(rows: number, cols: number, start: Coord): Coord[] {
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );
  const order: Coord[] = [];

  function walk(r: number, c: number) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || visited[r][c]) return;
    visited[r][c] = true;
    order.push([r, c]);
    for (const [dr, dc] of directions) {
      walk(r + dr, c + dc);
    }
  }

  walk(start[0], start[1]);
  return order;
}
