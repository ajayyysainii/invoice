import { ItemCatalogController } from "../controllers/itemCatalog.controller";
import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware";

const itemCatalogController = new ItemCatalogController();
const router = Router();

router.post("/create", verifyToken, itemCatalogController.createItem);
router.get("/list", verifyToken, itemCatalogController.listItems);
router.get("/list/:buyerId", verifyToken, itemCatalogController.getItemsForBuyer);
router.delete("/delete/:itemId", verifyToken, itemCatalogController.deleteItem);

export default router;
