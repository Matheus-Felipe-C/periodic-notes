import dotenv from "dotenv"

dotenv.config();

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: ["lib/**/*.js"],
  coverageDirectory: "coverage",
};
