import express from 'express';
import passport from '../lib/auth/passport';

const router = express.Router();

router.get('/gitlab', passport.authenticate('gitlab'));

router.get(
  '/gitlab/callback',
  passport.authenticate('gitlab', {
    failureRedirect: '/login',
    session: false,
  }),
  (req, res) => {
    res.redirect('/');
  },
);

export default router;
