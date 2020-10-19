const { Users, sequelize } = require('@nimbus/models');
const { authorizeUser } = require('@nimbus/utils');

async function getUser(args) {
    const res = await authorizeUser(args.__ow_headers ? args.__ow_headers.token : null);

    if (res.statusCode !== 200) {
        return res;
    }

    let user = null;

    try {
        user = await Users.findOne({
           where: { email: res.body.email },
           raw: true
        });
    } catch (e) {
        console.log("Error getting user: ", e);
        return {
            statusCode: 500,
            body: { message: e.message }
        };
    }

    if (user) {
        return {
            statusCode: 200,
            body: { message: "success", data: user }
        };
    } else {
        return {
            statusCode: 404,
            body: { message: "No user found" }
        };
    }
}

async function updateUser(args) {
    const res = await authorizeUser(args.__ow_headers ? args.__ow_headers.token : null);

    if (res.statusCode !== 200) {
        return res;
    }

    const transaction = await sequelize.transaction();
    try {
        const updateUserFields = {};
        if (args.name) {
            updateUserFields.name = args.name;
        }

        if (Object.keys(updateUserFields).length === 0 && updateUserFields.constructor === Object) {
            return {
                statusCode: 400,
                body: { message: 'No valid fields for the user to update'}
            };
        }

        await Users.update(updateUserFields,
            { where: { email: res.body.email } },
            { transaction });

        const updatedUser = await Users.findOne({ where: { email: res.body.email } });
        if (!updatedUser) {
            return {
                statusCode: 404,
                body: { message: 'No user updated'}
            };
        }

        await transaction.commit();
        return {
            statusCode: 200,
            body: { message: "success", data: "Updated user: " + res.body.email  }
        };
    } catch (e) {
        await transaction.rollback();
        console.log("Error updating user: ", e);
        return {
            statusCode: 400,
            body: { message: e.message }
        };
    }
}

async function main(args) {
    const method = (args.__ow_method || '').toLowerCase();
    switch (method) {
        case 'get':
            return getUser(args);
        case 'put':
            return updateUser(args);
        default:
            return {
                statusCode: 405
            };
    }
}

exports.main = main;
