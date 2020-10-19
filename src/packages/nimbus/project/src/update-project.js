const { Projects, sequelize } = require('@nimbus/models');
const { authorizeUser} = require('@nimbus/utils');

async function updateProject(args) {
    const res = await authorizeUser(args.__ow_headers ? args.__ow_headers.token : null);

    if (res.statusCode !== 200) {
        return res;
    }

    if (!args.id) {
        return {
            statusCode: 400,
            body: { message: "Missing id" }
        };
    }

    const transaction = await sequelize.transaction();
    try {
        const project = await Projects.update(args,
            { where: { id: args.id } },
            { transaction });

        const updatedProject = await Projects.findOne({ where: { id: args.id } });
        if (!updatedProject) {
            return {
                statusCode: 404,
                body: { message: 'No project updated'}
            };
        }

        await transaction.commit();
        if (!project || !project[0]) {
            return {
                statusCode: 404,
                body: { message: 'No project updated'}
            };
        }
        return {
            statusCode: 200,
            body: { message: "success", data: args.id  }
        };
    } catch (e) {
        await transaction.rollback();
        console.log("Error updating project: ", e);
        return {
            statusCode: 400,
            body: { message: e.message }
        };
    }
}

exports.updateProject = updateProject;
