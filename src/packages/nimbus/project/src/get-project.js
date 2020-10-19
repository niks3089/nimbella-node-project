const { Projects } = require('@nimbus/models');
const { authorizeUser} = require('@nimbus/utils');

async function renderProjects(projects)
{
    const projectList = [];
    for (let project of projects) {
        project = project.get({plain: true});
        projectList.push(project);
    }
    return {
        statusCode: 200,
        body: {message: "success", data: projectList }
    };
}

async function getProject(args) {
    const res = await authorizeUser(args.__ow_headers ? args.__ow_headers.token : null);

    if (res.statusCode !== 200) {
        return res;
    }

    let projects = null;

    try {
        projects = await Projects.findAll({
            where: {user: res.body.email},
            order: [['id', 'DESC']]
        });
    } catch (e) {
        console.log("Error getting projects: ", e);
        return {
            statusCode: 500,
            body: { message: e.message }
        };
    }

    if (projects.length) {
        return await renderProjects(projects);
    } else {
        return {
            statusCode: 204,
            body: { message: "No projects found" }
        };
    }
}

exports.getProject = getProject;
