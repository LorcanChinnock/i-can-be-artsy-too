import { Mesh } from "three";
import { ECardinalDirection } from "./direction-utils";

export function transformMeshLocation<T extends Mesh>(
  mesh: T,
  direction: ECardinalDirection,
  amount = 1
): T {
  switch (direction) {
    case ECardinalDirection.up:
      return mesh.translateY(amount);
    case ECardinalDirection.down:
      return mesh.translateY(amount * -1);
    case ECardinalDirection.left:
      return mesh.translateX(amount * -1);
    case ECardinalDirection.right:
      return mesh.translateX(amount);
    case ECardinalDirection.back:
      return mesh.translateZ(amount * -1);
    case ECardinalDirection.forward:
      return mesh.translateZ(amount);
    default:
      return mesh;
  }
}
