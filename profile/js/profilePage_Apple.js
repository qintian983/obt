var netUserId = $.session.get('netLoginId');
var obtLanguage = $.session.get('obtLanguage');
var regPhone = tools.regPhone;

if($.session.get('ProfileInfo')){
	var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
}
$(function() {
  showContent();
});

if(ProfileInfo.NeedUpdatePassword==true){
	openRemindPop();
	$("#cover").unbind("click").click(function(){
		closeRemindPop();
	})
	$(".remindPop").html('\
		<div style="text-align:center;font-size:19px;margin-bottom:10px;height:30px;line-height:30px;">Welcome to<img style="margin:0px 0 0 10px;" src="../css/images/AppleTravelIcon2.png"></div>\
		<div style="text-align:left;font-size:16px;">Please ensure your Chinese and English name, DOB, gender and nationality in your profile match what you have on the government ID or passport you intend to use during travel.</div>\
		')
}
//中英文对象
var cn = {
	"success":"修改成功!",
	"delRemind":"确认删除吗?",
	"closeText": "确定",
	"currentText":"当月",
	"popBody":{
		"cancel":"取消",
		"confirm":"确定",
		"type":"类型:",
		"preference":"喜好:",
		"detail":"详细内容:",
	},
	"personalInfoBody":{
		"personalInfoTittle":"个人基本资料",
		'Company':'所属公司:',
		'ChineseName':'中文姓名:',
		'EnglishName':'英文名字:',
		'Gender':'性别:',
		'Nationality':'国籍:',
		'Dateofbirth':'出生年月:',
		'phoneNum':'手机号码:',
		'Mailbox':'常用邮箱:',
		'edit':'修改',
		'male':'男',
		'Female':'女',
		'save':'保存',
		'remind':'请正确填写',
		'hint':'如姓名和证件号不一致，请联系客服：',
	},
	"billingInfoBody":{
		"billingInfoTittle":"账单信息",
		"PleaseSelect":"请选择",
		"modify":"修改",
	},
	"creditCardBody":{
		"creditCardTittle":"信用卡",
		"cardNumber":"卡号",
		"expirationDate":"到期时间",
		"addCreditCard":"添加信用卡",
	},
	"documentInfoBody":{
		"documentInfoTittle":"证件信息",
		'name':"证件姓名",
		'documentType':'证件种类',
		'idNumber':'证件号码',
		'expirationDate':'有效期',
		'operation':'操作',
		'modify':"修改",
		'save':"保存",
		'popTittle':"修改姓名或国家",
		'chineseName':"中文姓名:",
		'englishName':"英文姓名:",
		"nationality":"国籍:",
		"issueNationality":"签发国:",
		"surname":"姓",
		"givenName":"名",
		"addPassport":"添加证件号",
		"delete":"删除",
	},
	"preferenceBody":{
		"preferenceTittle":"喜好",
		'type':"种类",
		'Preference':"喜好",
		'detail':"详细",
		'Edit':"操作",
		'addPreference':"添加喜好",
		"Air":"机票",
		"hotel":"酒店",
		"car":"租车",
		"delete":"删除",
	},
	"membershipBody":{
		'membershipTittle':"常旅客卡",
		'MembershipType':'持常旅客卡种类',
		'idNumber':'卡号',
		'issuer':'发卡机构',
		'edit':"操作",
		'frequentFlyerCard':'航空常旅客卡',
		'hotelMembership':'酒店常旅客卡',
		'carMembership':'租车常旅客卡',
		'addMembership':"添加常旅客卡",
	},
	"arrangerBody":{
		"arrangerTittle":"代订人",
		"edit":"操作",
		"delete":"删除",
		"search":"搜索",
		"addArranger":"添加代订人",
		"arrangerRemind":"请选择代订人",
		"searchArranger":"可输入姓名或邮箱",
	},
}
var en = {
	"success":"Success!",
	"delRemind":"Confirm deletion?",
	"closeText": "Confirm",
	"currentText":"thisMonth",
	"popBody":{
		"cancel":"Cancel",
		"confirm":"Confirm",
		"type":"Type:",
		"preference":"Preference:",
		"detail":"Detail:",
	},
	"personalInfoBody":{
		"personalInfoTittle":"Personal Information",
		'Company':'Company:',
		'ChineseName':'Chinese Name:',
		'EnglishName':'English Name:',
		'Gender':'Gender:',
		'Nationality':'Nationality:',
		'Dateofbirth':'Date of Birth:',
		'phoneNum':'Phone Num:',
		'Mailbox':'Email:',
		'edit':'Edit',
		'male':'Male',
		'Female':'Female',
		'save':'Save',
		'remind':'Please fill in correctly.',
		'hint':'Please ensure your name and ID number are consistent.',
	},
	"billingInfoBody":{
		"billingInfoTittle":"Payment Information",
		"PleaseSelect":"Please Select",
		"modify":"Modify",
	},
	"creditCardBody":{
		"creditCardTittle":"Credit Card",
		"cardNumber":"Card Number",
		"expirationDate":"Expiration Date",
		"addCreditCard":"Add Credit Card",
	},
	"documentInfoBody":{
		"documentInfoTittle":"Passport and ID",
		'name':"Name on ID",
		'documentType':'Document Type',
		'idNumber':'ID Number',
		'expirationDate':'Expiration Date',
		'operation':'Edit',
		'modify':"Modify",
		'save':"Save",
		'popTittle':"Modify Name or Nationality",
		'chineseName':"Chinese Name:",
		'englishName':"English Name:",
		"nationality":"Nationality:",
		"issueNationality":"Issue Country:",
		"surname":"Surname",
		"givenName":"Given Name",
		"addPassport":"Add Passport",
		"delete":"Delete",
	},
	"preferenceBody":{
		"preferenceTittle":"Travel Preferences",
		'type':"Type",
		'Preference':"Preference",
		'detail':"Detail",
		'Edit':"Edit",
		'addPreference':"Add Preference",
		"Air":"Air",
		"hotel":"Hotel",
		"car":"Car",
		"delete":"Delete",
	},
	"membershipBody":{
		'membershipTittle':"Loyalty Programs",
		'MembershipType':'Membership Type',
		'idNumber':'Card Number',
		'issuer':'Issuer',
		'edit':"Edit",
		'frequentFlyerCard':'Frequent Flyer Card',
		'hotelMembership':'Hotel Membership Card',
		'carMembership':'Car Rental Membership',
		'addMembership':"Add Membership",
	},
	"arrangerBody":{
		"arrangerTittle":"Travel Arranger",
		"edit":"Edit",
		"delete":"Delete",
		"search":"Search",
		"addArranger":"Add",
		"arrangerRemind":"Please Choose Arranger",
		"searchArranger":"Enter first name or email",
	},
}

function get_lan(m){
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
// 按键监听事件
function check(e,dom) {
		//获取键盘输入的keyCode 
		  console.log(e)
		var keycode = (Number)(e.keyCode);
		// 中文输入法下keyCode为229
		var CnList=['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Delete','Insert','Space','Backspace','KeyA','KeyB','KeyC','KeyD','KeyE','KeyF','KeyG','KeyH','KeyI','KeyJ','KeyK','KeyL','KeyM','KeyN','KeyO','KeyP','KeyQ','KeyR','KeyS','KeyT','KeyU','KeyV','KeyW','KeyX','KeyY','KeyZ']
		var numList=[]
		for(var i=0;i<10;i++){
			numList.push("Digit"+i)
		}
		if (e.keyCode == 229) {
			if(CnList.indexOf(e.code)>-1 || numList.indexOf(e.code)>-1){
				e.returnValue = true;
			}else{
				var str=$(dom).val()
				$(dom).val(str.substring(0,str.length-1))
				setTimeout(function() {
					$(dom).val(str.replace(/[^\u4e00-\u9fa5a-zA-Z]/g,''))
				}, 10);
			}
		}else if (keycode >= 65 && keycode <= 90) {
			//键盘上方数字键        
			//小数字键盘         
			e.returnValue = true;
		}else if(keycode == 8 || keycode == 13 || keycode == 35 || keycode == 36 || keycode==46 || keycode==32 || keycode==37|| keycode==38|| keycode==39|| keycode==40){
			//8 Backspace 13 Enter  35 end 36 home 46 Delete
			//32 空格 37,38,39,40 ←↑→↓
			e.returnValue = true;
		}else{
			e.returnValue = false;
		}
	}
function showContent(){
	$("#main").html('\
	    <div class="autoCenter">\
	      <div class="personalInfoBody"></div>\
	      <div class="billingInfoBody"></div>\
	      <div class="creditCardBody"></div>\
	      <div class="documentInfoBody"></div>\
	      <div class="preferenceBody"></div>\
	      <div class="membershipBody"></div>\
	      <div class="arrangerBody"></div>\
	    </div>\
	    ')
	$.ajax({
	    type:'post',
	    url : $.session.get('ajaxUrl'),
	    dataType : 'json',
	    data:{
	        url: $.session.get('obtCompany')+"/SystemService.svc/RealTimeProfilePost",
	        jsonStr:'{"key":'+netUserId+',"Language":"'+obtLanguage+'"}'
	    },
	    success : function(data) {
	        var res = JSON.parse(data);
	        personalInfoBody(res);//个人信息
	        billingInfoBody(res);//账单信息
	        creditCardBody(res);//信用卡
	        documentInfoBody(res);//证件信息
	        preferenceBody(res);//喜好
	        membershipBody(res);//常旅客卡
	        arrangerBody(res);//代订人
	    },
	    error : function() {
	      // alert('fail');
	    }
	  });
	/*弹窗*/
	$(".popBody").html('\
		<div class="popTittle"></div>\
		<div class="popContent"></div>\
		<div class="popFooter flexRow">\
		  <div class="cancelPop">'+get_lan("popBody").cancel+'</div>\
		  <div class="confirmPop">'+get_lan("popBody").confirm+'</div>\
		</div>\
		')
	$(".cancelPop").unbind("click").click(function(){
		closePop();
	})
}
function personalInfoBody(profileInfo){
	console.log(profileInfo);
	var CompanyName = obtLanguage=="CN"?profileInfo.CompanyNameCn:profileInfo.CompanyNameEn;
	var Gender = profileInfo.Gender == "1"?get_lan("personalInfoBody").male:get_lan("personalInfoBody").Female;
	var Country = obtLanguage=="CN"?profileInfo.CountryCn:profileInfo.CountryEn;

	var CustomerCN = profileInfo.CustomerCN;
	var CustomerEN = profileInfo.CustomerEN;
	var CnSurName = CustomerCN!=CustomerEN?CustomerCN.substring(0,1):CustomerCN.split('/')[0];
	var EnSurName = CustomerEN.split('/')[0];
	if(CustomerCN!=""&&CustomerEN!=""){
		var CnGivenName = CustomerCN!=CustomerEN?CustomerCN.substring(1,CustomerCN.length):CustomerCN.split('/')[1];
		var EnGivenName = CustomerEN.split('/')[1];
	}else{
		var CnGivenName = "";
		var EnGivenName = "";
	}
	//&&profileInfo.NeedUpdatePassword
	var showModifyCnName= profileInfo.CanModifyName&&(profileInfo.Nationality=="CN"||profileInfo.Nationality=="MO"||profileInfo.Nationality=="HK"||profileInfo.Nationality=="TW")?"":"hide";
	var showModifyEnName= profileInfo.CanModifyName?"":"hide";
	$(".personalInfoBody").html('\
		<div style="height:40px;"></div>\
		<div class="personalInfoTittle">'+get_lan("personalInfoBody").personalInfoTittle+'</div>\
		<div class="personalInfoContent flexWrap">\
		  <div class="infoLiTittle">'+get_lan("personalInfoBody").Company+'</div>\
		  <div class="infoLiContent" style="width:780px;">'+CompanyName+'</div>\
		  <div class="infoFinalTittle">'+get_lan("personalInfoBody").ChineseName+'</div>\
		  <div class="infoFinalContent flexRow">\
		    <input class="personalHalfInput CnSurNameInput" type="text" value="'+CnSurName+'" onkeydown="check(event,this)" placeholder="'+get_lan("documentInfoBody").surname+'" readonly>\
		    <input class="personalHalfInput CnGivenNameInput" type="text" value="'+CnGivenName+'" onkeydown="check(event,this)" style="margin-left:10px;" placeholder="'+get_lan("documentInfoBody").givenName+'" readonly>\
		    <span class="editNameCn '+showModifyCnName+'">'+get_lan("personalInfoBody").edit+'</span>\
		  </div>\
		  <div class="infoFinalTittle">'+get_lan("personalInfoBody").EnglishName+'</div>\
		  <div class="infoFinalContent flexRow">\
		    <input class="personalHalfInput EnSurNameInput" type="text" value="'+EnSurName+'" onkeydown="check(event,this)" placeholder="'+get_lan("documentInfoBody").surname+'" readonly>\
		    <input class="personalHalfInput EnGivenNameInput" type="text" value="'+EnGivenName+'" onkeydown="check(event,this)" style="margin-left:10px;" placeholder="'+get_lan("documentInfoBody").givenName+'" readonly>\
		    <span class="editNameEn '+showModifyEnName+'">'+get_lan("personalInfoBody").edit+'</span>\
		  </div>\
		  <div class="infoFinalTittle">'+get_lan("personalInfoBody").Gender+'</div>\
		  <div class="infoFinalContent flexRow">\
		    <input class="personalInput genderInput" type="text" value="'+Gender+'" readonly>\
		    <select class="personalInput genderSelect hide" type="text" value="'+profileInfo.Gender+'" readonly>\
		      <option value="1">'+get_lan("personalInfoBody").male+'</option>\
		      <option value="2">'+get_lan("personalInfoBody").Female+'</option>\
		    </select>\
		    <span class="editGender">'+get_lan("personalInfoBody").edit+'</span>\
		  </div>\
		  <div class="infoFinalTittle">'+get_lan("personalInfoBody").Nationality+'</div>\
		  <div class="infoFinalContent">\
		    <input id="countryInput" class="personalInput countryInput" type="text" value="'+Country+'" readonly><span class="editCountry">'+get_lan("personalInfoBody").edit+'</span>\
		  </div>\
		  <div class="infoFinalTittle">'+get_lan("personalInfoBody").Dateofbirth+'</div>\
		  <div class="infoFinalContent" style="width:780px;">\
		    <input class="personalInput birthDayInput" type="text" value="'+profileInfo.Birthday+'" readonly><span class="editBirth">'+get_lan("personalInfoBody").edit+'</span>\
		  </div>\
		  <div class="infoFinalTittle">'+get_lan("personalInfoBody").phoneNum+'</div>\
		  <div class="infoFinalContent">\
		    <input class="personalInput phoneInput" type="text" value="'+profileInfo.Phone+'" readonly><span class="editPhone hide">'+get_lan("personalInfoBody").edit+'</span>\
		  </div>\
		  <div class="infoFinalTittle">'+get_lan("personalInfoBody").Mailbox+'</div>\
		  <div class="infoFinalContent">\
		    <input class="personalInput emailInput" type="text" value="'+profileInfo.Email+'" readonly><span class="editEmail hide">'+get_lan("personalInfoBody").edit+'</span>\
		  </div>\
		</div>\
		<div class="personalInfoFooter">'+get_lan("personalInfoBody").hint+'</div>\
	')

	$(".editNameCn").unbind("click").click(function(){
		if(!$(".editNameCn").attr("state")||$(".editNameCn").attr("state")=="edit"){
			$(".CnSurNameInput").removeAttr("readonly");
			$(".CnGivenNameInput").removeAttr("readonly");
			$(".CnSurNameInput").focus();
			$(".editNameCn").text(get_lan("personalInfoBody").save);
			$(".editNameCn").attr("state","save");
		}
		else if($(".editNameCn").attr("state")=="save"){
			var CnSurName = $(".CnSurNameInput").val();
			var CnGivenName = $(".CnGivenNameInput").val();
			if($(".CnSurNameInput").val()==""||$(".CnGivenNameInput").val()==""){
			    alert(get_lan("personalInfoBody").remind);
			    return false;
			}else if(!/[\u4E00-\u9FA5]/g.test($(".CnSurNameInput").val())||!/[\u4E00-\u9FA5]/g.test($(".CnGivenNameInput").val())){
				alert(get_lan("personalInfoBody").remind);
				return false;
			}
			else{
				// if(profileInfo.CustomerCN==profileInfo.CustomerEN){
				// 	var basicInfo = ',,,'+CnSurName+'/'+CnGivenName+',';
				// }else{
					var basicInfo = ',,,'+CnSurName+CnGivenName+',';
				// }
				addOrUpdateInfo(profileInfo.ID,"nameCn",basicInfo);
			}
		}
	})
	$(".editNameEn").unbind("click").click(function(){
		if(!$(".editNameEn").attr("state")||$(".editNameEn").attr("state")=="edit"){
			$(".EnSurNameInput").removeAttr("readonly");
			$(".EnGivenNameInput").removeAttr("readonly");
			$(".EnSurNameInput").focus();
			$(".editNameEn").text(get_lan("personalInfoBody").save);
			$(".editNameEn").attr("state","save");
		}
		else if($(".editNameEn").attr("state")=="save"){
			var EnSurName = $(".EnSurNameInput").val().toUpperCase();
			var EnGivenName = $(".EnGivenNameInput").val().toUpperCase();
			if($(".EnSurNameInput").val()==""||$(".EnGivenNameInput").val()==""){
			    alert(get_lan("personalInfoBody").remind);
			    return false;
			}else if(/[\u4E00-\u9FA5]/g.test($(".EnSurNameInput").val())||/[\u4E00-\u9FA5]/g.test($(".EnGivenNameInput").val())){
				alert(get_lan("personalInfoBody").remind);
				return false;
			}
			else{
				if(profileInfo.Nationality=="CN"||profileInfo.Nationality=="MO"||profileInfo.Nationality=="HK"||profileInfo.Nationality=="TW"){
					var basicInfo = ',,,,'+EnSurName+'/'+EnGivenName;
				}else{
					var basicInfo = ',,,'+EnSurName+'/'+EnGivenName+','+EnSurName+'/'+EnGivenName;
				}
				addOrUpdateInfo(profileInfo.ID,"nameEn",basicInfo);
			}
		}
	})
	$(".editGender").unbind("click").click(function(){
		if(!$(".editGender").attr("state")||$(".editGender").attr("state")=="edit"){
			$(".genderInput").addClass("hide");
			$(".genderSelect").removeClass("hide");
			$(".editGender").text(get_lan("personalInfoBody").save);
			$(".editGender").attr("state","save");
		}
		else if($(".editGender").attr("state")=="save"){
			var gender = $(".genderSelect").val();
			var basicInfo = gender+',,,,';
			addOrUpdateInfo(profileInfo.ID,"gender",basicInfo);
		}
	})
	var oldNational=""
	$(".editCountry").unbind("click").click(function(){
		if(!$(".editCountry").attr("state")||$(".editCountry").attr("state")=="edit"){
			oldNational=$(".countryInput").val()
			$("#countryInput").kuCity();
			$(".countryInput").removeAttr("readonly");
			$(".editCountry").text(get_lan("personalInfoBody").save);
			$(".editCountry").attr("state","save");
		}
		else if($(".editCountry").attr("state")=="save"){
			if($(".countryInput").val()==oldNational || $(".countryInput").attr("code")==undefined || $(".countryInput").attr("code")==""){
				$('.editCountry').text(get_lan("personalInfoBody").edit)
				$(".editCountry").attr("state","edit")
				$(".countryInput").attr("readonly","readonly")
				$(".countryInput").val(oldNational)
				$(".kucity").hide()
				$(".countryInput").unbind()
				return false
			}
			$("#countryInput").off("focus");
			var country = $(".countryInput").attr("code");
			var basicInfo = ','+country+',,,';
			addOrUpdateInfo(profileInfo.ID,"country",basicInfo);
		}
	})
	$(".editBirth").unbind("click").click(function(){
		if(!$(".editBirth").attr("state")||$(".editBirth").attr("state")=="edit"){
			$(".editBirth").text(get_lan("personalInfoBody").save);
			$(".editBirth").attr("state","save");
			$(".birthDayInput").datepicker({
			    dateFormat: 'yy-mm-dd',
			    timeFormat: "HH:mm",
			    changeMonth: true,
			    minDate: '1900-1-1',  // 当前日期之后的 0 天，就是当天
			    maxDate: 0,
			    hideIfNoPrevNext: true,
			    showOtherMonths: true,
			    selectOtherMonths: true,
			    changeYear: true,
			    yearRange:'c-50:c+20',
				beforeShow:function(){
					$('style').text('.kucity{background-color: #fff;width: 400px;z-index: 200;}')
				}
			});
		}
		else if($(".editBirth").attr("state")=="save"){
			var birth = $(".birthDayInput").val();
			var basicInfo = ',,'+birth+',,';
			$(".birthDayInput").datepicker('destroy');
			addOrUpdateInfo(profileInfo.ID,"birth",basicInfo);
		}
	})
	$(".editPhone").unbind("click").click(function(){
		if(!$(".editPhone").attr("state")||$(".editPhone").attr("state")=="edit"){
			$(".phoneInput").removeAttr("readonly");
			$(".phoneInput").focus();
			$(".editPhone").text(get_lan("personalInfoBody").save);
			$(".editPhone").attr("state","save");
		}
		else if($(".editPhone").attr("state")=="save"){
			var phoneNum = $(".phoneInput").val();
			// var regPhone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
			if(!regPhone.test(phoneNum)){
			    alert(get_lan("personalInfoBody").remind);
			    return false;
			}else{
				addOrUpdateInfo(profileInfo.ID,"phoneNum",phoneNum);
			}
		}
	})
	$(".editEmail").unbind("click").click(function(){
		if(!$(".editEmail").attr("state")||$(".editEmail").attr("state")=="edit"){
			$(".emailInput").removeAttr("readonly");
			$(".emailInput").focus();
			$(".editEmail").text(get_lan("personalInfoBody").save);
			$(".editEmail").attr("state","save");
		} 
		else if($(".editEmail").attr("state")=="save"){
			var emailNum = $(".emailInput").val();
			var regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			if(!regEmail.test(emailNum)){
			    alert(get_lan("personalInfoBody").remind);
			    return false;
			}else{
				addOrUpdateInfo(profileInfo.ID,"emailNum",emailNum)
			}
		}
	})
}
function billingInfoBody(profileInfo){
	$(".billingInfoBody").html('\
		<div style="height:40px;"></div>\
		<div class="billingInfoTittle">'+get_lan("billingInfoBody").billingInfoTittle+'</div>\
		<div class="billingInfoContent"></div>\
		<div class="billingInfoBottom">\
		  <div class="modifyRemarkBtn hide">'+get_lan("billingInfoBody").modify+'</div>\
		</div>\
	')
	$('body').mLoading("show");
	$.ajax({
	    type:'post',
	    url : $.session.get('ajaxUrl'), 
	    dataType : 'json',
	    data:{
	        url: $.session.get('obtCompany')+"/SystemService.svc/GetCustomerRemarkForProfilePost",
	        jsonStr:'{"id":'+netUserId+',"customerId":"'+profileInfo.ID+'","companyId":"'+profileInfo.CompanyID+'","language":"'+obtLanguage+'",}'
	    },
	    success : function(data) {
	        var res = JSON.parse(data);
	        console.log(res);
	        $('body').mLoading("hide");
	        res.map(function(item,index){
	        	var colorBlue = item.Input.indexOf("4") != -1||item.Input==""?"":"";
	        	var remarkContent = item.Content==null?"":item.Content;
	        	if(!item.CanModify){
	        	    $(".billingInfoContent").append('\
	        	        <div class="billingInfoLi flexRow">\
	        	            <div class="remarkLiTittle">'+colorBlue+item.Title+'</div>\
	        	            <div class="remarkLiContent"><input type="text" name="" class="remarkLiInput" style="width:280px;" value="'+remarkContent+'" disabled index="'+item.Index+'"></div>\
	        	        </div>');
	        	}else if(item.CanModify&&item.InList){
	        	    $(".billingInfoContent").append('\
	        	        <div class="billingInfoLi flexRow">\
	        	            <div class="remarkLiTittle '+colorBlue+'">'+item.Title+'</div>\
	        	            <div class="remarkLiContent">\
		        	            <select class="remarkSelect" style="border:0" index="'+index+'">\
		        	              <option>'+get_lan("billingInfoBody").PleaseSelect+'</option>\
		        	            </select>\
		        	            <input type="text" class="remarkLiInput" index="'+item.Index+'" name="" value="'+remarkContent+'" readonly>\
	        	            </div>\
	        	        </div>');
	        	}else if(item.CanModify&&!item.InList){
	        	    $(".billingInfoContent").append('\
	        	        <div class="billingInfoLi flexRow">\
	        	            <div class="remarkLiTittle '+colorBlue+'">'+item.Title+'</div>\
	        	            <div class="remarkLiContent">\
		        	            <select class="remarkSelect" style="border:0" index="'+index+'">\
		        	              <option>'+get_lan("billingInfoBody").PleaseSelect+'</option>\
		        	            </select>\
		        	            <input type="text" class="remarkLiInput" index="'+item.Index+'" name="" value="'+remarkContent+'">\
	        	            </div>\
	        	        </div>');
	        	}
	        })
	        for(var i=0;i<$(".remarkSelect").length;i++){
	            var index = parseInt($(".remarkSelect").eq(i).attr("index"));
	            if(res[index].Items.length != 0){
	                res[index].Items.map(function(item){
	                    var itemValue = item.Value==null||item.Value==""?item.Key:item.Value;
	                    $(".remarkSelect").eq(i).append('\
	                        <option class="remark_option" key="'+item.Key+'" index="'+index+'">'+itemValue+'</option>\
	                        ')
	                })
	            }else{
	                $(".remarkSelect").eq(i).hide();
	            }
	            
	            $('.remarkSelect').on('change', function() {
	                var index = parseInt($(this).find("option:selected").attr("index"));
	                $(".remarkLiInput").eq(index).val($(this).find("option:selected").text());
	                $(".remarkLiInput").eq(index).attr('key',$(this).find("option:selected").attr("key"));
	            })
	        }
	        $(".modifyRemarkBtn").unbind("click").click(function(){
	        	var remarks = '';
	        	for(var i = 0;i<$(".remarkLiInput").length;i++){
	        	    if(!$(".remarkLiInput").eq(i).attr("key")){
	        	        remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).val()+',';
	        	    }
	        	    if($(".remarkLiInput").eq(i).attr("key")){
	        	        remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).attr("key")+',';
	        	    }
	        	}
	        	console.log(remarks)
	        	$('body').mLoading("show");
	        	$.ajax(
	        	  {
	        	    type:'post',
	        	    url : $.session.get('ajaxUrl'), 
	        	    dataType : 'json',
	        	    data:{
	        	        url: $.session.get('obtCompany')+"/SystemService.svc/AddCustomerRemarkForProfilePost",
	        	        jsonStr:'{"key":'+netUserId+',"customerId":"'+profileInfo.ID+'","remarks":"'+remarks.substring(0,remarks.length-1)+'","language":"'+obtLanguage+'","companyId":"'+profileInfo.CompanyID+'","isCopy":""}'
	        	    },
	        	    success : function(data) {
	        	        $('body').mLoading("hide");
	        	        var res = JSON.parse(data);
	        	        console.log(res);
	        	        if(res.code == "200"){
	        	            alert(get_lan("success"));
	        	        }else{
	        	            alert(res.message);
	        	        }
	        	    },
	        	    error : function() {
	        	      // alert('fail');
	        	    }
	        	  }
	        	);
	        })
	    },
	    error : function() {
	      // alert('fail');
	    }
	});
}
function creditCardBody(profileInfo){
	$(".creditCardBody").html('\
		<div style="height:40px;"></div>\
		<div class="creditCardTittle">'+get_lan("creditCardBody").creditCardTittle+'<div class="addCreditCardBtn">'+get_lan("creditCardBody").addCreditCard+'</div></div>\
		<div class="creditCardContent">\
		  <table class="creditCardTable">\
		    <tr>\
		      <th width="240px">'+get_lan('creditCardBody').cardNumber+'</th>\
		      <th width="240px">'+get_lan('creditCardBody').expirationDate+'</th>\
		      <th width="240px">'+get_lan('membershipBody').edit+'</th>\
		      <th width="240px"></th>\
		      <th width="240px"></th>\
		    </tr>\
		  </table>\
		</div>\
	')
	creditCardInfo(profileInfo);
	$(".addCreditCardBtn").unbind("click").click(function(){
		openPop();
		$(".popTittle").text(get_lan("creditCardBody").addCreditCard);
		$(".popContent").css("min-height","150px");
		$(".popContent").html('\
			<div class="popContentLi flexRow">\
			  <div class="popContentLiTittle">'+get_lan("creditCardBody").cardNumber+'</div>\
			  <div class="popContentLiContent">\
			    <input type+"text" class="popInput creditCardNumberInput">\
			  </div>\
			</div>\
			<div class="popContentLi flexRow">\
			  <div class="popContentLiTittle">'+get_lan("creditCardBody").expirationDate+'</div>\
			  <div class="popContentLiContent">\
			    <input type+"text" class="popInput creditCardDateInput">\
			  </div>\
			</div>\
		')
		// $(".creditCardDateInput").datepicker({
		//     dateFormat: 'yy-mm-dd',
		//     timeFormat: "HH:mm",
		//     changeMonth: true,
		//     minDate: 0,  // 当前日期之后的 0 天，就是当天
		//     hideIfNoPrevNext: true,
		//     showOtherMonths: true,
		//     selectOtherMonths: true,
		//     changeYear: true,
			
		// 	showButtonPanel: true,//显示按钮,没有按钮不可传入日期
		// 	closeText: get_lan('closeText'),
		// 	currentText:get_lan('currentText'),
		// 	onClose:function(){
		// 		var month = $("#ui-datepicker-div .ui-datepicker-month option:selected").val();//得到选中的月份值
		// 		var year = $("#ui-datepicker-div .ui-datepicker-year option:selected").val();//得到选中的年份值
		// 		$('.creditCardDateInput').val(year+'-'+(parseInt(month)+1));//给input赋值，其中要对月值加1才是实际的月份
		// 	}
		// });
		$(".creditCardDateInput").datepicker({
		    dateFormat: 'yy-mm',
		    changeMonth: true,
		    changeYear: true,
		    minDate: 30,  // 当前日期之后的 0 天，就是当天
		    hideIfNoPrevNext: true,
		    showOtherMonths: true,
		    selectOtherMonths: true,
			showButtonPanel: true,//显示按钮,没有按钮不可传入日期
			closeText: get_lan('closeText'),
			currentText:get_lan('currentText'),
			onChangeMonthYear:function(year,month,inst){
				$('.ui-datepicker-calendar').css('display','none')
				console.log(inst.id)
				setTimeout(function() {
				  var buttonPane = $('#'+inst.id)
				    .datepicker( "widget" )
				    .find( ".ui-datepicker-buttonpane" );
					$(buttonPane).html('')
				  $( "<button>", {
				    text: get_lan('closeText'),
				    click: function() {
				      $.datepicker._clearDate( $('#'+inst.id) );
					  var month = $("#ui-datepicker-div .ui-datepicker-month option:selected").val();//得到选中的月份值
					  var year = $("#ui-datepicker-div .ui-datepicker-year option:selected").val();//得到选中的年份值
					  $('.creditCardDateInput').val(year+'-'+(parseInt(month)+1));//给input赋值，其中要对月值加1才是实际的月份
				    }
				  }).appendTo( buttonPane );
				}, 1 );
			},
			beforeShow:function(input){
				$('style').append('.ui-datepicker-calendar{display: none;}')
				 $(".creditCardDateInput").datepicker('setDate',new Date($(".creditCardDateInput").val())); //设置为当前日期
			},
			
			
		});
		$(".confirmPop").attr("state","creditCard");
		$(".confirmPop").unbind("click").click(function(){
			if($(this).attr("state")=="creditCard"){
				$('body').mLoading("show");
				if($(".creditCardNumberInput").val()==""||$(".creditCardDateInput").val()==""){
					alert(get_lan("personalInfoBody").remind);
					$('body').mLoading("hide");
					return false;
				}else{
					$('body').mLoading("show");
					$.ajax({
					    url:$.session.get('ajaxUrl'),
					    type:"post",
					    dataType:"json",
					    data:{
					        url: $.session.get('obtCompany')+"/Systemservice.svc/AddCustomerCreditCardForProfilePost",
					        jsonStr:'{"request":{"customerId":"'+profileInfo.ID+'","cardType":"","cardNumber":"'+tools.Encrypt($(".creditCardNumberInput").val())+'","expiryDate":"'+$(".creditCardDateInput").val()+'-1'+'","bankId":"","holderNameCn":"","holderNameEn":"","id":'+netUserId+',"language":"'+obtLanguage+'"}}'
					    },
					    success:function(data){
					        $('body').mLoading("hide");
					        var res = JSON.parse(data);
					        console.log(res);
					        if(res.code==200){
					        	closePop();
					        	creditCardInfo(profileInfo);
					        }else{
					          alert(res.message);
					        }
					    },
					    error:function(){

					    }
					});
				}
			}
		})
	})
	function creditCardInfo(profileInfo){
		$('body').mLoading("show");
		$.ajax(
		  {
		    type:'post',
		    url : $.session.get('ajaxUrl'),
		    dataType : 'json',
		    data:{
		        // url: $.session.get('obtCompany')+"/SystemService.svc/GetCustomerCreditCardInfoPost",
		        // jsonStr:'{"id":'+netUserId+',"Language ":"'+obtLanguage+'","customerId":"'+profileInfo.ID+'"}',
				url: $.session.get('obtCompany') + "/SystemService.svc/GetAllCreditCardInfoPost",
				jsonStr: '{"request":{"Id":'+netUserId+',"CustomerId":"'+ profileInfo.ID +'","UseType":"1","Language ":"' + obtLanguage + '"}}'
		    },
		    success : function(data) {
		        var res = JSON.parse(data);
		        console.log(res);
		        $('body').mLoading("hide");
		        var CreditCardNumber = res.customerCCIs.length==0||res.customerCCIs[0].CreditCardNumber==null?"":res.customerCCIs[0].CreditCardNumber;
		        var CreditCardExpire = res.customerCCIs.length==0||res.customerCCIs[0].CreditCardExpire==null?"":res.customerCCIs[0].CreditCardExpire;
		        console.log(CreditCardNumber);
		        $(".creditCardTable").html('\
		        	<tr>\
		        	  <th width="240px">'+get_lan('creditCardBody').cardNumber+'</th>\
		        	  <th width="240px">'+get_lan('creditCardBody').expirationDate+'</th>\
		        	  <th width="240px">'+get_lan('membershipBody').edit+'</th>\
		        	  <th width="240px"></th>\
		        	  <th width="240px"></th>\
		        	</tr>\
		        	')
		        if(CreditCardNumber!=""){
		        	res.customerCCIs.map(function(item){
		        		var cardNumberText = item.CardNum;
		        		// cardNumberText = "****************"+cardNumberText.substring(cardNumberText.length-4,cardNumberText.length)
						
						var date = new Date(item.CreditCardExpire);
						Y = date.getFullYear() + '-';
						M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
						var formatDate=Y+M
						
		        		$(".creditCardTable").append('\
		        		    <tr>\
		        		        <td>'+cardNumberText+'</span></td>\
		        		        <td>'+formatDate+'</td>\
		        		        <td>\
		        		          <span class="delCreditCard" DelRefId="'+item.DelRefId+'">'+get_lan('documentInfoBody').delete+'</span>\
		        		        </td>\
		        		        <td></td>\
		        		        <td></td>\
		        		    </tr>\
		        		')
		        	})
		        }
		        $(".delCreditCard").unbind("click").click(function(){
		        	var r=confirm(get_lan("delRemind"));
		        	if(r==true){
		        		$.ajax(
		        		  {
		        		    type:'post',
		        		    url : $.session.get('ajaxUrl'),
		        		    dataType : 'json',
		        		    data:{
		        		        url: $.session.get('obtCompany')+"/SystemService.svc/DelCustomerCreditCardForProfilePost",
		        		        jsonStr:'{"delRefId":"'+$(this).attr("DelRefId")+'","id":'+netUserId+',"language":"'+obtLanguage+'"}'
		        		    },
		        		    success : function(data) {
		        		        $('body').mLoading("hide");
		        		        var res = JSON.parse(data);
		        		        console.log(res);
		        		        if(res.code==200){
		        		        	creditCardInfo(profileInfo);
		        		        }else{
		        		        	alert(res.message);
		        		        }
		        		    },
		        		    error : function() {
		        		      // alert('fail');
		        		    }
		        		  }
		        		);
		        	}
		        })
		    },
		    error : function() {
		      // alert('fail');
		    }
		  }
		);
	}
}
function documentInfoBody(profileInfo){
	$(".documentInfoBody").html('\
		<div style="height:40px;"></div>\
		<div class="documentInfoTittle">'+get_lan("documentInfoBody").documentInfoTittle+'<div class="addPassportBtn">'+get_lan("documentInfoBody").addPassport+'</div></div>\
		<div class="documentInfoContent">\
		  <table class="documentInfoTable">\
		    <tr>\
		      <th width="240px">'+get_lan('documentInfoBody').name+'</th>\
		      <th width="240px">'+get_lan('documentInfoBody').documentType+'</th>\
		      <th width="240px">'+get_lan('documentInfoBody').idNumber+'</th>\
		      <th width="240px">'+get_lan('documentInfoBody').expirationDate+'</th>\
		      <th width="240px">'+get_lan('documentInfoBody').operation+'</th>\
		    </tr>\
		  </table>\
		</div>\
	')
	$(".addPassportBtn").unbind("click").click(function(){
		openPop();
		$(".popTittle").text(get_lan("documentInfoBody").addPassport);
		$(".popContent").css("min-height","200px");
		$(".popContent").html('\
			<div class="popContentLi flexRow">\
			  <div class="popContentLiTittle">'+get_lan("documentInfoBody").documentType+'</div>\
			  <div class="popContentLiContent">\
			    <select class="popInput popdocumentType">\
			      \
			    </select>\
			  </div>\
			</div>\
			<div class="popContentLi flexRow">\
			  <div class="popContentLiTittle">'+get_lan("documentInfoBody").idNumber+'</div>\
			  <div class="popContentLiContent">\
			    <input type+"text" class="popInput popIdNumber">\
			  </div>\
			</div>\
			<div class="popContentLi flexRow">\
			  <div class="popContentLiTittle">'+get_lan("documentInfoBody").expirationDate+'</div>\
			  <div class="popContentLiContent">\
			    <input type+"text" class="popInput popExpirationDate" readonly>\
			  </div>\
			</div>\
		')
		$(".confirmPop").attr("state","addDocument");
		$(".popExpirationDate").datepicker({
		    dateFormat: 'yy-mm-dd',
		    timeFormat: "HH:mm",
		    changeMonth: true,
		    minDate: 0,  // 当前日期之后的 0 天，就是当天
		    hideIfNoPrevNext: true,
		    showOtherMonths: true,
		    selectOtherMonths: true,
		    changeYear: true,
			beforeShow:function(){
				$('style').text('.kucity{background-color: #fff;width: 400px;z-index: 200;}')
			},
		});
		$('body').mLoading("show");
		$.ajax({
		    type:'post',
		    url : $.session.get('ajaxUrl'), 
		    dataType : 'json',
		    data:{
		        url: $.session.get('obtCompany')+"/SystemService.svc/GetInformationsPost",
		        jsonStr:'{"culture":"'+obtLanguage+'"}'
		    },
		    success : function(data) {
		    	$('body').mLoading("hide");
		        var resData = JSON.parse(data);
		        console.log(resData);
		        var result = resData.DocumentTypeList.filter(function(item1) {
    	            return profileInfo.DocumentsDetail.every(function(item2) {
    	            		return item2.Rid !== item1.Rid
    	            })
    	        })
    	        console.log(result);
    	        resData.DocumentTypeList.map(function(item){
    	        	if(item.Rid==2){
    	        		result.push(item);
    	        	}
    	        })
    	        result.map(function(item){
    	        	$(".popdocumentType").append('<option value="'+item.Rid+'">'+item.Name+'</option>')
    	        })
		    }
		});
		$(".confirmPop").unbind("click").click(function(){
			if($(this).attr("state")=="addDocument"){
				if($('.popdocumentType option:selected').val()!=1){
					if($(".popIdNumber").val()==""||$(".popExpirationDate").val()==""){
						alert(get_lan("personalInfoBody").remind);
						return false;
					}
				}else{
					if($(".popIdNumber").val()==""){
						alert(get_lan("personalInfoBody").remind);
						return false;
					}
				}
				var docInfo=$('.popdocumentType option:selected').val()+","+$(".popIdNumber").val()+",,,,"+$(".popExpirationDate").val();
				addOrUpdateInfo(profileInfo.ID,"docInfo",docInfo);
			}
		})
	})

	profileInfo.DocumentsDetail.map(function(item,index){
		var docName = obtLanguage=="CN"?item.nameCn:item.nameEn;
        $(".documentInfoTable").append('\
            <tr>\
                <td class="docName"><img class="editPassport hide" src="../../profile/images/editIcon.png"><span class="docNameText">'+docName+'</span></td>\
                <td>'+item.nameDoc+'</td>\
                <td><input type="text" class="docNumInput" readonly value="'+item.DocumentNumber+'"></td>\
                <td class="docDatetime"><input type="text" autocomplete="off" class="docTimeInput" value="'+item.docExpiryDate.substring(0,10).split('/').join('-')+'" readonly></td>\
                <td>\
                  <span class="updateDocument" delDocId="'+item.delDocId+'" rid="'+item.Rid+'" index="'+index+'" nationality IssueCountry nameCn nameEn>'+get_lan('documentInfoBody').modify+'</span>&nbsp;&nbsp;\
                  <span class="delDocument" delDocId="'+item.delDocId+'">'+get_lan('documentInfoBody').delete+'</span>\
                </td>\
            </tr>\
        ')
        $(".editPassport").eq(index).removeClass("hide");
        $(".editPassport").eq(index).attr("nameCn",item.nameCn==null?"":item.nameCn);
        $(".editPassport").eq(index).attr("nameEn",item.nameEn==null?"":item.nameEn);
        $(".editPassport").eq(index).attr("nationality",item.nationality==null?"":item.nationality);
        $(".editPassport").eq(index).attr("IssueCountry",item.IssueCountry==null?"":item.IssueCountry);
        $(".editPassport").eq(index).attr("Rid",item.Rid==null?"":item.Rid);
        $(".editPassport").eq(index).attr("DocumentNumber",item.DocumentNumber==null?"":item.DocumentNumber);
        $(".editPassport").eq(index).attr("docExpiryDate",item.docExpiryDate==null?"":item.docExpiryDate);
        /*修改证件号*/
        $(".updateDocument").eq(index).attr("nameCn",item.nameCn==null?"":item.nameCn);
        $(".updateDocument").eq(index).attr("nameEn",item.nameEn==null?"":item.nameEn);
        $(".updateDocument").eq(index).attr("nationality",item.nationality==null?"":item.nationality);
        $(".updateDocument").eq(index).attr("IssueCountry",item.IssueCountry==null?"":item.IssueCountry);
	})
    //修改证件姓名国家
    $(".editPassport").unbind("click").click(function(){
    	openPop();
    	$(".popTittle").text(get_lan("documentInfoBody").popTittle);
    	var popNameCn = $(this).attr("nameCn")==null||$(this).attr("nameCn")==""?"":$(this).attr("nameCn");
    	var popNameEn = $(this).attr("nameEn")==null||$(this).attr("nameEn")==""?"":$(this).attr("nameEn");
    	var popCnSurName = popNameCn!=popNameEn?popNameCn.substring(0,1):popNameCn.split('/')[0];
    	var popEnSurName = popNameEn.split('/')[0];
    	if(popNameCn!=""&&popNameEn!=""){
    		var popCnGivenName = popNameCn!=popNameEn?popNameCn.substring(1,popNameCn.length):popNameCn.split('/')[1];
    		var popEnGivenName = popNameEn.split('/')[1];
    	}else{
    		var popCnGivenName = "";
    		var popEnGivenName = "";
    	}
    	$(".popContent").css("min-height","200px");
    	$(".popContent").html('\
    		<div class="popContentLi flexRow">\
    		  <div class="popContentLiTittle docPopTittle" Rid="'+$(this).attr("Rid")+'" DocumentNumber="'+$(this).attr("DocumentNumber")+'" docExpiryDate="'+$(this).attr("docExpiryDate")+'">'+get_lan("documentInfoBody").chineseName+'</div>\
    		  <div class="popContentLiContent flexRow">\
    		    <input type+"text" class="popHalfInput popCnSurName" value="'+popCnSurName+'" onkeydown="check(event,this)" placeholder="'+get_lan("documentInfoBody").surname+'"><input type+"text" class="popHalfInput popCnGivenName" style="margin-left:20px;" value="'+popCnGivenName+'" onkeydown="check(event,this)" placeholder="'+get_lan("documentInfoBody").givenName+'">\
    		  </div>\
    		</div>\
    		<div class="popContentLi flexRow">\
    		  <div class="popContentLiTittle">'+get_lan("documentInfoBody").englishName+'</div>\
    		  <div class="popContentLiContent flexRow">\
    		    <input type+"text" class="popHalfInput popEnSurName" style="margin-right:10px;" onkeydown="check(event,this)" value="'+popEnSurName+'" placeholder="'+get_lan("documentInfoBody").surname+'"><input type+"text" class="popHalfInput popEnGivenName"  onkeydown="check(event,this)" style="margin-left:10px;" value="'+popEnGivenName+'" placeholder="'+get_lan("documentInfoBody").givenName+'">\
    		  </div>\
    		</div>\
    		<div class="popContentLi flexRow">\
    		  <div class="popContentLiTittle">'+get_lan("documentInfoBody").nationality+'</div>\
    		  <div class="popContentLiContent flexRow">\
    		    <input type+"text" class="popInput" id="popNationality" value="'+$(this).attr("nationality")+'" code="'+$(this).attr("nationality")+'">\
    		  </div>\
    		</div>\
    		<div class="popContentLi flexRow">\
    		  <div class="popContentLiTittle">'+get_lan("documentInfoBody").issueNationality+'</div>\
    		  <div class="popContentLiContent flexRow">\
    		    <input type+"text" class="popInput" id="popIssue" value="'+$(this).attr("IssueCountry")+'" code="'+$(this).attr("IssueCountry")+'">\
    		  </div>\
    		</div>\
    	')
    	$("#popNationality").kuCity();
    	$("#popIssue").kuCity();
    	$(".confirmPop").attr("state","document");
    	$("#popNationality").on('input propertychange',function(){
    	    $("#popNationality").removeAttr("code");
    	})
    	$("#popIssue").on('input propertychange',function(){
    	    $("#popIssue").removeAttr("code");
    	})
    	$(".confirmPop").unbind("click").click(function(){
    		if($(this).attr("state")=="document"){
    			if($(".popCnSurName").val()!=""||$(".popCnGivenName").val()!=""){
    				if($(".popEnSurName").val()==""||$(".popEnGivenName").val()==""){
    					alert(get_lan("personalInfoBody").remind)
    					return false;
    				}
    			}
    			if($(".popEnSurName").val()!=""||$(".popEnGivenName").val()!=""){
    				if($(".popCnSurName").val()==""||$(".popCnGivenName").val()==""){
    					alert(get_lan("personalInfoBody").remind)
    					return false;
    				}
    			}
    			if($(".popCnSurName").val().toUpperCase()==$(".popEnSurName").val().toUpperCase()&&$(".popCnSurName").val()!=""){
    				var nameCn = $(".popCnSurName").val().toUpperCase()+'/'+$(".popCnGivenName").val().toUpperCase();
    			}else{
    				var nameCn = $(".popCnSurName").val()+$(".popCnGivenName").val();
    			}
    			
    			var nationality = $("#popNationality").attr("code")!=""?$("#popNationality").attr("code"):"";
    			var issueCountry = $("#popIssue").attr("code")!=""?$("#popIssue").attr("code"):"";
    			if($(".popEnSurName").val()!=""){
    				var nameEn = $(".popEnSurName").val().toUpperCase()+'/'+$(".popEnGivenName").val().toUpperCase();
    			}else{
    				var nameEn = "";
    			}
    			var docExpiryDate = $(".docPopTittle").attr("docExpiryDate");
    			if($(".docPopTittle").attr("Rid")==1){
    				docExpiryDate  ="";
    			}
    			var docInfo = $(".docPopTittle").attr("Rid")+','+$(".docPopTittle").attr("DocumentNumber")+','+nationality+','+nameCn+','+nameEn+','+docExpiryDate+','+issueCountry;
    			addOrUpdateInfo(profileInfo.ID,"docInfo",docInfo);
    		}
    	})
    })
    //修改证件号
    $(".updateDocument").unbind("click").click(function(){
        var that = this;
        var index = parseInt($(this).attr("index"));
        if(!$(this).attr("change")||$(this).attr("change")=="change"){
            $(".docNumInput").eq(index).css("border","1px solid #979797");
            $(".docNumInput").eq(index).removeAttr("readonly");

            if($(that).attr("rid")!=1){
                $(".docTimeInput").eq(index).css("border","1px solid #979797");
                $(".docTimeInput").eq(index).removeAttr("readonly");
                $(".docTimeInput").eq(index).datepicker({
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
            $(this).text(get_lan("documentInfoBody").save);
            $(this).attr("change","save");
        }else if($(this).attr("change")=="save"){
            if($(that).attr("rid")!=1){
                $(".docTimeInput").eq(index).datepicker('destroy');
            }
            var rid= $(this).attr("rid");
            var documentNo= $(".docNumInput").eq(index).val();
            var docDatetime=$(".docTimeInput").eq(index).val();
            if (rid=="1") {
                docDatetime="";
                if (documentNo=="") {
                    alert(get_lan("personalInfoBody").remind);
                    return;
                }
            }else{
            	if (documentNo==""||docDatetime=="") {
            	    alert(get_lan("personalInfoBody").remind);
            	    return;
            	}
            }
            var nationality = $(that).attr("nationality");
            var issueCountry = $(that).attr("issueCountry");
            var nameCn = $(that).attr("nameCn");
            var nameEn = $(that).attr("nameEn");
            var docInfo = rid+','+documentNo+','+nationality+','+nameCn+','+nameEn+','+docDatetime+','+issueCountry+','+$(this).attr("delDocId");
            addOrUpdateInfo(profileInfo.ID,"docInfo",docInfo);
            }
    })
    //删除证件号
    $(".delDocument").unbind("click").click(function(){
    	var r=confirm(get_lan("delRemind"));
    	if(r==true){
    		$.ajax(
    		  {
    		    type:'post',
    		    url : $.session.get('ajaxUrl'),
    		    dataType : 'json',
    		    data:{
    		        url: $.session.get('obtCompany')+"/SystemService.svc/DelInformotionPost",
    		        jsonStr:'{"rid":"'+$(this).attr("delDocId")+'","customerID":"'+profileInfo.ID+'","type":"document"}'
    		    },
    		    success : function(data) {
    		        $('body').mLoading("hide");
    		        var res = JSON.parse(data);
    		        console.log(res);
    		        if(res==1){
    		        	$('body').mLoading("show");
    		        	var res = JSON.parse(data);
    		        	console.log(res);
    		        	$.ajax({
    		        	    type:'post',
    		        	    url : $.session.get('ajaxUrl'),
    		        	    dataType : 'json',
    		        	    data:{
    		        	        url: $.session.get('obtCompany')+"/SystemService.svc/UpdateProfilePost",
    		        	        jsonStr:'{"key":'+netUserId+',"CustomerID":"'+profileInfo.ID+'","Language":"'+obtLanguage+'"}'
    		        	    },
    		        	    success : function(data) {
    		        	        var res = JSON.parse(data);
    		        	        console.log(res);
    		        	        documentInfoBody(res);
    		        	        $('body').mLoading("hide");
    		        	    },
    		        	    error : function() {
    		        	      // alert('fail');
    		        	    }
    		        	  });
    		        }else{
    		        	alert("error");
    		        }
    		        // GetCustomerPreference(profileInfo);
    		    },
    		    error : function() {
    		      // alert('fail');
    		    }
    		  }
    		);
    	}
    })
	// $.ajax({
	//     type:'post',
	//     url : $.session.get('ajaxUrl'), 
	//     dataType : 'json',
	//     data:{
	//         url: $.session.get('obtCompany')+"/SystemService.svc/GetInformationsPost",
	//         jsonStr:'{"culture":"'+obtLanguage+'"}'
	//     },
	//     success : function(data) {
	//         var resData = JSON.parse(data);
	//         console.log(resData);
 //            // resData.DocumentTypeList.map(function(item,index){
 //            //     $(".documentInfoTable").append('\
 //            //         <tr>\
 //            //             <td class="docName"><img class="editPassport hide" src="../../profile/images/editIcon.png"><span class="docNameText"></span></td>\
	//            //          <td>'+item.Name+'</td>\
	//            //          <td><input type="text" class="docNumInput" readonly></td>\
	//            //          <td class="docDatetime"><input type="text" autocomplete="off" class="docTimeInput" value="" readonly></td>\
	//            //          <td>\
	//            //            <span class="updateDocument" rid="'+item.Rid+'" index="'+index+'" nationality IssueCountry nameCn nameEn>'+get_lan('documentInfoBody').modify+'</span>\
	//            //          </td>\
 //            //         </tr>\
 //            //     ')

 //            //     profileInfo.DocumentsDetail.map(function(items){
 //            //         if(item.Rid==items.Rid){
 //            //         	var docName = obtLanguage=="CN"?items.nameCn:items.nameEn;
 //            //         	docName = docName==null?"":docName;
 //            //         	$(".docNameText").eq(index).text(docName);
 //            //             $(".docNumInput").eq(index).val(items.DocumentNumber);
 //            //             $(".docCountryInput").eq(index).val(items.IssueCountry);
 //            //             $(".docTimeInput").eq(index).val(items.docExpiryDate.substring(0,10).split('/').join('-'));
 //            //             $(".editPassport").eq(index).removeClass("hide");
 //            //             $(".editPassport").eq(index).attr("nameCn",items.nameCn==null?"":items.nameCn);
 //            //             $(".editPassport").eq(index).attr("nameEn",items.nameEn==null?"":items.nameEn);
 //            //             $(".editPassport").eq(index).attr("nationality",items.nationality==null?"":items.nationality);
 //            //             $(".editPassport").eq(index).attr("IssueCountry",items.IssueCountry==null?"":items.IssueCountry);
 //            //             $(".editPassport").eq(index).attr("Rid",items.Rid==null?"":items.Rid);
 //            //             $(".editPassport").eq(index).attr("DocumentNumber",items.DocumentNumber==null?"":items.DocumentNumber);
 //            //             $(".editPassport").eq(index).attr("docExpiryDate",items.docExpiryDate==null?"":items.docExpiryDate);
 //            //             /*修改证件号*/
 //            //             $(".updateDocument").eq(index).attr("nameCn",items.nameCn==null?"":items.nameCn);
 //            //             $(".updateDocument").eq(index).attr("nameEn",items.nameEn==null?"":items.nameEn);
 //            //             $(".updateDocument").eq(index).attr("nationality",items.nationality==null?"":items.nationality);
 //            //             $(".updateDocument").eq(index).attr("IssueCountry",items.IssueCountry==null?"":items.IssueCountry);
 //            //         }
 //            //     })
 //            //  });
            
	//     }
	// });
}
function preferenceBody(profileInfo){
	$(".preferenceBody").html('\
		<div style="height:40px;"></div>\
		<div class="preferenceTittle">'+get_lan("preferenceBody").preferenceTittle+'<div class="addPreferenceBtn">'+get_lan("preferenceBody").addPreference+'</div></div>\
		<div class="preferenceContent">\
		  <table class="preferenceTable">\
		    <tr>\
		      <th width="300px">'+get_lan('preferenceBody').type+'</th>\
		      <th width="300px">'+get_lan('preferenceBody').Preference+'</th>\
		      <th width="300px">'+get_lan('preferenceBody').detail+'</th>\
		      <th width="300px">'+get_lan('preferenceBody').Edit+'</th>\
		    </tr>\
		  </table>\
		</div>\
	')
	GetCustomerPreference(profileInfo);
	function GetCustomerPreference(profileInfo){
		$(".preferenceTable").html('\
			<tr>\
			  <th width="300px">'+get_lan('preferenceBody').type+'</th>\
			  <th width="300px">'+get_lan('preferenceBody').Preference+'</th>\
			  <th width="300px">'+get_lan('preferenceBody').detail+'</th>\
			  <th width="300px">'+get_lan('preferenceBody').Edit+'</th>\
			</tr>\
			')
		$.ajax({
		    type:'post',
		    url : $.session.get('ajaxUrl'), 
		    dataType : 'json',
		    data:{
		        url: $.session.get('obtCompany')+"/SystemService.svc/GetCustomerPreference",
		        jsonStr:'{"key":'+netUserId+',"customerId":"'+profileInfo.ID+'","serviceType":"","language":"'+obtLanguage+'",}'
		    },
		    success : function(data) {
		        var res = JSON.parse(data);
		        console.log(res);
		        res.Infos.map(function(item,index){
		            var preferenceType = '';
		            switch(item.Type.ServiceType)
		            {
		            case 1:
		              preferenceType = get_lan("preferenceBody").Air;
		              break;
		            case 2:
		              preferenceType = get_lan("preferenceBody").hotel;
		              break;
		            case 3:
		              preferenceType = get_lan("preferenceBody").car;
		              break;
		            }
		            var name = obtLanguage=="CN"?item.Type.NameCn:item.Type.NameEn;
		            if(item.Type.ServiceType!=4){
		                $(".preferenceTable").append('\
		                	<tr>\
		                    <td class="preferenceType">'+preferenceType+'</td>\
		                    <td>'+name+'</td>\
		                    <td>'+item.Detail+'</td>\
		                    <td>\
		                      <span class="deletePreference" delId="'+item.Rid+'" index="'+index+'" customerId="'+item.CustomerId+'">'+get_lan('preferenceBody').delete+'</span>\
		                    </td>\
		                    </tr>')
		            }
		            $(".deletePreference").unbind("click").click(function(){
		                var r=confirm(get_lan("delRemind"));
		                  if (r==true){
		                  	$('body').mLoading("show");
		                    $.ajax(
		                      {
		                        type:'post',
		                        url : $.session.get('ajaxUrl'),
		                        dataType : 'json',
		                        data:{
		                            url: $.session.get('obtCompany')+"/SystemService.svc/DelCustomerPreference",
		                            jsonStr:'{"key":'+netUserId+',"rid":"'+$(this).attr("delId")+'","customerId":"'+$(this).attr("customerId")+'","language":"'+obtLanguage+'"}'
		                        },
		                        success : function(data) {
		                            $('body').mLoading("hide");
		                            var res = JSON.parse(data);
		                            console.log(res);
		                            GetCustomerPreference(profileInfo);
		                        },
		                        error : function() {
		                          // alert('fail');
		                        }
		                      }
		                    );
		                }
		            });
		        });
		    },
		    error : function() {
		      // alert('fail');
		    }
		});
	}
	//<option value="3">'+get_lan("preferenceBody").car+'</option>\
	$(".addPreferenceBtn").unbind("click").click(function(){
		openPop();
		$(".popTittle").text(get_lan("preferenceBody").addPreference);
		$(".popContent").css("min-height","140px");
		$(".popContent").html('\
			<div class="popContentLi flexRow">\
			  <div class="popContentLiTittle">'+get_lan("popBody").type+'</div>\
			  <div class="popContentLiContent">\
			    <select class="popInput preferenceTypeSelect">\
			      <option value="1">'+get_lan("preferenceBody").Air+'</option>\
			      <option value="2">'+get_lan("preferenceBody").hotel+'</option>\
			      \
			    </select>\
			  </div>\
			</div>\
			<div class="popContentLi flexRow">\
			  <div class="popContentLiTittle">'+get_lan("popBody").preference+'</div>\
			  <div class="popContentLiContent">\
			    <select class="popInput preferenceSelect">\
			    </select>\
			  </div>\
			</div>\
			<div class="popContentLi flexRow hide popContentDetailLi">\
			  <div class="popContentLiTittle">'+get_lan("popBody").detail+'</div>\
			  <div class="popContentLiContent">\
			    <select class="popInput preferenceDetail"></select>\
			  </div>\
			</div>\
		')
		$('body').mLoading("show");
		$.ajax({
		    type:'post',
		    url : $.session.get('ajaxUrl'), 
		    dataType : 'json',
		    data:{
		        url: $.session.get('obtCompany')+"/SystemService.svc/GetInformationsPost",
		        jsonStr:'{"culture":"'+obtLanguage+'"}'
		    },
		    success : function(data) {
		        var res = JSON.parse(data);
		        console.log(res);
		        $('body').mLoading("hide");
		        res.PreferenceTypeList.map(function(item,index){
		            var name = obtLanguage=="CN"?item.NameCn:item.NameEn;
		            var showDetail = item.Details!=null&&item.Details.length>0?"show":"hide";
		            if(item.ServiceType==1){
		                $(".preferenceSelect").append('<option value="'+item.PreferenceTypeId+'" showDetail="'+showDetail+'" index="'+index+'">'+name+'</option>');
		            }
		        })
		        $(".preferenceTypeSelect").change(function(){
		            $(".preferenceSelect").html('');
		            res.PreferenceTypeList.map(function(item,index){
		                var name = obtLanguage=="CN"?item.NameCn:item.NameEn;
		                var showDetail = item.Details!=null&&item.Details.length>0?"show":"hide";
		                if($('.preferenceTypeSelect option:selected').val()=="1"){
		                    if(item.ServiceType==1){
		                        $(".preferenceSelect").append('<option value="'+item.PreferenceTypeId+'" showDetail="'+showDetail+'" index="'+index+'">'+name+'</option>');
		                    }
		                }else if($('.preferenceTypeSelect option:selected').val()=="2"){
		                    if(item.ServiceType==2){
		                        $(".preferenceSelect").append('<option value="'+item.PreferenceTypeId+'" showDetail="'+showDetail+'" index="'+index+'">'+name+'</option>');
		                    }
		                }else if($('.preferenceTypeSelect option:selected').val()=="3"){
		                    if(item.ServiceType==3){
		                        $(".preferenceSelect").append('<option value="'+item.PreferenceTypeId+'" showDetail="'+showDetail+'" index="'+index+'">'+name+'</option>');
		                    }
		                }
		            })
		            $(".popContentDetailLi").addClass("hide");
		        })
		        $(".preferenceSelect").change(function(){
		        	if($('.preferenceSelect option:selected').attr("showDetail")=="show"){
		        		$(".popContentDetailLi").removeClass("hide");
		        		$(".preferenceDetail").html('');
		        		var index = parseInt($('.preferenceSelect option:selected').attr("index"));
		        		res.PreferenceTypeList[index].Details.map(function(item){
		        			var name = obtLanguage=="CN"?item.NameCn:item.NameEn;
		        			$(".preferenceDetail").append('<option value="'+item.Code+'">'+name+'</option>');
		        		})
		        	}else{
		        		$(".popContentDetailLi").addClass("hide");
		        	}
		        })
		    }
		});
		$(".confirmPop").attr("state","preference");
		$(".confirmPop").unbind("click").click(function(){
			if($(this).attr("state")=="preference"){
				$('body').mLoading("show");
				var rid = $('.preferenceTypeSelect option:selected').val();
				var preferenceTypeId = $('.preferenceSelect option:selected').val();
				if(!$(".popContentDetailLi").hasClass("hide")){
					var detail = $('.preferenceDetail option:selected').text();
				}else{
					var detail = '';
				}
				
				var levelCode = 1;
				$.ajax({
				    url:$.session.get('ajaxUrl'),
				    type:"post",
				    dataType:"json",
				    data:{
				        url: $.session.get('obtCompany')+"/Systemservice.svc/AddCustomerPreference",
				        jsonStr:'{"customerId":"'+profileInfo.ID+'","rid":"'+rid+'","preferenceTypeId":"'+preferenceTypeId+'","levelCode":"'+levelCode+'","detail":"'+detail+'","key":'+netUserId+',"language":"'+$.session.get('obtLanguage')+'"}'
				    },
				    success:function(data){
				        $('body').mLoading("hide");
				        closePop();
				        var res = JSON.parse(data);
				        if(res.code==200){
				            GetCustomerPreference(profileInfo);
				        }else{
				            $('body').mLoading("hide");
				            alert(res.message);
				        }
				    },
				    error:function(){
				    }
				});
			}
		})
	})
}
function membershipBody(profileInfo){
	$(".membershipBody").html('\
		<div style="height:40px;"></div>\
		<div class="membershipTittle">'+get_lan("membershipBody").membershipTittle+'<div class="addMembershipBtn">'+get_lan("membershipBody").addMembership+'</div></div>\
		<div class="membershipContent">\
		  <table class="membershipTable">\
		    <tr>\
		      <th width="300px">'+get_lan('membershipBody').MembershipType+'</th>\
		      <th width="300px">'+get_lan('membershipBody').idNumber+'</th>\
		      <th width="300px">'+get_lan('membershipBody').issuer+'</th>\
		      <th width="300px">'+get_lan('membershipBody').edit+'</th>\
		    </tr>\
		  </table>\
		</div>\
		<div style="height:40px;"></div>\
	')
	profileInfo.MemberShipCards.map(function(item,index){
	    var MembershipType = '';
	    switch(item.serviceType)
	    {
	    case '1':
	      MembershipType = get_lan("membershipBody").frequentFlyerCard;
	      break;
	    case '2':
	      MembershipType = get_lan("membershipBody").hotelMembership;
	      break;
	    case '3':
	      MembershipType = get_lan("membershipBody").carMembership;
	      break;
	    }
	    $(".membershipTable").append('<tr>\
	        <td class="MembershipType">'+MembershipType+'</td>\
	        <td class="idNumber">'+item.CardNumbers+'</td>\
	        <td class="supplier">'+item.SupplierName+'</td>\
	        <td>\
	          <span class="deleteMembership" delId="'+item.delId+'" index="'+index+'">'+get_lan('preferenceBody').delete+'</span>\
	        </td>\
	        </tr>')
	});

	var customerId = profileInfo.ID;
	$(".deleteMembership").unbind("click").click(function(){
	    var r=confirm(get_lan("delRemind"));
	      if (r==true){
	        $.ajax(
	          {
	            type:'post',
	            url : $.session.get('ajaxUrl'),
	            dataType : 'json',
	            data:{
	                url: $.session.get('obtCompany')+"/SystemService.svc/DelInformotionPost",
	                jsonStr:'{"rid":"'+$(this).attr("delId")+'","customerID":"'+customerId+'","type":"membership"}'
	            },
	            success : function(data) {
	                $('body').mLoading("show");
	                var res = JSON.parse(data);
	                console.log(res);
	                $.ajax({
	                    type:'post',
	                    url : $.session.get('ajaxUrl'),
	                    dataType : 'json',
	                    data:{
	                        url: $.session.get('obtCompany')+"/SystemService.svc/UpdateProfilePost",
	                        jsonStr:'{"key":'+netUserId+',"CustomerID":"'+customerId+'","Language":"'+obtLanguage+'"}'
	                    },
	                    success : function(data) {
	                        var res = JSON.parse(data);
	                        console.log(res);
	                        membershipBody(res);
	                        $('body').mLoading("hide");
	                    },
	                    error : function() {
	                      // alert('fail');
	                    }
	                  });
	            },
	            error : function() {
	              // alert('fail');
	            }
	          }
	        );
	    }
	});
	$(".addMembershipBtn").unbind("click").click(function(){
		openPop();
		$(".popTittle").text(get_lan("membershipBody").addMembership);
		$(".popContent").css("min-height","200px");
		$(".popContent").html('\
			<div class="popContentLi flexRow">\
			  <div class="popContentLiTittle">'+get_lan("popBody").type+'</div>\
			  <div class="popContentLiContent">\
			    <select class="popInput membershipTypeSelect">\
			      <option value="1">'+get_lan("membershipBody").frequentFlyerCard+'</option>\
			      <option value="2">'+get_lan("membershipBody").hotelMembership+'</option>\
			      <option value="3">'+get_lan("membershipBody").carMembership+'</option>\
			    </select>\
			  </div>\
			</div>\
			<div class="popContentLi flexRow">\
			  <div class="popContentLiTittle">'+get_lan("membershipBody").issuer+'</div>\
			  <div class="popContentLiContent">\
			    <select class="popInput issuerSelect">\
			    </select>\
			  </div>\
			</div>\
			<div class="popContentLi flexRow">\
			  <div class="popContentLiTittle">'+get_lan("membershipBody").idNumber+'</div>\
			  <div class="popContentLiContent">\
			    <input type+"text" class="popInput idNumberInput">\
			  </div>\
			</div>\
		')
		$('body').mLoading("show");
		$.ajax({
		    type:'post',
		    url : $.session.get('ajaxUrl'), 
		    dataType : 'json',
		    data:{
		        url: $.session.get('obtCompany')+"/SystemService.svc/GetInformationsPost",
		        jsonStr:'{"culture":"'+obtLanguage+'"}'
		    },
		    success : function(data) {
		        var res = JSON.parse(data);
		        console.log(res);
		        $('body').mLoading("hide");
		        res.airLineLists.map(function(item){
		            $(".issuerSelect").append('<option value="'+item.Code+'">'+item.Name+'</option>');
		        })
		        $(".membershipTypeSelect").change(function(){
		            $(".issuerSelect").html('');
		            if($('.membershipTypeSelect option:selected').val()=="1"){
		                res.airLineLists.map(function(item){
		                    $(".issuerSelect").append('<option value="'+item.Code+'">'+item.Name+'</option>');
		                })
		            }else if($('.membershipTypeSelect option:selected').val()=="2"){
		                res.HotelInformationList.map(function(item){
		                    $(".issuerSelect").append('<option value="'+item.Code+'">'+item.Name+'</option>');
		                })
		            }else if($('.membershipTypeSelect option:selected').val()=="3"){
		                res.CarInformationList.map(function(item){
		                    $(".issuerSelect").append('<option value="'+item.Code+'">'+item.Name+'</option>');
		                })
		            }
		        })
		    }
		});
		$(".confirmPop").attr("state","membership");
		$(".confirmPop").unbind("click").click(function(){
			if($(this).attr("state")=="membership"){
				$('body').mLoading("show");
				if($(".idNumberInput").val()==""){
					alert(get_lan("personalInfoBody").remind);
					$('body').mLoading("hide");
					return false;
				}
				var memberShipInfo = $('.membershipTypeSelect option:selected').val()+','+$('.issuerSelect option:selected').val()+','+$(".idNumberInput").val()+','+'2030-1-1';
				addOrUpdateInfo(profileInfo.ID,"memberShipInfo",memberShipInfo);
			}
		})
	})
}
function addOrUpdateInfo(customerId,changeType,value){
	$('body').mLoading("show");
	var basicInfo = ""
	var phoneValue = "";
	var emailValue = "";
	var docInfo = "";
	var memberShipInfo = "";
	console.log(changeType);
	if(changeType=="phoneNum"){
		phoneValue = value;
	}else if(changeType=="emailNum"){
		emailValue = value;
	}else if(changeType=="docInfo"){
		docInfo = value;
	}else if(changeType=="memberShipInfo"){
		memberShipInfo = value;
	}else if(changeType=="nameCn"||changeType=="nameEn"||changeType == "gender"||changeType == "country"||changeType == "birth"){
		basicInfo= value;
	}
	$.ajax({
	    url:$.session.get('ajaxUrl'),
	    type:"post",
	    dataType:"json",
	    data:{
	        url: $.session.get('obtCompany')+"/Systemservice.svc/CustomerInfoUpdateOrAddPost",
	        jsonStr:'{"customerId":"'+customerId+'","basicInfo":"'+basicInfo+'","emailInfo":"'+emailValue+'","docInfo":"'+docInfo+'","phoneInfo":"'+phoneValue+'","memberShipInfo":"'+memberShipInfo+'","id":'+netUserId+',"Language":"'+obtLanguage+'"}'
	    },
	    success:function(data){
	    	console.log(changeType)
	        $('body').mLoading("hide");
	        var res = JSON.parse(data);
	        console.log(res);
	        if(res.code==200){
	        	ProfileInfo.NeedUpdatePassword = false;
	        	$.session.set('ProfileInfo', JSON.stringify(ProfileInfo));
	        	alert(get_lan("success"));
	        	if(changeType=="phoneNum")
	        	{
	        		$(".phoneInput").attr("readonly",'readonly');
	        		$(".editPhone").removeAttr("state");
	        		$(".editPhone").text(get_lan("personalInfoBody").edit);
	        	}else if(changeType=="emailNum"){
	        		$(".emailInput").attr("readonly",'readonly');
	        		$(".editEmail").removeAttr("state");
	        		$(".editEmail").text(get_lan("personalInfoBody").edit);
	        	}else if(changeType=="nameCn"){
	        		$(".CnSurNameInput").attr("readonly",'readonly');
	        		$(".CnGivenNameInput").attr("readonly",'readonly');
	        		$(".editNameCn").removeAttr("state");
	        		$(".editNameCn").text(get_lan("personalInfoBody").edit);
        		}else if(changeType=="gender"){
        			$(".genderSelect").addClass("hide");
        			$(".genderInput").removeClass("hide");
        			$(".genderInput").val($(".genderSelect").children('option:selected').text());
        			$(".editGender").removeAttr("state");
        			$(".editGender").text(get_lan("personalInfoBody").edit);
        		}else if(changeType=="birth"){
        			$(".editBirth").removeAttr("state");
        			$(".editBirth").text(get_lan("personalInfoBody").edit);
        		}
	        	else{
	        		closePop();
	        		$('body').mLoading("show");
	        		$.ajax({
	        		    type:'post',
	        		    url : $.session.get('ajaxUrl'),
	        		    dataType : 'json',
	        		    data:{
	        		        url: $.session.get('obtCompany')+"/SystemService.svc/UpdateProfilePost",
	        		        jsonStr:'{"key":'+netUserId+',"CustomerID":"'+customerId+'","Language":"'+obtLanguage+'"}'
	        		    },
	        		    success : function(data) {
	        		        var res = JSON.parse(data);
	        		        console.log(res);
	        		        documentInfoBody(res);
	        		        $('body').mLoading("hide");
	        		        if(changeType == "docInfo"){
	        	        		$(".docNumInput").css("border","0px");
	        	        		$(".docNumInput").attr("readonly");
	        	        		$(".docTimeInput").css("border","0px");
	        	        		$(".docTimeInput").attr("readonly");
	        	        		$(".updateDocument").text(get_lan("documentInfoBody").modify);
	        	        		$(".updateDocument").removeAttr("change");
	        	        		documentInfoBody(res);
	        	        	}
	        	        	else if(changeType=="memberShipInfo"){
		        		        membershipBody(res);
        		        	}else if(changeType=="country"||changeType=="nameEn"){
        		        		personalInfoBody(res);
        		        	}
	        		    },
	        		    error : function() {
	        		      // alert('fail');
	        		    }
	        		  });
	        	}
	        	// else if(changeType=="nameEn"){
	        	// 	$(".EnSurNameInput").attr("readonly",'readonly');
	        	// 	$(".EnGivenNameInput").attr("readonly",'readonly');
	        	// 	$(".editNameEn").removeAttr("state");
	        	// 	$(".editNameEn").text(get_lan("personalInfoBody").edit);
        		// }
	        	// else if(changeType=="country"){
        		// 	$(".countryInput").attr("readonly",'readonly');
        		// 	$(".editCountry").removeAttr("state");
        		// 	$(".editCountry").text(get_lan("personalInfoBody").edit);
        		// }
	        	// else if(changeType == "docInfo"){
	        	// 	closePop();
	        	// 	$(".docNumInput").css("border","0px");
	        	// 	$(".docNumInput").attr("readonly");
	        	// 	$(".docTimeInput").css("border","0px");
	        	// 	$(".docTimeInput").attr("readonly");
	        	// 	$(".updateDocument").text(get_lan("documentInfoBody").modify);
	        	// 	$(".updateDocument").removeAttr("change");
	        	// 	$('body').mLoading("show");
	        	// 	$.ajax({
	        	// 	    type:'post',
	        	// 	    url : $.session.get('ajaxUrl'),
	        	// 	    dataType : 'json',
	        	// 	    data:{
	        	// 	        url: $.session.get('obtCompany')+"/SystemService.svc/UpdateProfilePost",
	        	// 	        jsonStr:'{"key":'+netUserId+',"CustomerID":"'+customerId+'","Language":"'+obtLanguage+'"}'
	        	// 	    },
	        	// 	    success : function(data) {
	        	// 	        var res = JSON.parse(data);
	        	// 	        console.log(res);
	        	// 	        documentInfoBody(res);
	        	// 	        $('body').mLoading("hide");
	        	// 	    },
	        	// 	    error : function() {
	        	// 	      // alert('fail');
	        	// 	    }
	        	// 	  });
	        	// }else if(changeType=="memberShipInfo"){
	        	// 	closePop();
	        	// 	$('body').mLoading("show");
	        	// 	$.ajax({
	        	// 	    type:'post',
	        	// 	    url : $.session.get('ajaxUrl'),
	        	// 	    dataType : 'json',
	        	// 	    data:{
	        	// 	        url: $.session.get('obtCompany')+"/SystemService.svc/UpdateProfilePost",
	        	// 	        jsonStr:'{"key":'+netUserId+',"CustomerID":"'+customerId+'","Language":"'+obtLanguage+'"}'
	        	// 	    },
	        	// 	    success : function(data) {
	        	// 	        var res = JSON.parse(data);
	        	// 	        console.log(res);
	        	// 	        membershipBody(res);
	        	// 	        $('body').mLoading("hide");
	        	// 	    },
	        	// 	    error : function() {
	        	// 	      // alert('fail');
	        	// 	    }
	        	// 	  });
	        	// }
	        }else{
	          alert(res.message);
	        }
	    },
	    error:function(){

	    }
	});
}
function arrangerBody(profileInfo){
	$(".arrangerBody").html('\
		<div style="height:40px;"></div>\
		<div class="arrangerTittle">'+get_lan("arrangerBody").arrangerTittle+'<div class="addArrangerBtn">'+get_lan("arrangerBody").addArranger+'</div></div>\
		<div class="arrangerContent">\
		  <table class="arrangerTable">\
		    <tr>\
		      <th width="300px">'+get_lan('arrangerBody').arrangerTittle+'</th>\
		      <th width="300px">'+get_lan('arrangerBody').edit+'</th>\
		      <th width="300px"></th>\
		      <th width="300px"></th>\
		    </tr>\
		  </table>\
		</div>\
		<div style="height:40px;"></div>\
	')
	arrangerTable(profileInfo)
	function arrangerTable(profileInfo){
		$.ajax({
		    type:'post',
		    url : $.session.get('ajaxUrl'),
		    dataType : 'json',
		    data:{
		        url: $.session.get('obtCompany')+"/SystemService.svc/GetCustomerOnlieRolePost",
		        jsonStr:'{"id":'+netUserId+',"customerId":"'+profileInfo.ID+'","language":"'+obtLanguage+'"}'
		    },
		    success : function(data) {
		        var res = JSON.parse(data);
		        console.log(res);
		        if(res.code==200){
		        	$(".arrangerTable").html('\
		        	    <tr>\
		        	      <th width="300px">'+get_lan('arrangerBody').arrangerTittle+'</th>\
		        	      <th width="300px">'+get_lan('arrangerBody').edit+'</th>\
		        	      <th width="300px"></th>\
		        	      <th width="300px"></th>\
		        	    </tr>\
		        	    ')
		        	res.roleList.map(function(item){
		        	    $(".arrangerTable").append('\
		        	        <tr>\
		        	          <td>'+item.roleCustomerName+'</td>\
		        	          <td><span class="delArranger" roleCustomerId="'+item.roleCustomerId+'" roleId="'+item.roleId+'" permissionId="'+item.permissionId+'">'+get_lan('arrangerBody').delete+'</span></td>\
		        	          <td></td>\
		        	          <td></td>\
		        	        </tr>\
		        	        ')
		        	});
		        	$(".delArranger").unbind("click").click(function(){
                        $.ajax({
                            type:'post',
                            url : $.session.get('ajaxUrl'),
                            dataType : 'json',
                            data:{
                                url: $.session.get('obtCompany')+"/SystemService.svc/DelCustomerOnlieRolePost",
                                jsonStr:'{"id":'+netUserId+',"customerId":"'+profileInfo.ID+'","roleCustomerId":"'+$(this).attr("roleCustomerId")+'","roleId":"'+$(this).attr("roleId")+'","permissionId":"'+$(this).attr("permissionId")+'","language":"'+obtLanguage+'"}'
                            },
                            success : function(data) {
                                var res = JSON.parse(data);
                                console.log(res);
                                if(res.code=="200"){
                                    alert(res.message);
                                    arrangerTable(profileInfo);
                                }
                            },
                            error : function() {
                              // alert('fail');
                            }
                        });
                    })
		        	/*添加代订人*/
		        	$(".addArrangerBtn").unbind("click").click(function(){
		        		openPop();
		        		$(".popTittle").text(get_lan("arrangerBody").addArranger);
		        		$(".popContent").css("min-height","200px");
		        		$(".popContent").html('\
		        			<div class="popContentLi flexRow">\
		        			  <div class="popContentLiContent">\
		        			    <input type="text" class="searchArrangerInput" placeholder="'+get_lan("arrangerBody").searchArranger+'">\
		        			  </div>\
		        			  <div class="searchArrangerBtn">'+get_lan("arrangerBody").search+'</div>\
		        			</div>\
		        			<div class="arrangerList autoScrollY"></div>\
		        		')
		        		// res.customerList.map(function(item){
		        		//     var name=obtLanguage=="CN"?item.NameCN:item.NameEN;
		        		//     var email = item.Email == ""||item.Email == null?"":'('+item.Email+')';
		        		//     $(".arrangerList").append('\
		        		//         <div class="arrangerLi flexRow">\
		        		//           <div><input type="checkbox" class="arrangerCheckbox" value="'+item.ID+'"></div>\
		        		//           <div class="ellipsis" style="width:340px;" title="'+name+email+'">'+name+email+'</div>\
		        		//         </div>\
		        		//         ')
		        		// });
		        		$(".searchArrangerBtn").unbind("click").click(function(){
		        		    if($(".searchArrangerInput").val()!=""){
		        		        $(".arrangerList").html('');
		        		        res.customerList.map(function(item){
		        		            var name=obtLanguage=="CN"?item.NameCN:item.NameEN;
		        		            var email = item.Email == ""||item.Email == null?"":'('+item.Email+')';
		        		            if(name.indexOf($(".searchArrangerInput").val().toUpperCase()) != -1||email.toUpperCase().indexOf($(".searchArrangerInput").val().toUpperCase()) != -1){
		        		                $(".arrangerList").append('\
		        		                    <div class="arrangerLi flexRow">\
		        		                      <div><input type="checkbox" class="arrangerCheckbox" value="'+item.ID+'"></div>\
		        		                      <div class="ellipsis" style="width:340px;" title="'+name+email+'">'+name+email+'</div>\
		        		                    </div>\
		        		                ')
		        		            }
		        		        })
		        		    }else{
		        		        // $(".arrangerList").html('');
		        		        // res.customerList.map(function(item){
		        		        //     var name=obtLanguage=="CN"?item.NameCN:item.NameEN;
		        		        //     var email = item.Email == ""||item.Email == null?"":'('+item.Email+')';
		        		        //     $(".arrangerList").append('\
		        		        //         <div class="arrangerLi flexRow">\
		        		        //           <div><input type="checkbox" class="arrangerCheckbox" value="'+item.ID+'"></div>\
		        		        //           <div class="ellipsis" style="width:340px;" title="'+name+email+'">'+name+email+'</div>\
		        		        //         </div>\
		        		        //         ')
		        		        // });
		        		    }
		        		})
		        		$(".confirmPop").attr("state","arranger");
		        		$(".confirmPop").unbind("click").click(function(){
		        			if($(this).attr("state")=="arranger"){
		        				$('body').mLoading("show");
		        				var customerIds = '';
		        				$('.arrangerCheckbox').each(function() {
		        				        if($(this).is(':checked')) {
		        				                customerIds+=$(this).val();
		        				                customerIds+=',';
		        				        }
		        				});
		        				customerIds = customerIds.substring(0,customerIds.length-1)
		        				if(customerIds==""){
		        					$('body').mLoading("hide");
		        				    alert(get_lan('arrangerBody').arrangerRemind);
		        				}else{
		        				    var customerId = res.ID;
		        				    $.ajax({
		        				        type:'post',
		        				        url : $.session.get('ajaxUrl'),
		        				        dataType : 'json',
		        				        data:{
		        				            url: $.session.get('obtCompany')+"/SystemService.svc/AddCustomerOnlieRolePost",
		        				            jsonStr:'{"id":'+netUserId+',"customerId":"'+profileInfo.ID+'","customerRoles":"'+customerIds+'","language":"'+obtLanguage+'"}'
		        				        },
		        				        success : function(data) {
		        				        	$('body').mLoading("hide");
		        				            var res = JSON.parse(data);
		        				            console.log(res);
		        				            if(res.code=="200"){
		        				                alert(res.message);
		        				                arrangerTable(profileInfo);
		        				                closePop();
		        				            }
		        				        },
		        				        error : function() {
		        				          // alert('fail');
		        				        }
		        				    });
		        				}
		        			}
		        		})
		        	})
		        }
		    },
		    error : function() {
		      // alert('fail');
		    }
		});
	}
	// $(".addArrangerBtn").unbind("click").click(function(){
	// 	openPop();
	// 	$(".popTittle").text(get_lan("arrangerBody").addArranger);
	// 	$(".popContent").html('\
	// 		<div class="popContentLi flexRow">\
	// 		  <div class="popContentLiContent">\
	// 		    <input type="text" class="chooseArrangerInput">\
	// 		  </div>\
	// 		  <div class="chooseArrangerBtn">'+get_lan("arrangerBody").search+'</div>\
	// 		</div>\
	// 		<div class="arrangerList autoScrollY"></div>\
	// 	')
	// 	$.ajax({
	// 	    type:'post',
	// 	    url : $.session.get('ajaxUrl'),
	// 	    dataType : 'json',
	// 	    data:{
	// 	        url: $.session.get('obtCompany')+"/SystemService.svc/GetCustomerOnlieRolePost",
	// 	        jsonStr:'{"id":'+netUserId+',"customerId":"'+profileInfo.ID+'","language":"'+obtLanguage+'"}'
	// 	    },
	// 	    success : function(data) {
	// 	        var res = JSON.parse(data);
	// 	        console.log(res);
	// 	        if(res.code==200){
	// 	        	$(".arrangerList").html('');
	// 	        	res.customerList.map(function(item){
	// 	        	    var name=obtLanguage=="CN"?item.NameCN:item.NameEN;
	// 	        	    var email = item.Email == ""||item.Email == null?"":'('+item.Email+')';
	// 	        	    $(".arrangerList").append('\
	// 	        	        <div class="arrangerLi flexRow">\
	// 	        	          <div><input type="checkbox" class="arrangerCheckbox" value="'+item.ID+'"></div>\
	// 	        	          <div class="ellipsis" style="width:340px;" title="'+name+email+'">'+name+email+'</div>\
	// 	        	        </div>\
	// 	        	        ')
	// 	        	});
	// 	        }
	// 	    },
	// 	    error : function() {
	// 	      // alert('fail');
	// 	    }
	// 	});
	// 	$(".confirmPop").attr("state","arranger");
	// 	$(".confirmPop").unbind("click").click(function(){
	// 		if($(this).attr("state")=="arranger"){
	// 			$('body').mLoading("show");
	// 		}
	// 	})
	// })

}
function openPop(){
	$(".popBody").css("display","block");
	$("#cover").css("display","block");
}
function closePop(){
	$(".popBody").css("display","none");
	$("#cover").css("display","none");
}
function openRemindPop(){
	$(".remindPop").css("display","block");
	$("#cover").css("display","block");
}
function closeRemindPop(){
	$(".remindPop").css("display","none");
	$("#cover").css("display","none");
}