import fs   from 'fs';
import path from 'path';
import { Robot }  from './robot';
import { Direction, Instruction, Position } from './types';
import { logger } from './logger';

function validDir(x: string): x is Direction { return ['N','E','S','W'].includes(x); }
function validInstr(x: string): x is Instruction { return ['L','R','M'].includes(x); }

const file = path.join(__dirname, '..', 'input.txt');
const lines = fs.readFileSync(file,'utf-8').trim().split(/\r?\n/).filter(Boolean);

if (lines.length < 3 || lines.length % 2 === 0) {
  logger.error('Input file must contain a grid line followed by pairs of robot lines.');
  process.exit(1);
}

/* GRID VALIDATION */
const [maxX, maxY] = lines[0].split(' ').map(Number);
if ([maxX, maxY].some(n => Number.isNaN(n) || n < 0)) {
  logger.error('Grid line must be two non-negative integers.');
  process.exit(1);
}

for (let i = 1; i < lines.length; i += 2) {
  /** ── START LINE VALIDATION ── */
  const [x, y, d] = lines[i].trim().split(' ');
  if (!x || !y || !d || !validDir(d) || isNaN(+x) || isNaN(+y)) {
    logger.error(`Bad start line (${i+1}): "${lines[i]}"`);
    continue;
  }
  const start: Position = { x: +x, y: +y, dir: d };

  /** ── INSTRUCTIONS VALIDATION ── */
  const instrRaw = lines[i+1].trim();
  if (!instrRaw.split('').every(validInstr)) {
    logger.error(`Bad instruction line (${i+2}): "${instrRaw}"`);
    continue;
  }
  const instr = instrRaw.split('') as Instruction[];

  /* EXECUTION */
  const robot = new Robot(start, [maxX, maxY]);
  robot.execute(instr);
  console.log(robot.toString());
}
