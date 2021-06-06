const express=require('express')
const router=express.Router()
const passport=require('passport')
const Profile=require('../../models/Proflie')


router.post("/add",passport.authenticate("jwt", {session: false}), (req,res)=>{
    const profilesField={}

    if(req.body.type) profilesField.type=req.body.type
    if(req.body.describe) profilesField.describe=req.body.describe
    if(req.body.income) profilesField.income=req.body.income
    if(req.body.expend) profilesField.expend=req.body.expend
    if(req.body.cash) profilesField.cash=req.body.cash

    new Profile(profilesField).save()
                              .then((pro)=>{
                                res.json(pro)
                              })
})


router.get("/people",passport.authenticate("jwt", {session: false}), (req,res)=>{
    Profile.find()
           .then(data=>{
               res.json(data)
           })
})

module.exports=router
