import "./App.css";

import * as React from "react";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import GrowingSquares from "./growing-squares/GrowingSquares";
import EtchASketch from './etch-a-sketch/EtchASketch';
import PerlinTown from './perlin-town/PerlinTown';

export default class App extends React.Component {
  links = {
    growingSquares: {
      link: "/growing_squares",
      text: "Growing Squares",
    },
    etchASketch: {
      link: "/etch_a_sketch",
      text: "Etch A Sketch",
    },
    perlinTown: {
      link: "/perlin_town",
      text: "Perlin Town"
    }
  };

  render() {
    return (
      <BrowserRouter>
        <nav id="router-nav">
          <ul>
            <li>
              <Link to={this.links.growingSquares.link}>
                {this.links.growingSquares.text}
              </Link>
            </li>
            <li>
              <Link to={this.links.etchASketch.link}>
                {this.links.etchASketch.text}
              </Link>
            </li>
            <li>
              <Link to={this.links.perlinTown.link}>
                {this.links.perlinTown.text}
              </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path={this.links.growingSquares.link}>
            <GrowingSquares />
          </Route>
          <Route path={this.links.etchASketch.link}>
            <EtchASketch />
          </Route>
          <Route path={this.links.perlinTown.link}>
            <PerlinTown />
          </Route>
          <Route path="*">
            <Redirect to={this.links.growingSquares.link} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
