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
            // console.log(todo);
            return todo;
        } catch (error) {
            throw error;
        }
    },
    updateTodo: async (id: string, todo: {title: string, completed: boolean, userId: string}) => {
        console.log('Updating todo with id:', id);
        console.log('Todo data:', todo);
        try {
            const todoId = id;
            console.log(todoId);
            const { title, completed } = todo;

            const updatedTodo = await Todo.findByIdAndUpdate(
                {_id:todoId}, 
                {title, completed},
                { new: true }
            );
            console.log(updatedTodo);
            return updatedTodo;
        } catch (error) {
            throw error;
        }
    },
    deleteTodo: async (id: string) => {
        try {
            const todoId = id;
            const deletedTodo = await Todo.findByIdAndDelete(todoId);
            return deletedTodo;
        } catch (error) {
            throw error;
        }
    }
};

export default TodoRepository;