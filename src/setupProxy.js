const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: 'https://ft.survivalapp.com',
      changeOrigin: true
    })
  );
};
