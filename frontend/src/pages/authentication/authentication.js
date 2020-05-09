import React, { createRef } from "react";
import "./authentication.css";
const Authentication = () => {
  const emailEl = createRef();
  const passwordEl = createRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailEl.current.value;
    const password = passwordEl.current.value;
    const requestQuery = {
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
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestQuery),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  return (
    <form onSubmit={submitHandler}>
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
        <button type="button">Switch to Sign Up</button>
      </div>
    </form>
  );
};
export default Authentication;
