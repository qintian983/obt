var obtLanguage = $.session.get('obtLanguage');
//中英文对象
var cn = {
	"forgetTittle":"忘记密码",
    "step":{
        "step1":"输入账号",
        "step2":"验证手机号/邮箱",
        "step3":"重置密码",
        "step4":"完成",
    },
    "inputBody":{
        "CompanyCode":"公司代码:",
        "userAccount":"账号:",
        "CompanyCodePlaceholder":"请输入公司代码",
        "userAccountPlaceholder":"请输入账号",
        "next":"下一步",
        "phoneEmail":"验证手机号/邮箱:",
        "email":"邮箱",
        "phone":"手机号",
        "identifyingCode":"验证码:",
        "identifyingBtn":"获取验证码",
        "identifyingPlaceholder":"请输入验证码",
        "newPassword":"设置新密码:",
        "newPasswordAgain":"确认新密码:",
        "newPasswordPlaceholder":"请输入新密码",
        "newPasswordAgainPlaceholder":"请再次输入新密码",
        "CompleteBtn":"返回登录",
        "emailReminder":"*如您的邮箱与系统中不同，请与服务组联系",
        "phoneReminder":"*如您的手机号与系统中不同，请与服务组联系"
    },
    "remind":"请正确填写！",
    "passwordDifferentRemind":"两次密码不一致，请重新输入确认密码"
}
var en = {
	"forgetTittle":"Forget Password",
    "step":{
        "step1":"Input Account",
        "step2":"Verify Phone Number/Email",
        "step3":"Reset Password",
        "step4":"Complete",
    },
    "inputBody":{
        "CompanyCode":"Company Code:",
        "userAccount":"Account:",
        "CompanyCodePlaceholder":"Please input company code",
        "userAccountPlaceholder":"Please input account",
        "next":"Next",
        "phoneEmail":"Phone/Email:",
        "email":"Email",
        "phone":"Phone",
        "identifyingCode":"Identifying Code:",
        "identifyingBtn":"Get Verification Code",
        "identifyingPlaceholder":"Please input Identifying code",
        "newPassword":"New Password:",
        "newPasswordAgain":"Confirm:",
        "newPasswordPlaceholder":"Please input new password",
        "newPasswordAgainPlaceholder":"Please input new password again",
        "CompleteBtn":"Return",
        "emailReminder":"*If your email is different from that in the system, please contact the service group",
        "phoneReminder":"*If your phone number is different from that in the system, please contact the service group"
    },
    "remind":"Please fill in correctly!",
    "passwordDifferentRemind":"The two passwords don't match. Please re-enter the confirmation password"
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
    if(t==undefined) t = cn[m];
    if(t==undefined) t = en[m];
    return t;
}
//20201125新接口模型
function AccountInfo(accountInfoObj){
    this.accountMsg = accountInfoObj.accountMsg;
    this.accountStatus = accountInfoObj.accountStatus;
    this.customerId = accountInfoObj.customerId;
    this.email = accountInfoObj.email;
    this.emailMsg = accountInfoObj.emailMsg;
    this.emailStatus = accountInfoObj.emailStatus;
    this.phone = accountInfoObj.phone;
    this.phoneMsg = accountInfoObj.phoneMsg;
    this.phoneStatus = accountInfoObj.phoneStatus;
}
$(function(){
   showContent();//内容展示
})
function showContent(){
	$("#main").html('\
	    <div class="autoCenter">\
	        <div class="forgetTittle">'+get_lan("forgetTittle")+'</div>\
            <div class="roundBody">\
                <div class="roundOutside"><div class="roundInside roundActive">1</div></div>\
                <div class="dashedLine"></div>\
                <div class="roundOutside" style="left:500px"><div class="roundInside">2</div></div>\
                <div class="dashedLine" style="left:571px"></div>\
                <div class="roundOutside" style="left:696px"><div class="roundInside">3</div></div>\
                <div class="dashedLine" style="left:758px"></div>\
                <div class="roundOutside" style="left:880px"><div class="roundInside">4</div></div>\
            </div>\
            <div class="flexRow">\
              <div class="stepText stepActive" style="margin-left:252px;">'+get_lan("step").step1+'</div>\
              <div class="stepText" style="margin-left:52px;">'+get_lan("step").step2+'</div>\
              <div class="stepText" style="margin-left:42px;">'+get_lan("step").step3+'</div>\
              <div class="stepText" style="margin-left:35px;">'+get_lan("step").step4+'</div>\
            </div>\
            <div class="inputBody" style="margin-top:100px;">\
                <div class="flexRow CompanyCodeLi hide">\
                  <div class="inputBox"><div class="liTittle">'+get_lan("inputBody").CompanyCode+'</div><Input class="liInput companyCode" placeholder="'+get_lan("inputBody").CompanyCodePlaceholder+'"></div>\
                </div>\
                <div class="flexRow" style="margin-top:20px;">\
                  <div class="inputBox"><div class="liTittle">'+get_lan("inputBody").userAccount+'</div><Input class="liInput userAccount" placeholder="'+get_lan("inputBody").userAccountPlaceholder+'"></div>\
                </div>\
                <div class="nextStep">'+get_lan("inputBody").next+'<div>\
            </div>\
	    </div>\
	    ')
    passwordStep1();
    if(window.location.href.indexOf("bcd") == -1){
      $(".CompanyCodeLi").removeClass("hide");
    }
}
function passwordStep1(){
    $(".nextStep").unbind("click").click(function(){
        if($(".CompanyCodeLi").hasClass("hide")){
            var companyCode = 'bcd';
        }else{
            var companyCode = $(".companyCode").val();
        }
        
        var userAccount = $(".userAccount").val();
        if(companyCode==""||userAccount==""){
            alert(get_lan("remind"));
            return false;
        }
        $('body').mLoading("show");
        $.ajax(
          {
            type:'post',
            url : $.session.get('ajaxUrl'),
            dataType : 'json',
            crossDomain : true,
            data:{
                url: "http://appservicetest.etravel.net.cn/SystemService.svc/SelectUrlPost",
                jsonStr:'{"CompanyMs":"'+companyCode+'"}'
            },
            success : function(data) {
                var res = JSON.parse(data);
                console.log(res);
                var Company_Url = res.Company_Url;
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'), 
                    dataType : 'json',
                    data:{
                        url: Company_Url+"/SystemService.svc/GetPwdCustomerInfo",
                        jsonStr:'{"companyCode":"'+companyCode+'","userAccount":"'+userAccount+'","language":"'+obtLanguage+'"}'
                    },
                    success : function(data) {
                        $('body').mLoading("hide");
                        var res = JSON.parse(data);
                        console.log(res);
                        var userInfo = new AccountInfo(res);
                        if(res.accountStatus == "200"){
                            $(".roundInside").removeClass("roundActive");
                            $(".roundInside").eq(1).addClass("roundActive");
                            $(".stepText").removeClass("stepActive");
                            $(".stepText").eq(1).addClass("stepActive");
                            $(".inputBody").html('\
                                <div class="flexRow">\
                                    <div class="phone-email-box inputBox">\
                                        <div class="liTittle">'+get_lan("inputBody").phoneEmail+'</div>\
                                        <select>\
                                            <option value="email">'+get_lan("inputBody").email+'</option>\
                                            <option value="phone">'+get_lan("inputBody").phone+'</option>\
                                        </select>\
                                        <input type="text" class="phoneEmailText" value="'+res.email+'" readonly>\
                                        <input type="button" value="'+get_lan("inputBody").identifyingBtn+'" class="identifyingBtn" customerInfo="'+res.data+'">\
                                        <div style="clear:both"></div>\
                                    </div>\
                                </div>\
                                <div class="flexRow" style="margin-top:20px;">\
                                  <div class="inputBox"><div class="liTittle">'+get_lan("inputBody").identifyingCode+'</div><Input class="liInput identifyingInput" placeholder="'+get_lan("inputBody").identifyingPlaceholder+'"></div>\
                                </div>\
                                <div class="nextStep2">'+get_lan("inputBody").next+'</div>\
                                <p class="numberModifyReminder">'+get_lan("inputBody").emailReminder+'</p>\
                                ')
                            //验证邮箱
                            validateEmailAndPhone(userInfo, 'email');
                            //绑定切换邮箱手机号事件
                            $('.phone-email-box select').bind('change',function(){
                                validateEmailAndPhone(userInfo,$(this).val());
                                $('.numberModifyReminder').html(get_lan("inputBody")[$(this).val()+'Reminder']);
                            })
                            passwordStep2(Company_Url,userInfo);
                        }else{
                            alert(res.accountMsg)
                        }
                    },
                    error : function() {
                      // alert('fail');
                    }
                  }
                );
            },
            error : function() {
              // alert('fail');
            }
          }
        );
    })
}
function passwordStep2(Company_Url,userInfo){
    $(".identifyingBtn").unbind("click").click(function(){
        if($(this).attr('number')==''){
            alert(userInfo[$(this).attr('method')+'Msg']);
            return;
        }
        $('body').mLoading("show");
        var identifyBtn = this;
        var getVerificationCodeJson = {
            customerId:userInfo.customerId,
            phone:'',
            email:'',
            language:obtLanguage
        }
        //取btn值传验证码
        if($(identifyBtn).attr('method')=='email'){
            getVerificationCodeJson.email = $(identifyBtn).attr('number');
            $('.nextStep2').attr('method','email');
        }else if($(identifyBtn).attr('method')=='phone'){
            getVerificationCodeJson.phone = $(identifyBtn).attr('number');
        }

        $.ajax(
          {
            type:'post',
            url : $.session.get('ajaxUrl'), 
            dataType : 'json',
            data:{
                url: Company_Url+"/SystemService.svc/GetVerificationCodeNew",
                jsonStr:JSON.stringify(getVerificationCodeJson)
            },
            success : function(data) {
                var res = JSON.parse(data);
                console.log(res);
                $('body').mLoading("hide");
                if(res.code == "200"){
                    settime(identifyBtn);
                    var countdown = 59;

                    function settime(val) {
                        if(countdown==undefined){
                            countdown = 60;
                        }
                        if (countdown == 0) {
                            val.removeAttribute("disabled");
                            val.value=get_lan("inputBody").identifyingBtn;
                            countdown = 60;
                        } else{
                            // console.log(countdown);
                            val.setAttribute("disabled", true);
                            val.value= countdown+'s';
                            countdown--;
                            setTimeout(function() {
                                settime(val);
                            },1000)
                        }
                    }
                }else{
                    alert(res.message)
                }
            },
            error : function() {
              // alert('fail');
            }
          }
        );
    })
    //验证当前界面上的phone or email
    $(".nextStep2").unbind("click").click(function(){
        var identifyingCode = $(".identifyingInput").val();
        if(identifyingCode==""){
            alert(get_lan("remind"));
            return false;
        }
        var nextStepBtn = this;
        var checkVerificationCodeJson = {
            customerId:userInfo.customerId,
            phone:'',
            email:'',
            verificationCode:identifyingCode,
            language:obtLanguage
        }
        //取btn值传验证码
        if($(".identifyingBtn").attr('method')=='email'){
            checkVerificationCodeJson.email = $(".identifyingBtn").attr('number');
            $('.nextStep2').attr('method','email');
        }else if($(".identifyingBtn").attr('method')=='phone'){
            checkVerificationCodeJson.phone = $(".identifyingBtn").attr('number');
        }
        $.ajax(
          {
            type:'post',
            url : $.session.get('ajaxUrl'), 
            dataType : 'json',
            data:{
                url: Company_Url+"/SystemService.svc/CheckVerificationCodeNew",
                jsonStr: JSON.stringify(checkVerificationCodeJson)
            },
            success : function(data) {
                var res = JSON.parse(data);
                console.log(res);
                if(res.code == "200"){
                    $(".roundInside").removeClass("roundActive");
                    $(".roundInside").eq(2).addClass("roundActive");
                    $(".stepText").removeClass("stepActive");
                    $(".stepText").eq(2).addClass("stepActive");
                    $(".inputBody").html('\
                        <div class="flexRow">\
                          <div class="inputBox"><div class="liTittle">'+get_lan("inputBody").newPassword+'</div><Input type="password" class="liInput newPassword" placeholder="'+get_lan("inputBody").newPasswordPlaceholder+'"></div>\
                        </div>\
                        <div class="flexRow" style="margin-top:20px;">\
                          <div class="inputBox"><div class="liTittle">'+get_lan("inputBody").newPasswordAgain+'</div><Input type="password" class="liInput newPasswordAgain" placeholder="'+get_lan("inputBody").newPasswordAgainPlaceholder+'"></div>\
                        </div>\
                        <div class="flexRow"><ul class="PasswordRuleList"></ul></div>\
                        <div class="nextStep3">'+get_lan("inputBody").next+'<div>\
                        ')
                    $.ajax({
                        type:'post',
                        url : $.session.get('ajaxUrl'), 
                        dataType : 'json',
                        data:{
                            url: Company_Url+"/SystemService.svc/GetInformationsPost",
                            jsonStr:'{"culture":"'+obtLanguage+'"}'
                        },
                        success : function(data) {
                            var resData = JSON.parse(data);
                            console.log(resData);
                            resData.PasswordRuleList.map(function(item,index){
                             if(obtLanguage=="CN"){
                                 $(".PasswordRuleList").append('\
                                     <li>'+(index+1)+'、'+item.NameCn+'</li>\
                                 ')
                             }else if(obtLanguage=="EN"){
                                 $(".PasswordRuleList").append('\
                                     <li>'+(index+1)+'、'+item.NameEn+'</li>\
                                 ')
                             }
                            })
                         }
                     } 
                    );
                    passwordStep3(Company_Url,userInfo);
                }else{
                    alert(res.message)
                }
            },
            error : function() {
              // alert('fail');
            }
          }
        );
    })
}
function passwordStep3(Company_Url,userInfo){
    $(".nextStep3").unbind("click").click(function(){
        var newPassword = $(".newPassword").val();
        var newPasswordAgain = $(".newPasswordAgain").val();
        if(newPassword==""||newPasswordAgain==""){
            alert(get_lan("remind"));
            return false;
        }else if(newPassword!=newPasswordAgain){
            alert(get_lan("passwordDifferentRemind"));
            return false;
        }
        var modifyPasswordJson = {
            customerId:userInfo.customerId,
            newPassword: newPassword,
            language:obtLanguage
        }
        $.ajax(
          {
            type:'post',
            url : $.session.get('ajaxUrl'), 
            dataType : 'json',
            data:{
                url: Company_Url+"/SystemService.svc/ModifyPasswordNew",
                jsonStr: JSON.stringify(modifyPasswordJson)
            },
            success : function(data) {
                var res = JSON.parse(data);
                console.log(res);
                if(res.code == "200"){
                    alert(res.data);
                    $(".roundInside").removeClass("roundActive");
                    $(".roundInside").eq(3).addClass("roundActive");
                    $(".stepText").removeClass("stepActive");
                    $(".stepText").eq(3).addClass("stepActive");
                    $(".inputBody").html('\
                        <div class="CompleteBtn" customerInfo="'+res.data+'">'+get_lan("inputBody").CompleteBtn+'<div>\
                        ')
                    $(".CompleteBtn").unbind("click").click(function(){
                        if(window.location.href.indexOf("bcd") == -1){
                          window.location.href = '../../login/loginPage.html';
                        }else{
                          window.location.href = '../../login/loginPageBCD.html';
                        }
                    })
                }else{
                    alert(res.message)
                }
            },
            error : function() {
              // alert('fail');
            }
          }
        );
    })
}

//验证邮箱or手机号是否正确
//如果xxxStatus不是200，提示
//否则正常
//name: phone 或者 email字符串
//
function validateEmailAndPhone(obj,name){
    if(obj[name+'Status']!=200){
        $(".phoneEmailText").val("");
        $('.identifyingBtn').attr('method',name);
        $('.identifyingBtn').attr('number','');
    }else{
        var hidden = '';
        //加密
        if(name == 'email'){
            var emailAddress = obj[name];
            var index = emailAddress.indexOf('@');
            if(index<4){
                hidden = emailAddress.replace(emailAddress.slice(1,index),function(sMatch){
                     return sMatch.replace(/./g,"*")
                });
            }else{
                hidden = emailAddress.replace(emailAddress.slice(index-4,index),"****");
            }
        }else{
            var phone = obj[name];
            hidden = phone.replace(phone.slice(3,7),"****");
        }
        $(".phoneEmailText").val(hidden);
        $('.identifyingBtn').attr('method',name);
        $('.identifyingBtn').attr('number',obj[name]);
    }
}