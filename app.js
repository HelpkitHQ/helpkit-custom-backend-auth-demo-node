require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()

const { HELPKIT_VISITOR_SECRET_KEY: SECRET, HELPKIT_SITE_URL: SITE, PORT } = process.env

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

// serve login form
app.get('/login', (_, res) => {
  res.render('login', { error: null })
})

// handle login
app.post('/login', (req, res) => {
  const { username, password } = req.body
  // 🔒 mock check
  if (username === 'user' && password === 'pass') {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' })
    return res.redirect(`${SITE}/?jwt_token=${token}`)
  }
  res.render('login', { error: 'Invalid credentials' })
})

// fallback
app.get('*', (_, res) => res.redirect('/login'))

app.listen(PORT, () => {
  console.log(`🚀 Listening on http://localhost:${PORT}/login`)
})
