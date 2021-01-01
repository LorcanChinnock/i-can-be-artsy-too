import * as React from "react";
import * as Three from "three";
import { animate } from "../utils/animate-utils";
import { getRandomCardinalDirection } from "../utils/direction-utils";
import { moveInDirection } from "../utils/vector-3-utils";

export default class EtchASketch extends React.Component {
  private mount!: HTMLDivElement | null;
  private scene!: Three.Scene;
  private previousDirection: any;
  private renderer: any;
  private camera: any;
  private lastPoint = new Three.Vector3(0, 0, 0);
  private lineMaterial = new Three.LineBasicMaterial({
    color: "white",
  });

  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }

  componentDidMount() {
    this.scene = new Three.Scene();
    this.setupCamera();
    this.setupRenderer();

    animate(() => {
      this.createAndRenderLine();
    });
  }

  private createAndRenderLine() {
    const line = this.getNewLine();
    this.renderLine(line);
  }

  private getNewLine() {
    const newPoint = this.getNewPoint();
    const geometry = new Three.BufferGeometry().setFromPoints([
      this.lastPoint,
      newPoint,
    ]);
    this.lastPoint = newPoint;
    return new Three.Line(geometry, this.lineMaterial);
  }

  private getNewPoint() {
    var newDirection = getRandomCardinalDirection(true, this.previousDirection);
    this.previousDirection = newDirection;
    return moveInDirection(this.lastPoint, newDirection);
  }

  private renderLine(line: Three.Line) {
    this.scene.add(line);
    this.renderer.render(this.scene, this.camera);
  }

  private setupRenderer() {
    this.renderer = new Three.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount?.appendChild(this.renderer.domElement);
  }

  private setupCamera() {
    this.camera = new Three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 100;
  }
}
