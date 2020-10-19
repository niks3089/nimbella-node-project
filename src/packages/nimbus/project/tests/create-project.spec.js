const project = require('../src/index');

describe('project create tests', () => {
    const main = project.main;

    test('test create project failure cases', async done => {
        const args = {
            __ow_method: "post",
            __ow_headers: {token: "test"}
        };

        expect(await main({})).toEqual({statusCode: 405});
        expect(await main(args)).toEqual({body: {message: "jwt malformed"},
           statusCode: 500});

        args.__ow_headers.token = process.env.USER_TOKEN;
        expect(await main(args)).toEqual({body: {message: "Missing name or description"},
           statusCode: 400});

        done();
    });

    test('test create project success cases', async done => {
        const args = {
            __ow_method: "post",
            __ow_headers: {token: process.env.USER_TOKEN},
            name: "new-project",
            description: "new-description"
        };

        const res = await main(args);
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual("success");

        done();
    });
});
