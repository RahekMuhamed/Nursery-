const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


//create object from mongoose schema
const teacherSchema = new mongoose.Schema({
    objectID:Number,
    fullname: String,
    password:String,
    email:String,
    image: String
  });


  // Middleware to hash password before saving
teacherSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
      const hashedPassword = await bcrypt.hash(this.password, 10); // Hash password with salt rounds = 10
      this.password = hashedPassword;
      next();
  } catch (error) {
      next(error);
  }
});


//mappping the schema to a collection
const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;








