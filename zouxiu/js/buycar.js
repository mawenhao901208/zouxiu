var total =0;
var myScroll;
var number = 0;
$(function(){
	lookCar();
	loadScroll();
})



function loadScroll() {
	myScroll = new IScroll("#wrapper", {
		mouseWheel: true,
		scrollbars: true
	})
}



function lookCar(){
	$.ajax({
		type:"get",
		dataType:"jsonp",
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		data:{userID:"我liang哥"},
		async:true,
		success:function(data){
			console.log(data)
			if(data == 0){
				$(".carNum").text(0);
				var $content = $('.content');
				var p1 = $("<p style='width:100%;text-align:center;font-size:0.34rem;color:#000000;margin:0.62rem 0 0.24rem 0'>您的购物车空空~</p>")
				var img = $("<img src='../img/kongkong.jpg' style='width:2.6rem;height:2.6rem;margin-left:1.88rem;' />")
				var btn = $("<a href='../index.html' style='width:60%;line-height:0.64rem;text-align:center;margin:0.7rem 0 0 20%;background:#CC3366;color:#FFFFFF;font-size:0.4rem;display:block'>去逛逛</a>")
				$content.append(p1)
				$content.append(img)
				$content.append(btn)
			}else{
				$.each(data, function(index) {
					total += parseInt(data[index].number);
					
					//console.log(total)
				});
				$(".carNum").text(total);
				$(".carNum").css({"display":"block"})
			}
			
			$.each(data, function(index) {
				var $content = $('.content');
				var $li = $('<li>');
				var $img = $('<img src='+data[index].goodsListImg+' />')
				var $conn = $("<div class='conn'></div>")
				var $p1 = $("<p class='one'></p>")
				var pspan1 = $("<span class='flt first'>"+data[index].goodsName+"</span>")
				var pspan2 = $("<span class='frt'>&#xe836;</span>")
				$p1.append(pspan1)
				$p1.append(pspan2)
				//var $p2 = $("<p class='flt'>"+data[index].className+"</p>")
				var $p3 = $("<p class='two'></p>")
				var pspan3 = $("<span>单价:</span>")
				var pa = $("<a href='javascript:;'>￥"+data[index].price+"</a>")
				pspan3.append(pa)
				var p3span=$("<span class='frt'>L</span>")
				$p3.append(pspan3)
				$p3.append(p3span)
				
				var $p4 = $("<p class='three'></p>")
				var pspan4 = $("<span class='flt'>数量:</span>")
				var pinput1 = $("<input type='button' value='-'/>")
				
				var pinput2 = $("<input type='text' value="+data[index].number+" />")
				var pinput3 = $("<input type='button' value='+' />")
				pinput1.on("touchstart",function(){
					var goodsID = data[index].goodsID;
					var number = parseInt([index].number);
					//console.log(goodsID)
					minsCarB(goodsID);
					number-=1;
					if(number<=0){
						number=0;
					}
					pinput2.val(number)
					minsCarB(goodsID);
					setTimeout(function(){
						window.location.reload()
					},1000)
					
				})
				pinput3.on("touchstart",function(){
					var goodsID = data[index].goodsID;
					var number = parseInt(data[index].number);
					number+=1;
					console.log(number);
					//console.log(goodsID)
					//addsCarB(goodsID);
					
					pinput2.val(number)
					addsCarB(goodsID,number);
					window.location.reload()
				})
				$p4.append(pspan4)
				$p4.append(pinput1)
				$p4.append(pinput2)
				$p4.append(pinput3)
				$conn.append($p1)
				//$conn.append($p2)
				$conn.append($p3)
				$conn.append($p4)
				$li.append($img)
				$li.append($conn)
				$content.append($li)
				
				
			});
			
			loadScroll();
		}
	})
}


function minsCarB(goodsID){
	lookCar()
	$.ajax({
		type:"post",
		data:{userID:"我liang哥",goodsID:goodsID,number:0},
		url:"http://datainfo.duapp.com/shopdata/updatecar.php",
		async:true,
		success:function(data){
			//console.log(data);
			//total = parseInt($(".carNum").text());
			//console.log(total)
			total--;
			$(".carNum").text(total);
			//loadCar()
		}
	});
}


function addsCarB(goodsID,number){
	lookCar()
	$.ajax({
		type:"post",
		data:{userID:"我liang哥",goodsID:goodsID,number:number},
		url:"http://datainfo.duapp.com/shopdata/updatecar.php",
		async:true,
		success:function(data){
			//console.log(data);
			//total = parseInt($(".carNum").text());
			//console.log(total)
			number+=1;
			total++;
			$(".carNum").text(total);
			//loadCar()
		}
	});
}
