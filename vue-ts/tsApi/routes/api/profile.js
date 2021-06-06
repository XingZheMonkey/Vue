const Router = require("koa-router")
const profile = require("../../schema/profile")


const profileRouter = new Router({
    prefix: "/profile"
})

profileRouter.post("/", async ctx => {
    const newProfile = new profile({
        courseName: ctx.request.body.courseName,
        courseLevel: ctx.request.body.courseLevel,
        type: ctx.request.body.type,
        count: ctx.request.body.count,
        date: ctx.request.body.date
    })

    await newProfile.save().then(res => {
        ctx.body = {
            msg:"创建成功",
            success:true
        };
    })
})


// 查询数据接口
profileRouter.get("/profileInfo/:page/:size", async ctx => {
    const findResult = await profile.find().skip(Number(ctx.params.page)).limit(Number(ctx.params.size))

    const count = await profile.find().count();
    const result = {
        list: findResult,
        total: count
    }

    ctx.body = result;

})

// 筛选数据接口
profileRouter.get("/searchData/:searchVal/:page/:size", async ctx => {
    // 模糊查询
    const findResult = await profile.find({
        courseName: {
            $regex: ctx.params.searchVal,
            $options: 'i'
        }
    }).limit(Number(ctx.params.size)).skip(Number(ctx.params.page));

    const total = await profile.find({
        courseName: {
            $regex: ctx.params.searchVal,
            $options: 'i'
        }
    }).count();

    const result = {
        list: findResult,
        total
    }
    ctx.body = result;
})

// 修改数据接口

profileRouter.post("/editData/:id", async ctx => {
    const newProfile = {}

    if (ctx.request.body.courseName) newProfile.courseName = ctx.request.body.courseName
    if (ctx.request.body.courseLevel) newProfile.courseLevel = ctx.request.body.courseLevel
    if (ctx.request.body.count) newProfile.count = ctx.request.body.count
    if (ctx.request.body.type) newProfile.type = ctx.request.body.type
    if (ctx.request.body.date) newProfile.date = ctx.request.body.date

    await profile.findOneAndUpdate({
            _id: ctx.params.id
        }, {
            $set: newProfile
        })
        .then(() => {
            ctx.body = {
                msg:"修改成功",
                success:true
            }
        })
        .catch(() => {
            ctx.body = {
                msg:"修改失败",
                success:false
            }
        })
})


// 删除数据接口

profileRouter.post("/deleteData/:id", async ctx => {
    
    await profile.findOneAndDelete({_id:ctx.params.id})
                 .then(()=>{
                     ctx.body={
                         msg:"删除成功",
                         success:true
                     }
                 })
                 .catch(()=>{
                    ctx.body = {
                        msg:"删除失败",
                        success:false
                    }
                 })
})

module.exports = profileRouter;