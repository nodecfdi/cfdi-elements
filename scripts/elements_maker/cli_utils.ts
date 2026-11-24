import type { SpecificationSpec } from './structure.js';
import { execFile } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export function specKeyFromFile(specificationFile: string): string {
  return path.basename(specificationFile, path.extname(specificationFile));
}

export async function readSpecificationFile(specificationFile: string): Promise<SpecificationSpec> {
  return JSON.parse(await readFile(specificationFile, 'utf8')) as SpecificationSpec;
}

export async function writeSpecificationFile(
  specificationFile: string,
  spec: SpecificationSpec,
): Promise<void> {
  await writeFile(specificationFile, `${JSON.stringify(spec, null, 2)}\n`);
}

export async function beautify(targets: string[]): Promise<void> {
  console.log('Applying linter/formatter using eslint...');
  await execFileAsync('pnpm', ['eslint', ...targets, '--fix']);
  console.log('Formatting completed');
}

export function failWithUsage(message: string, usage: string): void {
  console.error(`Error: ${message}\n`);
  console.error(usage);
  process.exitCode = 1;
}
