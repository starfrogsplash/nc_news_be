const Topic = require('../models/topics');
const Articles = require('../models/articles');
const Comments = require('../models/comments');



const getAllTopics = (req, res) => {
  return Topic.find().lean()
    .then(topics => res.send({topics}))
    .catch(error => {
      res.status(500).send('Something broke!', error);
    });
};




const getAllArticles = (req, res) => {
  let articles;
  return Articles.find({'belongs_to': req.params.topic_id}).lean()
    .then(results => {
      articles = results;
      const commentsPromises = results.map( article =>  {
        return Comments.find({ 'belongs_to': article._id}).lean();
      }); 
      return Promise.all(commentsPromises);
    })
    .then (comments => {
      articles = articles.map((article, index)=>{
        article.comments = comments[index].length;
        return article;
      });
      return res.send ({articles});
    })
    .catch(error => {
      return res.status(500).send('Something went wrong!', error);
    });
};

module.exports = {getAllTopics, getAllArticles };