module.exports={
    devServer:{
        host:'0.0.0.0',
        port: 8060,
        proxy: {
            '/api':{
                target:"https://quark.sm.cn/api/",
                ws:true,
                changOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
         },
    }
}