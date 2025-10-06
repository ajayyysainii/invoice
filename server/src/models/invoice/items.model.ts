import mongoose from "mongoose";
import { Schema } from "mongoose";

interface IItems{
    invoiceId: mongoose.Types.ObjectId
    itemsName: string
    quantity: number
    price: number
    tax:number
    itemTotal:number
}

const itemsSchema = new Schema({
    invoiceId: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref:'Invoice'
    },
    itemsName:{
        type: String,
    },
    quantity:{
        type: Number
    },
    price:{
        type: Number
    },
    tax:{
        type: Number
    },
    itemTotal:{
        type: Number
    }  
},{
    timestamps: true
})

const Items = mongoose.model<IItems>('Items',itemsSchema);

export default Items;