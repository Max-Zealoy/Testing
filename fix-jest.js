console.log('');
console.log('INSTALLING JEST FOR REACT TESTING IN VITE PROJECT');
console.log('');
console.log('©️ Thomas Frank, sep 2021, MIT-licensed');
console.log('');
console.log('Thanks to https://pranshushah.tech/getting-started-with-react-using-vitejs');
console.log('Using Babel, so really two build systems... :(');
console.log('');
console.log('Also see this discussion, we are close but not there with native Vite support:');
console.log('https://githubmemory.com/repo/vitejs/vite/issues/2720');
console.log('');

const fs = require('fs');
const path = require('path');

const jestFolder = path.join(__dirname, 'jest');
const mockFolder = path.join(jestFolder, 'mocks');

console.log('Creating folder', jestFolder);
if (fs.existsSync(jestFolder)) {
  console.log('Removed old jest folder!');
  fs.rmSync(jestFolder, { recursive: true, force: true });
}
fs.mkdirSync(jestFolder);
console.log('Creating folder', mockFolder);
fs.mkdirSync(mockFolder);

let file1 = path.join(jestFolder, 'jest.setup.js');
console.log('Creating file', file1);
fs.writeFileSync(file1, `import '@testing-library/jest-dom';\n`, 'utf-8');

let file2 = path.join(mockFolder, 'cssMock.js');
console.log('Creating file', file2);
fs.writeFileSync(file2,
  `module.exports = {
  process() {
    return 'module.exports = {};';
  },
  getCacheKey() {
    // The output is always the same.
    return 'cssTransform';
  },
};`, 'utf-8');

let file3 = path.join(mockFolder, 'imageMock.js');
console.log('Creating file', file3);
fs.writeFileSync(file3,
  `module.exports = {
  process() {
    return 'module.exports = {};';
  },
  getCacheKey() {
    // The output is always the same.
    return 'imageTransform';
  },
};`, 'utf-8');

let changeInPackageJson = {
  "scripts": {
    "test": "jest -env=jsdom"
  },
  "devDependencies": {
    "@testing-library/react": "^12.1.1",
    "@babel/core": "^7.15.5",
    "@testing-library/dom": "^8.6.0",
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/user-event": "^13.2.1",
    "babel-eslint": "^10.1.0",
    "babel-jest": "^27.2.2",
    "babel-preset-react-app": "^10.0.0",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^27.2.2",
    "jest-circus": "^27.2.2",
    "jest-scss-transform": "^1.0.1",
    "jest-watch-typeahead": "^0.6.4",
  },
  "jest": {
    "roots": [
      "<rootDir>/src"
    ],
    "setupFilesAfterEnv": [
      "<rootDir>/jest/jest.setup.js"
    ],
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.d.ts"
    ],
    "testMatch": [
      "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
      "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ],
    "testEnvironment": "jsdom",
    "transform": {
      "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
      "^.+\\.scss$": "jest-scss-transform",
      "^.+\\.css$": "<rootDir>/jest/mocks/cssMock.js",
      "^.+\\.svg$": "<rootDir>/jest/mocks/imageMock.js",
      "^.+\\.jpg$": "<rootDir>/jest/mocks/imageMock.js",
      "^.+\\.jpeg$": "<rootDir>/jest/mocks/imageMock.js",
      "^.+\\.gif$": "<rootDir>/jest/mocks/imageMock.js",
      "^.+\\.png": "<rootDir>/jest/mocks/imageMock.js"
    },
    "transformIgnorePatterns": [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
      "^.+\\.module\\.(css|sass|scss)$"
    ],
    "moduleNameMapper": {
      "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
    },
    "watchPlugins": [
      "jest-watch-typeahead/filename",
      "jest-watch-typeahead/testname"
    ],
    "resetMocks": true
  },
  "babel": {
    "env": {
      "test": {
        "presets": [
          "react-app"
        ]
      }
    }
  },
}

console.log('Reading package.json');
let packageJsonPath = path.join(__dirname, 'package.json');
let packageJson = require(packageJsonPath);
for (let key in changeInPackageJson) {
  if (packageJson[key]) {
    console.log('Changing', key, 'in package.json');
    packageJson[key] = { ...packageJson[key], ...changeInPackageJson[key] };
  }
  else {
    console.log('Adding', key, 'in package.json');
    packageJson[key] = changeInPackageJson[key];
  }
}
console.log('Writing changed package.json');
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, '', '  '), 'utf-8');


let c = `// Important - do this if you don't want to import React in every component
import React from 'react';
globalThis.React = React;

// Other imports
import { render, screen } from '@testing-library/react';
import App from './App';

// A test
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
`;

let file4 = path.join(__dirname, 'src', 'App.test.jsx');
console.log('Creating file', file4);
fs.writeFileSync(file4, c, 'utf-8');


console.log('\nIMPORTANT');
console.log('To finish installation run');
console.log('npm install --legacy-peer-deps');
console.log('\n');
console.log('Now you can run tests with npm run test');
console.log('You can also remove this script. It has done its job!');
console.log('\n\n');