# TFSA vs RRSP

The project was made with:
- [React](https://facebook.github.io/react/)
- Ecma Script 6
- [Jest](https://facebook.github.io/jest/) for testing because of its simplicity
- [Ramda](http://ramdajs.com/) the functional programming Javascript framework that I wanted to use for a while
- [Webpack](https://webpack.github.io/docs/)
- [Babel](http://babeljs.io/)

## Initialization of the project

Project's dependencies have to be downloaded and initialized with the following command:

```shell
npm install
```

## Usage

- Package the project

In order to work on a browser sources need to be transpiled:

```shell
npm run package
```

And to package the project when a file changes, use the following command:

```shell
npm run package-watch
```

- Tests

To run tests:
```shell
npm test
```

To run tests in watch mode:
```shell
npm run test-watch
```
