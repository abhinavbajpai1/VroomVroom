import mongoose, { Schema } from "mongoose";

const PaymentSchema= new mongoose.Schema({
    rentalId : {
        type : Schema.Types.ObjectId,
        ref : "Rental",
        required : true
    },
    Amount : {
        type : Number,
        required : true
    },
    paymentDate : {
        type : Date,
        required : true
    },
    paymentMethod : {
        type : String,
        required : true
    }

},{timestamps:true});

export default mongoose.model("Payment",PaymentSchema);