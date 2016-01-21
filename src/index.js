import {List} from 'immutable'

export default fn => {
  const cache = {}
  const cacheKey = List()
  return function (...args) {
    const hashCode = cacheKey.push(this, ...args).hashCode()
    if (!(hashCode in cache)) {
      cache[hashCode] = fn.apply(this, args)
    }
    return cache[hashCode]
  }
}
