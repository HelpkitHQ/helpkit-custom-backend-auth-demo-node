# HelpKit Custom Backend Authentication Demo

This is a sample Node.js application demonstrating how to implement custom backend authentication with HelpKit's protected access feature. The demo uses JWT (JSON Web Tokens) for authentication.

## Overview

HelpKit's protected access feature allows you to restrict access to your knowledge base to authenticated users only. This demo shows how to:

1. Implement a custom login page
2. Authenticate users against your own backend
3. Generate a JWT token after successful authentication
4. Redirect users back to HelpKit with the token
5. Allow HelpKit to validate the token and grant access

## Authentication Flow

```
┌──────────┐                 ┌─────────────┐                ┌──────────┐
│  User    │                 │ Your Auth   │                │ HelpKit  │
│  Browser │                 │ Server      │                │ Site     │
└────┬─────┘                 └──────┬──────┘                └────┬─────┘
     │                              │                            │
     │  1. Visit HelpKit Site       │                            │
     │ ─────────────────────────────────────────────────────────>│
     │                              │                            │
     │  2. Redirect to Login        │                            │
     │ <─────────────────────────────────────────────────────────│
     │                              │                            │
     │  3. Visit Auth Server        │                            │
     │ ─────────────────────────────>│                           │
     │                              │                            │
     │  4. Show Login Form          │                            │
     │ <─────────────────────────────│                           │
     │                              │                            │
     │  5. Submit Credentials       │                            │
     │ ─────────────────────────────>│                           │
     │                              │                            │
     │  6. Validate Credentials     │                            │
     │                  ┌───────────┘                            │
     │                  │                                        │
     │                  │ 7. Generate JWT                        │
     │                  └───────────┐                            │
     │                              │                            │
     │  8. Redirect with JWT Token  │                            │
     │ <─────────────────────────────────────────────────────────│
     │                              │                            │
     │  9. Access with JWT Token    │                            │
     │ ─────────────────────────────────────────────────────────>│
     │                              │                            │
     │                              │        10. Verify JWT      │
     │                              │             Token          │
     │                              │        ┌─────────────┐     │
     │                              │        │             │     │
     │                              │        └─────────────┘     │
     │                              │                            │
     │  11. Grant Access            │                            │
     │ <─────────────────────────────────────────────────────────│
     │                              │                            │
```

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- A HelpKit site with protected access enabled
- A visitor secret signing key from HelpKit

## Setup Instructions

1. Clone this repository:

   ```
   git clone https://github.com/helpkit/custom-backend-auth-demo.git
   cd custom-backend-auth-demo
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   HELPKIT_VISITOR_SECRET_KEY=your_visitor_signing_key
   HELPKIT_SITE_URL=https://your-helpkit-site.com/access
   PORT=4000
   ```

4. Start the server:

   ```
   npm start
   ```

5. Visit `http://localhost:4000/login` to see the login form.

## How It Works

1. Users visit your custom login page (`/login`)
2. After successful authentication, your backend:
   - Generates a JWT token signed with your HelpKit visitor signing key
   - Redirects users to your HelpKit site with the token (`https://your-project-name.helpkit.so/access?jwt_token=...`)
3. HelpKit validates the token and grants access if valid

## Demo Credentials

For demo purposes, this application has hardcoded credentials:

- Username: `user`
- Password: `demo`

In a production environment, you would authenticate against your user database.

## Setting Up HelpKit

1. In your HelpKit project settings, enable "Custom Backend Authentication"
2. Set your "Sign-in URL" to point to your login endpoint (e.g., `https://your-auth-server.com/login`)
3. Copy the generated visitor signing key to your `.env` file

## Customization

You can customize the login page by modifying the `views/login.ejs` template.

## Security Considerations

- Always use HTTPS in production
- Store your visitor signing key securely
- Set appropriate expiration times for your JWT tokens
- Implement proper user authentication logic

## License

MIT
