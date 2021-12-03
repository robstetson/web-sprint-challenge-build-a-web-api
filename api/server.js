const express = require('express');
const server = express();

const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

server.use(express.json())

server.use('/api/projects', projectsRouter) 
server.use('/api/actions', actionsRouter)

module.exports = server;
