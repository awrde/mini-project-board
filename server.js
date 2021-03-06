const express = require('express')
const mongoose = require('mongoose')
const app = express()
const ejs = require('ejs')
const Article = require('./models/article')
const { find } = require('./models/article')

mongoose.connect('mongodb://test:test@localhost:27017/admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', async (req, res) => {
  console.log('전체 리스트 보기')
  res.render('./main')
})

app.get('/hh99/board/list', async (req, res) => {
  const articles = await Article.find({}).sort({ no: 'desc' })

  res.send({ articles: articles })
})

app.get('/hh99/board/post', async (req, res) => {
  console.log('글쓰기 페이지')
  res.render('./post')
})

app.post('/hh99/board/post', async (req, res) => {
  console.log(req.body)
  const article = new Article({
    title: req.body.title,
    comment: req.body.comment,
    author: req.body.author,
  })
  await article.save()
  res.send(article)
})

app.get('/hh99/board/view/', async (req, res) => {
  console.log('detail 보기')
  res.render('./view')
})

app.get('/hh99/board/view/:id', async (req, res) => {
  console.log('들어왔나')
  const article = await Article.findById(req.params.id)
  console.log(article)
  res.send(article)
})

app.listen(5000, function () {
  console.log('실행중...')
})
