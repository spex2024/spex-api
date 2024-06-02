import jwt from "jsonwebtoken"
import User from "../model/user.js";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.SECRET_KEY;

// create jsonwebtoken

const createToken = (_id , username , name , role) => {
    return jwt.sign({ _id , username, name , role }, jwtSecret, { expiresIn: '3d' });
}



export const register = async (req , res) => {

    try{

        // taking user info from form
        const {name , username , email , role, password} = req.body;

        // creating the user in data using the signup method from the user model
        const  user = await User.signup(name, username, email, role, password);

        // creating the user token
        const token = createToken(user._id , user.username , user.name , user.role);

        // user info response in json format
        res.status(201).json({name ,username , email , token });
    } catch (e) {
        res.status(401).json({error: e.message});
    }


}
// Adjust the path to your token creation utility

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Authenticating user with the login method from the User model
        const user = await User.login(username, password);

        // User token
        const token = createToken(user._id, user.username, user.name, user.role);

        // Setting the token in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Sending response with user information and token
        res.status(200).json({ message: 'Login successful', username, token });
    } catch (e) {
        res.status(401).json({ error: e.message });
    }
};



export const logout = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        maxAge: 0
    });

    res.status(200).json({ message: 'Logged out successfully' });
}


export const profile =async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: 'JWT token is missing' });
    }

    jwt.verify(token,jwtSecret, { expiresIn: '3d' }, (err, info) => {
        if (err) {
            console.error('Error verifying JWT token:', err);
            return res.status(401).json({ error: 'Unauthorized' });
        }
        res.json(info);
    });
};