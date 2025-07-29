import mongoose from "mongoose";

const BikeSchema = new mongoose.Schema({
    bikeId :{
        type : String,
        required : true
    },
    model :{
        type : String,
        required : true
    },
    type:{
        type : String,
        required : true
    },
    price :{
        type : Number,
        required : true
    },
    Available :{
        type : Boolean,
        required : true
    }
},{timestamps:true});

export default mongoose.model("Bike",BikeSchema);