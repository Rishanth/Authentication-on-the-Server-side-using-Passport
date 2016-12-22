import authentication from './controller/authentication';
import recovery from './controller/recovery';
import login from './controller/login';
import passportService from './services/passport';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

export default (app) => {

app.get('/', requireAuth, (error,response) => {
  response.send({hi:'there'});
});

app.post('/signup', authentication);
app.post('/recovery', recovery);
app.post('/login',  requireSignin,login);
};
