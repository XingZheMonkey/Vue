const Router = require("koa-router")
const userSchema = require("../../schema/user")
const tools = require("../../config/tools")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const passport = require("koa-passport")
const nodemailer = require("nodemailer")
const fs = require("fs")
const path = require("path")

const userRouter = new Router({
    prefix: "/user"
});


userRouter.get("/", (ctx) => {
    ctx.body = "测试接口";
})

// 登录接口
userRouter.post("/login", async ctx => {
    const name = ctx.request.body.name;
    const password = ctx.request.body.password;

    const findResult = await userSchema.findOne({
        name: name
    });

    if (!findResult) {
        ctx.status = 404;
        ctx.body = {
            msg: "用户不存在"
        }
    } else {
        var result = await bcrypt.compareSync(password, findResult.password);
        if (result) {
            const rule = {
                id: findResult._id,
                name: findResult.name,
                autoLogin: findResult.autoLogin,
                key: findResult.key
            }
            var token = jwt.sign(rule, "secret", {
                expiresIn: 36000
            });
            ctx.status = 200;
            ctx.body = {
                success: true,
                token: "Bearer " + token
            }
        } else {
            ctx.status = 400;
            ctx.body = {
                msg: "密码错误"
            }
        }
    }
})


// 注册接口
userRouter.post("/register", async ctx => {

    const findResult = await userSchema.findOne({
        name: ctx.request.body.name
    });

    if (findResult) {
        ctx.status = 500;
        ctx.body = {
            msg: "用户已存在"
        };
    } else {
        const newUser = new userSchema({
            name: ctx.request.body.name,
            password: tools.enbcrypt(ctx.request.body.password),
            key: ctx.request.body.key,
            role: ctx.request.body.role,
            des: ctx.request.body.des
        })

        await newUser.save()
            .then(() => {
                ctx.body = {
                    msg: "添加用户成功",
                    success: true
                };
            })
            .catch(err => {
                ctx.body = err;
            })
    }
})

// 修改密码接口
userRouter.post("/changePassword", async ctx => {
    await userSchema.findOneAndUpdate({
        name: ctx.request.body.name
    }, {
        $set: {
            password: tools.enbcrypt(ctx.request.body.password)
        }
    }).then((res) => {
        if (res) {
            ctx.body = {
                success: true,
                msg: "密码修改成功"
            }
        } else {
            ctx.body = {
                success: false,
                msg: "用户不存在"
            }
        }

    })
})


// 找回密码接口
userRouter.post("/findPassword", async ctx => {
    const findResult = await userSchema.findOne({
        name: ctx.request.body.name
    });

    if (findResult) {

        // 配置服务
        let transporter = nodemailer.createTransport({
            host: 'smtp.qq.com', // service: 'qq',
            port: 465,
            secure: true,
            auth: {
                user: '1559198728@qq.com',
                pass: 'proeaxiycnctiibe' // 申请的smtp授权码
            }
        })

        // 配置参数
        let mailOptions = {
            from: '1559198728@qq.com',
            to: ctx.request.body.email,
            subject: '密码找回',
            // text: `您的账号是${findResult.name},密码是: ${findResult.password}`
            html: fs.createReadStream(path.resolve(__dirname, "drip.html"))
        }

        // 发送邮件
        const sendResult = await transporter.sendMail(mailOptions);

        if (sendResult) {
            ctx.body = {
                msg: `密码已发送至您的${ctx.request.body.email}邮箱`
            }
        } else {
            ctx.body = {
                msg: "发送失败"
            }
        }
    } else {
        ctx.status = 400;
        ctx.body = {
            msg: "用户不存在"
        };
    }
})

// 获取用户信息接口
userRouter.get("/info", passport.authenticate('jwt', {
    session: false
}), async ctx => {
    ctx.body = {
        id: ctx.state.user.id,
        name: ctx.state.user.name,
        autoLogin: ctx.state.user.autoLogin,
        key: ctx.state.user.key
    }
})


// 获取所有用户信息 
userRouter.get("/allUser", async ctx => {
    const findResult = await userSchema.find();

    ctx.body = findResult;
})


// 修改用户信息接口
userRouter.post("/editUser/:id", async ctx => {
    const newUser = {}
    if (ctx.request.body.name) newUser.name = ctx.request.body.name
    if (ctx.request.body.key) newUser.key = ctx.request.body.key
    if (ctx.request.body.role) newUser.role = ctx.request.body.role
    if (ctx.request.body.des) newUser.des = ctx.request.body.des

    await userSchema.findOneAndUpdate({
            _id: ctx.request.body.id
        }, {
            $set: newUser
        })
        .then(() => {
            ctx.body = {
                msg: "编辑用户成功",
                success: true
            }
        })
})

// 删除用户信息接口
userRouter.post("/deleteUser/:id", async ctx => {
    await userSchema.findOneAndDelete({
        _id: ctx.params.id
    }).then(() => {
        ctx.body = {
            msg: "删除用户成功",
            success: true
        }
    })
})

module.exports = userRouter;