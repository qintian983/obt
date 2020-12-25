// 判断中英文
// var lan = $.session.get('obtLanguage');     //语言版本CN,EN
// // 判断苹果或者安卓,onlineStyle=BCD或者APPLE
// // var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
// console.log(lan)
// var alertStr='The System is under maintenance during 22:00~23:00, please wait patiently.'
// // 目前值判断中英文就行，苹果与BCD弹框提示一致
// 	if(lan=='CN'){
// 		alertStr='系统在22:00~23:00期间正在维护中，请耐心等待。'
// 	}
// if(ProfileInfo.onlineStyle=="BCD"){
// 	alertStr='The System is under maintenance during 22:00~23:00, please wait patiently.'
// }
// if(ProfileInfo.onlineStyle=="APPLE"){
// 	alertStr='The System is under maintenance during 22:00~23:00, please wait patiently.'
// 	if(lan=='CN'){
// 		alertStr='系统在22:00~23:00期间正在维护中，请耐心等待。'
// 	}
// }

var timer = setInterval(function(){confirmLink(timer)},5000);
function confirmLink(){
	var lan = $.session.get('obtLanguage');     //语言版本CN,EN
	$.getJSON('../link.json?'+Math.random(), function(d) {
		// console.log(d.link=='false')
		var alertStr='The System is under maintenance during '+d.wait+', please wait patiently.'
		// 目前值判断中英文就行，苹果与BCD弹框提示一致
			if(lan=='CN'){
				alertStr='系统在'+d.wait+'期间正在维护中，请耐心等待。'
			}
		if(d.link=='false'){
			alert(alertStr);
			window.location.href='../error/error.html'
		}else{
			// 正常运行
		}
	})
}