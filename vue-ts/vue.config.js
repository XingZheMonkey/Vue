module.exports = {
    devServer: {
     open: false,
     host:'localhost',
     port: 8080,
     https: false,
     hotOnly: false,
     proxy: {
        //  跨域
        '/api':{
            target:"http://localhost:5080/",
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