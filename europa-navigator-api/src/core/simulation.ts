import { Grid } from './grid';
import { Position } from './position';
import { Robot } from './robot';
import { Direction } from './types';

const VALID_DIRECTIONS = ['N', 'E', 'S', 'W'];
const VALID_INSTRUCTIONS = new Set(['L', 'R', 'M']);

export class Simulation {
  private readonly grid: Grid;
  private readonly robots: Robot[] = [];
  private readonly errors: string[] = [];

  constructor(gridSize: [number, number]) {
    const [maxX, maxY] = gridSize;

    if (isNaN(maxX) || isNaN(maxY) || maxX < 0 || maxY < 0) {
      throw new Error('❌ Invalid grid dimensions');
    }

    this.grid = new Grid(maxX, maxY);
  }

  /**
   * Adds a robot with input validation. If invalid, logs an error.
   */
  addRobot(start: { x: number; y: number; dir: string }, instructions: string[]) {
    const { x, y, dir } = start;

    // Validate direction
    if (!VALID_DIRECTIONS.includes(dir)) {
      this.errors.push(`❌ Invalid direction: ${dir}`);
      return;
    }

    // Validate instructions
    const validInstructions = instructions.every(i => VALID_INSTRUCTIONS.has(i));
    if (!validInstructions) {
      this.errors.push(`❌ Invalid instruction(s): ${instructions.join('')}`);
      return;
    }

    // Validate position
    if (!this.grid.isInBounds(x, y)) {
      this.errors.push(`❌ Robot starts out of bounds at (${x}, ${y})`);
      return;
    }

    if (this.grid.isOccupied(x, y)) {
      this.errors.push(`❌ Robot starts in an occupied cell at (${x}, ${y})`);
      return;
    }

    const position = new Position(x, y, dir as Direction);
    const robot = new Robot(position, instructions, this.grid);
    this.robots.push(robot);
  }

  /**
   * Executes all valid robots and returns final positions or errors
   */
  run(): string[] {
    if (this.errors.length > 0) {
      return this.errors;
    }

    return this.robots.map(robot => {
      robot.execute();
      return robot.getFinalPosition();
    });
  }
}