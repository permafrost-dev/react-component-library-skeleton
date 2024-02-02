import { generateDtsBundle } from 'dts-bundle-generator';
import { writeFileSync } from 'fs';

const dts = generateDtsBundle([{
    filePath: 'src/index.tsx',
}]).pop()
    .replaceAll('export {};', '')
    .replaceAll(/\n{2,}/g, '\n')
    .replaceAll(/\t/g, '    ')
    .trim();

writeFileSync('dist/index.d.ts', dts);

console.log('Compiled dist/index.d.ts');
