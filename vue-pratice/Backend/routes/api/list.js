const route = require('koa-router')
const Mock = require('mockjs')
const listRouter = new route({
    prefix: '/list'
})


function generatorList(num) {
    return Mock.mock({
        [`list|${num}`]: [{
            'id|+1': 1,
            // 模拟标题，标题长度15-20个字符
            title: '@ctitle(15,25)',
            // 模拟图片索引，自然数从1-15
            image: '@natural(0,2)',
            // 模拟访问人数
            reads: '@natural(0,99999)',
            date: '@date("yyyy-MM-dd")'
        }]
    })
}

listRouter.get('/', async ctx => {

    const { num } = ctx.query
    ctx.body = await generatorList(num)
})

module.exports = listRouter;