const express = require("express")
const router = express.Router()
const news = require("../../schema/news")
const fs = require("fs")
const path = require("path")

router.get("/test", (req, res) => {

    res.json("test")
})

router.post("/addNews", (req, res) => {

    const image="data:image/jpeg;base64,"+fs.readFileSync(path.join(__dirname,"assets/news3.jpg")).toString("base64")

    const anotherNews = new news({
        title: req.body.title,
        content: req.body.content,
        time: req.body.time,
        author: req.body.author,
        city_id: req.body.city_id,
        imgPath: image
    })

    anotherNews.save().then(data => {
        res.json(data)
    }).catch(err => {
        res.status(404).json("存储失败")
    })
})

// 获取所有新闻
router.get("/:id", (req, res) => {
    news.find({
        city_id:req.params.id
    }).then(data=>{
        res.json(data)
    })
})

// 获取单条新闻信息
router.get("/newsContent/:id", (req, res) => {
    news.findOne({
        _id: req.params.id
    }).then(data => {
        res.json(data)
    })
})

module.exports = router