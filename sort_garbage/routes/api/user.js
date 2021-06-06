const express = require("express")
const router = express.Router()
const user = require("../../schema/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken") // 用于返回token
const passport = require("passport")


// 注册接口
router.post("/register", (req, res) => {

    user.findOne({
            email: req.body.email
        })
        .then(isHave => {
            if (isHave) {
                res.status(400).json("该用户已存在")
            } else {
                const newUser = new user({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        if (err) throw err;
                        newUser.password = hash;

                        newUser.save()
                            .then(saveRes => {
                                res.json(saveRes)
                            })
                            .catch(err => {
                                res.json(err)
                            })
                    })
                })
            }
        })
})


// 登录接口
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    user.findOne({
            email: email
        })
        .then(haveUser => {
            if (!haveUser) {
                res.status(400).json("用户不存在")
            } else {
                bcrypt.compare(password, haveUser.password)
                    .then(isMatch => {
                        if (isMatch) {

                            // 创建规则
                            const rule = {
                                id: haveUser.id,
                                name: haveUser.name
                            }

                            // 创建并返回token
                            jwt.sign(rule, "secret", {
                                expiresIn: 3600000
                            }, function (err, token) {
                                if (err) throw err;
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            })

                        } else {
                            return res.status(400).json("密码错误");
                        }
                    })
            }
        })
})

// 更新用户信息接口
router.post("/updateInfo/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    const name = req.body.name;

    // 如果前台传递过来新密码，更新密码
    if (req.body.password) {
        let password = req.body.password;

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) throw err;
                password = hash;

                user.findByIdAndUpdate(req.params.id, {
                        $set: {
                            name: name,
                            password: password
                        }
                    })
                    .then(data => {
                        res.json(data)
                    })
            })
        })
    } else {
        // 如果前台没有传递新密码，对密码不做改动
        user.findByIdAndUpdate(req.params.id, {
                $set: {
                    name: name
                }
            })
            .then(data => {
                res.json(data)
            })
    }
})

// 更新用户头像接口
router.post("/updateAvatar/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    user.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                avatar: req.body.avatar
            }
        })
        .then(update => {
            res.json(update)
        })
        .catch(err => {
            console.log(err)
        })
})

// 更新初级难度积分
router.post("/primary/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    user.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                primaryScore: req.body.score
            }
        })
        .then(update => {
            res.json(update)
        })
        .catch(err => {
            console.log(err)
        })
})

// 更新简单难度积分
router.post("/simple/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    user.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                simpleScore: req.body.score
            }
        })
        .then(update => {
            res.json(update)
        })
        .catch(err => {
            console.log(err)
        })
})


// 更新困难难度积分
router.post("/difficult/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    user.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                difficultScore: req.body.score
            }
        })
        .then(update => {
            res.json(update)
        })
        .catch(err => {
            console.log(err)
        })
})


// 更新进阶难度积分
router.post("/advance/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    user.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                advanceScore: req.body.score
            }
        })
        .then(update => {
            res.json(update)
        })
        .catch(err => {
            console.log(err)
        })
})

// 更新总分
router.post("/sumScore/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    user.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                sumScore: req.body.sumScore
            }
        })
        .then(update => {
            res.json(update)
        })
        .catch(err => {
            console.log(err)
        })
})

// 获取单个用户信息接口
router.get("/userInfo/:id", passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        user.findById({
                _id: req.params.id
            })
            .then(userInfo => {
                res.json(userInfo)
            })
            .catch(err => {
                res.status(400).json("获取用户信息失败");
            })
    })

// 获取所有用户信息，并以总分降序排序
router.get("/allUser", passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        user.find().sort({
                sumScore: -1
            })
            .then(data => {
                res.json(data)
            })
    })

module.exports = router;