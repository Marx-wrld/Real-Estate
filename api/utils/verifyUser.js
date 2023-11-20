import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    //verifying it
    if (!token) return next(errorHandler(401, 'Unauthorized!'));

    //checking if token is correct
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden!'));
        
        //if there is no error we send it to the next function which is to update the user
        req.user = user; //sending the user data to the request
        next(); //sends to the next step which is to update the user

    });
};