import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitLabStrategy } from 'passport-gitlab2';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import User from '../../database/controllers/models/user_model';

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  User.findOne({ where: { username } }, (err, user) => {
    done(err, user);
  });
});

// Local Strategy
passport.use(
  new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, (username, password, done) => {
    // Match User
    User.findOne({ where: { username } })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Invalid credentials' });
        }

        const match = bcrypt.compareSync(password, user.password);

        if (match) {
          return done(null, user);
        }

        return done(null, false, { message: 'Invalid credentials' });
      })
      .catch((err) => done(null, false, { message: err }));
  }),
);

const { GITLAB_APP_ID, GITLAB_APP_SECRET, API_URL } = process.env;

if (GITLAB_APP_ID && GITLAB_APP_SECRET && API_URL) {
  passport.use(new GitLabStrategy(
    {
      clientID: GITLAB_APP_ID,
      clientSecret: GITLAB_APP_SECRET,
      callbackURL: `${API_URL}/auth/gitlab/callback`,
    },
    (async (_, __, profile, cb) => {
      const existingGitlabUser = await User.findOne({
        where: { gitlabId: profile.id },
      });

      // Linked user exists
      if (existingGitlabUser) {
        return cb(null, existingGitlabUser);
      }

      const existingUser = await User.findOne({
        where: { username: profile.username },
      });

      // Otherwise, unlinked user exists
      if (existingUser) {
        existingUser.gitlabId = profile.id;
        await existingUser.save();
        return cb(null, existingUser);
      }

      // Completely new user
      const [user] = await User.findOrCreate({
        where: { gitlabId: profile.id, username: profile.username, secret: uuidv4() },
      });

      if (user) {
        return cb(null, user);
      }

      return cb(null, null);
    }),
  ));
}

export default passport;
