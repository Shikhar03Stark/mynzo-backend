import jwt from "jsonwebtoken";
import properties from "../config/properties.js";
import {
    header,
    validationResult
} from "express-validator";


export const issueJwt = (user) => {
    return jwt.sign({
        id: user.id
    }, properties.jwtSecret, {
        expiresIn: properties.jwtExpireSeconds
    });
}

export const verifyJwt = (token) => {
    return jwt.verify(token, properties.jwtSecret);
}

export const authValidatorChain = [
    header("authorization")
    .exists()
    .withMessage("No Authorization headers provided")
    .bail()
    .contains("Bearer")
    .withMessage("Authorization does not contain Bearer")
];

export const authHandler = (req, res, next) => {
    const err = validationResult(req);
    if (err.isEmpty()) {
        return next();
    }

    next({
        ...err,
        status: 401
    });
}