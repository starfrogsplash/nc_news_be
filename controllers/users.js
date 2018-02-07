const mongoose = require('../lib/mongoose');
 const Username = require('../models/users')




const getUser = (req, res) => {
    return Username.findOne({username: req.params.username}).lean()
        .then(result => res.send(result))
        .catch(error => console.log(error))
}



module.exports = { getUser }