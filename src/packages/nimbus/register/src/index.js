const bcrypt = require('bcrypt');
const { Users, sequelize, Sequelize } = require('@nimbus/models');
const { logError } = require('@nimbus/utils');

async function deleteUser(args) {
    if (!args.email) {
        return {
            statusCode: 400,
            body: { message: "Missing email" }
        };
    }
    const transaction = await sequelize.transaction();
    try {
        await Users.destroy({
            where: {
                email: args.email
            }
        }, { transaction });
        await transaction.commit();
        return {
            statusCode: 200,
            body: { message: 'success', data: args.email }
        };
    } catch (e) {
        await transaction.rollback();
        logError("Deletion of user failed: ", e);
        return {
            statusCode: 500,
            body: { message: e.message }
        };
    }
}

async function createUser(args) {
    if (!args.email || !args.name || !args.password) {
        return {
            statusCode: 400,
            body: { message: "Missing email, name or password" }
        };
    }
    const transaction = await sequelize.transaction();
    try {
        await Users.create({
            email: args.email,
            name: args.name,
            password: await bcrypt.hash(args.password, 10),
            role: args.role
        }, { transaction });
        await transaction.commit();
        return {
            statusCode: 201,
            body: { message: 'success', data: args.email }
        };
    } catch (e) {
        await transaction.rollback();
        if (e instanceof Sequelize.UniqueConstraintError) {
            return {
                statusCode: 400,
                body: { message: "Email already registered" }
            };
        }
        return {
            statusCode: 500,
            body: { message: e.message }
        };
    }
}

async function main(args) {
    const method = (args.__ow_method || '').toLowerCase();
    switch (method) {
        case 'post':
            return createUser(args);
        case 'delete':
            return deleteUser(args);
        default:
            return {
                statusCode: 405
            };
    }
}

exports.main = main;
