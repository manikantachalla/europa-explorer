import express from 'express';
import { simulateRobots } from './simulator';
import { Direction, Instruction, Position } from './types';
import { logger } from './logger';

const app = express();
app.use(express.json());

type RobotInput = {
  start: Position;
  instructions: Instruction[];
};

/**
 * @swagger
 * /simulate:
 *   post:
 *     summary: Simulate robot movement on Europa's surface
 *     tags: [Simulation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grid:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [5, 5]
 *               robots:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     start:
 *                       type: object
 *                       properties:
 *                         x: { type: integer }
 *                         y: { type: integer }
 *                         dir: { type: string, enum: ["N", "E", "S", "W"] }
 *                     instructions:
 *                       type: array
 *                       items: { type: string, enum: ["L", "R", "M"] }
 *     responses:
 *       200:
 *         description: Robot final positions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items: { type: string }
 *       400:
 *         description: Bad input
 *       500:
 *         description: Internal server error
 */
app.post('/simulate', (req, res) => {
  try {
    const { grid, robots } = req.body as {
      grid: [number, number];
      robots: RobotInput[];
    };

    // Basic validation
    if (
      !Array.isArray(grid) ||
      grid.length !== 2 ||
      grid.some((n) => typeof n !== 'number')
    ) {
      return res.status(400).json({ error: 'Invalid grid format' });
    }

    if (!Array.isArray(robots)) {
      return res.status(400).json({ error: 'Invalid robots array' });
    }

    const results = simulateRobots(grid, robots);
    return res.json({ results });
  } catch (err) {
    logger.error(`Error in /simulate: ${err}`);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`🚀 Server listening on http://localhost:${PORT}`);
});
