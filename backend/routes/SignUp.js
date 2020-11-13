import Fire from "../firebase/config";

export function createUserWtihEmailAndPassword(email, password) {

  Fire.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    switch (error.code) {
      case 'auth/email-already-in-use':
        alert('The email is already in use.');
        break;

      case 'auth/invalid-email':
        alert('The email is invalid.');
        break;

      case 'auth/weak-password':
        alert('The password is too weak.');
        break;

      case 'auth/operation-not-allowed':
      default:
        alert(errorMessage);
        break;
    }

    console.log(error);
  });

}

//import React from "react";

/*
const SignUp = ({history}) => {

  const redirectLogIn = () => {
    history.push("/login");
  }

  const handleSignUp = (event) => {

    event.preventDefault();
    const { email, password } = event.target.elements;

    try{
      Fire
        .auth()
        .createUserWithEmailAndPassword(email.value,
          password.value);
      history.push("/");
    } catch(error){
      alert(error);
    }
  }

  return(
    <div className="centered">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={redirectLogIn}>Log In</button>
    </div>
  );
};

export default SignUp;
*/
