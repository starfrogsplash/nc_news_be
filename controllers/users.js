const Username = require('../models/users');

const getUser = (req, res) => {
  return Username.findOne({username: req.params.username}).lean()
    .then(users => {
      if (users === null) return res.status(404).send('Not Found!');
      res.send({users});
    })
    .catch(error => {
      res.status(500).send('Something broke!', error);
    });
};



module.exports = { getUser };