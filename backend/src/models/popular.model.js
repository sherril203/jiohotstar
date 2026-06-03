const mongoose=require('mongoose')
const popularSchema=new mongoose.Schema(
    {
     image:{type:String},
     year:{type:String},
     name:{type:String},
     season:{type:String},
     description:{type:String},
     series:{type:String},
     language:{type:[String]},
     duration:{type:String},
     category:{type:[String]},
     section:{type:[String]}
    }
)
const popularModel=mongoose.model('popular',popularSchema)
module.exports = { popularModel };