const express = require("express")
const cors = require("cors")
const mongoose  = require("mongoose")


const app = express()
app.use(cors())
app.use(express.json())


// port number define

const PORT = process.env.PORT || 8080




// mongo db schema
const schemaData = mongoose.Schema({
    name:String,
    email:String,
    mobile: Number,
},{
    timestamps : true
})

const userModel = mongoose.model("user",schemaData)


// read logic
app.get("/", async(req,res)=>{
    const data = await userModel.find({})

    res.json({success: true, data:data})
})


// create logic
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({success:true, message:"data create successfully",data:data})

})


// update logic
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {id,...rest} = req.body
    const data = await userModel.updateOne({_id:id},rest)
    res.send({success:true, message:"data updated successfully",data:data})
})


// delete logic

app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id:id})
    res.send({success:true,message:"data deleted successfully",data:data})
})


// connect logic

mongoose.connect("mongodb://127.0.0.1:27017/crudoperation")
.then(()=>{
    console.log("connected to db")
    app.listen(PORT,()=>console.log("server is running"))
})
.catch((err)=>console.log(err))

