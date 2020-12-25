var netUserId = $.session.get('netLoginId');
var obtLanguage = $.session.get('obtLanguage');
var hotelChooseInfo = JSON.parse($.session.get('hotelChooseInfo'));
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
var TAorderNo = $.session.get('TAorderNo');
var regPhone = tools.regPhone;

console.log(hotelChooseInfo);
var queryKeySelect = hotelChooseInfo.queryKey;
$(function() {
	showContent(); //内容展示
	surePassengerInfo(); //旅客信息确认
	passengerPop(); //个人信息弹窗
})
// 添加弹窗  2020.1.9

function addRemark(res){
	if(res.ReasonCodeTitle==null || res.ReasonCodeTitle=="null"){
		return false;
	}
	// if(res.ReasonCodeTitle==null){
	// 	res.ReasonCodeTitle="违反差旅政策"
	// }
	// if(res.ReasonCodeContent==null){
	// 	res.ReasonCodeContent="您选择的价格超过了公司规定的房费，请选择符合政策的价格。"
	// }
	var placeholderStr="请选择一个原因"
	var tips="如无符合政策的价格，请选择您违反政策的原因。如果不止一个原因，请选择最适用的。"
	var subText="提交"
	if(obtLanguage=="EN"){
		placeholderStr="Please choose a reason";
		tips="Please choose the reason for selecting this travel option. If more than one reason applies, choose the most applicable."
		subText="Submit"
	}
	// 没有图片  改为X
	'<div class="Reasontitle">'+res.ReasonCodeTitle+'<span class="closeBtn"><img src="./images/icon_close.png"></span></div>'+
	$('body').append('<div class="fixed">'+
		'<div class="ReasonGroup">'+
			'<div class="Reasontitle">'+res.ReasonCodeTitle+'<span class="closeBtn">X</span></div>'+
			'<div class="Reasoncontent">'+
				'<div class="content">'+
					res.ReasonCodeContent+
				'</div>'+
			'</div>'+
			'<div class="ReasonOption">'+
				'<select class="popReasonSelect">'+
					'<option value="" disabled selected style="display:none;">'+placeholderStr+'</option>'+
				'</select>'+
			'</div>'+
			'<div class="Reasonbtn">'+subText+'</div>'+
		'</div>'+
	'</div>')
	// option
	res.ReasonCodes.map(function(item) {
		$(".popReasonSelect").append('\
	        <option value="' + item.Code + '">' + item.Des +
			'</option>\
	        ')
	})
	$(".Reasonbtn").unbind("click").click(function() {
		if($('.popReasonSelect').val()==null){
			// alert('请选择一个理由')
		}else{
			$('.hotelReasonSelect').val($('.popReasonSelect').val())
			$('.fixed').hide()
		}
	})
	$(".closeBtn").unbind("click").click(function() {
		$('.fixed').hide()
	})
}
//中英文对象
var cn = {
	"closeText": "确定",
	"currentText": "当月",
	"remarkPop": {
		"businessTripTittle": "出差信息：",
		"remarkInfoTittle": "备注信息：",
		"tripNameTittle": "员工姓名",
		"tripCompanyTittle": "公司",
		"confirm": "确认",
		"cancel": "取消",
		"companyRemindTittle": "温馨提示",
		"companyRemindText": "因为您已更换出差公司，请确认更改后的公司抬头信息是否正确。",
		"Choose": "请选择",
		"search": "请搜索",
		"remarkRemind": "请将红色备注项填写完整",
		"remarkInfoRemind": "红色标志为必填项",
	},
	"passengerPop": {
		"popTittle": "旅客信息",
		"remind": "（'*'为必填项）",
		"chooseName": "选择购票姓名：",
		"nameRemind": "(购票姓名需与登机所持证件保持一致)",
		"popNameCn": "中文姓名:",
		"popNameEn": "英文姓名:",
		"ticketName": "旅客姓名:",
		"popPhone": "手机号码:",
		"popMail": "邮箱:",
		"popDocuments": "证件信息:",
		"popDocumentsRemind": "请选择证件类型",
		"popDocumentsTime": "证件有效期:",
		"timeRemind": "请选择有效期",
		"clickRemind": "请正确填写",
		"phoneRemind": "手机号填写有误",
		"emailRemind": "邮箱信息填写有误",
	},
	"newCustomerPop": {
		"nick": "昵称:",
		"sex": "性别:",
		'male': "男",
		'female': "女",
		'nationality': "国籍:",
		'birthday': "生日:",
		"surname": "姓",
		"givenName": "名",
		"required":"为必填项",
	},
	"progressBar": {
		"search": "查询",
		"book": "预订",
		"complete": "完成",
	},
	"orderDetail": {
		"orderDetailTittle": "订单详情：",
		"weekDay": '周日, 周一, 周二, 周三, 周四, 周五, 周六',
		"reselection": "[重新选择]",
		"checkIn": "入住日期：",
		"checkOut": "离店日期：",
		"DailyRate": "每晚价格：",
		"breakfast": "含早餐",
		"noBreakfast": "不含早",
		"dailyRateBodyTittle1": "您已选择",
		"dailyRateBodyTittle2": "至",
		"dailyRateBodyTittle3": " 共 ",
		"dailyRateBodyTittle4": " 晚",
	},
	"orderListTittle": "未出行订单",
	"lastestTime": "最晚到店时间：",
	"passengerInfo": {
		"passengerTittle": "旅客信息",
		"remarks": "账单信息",
		"changePassengerInfo": "[修改信息]",
		"choosePassenger": "选择旅客",
		"selectPassengerRemind": "查找代订旅客 可输入姓名",
		"selectPassengerSearch": "搜索",
		"commonPassengers": "常用代订旅客",
		"chooseResidents": "选择同住人",
		"ResidentsName": "同住人：",
		"selectResidentsRemind": "查找同住人 可输入姓名/邮箱",
		'delMsg': '是否删除该订单中此旅客?',
		'addNewCustomer': "[添加新旅客]",
	},
	"frequentCardsInfo": {
		"tittle": "会员卡",
		"cardholder": "持卡人 : ",
		"number": "卡号 : ",
		"air": "航空-",
		"hotel": "酒店-",
		"airMembership": "航空常旅客卡",
		"hotelMembership": "酒店会员卡",
		"remind": "不使用会员卡",
	},
	"myPreference": {
		"myPreferenceTittle": "旅客偏好",
		"tips": "( 您的需求会尽量转达给酒店，具体安排以酒店为准。)",
		"bedTypeRequirement": "床型要求:",
		"roomTypeRequirement": "房型要求:",
		"otherRequirement": "时间要求:",
		"NoRequirement": "无要求",
		"KingBedRoom": "尽量大床房",
		"DoubleBedRoom": "尽量双床房",
		"NoSmokingRoom": "尽量无烟房",
		"SmokingRoom": "尽量吸烟房",
		"StayLate": "晚入住",
		"early": "早入住",
		"LateCheckout": "晚离店",
	},
	"creditCardInfo": {
		"creditCardTittle": "信用卡",
		"creditCardtips":"* 您的酒店预订将使用信用卡担保",
		"creditCardName": "持卡人姓名",
		"creditCardNumber": "信用卡卡号",
		"creditCardDate": "信用卡有效期",
		"creditCardCvv": "*CVV",
		"creditCardDocumentType": "*证件类型",
		"creditCardDocumentNumber": "*证件号码",
		"cancelPolicy": "取消政策",
		"surname": "姓",
		"givenName": "名",
		"creditCardType":"可担保卡类型",
	},
	"hotelReason": "原因：",
	"hotelReasonRemind": "请选择",
	"bookReasonRemind": "请先选择理由",
	"totalFare": "总金额:",
	"hotelTips":"请注意：您选择的是公付，房费将由公司付款，其它费用请自行与酒店协商解决。",
	"bookTicket": "预定",
	"bookTicketRemind": "请先选择旅客",
	"success": "预订成功！",
	// "cancelDateRemind": "最晚取消时限均为酒店所在地的当地时间。请至少在最晚取消时限前2个工作小时通知我们取消，以免产生额外的费用。",
	"cancelDateRemind": "最晚取消时限均为酒店所在地的当地时间。请至少在最晚取消时限前2个工作小时进行取消，以免产生额外的费用。",
	"centralFapiao": "我已知晓该酒店提供统一发票，无需单独开票。",
	"centralFapiaoRemind": "请确认发票信息。",
	"shuttleBusBody": {
		"shuttleBusTittle": "班车",
		"checkBus": "我需要班车服务",
		"date": "日期",
		"morningBus": "出发时间",
		"arrival": "",
		"eveningBus": "出发时间",
		"departure": "",
		"to":"to ",
		"from":"form ",
		"noNeed":"不需要",
	},
}
var en = {
	"closeText": "Confirm",
	"currentText": "thisMonth",
	"remarkPop": {
		"businessTripTittle": "Travel Information：",
		"remarkInfoTittle": "Remarks：",
		"tripNameTittle": "Employee Name",
		"tripCompanyTittle": "Company",
		"confirm": "Confirm",
		"cancel": "Cancel",
		"companyRemindTittle": "Kindly Reminder",
		"companyRemindText": "Because you have changed the travel company, please confirm whether the company's information is correct after the change.",
		"Choose": "Please Select",
		"search": "Please Search",
		"remarkRemind": "Please complete the mandatory remark.",
		"remarkInfoRemind": "The remark in red is mandatory.",
	},
	"passengerPop": {
		"popTittle": "Traveler Information",
		"remind": "（'*' Required field）",
		"chooseName": "Choose the name of Traveler：",
		// "nameRemind":"(The name of ticket must be the same as  the travel document)",
		"nameRemind": "(Name on the ticket must be the same as it displays on the travel document)",
		"popNameCn": "Chinese Name:",
		"popNameEn": "English Name:",
		"ticketName": "Traveler:",
		"popPhone": "Phone:",
		"popMail": "Email:",
		"popDocuments": "Document:",
		"popDocumentsRemind": "Please select the type of certificate",
		"popDocumentsTime": "Validity:",
		"timeRemind": "Please choose the validity period.",
		"clickRemind": "Please fill in correctly.",
		"phoneRemind": "Wrong phone number filling.",
		"emailRemind": "Wrong number of mailbox number.",
	},
	"newCustomerPop": {
		"nick": "Nick:",
		"sex": "Sex:",
		'male': "Male",
		'female': "Female",
		'nationality': "Nationality:",
		'birthday': "Birthday:",
		"surname": "Surname",
		"givenName": "Given Name",
		"required":"is required",
	},
	"progressBar": {
		"search": "Search",
		"book": "Book",
		"complete": "Complete",
	},
	"orderDetail": {
		"orderDetailTittle": "Order Details：",
		"weekDay": 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
		"reselection": "[Modify]",
		"checkIn": "Check In:",
		"checkOut": "Check Out:",
		"DailyRate": "Daily Rate:",
		"breakfast": "Including Breakfast",
		"noBreakfast": "Not Including Breakfast",
		"dailyRateBodyTittle1": "You have chosen",
		"dailyRateBodyTittle2": "to",
		"dailyRateBodyTittle3": " total ",
		"dailyRateBodyTittle4": " nights",
	},
	"orderListTittle": "Ongoing Trip",
	"lastestTime": "Latest arrival time:",
	"passengerInfo": {
		"passengerTittle": "Traveler Information",
		"remarks": "Billing Information",
		"changePassengerInfo": "[Modify]",
		"choosePassenger": "Select Traveler",
		"selectPassengerRemind": "Enter First Name to search traveler",
		"selectPassengerSearch": "Search",
		"commonPassengers": "Common Traveler",
		"chooseResidents": "Select Roommate",
		"ResidentsName": "Roommate：",
		"selectResidentsRemind": "Enter Name/Email to search roommates",
		'delMsg': 'Do you want to remove this traveler from this order?',
		'addNewCustomer': "[Add new travelers]",
	},
	"frequentCardsInfo": {
		"tittle": "Loyalty Membership",
		"cardholder": "Name Of Cardholder : ",
		"number": "Number : ",
		"air": "Air-",
		"hotel": "Hotel-",
		"airMembership": "Air Frequent Flyer No",
		"hotelMembership": "Hotel Loyalty Membership Card",
		"remind": "No membership card",
	},
	"myPreference": {
		"myPreferenceTittle": "Traveler Preference",
		"tips": "( Kindly notice your special request(s) cannot be guaranteed, the property will do its best to meet your needs upon your check-in. )",
		"bedTypeRequirement": "Bed Type Requirement:",
		"roomTypeRequirement": "Room Requirement:",
		"otherRequirement": "Other Requirements:",
		"NoRequirement": "No Requirement",
		"KingBedRoom": "King Bed Room",
		"DoubleBedRoom": "Twin Beds",
		"NoSmokingRoom": "No Smoking",
		"SmokingRoom": "Smoking Room",
		"StayLate": "Late Check-in",
		"early": "Early Check-in",
		"LateCheckout": "Late Check-out",
	},
	"creditCardInfo": {
		"creditCardTittle": "Credit Card",
		"creditCardtips":"* Your hotel booking will be guaranteed by credit card.",
		"creditCardName": "*Cardholder",
		"creditCardNumber": "*Card Number",
		"creditCardDate": "*Expiry Date",
		"creditCardCvv": "*CVV",
		"creditCardDocumentType": "*Certificate Type",
		"creditCardDocumentNumber": "*Document Number",
		"cancelPolicy": "Cancel policy",
		"surname": "Surname",
		"givenName": "Given Name",
		"creditCardType":"Guarantee Card Type",
	},
	"hotelReason": "City Rate Cap Violation：",
	"hotelReasonRemind": "Please Select",
	"bookReasonRemind": "Please choose reasons first.",
	"totalFare": "Total Rate:",
	"hotelTips":"Friendly reminder: The hotel payment is central paid, please handle the other spending directly with the hotel. ",
	"bookTicket": "Book",
	"bookTicketRemind": "Please select travelers first.",
	"success": "Booking Successful!",
	// "cancelDateRemind": "The latest cancel date/time is the local time where the hotel is located. Please contact us to cancel the booking at least 2 working hours before the latest cancel date/time to avoid any extra cost.",
	"cancelDateRemind": "The latest cancel date/time is the local time where the hotel is located. Please cancel the booking at least 2 working hours before the latest cancel date/time to avoid any extra cost.",
	"centralFapiao": "I acknowledged that the hotel will offer a service of centralized invoices, I will not issue invoices separately.",
	"centralFapiaoRemind": "Please confirm invoice information.",
	"shuttleBusBody": {
		"shuttleBusTittle": "Shuttle Bus",
		"checkBus": "I need a shuttle bus service",
		"date": "Date",
		"morningBus": "Departure Time",
		"arrival": "",
		"eveningBus": "Departure Times",
		"departure": "",
		"to":"to ",
		"from":"from ",
		"noNeed":"No Need",
	},
}
if (ProfileInfo.onlineStyle == "APPLE") {
	cn.remarkPop.remarkInfoRemind = "";
	en.remarkPop.remarkInfoRemind = "";

	en.hotelReason = "Out of Policy Reason:";
}

function get_lan(m) {
	//获取文字
	var lan = $.session.get('obtLanguage'); //语言版本
	//选取语言文字
	switch (lan) {
		case 'CN':
			var t = cn[m];
			break;
		case 'EN':
			var t = en[m];
			break;
		default:
			var t = cn[m];
	}
	if (t == undefined) t = cn[m];
	if (t == undefined) t = en[m];

	return t;
}

function getWeek(dateStr) {
	var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
	return get_lan('orderDetail').weekDay.split(',')[myDate.getDay()];
}
//内容展示
function showContent() {
	var travelQueryKey = ',2,' + JSON.parse($.session.get('searchHotelInfo')).hotelCityText + ',' +
		queryKeySelect.split(',')[0] + ',' + queryKeySelect.split(',')[1];
	$(".remarkPop").html('\
	    <div class="businessTripTittle tittleBackColor">' + get_lan('remarkPop').businessTripTittle +
		'</div>\
	    <div class="businessTripBody"></div>\
	    <div class="remarkInfoTittle tittleBackColor">' + get_lan(
			'remarkPop').remarkInfoTittle +
		'</div>\
	    <div style="padding-bottom:10px;border-bottom:1px solid #f3f3f3;">\
          <div class="remarkInfoBody autoScrollY"></div>\
        </div>\
        <div class="colorRed" style="box-sizing:border-box;padding-left:20px;font-size:14px;height: 19px;line-height: 19px;">' +
		get_lan('remarkPop').remarkInfoRemind + '</div>\
	    <div class="remarkFooter flexRow"></div>\
	')
	$("#main").html(
		'\
        <div class="autoCenter">\
            <div class="progressBar flexRow activeFontColor"></div>\
            <div class="orderDetail" queryKey="'+travelQueryKey+'">\
            <div class="orderDetailTittle tittleBackColor">' +
		get_lan('orderDetail').orderDetailTittle +
		'</div>\
            </div>\
            <div class="orderList flexRow hide">\
               <div class="orderListTittle">' +
		get_lan('orderListTittle') +
		'</div>\
               <div class="orderListBody"></div>\
            </div>\
            <div class="passengerInfo">\
	          <div class="passengerTittle">' +
		get_lan('passengerInfo').passengerTittle +
		'</div>\
	            <div class="passengerBody">\
	              <div class="choosePassengerBody flexRow activeFontColor"></div>\
    	          <div class="passengerBar flexRow">\
    	              <div class="passengerBarLi" style="width:250px;box-sizing:border-box;padding-left:45px;">' +
		get_lan('passengerPop').ticketName +
		'</div>\
                      <div class="passengerBarLi" style="width:150px;">' + get_lan('passengerPop').popPhone +
		'</div>\
                      <div class="passengerBarLi" style="width:200px;">' + get_lan('passengerPop').popMail +
		'</div>\
                      <div class="passengerBarLi" style="width:300px;">' + get_lan('passengerPop').popDocuments +
		'</div>\
	              </div>\
	              <div class="passengerList">\
	              </div>\
	          </div>\
            </div>\
            <div class="frequentCardsInfo hide">\
                <div class="frequentCardsTittle">' +
		get_lan('frequentCardsInfo').tittle +
		'</div>\
                <div class="frequentCardsBody" style="min-height:40px;">\
                </div>\
            </div>\
            <div class="myPreference">\
              <div class="preferenceTittle">' +
		get_lan('myPreference').myPreferenceTittle + '<span style="color:#666666;font-size:12px">' + get_lan('myPreference')
		.tips +
		'</span></div>\
              <div class="preferenceBody">\
                <div class="bedTypeRequirement flexRow">\
                  <div class="requirementTittle">' +
		get_lan('myPreference').bedTypeRequirement +
		'</div>\
                  <div class="flexRow" style="margin-right:40px;width: 120px;"><div style="margin-top:4px;"><input type="radio" class="requirementRadio" name="bedTypeRequirement" value="no requirement" checked></div>' +
		get_lan('myPreference').NoRequirement +
		'</div>\
                  <div class="flexRow" style="margin-right:40px;width: 110px;"><div style="margin-top:4px;"><input type="radio" class="requirementRadio" name="bedTypeRequirement" value="大床"></div>' +
		get_lan('myPreference').KingBedRoom +
		'</div>\
                  <div class="flexRow" style="margin-right:40px;width: 110px;"><div style="margin-top:4px;"><input type="radio" class="requirementRadio" name="bedTypeRequirement" value="双床"></div>' +
		get_lan('myPreference').DoubleBedRoom +
		'</div>\
                </div>\
                <div class="roomTypeRequirement flexRow">\
                  <div class="requirementTittle">' +
		get_lan('myPreference').roomTypeRequirement +
		'</div>\
                  <div class="flexRow" style="margin-right:40px;width: 120px;"><div style="margin-top:4px;"><input type="radio" class="requirementRadio" name="roomTypeRequirement" value="no requirement"checked ></div>' +
		get_lan('myPreference').NoRequirement +
		'</div>\
                  <div class="flexRow" style="margin-right:40px;width: 110px;"><div style="margin-top:4px;"><input type="radio" class="requirementRadio" name="roomTypeRequirement" value="无烟"></div>' +
		get_lan('myPreference').NoSmokingRoom +
		'</div>\
                  <div class="flexRow" style="margin-right:40px;width: 110px;"><div style="margin-top:4px;"><input type="radio" class="requirementRadio" name="roomTypeRequirement" value="吸烟"></div>' +
		get_lan('myPreference').SmokingRoom +
		'</div>\
                </div>\
                <div class="otherRequirement flexRow">\
                  <div class="requirementTittle">' +
		get_lan('myPreference').otherRequirement +
		'</div>\
                  <div class="flexRow" style="margin-right:40px;width: 120px;"><div style="margin-top:4px;"><input type="radio" class="requirementRadio" name="otherRequirement" value="no requirement" checked></div>' +
		get_lan('myPreference').NoRequirement +
		'</div>\
                  <div class="flexRow" style="margin-right:40px;width: 110px;"><div style="margin-top:4px;"><input type="radio" class="requirementRadio" name="otherRequirement" value="stay1"></div>' +
		get_lan('myPreference').StayLate +
		'</div>\
                  <div class="flexRow" style="margin-right:40px;width: 110px;"><div style="margin-top:4px;"><input type="radio" class="requirementRadio" name="otherRequirement" value="stay2"></div>' +
		get_lan('myPreference').early +
		'</div>\
                  <div class="flexRow" style="margin-right:40px;width: 110px;"><div style="margin-top:4px;"><input type="radio" class="requirementRadio" name="otherRequirement" value="stay3"></div>' +
		get_lan('myPreference').LateCheckout +
		'</div>\
                </div>\
              </div>\
            </div>\
            <div class="creditCardInfo hide">\
              <div class="creditCardTittle">' +
			  '<span style="display: inline-block;min-width: 140px;">'+get_lan('creditCardInfo').creditCardTittle +'</span>'+'<span class="creditCardtips hide" style="color: #ED8322;font-size: 16px;">'+get_lan('creditCardInfo').creditCardtips+'</span>'+'</div>\
              <div class="creditCardBody flexWrap">\
                <div class="creditCardName flexRow">\
                  <div class="creditCardDetailTittle">' +get_lan('creditCardInfo').creditCardName +'</div>\
                  <input class="creditCardInput creditCardSurname" placeholder="' + get_lan('creditCardInfo').surname +'" style="width:78px;">\
                  <input class="creditCardInput creditCardGivenName" placeholder="' +get_lan('creditCardInfo').givenName +'" style="width:80px;margin-left:20px;">\
                </div>\
                <div class="creditCardNumber flexRow">\
                  <div class="creditCardDetailTittle">' +get_lan('creditCardInfo').creditCardNumber +'</div>\
                  <input class="creditCardInput creditCardNumberInput">\
                </div>\
                <div class="creditCardDate flexRow">\
                  <div class="creditCardDetailTittle">' +get_lan('creditCardInfo').creditCardDate +'</div>\
                  <input class="creditCardInput creditCardDateInput" readonly>\
                </div>\
                <div class="creditCardCvv flexRow">\
                  <div class="creditCardDetailTittle">' +get_lan('creditCardInfo').creditCardCvv +'</div>\
                  <input class="creditCardInput creditCardCvvInput" maxlength="3">\
                </div>\
                <div class="creditCardDocumentType flexRow">\
                  <div class="creditCardDetailTittle">' +get_lan('creditCardInfo').creditCardDocumentType +'</div>\
                  <select class="creditCardInput creditCardDocumentTypeSelect"></select>\
                </div>\
                <div class="creditCardDocumentNumber flexRow">\
                  <div class="creditCardDetailTittle">' +get_lan('creditCardInfo').creditCardDocumentNumber +'</div>\
                  <input class="creditCardInput creditCardDocumentNumberInput">\
                </div>\
				<div class="creditCardType hide">\
					<div class="creditCardTypeTittle">'+get_lan('creditCardInfo').creditCardType +'</div>\
					<div class="creditCardTypeBody"></div>\
				</div>\
                <div class="creditCardPolicy flexRow">\
                  <div class="creditCardPolicyTittle">' +get_lan('creditCardInfo').cancelPolicy +'</div>\
                  <div class="creditCardPolicyBody"></div>\
                </div>\
              </div>\
			</div>\
			<div class="shuttleBusInfo hide">\
              <div class="shuttleBusTittle flexRow">' +get_lan('shuttleBusBody').shuttleBusTittle + '<input type="checkbox" class="checkBusInput">' + get_lan('shuttleBusBody').checkBus +'</div>\
              <div class="shuttleBusBody">\
                <div class="shuttleBusBodyTittle flexRow">\
                  <div style="width:200px;margin-left:50px;">' +get_lan('shuttleBusBody').date +'</div>\
                  <input type="checkbox" class="checkBusMorning hide" checked>\
                  <div style="width:120px;">' +get_lan('shuttleBusBody').morningBus + '</div>\
					<div style="width:417px;">' + get_lan('shuttleBusBody').arrival +'</div>\
                  <input type="checkbox" class="checkBusEvening hide" checked>\
                  <div style="width:120px;">' +get_lan('shuttleBusBody').eveningBus + '</div>\
                  <div>' + get_lan('shuttleBusBody').departure +'</div>\
                </div>\
                <div class="shuttleBusBodyList"></div>\
              </div>\
			</div>\
			<div class="lastestTime hide">\
              ' +get_lan('lastestTime') +'\
              <select class="lastestTimeSelect">\
                <option value="14:00">14:00</option>\
                <option value="15:00">15:00</option>\
                <option value="16:00">16:00</option>\
                <option value="17:00">17:00</option>\
                <option value="18:00" selected>18:00</option>\
                <option value="19:00">19:00</option>\
                <option value="20:00">20:00</option>\
                <option value="21:00">21:00</option>\
                <option value="22:00">22:00</option>\
                <option value="23:00">23:00</option>\
                <option value="24:00">24:00</option>\
                <option value="1:00">1:00</option>\
                <option value="2:00">2:00</option>\
                <option value="3:00">3:00</option>\
                <option value="4:00">4:00</option>\
                <option value="5:00">5:00</option>\
                <option value="6:00">6:00</option>\
              </select>\
            </div>\
            <div class="hotelReason hide">\
              <span class="hotelReasonText">' +get_lan('hotelReason') +'</span>\
              <select class="hotelReasonSelect">\
              </select>\
			</div>\
			<div style="height:50px;position:relative;margin:40px 0 50px 0;">\
				<div class="centralFapiao hide">\
					<input type="checkbox" class="IsCentralFapiao">' +get_lan("centralFapiao") +'\
				</div>\
				<div class="totalFareBody activeFontColor"></div>\
			</div>\
            <div class="bookHotelBody flexRow">\
              <div class="bookHotelBtn btnBackColor">' +get_lan('bookTicket') + '</div>\
            </div>\
          </div>\
    ')
	if (TAorderNo != undefined) {
		console.log('隐藏')
		$('.menu .autoCenter').addClass('hide')
		$('.orderTittle').addClass('hide')
		$('.autoScrollY').addClass('hide')
		$('footer').addClass('hide')
		$('.menu').css("height", '40px')
	}
	// 苹果时不显示
	if (ProfileInfo.onlineStyle != "APPLE") {
		$(".creditCardtips").removeClass("hide")
	}
	$(".bookHotelBtn").unbind("click").click(function() {
		if ($(".passengerLi").length == 0) {
			alert(get_lan('bookTicketRemind'));
		}
	})

	$(".progressBar").html(
		'\
	    <div class="progressLine progressActiveBack"></div><div class="progressCircle progressActiveBack"></div><span class="progressActiveFont">' +
		get_lan('progressBar').search +
		'</span>\
	    <div class="progressLine progressActiveBack"></div><div class="progressCircle progressActiveBack"></div><span class="progressActiveFont">' +
		get_lan('progressBar').book +
		'</span>\
	    <div class="progressLine progressBackColor"></div><div class="progressCircle progressBackColor"></div>' +
		get_lan('progressBar').complete + '\
	')
	$(".creditCardDateInput").datepicker({
		dateFormat: 'yy-mm',
		changeMonth: true,
		changeYear: true,
		minDate: 30, // 当前日期之后的 0 天，就是当天
		hideIfNoPrevNext: true,
		showOtherMonths: true,
		selectOtherMonths: true,

		showButtonPanel: true, //显示按钮,没有按钮不可传入日期
		closeText: get_lan('closeText'),
		currentText: get_lan('currentText'),
		onChangeMonthYear: function(year, month, inst) {
			console.log(inst.id)
			setTimeout(function() {
				var buttonPane = $('#' + inst.id)
					.datepicker("widget")
					.find(".ui-datepicker-buttonpane");
				$(buttonPane).html('')
				$("<button>", {
					text: get_lan('closeText'),
					click: function() {
						$.datepicker._clearDate($('#' + inst.id));
						var month = $("#ui-datepicker-div .ui-datepicker-month option:selected").val(); //得到选中的月份值
						var year = $("#ui-datepicker-div .ui-datepicker-year option:selected").val(); //得到选中的年份值
						$('.creditCardDateInput').val(hideDocDate(ProfileInfo,year + '-' + (parseInt(month) + 1)));
						$('.creditCardDateInput').attr("hideNo",year + '-' + (parseInt(month) + 1)); //给input赋值，其中要对月值加1才是实际的月份
					}
				}).appendTo(buttonPane);
			}, 1);
		},
		beforeShow: function(input) {
			$('style').append('.ui-datepicker-calendar{display: none;}')
			$(".creditCardDateInput").datepicker('setDate', new Date($(".creditCardDateInput").attr("hideNo"))); //设置为当前日期
		},

	});
	/*酒店详情*/
	var queryKey = queryKeySelect.split(',')[0] + ',' + queryKeySelect.split(',')[1] + ',,,' + queryKeySelect.split(',')[2] +
		',' + queryKeySelect.split(',')[4] + ',' + queryKeySelect.split(',')[3] + ',' + hotelChooseInfo.GuestType + ',' +
		hotelChooseInfo.TotalFare + ',,,,false';
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/QueryService.svc/QuerySelectedHotelInfo",
			jsonStr: '{"queryKey":"' + queryKey + '","id":' + netUserId + '}'
		},
		success: function(data) {
			var res = JSON.parse(data);
			console.log(res);
		
			$('.lastestTimeSelect').val(hotelChooseInfo.lastestTime);
			// 12.26如果HotelType=”ManualAgreement”时,苹果的写死18:00
			if (res.RoomInfos[0].HotelType == "ManualAgreement" && ProfileInfo.onlineStyle == "APPLE") {
				$('.lastestTimeSelect').val('18:00');
				$('.lastestTimeSelect').attr('disabled', 'disabled');
			}
			if (res.CityId == "LHN" || res.CityId == "RMQ" || res.CityId == "TNN" || res.CityId == "TPE" || res.CityId ==
				"TTT" || res.CityId == "MZG" || res.CityId == "KNH") {
				$(".bookHotelBtn").attr("tw", "no");
			}
			$(".orderDetail").attr("HotelChain", res.HotelChain);
			$(".orderDetail").attr("cityCode", res.CityId);
			$(".orderDetail").attr("HotelType", res.RoomInfos[0].HotelType);
			$(".orderDetail").attr("city", JSON.parse($.session.get('searchHotelInfo')).hotelCityText);
			$(".orderDetail").attr("DateStart", queryKeySelect.split(',')[0]);
			$(".orderDetail").attr("DateReturn", queryKeySelect.split(',')[1]);
			var breakfast = res.RoomInfos[0].RatePlans[0].BreakfastCode != "0" && res.RoomInfos[0].RatePlans[0].BreakfastCode !=
				null && res.RoomInfos[0].RatePlans[0].BreakfastCode != "" ? get_lan("orderDetail").breakfast : get_lan(
					"orderDetail").noBreakfast;
			var RateStartDate = res.RoomInfos[0].RatePlans[0].Rates[0].Date != null && res.RoomInfos[0].RatePlans[0].Rates[0]
				.Date != "" ? res.RoomInfos[0].RatePlans[0].Rates[0].Date.substring(0, 10) : "";
			var RateEndDate = res.RoomInfos[0].RatePlans[0].Rates[res.RoomInfos[0].RatePlans[0].Rates.length - 1].Date !=
				null && res.RoomInfos[0].RatePlans[0].Rates[res.RoomInfos[0].RatePlans[0].Rates.length - 1].Date != "" ? res.RoomInfos[
					0].RatePlans[0].Rates[res.RoomInfos[0].RatePlans[0].Rates.length - 1].Date.substring(0, 10) : "";
			var rateUnderline = res.RoomInfos[0].RatePlans[0].Rates.length > 1 && res.RoomInfos[0].RatePlans[0].Rates.length <
				10 ? "rateUnderline" : "";
			var dailyRateBodyString = '';
			if (res.RoomInfos[0].RatePlans[0].Rates.length < 10) {
				res.RoomInfos[0].RatePlans[0].Rates.map(function(rItem) {
					if (rItem.Date != null) {
						dailyRateBodyString += '<div class="dailyRateBodyLi"><div class="dailyRateBodyLiTittle">' + rItem.Date.substring(
							5, 10) + '</div><div class="dailyRateBodyLiContent">' + rItem.RetailRate + '</div></div>'
					}
				})
			}
			if(ProfileInfo.onlineStyle=="APPLE"){
				ImageUrl = res.ImageUrl == "" || res.ImageUrl == null ? "../../hotel/images/noPicture2.png" : res.ImageUrl;
			}else{
				ImageUrl = res.ImageUrl == "" || res.ImageUrl == null ? "../../hotel/images/BCDnoPicture.png" : res.ImageUrl;
			}
			var dailyRateText = hotelChooseInfo.LocalCurrency != "null" ? hotelChooseInfo.LocalDailyRate +
				'<span style="font-size:12px;margin-left:5px;">' + hotelChooseInfo.LocalCurrency + '</span>' : hotelChooseInfo.DailyRate +
				'<span style="font-size:12px;margin-left:5px;">CNY</span>'
			var showBedType = res.RoomInfos[0].BedType == null ? "hide" : "";
			$(".orderDetail").append(
				'\
                <div class="orderDetailBody"">\
                  <div class="orderHotelImg" style="background-image:url(' +
				ImageUrl + ')"></div>\
                  <div class="orderHotelName flexRow">' + res.Name +
				'<div class="reselection specificFontColor" style="font-size:14px;width:80px;line-height: 30px;cursor:pointer;margin-left:15px;">' +
				get_lan('orderDetail').reselection + '</div></div>\
                  <div class="orderHotelAddress">' + res.Address +
				'</div>\
                  <div class="orderHotelInfo">' + breakfast +
				'<span style="margin-left:20px;">Wi-Fi</span><span style="margin-left:20px;" class="' + showBedType + '">' +
				res.RoomInfos[0].BedType + '</span><span style="margin-left:20px;">' + res.RoomInfos[0].RoomName +
				'</span></div>\
                  <div class="orderCheckInDate flexRow"><div style="font-size:14px;width:80px;color:#404040;">' +
				get_lan('orderDetail').checkIn + '</div>' + queryKeySelect.split(',')[0] + ' ' + getWeek(queryKeySelect.split(
					',')[0]) +
				'</div>\
                  <div class="orderCheckOutDate flexRow"><div style="font-size:14px;width:80px;color:#404040;">' +
				get_lan('orderDetail').checkOut + '</div>' + queryKeySelect.split(',')[1] + ' ' + getWeek(queryKeySelect.split(
					',')[1]) + '</div>\
                  <div class="orderHotelDailyRate"><span style="font-size:13px;">' +
				get_lan('orderDetail').DailyRate + '</span><span class="hotelDailyRateText ' + rateUnderline + '">' +
				dailyRateText +
				'</span></div>\
                  <div class="dailyRateBody">\
                    <div class="dailyRateBodyTittle">' +
				get_lan('orderDetail').dailyRateBodyTittle1 + ' ' + RateStartDate + ' ' + get_lan('orderDetail').dailyRateBodyTittle2 +
				' ' + RateEndDate + get_lan('orderDetail').dailyRateBodyTittle3 + ' ' + res.RoomInfos[0].RatePlans[0].Rates.length +
				' ' + get_lan('orderDetail').dailyRateBodyTittle4 +
				'</div>\
                    <div class="dailyRateBodyContent flexWrap">\
                    ' +
				dailyRateBodyString +
				'\
                    </div>\
                  </div>\
                </div>\
            ')
			$(".hotelDailyRateText").hover(function() {
				if ($(this).hasClass("rateUnderline")) {
					$(".dailyRateBody").eq(0).css("display", "block");
				}
			}, function() {
				$(".dailyRateBody").css("display", "none");
			});
			$(".reselection").unbind("click").click(function() {
				window.history.go(-1);
			})
			var totalFareText = hotelChooseInfo.LocalCurrency != "null" ? '<span class="TotalFare">'+ hotelChooseInfo.LocalTotalFare +'</span>'+
				'<span style="font-size:12px;margin-left:5px;">' + hotelChooseInfo.LocalCurrency + '</span>' : '<span class="TotalFare">'+hotelChooseInfo.TotalFare +'</span>'+
				'<span style="font-size:12px;margin-left:5px;">CNY</span>'
			$(".totalFareBody").html('\
                <span style="font-size:13px;color:#000;margin-right:20px;">' +
				get_lan('totalFare') + '</span>' + totalFareText + '\
				<div class="hotelTips activeFontColor hide">'+get_lan('hotelTips')+'</div>\
              ')
			/*班车信息*/
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/QueryService.svc/QueryCompanyHotelShuttleBusPost",
					jsonStr: '{"request":{"id":' + netUserId + ',"language ":"' + obtLanguage + '","hotelId":"' + res.HotelLocalID +
						'","checkIn":"' + queryKeySelect.split(',')[0] + '","checkOut":"' + queryKeySelect.split(',')[1] + '"}}'
				},
				success: function(data) {
					var res = JSON.parse(data);
					console.log(res);
					if (res.code == 200) {
						if (res.infos.length > 0) {
							$(".shuttleBusInfo").removeClass('hide');
							res.infos.map(function(item, index) {
								$(".shuttleBusBodyList").append(
									'\
                                    <div class="shuttleBusBodyLi flexRow">\
                                        <input type="checkbox" class="checkBusDate" checked value="' +
									item.Date + '" index="' + index +
									'">\
                                        <div style="width:200px;">' + item.Date +
									'</div>\
                                        <select class="selectMorning" index="' + index +
									'"></select>\
                                        <div class="selectMorningText" style="width:382px;margin-left:33px">' +
									get_lan("shuttleBusBody").to+item.HotelBusList[0].Destination +
									'</div>\
                                        <select class="selectEvening" index="' + index +
									'"></select>\
                                        <div class="selectEveningText" style="width:230px;margin-left:35px">' +
									get_lan("shuttleBusBody").from+item.CompanyBusList[0].Departure +
									'</div>\
                                    </div>\
                                    ')
								item.HotelBusList.map(function(hItem) {
									$(".selectMorning").eq(index).append('\
                                        <option value="' +
										hItem.Destination + '" key="' + hItem.shuttleBusId + '">' + hItem.depTime +
										'</option>\
                                        ')
								})
								$(".selectMorning").eq(index).append('\
								    <option value="" key="">' + get_lan("shuttleBusBody").noNeed +
									'</option>\
								');
								item.CompanyBusList.map(function(cItem) {
									$(".selectEvening").eq(index).append('\
                                        <option value="' +
										cItem.Departure + '" key="' + cItem.shuttleBusId + '">' + cItem.depTime +
										'</option>\
                                        ')
								})
								$(".selectEvening").eq(index).append('\
								    <option value="" key="">' + get_lan("shuttleBusBody").noNeed +
									'</option>\
								');
								/*新增修改 2020-12-9*/
								$(".checkBusDate").eq(index).change(function(){
									if ($(this).is(':checked')) {
										$(".selectMorning").eq(index).removeAttr("disabled");
										$(".selectEvening").eq(index).removeAttr("disabled");
										$(".selectMorning").eq(index).find("option").eq(0).prop("selected",true);
										$(".selectEvening").eq(index).find("option").eq(0).prop("selected",true);
									} else {
										$(".selectMorning").eq(index).val('');
										$(".selectEvening").eq(index).val('');
										$(".selectMorning").eq(index).attr("disabled","disabled");
										$(".selectEvening").eq(index).attr("disabled","disabled");
									}
								})
								/*end*/
							})
							$(".selectMorning").change(function() {
								var index = parseInt($(this).attr("index"));
								$(".selectMorningText").eq(index).text(get_lan("shuttleBusBody").to+$(this).children('option:selected').val());
							})
							$(".selectEvening").change(function() {
								var index = parseInt($(this).attr("index"));
								$(".selectEveningText").eq(index).text(get_lan("shuttleBusBody").from+$(this).children('option:selected').val());
							})
							$(".shuttleBusBody").addClass("hide");
							$(".checkBusInput").change(function() {
								if ($(this).is(':checked')) {
									$(".shuttleBusBody").removeClass("hide");
								} else {
									$(".shuttleBusBody").addClass("hide");
								}
							})
						} else {
							// $(".shuttleBusInfo").remove();
							$(".shuttleBusInfo").addClass('hide');
						}
					} else {
						alert(res.message)
					}
				},
				error: function() {
					// alert('fail');
				}
			});
		},
		error: function() {
			// alert('fail');
		}
	});
}
/*需不需要信用卡*/
function needCreditCard(queryKeySelect) {
	$('body').mLoading("show");
	console.log("检查")
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/QueryService.svc/IsNeedCreditCardNewPost",
			jsonStr: '{"queryKey":"' + queryKeySelect + '","id":' + netUserId + ',"Language":"' + obtLanguage + '"}'
		},
		success: function(data) {
			$('body').mLoading("hide");
			var res = JSON.parse(data);
			console.log(res);
			if(ProfileInfo.NeedSpecialPolicy){
				$(".hotelReasonText").text(res.DisplayMessage);
			}
			if (!res.IsCentralFapiao) {
				$(".centralFapiao").remove();
				if(hotelChooseInfo.FuXunPayType == "公司支付" || hotelChooseInfo.FuXunPayType == "Central Pay"){
					$('.hotelTips').removeClass('hide') 
					$(".totalFareBody").css({"position":"relative","margin":"40px 0 60px 0px","text-align":"right","width":"100%"});
				}else{
					$(".totalFareBody").css("margin", "40px 0 60px 950px");
				}
			} else {
				$(".centralFapiao").removeClass("hide");
			}
			if (res.IsNeedCreditCard) {
				$(".creditCardInfo").removeClass("hide");
				$(".creditCardPolicyBody").html('');
				if (ProfileInfo.onlineStyle == "APPLE") {
					var canPolicyColor = "#4a4a4a"
				} else {
					var canPolicyColor = "#3083fb"
				}
				//4-23新增 添加信用卡担保类型
				function format(str){
					return str.toLocaleLowerCase().replace(/\s*/g,"");
				}
				if(res.AcceptedCreditCards!=null && res.AcceptedCreditCards.length>0 && ProfileInfo.onlineStyle!="APPLE"){
					$('.creditCardType').removeClass('hide')
					res.AcceptedCreditCards.map(function(item){
						if(format(item) ==format("AMERICAN EXPRESS") || format(item)==format("Diners") || format(item)==format("Union") || format(item)==format("JCB") || format(item)==format("Master") || format(item)==format("VISA") || format(item)==format("DISCOVER CARD")|| format(item)==format("WORLD BANK")){
							$('.creditCardTypeBody').append('<img src="./images/CreditCardType/'+format(item)+'.png">')
						}
					})
				}
				if (res.CanPolicy != "" && res.CanPolicy != null) {
					$(".creditCardPolicyBody").html('<span style="color:' + canPolicyColor + '">' + res.CanPolicy + '</span><br/>');
				}
				if (res.Policy != "" && res.Policy != null && ProfileInfo.onlineStyle != "APPLE") {
					$(".creditCardPolicyBody").append('<span style="color:#4a4a4a">' + res.Policy + '</span><br/>');
				}
				$(".creditCardPolicyBody").append('' + get_lan("cancelDateRemind"));
				if (!res.IsNeedCvv) {
					$(".creditCardCvv").remove();
				}
				if (!res.IsNeedDocumentNum) {
					$(".creditCardDocumentType").remove();
					$(".creditCardDocumentNumber").remove();
				}
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						// url: $.session.get('obtCompany') + "/SystemService.svc/GetCustomerCreditCardInfoPost",
						// jsonStr: '{"id":' + netUserId + ',"Language ":"' + obtLanguage + '","customerId":"' + $(".passengerLi").eq(0)
						// 	.attr("customerId") + '"}'
						url: $.session.get('obtCompany') + "/SystemService.svc/GetAllCreditCardInfoPost",
						jsonStr: '{"request":{"Id":'+netUserId+',"CustomerId":"'+ $(".passengerLi").eq(0).attr("customerId") +'","UseType":"1","Language ":"' + obtLanguage + '"}}'
					},
					success: function(data) {
						var res = JSON.parse(data);
						console.log(res);
						var CreditCardNumber = res.customerCCIs.length == 0 || res.customerCCIs[0].CreditCardNumber == null ? "" :
							tools.Decrypt(res.customerCCIs[0].CreditCardNumber);
						var CreditCardExpire = res.customerCCIs.length == 0 || res.customerCCIs[0].CreditCardExpire == null ? "" :
							res.customerCCIs[0].CreditCardExpire;
						// console.log(CreditCardNumber);

						var date = new Date(CreditCardExpire);
						Y = date.getFullYear() + '-';
						M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
						var format = Y + M
						if (CreditCardNumber != "") {
							$(".creditCardNumberInput").attr("CreditCardNumber", CreditCardNumber);
							$(".creditCardNumberInput").val("****************" + CreditCardNumber.substring(CreditCardNumber.length -
								4, CreditCardNumber.length));
							$(".creditCardDateInput").val(hideDocDate(ProfileInfo,format));
							$(".creditCardDateInput").attr("hideNo",format);
						}
					},
					error: function() {
						// alert('fail');
					}
				});
			} else {
				if (!$(".creditCardInfo").hasClass("hide")) {
					$(".creditCardInfo").addClass("hide");
				}
			}
			// if (res.ReasonCodes.length > 1) {
			if (res.ReasonCodes.length > 1) {
				// if (res.ReasonCodes[0].IsInPolicy && ProfileInfo.onlineStyle == "APPLE") {
				// 	$(".hotelReasonText").text('In Policy Reason:');
				// }
				// $(".hotelReasonSelect").html('<option value="">' + get_lan("hotelReasonRemind") + '</option>')
				// res.ReasonCodes.map(function(item) {
				// 	$(".hotelReasonSelect").append('\
    //                     <option value="' + item.Code + '">' + item.Des +
				// 		'</option>\
    //                     ')
				// })
				// $(".hotelReason").removeClass("hide");
				
				if($('.hotelReasonSelect').val()==undefined || $('.hotelReasonSelect').val()=='undefined'){
					if (res.ReasonCodes[0].IsInPolicy && ProfileInfo.onlineStyle == "APPLE") {
						$(".hotelReasonText").text('In Policy Reason:');
					}
					$(".hotelReasonSelect").html('<option value="">' + get_lan("hotelReasonRemind") + '</option>')
					res.ReasonCodes.map(function(item) {
						$(".hotelReasonSelect").append('\
					        <option value="' + item.Code + '" ReasonType="'+item.ReasonType+'">' + item.Des +
							'</option>\
					        ')
					})
					if(ProfileInfo.IsHideHotelReason!=true){
						//2020.12.08新权限
						//HotelNeedReasonCode，有这个profile权限的时候，弹框不弹出，预定界面的“原因”下拉框保留，且必填。
						$(".hotelReason").removeClass("hide");
						if(ProfileInfo.onlineStyle != "APPLE" && ProfileInfo.HotelNeedReasonCode == false){
							addRemark(res)
						}
					}

					/*SW酒店新增*/
					if(ProfileInfo.NeedSpecialPolicy){
						$(".hotelReasonSelect").unbind("change").change(function(){
							if($(".hotelReasonSelect option:selected").val() != ""){
								SWRemark(queryKeySelect,$(".hotelReasonSelect option:selected").val());
							}
						})
					}
					/*end*/
				}
				
			} else {
				$(".hotelReason").addClass("hide");
			}
			
			if (res.ReasonCodes.length == 1) {
				$(".bookHotelBtn").attr("reasoncode", res.ReasonCodes[0].Code);
			}
			clickReserveBtn(res); //点击预定按钮
		},
		error: function() {
			// alert('fail');
		}
	});
}
/*SW新增*/
function SWRemark(queryKey,policyCode){
	$('body').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/QueryService.svc/QuerySwHotelRemarkPost",
			jsonStr: '{"queryKey":"' + queryKey + '","policyCode":"' + policyCode + '","id":' +
				netUserId + ',"Language":"' + obtLanguage + '"}'
		},
		success: function(data) {
			var res = JSON.parse(data);
			console.log(res);
			var otherRemark = res;
			$('body').mLoading("hide");
			if(res.length>0){
				var CompanyId = $(".passengerLi").eq(0).attr("companyId");
				var CustomerID = $(".passengerLi").eq(0).attr("customerId");
				$('body').mLoading("show");
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/SystemService.svc/GetOrderCustomerRemark",
						jsonStr: '{"id":' + netUserId + ',"customerId":"' + CustomerID + '","companyID":"' + CompanyId + '"}'
					},
					success: function(data) {
						var res = JSON.parse(data);
						console.log(res);
						otherRemark.map(function(rItem){
							res.push(rItem);
						})
						$('body').mLoading("hide");
						openRemarkPop();
						remark(res, CustomerID, CompanyId, 'false');
					},
					error: function() {
						// alert('fail');
					}
				});
			}
		},
		error: function() {
			// alert('fail');
		}
	});
}
/*end*/
/*订单列表*/
function orderList() {
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/QueryService.svc/QueryTravelInCityPost",
			jsonStr: '{"cityCode":"' + JSON.parse($.session.get('searchHotelInfo')).queryKey.split(",")[0] + '","id":' +
				netUserId + ',"Language":"' + obtLanguage + '","type":"2"}'
		},
		success: function(data) {
			var res = JSON.parse(data);
			console.log(res);
			if (res.TripList.length != 0) {
				$(".orderList").removeClass("hide");
				$(".orderListBody").html('');
				res.TripList.map(function(item) {
					var liIcon;
					switch (item.Type) {
						case 1:
							liIcon = "planeIcon"
							break;
						case 4:
							liIcon = "trainIcon"
							break;
					}
					$(".orderListBody").append(
						'\
                  <div class="orderLi flexRow">\
                    <div class="' + liIcon +
						'"></div>\
                    <div class="flexRow"><div style="width:390px;margin-right:17px;">' + item.IneraryName +
						'</div><span style="margin-right:20px;">' + item.DepTime + '</span>-<span style="margin-left:20px;">' +
						item.ArrTime + '</span></div>\
                  </div>\
                  ');
				})
			}
		},
		error: function() {
			// alert('fail');
		}
	});
}
/*备注信息弹窗*/
function remarkInfoPop(CompanyID, CustomerID, employeeName, isFirst) {
	$('body').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/CurrentPassengersInOrderPost",
			jsonStr: '{"key":' + netUserId + ',"Language":"' + obtLanguage + '"}'
		},
		success: function(data) {
			$('body').mLoading("hide");
			var res = JSON.parse(data);
			console.log(res);
			if (res.length == 0) {
				$(".businessTripBody").html(
					'\
                    <div class="businessTripLi flexRow">\
                    <div class="tripLiTittle">' +
					get_lan('remarkPop').tripNameTittle + '</div>\
                    <div class="employeeName">' + employeeName +
					'</div>\
                    </div>\
                    <div class="businessTripLi flexRow">\
                    <div class="tripLiTittle">' +
					get_lan('remarkPop').tripCompanyTittle +
					'</div>\
                    <select class="chooseCompany">\
                    </select>\
                    </div>\
                    <div class="companyRemind hide">\
                      <div class="companyRemindTittle">' +
					get_lan('remarkPop').companyRemindTittle + '</div>\
                      <div class="companyRemindText">' +
					get_lan('remarkPop').companyRemindText + '</div>\
                    </div>\
                ')
				$('body').mLoading("show");
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/SystemService.svc/HasBGMCPost",
						jsonStr: '{"key":' + netUserId + ',"customerId":"' + CustomerID + '","Language":"' + obtLanguage + '"}'
					},
					success: function(data) {
						var res = JSON.parse(data);
						console.log(res);
						$('body').mLoading("hide");
						if (res.length == 0) {
							$(".businessTripLi").eq(1).hide();
						}
						res.map(function(item) {
							if (item.CompanyId == JSON.parse($.session.get('ProfileInfo')).companyId) {
								$(".chooseCompany").append('\
                                    <option value="' + item.CompanyId +
									'">' + item.CompanyName + '</option>\
                                ')
							}
						})
						res.map(function(item) {
							if (item.CompanyId != JSON.parse($.session.get('ProfileInfo')).companyId) {
								$(".chooseCompany").append('\
                                    <option value="' + item.CompanyId +
									'">' + item.CompanyName + '</option>\
                                ')
							}
						})
						$(".chooseCompany").change(function() {
							var changeCompanyId = $('.chooseCompany option:selected').val();
							if (changeCompanyId != $('.chooseCompany option').eq(0).val()) {
								$(".companyRemind").removeClass("hide");
							} else {
								$(".companyRemind").addClass("hide");
							}
							getNewRemark(CustomerID, changeCompanyId, isFirst)
						})
						getNewRemark(CustomerID, CompanyID, isFirst)
					},
					error: function() {
						// alert('fail');
					}
				});
			} else {
				$(".businessTripBody").html(
					'\
                    <div class="businessTripLi flexRow">\
                    <div class="tripLiTittle">' +
					get_lan('remarkPop').tripNameTittle + '</div>\
                    <div class="employeeName">' + employeeName +
					'</div>\
                    </div>\
                    ')
				getNewRemark(CustomerID, CompanyID, isFirst);
			}
		},
		error: function() {
			// alert('fail');
		}
	});

	function getNewRemark(CustomerID, CompanyId, isFirst) {
		$('body').mLoading("show");
		if($.session.get('TAnumber')){
			var queryKey = CustomerID+$(".orderDetail").attr("queryKey");
            tools.getTravelRequestRemark(netUserId,queryKey,function(data){
                var res = JSON.parse(data);
                console.log(res.Remarks);
                remark(res.Remarks,CustomerID,ProfileInfo.CompanyID,"true");
            })
        }else{
			if (isFirst == "true") {
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/SystemService.svc/GetRemarkConfigInfoNew",
						jsonStr: '{"request":{"customerId":' + CustomerID + ',"companyID":"' + CompanyId + '","key":' + netUserId +
							',"tripType":"HOTEL"}}'
					},
					success: function(data) {
						var res = JSON.parse(data);
						console.log(res);
						$('body').mLoading("hide");
						remark(res, CustomerID, CompanyId, isFirst);
					},
					error: function() {
						// alert('fail');
					}
				});
			} else if (isFirst == "false") {
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/SystemService.svc/GetOrderCustomerRemark",
						jsonStr: '{"id":' + netUserId + ',"customerId":"' + CustomerID + '","companyID":"' + CompanyId + '"}'
					},
					success: function(data) {
						var res = JSON.parse(data);
						console.log(res);
						$('body').mLoading("hide");
						remark(res, CustomerID, CompanyId, isFirst);
					},
					error: function() {
						// alert('fail');
					}
				});
			} else if (isFirst.split(',')[0] == "Residents") {
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/SystemService.svc/GetRemarkConfigInfo",
						jsonStr: '{"id":' + CustomerID + ',"companyID":"' + CompanyId + '","key":' + netUserId + '}'
					},
					success: function(data) {
						var res = JSON.parse(data);
						console.log(res);
						$('body').mLoading("hide");
						remark(res, CustomerID, CompanyId, isFirst);
					},
					error: function() {
						// alert('fail');
					}
				});
			}
		}
	}
	openRemarkPop();
}
function remark(remarks, CustomerID, CompanyID, isFirst) {
	$(".remarkInfoBody").html('');
    var redTips=false;
    remarks.map(function(item,index){
        var colorRed = item.Input.indexOf("4") != -1||item.Input==""?"":"colorRed";
        var starIcon = item.Input.indexOf("4") != -1||item.Input==""?"":"*";
        if(ProfileInfo.onlineStyle!="APPLE"){
            starIcon = "";
        }
        if(colorRed=="colorRed"){
            redTips=true
        }
        if(!item.CanModify){
            $(".remarkInfoBody").append('\
                <div class="remarkLi flexRow">\
                  <div id="liTittle'+item.Index+'" class="liTittle '+colorRed+'" title="'+item.Title+'">'+starIcon+item.Title+'</div>\
                  <div class="liContent" index="'+item.Index+'"><input id="remarkInput'+item.Index+'" class="remarkLiInput" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'" key="'+item.SubmitContent+'" disabled></div>\
                </div>\
            ')
        }else if(item.CanModify&&item.InList){
            if(!item.ListCanSearch){
                $(".remarkInfoBody").append('\
                    <div class="remarkLi flexRow">\
                      <div id="liTittle'+item.Index+'" class="liTittle '+colorRed+'" title="'+item.Title+'">'+starIcon+item.Title+'</div>\
                      <div class="liContent" index="'+item.Index+'">\
                        <select class="remarkSelect" index="'+index+'" id="remarkSelect'+item.Index+'">\
                          <option>'+get_lan("remarkPop").Choose+'</option>\
                        </select>\
                        <input id="remarkInput'+item.Index+'" class="remarkLiInput" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'" key="'+item.SubmitContent+'" readonly placeholder="'+get_lan("remarkPop").Choose+'">\
                      </div>\
                    </div>\
                ')
            }else{
                
                $(".remarkInfoBody").append('\
                    <div class="remarkLi flexRow">\
                      <div id="liTittle'+item.Index+'" class="liTittle '+colorRed+'" title="'+item.Title+'">'+starIcon+item.Title+'</div>\
                      <div class="liContent" index="'+item.Index+'">\
                        <select class="remarkSelect" index="'+index+'" id="remarkSelect'+item.Index+'">\
                          <option>'+get_lan("remarkPop").Choose+'</option>\
                        </select>\
                        <input class="remarkLiInput" CompanyID="'+CompanyID+'" id="remarkInput'+item.Index+'" require="'+colorRed+'" value="'+item.Content+'" index="'+item.Index+'"  key="'+item.SubmitContent+'" placeholder="'+get_lan("remarkPop").search+'">\
                      </div>\
                    </div>\
                ')
                $("#remarkInput"+item.Index+"").searchRemark();
            }
        }else if(item.CanModify&&!item.InList){
            $(".remarkInfoBody").append('\
                <div class="remarkLi flexRow">\
                  <div id="liTittle'+item.Index+'" class="liTittle '+colorRed+'" title="'+item.Title+'">'+starIcon+item.Title+'</div>\
                  <div class="liContent" index="'+item.Index+'">\
                    <select class="remarkSelect" index="'+index+'">\
                      <option>'+get_lan("remarkPop").Choose+'</option>\
                    </select>\
                    <input id="remarkInput'+item.Index+'" CompanyID="'+CompanyID+'" class="remarkLiInput" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'">\
                  </div>\
                </div>\
            ')
        }
    })
	// 红的提示字 是否显示
	if(!redTips && ProfileInfo.onlineStyle!="APPLE"){
		$('.colorRed').hide()
	}
	for (var i = 0; i < $(".remarkSelect").length; i++) {
		var index = parseInt($(".remarkSelect").eq(i).attr("index"));
		// console.log(index);
		if (remarks[index].Items.length != 0) {
			remarks[index].Items.map(function(item,itemIndex) {
				var itemValue = item.Value == null || item.Value == "" ? item.Key : item.Value;
				$(".remarkSelect").eq(i).append('\
					<option class="remarkOption" key="' + item.Key +
					'" index="' + index + '" itemIndex="' + itemIndex + '">' + itemValue + '</option>\
					')
			})
		} else {
			$(".remarkSelect").eq(i).hide();
		}

		// var inputIndex = parseInt($(".remarkSelect").eq(i).find("option:selected").attr("index"));
		// $(".remarkLiInput").eq(inputIndex).val($(".remarkSelect").eq(i).find("option:selected").text());
		$(".remarkSelect").eq(i).change(function() {
			var index = parseInt($(this).find("option:selected").attr("index"));
			$(".remarkLiInput").eq(index).val($(this).find("option:selected").text());
			$(".remarkLiInput").eq(index).attr('key', $(this).find("option:selected").attr("key"));
		})
	}
	//选择remark关联其他remark
	$(".remarkSelect").change(function() {
		// console.log($(this).find("option:selected").attr("key"));
		// console.log($(this).find("option:selected").attr("index"));
		var selectKey = $(this).find("option:selected").attr("key");
		var selectIndex = parseInt($(this).find("option:selected").attr("index"));
		var itemIndex = parseInt($(this).find("option:selected").attr("itemIndex"));
		remarks[selectIndex].RelatedRemarkList.map(function(rItem) {
			if (rItem.ChooseMainValue == selectKey) {
				var rIndex=rItem.SubRemarkIndex;
				rItem.SubRemarkRuleList.map(function(sItem) {
					$("#remarkInput" + rItem.SubRemarkIndex + "").val("");
					$("#remarkInput" + rItem.SubRemarkIndex + "").removeAttr("key");
					if (sItem.SubRemarkRule == 1) {
						// console.log(sItem)
						var colorRed = sItem.SubRemarkValue.indexOf("4") != -1 || sItem.SubRemarkValue == "" ? "" : "colorRed";
						if (colorRed == "") {
							$("#liTittle" + rItem.SubRemarkIndex + "").removeClass("colorRed");
							$("#remarkInput" + rItem.SubRemarkIndex + "").attr("require", "");
						} else if (colorRed == "colorRed") {
							$("#liTittle" + rItem.SubRemarkIndex + "").addClass("colorRed");
							$("#remarkInput" + rItem.SubRemarkIndex + "").attr("require", "colorRed");
						}
					} else if (sItem.SubRemarkRule == 2) {
						// $("#remarkInput"+rItem.SubRemarkIndex+"").val("");
						if (sItem.SubRemarkValue == "true") {
							// $("#remarkInput" + rItem.SubRemarkIndex + "").attr("placeholder", get_lan("remarkPop").search);
							$("#remarkInput" + rItem.SubRemarkIndex + "").removeAttr("disabled");
							$("#remarkSelect" + rItem.SubRemarkIndex + "").show();
							// $("#remarkInput" + rItem.SubRemarkIndex + "").searchRemark();
							// 12.13新增
							$("#remarkInput" + rItem.SubRemarkIndex + "").prev().removeAttr("disabled");
							//新增 判断是否有下拉搜索
							//$("#remarkInput" + rItem.SubRemarkIndex + "").attr("autocomplete",'off')
							var remarkObj={}
							remarks.map(function(remarkList){
								if(remarkList.Index==rIndex){
									remarkObj=remarkList
								}
							})
							if (remarkObj.InList) {
								$("#remarkInput" + rItem.SubRemarkIndex + "").attr("placeholder", get_lan("remarkPop").search);
								$("#remarkInput" + rItem.SubRemarkIndex + "").searchRemark();
							} else {
								$("#remarkInput" + rItem.SubRemarkIndex + "").attr("placeholder", "");
							}
							$('.liContent').map(function(){
								var i=$(this).attr('index')
								if(rItem.SubRemarkIndex==i){
									renderRight(i,"")
								}
							})
						} else if (sItem.SubRemarkValue == "false") {
							$("#remarkInput" + rItem.SubRemarkIndex + "").attr("placeholder", "");
							$("#remarkInput" + rItem.SubRemarkIndex + "").attr("disabled", "disabled");
							$("#remarkSelect" + rItem.SubRemarkIndex + "").hide();
							// 12.13新增
							$("#remarkInput" + rItem.SubRemarkIndex + "").prev().attr("disabled", "disabled");
						}
					}
				})
			}
		})
	})

	// 重新渲染 右侧select
	function renderRight(renderIndex,swRemark){
		var item=''
		remarks.map(function(renderItem){
			if(renderItem.Index==renderIndex){
				item=renderItem
			}
		})
		$('.liContent').map(function(liItem){
			var liIndex=$(this).attr("index")
			if(liIndex==item.Index){
				// item.CanModify 不再判断，默认为true
				 var colorRed = item.Input.indexOf("4") != -1||item.Input==""?"":"colorRed";
				if(item.InList){
				        if(!item.ListCanSearch){
				            $(this).html('\
				                    <select class="remarkSelect '+newSelect+'" index="'+index+'" id="remarkSelect'+item.Index+'">\
				                      <option>'+get_lan("remarkPop").Choose+'</option>\
				                    </select>\
				                    <input id="remarkInput'+item.Index+'" class="remarkLiInput '+newInput+'" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'" key="'+item.SubmitContent+'" readonly placeholder="'+get_lan("remarkPop").Choose+'">\
				            ')
				        }else{
				            $(this).html('\
				                    <select class="remarkSelect '+newSelect+'" index="'+index+'" id="remarkSelect'+item.Index+'">\
				                      <option>'+get_lan("remarkPop").Choose+'</option>\
				                    </select>\
				                    <input class="remarkLiInput '+newInput+'" CompanyID="'+CompanyID+'" id="remarkInput'+item.Index+'" require="'+colorRed+'" value="'+item.Content+'" index="'+item.Index+'"  key="'+item.SubmitContent+'" placeholder="'+get_lan("remarkPop").search+'">\
				            ')
				            $("#remarkInput"+item.Index+"").searchRemark();
				        }
				    }else if(!item.InList){
				        $(this).html('\
				                <select class="remarkSelect '+newSelect+'" index="'+index+'">\
				                  <option>'+get_lan("remarkPop").Choose+'</option>\
				                </select>\
				                <input id="remarkInput'+item.Index+'" CompanyID="'+CompanyID+'" class="remarkLiInput '+newInput+'" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'"key="">\
				        ')
				    }
				// 
				console.log($("#remarkSelect"+item.Index))
				item.Items.map(function(selectItem){
				    var itemValue = selectItem.Value==null||selectItem.Value==""?selectItem.Key:selectItem.Value;
					if(swRemark=="SWRemark"){
						$("#remarkSelect"+item.Index).append('\
								<option class="remarkOption" key="'+selectItem.Key+'" index="'+liIndex+'">'+itemValue+'</option>\
								')
					}else{
						$("#remarkSelect"+item.Index).append('\
							<option class="remarkOption" key="'+selectItem.Key+'" index="'+liIndex+'">'+itemValue+'</option>\
							')
					}
				})
				$("#remarkSelect"+item.Index).change(function(){
				    var index = parseInt($(this).find("option:selected").attr("index"));
				    $("#remarkInput"+item.Index).val($(this).find("option:selected").text());
				    $("#remarkInput"+item.Index).attr('key',$(this).find("option:selected").attr("key"));
				})
			}
		})
	}
		// end
	/*关闭remark*/
	$(".closeRemarkBtn").unbind("click").click(function() {
		closeRemarkPop();
		if($('.passengerLi').length<1){
			$.session.set('TAnumber','')
		}
		$(".selectPassengerArrow").click();
	})
	$(".sureRemarkBtn").unbind("click").click(function() {
		var remarks = '';
		var remarkCorrect = '';
		for (var i = 0; i < $(".remarkLiInput").length; i++) {
			if ($(".remarkLiInput").eq(i).attr("require") == "colorRed") {
				if ($(".remarkLiInput").eq(i).val() == "") {
					remarkCorrect += '1';
				}
			}
			if (!$(".remarkLiInput").eq(i).attr("key")) {
				remarks += $(".remarkLiInput").eq(i).attr("index") + '-' + $(".remarkLiInput").eq(i).val().split(',').join('##') +
					','
			}
			if ($(".remarkLiInput").eq(i).attr("key")) {
				remarks += $(".remarkLiInput").eq(i).attr("index") + '-' + $(".remarkLiInput").eq(i).attr("key").split(',').join(
					'##') + ','
			}
			// if($(".remarkLiInput").eq(i).attr("index")!= 10&&!$(".remarkLiInput").eq(i).attr("key")){
			//     remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).val()+',';
			// }
			// if($(".remarkLiInput").eq(i).attr("index")!= 10&&$(".remarkLiInput").eq(i).attr("key")){
			//     remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).attr("key")+',';
			// }
			// if($(".remarkLiInput").eq(i).attr("index")== 10){
			//     remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).val().split('-').join('@')+',';
			// }
		}
		if (remarkCorrect != '') {
			alert(get_lan("remarkPop").remarkRemind);
			$('body').mLoading("hide");
			return false;
		}
		var isCopy = false;
		$('body').mLoading("show");
		if (isFirst == "true") {
			// if((!JSON.parse($.session.get('ProfileInfo')).HasTravelRequest&&!$.session.get('TAnumber'))||JSON.parse($.session.get('ProfileInfo')).HotelNoNeedTR){
			if(!$.session.get('TAnumber')){
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/SystemService.svc/AddOrderCustomerPost",
						jsonStr: '{"key":' + netUserId + ',"customerId":"' + CustomerID + '","companyId":"' + CompanyID +
							'","remarks":"' + remarks.substring(0, remarks.length - 1) + '","isCopy":"' + isCopy + '","language":"' +
							obtLanguage + '"}'
					},
					success: function(data) {
						$('body').mLoading("hide");
						var res = JSON.parse(data);
						console.log(res);
						$(".orderDetail").attr("CompanyID", CompanyID);
						// console.log(queryKeys);
						if (res == "1") {
							closeRemarkPop();
							passengerPopChange(CustomerID, isFirst, 1);
						} else {
							alert(res);
						}
					},
					error: function() {
						// alert('fail');
					}
				});
			}else{
				var queryKey = $.session.get('TAnumber')+','+CustomerID;
				$.ajax(
				  {
					type:'post',
					url : $.session.get('ajaxUrl'), 
					dataType : 'json',
					data:{
						url: $.session.get('obtCompany')+"/SystemService.svc/AddTravelRequestCustomerPost",
						jsonStr:'{"id":'+netUserId+',"queryKey":"'+queryKey+'","remarks":"'+remarks.substring(0,remarks.length-1)+'","language":"'+obtLanguage+'"}'
					},
					success : function(data) {
						$('body').mLoading("hide");
						var res = JSON.parse(data);
						console.log(res);
						$(".orderDetail").attr("CompanyID", CompanyID);
						// console.log(queryKeys);
						if (res == "1") {
							closeRemarkPop();
							passengerPopChange(CustomerID, isFirst, 1);
						} else {
							alert(res);
						}
					},
					error : function() {
					  // alert('fail');
					}
				  } 
				);
			}
			
		} else if (isFirst == "false") {
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/SystemService.svc/ModifyOrderCustomerRemark",
					jsonStr: '{"key":' + netUserId + ',"customerId":"' + CustomerID + '","companyId":"' + CompanyID +
						'","remarks":"' + remarks.substring(0, remarks.length - 1) + '","isCopy":"' + isCopy + '"}'
				},
				success: function(data) {
					$('body').mLoading("hide");
					var res = JSON.parse(data);
					console.log(res);
					// console.log(queryKeys);
					if (res == "1") {
						closeRemarkPop();
						passengersInOrder();
					} else {
						alert(res);
					}
				},
				error: function() {
					// alert('fail');
				}
			});
		} else if (isFirst.split(',')[0] == "Residents") {
			var queryKey = isFirst.split(',')[1] + ',' + CustomerID;
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/SystemService.svc/SelectHotelLivingPost",
					jsonStr: '{"queryKey":"' + queryKey + '","remarks":"' + remarks.substring(0, remarks.length - 1) + '","id":' +
						netUserId + ',"Language":"' + obtLanguage + '"}'
				},
				success: function(data) {
					$('body').mLoading("hide");
					var res = JSON.parse(data);
					console.log(res);
					// console.log(queryKeys);
					if (res == "1") {
						closeRemarkPop();
						passengersInOrder();
					} else {
						alert(res);
					}
				},
				error: function() {
					// alert('fail');
				}
			});
		}
	})
	if (isFirst == "true" && $(".passengerBody").attr("state") == "true" && ProfileInfo.IsHideRemarkInput) {
		$(".sureRemarkBtn").click();
	}
}
/*隐藏证件信息*/
function hideDocument(profile,document,rid){
	if(profile.HideMyPersonalInfo&&document!=""){
		if(rid==1&&document.length>10){
			var starLength = document.length-10;
			var starString = "";
			for(var i=0;i<starLength;i++){
				starString += "*";
			}
			var DocumentNumber = document.substring(0,6)+starString+document.substring(document.length-4,document.length);
		}else if(document.length>3){
			var starLength = document.length-3;
			var starString = "";
			for(var i=0;i<starLength;i++){
				starString += "*";
			}
			var DocumentNumber = document.substring(0,1)+starString+document.substring(document.length-2,document.length);
		}else{
			var DocumentNumber = document;
		}
	}else{
		var DocumentNumber = document
	}
	
	return DocumentNumber;
}
/*end*/
/*隐藏邮箱*/
function hideEmail(profile,email){
	if(profile.HideMyPersonalInfo&&email!=""){
        var starLength = email.split("@")[0].length;
        var starString = "";
        for(var i=0;i<starLength-2;i++){
            starString += "*"
        }
        var profileEmail = email.substring(0,1)+starString+email.substring(starLength-1,starLength)+'@'+email.split("@")[1];
    }else{
        var profileEmail = email;
    }
    return profileEmail;
}
/*end*/
/*隐藏手机号*/
function hidePhones(profile,phone){
    if(profile.HideMyPersonalInfo&&phone!=""){
        var profilePhone = "*******"+phone.substring(phone.length-4,phone.length)
    }else{
        var profilePhone = phone;
    }
    return profilePhone;
}
/*end*/
/*隐藏证件有效期*/
function hideDocDate(profile,date){
    if(profile.HideMyPersonalInfo&&date!=""){
        var docDate = "****-**-**";
    }else{
        var docDate = date;
    }
    return docDate;
}
/*end*/
//旅客信息确认
function surePassengerInfo() {
	$('body').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/ProfilePost",
			jsonStr: '{"key":' + netUserId + '}'
		},
		success: function(data) {
			var passengerJson = JSON.parse(data);
			console.log(passengerJson);
			$(".orderDetail").attr("CompanyID", passengerJson.CompanyID);
			$(".popNameCnText").text(passengerJson.CustomerCN);
			$(".popNameEnText").text(passengerJson.CustomerEN);
			$(".popNameCn .popNameRadio").attr("PassengerName", passengerJson.CustomerCN);
			$(".popNameEn .popNameRadio").attr("PassengerName", passengerJson.CustomerEN);
			//无审批单
			if (!passengerJson.HasTravelRequest || passengerJson.HasTravelRequest) {
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/SystemService.svc/ShowMatchedPassengersPost",
						jsonStr: '{"goAirline":"null","backAirline":"null","newOrder":"0","key":' + netUserId + ',"Language":"' +
							obtLanguage + '"}'
					},
					success: function(data) {
						var res = JSON.parse(data);
						// console.log(res);
						$('body').mLoading("hide");
						//备注信息展示
						var employeeName = obtLanguage == "CN" ? passengerJson.CustomerCN : passengerJson.CustomerEN;
						if (!$.session.get('goOnBookOrderNo')&&!$.session.get('TACustomerId')) {
							remarkInfoPop(passengerJson.CompanyID, passengerJson.ID, employeeName, "true");
						} else if($.session.get('goOnBookOrderNo')){
							//继续预订
							$(".choosePassengerBody").hide();
							$('body').mLoading("show");
							var queryKey = "," + $(".orderDetail").attr("city") + "," + $(".orderDetail").attr("DateStart") + "," + $(
								".orderDetail").attr("DateReturn");
								
								var jsonStr={
									request:{
										"id":netUserId.split('"')[1],
										"bcn":$.session.get('goOnBookOrderNo'),
										"Language":obtLanguage,
										"itemID":"0",
										"queryKey":queryKey,
										"reginType":"",
										"dstCode":JSON.parse($.session.get('searchHotelInfo')).hotelCode,
									}
								}
							$.ajax({
								type: 'post',
								url: $.session.get('ajaxUrl'),
								dataType: 'json',
								// data: {
								// 	url: $.session.get('obtCompany') + "/SystemService.svc/BookInOneOrderPost",
								// 	jsonStr: '{"id":' + netUserId + ',"bcn":"' + $.session.get('goOnBookOrderNo') + '","Language":"' +
								// 		obtLanguage + '","itemID":"0","queryKey":"' + queryKey + '"}'
								// },
								data: {
									url: $.session.get('obtCompany') + "/SystemService.svc/BookInOneOrderNew",
									jsonStr: JSON.stringify(jsonStr)
								},
								success: function(data) {
									var res = JSON.parse(data);
									console.log(res);
									$(".passengerList").html('');
									if (res.Message) {
										$('body').mLoading("hide");
										alert(res.Message)
									} else {
										// res.Customers.map(function(item,index){
										//     $(".passengerList").append('\
										//         <div class="passengerLi flexRow" customerId="'+item.CustomerID+'">\
										//         <div class="passengerLiDiv" style="width:250px;padding-left:45px;box-sizing:border-box;"><span class="PassengerNameText">'+item.CustomerName+'</span></div>\
										//         <div class="passengerLiDiv passengerPhone" style="width:150px;">'+item.Phone+'</div>\
										//         <div class="passengerLiDiv" style="width:200px;">'+item.Email+'</div>\
										//         <div class="passengerLiDiv passengerLiDocuments" style="width:300px;"><select class="documentsSelect"></select></div>\
										//         </div>\
										//         \
										//         ')
										//     item.DocumentsDetail.map(function(ditem){
										//         $(".documentsSelect").eq(index).append('\
										//             <option value="'+ditem.Rid+'" docText="'+ditem.DocumentNumber+'">'+ditem.nameDoc+':'+ditem.DocumentNumber+'</option>\
										//         ')
										//     })
										// })
										// if(res.Customers.length>0){
										//     // if(obtLanguage=="EN"){
										//     //     $(".creditCardSurname").val(res.Customers[0].CustomerName.split("/")[0]);
										//     //     $(".creditCardGivenName").val(res.Customers[0].CustomerName.split("/")[1]);
										//     // }

										//     if($(".orderDetail").attr("HotelType")=="1B"||$(".orderDetail").attr("HotelType")=="4"||$(".orderDetail").attr("HotelType")=="3"||$(".orderDetail").attr("HotelType")=="HRS"){
										//             $(".creditCardSurname").val(res.Customers[0].NameEN.split("/")[0]);
										//             $(".creditCardGivenName").val(res.Customers[0].NameEN.split("/")[1]);
										//     }else{
										//         if(res.Customers[0].NameCN!=res.Customers[0].NameEN){
										//             $(".creditCardSurname").val(res.Customers[0].NameCN.substring(0,1));
										//             $(".creditCardGivenName").val(res.Customers[0].NameCN.substring(1,res.Customers[0].NameCN.length));
										//         }else{
										//             $(".creditCardSurname").val(res.Customers[0].NameCN.split("/")[0]);
										//             $(".creditCardGivenName").val(res.Customers[0].NameCN.split("/")[1]);
										//         }
										//     }
										// }
										// needCreditCard(queryKeySelect);/*需不需要信用卡*/
										// $(".lastestTime").removeClass("hide");
										// totalAmount();
										passengersInOrder("goOnBook");
									}
								},
								error: function() {
									// alert('fail');
								}
							});
						}else{
							$(".choosePassengerBody").hide();
						}
						//有代订权限
						if (res.length > 1) {
							//没有审批单权限，或者有审批单权限但是没有选择
							// if(!passengerJson.HasTravelRequest||(passengerJson.HasTravelRequest&&!$.session.get('TAnumber'))){
							if(!passengerJson.HasTravelRequest||(passengerJson.HasTravelRequest&&!$.session.get('TACustomerId'))){
								$(".choosePassengerBody").html('\
	                                <div style="min-width:110px;">' +
									get_lan('passengerInfo').choosePassenger +
									'</div>\
	                                <div class="selectPassengerBody">\
	                                <input type="text" class="selectPassengerInput" autocomplete="off" placeholder="' +
									get_lan('passengerInfo').selectPassengerRemind +
									'">\
	                                <div class="selectPassengerSearch btnBackColor">' + get_lan(
										'passengerInfo').selectPassengerSearch +
									'</div>\
	                                <div class="selectPassengerArrow">▼</div>\
	                                <div class="selectPassengerList autoScrollY"></div>\
	                                </div>\
	                                <span class="addNewCustomer hide">' +
									get_lan('passengerInfo').addNewCustomer + '</span>\
	                                ')
								$(".remarkFooter").html(
									'\
	                                <div class="closeRemarkBtn mainBackColor" style="margin-left:10%;">' +
									get_lan('remarkPop').cancel +
									'</div>\
	                                <div class="sureRemarkBtn btnBackColor" style="margin-left:38%;">' +
									get_lan('remarkPop').confirm + '</div>\
	                                ')
								closeRemarkPop();
								selectPassengers();
								/*添加新旅客*/
								$.ajax({
									type: 'post',
									url: $.session.get('ajaxUrl'),
									dataType: 'json',
									data: {
										url: $.session.get('obtCompany') + "/SystemService.svc/CheckAddNewCustomerPost",
										jsonStr: '{"language":"' + obtLanguage + '","id":' + netUserId + '}'
									},
									success: function(data) {
										var res = JSON.parse(data);
										console.log(res);
										if (res.CanAddNewCustomer) {
											$(".addNewCustomer").removeClass('hide');
											$(".addNewCustomer").unbind("click").click(function() {
												newCustomerPop(res.CompanyId);
												openNewCustomer();
											})
										} else {
											$(".addNewCustomer").remove();
										}
									},
									error: function() {
										// alert('fail');
									}
								});
							}else{
								closeRemarkPop();
								// alert($.session.get('TAnumber'));
								if($.session.get('TACustomerId')){
								    var TACustomerId = $.session.get('TACustomerId');
								    // alert(TACustomerId);
								}
								$(".remarkFooter").html('\
								    <div class="sureRemarkBtn btnBackColor" style="margin:0 auto;">'+get_lan('remarkPop').confirm+'</div>\
								')
								remarkInfoPop(TACustomerId.split(',')[1],TACustomerId.split(',')[0],TACustomerId.split(',')[2],"true");
							}
						}
						//无代订权限
						else {
							oneCustomer();
							// 有审批单权限
							var city=$('.orderDetail').attr('citycode')?$('.orderDetail').attr('citycode'):""
							if(passengerJson.HasTravelRequest&&!$.session.get('goOnBookOrderNo')&&!$.session.get('TAnumber') && !ProfileInfo.HotelNoNeedTR ){
							    var queryKey = passengerJson.ID+$(".orderDetail").attr("queryKey");
								//酒店不需要传city
								city=""
							    tools.customerTravelRequest(netUserId,queryKey,function(){
									$(".requestCover").remove();
									tools.getTravelRequestRemark(netUserId,queryKey,function(data){
                                        var res = JSON.parse(data);
                                        console.log(res.Remarks);
                                        remark(res.Remarks,passengerJson.ID,passengerJson.CompanyID,"true");
                                    })
							    },2,city)
							}
							
							function oneCustomer(){
							    $(".passengerBody").attr("state","true");
							    $(".choosePassengerBody").hide();
							    // $(".closeRemarkBtn").remove();
							    // $(".sureRemarkBtn").css("margin","0 auto");
							    $(".remarkFooter").html('\
							        <div class="sureRemarkBtn btnBackColor" style="margin:0 auto;">'+get_lan('remarkPop').confirm+'</div>\
							    ')
							}
						}
					},
					error: function() {}
				});
			} else {
				$('body').mLoading("hide");
			}
		},
		error: function() {
			// alert('fail');
		}
	});
}
/*代订*/
function selectPassengers() {
	$(".selectPassengerArrow").unbind("click").click(function() {
		if (!$(this).attr("spread") || $(this).attr("spread") == "no") {
			$(".selectPassengerList").html('\
                <div class="selectPassengerListTittle">' + get_lan(
				'passengerInfo').commonPassengers + '</div>\
                ')
			$('.selectPassengerList').mLoading("show");
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/SystemService.svc/GetCommonPassengersPost",
					jsonStr: '{"key":' + netUserId + ',"Language":"' + obtLanguage + '"}'
				},
				success: function(data) {
					$('.selectPassengerList').mLoading("hide");
					var res = JSON.parse(data);
					console.log(res);
					res.map(function(item) {
						var name = obtLanguage == "CN" ? item.NameCN : item.NameEN;
						$(".selectPassengerList").append(
							'\
                            <div class="selectPassengerLi ellipsis" CompanyID="' + item.CompanyID +
							'" searchId="' + item.ID + '" employeeName="' + item.NameCN + '">' + name + '(' + hideEmail(ProfileInfo,item.Email) + ')' +
							'</div>\
                            ')
					})
					clickPassengerLi();
				},
				error: function() {}
			});
			$(".selectPassengerList").css("display", "block");
			$(this).attr("spread", "yes");
		} else if ($(this).attr("spread") == "yes") {
			$(".selectPassengerList").css("display", "none");
			$(this).attr("spread", "no");
		}
	})
	$('.selectPassengerInput').bind('keypress', function(event) {
		if (event.keyCode == "13") {
			$(".selectPassengerSearch").click();
		}
	});
	$(".selectPassengerSearch").unbind("click").click(function() {
		$(".selectPassengerList").css("display", "block");
		$(".selectPassengerArrow").attr("spread", "yes");
		var queryKeys = obtLanguage + "," + $(".selectPassengerInput").val();
		$('.selectPassengerList').mLoading("show");

		// 有没有已选中乘客
		var haveCustomer = $('.passengerLi').length
		if (haveCustomer > 0) {
			var request = {
				key: netUserId.split("\"")[1],
				Language: queryKeys,
				GoAirline: "null",
				BackAirline: "null",
				NewOrder: '1',
				CompanyId: $('.passengerLi').eq(0).attr('companyid'),
				ReginType: "",
				DstCode: ""
			}
			var data = {
				url: $.session.get('obtCompany') + "/SystemService.svc/ShowMatchedPassengerList",
				jsonStr: '{"request":' + JSON.stringify(request) + '}'
			}
		} else {
			var request = {
				key: netUserId.split("\"")[1],
				Language: queryKeys,
				GoAirline: "null",
				BackAirline: "null",
				NewOrder: '1',
				CompanyId: "",
				ReginType: "",
				DstCode: ""
			}
			var data = {
				url: $.session.get('obtCompany') + "/SystemService.svc/ShowMatchedPassengerList",
				jsonStr: '{"request":' + JSON.stringify(request) + '}'
			}
			// var data={
			//        url: $.session.get('obtCompany')+"/SystemService.svc/ShowMatchedPassengersPost",
			//        jsonStr:'{"goAirline":"null","backAirline":"null","newOrder":"1","key":'+netUserId+',"Language":"'+queryKeys+'"}'
			//    }
		}
		console.log(data)
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: data,
			success: function(data) {
				$('.selectPassengerList').mLoading("hide");
				var res = JSON.parse(data);
				console.log(res);
				$(".selectPassengerList").html('');
				res.map(function(item) {
					var name = obtLanguage == "CN" ? item.NameCN : item.NameEN;
					$(".selectPassengerList").append(
						'\
                        <div class="selectPassengerLi ellipsis" CompanyID="' + item.CompanyID +
						'" searchId="' + item.ID + '" employeeName="' + item.NameCN + '">' + name + '(' + hideEmail(ProfileInfo,item.Email) + ')' +
						'</div>\
                        ')
				})
				clickPassengerLi();
			},
			error: function() {
				// alert('fail');
			}
		});
	})

	function clickPassengerLi() {
		$(".selectPassengerLi").unbind("click").click(function() {
			$('body').mLoading("show");
			$(".selectPassengerList").css("display", "none");
			var queryKey = $(this).attr("searchId") + ',2,' + JSON.parse($.session.get('searchHotelInfo')).hotelCityText + ',' +
				queryKeySelect.split(',')[0] + ',' + queryKeySelect.split(',')[1];
			var CompanyID = $(this).attr("CompanyID");
			// 12.17修改
			var haveCustomer = $('.passengerLi').length
			if (haveCustomer > 0) {
				console.log(CompanyID)
				console.log($('.passengerLi').eq(0).attr('companyid'))
				if (CompanyID != $('.passengerLi').eq(0).attr('companyid')) {
					var CNStr = "当前乘机人与其他乘机人不属于同一公司账户/支付方式不同，请分别预订。"
					var ENStr =
						"This traveler is not under the same company account/legal entity、or payment method with others. Please book separately."
					if (obtLanguage == "CN") {
						alert(CNStr)
					} else {
						alert(ENStr)
					}
					$('body').mLoading("hide");
					return false;
				}
			}

			var customerId = $(this).attr("searchId");
			var employeeName = $(this).attr("employeeName");
			$(".passengerBody").attr("state","true");
			// 有审批单权限
			// var city=$('.orderDetail').attr('citycode')?$('.orderDetail').attr('citycode'):""
			var city=""
			if(JSON.parse($.session.get('ProfileInfo')).HasTravelRequest&&$('.passengerLi').length==0 && !ProfileInfo.HotelNoNeedTR){
			    tools.customerTravelRequest(netUserId,queryKey,function(){
			        $(".requestCover").remove();
			        if($(".passengerLi").length == 0){
			            remarkInfoPop(CompanyID,customerId,employeeName,"true");
			        }else{
			            remarkInfoPop($(".passengerLi").eq(0).attr("companyId"),customerId,employeeName,"true");
			        }
			    },1,city)
			}else{
				//CheckCustomerHasTravelRequestPost更换为CheckCustomerHasTravelRequestWithOtherCitysPost  新增参数otherCitys，城市列表
			    // $.ajax(
			    //   {
			    //     type:'post',
			    //     url : $.session.get('ajaxUrl'),
			    //     dataType : 'json',
			    //     data:{
			    //         url: $.session.get('obtCompany')+"/SystemService.svc/CheckCustomerHasTravelRequestWithOtherCitysPost",
			    //         jsonStr:'{"queryKey":"'+queryKey+'","id":'+netUserId+',"Language":"'+obtLanguage+'","otherCitys":"'+city+'"}'
			    //     },
			    //     success : function(data) {
			    //         $('body').mLoading("hide");
			    //         var res = JSON.parse(data);
			    //         console.log(res);
			    //         if(res.Remarks.length != 0){
							
			                $(".passengerBody").attr("state","true");
			                if($(".passengerLi").length == 0){
			                    remarkInfoPop(CompanyID,customerId,employeeName,"true");
			                }else{
			                    remarkInfoPop($(".passengerLi").eq(0).attr("companyId"),customerId,employeeName,"true");
			                }
							
			    //         }
			    //     },
			    //     error : function() {
			    //     }
			    //   } 
			    // );
			}
		})
	}
}
/*个人信息弹窗*/
function passengerPop() {
	$(".PassengerPop").html('\
        <div class="passengerPopTittle tittleBackColor">' + get_lan('passengerPop').popTittle +
		get_lan('passengerPop').remind +
		'</div>\
        <div class="passengerPopList">\
        <div class="popChooseName">\
          ' + get_lan(
			'passengerPop').chooseName + '<span class="colorRed">' + get_lan('passengerPop').nameRemind +
		'</span>\
        </div>\
        <div class="popNameCn flexRow">\
        <input type="radio" name="popName" class="popNameRadio" checked><div style="width:105px;">' +
		get_lan('passengerPop').popNameCn +
		'</div><span class="popNameCnText"></span>\
        </div>\
        <div class="popNameEn flexRow">\
        <input type="radio" name="popName" class="popNameRadio"><div style="width:105px;">' +
		get_lan('passengerPop').popNameEn +
		'</div><span class="popNameEnText"></span>\
        </div>\
        <div class="popPhone flexRow">\
        <div style="width:130px;">' +
		get_lan('passengerPop').popPhone +
		'<span class="colorRed">*</span></div>\
        <input type="text" class="popPhoneInput" maxlength="11">\
        </div>\
        <div class="popMail flexRow">\
        <div style="width:130px;">' +
		get_lan('passengerPop').popMail +
		'<span class="colorRed">*</span></div>\
        <input type="text" class="popMailInput">\
        </div>\
        <div class="popDocuments flexRow">\
        <div style="width:130px;">' +
		get_lan('passengerPop').popDocuments +
		'<span class="colorRed">*</span></div>\
        <select class="popDocumentsSelect">\
          <option value="">' +
		get_lan('passengerPop').popDocumentsRemind +
		'</option>\
        </select>\
        <input type="text" class="popDocumentsInput" disabled>\
        </div>\
        <div class="popDocumentsTime flexRow hide">\
        <div style="width:130px;">' +
		get_lan('passengerPop').popDocumentsTime +
		'<span class="colorRed">*</span></div>\
        <input type="text" class="popDocumentsTimeInput" disabled placeholder="' +
		get_lan('passengerPop').timeRemind +
		'">\
        </div>\
        <div class="popFrequentFlierBody">\
        </div>\
        </div>\
        <div class="passengerPopBottom">\
          <div class="passengerPopBtn mainBackColor">' +
		get_lan('remarkPop').confirm + '</div>\
        <div>\
        ');
	if (ProfileInfo.onlineStyle == "APPLE") {
		$(".popPhoneInput").attr("readonly", "readonly");
		$(".popMailInput").attr("readonly", "readonly");
	}
	$(".popDocumentsTimeInput").datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		minDate: 0, // 当前日期之后的 0 天，就是当天
		hideIfNoPrevNext: true,
		showOtherMonths: true,
		selectOtherMonths: true,
	});
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/GetInformationsPost",
			jsonStr: '{"culture":"' + obtLanguage + '"}'
		},
		success: function(data) {
			var res = JSON.parse(data);
			console.log(res);
			res.DocumentTypeList.map(function(item) {
				$(".popDocumentsSelect").append('<option value="' + item.Rid + '">' + item.Name + '</option>');
				$(".creditCardDocumentTypeSelect").append('<option Rid="' + item.Rid + '">' + item.Name + '</option>');
			})
		},
		error: function() {
			// alert('fail');
		}
	});
}
/*添加新旅客弹窗*/
function newCustomerPop(CompanyId) {
	$(".newCustomerPop").html('\
        <div class="newCustomerPopTittle tittleBackColor">' + get_lan('passengerPop').popTittle +
		'</div>\
        <div class="passengerPopList">\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">' +
		get_lan('passengerPop').popNameCn +
		'</div>\
                <input type="text" class="newCustomerHalfInput newCustomerInputSurNameCn" placeholder="' +
		get_lan('newCustomerPop').surname +
		'">\
                <input type="text" class="newCustomerHalfInput newCustomerInputGivenNameCn" placeholder="' +
		get_lan('newCustomerPop').givenName +
		'" style="margin-left:8px;">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">' +
		get_lan('passengerPop').popNameEn +
		'</div>\
                <input type="text" class="newCustomerHalfInput newCustomerInputSurNameEn" placeholder="' +
		get_lan('newCustomerPop').surname +
		'">\
                <input type="text" class="newCustomerHalfInput newCustomerInputGivenNameEn" placeholder="' +
		get_lan('newCustomerPop').givenName +
		'" style="margin-left:8px;">\
            </div>\
            <div class="newCustomerLi flexRow">\
                <div style="width:105px;">' +
		get_lan('newCustomerPop').nick +
		'</div>\
                <input type="text" class="newCustomerInput newCustomerInputNick">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">' +
		get_lan('newCustomerPop').sex + '</div>\
                <div style="width:43px;text-align:center;">' + get_lan(
			'newCustomerPop').male +
		'</div>\
                <input type="radio" name="newPopSex" class="newPopSexRadio" checked sexValue="false">\
                <div style="width:43px;text-align:center;">' +
		get_lan('newCustomerPop').female +
		'</div>\
                <input type="radio" name="newPopSex" class="newPopSexRadio" sexValue="true">\
            </div>\
            <div class="newCustomerLi  require flexRow">\
                <div style="width:105px;">' +
		get_lan('passengerPop').popPhone +
		'</div>\
                <input type="text" class="newCustomerInput newCustomerInputPhone" maxlength="11">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">' +
		get_lan('passengerPop').popMail +
		'</div>\
                <input type="text" class="newCustomerInput newCustomerInputEmail">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">' +
		get_lan('passengerPop').popDocuments +
		'</div>\
                <select class="newPopDocumentsSelect">\
                  <option>' + get_lan(
			'passengerPop').popDocumentsRemind +
		'</option>\
                </select>\
                <input type="text" class="newCustomerInput newCustomerInputDocuments">\
            </div>\
            <div class="newCustomerLi require flexRow hide newCustomerTime">\
                <div style="width:105px;">' +
		get_lan('passengerPop').popDocumentsTime +
		'</div>\
                <input type="text" class="newCustomerInput newCustomerInputTime" readonly placeholder="' +
		get_lan('passengerPop').timeRemind +
		'">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">' +
		get_lan('newCustomerPop').nationality +
		'</div>\
                <input type="text" class="newCustomerInput newCustomerInputNationality" id="countryInput" autocomplete="off">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">' +
		get_lan('newCustomerPop').birthday +
		'</div>\
                <input type="text" class="newCustomerInput newCustomerInputBirthday" readonly value="1985-1-1">\
            </div>\
			<div class="newCustomerLi require flexRow remarkTips">\
			    <div style="width:100%;font-size: 12px;color: red;">'+get_lan('newCustomerPop').required+'</div>\
			</div>\
        </div>\
        <div class="newCustomerPopBottom flexRow">\
          <div class="newCustomerPopCancel" style="background-color:#979797;margin:16px 0 27px 30px;">' +
		get_lan('remarkPop').cancel + '</div>\
          <div class="newCustomerPopBtn" style="margin:16px 0 27px 190px;">' +
		get_lan('remarkPop').confirm + '</div>\
        <div>\
        ');
	// 隐藏必填项
	if(ProfileInfo.onlineStyle!="eTravel"){
		$(".remarkTips").remove()
	}
	$(".newCustomerPopCancel").unbind("click").click(function() {
		closeNewCustomer();
	})
	
	//验证身份证
	function testIDCard(){
		//证件类型
		var type=$('.newPopDocumentsSelect').val()//1身份证
		var IDcard = $('.newCustomerInputDocuments').val()
		var res = tools.testIdCard(IDcard)
		if(res.status==1 && type==1){
			$('.newCustomerInputBirthday').val(res.birthday)
			$('.newCustomerInputBirthday').attr('value',res.birthday)
		}
	}
	//获取身份证号
	$('.newCustomerInputDocuments').keypress(function(){
		setTimeout(testIDCard,10)
	})
	
	$("#countryInput").kuCity();
	$(".newCustomerInputTime").datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		changeYear: true,
		minDate: 0, // 当前日期之后的 0 天，就是当天
		hideIfNoPrevNext: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		yearRange:'c-50:c+50',//选择框，前后多少年
		beforeShow: function() {
			$('style').text('')
		},
	});
	$(".newCustomerInputBirthday").datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		changeYear: true,
		minDate: '1930-1-1', // 当前日期之后的 0 天，就是当天
		maxDate:0,
		yearRange:'c-50:c+50',//选择框，前后多少年
		hideIfNoPrevNext: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		beforeShow: function() {
			$('style').text('')
		},
	});
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/GetInformationsPost",
			jsonStr: '{"culture":"' + obtLanguage + '"}'
		},
		success: function(data) {
			var res = JSON.parse(data);
			console.log(res);
			res.DocumentTypeList.map(function(item) {
				$(".newPopDocumentsSelect").append('<option value="' + item.Rid + '">' + item.Name + '</option>');
			})
			$(".newPopDocumentsSelect").unbind("change").change(function() {
				if ($('.newPopDocumentsSelect option:selected').val() == 1) {
					$(".newCustomerTime").addClass("hide");
					testIDCard()
				} else {
					$(".newCustomerTime").removeClass("hide");
				}
			})
		},
		error: function() {
			// alert('fail');
		}
	});
	$(".newCustomerPopBtn").unbind("click").click(function() {
		// console.log($('.popNameRadio:checked').attr("PassengerName"));
		var regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		var regEmail2 = /^[\w\-]+@[a-zA-Z\d\-]+(\.[a-zA-Z]{2,8}){1,2}$/ig;
		if (!regPhone.test($(".newCustomerInputPhone").val())) {
			alert(get_lan('passengerPop').phoneRemind);
		} else if (!regEmail.test($(".newCustomerInputEmail").val()) && !regEmail2.test($(".newCustomerInputEmail").val())) {
			alert(get_lan('passengerPop').emailRemind);
		} else if ($(".newCustomerInputSurNameCn").val() == "" || $(".newCustomerInputGivenNameCn").val() == "" || $(
				".newCustomerInputSurNameEn").val() == "" || $(".newCustomerInputGivenNameEn").val() == "" || $(
				".newCustomerInputDocuments").val() == "" || !$("#countryInput").attr("code")) {
			alert(get_lan('passengerPop').clickRemind);
		} else if ($('.newPopDocumentsSelect option:selected').val() != 1 && $(".newCustomerInputTime ").val() == "") {
			alert(get_lan('passengerPop').clickRemind);
		} else {
			if ($(".newCustomerInputSurNameCn").val() == $(".newCustomerInputSurNameEn").val()) {
				var NameCN = $(".newCustomerInputSurNameCn").val() + '/' + $(".newCustomerInputGivenNameCn").val();
			} else {
				var NameCN = $(".newCustomerInputSurNameCn").val() + $(".newCustomerInputGivenNameCn").val();
			}
			var NameEN = $(".newCustomerInputSurNameEn").val() + '/' + $(".newCustomerInputGivenNameEn").val();
			var Nick = $(".newCustomerInputNick").val();
			var sex = $('.newPopSexRadio:checked').attr("sexValue");
			var phone = $(".newCustomerInputPhone").val();
			var email = $(".newCustomerInputEmail").val();
			var rid = $('.newPopDocumentsSelect option:selected').val();
			var documentTime = '';
			if (rid != 1) {
				documentTime = $(".newCustomerInputTime ").val();
			}
			var documentNumbers = $(".newCustomerInputDocuments").val();
			var nationality = $("#countryInput").attr("code");
			var birthday = $(".newCustomerInputBirthday").val();
			$('body').mLoading("show");
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/SystemService.svc/AddNewCustomerPost",
					jsonStr: '{"language":"' + obtLanguage + '","id":' + netUserId + ',"nameCn":"' + NameCN + '","nameEn":"' +
						NameEN + '","nickname":"' + Nick + '","gender":"' + sex + '","nation":"' + nationality + '","birthday":"' +
						birthday + '","NameS":"' + NameCN + '","email":"' + email + '","phoneNumber":"' + phone + '","groupIDs":"0"}'
				},
				success: function(data) {
					var res = JSON.parse(data);
					console.log(res);
					var customerId = res.data;
					var docInfo = rid + ',' + documentNumbers + ',' + nationality + ',' + documentTime;
					$.ajax({
						type: 'post',
						url: $.session.get('ajaxUrl'),
						dataType: 'json',
						data: {
							url: $.session.get('obtCompany') + "/SystemService.svc/AddNewCustomerInfoPost",
							jsonStr: '{"customerId":"' + customerId + '","id":' + netUserId +
								',"memberShipInfo":"","remarks":"","language":"' + obtLanguage + '","docInfo":"' + docInfo + '"}'
						},
						success: function(data) {
							var res = JSON.parse(data);
							console.log(res);
							$.ajax({
								type: 'post',
								url: $.session.get('ajaxUrl'),
								dataType: 'json',
								data: {
									url: $.session.get('obtCompany') + "/SystemService.svc/AddOrderCustomerPost",
									jsonStr: '{"key":' + netUserId + ',"companyId":"' + CompanyId + '","customerId":"' + customerId +
										'","remarks":"","isCopy":"false","language":"' + obtLanguage + '"}'
								},
								success: function(data) {
									$('body').mLoading("hide");
									var res = JSON.parse(data);
									console.log(res);
									if (res == "1") {
										closeNewCustomer();
										passengersInOrder("newCustomer");
									}
								},
								error: function() {
									// alert('fail');
								}
							});
						},
						error: function() {
							// alert('fail');
						}
					});
				},
				error: function() {
					// alert('fail');
				}
			});
		}
	})
}
/*个人信息弹窗修改*/
function passengerPopChange(customerId, isFirst, customerRid) {
	openPassengerPop();
	$('body').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/CurrentPassengersInOrderPost",
			jsonStr: '{"key":' + netUserId + ',"Language":"' + obtLanguage + '"}'
		},
		success: function(data) {
			$('body').mLoading("hide");
			var res = JSON.parse(data);
			console.log(res);
			console.log($(".popDocumentsSelect").length);
			res.map(function(item, index) {
				if (item.ID == customerId) {
					$(".popNameCnText").text(item.NameCN);
					$(".popNameEnText").text(item.NameEN);
					$(".popNameCn .popNameRadio").attr("PassengerName", item.NameCN);
					$(".popNameEn .popNameRadio").attr("PassengerName", item.NameEN);
					if(item.Phones !=null){
                        $(".popPhoneInput").val(hidePhones(ProfileInfo,item.Phones));
                        $(".popPhoneInput").attr("hideNo",item.Phones);
                    }
                    if(item.Email !=null){
                        $(".popMailInput").val(hideEmail(ProfileInfo,item.Email));
                        $(".popMailInput").attr("hideNo",item.Email);
                    }
					if (item.Documents.length != 0) {
						$(".popDocumentsSelect").val(item.Documents[0].Rid);
						// $(".popDocumentsInput").val(item.Documents[0].DocumentNumber);
                        /*隐藏证件信息*/
                        $(".popDocumentsInput").attr("hideNo",item.Documents[0].DocumentNumber);
                        $(".popDocumentsInput").val(hideDocument(ProfileInfo,item.Documents[0].DocumentNumber,item.Documents[0].Rid));
                        /*end*/
						$(".popDocumentsTimeInput").val(hideDocDate(ProfileInfo,item.Documents[0].docExpiryDate.substring(0,10)));
                        $(".popDocumentsTimeInput").attr("hideNo",item.Documents[0].docExpiryDate.substring(0,10));
						if (item.Documents[0].Rid != 1) {
							$(".popDocumentsTime ").removeClass("hide");
						}
					}
					$(".popDocumentsSelect").unbind("change").change(function() {
						if ($('.popDocumentsSelect option:selected').val() == 1) {
							$(".popDocumentsTime").addClass("hide");
						} else {
							$(".popDocumentsTime").removeClass("hide");
						}
						var ridList = [];
						item.Documents.map(function(ditem) {
							if ($('.popDocumentsSelect').val() == ditem.Rid) {
								// $(".popDocumentsInput").val(ditem.DocumentNumber);
                                /*隐藏证件信息*/
                                $(".popDocumentsInput").attr("hideNo",ditem.DocumentNumber);
                                $(".popDocumentsInput").val(hideDocument(ProfileInfo,ditem.DocumentNumber,ditem.Rid));
                                /*end*/
								if(ditem.DocNameCn!=null&&ditem.DocNameCn!=""){
								    $(".popNameCnText").text(ditem.DocNameCn);
								    $(".popNameCn .popNameRadio").attr("PassengerName",ditem.DocNameCn);
								}
								if(ditem.DocNameEn!=null&&ditem.DocNameEn!=""){
								    $(".popNameEnText").text(ditem.DocNameEn);
								    $(".popNameEn .popNameRadio").attr("PassengerName",ditem.DocNameEn);
								}
								
								if (ditem.docExpiryDate.length >= 10) {
									$(".popDocumentsTimeInput").val(hideDocDate(ProfileInfo,ditem.docExpiryDate.substring(0,10)));
                                    $(".popDocumentsTimeInput").attr("hideNo",ditem.docExpiryDate.substring(0,10));
								}
							}
							ridList.push(ditem.Rid);
						})
						if (ridList.indexOf($('.popDocumentsSelect').val()) <= -1) {
							$(".popDocumentsInput").val('');
						}
					})
					if (isFirst == "true") {
						$(".passengerPopBottom").html(
							'<div class="passengerPopBtn mainBackColor" style="margin:16px 0 27px 188px;">' + get_lan('remarkPop').confirm +
							'</div>')
						if (item.Phones != null && item.Email != null && item.Documents.length != 0) {
							closePassengerPop();
							passengersInOrder();
						}
					} else if (isFirst == "false") {
						item.Documents.map(function(ditem) {
							if (customerRid == ditem.Rid) {
								// $(".popDocumentsInput").val(ditem.DocumentNumber);
                                /*隐藏证件信息*/
                                $(".popDocumentsInput").attr("hideNo",ditem.DocumentNumber);
                                $(".popDocumentsInput").val(hideDocument(ProfileInfo,ditem.DocumentNumber,ditem.Rid));
                                /*end*/
								$(".popDocumentsSelect").val(customerRid);
								$(".popDocumentsTimeInput").val(hideDocDate(ProfileInfo,ditem.docExpiryDate.substring(0,10)));
                                $(".popDocumentsTimeInput").attr("hideNo",ditem.docExpiryDate.substring(0,10));
								//个人信息修改
								if(ditem.DocNameCn!=null&&ditem.DocNameCn!=""){
								    $(".popNameCnText").text(ditem.DocNameCn);
								    $(".popNameCn .popNameRadio").attr("PassengerName",ditem.DocNameCn);
								}else{
								    $(".popNameCnText").text(item.NameCN);
								    $(".popNameCn .popNameRadio").attr("PassengerName",item.NameCN);
								}
								if(ditem.DocNameEn!=null&&ditem.DocNameEn!=""){
								    $(".popNameEnText").text(ditem.DocNameEn);
								    $(".popNameEn .popNameRadio").attr("PassengerName",ditem.DocNameEn);
								}else{
								    $(".popNameEnText").text(item.NameEN);
								    $(".popNameEn .popNameRadio").attr("PassengerName",item.NameEN);
								}
							}
						})
						if (customerRid != 1) {
							$(".popDocumentsTime ").removeClass("hide");
						} else {
							$(".popDocumentsTime ").addClass("hide");
						}
						$(".passengerPopBottom").addClass("flexRow");
						$(".passengerPopBottom").html(
							'\
                            <div class="passengerPopCancel" style="background-color:#979797;margin:16px 0 27px 30px;">' +
							get_lan('remarkPop').cancel +
							'</div>\
                            <div class="passengerPopBtn mainBackColor" style="margin:16px 0 27px 190px;">' +
							get_lan('remarkPop').confirm + '</div>'
						)
						$(".passengerPopCancel").unbind("click").click(function() {
							closePassengerPop();
						})
					}
				}
			})
			$(".popPhoneInput,.popMailInput").unbind("focus").focus(function(){
                if($(this).attr("hideNo")){
                    $(this).val($(this).attr("hideNo"));
                }
            })
            $(".popPhoneInput").unbind("blur").blur(function(){
                var phoneNo = $(".popPhoneInput").val();
                $(".popPhoneInput").attr("hideNo",phoneNo);
                $(".popPhoneInput").val(hidePhones(ProfileInfo,phoneNo));
            })
            $(".popMailInput").unbind("blur").blur(function(){
                $(".popMailInput").attr("hideNo",$(".popMailInput").val());
                $(".popMailInput").val(hideEmail(ProfileInfo,$(".popMailInput").attr("hideNo")))
            })
			$(".passengerPopBtn").unbind("click").click(function() {
				// console.log($('.popNameRadio:checked').attr("PassengerName"));
				var regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				var regEmail2 = /^[\w\-]+@[a-zA-Z\d\-]+(\.[a-zA-Z]{2,8}){1,2}$/ig;
				var phoneInfo = $(".popPhoneInput").attr("hideNo")?$(".popPhoneInput").attr("hideNo"):$(".popPhoneInput").val();
                var emailInfo = $(".popMailInput").attr("hideNo")?$(".popMailInput").attr("hideNo"):$(".popMailInput").val();
                
                if(!regPhone.test(phoneInfo)){
                   alert(get_lan('passengerPop').phoneRemind);
                }else if(!regEmail.test(emailInfo) && !regEmail2.test(emailInfo)){
                    alert(get_lan('passengerPop').emailRemind);
				} else if (!$('.popNameRadio:checked').attr("PassengerName") || $(".popDocumentsInput").attr("hideNo") == "" || $(
						'.popDocumentsSelect option:selected').val() == "") {
					alert(get_lan('passengerPop').clickRemind);
				} else if ($('.popDocumentsSelect option:selected').val() != 1 && $(".popDocumentsTimeInput").val() == "") {
					alert(get_lan('passengerPop').clickRemind);
				} else {

					if ($('.popDocumentsSelect option:selected').val() == 1) {
						var docInfo = $('.popDocumentsSelect option:selected').val() + ',' + $(".popDocumentsInput").attr("hideNo") + ',,,,'
					} else {
						var docInfo = $('.popDocumentsSelect option:selected').val() + ',' + $(".popDocumentsInput").attr("hideNo") + ',,,,' +
							$(".popDocumentsTimeInput").attr("hideNo");
					}
					var memberShipInfo = '';
					$('body').mLoading("show");
					$.ajax({
						type: 'post',
						url: $.session.get('ajaxUrl'),
						dataType: 'json',
						data: {
							url: $.session.get('obtCompany') + "/SystemService.svc/CustomerInfoUpdateOrAddPost",
							jsonStr: '{"id":' + netUserId + ',"language":"' + obtLanguage + '","customerId":"' + customerId +
								'","emailInfo":"' + emailInfo + '","docInfo":"' + docInfo + '","phoneInfo":"' + phoneInfo +
								'","memberShipInfo":"' + memberShipInfo + '"}'
						},
						success: function(data) {
							$('body').mLoading("hide");
							var res = JSON.parse(data);
							console.log(res);
							if (res.message) {
								alert(res.message);
							} else {
								closePassengerPop();
								chooseNameAndDocument(customerId, $('.popNameRadio:checked').attr("PassengerName"), $(
									'.popDocumentsSelect option:selected').val(), '', '');
							}
						},
						error: function() {
							// alert('fail');
						}
					});
				}
			})
		},
		error: function() {
			// alert('fail');
		}
	});
}
//选择后的旅客订票姓名和证件号常旅客卡
function chooseNameAndDocument(customerId, orderName, documentRid, frequentCardsStart, frequentCardsReturn) {
	$('body').mLoading("show");
	var content = customerId + ',' + orderName + ',' + documentRid + ',' + frequentCardsStart + ',' + frequentCardsReturn;
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/AddUpdatedCustomerInfoPost",
			jsonStr: '{"id":' + netUserId + ',"content":"' + content + '","language":"' + obtLanguage + '","customerId":"' +
				customerId + '"}'
		},
		success: function(data) {
			$('body').mLoading("hide");
			var res = JSON.parse(data);
			console.log(res);
			if (res.code == 200) {
				passengersInOrder();
			}
		},
		error: function() {
			// alert('fail');
		}
	});
}
//订单内旅客
function passengersInOrder(customerState) {
	orderList(); /*未出行订单*/
	needCreditCard(queryKeySelect); /*需不需要信用卡*/
	$(".lastestTime").removeClass("hide");
	$(".lastestTimeSelect").change(function() {
		if ($(".lastestTimeSelect option:selected").val() == "24:00") {
			var s1 = '2201';
			var s2 = '-0041';
		} else {
			var a = parseInt($(".lastestTimeSelect option:selected").val().split(":")[0]);
			s1 = a - 2 + '01';
			s2 = a - 1 + '59';
		}
		var queryKeyNewList = queryKeySelect.split(',');
		queryKeyNewList[5] = s1;
		queryKeyNewList[6] = s2;
		var queryKeyNew = queryKeyNewList.join(',');
		console.log(queryKeyNew);
		needCreditCard(queryKeyNew);
	})
	$('body').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/GetPassengersInOrder",
			jsonStr: '{"request":{"key":' + netUserId + ',"Language":"' + obtLanguage + '","HotelChain":"' + $(".orderDetail")
				.attr("HotelChain") + '"}}'
			// 12.19 改回旧版,新接口貌似返回为空
			// url: $.session.get('obtCompany')+"/SystemService.svc/CurrentPassengersInOrderPost",
			// jsonStr:'{"key":'+netUserId+',"Language":"'+obtLanguage+'"}'
		},
		success: function(data) {
			// $('body').mLoading("hide");
			var res = JSON.parse(data);
			console.log(res);
			/*国籍*/
			res.map(function(item) {
				if (item.Nationality == "CN") {
					$(".bookHotelBtn").attr('nation', "cn");
				}
			})
			/*乘客信息*/
			$(".passengerList").html('');
			res.map(function(item, index) {
				var profilePhone = ProfileInfo.HideMyPersonalInfo&&item.Phones!=""?"*******"+item.Phones.substring(item.Phones.length-4,item.Phones.length):item.Phones;
				$(".passengerList").append('\
                    <div class="passengerLi flexRow" customerId="' + item.ID +
					'" companyId="' + item.OrderCompanyId +
					'">\
                    <div class="passengerLiDiv" style="width:250px;text-align:left;padding-left:45px;box-sizing:border-box;"><span class="PassengerNameText">' +
					item.NameCN + '</span><span class="changePassengerInfo specificFontColor" index="' + index +
					'" customerId="' + item.ID + '" style="margin-left:5px;cursor:pointer;">' + get_lan('passengerInfo').changePassengerInfo +
					'</span></div>\
                    <div class="passengerLiDiv passengerPhone" style="width:150px;" hideNo="'+item.Phones+'">'+profilePhone+'</div>\
                    <div class="passengerLiDiv" style="width:200px;">'+hideEmail(ProfileInfo,item.Email)+'</div>\
                    <div class="passengerLiDiv passengerLiDocuments" style="width:300px;"><select class="documentsSelect"></select></div>\
                    <div class="passengerLiDiv roommateName flexRow" style="width:170px;color:#1e66ae" index="' +
					index +
					'"></div>\
                    <div class="passengerLiDiv changeRemarkBtn specificFontColor" index="' +
					index + '"  style="width:125px;text-decoration: underline;cursor:pointer">' + get_lan('passengerInfo').remarks +
					'</div>\
                    <div><img src="../../css/images/delIcon.png" class="delIcon" style="margin-top:3px;cursor:pointer;position:absolute;left:5px;" customerId="' +
					item.ID + '"></div>\
                    </div>\
                    \
                    ')
				item.Documents.map(function(ditem) {
					var name = obtLanguage=="CN"?ditem.DocNameCn:ditem.DocNameEn;
					var cName = obtLanguage=="CN"?item.NameCN:item.NameEN;
					$(".documentsSelect").eq(index).append('\
                        <option value="' + ditem.Rid +
						'" docText="' + ditem.DocumentNumber + '" name="'+name+'" cName="'+cName+'" index="'+index+'" docDelId="'+ditem.delDocId+'">' + ditem.nameDoc + ':' + ditem.DocumentNumber +
						'</option>\
                    ')
					 
				})
				
				//2020-9-15 证件号修改，名字联动
				$(".documentsSelect").change(function(){
				    var name = $(this).children('option:selected').attr("name");
				    var cName = $(this).children('option:selected').attr("cName");
				    var index = parseInt($(this).children('option:selected').attr("index"));
				    if(name!="null"&&name!=""){
				        $(".PassengerNameText").eq(index).text(name);
				    }else{
				        $(".PassengerNameText").eq(index).text(cName);
				    }
				})
				//end
				if (item.UpdatedCustomerInfo != "" && item.UpdatedCustomerInfo != null) {
					var UpdatedCustomerList = item.UpdatedCustomerInfo.split(',');
					$(".PassengerNameText").text(UpdatedCustomerList[1]);
					$(".documentsSelect").val(UpdatedCustomerList[2]);
				}
			})
			//价格
			if(hotelChooseInfo.LocalCurrency != "null"){
				var allPrice = hotelChooseInfo.LocalTotalFare*res.length
			}else{
				var allPrice = hotelChooseInfo.TotalFare*res.length
			}
			$('.TotalFare').text(allPrice)
			if (res.length > 0) {
				if ($(".orderDetail").attr("HotelType") == "1B" || $(".orderDetail").attr("HotelType") == "4" || $(
						".orderDetail").attr("HotelType") == "3" || $(".orderDetail").attr("HotelType") == "HRS") {
					$(".creditCardSurname").val(res[0].NameEN.split("/")[0]);
					$(".creditCardGivenName").val(res[0].NameEN.split("/")[1]);
				} else {
					if (res[0].NameCN != res[0].NameEN) {
						$(".creditCardSurname").val(res[0].NameCN.substring(0, 1));
						$(".creditCardGivenName").val(res[0].NameCN.substring(1, res[0].NameCN.length));
					} else {
						$(".creditCardSurname").val(res[0].NameCN.split("/")[0]);
						$(".creditCardGivenName").val(res[0].NameCN.split("/")[1]);
					}
				}
			}
			/*添加同住人*/
			if (JSON.parse($.session.get('ProfileInfo')).HotelAddCohabitation) {
				$(".roommateName").html('<span class="roommateNameText" style="cursor:pointer;color:#041e5b;">[' + get_lan(
					'passengerInfo').chooseResidents + ']</span>');
				res.map(function(item, index) {
					var CabinCustomerName = item.CabinCustomerName == null ? "" : item.CabinCustomerName;
					if (CabinCustomerName != "") {
						$(".roommateNameText").eq(index).html(get_lan('passengerInfo').ResidentsName + CabinCustomerName);
						$(".roommateName").eq(index).append('<div class="delRoommateIcon" CabinCustomerId="' + item.CabinCustomerId +
							'">x</div>')
						$(".delRoommateIcon").unbind("click").click(function() {
							$.ajax({
								type: 'post',
								url: $.session.get('ajaxUrl'),
								dataType: 'json',
								data: {
									url: $.session.get('obtCompany') + "/SystemService.svc/DeleteHotelLivingPost",
									jsonStr: '{"customerid":"' + $(this).attr("CabinCustomerId") + '","id":' + netUserId +
										',"Language":"' + obtLanguage + '"}'
								},
								success: function(data) {
									var res = JSON.parse(data);
									console.log(res);
									passengersInOrder();
								},
								error: function() {
									// alert('fail');
								}
							});
						})
					}
				})
				$(".roommateNameText").unbind("click").click(function() {
					var index = parseInt($(this).parents().attr("index"));
					openRoommatePop();
					$(".roommatePop").html('<div class="roommatePopTittle tittleBackColor">' + get_lan('passengerInfo').chooseResidents +
						'<div class="closeRoommateIcon">x</div></div>\
                        <div class="roommatePopBody" style="height:300px;">\
                            <div class="flexRow">\
                                <input type="text" class="selectResidentsInput" placeholder="' +
						get_lan('passengerInfo').selectResidentsRemind +
						'">\
                                <div class="selectResidentsSearch">' + get_lan('passengerInfo').selectPassengerSearch +
						'</div>\
                            </div>\
                            <div class="selectResidentsList autoScrollY"></div>\
                        </div>\
                        '
					);
					$(".selectResidentsSearch").unbind("click").click(function() {
						if ($(".selectResidentsInput").val() != "") {
							$('.selectResidentsList').mLoading("show");
							var queryKey = $(".selectResidentsInput").val() + "," + $(".passengerLi").eq(index).attr("customerId");
							$.ajax({
								type: 'post',
								url: $.session.get('ajaxUrl'),
								dataType: 'json',
								data: {
									url: $.session.get('obtCompany') + "/SystemService.svc/SearchCustomerByNamePost",
									jsonStr: '{"queryKey":"' + queryKey + '","id":' + netUserId + ',"Language":"' + obtLanguage + '"}'
								},
								success: function(data) {
									$('.selectResidentsList').mLoading("hide");
									var res = JSON.parse(data);
									console.log(res);
									$(".selectResidentsList").html('');
									res.map(function(item) {
										$(".selectResidentsList").append(
											'\
                                            <div class="selectResidentsLi" CompanyID="' +
											item.CompanyID + '" searchId="' + item.ID + '" employeeName="' + item.NameCN + '">' + item.NameCN +
											'(' + item.NameEN + ')' + '(' + item.Email + ')' +
											'</div>\
                                            ')
									})
									clickResidentsLi();

									function clickResidentsLi() {
										$(".selectResidentsLi").unbind("click").click(function() {
											$('body').mLoading("show");
											closeRoommatePop();
											var queryKey = '2,' + $(this).attr("searchId") + ',' + JSON.parse($.session.get(
												'searchHotelInfo')).hotelCityText + ',' + queryKeySelect.split(',')[0] + ',' + queryKeySelect.split(
												',')[1];
											var CompanyID = $(this).attr("CompanyID");
											var customerId = $(this).attr("searchId");
											var employeeName = $(this).attr("employeeName");
											$.ajax({
												type: 'post',
												url: $.session.get('ajaxUrl'),
												dataType: 'json',
												data: {
													url: $.session.get('obtCompany') + "/SystemService.svc/CheckCustomerCanBeLivingPost",
													jsonStr: '{"queryKey":"' + queryKey + '","id":' + netUserId + ',"Language":"' + obtLanguage +
														'"}'
												},
												success: function(data) {
													$('body').mLoading("hide");
													var res = JSON.parse(data);
													console.log(res);
													var isFirst = "Residents," + $(".passengerLi").eq(index).attr("customerId");
													if (res.Remarks.length != 0) {
														remarkInfoPop(CompanyID, customerId, employeeName, isFirst);
													}
												},
												error: function() {}
											});
										})
									}
								},
								error: function() {
									// alert('fail');
								}
							});
						}
					})
					$(".closeRoommateIcon").unbind("click").click(function() {
						closeRoommatePop();
					})
				})
			}
			if($.session.get("TAnumber")){
                $(".delIcon").remove();
            }
			/*删除旅客*/
			$(".delIcon").unbind("click").click(function() {
				var customerId = $(this).attr("customerId");
				var delMsg = confirm(get_lan("passengerInfo").delMsg);
				if (delMsg == true) {
					$('body').mLoading("show");
					$.ajax({
						type: 'post',
						url: $.session.get('ajaxUrl'),
						dataType: 'json',
						data: {
							url: $.session.get('obtCompany') + "/SystemService.svc/DelPsgPost",
							jsonStr: '{"key":' + netUserId + ',"customerId":"' + customerId + '"}'
						},
						success: function(data) {
							$('body').mLoading("hide");
							var res = JSON.parse(data);
							console.log(res);
							if (res == "Success") {
								passengersInOrder();
							}
						},
						error: function() {
							// alert('fail');
						}
					});
				}
			})
			if ($(".choosePassengerBody").css("display") == "none") {
				$(".delIcon").remove();
			}
			$(".changePassengerInfo").unbind("click").click(function() {
				var customerId = $(this).attr("customerId");
				var index = parseInt($(this).attr("index"));
				var customerRid = $(".documentsSelect").eq(index).val();
				passengerPopChange(customerId, "false", customerRid);
				$("#cover").unbind("click").click(function() {
					closePassengerPop();
				})
			})
			$(".changeRemarkBtn").unbind("click").click(function() {
				var index = parseInt($(this).attr("index"));
				$("#cover").unbind("click");
				var CompanyID = res[index].OrderCompanyId;
				var customerId = res[index].ID;
				var employeeName = res[index].NameCN;
				remarkInfoPop(CompanyID, customerId, employeeName, "false");
			})
			if (customerState == "newCustomer") {
				$(".changeRemarkBtn").eq($(".changeRemarkBtn").length - 1).click();
			}
			/*苹果*/
			if ($(".passengerLi").length == 1 && ProfileInfo.onlineStyle == "APPLE") {
				$(".selectPassengerArrow,.selectPassengerSearch").unbind("click").click(function() {
					alert("There is already a traveler in the order.");
				})
			} else {
				$(".selectPassengerArrow").removeAttr("spread");
				selectPassengers();
			}
			/*常旅客卡*/
			if (!ProfileInfo.HideMeberShip) {
				if (ProfileInfo.onlineStyle == "APPLE") {
					if (res.length == 0) {
						$(".frequentCardsInfo").addClass("hide");
					}
					$(".frequentCardsBody").remove();
					$(".frequentCardsTittle").addClass("flexRow");
					if (res[0].HotelCards.length > 0) {
						$(".frequentCardsInfo").removeClass("hide");
						$(".frequentCardsTittle").append(':<select class="frequentCardsSelect" code="' + res[0].ID + '"></select>')
						// if(res[0].HotelCards[0].serviceType!=2){
						//     $(".frequentCardsSelect").eq(0).html('\
						//         <option value="">'+get_lan("frequentCardsInfo").remind+'</option>\
						//         ')
						// }
						res[0].HotelCards.map(function(hItem, hIndex) {
							console.log(hItem);
							var type = hItem.serviceType == 1 ? get_lan("frequentCardsInfo").air : get_lan("frequentCardsInfo").hotel;
							var code = hItem.serviceType == 2 ? hItem.SupplierCode : "";
							$(".frequentCardsSelect").eq(0).append('\
                                <option CardNumbers="' + hItem.CardNumbers +
								'" type="' + hItem.serviceType + '">' + type + code + hItem.CardNumbers +
								'</option>\
                            ')
						})
					} else {
						$(".frequentCardsInfo").addClass("hide");
					}
				} else {
					if (res.length == 0) {
						$(".frequentCardsInfo").addClass("hide");
					}
					$(".frequentCardsBody").html('');
					var showFrequentCard = false;
					var listIndex = 0;
					var cardIndex = 0;
					res.map(function(item, index) {
						var name = obtLanguage == "CN" ? item.NameCN : item.NameEN;
						if (item.HotelCards!=null && item.HotelCards.length > 0) {
							$(".frequentCardsBody").append(
								'\
                                \
                                <div class="frequentCardsList">\
                                  <div class="frequentCardsLi flexRow">\
                                      <div class="frequentCardsLiCompany">' +
								name + '-' + $(".orderDetail").attr("city") +
								'</div>\
                                      <div class="frequentCardsLiNumber">' + get_lan(
									"frequentCardsInfo").number + '<select class="frequentCardsSelect" code="' + item.ID + '" listIndex="' +
								listIndex +
								'"></select></div>\
                                    </div>\
                                </div>\
                            '
							)
							if (item.HotelCards[0].serviceType != 2) {
								$(".frequentCardsSelect").eq(listIndex).html('\
                                    <option value="">' +
									get_lan("frequentCardsInfo").remind + '</option>\
                                    ')
							}
							// if(item.HotelCards[0].serviceType==1){
							//     $(".frequentCardsLiCompany").eq(listIndex).text(name+'-'+get_lan("frequentCardsInfo").airMembership);
							// }else if(item.HotelCards[0].serviceType==2){
							//     $(".frequentCardsLiCompany").eq(listIndex).text(name+'-'+get_lan("frequentCardsInfo").hotelMembership);
							// }
							item.HotelCards.map(function(hItem, hIndex) {
								console.log(hItem);
								var type = hItem.serviceType == 1 ? get_lan("frequentCardsInfo").air : get_lan("frequentCardsInfo").hotel;
								var code = hItem.serviceType == 2 ? hItem.SupplierCode : "";
								$(".frequentCardsSelect").eq(listIndex).append(
									'\
                                    <option CardNumbers="' + hItem.CardNumbers + '" type="' + hItem
									.serviceType + '">' + type + code + hItem.CardNumbers + '</option>\
                                ')
								cardIndex++;
							})
							showFrequentCard = true;
							// $(".frequentCardsSelect").eq(listIndex).change(function(){
							//     var listIndex = $(this).attr("listIndex");
							//     if($(this).find("option:selected").attr("type")==1){
							//         $(".frequentCardsLiCompany").eq(listIndex).text(name+'-'+get_lan("frequentCardsInfo").airMembership);
							//     }else if($(this).find("option:selected").attr("type")==2){
							//         $(".frequentCardsLiCompany").eq(listIndex).text(name+'-'+get_lan("frequentCardsInfo").hotelMembership);
							//     }
							// })
							listIndex++;
						}
					})
					if (showFrequentCard) {
						$(".frequentCardsInfo").removeClass("hide");
					} else {
						$(".frequentCardsInfo").addClass("hide");
					}
					$(".frequentCardsLi").eq($(".frequentCardsLi").length - 1).css("border", "0");
				}
			}
			/*有审批单*/
			if($(".passengerLi").length==1&&$.session.get('TAnumber')){
			// if(JSON.parse($.session.get('ProfileInfo')).HasTravelRequest&&$(".passengerLi").length==1&&!JSON.parse($.session.get('ProfileInfo')).SelectNoTrOption){
			    $(".choosePassengerBody").addClass("hide");
			}else{
			    $(".choosePassengerBody").removeClass("hide");
			}
		},
		error: function() {
			// alert('fail');
		}
	});
}
//点击预订酒店
function clickReserveBtn(payRes) {
	$(".bookHotelBtn").unbind("click").click(function() {
		if ($.session.get('TAnumber')) {
			var customerList = '';
			for (var i = 0; i < $(".passengerLi").length; i++) {
				customerList += '"' + $(".passengerLi").eq(i).attr("customerId") + '"';
				customerList += ',';
			}
			customerList = customerList.substring(0, customerList.length - 1);
			$('body').mLoading("show");
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/OrderService.svc/CheckTripCompareTA",
					jsonStr: '{"request":{"key":' + netUserId + ',"TANo":"' + $.session.get('TAnumber') + '","Language":"' +
						obtLanguage + '","cityList":["' + $(".orderDetail").attr("cityCode") + '"],"timeList":["' + $(".orderDetail")
						.attr("DateStart") + '","' + $(".orderDetail").attr("DateReturn") + '"],"tripType":"2","customerList":[' +
						customerList + ']}}'
				},
				success: function(data) {
					var res = JSON.parse(data);
					console.log(res);
					// $('body').mLoading("hide");
					if (res.code == 200) {
						CheckHotelNeedRemaind(payRes);
					} else {
						alert(res.message);
					}
				},
				error: function() {
					// alert('fail');
				}
			});
		} else {
			CheckHotelNeedRemaind(payRes)
		}
	})
}
//检查超标支付
function CheckHotelNeedRemaind(payRes) {
	if ($(".IsCentralFapiao").length == 1 && !$('.IsCentralFapiao').is(':checked')) {
		alert(get_lan("centralFapiaoRemind"));
		return false;
	}
	$('body').mLoading("show");
	if ($(".hotelReasonSelect").length > 0 && ProfileInfo.IsHideHotelReason!=true) {
		if ($(".hotelReasonSelect option:selected").val() == "") {
			$('body').mLoading("hide");
			alert(get_lan("bookReasonRemind"));
			return false;
		}
	}
	if ($(".bookHotelBtn").attr('tw') == "no" && $(".bookHotelBtn").attr('nation') == "cn" && ProfileInfo.onlineStyle ==
		"APPLE") {
		if (obtLanguage == "CN") {
			alert("台湾的行程，请直接联系Apple Travel预订。");
		} else if (obtLanguage == "EN") {
			alert("For travel to Taiwan, please contact Apple Travel directly.");
		}
		$('body').mLoading("hide");
		return false;
	}
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/QueryService.svc/CheckHotelNeedRemaindAndPayPost",
			jsonStr: '{"queryKey":"' + queryKeySelect + '","id":' + netUserId + ',"Language":"' + obtLanguage + '"}'
		},
		success: function(data) {
			$('body').mLoading("hide");
			var res = JSON.parse(data);
			console.log(res);
			if (res.IsOk) {
				if (res.NeedRemaind) {
					alert(res.RemaindMessage);
					reserveHotel(res, payRes);
				} else {
					reserveHotel(res, payRes);
				}
			} else {
				alert(res.ErrMessage);
			}
		},
		error: function() {
			// alert('fail');
		}
	});
}
//预定酒店
function reserveHotel(res, payRes) {
	$('body').mLoading("show");
	if (payRes.IsNeedCvv) {
		var creditCardCvv = $('.creditCardCvvInput').val();
	} else {
		var creditCardCvv = '';
	}
	if ($(".bookHotelBtn").attr("reasoncode")) {
		var reasoncode = $(".bookHotelBtn").attr("reasoncode")
	} else if ($(".hotelReasonSelect").length > 0 && !$(".hotelReason").hasClass("hide")) {
		var reasoncode = $(".hotelReasonSelect option:selected").val();
		var swPolicyCode = $(".hotelReasonSelect option:selected").val()+','+$(".hotelReasonSelect option:selected").attr("ReasonType");
	} else {
		var reasoncode = '';
		var swPolicyCode = '';
	}
	if(ProfileInfo.IsHideHotelReason==true){
		reasoncode=""
	}
	console.log(reasoncode);
	// return false

	/*2020-2-13 加密*/
	// 加解密用到的密钥
	// function aesKeyBytes(key) {
	// 	var key_Int = new Int8Array(key);
	// 	var keyBytes = int8parse(key_Int);
	// 	return keyBytes;
	// }

	// function aesIvBytes(iv){
	// 	var key_Int = new Int8Array(iv);
	// 	var keyBytes = int8parse(key_Int);
	// 	return keyBytes;
	// }

	// function int8parse(u8arr) {
	// 	var len = u8arr.length;
	// 	var words = [];
	// 	for (var i = 0; i < len; i++) {
	// 		words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
	// 	}
	// 	return CryptoJS.lib.WordArray.create(words, len);
	// }
	// //加密方法
	// var key = aesKeyBytes(ProfileInfo.CCKey.split(","));
    // var iv = aesIvBytes(ProfileInfo.CCIV.split(","));
	// function Encrypt(word) {
	// 	var encrypted = CryptoJS.AES.encrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
	// 	return encrypted.toString();
	// }
	// function Decrypt(word) {
	// 	var decrypt = CryptoJS.AES.decrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
	// 	var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
	// 	return decryptedStr.toString();
	// }
	// console.log(Encrypt("411"));
	/*end*/

	if (payRes.IsNeedCreditCard && payRes.IsNeedDocumentNum) {
		if ($(".creditCardSurname").val() == "" || $(".creditCardGivenName").val() == "" || $(".creditCardNumberInput").val() ==
			"" || $(".creditCardDateInput").val() == "" || $(".creditCardDocumentNumberInput").val() == "") {
			alert(get_lan('passengerPop').clickRemind);
			$('body').mLoading("hide");
			return false;
		}
		if ($(".orderDetail").attr("HotelType") == "1B" || $(".orderDetail").attr("HotelType") == "4" || $(".orderDetail").attr(
				"HotelType") == "3" || $(".orderDetail").attr("HotelType") == "HRS") {
			var creditCardName = $(".creditCardSurname").val();
		} else {
			var han = /^[\u4e00-\u9fa5]+$/;
			if (!han.test($(".creditCardSurname").val())) {
				var creditCardName = $(".creditCardSurname").val() + '/' + $(".creditCardGivenName").val();
			} else {
				var creditCardName = $(".creditCardSurname").val() + $(".creditCardGivenName").val();
			}
		}
		var CreditCardNumber = $(".creditCardNumberInput").val().indexOf("*") != -1 ? $(".creditCardNumberInput").attr(
			"CreditCardNumber") : $(".creditCardNumberInput").val();
		
		CreditCardNumber=tools.Encrypt(CreditCardNumber);
		var creditCardKey = $(".passengerLi").eq(0).attr("customerId") + ',' + creditCardName + ',' + $(".documentsSelect").eq(
				0).val() + ',' + $('.creditCardDocumentNumberInput').val() + ',' + CreditCardNumber + ',' + parseInt($(
				'.creditCardDateInput').attr("hideNo").split('-')[0]) % 100 + ',' + parseInt($('.creditCardDateInput').attr("hideNo").split('-')[1]) +
			',' + '' + ',' + creditCardCvv;
		console.log(creditCardKey);
	} else if (payRes.IsNeedCreditCard && !payRes.IsNeedDocumentNum) {
		if ($(".creditCardSurname").val() == "" || $(".creditCardGivenName").val() == "" || $(".creditCardNumberInput").val() ==
			"" || $(".creditCardDateInput").val() == "") {
			alert(get_lan('passengerPop').clickRemind);
			$('body').mLoading("hide");
			return false;
		}
		// if($(".orderDetail").attr("HotelType")=="1B"||$(".orderDetail").attr("HotelType")=="4"||$(".orderDetail").attr("HotelType")=="3"||$(".orderDetail").attr("HotelType")=="HRS"){
		//     var creditCardName = $(".creditCardSurname").val();
		// }else{
		var han = /^[\u4e00-\u9fa5]+$/;
		if (!han.test($(".creditCardSurname").val())) {
			var creditCardName = $(".creditCardSurname").val() + '/' + $(".creditCardGivenName").val();
		} else {
			var creditCardName = $(".creditCardSurname").val() + $(".creditCardGivenName").val();
		}
		// }
		var CreditCardNumber = $(".creditCardNumberInput").val().indexOf("*") != -1 ? $(".creditCardNumberInput").attr(
			"CreditCardNumber") : $(".creditCardNumberInput").val();
		
		CreditCardNumber=tools.Encrypt(CreditCardNumber);
		var creditCardKey = $(".passengerLi").eq(0).attr("customerId") + ',' + creditCardName + ',' + "" + ',' + "" + ',' +
			CreditCardNumber + ',' + parseInt($('.creditCardDateInput').attr("hideNo").split('-')[0]) % 100 + ',' + parseInt($(
				'.creditCardDateInput').attr("hideNo").split('-')[1]) + ',' + '' + ',' + creditCardCvv;
		console.log(creditCardKey);
	} else {
		var creditCardKey = 'non_____';
		console.log(creditCardKey);
	}

	

	var preference = $('input[name="bedTypeRequirement"]:checked').val() + "," + $(
		'input[name="roomTypeRequirement"]:checked').val() + "," + $('input[name="otherRequirement"]:checked').val();
	if ($(".lastestTimeSelect option:selected").val() == "24:00") {
		var s1 = '2201';
		var s2 = '-0041';
	} else {
		var a = parseInt($(".lastestTimeSelect option:selected").val().split(":")[0]);
		if (a < 7) {
			var s1 = '2301';
			var s2 = '-0041';
		} else {
			s1 = a - 2 + '01';
			s2 = a - 1 + '59';
		}
	}
	if (res.NeedPay) {} else {
		var remarkKey = 'NO';
		var payInfo = 'NO';
		var changeHotelInfo = '';
		var changeHotelId = changeHotelInfo && changeHotelInfo != '' ? changeHotelInfo.split(',')[5] : '';
		var finalQueryKey = queryKeySelect.split(',')[0] + ',' + queryKeySelect.split(',')[1] + ',' + s1 + ',' + s2 + ',' +
			queryKeySelect.split(',')[2] + ',' + queryKeySelect.split(',')[4] + ',' + queryKeySelect.split(',')[3] + ',' +
			hotelChooseInfo.GuestType + ',' + hotelChooseInfo.TotalFare + ',' + reasoncode + ',,' + changeHotelId + ',false';
		console.log(finalQueryKey);
		if ($(".shuttleBusInfo").length == 1 && !$(".shuttleBusBody").hasClass("hide")) {
			var busInfo = '';
			for (var i = 0; i < $(".checkBusDate").length; i++) {
				if ($(".checkBusDate").eq(i).is(':checked')) {
					if ($(".checkBusMorning").is(':checked')) {
						if($(".selectMorning").eq(i).children('option:selected').attr("key")!=""){
							busInfo += $(".selectMorning").eq(i).children('option:selected').attr("key");
							busInfo += '_';
							busInfo += $(".checkBusDate").eq(i).val();
							busInfo += ',';
						}
					}
					if ($(".checkBusEvening").is(':checked')) {
						if($(".selectEvening").eq(i).children('option:selected').attr("key")!=""){
							busInfo += $(".selectEvening").eq(i).children('option:selected').attr("key");
							busInfo += '_';
							busInfo += $(".checkBusDate").eq(i).val();
							busInfo += ',';
						}
					}
				}
			}
		} else {
			var busInfo = '';
		}
		if (busInfo != '') {
			busInfo = busInfo.substring(0, busInfo.length - 1);
		}
		console.log(busInfo);
		/*常旅客卡*/
		var memberShipInfo = ""
		if ($(".frequentCardsSelect").length > 0 && !$(".frequentCardsInfo").hasClass("hide") && $(".frequentCardsSelect").val() !=
			"") {
			for (var i = 0; i < $(".frequentCardsSelect").length; i++) {
				if ($(".frequentCardsSelect").eq(i).find("option:selected").attr("cardnumbers") != "不使用常旅客卡" && $(
						".frequentCardsSelect").eq(i).find("option:selected").attr("cardnumbers") != "No Membership Card") {
							var memberStr=$(".frequentCardsSelect").eq(i).attr("code") + '-' + $(".frequentCardsSelect").eq(i).find(
						"option:selected").attr("type") + '-' + $(".frequentCardsSelect").eq(i).find("option:selected").attr(
						"cardnumbers")
						if(memberStr==""){
							// memberShipInfo += null;
							memberShipInfo += "";
						}else{
							memberShipInfo += memberStr;
						}
				}else{
					// memberShipInfo += null;
					memberShipInfo += "";
				}
				memberShipInfo += ',';
			}
			memberShipInfo = memberShipInfo.substring(0, memberShipInfo.length - 1);
		}
		console.log(memberShipInfo)
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/OrderService.svc/BookAllHotelPost",
				jsonStr: '{"request":{"queryKey":"' + finalQueryKey + '","preference":"' + preference + '","creditCardKey":"' +
					creditCardKey + '","remarkKey":"' + remarkKey + '","payInfo":"' + payInfo + '","id":' + netUserId +
					',"Language":"' + obtLanguage + '","busInfo":"' + busInfo + '","memberShipInfo":' + JSON.stringify(memberShipInfo.split(',')) + ',"swPolicyCode":"'+swPolicyCode+'"}}'
			},
			success: function(data) {
				$('body').mLoading("hide");
				var res = JSON.parse(data);
				console.log(res);
				if (res.ErrorMsg) {
					alert(res.ErrorMsg);
					if (res.State == '3' && res.OrderNo != '' && res.OrderNo != null) {
						var finishedInfo = {
							'orderNo': res.OrderNo,
						}
						$.session.set('finishedInfo', JSON.stringify(finishedInfo));
						window.location.href = '../../purchaseTrip/purchaseTrip.html';
					}
				} else {
					var orderNo = res.OrderNo;
					if($.session.get("TAnumber")&&!$.session.get("TAnumberIndex")){
						$.session.remove("TAnumber");
						$.session.remove("TACustomerId");
					}
					changeNewUid(orderNo);
					// if(ProfileInfo.onlineStyle=="APPLE"){
					//     var finishedInfo = {
					//         'orderNo':orderNo,
					//     }
					//     console.log($.session.get('finishedInfo'));
					//     $.session.set('finishedInfo', JSON.stringify(finishedInfo));
					//     window.location.href='../../purchaseTrip/purchaseTrip.html';
					// }else{
					//     /*订单号*/
					//     var searchOrderInfo = {
					//         'orderNo':orderNo,
					//     }
					//     $.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
					//     console.log($.session.get('searchOrderInfo'));
					//     // window.location.href='../../bookFinished/bookFinished.html';
					//     window.location.href='../../orders/orderDetails.html?state=finish';
					// }
					// // alert(get_lan('success'));
					// // var finishedInfo = {
					// //     'orderNo':res.OrderNo,
					// // }
					// // $.session.set('finishedInfo', JSON.stringify(finishedInfo));
					// // if(ProfileInfo.onlineStyle=="APPLE"){
					// //     window.location.href='../../purchaseTrip/purchaseTrip.html';
					// // }else{
					// //     window.location.href='../../bookFinished/bookFinished.html';
					// // }
					// // window.location.href='../../bookFinished/bookFinished.html';
				}
			},
			error: function() {
				// alert('fail');
			}
		});
	}
}

function changeNewUid(orderNo) {
	$('body').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/ChangeNewUid",
			jsonStr: '{"uid":' + netUserId + '}'
		},
		success: function(data) {
			$('body').mLoading("hide");
			var res = JSON.parse(data);
			console.log(res);
			var code = res.code;
			var data = '"' + res.data + '"';
			var message = res.message;
			console.log(code);
			console.log(data);
			console.log(message);
			if (code == 200) {
				$.session.set('netLoginId', data);
				if (ProfileInfo.onlineStyle == "APPLE") {
					var finishedInfo = {
						'orderNo': orderNo,
					}
					console.log($.session.get('finishedInfo'));
					$.session.set('finishedInfo', JSON.stringify(finishedInfo));
					window.location.href = '../../purchaseTrip/purchaseTrip.html';
				} else {
					/*订单号*/
					var searchOrderInfo = {
						'orderNo': orderNo,
					}
					$.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
					console.log($.session.get('searchOrderInfo'));
					// window.location.href='../../bookFinished/bookFinished.html';
					var TAnumberIndex=$.session.get('TAnumberIndex');
					if(TAnumberIndex != 1){
						$.session.remove("TAnumber")
					}
					window.location.href = '../../orders/orderDetails.html?state=finish';
				}
			} else if (code == 504) {
				if (obtLanguage == "EN") {
					alert('Login Timeout.')
				} else if (obtLanguage == "CN") {
					alert('您的账号已过期，请重新登陆。')
				}
				if (ProfileInfo) {
					window.location.href = ProfileInfo.loginOutUrl;
				}
			} else {
				alert(message)
			}
		},
		error: function() {
			// alert('fail');
		}
	});
}
//打开remark弹窗
function openRemarkPop() {
	$("#cover").show();
	$(".remarkPop").css("display", "block");
}

function closeRemarkPop() {
	$("#cover").hide();
	$(".remarkPop").css("display", "none");
}

function openPassengerPop() {
	$("#cover").show();
	$(".PassengerPop").css("display", "block");
}

function closePassengerPop() {
	$("#cover").hide();
	$(".PassengerPop").css("display", "none");
}
//打开关闭newCustomer弹窗
function openNewCustomer() {
	$("#cover").show();
	$(".newCustomerPop").css("display", "block");
}

function closeNewCustomer() {
	$("#cover").hide();
	$(".newCustomerPop").css("display", "none");
}
//打开关闭同住人弹窗
function openRoommatePop() {
	$("#cover").show();
	$(".roommatePop").css("display", "block");
}

function closeRoommatePop() {
	$("#cover").hide();
	$(".roommatePop").css("display", "none");
}
