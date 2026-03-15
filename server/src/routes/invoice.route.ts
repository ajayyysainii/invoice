import { InvoiceController } from "../controllers/invoice.controller";
import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware";

const invoiceController = new InvoiceController();

const router = Router();

router.post("/create",verifyToken,invoiceController.createInvoice);
router.get("/list",verifyToken,invoiceController.getInvoiceByUserId);
router.get("/pdf/:invoiceId",verifyToken,invoiceController.getPresignedUrl);

export default router;

