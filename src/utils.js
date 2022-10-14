// source https://github.com/sindresorhus/dot-prop/blob/main/index.js#L1-L4
const isObject = (value) => {
  const type = typeof value;
  return value !== null && (type === "object" || type === "function");
};

const disallowedKeys = new Set(["__proto__", "prototype", "constructor"]);
const digits = new Set("0123456789");

// https://github.com/sindresorhus/dot-prop/blob/main/index.js#L14-L161
// eslint-disable-next-line
function getPathSegments(path) {
  const parts = [];
  let currentSegment = "";
  let currentPart = "start";
  let isIgnoring = false;

  for (const character of path) {
    switch (character) {
      case "\\": {
        if (currentPart === "index") {
          throw new Error("Invalid character in an index");
        }

        if (currentPart === "indexEnd") {
          throw new Error("Invalid character after an index");
        }

        if (isIgnoring) {
          currentSegment += character;
        }

        currentPart = "property";
        isIgnoring = !isIgnoring;
        break;
      }

      case ".": {
        if (currentPart === "index") {
          throw new Error("Invalid character in an index");
        }

        if (currentPart === "indexEnd") {
          currentPart = "property";
          break;
        }

        if (isIgnoring) {
          isIgnoring = false;
          currentSegment += character;
          break;
        }

        if (disallowedKeys.has(currentSegment)) {
          return [];
        }

        parts.push(currentSegment);
        currentSegment = "";
        currentPart = "property";
        break;
      }

      case "[": {
        if (currentPart === "index") {
          throw new Error("Invalid character in an index");
        }

        if (currentPart === "indexEnd") {
          currentPart = "index";
          break;
        }

        if (isIgnoring) {
          isIgnoring = false;
          currentSegment += character;
          break;
        }

        if (currentPart === "property") {
          if (disallowedKeys.has(currentSegment)) {
            return [];
          }

          parts.push(currentSegment);
          currentSegment = "";
        }

        currentPart = "index";
        break;
      }

      case "]": {
        if (currentPart === "index") {
          parts.push(Number.parseInt(currentSegment, 10));
          currentSegment = "";
          currentPart = "indexEnd";
          break;
        }

        if (currentPart === "indexEnd") {
          throw new Error("Invalid character after an index");
        }

        // Falls through
      }

      default: {
        if (currentPart === "index" && !digits.has(character)) {
          throw new Error("Invalid character in an index");
        }

        if (currentPart === "indexEnd") {
          throw new Error("Invalid character after an index");
        }

        if (currentPart === "start") {
          currentPart = "property";
        }

        if (isIgnoring) {
          isIgnoring = false;
          currentSegment += "\\";
        }

        currentSegment += character;
      }
    }
  }

  if (isIgnoring) {
    currentSegment += "\\";
  }

  switch (currentPart) {
    case "property": {
      if (disallowedKeys.has(currentSegment)) {
        return [];
      }

      parts.push(currentSegment);

      break;
    }

    case "index": {
      throw new Error("Index was not closed");
    }

    case "start": {
      parts.push("");

      break;
    }
    // No default
  }

  return parts;
}
// https://github.com/sindresorhus/dot-prop/blob/main/index.js#L178-L212
function getProperty(object, path, value) {
  if (!isObject(object) || typeof path !== "string") {
    return value === undefined ? object : value;
  }

  const pathArray = getPathSegments(path);
  if (pathArray.length === 0) {
    return value;
  }

  for (let index = 0; index < pathArray.length; index++) {
    const key = pathArray[index];

    if (isStringIndex(object, key)) {
      object = index === pathArray.length - 1 ? undefined : null;
    } else {
      object = object[key];
    }

    if (object === undefined || object === null) {
      // `object` is either `undefined` or `null` so we want to stop the loop, and
      // if this is not the last bit of the path, and
      // if it didn't return `undefined`
      // it would return `null` if `object` is `null`
      // but we want `get({foo: null}, 'foo.bar')` to equal `undefined`, or the supplied value, not `null`
      if (index !== pathArray.length - 1) {
        return value;
      }

      break;
    }
  }

  return object === undefined ? value : object;
}
// https://github.com/sindresorhus/dot-prop/blob/main/index.js#L163-L170
function isStringIndex(object, key) {
  if (typeof key !== "number" && Array.isArray(object)) {
    const index = Number.parseInt(key, 10);
    return Number.isInteger(index) && object[index] === object[key];
  }

  return false;
}

module.exports = {
  isStringIndex,
  getProperty,
  getPathSegments,
  isObject,
};
