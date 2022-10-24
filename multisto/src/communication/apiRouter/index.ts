import * as express from 'express';
import ApiRouter from './ApiRouter';

const router = express.Router();

router.use(ApiRouter);

export = router;
