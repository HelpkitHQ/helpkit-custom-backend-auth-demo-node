/**
 * HelpKit Custom Backend Authentication Demo
 *
 * This server demonstrates how to implement a custom authentication backend
 * for HelpKit's protected access feature using JWT.
 */

// Load environment variables from .env file
require('dotenv').config()

// Import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()

// Extract environment variables
const { HELPKIT_VISITOR_SECRET_KEY: SECRET, HELPKIT_SITE_URL: SITE, PORT = 9000 } = process.env

// Ensure required environment variables are set
if (!SECRET || !SITE) {
  console.error('❌ Error: HELPKIT_VISITOR_SECRET_KEY and HELPKIT_SITE_URL must be set in .env file')
  process.exit(1)
}

// Configure Express
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * Serve login form
 * This is the endpoint you would configure in HelpKit settings as your sign-in URL
 */
app.get('/login', (req, res) => {
  // Capture the returnTo parameter if present
  res.render('login', {
    error: null,
    returnTo: req.query.returnTo || null,
  })
})

/**
 * Handle login form submission
 * In a real application, you would authenticate against your user database
 */
app.post('/login', (req, res) => {
  const { username, password } = req.body
  const returnTo = req.query.returnTo || null

  // 🔒 Mock authentication - replace with your actual auth logic
  if (username === 'user' && password === 'demo') {
    // Create a JWT token with user information
    // You can include any user data in the payload that you want HelpKit to have
    const payload = {
      username,
      // You can add additional user information here, for example:
      // name: 'Demo User',
      // email: 'user@example.com',
      // role: 'admin'
    }

    // Sign the token with your HelpKit visitor signing key
    // You can adjust the expiration time as needed
    const token = jwt.sign(payload, SECRET, { expiresIn: '7d' })

    // Build the redirect URL
    let redirectUrl = `${SITE}/?jwt_token=${token}`
    if (returnTo) {
      redirectUrl += `&returnTo=${encodeURIComponent(returnTo)}`
    }

    console.log(`🔑 Generated JWT token for user: ${username}`)
    console.log(`🔄 Redirecting to: ${redirectUrl}`)

    // Redirect to HelpKit with the token and returnTo parameter
    return res.redirect(redirectUrl)
  }

  // Handle failed login - preserve the returnTo parameter in case of error
  res.render('login', {
    error: 'Invalid credentials',
    returnTo,
  })
})

// Redirect all other routes to login
app.get('*', (_, res) => res.redirect('/login'))

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at port: ${PORT} | Go to /login to test`)
  console.log(`🔐 HelpKit redirect URL: ${SITE}`)
})
