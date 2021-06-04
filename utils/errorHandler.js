function errorHandler(error) {
    let errorObject = { email: '', password: '', username: '' }
    if (error.message === 'Incorrect username or email') {
        errorObject.email = error.message;
    }

    if (error.message === 'Incorrect password') {
        errorObject.password = error.message;
    }

    if (error.code === 11000){
        const key = Object.keys(error.keyValue)
        const value = Object.values(error.keyValue);
        errorObject[key] = value[0];
    }

    return errorObject;
}


module.exports = errorHandler;