const Articles = require('../models/articles');
const Comments = require('../models/comments');


const getAllArticles = (req, res) => {
  let articles;
  return Articles.find().lean()
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


const getSingleArticle = (req, res) => {
  return Articles.findOne({ _id: req.params.article_id }).lean()
    .then(article => {
      if (article === null) return res.status(404).send('Not Found!');
      else return res.send({article});
    })
    .catch(error => {
      if (error.name === 'CastError') {
        return res.status(400).send('Invalid ID');
      } else {
        return res.status(500).send('Something went wrong!');
      }
    });
};


const getAllComments = (req, res) => {
  return Comments.find({ 'belongs_to': req.params.article_id }).lean()
    .then(comments => {
      return res.send({ comments });
    })
    .catch(error => {
      if (error.name === 'CastError') return res.status(400).send('Invalid ID');
    });
};

// const putVoteArticles = (req, res) => {

//   let count = 0;
//   if (req.query.vote === 'up') count++;
//   if (req.query.vote === 'down') count--;
//   if (!req.query.vote) return res.status(400).send({'message': 'Please provide a query in the format vote=up or vote=down'});
//   if (req.query.vote !== 'up' && req.query.vote !== 'down') return res.status(400).send({'message':'vote can only be up or down'});

//   return Articles.findByIdAndUpdate({ _id: req.params.article_id }, { $inc: { 'votes': count } }).lean()
//     .then(results => {
//       results.votes += count;
//       return res.send(results);
//     })
//     .catch(error => {
//       return res.status(500).send('Something broke!', error);
//     });
// };


const putVoteArticles = (req, res) => {

  let count = 0;
  if (req.query.vote === 'up') count++;
  if (req.query.vote === 'down') count--;
  if (!req.query.vote) return res.status(400).send({'message': 'Please provide a query in the format vote=up or vote=down'});
  if (req.query.vote !== 'up' && req.query.vote !== 'down') return res.status(400).send({'message':'vote can only be up or down'});

  return Articles.findByIdAndUpdate({ _id: req.params.article_id }, { $inc: { 'votes': count } }).lean()
    .then(results => {
      results.votes += count;
      return results;
    })
    .then(result =>{
      return Promise.all([result, Comments.find({ 'belongs_to': req.params.article_id}).lean() ]) ;
    })
    .then (result =>{
      // result.comments = Comments.find({ 'belongs_to': req.params.article_id}).lean();
      const article = result[0];
      article.comments = result[1].length;
      return res.send(article);
    })
    .catch(error => {
      return res.status(500).send('Something broke!', error);
    });
};









module.exports = { getAllArticles, getSingleArticle, getAllComments, putVoteArticles };