const route = require("koa-router")
const knowSchema = require("../../schema/knowledge")


const knowRoute = new route({
    prefix: "/know"
})

knowRoute.get('/', async ctx => {
    const result = await knowSchema.find()
    ctx.body = {
        type: 'success',
        msg: result
    }
})

knowRoute.post('/add', async ctx => {
    const knowData = new knowSchema({
        updateTime: ctx.request.body.updateTime,
        updateContent: ctx.request.body.updateContent
    })

    await knowData.save()
        .then(() => {
            ctx.body = {
                type: 'success',
                msg: '添加成功'
            }
        })
        .catch(err => {
            ctx.body = {
                msg: err,
                type: 'fail'
            }
        })
})

module.exports = knowRoute