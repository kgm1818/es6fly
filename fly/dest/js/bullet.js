"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var l=0;l<t.length;l++){var n=t[l];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,l,n){return l&&e(t.prototype,l),n&&e(t,n),t}}(),Bullet=function(e){function t(){_classCallCheck(this,t);var e=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.ele=null,e.speed=10,e.moveTimer=null,e}return _inherits(t,Base),_createClass(t,[{key:"init",value:function(){this.ele=document.createElement("div"),gameScene.ele.appendChild(this.ele),gameScene.arrBullet.push(this),this.ele.className="bullet",this.ele.style.left=myPlay.ele.offsetLeft+myPlay.ele.offsetWidth/2-this.ele.offsetWidth/2+1+"px",this.ele.style.top=myPlay.ele.offsetTop-this.ele.offsetHeight+"px",this.move()}},{key:"move",value:function(){var e=this;this.moveTimer=setInterval(function(){e.ele.offsetTop<-e.ele.offsetWidth&&(clearInterval(e.moveTimer),gameScene.ele.removeChild(e.ele),gameScene.arrBullet.splice(gameScene.arrBullet.indexOf(e),1)),e.ele.style.top=e.ele.offsetTop-e.speed+"px"},15)}},{key:"boom",value:function(){clearInterval(this.moveTimer),this.ele.className="bullet_boom";var e=0,t=this,l=setInterval(function(){++e>2?(clearInterval(l),gameScene.ele.removeChild(t.ele)):t.ele.style.background="url(images/die"+e+".png) no-repeat"},30)}}]),t}();