const mongoose = require('mongoose');
const userSchema = require('./userSchema');

const Citizen = mongoose.model('Citizen', userSchema, 'citizens');
const Government = mongoose.model('Government', userSchema, 'governments');

const getUserModel = (role) => {
  if (role === 'government') return Government;
  return Citizen;
};

const findUserByEmail = async (email) => {
  let user = await Citizen.findOne({ email });
  if (user) return user;
  return await Government.findOne({ email });
};

module.exports = {
  Citizen,
  Government,
  getUserModel,
  findUserByEmail
};

