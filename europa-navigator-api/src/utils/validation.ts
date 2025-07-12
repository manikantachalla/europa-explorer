import { Direction, Instruction } from "../core/types";

export function validDir(x: string): x is Direction { return ['N','E','S','W'].includes(x); }
export function validInstr(x: string): x is Instruction { return ['L','R','M'].includes(x); }