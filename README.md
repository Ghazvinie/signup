# Sign Up App

## An app that allows a user to sign up with a few details. 

The app allows a user to sign up and access a protected resource.
- User signs up with username, email and password. Password is hashed and along with other details stored to the database.
- User can then sign in.
- On successful user authentication, user is provided a JWT, authorising access to a dashboard.
- Dashboard allows user to change password.
- CSRF tokens are used to make sure user POST requests are genuine.

### Built with:
- JavaScript
- NodeJs 10.19.0 / Express 4.17.1
- HTML / CSS
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
