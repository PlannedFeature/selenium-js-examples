import { By } from 'selenium-webdriver';



export const ELEMENTS = {

    // Login View
    TEXTFIELD_LOGIN_USERNAME: By.id('InputUsername'),
    TEXTFIELD_LOGIN_PASSWORD: By.id('InputPassword'),
    BUTTON_LOGIN_SUBMIT: By.css("button[type='submit']"),

    // Admin View
    SVG_MAIN_LAYOUT: By.css("g#svg_body"),
    CHECKBOX_TEMPERATURES_LAYER: By.id('DropDownTemperatureLayers'),
    SPEEDDIAL_MENU: By.id('SpeedDialMenu'),
    BUTTON_TOGGLE_NIGHT_MODE: By.id('SpeedDialActionDarkmode'),
    BUTTON_LANDING_PAGE: By.id('SpeedDialActionLandingPage'),
    BUTTON_OVERVIEW_PAGE: By.id('SpeedDialActionOverviewPage'),
    BUTTON_LOGOUT: By.id('SpeedDialActionLogOut')
};
