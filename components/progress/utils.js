export const extend = (target, source) => {
  for (const key in source) {
    target[key] = source[key]
  }
  return target
}
