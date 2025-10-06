import { BuyersController } from "../controllers/buyer.controller";
import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware";


const buyersController = new BuyersController();
const router = Router();

router.post("/create",verifyToken, buyersController.createBuyer);
router.get('/list',verifyToken,buyersController.listBuyer)
router.get('/detail/:buyerId',verifyToken,buyersController.getBuyerDetail)



export default router;