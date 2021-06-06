module.exports = {
    baseUrl: '/',
    outputDir: 'dist',
    lintOnSave: true,
    chainWebpack: () => {},
    configureWebpack: () => {},
    productionSourceMap: true,
    css: {
     extract: true,
     sourceMap: false,
     loaderOptions: {},
     modules: false
    },
    parallel: require('os').cpus().length > 1,
    pwa: {},
    devServer: {
     open: true,
     host:'localhost',
     port: 8080,
     https: false,
     hotOnly: false,
     proxy: {
        '/api':{
            target:"http://localhost:5000/api/",
            ws:true,
            changOrigin:true,
            pathRewrite:{
                '^/api':''
            }
        }
     },
     before: app => {}
    }
}