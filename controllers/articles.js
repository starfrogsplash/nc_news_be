const mongoose = require('../lib/mongoose');
const Articles = require('../models/articles')
const Comments = require('../models/comments')


const getAllArticles = (req, res) => {
    let articles
    return Articles.find().lean()
        .then(results => {
            articles = results
            const commentsPromises = results.map( article =>  {
            return Comments.find({ 'belongs_to': article._id}).lean()
            }) 
        return Promise.all(commentsPromises)
        })
        .then (comments => {
            articles = articles.map((article, index)=>{
               article.comments = comments[index].length
               return article
                })
            res.send ({articles})
        })
        .catch(error => {
            console.log(error)
            res.status(404).send('Not Found!')
        })
}


const getSingleArticle = (req, res) => {
    return Articles.findOne({ _id: req.params.article_id }).lean()
        .then(article => {
            if (article === null) return res.status(404).send('Not Found!')
            else res.send({article})
        })
        .catch(error => {
            if (error.name === 'CastError') {
                res.status(400).send('Invalid ID')
            } else {
                res.status(500).send('Something went wrong!')
            }
        })
}



const getAllComments = (req, res) => {
    return Comments.find({ 'belongs_to': req.params.article_id }).lean()
        .then(comments => {
            res.send({ comments })
        })
        .catch(error => {
            console.log(error)
            if (error.name === 'CastError') res.status(400).send('Invalid ID')
        })
}

const putVoteArticles = (req, res) => {

    let count = 0;
    if (req.query.vote === 'up') count++
    if (req.query.vote === 'down') count--
    if (!req.query.vote) res.status(400).send('Not a valid query!')
    if (req.query.vote !== 'up' && req.query.vote !== 'down') res.status(404).send('blah blah clah')

    return Articles.findByIdAndUpdate({ _id: req.params.article_id }, { $inc: { "votes": count } }).lean()
        .then(results => {
            results.votes += count
            res.send(results)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send('Something broke!')
        })
}


module.exports = { getAllArticles, getSingleArticle, getAllComments, putVoteArticles }