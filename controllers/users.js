const mongoose = require('../lib/mongoose');
 const Username = require('../models/users')




const getUser = (req, res) => {
    return Username.findOne({username: req.params.username}).lean()
        .then(users => res.send({users}))
        .catch(error => console.log(error))
}



module.exports = { getUser }