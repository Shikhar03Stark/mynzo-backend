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

export const getUserProtected = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await models.User.findByPk(userId, {
            include: [{
                    model: models.Address,
                    include: [{
                            model: models.Country,
                        },
                        {
                            model: models.State,
                        },
                        {
                            model: models.City,
                        }
                    ]
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

export const updateUserProtected = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const firstname = req.body.first_name;
        const lastname = req.body.last_name;
        const countryId = req.body.country;
        const stateId = req.body.state;
        const cityId = req.body.city;

        const {
            country,
            state,
            city
        } = await checkIfAddressValid(countryId, stateId, cityId);


        let address = await models.Address.findOne({
            where: {
                user_id: userId,
            }
        });

        const user = await models.User.findByPk(userId);

        if (!address) {
            address = models.Address.build();
        }
        address.user_id = user.id;
        address.country_id = country.id;
        address.state_id = state.id;
        address.city_id = city.id;
        await address.save();

        user.address = address;
        user.first_name = firstname;
        user.last_name = lastname;

        await user.save();

        res.sendStatus(200);

    } catch (error) {
        next(error);
    }
}

const checkIfAddressValid = async (countryId, stateId, cityId) => {
    const country = await models.Country.findByPk(countryId);
    if (!country) {
        const err = new Error(`No country associated with id ${countryId}`);
        err.status = 400;
        throw err;
    }

    const state = await models.State.findByPk(stateId);
    if (!state) {
        const err = new Error(`No state associated with id ${stateId}`);
        err.status = 400;
        throw err;
    }

    if (state.country_id !== country.id) {
        const err = new Error(`State ${state.value} does not exists within the country ${country.value}`);
        err.status = 400;
        throw err;
    }

    const city = await models.City.findByPk(cityId);
    if (!city) {
        const err = new Error(`No city associated with id ${cityId}`);
        err.status = 400;
        throw err;
    }

    if (city.state_id !== state.id) {
        const err = new Error(`City ${state.value} does not exists within the state ${country.value}`);
        err.status = 400;
        throw err;
    }

    return {
        country,
        state,
        city
    };
}