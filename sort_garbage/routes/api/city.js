const express = require("express")
const router = express.Router();
const city = require("../../schema/city")


router.get("/test", (req, res) => {
    res.json("test")
})


router.post("/addCity", (req, res) => {
    const newCity = new city({
        text: req.body.text,
        value: req.body.value,
        motto: req.body.motto
    })
    newCity.save().then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
    })
})

router.get("/", (req, res) => {
    city.find().then(data => {
        res.json(data)
    }).catch(err => {
        res.status(404).json("获取城市列表失败")
    })
})


module.exports = router;