import { Router } from 'express';
import UserController from './user/UserController';
import AuthController from './auth/AuthController';
import AuthMiddleware from './auth/AuthMiddleware';

const router = Router();

router.post('/users', UserController.store);
router.get('/users', AuthMiddleware, UserController.index);
router.post('/auth', AuthController.authenticate);

export default router;
