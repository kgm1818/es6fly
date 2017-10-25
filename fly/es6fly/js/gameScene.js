
//游戏场景
let gameScene={
	ele:null,
	//存子弹对象的数组
	arrBullet:[],
	//存放敌机的数组
	arrEnemyPlay:[],
	//总分数
	score:0,
	//创建子弹的定时器
	bulletTimer:null,
	//初始化属性
	init(){
		this.ele=document.getElementById('main');
		return this;
		
	},
	//开始游戏
	start(time){
		const _that=this;
		this.loadding(()=>{//回调函数;
			//创建本方飞机
			myPlay.init().move();
			//创建子弹
			_that.bulletTimer=setInterval(()=>{
				//console.log(111);
				new Bullet().init();
			},time);
			//创建敌机
			let samllTimer=setInterval(()=>{//创建小敌机
				new Enemyplay(Enemyplay.prototype.enemy_type_small).init();
	
			},600);
			let middleTimer=setInterval(()=>{//创建中敌机
				let flag=Math.random()>0.4?true:false;
				if(flag){
					new Enemyplay(Enemyplay.prototype.enemy_type_middle).init();
				}
			},2000);
			let bigTimer=setInterval(()=>{//创建大敌机
				let flag=Math.random()>0.6?true:false;
				if(flag){
					new Enemyplay(Enemyplay.prototype.enemy_type_big).init();
				}
			},5000);
			//碰撞
			_that.crash();
		
		});
	},
	//加载游戏
	loadding(callback){
		//加载logo
		let logo=document.createElement('div');
		logo.className='logo';
		this.ele.appendChild(logo);
		//加载
		let load=document.createElement('div');
		load.className='load';
		this.ele.appendChild(load);
		//动画
		let img=['images/loading1.png','images/loading2.png','images/loading3.png'];
		let i=0;
		let timer=setInterval(()=>{
			if(i>5){
				clearInterval(timer);
				gameScene.ele.removeChild(logo);
				gameScene.ele.removeChild(load);
				callback();
				
			}else{
				load.style.backgroundImage='url('+img[++i%3]+')';
			}
			
		},300);
		
	},
	//子弹碰撞	和飞机碰撞
	crash(){
		const _that=this;
		let timer=setInterval(()=>{
			for(let i=0;i<_that.arrEnemyPlay.length;i++){
				for(let j=0;j<_that.arrBullet.length;j++){
					
					if(isCrash(_that.arrEnemyPlay[i].ele,_that.arrBullet[j].ele)){
						//console.log(222);
						//子弹爆咋
						_that.arrBullet[j].boom();
						//从数组中移除子弹对象
						_that.arrBullet.splice(j,1);
						//飞机失血
						_that.arrEnemyPlay[i].hurt();
						
					}
				}
				//敌机与本方飞机碰撞
				if(isCrash(_that.arrEnemyPlay[i].ele,myPlay.ele)){
					clearInterval(timer);
					myPlay.crash();
					//关闭创建子弹
					clearInterval(_that.bulletTimer);
					let formation=_that.ele.getElementsByClassName('formation')[0];
					formation.style.opacity=1;
					let oTotlScore=document.getElementById('totlScore');
					oTotlScore.innerHTML='总分：'+_that.score;
					let oName=document.getElementById('aname');
					let oBtn=document.getElementById('btn');
					//提交
//飞机大战排行榜接口： 	
//提交分数： 
//   	接口： http://60.205.181.47/myPHPCode4/uploadScore.php
//  请求方式： post
//	参数： name=玩家
//	       score=分数
//
//获取排行榜:
//	接口： http://60.205.181.47/myPHPCode4/getRank.php
//  请求方式： get
//	参数： 无
//
					oBtn.onclick=function (){
						//ajax数据交互
						function createXHR(){
							if(XMLHttpRequest){
								return new XMLHttpRequest();
							}
							return new ActiveXObject('Microsoft.XMLHTTP')
						}
						//创建对象
						let xhr=createXHR();
						url='http://60.205.181.47/myPHPCode4/uploadScore.php';
						
						//	建立连接
						xhr.open('post',url,true);
						//请求头
						xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
						//发送请求
						xhr.send('name='+oName.value+'&score='+_that.score);
						xhr.onreadystatechange=()=>{
							if(xhr.readyState==4&&xhr.status==200){
							//console.log(xhr.responseText);
								let data=JSON.parse(xhr.responseText);
								if(data.status==1){
									location.href='ranking_list.html';
								}
							}	
						}							
					}
				}
			}
		},30);	
	}	
}
