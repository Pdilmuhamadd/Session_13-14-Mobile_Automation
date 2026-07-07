import { expect } from '@wdio/globals'
import loginAction from '../actions/login.action'
import appHelper from '../../utils/app.helper'
import credentials from '../test_data/credentials'

describe('Swag Labs App', () => {
    beforeEach(async () => {
        await appHelper.launch()
    })

    afterEach(async function() {
        if (this.currentTest?.state === "failed") {
            await driver.takeScreenshot()
            await driver.saveScreenshot(`./reports/screenshots/${this.currentTest.title}.png`)
        }
        await appHelper.close() 
    })

    after(async () => {
        await appHelper.close()
    })

    // Successful login test case
    it('should launch app and verify login page', async () => {
        const isLoginPage = await loginAction.isOnLoginPage()
        await expect(isLoginPage).toBe(true)
        await loginAction.login(credentials.standard_user.username, credentials.standard_user.password)
        const isProductsVisible = await loginAction.waitForProducts()
        await expect(isProductsVisible).toBe(true)
        await driver.pause(2000)
    })

    // Failed login test case
    it('should show error when login with locked out user', async () => {
        const isLoginPage = await loginAction.isOnLoginPage()
        await expect(isLoginPage).toBe(true)

        await loginAction.login(credentials.locked_user.username, credentials.locked_user.password)
        const errorContainer = await $('android=new UiSelector().textContains("Sorry, this user has been locked out")')
        await errorContainer.waitForDisplayed({ timeout: 5000 })

        const errorText = await errorContainer.getText()
        await expect(errorText).toContain('Sorry, this user has been locked out.')
        await driver.pause(2000)
    })
})