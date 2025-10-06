import Buyers from "../models/buyers.model";
import mongoose from "mongoose";
import { Request, Response } from "express";


export class BuyersController {

    createBuyer = async (req: Request, res: Response) => {
        try {
            console.log(req.user);

            const userId = (req.user as unknown as { id?: string })?.id;
            // const userId = req.user?.id;
            const { name, email, nameOfBusiness, phone, address, gst } = req.body;

            if (!email || !nameOfBusiness || !phone || !address) {
                return res.json({ success: "false", message: "All fields are required" })
            }

            const existingBuyer = await Buyers.findOne({ email })

            if (existingBuyer) {
                return res.json({ success: "false", message: "Buyer already exits!" })
            }

            const buyer = await Buyers.create({
                userId,
                name,
                email,
                gst,
                address,
                nameOfBusiness,
                phone,
            })

            return res.json({ success: "true", message: "Buyer profile is created" });
        } catch (error) {
            return res.json({ success: "false", message: `error occued : ${error}` })
        }

    }


    listBuyer = async (req: Request, res: Response) => {
        try {
            const userId = (req.user as unknown as { id?: string })?.id;
            const list = await Buyers.find({ userId })
                .populate('userId')
            return res.status(200).json({ success: "true", message: list })
        } catch (error) {
            return res.status(400).json({ success: "false", message: "error", error })
        }
    }

    getBuyerDetail = async (req: Request, res: Response) => {
        try {
            const id = req.params;
            const buyer = await Buyers.findById(id.buyerId);

            return res.status(200).json({ success: "true", message: buyer })

        } catch (error) {
            return res.status(400).json({ success: "false", message: "Error is occured: ", error })
        }
    }
}