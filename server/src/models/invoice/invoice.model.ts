import mongoose, { mongo, Schema } from "mongoose";

interface IInvoice {
    userId: mongoose.Types.ObjectId
    buyerId: mongoose.Types.ObjectId
    itemsId: mongoose.Types.ObjectId
    invoiceNumber: string
    dueDate: string
    amount: number
    discount: number
    totalAmount: number
}

const InvoiceSchema = new Schema<IInvoice>({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: false,
        ref: 'User'
    },
    buyerId: {
        type: mongoose.Schema.ObjectId,
        required: false,
        ref: 'Buyers'
    },
    itemsId: {
        type: mongoose.Schema.ObjectId,
        required: false,
        ref: 'Items'
    },
    invoiceNumber: {
        type: String
    },
    dueDate: {
        type: String
    },
    amount: {
        type: Number
    },
    discount: {
        type: Number
    },
    totalAmount: {
        type: Number
    }
}, {
    timestamps: true
})

const Invoice = mongoose.model<IInvoice>('Invoice', InvoiceSchema)

export default Invoice;