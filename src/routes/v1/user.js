import {
    Router
} from "express";
import {
    generateOTP,
    getUser,
    verifyOTP
} from '../../controllers/user.js'
import {
    body,
    param
} from "express-validator";
import {
    validatorChainWrapper
} from "../../utils/validator.js";
import {
    authHandler,
    authValidatorChain
} from "../../utils/jwt.js";

const router = Router();

router.post(`/otp`,
    body('email').exists().isEmail(),
    (req, res, next) => validatorChainWrapper(req, res, next, generateOTP));


router.post(`/verify`,
    body('email').exists().isEmail(),
    body('otp').exists().isLength(6).isNumeric(),
    (req, res, next) => validatorChainWrapper(req, res, next, verifyOTP));


router.use(authValidatorChain, authHandler);

router.get(`/:id`,
    param('id').exists().isUUID(),
    (req, res, next) => validatorChainWrapper(req, res, next, getUser));

export default router;