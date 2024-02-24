const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//create object from mongoose schema
const childSchema = new mongoose.Schema({
    _id:Number,
  fullName:String,
  age:Number,
  level: {
    type: String,
    enum: ['PreKG', 'KG1', 'KG2'],
  },
  address: {
    city:String,
    street:String,
    building:Number,
  }
});

// Middleware to hash password before saving
childSchema.pre('save', async function (next) {
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
const Child = mongoose.model('Child', childSchema);

module.exports = Child;



