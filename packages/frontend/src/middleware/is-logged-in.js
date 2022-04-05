import router from 'page';
import tokenStore from '../stores/token';

export default function (ctx, next) {
  let token;

  tokenStore.subscribe((tokenValue) => {
    token = tokenValue;
  });

  if (token && token.token) {
    next();
  } else {
    router.redirect('/');
  }
}
