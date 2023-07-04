import {
    Router
} from "express";
import {
    generateOTP,
    getUserProtected,
    updateUserProtected,
    verifyOTP
} from '../../controllers/user.js'
import {
    body,
    check,
    param
} from "express-validator";
import {
    copyFilesToBody,
    validateFileMetadata,
    validatorChainWrapper
} from "../../utils/validator.js";
import {
    authHandler,
    authValidatorChain
} from "../../utils/jwt.js";
import fileUpload from "express-fileupload";
import path from 'path';
import properties from "../../config/properties.js";
import {
    uploadProfilePictureProtected
} from "../../controllers/profilePicture.js";

const router = Router();

router.post(`/otp`,
    body('email').exists().isEmail(),
    (req, res, next) => validatorChainWrapper(req, res, next, generateOTP));


router.post(`/verify`,
    body('email').exists().isEmail(),
    body('otp').exists().isLength(6).isNumeric(),
    (req, res, next) => validatorChainWrapper(req, res, next, verifyOTP));


router.use(authValidatorChain, authHandler);

router.get(`/info`,
    (req, res, next) => validatorChainWrapper(req, res, next, getUserProtected));

router.put(`/update`,
    body('first_name').exists().isLength({
        min: 0,
        max: 40
    }),
    body('last_name').exists().isLength({
        min: 0,
        max: 40
    }),
    body('country').exists().isUUID(),
    body('state').exists().isUUID(),
    body('city').exists().isUUID(),
    (req, res, next) => validatorChainWrapper(req, res, next, updateUserProtected)

);

router.post(`/picture`,
    fileUpload({
        abortOnLimit: true,
        debug: (process.env.NODE_ENV !== 'production'),
        safeFileNames: true,
        useTempFiles: true,
        tempFileDir: path.resolve('temp'),
        preserveExtension: 4,
        limits: {
            fileSize: properties.fileUploadSizeLimit,
        },

    }),
    copyFilesToBody,
    body('image').exists().not().isEmpty().withMessage(`'image' empty or missing`).bail().custom(validateFileMetadata),
    (req, res, next) => validatorChainWrapper(req, res, next, uploadProfilePictureProtected));

export default router;