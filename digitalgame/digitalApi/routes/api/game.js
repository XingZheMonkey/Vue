const express=require('express');
const router=express.Router();
const game=require('../../schema/game');

// 获取数据
router.get('/',(req,res)=>{
    game.find()
        .then((data)=>{
            if(!data){
                return res.status(400).json("There is nothing");
            }
            res.json(data)
        })
})

// ** 获取单个数据,注意拿到前端传过来的id用 req.params.id

router.get('/:id',(req,res)=>{
    game.findOne({_id:req.params.id})
        .then(data=>{
            if(!data){
                return res.status(400).json('There is nothing');
            }
            res.json(data)
        })
        .catch(err=>{
            console.log(err);
        })
})

// 添加数据
router.post('/add',(req,res)=>{
    const newGame=new game({
        gameTitle:req.body.gameTitle,
        correctPath:req.body.correctPath,
        distractors:req.body.distractors,
        category:req.body.category
    })

    newGame.save()
           .then((data)=>{
               res.json(data);
           })
           .catch(err=>{
               console.log(err);
           })
})


// ** 编辑数据，注意 路径 :id 前有 /
router.post('/edit/:id',(req,res)=>{
    const editGame={}
    editGame.gameTitle=req.body.gameTitle;
    editGame.correctPath=req.body.correctPath;
    editGame.distractors=req.body.distractors;
    editGame.state=req.body.state;
    editGame.category=req.body.category;
    
    game.findOneAndUpdate(
        {_id:req.params.id},
        {$set:editGame},
        {new:true}
    )
        .then(data=>{
            res.json(data);
        })
})

module.exports=router;