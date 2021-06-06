const express = require("express")
const router = express.Router()
const recommand = require("../../schema/recommand")
const fs = require("fs")
const path = require("path")

router.post("/addRecommand", (req, res) => {

    const image="data:image/jpeg;base64,"+fs.readFileSync(path.join(__dirname,"assets/rec.jpg")).toString("base64")

    const newRecommand = new recommand({
        title: req.body.title,
        content: req.body.content,
        time: req.body.time,
        author: req.body.author,
        city_id: req.body.city_id,
        imgPath: image
    })

    newRecommand.save().then(data => {
        res.json(data)
    }).catch(err => {
        res.status(404).json("存储失败")
    })
})

// 获取所有推荐
router.get("/:id", (req, res) => {
    recommand.find({
        city_id:req.params.id
    }).then(data=>{
        res.json(data)
    })
})

// 获取单条推荐信息
router.get("/recommandContent/:id", (req, res) => {
    recommand.findOne({
        _id: req.params.id
    }).then(data => {
        res.json(data)
    })
})

module.exports = router