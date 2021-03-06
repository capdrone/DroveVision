//Default Commands for North (N), West (W), South (S), East (E) assuming the drone is facing forward towards the north star
const dirs = [
  [1, 0, 0], // North
  [0, -1, 0], // East
  [-1, 0, 0], // South
  [0, 1, 0], // West
  [0, 0, 0], // Null
  [0, 0, 1], // Up
  [0, 0, -1], // Down
];
const dirStrs = ['Forward', 'Right', 'Reverse', 'Left', null, 'Up', 'Down'];

const dirMap = {
  N: 0,
  E: 1,
  S: 2,
  W: 3,
  C: 4,
  U: 5,
  D: 6,
};

function combineArrays() {
  let arrays = arguments,
    results = [],
    count = arrays[0].length,
    L = arrays.length,
    sum,
    next = 0,
    i;
  while (next < count) {
    sum = 0;
    i = 0;
    while (i < L) {
      sum += Number(arrays[i++][next]);
    }
    results[next++] = sum;
  }
  return results;
}

export const getFlightInstruction = (dirString, droneOrientation = 0) => {
  const droneInstruction = getDroneInstruction(dirString);
  const drawInstruction = getDrawInstruction(dirString, droneOrientation);
  const message = getMessage(dirString, droneOrientation);

  return { droneInstruction, drawInstruction, message };
};

export const getDroneInstruction = dirString => {
  return combineArrays(...dirString.split('').map(dir => dirs[dirMap[dir]]));
};

export const getDrawInstruction = (dirString, droneOrientation = 0) => {
  return combineArrays(
    ...dirString.split('').map(dir => {
      if (dirMap[dir] >= 4) {
        // Current (C), Up (U), or Down (D)
        return dirs[dirMap[dir]];
      } else {
        // All other directions
        return dirs[(dirMap[dir] + droneOrientation) % 4];
      }
    })
  );
};

const getMessage = (dirString, droneOrientation) => {
  return dirString
    .split('')
    .filter(dir => dir !== 'C')
    .map(dir => {
      // if (dirMap[dir] >= 4) {
      //   //Up (U) or Down (D)
      //   return dirStrs[dirMap[dir]];
      // } else {
      //   return dirStrs[(dirMap[dir] + droneOrientation) % 4];
      // }
      return dirStrs[dirMap[dir]];
    })
    .join(' + ');
};
