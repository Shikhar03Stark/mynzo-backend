import jwt from "jsonwebtoken";
import properties from "../config/properties.js";
import {
    header,
    matchedData,
    validationResult
} from "express-validator";

import models from "../models/index.js";

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

export const authHandler = async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        next({
            ...err,
            status: 401
        });
    }

    try {
        const data = matchedData(req);
        const authorization = data.authorization;
        const bearer = extractBearer(authorization);

        const {
            id: userId,
        } = verifyJwt(bearer);

        const user = await models.User.findByPk(userId);
        if (!user) {
            const err = new Error(`Incorrect credentials`);
            err.status = 401;
            throw err;
        }

        req.user = user;
        next();

    } catch (error) {
        next(error)
    }

}

const extractBearer = (authHeader) => {
    const tokens = authHeader.split(' ');
    if (tokens.length != 2) {
        const err = new Error(`Invalid Bearer token`);
        err.status = 401;
        throw err;
    }

    return tokens[1];
}