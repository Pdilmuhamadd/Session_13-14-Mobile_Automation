class AppHelper {
    async launch(){
        await driver.executeScript('mobile: activateApp', [{ appId: 'com.swaglabsmobileapp' }]);
    }

    async close() {
        await driver.executeScript('mobile: terminateApp', [{ appId: 'com.swaglabsmobileapp' }]);
    }
}

export default new AppHelper();