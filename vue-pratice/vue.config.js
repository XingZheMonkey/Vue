const {
    resolve
} = require('path')

module.exports = {
    devServer: {
        port: 8060,
        proxy: {
            '/api': {
                target: "http://localhost:5030/",
                ws: true,
                // changeOrigin为true时，服务端收到的请求头的host是5030
                // changeOrigin为false时，服务端收到的请求头的host是8060（默认为false）
                changOrigin: true,
                // 去除请求前缀，保证交给后台的请求地址是正确的
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },
    // webpack-chain
    chainWebpack(config) {
        config.module.rule('svg')
            .exclude.add(resolve("src/icons"))
            .end();

        config.module.rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    },
    // webpack-merge
    configureWebpack: (config) => {
        const originAlias = config.resolve.alias;
        Object.assign(config, {
            resolve: {
                // 别名配置
                alias: {
                    '@components': resolve(__dirname, './src/components'),
                    '@views': resolve(__dirname, './src/views'),
                    ...originAlias
                }, 
                // 配置省略文件的后缀名
                extensions:['.js','.vue']
            }
        })
    }
}