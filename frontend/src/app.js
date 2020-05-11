import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Authentication, Events, Bookings } from "./pages/index";
import { NavbarMainPage } from "./components/index";
import AuthContext from "./context/authContext";
import "./app.css";
class App extends Component {
  state = {
    token: "",
    userId: "",
  };
  login = (userId, token, tokenExpiration) => {
    this.setState({
      token: token,
      userId: userId,
    });
  };
  logout = () => {
    this.setState({
      token: "",
      userId: "",
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout,
            }}
          >
            <BrowserRouter>
              <NavbarMainPage />
              <Switch>
                <Route path="/events" component={Events} />
                {!this.state.token && (
                  <Route path="/auth" component={Authentication} />
                )}
                {!this.state.token && <Redirect from="*" to="/auth" />}
                {this.state.token && (
                  <Route path="/bookings" component={Bookings} />
                )}
                {this.state.token && <Redirect from="/auth" to="/events" />}
              </Switch>
            </BrowserRouter>
          </AuthContext.Provider>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
