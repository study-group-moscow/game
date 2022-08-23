import {test} from '@playwright/test';

test('Test login and registration', async ({page}) => {


    await test.step('login', async () => {

        await page.goto('http://localhost:5000/login');

        const login = page.locator('input[name="login"]');
        const password = page.locator('input[name="password"]');
        const checkbox = page.locator('input[type=checkbox]');
        const button = page.locator('id=:r7:');


        await login.fill('qwerty');
        await password.fill('qwertyqwerty');
        await checkbox.check();
        await button.click();

    })


    await test.step('registration', async () => {

        await page.goto('http://localhost:5000/registration');

        const displayName = page.locator('input[name="display_name"]');
        const firstName = page.locator('input[name="first_name"]');
        const secondName = page.locator('input[name="second_name"]');
        const login = page.locator('input[name="login"]');
        const email = page.locator('input[name="email"]');
        const phone = page.locator('input[name="phone"]');
        const password = page.locator('input[name="password"]');
        const checkbox = page.locator('input[type=checkbox]');
        const button = page.locator('text=Регистрация');


        await displayName.fill('qwerty');
        await firstName.fill('qwerty');
        await secondName.fill('qwerty');
        await login.fill('qwerty');
        await email.fill('qwerty@qwerty.ru');
        await phone.fill('7777777777');
        await password.fill('qwertyqwerty');
        await checkbox.check();
        await button.click();

    })

});
