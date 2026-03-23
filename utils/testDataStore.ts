// utils/testDataStore.ts
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getFilePath(browserName: string): string {
  return path.join(__dirname, `../test-data/credentials-${browserName}.json`);
}

export function saveCredentials(randomEmail: string, randomPassword: string, browserName: string) {
  const filePath = getFilePath(browserName);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify({ randomEmail, randomPassword }));
}

export function loadCredentials(browserName: string): { randomEmail: string; randomPassword: string } | null {
  const filePath = getFilePath(browserName);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}