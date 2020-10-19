const project = require('../src/index');

describe('project Delete tests', () => {
    const main = project.main;

    test('test delete project cases', async done => {
        const args = {
            __ow_method: "delete",
            __ow_headers: { token: "test" }
        };

        expect(await main({})).toEqual({ statusCode: 405 });
        expect(await main(args)).toEqual({
            body: { message: "jwt malformed" },
            statusCode: 500
        });

        args.__ow_headers.token = process.env.USER_TOKEN;
        expect(await main(args)).toEqual({
            body: { message: "Missing id" },
            statusCode: 400
        });

        args.id = 10000;
        expect(await main(args)).toEqual({
            body: { message: "Project not found" },
            statusCode: 404
        });

        args.id = 1;
        const res = await main(args);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("Deleted project");

        done();
    });
});
