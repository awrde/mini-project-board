const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
var connection = mongoose.createConnection('mongodb://localhost/myDatabase')
autoIncrement.initialize(mongoose.connection)

const articlesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  no: { type: Number },
  comment: { type: String },
  author: { type: String },
})

articlesSchema.plugin(autoIncrement.plugin, {
  model: 'Article',
  field: 'no',
  startAt: 1, //시작
  autoIncrement: 1, // 증가
})

var Article = connection.model('Article', articlesSchema),
  article = new Article()

article.save(function (err) {
  // article._id === 100 -> true

  article.nextCount(function (err, count) {
    // count === 101 -> true

    article.resetCount(function (err, nextCount) {
      // nextCount === 100 -> true
    })
  })
})

module.exports = mongoose.model('Article', articlesSchema)
