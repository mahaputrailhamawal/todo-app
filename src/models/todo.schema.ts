import { Schema, model } from "mongoose";

const todoSchema = new Schema(
    {
        title: String,
        completed: Boolean,
        userId: { type: Schema.Types.ObjectId, ref: "User" }
    },
    { versionKey: false },
);

export const Todo = model("Todo", todoSchema);