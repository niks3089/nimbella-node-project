require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, DELETE, POST, PUT, HEAD, PATCH");
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept, User-Agent");
  next();
});

const owReqData = {
  __OW_API_HOST: 'http://localhost:3000',
  __OW_API_KEY: "nimbus:project",
  __OW_NAMESPACE: 'local',
  __OW_ACTION_NAME: '/local/nimbus/unnamed',
  __OW_ACTIVATION_ID: 'deadbeef',
  __OW_DEADLINE: ''
};

function updateEnv(newEnvs = {}) {
  Object.assign(process.env, owReqData, newEnvs);
}

const login = require('../src/packages/nimbus/login/src/index').main;
const register = require('../src/packages/nimbus/register/src/index').main;
const project = require('../src/packages/nimbus/project/src/index').main;
const user = require('../src/packages/nimbus/user/src/index').main;

app.post('/api/v1/web/local/nimbus/login', async(req, res) => {
  updateEnv({
    __OW_ACTION_NAME: '/local/nimbus/login'
  });
  const actionResponse = await login(req.body);
  res.status(actionResponse.statusCode).send(actionResponse.body);
});

app.post('/api/v1/web/local/nimbus/register', async(req, res) => {
  updateEnv({
    __OW_ACTION_NAME: '/local/nimbus/register'
  });
  req.body.__ow_method = 'post';
  const actionResponse = await register(req.body);
  res.status(actionResponse.statusCode).send(actionResponse.body);
});

app.delete('/api/v1/web/local/nimbus/register', async(req, res) => {
  updateEnv({
    __ow_method: 'delete',
    __OW_ACTION_NAME: '/local/nimbus/register'
  });
  req.body.__ow_method = 'delete';
  const actionResponse = await register(req.body);
  res.status(actionResponse.statusCode).send(actionResponse.body);
});

app.get('/api/v1/web/local/nimbus/project', async(req, res) => {
  updateEnv({
    __ow_method: 'get',
    __OW_ACTION_NAME: '/local/nimbus/project'
  });
  req.body.__ow_method = 'get';
  const actionResponse = await project(Object.assign(req.body,
    {__ow_headers: JSON.parse(req.headers.__ow_headers)}));
  res.status(actionResponse.statusCode).send(actionResponse.body);
});

app.post('/api/v1/web/local/nimbus/project', async(req, res) => {
  updateEnv({
    __ow_method: 'post',
    __OW_ACTION_NAME: '/local/nimbus/project'
  });
  req.body.__ow_method = 'post';
  const actionResponse = await project(Object.assign(req.body,
    {__ow_headers: JSON.parse(req.headers.__ow_headers)}));
  res.status(actionResponse.statusCode).send(actionResponse.body);
});

app.put('/api/v1/web/local/nimbus/project', async(req, res) => {
  updateEnv({
    __ow_method: 'put',
    __OW_ACTION_NAME: '/local/nimbus/project'
  });
  req.body.__ow_method = 'put';
  const actionResponse = await project(Object.assign(req.body,
    {__ow_headers: JSON.parse(req.headers.__ow_headers)}));
  res.status(actionResponse.statusCode).send(actionResponse.body);
});

app.delete('/api/v1/web/local/nimbus/project', async(req, res) => {
  updateEnv({
    __ow_method: 'delete',
    __OW_ACTION_NAME: '/local/nimbus/project'
  });
  req.body.__ow_method = 'delete';
  const actionResponse = await project(Object.assign(req.body,
    {__ow_headers: JSON.parse(req.headers.__ow_headers)}));
  res.status(actionResponse.statusCode).send(actionResponse.body);
});

app.get('/api/v1/web/local/nimbus/users', async(req, res) => {
  updateEnv({
    __ow_method: 'get',
    __OW_ACTION_NAME: '/local/nimbus/user'
  });
  req.body.__ow_method = 'get';
  const actionResponse = await user(Object.assign(req.body,
    {__ow_headers: JSON.parse(req.headers.__ow_headers)}));
  res.status(actionResponse.statusCode).send(actionResponse.body);
});

app.put('/api/v1/web/local/nimbus/user', async(req, res) => {
  updateEnv({
    __ow_method: 'put',
    __OW_ACTION_NAME: '/local/nimbus/user'
  });
  req.body.__ow_method = 'put';
  const actionResponse = await user(Object.assign(req.body,
    {__ow_headers: JSON.parse(req.headers.__ow_headers)}));
  res.status(actionResponse.statusCode).send(actionResponse.body);
});

module.exports = app;
