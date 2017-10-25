
//创建敌方飞机			(每一个飞机都是一个实例化的对象)
class Enemyplay extends Base{
	constructor(type){
		super();
		this.ele=null;
		//速度
		this.speed=0;
		//血量
		this.hp=0;
		//分值
		this.score=0;
		this.type = type;
	}
	
	//初始化
	init(){
		this.ele=document.createElement('div');
		gameScene.ele.appendChild(this.ele);
		//把每个敌机对象存到数组中
		gameScene.arrEnemyPlay.push(this);
		//console.log(111);
		switch(this.type){
			case this.enemy_type_small://小型
				this.ele.className='small_emeny';
				this.speed=this.enemy_speed_small;	//速度
				this.hp=this.enemy_hp_small;			//血量
				this.score=this.enemy_score_small;		//分值
				break;
			case this.enemy_type_middle://中型
				this.ele.className='middle_emeny';
				this.speed=this.enemy_speed_middle;		//速度
				this.hp=this.enemy_hp_middle;			//血量
				this.score=this.enemy_score_middle;		//分值
				break;
			case this.enemy_type_big://大型
				this.ele.className='big_emeny';
				this.speed=this.enemy_speed_big;			//速度
				this.hp=this.enemy_hp_big;				//血量
				this.score=this.enemy_score_big;		//分值
				break;
		}
		
		this.ele.style.left=parseInt(Math.random()*(gameScene.ele.offsetWidth-this.ele.offsetWidth))+'px';
		this.ele.style.top=-this.ele.offsetHeight+'px';
		//敌机移动
		this.move();
		
	}
	//敌机移动
	move(){
		const _that=this;
		this.moveTimer=setInterval(()=>{
			if(_that.ele.offsetTop>gameScene.ele.offsetHeight){
				clearInterval(this.moveTimer);
				gameScene.ele.removeChild(_that.ele);
				//从数组中删除
				gameScene.arrEnemyPlay.splice(gameScene.arrEnemyPlay.indexOf(_that),1);
			}
			_that.ele.style.top=_that.ele.offsetTop+_that.speed+'px';
		},150);	
	}
	//血量
	hurt(){
	//	console.log(222);
		this.hp--;
		const _that=this;
		if(this.hp<=0){
			//停止移动
			clearInterval(_that.moveTimer);
			//飞机爆炸动画
			//小图
			if(this.ele.className=='small_emeny'){
				let i=0;
				let smallTimer=setInterval(()=>{
					i++;
					if(i>=4){
						clearInterval(smallTimer);
						gameScene.ele.removeChild(_that.ele);
						gameScene.arrEnemyPlay.splice(gameScene.arrEnemyPlay.indexOf(_that),1);
						//加分
						gameScene.score+=parseInt(_that.score);
					}else{
						
						_that.ele.style.background='url(images/plane1_die'+i+'.png) no-repeat';
					
					}
				
				},100);
			}else if(this.ele.className=='middle_emeny'){
				let i=0;
				let middleTimer=setInterval(()=>{
					i++;
					if(i>=5){
						clearInterval(middleTimer);
						gameScene.ele.removeChild(_that.ele);
						gameScene.arrEnemyPlay.splice(gameScene.arrEnemyPlay.indexOf(_that),1);
						gameScene.score+=parseInt(_that.score);
						
					}else{
						_that.ele.style.background='url(images/plane2_die'+i+'.png) no-repeat';
						
					}
					
				
				},150);
				
			}else if(this.ele.className=='big_emeny'){
				let i=0;
				let middleTimer=setInterval(()=>{
					i++;
					if(i>=7){
						clearInterval(middleTimer);
						gameScene.ele.removeChild(_that.ele);
						gameScene.arrEnemyPlay.splice(gameScene.arrEnemyPlay.indexOf(_that),1);
						gameScene.score+=parseInt(_that.score);
						
					}else{
						_that.ele.style.background='url(images/plane3_die'+i+'.png) no-repeat';
					}
				},200);
				
			}
//			由于异步操作会先执行这里的操作
//			gameScene.ele.removeChild(this.ele);
//			gameScene.arrEnemyPlay.splice(gameScene.arrEnemyPlay.indexOf(this),1);
		}
	}
}

//给定飞机型号,速度，血量

	//字面量创建原型直接this调用
	//型号
	Enemyplay.prototype.enemy_type_small=1;
	Enemyplay.prototype.enemy_type_middle=2;
	Enemyplay.prototype.enemy_type_big=3;
	//速度
	Enemyplay.prototype.enemy_speed_small=15;
	Enemyplay.prototype.enemy_speed_middle=10;
	Enemyplay.prototype.enemy_speed_big=6;
	//血量
	Enemyplay.prototype.enemy_hp_small=1;
	Enemyplay.prototype.enemy_hp_middle=5;
	Enemyplay.prototype.enemy_hp_big=10;
	//分值
	Enemyplay.prototype.enemy_score_small=5;
	Enemyplay.prototype.enemy_score_middle=10;
	Enemyplay.prototype.enemy_score_big=20;

