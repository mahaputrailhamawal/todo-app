import { Todo } from "../models/todo.schema";
import { ITodo } from "../entities/todo.entity";

const TodoRepository = {

    createTodo: async (todo: ITodo) => {
        try {
            const createTodo = new Todo(todo);

            const newTodo = await createTodo.save();
            return newTodo;
        } catch (error) {
            throw error;
        }
    },

    getAllTodo: async () => {
        try {
            const allTodo = await Todo.find().populate("userId");
            return allTodo;
        } catch (error) {
            throw error;
        }
    },
    getTodoById: async (id: string) => {
        try {
            const userId = id;
            const todo = await Todo.find({userId: userId}).populate("userId");
            console.log(todo);
            return todo;
        } catch (error) {
            throw error;
        }
    }
}

export default TodoRepository;