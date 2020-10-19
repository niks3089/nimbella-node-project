module.exports = {
  "setupFiles": ["dotenv/config"],
  "setupFilesAfterEnv": ['./jest.setup.js'],
  "testEnvironment": 'node',
  "coverageReporters": ["json", "html"]
};
