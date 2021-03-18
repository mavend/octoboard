// Smooth path using bezier curves
// I:  - points (array) [[x, y]]: array of coordinates
//     - smoothing (float) : smoothing factor
// O:  - (string) : SVG path description
function smoothPath(points, smoothing = 0.2) {
  return points.reduce(
    (acc, point, i, a) =>
      i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${bezierCommand(point, i, a, smoothing)}`,
    ""
  );
}

// Properties of a line
// I:  - pointA (array) [x,y]: coordinates
//     - pointB (array) [x,y]: coordinates
// O:  - (object) { length: l, angle: a }: properties of the line
function lineProps(pointA, pointB) {
  const lengthX = pointB[0] - pointA[0];
  const lengthY = pointB[1] - pointA[1];
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  };
}

// Position of a control point
// I:  - current (array) [x, y]: current point coordinates
//     - previous (array) [x, y]: previous point coordinates
//     - next (array) [x, y]: next point coordinates
//     - smoothing (float) : smoothing factor
//     - reverse (boolean, optional): sets the direction
// O:  - (array) [x,y]: a tuple of coordinates
const controlPoint = (current, previous, next, smoothing, reverse) => {
  // When 'current' is the first or last point of the array
  // 'previous' or 'next' don't exist.
  // Replace with 'current'
  const p = previous || current;
  const n = next || current;

  // Properties of the opposed-line
  const o = lineProps(p, n);

  // If is end-control-point, add PI to the angle to go backward
  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing;

  // The control point position is relative to the current point
  const x = current[0] + Math.cos(angle) * length;
  const y = current[1] + Math.sin(angle) * length;
  return [x, y];
};

// Create the bezier curve command
// I:  - point (array) [x,y]: current point coordinates
//     - i (integer): index of 'point' in the array 'a'
//     - a (array): complete array of points coordinates
//     - smoothing (float) : smoothing factor
// O:  - (string) 'C x2,y2 x1,y1 x,y': SVG cubic bezier C command
const bezierCommand = (point, i, a, smoothing) => {
  // start control point
  const cps = controlPoint(a[i - 1], a[i - 2], point, smoothing);

  // end control point
  const cpe = controlPoint(point, a[i - 1], a[i + 1], smoothing, true);
  return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
};

export default smoothPath;
