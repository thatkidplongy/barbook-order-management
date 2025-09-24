module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/server", "<rootDir>/client/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/*.(test|spec).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverageFrom: [
    "server/**/*.{ts,js}",
    "client/src/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/__tests__/**",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/client/src/$1",
    "^react$": "<rootDir>/client/node_modules/react",
    "^react-dom$": "<rootDir>/client/node_modules/react-dom",
  },
  testPathIgnorePatterns: ["/node_modules/", "/client/node_modules/"],
  transformIgnorePatterns: ["/node_modules/(?!(.*\\.mjs$))"],
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react-jsx",
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        module: "commonjs",
        target: "es2020",
      },
    },
  },
};
