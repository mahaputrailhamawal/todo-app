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
    }
};

export default TodoService;