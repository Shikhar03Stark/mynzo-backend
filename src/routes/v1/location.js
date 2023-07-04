import {
    Router
} from "express";
import {
    query
} from "express-validator";
import {
    validatorChainWrapper
} from "../../utils/validator.js";

import {
    searchCity,
    searchCountry,
    searchState
} from "../../controllers/location.js";

const router = Router();

router.get(`/country`,
    query('search')
    .exists()
    .withMessage(`Search query missing from path`),
    query('limit')
    .optional()
    .isNumeric()
    .withMessage(`Limit must be a number`),
    (req, res, next) => validatorChainWrapper(req, res, next, searchCountry)
);

router.get(`/state`,
    query('search')
    .exists()
    .withMessage(`Search query missing from path`),
    query('country')
    .exists()
    .withMessage(`Select country before searching for state`)
    .isUUID()
    .withMessage(`Country is not a valid uuid`),
    query('limit')
    .optional()
    .isNumeric()
    .withMessage(`Limit must be a number`),
    (req, res, next) => validatorChainWrapper(req, res, next, searchState)
);

router.get(`/city`,
    query('search')
    .exists()
    .withMessage(`Search query missing from path`),
    query('state')
    .exists()
    .withMessage(`Select state before searching for city`)
    .isUUID()
    .withMessage(`State is not a valid uuid`),
    query('limit')
    .optional()
    .isNumeric()
    .withMessage(`Limit must be a number`),
    (req, res, next) => validatorChainWrapper(req, res, next, searchCity)
);

export default router;