/* eslint-disable no-console */
import { isArray } from './utils';

export function min(...args) {
  if (!isArray(args)) {
    return args;
  } else if (args.length === 0) {
    return undefined;
  } else if (args.length === 1) {
    if (isArray(args[0])) {
      return Math.min(...(args[0]));
    }
    return Math.min(args[0]);
  }
  return Math.min(...args);
}

export function copy(args) {
  if (isArray(args)) {
    return [...args];
  }
  return { ...args };
}

export function reverseMerge(firstArray, lastArray) {
  return [...lastArray, ...firstArray];
}

export function filterAttribs(args) {
  const { a, b, ...rest } = args;
  return rest;
}
