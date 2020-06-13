import firebase from '../index';

const signUp = async (email, password) => {
    try {
        return new Promise(async (res, rej) => {
            var errorCode = false;
            await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                errorCode = error.code;
                var errorMessage = error.message;
                res(errorCode)
                // ...
            })
            if (!errorCode) {
                res('false')
            }
        })
    } catch (err) {
        console.log(err)
    }
}

export default signUp