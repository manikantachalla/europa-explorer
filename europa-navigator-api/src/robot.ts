import { Direction, Instruction, Position } from './types';
import { logger } from './logger';

const LEFT: Record<Direction, Direction>  = { N: 'W', W: 'S', S: 'E', E: 'N' };
const RIGHT: Record<Direction, Direction> = { N: 'E', E: 'S', S: 'W', W: 'N' };
const MOVE: Record<Direction, [number, number]> = { N: [0, 1], E: [1, 0], S: [0, -1], W: [-1, 0] };

export class Robot {
  private pos: Position;
  private readonly max: [number, number];

  constructor(start: Position, gridMax: [number, number]) {
    this.pos = { ...start };
    this.max = gridMax;
    logger.info(`Robot created at ${this}`);
  }

  execute(instr: Instruction[]) {
    instr.forEach(i => this.step(i));
    logger.info(`Robot finished at ${this}`);
  }

  /** single instruction */
  private step(i: Instruction) {
    switch (i) {
      case 'L':
        this.pos.dir = LEFT[this.pos.dir]; break;
      case 'R':
        this.pos.dir = RIGHT[this.pos.dir]; break;
      case 'M':
        const [dx, dy] = MOVE[this.pos.dir];
        const nx = this.pos.x + dx, ny = this.pos.y + dy;
        if (nx < 0 || nx > this.max[0] || ny < 0 || ny > this.max[1]) {
          logger.warn(`Move blocked – (${nx},${ny}) is outside grid; ignoring`);
        } else {
          this.pos.x = nx; this.pos.y = ny;
        }
        break;
    }
    logger.debug(`Instruction ${i} → ${this}`);
  }

  toString() { return `${this.pos.x} ${this.pos.y} ${this.pos.dir}`; }
}
