// jest.config.js
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  modulePathIgnorePatterns: ["<rootDir>/dist"],
  testTimeout: 60000,
};
