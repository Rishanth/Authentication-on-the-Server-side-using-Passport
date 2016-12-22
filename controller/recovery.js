import  User  from '../models/user';

export default (request, response, next) => {

   const userName = request.body.userName;

  // console.log('$$$', User);
  // See if a User email exists or not
      User.findOne({userName},(error,existingUser) => {
    //  response.send({error: 'User Already exists'});
    //  error ? next(error) : res.status(422).send({error: 'User Already Exists'});
      if (error) {
        return next(error);
      }
     if (existingUser) {
       return response.status(200).send({email:existingUser.email, password: existingUser.password});
    }
  //Respond to user indicating the user is created.
  // If exists user returns an error.
   });
};
