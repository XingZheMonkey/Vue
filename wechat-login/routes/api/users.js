const express=require('express');
const router=express.Router();
const bcrypt=require("bcrypt");
const user=require("../../schema/user");
const jwt=require('jsonwebtoken');
const passport=require('passport');

router.post("/register",(req,res)=>{
    
    user.findOne({email:req.body.email})
        .then((isHave)=>{
            if(isHave){
                return res.status(400).json("账号已存在");
            }else{

                const newUser=new user({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password
                })
    
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password,salt, function(err, hash) {
                        if(err) throw err;
                        newUser.password=hash;

                        newUser.save()
                               .then(saveRes=>{
                                   res.json(saveRes)
                               })
                               .catch(err=>{
                                   console.log(err);
                               })
                    });
                });

            }

        })
})


router.post('/login',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    user.findOne({email:email})
        .then(haveUser=>{
            if(!haveUser){
                res.status(400).json("账号不存在");
            }else{
                bcrypt.compare(password,haveUser.password)
                    .then(isMatch=>{
                      if(isMatch){
                            const rule={
                                id:haveUser.id,
                                name:haveUser.name
                              }

                            jwt.sign(rule,"secret",{expiresIn:3600},function(err,token){
                                if(err) throw err;
                                res.json({
                                    success:true,
                                    token:'Bearer '+token
                                })
                            })

                        }else{
                            return res.status(400).json("密码错误");
                        }
                    })
            }
        })
})


router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({msg:"success"})
})

module.exports = router;