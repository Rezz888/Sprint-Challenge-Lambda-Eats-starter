import React from "react";
import { Route } from "react-router-dom";
import Form from "./Components/Form";
import Home from "./Components/Home";
import "./App.css";

const App = () => {
  return (
    <div className="App">

    <Route exact path="/" component={Home} />
    <Route path="/pizza" component={Form} />

    </div>
  );
};
export default App;
