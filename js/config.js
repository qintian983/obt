var obtLanguage = $.session.get('obtLanguage');
if($.session.get('ProfileInfo')){
	var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
}

$(function(){
	if(!$.session.get('obtCompany')){
		if(window.location.href.indexOf("bcd") == -1){
			window.location.href = '../../login/loginPage.html';
		}else{
			window.location.href = '../../login/loginPageBCD.html';
		}
	}else{
		$.ajax(
		  { 
		    type:'post',
		    url : $.session.get('ajaxUrl'),
		    dataType : 'json',
		    data:{
		    	url: $.session.get('obtCompany')+"/SystemService.svc/IsHasCache",
		    	jsonStr:'{"id":'+$.session.get('netLoginId')+'}'
		    },
		    success : function(data) {
		      var res = JSON.parse(data);
		      console.log(res);
		      if(res != "true"){
		      	if(obtLanguage=="EN"){
		      		alert('Login Timeout.')
		      	}else if(obtLanguage=="CN"){
		      		alert('您的账号已过期，请重新登陆。')
		      	}
	      		if(ProfileInfo){
	      			window.location.href = ProfileInfo.loginOutUrl;
	      			// switch(ProfileInfo.loginOutUrl){
	      			// 	case 'BCD':
	      	  //   		  $.session.clear();
	      	  //   		  window.location.href = '../../login/loginPageBCD.html';
	      	  //   		  break;
	      	  //   		case 'eTravel':
	      	  //   		  $.session.clear();
	      	  //   		  window.location.href = '../../login/loginPage.html';
	      	  //   		  break;
	      	  //   		case 'Nike':
	      	  //   		  $.session.clear();
	      	  //   		  window.location.href = '../../singleSignOn/nikeSingleSignOn.html';
	      	  //   		  break;
	      	  //   		case 'Apple':
	      	  //   		  $.session.clear();
	      	  //   		  window.location.href = 'https://travelweb.apple.com/';
	      	  //   		  break;
	      			// }
	      		}
		      }
		    },
		    error : function() {
		      // alert('fail');
		    }
		  } 
		);
	}

	if($.session.get('accessInfo')){
		var accessInfo = JSON.parse($.session.get('accessInfo'));
		if(!accessInfo.isDomesticAir&&window.location.href.indexOf("domesticAir/") != -1){
			location.replace("../index/index.html");
		}
		if(!accessInfo.isInterAir&&window.location.href.indexOf("intlAir/") != -1){
			location.replace("../index/index.html");
		}
		if(!accessInfo.isHotel&&window.location.href.indexOf("hotel/") != -1){
			location.replace("../index/index.html");
		}
		if(!accessInfo.isTrain&&window.location.href.indexOf("train/") != -1){
			location.replace("../index/index.html");
		}
	}
})