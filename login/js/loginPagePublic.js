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
    "updateRemind":"欢迎使用在线预定系统，首次登录请修改密码。",
    "newPassword":"新密码:",
    "confirmPassword":"确认密码:",
    "Confirm":"确定",
    "passwordRemind2":"两次密码不一致",
    "completeInfoRemind":"请确认您的个人信息。",
    "phone":"手机号:",
    "email":"邮箱:",
    "idCard":"身份证:",
    "passport":"护照:",
    "Expiration":"有效期:",
    "name":"姓名",
	"remainUsername":"记住用户名",
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
    "updateRemind":"Welcome to use online booking tool, please update your password.",
    "newPassword":"New Password:",
    "confirmPassword":"Confirm Password:",
    "Confirm":"Confirm",
    "passwordRemind2":"The two password is inconsistent.",
    "completeInfoRemind":"Please confirm your personal information.",
    "phone":"Phone Num:",
    "email":"Email:",
    "idCard":"IDcard:",
    "passport":"Passport:",
    "Expiration":"Expiration Date:",
    "name":"Name",
	"remainUsername":"Remember user name",
}

var SelectUrl="http://appservice.etravel.net.cn/SystemService.svc/SelectUrlPost"
$(function(){
  // $.session.set('ajaxUrl', 'https://online.bcdtravel.cn/SystemAPI_PostSend/api/SystemAPI/PostSend');
  // $.session.set('ajaxUrl', 'https://ebookingapi.etravel.net.cn/api/SystemAPI/PostSend');
  
  $.getJSON('../../ajaxUrl.json?'+Math.random(), function(data) {
  	if(data.ajaxUrl!=undefined){
  		$.session.set('ajaxUrl', data.ajaxUrl);
  	}else{
  		$.session.set('ajaxUrl', 'https://online.bcdtravel.cn/SystemAPI_PostSend/api/SystemAPI/PostSend');
  	}
  	if(data.SelectUrl!=undefined){
  		// SelectUrl=data.SelectUrl
  	}
  })
  
  $(".lanChange").text(get_lan("language"));
  $(".logOutChange").hide();
  $("header").remove();
  // $(".pageHeader").css("height","80px")
  // 11.26显示头部标签,删除logo,删除"联系客服"
  $(".headerContact").remove();
  var ProfileInfo = $.session.get('ProfileInfo');
  if(ProfileInfo == undefined){
	  $(".logoImg").remove();
	  // $('.pageHeader').css('background-color','transparent')
	  $('.lanChange').css('top','15px')
  }
  
  showContent();//内容展示
  login();//登录
  document.onkeydown = function (event) {
     var e = event || window.event || arguments.callee.caller.arguments[0];
     if (e && e.keyCode == 13) {
        $(".btnLogin").click();
     }
  };
  getHost()
})
// 获取域名
function getHost(){
	var urlHost=window.location.host; 
	// 1.北京方唐 bjobt.connexustravel.com.cn  备案号  京ICP备18003877号
	// 2.上海方唐   备案号  
	// 3.四海   备案号  
	var objArr=[
		{
			hostName:"bjobt.connexustravel.com.cn",
			recordNumber:"京ICP备18003877号",
			PublicSecurityRecordNo:"11010502035017"
		},
		{
			hostName:"shobt.connexustravel.com.cn",
			recordNumber:"京ICP备18003877号",
			PublicSecurityRecordNo:"11010502035017"
		},
		{
			hostName:"www.obt.hkfs-tsi.com",
			recordNumber:"沪ICP备11009952号",
			PublicSecurityRecordNo:"31010602003033"
		},
		{
			hostName:"obttest.air-best.com.cn",
			recordNumber:"京ICP备09057610号-3",
			PublicSecurityRecordNo:"11010102000300"
		}
	]
	objArr.map(function(item){
		if(item.hostName==urlHost){
			var h='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode='+item.PublicSecurityRecordNo
			$('.copyright').html($('.copyright').text()+"&nbsp;&nbsp;&nbsp;&nbsp;"+"<a href='"+h+"' target='_blank'>"+item.recordNumber+"</a>")
			return false;
		}
	})
	// var h='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502035017'
// $('.copyright').html($('.copyright').text()+"&nbsp;&nbsp;&nbsp;&nbsp;"+"<a href='"+h+"' target='_blank'>京ICP备18003877号</a>")
// 	console.log(urlHost)
}
//内容展示
function showContent(){
    $(".right-bg").html('\
            <p class="right-title">\
                '+get_lan('customer')+'<span style="color: #EF853A; font-weight: bold;"> '+get_lan('login')+'</span>\
            </p>\
            <div style="height:2px;"></div>\
            <label for="txtCompanyName" id="txtCompanyNameLable" style="margin-top: 17px;">\
                '+get_lan('company')+'\
                <span id="lblError2" style="color: #EF3948;"></span>\
            </label>\
            <input name="txtCompanyName" type="text" id="txtCompanyName" style="" tabindex="1">\
            <label for="txtLoginName">\
                '+get_lan('userName')+'\
                <span id="lblError" style="display:none"></span>\
            </label>\
            <input name="txtLoginName" type="text" id="txtLoginName" tabindex="2">\
            <label for="txtLoginPassword">\
                '+get_lan('password')+'</label>\
            <input name="txtLoginPassword" type="password" id="txtLoginPassword" tabindex="3">\
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
        var companyName = $('#txtCompanyName').val();
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
                    url: SelectUrl,
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
												// companyPhone=res.CompanyPhoneList[0].Telephone
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
            //                                   console.log(ProfileInfo);
            //                                   $.session.set('ProfileInfo', JSON.stringify(ProfileInfo));
                                              // if(res.NeedUpdatePassword&&!res.HideChangePassword){
                                              //   updatePassword(res);
                                              // }else if((res.DocumentsDetail.length == 0||res.Phone==""||res.Email==""||res.Phone==null||res.Email==null)){
                                              //   completeInfo(res);
                                              // }else{
												  rememberUser()
                                                window.location.href = '../../index/index.html';
                                              // }
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
    })
}
function updatePassword(ProfileInfo){
  $('body').mLoading("hide");
  $(".tittleText").text(get_lan("updateRemind"));
  $(".popBody").html('\
    <div class="popBodyLi flexRow">\
      <div class="popBodyLiTittle">'+get_lan("newPassword")+'</div>\
      <input type="password" class="liInput newPasswordInput">\
    </div>\
    <div class="popBodyLi flexRow">\
      <div class="popBodyLiTittle">'+get_lan("confirmPassword")+'</div>\
      <input type="password" class="liInput confirmPasswordInput">\
    </div>\
    <div class="updatePasswordBtn">'+get_lan("Confirm")+'</div>\
    <ul class="PasswordRuleList" style="color:red;margin:30px 0 30px 0;"></ul>\
    ')
  $.ajax({
      type:'post',
      url : $.session.get('ajaxUrl'), 
      dataType : 'json',
      data:{
          url: $.session.get('obtCompany')+"/SystemService.svc/GetInformationsPost",
          jsonStr:'{"culture":"'+$.session.get('obtLanguage')+'"}'
      },
      success : function(data) {
          var resData = JSON.parse(data);
          console.log(resData);
          resData.PasswordRuleList.map(function(item,index){
           if($.session.get('obtLanguage')=="CN"){
               $(".PasswordRuleList").append('\
                   <li>'+(index+1)+'、'+item.NameCn+'</li>\
               ')
           }else if($.session.get('obtLanguage')=="EN"){
               $(".PasswordRuleList").append('\
                   <li>'+(index+1)+'、'+item.NameEn+'</li>\
               ')
           }
          })
       }
   });
  $(".updatePasswordBtn").unbind("click").click(function(){
    if($(".newPasswordInput").val()!=""){
      if ($(".newPasswordInput").val()!=$(".confirmPasswordInput").val()) {
          alert(get_lan("passwordRemind2"));
          return;
      }
      $('body').mLoading("show");
      $.ajax({
          url:$.session.get('ajaxUrl'),
          type:"post",
          data:{
             url: $.session.get('obtCompany')+"/SystemService.svc/ChangeUserPwdPost",
             jsonStr:'{"key":'+$.session.get('netLoginId')+',"txtPrePassword":"'+$("#txtLoginPassword").val()+'","txtNewPassword1":"'+$(".newPasswordInput").val()+'","culture":"'+$.session.get('obtLanguage')+'"}'
         },
         dataType:"json",
         success:function(data){
              var res = JSON.parse(data);
              closePop();
              alert(res);
              $('body').mLoading("hide");
              if(res=="密码修改成功"||res=="Success"){
                  completeInfo(ProfileInfo);
                  // if(ProfileInfo.DocumentsDetail.length == 0||ProfileInfo.Phone==""||ProfileInfo.Email==""||ProfileInfo.Phone==null||ProfileInfo.Email==null){
                  //   completeInfo(ProfileInfo);
                  // }else{
                  //   window.location.href = '../../index/index.html';
                  // }
              }
         }
      });
    }else{
      alert(get_lan('remind'));
    }
  })
  openPop();
  $(".closePop").unbind("click").click(function(){
      closePop();
  })
}
function completeInfo(ProfileInfo){
    $('body').mLoading("hide");
    $(".tittleText").text(get_lan("completeInfoRemind"));
    console.log(ProfileInfo);
    var phone = ProfileInfo.Phone==null?"":ProfileInfo.Phone;
    var Email = ProfileInfo.Email==null?"":ProfileInfo.Email;
    var name = $.session.get('obtLanguage')=="CN"?ProfileInfo.CustomerCN:ProfileInfo.CustomerEN;
    $(".popBody").html('\
      <div class="completeInfoBody">\
        <div class="popBodyLi flexRow">\
          <div class="popBodyLiTittle">'+get_lan("name")+'</div>\
          <input type="text" class="liInput" value="'+name+'" readonly>\
        </div>\
        <div class="popBodyLi flexRow">\
          <div class="popBodyLiTittle">'+get_lan("phone")+'</div>\
          <input type="text" class="liInput phoneInput" value="'+phone+'">\
        </div>\
        <div class="popBodyLi flexRow">\
          <div class="popBodyLiTittle">'+get_lan("email")+'</div>\
          <input type="text" class="liInput emailInput" value="'+Email+'">\
        </div>\
      </div>\
      <div class="completeInfoBtn">'+get_lan("Confirm")+'</div>\
      ')
    var documentNum = "";
    var docExpiryDate= "";
    ProfileInfo.DocumentsDetail.map(function(item){
      if(item.Rid==1){
        documentNum = item.DocumentNumber;
      }
      if(item.Rid==2&&ProfileInfo.CustomerCN==ProfileInfo.CustomerEN){
        documentNum = item.DocumentNumber;
        docExpiryDate = item.docExpiryDate;
      }
    })
    if(ProfileInfo.CustomerCN!=ProfileInfo.CustomerEN){
      $(".completeInfoBody").append('\
        <div class="popBodyLi flexRow">\
          <div class="popBodyLiTittle">'+get_lan("idCard")+'</div>\
          <input type="text" class="liInput documentInput" rid="1" value="'+documentNum+'">\
        </div>\
        ')
    }else{
      $(".completeInfoBody").append('\
        <div class="popBodyLi flexRow">\
          <div class="popBodyLiTittle">'+get_lan("passport")+'</div>\
          <input type="text" class="liInput documentInput" rid="2">\
        </div>\
        <div class="popBodyLi flexRow">\
          <div class="popBodyLiTittle">'+get_lan("Expiration")+'</div>\
          <input type="text" class="liInput documentDateInput" readonly value="'+docExpiryDate+'">\
        </div>\
        ')
      $(".documentDateInput").datepicker({
          dateFormat: 'yy-mm-dd',
          timeFormat: "HH:mm",
          changeMonth: true,
          minDate: 0,  // 当前日期之后的 0 天，就是当天
          hideIfNoPrevNext: true,
          showOtherMonths: true,
          selectOtherMonths: true,
          changeYear: true,
      });
    }
    // if(ProfileInfo.Phone==""||ProfileInfo.Phone==null){
    //   $(".completeInfoBody").append('\
    //     <div class="popBodyLi flexRow">\
    //       <div class="popBodyLiTittle">'+get_lan("phone")+'</div>\
    //       <input type="text" class="liInput phoneInput">\
    //     </div>\
    //     ')
    // }
    // if(ProfileInfo.Email==""||ProfileInfo.Email==null){
    //   $(".completeInfoBody").append('\
    //     <div class="popBodyLi flexRow">\
    //       <div class="popBodyLiTittle">'+get_lan("email")+'</div>\
    //       <input type="text" class="liInput emailInput">\
    //     </div>\
    //     ')
    // }
    // if(ProfileInfo.DocumentsDetail.length == 0){
    //   if(ProfileInfo.CustomerCN!=ProfileInfo.CustomerEN){
    //     $(".completeInfoBody").append('\
    //       <div class="popBodyLi flexRow">\
    //         <div class="popBodyLiTittle">'+get_lan("idCard")+'</div>\
    //         <input type="text" class="liInput documentInput" rid="1">\
    //       </div>\
    //       ')
    //   }else{
    //     $(".completeInfoBody").append('\
    //       <div class="popBodyLi flexRow">\
    //         <div class="popBodyLiTittle">'+get_lan("passport")+'</div>\
    //         <input type="text" class="liInput documentInput" rid="2">\
    //       </div>\
    //       <div class="popBodyLi flexRow">\
    //         <div class="popBodyLiTittle">'+get_lan("Expiration")+'</div>\
    //         <input type="text" class="liInput documentDateInput" readonly>\
    //       </div>\
    //       ')
    //     $(".documentDateInput").datepicker({
    //         dateFormat: 'yy-mm-dd',
    //         timeFormat: "HH:mm",
    //         changeMonth: true,
    //         minDate: 0,  // 当前日期之后的 0 天，就是当天
    //         hideIfNoPrevNext: true,
    //         showOtherMonths: true,
    //         selectOtherMonths: true,
    //         changeYear: true,
    //     });
    //   }
    // }
    $(".completeInfoBtn").unbind("click").click(function(){
        var phoneValue =$(".phoneInput").val();
        var emailValue =$(".emailInput").val();
        var documentValue =$(".documentInput").val();
        var expirationValue = $(".documentDateInput").val()?$(".documentDateInput").val():"";
        if(phoneValue){
          var regPhone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
          if(!regPhone.test(phoneValue)){
              alert(get_lan("remind"));
              return false;
          }
        }else{
          phoneValue = "";
        }
        if(emailValue){
          var regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if(!regEmail.test(emailValue)){
              alert(get_lan("remind"));
              return false;
          }
        }else{
          emailValue = "";
        }
        var docInfo = '';
        // if(ProfileInfo.CustomerCN!=ProfileInfo.CustomerEN)
        if(documentValue){
          docInfo = $(".documentInput").attr("rid")+','+documentValue+',,,,'+expirationValue;
        }
        if(phoneValue!=""||emailValue!=""||docInfo){
          $('body').mLoading("show");
          $.ajax({
              url:$.session.get('ajaxUrl'),
              type:"post",
              dataType:"json",
              data:{
                  url: $.session.get('obtCompany')+"/Systemservice.svc/CustomerInfoUpdateOrAddPost",
                  jsonStr:'{"customerId":"'+ProfileInfo.ID+'","emailInfo":"'+emailValue+'","docInfo":"'+docInfo+'","phoneInfo":"'+phoneValue+'","memberShipInfo":"","id":'+$.session.get('netLoginId')+',"Language":"'+$.session.get('obtLanguage')+'"}'
              },
              success:function(data){
                $('body').mLoading("hide");
                  var res = JSON.parse(data);
                  console.log(res);
                  if(res.code==200){
                    window.location.href = '../../index/index.html';
                  }else{
                    alert(res.message);
                  }
              },
              error:function(){

              }
          });
        }
    })
    openPop();
    $(".closePop").unbind("click").click(function(){
        closePop();
    })
}
function openPop(){
    $("#cover").show();
    $(".loginPop").css("display","block");
}
function closePop(){
    $("#cover").hide();
    $(".loginPop").css("display","none");
}