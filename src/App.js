import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useAuth } from "./custom-hooks";
import {
  Home,
  Nav,
  LoginOrRegister,
  Routines,
  Activities,
  AddNewRoutine,
  AddNewActivity,
  Me,
  EditRoutine,
} from "./components";

function App() {
  const { token, isLoggedIn, logout } = useAuth();

  return (
    <Router>
      <nav>
        <Nav />
      </nav>
      <Switch>
        {!isLoggedIn && (
          <>
            <Route path="/home" component={Home} />
            <Route path="/routines" component={Routines} />
            <Route path="/activities" component={Activities} />
            <Route path="/login" component={LoginOrRegister} />
            <Route path="/register" component={LoginOrRegister} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route path="/home" component={Home} />
            <Route exact path="/routines" component={Routines} />
            <Route exact path="/activities" component={Activities} />
            <Route path="/activities/new" component={AddNewActivity} />
            <Route path="/routines/new" component={AddNewRoutine} />
            <Route path="/routines/:routineId/edit" component={EditRoutine} />
            <Route path="/me" component={Me} />
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
