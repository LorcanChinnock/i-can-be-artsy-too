import "./App.css";

import * as React from "react";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import GrowingSquares from "./growing-squares/GrowingSquares";
import EtchASketch from "./etch-a-sketch/EtchASketch";

export default class App extends React.Component {
  links = {
    growingSquares: {
      link: "/growing_squares",
      text: "Growing Squares",
      component: <GrowingSquares />,
    },
    etchASketch: {
      link: "/etch_a_sketch",
      text: "Etch A Sketch",
      component: <EtchASketch />,
    }
  };

  render() {
    return (
      <BrowserRouter>
        <nav id="router-nav">
          <ul className="router-list">
            {Object.entries(this.links).map(([key, value]) => {
              return (
                <li>
                  <Link to={value.link}>{value.text}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Switch>
          {Object.entries(this.links).map(([key, value]) => {
            return <Route path={value.link}>{value.component}</Route>;
          })}
          <Route path="*">
            <Redirect to={this.links.growingSquares.link} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
