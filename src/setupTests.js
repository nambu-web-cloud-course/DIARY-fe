const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/todos', {
      target: 'http://localhost:3000',
      changeOrigin: true,
    }),
  );
};