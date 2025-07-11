import { Direction, Instruction, Position } from './types';

const LEFT: Record<Direction, Direction> = { N: 'W', W: 'S', S: 'E', E: 'N' };
const RIGHT: Record<Direction, Direction> = { N: 'E', E: 'S', S: 'W', W: 'N' };
const MOVES: Record<Direction, [number, number]> = {
  N: [0, 1],
  E: [1, 0],
  S: [0, -1],
  W: [-1, 0]
};

export class Robot {
  position: Position;
  gridMax: [number, number];

  constructor(start: Position, gridMax: [number, number]) {
    this.position = { ...start };
    this.gridMax = gridMax;
  }

  execute(instructions: Instruction[]) {
    for (const instr of instructions) {
      this.move(instr);
    }
  }

  move(instruction: Instruction) {
    switch (instruction) {
      case 'L':
        this.position.dir = LEFT[this.position.dir];
        break;
      case 'R':
        this.position.dir = RIGHT[this.position.dir];
        break;
      case 'M':
        const [dx, dy] = MOVES[this.position.dir];
        const newX = this.position.x + dx;
        const newY = this.position.y + dy;

        // Stay within grid
        if (newX >= 0 && newX <= this.gridMax[0] && newY >= 0 && newY <= this.gridMax[1]) {
          this.position.x = newX;
          this.position.y = newY;
        }
        break;
    }
  }

  toString() {
    return `${this.position.x} ${this.position.y} ${this.position.dir}`;
  }
}