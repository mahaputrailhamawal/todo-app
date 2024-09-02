import { Request, Response } from "express";
import UserService from "../services/user.service";
import { Auth } from "../models/auth.schema";

const UserController = {
    // Create User
    handleCreateUser : async (req: Request, res: Response) => {
        const { name, email, password } = req.body;
        const newUser = await UserService.createUser({ name, email, password });

        if (!newUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        try {
            return res.status(201).json({ message: "User created successfully", data: newUser });
        } catch (error) {
            console.log(error);
        }
    },

    handleLoginUser: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const userLogin = await UserService.loginUser({ email, password });

            
            if (userLogin && typeof userLogin === 'object') {
                const {accessToken, refreshToken} = userLogin as { accessToken: string; refreshToken: string; };
                // rest of your code
                return res
                    .cookie("accessToken", accessToken, { httpOnly: true })
                    .cookie("refreshToken", refreshToken, { httpOnly: true })
                    .status(200)
                    .json({ message: "User logged in"});
            }
        } catch (error) {
            if (error instanceof Error) {
                return res.status(401).json({ message: error.message });
            }
        }
    },

    handleLogoutUser: async (req: Request, res: Response) => {
        const { refreshToken } = req.cookies;

        await Auth.findOneAndDelete({ refreshToken });

        return res.clearCookie("accessToken").clearCookie("refreshToken").status(200).json({ message: "User logged out" });
    }
};

export default UserController;