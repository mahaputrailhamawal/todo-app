import { ITodo } from "../entities/todo.entity";
import TodoRepository from "../repositories/todo.repository";

const TodoService = {
    createTodo: async (todo: ITodo) => {
        try {
            if (!todo.title || !todo.userId) {
                throw new Error("title and userId are required");
            }

            const newTodo = await TodoRepository.createTodo(todo);
            return newTodo;
        } catch (error) {
            throw error;
        }
    },
    getAllTodo: async () => {
        try {
            const allTodo = await TodoRepository.getAllTodo();
            return allTodo;
        } catch (error) {
            throw error;
        }
    },
    getTodoById: async (id: string) => {
        try {
            const todo = await TodoRepository.getTodoById(id);
            // console.log(todo);
            return todo;
        } catch (error) {
            throw error;
        }
    },
    updateTodo: async (id: string, todo: ITodo) => {
        try {
            const updatedTodo = await TodoRepository.updateTodo(id, todo);
            return updatedTodo;
        } catch (error) {
            throw error;
        }
    },
    deleteTodo: async (id: string) => {
        try {
            const deletedTodo = await TodoRepository.deleteTodo(id);
            return deletedTodo;
        } catch (error) {
            throw error;
        }
    }
};

export default TodoService;