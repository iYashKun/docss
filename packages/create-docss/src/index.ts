#!/usr/bin/env node
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, relative, resolve } from 'node:path';
import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

async function collectFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve(directory, entry.name);
      return entry.isDirectory() ? collectFiles(entryPath) : [entryPath];
    }),
  );
  return files.flat();
}

function toTitle(value: string): string {
  return value
    .replace(/[-_.]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const skipPrompts = args.includes('--yes') || args.includes('-y');
  const targetArgument = args.find((argument) => !argument.startsWith('-')) ?? 'my-docs';
  const targetDirectory = resolve(process.cwd(), targetArgument);
  const projectName = basename(targetDirectory)
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^[._-]+|[._-]+$/g, '') || 'my-docs';
  const defaultSiteName = toTitle(projectName);
  let siteName = defaultSiteName;

  if (!skipPrompts && stdin.isTTY) {
    const prompt = createInterface({ input: stdin, output: stdout });
    const answer = await prompt.question(`Documentation site name [${defaultSiteName}]: `);
    prompt.close();
    if (answer.trim()) siteName = answer.trim().replace(/\s+/g, ' ');
  }

  await mkdir(targetDirectory, { recursive: true });
  if ((await readdir(targetDirectory)).length > 0) {
    throw new Error(`Target directory is not empty: ${targetDirectory}`);
  }

  const templateDirectory = fileURLToPath(new URL('../template/', import.meta.url));
  const templateFiles = await collectFiles(templateDirectory);
  for (const templateFile of templateFiles) {
    const outputPath = resolve(targetDirectory, relative(templateDirectory, templateFile));
    const contents = (await readFile(templateFile, 'utf8'))
      .replaceAll('{{SITE_NAME_JSON}}', JSON.stringify(siteName))
      .replaceAll('{{SITE_NAME}}', siteName)
      .replaceAll('{{PROJECT_NAME}}', projectName);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, contents, 'utf8');
  }

  console.log(`\nCreated ${siteName} in ${targetDirectory}`);
  console.log('\nNext steps:');
  console.log(`  cd ${targetArgument}`);
  console.log('  npm install');
  console.log('  npm run dev');
  console.log('\nEdit docs.config.ts and content/docs/*.mdx, then deploy this project to Vercel or any Node.js host.');
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
