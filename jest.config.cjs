const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('@jest/types').Config.InitialOptions } */
module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: "@happy-dom/jest-environment",
    transform: {  },
    testRegex: '(/__test__/.*|/tests/.*|(\\.|/)(test|spec))\\.[tj]sx?$',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: `${__dirname}/` }),
    coverageDirectory: './coverage',
    coverageReporters: ['json', 'text'],
    collectCoverageFrom: ['src/**/*.{ts,js}', '!**/node_modules/**', '!**/vendor/**', '!**/dist/**', '!**/tests/**'],
};
