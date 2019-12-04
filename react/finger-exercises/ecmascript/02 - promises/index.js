// Hint: use setInterval, create a new Promise and measure time with Date.now()

export function delay(time) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    if (time < 1000) {
      setTimeout(() => {
        const end = Date.now();
        resolve(end - start);
      }, time);
    } else {
      reject(new Error('This time is too much !'));
    }
  });
}

export function asyncDelay(time) {
  return delay(time);
}
