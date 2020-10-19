const { getProject } = require('./get-project');
const { createProject } = require('./create-project');
const { updateProject } = require('./update-project');
const { deleteProject } = require('./delete-project');

async function main(args) {
    const method = (args.__ow_method || '').toLowerCase();
    switch (method) {
        case 'get':
            return getProject(args);
        case 'post':
            return createProject(args);
        case 'put':
            return updateProject(args);
        case 'delete':
            return deleteProject(args);
        default:
            return {
                statusCode: 405
            };
    }
}

exports.main = main;
