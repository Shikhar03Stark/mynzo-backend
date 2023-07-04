import {
    Router
} from 'express';
import user from './user.js';
import location from './location.js';

const router = Router();

router.use('/user', user);
router.use('/location', location);

export default router;