export type Direction = 'N' | 'E' | 'S' | 'W';
export type Instruction = 'L' | 'R' | 'M';

export interface Position {
  x: number;
  y: number;
  dir: Direction;
}