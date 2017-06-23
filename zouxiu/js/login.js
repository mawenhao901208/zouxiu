

function _login(){
	var username = $("#loginName").val();
	var psw      = $("#loginPsw").val();
	if(username == ''){
		alert("请 输入用户名");
		_clear()
	}else{
		if(psw == ''){
			alert("请输入密码")
			$("#loginPsw").val('');			
		}else{
			var user = getLoginUser(username,psw)
			loginData(user)
		}
	}
}

$(function(){
	var data = localStorage.getItem("token")
	//console.log(JSON.parse(data));
	if(data&&data!=""){
		$("#loginName").val(JSON.parse(data).userID)
		$("#loginPsw").val(JSON.parse(data).password)
	}
})

function getLoginUser(username,psw){
	var user = {
		userID:username,
		password:psw
	}
	return user;
}

function loginData(user){
	console.log(user.userID+','+user.password);
	var check = $("#checkbox").attr('checked');
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/userinfo.php",
		async:true,
		data:{status:"login",userID:user.userID,password:user.password},
		success:function(data){
			if(data.charAt(0)=="{"){
				alert("登陆成功！")
				window.location.href = "../index.html"
				if(check){
					var str = '{"userID":"'+user.userID+'","password":"'+user.password+'"}'
					localStorage.setItem('token',str);
				}
			}else if(data == 0){
				alert("用户名不存在")
			}else{
				alert("用户名密码不符")
			}
		}
	});
}


function _clear(){
	$("#loginName").val('');
	$("#loginPsw").val('');
}
