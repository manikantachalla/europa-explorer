import fs from 'fs';
import path from 'path';
import { Robot } from './robot';
import { Direction, Instruction, Position } from './types';

const input = fs.readFileSync(path.join(__dirname, '..', 'input.txt'), 'utf-8').trim().split('\n');

const grid = input[0].split(' ').map(Number) as [number, number];
for (let i = 1; i < input.length; i += 2) {
  const [x, y, d] = input[i].split(' ');
  const start: Position = { x: parseInt(x), y: parseInt(y), dir: d?.trim() as Direction };
  const instructions = input[i + 1].trim().split('') as Instruction[];

  const robot = new Robot(start, grid);
  robot.execute(instructions);
  console.log(robot.toString());
}