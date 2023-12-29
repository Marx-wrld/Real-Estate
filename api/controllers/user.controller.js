import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';

export const test = (req, res) => {
    res.json({
        message: 'API route is working'
    });
};

export const updateUser = async (req, res, next) => {
    //checking if the id sent is equal to the params id
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your account!"));

    //if the user-id is correct, we update the user
    try {
        //hashing the password if the user is trying to change the password
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10); // 10, the number of rounds for the salt
        }

        // updating the user
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            // set method checks whether the data is being changed else it ignores the data
            $set: {
                username: req.body.username,
                email: req.body.email,
                // Only update the password if it's provided in the request
                ...(req.body.password && { password: req.body.password }),
                avatar: req.body.avatar
            } // new - true, returns and saves the user with the new information
        }, { new: true });

        // separating the password from the rest
        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only delete your account!"));
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token');
        res.status(200).json({ success: true, message: 'User has been deleted!' });
    } catch(error){
        next(error)
    }
};

export const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id){
        try {
            const listings = await Listing.find({ userRef: req.params.id });
            res.status(200).json(listings);
        } catch (error) {
            next(error);
        }

    } else {
        return next(errorHandler(401, "You can only view your listings!"));
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...rest } = user._doc;
        if (!user) return next(errorHandler(404, "User not found!"));
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};