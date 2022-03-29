import express from 'express';
import createCredentials from '../database/controllers/credentials_controller';

const router = express.Router();
router.post('', createCredentials);

export default router;
