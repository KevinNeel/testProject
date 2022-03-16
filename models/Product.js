import mongoose from 'mongoose';

const product_Schema = new mongoose.Schema({
    name:{
        type: String,
    },
    description:{
        type: String
    },
    price:{
        type: Number
    },
    category:{
        type: String
    }
});

const product = mongoose.model('product', product_Schema);

export default product;