const mongoose = require('../lib/mongoose');
const Topic = require('../models/topics')
const Articles = require('../models/articles')


const getAllTopics = (req, res) => {
    console.log ('res')
    return Topic.find().lean()
    .then(topics => res.send(topics))
    .catch(error => console.log(error))
}

const getAllArticles = (req, res) => {
    return Articles.find({"belongs_to": req.params.topic_id}).lean()
    .then(result => res.send(result))
    .catch(error => console.log(error))
}

module.exports = {getAllTopics, getAllArticles }