const route = require("koa-router")
const userSchema = require("../../schema/user")
const tools = require("../../config/tools")
const bcrypt = require("bcryptjs")
const queryString = require("querystring")
const axios = require("axios")
const nodemailer = require("nodemailer")

// 使用 jsonwebtoken 加密
const jwt = require("jsonwebtoken")

// 使用 koa-jwt 鉴权
const jwtAuth = require("koa-jwt")


const userRoute = new route({
    prefix: "/user"
})

userRoute.get("/test", async ctx => {
    ctx.body = "测试成功"
})

/**
 * 注册处理流程 ： 查询用户名是否已存在 =>  不存在报错提示
 *                                   =>  存在则通过 model 创建 document 并保存
 */

userRoute.post("/register", async ctx => {
    // 查询账号是否重复
    const findResult = await userSchema.findOne({
        email: ctx.request.body.email
    })


    if (findResult) {
        ctx.body = {
            msg: "用户已存在",
            code: 10,
            type: 'fail'
        }
    } else {
        const newUser = new userSchema({
            email: ctx.request.body.email,
            password: tools.enbcrypt(ctx.request.body.password),
            key: ctx.request.body.key,
            des: ctx.request.body.des
        })

        await newUser.save()
            .then(() => {
                ctx.body = {
                    msg: "用户添加成功",
                    code: 20,
                    type: 'success'
                }
            })
            .catch(err => {
                ctx.body = {
                    msg: err,
                    type: 'fail'
                }
            })
    }
})

/**
 * 登录处理流程 : 查询账号信息 =>  账号信息不存在报错  
 *                           =>  账号信息存在 通过 bcrypt.compareSync 验证密码    =>  验证失败报错提示
 *                                                                              =>  验证成功 通过 jwt.sign 生成token，返回 token 给前台
 */
userRoute.post("/login", async ctx => {

    // 查询账号信息
    const findResult = await userSchema.findOne({
        email: ctx.request.body.email
    })

    if (findResult) {

        // 验证密码
        var passwordResult = await bcrypt.compareSync(ctx.request.body.password, findResult.password);

        if (passwordResult) {

            // 生成 token
            const rule = {
                id: findResult._id,
                email: findResult.email,
                key: findResult.key
            }
            let token = jwt.sign(rule, "secret", {
                expiresIn: 30000
            });

            // 返回数据给前台
            ctx.status = 200;
            ctx.body = {
                msg: "登陆成功",
                code: 21,
                token: "Bearer " + token,
                type: 'success'
            }
        } else {
            ctx.body = {
                msg: "密码错误",
                code: 11,
                type: 'fail'
            }
        }
    } else {
        ctx.body = {
            msg: "账号不存在",
            code: 12,
            type: 'fail'
        }
    }
})

userRoute.post("/modifyUserInfo", jwtAuth({
    secret: 'secret'
}), async ctx => {
    const email = ctx.request.body.email;
    let des

    if (ctx.request.body.des) {
        des = ctx.request.body.des
    }

    await userSchema.findOneAndUpdate({
        email
    }, {
        $set: {
            key: ctx.request.body.key,
            des
        }
    }).then(() => {
        ctx.body = {
            msg: "修改成功",
            code: 22,
            type: 'success'
        }
    }).catch(err => {
        ctx.body = {
            msg: err,
            code: 13,
            type: 'fail'
        }
    })
})

userRoute.get("/allUser", jwtAuth({
    secret: 'secret'
}), async ctx => {
    const userInfo = await userSchema.find()
    ctx.body = userInfo
})

userRoute.post("/userInfo", jwtAuth({
    secret: 'secret'
}), async ctx => {
    const userInfo = await userSchema.findById(ctx.request.body.id)
    ctx.body = userInfo
})



/**
 * github oAuth 授权流程:  向服务器发送认证请求 => 服务器重定向到github认证 
 *                                               
 *                        第三方认证流程 ： 回调认证code => 用code申请令牌 => 返回令牌 => 用令牌请求用户信息 => 返回用户信息 => 登陆成功
 * 
 */


// 配置 github 申请的 oauth 参数
const config = {
    client_id: 'b296ae0616c0bbaa6536',
    client_secret: '16411acf26e951ee32e988295d79bfe97c2337ee'
}

userRoute.get("/github/login", async ctx => {
    // 设置第三方授权地址
    var path = "https://github.com/login/oauth/authorize?client_id=" + config.client_id

    // 转发到授权服务器
    ctx.redirect(path)
})

userRoute.get("/github/callback", async ctx => {
    const code = ctx.query.code;
    const params = {
        client_id: config.client_id,
        client_secret: config.client_secret,
        code: code
    }

    let res = await axios.post("https://github.com/login/oauth/access_token", params)

    // res.data  =>  access_token=d05b7b60770326b4b132ea1b3f8afe8ce8dec1d0&scope=&token_type=bearer
    const access_token = queryString.parse(res.data).access_token

    console.log(access_token)

    // 注意携带请求头 token
    res = await axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: {
            accept: 'application/json',
            Authorization: `token ${access_token}`
        }
    })

    const rule = {
        name: res.data.login,
        avatar: res.data.avatar_url
    }
    var token = jwt.sign(rule, "secret", {
        expiresIn: 36000
    });

    token += "Bearer " + token

    console.log(ctx.response)

    ctx.response.type = "html"
    ctx.response.body = `<script>window.localStorage.setItem('authSucccess','true');window.localStorage.setItem('eleToken','${token}')</script>`

    ctx.redirect("http://localhost:8060/")

})



// node mailer服务

/**
 * 找回密码流程： 前端用户输入合法邮箱，后端向此邮箱发送重置密码链接，重置链接由于是明文传播，而且直接修改密码，所以必须有失效时间。一般来说，可以设成10分钟失效
 *               
 * 重置密码链接生成流程： 后端通过 node-ras 生成一对公私钥，用公钥加密生成一个 key 存放在 url 参数中传输到前端 （加密内容包含一个过期时间，用来标志此 url 的有效期）
 *                                    
 *                      用户打开前端窗口，截取url中的参数，并将 公钥生成的 key 返回给后台  =>  后台用私钥解密信息 => 解密成功则校对 过期时间 => 如果没过期则返回true,允许修改密码
 *                                                                                                                                  => 过期则返回false，跳转404
 * 
 *                                                                                                          => 解密失败则认为链接不合法，返回false给前台，前台跳转404
 */

const {
    generateKeyPairSync,
    publicEncrypt,
    privateDecrypt
} = require('crypto')

//生成公钥和私钥
const {
    publicKey,
    privateKey
} = generateKeyPairSync('rsa', {
    modulusLength: 512,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

// 公钥用来加密信息并传输给前端
const pub = publicKey.toString('ascii')

// 私钥用来解密信息，验证信息内容
const pri = privateKey.toString('ascii')


userRoute.post("/findPassword", async ctx => {
    const findResult = await userSchema.findOne({
        email: ctx.request.body.email
    });

    if (findResult) {

        // 将过期时间加密传输
        let exp = Math.floor(Date.now() / 1000) + (60 * 10).toString()

        // 公钥加密
        const encryptData = publicEncrypt(pub, Buffer.from(exp)).toString('base64');

        console.log(encryptData)
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
            // html: fs.createReadStream(path.resolve(__dirname, "drip.html"))
            text: `请前往 http://localhost:8060/#/resetPassword?user=${ctx.request.body.email}&key=${encryptData} 重置密码`
        }

        // 发送邮件
        const sendResult = await transporter.sendMail(mailOptions);

        if (sendResult) {
            ctx.body = {
                msg: `密码已发送至您的${ctx.request.body.email}邮箱`,
                type: 'success'
            }
        } else {
            ctx.body = {
                msg: "发送失败",
                type: 'fail'
            }
        }
    } else {
        ctx.status = 400;
        ctx.body = {
            msg: "用户不存在",
            type: 'fail'
        };
    }
})

userRoute.post("/verifyReset", async ctx => {

    // 私钥解密
    try {
        const decryptData = privateDecrypt(pri, Buffer.from(ctx.request.body.key.toString('base64'), 'base64'));

        const exp = decryptData.toString()
        // 如果当前时间小于过期时间，认为此链接有效, 返回认证为true，否则返回false
        if (Math.floor(Date.now() / 1000) < exp) {
            ctx.body = {
                verify: true,
                type: 'success'
            }
        } else {
            ctx.body = {
                verify: false,
                type: "fail"
            }
        }

    } catch (e) {
        ctx.body = {
            verify: false,
            err: e
        }
    }
})


// 重置密码

userRoute.post("/resetPassword", async ctx => {

    await userSchema.findOneAndUpdate({
        email: ctx.request.body.email
    }, {
        $set: {
            password: tools.enbcrypt(ctx.request.body.password)
        }
    }).then(() => {
        ctx.body = {
            msg: "密码修改成功",
            type: 'fail'
        }
    })
})

module.exports = userRoute