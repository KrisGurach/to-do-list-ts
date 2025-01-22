module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Обработка .ts и .tsx файлов
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(axios)/)',
      ],
  };
  