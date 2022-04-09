import { Builder, until } from 'selenium-webdriver';
import { ServiceBuilder } from 'selenium-webdriver/chrome';

const DEFAULT_TIMEOUT = 10000; // 10s

// TODO: implement this as child of browser so Chromebrowser would extend
// and receive all props from base browser (waitFor, clickElement, etc..)
export class ChromeBrowser {
    constructor({ webdriverPath }) {
        this.webdriverPath = webdriverPath;
    }

    async init() {
        const chromeService = new ServiceBuilder(this.webdriverPath);
        this.driver = await new Builder()
            .forBrowser('chrome')
            .setChromeService(chromeService)
            .build();
        return this.driver;
    }

    async waitFor({
        elementSelector,
        timeout = DEFAULT_TIMEOUT
    }) {
        const el = await this.driver.wait(until.elementLocated(elementSelector), timeout);
        return el;
    }

    async navigateAndWaitForElement({
        elementSelector,
        timeout = DEFAULT_TIMEOUT,
        to
    }) {
        await this.driver.get(to);
        const el = await this.waitFor({ elementSelector, timeout });
        return el;
    }

    async getPath() {
        const url = await this.driver.getCurrentUrl();
        const [, , , path] = url.split('/');
        return path;
    }

    async clickElement(elementSelector) {
        // using clickElement, we can click on items that do
        // not have onClick binded
        const el = this.driver.findElement(elementSelector);
        const actions = this.driver.actions({ async: true });
        const mouse = actions.mouse();
        await actions.pause(mouse)
            .move({ duration: 150, origin: el, x: 0, y: 0 })
            .press()
            .release()
            .perform();
    }


    async hoverElement(elementSelector) {
        const el = await this.driver.findElement(elementSelector);
        await this.driver.executeScript(`
            var evObj =
                document.createEvent('MouseEvents');
            evObj.initEvent('mouseover', true, false);
            arguments[0].dispatchEvent(evObj);
        `
        , el);
    }

    async wheelOnElement({ elementSelector, deltaY = 0, times = 1 }) {
        const el = this.driver.findElement(elementSelector);
        for (let i = 0; i < times; i++) {
            await this.driver.executeScript(`
            arguments[0].dispatchEvent(new WheelEvent('wheel', {
                bubbles: true,
                cancelable: true,
                deltaY: arguments[1]
            }));
            `
            , el, deltaY);
        }
    }
}
