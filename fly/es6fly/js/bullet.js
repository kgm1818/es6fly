
//创建子弹对象					（每一个子弹都是一个对象）
class Bullet extends Base{
	
	constructor(){
		super();
		this.ele=null;
		//子弹移动速度
		this.speed=10;
		//子弹移动定时器
		this.moveTimer=null;
	}

	init(){
		this.ele=document.createElement('div');
		gameScene.ele.appendChild(this.ele);
		//把子弹对象放到数组中
		gameScene.arrBullet.push(this);
	
		this.ele.className='bullet';
		this.ele.style.left=myPlay.ele.offsetLeft+myPlay.ele.offsetWidth/2-this.ele.offsetWidth/2+1+'px';
		this.ele.style.top=myPlay.ele.offsetTop-this.ele.offsetHeight+'px';	
		//子弹移动
		this.move();
	}
	
	//子弹移动
	move(){
		const _that=this;
		this.moveTimer=setInterval(()=>{
			//判断子弹出界移除子弹节点
			if(_that.ele.offsetTop<-_that.ele.offsetWidth){
				clearInterval(_that.moveTimer);
				gameScene.ele.removeChild(_that.ele);
				//从数组中删除当前子弹对象
				gameScene.arrBullet.splice(gameScene.arrBullet.indexOf(_that),1);
			}
			_that.ele.style.top=_that.ele.offsetTop-_that.speed+'px';
		},15);	
	}
	
	//子弹爆咋
	boom(){
		//停止子弹移动
		clearInterval(this.moveTimer);
		this.ele.className='bullet_boom';
		//子弹爆炸图片
		let [i,_that]=[0,this];
		let dieTimer=setInterval(()=>{
			i++;	
			if(i>2){
				clearInterval(dieTimer);
				//移除子弹节点
				gameScene.ele.removeChild(_that.ele);
				
			}else{
				_that.ele.style.background='url(images/die'+i+'.png) no-repeat';
				
			}
					
		},30);
	}
	
}

