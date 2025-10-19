import Items from "../models/invoice/items.model";
import Invoice from "../models/invoice/invoice.model";
import { Request,Response } from "express";

export class InvoiceController{
    createInvoice = async (req:Request,res:Response) => {
        try {
            const userId = (req.user as unknown as { id?: string })?.id;
            
            const {buyerId,invoice,dueDate,totalAmount} = req.body;

            const invoiceDetail = await Invoice.create({
                buyerId,
                userId,
                invoiceNumber: invoice,
                dueDate,
                totalAmount
            })

            const invoiceId = invoiceDetail._id;
            const {items} = req.body;
            const itemDetail = await Items.create({invoiceId,items})

            console.log(invoiceDetail)
            console.log(itemDetail)
            

            
            return res.json({message: 'true'})
        } catch (error) {
            return res.status(400).json({message: 'false',error: error})
        }
    }

    getInvoiceByUserId = async (req:Request,res:Response)=>{
        try {
            const userId = (req.user as unknown as { id?: string })?.id;

            const invoiceList = await Invoice.find({userId})

            res.status(200).json(invoiceList);


        } catch (error) {
            res.status(400).json({error})
        }
    }

    
}
