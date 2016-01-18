import {List} from 'immutable'

export default fn => {
  const cache = {}
  const cacheKey = List()
  return function (...args) {
    const hashCode = cacheKey.push(this, ...args).hashCode()
    if (!cache[hashCode]) {
      cache[hashCode] = fn.apply(this, args)
    }
    return cache[hashCode]
  }
}
