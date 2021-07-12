const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(mongoose.connection)

const articlesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  no: { type: Number, unique: true },
  comment: { type: String },
  author: { type: String },
})

articlesSchema.plugin(autoIncrement.plugin, {
  model: 'Article',
  field: 'no',
  startAt: 1, //시작
  increment: 1, // 증가
})

module.exports = mongoose.model('Article', articlesSchema)

// articles: [
//   {
//     _id: '6075cb84fb96a8948253d4c1',
//     author: '글쓴이',
//     comment: '내용123',
//     no: '4',
//     title: '제목입니다123',
//   },
// ]
