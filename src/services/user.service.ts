import { IUser } from "../entities/user.entity";
import UserRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Auth } from "../models/auth.schema";

const UserService = {
    createUser: async (user: IUser) => {
        try {
            const newUser = await UserRepository.createUser(user);
            return newUser;
        } catch (error) {
            console.log(error);
        }
    },

    loginUser: async (loginData: {email: string, password: string}) => {
        const { email, password } = loginData;

        try {
            if (!email || password.length < 8 ) {
                throw new Error("email should be a valid email and password should be at least 8 characters long");
            }

            // find user
            const user = await UserRepository.loginUser(email);

            // check if user exists
            if (!user) {
                throw new Error("User not found");
            }

            // compare passwords
            const isPasswordCorrect = await bcrypt.compare(password, user.password as string);

            // check if password is correct
            if (!isPasswordCorrect) {
                throw new Error("Incorrect password");
            }

            const payload = {
                id: user.id,
                name: user.name,
                email: user.email
            };

            // create token
            const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: 300 });
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: "7d" });

            const token = {
                accessToken,
                refreshToken
            };

            // save refresh token in db
            const newRefreshToken = new Auth({
                userId: user.id,
                refreshToken,
            });

            await newRefreshToken.save();

            return token;
        } catch (error) {
            console.log(error);
        }
    }
};

export default UserService;