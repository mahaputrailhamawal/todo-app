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
    },
    handleGetAllTodo: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allTodo = await TodoService.getAllTodo();
            return res.status(200).json({ message: 'Todos retrieved successfully', data: allTodo });
        } catch (error) {
            next(error);
        }
    },
    handleGetTodoById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { accessToken } = req.cookies;

            const payload = jwt.decode(accessToken) as { id: string, name: string, email: string };
            console.log(payload.id);
            
            const todo = await TodoService.getTodoById(payload.id);
            // console.log(todo);

            return res.status(200).json({ message: 'Todo retrieved successfully', data: todo });
        } catch (error) {
            next(error);
        }
    }
};

export default TodoController;