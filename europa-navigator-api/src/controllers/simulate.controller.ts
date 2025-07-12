import { Request, Response } from 'express';
import { simulate } from '../simulator';

export const handleSimulate = (req: Request, res: Response) => {
  try {
    const { grid, robots } = req.body;
    const results = simulate(grid, robots);
    return res.status(200).json({ results });
  } catch (error) {
    console.error('❌ Simulation error:', error);
    return res.status(500).json({ error: 'Simulation failed.' });
  }
};
