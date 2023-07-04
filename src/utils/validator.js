import {
    validationResult
} from "express-validator";
import path from 'path';

const allowedExtensions = ['.jpeg', '.jpg', '.png', '.gif', '.heic'];

export const validatorChainWrapper = async (req, res, next, ctrl) => {
    const err = validationResult(req);
    if (err.isEmpty()) {
        return await ctrl(req, res, next);
    }

    next({
        ...err,
        status: 400
    });

}

export const copyFilesToBody = async (req, res, next) => {
    for (let file in req.files) {
        req.body[file] = req.files[file];
    }
    next();
}

export const validateFileMetadata = async (file) => {
    const extname = path.extname(file.name);
    const found = allowedExtensions.findIndex(item => item === extname.toLowerCase());
    if (found < 0) {
        const err = new Error(`Uploaded file format is not supported`);
        err.status = 400;
        throw err;
    }
}