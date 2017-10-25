
//本方飞机
let myPlay={//字面量创建对象
	ele:null,
	
	//初始化
	init(){
		this.ele=document.createElement('div');
		this.ele.className='myplay';
		gameScene.ele.appendChild(this.ele);
		return this;
	},
	//飞机移动
	move(){
		let _that=this;
		this.ele.onmousedown=function (e){
			var e=e||event;
			let [offsetX,offsetY]=[e.offsetX,e.offsetY]
			document.onmousemove=function (ev){
				if(ev.stopPropagation){
					ev.stopPropagation();
				}else{
					ev.cancelBubble=true;
				}
				var ev=ev||event;
				let x=ev.clientX-offsetX-gameScene.ele.offsetLeft;
				let y=ev.clientY-offsetY-gameScene.ele.offsetTop;
				if(x<0){
					x=0;
				}
				if(x>(gameScene.ele.offsetWidth-_that.ele.offsetWidth)){
					x=gameScene.ele.offsetWidth-_that.ele.offsetWidth;
				}
				if(y<0){
					y=0;
				}
				if(y>(gameScene.ele.offsetHeight-_that.ele.offsetHeight)){
					y=gameScene.ele.offsetHeight-_that.ele.offsetHeight;
				}
				_that.ele.style.left=x+'px';
				_that.ele.style.top=y+'px';
			
			}
			document.onmouseup=function (){
				document.onmousemove=null;
				document.onmouseup=null;
			}
		}
	},
	//飞机碰撞
	crash(){
		document.onmousedown=null;
		document.onmousemove=null;
//		let i=0;
//		let _that=this;
		let [i,_that]=[0,this];
		//动画死亡
		let timer=setInterval(()=>{
			i++;
			if(i>=4){
				clearInterval(timer);
				
			}else{
				
				_that.ele.style.background='url(images/me_die'+i+'.png) no-repeat';
			}
				
		},150);
		
	}
}
