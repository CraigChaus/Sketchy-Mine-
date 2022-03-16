import express from 'express';
import create from '../database/controllers/credentials_controller';

const router = express.Router();
router.post('', create);

export default router;
