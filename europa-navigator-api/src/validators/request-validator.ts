import { Request, Response, NextFunction } from 'express';

const VALID_DIRECTIONS = ['N', 'E', 'S', 'W'];
const VALID_INSTRUCTIONS = new Set(['L', 'R', 'M', 'B']);

export function validateSimulateRequest(req: Request, res: Response, next: NextFunction) {
  const { grid, robots } = req.body;

  if (
    !Array.isArray(grid) ||
    grid.length !== 2 ||
    grid.some((n) => typeof n !== 'number' || n < 0)
  ) {
    return res.status(400).json({ error: 'Invalid grid. Must be [maxX, maxY] non-negative integers.' });
  }

  if (!Array.isArray(robots) || robots.length === 0) {
    return res.status(400).json({ error: 'Robots must be a non-empty array.' });
  }

  for (let i = 0; i < robots.length; i++) {
    const { start, instructions } = robots[i];
    const robotLabel = `Robot ${i + 1}`;

    if (!start || typeof start.x !== 'number' || typeof start.y !== 'number' || !VALID_DIRECTIONS.includes(start.dir)) {
      return res.status(400).json({ error: `${robotLabel} has invalid start position.` });
    }

    if (
      !Array.isArray(instructions) ||
      !instructions.every((c) => VALID_INSTRUCTIONS.has(c))
    ) {
      return res.status(400).json({ error: `${robotLabel} has invalid instructions.` });
    }
  }

  next();
}
