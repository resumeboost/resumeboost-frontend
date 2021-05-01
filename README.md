
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

## Test

```bash
# unit tests
$ npm run test
```

```bash
# test coverage
$ npm run test:cov
```

## Running end-to-end tests

Run the following command in the backend-nestjs repo.
```bash
npm run start:coverage
```

Open two terminals in the frontend repo and run the following commands:
In the first terminal, run
```bash
npm run start:coverage
```
In the second terminal, run
```bash
npm run cy:open
```

To run tests without the interactive browser use
```
npm run cy:run
```

After the tests are done running, a coverage report will be generated in the frontend directory, specifically in coverage/lcov-report/index.html, which you can open in a browser.
