export type Coord = [number, number];

const directions: Coord[] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

export interface SearchResult {
  order: Coord[];
  path: Coord[];
}

export function bfs(
  rows: number,
  cols: number,
  start: Coord,
  end: Coord,
  walls: Set<string> = new Set()
): SearchResult {
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );
  const prev: (Coord | null)[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );
  const order: Coord[] = [];
  const queue: Coord[] = [start];
  let found = false;
  visited[start[0]][start[1]] = true;

  while (queue.length) {
    const [r, c] = queue.shift()!;
    order.push([r, c]);
    if (r === end[0] && c === end[1]) {
      found = true;
      break;
    }
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        !visited[nr][nc] &&
        !walls.has(`${nr},${nc}`)
      ) {
        visited[nr][nc] = true;
        prev[nr][nc] = [r, c];
        queue.push([nr, nc]);
      }
    }
  }

  const path: Coord[] = [];
  if (found) {
    let curr: Coord | null = end;
    while (curr) {
      path.push(curr);
      const p = prev[curr[0]][curr[1]];
      curr = p;
    }
    path.reverse();
  }

  return { order, path };
}

export function dfs(
  rows: number,
  cols: number,
  start: Coord,
  end: Coord,
  walls: Set<string> = new Set()
): SearchResult {
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );
  const order: Coord[] = [];
  const path: Coord[] = [];

  function walk(r: number, c: number): boolean {
    if (
      r < 0 ||
      r >= rows ||
      c < 0 ||
      c >= cols ||
      visited[r][c] ||
      walls.has(`${r},${c}`)
    )
      return false;
    visited[r][c] = true;
    order.push([r, c]);
    path.push([r, c]);
    if (r === end[0] && c === end[1]) return true;
    for (const [dr, dc] of directions) {
      if (walk(r + dr, c + dc)) return true;
    }
    path.pop();
    return false;
  }

  walk(start[0], start[1]);
  return { order, path };
}
