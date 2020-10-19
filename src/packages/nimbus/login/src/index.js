const {Users} = require('@nimbus/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function main(args) {
    if (!args.email || !args.password) {
        return {
            statusCode: 400,
            body: { message: "Missing email or password" }
        };
    }
    try {
        const account = await Users.findOne({
            where: {email: args.email}
        });
        const result = account ? await bcrypt.compare(args.password, account.password) : false;
        if (!result) {
            return {
                statusCode: 401,
                body: { message: "Incorrect email or password" }
            };
        }
        const token = jwt.sign(
            {
              email: account.email,
              role: account.role
            },
            process.env.JWT_SECRET,
            {
              audience: process.env.API_BASE_URL
            }
        );
        return {
            statusCode: 200,
            body: { message: "success", data: token}
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            body: { message: e.message }
        };
    }
}

exports.main = main;
