import * as React from "react";
import * as Three from "three";
import { ECardinalDirection, getRandomCardinalDirection } from "../utils/direction-utils";

export default class EtchASketch extends React.Component {
    updateSpeedMs = 1;
  directionsToExpandTo = 3;
  mount!: HTMLDivElement | null;
  scene!: Three.Scene;
  lastPoint!: Three.Vector3;
  previousDirection: any;
  renderer: any;
  camera: any;

  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }

  componentDidMount() {
    this.scene = new Three.Scene();
    this._setupCamera();
    this._setupRenderer();

    this.lastPoint = new Three.Vector3(0, 0, 0);

    setInterval(() => {
      const line = this._getNewLine();
      this._renderLine(line);
    }, this.updateSpeedMs);
  }

  _getNewLine() {
    const material = new Three.LineBasicMaterial({
      color: '#ffffff',
    });
    const newPoint = this._getNewPoint();
    const geometry = new Three.BufferGeometry().setFromPoints([
      this.lastPoint,
      newPoint,
    ]);
    this.lastPoint = newPoint;
    const line = new Three.Line(geometry, material);
    return line;
  }

  _getNewPoint() {
    var newDirection = getRandomCardinalDirection(true, this.previousDirection && this.previousDirection);
    this.previousDirection = newDirection;
    const lastPointToUse = new Three.Vector3(0,0,0);
    lastPointToUse.setX(this.lastPoint.x);
    lastPointToUse.setY(this.lastPoint.y);
    lastPointToUse.setZ(this.lastPoint.z);
    switch(newDirection){
        case ECardinalDirection.up:
            return lastPointToUse.setY(++lastPointToUse.y);
        case ECardinalDirection.down:
            return lastPointToUse.setY(--lastPointToUse.y);
        case ECardinalDirection.right:
            return lastPointToUse.setX(++lastPointToUse.x);
        case ECardinalDirection.left:
            return lastPointToUse.setX(--lastPointToUse.x);
        case ECardinalDirection.forward:
            return lastPointToUse.setZ(++lastPointToUse.z);
        case ECardinalDirection.back:
            return lastPointToUse.setZ(--lastPointToUse.z);
        default:
            return lastPointToUse;
    }
  }

  _getRandomDirection() {
    return Math.floor(
      Math.random() * (this.directionsToExpandTo - 0 + 1) + 0
    );
  }

  _renderLine(line: Three.Line) {
    this.scene.add(line);
    this.renderer.render(this.scene, this.camera);
  }

  _setupRenderer() {
    this.renderer = new Three.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount?.appendChild(this.renderer.domElement);
  }

  _setupCamera() {
    this.camera = new Three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 100;
  }
}
