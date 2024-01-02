import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
    try {
        console.log('Incoming request body:', req.body);
        //creating the model for listing and adding the rules to our app
        const listing = await Listing.create(req.body);
        console.log('Listing created successfully:', listing);
        return res.status(201).json(listing);
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Handle Mongoose validation errors
            console.error('Validation error:', error.message);
            return res.status(400).json({ success: false, message: error.message });
        }
        console.error('Error creating listing:', error);
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if(!listing){
        return next(errorHandler('Listing not found!', 404));
    }
    if(req.user.id !== listing.userRef.toString()){
        return next(errorHandler('Not authorized!', 401));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted successfully!');
    } catch (error) {
        next(error)
    }
};

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if(!listing){
        return next(errorHandler('Listing not found!', 404));
    }
    if(req.user.id !== listing.userRef.toString()){
        return next(errorHandler('Not authorized!', 401));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error)
    }
};

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler('Listing not found!', 404));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

export const getListings = async (req, res, next) => {
    try {
        console.log('Incoming request to get listings:', req.query);
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        //queries

        let offer = req.query.offer;

        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] };
        }

        let furnished = req.query.furnished;

        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] };
        }

        let parking = req.query.parking;

        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        }

        let type = req.query.type;

        if (type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent']}
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        //getting the listings
        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' }, //regex for search term and i meaning don't mind the letter casing
            offer,
            furnished,
            parking,
            type,
        }).sort(
            {[sort]: order} //sorting by ascending/descending order
        ).limit(limit).skip(startIndex); //limiting the number of listings to 9 per page
        console.log('Listings fetched successfully:', listings);

        return res.status(200).json(listings);

    } catch (error) {
        console.error('Error fetching listings:', error);
        next(error);
    }
};