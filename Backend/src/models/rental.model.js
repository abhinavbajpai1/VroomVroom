import mongoose, { Schema } from "mongoose";

const RentalSchema = new mongoose.Schema({
    rentalId : {
        type : String,
        required : true
    },
    customerId : {
        type : Schema.Types.ObjectId,
        ref : "Customer",
        required : true
    },
    VehicleId : {
        type : Schema.Types.ObjectId,
        ref : "Bike",
        required : true
    },
    rental_start :{
        type : Date,
        required : true
    },
    rental_end :{
        type : Date,
        required : true 
    },
    total_cost :{
        type : Number,
        required : true
    },
    status:{
        type : String,
        required : true
    }
},{timestamps:true});

export default mongoose.model("rental",RentalSchema);