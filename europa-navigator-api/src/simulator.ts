import { Simulation } from './core/simulation';
import { Position } from './core/position';

export function simulate(grid: [number, number], robotInputs: { start: Position, instructions: string[] }[]): string[] {
  const sim = new Simulation(grid);
  for (const input of robotInputs) {
    sim.addRobot(new Position(input.start.x, input.start.y, input.start.dir), input.instructions);
  }
  return sim.run();
}