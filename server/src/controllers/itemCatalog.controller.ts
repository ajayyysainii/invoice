import ItemCatalog from "../models/itemCatalog.model";
import { Request, Response } from "express";

export class ItemCatalogController {

    createItem = async (req: Request, res: Response) => {
        try {
            const userId = (req.user as unknown as { id?: string })?.id;
            const { name, price, tax, discount, buyerId } = req.body;

            if (!name || price === undefined) {
                return res.status(400).json({ success: false, message: "Name and price are required" });
            }

            const item = await ItemCatalog.create({
                userId,
                name,
                price,
                tax: tax || 0,
                discount: discount || 0,
                buyerId: buyerId || null,
            });

            return res.status(201).json({ success: true, message: "Item created", item });
        } catch (error) {
            return res.status(400).json({ success: false, message: "Failed to create item", error });
        }
    };

    listItems = async (req: Request, res: Response) => {
        try {
            const userId = (req.user as unknown as { id?: string })?.id;
            const items = await ItemCatalog.find({ userId }).populate('buyerId');
            return res.status(200).json({ success: true, items });
        } catch (error) {
            return res.status(400).json({ success: false, message: "Failed to fetch items", error });
        }
    };

    getItemsForBuyer = async (req: Request, res: Response) => {
        try {
            const userId = (req.user as unknown as { id?: string })?.id;
            const { buyerId } = req.params;

            let query;
            if (buyerId === 'global') {
                // No buyer selected — only return global items
                query = { userId, buyerId: null };
            } else {
                // Return items that are global (buyerId is null) OR belong to this specific buyer
                query = {
                    userId,
                    $or: [
                        { buyerId: null },
                        { buyerId: buyerId }
                    ]
                };
            }

            const items = await ItemCatalog.find(query);
            return res.status(200).json({ success: true, items });
        } catch (error) {
            return res.status(400).json({ success: false, message: "Failed to fetch items", error });
        }
    };

    deleteItem = async (req: Request, res: Response) => {
        try {
            const { itemId } = req.params;
            await ItemCatalog.findByIdAndDelete(itemId);
            return res.status(200).json({ success: true, message: "Item deleted" });
        } catch (error) {
            return res.status(400).json({ success: false, message: "Failed to delete item", error });
        }
    };
}
