const { Projects} = require('@nimbus/models');
const { authorizeUser} = require('@nimbus/utils');

async function deleteProject(args) {
    const res = await authorizeUser(args.__ow_headers ? args.__ow_headers.token : null);
    let deleted = null;

    if (res.statusCode !== 200) {
        return res;
    }

    if (!args.id) {
        return {
            statusCode: 400,
            body: { message: "Missing id" }
        };
    }

    try {
        deleted = await Projects.destroy({ where: { id: args.id } });
        if (!deleted) {
            return {
                statusCode: 404,
                body: { message: 'Project not found' }
            };
        }
    } catch (e) {
        console.log("Error deleting project: ", e);
        return {
            statusCode: 500,
            body: { message: e.message }
        };
    }

    return {
        statusCode: 200,
        body: { message: 'Deleted project', data: deleted }
    };
}

exports.deleteProject = deleteProject;
