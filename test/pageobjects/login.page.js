export class LoginPage {
    get loginButton() {
        return '~test-LOGIN';
    }

    get productsTitle() {
        return 'android=new UiSelector().text("PRODUCTS")'
    }

    get usernameInput() {
        return 'android.widget.EditText'
    }
}

export default new LoginPage()