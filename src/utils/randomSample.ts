export function getRandomSample<T>(array: T[], n: number): T[] {
  if (array.length <= n) return array;
  const result = [];
  const taken = new Set<number>();
  while (result.length < n) {
    const idx = Math.floor(Math.random() * array.length);
    if (!taken.has(idx)) {
      result.push(array[idx]);
      taken.add(idx);
    }
  }
  return result;
}
