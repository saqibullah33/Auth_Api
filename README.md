# User Authentication System Documentation

This documentation provides an overview of a user authentication system implemented using Node.js, Express.js, MongoDB (Mongoose), and various npm packages. The system allows users to sign up, log in, view their profile data, log out, send an OTP (One-Time Password) for email verification, and reset their password. The application is structured into multiple files, each with its specific functionality.

## Files Overview

1. **server.js**: The main server file that sets up the Express.js application and handles user authentication routes.

2. **routes.js**: Defines the API routes and associates them with controller functions for user registration, login, profile access, logout, sending OTPs, and password reset.

3. **app.js**: The entry point for the Node.js application, configures middleware, includes authentication routes, and starts the server.

4. **model.js**: Defines the Mongoose schema for the User model, including a pre-save hook for password hashing.

Let's explore each file's functionality and components.

---

## File: server.js

### Dependencies
- **mongoose**: MongoDB driver for Node.js.
- **cookie-parser**: Middleware for parsing cookies in Express.js.
- **express**: Web application framework for Node.js.
- **jsonwebtoken**: Package for generating and verifying JSON Web Tokens (JWTs).
- **bcrypt**: Library for hashing and comparing passwords.
- **nodemailer**: Module for sending email notifications.
- **dotenv**: Package for loading environment variables from a .env file.

### Server Setup and Database Connection
- Initializes an Express.js server.
- Configures middleware for parsing cookies.
- Establishes a connection to the MongoDB database using Mongoose.
- Handles user registration, login, profile access, logout, sending OTPs, and password reset.

For more details, see the full documentation for [server.js](server.md).

---

## File: routes.js

### Dependencies
- **express**: Web application framework for Node.js.
- **../Controller/controller**: The controller module containing functions for user authentication.

### Router Setup
- Creates an Express Router to define authentication routes.

### Route Definitions
- Defines API routes for user registration, login, profile access, logout, sending OTPs, and password reset.

For more details, see the full documentation for [routes.js](routes.md).

---

## File: app.js

### Dependencies
- **express**: Web application framework for Node.js.
- **cookie-parser**: Middleware for parsing cookies in Express.js.
- **dotenv**: Package for loading environment variables from a .env file.
- **./Routes/auth**: The authentication routes module, imported as auth.

### Server Setup
- Initializes an Express.js server.
- Configures middleware for parsing JSON and cookies.
- Includes the authentication routes from the auth module.
- Logs cookies attached to incoming requests for debugging.

For more details, see the full documentation for [app.js](app.md).

---

## File: model.js

### Dependencies
- **mongoose**: MongoDB driver for Node.js.
- **bcrypt**: Library for hashing and comparing passwords.

### Schema Definition
- Defines the Mongoose schema for the User model with fields for username, email, password, and otp (One-Time Password) for email verification.

### Pre-Save Hook
- Implements a pre-save hook to hash the user's password before saving it to the database.

For more details, see the full documentation for [model.js](model.md).

---

## Conclusion

This documentation provides a comprehensive overview of the user authentication system, including its structure, dependencies, and key functionality. The system follows best practices for user authentication and security, ensuring that user data is handled securely. Users can register, log in, access their profile, log out, receive OTPs for email verification, and reset their password, making it a robust and secure authentication solution.
