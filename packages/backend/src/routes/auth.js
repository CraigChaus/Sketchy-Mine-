import express from 'express';
import { createToken } from '../database/controllers/credentials_controller';
import passport from '../lib/auth/passport';

const router = express.Router();
const CLIENT_URL = process.env.CLIENT_URL ?? 'http://localhost:8080';

if (CLIENT_URL) {
  const ssoCallback = async (req, res) => {
    const token = await createToken(req.user.username);
    return res.redirect(`${CLIENT_URL}/auth?token=${token}`);
  };

  router.get('/gitlab', passport.authenticate('gitlab'));

  router.get(
    '/gitlab/callback',
    passport.authenticate('gitlab', {
      session: false,
    }),
    ssoCallback,
  );
}

export default router;
