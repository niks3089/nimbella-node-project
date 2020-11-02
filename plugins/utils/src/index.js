const jwt = require('jsonwebtoken');
const axios = require('axios');
const {Users} = require('@nimbus/models');

function logError(...error) {
    if (process.env.NODE_ENV !== 'test') {
        console.log(error);
    }
}

async function authorizeUser(token, isAdmin)
{
    if (!token) {
        return {
            statusCode: 400,
            body: { message: "Missing token" }
        };
    }
    if (token === "native_client") {
        return {
            statusCode: 200,
            body: "success"
        };
    }
    try {
        const {email, role} = jwt.verify(token, process.env.JWT_SECRET,
            {audience: process.env.API_BASE_URL});
        if (!email || !role) {
            return {
                statusCode: 401,
                body: { message: "Failed to verify jwt" }
            };
        }
        const account = await Users.findOne({
            where: {email: email}
        });
        if (!account) {
            return {
                statusCode: 401,
                body: { message: "Invalid token" }
            };
        }
        if (isAdmin === true && role !== "admin") {
            return {
                statusCode: 401,
                body: { message: "Unauthorized user" }
            };
        }
        return {
            statusCode: 200,
            body: {email, role}
        };
    } catch (e) {
        logError(e);
        return {
            statusCode: 500,
            body: { message: e.message }
        };
    }
}

async function postToNimbusFunction(fn, args)
{
    const {
        __OW_API_HOST: api_host,
        __OW_API_KEY: api_key
    } = process.env;

    let messagingClientHeaders = {
        'content-type': 'application/json'
    };

    const __ow_headers = messagingClientHeaders;

    const body = Object.assign({
    __ow_headers,
    __ow_method: 'post',
    __ow_path: ''
    }, args);
    const url = `${api_host}/api/v1/namespaces/_/actions/nimbus/${fn}`;
    const secret = api_key.split(":");
    return axios.post(url, body, {
        headers: __ow_headers,
        auth: { username: secret[0], password: secret[1] }
    });
}

module.exports.authorizeUser = authorizeUser;
module.exports.postToNimbusFunction = postToNimbusFunction;
module.exports.logError = logError;
