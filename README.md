# Sign Up App

## An app that allows a user to sign up with a few details. 

The app allows a user to create a profile providing an email, username and password. The password is hashed before the user is stored in the database. When the user signs in and is authenticated, they are provided a JWT and authorised to access a dashboard page. If the user is set as an admin then they can also have access to a list of users.

### Built with:
- JavaScript
- NodeJs / Express
- HTML / CSS
- MongoDB / Mongoose
- Bcrypt / JWT

### To run:

```
$ npm install
```

```
$ npm run start
```

```
app is now accessible from localhost
````

You will need to provide your own MongoDB URI in environmental variables (process.env.MONG_URI).

### Tests


### License 
