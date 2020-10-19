const { Projects, sequelize } = require('@nimbus/models');
const { authorizeUser, logError } = require('@nimbus/utils');

async function createProject(args) {
    const res = await authorizeUser(args.__ow_headers ? args.__ow_headers.token : null);

    if (res.statusCode !== 200) {
        return res;
    }

    if (!args.name || !args.description) {
        return {
            statusCode: 400,
            body: { message: "Missing name or description" }
        };
    }

    const transaction = await sequelize.transaction();
    try {
        const project = await Projects.create({
            name: args.name,
            description: args.description,
            user: res.body.email
        }, { transaction });

        await transaction.commit();
        return {
            statusCode: 201,
            body: {
                message: 'success',
                data: {
                    id: project.id
                }
            }
        };
    } catch (e) {
        await transaction.rollback();
        logError("Error adding a project: ", e);
        return {
            statusCode: 400,
            body: { message: e.message }
        };
    }
}

exports.createProject = createProject;
