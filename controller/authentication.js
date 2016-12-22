import jwt from 'jwt-simple';
import  User  from '../models/user';
import config from '../config';
export default (request, response, next) => {

   const email = request.body.email;
   const password = request.body.password;
   const userName = request.body.userName;
   const timeStamp = new Date().getTime();

   const tokenForUser = (user) => {
       return jwt.encode({sub:user.id, email: user.email, iat:timeStamp}, config.SECRET);
   };



  // console.log('$$$', User);
  // See if a User email exists or not
      User.findOne({email},(error,existingUser) => {
    //  response.send({error: 'User Already exists'});
    //  error ? next(error) : res.status(422).send({error: 'User Already Exists'});
      if (error) {
        return next(error);
      }
     if (existingUser) {
       return response.status(422).send({error: 'A valid user exists' });
    }
  //Respond to user indicating the user is created.
  // If exists user returns an error.
     const user = new User({
      email,
      password,
      userName
    });

    user.save((err) => {
     if (err) {
       return next(err);
     }
     const token = tokenForUser(user);
      //return response.json(user.id);
       return response.json({token});
   });
   });
};
