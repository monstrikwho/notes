import Router from 'express';
import Schema from '#schemas/notes';
import Controller from '#controllers/notes';
import { isUserMiddleware as isUser, validateMiddleware as validate } from '#middlewares';

const router = new Router();

router.get('/list', isUser, Controller.list);
router.post('/create', isUser, [validate(Schema.create)], Controller.create);
router.get('/clear', isUser, Controller.clear);

export default router;
