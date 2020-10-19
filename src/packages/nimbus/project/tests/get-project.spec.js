const project = require('../src/index');

describe('project get tests', () => {
    const main = project.main;

    test('test get project cases', async done => {
        const args = {
            __ow_method: "get",
            __ow_headers: {token: "test"}
        };

        expect(await main({})).toEqual({statusCode: 405});
        expect(await main(args)).toEqual({body: {message: "jwt malformed"},
           statusCode: 500});

        args.__ow_headers.token = process.env.ADMIN_TOKEN;

        const res = await main(args);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("success");
        expect(res.body.data.length).toEqual(10);

        done();
    });

});
