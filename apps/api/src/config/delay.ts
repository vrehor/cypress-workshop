let delay = 500;

export const delayConfig = {
  setDelay: (newDelay: number) => {
    delay = newDelay;
  },
  getDelay: () => {
    return delay;
  },
};
