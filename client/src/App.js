import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Button, Icon} from 'react-materialize'
import Discover from "./pages/Discover";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

const App = () => (
  <Router>
    <div>
      <h1>Sweet Science</h1>
      <Navbar />
    <Wrapper>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/discover" component={Discover} />
        <Route exact path="/search" component={Search} />
      </Wrapper>
      <Footer />
    </div>
  </Router>
);

export default App;
export default () => (
  <Button waves='light'>
    <Icon>thumb_up</Icon>
  </Button>
)