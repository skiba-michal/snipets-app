export const loopInterval = (interval: number, length: number, callback: (index: number) => void) => {
  let i = 0;

  const loop = () => {
    if (!length) {
      return;
    }
    setTimeout(() => {
      callback(i);
      i++;
      if (i <= length) {
        loop();
      }
    }, interval);
  };
  loop();
};
