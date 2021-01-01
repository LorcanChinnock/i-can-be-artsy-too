import "./App.css";

import * as React from "react";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import GrowingSquares from "./growing-squares/GrowingSquares";
import EtchASketch from "./etch-a-sketch/EtchASketch";

export default class App extends React.Component {
  links = [
    {
      link: "/growing_squares",
      text: "Growing Squares",
      component: <GrowingSquares />,
    },
    {
      link: "/etch_a_sketch",
      text: "Etch A Sketch",
      component: <EtchASketch />,
    },
  ];

  render() {
    return (
      <BrowserRouter>
        <nav id="router-nav">
          <ul className="router-list">
            {this.links.map((value) => {
              return (
                <li>
                  <Link to={value.link}>{value.text}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Switch>
          {this.links.map((value) => {
            return <Route path={value.link}>{value.component}</Route>;
          })}
          <Route path="*">
            <Redirect to={this.links[0].link} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
