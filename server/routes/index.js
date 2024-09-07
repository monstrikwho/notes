import Router from 'express';
import notes from './notes.router.js';

const router = new Router();

router.use('/notes', notes);

export default router;
