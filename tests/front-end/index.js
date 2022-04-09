
import { ChromeBrowser } from '../../browsers/chrome';
import { expect } from 'chai';
import { wait } from '../../utils';
import { config } from '../../tests/config';
import { ELEMENTS } from './elements';

let browser;
let driver;


before(async () => {
    browser = new ChromeBrowser({ webdriverPath: config.webDriverPath });
    driver = await browser.init();
    await browser.navigateAndWaitForElement({
        to: config.targetBaseUrl, elementSelector: ELEMENTS.BUTTON_LOGIN_SUBMIT
    });
});


describe("Front end test", function () {
    describe("Basic functionalities", function () {

        it("Should login", async function () {
            let path = null;
            path = await browser.getPath();
            expect(path).to.equal('login');
            const usernameField = await driver.findElement(ELEMENTS.TEXTFIELD_LOGIN_USERNAME);
            await usernameField.sendKeys("developer");
            await wait(500);
            const passwordField = await driver.findElement(ELEMENTS.TEXTFIELD_LOGIN_PASSWORD);
            await passwordField.sendKeys("developer");
            await wait(500);
            const submitButton = await driver.findElement(ELEMENTS.BUTTON_LOGIN_SUBMIT);
            submitButton.click();
            await browser.waitFor({ elementSelector: ELEMENTS.SVG_MAIN_LAYOUT });
            path = await browser.getPath();
            expect(path).not.to.equal('login');
            await wait(1000);

        });

        it("Should change filters", async function () {
            await browser.clickElement(ELEMENTS.CHECKBOX_TEMPERATURES_LAYER);
            await wait(2000);
            await browser.waitFor({ elementSelector: ELEMENTS.CHECKBOX_TEMPERATURES_LAYER });
            await browser.clickElement(ELEMENTS.CHECKBOX_TEMPERATURES_LAYER);
            await wait(2000);
            await browser.clickElement(ELEMENTS.CHECKBOX_TEMPERATURES_LAYER);
        });

        it("Should set night mode", async function () {
            await browser.hoverElement(ELEMENTS.SPEEDDIAL_MENU);
            await browser.waitFor({ elementSelector: ELEMENTS.BUTTON_TOGGLE_NIGHT_MODE });
            await browser.hoverElement(ELEMENTS.BUTTON_TOGGLE_NIGHT_MODE);
            await wait(1000);
            await browser.clickElement(ELEMENTS.BUTTON_TOGGLE_NIGHT_MODE);
            await wait(2000);
            await browser.hoverElement(ELEMENTS.SPEEDDIAL_MENU);
            await browser.waitFor({ elementSelector: ELEMENTS.BUTTON_TOGGLE_NIGHT_MODE });
            await browser.hoverElement(ELEMENTS.BUTTON_TOGGLE_NIGHT_MODE);
            await wait(1000);
            await browser.clickElement(ELEMENTS.BUTTON_TOGGLE_NIGHT_MODE);
        });

        it("Should zoom in and out", async function () {
            await browser.waitFor({ elementSelector: ELEMENTS.SVG_MAIN_LAYOUT });
            let svgBody = await driver.findElement(ELEMENTS.SVG_MAIN_LAYOUT);
            const { height: prevHeight, width: prevWidth } = await svgBody.getRect();
            await browser
                .wheelOnElement({ elementSelector: ELEMENTS.SVG_MAIN_LAYOUT, deltaY: 1, times: 50 });
            // wait for rerender
            await browser.waitFor({ elementSelector: ELEMENTS.SVG_MAIN_LAYOUT });
            svgBody = await driver.findElement(ELEMENTS.SVG_MAIN_LAYOUT);
            const { height, width } = await svgBody.getRect();
            expect(height).to.be.greaterThan(prevHeight);
            expect(width).to.be.greaterThan(prevWidth);
            await wait(2000);
            await browser
                .wheelOnElement({ elementSelector: ELEMENTS.SVG_MAIN_LAYOUT, deltaY: -1, times: 50 });

        });

        it("Should navigate to overview and back ", async function () {
            await browser.hoverElement(ELEMENTS.SPEEDDIAL_MENU);
            await browser.waitFor({ elementSelector: ELEMENTS.BUTTON_OVERVIEW_PAGE });
            await browser.hoverElement(ELEMENTS.BUTTON_OVERVIEW_PAGE);
            await wait(1000);
            await browser.clickElement(ELEMENTS.BUTTON_OVERVIEW_PAGE);
            const path = await browser.getPath();
            expect(path).to.equal('overview');
            await wait(2000);
            await browser.hoverElement(ELEMENTS.SPEEDDIAL_MENU);
            await browser.waitFor({ elementSelector: ELEMENTS.BUTTON_LANDING_PAGE });
            await browser.hoverElement(ELEMENTS.BUTTON_LANDING_PAGE);
            await wait(1000);
            await browser.clickElement(ELEMENTS.BUTTON_LANDING_PAGE);
            await browser.waitFor({ elementSelector: ELEMENTS.SVG_MAIN_LAYOUT });

        });

        it("Should log out", async function () {
            await browser.hoverElement(ELEMENTS.SPEEDDIAL_MENU);
            await browser.waitFor({ elementSelector: ELEMENTS.BUTTON_LOGOUT });
            await browser.hoverElement(ELEMENTS.BUTTON_LOGOUT);
            await wait(1000);
            await browser.clickElement(ELEMENTS.BUTTON_LOGOUT);
            await browser.waitFor({ elementSelector: ELEMENTS.BUTTON_LOGIN_SUBMIT });
            const path = await browser.getPath();
            expect(path).to.equal('login');
        });

        it("Should see error message when trying to log in with wrong cred", async function () {
            let path = null;
            path = await browser.getPath();
            expect(path).to.equal('login');
            const usernameField = await driver.findElement(ELEMENTS.TEXTFIELD_LOGIN_USERNAME);
            await usernameField.sendKeys("wrong username");
            await wait(500);
            const passwordField = await driver.findElement(ELEMENTS.TEXTFIELD_LOGIN_PASSWORD);
            await passwordField.sendKeys("wrong password is also very long");
            await wait(500);
            await browser.clickElement(ELEMENTS.BUTTON_LOGIN_SUBMIT);
            await wait(1000);
            expect(path).to.equal('login');
        });

    });
});

after(async () => {
    setTimeout(() => driver.quit(), 400000);
});
