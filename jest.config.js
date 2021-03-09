module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  coverageReporters: ["text", "lcov"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["js", "node"],
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: ["\\\\node_modules\\\\", "\\\\coverage\\\\"],
  transformIgnorePatterns: ["\\\\node_modules\\\\", "\\\\coverage\\\\"],
};
