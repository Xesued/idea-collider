import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import List from "./routes/List";
import Idea from "./routes/Idea";

import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <AppBar
              title="Ideas"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
            />

            <Route exact path="/" component={List} />
            <Route exact path="/test" component={Idea} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
