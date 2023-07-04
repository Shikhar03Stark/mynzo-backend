import {
    validationResult
} from "express-validator";

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