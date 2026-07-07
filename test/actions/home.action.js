import homePage from '../pageobjects/home.page'; 

class HomeAction {
    async verifyHomePage() {
        const burgerMenu = await $(homePage.burgerMenuButton);
        const cartBtn = await $(homePage.cartButton);
        await burgerMenu.isDisplayed();
        await cartBtn.isDisplayed();
    }

    async tapFilterButton() {
         const element = await $(homePage.filterButton);
         await element.waitForDisplayed();
         await element.click();
    }

    async tapCartButton() {
        const element = await $(homePage.cartButton);
        await element.waitForDisplayed();
        await element.click();
    }

    async scroll(direction = 'down') {
        const { height, width } = await driver.getWindowSize();
        const startY = direction === 'down' ? height * 0.8 : height * 0.2;
        const endY = direction === 'down' ? height * 0.2 : height * 0.8;

        await driver.performActions([
            {
                type: 'pointer',
                id: 'pointer1',
                actions: [
                    { type: 'pointerMove', x: width / 2, y: startY, duration: 100 },
                    { type: 'pointerDown', duration: 100 },
                    { type: 'pointerMove', x: width / 2, y: endY, duration: 500 },
                    { type: 'pointerUp', duration: 100 }
                ]
            }
        ]);
    }

    async scrollToElement(selector, maxSwipes = 10) {
        for (let i = 0; i < maxSwipes; i++) {
            const element = await $(selector);
            const isDisplayed = await element.isDisplayed();
            if (isDisplayed) return true;

            await this.scroll('up');
        }
        return false;
    }

    async tapModalSelectorButton() {
        const element = await $(homePage.modalSelectorButton);
        await element.waitForDisplayed();
        await element.click();
        
        const lowToHigh = await $(homePage.selectLowToHigh);
        await lowToHigh.waitForDisplayed();
        await lowToHigh.click();
    }

    async getFirstPrice() {
        const price = await $(homePage.firstProductPrice);
        await price.waitForDisplayed();
        return price.getText();
    }

    async tapBurgerMenuButton() {
        const element = await $(homePage.burgerMenuButton);
        await element.waitForDisplayed();
        await element.click();
    }

    async tapLogoutButton() {
        const element = await $(homePage.logoutButton);
        await element.waitForDisplayed();
        await element.click();
    }
}

export default new HomeAction();