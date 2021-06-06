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
     open: false,
     host:'localhost',
     port: 8080,
     https: false,
     hotOnly: false,
     proxy: {
        //  跨域
        '/api':{
            target:"http://localhost:7080/api/",
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