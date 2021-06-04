function errorHandler(error) {
    let errorObject = {email: '', password: ''}
    if (error.message === 'Incorrect username or email'){
        errorObject.email = error.message;
    }

    if (error.message === 'Incorrect password'){
        errorObject.password = error.message;
    }

    return errorObject;
}


module.exports = errorHandler;