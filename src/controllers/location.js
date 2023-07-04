import {
    Op
} from 'sequelize';
import models from '../models/index.js';

export const searchCountry = async (req, res, next) => {
    try {
        const search = decodeURI(req.query.search);
        const limit = req.query.limit ? parseInt(req.query.limit) : 5;

        const countries = await models.Country.findAll({
            where: {
                value: {
                    [Op.like]: `%${search.toUpperCase()}%`,
                }
            },
            limit
        });

        res.status(200).json(countries);


    } catch (error) {
        next(error);
    }
}

export const searchState = async (req, res, next) => {
    try {
        const search = decodeURI(req.query.search);
        const countryId = req.query.country;
        const limit = req.query.limit ? parseInt(req.query.limit) : 5;

        const country = await models.Country.findByPk(countryId);

        if (!country) {
            const err = new Error(`Country does not exists with id ${countryId}`);
            err.status = 400;
            throw err;
        }

        const states = await models.State.findAll({
            where: {
                [Op.and]: {
                    country_id: countryId,
                    value: {
                        [Op.like]: `%${search.toUpperCase()}%`,
                    }
                }
            },
            limit
        });

        res.status(200).json(states);
    } catch (error) {
        next(error);
    }
}

export const searchCity = async (req, res, next) => {
    try {
        const search = decodeURI(req.query.search);
        const stateId = req.query.state;
        const limit = req.query.limit ? parseInt(req.query.limit) : 5;

        const state = await models.State.findByPk(stateId);

        if (!state) {
            const err = new Error(`State does not exists with id ${stateId}`);
            err.status = 400;
            throw err;
        }

        const cities = await models.City.findAll({
            where: {
                [Op.and]: {
                    state_id: stateId,
                    value: {
                        [Op.like]: `%${search.toUpperCase()}%`,
                    }
                }
            },
            limit
        });

        res.status(200).json(cities);
    } catch (error) {
        next(error);
    }
}