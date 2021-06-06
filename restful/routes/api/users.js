// login & register api
const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require("../../models/users");

// 测试路由,get请求，地址为api/users/test
// @des  返回请求的json数据
// @access public
router.get("/test", (req, res) => {
    res.json({
        msg: "login success"
    })
})


// register接口 post  返回json
router.post("/register", (req, res) => {
    console.log(req.body);

    // 查询数据库中是否已注册此邮箱
    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                return res.status(400).json("邮箱已被注册");
            } else {

                // 设置头像
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });

                // 建立要存储的数据
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    identity: req.body.identity,
                    password: req.body.password
                })

                // 加密密码
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        if (err) throw err;
                        newUser.password = hash;

                        // 将数据存入数据库
                        newUser.save()
                            .then((user) => {
                                res.json(user);
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    });
                });
            }
        })
})


// 注册接口，post返回token
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // 查询数据库中是否有相对应的数据
    User.findOne({
            email: email
        })
        .then((user) => {
            if (!user) {
                return res.status(404).json("用户不存在");
            }

            // 密码匹配
            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (isMatch) {
                        //   返回一个token,sign参数分别是规则，加密名字，过期时间，回调函数
                        const rule = {
                            id: user.id,
                            name: user.name
                        };
                        jwt.sign(rule, "secret", {
                            expiresIn: 3600
                        }, function (err, token) {
                            if (err) throw err;
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        });
                    } else {
                        return res.status(400).json("密码错误");
                    }
                })
        })
})


router.get('/current', passport.authenticate("jwt", {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    });
});

// 攻出，使其他文件可以引用
module.exports = router;