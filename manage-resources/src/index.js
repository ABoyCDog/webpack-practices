import _ from 'lodash';
import './style.css'
import Pic from './assets/2.png'
// import Data from './assets/data/天安门POI.json'
// import Data from './assets/data/data.xml'
import Data from './assets/data/List 6.xls'

function component() {
  var element = document.createElement('div')

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.classList.add('hello')

  // 将图片添加到现有的div
  var myPic = new Image()
  myPic.src = Pic
  myPic.width = 600
  myPic.height = 500
  element.appendChild(myPic)

  console.log(Data)

  return element
}

document.body.appendChild(component())