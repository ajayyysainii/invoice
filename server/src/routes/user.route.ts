import { UserController } from "../controllers/user.controller";
import { Router } from "express";

const router = Router();
const userController = new UserController();

router.post("/register",userController.registerUser);
router.post("/login",userController.loginUser);

export default router;