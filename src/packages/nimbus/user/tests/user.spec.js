const user = require('../src/index');

describe('user tests', () => {
     const main = user.main;
     test('test get user cases', async done => {
          const args = {
               __ow_method: "get",
               __ow_headers: { token: "test" }
          };

          expect(await main({})).toEqual({ statusCode: 405 });
          expect(await main(args)).toEqual({
               body: { message: "jwt malformed" },
               statusCode: 500
          });

          args.__ow_headers.token = process.env.ADMIN_TOKEN;

          const res = await main(args);
          expect(res.statusCode).toEqual(200);
          expect(res.body.message).toEqual("success");
          expect(res.body.data.email).toEqual('nikhil@admin.com');
          expect(res.body.data.name).toEqual('nikhil');

          done();
     });
});

describe('user update tests', () => {
     const main = user.main;

     test('test update user failure cases', async done => {
          const args = {
               __ow_method: "put",
               __ow_headers: { token: "test" }
          };

          expect(await main({})).toEqual({ statusCode: 405 });
          expect(await main(args)).toEqual({
               body: { message: "jwt malformed" },
               statusCode: 500
          });

          args.__ow_headers.token = process.env.USER_TOKEN;
          expect(await main(args)).toEqual({
               body: { message: "No valid fields for the user to update" },
               statusCode: 400
          });

          args.name = "test@admin.com";

          expect(await main(args)).toEqual({
               body: { data: "Updated user: nikhil@user.com", message: "success"},
               statusCode: 200
          });

          done();
     });

     test('test update user success cases', async done => {
          const args = {
               __ow_method: "put",
               __ow_headers: { token: process.env.USER_TOKEN },
               name: "update-user",
               description: "update-description"
          };

          const res = await main(args);
          expect(res.statusCode).toEqual(200);
          expect(res.body.message).toEqual("success");

          done();
     });
});
