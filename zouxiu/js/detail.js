 function getQueryString(name){
 	var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
 	var r = window.location.search.substr(1).match(reg);
 	//console.log(window.location.search)
 	if(r!=null){
 		console.log(r)
 		return decodeURI(r[2])
 	}
 	return  null
 }

$(function(){
	goodsID = getQueryString("goodsID");
    loadSwiper()
    loadDetail(goodsID)
	
	$("#foot a").click(function(){
		$(this).addClass("active").siblings().removeClass('active')
	});
	$("#foot .foot-one").click(function(){
		$('.intro').css({'display':'block'});
		$('.details').css({'display':'none'});
		$('.realshot').css({'display':'none'});
		$('.title').html("商品介绍");
	});
	$("#foot .foot-two").click(function(){
		$('.intro').css({'display':'none'});
		$('.details').css({'display':'block'});
		$('.realshot').css({'display':'none'});
		//获取title的值
		$('.title').html("商品详情");
		
	});
	$("#foot .foot-three").click(function(){
		
		$('.intro').css({'display':'none'});
		$('.details').css({'display':'none'});
		$('.realshot').css({'display':'block'});
		loadSwiper();
		$('.title').html("商品详情");
	});
	
});

var mySwiper;

function loadSwiper(){
	mySwiper = new Swiper(".swiper-container",{
		autoplay:1000,
		autoplayDisableOnInteraction:false,
		//分页器
		pagination:'.swiper-pagination'
	})
}
function loadDetail(goodsID){
	//console.log(goodsID)
	$.ajax({
		type:"get",
		dataType:'jsonp',
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		data:{goodsID:goodsID},
		async:true,
		success:function(data){
			console.log(data);
			data.forEach(function(v){
				//console.log(v)
				$(".intro").append(`<div class="botjieshao">
					<img src='${v.goodsListImg}'/>
					<div class="bprice"><span></span>￥${v.price} &nbsp;&nbsp;&nbsp;灰色印花短袖T衫<div class="dot-left"></div></div>
					
					<div class="bint">
						市场价 :<span style="text-decoration: line-through;">￥${v.price+0}</span>&nbsp;${v.discount}折  <span class="frt">125人购买</span>
					</div>
				</div>`)
			});		
			var thisdata = data[0].imgsUrl;
			console.log(thisdata)
			thisdata = eval(thisdata);
			var $swiper = $("#swiperWra .swiper-wrapper");
			$.each(thisdata, function(index) {
				var $swiperSlide = $("<div class='swiper-slide'></div>");
				var imgbox = $("<img src='"+thisdata[index]+"' width='100%' />");
				$swiperSlide.append(imgbox);
				$swiper.append($swiperSlide);
			});
			loadSwiper();
		}
	});
}

