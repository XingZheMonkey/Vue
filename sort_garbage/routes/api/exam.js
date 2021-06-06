const express = require("express");
const router = express.Router();
const question = require("../../schema/question")
const errorQuestion = require("../../schema/errorQuestion")
const passport = require("passport")


// 获取所有问题
router.get("/question", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    question.find().then(data => {
        res.json(data)
    })
})


// 存储用户的错题记录
router.post("/saveErrQues", passport.authenticate("jwt", {
    session: false
}), (req, res) => {

    const newErrQues = new errorQuestion({
        errorQuestion: req.body.question,
        answer: req.body.answer,
        u_id: req.body.u_id,
        q_id: req.body._id
    })

    newErrQues.save().then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
    })
})


// 查询单个用户的错题记录
router.get("/errQues/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {

    errorQuestion.find({
            u_id: req.params.id
        })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

// 删除单个用户的某个错题记录
router.get("/deleteErrQues/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    errorQuestion.findOneAndDelete({
            u_id: req.params.id,
            q_id: req.body.q_id
        })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})


module.exports = router;