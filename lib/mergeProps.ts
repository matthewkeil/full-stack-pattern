interface IObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Intersection<U> = (U extends any
? (k: U) => void
: never) extends (k: infer I) => void
  ? I
  : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObject = (obj: any) => {
  if (typeof obj === 'object' && obj !== null) {
    if (typeof Object.getPrototypeOf === 'function') {
      const prototype = Object.getPrototypeOf(obj);
      return prototype === Object.prototype || prototype === null;
    }

    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  return false;
};

export const mergeProps = <T extends IObject[]>(...objects: T): Intersection<T[number]> =>
  objects.reduce((result, current) => {
    Object.keys(current).forEach(key => {
      if (Array.isArray(result[key]) && Array.isArray(current[key])) {
        result[key] = Array.from(new Set(result[key].concat(current[key])));
      } else if (isObject(result[key]) && isObject(current[key])) {
        result[key] = mergeProps(result[key], current[key]);
      } else {
        result[key] = current[key];
      }
    });

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {}) as any;
