const project = require('../src/index');

describe('project update tests', () => {
    const main = project.main;

    test('test update project failure cases', async done => {
        const args = {
            __ow_method: "put",
            __ow_headers: {token: "test"}
        };

        expect(await main({})).toEqual({statusCode: 405});
        expect(await main(args)).toEqual({body: {message: "jwt malformed"},
           statusCode: 500});

        args.__ow_headers.token = process.env.USER_TOKEN;
        expect(await main(args)).toEqual({body: {message: "Missing id"},
           statusCode: 400});

        args.id = "1000";
        expect(await main(args)).toEqual({body: {message: "No project updated"},
           statusCode: 404});

        done();
    });

    test('test update project success cases', async done => {
        const args = {
            __ow_method: "put",
            __ow_headers: {token: process.env.USER_TOKEN},
            id: 2,
            name: "update-project",
            description: "update-description"
        };

        const res = await main(args);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("success");

        done();
    });
});
