### Requirements ###

*   Node v12
*   Chrome (80+)
*   UNIX like OS

### Installation ###

1) Download Your OS spefic Chrome Webdriver binaries from [here](https://selenium.dev/documentation/en/webdriverdriver_requirements/#quick-reference)

2) Move /tests/config.exmple.js to /tests/config.js and set up correct config

3) Validate correct permissions (-rwxr-xr-x) for your binaries located at /bin/webdriver/

4) Install dependecies
```
npm i
```
5) Run tests
```
npm test
```

###  Things to remember ###

1) Selenium uses mouse events, so please make sure that you are not moving your cursor during tests

