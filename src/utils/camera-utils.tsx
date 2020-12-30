import * as Three from 'three';
import { Object3D, PerspectiveCamera } from 'three';

export function fitCameraToObject(camera: PerspectiveCamera, object: Object3D, offset: number = 0) {
    const boundingBox = new Three.Box3();

    boundingBox.setFromObject(object);

    const center = boundingBox.getCenter(new Three.Vector3());
    const size = boundingBox.getSize(new Three.Vector3());

    const startDistance = center.distanceTo(camera.position);
    // here we must check if the screen is horizontal or vertical, because camera.fov is
    // based on the vertical direction.
    const divider = 1;
    const endDistance =
      camera.aspect > 1
        ? (size.y / divider + offset) / Math.abs(Math.tan(camera.fov / divider))
        : (size.y / divider + offset) /
          Math.abs(Math.tan(camera.fov / divider)) /
          camera.aspect;

    camera.position.set(
      (camera.position.x * endDistance) / startDistance,
      (camera.position.y * endDistance) / startDistance,
      (camera.position.z * endDistance) / startDistance
    );
    camera.lookAt(center);
}