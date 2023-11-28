const mongoose = require(`mongoose`)

const productSchema = new mongoose.Schema({

id:{
    type:Number,
    unique:true,
    required:false
},


image:{
    type:String,
    required:true
},

category:{
    type:String,
    required:true
},
title:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},

type:{
    type:String,
    required:false
},
discount:{
    type:String,
    required:true
},
count:{
    type:Number,
    required:true
},


});

productSchema.pre('save', async function(next){
    if(this.isNew){
        try{
            const highestProduct=await this.constructor.findOne({},'id').sort({id:-1});
            this.id=(highestProduct && highestProduct.id+1)||1;
        } catch(err){
            return next(err);
        }
    }
    next();
});

const ProductModel = mongoose.model('Product',productSchema);
module.exports=ProductModel;