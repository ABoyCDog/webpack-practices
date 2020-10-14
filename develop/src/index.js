import _ from 'lodash'
import printMe from './print.js'

function component() {
  var element = document.createElement('div')
  var btn = document.createElement('button')

  element.innerHTML = _.join(['Hello', 'webpack'], ' ')

  btn.innerHTML = 'Click to Console'
  btn.onclick = printMe

  element.appendChild(btn)
  
  return element 
}

document.body.appendChild(component())