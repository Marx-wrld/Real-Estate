import Listing from '../models/listing.model.js';

export const createListing = async (req, res, next) => {
    try {
        //creating the model for listing and adding the rules to our app
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error)
    }
}