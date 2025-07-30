import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
    },
    lastName : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    AddhaarNumber : {
        type: String,
        required: true,
    },
    panNumber : {
        type: String,
        required: true,
    },
    address : {
        type: String,
        required: true,
    },
    city : {
        type: String,
        required: true,
    },
    state : {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['customer', 'mechanic', 'admin'],
        default: 'customer',
    },
    profileImage : {
        type: String,
        default: null,
    },
},{timestamps: true});

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;