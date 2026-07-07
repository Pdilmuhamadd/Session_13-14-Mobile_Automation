import { expect } from '@wdio/globals';
import homeAction from '../actions/home.action';
import loginAction from '../actions/login.action';
import credentials from '../test_data/credentials';
import appHelper from '../../utils/app.helper';

describe('Home Page', () => {
    beforeEach(async () => {
        await appHelper.launch();
    });

    afterEach(async () => {
        await appHelper.close();
    });

    it('verify homepage, scroll down/up, filter and logout', async () => {
        const isLoginPage = await loginAction.isOnLoginPage();
        await expect(isLoginPage).toBe(true);

        // Login
        await loginAction.login(credentials.standard_user.username, credentials.standard_user.password);
        await loginAction.waitForProducts();

        await homeAction.verifyHomePage();

        // Scroll down dan up
        await homeAction.scroll('down');
        await homeAction.scroll('up');

        // Sorting
        await homeAction.tapModalSelectorButton();

        const firstPrice = await homeAction.getFirstPrice();
        await expect(firstPrice).toBe('$15.99');

        // Logout
        await homeAction.tapBurgerMenuButton();
        await homeAction.tapLogoutButton();

        // Assert back to login
        const isBackToLogin = await loginAction.isOnLoginPage();
        await expect(isBackToLogin).toBe(true);
        await driver.pause(2000);
    });
});