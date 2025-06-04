import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export async function register(req, res) {
    const { username, password, email } = req.body;
    console.log(" register ~ username, password, email:", username, password, email);
    if (!username || !password || !email) {
        return res.status(400).json({ message: "Username, Password and Email are required." });
    }
    const findUser = await User.findOne({ username });
    if (findUser) {
        return res.status(400).json({ message: "User already exists." });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        password: hashedPassword,
        email,
    });
    try {
        await User.create(newUser);
        return res.status(200).json({
            message: "User created successfully.",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                token: generateToken(newUser._id.toString()),
            },
        });
    } catch (error) {
        return res.status(500).json({ message: "Error creating user." });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials. User not found" });
        const isMatch = bcryptjs.compare(password, user.password);
        if (!isMatch)
            return res.status(200).json({ message: "Invalid credentials. Wrong password." });
        return res
            .status(200)
            .json({ _id: user._id, email: user.email, token: generateToken(user._id.toString()) });
    } catch (error) {
        return res.status(500).json({ message: "Login Error" });
    }
}
