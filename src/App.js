import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useAuth } from "./custom-hooks";
import {
  Home,
  Nav,
  // LoginOrRegister,
  // Routines,
  // Activities,
  // MyRoutines,
} from "./components";

function App() {
  // const { token, isLoggedIn, logout } = useAuth();

  return (
    <div>
      <Nav />
      <Home />
    </div>
  );

  //   <Router>
  //     {/* <nav><Nav/></nav> */}
  //     <Switch>
  //       {!isLoggedIn && (
  //         <>
  //           <Route path="/home" component={Home} />
  //           {/* <Route path="/login" component={LoginOrRegister} />
  //           <Route path="/register" component={LoginOrRegister} /> */}
  //           {/* <Route path="/routines" component={Routines} />
  //           <Route path="/activities" component={Activities} /> */}
  //         </>
  //       )}
  //       {isLoggedIn && (
  //         <>
  //           <Route path="/home" component={Home} />
  //           {/* <Route path="/routines" component={Routines} />
  //            <Route path="/activities" component={Activities} />
  //           <Route path="/myroutines" component={MyRoutines} /> */}
  //         </>
  //       )}
  //     </Switch>
  //   </Router>
  // );
}

export default App;
