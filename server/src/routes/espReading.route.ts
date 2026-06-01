import { Router } from "express";
import { EspReadingController } from "../controllers/espReading.controller";

const espReadingController = new EspReadingController();
const router = Router();

router.post("/", espReadingController.createReading);
router.get("/", espReadingController.listReadings);

export default router;
