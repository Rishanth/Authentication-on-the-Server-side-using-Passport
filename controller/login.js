import  User  from '../models/user';
import jwt from 'jwt-simple';
import config from '../config';

export default (request, response, next) => {

   const email = request.body.email;
   const password = request.body.password;
   const timeStamp = new Date().getTime();

   const tokenForUser = (user) => {
       return jwt.encode({sub:user.id, email: user.email, iat:timeStamp}, config.SECRET);
   };


  // console.log('$$$', User);
  // See if a User email exists or not
      User.findOne({email, password} ,(error,existingUser) => {
    //  response.send({error: 'User Already exists'});
    //  error ? next(error) : res.status(422).send({error: 'User Already Exists'});
      if (error) {
        return next(error);
      }
     if (existingUser) {
       return response.status(200).send({token: tokenForUser(existingUser)});
    }
       return response.status(404).send({error: 'User Not Found' });
  //Respond to user indicating the user is created.
  // If exists user returns an error.
   });
};
