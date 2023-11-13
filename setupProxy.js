const {createProxyMiddleware} = require('http-proxy-middleware')
module.exports = function(app) {
    app.use(
        '/users',
        createProxyMiddleware({
            // target:'http://localhost:8080/',
            target:'https://jsonplaceholder.typicode.com/posts',
            changeOrigin:true,
        })
    )
}