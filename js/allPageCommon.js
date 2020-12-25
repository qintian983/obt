if($.session.get('ProfileInfo')){
	var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
}
console.log(ProfileInfo);
if(window.location.href.indexOf("loginPage") == -1&&!$.session.get('obtCompany')&&window.location.href.indexOf("bcd") != -1){
	window.location.href = '../../login/loginPageBCD.html';
}
if(ProfileInfo!=undefined && ProfileInfo.onlineStyle=="APPLE"){
	document.title = 'Apple Travel Online Booking Tool';
}
$(function(){
	//中英文对象
	var cn = {
		'header':
		{
		    'home':'首页',
		    'search':'查询',
		    'order':'订单查询',
		    'approval':'在线审核',
			'news':'新闻发布',
		    'profiles':'个人信息',
		    'report':'报表',
		    'setting':'设置',
		    'airIntlMultistage':"国际多段查询",
		    'airDom':'国内机票查询',
		    'airIntl':'国际机票查询',
		    'hotel':'酒店查询',
		    'train':'火车查询',
		    'myTrip':"我的行程",
			'management':'用户管理',
		},
	    'language':'English',
	    'logOut':'登出',
	    'contact':"联系客服",
	    'appleRemind':"请确认您已经完善你的信息。",
	}
	var en = {
		'header':
		{
		    'home':'Home',
		    'search':'Search',
		    'order':'My Order',
		    'approval':'Approval',
		    'profiles':'Profile',
		    'report':'Report',
		    'setting':'Setting',
		    'airIntlMultistage':"Multiple air intl",
		    'airDom':'Air Domestic',
		    'airIntl':'Air International',
		    'hotel':'Hotel',
		    'train':'Train',
		    'myTrip':"My Trips",
			'management':'User Management',
		},
	    'language':'中文',
	    'logOut':'Log out',
	    'contact':"Contact Service Team",
	    'appleRemind':"Please make sure you have confirmed your personal information.",
	}
	function get_lan(m)
	{
	    //获取文字
	    var lan = $.session.get('obtLanguage');     //语言版本
	    //选取语言文字
	    switch(lan){
	        case 'CN':
	            var t = cn[m];
	            break;
	        case 'EN':
	            var t = en[m];
	            break;
	        default:
	            var t = cn[m];
	    }
	    //如果所选语言的json中没有此内容就选取其他语言显示
	    if(t==undefined) t = cn[m];
	    if(t==undefined) t = en[m];
	    
	    return t;
	}
	//语言设置
	if(!$.session.get('obtLanguage')){
		var lang = navigator.language||navigator.userLanguage;//常规浏览器语言和IE浏览器
		lang = lang.substr(0, 2);//截取lang前2位字符
		if(lang == 'zh'){
			$.session.set('obtLanguage', 'CN')
		    $(".lanChange").text('English');
		}else{
			$.session.set('obtLanguage', 'EN')
		    $(".lanChange").text('中文');
		}
	}else if($.session.get('obtLanguage') == "CN"){
	    $(".lanChange").text('English');
	}else if($.session.get('obtLanguage') == "EN"){
	    $(".lanChange").text('中文');
	}
	//<li class="menusLi searchTab"><span class="tabText searchTabText">'+get_lan('header').search+'</span></li>
	$("body").append('\
		<div class="pageHeader">\
		  <div class="autoCenter">\
		      <div class="logoImg"></div>\
		      <div class="headerContact flexRow"><img src="../css/images/phone.png" style="display:block;width:10px;height:18px;margin:13px 7px 0 0;"><span class="contactText">'+get_lan('contact')+'</span></div>\
		      <div class="headerContactBody"></div>\
		      <div class="lanChange">'+get_lan('language')+'</div>\
		      <div class="logOutChange">'+get_lan('logOut')+'</div>\
		  </div>\
		  <div style="background-color:#1e66ae;">\
		      <header>\
		          <div class="menu">\
		              <ul class="autoCenter flexRow">\
		                  <li class="menusLi homeTab"><span class="tabText homeTabText">'+get_lan('header').home+'</span></li>\
		                  \
		                  <li class="menusLi orderTab hide"><span class="tabText orderTabText">'+get_lan('header').order+'</span></li>\
		                  <li class="menusLi approvalTab hide"><span class="tabText approvalTabText">'+get_lan('header').approval+'</span></li>\
		                  <li class="menusLi profilesTab"><span class="tabText profilesTabText">'+get_lan('header').profiles+'</span></li>\
		                  <li class="menusLi reportTab hide"><span class="tabText reportTabText">'+get_lan('header').report+'</span></li>\
		                  <li class="menusLi managementTab hide"><span class="tabText managementTabText">'+get_lan('header').management+'</span></li>\
		              </ul>\
		              <div class="autoCenter">\
		              \
		              </div>\
		          </div>\
		      </header>\
		  </div>\
		</div>\
		')
	// <ul class="searchUl">\
	//   <li class="airDomLi">'+get_lan('header').airDom+'</li>\
	//   <li class="airIntlLi">'+get_lan('header').airIntl+'</li>\
	//   <li class="hotelLi">'+get_lan('header').hotel+'</li>\
	//   <li class="trainLi">'+get_lan('header').train+'</li>\
	// </ul>\//
	if(ProfileInfo){
		$(".headerContactBody").text(ProfileInfo.CompanyPhone)
	}
	if(ProfileInfo!=undefined && ProfileInfo.onlineStyle=="APPLE"){
		$(".headerContactBody").html('+86 400 602 1365 <br> +86 21 6159 4877<br>'+'<a href="mailto:travelweb_china@apple.com" target="_blank">travelweb_china@apple.com</a>');
	}
	
	$(".headerContact").hover(function(e){
	    $(".headerContactBody").css("display","block");
	    e.stopPropagation();//阻止冒泡
	})
	$("#main").hover(function(e){
	    $(".headerContactBody").css("display","none");
	})
	/*tab颜色显示*/
	var hrefText = window.location.href;
	if(hrefText.indexOf("loginPage") != -1){
		$("header").remove();
		$(".pageHeader").css("height","80px")//11.12修改
		// $(".pageHeader").addClass('hide')
	}
	else if(hrefText.indexOf("index") != -1){
		$(".menusLi").removeClass("active");
		$(".homeTab").addClass("active");
	}else if(hrefText.indexOf("search") != -1){
		$(".menusLi").removeClass("active");
		$(".searchTab").addClass("active");
	}else if(hrefText.indexOf("orders") != -1){
		$(".menusLi").removeClass("active");
		$(".orderTab").addClass("active");
	}else if(hrefText.indexOf("application") != -1){
		$(".menusLi").removeClass("active");
		$(".approvalTab").addClass("active");
	}else if(hrefText.indexOf("profile") != -1){
		$(".menusLi").removeClass("active");
		$(".profilesTab").addClass("active");
	}else if(hrefText.indexOf("report") != -1){
		$(".menusLi").removeClass("active");
		$(".reportTab").addClass("active");
	}else if(hrefText.indexOf("userManagement") != -1){
		$(".menusLi").removeClass("active");
		$(".managementTab").addClass("active");
	}
	var noChangePasserword=$.session.get("noChangePasserword")
	
	if(ProfileInfo && noChangePasserword!=1){
		// if(ProfileInfo.NeedUpdatePassword==true &&!ProfileInfo.HideChangePassword){
			//无论 HideChangePassword  =true还是=false，都跳到个人信息页
		if(ProfileInfo.NeedUpdatePassword==true){
			if(hrefText.indexOf("profile") == -1&&ProfileInfo.onlineStyle!="APPLE"){
				window.location.href = '../../profile/profilePage.html';
			}
		}
		if(ProfileInfo.ComplementState == true){
			if(hrefText.indexOf("profile") == -1&&ProfileInfo.onlineStyle!="APPLE"){
				window.location.href = '../../profile/profilePage.html';
			}
		}
	}
	
	//如果CompanyID的图片不存在，才取ChainCode得图片，nina 20201224需求
	function isHasImg( src,backupSrc ){
		var img = new Image();
		var url = '../companyLogoImg/'+src+'.png';
		var backURL = '../companyLogoImg/'+backupSrc+'.png';
		img.src = url;
		img.onload = function(){
			if( img.width > 0 || img.height > 0  ){
				loadCompanyImg(img.src,true,backURL);
			}
			else{
				loadCompanyImg(img.src,false,backURL);
			}
		} 
		 
		img.onerror = function(){
			loadCompanyImg(img.src,false,backURL);
		}   
	}
	function loadCompanyImg(src,bExist,backURL){
		var logo = bExist ? src:backURL;
		$(".logoImg").css("background-image","url('"+logo+"')");
		$('body').append('<img id="logoTest" style="position: absolute;opacity: 0;height:0;width:0" src="'+logo+'">');
		let ImgObj=new Image();
		let pathImg=logo; 
		ImgObj.src= pathImg
		ImgObj.className='hideImg'
		ImgObj.onerror=function(){
			if(ProfileInfo.ChainCode!="APPLE"){
				$(".logoImg").css("background-image","url('../index/images/logoImg.jpg')");
			}
		}
	}	
	/*logo图片*/
	$(".logoImg").css("background-image","url('../index/images/logoImg.jpg')");
	if(ProfileInfo){
		if(ProfileInfo.isReport){
			$(".reportTab").removeClass("hide");
		}
		if(ProfileInfo.NeedApproval==true){
			$(".approvalTab").removeClass("hide");
            // $(".pendTab").removeClass("hide");
		}
		if(!ProfileInfo.NoQueryOrder){
			$(".orderTab").removeClass("hide");
		}
		//用户管理
		if(ProfileInfo.ShowCustomerEdit){
			$(".managementTab").removeClass("hide");
		}
		if(ProfileInfo.ChainCode!=""&&ProfileInfo.ChainCode!=null){
			isHasImg(ProfileInfo.CompanyID, ProfileInfo.ChainCode);
		}
		switch(ProfileInfo.onlineStyle){
			case 'eTravel':
			  $(".menu").css("background-color","#f57c01");
			  $(".menu .active").css("background-color","#f57c01");
			  $(".lanChange").css("color","#f57c01");
			  $(".logOutChange").css("color","#f57c01");
			  $(".contactText").css("color","f57c01");
			  break;
			case 'BCD':
			  $(".menu").css("background-color","#041E5B");
			  $(".menu .active").css("background-color","#F6AA25");
			  $(".lanChange").css("color","#F6AA25");
			  $(".logOutChange").css("color","#F6AA25");
			  break;
			case 'APPLE':
			  $(".menu").css("background-color","#222");
			  $(".menu .active").css("background-color","#222");
			  $(".lanChange").css("color","#3083FB");
			  $(".logOutChange").remove();
			  $(".headerContact").css("color","#3083FB");
			  // $("body").css("font-family","Helvetica,sans-serif");
			  $(".logoImg").css("margin",0);
			  $(".menu").css("margin",0);
			  $(".menusLi").css("height","55px");
			  $(".menusLi").css("line-height","55px");
			  $("#main").css("margin-top","100px");
			  $(".homeTabText").addClass("flexRow");
			  $(".contactText").text("Contact Apple Travel");
			  $(".homeTabText").html('<img style="display:block;margin:18px 3px 0 8px;" src="../css/images/AppleTravelIcon.png">');
			  $(".orderTabText").text(get_lan("header").myTrip);
			  break;
		}
	}
	// <li class="menusLi reportTab"><span>'+get_lan('header').report+'</span></li>\
	// <li class="menusLi settingTab"><span>'+get_lan('header').setting+'</span></li>\
    menuList();//菜单
	//语言转换
	$(".lanChange").unbind('click').click(function(){
	    switch($.session.get('obtLanguage'))
	    {
	    case 'CN':
	      $.session.set('obtLanguage', 'EN');
	      location.reload();
	      break;
	    case 'EN':
	      $.session.set('obtLanguage', 'CN');
	      location.reload();
	      break;
	    }
	})
	//退出登陆
	$(".logOutChange").unbind('click').click(function(){
		if(ProfileInfo){
			// 11月12日修改  清除所有缓存
			var langHistory=$.session.get('obtLanguage')
			// $.session.clear()
			sessionStorage.clear();
			$.session.set('obtLanguage',langHistory)
			
			localStorage.clear();
			// 清除cookie
			var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
			if(keys) {
				for(var i = keys.length; i--;)
				document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
			}
			// var cookies = $.cookie();
			// for(var cookie in cookies) {
			//    $.removeCookie(cookie);
			// }
			/*12-25*/
			// $.session.clear();
			/*end*/
			window.location.href = ProfileInfo.loginOutUrl;
			// switch(ProfileInfo.loginOutUrl){
			// 	case 'BCD':
	  //   		  $.session.clear();
	  //   		  if(ProfileInfo.ChainCode=="NIKE"){
	  //   		  	window.location.href = '../../singleSignOn/nikeSingleSignOn.html';
	  //   		  }else{
	  //   		  	window.location.href = '../../login/loginPageBCD.html';
	  //   		  }
	  //   		  break;
	  //   		case 'eTravel':
	  //   		  $.session.clear();
	  //   		  window.location.href = '../../login/loginPage.html';
	  //   		  break;
			// }
		}
	})
})
function menuList(){
	$(".searchTab").hover(function(){
	  $(".searchUl").css("display","block");
	});
	//阻止事件冒泡
	$(".searchUl").on('mouseover', stopPropagation);
	$(".searchTab").on('mouseover', stopPropagation);
	// 隐藏
	$(document).on('mouseover', function() {
	    $(".searchUl").css("display","none");
	})
	function stopPropagation(e) {
	    e.stopPropagation();
	}
	$(".homeTab").unbind("click").click(function(){
		if($.session.get('goOnBookOrderNo')){
			$.session.remove('goOnBookOrderNo');
		}
		if($.session.get('goOnBookHotelInfo')){
			$.session.remove('goOnBookHotelInfo');
		}
		//appleFirstRemind("home");
		var TAindex=$.session.get('TAnumberIndex')//是否是单点登录
		if(!ProfileInfo.IndexTravelRequest && TAindex!=1){//没有首页审批单权限的时候，回到首页时，删除审批单
			if($.session.get('TAnumber')){
				$.session.remove('TAnumber');
			}
		}
		window.location.href = '../../index/index.html';
	})
	// $(".airDomLi").unbind("click").click(function(){
	// 	window.location.href = '../../search/queryAirForDomestic.html';
	// })
	// $(".airIntlLi").unbind("click").click(function(){
	// 	window.location.href = '../../search/queryAirForInter.html';
	// })
	// $(".hotelLi").unbind("click").click(function(){
	// 	window.location.href = '../../search/queryHotel.html';
	// })
	// $(".trainLi").unbind("click").click(function(){
	// 	window.location.href = '../../search/queryTrain.html';
	// })
    $(".orderTab").unbind("click").click(function(){
    	//appleFirstRemind("order");
    	window.location.href = '../../orders/orders.html';
    })
    $(".reportTab").unbind("click").click(function(){
    	window.location.href = '../../report/reportPage.html';
    })
	$(".managementTab").unbind("click").click(function(){
		window.location.href = '../../userManagement/management.html';
	})
    $(".profilesTab").unbind("click").click(function(){
		if(ProfileInfo){
			switch(ProfileInfo.onlineStyle){
				case 'BCD':
	    		  window.location.href = '../../profile/profilePage.html';
	    		  break;
	    		case 'eTravel':
	    		  window.location.href = '../../profile/profilePage.html';
	    		  break;
	    		case 'APPLE':
	    		  window.location.href = '../../profile/appleProfile.html';
	    		  break;
			}
		}
    })
    $(".approvalTab").unbind("click").click(function(){
    	window.location.href = '../../application/queryApplication.html';
    })

    function appleFirstRemind(type){
    	if(ProfileInfo.NeedUpdatePassword==true&&ProfileInfo.onlineStyle=="APPLE"){
    		var appleRemindText = $.session.get('obtLanguage')=="CN"?"请确认您已经完善你的信息。":"Please make sure you have confirmed your personal information.";
    		var appleRemind= confirm(appleRemindText);
    		if(appleRemind==true)
    		{
    			if(type=="order"){
    				window.location.href = '../../orders/orders.html';
    			}else if(type=="home"){
    				window.location.href = '../../index/index.html';
    			}
    		}else{
    		    return false;
    		}
    	}else{
    		if(type=="order"){
    			window.location.href = '../../orders/orders.html';
    		}else if(type=="home"){
    			window.location.href = '../../index/index.html';
    		}
    	}
    }
}

// 客服机器人
var netUserId = $.session.get('netLoginId');
if($.session.get('obtCompany')){
	$.ajax(
	     {
	       type:'post',
	       url : $.session.get('ajaxUrl'), 
	       dataType : 'json',
	       data:{
	           url: $.session.get('obtCompany')+"/SystemService.svc/ProfilePost",
	           jsonStr:'{"key":'+netUserId+'}'
	       },
	       success : function(data) {
				if(data==""){
					return false
				}
	           var res = JSON.parse(data);
				if(res.CHATBOT){
					var customerInfo=res.ChatRobot
					setTimeout(function(){
						$('body').append('<script type="text/javascript" charset="utf-8"'+
						' src="'+customerInfo.SRC+'"'+
						' chat_url="'+customerInfo.Url+'"'+
						' logo_src="'+customerInfo.Logo+'"'+
						' logo_position="'+customerInfo.LogoPosition+'"'+
						' tntInstId="'+customerInfo.TNTINSTID+'"></script>')
					},10)
				}
	       },
	       error : function() {
	         // alert('fail');
	       }
	     }
	   );
}
 
