const express = require('express');

const postsRouter = require('./routers/posts-router');
const commentsRouter = require('./routers/comments-router');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);
server.use('/api/posts', commentsRouter);

module.exports = server;