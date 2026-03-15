import mongoose, { Schema } from "mongoose";

interface IItemCatalog {
    userId: mongoose.Types.ObjectId;
    buyerId: mongoose.Types.ObjectId | null;
    name: string;
    price: number;
    tax: number;
    discount: number;
}

const itemCatalogSchema = new Schema<IItemCatalog>({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    buyerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Buyers',
        default: null
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const ItemCatalog = mongoose.model<IItemCatalog>('ItemCatalog', itemCatalogSchema);

export default ItemCatalog;
