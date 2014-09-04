/*
 * @name:煮牛肉;
 * @author:tqtan;
 * @site:http://targetkiller.net/;
 * @date:2014/8/13;
*/

// 公用变量
var score = 0;
var totalTime = 20;
var time = totalTime;
var time_cut = 0.01;
var lastTime = 500;
var occurTime = 1000;
var num = $('.beef').length;
var maxClickNum = 6;//牛肉最大点击次数
var eventNum = 3;//事件数为3，要水，要酒，熟
var timeInter;
var startInter;
var plateListLeft = 0;
var plateNum = 7;
var beefOnPlateIndex = 0;
var newBeefHappenTime = 3000;//新牛肉再次出现时间

var beefPos = [
	{l:57,t:239},
	{l:194,t:239},
	{l:57,t:374},
	{l:194,t:374}
];

// 适应矮屏手机320x480
var bHeight = $(window).height();
if(bHeight<481){
    $('.container').addClass('container-low');
}

// 让欢迎动画下方为黑色
$('.welcome-bottom').height(bHeight-414);

function initConfig(){
	score = 0;
	time = totalTime;
	timeInter;
	startInter;
}

// 封装方法
function ranNum(){
	return parseInt(Math.random()*num);
}

function ranClickNum(){
	return (parseInt(Math.random()*maxClickNum)+3);
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

function updateTime(){
	// $('#time').text(time.toFixed(2));
	$('#progress').width((time/totalTime)*100+'%');
}

function updateScore(){
	$('#score').text(score);
}

function getName(){
	var name = '打酱油';
	if(score > 40){name = '牛之神';}
	else if(score > 35){name = '肉皇大帝';}
	else if(score > 30){name = '牛魔王';}
	else if(score > 25){name = '米其林三星主厨';}
	else if(score > 20){name = '厨神';}
	else if(score > 15){name = '厨王';}
	else if(score > 10){name = '高级厨师';}
	else if(score > 5){name = '小厨师';}
	else{name = '打酱油';}

	return name;
}

// 新增牛肉
 function setNewBeef(id){
 	$('.beef').eq(id).remove();
 	$newBeef = $("<div class='hide beef beef"+(id+1)+"' id='beef"+(id+1)+"'><span class='beef-num'>"+ranClickNum()+"</span></div>");
 	switch(id){
 		case 0:$newBeef.insertBefore($('.beef').eq(0));break;
 		case 1:$newBeef.insertBefore($('.beef').eq(1));break;
 		case 2:$newBeef.insertBefore($('.beef').eq(2));break;
 		case 3:$newBeef.insertAfter($('.beef').eq(2));break;
 		default:$newBeef.insertBefore($('.beef').eq(0));break;
 	}

 	var $beef = $('.beef').eq(id);

 	// 去除牛肉监听，恢复点击监听
 	$beef.unbind().bind('tap',tapEvent);

 	setTimeout(function(){$beef.removeClass('hide')},newBeefHappenTime);
 	// 生成新点击次数
 	// $beef.find('.beef-num').text(ranClickNum());

 	// 恢复位置
 	// $beef.css({'left':beefPos[id].l,'top':beefPos[id].t}).removeClass('done');
 	
 }

// 传输带运动
 function turnPlate(){
 	// 得分
 	score++;
 	updateScore();

 	// 碟子放牛肉
 	$('.plate').eq(beefOnPlateIndex).append("<div class='beeftoy'></div>");
 	beefOnPlateIndex++;


 	// 增加碟子
 	plateNum++;
 	$('.plate-list').width(plateNum*90);
 	$('.plate-list').append("<li class='plate'></li>");

 	// 位移碟子
 	plateListLeft = parseInt(plateListLeft)-90;
 	$('.plate-list').animate({
 		'left':plateListLeft+'px'
 	},300);
 }

function initBeefNum(){
	$.each($('.beef'),function(){
		var num = ranClickNum();
		$(this).find('.beef-num').text(num);
	});
}

function startGame(){
	$('.welcome').addClass('hide');
	$('.welcome-bottom').addClass('hide');
	$('.transfer').removeClass('hide');
	$('.center').removeClass('hide');
	$('#score').removeClass('hide');
	$('#progress').css('background-color','#2ecc71');
	$('#progress').removeClass('hide');

	// 初始化牛肉的点击次数
	initBeefNum();

	// 开启时间计时器
	timeInter = setInterval(function(){
		if(time < 8 && time > 3){
			occurTime = 250;
		}
		else if(time < 3 && time > 0){
			$('#progress').css('background-color','red');
			if(navigator.vibrate){
				navigator.vibrate(3000);
			}
		}
		else if(time < 0){
			gameover();
		}
		time -= time_cut;
		updateTime();

	},10);

	// 开始牛肉随机事件
	// startInter = setInterval(function(){
	// 	var $this = $('.beef').eq(ranNum());
	// 	if(!$this.hasClass('water')&&!$this.hasClass('done')&&!$this.hasClass('done'))
	// 	var ev = ranEvent();
	// 	$this.addClass(ev);
	// },occurTime);
	
	startInter = setInterval(function(){
		
	},occurTime);
	
}

 function gameover(){
 	var shareMsg = '不慌不忙，我做了'+score+'碟牛肉';
 	var reward = '获得了'+getName()+'的称号！';
 	$('.result').text(shareMsg);
 	$('.reward').text(reward);
	shareInfo.shareTitle = shareMsg+','+reward;

	clearInterval(timeInter);
	clearInterval(startInter);

 	$('#progress').addClass('hide');
 	$('#score').addClass('hide');
 	$('.end').removeClass('hide');
 }

 function tapEvent(){
	var $this = $(this);
	// 获取牛肉当前次数
	var num = parseInt($this.find('.beef-num').text());

	if(num>1){
		num--;
	}
	else{
		// 点击次数为0，可以拖碟。
		num = 0;
		$this.addClass('done');
		$this.draggable({
			start: function(){
		      $(this).css('-webkit-transform', 'scale(1.1)');
			},
			stop: function(){
		      $(this).css('-webkit-transform', 'scale(1)');
			}
		});
	}

	$this.find('.beef-num').text(num);
}

// 游戏操作监听

document.ontouchmove = function(event){
    event.preventDefault();
}  

$('.beef').bind('tap',tapEvent);

// $('.beef').bind('swipeLeft',function(){
// 	var $this = $(this);
// 	if($(this).hasClass('water')){
// 		$(this).removeClass('water');
// 	}
// });

// $('.beef').bind('swipeRight',function(){
// 	var $this = $(this);
// 	if($(this).hasClass('wine')){
// 		$(this).removeClass('wine');
// 	}
// });

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
	// 重置参数
	initConfig();
	updateScore();
	startGame();
});

$('.share').bind('tap',function(){
	$('.share').addClass('hide');
});

// drag&drop
// $('.beef').draggable({
// 	start: function(){
//       $(this).css('-webkit-transform', 'scale(1.1)');
// 	},
// 	stop: function(){
//       $(this).css('-webkit-transform', 'scale(1)');
// 	}
// });

$('.center').droppable({
  drop: function (e, dragEl, dropEl, pos) {
	  var id = parseInt(dragEl.attr('id').slice(-1))-1;
	  if(dragEl.css('top').slice(0,-2)<130){
	  	turnPlate();
	  }

	  // 送碟成功，新增牛肉
 	  setNewBeef(id);

      // dragEl.css({'left':beefPos[id].l,'top':beefPos[id].t});
      return true;
  }
});

// 移到其它位置不算
$('.pan').droppable({
	drop: function(e, dragEl, dropEl, pos){
	    var id = parseInt(dragEl.attr('id').slice(-1))-1;
		dragEl.css({'left':beefPos[id].l,'top':beefPos[id].t});
        return true;
	}
});

$('.beef').droppable({
	drop: function(e, dragEl, dropEl, pos){
	    var id = parseInt(dragEl.attr('id').slice(-1))-1;
		dragEl.css({'left':beefPos[id].l,'top':beefPos[id].t});
        return true;
	}
});

/* 分享功能 */
var shareInfo = {
	appid: '',
    imgUrl: 'http://qzonestyle.gtimg.cn/aoi/sola/20140819153418_gQEOOUKEvO.jpg',
    lineLink: 'http://m.isux.us/code/cook/cook.html',
	descContent: '你能煮好多少碟牛肉？有能力来试试！',
	shareTitle: '一起来煮牛肉吧！'
}
function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage',{
        "appid": shareInfo.appid,
        "img_url": shareInfo.imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": shareInfo.lineLink,
        "desc": shareInfo.descContent,
        "title": shareInfo.shareTitle
    }, function(res) {
        //_report('send_msg', res.err_msg);
    })
}
function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline',{
        "img_url": shareInfo.imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": shareInfo.lineLink,
        "desc": shareInfo.descContent,
        "title": shareInfo.shareTitle
    }, function(res) {
           //_report('timeline', res.err_msg);
    });
}
function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo',{
        "content": shareInfo.descContent,
        "url": shareInfo.lineLink,
    }, function(res) {
        //_report('weibo', res.err_msg);
    });
}
// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    // 发送给好友
    WeixinJSBridge.on('menu:share:appmessage', function(argv){
        shareFriend();
    });
    // 分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function(argv){
        shareTimeline();
    });
    // 分享到微博
    WeixinJSBridge.on('menu:share:weibo', function(argv){
        shareWeibo();
    });
}, false);