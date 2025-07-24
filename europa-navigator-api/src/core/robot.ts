import { Position } from './position';
import { Grid } from './grid';

// Represents a robot navigating on a grid with a set of instructions
export class Robot {
    position: Position; // Current position and orientation of the robot
    fuel: number;
    readonly instructions: string[]; // List of movement instructions (L, R, M)
    readonly grid: Grid; // Reference to the grid the robot is navigating

    constructor(start: Position, instructions: string[], grid: Grid, fuel: number) {
        // Clone the starting position to avoid mutating the original
        this.position = start.clone();
        this.instructions = instructions;
        this.grid = grid;
        this.fuel = fuel;
    }

    // Executes the list of instructions to move the robot
    execute(): void {
        for (const command of this.instructions) {
            if (this.fuel <= 0) {
                console.error(`❌ Robot at (${this.position.x}, ${this.position.y}) has no fuel left.`);
                return;
            }
            this.executeInstruction(command);
        }
        // Mark the final position as occupied on the grid
        this.grid.markOccupied(this.position.x, this.position.y);
    }

    public executeInstruction(command: string) {
        if (this.fuel <= 0) {
            console.error(`❌ Robot at (${this.position.x}, ${this.position.y}) has no fuel left.`);
            return;
        }
        if (command === 'L') {
            this.position.rotateLeft(); // Rotate left
            this.fuel--;
        } else if (command === 'R') {
            this.position.rotateRight(); // Rotate right
            this.fuel--;
        }
        else if (command === 'M') {
            // Calculate next position based on current orientation
            const [nx, ny] = this.position.getNext();
            // Move if the next position is within bounds and not occupied
            if (this.grid.isInBounds(nx, ny) && !this.grid.isOccupied(nx, ny)) {
                this.position.x = nx;
                this.position.y = ny;
                this.fuel--;
            }
        } else if (command === 'B') {
            // Calculate next position based on current orientation
            const [nx, ny] = this.position.getBack();
            // Move if the next position is within bounds and not occupied
            if (this.grid.isInBounds(nx, ny) && !this.grid.isOccupied(nx, ny)) {
                this.position.x = nx;
                this.position.y = ny;
                this.fuel--;
            }
        }
    }

    // Returns the robot's final position as a string
    getFinalPosition(): string {
        return this.position.toString() + " - Fuel " + this.fuel;
    }
}
