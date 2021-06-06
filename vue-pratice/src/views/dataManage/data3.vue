<template>
  <div>
    <div class="title">webpack</div>
    <div class="content">
      <h4>1. entry ： 入口起点</h4>
      <pre>
                
        1. String ==>  './src/index.js'
            单入口，打包生成一个chunk，输出一个bundle文件，chunk的默认名是 main
        2. Array ==> ['./src/index.js','./src/add.js']
            多入口，但所有入口最终只会形成一个chunk，输出出去只有一个bundle文件
            没什么大用，只有在HMR功能中可以让html生效
        3. Object
            多入口，此时有几个入口，就会形成几个chunk，输出几个bundle文件，chunk的名称是key
            特殊用法:
                {
                    index:['./src/index.js','./src/news.js'],
                    add:'./src/add.js'
                }
      </pre>

      <h4>2. output ： 出口</h4>
      <pre>

        output:{
            // 文件名称（指定名称和目录）
            filename:js/[name].js,
            // 输出文件资源目录，将来所有资源输出的公共路径
            path:reslove(__dirname,'build'),
            // 所有资源引入公共路径的前缀 ==> 'img/a.jpg'  '/imgs/a.jpg'
            publicPath:'/',
            // 非入口chunk的名称，es6 import引入的文件单独打包
            chunkFilename:js/[name]_chunk.name,
            // 整个库向外暴露的变量名
            library:'[name]',
            // 变量名添加到哪里，默认为全局变量，可选 window global commonjs
            libraryTarget:'window'
        }
      </pre>

      <h4>3. reslove ： 解析模块的规则</h4>
      <pre>

        reslove:{
            // 配置解析模块路径别名：优点简写路径，缺点没有代码提示（vue中的 @component 引入组件）
            alias:{
                $css:reslove(__dirname,'src/css')
            },
            // 配置省略文件的后缀名
            extensions:['.js','.jsx'],
            // 告诉webpack解析模块去哪个目录下找
            modules：[reslove(__dirname,"../../node_modules"),'node_modules']
        }    
      </pre>

      <h4>4. devServer</h4>
      <pre>

        devServer:{
            // 运行代码的目录
            contentBase:reslove(__dirname,'build'),
            // 监视contentBase目录下所有文件，一旦文件变动就会reload
            watchContentbase:true,
            // 监视的配置项
            watchOptions:{
                ignored:/node_modules/
            },
            // 启动gzip压缩
            compress:true,
            // 端口号
            port:5050,
            // 域名
            host:'localhost',
            // 自动打开浏览器
            open:true,
            // 开启HMR功能
            hot:true,
            // 不要显示启动服务器日志信息
            clientLogLevel:'none',
            // 除了一些基本的显示信息外，其他内容不要显示
            quiet:true,
            // 如果出错了，不要全屏显示
            overlay:false,
            // 服务器代理 => 解决开发环境跨域问题
            proxy:{
                '/api'{
                    target:'http://localhost:3000',
                    // 发送请求时将请求路径重写，将 /api/xxx 替换为 /xxx
                    pathRewrite:{
                        '^/api':''
                    }
                }
            }
        }
      </pre>
      <h4>5. optimization</h4>
      <pre>

            optimization:{
                // 代码分割 可以将node_modules中的代码单独打包一个chunk 最终输出，并且自动分析多入口chunk中有没有公共的文件，如果有会打包成单独一个chunk
                splitChunks:{
                    chunks:"all",
                    cacheGroups:{
                         vendor:{
                            // 每个组的名字
                            name:"vendor",
                            // 优先级，优先级越高越先越先检测处理
                            // 第三方模块可能也会被作为 公共模块 来检测处理，通过高优先级达到先被当作第三方模块来检测处理
                            priority:1,
                            // 检测方法，例如：检测模块是否来自 node_modules
                            test:/node_modules/,
                            // 最小尺寸，当模块大小大于30kb打包
                            minSize:30000,
                            // 检测模块被引用了几次
                            // 对于第三方模块引用一次就会单独打包，对于公共模块引用两次以上就应该单独打包
                            minChunks:1
                        },
                        common:{
                            name:"common",
                            priority:0,
                            minChunks:2
                        }
                    }
                },
                // 将当前模块记录其他模块的 hash 单独打包成一个文件 runtime
                // 解决： b文件使用contenthash命名，index文件引入了次文件，通过记录其hash值的方式；此时一旦b文件发生改变，将导致index文件中记录的hash发生改变，由此index文件也要重新打包
                runtimeChunk:{
                    name:entrypoint => `runtime - ${entrypoint.name}`
                },
                minimizer:[
                    // 配置生产环境的压缩方案 ： js 和 css
                    new TerserWebpackPlugin({
                        // 开启缓存
                        cache:true,
                        // 开启多进程打包
                        parallel:true,
                        // 启动source-map
                        sourceMap:true
                    })
                ]
            }
            </pre
      >

      <h3>6. webpack优化配置</h3>
      <h4>6.1 开发环境优化</h4>
      <pre>

            HMR 优化打包构建速度
                HMR ： hot moudle replacement 热模块替换 / 模块热更新
                作用 : 一个模块发生变化，只会重新打包这一个模块（而不是打包所有文件，提升构建速度）

                只能处理非入口文件，开启HMR功能后，css抽离不生效，不支持contenthash，chunkhash

                样式文件：可以使用HMR功能，因为style-loader内部实现了

                js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码 注意：HMR功能只能处理非入口js文件

                devServer:{
                    hot:true
                }
                if(module.hot){
                    // 一旦module.hot为true说明开启了HMR功能
                    module.hot.accept('./print.js',function(){
                        // 该方法会监听 print.js 文件的变化，一旦发生变化，其他默认不会重新打包构建，只会执行下边的回调函数
                        print()
                    })
                }
                html文件：默认不使用HMR功能，同时会导致问题，html文件不能热更新 解决：修改entry入口，将html文件引入

                entry:['./src/js/index.js,'./src/index.html']
            </pre
      >
      <pre>

        source-map 优化代码调试
            source-map : 一种提供源代码到构建后代码映射的技术（如果构建后代码出错了，通过映射可以追踪到源代码错误的位置）
            source-map 外部
            错误代码准确位置 和 源代码的错误位置

            inline-source-map 内联 （只生成一个内联source-map）
            错误代码准确信息 和 源代码的错误位置

            hidden-source-map 外部
            错误代码错误原因 但没有错误位置
            不能追踪源代码错误，只能提示到构建后代码的错误位置

            eval-source-map 内联
            每一个文件都生成对应的source-map，都在eval
            错误代码准确位置以及源代码错误位置

            nosources-source-map 外部
            错误代码准确信息，但是没有源代码信息

            cheap-source-map 外部
            错误代码准确信息 和 源代码的错误位置(只能精确到行)

            cheap-module-source-map 外部
            错误代码准确信息 和 源代码的错误位置

            内联和外部的区别：1.外部生成了新的文件，内部没有 2.内联构建速度更快

            开发环境：速度快，测试更友好

            速度快（eval-> inline -> cheap -> ...）
                eval-cheap-source-map
                eval-source-map

            测试更友好
                source-map
                cheap-module-source-map
                cheap-source-map

            ---> eval-source-map / eval-cheap-module-source-map

            生产环境：源代码要不要隐藏？调试要不要更友好（内联会让代码体积变大，所以生产环境不用内联）
                noresource-source-map
                hidden-source-map

            ---> source-map / cheap-module-source-map
      </pre>
      <h4>6.2 生产环境优化</h4>
      <pre>

        oneof ：webpack原本的loader是将每个文件都过一遍，比如有一个js文件 rules中有10个loader，第一个是处理js文件的loader，当第一个loader处理完成后webpack不会自动跳出
                而是会继续拿着这个js文件去尝试匹配剩下的9个loader，相当于没有break，而oneOf就相当于这个break
        
        enforce ：loader的执行顺序是从下往上的，但是有时候我们想先执行某个loader 就要把它移到最后边这样非常的不方便,enforce的作用是设置loader的优先级
            enforce有以下几个配置项
                pre 优先处理
                normal 正常处理（默认）
                inline 其次处理
                post 最后处理
        
        缓存
            开启babel缓存
            cacheDirectory:true

            文件资源缓存
            hash: 每次webpack构建时都会生成一个唯一的hash值 问题：因为js和css同时使用一个hash值，如果重新打包，会导致所有缓存失效（但却只改了一个文件）
            chunkhash: 根据chunk生成的hash值，如果打包来自于同一个chunk，那么hash值还是一样 问题：js和css的hash值还是一样的，因为css是在js中被引入的，同属于一个chunk
            contenthash：根据文件内容生产hash值，不同文件的hash值一定不一样
                output:{
                    fileName:"js/[name].[contenthash:10].js"
                }
        
        tree shaking
            作用 ：去除无用代码，减少代码体积;  树摇前提：必须使用Es6语法，必须开启 production 环境
        
        code split
            多入口：有一个入口，最终就会输出一个bundle
                entry:{
                    index:"src/js/index.js",
                    test:"src/js/test.js"
                },
                output:{
                    fileName:"js/[name].[contenthash:10].js"
                }
            code split
                可以将node_modules中的代码单独打包一个chunk最终输出，并且自动分析多入口chunk中有没有公共的文件，如果有会打包成单独一个chunk

                例： index.js 引入 jquery，test.js 引入jquery，多入口情况下只会打包出一个jquery
                optimization:{
                    splitChunks:{
                        chunks:"all"
                    }
                }
            通过js代码让某个文件被单独打包成一个chunk（es10 --- import动态导入语法能将某个文件单独打包）
                import ( /* webpackChunkName:'test' */ './test.js')
                    .then(result=>{
                        // 文件加载成功
                        console.log(result)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
        js懒加载和预加载
            js懒加载
            element.addEventListener('click', async () => {
                const module = await import('./api-scripts/button-click.js')
            })
            或者
            element.addEventListener('click',  () => {
                import('./api-scripts/button-click.js')
                    .then(result=>{
                        console.log(result)
                    })
            })

            js预加载
            element.addEventListener('click',  () => {
                import( /* webpackChunkName:'test' , webpackPrefetch:true */  './test.js')
                    .then(result=>{
                        console.log(result)
                    })
            })
            正常加载可以认为是并行加载，同一时间加载多个文件
            预加载 prefetch 是等其他资源加载完毕，浏览器空闲了，再偷偷加载其他资源
            懒加载 只有需求时才会加载

        externals
            module.exports = {
                //...
                externals: {
                    jquery: 'jQuery' 
                    //将需要忽略打包的都写在这个里面，但前提是index.html文件里面必须script引入
                }
            };
    </pre>
    </div>
  </div>
</template>
<script>
export default {
  name: "data3",
};
</script>

<style lang="less" scoped>
.title {
  font-size: 26px;
  font-weight: bold;
  padding: 24px 0 0 24px;
}
.content {
  padding: 0 0 0 24px;
}
</style>