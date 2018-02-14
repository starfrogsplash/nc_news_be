const mongoose = require('../lib/mongoose');
const Topic = require('../models/topics')
const Articles = require('../models/articles')



const getAllTopics = (req, res) => {
    return Topic.find().lean()
    .then(topics => res.send({topics}))
    .catch(error => {
        res.status(500).send('Something broke!')
    })
}

const getAllArticles = (req, res) => {
    return Articles.find({"belongs_to": req.params.topic_id}).lean()
    .then(articles => res.send({articles}))
    .catch(error => {
        res.status(500).send('Something broke!')
    })
}

module.exports = {getAllTopics, getAllArticles }