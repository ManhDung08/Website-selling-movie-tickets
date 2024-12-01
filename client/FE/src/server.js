// server.js
const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Khởi động server ở cổng 4000
server.listen(4000, () => {
  console.log('JSON Server is running on http://localhost:4000');
});
