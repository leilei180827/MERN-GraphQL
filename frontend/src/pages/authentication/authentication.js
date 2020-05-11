import React, { createRef, useState, useContext } from "react";
import "./authentication.css";
import AuthContext from "../../context/authContext";
const Authentication = () => {
  const emailEl = createRef();
  const passwordEl = createRef();
  const [isLogin, setIsLogin] = useState(true);
  const context = useContext(AuthContext);
  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailEl.current.value;
    const password = passwordEl.current.value;
    let requestQuery = {
      query: `query{
        login(email:"${email}",password:"${password}"){
          userId
          email
          token
          tokenExpiration
        }
      }`,
    };

    if (!isLogin) {
      requestQuery = {
        query: `
        mutation{
          createUser(userInput:{
            email:"${email}",
            password:"${password}"
          }){
            _id
            email
          }
        }`,
      };
    }
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestQuery),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("something went wrong!");
        }
        return response.json();
      })
      .then(({ data: { login } }) =>
        context.login(login.userId, login.token, login.tokenExpiration)
      )
      .catch((error) => console.log(error));
  };
  const switchModal = (event) => {
    event.preventDefault();
    setIsLogin(!isLogin);
  };
  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" ref={emailEl} />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={passwordEl} />
      </div>
      <div className="form-group">
        <button type="submit">Submit</button>
        <button type="button" onClick={switchModal}>
          Switch to {isLogin ? "Signup" : "Login"}
        </button>
      </div>
    </form>
  );
};
export default Authentication;
