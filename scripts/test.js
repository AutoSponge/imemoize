#! /usr/bin/env babel-node
import {spawn} from 'child_process'

const [,, coverage] = process.argv

const coverageOutputDir = 'coverage'
const stdio = 'inherit'
const mocha = './node_modules/.bin/_mocha'
const babel = './node_modules/.bin/babel-node'
const mochaParams = ['--compilers', 'js:babel-register']
const mochaReport = ['--reporter', 'spec']
const covParams = ['node_modules/.bin/isparta', 'cover', '--dir', coverageOutputDir]

if (coverage) {
  spawn(babel, [...covParams, mocha, ...mochaParams], {stdio})
} else {
  spawn(mocha, [...mochaParams, ...mochaReport], {stdio})
}
