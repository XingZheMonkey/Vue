const Koa = require("koa")
const bodyParser = require("koa-bodyparser")
const mongoose = require("mongoose")
const cors = require('koa2-cors')

const userRoute = require("./routes/api/user")
const knowRoute = require('./routes/api/knowledge')
const listRoute = require("./routes/api/list")

const app = new Koa()

mongoose.connect("mongodb://localhost/nodeDB")
        .then(()=>{
            console.log("数据库链接成功")
        })
        .catch(()=>{
            console.log("数据库链接失败")
        })

app.use(bodyParser())

app.use(cors({
    origin: () => 'http://localhost:3000'
}))

app.use(userRoute.routes())
app.use(knowRoute.routes())
app.use(listRoute.routes())


app.listen(5030,()=>{
    console.log("port is 5030")
})