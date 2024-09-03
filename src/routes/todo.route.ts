import express from "express";
import TodoController from "../controllers/todo.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

export const todoRouter = express.Router();

todoRouter.post("/create", AuthMiddleware, TodoController.handleCreateTodo);
todoRouter.get("/", AuthMiddleware, TodoController.handleGetAllTodo);
todoRouter.get("/my-todo", AuthMiddleware, TodoController.handleGetTodoById);
todoRouter.patch("/update/:id", AuthMiddleware, TodoController.handleUpdateTodo);
todoRouter.delete("/delete/:id", AuthMiddleware, TodoController.handleDeleteTodo);