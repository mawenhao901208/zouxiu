

function _register(){
	var username = $("#username").val();
	var psw      = $("#psw").val();
	var repsw    = $("#repsw").val();
	if(username == ''){
		alert("请 输入用户名");
		_clear()
	}else{
		if(psw == ''){
			alert("请输入密码")
			$("#psw").val('');
			$("#repsw").val('');
		}else{
			if(psw == repsw){
				var user = getUser(username,psw);
				registerData(user)
			}else{
				alert("两次输入密码不一致")
				$("#psw").val('');
				$("#repsw").val('');
				
			}
		}
	}
}

function getUser(username,psw){
	var user = {
		userID:username,
		password:psw
	}
	return user;
}

function registerData(user){
	//console.log(user.userID+','+user.password);
	$.ajax({
		type:"post",
		url:"http://datainfo.duapp.com/shopdata/userinfo.php",
		async:true,
		data:{status:"register",userID:user.userID,password:user.password},
		success:function(data){
			if(data==0){
				alert("用户名已存在，请重新输入用户名")
				_clear()
			}else if(data == 1){
				alert("注册成功")
				_clear()
				window.location.href = "login.html"
				
			}else{
				alert("亲，您的浏览器出现问题  状态码500")
				_clear()
			}
		}
	});
}


function _clear(){
	$("#username").val('');
	$("#psw").val('');
	$("#repsw").val('');
}
