const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const members = require('./Members')

// const logger = require('./middlewares/logger')

const app = express()

// Init middleware
// app.use(logger)

// Handlebars Middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.render('index', {
  title: 'Member App',
  members
}))

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Member API routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is started on port ${PORT}`))