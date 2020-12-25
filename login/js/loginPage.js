//语言转换
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
//中英文对象
var cn = {
    "customer":'企业客户',
    'login':'登录',
    'company':'公司名',
    'userName':'用户名',
    'password':'密码',
    'remind':'请正确填写！',
    'language':'English',
    'forgetPassword':'忘记密码',
    "passwordRemind":"账号或密码错误",
	"remainUsername":"记住用户名",
	"policy":"登录即代表您同意我们的",
	"policyLink":"隐私政策",
}
var en = {
    "customer":'Enterprise Customer',
    'login':'Login',
    'company':'Company',
    'userName':'User Name',
    'password':'Password',
    'remind':'Please fill in correctly!',
    'language':'中文',
    'forgetPassword':'Forget Password',
    "passwordRemind":"Account or password error",
	"remainUsername":"Remember user name",
	"policy":"By logging I accept all terms and conditionsopens in ",
	"policyLink":"BCD's global privacy policy",
}
var SelectUrl="http://appservice.etravel.net.cn/SystemService.svc/SelectUrlPost"
$(function(){
	$.getJSON('../../ajaxUrl.json?'+Math.random(), function(data) {
		if(data.ajaxUrl!=undefined){
			$.session.set('ajaxUrl', data.ajaxUrl);
		}else{
			$.session.set('ajaxUrl', 'https://online.bcdtravel.cn/SystemAPI_PostSend/api/SystemAPI/PostSend');
		}
		if(data.SelectUrl!=undefined){
			SelectUrl=data.SelectUrl
		}
	})
	
	// $.session.set('ajaxUrl', 'https://online.bcdtravel.cn/SystemAPI_PostSend/api/SystemAPI/PostSend');
  // $.session.set('ajaxUrl', 'http://106.15.170.73:1344/api/SystemAPI/PostSend');
  $(".lanChange").text(get_lan("language"));
  $(".logOutChange").hide();
  $("header").remove();
  $(".pageHeader").css("height","80px")
  showContent();//内容展示
  login();//登录
  document.onkeydown = function (event) {
     var e = event || window.event || arguments.callee.caller.arguments[0];
     if (e && e.keyCode == 13) {
        $(".btnLogin").click();
     }
  };
})

//内容展示
function showContent(){
    $(".right-bg").html('\
            <p class="right-title">\
                '+get_lan('customer')+'<span style="color: #EF853A; font-weight: bold;"> '+get_lan('login')+'</span>\
            </p>\
            <div style="height:2px;"></div>\
            <label for="txtLoginName">\
                '+get_lan('userName')+'\
                <span id="lblError" style="display:none"></span>\
            </label>\
            <input name="txtLoginName" type="text" id="txtLoginName" tabindex="2">\
            <label for="txtLoginPassword">\
                '+get_lan('password')+'</label>\
            <input name="txtLoginPassword" type="password" id="txtLoginPassword" tabindex="3">\
            <div class="policyLink">'+get_lan('policy')+'<a target="_blank" href="https://www.bcdtravel.com/privacy-policy/#privacy_policy_ch">'+get_lan('policyLink')+'</a></div>\
			<input type="submit" name="Button1" value="'+get_lan('login')+'" id="Button1" class="btnLogin">\
            <div class="forgetPassword">\
			<label name="Remember">\
				<span class="checkboxSpan"></span>\
				<input type="checkbox" name="" id="Remember" value="" /> '+get_lan('remainUsername')+'\
			</label>\
			<span class="forgetPasswordText" style="cursor: pointer;">'+get_lan('forgetPassword')+'</span></div>\
        ')
		// 记住账号
		$("#Remember").unbind('click').click(function(e){
			if(e.target.checked){
				$('.checkboxSpan').addClass("checked")
			}else{
				$('.checkboxSpan').removeClass("checked")
			}
		})
		// 缓存账号
		var historyUserName=window.localStorage.getItem('historyUserName')
		if(historyUserName!="" && historyUserName!=undefined && historyUserName!=null){
			$('#txtLoginName').val(historyUserName)
			$("#Remember").attr("checked",true)
			$('.checkboxSpan').addClass("checked")
		}else{
			$("#Remember").attr("checked",false)
			$('.checkboxSpan').removeClass("checked")
		}
    // $(".passwordBody").html('\
    //   <div></div>\
    //   ')
}
//<div class="forgetPassword">'+get_lan('forgetPassword')+'</div>
// 记住用户名
function rememberUser(){
	if($("#Remember").attr('checked')=="checked"){
		window.localStorage.setItem('historyUserName',$('#txtLoginName').val())
	}else{
		window.localStorage.removeItem('historyUserName')
	}
}
//登录事件
function login(){
	$.session.set('TAnumber','')
	$.session.set('trainTicketChanges','');
	$.session.set('TAorderNo','');
	$.session.set('noChangePasserword','');
    //点击登录
    $(".btnLogin").unbind('click').click(function(){
        var companyName = 'BCD';
        var userName = $('#txtLoginName').val();
        var password = $('#txtLoginPassword').val();
        if(companyName == ''||userName == ''||password == ''){
            alert(get_lan('remind'));
        }else{
            $('body').mLoading("show");
            $.ajax(
              {
                type:'post',
                url : $.session.get('ajaxUrl'),
                dataType : 'json',
                crossDomain : true,
                data:{
                    // url: "http://10.237.16.30:8089/SystemService.svc/SelectUrlPost",
                    // url: "http://appservicetest.etravel.net.cn/SystemService.svc/SelectUrlPost",
                    // url: "http://appservice.etravel.net.cn/SystemService.svc/SelectUrlPost",
					url:SelectUrl,
                    jsonStr:'{"CompanyMs":"'+companyName+'"}'
                },
                success : function(data) {
                    var res = JSON.parse(data);
                    console.log(res);
                    if(res.Company_Url){
                        $.session.set('obtCompany', res.Company_Url)
                        $.ajax(
                          {
                              type: 'post',
                              url: $.session.get('ajaxUrl'),
                              dataType: 'json',
                              data: {
                                  url: $.session.get('obtCompany') + "/SystemService.svc/LoginWithChannel",
                                  jsonStr: '{"loginname":"' + userName + '","password":"' + password + '","Language":"'+$.session.get('obtLanguage')+'","edition":"PC1.0.1","channel":"ONLINE"}'
                              },
                              success: function (data) {
                                  console.log(data);
                                  // $('body').mLoading("hide");
                                  if (data == '""') {
                                      alert(get_lan("passwordRemind"));
                                      $('body').mLoading("hide");
                                  } else if (data.indexOf("500") != -1) {
                                      alert("服务器返回错误500");
                                      $('body').mLoading("hide");
                                  } else {
                                      $.session.set('netLoginId', data)
                                      $.ajax(
                                        {
                                          type:'post',
                                          url : $.session.get('ajaxUrl'),
                                          dataType : 'json',
                                          data:{
                                              url: $.session.get('obtCompany')+"/SystemService.svc/ProfilePost",
                                              jsonStr:'{"key":'+data+'}'
                                          },
                                          success : function(data) {
                                              var res = JSON.parse(data);
                                              console.log(res);
											  var tipsNum=1
											  $.session.set('tipsNum',tipsNum)
											  tools.addProfileInfo(data)
											  
            //                                   if(res.DocumentsDetail.length == 0||res.Phone==""||res.Email==""||res.Phone==null||res.Email==null){
            //                                     var ComplementState = true;
            //                                   }else{
            //                                     var ComplementState = false;
            //                                   }
											 //  var companyPhone=''
											 //  if(res.CompanyPhoneList==null || res.CompanyPhoneList.length==0){
											 //  	// console.log('没有公司电话')
											 //  }else{
											 //  	companyPhone=res.CompanyPhoneList[0].Telephone
											 //  }
            //                                   var ProfileInfo = {
            //                                     "customerId":res.ID,
            //                                     "isTrain":res.isTrain,
            //                                     "onlineStyle":res.onlineStyle,
            //                                     "loginOutUrl":res.loginOutUrl,
            //                                     "companyId":res.CompanyID,
            //                                     "NeedApproval":res.NeedApproval,
            //                                     "isCodeShare":res.isCodeShare,
            //                                     "QueryDomesticTicketsWithTime":res.QueryDomesticTicketsWithTime,
            //                                     "NeedUpdatePassword":res.NeedUpdatePassword,
            //                                     "ComplementState":ComplementState,
            //                                     "NoQueryOrder":res.NoQueryOrder,
            //                                     "ChainCode":res.ChainCode,
            //                                     "HotelAddCohabitation":res.HotelAddCohabitation,
            //                                     "IsBCD":res.IsBCD,
            //                                     "NoShowHotelCommentsFromCompany":res.NoShowHotelCommentsFromCompany,
            //                                     "HideChangePassword":res.HideChangePassword,
            //                                     "CompanyPhone":companyPhone,
            //                                     "IsHideRemarkInput":res.IsHideRemarkInput,
            //                                     "HotelJumpHRS":res.HotelJumpHRS,
            //                                     "HotelJumpHRS_Url":res.HotelJumpHRS_Url,
            //                                     "HideInterChange":res.HideInterChange,
            //                                     "ChangeSameAirline":res.ChangeSameAirline,
            //                                     "HotelGKBooking":res.HotelGKBooking,
            //                                     "InterSingleReason":res.InterSingleReason,
            //                                     "SingleAirCombine":res.SingleAirCombine,
            //                                     "isReport":res.isReport,
            //                                     "DomesticHideMore":res.DomesticHideMore,
            //                                     "ManualPriceNoBook":res.ManualPriceNoBook,
            //                                     "WechatPay":res.WechatPay,
            //                                     "AliPay":res.AliPay,
            //                                     'SearchInterAirWTime':res.SearchInterAirWTime,
            //                                     'DomesticHideAllDay':res.DomesticHideAllDay,
            //                                     'HideMeberShip':res.HideMeberShip,
												// 'advertiseChainCompany':res.advertiseChainCompany,
												// 'advertiseCompany':res.advertiseCompany,
												// "ShowDomesticTimeSlt":res.ShowDomesticTimeSlt,
            //                                   }
            //                                   $.session.set('ProfileInfo', JSON.stringify(ProfileInfo));
												rememberUser()
												window.location.href = '../../index/index.html';
                                          },
                                          error : function() {
                                            // alert('fail');
                                          }
                                        }
                                      );
                                  }
                              },
                              error: function () {
                                  // alert('fail');
                              }
                          }
                        );

                    }else{
                        $('body').mLoading("hide");
                        alert('公司名错误')
                    }
                },
                error : function() {
                  // alert('fail');
                }
              }
            );
        }
    })
    //忘记密码
    $(".forgetPasswordText").unbind("click").click(function(){
      window.location.href="../../forgetPassword/forgetPassword.html"
      // openPasswordPop();
      // $("#cover").unbind("click").click(function(){
      //     closePasswordPop();
      // })
    })
}
// function openPasswordPop(){
//     $("#cover").show();
//     $(".PasswordPop").css("display","block");
// }
// function closePasswordPop(){
//     $("#cover").hide();
//     $(".PasswordPop").css("display","none");
// }