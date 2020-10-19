const login = require('../src/index');

describe('login tests', () => {
    const main = login.main;
    test('login test', async done => {
        expect(await main({})).toEqual({body: {message: "Missing email or password"}, statusCode: 400});
        expect(await main({email: "nikhil@admin.com", password: "somepassword"}))
            .toEqual({body: {message: "Incorrect email or password"}, statusCode: 401});
        expect(await main({email: "nikhil@admin.com", password: "password"})).statusCode === 200;
        expect(await main({email: "nikhil@user.com", password: "password"})).statusCode === 200;
        done();
    });
});
