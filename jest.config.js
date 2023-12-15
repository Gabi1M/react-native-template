module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: [
      "@testing-library/jest-native/extend-expect"
  ],
  setupFiles: [
      "./jest-setup.js"
  ],
  moduleNameMapper: {
      "^.+\\.svg$": "<rootDir>/svgTransform.js"
  },
  moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
  ],
  testEnvironment: 'node',
  transformIgnorePatterns: [
      'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)'
  ],
  reporters: [
      "default",
      "jest-summary-reporter"
  ]
}