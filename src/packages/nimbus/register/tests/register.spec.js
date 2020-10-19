const register = require('../src/index');

describe('register tests', () => {
    const main = register.main;
    test('register user', async done => {
        expect(await main({})).toEqual({statusCode: 405});
        expect(await main({__ow_method: "post"})).toEqual(
             {body: {message: "Missing email, name or password"}, statusCode: 400});
        expect(await main({email: "nikhilnew@admin.com", password: "password",
             name: "newadmin", role: "test", __ow_method: "post"}))
             .toEqual({body: {message: "Validation error: Unknown role: `test`"}, statusCode: 500});
        expect(await main({email: "nikhilnew@admin.com", password: "password",
             name: "newadmin", role: "admin", __ow_method: "post"}))
             .toEqual({body: {message: "success", data: "nikhilnew@admin.com"}, statusCode: 201});
        expect(await main({email: "nikhilnew@editor.com", password: "password",
             name: "newadmin", role: "editor", __ow_method: "post"}))
             .toEqual({body: {message: "Validation error: Unknown role: `editor`"}, statusCode: 500});
        expect(await main({email: "nikhilnew@editor.com", password: "password",
             name: "newadmin", role: "user", __ow_method: "post"}))
             .toEqual({body: {message: "success", data: "nikhilnew@editor.com"}, statusCode: 201});
        expect(await main({email: "nikhilnew@editor.com", password: "password",
             name: "newadmin", role: "user", __ow_method: "post"}))
             .toEqual({body: {message: "Email already registered"}, statusCode: 400});
        done();
    });

    test('de-register user', async done => {
        expect(await main({__ow_method: "delete"})).toEqual(
             {body: {message: "Missing email"}, statusCode: 400});
        expect(await main({email: "nikhilnew@admin.com", __ow_method: "delete"}))
             .toEqual({body: {message: "success", data: "nikhilnew@admin.com"}, statusCode: 200});
        expect(await main({email: "nikhilnew@editor.com", __ow_method: "delete"}))
             .toEqual({body: {message: "success", data: "nikhilnew@editor.com"}, statusCode: 200});
        expect(await main({email: "nikhilnew@editor.com", __ow_method: "delete"}))
             .toEqual({body: {message: "success", data: "nikhilnew@editor.com"}, statusCode: 200});
        done();
    });
});
