import bcrypt from "bcrypt";
import { IUser } from "../entities/user.entity";
import { User } from "../models/user.schema";

const UserRepository = {
    createUser: async (user: IUser) => {
        try {
            const { name, email, password } = user;
            const hashedPassword = await bcrypt.hash(password, 13);

            const newUser = new User({ name, email, password: hashedPassword });
            
            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            console.log(error);
        }
    },

    loginUser: async (email: string) => {
        try {
            const user = await User.findOne({ email });
            return user;
        } catch (error) {
            console.log(error);
        }
    },

    updateUser: async (id: string, user: IUser) => {
        try {
            const userId = id;
            const { name, email, password } = user;

            const hashedPassword = await bcrypt.hash(password, 13);
            const updatedUser = await User.findByIdAndUpdate(
                {_id:userId}, 
                {name, email, password: hashedPassword}, 
                { new: true }
            );
            return updatedUser;
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserRepository;