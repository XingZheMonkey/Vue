const express = require("express");
const router = express.Router();
const rate = require("../../schema/rate")
const passport = require("passport")

// 提交评分接口
router.post("/submit", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    const newRate = new rate({
        score: req.body.score,
        userId: req.body.id
    })

    newRate.save()
        .then(data => {
            res.json("感谢您的评价")
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

// 判断是否评分接口
router.get("/isRate/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    rate.findOne({
            userId: req.params.id
        })
        .then(isHave => {
            if (isHave) {
                res.json(isHave)
            } else {
                res.json(false)
            }
        })
})

module.exports = router;