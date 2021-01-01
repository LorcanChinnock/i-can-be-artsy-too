import * as React from "react";
import * as Three from "three";
import { animate } from "../utils/animate-utils";
import { transformMeshLocation } from "../utils/mesh-utils";
import { getRandomHexColor } from "./../utils/color-utils";
import {
  getRandomCardinalDirection,
  ECardinalDirection,
} from "./../utils/direction-utils";

export default class GrowingSquares extends React.Component {
  private cubeCount = 0;
  private previousDiretion: any;
  private renderer: any;
  private scene!: Three.Scene;
  private mount!: HTMLDivElement | null;
  private currentCubePosition!: Three.Vector3;
  private camera!: Three.PerspectiveCamera;

  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }

  componentDidMount() {
    this.scene = new Three.Scene();
    this.setupCamera();
    this.setupRenderer();

    animate(() => {
      this.createAndRenderNewCube();
    });
  }

  private createAndRenderNewCube() {
    var newDirection = getRandomCardinalDirection(
      false,
      this.previousDiretion && this.previousDiretion
    );
    this.previousDiretion = newDirection;
    var newCube = this.createCube(newDirection);
    this.scene.add(newCube);
    this.renderer.render(this.scene, this.camera);
  }

  private createCube(directionToMove: ECardinalDirection) {
    var geometry = new Three.BoxGeometry(1, 1, 1);
    var material = new Three.MeshBasicMaterial({
      color: getRandomHexColor(),
    });
    var cube = new Three.Mesh(geometry, material);

    if (this.cubeCount > 0) {
      cube = this.moveCube(cube, directionToMove);
    } else {
      this.camera.lookAt(cube.geometry.vertices[0]);
    }

    this.currentCubePosition = cube.position;
    this.cubeCount++;

    return cube;
  }

  private moveCube(
    cube: Three.Mesh<Three.BoxGeometry, Three.MeshBasicMaterial>,
    directionToMove: ECardinalDirection
  ) {
    cube.position.set(
      this.currentCubePosition.x,
      this.currentCubePosition.y,
      this.currentCubePosition.z
    );
    cube = transformMeshLocation(cube, directionToMove);
    return cube;
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
    this.camera.position.set(25, 25, 25);
  }
}
