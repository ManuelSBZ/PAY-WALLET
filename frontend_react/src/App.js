import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Register } from "./components/Register/Register"
import { Wallet } from "./components/Wallet/Wallet"
import { Navbar } from "./components/Navbar"
import { Funds, Login } from "./components/Login"


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container-fluid">
          <Switch>
            <Route path="/register/user" component={Register} />
            <Route path="/login/user" component={Login} />
            <Route path="/" component={Wallet} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
