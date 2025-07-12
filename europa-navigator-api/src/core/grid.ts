export class Grid {
  readonly maxX: number;
  readonly maxY: number;
  private occupied = new Set<string>();

  constructor(maxX: number, maxY: number) {
    this.maxX = maxX;
    this.maxY = maxY;
  }

  private key(x: number, y: number): string {
    return `${x},${y}`;
  }

  isInBounds(x: number, y: number): boolean {
    return x >= 0 && x <= this.maxX && y >= 0 && y <= this.maxY;
  }

  isOccupied(x: number, y: number): boolean {
    return this.occupied.has(this.key(x, y));
  }

  markOccupied(x: number, y: number): void {
    this.occupied.add(this.key(x, y));
  }

  clear(): void {
    this.occupied.clear();
  }
}