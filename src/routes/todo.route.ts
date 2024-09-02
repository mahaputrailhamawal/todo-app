import express from "express";
import TodoController from "../controllers/todo.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

export const todoRouter = express.Router();

todoRouter.post("/create", AuthMiddleware, TodoController.handleCreateTodo);