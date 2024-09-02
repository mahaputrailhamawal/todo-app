import express from "express";
import UserController from "../controllers/user.controller";

export const userRouter = express.Router();

userRouter.post("/signup", UserController.handleCreateUser);
userRouter.post("/login", UserController.handleLoginUser);
userRouter.post("/logout", UserController.handleLogoutUser);
userRouter.patch("/update", UserController.handleUpdateUser);