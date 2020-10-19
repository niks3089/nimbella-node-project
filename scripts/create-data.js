require('dotenv').config();
const axios = require('axios');
const randomSentence = require('random-sentence');
const server = require('../test/app');
const app = server.listen();
const userList = [];
const loginTokens = [];
let adminToken = null;

// eslint-disable-next-line consistent-return
async function login(user) {
    try {
        const res = await axios.post(process.env.API_BASE_URL + "/nimbus/login",
            user, { headers: {'content-type': 'application/json'}});
        return res.data.data;
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

async function createLoginTokens() {
    for (const user of userList) {
        loginTokens.push(await login(user));
    }
}

async function registerUser(user)
{
    try {
        await axios.post(process.env.API_BASE_URL + "/nimbus/register",
            user, { headers: {'content-type': 'application/json'}});
    } catch (e) {
        console.log(e.message);
        app.close();
        process.exit(1);
    }
}

async function createUsers(count)
{
    let user = {};
    for (let i = 0; i < count; i++) {
        user = {};
        user.email = randomSentence({words: 1});
        user.name = randomSentence({words: 1});
        user.password = randomSentence({words: 1});
        userList.push(user);
        await registerUser(user);
    }
    console.log("Created users successfully");
}

async function createAdminProjects(count) {
    return createProjects(count, adminToken);
}

async function createProjects(count, token) {
    let short = {};

    try {
        for (let i = 0; i < count; i++) {
            short = {};
            short.name = randomSentence({words: 1});
            short.description = randomSentence({words: 40}).substring(0, 500);
            try {
                await axios.post(process.env.API_BASE_URL + "/nimbus/project",
                    short, { headers: {'content-type': 'application/json',
                    __ow_headers: JSON.stringify({token: token ? token : loginTokens[i]})}});
            } catch (e) {
                console.log(e.message);
                app.close();
                process.exit(1);
            }
        }
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
    console.log("Created projects successfully");
}

async function main(count) {
    await registerUser({email: "nikhil@admin.com", name: "nikhil", password: "password", role: "admin"});
    await registerUser({email: "nikhil@user.com", name: "nikhil", password: "password"});
    adminToken = await login({email: "nikhil@admin.com", password: "password"});
    await createUsers(count);
    await createLoginTokens();
    await createProjects(count);
    await createAdminProjects(10);
    process.exit(0);
}

let count = 150;
const args = process.argv.slice(2);
if (args.length > 0) {
    count = args[0];
}
main(count);
