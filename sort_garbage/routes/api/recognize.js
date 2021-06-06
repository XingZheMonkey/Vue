const express = require("express");
const router = express.Router();
const AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;

// 设置APPID/AK/SK
const APP_ID = "17209132";
const API_KEY = "tYwU4RCYI51DGtrGYqYQ2Vfu";
const SECRET_KEY = "lRcgeWRlyIVB6QtFV374CrGKa4F9D6G1";

// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);


router.post("/recognize", (req, res) => {

    const image = req.body.image.split(",")[1];

    // 调用通用物体识别
    client.advancedGeneral(image)
          .then(function (result) {
            // res.json会将数据返给前台
            res.json(result.result);
          })
          .catch(function (err) {
             res.status(400).json("识别失败，请稍后再试")
           });
})


module.exports = router;