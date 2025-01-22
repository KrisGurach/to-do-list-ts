// src/setupTests.ts

import '@testing-library/jest-dom/extend-expect';

type MatcherResult = {
  pass: boolean;
  message: () => string;
};

declare global {
  // Используем взамен namespace просто declare, чтобы расширить Matchers
  interface Matchers<R> {
    toBeInTheDocument(): R;
  }
}

expect.extend({
  toBeInTheDocument(received: HTMLElement): MatcherResult {
    const pass = document.body.contains(received);

    if (pass) {
      return {
        message: () => `${this.utils.printReceived(received)} is in the document`,
        pass: true,
      };
    } else {
      return {
        message: () => `${this.utils.printReceived(received)} is not in the document`,
        pass: false,
      };
    }
  },
});
