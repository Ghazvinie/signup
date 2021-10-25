# Sign Up App

## An app that allows a user to sign up with a few details. 

The app allows a user to sign up and access a protected resource.
- User signs up with username, email and password. Password is hashed and along with other details stored to the database.
- User can then sign in.
- On successful user authentication, user is provided a JWT, authorising access to a dashboard.
- Dashboard allows user to change their password.
- The user can sign out, clearing the JWT and their session.
- CSRF tokens are used to make sure user POST requests are genuine.

### Built with:
- Node.js 14.18.1 / Express 4.17.1
- MongoDB / Mongoose 5.12.12

### To run:

```
$ npm install
```

```
$ npm run start
```

The app is now accessible from localhost:[YOUR_PORT]

You will need to provide your own MongoDB URI in environmental variables (process.env.MONG_URI).

### Tests


### License 
