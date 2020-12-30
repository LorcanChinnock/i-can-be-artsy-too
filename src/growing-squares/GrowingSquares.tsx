import * as React from "react";
import * as Three from "three";
import { fitCameraToObject } from './../utils/camera-utils';
import { getRandomHexColor } from './../utils/color-utils';
import {getRandomCardinalDirection, ECardinalDirection} from './../utils/direction-utils';

export default class GrowingSquares extends React.Component {
  updateSpeedMs = 1;
  directionsToExpandTo = 5;
  previousDiretion: any;
  renderer: any;
  scene!: Three.Scene;
  mount!: HTMLDivElement | null;
  currentCubePosition!: Three.Vector3;
  camera!: Three.PerspectiveCamera;
  mainObject!: Three.Mesh<Three.BoxGeometry, Three.MeshBasicMaterial>;

  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }

  componentDidMount() {
    this.scene = new Three.Scene();
    this._setupCamera();
    this._setupRenderer();
    this.mainObject = this._createCube();

    setInterval(() => {
      this._createAndAddNewCube();
    }, this.updateSpeedMs);
  }

  _createAndAddNewCube() {
    var newDirection = getRandomCardinalDirection(false, this.previousDiretion && this.previousDiretion);
    this.previousDiretion = newDirection;
    var newCube = this._createCube(newDirection);
    this.mainObject.add(newCube);
    this._renderMainObject();
    fitCameraToObject(this.camera, this.mainObject);
  }

  _renderMainObject() {
    this.scene.add(this.mainObject);
    this.renderer.render(this.scene, this.camera);
  }

  _createCube(directionToMove?: ECardinalDirection) {
    var geometry = new Three.BoxGeometry(1, 1, 1);
    var material = new Three.MeshBasicMaterial({
      color: getRandomHexColor(),
    });
    var cube = new Three.Mesh(geometry, material);

    this._setCubeLocationBeforeTransform(directionToMove || null , cube);
    this._transformCubeLocation(directionToMove || null, cube);

    this.currentCubePosition = cube.position;
    return cube;
  }

  _transformCubeLocation(directionToMove: ECardinalDirection | null, cube: Three.Mesh) {
    switch (directionToMove) {
      case ECardinalDirection.up:
        cube.translateY(1);
        break;
      case ECardinalDirection.down:
        cube.translateY(-1);
        break;
      case ECardinalDirection.left:
        cube.translateX(-1);
        break;
      case ECardinalDirection.right:
        cube.translateX(1);
        break;
      case ECardinalDirection.back:
        cube.translateZ(-1);
        break;
      case ECardinalDirection.forward:
        cube.translateZ(1);
        break;
      default:
        break;
    }
  }

  _setCubeLocationBeforeTransform(directionToMove: ECardinalDirection | null, cube: Three.Mesh) {
    switch (directionToMove) {
      case null:
        break;
      default:
        cube.position.set(
          this.currentCubePosition.x,
          this.currentCubePosition.y,
          this.currentCubePosition.z
        );
        break;
    }
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
    this.camera.position.z = 10;
  }
}
