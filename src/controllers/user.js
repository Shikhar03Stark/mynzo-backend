import {
    Op
} from 'sequelize';
import models from '../models/index.js';
import {
    getExpireDateFromNow,
    getRandomToken
} from '../utils/token.js';
import {
    issueJwt
} from '../utils/jwt.js';
import MediaType from '../models/enums/MediaType.js';

export const generateOTP = async (req, res, next) => {
    try {
        const email = req.body.email;
        const user = await models.User.findOne({
            where: {
                email: email,
            }
        });
        const newToken = getRandomToken();
        if (user) {
            // login
            await user.update({
                token: newToken,
                token_expiry: getExpireDateFromNow(),
            }, {
                where: {
                    id: user.id,
                }
            });

            // send token to user via email.
            // loging to console for now
            console.log(`The OTP for email: ${email} is ${newToken}`);
            res.status(202).json();

        } else {
            // signup
            const newUser = await models.User.create({
                email: email,
                token: newToken,
                token_expiry: getExpireDateFromNow(),
            });

            // send token to user via email.
            // loging to console for now
            console.log(`The OTP for email: ${email} is ${newToken}`);
            res.status(201).json();
        }
    } catch (error) {
        next(error);
    }
}

export const verifyOTP = async (req, res, next) => {
    try {
        const email = req.body.email;
        const token = parseInt(req.body.otp);

        const user = await models.User
            .findOne({
                where: {
                    [Op.and]: {
                        email,
                        token,
                    }
                }
            });

        if (!user) {
            const err = new Error(`The OTP did not match`);
            err.status = 401;
            throw err;
        }

        const currentTime = Date.now();
        const expireTime = user.token_expiry.getTime();

        if (currentTime > expireTime) {
            const err = new Error(`The OTP expired, please try again`);
            err.status = 401;
            throw err;
        }

        const jwt_token = issueJwt(user);

        await user.update({
            token: null,
            token_expiry: null,
        });

        res.status(201).json({
            user,
            token: jwt_token,
        });

    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const user = await models.User.findByPk(userId, {
            include: [{
                    model: models.Address
                },
                {
                    model: models.ProfilePicture,
                }
            ]
        });

        if (!user) {
            const err = new Error(`User with id ${userId} not found`);
            err.status = 404;
            throw err;
        }

        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
}