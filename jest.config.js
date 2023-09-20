const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    // Includes
    '<rootDir>/app/**/*.{js,jsx,ts,tsx}',

    //Excludes
    '!<rootDir>/app/layout.tsx',
    '!<rootDir>/app/**/styles/*.{js,jsx,ts,tsx}',
    '!<rootDir>/app/**/constants/*.{js,jsx,ts,tsx}',
    '!<rootDir>/app/api/v1/**/route.ts',
    '!<rootDir>/app/theme/**/*.{js,ts}',
    '!<rootDir>/app/**/components/icons/*.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
