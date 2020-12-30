export enum ECardinalDirection {
  up,
  down,
  left,
  right,
  back,
  forward
};

export function getOpposite(direction: ECardinalDirection) {
  switch (direction) {
    case ECardinalDirection.up:
      return ECardinalDirection.down;
    case ECardinalDirection.down:
      return ECardinalDirection.up;
    case ECardinalDirection.left:
      return ECardinalDirection.right;
    case ECardinalDirection.right:
      return ECardinalDirection.left;
    case ECardinalDirection.back:
      return ECardinalDirection.forward;
    case ECardinalDirection.forward:
      return ECardinalDirection.back;
    default:
      return ECardinalDirection.up;
  }
}

export function getRandomCardinalDirection(
  twoDimensionsOnly: boolean,
  previousDirectonToPreventBackTracking: ECardinalDirection
) {
  var dissalowedDirections = [];
  if (previousDirectonToPreventBackTracking !== undefined) {
    dissalowedDirections.push(getOpposite(previousDirectonToPreventBackTracking));
  }
  var direction = Math.floor(
    Math.random() * ((twoDimensionsOnly ? 3 : 5) - 0 + 1) + 0
  );
  while (dissalowedDirections.includes(direction)) {
    direction = Math.floor(
      Math.random() * ((twoDimensionsOnly ? 3 : 5) - 0 + 1) + 0
    );
  }
  return direction;
}
