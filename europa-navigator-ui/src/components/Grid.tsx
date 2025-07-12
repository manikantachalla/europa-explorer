import React from 'react';
import './Grid.css';

const dirToArrow: Record<string, string> = {
  N: '↑',
  E: '→',
  S: '↓',
  W: '←'
};

type Robot = {
  x: number;
  y: number;
  dir: string;
};

type GridProps = {
  width: number;
  height: number;
  robots: Robot[];
};

export const Grid = ({ width, height, robots }: GridProps) => {
  const renderCell = (x: number, y: number) => {
    const robot = robots.find((r) => r.x === x && r.y === y);
    return (
      <div className="cell" key={`${x}-${y}`}>
        {robot ? <span className="robot">{dirToArrow[robot.dir]}</span> : ''}
      </div>
    );
  };

  const rows = [];
  for (let y = height - 1; y >= 0; y--) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push(renderCell(x, y));
    }
    rows.push(
      <div className="row" key={y}>
        {row}
      </div>
    );
  }

  return <div className="grid">{rows}</div>;
};
