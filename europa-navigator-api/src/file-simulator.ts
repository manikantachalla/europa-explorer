import fs from 'fs';
import path from 'path';
import { Simulation } from './core/simulation';

const VALID_DIRECTIONS = ['N', 'E', 'S', 'W'];
const VALID_INSTRUCTIONS = new Set(['L', 'R', 'M', 'B']);

// ── 1. Get file path from CLI args
const args = process.argv.slice(2);
const inputFileArg = args.find(arg => arg.startsWith('inputFile='));
const inputPath = inputFileArg?.split('=')[1] ?? 'input.txt';

const filePath = path.isAbsolute(inputPath)
  ? inputPath
  : path.join(__dirname, '..', inputPath);

if (!fs.existsSync(filePath)) {
  console.error(`❌ File not found: ${filePath}`);
  process.exit(1);
}

// ── 2. Read and sanitize
const lines = fs.readFileSync(filePath, 'utf-8')
  .split(/\r?\n/)
  .map(l => l.trim())
  .filter(Boolean);

// ── 3. Validate line count
if (lines.length < 3 || lines.length % 2 === 0) {
  console.error('❌ Input file must have one grid line and then robot line pairs.');
  process.exit(1);
}

// ── 4. Parse and validate grid line
const [maxXstr, maxYstr] = lines[0].split(' ');
const maxX = Number(maxXstr);
const maxY = Number(maxYstr);

if (isNaN(maxX) || isNaN(maxY) || maxX < 0 || maxY < 0) {
  console.error('❌ Invalid grid size. Expected two non-negative integers.');
  process.exit(1);
}

const grid: [number, number] = [maxX, maxY];

// ── 5. Create simulation
let sim: Simulation;

try {
  sim = new Simulation(grid);
} catch (e) {
  console.error('❌ Failed to create grid:', (e as Error).message);
  process.exit(1);
}

// ── 6. Process robot input pairs
for (let i = 1; i < lines.length; i += 2) {
  const positionLine = lines[i];
  const instructionLine = lines[i + 1];

  const [xStr, yStr, dir, fStr] = positionLine.split(' ');

  const x = Number(xStr);
  const y = Number(yStr);
  const fuel = Number(fStr);

  // Validate position line
  if (isNaN(x) || isNaN(y) || !VALID_DIRECTIONS.includes(dir) || isNaN(fuel)) {
    console.error(`❌ Invalid robot position at line ${i + 1}: "${positionLine}"`);
    continue;
  }

  // Validate instructions
  const instructions = instructionLine.trim().split('');
  const isValid = instructions.every(char => VALID_INSTRUCTIONS.has(char));
  if (!isValid) {
    console.error(`❌ Invalid instructions at line ${i + 2}: "${instructionLine}"`);
    continue;
  }

  sim.addRobot({ x, y, dir }, fuel, instructions);
}

// ── 7. Run simulation
const results = sim.run();
results.forEach((r, idx) => {
  if (r.startsWith('❌')) {
    console.error(`Robot ${idx + 1}: ${r}`);
  } else {
    console.log(`Robot ${idx + 1} Final Position: ${r}`);
  }
});
