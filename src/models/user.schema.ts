import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
    },
    { versionKey: false },
);

export const User = model("User", userSchema);