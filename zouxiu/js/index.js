var myScroll;
var ajaxGet;
var total = 0;
var goodsID;
$(function() {
	loadScroll();
	loadCar();
	getData(1);
	$("#page").val(1)

	document.addEventListener("touchend", function() {
		if(myScroll.y > 0) {
			$("#scrollbar ul").empty();
			getData(1);
			$("#page").val(1)
		}
		if(myScroll.y < myScroll.maxScrollY - 50) {
			var page = $("#page").val();
			var index = parseInt(page) + 1
			console.log(index)
			getData(index)
			$("#page").val(index);
			if(index > 6) {
				ajaxGet.abort();
				$(".imgList ul").append(`<p style="width: 100%;text-align=center">没有更多的数据了!</p>`)
			}
		}

	})
})

function loadScroll() {
	myScroll = new IScroll("#wrapper", {
		mouseWheel: true,
		scrollbars: true
	})
}

function getData(classID) {
	ajaxGet = $.ajax({
		type: "get",
		url: " http://datainfo.duapp.com/shopdata/getGoods.php?callback=",
		async: true,
		data: {
			classID: classID
		},
		success: function(data) {
			var data = eval(data);
			console.log(data)
	//			data.forEach(function(v) {
	//				
	//				$(".imgList ul").append(`<li>
	//					<div class = "img-box">
	//						<img src='${v.goodsListImg}'/ class="flt" style="width: 1.74rem;height: 1.73rem;">
	//					</div>	
	//					<div class="frt shangpin-t">
	//						<h4>${v.goodsName}</h4>
	//						<a href="javascript:;" class="addCar frt">&#xe63f;</a>
	//						<p>￥${v.price}<span>￥${v.price+0}</span></p>
	//						<strong style="color: #000000;font-size: 0.24rem;">${v.discount}折</strong>
	//						
	//					</div>
	//				</li>`)

//				myScroll.refresh();	
//			});
			var $scrollbar = $("#scrollbar ul");
			$.each(data, function(index) {
				var goodID = data[index].goodsID;
				var $li = $("<li>");
				var imgbox = $("<div class='img-box'>图片正在加载中...</div>");
				var thisimg = $("<img src='" + data[index].goodsListImg + "' class='flt' style='width: 1.74rem;height: 1.73rem;'/>")
				thisimg.on("load", function() {
					imgbox.empty();
					imgbox.append(thisimg)
					myScroll.refresh();
				})
				thisimg.on("touchstart", function() {
					window.location.href = "html/detail.html?goodsID=" + encodeURI(data[index].goodsID)
				})

				/*$li.append(`<div class="frt shangpin-t">
						<h4>${data[index].goodsName}</h4>
						<a href="javascript:;" class="frt addCar">&#xe63f;</a>
						<p>￥${data[index].price}<span>￥${data[index].price+0}</span></p>
						<strong style="color: #000000;font-size: 0.24rem;">${data[index].discount}折</strong>
						
					</div>`)*/
				var $shang = $('<div class="frt shangpin-t"></div>');
				var hh4 = $('<h4>' + data[index].goodsName + '</h4>');
				var addCar = $('<a href="javascript:;" class="frt addCar">&#xe63f;</a>')
				addCar.on("touchstart", function() {
//					window.location.href = "html/car.html?goodsID=" + encodeURI(data[index].goodsID)
					//console.log(goodID);
					addsCarB(goodID);
				})
				var pp = $('<p>' + data[index].price + '<span>￥4660</span></p>')
				var stt = ('<strong style="color: #000000;font-size: 0.24rem;">' + data[index].discount + '折</strong>')
				$shang.append(hh4)
				$shang.append(addCar)
				$shang.append(pp)
				$shang.append(stt)
				$li.append($shang)
				$li.append(imgbox);
				$scrollbar.append($li)
			})
		}
	});

}


function loadCar(){
	$.ajax({
		type:"get",
		dataType:'jsonp',
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		data:{userID:"我liang哥"},
		async:true,
		success:function(data){
			//console.log(data);
			if(data == 0){
				$(".carNum").text(0);
				//$(".carNum").css({"display":"block"})
			}else{
				$.each(data, function(index) {
					total += parseInt(data[index].number);
					
					console.log(total)
				});
				$(".carNum").text(total);
				$(".carNum").css({"display":"block"})
			}
		}
	});
}

function addsCarB(goodsID){
	loadCar()
	$.ajax({
		type:"post",
		data:{userID:"我liang哥",goodsID:goodsID,number:1},
		url:"http://datainfo.duapp.com/shopdata/updatecar.php",
		async:true,
		success:function(data){
			//console.log(data);
			//total = parseInt($(".carNum").text());
			//console.log(total)
			total++;
			$(".carNum").text(total);
			//loadCar()
		}
	});
}

