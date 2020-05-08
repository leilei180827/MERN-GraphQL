import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Authentication, Events, Bookings } from "./pages/index";
import { NavbarMainPage } from "./components/index";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <BrowserRouter>
            <NavbarMainPage />
            <Switch>
              <Route path="/auth" component={Authentication} />
              <Route path="/events" component={Events} />
              <Route path="/bookings" component={Bookings} />
              <Redirect from="/" to="/auth" exact />
            </Switch>
          </BrowserRouter>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
