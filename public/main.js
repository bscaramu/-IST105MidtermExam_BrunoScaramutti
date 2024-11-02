/*
  CCTB Website Development
  IST105
  Oct 2024
  Description: This is a simple login website where students are asked to 
  implement Social Network Login with Firebase
*/

/*
Function onAuthStateChanged(user)
Write a function to check if a user is logged
*/

function authStateListener() {
    // [START auth_state_listener]
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/v8/firebase.User
            var uid = user.uid;
            // ...
            location.href = 'culturalconnections.html';
        } else {
            // User is signed out
            // ...

        }
    });
    // [END auth_state_listener]
}

window.addEventListener('load', function () {


    //Listen for auth state changes
    authStateListener();

    document.getElementById('sign-in-button').addEventListener('click', function () {

        let provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('email');
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                console.log('Logging sucessfully', result.user);
                location.href = 'culturalconnections.html';
            })
            .catch(function (error) {
                console.log('Logging fail', error);
            });
    });

    document.getElementById('sign-in-2').addEventListener('click', function () {

        let emailTxt = document.getElementById('email').value;
        let passtxt = document.getElementById('password').value;

        firebase.auth().signInWithEmailAndPassword(emailTxt, passtxt)
            .then((userCredential) => {
                // Signed in
                let user = userCredential.user;
                // ...
                console.log('Logging sucessfully');
                alert('Logging sucessfully');
                location.href = 'culturalconnections.html';
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                alert('Logging fail');
                console.log('Logging fail', errorMessage);
            });

    });
    document.getElementById('log-in-phonenumber').addEventListener('click', function () {
        const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    

        appVerifier.verify().then(function() {
            document.getElementById('phone-number').classList.remove('d-none');
            const phoneNumber = document.getElementById('phone-number').value; 
    
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    const code = prompt('Enter the verification code you received via SMS:', '');
                    return confirmationResult.confirm(code); 
                })
                .then((result) => {
                    const user = result.user;
                    console.log('Logging successfully with phone number:', user);
                    alert('Logging successfully with phone number');
                    location.href = 'culturalconnections.html';
                })
                .catch((error) => {
                    console.error('Error during phone number sign-in:', error);
                });
        }).catch(function(error) {
            console.error('Error during reCAPTCHA verification:', error);
        });
    });
});



