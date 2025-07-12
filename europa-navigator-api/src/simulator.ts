import { Direction, Instruction, Position } from './types';
import { Robot } from './robot';

export function simulateRobots(
  gridMax: [number, number],
  robotInputs: { start: Position; instructions: Instruction[] }[]
): string[] {
  const results: string[] = [];

  for (const { start, instructions } of robotInputs) {
    const robot = new Robot(start, gridMax);
    robot.execute(instructions);
    results.push(robot.toString());
  }

  return results;
}