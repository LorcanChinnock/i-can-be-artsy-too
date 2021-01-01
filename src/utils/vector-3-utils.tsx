import { Vector3 } from "three";
import { ECardinalDirection } from "./direction-utils";

export function moveInDirection(
  vector: Vector3,
  direction: ECardinalDirection,
  amount: number = 1
): Vector3 {
  switch (direction) {
    case ECardinalDirection.up:
      return vector.clone().setY(vector.y + amount);
    case ECardinalDirection.down:
      return vector.clone().setY(vector.y - amount);
    case ECardinalDirection.right:
      return vector.clone().setX(vector.x + amount);
    case ECardinalDirection.left:
      return vector.clone().setX(vector.x - amount);
    case ECardinalDirection.forward:
      return vector.clone().setZ(vector.z + amount);
    case ECardinalDirection.back:
      return vector.clone().setZ(vector.z - amount);
    default:
      return vector.clone();
  }
}
