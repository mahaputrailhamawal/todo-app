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
    }
}

export default TodoRepository;