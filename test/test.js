/* global describe, it */

import chai from 'chai'
import memoize from '../src'
import {fromJS} from 'immutable'
chai.should()

describe('memoize', () => {
  it('receives and returns a function', () => {
    (typeof memoize(() => {})).should.equal('function')
  })

  it('returns a function which behaves exactly as the one you provided it', () => {
    const basicMaths = (a, b) => a * 10 + b
    const memoizedFn = memoize(basicMaths)
    memoizedFn(11, 1).should.equal(basicMaths(11, 1))
    memoizedFn(1, 11).should.equal(basicMaths(1, 11))
  })

  it('can handle simple object arguments', () => {
    const objectModification = obj => Object.entries(obj)
    const memoizedFn = memoize(objectModification)
    const somebody = {
      name: 'John Doe',
      age: 39,
      country: 'England'
    }

    memoizedFn(somebody).should.deep.equal(objectModification(somebody))
    somebody.age = 40
    memoizedFn(somebody).should.not.deep.equal(objectModification(somebody))
  })

  it('can handle immutable object arguments', () => {
    const immutableModification = obj => obj.entries()
    const memoizedFn = memoize(immutableModification)
    const somebody = fromJS({
      name: 'John Doe',
      age: 39,
      country: 'England'
    })

    memoizedFn(somebody).should.deep.equal(immutableModification(somebody))
    const somebodyelse = somebody.set('age', 40)
    memoizedFn(somebodyelse).should.deep.equal(immutableModification(somebodyelse))
  })

  it('can handle function arguments', () => {
    const nowFn = fn => fn(Date.now())
    const thousandTimes = n => n * 1000
    const memoizedFn = memoize(nowFn)
    const testVal = memoizedFn(thousandTimes)
    testVal.should.equal(memoizedFn(thousandTimes))
  })

  it('can handle execution context', () => {
    const exp = memoize(function (n) {
      return Math.pow(this.a, n)
    })
    const thisArg = {
      a: 2,
      exp
    }
    const thatArg = {
      a: 3,
      exp
    }
    const aSquared = thisArg.exp(2)
    aSquared.should.not.equal(thatArg.exp(2))
    thisArg.a = 4
    thisArg.exp(2).should.equal(aSquared)
  })
})
