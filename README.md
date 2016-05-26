How to run:

Firstly, you need to have [Node.js](https://nodejs.org/en/)

Then, install these packages globally:
```bash
npm install -g gulp
```

After that, just run:
```bash
npm install
```

To start up the server, run:
`gulp`

and done! The browser will popup and you can start trying Angular 2!
Every changes to the file will refresh the browser automatically
and it'll also compile your changed TypeScripts files to Javascript files.

## Testing
This starter comes with testing gulp workflow

### Unit testing
Just run
```bash
gulp test
```
and it'll compile all TypeScript files, start Karma, then remap Istanbul coverage so that it shows TypeScript coverage, not the transpiled Javascript coverage.
![Coverage result](http://s9.postimg.org/ij32cv5dr/test.png)

### E2E testing
Firstly start the server:
```
gulp serve-dev
```
To begin testing, run:
```bash
gulp e2e
```
and it'll compile all E2E spec files in `/test/e2e/*.spec.ts`, boot up Selenium server then launches Chrome browser.

## Production
> All build tasks will run the `gulp test`, the bundle will only be created if the test passed.

You can create production build by running:
```bash
gulp build
```
or you can create production build and then serve it using `live-server` by running:
```bash
gulp serve-build
```
It uses [SystemJS Builder](https://github.com/systemjs/builder) to bundle your application so it's ready for production use

## Contributing
Feel free to submit a PR if there are any issues or new features, read [this](https://github.com/antonybudianto/angular2-starter/blob/master/CONTRIBUTING.md) before

## Special thanks
* John Papa for his awesome [angular-styleguide](https://github.com/johnpapa/angular-styleguide) and [Tour of Heroes](https://github.com/johnpapa/angular2-tour-of-heroes)
* Julie Ralph for her [ng2-test-seed](https://github.com/juliemr/ng2-test-seed) which helped me a lot to get started with testing feature

## License
MIT
