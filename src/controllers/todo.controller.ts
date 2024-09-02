import { Request, Response, NextFunction } from "express";
import TodoService from "../services/todo.service";
import jwt from "jsonwebtoken";

const TodoController = {
    handleCreateTodo: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { accessToken } = req.cookies;
            
            const payload = jwt.decode(accessToken) as { id: string, name: string, email: string };
            const userId = payload.id;

            const { title, completed } = req.body;

            const newTodo = await TodoService.createTodo({ title, completed, userId });

            if (!newTodo) {
                return res.status(400).json({ message: "Todo already exists" });
            }

            return res.status(201).json({ message: "Todo created successfully", data: newTodo });
        } catch (error) {
            next(error);
        }
    }
};

export default TodoController;