/**
 * 延迟函数。可以用来模拟网络延迟
 * @param duration 延迟时间
 * @returns undefined
 */
export const delay = (duration = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, duration);
  });
};

/**
 * 获取一个范围内的随机数
 * @param min 范围最小值
 * @param max 范围最大值
 * @returns 随机数
 */
export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
