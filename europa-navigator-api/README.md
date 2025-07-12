# Europa Explorer

A TypeScript simulation of robots navigating a grid, inspired by the Mars Rover problem.

## Project Structure

- [`src/index.ts`](src/index.ts): Entry point. Reads input and runs the simulation.
- [`src/robot.ts`](src/robot.ts): Contains the [`Robot`](src/robot.ts) class for robot movement logic.
- [`src/types.ts`](src/types.ts): Type definitions for directions, instructions, and positions.
- [`input.txt`](input.txt): Input file specifying the grid and robot instructions.

## Input Format

The [`input.txt`](input.txt) file should be structured as follows:

```
<grid width> <grid height>
<x> <y> <direction>
<instructions>
...
```

Example:
```
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
```

## Running the Project

1. Install dependencies:
   ```sh
   npm install
   ```

2. Run the simulation:
   ```sh
   npm start
   ```

## Output

The program prints the final position and direction of each robot after executing its instructions.

## Build

To compile TypeScript to JavaScript:
```sh
npm run build
```