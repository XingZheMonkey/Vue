const express=require("express")
const router=express.Router()
const request=require("request")
const url=require("url")


// 根据经纬度获取当前城市
router.get("/",(req,res)=>{
    const query=url.parse(req.url,true).query;
    const lat=query.lat;
    const lng=query.lng;
    request.get({
        uri:"https://apis.map.qq.com/ws/geocoder/v1/",
        json:true,
        qs:{
            location:`${lat},${lng}`,
            key:"CDHBZ-H4ILX-M3A47-77ZUU-WM22H-XQFJW"
        }
    },(err,response,data)=>{
        if(response.statusCode === 200){
            res.json(data)
        }else{
            res.status(400).json("定位失败")
        }
    })
})

module.exports=router;