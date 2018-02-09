const mongoose = require('../lib/mongoose');
const Topic = require('../models/topics')
const Articles = require('../models/articles')



const getAllTopics = (req, res) => {
    console.log ('res')
    return Topic.find().lean()
    .then(topics => res.send({topics}))
    .catch(error => {
        console.log(error)
        res.status(404).send('Not Found!')
    })
}

const getAllArticles = (req, res) => {
    return Articles.find({"belongs_to": req.params.topic_id}).lean()
    .then(articles => res.send({articles}))
    .catch(error => {
        console.log(error)
        res.status(404).send('Not Found!')
    })
}

module.exports = {getAllTopics, getAllArticles }