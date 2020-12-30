import * as REACT from "react";
import "./PerlinTown.css";

export default class PerlinTown extends REACT.Component {
  render() {
    return <div id="perlin-town"></div>;
  }

  componentDidMount() {
    var seed = 1;
    var perlin = [];
    var size = 100;
    for(var y = 0; y < size; y++){
        var row = [];
        for(var x = 0; x < size; x++){
            var noiseCell = 1;
            row.push(noiseCell);
        }
        perlin.push(row);
    }
    console.table(perlin)
  }
}
