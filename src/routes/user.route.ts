import express from "express";
import UserController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

export const userRouter = express.Router();

userRouter.post("/signup", UserController.handleCreateUser);
userRouter.post("/login", UserController.handleLoginUser);
userRouter.post("/logout", authMiddleware, UserController.handleLogoutUser);
userRouter.patch("/update", authMiddleware, UserController.handleUpdateUser);