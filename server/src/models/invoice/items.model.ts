import mongoose from "mongoose";
import { Schema } from "mongoose";

interface IItemsDetail{
    item: string
    quantity: number
    price: number
    tax:number
    discount:number
    total:number
}

interface IItems{
    invoiceId: mongoose.Types.ObjectId
    items: IItemsDetail[]
}

const itemDetailSchema = new Schema({
    item: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    },
    tax: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
    }
}, { _id: false })

const itemsSchema = new Schema({
    invoiceId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Invoice'
    },
    items: {
        type: [itemDetailSchema],
        default: []
    }
},{
    timestamps: true
})

const Items = mongoose.model<IItems>('Items',itemsSchema);

export default Items;