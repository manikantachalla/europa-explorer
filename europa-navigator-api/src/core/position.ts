import { Direction, Instruction } from "./types";

export type RobotInput = {
  start: Position;
  instructions: Instruction[];
};

const leftTurn: Record<Direction, Direction> = { N: 'W', W: 'S', S: 'E', E: 'N' };
const rightTurn: Record<Direction, Direction> = { N: 'E', E: 'S', S: 'W', W: 'N' };

export class Position {
  x: number;
  y: number;
  dir: Direction;

  constructor(x: number, y: number, dir: Direction) {
    this.x = x;
    this.y = y;
    this.dir = dir;
  }

  clone(): Position {
    return new Position(this.x, this.y, this.dir);
  }

  rotateLeft() {
    this.dir = leftTurn[this.dir];
  }

  rotateRight() {
    this.dir = rightTurn[this.dir];
  }

  getNext(): [number, number] {
    switch (this.dir) {
      case 'N': return [this.x, this.y + 1];
      case 'E': return [this.x + 1, this.y];
      case 'S': return [this.x, this.y - 1];
      case 'W': return [this.x - 1, this.y];
    }
  }

  toString(): string {
    return `${this.x} ${this.y} ${this.dir}`;
  }
}
