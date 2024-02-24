const mongoose = require("mongoose");

//create object from mongoose schema
const classSchema = new mongoose.Schema({
  _id:Number,
  name: String,
  supervisor: {
    type: Number,
    ref: 'Teacher'
},
  children: [{
    type: Number,
    ref: 'Child'
  }]
});

//mappping the schema to a collection
const Class = mongoose.model('Class', classSchema);

module.exports = Class;


