import { readFileSync, writeFileSync } from 'node:fs';

const indexPath = 'dist/travel-app/browser/index.html';
const html = readFileSync(indexPath, 'utf8');
const nextHtml = html.replace('<base href="/">', '<base href="/travel-agency/">');

if (html === nextHtml) {
  if (html.includes('<base href="/travel-agency/">')) {
    process.exit(0);
  }

  throw new Error(`Could not find a supported base href in ${indexPath}`);
}

writeFileSync(indexPath, nextHtml);
