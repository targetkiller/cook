/*
 * @name:煮牛肉;
 * @author:tqtan;
 * @site:http://targetkiller.net/;
 * @date:2014/8/13;
*/

// 公用变量
var score = 0;
var totalTime = 15;
var time = totalTime;
var time_cut = 0.01;
var lastTime = 500;
var occurTime = 1000;
var num = $('.beef').length;
var eventNum = 3;//事件数为3，要水，要酒，熟
var timeInter;
var startInter;

// 适应矮屏手机320x480
var bHeight = $(window).height();
if(bHeight<481){
    $('.container').addClass('container-low');
}

// 让欢迎动画下方为黑色
$('.welcome-bottom').height(bHeight-414);

// 封装方法
function ranNum(){
	return parseInt(Math.random()*num);
}

function ranEvent(){
	var num = parseInt(Math.random()*3);
	var ev = "";
	switch(num){
		case 0:ev="water";break;
		case 1:ev="wine";break;
		case 2:ev="done";break;
		default:ev="";break;
	}
	return ev;
}

function startGame(){
	$('.welcome').addClass('hide');
	$('.welcome-bottom').addClass('hide');
	$('.transfer').removeClass('hide');
	$('.center').removeClass('hide');

	// 开始牛肉随机事件
	startInter = setInterval(function(){
		var $this = $('.beef').eq(ranNum());
		if(!$this.hasClass('water')&&!$this.hasClass('done')&&!$this.hasClass('done'))
		var ev = ranEvent();
		$this.addClass(ev);
	},occurTime);
}

// 游戏操作监听

document.ontouchmove = function(event){
    event.preventDefault();
}  

$('.beef').bind('tap',function(){
	var $this = $(this);
	if($(this).hasClass('done')){
		$(this).removeClass('done');
	}
});

$('.beef').bind('swipeLeft',function(){
	var $this = $(this);
	if($(this).hasClass('water')){
		$(this).removeClass('water');
	}
});

$('.beef').bind('swipeRight',function(){
	var $this = $(this);
	if($(this).hasClass('wine')){
		$(this).removeClass('wine');
	}
});

// 按钮监听

$('.btn-start').bind('tap',function(){
	startGame();
});

$('.btn-rule').bind('tap',function(){
	$('.welcome').addClass('hide');
	$('.welcome-bottom').addClass('hide');
	$('.rule').removeClass('hide');
});

$('.rule').bind('tap',function(){
	$('.welcome').removeClass('hide');
	$('.welcome-bottom').removeClass('hide');
	$(this).addClass('hide');
});

$('.btn-share').bind('tap',function(){
	$('.share').removeClass('hide');
});

$('.btn-again').bind('tap',function(){
	$('.end').addClass('hide');
	startGame();
});

$('.share').bind('tap',function(){
	$('.share').addClass('hide');
});

// drag&drop
$('.beef').draggable({
	start: function(){
	},
	stop: function(){
	}
});

$('.plate').droppable({
    drop: function (e, dragEl, dropEl) {
      // dropEl.css('background-color', ' #168a3f');
      return true;
    }
});

// 临时测试代码，最后去掉
$('.plate').bind('tap',function(){
	$('.end').removeClass('hide');
});

