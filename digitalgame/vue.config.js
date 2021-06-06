module.exports={
    devServer:{
        host:'localhost',
        port: 8090,
        proxy: {
            '/api':{
                target:"http://localhost:7090/api/",
                ws:true,
                changOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
         },
        // proxy: {
        //     '/api':{
        //         target:"http://localhost:8088/",
        //         ws:true,
        //         changOrigin:true,
        //         pathRewrite:{
        //             '^/api':''
        //         }
        //     }
        //  },
    }
}