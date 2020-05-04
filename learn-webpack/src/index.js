import _ from 'lodash'
// import style from './style.css'
const style = require('./style.css')
import printMe from './print.js'

console.log(style.toString())

function component() {
  const element = document.createElement('div')
  const btn = document.createElement('button')

  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.classList.add('hello')

  btn.innerHTML = 'Click me and check the console!'
  btn.onclick = printMe

  element.appendChild(btn)

  return element
}

document.body.appendChild(component())
