import React, { useState } from 'react';
import { Grid } from './Grid';

type RobotInput = {
  x: number;
  y: number;
  dir: string;
  instructions: string;
};

export const Simulator = () => {
  const [grid, setGrid] = useState<[number, number]>([5, 5]);
  const [robotsInput, setRobotsInput] = useState<RobotInput[]>([
    { x: 1, y: 2, dir: 'N', instructions: 'LMLMLMLMM' }
  ]);
  const [results, setResults] = useState<{ x: number; y: number; dir: string }[]>([]);

  const handleChange = (index: number, field: keyof RobotInput, value: string | number) => {
    const newRobots = [...robotsInput];
    newRobots[index][field] = typeof value === 'string' ? value.toUpperCase() : value;
    setRobotsInput(newRobots);
  };

  const addRobot = () => {
    setRobotsInput([...robotsInput, { x: 0, y: 0, dir: 'N', instructions: '' }]);
  };

  const simulate = async () => {
    const payload = {
      grid,
      robots: robotsInput.map((r) => ({
        start: { x: r.x, y: r.y, dir: r.dir },
        instructions: r.instructions.split('') as Array<'L' | 'R' | 'M'>
      }))
    };

    const res = await fetch('http://localhost:3000/simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    const parsed = data.results.map((line: string) => {
      const [x, y, dir] = line.split(' ');
      return { x: +x, y: +y, dir };
    });
    setResults(parsed);
  };

  return (
    <div>
      <h2>Europa Robot Simulator</h2>

      <label>Grid Size (Width x Height): </label>
      <input
        type="number"
        value={grid[0]}
        onChange={(e) => setGrid([+e.target.value, grid[1]])}
      />
      <input
        type="number"
        value={grid[1]}
        onChange={(e) => setGrid([grid[0], +e.target.value])}
      />

      <hr />

      {robotsInput.map((r, idx) => (
        <div key={idx}>
          <h4>Robot {idx + 1}</h4>
          <label>X:</label>
          <input type="number" value={r.x} onChange={(e) => handleChange(idx, 'x', +e.target.value)} />
          <label>Y:</label>
          <input type="number" value={r.y} onChange={(e) => handleChange(idx, 'y', +e.target.value)} />
          <label>Dir:</label>
          <input type="text" value={r.dir} onChange={(e) => handleChange(idx, 'dir', e.target.value)} maxLength={1} />
          <label>Instructions:</label>
          <input
            type="text"
            value={r.instructions}
            onChange={(e) => handleChange(idx, 'instructions', e.target.value)}
            placeholder="e.g. LMLMLMLMM"
          />
        </div>
      ))}

      <button onClick={addRobot}>Add Robot</button>
      <button onClick={simulate}>Simulate</button>

      <hr />
      {results.length > 0 && <Grid width={grid[0] + 1} height={grid[1] + 1} robots={results} />}
    </div>
  );
};
