import mongoose, { Schema } from 'mongoose';

//Define our Model
const userSchema =  new Schema({
  email: {type: String, unique: true, lowercase:true },
  password: String,
  userName: String
});

//Create the model class
const ModelClass = mongoose.model('User', userSchema);

// Export ModelClass
export default ModelClass;
