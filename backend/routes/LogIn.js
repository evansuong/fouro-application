import Fire from "../firebase/config";

export function loginUser(email, password) {
  Fire.auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      switch (error.code) {
        case "auth/invalid-email":
          alert("Invalid email.");
          break;

        case "auth/user-disabled":
          alert("User disabled.");
          break;

        case "auth/user-not-found":
          alert("User not found.");
          break;

        case "auth/wrong-password":
          alert("Incorrect password.");
          break;

        default:
          alert(errorMessage);
          break;
      }

      console.log(error);
    });
}

/*
import React, {useContext} from "react";
import {AuthContext} from "../auth/Auth";
import {Redirect} from "react-router-dom";
import "../App.css";
import db from "../base"

const Login = ({history}) => {

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }
    
  const redirectSignUp = () => {
    history.push("/signup");
  }

  const handleLogin = (event) => {

    event.preventDefault();
    const { email, password } = event.target.elements;

    try{
      db
        .auth()
        .signInWithEmailAndPassword(email.value,
          password.value);
      history.push("/");
    } catch(error){
      alert(error);
    }
  }

  return(
    <div className="centered">
      <h1>Log In</h1>
      <form onSubmit={handleLogin} >
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log In</button>
      </form>
      <button onClick={redirectSignUp}>Sign Up</button>
    </div>
  );
};
      

export default Login;
*/
