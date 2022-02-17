const bcrypt = require('bcryptjs');
const helpers =  {};

helpers.encryptPassword = async (password) =>{
   const salt = await bcrypt.genSalt(10);
   const pass = await bcrypt.hash(password, salt);

   return pass;

};


helpers.matchPassword = async (password,passworddb) =>{
     return await bcrypt.compare(password, passworddb);
};
module.exports = helpers;