var netUserId = $.session.get('netLoginId');
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
console.log(ProfileInfo)
var TAorderNo = $.session.get('TAorderNo');
var TAnumber = $.session.get('TAnumber');
var TAnumberIndex = $.session.get('TAnumberIndex');
// TA单，时间最小值，最大值
var TAminDate = 0,
	TAmaxDate = 365
// console.log($.session)

// 设置当前点击是订单还是待审核单
var btnIndex = 1
//防抖函数
function debounce(func, delay) {
	var delay = delay || 200;
	var timeout = null;
	return function () {
		clearTimeout(timeout);
		timeout = setTimeout(function(){
			func.apply(this, arguments);
		}, delay);
	};
}
//时间点为全天时,±几小时置灰
// 国内票
function GrayDepartPlusMinus() {
	if ($('#domDepartureSelect').val() == 'all') {
		$('#DepartPlusMinus').attr('disabled', 'disabled')
		$('#DepartPlusMinus').css('border-color', '#9b9b9b')
	} else {
		$('#DepartPlusMinus').removeAttr('disabled')
		$('#DepartPlusMinus').css('border-color', '#000')
	}
}

function GrayreturnPlusMinus() {
	if ($('#domReturnSelect').val() == 'all') {
		$('#returnPlusMinus').attr('disabled', 'disabled')
		$('#returnPlusMinus').css('border-color', '#9b9b9b')
		$('#returnPlusMinus').css('color', '#9b9b9b')
	} else {
		$('#returnPlusMinus').removeAttr('disabled')
		$('#returnPlusMinus').css('border-color', '#000')
		$('#returnPlusMinus').css('color', '#000')
	}
}
// 国际票
function GrayIntelDepartPlusMinus() {
	if ($('#intlDepartureSelect').val() == 'all') {
		$('#DepartPlusMinusintel').attr('disabled', 'disabled')
		$('#DepartPlusMinusintel').css('border-color', '#9b9b9b')
	} else {
		$('#DepartPlusMinusintel').removeAttr('disabled')
		$('#DepartPlusMinusintel').css('border-color', '#000')
	}
}

function GrayIntelreturnPlusMinus() {
	if ($('#intlReturnSelect').val() == 'all') {
		$('#returnPlusMinusintel').attr('disabled', 'disabled')
		$('#returnPlusMinusintel').css('border-color', '#9b9b9b')
		$('#returnPlusMinusintel').css('color', '#9b9b9b')
	} else {
		$('#returnPlusMinusintel').removeAttr('disabled')
		$('#returnPlusMinusintel').css('border-color', '#000')
		$('#returnPlusMinusintel').css('color', '#000')
	}
}
//语言转换
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
	//如果所选语言的json中没有此内容就选取其他语言显示
	if (t == undefined) t = cn[m];
	if (t == undefined) t = en[m];
	return t;
}
//中英文对象
var cn = {
	"tripRemind": "您有未完成的行程,是否继续?",
	"appleSearchRemind": "Hi Apple Travelers,\nPlease be aware that instant ticketing is now applicable for all online bookings.Please click OK to select your flights.",
	"appleIntlRemind": "国际票单程价格较贵，请确认是否继续查询？",
	'searchBody': {
		'airDom': '国内机票',
		'airIntl': '国际机票',
		'hotel': '酒店',
		'train': '火车',
		'car': '租车',
		'visa': '签证',
		'oneWay': '单程',
		'roundTrip': '往返',
		"Multiple": "多段",
		'from': '出发城市',
		'to': '到达城市',
		'departure': '出发城市',
		'arrival': '到达城市',
		'departureDate': '出发日期',
		'returnDate': '回程日期',
		'departureTime': '出发时间',
		'returnTime': '回程时间',
		'cabin': '舱位类型',
		'search': '搜索',
		'cabins': {
			// 'cabin1': '不限',
			'cabin1': '全部',
			'cabin2': '经济舱',
			'cabin3': '公务舱',
			'cabin4': '头等舱',
			'cabin5': '公务舱/头等舱',
			'cabin6': "超级经济舱",
		},
		'switch': '换',
		'trainNo': '车次查询',
		'trainNoText': '请输入查询车次',
		'hotelCity': '入住城市',
		'hotelCityInput': '请输入入住城市',
		'hotelCheckInDate': '入住日期',
		'hotelCheckOutDate': '离店日期',
		'hotelPrice': '金额',
		'all': '全部',
		'hotelAddress': '位置',
		'hotelRank': '酒店星级',
		'hotelKeyWords': '关键字',
		'hotelKeyInput': '(选填)酒店名/地标/商圈/地铁线',
		'keyWordRemind': '请先选择城市',
		'isDirect': '仅查询直飞',
		'codeShare': '代码共享航班',
		'addAirIntl': "添加航程",
		'multipleRemind': "请先填写完",
		'domHotel': "国内",
		'intlHotel': "国际",
		'allDay': "全天",
		'addTransit': "指定转机",
		'transit': "转机城市",
		'transitRemind': "转机城市(选填)",
		'carFrom': "取车地点",
		'carTO': "还车地点",
		'carFromDate': "取车日期",
		'carToDate': "还车日期",
		'carCompany': "租车公司",
	},
	'keyWordBody': {
		// 'hotel': '推荐酒店',
		'hotel': '热门酒店',
		'brand': '品牌',
		'district': '行政区',
		'commercial': '商圈',
		'extCommercial': '附属商圈',
		'keywordHotel': '热门',
		'keywordBrand': '品牌',
		'keywordDistrict': '行政区',
		'keywordCommercial': '商圈',
		'keywordExtCommercial': '附属商圈',
	},
	'searchRemind': '请正确填写！',
	'tableRemind': '您暂无有效订单!',
	'tableRemind2': '您暂无待审核订单!',
	'table': {
		'myOrders': '我的订单',
		'pendingApproval': '待审核订单',
		'more': '更多订单',
		'type': '类型',
		'orderNumber': '订单号',
		'traveler': '旅客',
		'roundTime': '行程时间',
		'shift': '班次',
		'price': '价格',
		'route': '行程',
		'status': '订单状态',
		"approval": "提交审核",
		"applyDate": "申请时间",
		"operation": "操作",
		"agree": "同意",
		"deny": "拒绝",
		"myTrips": '我的行程',
		"taTab": "审批单",
	},
	'expiration': '证件过期提醒',
	'footer': {
		'industryNews': '业界动态',
		'companyNews': '公司新闻',
		'scan': '扫一扫，了解更多',
		'WeChat': '微信公众号',
		'APP': 'APP下载',
	},
	'accountRemind': '账号过期，请重新登陆',
	'contactType': "技术支持，请联系 BCD helpdesk：021-61327099 &nbsp;9:00-18:00(工作日)",
}
var en = {
	"tripRemind": "You have unfinished trip, do you want to continue?",
	"appleSearchRemind": "Hi Apple Travelers,\nPlease be aware that instant ticketing is now applicable for all online bookings.Please click OK to select your flights.",
	"appleIntlRemind": "The fare of one-way ticket is expensive, would you like to continue?",
	'searchBody': {
		'airDom': 'Air Domestic',
		'airIntl': 'Air International',
		'hotel': 'Hotel',
		'train': 'Rail',
		'car': 'Car',
		'visa': 'Visa',
		'oneWay': 'One-way',
		'roundTrip': 'Round-trip',
		"Multiple": "Multiple",
		'from': 'From',
		'to': 'To',
		'departure': 'Departure',
		'arrival': 'Arrival',
		'departureDate': 'Departure',
		'returnDate': 'Return',
		'departureTime': 'Dep Time',
		'returnTime': 'Return Time',
		'cabin': 'Class',
		'search': 'Search',
		'cabins': {
			'cabin1': 'All Classes',
			'cabin2': 'Economy',
			'cabin3': 'Business',
			'cabin4': 'First',
			'cabin5': 'Business/First',
			'cabin6': "Economy Extra",
		},
		'switch': 'Switch',
		'trainNo': 'Train no.',
		'trainNoText': 'e.g K8410',
		'hotelCity': 'Destination',
		'hotelCityInput': 'Please enter the city for checking in.',
		'hotelCheckInDate': 'Check-in',
		'hotelCheckOutDate': 'Check-out',
		'hotelPrice': 'Price',
		'all': 'All',
		'hotelAddress': 'Location',
		'hotelRank': 'Rank',
		'hotelKeyWords': 'Key Words',
		'hotelKeyInput': 'Hotel Name/Landmark/Business Circle/Metro Line',
		'keyWordRemind': 'Please choose the city first.',
		'isDirect': 'Direct Flight',
		'codeShare': 'Codeshare',
		'addAirIntl': "Add Segment",
		'multipleRemind': "Please fill out first.",
		'domHotel': "Domestic",
		'intlHotel': "International/Regional",
		'allDay': "All Day",
		'addTransit': "Add Transit",
		'transit': "Transit",
		'transitRemind': "Transit(Optional)",
		'carFrom': "Pick-up",
		'carTO': "Drop-off",
		'carFromDate': "Pick-up Date",
		'carToDate': "Drop-off Date",
		// 'carCompany': "Car Company",
		'carCompany': "Car Rental Company",
	},
	'keyWordBody': {
		// 'hotel': 'Recommended Hotel',
		'hotel': 'Top hotels',
		'brand': 'Brand',
		'district': 'District',
		'commercial': 'Business Area',
		'extCommercial': 'Land Mark',
		'keywordHotel': 'Top',
		'keywordBrand': 'Brand',
		'keywordDistrict': 'District',
		'keywordCommercial': 'Business Area',
		'keywordExtCommercial': 'Land Mark',
	},
	'searchRemind': 'Please fill in correctly!',
	'tableRemind': 'You have no valid orders !',
	'tableRemind2': 'You have no pending approvals !',
	'table': {
		'myOrders': 'My Orders',
		'pendingApproval': 'Pending Approval',
		'more': 'More',
		'type': 'Type',
		'orderNumber': 'Order Number',
		'traveler': 'Traveler',
		'roundTime': 'Travel Time',
		'shift': '',
		'price': 'Price',
		'route': 'Route',
		'status': 'Status',
		"approval": "Submit Audit",
		"applyDate": "Apply Date",
		"operation": "Approval",
		"agree": "Approve",
		"deny": "Reject",
		"myTrips": 'My Trips',
		"taTab": "Application Form",
	},
	'expiration': 'Expiration',
	'footer': {
		'industryNews': 'Industry News',
		'companyNews': 'Company News',
		// 'scan': 'Scan to learn more',
		'scan': 'Learn more',
		// 'WeChat': 'WeChat Official Account',
		'WeChat': 'Official Account',
		'APP': 'App Download',
	},
	'accountRemind': 'Account expired, please re login.',
	'contactType': "For technical support, please contact BCD helpdesk：021-61327099 &nbsp;9:00-18:00(working day)",
}
if (ProfileInfo.onlineStyle == "APPLE") {
	cn.searchBody.hotelKeyInput = "酒店名/苹果办公点";
	en.searchBody.hotelKeyInput = "Hotel name or Apple point of interest";
	cn.appleIntlRemind = "对于国际票的行程的最佳运价，您应该选择“往返”。";
	en.appleIntlRemind = "For international return trips you should select 'Round-trip' for the best fares.";
	cn.contactType =
		"For technical support, please contact travelweb_china@apple.com <br>For reservation support, please contact travel.china@apple.com";
	en.contactType =
		"For technical support, please contact travelweb_china@apple.com <br>For reservation support, please contact travel.china@apple.com";
}
if (ProfileInfo.onlineStyle == "BCD") {
	cn.searchBody.airDom = "国内";
	en.searchBody.airDom = "Dom";
	cn.searchBody.airIntl = "国际/港澳台";
	en.searchBody.airIntl = "Rgl/Intl";
}
$(function() {
	if ($.session.get('goOnBookOrderNo')) {
		$.session.remove('goOnBookOrderNo');
	}
	if ($.session.get('goOnBookHotelInfo')) {
		$.session.remove('goOnBookHotelInfo');
	}
	showContent(); //内容展示
	searchBody(); //搜索部分
	myOrderTableInfo(); //我的订单
	showCompanyNews(ProfileInfo.companyId); //公司新闻
	GetCompanyImageInfos()//广告图片
	/*2020-10-9*/
	if(ProfileInfo.PointInfo&&ProfileInfo.PointInfo.PointRuleList){
		ProfileInfo.PointInfo.PointRuleList.map(function(item){
			if(item.PointTypeId==1&&(item.RegionType=="ALL"||item.RegionType=="D")&&(item.PointServiceType==0||item.PointServiceType==1)){
				if(obtLanguage=="CN"){
					$(".domPointsRemind").text("ⓘ 提前"+item.RuleValue+"天预订，您将获得"+item.PointValue+"积分");
					$(".domPointsRemind").removeClass("hide");
				}else if(obtLanguage=="EN"){
					$(".domPointsRemind").text("ⓘ Try to book "+item.RuleValue+" days in advance, to earn "+item.PointValue+" points");
					$(".domPointsRemind").removeClass("hide");
				}
			}
		})
		ProfileInfo.PointInfo.PointRuleList.map(function(item){
			if(item.PointTypeId==1&&(item.RegionType=="ALL"||item.RegionType=="I")&&(item.PointServiceType==0||item.PointServiceType==1)){
				if(obtLanguage=="CN"){
					$(".intlPointsRemind").text("ⓘ 提前"+item.RuleValue+"天预订，您将获得"+item.PointValue+"积分");
					$(".intlPointsRemind").removeClass("hide");
				}else if(obtLanguage=="EN"){
					$(".intlPointsRemind").text("ⓘ Try to book "+item.RuleValue+" days in advance, to earn "+item.PointValue+" points");
					$(".intlPointsRemind").removeClass("hide");
				}
			}
		})
	}
	/*end*/

	// showIndustryNews();//业界动态
	// $.ajax(
	//   {
	//     type:'post',
	//     url : $.session.get('ajaxUrl'), 
	//     dataType : 'json',
	//     data:{
	//         url: $.session.get('obtCompany')+"/SystemService.svc/ProfilePost",
	//         jsonStr:'{"key":'+netUserId+'}'
	//     },
	//     success : function(data) {
	//         var res = JSON.parse(data);
	//         console.log(res);
	//         // showCompanyNews(ProfileInfo.companyId);//公司新闻
	//         // showDocumentRemaind(res.ID);
	//         javaCalendar(res.ID);
	//     },
	//     error : function() {
	//       // alert('fail');
	//     }
	//   }
	// );
})
/*首页选择审批单*/
if (ProfileInfo.HasTravelRequest && ProfileInfo.IndexTravelRequest && !TAnumber && !$.session.get('TAsearchOnly')) {
	indexTANumber();
}else if(ProfileInfo.HasTravelRequest && !ProfileInfo.IndexTravelRequest){

}

function indexTANumber() {
	if ($.session.get('obtLanguage') == "CN") {
		var popTittle = "请选择您的申请单";
		var travelApplication = "差旅申请单";
		var applicationRemind = "当前没有审批单";
		var select = '选择';
		var searchOnly = '仅查询';
		var search = '搜索';
		var customer = '已选出行员工:';
		var selectPassengerRemind = '查找代订旅客 可输入姓名';
	} else {
		var popTittle = "Please select the application form";
		var travelApplication = "Travel Application Form";
		var applicationRemind = "Currently there is no travel request.";
		var select = 'Select';
		var searchOnly = 'Search Only';
		var search = 'Search';
		var customer = 'Customer:';
		var selectPassengerRemind = 'Enter First Name to search traveler';
	}
	$("body").append(
		'\
		<div class="requestCover" style="position: fixed;top: 0;left: 0;bottom: 0;right: 0;background: rgba(0, 0, 0, 0.7);z-index: 9999;">\
		<div class="travelRequestPop" style="position:relative;min-height: 500px;background-color: #fff;z-index: 101;position: fixed;top: 50%;left: 50%;transform: translate(-50%,-50%);border-radius: 10px;padding: 10px;font-family: Sans-serif,Arial,Verdana;">\
			<div class="travelRequestPopTittle" style="height:52px;color:#094B90;border-bottom:1px solid #e6e6e6;width: 100%;/*height: 80px;line-height: 80px;*/font-size: 20px;font-weight: 600;position: relative;box-sizing: border-box;text-align:center;font-family: Arial,Verdana;padding: 12px 0;">' +
		popTittle +
		'\
				<div id="closeTApop" ></div>\
			</div>\
			<div class="TAchoosePassenger flexRow"></div>\
			<div style="box-sizing: border-box;padding:10px;font-size: 15px;line-height:24px;height:410px;">\
			<div class="travelList" style="width:800px;height:40px;margin-left:30px;background:#F2F6FF;line-height:40px;font-size:16px;box-sizing:border-box;padding-left:20px;">' +
		travelApplication + 
		'<span class="TAselectedCustomer" style="margin-left:15px;color:#666666;font-size: 14px;" companyid="" customerid="" employeename=""></span>\
		</div>\
			<div class="travelApplicationList" style="width:800px;height:290px;margin-left:30px;overflow-y: auto;"></div>\
			<div class="travelApplicationBtn" style="cursor:pointer;width:150px;height:36px;margin:13px auto;text-align:center;line-height:36px;color:#fff;background:#041D5C;font-size:16px;border-radius:4px;">' +
		searchOnly + '</div>\
			</div>\
		</div>\
		</div>\
		')
	$("#closeTApop").unbind("click").click(function() {
		$(".requestCover").remove();
	})
	$(".travelApplicationBtn").unbind("click").click(function() {
		$.session.remove("TAnumber");
		$.session.remove("TAnumberIndex");
		$.session.remove("TACustomerId");
		$.session.set('TAsearchOnly', '1');
		location.reload();
	})
	if($.session.get("TACustomerId")){
		var TACustomerId = $.session.get("TACustomerId").split(",")[0];
		customerTARequest(TACustomerId);
	}else{
		customerTARequest(ProfileInfo.ID);
	}

	function customerTARequest(customerId) {
		$('body').mLoading("show");
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/SystemService.svc/GetCustomerTravelRequestPost",
				jsonStr: '{"customerId":"' + customerId + '","id":' + netUserId + ',"language":"' + $.session.get('obtLanguage') +
					'"}'
			},
			success: function(data) {
				$('body').mLoading("hide");
				var res = JSON.parse(data);
				console.log(res);
				$(".travelApplicationList").html('');
				if (res.message || res.customerTRs.length == 0) {
					// alert(res.Message);
					$(".travelApplicationList").append(
						'\
					<div class="applicationLi" style="width:778px;height:40px;line-height:40px;font-size:14px;box-sizing:border-box;padding-left:20px;">' +
						applicationRemind + '</div>\
					')
				} else if (res.customerTRs.length != 0) {
					res.customerTRs.map(function(item) {
						$(".travelApplicationList").append(
							'\
							<div class="applicationLi flexRow" style="width:778px;min-height:50px;line-height:50px;font-size:16px;box-sizing:border-box;padding-left:20px;position:relative;">\
							<div style="color:#1E66AE">' +
							item.TravelRequestNo + '</div>\
							<div style="margin-left:20px;">\
								<div>' + item.StartTime + '~' + item.EndTime +'</div>\
								<div style="font-size: 14px;color: #666666;line-height: 20px;"> '+ item.TravelRequestName +'</div>\
							</div>\
							<div style="margin-left:20px;">' + item.CityInfos[0].OrgCity + '~' + item.CityInfos[0].DstCity +
							'</div>\
							<div class="selectApplication" TravelRequestNo="' + item.TravelRequestNo +
							'" style="cursor:pointer;position:absolute;width:100px;height:30px;line-height:30px;color:#fff;top:10px;right:20px;background:#041D5C;text-align:center;border-radius:4px;">' +
							select + '</div>\
							</div>\
						')
					})
					$(".selectApplication").unbind("click").click(function() {
						var TravelRequestNo = $(this).attr("TravelRequestNo");
						// if (customerId != ProfileInfo.ID) {
						// 	$.session.set('TACustomerId', customerId);
						// }
						// if (customerId != ProfileInfo.ID) {
							if($(".TAselectedCustomer").attr("CustomerID")!=""){
								$.session.set('TACustomerId', $(".TAselectedCustomer").attr("CustomerID")+','+$(".TAselectedCustomer").attr("CompanyID")+','+$(".TAselectedCustomer").attr("employeeName"))
							}else{
								$.session.remove("TACustomerId");
							}
						// }

						$.session.set('TAnumber', TravelRequestNo);
						TAnumber = TravelRequestNo;
						// $.session.set('TAnumberIndex', '1');
						// TAnumberIndex = 1;
						$.session.remove("TAsearchOnly");
						// $(".requestCover").remove();
						location.reload();
					})
					if(ProfileInfo.HasTravelRequest && !ProfileInfo.IndexTravelRequest){
						$(".selectApplication").remove();
						$(".selectApplication").unbind("click");
					}
				}

			},
			error: function() {
				// alert('fail');
			}
		});
	}

	TAchooseCustomer('', function(data) {
		var res = JSON.parse(data);
		console.log(res);
		if (res.length > 1) {
			var profileName = obtLanguage == "CN" ? ProfileInfo.CustomerCN : ProfileInfo.CustomerEN;
			$(".TAchoosePassenger").html(
				'\
				<div style="width:230px;height:50px;font-size:14px;line-height:50px;margin-left:40px;display:none">' + customer +
				'<span class="TAselectedCustomer" style="margin-left:15px;" CompanyID="'+ProfileInfo.CompanyID+'" CustomerID="'+ProfileInfo.ID+'" employeeName="'+ProfileInfo.CustomerCN+'">' + profileName +
				'</span></div>\
				<div class="selectPassengerBody" style="width: 380px;height: 32px;margin-top: 10px;margin-left:40px;border: 1px solid #cccccc;border-radius: 4px;position: relative;">\
					<input type="text" class="selectPassengerInput" autocomplete="off" placeholder="'+selectPassengerRemind+'" style="width: 300px;height: 30px;border: 0;position: absolute;top: 0;left: 2px;outline: none;">\
					<div class="selectPassengerSearch btnBackColor" style="width: 80px;height: 26px;line-height: 26px;position: absolute;right: -135px;top: 3px;color: #fff;text-align: center;cursor: pointer;font-size: 14px;border-radius: 4px;">'+search+'</div>\
					<div class="selectPassengerArrow" style="width: 40px;height: 32px;line-height: 32px;position: absolute;right: 0;top: 0;color: #000;text-align: center;cursor: pointer;">▼</div>\
					<div class="selectPassengerList autoScrollY" style="width: 378px;height: 200px;position: absolute;top: 32px;left: 0;background-color: #fff;border: 1px solid #979797;z-index: 10;display: none;"></div>\
				</div>\
			'
			)
			//<select class="TAselect" style="width:130px;height:30px;margin:10px 0 0 20px;box-sizing:border-box;padding-left:20px;"></select>
			res.map(function(item) {
				var name = obtLanguage == "CN" ? item.NameCN : item.NameEN;
				if($.session.get("TACustomerId")){
					var TACustomerId = $.session.get("TACustomerId").split(",")[0];
					if(item.ID==TACustomerId){
						$(".TAselectedCustomer").text(name);
						$(".TAselectedCustomer").attr("CompanyID",item.CompanyID);
						$(".TAselectedCustomer").attr("CustomerID",item.ID);
						$(".TAselectedCustomer").attr("employeeName",item.NameCN);
					}
				}
				$(".selectPassengerList").append('\
				<div style="width: 100%;height: 40px;line-height: 40px;text-align: center;color: #000;font-size: 12px;cursor: pointer;" class="selectPassengerLi ellipsis" CompanyID="'+item.CompanyID+'" searchId="'+item.ID+'" employeeName="'+item.NameCN+'" name="'+name+'">'+name+'('+item.Email+')'+'</div>\
				')
			})
			clickPassengerLi();
			$(".selectPassengerArrow").unbind("click").click(function(){
				if(!$(this).attr("spread")||$(this).attr("spread")=="no"){
					$(".selectPassengerList").css("display","block");
					$(this).attr("spread","yes");
					$('.selectPassengerList').mLoading("show");
					TAchooseCustomer('', function(data) {
						var res = JSON.parse(data);
						console.log(res);
						if (res.length > 1) {
							res.map(function(item) {
								var name = obtLanguage == "CN" ? item.NameCN : item.NameEN;
								$(".selectPassengerList").append('\
								<div style="width: 100%;height: 40px;line-height: 40px;text-align: center;color: #000;font-size: 12px;cursor: pointer;" class="selectPassengerLi ellipsis" CompanyID="'+item.CompanyID+'" searchId="'+item.ID+'" employeeName="'+item.NameCN+'" name="'+name+'">'+name+'('+item.Email+')'+'</div>\
								')
							})
							$('.selectPassengerList').mLoading("hide");
							clickPassengerLi();
						}
					});
				}else if($(this).attr("spread")=="yes"){
					$(".selectPassengerList").css("display","none");
					$(this).attr("spread","no");
				}
			})
			$('.selectPassengerInput').bind('keypress',function(event){
				if(event.keyCode == "13")    
				{
					$(".selectPassengerSearch").click();
				}
		});
		$(".selectPassengerSearch").unbind("click").click(function(){
			$(".selectPassengerList").css("display","block");
			$(".selectPassengerArrow").attr("spread","yes");
			var nameLike = $(".selectPassengerInput").val();
			$('.selectPassengerList').mLoading("show");
			TAchooseCustomer(nameLike, function(data) {
				var res = JSON.parse(data);
				console.log(res);
				if (res.length >= 1) {
					res.map(function(item) {
						var name = obtLanguage == "CN" ? item.NameCN : item.NameEN;
						$(".selectPassengerList").append('\
						<div style="width: 100%;height: 40px;line-height: 40px;text-align: center;color: #000;font-size: 12px;cursor: pointer;" class="selectPassengerLi ellipsis" CompanyID="'+item.CompanyID+'" searchId="'+item.ID+'" employeeName="'+item.NameCN+'" name="'+name+'">'+name+'('+item.Email+')'+'</div>\
						')
					})
					$('.selectPassengerList').mLoading("hide");
					clickPassengerLi();
				}
			});
		})
		}else{
			//如果没有代订权限，或者有待定权限但是返回的为空
			var profileName = obtLanguage == "CN" ? ProfileInfo.CustomerCN : ProfileInfo.CustomerEN;
			$(".TAchoosePassenger").html(
				'\
				<div style="width:230px;height:50px;font-size:14px;line-height:50px;margin-left:40px;">' + customer +
				'<span class="TAselectedCustomer" style="margin-left:15px;" CompanyID="" CustomerID="" employeeName="">' + profileName +
				'</span></div>\
			'
			)
			$('.TAchoosePassenger').css({"position":"absolute","left":"-20000px","opacity":"0"})
		}
	});
	function clickPassengerLi(){
        $(".selectPassengerLi").unbind("click").click(function(){
            var customerId = $(this).attr("searchId");
			$(".TAselectedCustomer").text($(this).attr("name"));
			$(".TAselectedCustomer").attr("CompanyID",$(this).attr("CompanyID"));
			$(".TAselectedCustomer").attr("CustomerID",$(this).attr("searchId"));
			$(".TAselectedCustomer").attr("employeeName",$(this).attr("employeeName"));
			customerTARequest(customerId);
			$(".selectPassengerList").css("display","none");
        })
	}
	if(ProfileInfo.HasTravelRequest && !ProfileInfo.IndexTravelRequest){
		$(".travelApplicationBtn").remove();
	}
}

function TAchooseCustomer(nameLike, callback) {
	$('body').mLoading("show");
	$.ajax(
		{
		  type:'post',
		  url : $.session.get('ajaxUrl'),
		  dataType : 'json',
		  data:{
			  url: $.session.get('obtCompany')+"/SystemService.svc/QueryMatchedPassengersPost",
			  jsonStr:'{"nameLike":"'+nameLike+'","id":'+netUserId+',"language":"'+$.session.get('obtLanguage')+'"}'
		  },
		  success : function(data) {
			$('body').mLoading("hide");
			$(".selectPassengerList").html('');
			callback(data);
		},
		error: function() {
			// alert('fail');
		}
	});
}
/*end*/

//内容展示
function showContent() {
	//<img src="../index/images/bgImg.jpg" class="bgImg">
	// 19-10-29改
	var mailcontact1 = "For technical support, please contact ";
	var mailcontact2 = "For reservation support, please contact ";
	var mailAdress1 = 'travelweb_china@apple.com'
	var mailAdress2 = 'travel.china@apple.com'
	var appleStr = '<span class="footerContact">' + get_lan("contactType") + '</span>'

	if (ProfileInfo.onlineStyle == "APPLE") {
		appleStr = ''
		// +mailcontact1+'<a href="mailto:'+mailAdress1+'" target="_blank">'+mailAdress1 +'</a>'
		// appleStr='<span class="footerContact">'+mailcontact2+'<a href="mailto:'+mailAdress2+'" target="_blank">'+mailAdress2 +'</a>'+'</span>'
	}
	if (ProfileInfo.onlineStyle == "APPLE") {
		//苹果,不修改
	} else if (ProfileInfo.onlineStyle == "BCD") {
		//BCD,修改
	} else {
		//公版
	}
	// 主公司ID ProfileInfo.ChainCode: "NIKE"
	// 子公司id ProfileInfo.companyId: "XMVH",
	console.log('公司ID')

	// 添加banner的js<script type="text/javascript" src="../index/js/banner.js"></script>
	// 添加是这个格式
	// console.log(tools.isHasImg('../index/images/bgImg.jpg'))
	if(ProfileInfo.onlineStyle=="APPLE"){
		var TitleStr='<div class="pendTab mainFontColor hide" style="cursor:pointer;">' + get_lan('table').pendingApproval +'</div><div class="ApproveLengthIcon hide"></div>'
	}else{
		var TitleStr='<div class="pendTab mainFontColor hide" style="cursor:pointer;">' + get_lan('table').pendingApproval +'<div class="ApproveLengthIcon hide"></div></div>'
	}

	if(ProfileInfo.HideQRCode){
		var appDownloadBoxHtml = '';
	}else{
		var appDownloadBoxHtml = '<div class="QRgroup l" id="app_download_box">\
									<img src="./../staticFile/index/pic_appQR.png" alt="">\
									<div class="tac">'+get_lan('footer').APP+'</div>\
								</div>';
	}
	
	$("#main").html(
		'\
        <article>\
            <div style="position: relative;height: 340px;">\
                <div class="banner">\
                    <ul class="banner-img">\
                        <li><a href="#"><img id="test1" src="../staticFile/images/bgImg.jpg" class="bgImg"></a></li>\
                        <li><a href="#"><img id="test2" src="../staticFile/images/banner1.jpg" class="bgImg"></a></li>\
                        <li><a href="#"><img id="test3" src="../staticFile/images/banner2.jpg" class="bgImg"></a></li>\
                        <li><a href="#"><img id="test4" src="../staticFile/images/banner3.jpg" class="bgImg"></a></li>\
                        <li><a href="#"><img id="test5" src="../staticFile/images/banner4.jpg" class="bgImg"></a></li>\
                    </ul>\
                    <ul class="banner-circle"></ul>\
                </div>\
                <div class="bgShadow"></div>\
                <div class="bgBody">\
                    <div class="autoCenter">\
                      <div class="searchBody"></div>\
                    </div>\
                </div>\
            </div>\
            <div class="orderTittle flexRow autoCenter">\
                <div class="myOrderTab mainFontColor orderTittleActive" style="margin: 0 56px 0 13px;cursor:pointer;">' +
				get_lan('table').myOrders +
				'</div>'
                +TitleStr+
                '<span linkState="myOrders" class="moreOrderText">\
                    ' +
					get_lan('table').more +
					'\
                </span>\
                <img src="../index/images/rightArrow.png" class="rightArrow" linkState="myOrders"/>\
            </div>\
            <div class="autoCenter clearfix" >\
				<div class="autoScrollY" id="tableBody">\
				</div>\
				<div class="rightGroup" style="float: right;">\
					<div class="videoGroup" style=""> \
						<img class="videoImg" src=""/>\
						<div class="videoPlay"></div>\
					</div>\
					<div class="picGroup" style="height:274px;width:220px"><img class="picGroupImg" src="../staticFile/index.png"/><a class="picHref" href="javascript:volid(0);" target="_blank"></a></div>\
				</div>\
            </div>\
            <div class="reminder hide">\
                <div class="autoCenter">\
                    <span class="reminderText mainFontColor">' +
		get_lan('expiration') +
		'</span>\
                </div>\
            </div>\
        </article>\
		<footer class="indexFooter">\
		    <div class="autoCenter clearfix">\
		        <div class="newsBody ">\
							<div class="imgGroup l"><img src="./../staticFile/index/pic_news.png" alt=""></div>\
							<div class="newsGroup l">\
								<div class="newsList"></div>\
							</div>\
							<div class="QRright l clearfix">\
								<div class="screenText l" >'+get_lan('footer').scan+'</div>\
								<div class="QRgroup l">\
									<img src="./../staticFile/index/pic_weQR.png" alt="">\
									<div class="tac">'+get_lan('footer').WeChat+'</div>\
								</div>' +
								 appDownloadBoxHtml +
							 '</div>\
		        </div>\
		    </div>\
		</footer>\
    '
	)
	
	// 2020-03-09 弹框
	var tips = $.session.get('tipsNum')
	if (tips == 1 && ProfileInfo.reminderTitle != "") {
		$.session.set('tipsNum', 2)
		var title = ProfileInfo.reminderTitle
		var content = ProfileInfo.reminderContent
		$('body').append('<div id="cover2">' +
			'<div class="tipsGroup">' +
				'<div class="tipsDiv">'+
				'<div class="tipsTitle">' + title + '</div>' +
				'<div class="tipsContent">' + content + '</div>' +
				'<div class="tipsFoot clearfix"><div class="footBtn">Confirm</div></div>' +
				'<div>'+
			'</div>' +
			'</div>')
		// if (ProfileInfo.onlineStyle == "Apple" || ProfileInfo.onlineStyle == "APPLE") {
		// 	$(".footBtn").addClass('footBtnApple')
		// }
		if (obtLanguage == "CN") {
			$(".footBtn").text('确定')
		}
		// $('.tipsTitle').html(ProfileInfo.reminderTitle)
		// $('.tipsContent').html(ProfileInfo.reminderContent.toString())
		$('.footBtn').click(function() {
			$('#cover2').remove()
		})
	}
	/*end*/
	
	/*首页审批单*/
	if (ProfileInfo.HasTravelRequest && ProfileInfo.IndexTravelRequest) {
		// #F6AA25 改为 #041e5b
		if(ProfileInfo.onlineStyle=="APPLE"){
			$(".orderTittle").append(
				'\
			<div class="taTab mainFontColor" style="margin: 0 56px 0 53px;cursor:pointer;color:#041e5b;text-decoration: underline;">' +
				get_lan("table").taTab + '</div>\
			')
		}else{
			$(".orderTittle").append(
				'\
				<div class="srpitLine"></div>'+
			'<div class="taTab mainFontColor" style="margin: 0 56px 0 40px;cursor:pointer;color:#041e5b;">' +
				get_lan("table").taTab + '</div>\
			')
		}
	}
	if(ProfileInfo.HasTravelRequest && !ProfileInfo.IndexTravelRequest){
		$(".orderTittle").append(
			'\
			<div class="srpitLine"></div>'+
		'<div class="taTab mainFontColor" style="margin: 0 56px 0 40px;cursor:pointer;color:#041e5b;">' +
			get_lan("table").taTab + '</div>\
		')
	}
	$(".taTab").unbind("click").click(function() {
		indexTANumber();
	})
	/*end*/
	// var companyImg=ProfileInfo.companyId?ProfileInfo.companyId:ProfileInfo.ChainCode
	// advertiseCompany子公司
	if (ProfileInfo.advertiseCompany) {
		$(".banner-img").html('\
		   <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.companyId +
			'/banner1.jpg" class="bgImg"></a></li>\
		   <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.companyId +
			'/banner2.jpg" class="bgImg"></a></li>\
		   <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.companyId +
			'/banner3.jpg" class="bgImg"></a></li>\
		   <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.companyId +
			'/banner4.jpg" class="bgImg"></a></li>\
		   <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.companyId +
			'/banner5.jpg" class="bgImg"></a></li>\
		')
	}
	// advertiseChainCompany主公司
	else if (ProfileInfo.advertiseChainCompany) {	//Nina 20201224需求 如果advertiseCompany是true就不显示ChainCode得图片
		$(".banner-img").html('\
		    <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.ChainCode +
			'/banner1.jpg" class="bgImg"></a></li>\
		    <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.ChainCode +
			'/banner2.jpg" class="bgImg"></a></li>\
		    <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.ChainCode +
			'/banner3.jpg" class="bgImg"></a></li>\
		    <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.ChainCode +
			'/banner4.jpg" class="bgImg"></a></li>\
		    <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.ChainCode +
			'/banner5.jpg" class="bgImg"></a></li>\
		')
	}


	if (ProfileInfo.onlineStyle == "eTravel") {
		$(".banner-img").html(
			'\
            <li><a href="#"><img src="../staticFile/images/banner1_eTravel.jpg" class="bgImg"></a></li>\
            <li><a href="#"><img src="../staticFile/images/banner2_eTravel.jpg" class="bgImg"></a></li>\
            <li><a href="#"><img src="../staticFile/images/banner3_eTravel.jpg" class="bgImg"></a></li>\
            <li><a href="#"><img src="../staticFile/images/banner4_eTravel.jpg" class="bgImg"></a></li>\
            <li><a href="#"><img src="../staticFile/images/banner5_eTravel.jpg" class="bgImg"></a></li>\
        '
		)
	}
	if (ProfileInfo.onlineStyle == "APPLE") {
		$(".newsBody").remove();
		$("footer").css("height", "55px");
		// $("footer").css("padding-top","10px");
		$(".myOrderTab").text(get_lan("table").myTrips);
	}
	$(".etravelText").remove();
	if (ProfileInfo.onlineStyle == "eTravel") {
		$(".footerContact").remove();
	}
	if (ProfileInfo.NeedApproval) {
		$(".pendTab").removeClass("hide");
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/OrderService.svc/ApproveListPost",
				jsonStr: '{"id":' + netUserId + ',"Language":"' + $.session.get('obtLanguage') + '"}'
			},
			success: function(data) {
				if (data != '') {
					var res = JSON.parse(data)
					console.log(res);
					var approveList = [];
					res.map(function(item) {
						if (!item.IsHistory) {
							approveList.push(item);
						}
					})
					if (approveList.length == 0) {
						$(".ApproveLengthIcon").addClass("hide");
					} else {
						$(".ApproveLengthIcon").removeClass("hide");
						$(".ApproveLengthIcon").text(approveList.length);
					}
				} else {
					// alert(get_lan('accountRemind'));
				}
			},
			error: function() {
				// alert('fail');
			}
		});
	}
	if (ProfileInfo.NoQueryOrder) {
		$(".moreOrderText").hide();
		$(".rightArrow").hide();
	}
	//点击我的订单，待审核订单
	$(".myOrderTab").unbind('click').click(function() {
		$(".rightArrow").attr("linkState", "myOrders");
		$(".moreOrderText").attr("linkState", "myOrders");
		$(".myOrderTab,.pendTab").removeClass("orderTittleActive");
		$(".myOrderTab").addClass("orderTittleActive");
		btnIndex = 1
		myOrderTableInfo();
	})
	$(".pendTab").unbind('click').click(function() {
		$(".rightArrow").attr("linkState", "approvals");
		$(".moreOrderText").attr("linkState", "approvals");
		$(".myOrderTab,.pendTab").removeClass("orderTittleActive");
		$(".pendTab").addClass("orderTittleActive");
		btnIndex = 2
		pendingApproval();
	})
	$(".moreOrderText").unbind("click").click(function() {
		if ($(this).attr("linkState") == "myOrders") {
			window.location.href = '../../orders/orders.html';
		} else if ($(this).attr("linkState") == "approvals") {
			window.location.href = '../../application/queryApplication.html';
		}
	})
	$(".rightArrow").unbind("click").click(function() {
		if ($(this).attr("linkState") == "myOrders") {
			window.location.href = '../../orders/orders.html';
		} else if ($(this).attr("linkState") == "approvals") {
			window.location.href = '../../application/queryApplication.html';
		}
	})
	// if(TAorderNo!=undefined){
	if (TAnumber != undefined && TAnumberIndex == 1) {
		console.log('隐藏')
		// $('.menu .autoCenter li').addClass('hide')
		// $('.menu .autoCenter li').eq(0).removeClass('hide')
		// $('footer').addClass('hide')
		// $('.menu').css("height",'40px')
		// 2020.1.10
		// 首页 有TAnumber隐藏
		// if(TAorderNo!=undefined){
		// 	// 过滤订单列表
		// }else{
		// 	// $('.orderTittle').addClass('hide')
		// 	// $('.autoScrollY').addClass('hide')
		// }
		$($(".menusLi")[1]).hide()
		$('.moreOrderText').hide()
		$('.rightArrow').hide()
	}
}
// 广告图片接口
function GetCompanyImageInfos() {
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/GetCompanyImageInfosWType",
			jsonStr: '{"key":' + netUserId + ',"appType":"WEB"}',
		},
		success: function(data) {
			if (data == "" || data.indexOf("404") > -1) {
				// $('.picGroup').remove()
				$('.videoGroup').remove()
				$(".picHref").remove()
				$('#tableBody').css("height", "400px")
				return false
			}
			var res = JSON.parse(data);
			console.log(res);
			
			//图片列表
			var imgList=[]
			if (res.code == 200) {
				var noVideo = true
				var noPic = true
				res.CompanyImageList.map(function(item) {
					if (item.type == 0) {
						noPic = false;
						imgList.push(item)
						// $('.picGroupImg').attr("src", item.path)
						// if (item.hyperLink == "") {
						// 	$(".picHref").remove()
						// } else {
						// 	$(".picHref").attr("href", item.hyperLink)
						// }
					}
					if (item.type == 10) {
						noVideo = false
						$('.videoGroupVideo').attr("src", item.path)
						$('.videoImg').attr("src", item.hyperLink)
						
						$(".videoPlay").click(function() {
							$("body").append(
								'<div id="coverVideo">\
							<div class="videoGroupPop">\
								<span class="closeVideo"></span>\
								<video width="660px" height="" controls="controls" autoplay="autoplay"  controlsList = "nodownload">\
									<source src="' +
								item.path + '"  type="video/mp4"></source>\
								</video>\
								</div>\
							</div>')
							$(".closeVideo").click(function() {
								$("#coverVideo").remove()
							})
						})
					}
				})
				if(imgList.length==1){
					$('.picGroupImg').attr("src", imgList[0].path)
					if (imgList[0].hyperLink == "") {
						$(".picHref").remove()
					} else {
						$(".picHref").attr("href", imgList[0].hyperLink)
					}
				}else if(!noPic){
					//移除单个样式
					$(".picGroupImg").remove()
					$(".picHref").remove()
					
					var length=imgList.length
					var n=0;
					$('.picGroup').append('\
						<div class="navList"></div>\
					')	
					//添加轮播图
					$('.picGroup').append('\
						<div class="lunbotuGroup"></div>\
					')
					$('.lunbotuGroup').css({"width":"calc(220px * "+ length +")","height":"274px","position":"relative","left":"0"})
					$('.lunbotuGroup').css({"transition":"all 1s"})
					imgList.map(function(item,index){
						$('.lunbotuGroup').append('\
							<div class="lunbotu">\
								<a href="'+item.hyperLink+'" target="_blank">\
									<img src="'+item.path+'" alt="">\
								</a>\
							</div>\
						')
						$('.navList').append('\
							<span index="'+index+'"></span>\
						')
					})
					$('.navList span').click(function(){
						var clickNum=$(this).attr('index')
						n=clickNum
						clearInterval(t)
						lunbofun()
						t=setInterval(start,10000);
					})
					function lunbofun() {
						$('.lunbotuGroup').css("left",-n*220 + "px")
						$('.navList span').css("background","#B7B7B7")
						$('.navList span').eq(n).css("background","#F6AA25")
					}
					lunbofun()
					function start(){
					    n++;
					    if (n>=length) {
					        n=0;
							$('.lunbotuGroup').css({"transition":"all 0s"})
					    }else{
							$('.lunbotuGroup').css({"transition":"all 1s"})
						}
					    lunbofun();
					}
					var t=setInterval(start,10000);
				}
				
				if (noPic) {
					//移除图片，高度400px
					$('.picGroupImg').attr("src","../staticFile/index.png")
					$(".picHref").remove()
					$('#tableBody').css("height","400px")
				}
				if (noVideo) {
					//移除视频，高度400px
					$('.videoGroup').remove()
					$('#tableBody').css("height", "400px")
				}

			} else {
				if(ProfileInfo.onlineStyle=="APPLE"){
					$('.picGroup').remove()
				}
				$('.videoGroup').remove()
				$(".picHref").remove()
				$('#tableBody').css("height", "400px")

				// 应该不需要提示
				// alert(res.errMsg)
			}
			// 


		},
		error: function() {
			// alert('fail');
		}
	});
}

// 搜索界面
function searchBody() {
	
	//租车
	var enStyle=obtLanguage=="CN"?"":"height:0;line-height:17px";
	// 19-10-29改苹果舱位去掉超级经济舱与头等舱
	var optionStr = '<option berthType="0">' + get_lan('searchBody').cabins.cabin1 +
		'</option>\
		<option berthType="1">' + get_lan('searchBody').cabins.cabin2+'</option>\
		<option berthType="4">' + get_lan('searchBody').cabins.cabin6 +
		'</option>\
		<option berthType="2">' + get_lan('searchBody').cabins.cabin3 +
		'</option>\
		 <option berthType="3">' + get_lan('searchBody').cabins.cabin4 + '</option>'
	if (ProfileInfo.onlineStyle == "APPLE") {
		// <option berthType="4">'+get_lan('searchBody').cabins.cabin6+'</option>
		// <option berthType="3">'+get_lan('searchBody').cabins.cabin4+'</option>'
		optionStr = '<option berthType="1">' + get_lan('searchBody').cabins.cabin2 +
			'</option>\
	                  <option berthType="2">' + get_lan('searchBody').cabins.cabin3 + '</option>'
	}

	console.log(ProfileInfo.isCarRental)
	var showCarRent = ProfileInfo.isCarRental ? "" : "hide"
	$('.searchBody').html(
		'\
        <ul class="tabBar flexRow">\
            <li class="tab airDom specificFontColor">' + get_lan(
			'searchBody').airDom + '</li>\
            <li class="tab airIntl specificFontColor" style="width: 125px;">' +
		get_lan('searchBody').airIntl + '</li>\
            <li class="tab Hotel specificFontColor" id="indexHotelTab">' + get_lan('searchBody')
		.hotel + '</li>\
            <li class="tab appleHotel specificFontColor hide">' + get_lan('searchBody').hotel +
		'</li>\
            <li class="tab Train specificFontColor">' + get_lan('searchBody').train +
		'</li>\
            <li class="tab Car specificFontColor ' + showCarRent + '">' + get_lan('searchBody').car +
		'</li>\
        </ul>\
        <div class="searchPage airDomBody">\
            <div class="domTabBar mainFontColor">\
                <span style="position:relative">\
                  <input type="radio" id="domOneWay" name="domTrip" checked="checked"><label for="domOneWay" style="margin-left:15px;cursor: pointer;">' +
		get_lan('searchBody').oneWay +
		'</label>\
                </span>\
                <span style="position:relative">\
                  <input type="radio" id="domRoundTrip" name="domTrip" style="margin-left:56px"><label for="domRoundTrip" style="margin-left:71px;cursor: pointer;">' +
		get_lan('searchBody').roundTrip +
		'</label>\
                </span>\
				<span style="position:relative">\
				          <input type="radio" id="domMultiple" name="domTrip" style="margin-left:56px"><label for="domMultiple" style="margin-left:71px;cursor: pointer;">' +get_lan('searchBody').Multiple +'</label>\
				</span>\
            </div>\
<div class="domnotMultiple">\
            <div class="cityStyle flexRow">\
                <div class="cityTittle">' +
		get_lan('searchBody').from +
		'</div>\
                <input autocomplete="off" type="text" id="domDepartureCity" placeholder="' + get_lan(
			'searchBody').departure +
		'">\
                <div style="width:26px;height:12px;margin-top:6px;border-width:1px 1px 0 0;border-color:#979797;border-style: solid;"></div>\
            </div>\
            <div class="cityStyle flexRow">\
                <div class="cityTittle">' +
		get_lan('searchBody').to +
		'</div>\
                <input autocomplete="off" type="text" id="domArrivalCity" placeholder="' + get_lan(
			'searchBody').arrival +
		'">\
                <div style="width:26px;height:12px;margin-top:6px;border-width:0 1px 1px 0;border-color:#979797;border-style: solid;"></div>\
            </div>\
            <div class="switchIconDom"></div>\
            <div class="dateStyle flexRow">\
                <div class="dateTittle">' +
		get_lan('searchBody').departureDate +
		'</div>\
                <div class="domDateBody flexRow">\
                  <input type="text" id="domDepartureDate" readonly="readonly">\
                  <select type="text" id="domDepartureSelect" onchange="GrayDepartPlusMinus()">\
                    <option value="all" class="domAllDay">' +
		get_lan("searchBody").allDay +
		'</option>\
                    <option value="0">0:00</option>\
                    <option value="1">1:00</option>\
                    <option value="2">2:00</option>\
                    <option value="3">3:00</option>\
                    <option value="4">4:00</option>\
                    <option value="5">5:00</option>\
                    <option value="6">6:00</option>\
                    <option value="7">7:00</option>\
                    <option value="8">8:00</option>\
                    <option value="9">9:00</option>\
                    <option value="10">10:00</option>\
                    <option value="11">11:00</option>\
                    <option value="12">12:00</option>\
                    <option value="13">13:00</option>\
                    <option value="14">14:00</option>\
                    <option value="15">15:00</option>\
                    <option value="16">16:00</option>\
                    <option value="17">17:00</option>\
                    <option value="18">18:00</option>\
                    <option value="19">19:00</option>\
                    <option value="20">20:00</option>\
                    <option value="21">21:00</option>\
                    <option value="22">22:00</option>\
                    <option value="23">23:00</option>\
                  </select>\
                </div>\
				<select type="text" id="DepartPlusMinus"  class="plusMinus">\
				  <option value="1">±1H</option>\
				  <option value="2">±2H</option>\
				  <option value="3">±3H</option>\
				  <option value="4">±4H</option>\
				  <option value="5">±5H</option>\
				  <option value="6">±6H</option>\
				  <option value="7">±7H</option>\
				  <option value="8">±8H</option>\
				  <option value="9">±9H</option>\
				  <option value="10">±10H</option>\
				  <option value="11">±11H</option>\
				  <option value="12">±12H</option>\
				</select>\
                <div class="dateTittle domDateTittle" style="color:#9B9B9B;">' +
		get_lan('searchBody').returnDate +
		'</div>\
                <div class="domDateBody domReturnDateBody flexRow">\
                  <input type="text" id="domReturnDate" disabled="disabled">\
                  <select type="text" id="domReturnSelect" onchange="GrayreturnPlusMinus()">\
                    <option value="all" class="domAllDay">' +
		get_lan("searchBody").allDay +
		'</option>\
                    <option value="0">0:00</option>\
                    <option value="1">1:00</option>\
                    <option value="2">2:00</option>\
                    <option value="3">3:00</option>\
                    <option value="4">4:00</option>\
                    <option value="5">5:00</option>\
                    <option value="6">6:00</option>\
                    <option value="7">7:00</option>\
                    <option value="8">8:00</option>\
                    <option value="9">9:00</option>\
                    <option value="10">10:00</option>\
                    <option value="11">11:00</option>\
                    <option value="12">12:00</option>\
                    <option value="13">13:00</option>\
                    <option value="14">14:00</option>\
                    <option value="15">15:00</option>\
                    <option value="16">16:00</option>\
                    <option value="17">17:00</option>\
                    <option value="18">18:00</option>\
                    <option value="19">19:00</option>\
                    <option value="20">20:00</option>\
                    <option value="21">21:00</option>\
                    <option value="22">22:00</option>\
                    <option value="23">23:00</option>\
                  </select>\
                </div>\
				<select type="text" style="color:#9B9B9B;" id="returnPlusMinus" class="plusMinus">\
				  <option value="1">±1H</option>\
				  <option value="2">±2H</option>\
				  <option value="3">±3H</option>\
				  <option value="4">±4H</option>\
				  <option value="5">±5H</option>\
				  <option value="6">±6H</option>\
				  <option value="7">±7H</option>\
				  <option value="8">±8H</option>\
				  <option value="9">±9H</option>\
				  <option value="10">±10H</option>\
				  <option value="11">±11H</option>\
				  <option value="12">±12H</option>\
				</select>\
            </div>\
            <div class="selectTimeStyle flexRow hide">\
                <div class="dateTittle">' +
		get_lan('searchBody').departureTime +
		'</div>\
                <div class="domDateBody flexRow">\
                  <select type="text" id="domDepartureSelect">\
                    <option value="0">0:00</option>\
                    <option value="1">1:00</option>\
                    <option value="2">2:00</option>\
                    <option value="3">3:00</option>\
                    <option value="4">4:00</option>\
                    <option value="5">5:00</option>\
                    <option value="6">6:00</option>\
                    <option value="7">7:00</option>\
                    <option value="8">8:00</option>\
                    <option value="9">9:00</option>\
                    <option value="10">10:00</option>\
                    <option value="11">11:00</option>\
                    <option value="12">12:00</option>\
                    <option value="13">13:00</option>\
                    <option value="14">14:00</option>\
                    <option value="15">15:00</option>\
                    <option value="16">16:00</option>\
                    <option value="17">17:00</option>\
                    <option value="18">18:00</option>\
                    <option value="19">19:00</option>\
                    <option value="20">20:00</option>\
                    <option value="21">21:00</option>\
                    <option value="22">22:00</option>\
                    <option value="23">23:00</option>\
                  </select>\
                </div>\
                <div class="dateTittle domDateTittle" style="color:#9B9B9B;">' +
		get_lan('searchBody').returnTime +
		'</div>\
                <div class="domDateBody domReturnDateBody flexRow">\
                  <select type="text" id="domReturnSelect">\
                    <option value="0">0:00</option>\
                    <option value="1">1:00</option>\
                    <option value="2">2:00</option>\
                    <option value="3">3:00</option>\
                    <option value="4">4:00</option>\
                    <option value="5">5:00</option>\
                    <option value="6">6:00</option>\
                    <option value="7">7:00</option>\
                    <option value="8">8:00</option>\
                    <option value="9">9:00</option>\
                    <option value="10">10:00</option>\
                    <option value="11">11:00</option>\
                    <option value="12">12:00</option>\
                    <option value="13">13:00</option>\
                    <option value="14">14:00</option>\
                    <option value="15">15:00</option>\
                    <option value="16">16:00</option>\
                    <option value="17">17:00</option>\
                    <option value="18">18:00</option>\
                    <option value="19">19:00</option>\
                    <option value="20">20:00</option>\
                    <option value="21">21:00</option>\
                    <option value="22">22:00</option>\
                    <option value="23">23:00</option>\
                  </select>\
                </div>\
			</div>\
			<div class="pointsRemindBody hide domPointsRemind"></div>\
            <div class="cabinStyle flexRow domCabinInfo">\
                <div class="cabinTittle domCabinTittle">' +
				get_lan('searchBody').cabin +
				'</div>\
						<select type="text" id="domCabin">\
						<option berthType="0">' + get_lan(
					'searchBody').cabins.cabin1 + '</option>\
						<option berthType="1">' + get_lan('searchBody').cabins.cabin2 +
				'</option>\
						<option berthType="2">' + get_lan('searchBody').cabins.cabin3 +
				'</option>\
						<option berthType="3">' + get_lan('searchBody').cabins.cabin4 +
				'</option>\
						<option berthType="23">' + get_lan('searchBody').cabins.cabin5 +
				'</option>\
						</select>\
						<input type="checkbox" class="domCodeShareCheckBox" style="margin:7px 5px 0 25px;">\
						<span class="domCodeShareText" style="font-weight:bold;">' +
				get_lan('searchBody').codeShare +
				'</span>\
                <input type="checkbox" class="domDirectCheckBox" style="margin:7px 5px 0 5px;" checked>\
                <span class="domDirectText" style="font-weight:bold;">' +get_lan('searchBody').isDirect +'</span>\
            </div>\
</div>\
<div class="domMultiple hide">\
	<div class="domAirMultipleBody hide">\
	      <div class="domAirMultipleLi flexRow">\
	        <div class="MultipleLiIcon">1</div>\
	        <div class="MultipleLiText">' +
	get_lan('searchBody').departure +
	'</div>\
	        <input class="MultipleLiInput domMultipleDeparture">\
	        <div class="MultipleLiText">' +
	get_lan('searchBody').arrival +
	'</div>\
	        <input class="MultipleLiInput domMultipleArrivel" inputIndex="0">\
	        <div class="MultipleLiText">' +
	get_lan('searchBody').departureDate +
	'</div>\
	        <div class="MultipleLiInputBody flexRow">\
	          <input class="MultipleLiInput domMultipleDepartureDate">\
	          <select type="text" class="domMultipleSelect">\
	            <option value="all" class="intlAllDay">' +
	get_lan("searchBody").allDay +
	'</option>\
	            <option value="0">0:00</option>\
	            <option value="1">1:00</option>\
	            <option value="2">2:00</option>\
	            <option value="3">3:00</option>\
	            <option value="4">4:00</option>\
	            <option value="5">5:00</option>\
	            <option value="6">6:00</option>\
	            <option value="7">7:00</option>\
	            <option value="8">8:00</option>\
	            <option value="9">9:00</option>\
	            <option value="10">10:00</option>\
	            <option value="11">11:00</option>\
	            <option value="12">12:00</option>\
	            <option value="13">13:00</option>\
	            <option value="14">14:00</option>\
	            <option value="15">15:00</option>\
	            <option value="16">16:00</option>\
	            <option value="17">17:00</option>\
	            <option value="18">18:00</option>\
	            <option value="19">19:00</option>\
	            <option value="20">20:00</option>\
	            <option value="21">21:00</option>\
	            <option value="22">22:00</option>\
	            <option value="23">23:00</option>\
	          </select>\
	        </div>\
	      </div>\
	      <div class="domAirMultipleLi flexRow">\
	        <div class="MultipleLiIcon">2</div>\
	        <div class="MultipleLiText">' +
	get_lan('searchBody').departure +
	'</div>\
	        <input class="MultipleLiInput domMultipleDeparture">\
	        <div class="MultipleLiText">' +
	get_lan('searchBody').arrival +
	'</div>\
	        <input class="MultipleLiInput domMultipleArrivel" inputIndex="1">\
	        <div class="MultipleLiText">' +
	get_lan('searchBody').departureDate +
	'</div>\
	        <div class="MultipleLiInputBody flexRow">\
	          <input class="MultipleLiInput domMultipleDepartureDate">\
	          <select type="text" class="domMultipleSelect">\
	            <option value="all" class="intlAllDay">' +
	get_lan("searchBody").allDay +
	'</option>\
	            <option value="0">0:00</option>\
	            <option value="1">1:00</option>\
	            <option value="2">2:00</option>\
	            <option value="3">3:00</option>\
	            <option value="4">4:00</option>\
	            <option value="5">5:00</option>\
	            <option value="6">6:00</option>\
	            <option value="7">7:00</option>\
	            <option value="8">8:00</option>\
	            <option value="9">9:00</option>\
	            <option value="10">10:00</option>\
	            <option value="11">11:00</option>\
	            <option value="12">12:00</option>\
	            <option value="13">13:00</option>\
	            <option value="14">14:00</option>\
	            <option value="15">15:00</option>\
	            <option value="16">16:00</option>\
	            <option value="17">17:00</option>\
	            <option value="18">18:00</option>\
	            <option value="19">19:00</option>\
	            <option value="20">20:00</option>\
	            <option value="21">21:00</option>\
	            <option value="22">22:00</option>\
	            <option value="23">23:00</option>\
	          </select>\
	        </div>\
		  </div>\
		  <div class="pointsRemindBody hide domPointsRemind"></div>\
	      <div class="flexRow cabinStyle domMultiCabinInfo" style="margin-top:5px;margin-bottom:40px">\
	        <div class="MultipleLiIcon" style="background:#fff;"></div>\
	        <div class="MultipleLiText">' +
	get_lan('searchBody').cabin +
	'</div>\
	        <select type="text" id="domCabin">\
			' + optionStr +'\
	        </select>\
			<input type="checkbox" class="domDirectCheckBox" style="margin:7px 5px 0 5px;" checked>\
			 <span class="domDirectText" style="font-weight:bold;line-height: 30px;">' +get_lan('searchBody').isDirect +'</span>\
	      </div>\
	    </div>\
</div>\
            <div class="searchDomBtn btnBackColor" state="oneWay">' + get_lan(
			'searchBody').search +
		'</div>\
        </div>\
        <div class="searchPage airIntlBody">\
            <div class="intlTabBar mainFontColor">\
                <span style="position:relative" class="oneWayIntl">\
                  <input type="radio" id="intlOneWay" name="intlTrip" checked="checked"><label for="intlOneWay" style="margin-left:15px;cursor: pointer;">' +
		get_lan('searchBody').oneWay +
		'</label>\
                </span>\
                <span style="position:relative">\
                  <input type="radio" id="intlRoundTrip" name="intlTrip" style="margin-left:56px"><label for="intlRoundTrip" style="margin-left:71px;cursor: pointer;">' +
		get_lan('searchBody').roundTrip +
		'</label>\
                </span>\
                <span style="position:relative">\
                  <input type="radio" id="intlMultipleTrip" name="intlTrip" style="margin-left:56px"><label for="intlMultipleTrip" style="margin-left:71px;cursor: pointer;">' +
		get_lan('searchBody').Multiple +
		'</label>\
                </span>\
            </div>\
            <div class="intlAirBody">\
                <div class="cityStyle flexRow">\
                    <div class="cityTittle">' +
		get_lan('searchBody').from +
		'</div>\
                    <input autocomplete="off" type="text" id="intlDepartureCity" placeholder="' + get_lan(
			'searchBody').departure +
		'">\
                    <div style="width:26px;height:12px;margin-top:6px;border-width:1px 1px 0 0;border-color:#979797;border-style: solid;"></div>\
                </div>\
                <div class="cityStyle flexRow">\
                    <div class="cityTittle">' +
		get_lan('searchBody').to +
		'</div>\
                    <input autocomplete="off" type="text" id="intlArrivalCity" placeholder="' + get_lan(
			'searchBody').arrival +
		'">\
                    <div style="width:26px;height:12px;margin-top:6px;border-width:0 1px 1px 0;border-color:#979797;border-style: solid;"></div>\
                </div>\
                <div class="cityStyle flexRow addTransitBody">\
                    <div class="transitText">' +
		get_lan('searchBody').addTransit +
		'</div>\
                    <div class="transitIcon addTransitIcon">+</div>\
                </div>\
                <div class="cityStyle flexRow transitCityBody hide">\
                    <div class="cityTittle">' +
		get_lan('searchBody').transit +
		'</div>\
                    <input autocomplete="off" type="text" id="transitCity" placeholder="' + get_lan(
			'searchBody').transitRemind +
		'">\
                    <div class="transitIcon hideTransitIcon">-</div>\
                </div>\
                <div class="switchIconIntl"></div>\
                <div class="dateStyle flexRow">\
                    <div class="dateTittle">' +
		get_lan('searchBody').departureDate +
		'</div>\
                    <div class="intlDateBody flexRow">\
                      <input type="text" id="intlDepartureDate" readonly="readonly">\
                      <select type="text" id="intlDepartureSelect">\
                        <option value="all" class="intlAllDay">' +
		get_lan("searchBody").allDay +
		'</option>\
                        <option value="0">0:00</option>\
                        <option value="1">1:00</option>\
                        <option value="2">2:00</option>\
                        <option value="3">3:00</option>\
                        <option value="4">4:00</option>\
                        <option value="5">5:00</option>\
                        <option value="6">6:00</option>\
                        <option value="7">7:00</option>\
                        <option value="8">8:00</option>\
                        <option value="9">9:00</option>\
                        <option value="10">10:00</option>\
                        <option value="11">11:00</option>\
                        <option value="12">12:00</option>\
                        <option value="13">13:00</option>\
                        <option value="14">14:00</option>\
                        <option value="15">15:00</option>\
                        <option value="16">16:00</option>\
                        <option value="17">17:00</option>\
                        <option value="18">18:00</option>\
                        <option value="19">19:00</option>\
                        <option value="20">20:00</option>\
                        <option value="21">21:00</option>\
                        <option value="22">22:00</option>\
                        <option value="23">23:00</option>\
                      </select>\
                    </div>\
					<select type="text" id="DepartPlusMinusintel"  class="plusMinus">\
					  <option value="1">±1H</option>\
					  <option value="2">±2H</option>\
					  <option value="3">±3H</option>\
					  <option value="4">±4H</option>\
					  <option value="5">±5H</option>\
					  <option value="6">±6H</option>\
					  <option value="7">±7H</option>\
					  <option value="8">±8H</option>\
					  <option value="9">±9H</option>\
					  <option value="10">±10H</option>\
					  <option value="11">±11H</option>\
					  <option value="12">±12H</option>\
					</select>\
                    <div class="dateTittle intlDateTittle" style="color:#9B9B9B;">' +
		get_lan('searchBody').returnDate +
		'</div>\
                    <div class="intlDateBody intlReturnDateBody flexRow">\
                      <input type="text" id="intlReturnDate" readonly="readonly">\
                      <select type="text" id="intlReturnSelect">\
                        <option value="all" class="intlAllDay">' +
		get_lan("searchBody").allDay +
		'</option>\
                        <option value="0">0:00</option>\
                        <option value="1">1:00</option>\
                        <option value="2">2:00</option>\
                        <option value="3">3:00</option>\
                        <option value="4">4:00</option>\
                        <option value="5">5:00</option>\
                        <option value="6">6:00</option>\
                        <option value="7">7:00</option>\
                        <option value="8">8:00</option>\
                        <option value="9">9:00</option>\
                        <option value="10">10:00</option>\
                        <option value="11">11:00</option>\
                        <option value="12">12:00</option>\
                        <option value="13">13:00</option>\
                        <option value="14">14:00</option>\
                        <option value="15">15:00</option>\
                        <option value="16">16:00</option>\
                        <option value="17">17:00</option>\
                        <option value="18">18:00</option>\
                        <option value="19">19:00</option>\
                        <option value="20">20:00</option>\
                        <option value="21">21:00</option>\
                        <option value="22">22:00</option>\
                        <option value="23">23:00</option>\
                      </select>\
                    </div>\
					<select type="text" id="returnPlusMinusintel"  class="plusMinus">\
					  <option value="1">±1H</option>\
					  <option value="2">±2H</option>\
					  <option value="3">±3H</option>\
					  <option value="4">±4H</option>\
					  <option value="5">±5H</option>\
					  <option value="6">±6H</option>\
					  <option value="7">±7H</option>\
					  <option value="8">±8H</option>\
					  <option value="9">±9H</option>\
					  <option value="10">±10H</option>\
					  <option value="11">±11H</option>\
					  <option value="12">±12H</option>\
					</select>\
				</div>\
				<div class="pointsRemindBody hide intlPointsRemind"></div>\
                <div class="cabinStyle flexRow">\
                    <div class="cabinTittle">' +
					get_lan('searchBody').cabin +
					'</div>\
								<select type="text" id="intlCabin">\
								\
								' +
					optionStr +
					'\
								\
								</select>\
								<div class="intlDirectCheckBoxBody flexRow">\
								<div class="cabinTittle" style="text-align:right;padding-right: 10px;width:102px;"><input type="checkbox" class="intlDirectCheckBox"></div>\
								<span style="font-weight:bold;">' +
					get_lan('searchBody').isDirect +
					'</span>\
                    </div>\
                </div>\
            </div>\
            <div class="intlAirMultipleBody hide">\
              <div class="intlAirMultipleLi flexRow">\
                <div class="MultipleLiIcon">1</div>\
                <div class="MultipleLiText">' +
		get_lan('searchBody').departure +
		'</div>\
                <input class="MultipleLiInput MultipleDepartureCity">\
                <div class="MultipleLiText">' +
		get_lan('searchBody').arrival +
		'</div>\
                <input class="MultipleLiInput MultipleArrivelCity" inputIndex="0">\
                <div class="MultipleLiText">' +
		get_lan('searchBody').departureDate +
		'</div>\
                <div class="MultipleLiInputBody flexRow">\
                  <input class="MultipleLiInput MultipleDepartureDate">\
                  <select type="text" class="MultipleSelect">\
                    <option value="all" class="intlAllDay">' +
		get_lan("searchBody").allDay +
		'</option>\
                    <option value="0">0:00</option>\
                    <option value="1">1:00</option>\
                    <option value="2">2:00</option>\
                    <option value="3">3:00</option>\
                    <option value="4">4:00</option>\
                    <option value="5">5:00</option>\
                    <option value="6">6:00</option>\
                    <option value="7">7:00</option>\
                    <option value="8">8:00</option>\
                    <option value="9">9:00</option>\
                    <option value="10">10:00</option>\
                    <option value="11">11:00</option>\
                    <option value="12">12:00</option>\
                    <option value="13">13:00</option>\
                    <option value="14">14:00</option>\
                    <option value="15">15:00</option>\
                    <option value="16">16:00</option>\
                    <option value="17">17:00</option>\
                    <option value="18">18:00</option>\
                    <option value="19">19:00</option>\
                    <option value="20">20:00</option>\
                    <option value="21">21:00</option>\
                    <option value="22">22:00</option>\
                    <option value="23">23:00</option>\
                  </select>\
                </div>\
              </div>\
              <div class="intlAirMultipleLi flexRow">\
                <div class="MultipleLiIcon">2</div>\
                <div class="MultipleLiText">' +
		get_lan('searchBody').departure +
		'</div>\
                <input class="MultipleLiInput MultipleDepartureCity">\
                <div class="MultipleLiText">' +
		get_lan('searchBody').arrival +
		'</div>\
                <input class="MultipleLiInput MultipleArrivelCity" inputIndex="1">\
                <div class="MultipleLiText">' +
		get_lan('searchBody').departureDate +
		'</div>\
                <div class="MultipleLiInputBody flexRow">\
                  <input class="MultipleLiInput MultipleDepartureDate">\
                  <select type="text" class="MultipleSelect">\
                    <option value="all" class="intlAllDay">' +
		get_lan("searchBody").allDay +
		'</option>\
                    <option value="0">0:00</option>\
                    <option value="1">1:00</option>\
                    <option value="2">2:00</option>\
                    <option value="3">3:00</option>\
                    <option value="4">4:00</option>\
                    <option value="5">5:00</option>\
                    <option value="6">6:00</option>\
                    <option value="7">7:00</option>\
                    <option value="8">8:00</option>\
                    <option value="9">9:00</option>\
                    <option value="10">10:00</option>\
                    <option value="11">11:00</option>\
                    <option value="12">12:00</option>\
                    <option value="13">13:00</option>\
                    <option value="14">14:00</option>\
                    <option value="15">15:00</option>\
                    <option value="16">16:00</option>\
                    <option value="17">17:00</option>\
                    <option value="18">18:00</option>\
                    <option value="19">19:00</option>\
                    <option value="20">20:00</option>\
                    <option value="21">21:00</option>\
                    <option value="22">22:00</option>\
                    <option value="23">23:00</option>\
                  </select>\
                </div>\
              </div>\
              <div class="addAirIntlBody specificFontColor"><span style="font-weight:bold;margin-right:15px;font-size:16px;">+</span>' +
		get_lan("searchBody").addAirIntl +
		'</div>\
		<div class="pointsRemindBody hide intlPointsRemind"></div>\
              <div class="flexRow" style="margin-top:5px;">\
                <div class="MultipleLiIcon" style="background:#fff;"></div>\
                <div class="MultipleLiText">' +
		get_lan('searchBody').cabin +
		'</div>\
                <select type="text" class="MultipleLiInput" id="MultipleCabin">\
				\
				' + optionStr +
		'\
				\
                </select>\
              </div>\
            </div>\
            <div class="searchIntlBtn btnBackColor" state="oneWay">' +
		get_lan('searchBody').search +
		'</div>\
        </div>\
        <div class="searchPage hotelBody">\
            <div class="hotelTabBar mainFontColor">\
                <span style="position:relative">\
                  <input type="radio" id="domHotel"  name="hotel" checked="checked"><label for="domHotel" style="margin-left:15px;cursor: pointer;">' +
		get_lan('searchBody').domHotel +
		'</label>\
                </span>\
                <span style="position:relative">\
                  <input type="radio" id="intlHotel"  name="hotel" style="margin-left:56px"><label for="intlHotel" style="margin-left:71px;cursor: pointer;">' +
		get_lan('searchBody').intlHotel +
		'</label>\
                </span>\
            </div>\
            <div class="cityStyle flexRow" style="margin-top:5px">\
                <div class="cityTittle">' +
		get_lan('searchBody').hotelCity +
		'</div>\
                <input autocomplete="off" type="text" id="hotelCity" class="hotelCityChange" placeholder="' +
		get_lan('searchBody').hotelCityInput +
		'">\
            </div>\
            <div class="dateStyle flexRow">\
                <div class="dateTittle">' +
		get_lan('searchBody').hotelCheckInDate +
		'</div>\
                <input type="text" id="hotelDepartureDate" readonly="readonly">\
                <div class="dateTittle hotelDateTittle">' +
		get_lan('searchBody').hotelCheckOutDate +
		'</div>\
                <input type="text" id="hotelReturnDate" readonly="readonly">\
            </div>\
            <div class="dateStyle flexRow">\
                <div class="dateTittle">' +
		get_lan('searchBody').hotelPrice +
		'</div>\
                <input type="text" id="hotelPrice" value="0-5000'+ProfileInfo.OfficeCurrency+'" minPrice="0" maxPrice="5000">\
               	<div class="hotelPriceBody">\
               		<div class="hotelPriceLi" minPrice="0" maxPrice="5000">' +
		get_lan('searchBody').all +
		'</div>\
               		<div class="hotelPriceLi" minPrice="0" maxPrice="150">0-150'+ProfileInfo.OfficeCurrency+'</div>\
               		<div class="hotelPriceLi" minPrice="151" maxPrice="300">151-300'+ProfileInfo.OfficeCurrency+'</div>\
               		<div class="hotelPriceLi" minPrice="301" maxPrice="450">301-450'+ProfileInfo.OfficeCurrency+'</div>\
               		<div class="hotelPriceLi" minPrice="451" maxPrice="600">451-600'+ProfileInfo.OfficeCurrency+'</div>\
               		<div class="hotelPriceLi" minPrice="601" maxPrice="1000">601-1000'+ProfileInfo.OfficeCurrency+'</div>\
               		<div class="hotelPriceLi" minPrice="1000" maxPrice="5000">1000+'+ProfileInfo.OfficeCurrency+'</div>\
               	</div>\
                <div class="dateTittle">' +
		get_lan('searchBody').hotelAddress +
		'</div>\
                <div class="hotelAddressBody">\
                  <input type="text" id="hotelAddress" autocomplete="off">\
                  <select id="hotelAddressSelect"></select>\
                </div>\
            </div>\
            <div class="hotelStar flexRow">\
                <div class="dateTittle">' +
		get_lan('searchBody').hotelRank +
		'</div>\
                <div class="flexRow" style="width:80%;">\
                    <div class="hotelCheckBox">\
                        <input type="checkbox" name="hotelCheck" style="width:15px;height:15px;" checked value="1-2"> ≤2<span class="star activeFontColor">☆</span>\
                    </div>\
                    <div class="hotelCheckBox">\
                        <input type="checkbox" name="hotelCheck" style="width:15px;height:15px;" checked value="3"> 3<span class="star activeFontColor">☆</span>\
                    </div>\
                    <div class="hotelCheckBox">\
                        <input type="checkbox" name="hotelCheck" style="width:15px;height:15px;" checked value="4"> 4<span class="star activeFontColor">☆</span>\
                    </div>\
                    <div class="hotelCheckBox">\
                        <input type="checkbox" name="hotelCheck" style="width:15px;height:15px;" checked value="5"> 5<span class="star activeFontColor">☆</span>\
                    </div>\
                </div>\
            </div>\
            <div class="hotelKey flexRow">\
                <div class="dateTittle">' +
		get_lan('searchBody').hotelKeyWords +
		'</div>\
                <div class="flexRow" style="width:80%;">\
                <input type="text" id="keyWordInput" autocomplete="off" placeholder="' +
		get_lan('searchBody').hotelKeyInput +
		'">\
                </div>\
                <div class="keyWordBody autoScrollY"></div>\
            </div>\
            <div class="searchHotelBtn btnBackColor" state="domHotel" >' +
		get_lan('searchBody').search +
		'</div>\
        </div>\
        <div class="searchPage appleHotelBody">\
            <div class="hotelTabBar">\
                <span style="position:relative">\
                  <input type="radio" id="domHotel" name="applehotel" checked="checked"><label for="domHotel" style="margin-left:15px;cursor: pointer;">' +
		get_lan('searchBody').domHotel +
		'</label>\
                </span>\
                <span style="position:relative">\
                  <input type="radio" id="intlHotel" name="applehotel" style="margin-left:56px"><label for="intlHotel" style="margin-left:71px;cursor: pointer;">' +
		get_lan('searchBody').intlHotel +
		'</label>\
                </span>\
            </div>\
            <div class="cityStyle flexRow" style="margin-top:5px">\
                <div class="cityTittle">' +
		get_lan('searchBody').hotelCity +
		'</div>\
                <input autocomplete="off" type="text" id="hotelCity" class="hotelCityChange" placeholder="' +
		get_lan('searchBody').hotelCityInput +
		'">\
            </div>\
            <div class="dateStyle flexRow">\
                <div class="dateTittle">' +
		get_lan('searchBody').hotelCheckInDate +
		'</div>\
                <input type="text" id="hotelDepartureDate" readonly="readonly">\
                <div class="dateTittle hotelDateTittle">' +
		get_lan('searchBody').hotelCheckOutDate +
		'</div>\
                <input type="text" id="hotelReturnDate" readonly="readonly">\
            </div>\
            <div class="hotelKey flexRow">\
                <div class="dateTittle">' +
		get_lan('searchBody').hotelKeyWords +
		'</div>\
                <div class="flexRow" style="width:80%;">\
                <input type="text" autocomplete="off" id="appleKeyWordInput" placeholder="' +
		get_lan('searchBody').hotelKeyInput +
		'">\
                </div>\
                <div class="keyWordBody"></div>\
            </div>\
            <div class="searchAppleHotelBtn btnBackColor" state="domHotel" >' +
		get_lan('searchBody').search +
		'</div>\
        </div>\
        <div class="searchPage trainBody">\
            <div class="trainTabBar mainFontColor">\
                <span style="position:relative">\
                  <input type="radio" id="trainOneWay" name="trainTrip" checked="checked"><label for="trainOneWay" style="margin-left:15px;cursor: pointer;">' +
		get_lan('searchBody').oneWay +
		'</label>\
                </span>\
                <span style="position:relative">\
                  <input type="radio" id="trainRoundTrip" name="trainTrip" style="margin-left:56px"><label for="trainRoundTrip" style="margin-left:71px;cursor: pointer;">' +
		get_lan('searchBody').roundTrip +
		'</label>\
                </span>\
            </div>\
            <div class="cityStyle flexRow">\
                <div class="cityTittle">' +
		get_lan('searchBody').from +
		'</div>\
                <input autocomplete="off" type="text" id="trainDepartureCity" placeholder="' + get_lan(
			'searchBody').departure +
		'">\
                <div style="width:26px;height:12px;margin-top:6px;border-width:1px 1px 0 0;border-color:#979797;border-style: solid;"></div>\
            </div>\
            <div class="cityStyle flexRow">\
                <div class="cityTittle">' +
		get_lan('searchBody').to +
		'</div>\
                <input autocomplete="off" type="text" id="trainArrivalCity" placeholder="' + get_lan(
			'searchBody').arrival +
		'">\
                <div style="width:26px;height:12px;margin-top:6px;border-width:0 1px 1px 0;border-color:#979797;border-style: solid;"></div>\
            </div>\
            <div class="switchIconTrain"></div>\
            <div class="dateStyle flexRow">\
                <div class="dateTittle">' +
		get_lan('searchBody').departureDate +
		'</div>\
		<div class="trainDateBody trainReturnDateBody flexRow">\
                <input type="text" id="trainDepartureDate" readonly="readonly">\
						<select type="text" class="trainDepartureSelect">\
				            <option value="all" class="trainAllDay">' +
				get_lan("searchBody").allDay +
				'</option>\
				            <option value="0">0:00</option>\
				            <option value="1">1:00</option>\
				            <option value="2">2:00</option>\
				            <option value="3">3:00</option>\
				            <option value="4">4:00</option>\
				            <option value="5">5:00</option>\
				            <option value="6">6:00</option>\
				            <option value="7">7:00</option>\
				            <option value="8">8:00</option>\
				            <option value="9">9:00</option>\
				            <option value="10">10:00</option>\
				            <option value="11">11:00</option>\
				            <option value="12">12:00</option>\
				            <option value="13">13:00</option>\
				            <option value="14">14:00</option>\
				            <option value="15">15:00</option>\
				            <option value="16">16:00</option>\
				            <option value="17">17:00</option>\
				            <option value="18">18:00</option>\
				            <option value="19">19:00</option>\
				            <option value="20">20:00</option>\
				            <option value="21">21:00</option>\
				            <option value="22">22:00</option>\
				            <option value="23">23:00</option>\
				          </select>\
						  </div>\
                <div class="dateTittle trainDateTittle" style="color:#9B9B9B;">' +
		get_lan('searchBody').returnDate +
		'</div>\
		<div class="trainDateBody trainReturnDateBody flexRow">\
                <input type="text" id="trainReturnDate" disabled="disabled">\
					<select type="text" class="trainReturnSelect" disabled="disabled">\
					            <option value="all" class="trainAllDay">' +
					get_lan("searchBody").allDay +
					'</option>\
					            <option value="0">0:00</option>\
					            <option value="1">1:00</option>\
					            <option value="2">2:00</option>\
					            <option value="3">3:00</option>\
					            <option value="4">4:00</option>\
					            <option value="5">5:00</option>\
					            <option value="6">6:00</option>\
					            <option value="7">7:00</option>\
					            <option value="8">8:00</option>\
					            <option value="9">9:00</option>\
					            <option value="10">10:00</option>\
					            <option value="11">11:00</option>\
					            <option value="12">12:00</option>\
					            <option value="13">13:00</option>\
					            <option value="14">14:00</option>\
					            <option value="15">15:00</option>\
					            <option value="16">16:00</option>\
					            <option value="17">17:00</option>\
					            <option value="18">18:00</option>\
					            <option value="19">19:00</option>\
					            <option value="20">20:00</option>\
					            <option value="21">21:00</option>\
					            <option value="22">22:00</option>\
					            <option value="23">23:00</option>\
					          </select>\
						</div>\
            </div>\
            <div class="cabinStyle flexRow">\
                <div class="cabinTittle">' +
		get_lan('searchBody').trainNo + '</div>\
                <input type="text" id="trainCabin" placeholder="' + get_lan(
			'searchBody').trainNoText +
		'" autocomplete="off">\
            </div>\
            <div class="searchTrainBtn btnBackColor" state="oneWay">' +
		get_lan('searchBody').search +
		'</div>\
        </div>\
        <div class="searchPage carBody">\
          <div class="cityStyle flexRow" style="margin-top:20px;">\
              <div class="cityTittle">' +
		get_lan('searchBody').carFrom +
		'</div>\
              <input autocomplete="off" type="text" id="carDeparture" placeholder="' + get_lan('searchBody')
		.carFrom + '">\
          </div>\
          <div class="cityStyle flexRow">\
              <div class="cityTittle">' +
		get_lan('searchBody').carTO +
		'</div>\
              <input autocomplete="off" type="text" id="carArrival" placeholder="' + get_lan('searchBody').carTO +
		'">\
          </div>\
          <div class="cityStyle flexRow">\
              <div class="cityTittle">' + get_lan(
			'searchBody').carFromDate +
		'</div>\
              <input autocomplete="off" type="text" id="carFromDate" readonly>\
              <select id="carFromHour">\
              </select>\
              <select id="carFromMin">\
                <option value="00">00</option>\
                <option value="30">30</option>\
              </select>\
          </div>\
          <div class="cityStyle flexRow">\
              <div class="cityTittle">' +
		get_lan('searchBody').carToDate +
		'</div>\
              <input autocomplete="off" type="text" id="carToDate" readonly>\
              <select id="carToHour">\
              </select>\
              <select id="carToMin">\
                <option value="00">00</option>\
                <option value="30">30</option>\
              </select>\
          </div>\
          <div class="cityStyle flexRow carLine">\
              <div class="cityTittle" style="'+enStyle+'">' +
		get_lan('searchBody').carCompany +
		'</div>\
              <select id="carCompany"></select>\
          </div>\
          <div class="searchCarBtn btnBackColor">' +
		get_lan('searchBody').search +
		'</div>\
        </div>\
        <div class="searchPage visaBody">\
        </div>\
    ')
	if ($.session.get('obtLanguage') == "EN") {
		$("#carRental").css("margin-top", "-5px");
		$("#carRental").css("line-height", "18px");
	}
	// 12.24   hotelPrice  删除币种符号
	$('input[name="hotel"]').unbind("click").click(function() {
		console.log($('input[name="hotel"]:checked'))
		var hotelType = $('input[name="hotel"]:checked')[0].id
		if (hotelType == "intlHotel") {
			$("#hotelPrice").val("0-5000")
			$(".hotelPriceBody").html('<div class="hotelPriceLi" minPrice="0" maxPrice="5000">' + get_lan('searchBody').all +
				'</div>\
						<div class="hotelPriceLi" minPrice="0" maxPrice="150">0-150</div>\
						<div class="hotelPriceLi" minPrice="151" maxPrice="300">151-300</div>\
						<div class="hotelPriceLi" minPrice="301" maxPrice="450">301-450</div>\
						<div class="hotelPriceLi" minPrice="451" maxPrice="600">451-600</div>\
						<div class="hotelPriceLi" minPrice="601" maxPrice="1000">601-1000</div>\
						<div class="hotelPriceLi" minPrice="1000" maxPrice="5000">1000+</div>'
			)
		} else {
			$("#hotelPrice").val("0-5000"+ProfileInfo.OfficeCurrency)
			$(".hotelPriceBody").html('<div class="hotelPriceLi" minPrice="0" maxPrice="5000">' + get_lan('searchBody').all +
				'</div>\
						<div class="hotelPriceLi" minPrice="0" maxPrice="150">0-150'+ProfileInfo.OfficeCurrency+'</div>\
						<div class="hotelPriceLi" minPrice="151" maxPrice="300">151-300'+ProfileInfo.OfficeCurrency+'</div>\
						<div class="hotelPriceLi" minPrice="301" maxPrice="450">301-450'+ProfileInfo.OfficeCurrency+'</div>\
						<div class="hotelPriceLi" minPrice="451" maxPrice="600">451-600'+ProfileInfo.OfficeCurrency+'</div>\
						<div class="hotelPriceLi" minPrice="601" maxPrice="1000">601-1000'+ProfileInfo.OfficeCurrency+'</div>\
						<div class="hotelPriceLi" minPrice="1000" maxPrice="5000">1000+'+ProfileInfo.OfficeCurrency+'</div>'
			)
		}
		$(".hotelPriceLi").on('mousedown', function() {
			$("#hotelPrice").val($(this).text());
			$("#hotelPrice").attr("minPrice", $(this).attr("minPrice"));
			$("#hotelPrice").attr("maxPrice", $(this).attr("maxPrice"));
		})

	})

	for (var i = 0; i < 24; i++) {
		$("#carFromHour,#carToHour").append('\
            <option value="' + i + '">' + i + '</option>\
            ')
		// $("#domDepartureSelect,#domReturnSelect,#intlDepartureSelect,#intlReturnSelect,.MultipleSelect").append('\
		//     <option value="'+i+'">'+i+':00</option>\
		//     ')
	}
	// for(var i=0;i<10;i++){
	//     $("#carFromMin,#carToMin").append('\
	//         <option value="'+i+'">0'+i+'</option>\
	//         ')
	// }
	// for(var i=10;i<60;i++){
	//     $("#carFromMin,#carToMin").append('\
	//         <option value="'+i+'">'+i+'</option>\
	//         ')
	// }
	//<option berthType="">'+get_lan('searchBody').cabins.cabin1+'</option>
	$(".selectTimeStyle").remove();
	$("#hotelAddress").on('input propertychange', function() {
		$("#hotelAddress").removeAttr("key");
	})
	if (obtLanguage == "EN") {
		$(".intlTabBar").css("margin-left", "100px");
	}
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/ProfilePost",
			jsonStr: '{"key":' + netUserId + '}'
		},
		success: function(data) {
			var res = JSON.parse(data);
			console.log('isDomesticAir='+res.isDomesticAir+' isInterAir='+res.isInterAir+' isHotel='+res.isHotel+' isTrain='+res.isTrain);

			var accessInfo = {
				"isDomesticAir": res.isDomesticAir,
				"isInterAir": res.isInterAir,
				"isHotel": res.isHotel,
				"isTrain": res.isTrain,
			}
			$.session.set('accessInfo', JSON.stringify(accessInfo));
			var flag = 0;
			if (!res.isDomesticAir) {
				$(".airDom ").hide();
				$('.airDomBody').hide();
			}else{
				if(flag==0){
					$('.airDomBody').show();
					$('.airDom ').addClass('tabActive');
					flag=1;
				}
			}
			if (!res.isInterAir) {
				$(".airIntl ").hide();
				$('.airIntlBody').hide();
			}else{
				if(flag==0){
					$('.airIntlBody').show();
					$("#intlRoundTrip").click();
					$('.airIntl ').addClass('tabActive');
					flag=1;
				}
			}
			if (!res.isHotel) {
				$(".Hotel ").hide();
				$('.hotelBody').hide();
			}else{
				if(flag==0){
					$('.Hotel ').addClass('tabActive');
					if (ProfileInfo.HotelJumpHRS) {
						window.open(ProfileInfo.HotelJumpHRS_Url);
						$(".tab").eq(0).click();
					} else {
						$('.hotelBody').show();
					}
					flag=1;
				}
			}
			if (!res.isTrain) {
				$(".Train").hide();
				$('.trainBody').hide();
			}else{
				if(flag==0){
					$('.Train ').addClass('tabActive');
					$('.trainBody').show();
					flag=1;
				}
			}
			if (!res.isDomesticAir && !res.isInterAir && !res.isHotel && !res.isTrain) {
				$(".searchBody").hide();
			}
			if (res.onlineStyle == "APPLE") {
				$(".Hotel").hide();
				$(".appleHotel").removeClass("hide");
				$(".hotelBody").remove();
			} else {
				$(".appleHotelBody").remove();
			}
			if (res.InterDirectSearch) {
				$(".intlDirectCheckBox").prop("checked", true);
			}
			if (res.QueryDomesticTicketsWithTime && res.DomesticHideAllDay) {
				$(".domAllDay").remove();
				$("#domDepartureSelect").val("8");
				$("#domReturnSelect").val("17");
			}
			if (res.SearchInterAirWTime && res.DomesticHideAllDay) {
				$(".intlAllDay").remove();
				$("#intlDepartureSelect").val("8");
				$("#intlReturnSelect").val("17");
				$(".MultipleSelect").val("8");
				$('.domMultipleSelect').val('8')
			}
			
			if (res.SearchTrainWithTimeDetail) {
				$(".trainAllDay").remove();
				// domDepartureSelect
				$(".trainDepartureSelect").val("8");
				$('.trainReturnSelect').val('17')
			}
			if(res.HideInterMutiple){
				$('#intlMultipleTrip+label').remove()
				$('#intlMultipleTrip').remove()
			}
			chooseDom(); //国内机票
			chooseIntl(); //国际机票
			chooseTrain(); //国内火车票
			chooseHotel(); //酒店
			chooseCar(); //租车
		},
		error: function() {
			// alert('fail');
		}
	});
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/QueryService.svc/QueryDateLimit",
			jsonStr: '{"id":' + netUserId + ',"Language":"' + obtLanguage + '"}'
		},
		success: function(data) {
			var res = JSON.parse(data);
			console.log(res);
			res.map(function(item) {
				if (item.LimitType == 1) {
					$(".searchDomBtn").attr("CanSearch", item.CanSearch);
					$(".searchDomBtn").attr("StartLimit", item.StartLimit);
					$(".searchDomBtn").attr("Message", item.Message);
				}
				if (item.LimitType == 2) {
					$(".searchIntlBtn").attr("CanSearch", item.CanSearch);
					$(".searchIntlBtn").attr("StartLimit", item.StartLimit);
					$(".searchIntlBtn").attr("Message", item.Message);
				}
				if (item.LimitType == 3) {
					$(".searchHotelBtn").attr("CanSearch", item.CanSearch);
					$(".searchHotelBtn").attr("StartLimit", item.StartLimit);
					$(".searchHotelBtn").attr("Message", item.Message);
				}
			})
		},
		error: function() {
			// alert('fail');
		}
	});
	/*根据profile的改变*/
	if (!ProfileInfo.isCodeShare) {
		$(".domCodeShareText").remove();
		$(".domCodeShareCheckBox").remove();
	}
	if (!ProfileInfo.QueryDomesticTicketsWithTime) {
		$("#domDepartureSelect,#domReturnSelect").remove();
	}
	if (!ProfileInfo.SearchTrainWithTimeDetail) {
		$(".trainDepartureSelect,.trainReturnSelect").remove();
	}
	if (!ProfileInfo.ShowDomesticTimeSlt) {
		$(".plusMinus").remove();
	}
	if (!ProfileInfo.SearchInterAirWTime) {
		$("#intlDepartureSelect,#intlReturnSelect,.MultipleSelect").remove();
	}
	//隐藏租车公司权限
	if(ProfileInfo.HideCarRentalCompany){
		$('.carLine').remove()
	}
	// 方糖，隐藏舱位类型选择，国内国际
	if(ProfileInfo.NeedSpecialPolicy){
		$("#domCabin  option:first").prop("selected", 'selected');
		$("#domCabin").attr('disabled','disabled')
		$("#intlCabin  option:first").prop("selected", 'selected');
		$("#intlCabin").attr('disabled','disabled')
	}
	$('.searchPage').hide();
	$('.airDomBody').show();
	//tab切换
	$(".tab").unbind("click").click(function() {
		$('.tab').removeClass('tabActive');
		$(this).addClass('tabActive');
		$('.searchPage').hide();
		if ($(this).hasClass('airDom')) {
			$('.airDomBody').show();
		} else if ($(this).hasClass('airIntl')) {
			$('.airIntlBody').show();
			$("#intlRoundTrip").click();
			// if(ProfileInfo.onlineStyle=="APPLE"){
			//     $(".oneWayIntl").hide();
			// }
		} else if ($(this).hasClass('Hotel')) {
			if (ProfileInfo.HotelJumpHRS) {
				window.open(ProfileInfo.HotelJumpHRS_Url);
				$(".tab").eq(0).click();
			} else {
				$('.hotelBody').show();
			}
		} else if ($(this).hasClass('Train')) {
			$('.trainBody').show();
		} else if ($(this).hasClass('appleHotel')) {
			appleHotelPop();
			$('.appleHotelBody').show();
		} else if ($(this).hasClass('Car')) {
			$('.carBody').show();
		} else if ($(this).hasClass('Visa')) {
			$('.visaBody').show();
			// window.location.href='../visa/visaPage.html'
		}
	})
	if (TAnumber != undefined && TAnumber != "") {
		getCity()
	}
	// 2020.11.26 酒店跳转
	if(ProfileInfo.HotelJumpHRSWeb){
		$('#indexHotelTab').unbind("click").click(function(){
			window.open(ProfileInfo.HRSWebsite);
		})
	}
}
/*2020-2-11 apple酒店提醒*/
function appleHotelPop(callback) {
	$("body").append(
		'\
	 <div class="remindCover" style="position: fixed;top: 0;left: 0;bottom: 0;right: 0;background: rgba(0, 0, 0, 0.7);z-index: 9999;">\
	       <div class="remindPop" style="width: 1000px;height: 270px;background-color: #fff;z-index: 101;position: fixed;top: 50%;left: 50%;transform: translate(-50%,-50%);border-radius: 10px;padding: 10px;font-family: Sans-serif,Arial,Verdana;">\
	         <div class="remindPopTittle" style="border-bottom:1px solid #e6e6e6;width: 100%;height: 80px;line-height: 80px;font-size: 26px;font-weight: 600;position: relative;box-sizing: border-box;padding-left: 10px;font-family: Arial,Verdana;">HOTEL BOOKING ALERT<div class="WHclosePopIcon" style="width: 30px;height: 30px;line-height: 30px;text-align: center;font-size: 26px;font-weight: 600;color: #9b9b9b;position: absolute;top: 25px;right: 10px;cursor: pointer;">x</div></div>\
	         <div style="box-sizing: border-box;padding:10px;font-size: 15px;line-height:24px;">\
			   <p>Apple Travel currently is working with our hotel partners to ensure that we only have our colleagues stay in hotels that meet the standard set by EHS. </p>\
			   <br><p>Hotels in China may temporarily suspend operations or change check-in restrictions due to the ongoing COVID-19 situation. If you plan to stay at a hotel in China within the next two days, please contact Apple Travel to confirm hotel restrictions before traveling.</p>\
	         </div>\
	       </div>\
	     </div>\
	     '
	)
	$(".WHclosePopIcon").unbind("click").click(function() {
		$(".remindCover").remove();
		if (callback) {
			callback();
		}
	})
}
/*end*/
//国内机票
function chooseDom() {
	$("input[name=domTrip]").each(function() {
		$(this).click(function() {
			var discount = $(this).attr('id');
			if (discount == "domOneWay") {
				$('.domnotMultiple').show()
				$('.domMultiple').hide()
				$(".domDateTittle,#domReturnDate,#domReturnSelect").css('color', '#9b9b9b');
				$(".domDateBody").eq(1).css('border', '1px solid #9b9b9b');
				$("#domDepartureDate").datepicker('destroy');
				// 12.04修改
				$("#returnPlusMinus").css({
					'color': '#9b9b9b',
					'border': '1px solid #9b9b9b'
				});
				$("#returnPlusMinus").attr('disabled', 'disabled')

				// $("#domReturnDate").datepicker('destroy');
				// $("#domDepartureDate").datepicker({
				// 	dateFormat: 'yy-mm-dd',
				// 	timeFormat: "HH:mm",
				// 	changeMonth: true,
				// 	minDate: 0, // 当前日期之后的 0 天，就是当天
				// 	maxDate: 365, // 当前日期之后的 0 天，就是当天
				// 	hideIfNoPrevNext: true,
				// 	showOtherMonths: true,
				// 	selectOtherMonths: true,
				// 	changeYear: true,
				// });
				$("#domReturnDate").attr('disabled', 'disabled')
				$("#domReturnSelect").attr('disabled', 'disabled')
				dateChoose("domDepartureDate", "");
				$('.searchDomBtn').attr('state', 'oneWay')
			}
			if (discount == "domRoundTrip") {
				$('.domnotMultiple').show()
				$('.domMultiple').hide()
				$(".domDateTittle,#domReturnDate,#domReturnSelect").css('color', '#000');
				$(".domDateBody").eq(1).css('border', '1px solid #000');
				$("#domReturnDate").val(getNextDay($("#domDepartureDate").val()));
				// 12.04修改
				// $("#returnPlusMinus").css({'color':'#000','border':'1px solid #000'});
				// $("#returnPlusMinus").removeAttr('disabled')
				GrayreturnPlusMinus()
				$("#domReturnDate").removeAttr('disabled')
				$("#domReturnSelect").removeAttr('disabled')
				$("#domDepartureDate").datepicker('destroy');
				dateChoose("domDepartureDate", "domReturnDate");
				$('.searchDomBtn').attr('state', 'roundTrip');
			}
			if(discount=='domMultiple'){
				$('.domnotMultiple').hide()
				$('.domMultiple').show()
				$('.domAirMultipleBody').show()
				$('.searchDomBtn').attr('state', 'multiple')
			}
		});
	});
	// 12.04修改
	$("#returnPlusMinus").css({
		'color': '#9b9b9b',
		'border': '1px solid #9b9b9b'
	});
	$("#returnPlusMinus").attr('disabled', 'disabled')
	$("#domReturnSelect").attr('disabled', 'disabled')
	$('.plusMinus').val('12')//3改成12
	GrayDepartPlusMinus()
	// 2020.1.20 新增国际机票
	// $("#returnPlusMinusintel").css({
	// 	'color': '#9b9b9b',
	// 	'border': '1px solid #9b9b9b'
	// });
	// $("#returnPlusMinus").attr('disabled', 'disabled')
	// $("#domReturnSelect").attr('disabled', 'disabled')

	$('#DepartPlusMinusintel').val('12')//5改成12
	$('#returnPlusMinusintel').val('12')
	GrayIntelDepartPlusMinus()

	$("#domDepartureCity").kuCity();
	$("#domArrivalCity").kuCity();
	//国内多段
	$('.domMultipleDeparture').kuCity()
	$('.domMultipleArrivel').kuCity()
	
	$("#domDepartureDate").datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		minDate: 0, // 当前日期之后的 0 天，就是当天
		maxDate: 365, // 当前日期之后的 0 天，就是当天
		hideIfNoPrevNext: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		changeYear: true,
	});
	$("#domDepartureDate").val(GetDateStr(0));
	$("#domReturnDate").val(GetDateStr(1));
	// 国内票多段时间
	$(".domMultipleDepartureDate").eq(0).val(GetDateStr(0));
	domMultipleDepartureDate();
	/*apple*/
	if (ProfileInfo.onlineStyle == "APPLE") {
		$("#domCabin").remove();
		$(".domCabinTittle").remove();
		
		$('.domTabBar span').eq(2).remove()
	}
	/*交换*/
	$(".switchIconDom").unbind("click").click(function() {
		cityConversion("domDepartureCity", "domArrivalCity")
	})
	$(".searchDomBtn").unbind("click").click(function() {
		// var btnState=$('.searchDomBtn').attr('state')
		//单程往返
		var that = this;
		var hasDom=false;
		if($('#domDepartureCity').attr("code") && $('#domArrivalCity').attr("code")){
			hasDom=true;
		}
		var hasmultiple=false;
		if($('.domMultipleDeparture').eq(0).attr('code') && $('.domMultipleDeparture').eq(1).attr('code')&&$('.domMultipleArrivel').eq(0).attr('code') && $('.domMultipleArrivel').eq(1).attr('code')){
			hasmultiple=true;
		}
		if (hasDom || hasmultiple) {
			var cityList = '"' + $('#domDepartureCity').attr("code") + '","' + $('#domArrivalCity').attr("code") + '"';
			tools.appleRemindPop(cityList, 1, netUserId, function() {
				var starDom = $('input[name="domTrip"]:checked').attr('id')=="domMultiple"?$('.domMultipleDepartureDate').eq(0).val():$('#domDepartureDate').val()
				if ($(that).attr("startlimit") && parseInt($(that).attr("startlimit")) > 0) {
					if (datedifference(getNowFormatDate(), starDom) < parseInt($(that).attr("startlimit"))) {
						if ($(that).attr("Message").indexOf("\\n") != -1) {
							var mymessage = confirm($(that).attr("Message").split("\\n").join('\n'));
						} else {
							var mymessage = confirm($(that).attr("Message"));
						}
						if (mymessage == true) {
							if ($(that).attr("CanSearch") != "true") {
								return false;
							}
						} else {
							return false;
						}
					}
				}

				if (ProfileInfo.onlineStyle == "APPLE") {
					var r = confirm(get_lan("appleSearchRemind"));
					if (r == false) {
						return false;
					}
					var berthtype = 1;
					searchDom(berthtype)
				} else {
					var berthtype = $("#domCabin  option:selected").attr("berthtype");
					searchDom(berthtype)
				}
			});

			function searchDom(berthtype) {
				if ($(".searchDomBtn").attr("state") == "oneWay") {
					var searchDomInfo = {
						'type': 'oneWay',
						'departureCityText': $('#domDepartureCity').val(),
						'arrivalCityText': $('#domArrivalCity').val(),
						'departureCity': $('#domDepartureCity').attr("code"),
						'arrivalCity': $('#domArrivalCity').attr("code"),
						'date': $('#domDepartureDate').val(),
						'queryKey': $('#domDepartureCity').attr("code") + ',' + $('#domArrivalCity').attr("code") + ',' + $(
							'#domDepartureDate').val() + ',' + 'ALL',
						'showCabins': berthtype,
						'codeShare': $('.domCodeShareCheckBox').is(':checked'),
						'isDirect': $('.domCabinInfo .domDirectCheckBox').is(':checked'),
					}
					if (ProfileInfo.QueryDomesticTicketsWithTime) {
						if ($("#domDepartureSelect  option:selected").val() == "all" || $("#domDepartureSelect  option:selected").val() == undefined) {
							var DepartureSelectValue = ''
						} else {
							var DepartureSelectValue = ' ' + $("#domDepartureSelect  option:selected").val() + ':00:00';
						}
						searchDomInfo.queryKey = $('#domDepartureCity').attr("code") + ',' + $('#domArrivalCity').attr("code") + ',' +
							$(
								'#domDepartureDate').val() + DepartureSelectValue + ',ALL'
					}
					//12.04修改
					if (ProfileInfo.ShowDomesticTimeSlt) {
						$.session.set('searchDomesticDay', $('#DepartPlusMinus').val());
					} else {
						$.session.set('searchDomesticDay', '');
					}
					$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
					window.location.href = '../../domesticAir/airTicketList.html';
				} else if ($(".searchDomBtn").attr("state") == "roundTrip") {
					var searchDomInfo = {
						'type': 'roundTrip',
						'departureCityText': $('#domDepartureCity').val(),
						'arrivalCityText': $('#domArrivalCity').val(),
						'departureCity': $('#domDepartureCity').attr("code"),
						'arrivalCity': $('#domArrivalCity').attr("code"),
						'date': $('#domDepartureDate').val(),
						'returndate': $('#domReturnDate').val(),
						'queryKey': $('#domDepartureCity').attr("code") + ',' + $('#domArrivalCity').attr("code") + ',' + $(
							'#domDepartureDate').val() + ',' + 'ALL',
						'queryKeyReturn': $('#domArrivalCity').attr("code") + ',' + $('#domDepartureCity').attr("code") + ',' + $(
							'#domDepartureDate').val() + ',' + $('#domReturnDate').val() + ',',
						'showCabins': berthtype,
						'codeShare': $('.domCodeShareCheckBox').is(':checked'),
						'isDirect': $('.domCabinInfo .domDirectCheckBox').is(':checked'),
					}
					if (ProfileInfo.QueryDomesticTicketsWithTime) {
						if ($("#domDepartureSelect  option:selected").val() == "all" || $("#domDepartureSelect  option:selected").val() == undefined) {
							var DepartureSelectValue = ''
						} else {
							var DepartureSelectValue = ' ' + $("#domDepartureSelect  option:selected").val() + ':00:00';
						}
						if ($("#domReturnSelect  option:selected").val() == "all" || $("#domReturnSelect  option:selected").val() == undefined) {
							var ReturnSelectValue = ''
						} else {
							var ReturnSelectValue = ' ' + $("#domReturnSelect  option:selected").val() + ':00:00';
						}
						//12.04修改
						if (ProfileInfo.ShowDomesticTimeSlt) {
							if ($('#domDepartureSelect').val() == 'all') {
								$.session.set('searchDomesticDay', '');
							} else {
								$.session.set('searchDomesticDay', $('#DepartPlusMinus').val());
							}
							if ($('#domReturnSelect').val() == 'all') {
								$.session.set('searchDomesticReturnDay', '');
							} else {
								$.session.set('searchDomesticReturnDay', $('#returnPlusMinus').val());
							}
						} else {
							$.session.set('searchDomesticDay', '');
							$.session.set('searchDomesticReturnDay', '');
						}


						searchDomInfo.queryKey = $('#domDepartureCity').attr("code") + ',' + $('#domArrivalCity').attr("code") + ',' +
							$(
								'#domDepartureDate').val() + DepartureSelectValue + ',ALL';
						searchDomInfo.queryKeyReturn = $('#domArrivalCity').attr("code") + ',' + $('#domDepartureCity').attr("code") +
							',' + $('#domDepartureDate').val() + DepartureSelectValue + ',' + $('#domReturnDate').val() +
							ReturnSelectValue +
							',ALL';
					}
					$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
					window.location.href = '../../domesticAir/airTicketList.html';
				}else if($(".searchDomBtn").attr("state") == "multiple"){
					var searchDomInfo = {
						'type': 'multiple',
						'departureCityText': $('.domMultipleDeparture').eq(0).val(),
						'arrivalCityText':  $('.domMultipleArrivel').eq(0).val(),
						'lastDepartureCityText':  $('.domMultipleDeparture').eq(1).val(),
						'lastCityText':  $('.domMultipleArrivel').eq(1).val(),
						'departureCity': $('.domMultipleDeparture').eq(0).attr('code'),
						'arrivalCity': $('.domMultipleArrivel').eq(0).attr("code"),
						'lastDepartureCity': $('.domMultipleDeparture').eq(1).attr('code'),
						'lastCity': $('.domMultipleArrivel').eq(1).attr('code'),
						'date': $('.domMultipleDepartureDate').eq(0).val(),
						'returndate':$('.domMultipleDepartureDate').eq(1).val(),
						'queryKey': $('.domMultipleDeparture').eq(0).attr('code') + ',' + $('.domMultipleArrivel').eq(0).attr('code') + ',' + $(
							'.domMultipleDepartureDate').eq(0).val() + ',' + 'ALL',
						'queryKeyReturn': $('.domMultipleDeparture').eq(1).attr('code') + ',' + $('.domMultipleArrivel').eq(1).attr('code') + ','+$(
							'.domMultipleDepartureDate').eq(0).val() +','+ $('.domMultipleDepartureDate').eq(1).val(),
						'showCabins': berthtype,
						'codeShare': $('.domCodeShareCheckBox').is(':checked'),
						'isDirect': $('.domMultiCabinInfo .domDirectCheckBox').is(':checked'),
					}
					$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
					window.location.href = '../../domesticAir/airTicketList.html';
				}
			}
		} else {
			alert(get_lan('searchRemind'));
		}
	})
}
//国际机票
function chooseIntl() {
	$("input[name=intlTrip]").each(function() {
		$(this).click(function() {
			var discount = $(this).attr('id');
			if (discount == "intlOneWay") {
				$(".intlAirBody").removeClass("hide");
				$(".intlAirMultipleBody").addClass("hide");
				$(".intlDateTittle,#intlReturnDate,#intlReturnSelect").css('color', '#9b9b9b');
				$(".intlDateBody").eq(1).css('border', '1px solid #9b9b9b');
				$("#intlDepartureDate").datepicker('destroy');
				$("#intlReturnDate").datepicker('destroy');
				// $("#intlDepartureDate").datepicker({
				// 	dateFormat: 'yy-mm-dd',
				// 	changeMonth: true,
				// 	minDate: 0, // 当前日期之后的 0 天，就是当天
				// 	maxDate: 365, // 当前日期之后的 0 天，就是当天
				// 	hideIfNoPrevNext: true,
				// 	showOtherMonths: true,
				// 	selectOtherMonths: true,
				// 	changeYear: true,
				// });
				dateChoose("intlDepartureDate", "");
				$('.searchIntlBtn').attr('state', 'oneWay');
				if (ProfileInfo.onlineStyle == "APPLE") {
					var r = confirm(get_lan("appleIntlRemind"))
					if (r == true) {
						$("#intlRoundTrip").click();
					}
				}
				// 改变颜色  禁止选择
				$("#returnPlusMinusintel").css({
					'color': '#9b9b9b',
					'border': '1px solid #9b9b9b'
				});
				$("#returnPlusMinusintel").attr('disabled', 'disabled')
				$("#intlReturnSelect").attr('disabled', 'disabled')
			}
			if (discount == "intlRoundTrip") {
				$(".intlAirBody").removeClass("hide");
				$(".intlAirMultipleBody").addClass("hide");
				$(".intlDateTittle,#intlReturnDate,#intlReturnSelect").css('color', '#000');
				$(".intlDateBody").eq(1).css('border', '1px solid #000');
				$("#intlReturnDate").val(getNextDay($("#intlDepartureDate").val()));
				$("#intlDepartureDate").datepicker('destroy');
				dateChoose("intlDepartureDate", "intlReturnDate");
				$('.searchIntlBtn').attr('state', 'roundTrip')

				$("#returnPlusMinusintel").css({
					// 'color': '#555555',
					// 'border': '1px solid #555555'
					'color': '#000000',
					'border': '1px solid #000000'
				});
				$("#returnPlusMinusintel").removeAttr('disabled')
				$("#intlReturnSelect").removeAttr('disabled')
			}
			if (discount == "intlMultipleTrip") {
				$(".intlAirBody").addClass("hide");
				$(".intlAirMultipleBody").removeClass("hide");
				$('.searchIntlBtn').attr('state', 'multiple')
			}
		});
	});
	// if(ProfileInfo.onlineStyle=="APPLE"){
	// $("input[name=intlTrip]").eq(1).click();
	// }
	/*单程往返*/
	$("#intlDepartureCity").kuCity();
	$("#intlArrivalCity").kuCity();
	$("#transitCity").kuCity();
	/*转机*/
	$(".transitText,.addTransitIcon").unbind("click").click(function() {
		$(".transitCityBody").removeClass("hide");
		$(".addTransitBody").addClass("hide");
		$(".intlDirectCheckBoxBody").addClass("hide");
	})
	$(".hideTransitIcon").unbind("click").click(function() {
		$(".transitCityBody").addClass("hide");
		$(".addTransitBody").removeClass("hide");
		$(".intlDirectCheckBoxBody").removeClass("hide");
	})
	$("#intlDepartureDate").datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		minDate: 0, // 当前日期之后的 0 天，就是当天
		maxDate: 365, // 当前日期之后的 0 天，就是当天
		hideIfNoPrevNext: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		changeYear: true,
	});
	$("#intlDepartureDate").val(GetDateStr(0));
	$("#intlReturnDate").val(GetDateStr(1));
	$(".switchIconIntl").unbind("click").click(function() {
		cityConversion("intlDepartureCity", "intlArrivalCity");
	})
	/*多段*/
	$(".MultipleDepartureDate").eq(0).val(GetDateStr(0));
	MultipleDepartureDate();
	$(".addAirIntlBody").unbind("click").click(function() {
		var multipleLiLength = $(".MultipleDepartureDate").length - 1;
		if (!$(".MultipleDepartureCity").eq(multipleLiLength).attr("code") || !$(".MultipleArrivelCity").eq(
				multipleLiLength).attr("code")) {
			alert(get_lan("searchBody").multipleRemind);
			return false;
		}
		$(this).before(
			'\
            <div class="intlAirMultipleLi flexRow">\
                <div class="MultipleLiIcon">' + ($(
				".intlAirMultipleLi").length + 1) + '</div>\
                <div class="MultipleLiText">' + get_lan(
				'searchBody').departure +
			'</div>\
                <input class="MultipleLiInput MultipleDepartureCity">\
                <div class="MultipleLiText">' +
			get_lan('searchBody').arrival +
			'</div>\
                <input class="MultipleLiInput MultipleArrivelCity" inputIndex="' + $(
				".MultipleArrivelCity").length + '">\
                <div class="MultipleLiText">' + get_lan('searchBody').departureDate +
			'</div>\
                <div class="MultipleLiInputBody flexRow">\
                  <input class="MultipleLiInput MultipleDepartureDate">\
                  <select type="text" class="MultipleSelect">\
                    <option value="all" class="intlAllDay">' +
			get_lan("searchBody").allDay +
			'</option>\
                    <option value="0">0:00</option>\
                    <option value="1">1:00</option>\
                    <option value="2">2:00</option>\
                    <option value="3">3:00</option>\
                    <option value="4">4:00</option>\
                    <option value="5">5:00</option>\
                    <option value="6">6:00</option>\
                    <option value="7">7:00</option>\
                    <option value="8">8:00</option>\
                    <option value="9">9:00</option>\
                    <option value="10">10:00</option>\
                    <option value="11">11:00</option>\
                    <option value="12">12:00</option>\
                    <option value="13">13:00</option>\
                    <option value="14">14:00</option>\
                    <option value="15">15:00</option>\
                    <option value="16">16:00</option>\
                    <option value="17">17:00</option>\
                    <option value="18">18:00</option>\
                    <option value="19">19:00</option>\
                    <option value="20">20:00</option>\
                    <option value="21">21:00</option>\
                    <option value="22">22:00</option>\
                    <option value="23">23:00</option>\
                  </select>\
                </div>\
                <div class="delMultipleLi">x</div>\
              </div>\
            '
		)
		if (ProfileInfo.SearchInterAirWTime && ProfileInfo.DomesticHideAllDay) {
			$(".intlAllDay").remove();
			$(".MultipleSelect").eq($(".MultipleSelect").length - 1).val("8");
		}
		if (!ProfileInfo.SearchInterAirWTime) {
			$(".MultipleSelect").remove();
		}
		$(".MultipleDepartureCity").eq($(".MultipleDepartureCity").length - 1).val($(".MultipleArrivelCity").eq($(
			".MultipleArrivelCity").length - 2).val());
		$(".MultipleDepartureCity").eq($(".MultipleDepartureCity").length - 1).attr("code", $(".MultipleArrivelCity").eq($(
			".MultipleArrivelCity").length - 2).attr("code"));
		$(".MultipleDepartureCity").kuCity();
		$(".MultipleArrivelCity").kuCity();
		// MultipleDepartureDate();
		// var prevMultipVal = $(".MultipleDepartureDate").eq(multipleLiLength-2).val();
		// $(".MultipleDepartureDate").eq(multipleLiLength-1).val(prevMultipVal);
		// $(".MultipleDepartureDate").eq(multipleLiLength-1).datepicker({
		//     dateFormat: 'yy-mm-dd',
		//     changeMonth: true,
		//     minDate: $(".MultipleDepartureDate").eq(multipleLiLength-1).val(),  // 当前日期之后的 0 天，就是当天
		//     hideIfNoPrevNext: true,
		//     showOtherMonths: true,
		//     selectOtherMonths: true,
		// });
		$(".delMultipleLi").unbind("click").click(function() {
			$(this).parent().remove();
			for (var i = 0; i < $(".MultipleLiIcon").length; i++) {
				$(".MultipleLiIcon").eq(i).text(i + 1);
			}
		})
		MultipleDepartureDate("add");
	})
	$(".MultipleDepartureCity").kuCity();
	$(".MultipleArrivelCity").kuCity();
	// MultipleDepartureDate 移到外面去

	/*搜索国际机票*/
	$(".searchIntlBtn").unbind("click").click(function() {
		var that = this;
		if ($(".searchIntlBtn").attr("state") == "oneWay" || $(".searchIntlBtn").attr("state") == "roundTrip") {
			var cityList = '"' + $('#intlDepartureCity').attr("code") + '","' + $('#intlArrivalCity').attr("code") + '"';
			//先调继续搜索接口看有没有弹窗
			tools.appleRemindPop(cityList, 1, netUserId, function() {
				if ($('#intlDepartureCity').attr("code") && $('#intlArrivalCity').attr("code")) {
					if ($(that).attr("startlimit") && parseInt($(that).attr("startlimit")) > 0) {
						if (datedifference(getNowFormatDate(), $('#intlDepartureDate').val()) < parseInt($(that).attr("startlimit"))) {
							if ($(that).attr("Message").indexOf("\\n") != -1) {
								var mymessage = confirm($(that).attr("Message").split("\\n").join('\n'));
							} else {
								var mymessage = confirm($(that).attr("Message"));
							}
							if (mymessage == true) {
								if ($(that).attr("CanSearch") != "true") {
									return false;
								}
							} else {
								return false;
							}
						}
					}
					if (ProfileInfo.onlineStyle == "APPLE") {
						var r = confirm(get_lan("appleSearchRemind"));
						if (r == false) {
							return false;
						} else {
							searchIntl()
						}
					} else {
						searchIntl()
					}

					function searchIntl() {
						if (!$(".transitCityBody").hasClass("hide") && $("#transitCity").attr("code")) {
							var transitCityCode = $("#transitCity").attr("code");
							var isDirect = false;
						} else if (!$(".transitCityBody").hasClass("hide") && !$("#transitCity").attr("code")) {
							alert(get_lan('searchRemind'));
							return false;
						} else {
							var transitCityCode = "";
							var isDirect = $('.intlDirectCheckBox').is(':checked');
						}
						if ($(".searchIntlBtn").attr("state") == "oneWay") {
							if (ProfileInfo.onlineStyle != "APPLE") {
								var r = confirm(get_lan("appleIntlRemind"))
								if (r == false) {
									return false;
								}
							}
							var searchIntlInfo = {
								'type': 'oneWay',
								'departureCityText': $('#intlDepartureCity').val(),
								'arrivalCityText': $('#intlArrivalCity').val(),
								'departureCity': $('#intlDepartureCity').attr("code"),
								'arrivalCity': $('#intlArrivalCity').attr("code"),
								'date': $('#intlDepartureDate').val(),
								'queryKey': $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") + ',' + $(
									'#intlDepartureDate').val(),
								'showCabins': $("#intlCabin  option:selected").attr("berthtype"),
								'isDirect': isDirect,
								'transitCityCode': transitCityCode,
							}

							if (ProfileInfo.SearchInterAirWTime) {
								if ($("#intlDepartureSelect  option:selected").val() == "all" || $("#intlDepartureSelect  option:selected").val() == undefined) {
									var DepartureSelectValue = ''
								} else {
									var DepartureSelectValue = ' ' + $("#intlDepartureSelect  option:selected").val() + ':00:00';
								}
								searchIntlInfo.queryKey = $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") +
									',' +
									$('#intlDepartureDate').val() + DepartureSelectValue;
							}
							// 2020.1.20 国际机票  时间筛选
							if (ProfileInfo.ShowDomesticTimeSlt) {
								if ($('#intlDepartureSelect').val() == 'all') {
									$.session.set('searchIntelDay', '');
								} else {
									$.session.set('searchIntelDay', $('#DepartPlusMinusintel').val());
								}
								// if ($('#domReturnSelect').val() == 'all') {
								// 	$.session.set('searchDomesticReturnDay', '');
								// } else {
								// 	$.session.set('searchDomesticReturnDay', $('#returnPlusMinus').val());
								// }
							} else {
								$.session.set('searchIntelDay', '');
								// $.session.set('searchDomesticReturnDay', '');
							}
							$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
							window.location.href = '../../intlAir/airTicketList.html';
						} else if ($(".searchIntlBtn").attr("state") == "roundTrip") {
							var searchIntlInfo = {
								'type': 'roundTrip',
								'departureCityText': $('#intlDepartureCity').val(),
								'arrivalCityText': $('#intlArrivalCity').val(),
								'departureCity': $('#intlDepartureCity').attr("code"),
								'arrivalCity': $('#intlArrivalCity').attr("code"),
								'date': $('#intlDepartureDate').val(),
								'returndate': $('#intlReturnDate').val(),
								'queryKey': $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") + ',' + $(
									'#intlDepartureDate').val(),
								'queryKeyReturn': $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") + ',' + $(
									'#intlDepartureDate').val() + ',' + $('#intlReturnDate').val(),
								'showCabins': $("#intlCabin  option:selected").attr("berthtype"),
								'isDirect': isDirect,
								'transitCityCode': transitCityCode,
							}
							if (ProfileInfo.SearchInterAirWTime) {
								if ($("#intlDepartureSelect option:selected").val() == "all" || $("#intlDepartureSelect option:selected").val() ==undefined) {
									var DepartureSelectValue = ''
								} else {
									var DepartureSelectValue = ' ' + $("#intlDepartureSelect option:selected").val() + ':00:00';
								}
								if ($("#intlReturnSelect option:selected").val() == "all" || $("#intlReturnSelect option:selected").val() == undefined) {
									var ReturnSelectValue = ''
								} else {
									var ReturnSelectValue = ' ' + $("#intlReturnSelect option:selected").val() + ':00:00';
								}
								searchIntlInfo.queryKey = $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") +
									',' +
									$('#intlDepartureDate').val() + DepartureSelectValue;
								searchIntlInfo.queryKeyReturn = $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") +
									',' + $('#intlDepartureDate').val() + DepartureSelectValue + ',' + $('#intlReturnDate').val() +
									ReturnSelectValue;
							}
							// 2020.1.20 国际机票  时间筛选
							if (ProfileInfo.ShowDomesticTimeSlt) {
								if ($('#intlDepartureSelect').val() == 'all') {
									$.session.set('searchIntelDay', '');
								} else {
									$.session.set('searchIntelDay', $('#DepartPlusMinusintel').val());
								}
								if ($('#intlReturnSelect').val() == 'all') {
									$.session.set('searchIntelReturnDay', '');
								} else {
									$.session.set('searchIntelReturnDay', $('#returnPlusMinusintel').val());
								}
							} else {
								$.session.set('searchIntelDay', '');
								$.session.set('searchIntelReturnDay', '');
							}
							$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
							window.location.href = '../../intlAir/airTicketList.html?intlState=1';
						}
					}
				} else {
					alert(get_lan('searchRemind'));
				}
			});
		} else if ($(".searchIntlBtn").attr("state") == "multiple") {
			var orgList = '';
			var dstList = '';
			var dateList = '';
			/*2020-2-26*/
			var cityList = ''
			/*end*/
			for (var i = 0; i < $(".intlAirMultipleLi").length; i++) {
				if (!$(".MultipleDepartureCity").eq(i).attr("code") || !$(".MultipleArrivelCity").eq(i).attr("code") || $(
						".MultipleDepartureDate").eq(i).val() == "") {
					alert(get_lan('searchRemind'));
					return false;
				}
				if (ProfileInfo.SearchInterAirWTime) {
					if ($(".MultipleSelect").eq(i).val() == "all") {
						var MultipleTime = '';
					} else {
						var MultipleTime = ' ' + $(".MultipleSelect").eq(i).val() + ':00:00';
					}
				} else {
					var MultipleTime = '';
				}
				orgList += $(".MultipleDepartureCity").eq(i).attr("code");
				orgList += ',';
				dstList += $(".MultipleArrivelCity").eq(i).attr("code");
				dstList += ',';
				dateList += $(".MultipleDepartureDate").eq(i).val() + MultipleTime;
				dateList += ',';
				cityList += '"' + $(".MultipleDepartureCity").eq(i).attr("code") + '","' + $(".MultipleArrivelCity").eq(i).attr(
					"code") + '",';
			}
			var intlDateList = dateList.substring(0, dateList.length - 1).split(',');

			function test(arr, i) {
				if (i == 0) {
					return "yes";
				} else {
					console.log(arr[i]);
					if ((new Date(arr[i].split(' ')[0].replace(/-/g, "\/"))) >= (new Date(arr[i - 1].split(' ')[0].replace(/-/g,
							"\/")))) {
						return test(arr, i - 1);
					} else {
						return "no";
					}
				}
			}
			if (test(intlDateList, intlDateList.length - 1) == "no") {
				alert(get_lan('searchRemind'));
				return false;
			}
			// if (ProfileInfo.onlineStyle == "APPLE") {
				var cityList = cityList.substring(0, cityList.length - 1);
				console.log(Array.from(new Set(cityList.split(','))));
				tools.appleRemindPop(cityList, 1, netUserId, function() {
					if ($(that).attr("startlimit") && parseInt($(that).attr("startlimit")) > 0) {
						if (datedifference(getNowFormatDate(), $('.MultipleDepartureDate ').eq(0).val()) < parseInt($(that).attr(
								"startlimit"))) {
							if ($(that).attr("Message").indexOf("\\n") != -1) {
								var mymessage = confirm($(that).attr("Message").split("\\n").join('\n'));
							} else {
								var mymessage = confirm($(that).attr("Message"));
							}
							if (mymessage == true) {
								if ($(that).attr("CanSearch") != "true") {
									return false;
								}else{
									searchMultipleIntl(orgList, dstList, dateList)
								}
							} else {
								return false;
							}
						}else{
							searchMultipleIntl(orgList, dstList, dateList)
						}
					}else{
						searchMultipleIntl(orgList, dstList, dateList)
					}
				});
			// } else {
			// 	searchMultipleIntl(orgList, dstList, dateList);
			// }

			function searchMultipleIntl(orgList, dstList, dateList) {
				var searchIntlInfo = {
					'type': 'multiple',
					"orgList": orgList.substring(0, orgList.length - 1),
					"dstList": dstList.substring(0, dstList.length - 1),
					"dateList": dateList.substring(0, dateList.length - 1),
					"cabinType": $("#MultipleCabin  option:selected").attr("berthtype"),
				}
				$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
				window.location.href = '../../intlAir/airTicketListMultiple.html?intlState=1';
			}
		}
	})
}
//国内多段时间
function domMultipleDepartureDate(type) {
	if(type!="add"){
		$(".domMultipleDepartureDate").datepicker('destroy')
	}
	for (var i = 0; i < $(".domMultipleDepartureDate").length; i++) {
		if (i == $(".domMultipleDepartureDate").length - 2) {
			var dateIndex = i;
			$(".domMultipleDepartureDate").eq(dateIndex + 1).val($(".domMultipleDepartureDate").eq(dateIndex).val());
			var mindate = 0,
				maxdate = 365
			if (TAnumber != undefined && TAnumber != "") {
				// mindate = TAminDate
				var minTime=new Date().getTime()
				var minTime2
				if(TAminDate==0){
					minTime2=new Date().getTime()
				}else{
					minTime2=new Date(TAminDate.replace(/-/g,"/")).getTime()
				}
				mindate=minTime<minTime2?TAminDate:new Date()
				maxTime = TAmaxDate
				maxdate = TAmaxDate
				if(type!="add"){
					var t=new Date(mindate)
					var y=t.getFullYear()
					var m=t.getMonth()+1<10?0+""+(t.getMonth()+1):t.getMonth()+1
					var d=t.getDate()
					$(".domMultipleDepartureDate").eq(dateIndex).val(y+'-'+m+'-'+d);
				}
				$(".domMultipleDepartureDate").eq(dateIndex + 1).val($(".domMultipleDepartureDate").eq(dateIndex).val());
			}
			$(".domMultipleDepartureDate").eq(dateIndex).datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				minDate: mindate, // 当前日期之后的 0 天，就是当天
				maxDate: maxdate, // 当前日期之后的 0 天，就是当天
				hideIfNoPrevNext: true,
				showOtherMonths: true,
				selectOtherMonths: true,
				changeYear: true,
				onSelect: function() {
					// MultipleDepartureDate();
					$(".domMultipleDepartureDate").eq(dateIndex + 1).val($(".domMultipleDepartureDate").eq(dateIndex).val());
					$(".domMultipleDepartureDate").eq(dateIndex + 1).datepicker('destroy');
					$(".domMultipleDepartureDate").eq(dateIndex + 1).datepicker({
						dateFormat: 'yy-mm-dd',
						changeMonth: true,
						minDate: $(".domMultipleDepartureDate").eq(dateIndex + 1).val(), // 当前日期之后的 0 天，就是当天
						maxDate: maxdate, // 当前日期之后的 0 天，就是当天
						hideIfNoPrevNext: true,
						showOtherMonths: true,
						selectOtherMonths: true,
						changeYear: true,
					});
				}
			});
			$(".domMultipleDepartureDate").eq(dateIndex + 1).datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				minDate: $(".domMultipleDepartureDate").eq(dateIndex + 1).val(), // 当前日期之后的 0 天，就是当天
				maxDate: maxdate, // 当前日期之后的 0 天，就是当天
				hideIfNoPrevNext: true,
				showOtherMonths: true,
				selectOtherMonths: true,
				changeYear: true,
				onSelect: function() {
					// MultipleDepartureDate();
				}
			});
		}
	}
}
// 多段 时间
function MultipleDepartureDate(type) {
	if(type!="add"){
		$(".MultipleDepartureDate").datepicker('destroy')
	}
	for (var i = 0; i < $(".MultipleDepartureDate").length; i++) {
		if (i == $(".MultipleDepartureDate").length - 2) {
			var dateIndex = i;
			$(".MultipleDepartureDate").eq(dateIndex + 1).val($(".MultipleDepartureDate").eq(dateIndex).val());
			var mindate = 0,
				maxdate = 365
			if (TAnumber != undefined && TAnumber != "") {
				// mindate = TAminDate
				var minTime=new Date().getTime()
				var minTime2
				if(TAminDate==0){
					minTime2=new Date().getTime()
				}else{
					minTime2=new Date(TAminDate.replace(/-/g,"/")).getTime()
				}
				mindate=minTime<minTime2?TAminDate:new Date()
				maxTime = TAmaxDate
				maxdate = TAmaxDate
				if(type!="add"){
					var t=new Date(mindate)
					var y=t.getFullYear()
					var m=t.getMonth()+1<10?0+""+(t.getMonth()+1):t.getMonth()+1
					var d=t.getDate()
					$(".MultipleDepartureDate").eq(dateIndex).val(y+'-'+m+'-'+d);
				}
				$(".MultipleDepartureDate").eq(dateIndex + 1).val($(".MultipleDepartureDate").eq(dateIndex).val());
			}
			$(".MultipleDepartureDate").eq(dateIndex).datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				minDate: mindate, // 当前日期之后的 0 天，就是当天
				maxDate: maxdate, // 当前日期之后的 0 天，就是当天
				hideIfNoPrevNext: true,
				showOtherMonths: true,
				selectOtherMonths: true,
				changeYear: true,
				onSelect: function() {
					// MultipleDepartureDate();
					$(".MultipleDepartureDate").eq(dateIndex + 1).val($(".MultipleDepartureDate").eq(dateIndex).val());
					$(".MultipleDepartureDate").eq(dateIndex + 1).datepicker('destroy');
					$(".MultipleDepartureDate").eq(dateIndex + 1).datepicker({
						dateFormat: 'yy-mm-dd',
						changeMonth: true,
						minDate: $(".MultipleDepartureDate").eq(dateIndex + 1).val(), // 当前日期之后的 0 天，就是当天
						maxDate: maxdate, // 当前日期之后的 0 天，就是当天
						hideIfNoPrevNext: true,
						showOtherMonths: true,
						selectOtherMonths: true,
						changeYear: true,
					});
				}
			});
			$(".MultipleDepartureDate").eq(dateIndex + 1).datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				minDate: $(".MultipleDepartureDate").eq(dateIndex + 1).val(), // 当前日期之后的 0 天，就是当天
				maxDate: maxdate, // 当前日期之后的 0 天，就是当天
				hideIfNoPrevNext: true,
				showOtherMonths: true,
				selectOtherMonths: true,
				changeYear: true,
				onSelect: function() {
					// MultipleDepartureDate();
				}
			});
		}
	}
}

/*时间内提示*/
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

function datedifference(sDate1, sDate2) {
	var dateSpan,
		tempDate,
		iDays;
	sDate1 = Date.parse(sDate1);
	sDate2 = Date.parse(sDate2);
	dateSpan = sDate2 - sDate1;
	dateSpan = Math.abs(dateSpan);
	iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
	return iDays
};
//酒店
function chooseHotel() {
	$("input[name=hotel],input[name=applehotel]").each(function() {
		$(this).click(function() {
			var discount = $(this).attr('id');
			if (discount == "domHotel") {
				$(".hotelCityChange").val('');
				$(".hotelCityChange").removeAttr('code');
				$(".hotelCityChange").removeAttr("id").attr("id", "hotelCity");
				$("#hotelCity").kuCity();
				$('.searchHotelBtn').attr('state', 'domHotel');
				$('.searchAppleHotelBtn').attr('state', 'domHotel');
			}
			if (discount == "intlHotel") {
				$(".hotelCityChange").val('');
				$(".hotelCityChange").removeAttr('code');
				$(".hotelCityChange").removeAttr("id").attr("id", "hotelIntlCity");
				$("#hotelIntlCity").kuCity();
				$('.searchHotelBtn').attr('state', 'intlHotel');
				$('.searchAppleHotelBtn').attr('state', 'intlHotel');
			}
		});
	});
	$("#hotelCity").kuCity();
	$("#hotelDepartureDate").val(GetDateStr(0));
	$("#hotelReturnDate").val(GetDateStr(1));
	$("#hotelReturnDate").css('color', '#000');
	$("#hotelReturnDate").css('border', '1px solid #000');
	dateChoose("hotelDepartureDate", "hotelReturnDate");

	/*改变酒店金额*/
	$("#hotelPrice").unbind("change").change(function() {
		if ($("#hotelPrice").val().indexOf("-") != -1) {
			var hotelPriceList = $("#hotelPrice").val().substring(1, $("#hotelPrice").val().length).split('-');
			$("#hotelPrice").attr('minPrice', hotelPriceList[0]);
			$("#hotelPrice").attr('maxPrice', hotelPriceList[1]);
		}
	})

	$("input[name=hotelCheck]").each(function() {
		$(this).click(function() {
			if ($(this).is(':checked')) {
				$(this).next(".star").css("color", "#F58A00");
			} else {
				$(this).next(".star").css("color", "#000");
			}
		});
	});
	$("#keyWordInput").unbind("click").click(function() {
		if ($(".searchHotelBtn").attr("state") == "domHotel") {
			var hotelCityCode = $('#hotelCity').attr("code");
		} else if ($(".searchHotelBtn").attr("state") == "intlHotel") {
			var hotelCityCode = $('#hotelIntlCity').attr("code");
		}
		if (!hotelCityCode) {
			$(".keyWordBody").html('');
			alert(get_lan('searchBody').keyWordRemind);
		} else {
			$("#keyWordInput").on('input propertychange', function() {
				debounceSearchHotel();
			})
			var debounceSearchHotel = debounce(searchHotel,500);
			function searchHotel(){
				$(".keyWordBody").html("");
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/QueryService.svc/SearchHotelRelatedInfoPost",
						jsonStr: '{"cityCode":"' + hotelCityCode + '","id":' + netUserId + ',"language":"' + obtLanguage +
							'","queryKey":"' + $("#keyWordInput").val() + '"}'
					},
					success: function(data) {
						var res = JSON.parse(data);
						console.log(res);
						$(".keyWordBody").html('<ul class="keyWordBodyList"></ul>');
						res.RelatedInfos.map(function(item) {
							var keyWordType = '', keyWordTypeText = '';
							switch(parseInt(item.Type)){
								case 1: 
									keyWordType = 'keywordTitle--district'; 
									keyWordTypeText = get_lan('keyWordBody').keywordDistrict; 
									break;
								case 2: 
									keyWordType = 'keywordTitle--commercial';
									keyWordTypeText = get_lan('keyWordBody').keywordCommercial; 
									break;
								case 3: 
									keyWordType = 'keywordTitle--extCommercial';
									keyWordTypeText = get_lan('keyWordBody').keywordExtCommercial; 
									break;
								case 4: 
									keyWordType = 'keywordTitle--brand';
									keyWordTypeText = get_lan('keyWordBody').keywordBrand; 
									break;
								case 5: 
									keyWordType = 'keywordTitle--hotel';
									keyWordTypeText = get_lan('keyWordBody').keywordHotel; 
									break;
								default: 
									keyWordType = '';
									keyWordTypeText = ''; 
									break;
							}
							var contentDom = "<span class='content'>"+item.Content.replace($('#keyWordInput').val(),"<b>"+$('#keyWordInput').val()+"</b>")+"</span>";
							var keyWordTypeHTML = '<span class="keyWordBodyLi--type">'+keyWordTypeText+'</span>';
							$(".keyWordBodyList").append('\
                                <li class="keyWordBodyLi ' + keyWordType +'" type="' +
								item.Type + '" relationId="' + item.ID + '" key="' + item.Key + '">' + contentDom + keyWordTypeHTML +
								'</li>\
                                ')
						})
						$(".keyWordBodyLi").on('mousedown', function() {
							$("#keyWordInput").val($(this).find('.content').text());
							$("#keyWordInput").attr("relationId", $(this).attr("relationId"));
							$("#keyWordInput").attr("hoteltype", $(this).attr("type"));
							$("#keyWordInput").attr("key", $(this).attr("key"));
							$(".keyWordBody").hide();
						})
					},
					error: function() {
						// alert('fail');
					}
				});
			}
			$('body').mLoading("show");
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/QueryService.svc/GetHotelRelatedInfoPost",
					jsonStr: '{"cityCode":"' + hotelCityCode + '","id":' + netUserId + ',"language":"' + $.session.get(
						'obtLanguage') + '"}'
				},
				success: function(data) {
					$('body').mLoading("hide");
					var res = JSON.parse(data);
					console.log(res);
					//推荐酒店
					var hotelLength = res.HistoryHotelList.length > 4 ? 4 : res.HistoryHotelList.length;
					var hotelStr = '';
					for (var i = 0; i < hotelLength; i++) {
						if (obtLanguage == "CN") {
							hotelStr += '<div class="relationLi" type="' + res.HistoryHotelList[i].Type +
								'" relationId="' + res.HistoryHotelList[i].ID + '" key="' + res.HistoryHotelList[i].NameCn + '">' + res.HistoryHotelList[
									i].NameCn + '</div>';
						} else if (obtLanguage == "EN") {
							hotelStr += '<div class="relationLi" type="' + res.HistoryHotelList[i].Type +
								'" relationId="' + res.HistoryHotelList[i].ID + '" key="' + res.HistoryHotelList[i].NameCn + '">' + res.HistoryHotelList[
									i].NameEn + '</div>';
						}
					}
					
					var brandLength = res.BrandList.length > 10 ? 10 : res.BrandList.length;
					var districtLength = res.DistrictList.length > 10 ? 10 : res.DistrictList.length;
					var commercialLength = res.CommercialList.length > 10 ? 10 : res.CommercialList.length;
					var extCommercialLength = res.ExtCommercialList.length > 10 ? 10 : res.ExtCommercialList.length;

					function moreBtn(cls){
						return '<div class="moreBtn '+cls+'">More</div>'
					}
					var brandMore = res.BrandList.length > 10 ? moreBtn('brand') : '';
					var districtMore = res.DistrictList.length > 10 ? moreBtn('district') : '';
					var commercialMore = res.CommercialList.length > 10 ? moreBtn('commercial') : '';
					var extCommercialMore = res.ExtCommercialList.length > 10 ? moreBtn('extCommercial') : '';

					var keyWordsIndexNormal = {
						brandLength:brandLength, 
						districtLength:districtLength,
						commercialLength:commercialLength,
						extCommercialLength:extCommercialLength
					}
					var keyWordsIndexPopWindow = {
						brandLength:res.BrandList.length, 
						districtLength:res.DistrictList.length,
						commercialLength:res.CommercialList.length,
						extCommercialLength:res.ExtCommercialList.length
					}
					function getKeyWordsDom(lengthObj){
						//品牌
						var brandStr = '';
						for (var i = 0; i < lengthObj.brandLength; i++) {
							if (obtLanguage == "CN") {
								brandStr += '<div class="relationLi" type="' + res.BrandList[i].Type + '" relationId="' + res.BrandList[i].ID +
									'" key="' + res.BrandList[i].NameCn + '">' + res.BrandList[i].NameCn + '</div>';
							} else if (obtLanguage == "EN") {
								brandStr += '<div class="relationLi" type="' + res.BrandList[i].Type + '" relationId="' + res.BrandList[i].ID +
									'" key="' + res.BrandList[i].NameCn + '">' + res.BrandList[i].NameEn + '</div>';
							}
						}
						//行政区
						var districtStr = '';
						for (var i = 0; i < lengthObj.districtLength; i++) {
							if (obtLanguage == "CN") {
								districtStr += '<div class="relationLi" type="' + res.DistrictList[i].Type + '" relationId="' + res.DistrictList[
									i].ID + '" key="' + res.DistrictList[i].NameCn + '">' + res.DistrictList[i].NameCn + '</div>';
							} else if (obtLanguage == "EN") {
								districtStr += '<div class="relationLi" type="' + res.DistrictList[i].Type + '" relationId="' + res.DistrictList[
									i].ID + '" key="' + res.DistrictList[i].NameCn + '">' + res.DistrictList[i].NameEn + '</div>';
							}
						}
						//商圈
						var commercialStr = '';
						for (var i = 0; i < lengthObj.commercialLength; i++) {
							if (obtLanguage == "CN") {
								commercialStr += '<div class="relationLi" type="' + res.CommercialList[i].Type + '" relationId="' + res.CommercialList[
									i].ID + '" key="' + res.CommercialList[i].NameCn + '">' + res.CommercialList[i].NameCn + '</div>';
							} else if (obtLanguage == "EN") {
								commercialStr += '<div class="relationLi" type="' + res.CommercialList[i].Type + '" relationId="' + res.CommercialList[
									i].ID + '" key="' + res.CommercialList[i].NameCn + '">' + res.CommercialList[i].NameEn + '</div>';
							}
						}
						//附属商圈
						var extCommercialStr = '';
						for (var i = 0; i < lengthObj.extCommercialLength; i++) {
							if (obtLanguage == "CN") {
								extCommercialStr += '<div class="relationLi" type="' + res.ExtCommercialList[i].Type + '" relationId="' +
									res.ExtCommercialList[i].ID + '" key="' + res.ExtCommercialList[i].NameCn + '">' + res.ExtCommercialList[i]
									.NameCn + '</div>';
							} else if (obtLanguage == "EN") {
								extCommercialStr += '<div class="relationLi" type="' + res.ExtCommercialList[i].Type + '" relationId="' +
									res.ExtCommercialList[i].ID + '" key="' + res.ExtCommercialList[i].NameCn + '">' + res.ExtCommercialList[i]
									.NameEn + '</div>';
							}
						}
						return {
							brandStr:brandStr,
							districtStr:districtStr,
							commercialStr:commercialStr,
							extCommercialStr:extCommercialStr
						}
					}
					var keyWordsNormalObj = getKeyWordsDom(keyWordsIndexNormal);
					var keyWordsIndexPopWindowObj = getKeyWordsDom(keyWordsIndexPopWindow);	//弹窗用的对象
					var showHotel = hotelStr == "" ? "hide" : "";
					var showBrand = keyWordsNormalObj.brandStr == "" ? "hide" : "";
					var showDistrict = keyWordsNormalObj.districtStr == "" ? "hide" : "";
					var showCommercial = keyWordsNormalObj.commercialStr == "" ? "hide" : "";
					var showExtCommercial = keyWordsNormalObj.extCommercialStr == "" ? "hide" : "";
					$(".keyWordBody").html('\
                        <div class="relationBody ' + showHotel +
						'">\
                          <div class="relationTittle flexRow keywordTitle--hotel">\
                            <div>' +
						get_lan('keyWordBody').hotel +
						'</div>\
                          </div>\
                          <div class="relationContent flexWrap">\
                            ' +
						hotelStr +
						'\
                          </div>\
                        </div>\
                        <div class="relationBody ' +
						showBrand +
						'">\
                          <div class="relationTittle flexRow keywordTitle--brand">\
                            <div>' +
						get_lan('keyWordBody').brand +
						'</div>\
                          </div>\
                          <div class="relationContent flexWrap">\
                            ' +
						keyWordsNormalObj.brandStr +
						'\
                          </div>\
                        </div>\
                        <div class="relationBody ' +
						showDistrict +
						'">\
                          <div class="relationTittle flexRow keywordTitle--district">\
                            <div>' +
						get_lan('keyWordBody').district +
						'</div>\
                          </div>\
                          <div class="relationContent flexWrap">\
                            ' +
						keyWordsNormalObj.districtStr +
						'\
                          </div>\
                        </div>\
                        <div class="relationBody ' +
						showCommercial +
						'">\
                          <div class="relationTittle flexRow keywordTitle--commercial">\
                            <div>' +
						get_lan('keyWordBody').commercial +
						'</div>\
                          </div>\
                          <div class="relationContent flexWrap">\
                            ' +
						keyWordsNormalObj.commercialStr +
						'\
                          </div>\
                        </div>\
                        <div class="relationBody ' +
						showExtCommercial +
						'">\
                          <div class="relationTittle flexRow keywordTitle--extCommercial">\
                            <div>' +
						get_lan('keyWordBody').extCommercial +
						'</div>\
                          </div>\
                          <div class="relationContent flexWrap">\
                            ' +
						keyWordsNormalObj.extCommercialStr +
						'\
                          </div>\
                        </div>\
                    ')
					$(".relationLi").on('mousedown', function() {
						$("#keyWordInput").val($(this).text());
						$("#keyWordInput").attr("relationId", $(this).attr("relationId"));
						$("#keyWordInput").attr("hoteltype", $(this).attr("type"));
						$("#keyWordInput").attr("key", $(this).attr("key"));
						$(".keyWordBody").hide();
					})
				},
				error: function() {
					// alert('fail'); 
				}
			});
		}
	})
	//苹果关键字
	$("#appleKeyWordInput").off("focus").on('focus', function() {
		$("#appleKeyWordInput").on('blur', function() {
			$(".keyWordBody").hide();
		})
		if ($(".searchAppleHotelBtn").attr("state") == "domHotel") {
			var hotelCityCode = $('#hotelCity').attr("code");
		} else if ($(".searchAppleHotelBtn").attr("state") == "intlHotel") {
			var hotelCityCode = $('#hotelIntlCity').attr("code");
		}
		if (!hotelCityCode) {
			$("#appleKeyWordInput").blur();
			alert(get_lan('searchBody').keyWordRemind);
		} else {
			$(".keyWordBody").show();
			$('.keyWordBody').mLoading("show");
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/QueryService.svc/GetQueryHotelConditionPost",
					jsonStr: '{"cityCode":"' + hotelCityCode + '","id":' + netUserId + ',"language":"' + obtLanguage + '"}'
				},
				success: function(data) {
					$('.keyWordBody').mLoading("hide");
					var res = JSON.parse(data);
					console.log(res);
					$(".keyWordBody").html('<ul class="keyWordBodyList"></ul>');
					res.infoList.map(function(item) {
						if (item.Address != "") {
							$(".keyWordBodyList").append('\
                                <li class="keyWordBodyLi" type="' + item.Type +
								'" name="' + item.Name + '" address="' + item.Key +
								'">\
                                  <div class="keyWordBodyLiName" title="' + item.Name + '">' +
								item.Name + '</div>\
                                  <div class="keyWordBodyLiAddress" title="' +
								item.Address + '">' + item.Address +
								'</div>\
                                </li>\
                                ')
						}
					})
					altRows(".keyWordBodyLi");
					$(".keyWordBody").addClass("autoScrollY");
					$("#appleKeyWordInput").off('input propertychange');
					$("#appleKeyWordInput").on('input propertychange', function() {
						$("#appleKeyWordInput").removeAttr("appleType");
						$("#appleKeyWordInput").removeAttr('key');
						$(".keyWordBodyList").html("");
						console.log($("#appleKeyWordInput").val());
						if ($("#appleKeyWordInput").val() != "") {
							res.infoList.map(function(item) {
								if (item.Name.toUpperCase().indexOf($("#appleKeyWordInput").val().toUpperCase()) != -1 || item.Address
									.toUpperCase().indexOf($("#appleKeyWordInput").val().toUpperCase()) != -1) {
									if (item.Address != "") {
										$(".keyWordBodyList").append(
											'\
                                            <li class="keyWordBodyLi" type="' + item.Type +
											'" name="' + item.Name + '" address="' + item.Key +
											'">\
                                              <div class="keyWordBodyLiName" title="' + item.Name +
											'">' + item.Name +
											'</div>\
                                              <div class="keyWordBodyLiAddress" title="' +
											item.Address + '">' + item.Address +
											'</div>\
                                            </li>\
                                            '
										)
									}
								}
							})
							altRows(".keyWordBodyLi");
						}
						clickKeyWordBodyLi();
					})
					clickKeyWordBodyLi();

					function clickKeyWordBodyLi() {
						$(".keyWordBodyLi").on('mousedown', function() {
							$("#appleKeyWordInput").val($(this).attr("name"));
							if ($(this).attr("type") == "1") {
								$("#appleKeyWordInput").attr("appleType", "hotel");
								$("#appleKeyWordInput").attr('key', $(this).attr("name"));
							} else if ($(this).attr("type") == "2") {
								$("#appleKeyWordInput").attr("appleType", "company");
								$("#appleKeyWordInput").attr('key', $(this).attr("address"));
							}
							$(".keyWordBody").hide();
						})
					}
				},
				error: function() {
					// alert('fail');
				}
			});
		}
	})
	$("#hotelPrice").on('focus', function() {
			$(".hotelPriceBody").show();
		})
		.on('blur', function() {
			$(".hotelPriceBody").hide();
		})
	$(".hotelPriceLi").on('mousedown', function() {
		$("#hotelPrice").val($(this).text());
		$("#hotelPrice").attr("minPrice", $(this).attr("minPrice"));
		$("#hotelPrice").attr("maxPrice", $(this).attr("maxPrice"));
	})
	$("#keyWordInput").on('focus', function() {
			$(".keyWordBody").show();
		})
		.on('blur', function() {
			$(".keyWordBody").hide();
		})
	$(".searchHotelBtn").unbind("click").click(function() {
		var that = this;
		if ($(this).attr("state") == "domHotel") {
			var hotelCityCode = $('#hotelCity').attr("code");
			var hotelCityText = $('#hotelCity').val();
			var hotelState = "domHotel";
		} else if ($(this).attr("state") == "intlHotel") {
			var hotelCityCode = $('#hotelIntlCity').attr("code");
			var hotelCityText = $('#hotelIntlCity').val();
			var hotelState = "intlHotel";
		}
		if (hotelCityCode) {
			var cityList = '"' + hotelCityCode + '"';
			tools.appleRemindPop(cityList, 2, netUserId, function() {
				if ($(that).attr("startlimit") && parseInt($(that).attr("startlimit")) > 0) {
					if (datedifference(getNowFormatDate(), $('#hotelDepartureDate').val()) < parseInt($(that).attr("startlimit"))) {
						if ($(that).attr("CanSearch") != "true") {
							if ($(that).attr("Message").indexOf("\\n") != -1) {
								alert($(that).attr("Message").split("\\n").join('\n'));
							} else {
								alert($(that).attr("Message"));
							}
							return false;
						}else{
							if ($(that).attr("Message").indexOf("\\n") != -1) {
								var mymessage = confirm($(that).attr("Message").split("\\n").join('\n'));
							} else {
								var mymessage = confirm($(that).attr("Message"));
							}
							if (mymessage == true) {
								if ($(that).attr("CanSearch") != "true") {
									return false;
								}else{
									// searchAppleHotel(hotelCityCode, hotelCityText, hotelState)
									continueSearchHotel(hotelCityCode,hotelCityText,hotelState)
								}
							} else {
								return false;
							}
						}
					}else{
						continueSearchHotel(hotelCityCode,hotelCityText,hotelState)
					}
				}else{
					continueSearchHotel(hotelCityCode,hotelCityText,hotelState)
				}
			});			
		} else {
			alert(get_lan('searchRemind'))
		}
	})
	function continueSearchHotel(hotelCityCode,hotelCityText,hotelState){
		var hotelAreaTypeID = $("#keyWordInput").attr("hoteltype") && $("#keyWordInput").attr("hoteltype") != 5 ? $(
			"#keyWordInput").attr("relationId") + '-' + $("#keyWordInput").attr("hoteltype") : '';
		if ($("#keyWordInput").attr("hoteltype") == 5) {
			var hotelname = $("#keyWordInput").attr("key").split(",").join(' ');
		} else if (!$("#keyWordInput").attr("hoteltype")) {
			var hotelname = $("#keyWordInput").val();
		} else {
			var hotelname = "";
		}
		if (hotelState == "domHotel") {
			if ($("#hotelAddress").val() != "") {
				if ($("#hotelAddress").attr("key")) {
					var address = $("#hotelCity").val() + $("#hotelAddress").attr("key").split(",").join(' ');
				} else {
					var address = $("#hotelCity").val() + $("#hotelAddress").val().split(",").join(' ');
				}
			} else {
				var address = "";
			}
		} else if (hotelState == "intlHotel") {
			if ($("#hotelAddress").val() != "") {
				if ($("#hotelAddress").attr("key")) {
					var address = $("#hotelIntlCity").val() + $("#hotelAddress").attr("key").split(",").join(' ');
				} else {
					var address = $("#hotelIntlCity").val() + $("#hotelAddress").val().split(",").join(' ');
				}
			} else {
				var address = "";
			}
		}
		var stars = '0-';
		console.log(stars);
		for (var i = 0; i < $('input[name=hotelCheck]:checked').length; i++) {
			stars += $('input[name=hotelCheck]:checked').eq(i).val();
			stars += '-';
		}
		stars = stars.substring(0, stars.length - 1);
		var queryKey = hotelCityCode + ',' + hotelAreaTypeID + ',' + hotelname + ',' + address + ',' + $(
			"#hotelDepartureDate").val() + ',' + $("#hotelReturnDate").val() + ',' + stars + ',' + $("#hotelPrice").attr(
			"minPrice") + ',' + $("#hotelPrice").attr("maxPrice") + ",1,1,1,2000,,";
		var searchHotelInfo = {
			'queryKey': queryKey,
			'hotelCode': hotelCityCode,
			'hotelCityText': hotelCityText,
			'hotelState': hotelState,
			'hotelAddressText': $("#hotelAddress").val(),
			'hotelKeyWordText': $("#keyWordInput").val(),
		}
		$.session.set('searchHotelInfo', JSON.stringify(searchHotelInfo));
		window.location.href = '../../hotel/hotelList.html';
	}
	//apple酒店查询
	$(".searchAppleHotelBtn").unbind("click").click(function() {
		if ($(this).attr("state") == "domHotel") {
			var hotelCityCode = $('#hotelCity').attr("code");
			var hotelCityText = $('#hotelCity').val();
			var hotelState = "domHotel";
		} else if ($(this).attr("state") == "intlHotel") {
			var hotelCityCode = $('#hotelIntlCity').attr("code");
			var hotelCityText = $('#hotelIntlCity').val();
			var hotelState = "intlHotel";
		}
		cityList = '"' + hotelCityCode + '"';
		tools.appleRemindPop(cityList, 2, netUserId, function() {
			searchAppleHotel(hotelCityCode, hotelCityText, hotelState)
		});

		function searchAppleHotel(hotelCityCode, hotelCityText, hotelState) {
			if (hotelCityCode) {
				var hotelAreaTypeID = '';
				if (!$("#appleKeyWordInput").attr("appleType") || $("#appleKeyWordInput").attr("appleType") == "company") {
					if (!$("#appleKeyWordInput").attr("appleType") && $("#appleKeyWordInput").val() != "") {
						var hotelname = $("#appleKeyWordInput").val();
					} else {
						var hotelname = "";
					}
				} else if ($("#appleKeyWordInput").attr("appleType") == "hotel") {
					var hotelname = $("#appleKeyWordInput").attr("key");
				}
				var stars = '0-1-2-3-4-5';
				if (!$("#appleKeyWordInput").attr("appleType") || $("#appleKeyWordInput").attr("appleType") == "hotel") {
					var address = "";
				} else if ($("#appleKeyWordInput").attr("appleType") == "company") {
					var address = $("#appleKeyWordInput").attr("key").split(",").join(" ");
				}
				$('body').mLoading("show");
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/QueryService.svc/GetHotelPolicyPricePost",
						jsonStr: '{"cityCode":"' + hotelCityCode + '","id":' + netUserId + ',"checkIn":"' + $("#hotelDepartureDate").val() +
							'","checkOut":"' + $("#hotelReturnDate").val() + '"}'
					},
					success: function(data) {
						var res = JSON.parse(data);
						console.log(res);
						if (res.HasManual) {
							maxFare = res.manualMaxFare;
						} else {
							maxFare = res.maxFare;
						}
						// $('body').mLoading("hide");
						// $("#hotelPrice").val(ProfileInfo.OfficeCurrency+res.minFare+'-'+res.maxFare);
						// $("#hotelPrice").attr("minPrice",res.minFare);
						// $("#hotelPrice").attr("maxPrice",res.maxFare);
						var queryKey = hotelCityCode + ',' + hotelAreaTypeID + ',' + hotelname + ',' + address + ',' + $(
								"#hotelDepartureDate").val() + ',' + $("#hotelReturnDate").val() + ',' + stars + ',' + res.minFare + ',' +
							maxFare + ',1,1,1,2000,,';
						var searchHotelInfo = {
							'queryKey': queryKey,
							'hotelCode': hotelCityCode,
							'hotelCityText': hotelCityText,
							'hotelState': hotelState,
							'appleType': $("#appleKeyWordInput").attr("appleType"),
							'appleKey': $("#appleKeyWordInput").attr("key"),
							'appleValue': $("#appleKeyWordInput").val(),
						}
						$.session.set('searchHotelInfo', JSON.stringify(searchHotelInfo));
						window.location.href = '../../hotel/mapHotelList.html';
					},
					error: function() {
						// alert('fail'); 
					}
				});

			} else {
				alert(get_lan('searchRemind'))
			}
		}
	})
}
//国内火车票
function chooseTrain() {
	$("input[name=trainTrip]").each(function() {
		$(this).click(function() {
			var discount = $(this).attr('id');
			if (discount == "trainOneWay") {
				$(".trainDateTittle,#trainReturnDate").css('color', '#9b9b9b');
				$("#trainReturnDate").css('border', '1px solid #9b9b9b');
				$("#trainDepartureDate").datepicker('destroy');
				$("#trainReturnDate").datepicker('destroy');
				$(".trainReturnSelect").css('border', '1px solid #9b9b9b');
				$(".trainReturnSelect").attr("disabled","disabled")
				// $("#trainDepartureDate").datepicker({
				// 	dateFormat: 'yy-mm-dd',
				// 	changeMonth: true,
				// 	minDate: 0, // 当前日期之后的 0 天，就是当天
				// 	hideIfNoPrevNext: true,
				// 	showOtherMonths: true,
				// 	selectOtherMonths: true,
				// 	changeYear: true,
				// });
				dateChoose("trainDepartureDate", "");

				$('.searchTrainBtn').attr('state', 'oneWay')
			}
			if (discount == "trainRoundTrip") {
				$(".trainDateTittle,#trainReturnDate").css('color', '#000');
				$("#trainReturnDate").css('border', '1px solid #000');
				$("#trainReturnDate").val(getNextDay($("#trainDepartureDate").val()));
				$(".trainReturnSelect").css('border', '1px solid #000');
				$(".trainReturnSelect").removeAttr("disabled")
				// $("#trainDepartureDate").val(GetDateStr(0));
				// $("#trainReturnDate").val(GetDateStr(1));
				$("#trainReturnDate").removeAttr("disabled")
				$("#trainDepartureDate").datepicker('destroy');
				dateChoose("trainDepartureDate", "trainReturnDate");
				$('.searchTrainBtn').attr('state', 'roundTrip')
			}
		});
	});
	$("#trainDepartureCity").kuCity();
	$("#trainArrivalCity").kuCity();
	$("#trainDepartureDate").datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		minDate: 0, // 当前日期之后的 0 天，就是当天
		hideIfNoPrevNext: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		changeYear: true,
		maxDate: 31, // 当前日期之后的 0 天，就是当天
	});
	$("#trainDepartureDate").val(GetDateStr(0));
	$("#trainReturnDate").val(GetDateStr(1));
	$(".switchIconTrain").unbind("click").click(function() {
		cityConversion("trainDepartureCity", "trainArrivalCity");
	})
	$(".searchTrainBtn").unbind("click").click(function() {
		$.session.set('trainTicketChanges', '');
		if ($('#trainDepartureCity').attr("code") && $('#trainArrivalCity').attr("code")) {
			// if (ProfileInfo.onlineStyle == "APPLE") {
				var cityList = '"' + $('#trainDepartureCity').val() + '","' + $('#trainArrivalCity').val() + '"';
				tools.appleRemindPop(cityList, 4, netUserId, function() {
					searchTrain()
				});
			// } else {
			// 	searchTrain();
			// }

			function searchTrain() {
				if ($(".searchTrainBtn").attr("state") == "oneWay") {
					//整点
					if ($(".trainDepartureSelect option:selected").val() == "all" || $(".trainDepartureSelect option:selected").val() == undefined) {
						var DepartureSelectValue = ''
						var domTime=''//暂时没用
					} else {
						var DepartureSelectValue = ' ' + $(".trainDepartureSelect  option:selected").val() + ':00:00';
						var domTime=$(".trainDepartureSelect  option:selected").val()
					}
					var searchTrainInfo = {
						'type': 'oneWay',
						'departureCityText': $('#trainDepartureCity').val(),
						'arrivalCityText': $('#trainArrivalCity').val(),
						'departureCity': $('#trainDepartureCity').attr("code"),
						'arrivalCity': $('#trainArrivalCity').attr("code"),
						'date': $('#trainDepartureDate').val(),
						'queryKey': $('#trainDepartureCity').val() + ',' + $('#trainArrivalCity').val() + ',' + $(
								'#trainDepartureDate')
							.val() + DepartureSelectValue+',' + $("#trainCabin").val(),
						'domqueryKey':$('#trainDepartureCity').attr('citycode') + ',' + $('#trainArrivalCity').attr('citycode') + ',' + $(
								'#trainDepartureDate')
							.val() + DepartureSelectValue+',' + $("#trainCabin").val()+ 'ALL',
						'domTime':domTime,
					}
					$.session.set('searchTrainInfo', JSON.stringify(searchTrainInfo));
					window.location.href = '../../train/trainTicketList.html';
				} else if ($(".searchTrainBtn").attr("state") == "roundTrip") {
					//整点
					if ($(".trainDepartureSelect  option:selected").val() == "all" || $(".trainDepartureSelect option:selected").val() == undefined) {
						var DepartureSelectValue = ''
						var domTime=''
					} else {
						var DepartureSelectValue = ' ' + $(".trainDepartureSelect  option:selected").val() + ':00:00';
						var domTime=$(".trainDepartureSelect  option:selected").val()
					}
					if ($(".trainReturnSelect option:selected").val() == "all" || $(".trainReturnSelect option:selected").val() == undefined) {
						var ReturnSelectValue = ''
						var domTimeReturn=''
					} else {
						var ReturnSelectValue = ' ' + $(".trainReturnSelect  option:selected").val() + ':00:00';
						var domTimeReturn=$(".trainReturnSelect  option:selected").val()
					}
					var searchTrainInfo = {
						'type': 'roundTrip',
						'departureCityText': $('#trainDepartureCity').val(),
						'arrivalCityText': $('#trainArrivalCity').val(),
						'departureCity': $('#trainDepartureCity').attr("code"),
						'arrivalCity': $('#trainArrivalCity').attr("code"),
						'date': $('#trainDepartureDate').val(),
						'returndate': $('#trainReturnDate').val(),
						'queryKey': $('#trainDepartureCity').val() + ',' + $('#trainArrivalCity').val() + ',' + $('#trainDepartureDate')
							.val() + DepartureSelectValue+',' + $("#trainCabin").val(),
						'queryKeyReturn': $('#trainArrivalCity').val() + ',' + $('#trainDepartureCity').val() + ',' + $(
							'#trainReturnDate').val() +ReturnSelectValue+ ',' + $("#trainCabin").val(),
						'domqueryKey':$('#trainDepartureCity').attr('citycode') + ',' + $('#trainArrivalCity').attr('citycode') + ',' + $(
								'#trainDepartureDate')
							.val() + DepartureSelectValue+',' + $("#trainCabin").val()+ ',ALL',
						'domqueryKeyReturn':$('#trainArrivalCity').attr('citycode') + ',' + $('#trainDepartureCity').attr('citycode') + ',' + $(
							'#trainReturnDate').val() +ReturnSelectValue+ ',' + $("#trainCabin").val()+ ',ALL',
						'domTime':domTime,
						'domTimeReturn':domTimeReturn,
					}
					$.session.set('searchTrainInfo', JSON.stringify(searchTrainInfo));
					window.location.href = '../../train/trainTicketList.html';
				}
			}
		} else {
			alert(get_lan('searchRemind'))
		}
	})
}
//租车
function chooseCar() {
	$("#carFromDate").val(GetDateStr(0));
	$("#carToDate").val(GetDateStr(1));
	dateChoose("carFromDate", "carToDate");
	$("#carDeparture").kuCity();
	$("#carArrival").kuCity();

	$("#carFromHour").val(10);
	$("#carToHour").val(10);
	/*租车公司*/
	// 更换接口  GetInformationsPost 换成 GetNewInformationsPost多一个参数id
		if(!ProfileInfo.HideCarRentalCompany){//隐藏租车权限
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/SystemService.svc/GetCarRentalCompanyPost",
					jsonStr: '{"id":'+netUserId+',"culture":"' + obtLanguage + '"}'
				},
				success: function(data) {
					var res = JSON.parse(data);
					//   console.log(res);
					// res.CarInformationList.map(function(item) {
					res.map(function(item) {
						$("#carCompany").append('\
						  <option value="' + item.Code + '">' + item.Name +
							'</option>\
						  ')
					})
				},
				error: function() {
					// alert('fail');
				}
			});
		}
	$(".searchCarBtn").unbind("click").click(function() {
		if ($('#carDeparture').attr("code") && $('#carArrival').attr("code")) {
			var carCompany=ProfileInfo.HideCarRentalCompany?"":$('#carCompany').val()
			var isCitycar=false;
			if($('#carDeparture').attr('vendervode')!=""){
				carCompany=$('#carDeparture').attr('vendervode')
				isCitycar=true
			}
			if($('#carArrival').attr('vendervode')!=""){
				carCompany=$('#carArrival').attr('vendervode')
				isCitycar=true
			}
			
			var searchCarInfo = {
				'departureCityText': $('#carDeparture').val(),
				'arrivalCityText': $('#carArrival').val(),
				'departureCity': $('#carDeparture').attr("code"),
				'arrivalCity': $('#carArrival').attr("code"),
				'date': $('#carFromDate').val() + ' ' + $("#carFromHour").val() + ':' + $("#carFromMin").val(),
				'returndate': $('#carToDate').val() + ' ' + $("#carToHour").val() + ':' + $("#carToMin").val(),
				'carCompany': carCompany,
				'pickupAdd':$('#carDeparture').attr("locationcode"),
				'returnAdd':$('#carArrival').attr("locationcode"),
				'isCitycar':isCitycar,
			}
			$.session.set('searchCarInfo', JSON.stringify(searchCarInfo));
			window.location.href = '../../car/carList.html';
		} else {
			alert(get_lan('searchRemind'))
		}
	})
}
/*交换城市*/
function cityConversion(startCityId, arrivalCityId) {
	var startCityText = $('#' + startCityId + '').val();
	var arrivalText = $('#' + arrivalCityId + '').val();
	var startCityCode = $('#' + startCityId + '').attr('code');
	var arrivalCode = $('#' + arrivalCityId + '').attr('code');
	if ($('#' + startCityId + '').attr('code') && $('#' + arrivalCityId + '').attr('code')) {
		$('#' + startCityId + '').val(arrivalText);
		$('#' + startCityId + '').attr('code', arrivalCode);
		$('#' + arrivalCityId + '').val(startCityText);
		$('#' + arrivalCityId + '').attr('code', startCityCode);
	} else if (!$('#' + startCityId + '').attr('code') && $('#' + arrivalCityId + '').attr('code')) {
		$('#' + startCityId + '').val(arrivalText);
		$('#' + startCityId + '').attr('code', arrivalCode);
		$('#' + arrivalCityId + '').val('');
		$('#' + arrivalCityId + '').removeAttr('code');
	} else if ($('#' + startCityId + '').attr('code') && !$('#' + arrivalCityId + '').attr('code')) {
		$('#' + arrivalCityId + '').val(startCityText);
		$('#' + arrivalCityId + '').attr('code', startCityCode);
		$('#' + startCityId + '').val('');
		$('#' + startCityId + '').removeAttr('code');
	}
}
//日期选择插件
function dateChoose(departure, returnDate) {
	var departureValue = new Date($("#" + departure).val().replace(/-/g, "/"));
	var maxTime = 365
	if (TAnumber != undefined && TAnumber != "") {
		maxTime = TAmaxDate
	}
	$("#" + returnDate).datepicker('destroy');
	$("#" + returnDate).datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		minDate: departureValue, // 当前日期之后的 0 天，就是当天
		maxDate: maxTime, // 当前日期之后的 0 天，就是当天
		hideIfNoPrevNext: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		changeYear: true,
	});
	if (TAnumber != undefined && TAnumber != "") {
		// departureValue = TAminDate
		var minTime=new Date().getTime()
		var minTime2
		if(TAminDate==0){
			minTime2=new Date().getTime()
		}else{
			minTime2=new Date(TAminDate.replace(/-/g,"/")).getTime()
		}
		departureValue=minTime<minTime2?TAminDate:new Date()
	}
	$("#" + departure).datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		minDate: departureValue, // 当前日期之后的 0 天，就是当天
		maxDate: maxTime, // 当前日期之后的 0 天，就是当天
		hideIfNoPrevNext: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		changeYear: true,
		onSelect: function() {
			if(returnDate==""){
				$(".domDateTittle,.intlDateTittle,.trainDateTittle").css('color', '#000');
			}else{
				$(".domDateTittle,.intlDateTittle,.trainDateTittle,#" + returnDate).css('color', '#000');
			}
			if (returnDate != "domReturnDate" && returnDate != "intlReturnDate") {
				$("#" + returnDate).css('border', '1px solid #000');
			}
			var departureValue = new Date($("#" + departure).val().replace(/-/g, "/"));
			var maxTime = 365
			if (TAnumber != undefined && TAnumber != "") {
				maxTime = TAmaxDate
			}
			
			$("#" + returnDate).datepicker('destroy');
			$("#" + returnDate).datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				minDate: departureValue, // 当前日期之后的 0 天，就是当天
				maxDate: maxTime, // 当前日期之后的 0 天，就是当天
				hideIfNoPrevNext: true,
				showOtherMonths: true,
				selectOtherMonths: true,
				changeYear: true,
			});
			$("#" + returnDate).val(getNextDay($("#" + departure).val()));
			if (departure == "hotelDepartureDate") {
				if ($(".searchHotelBtn").attr("state") == "domHotel") {
					var hotelCityCode = $('#hotelCity').attr("code");
				} else if ($(".searchHotelBtn").attr("state") == "intlHotel") {
					var hotelCityCode = $('#hotelIntlCity').attr("code");
				}
				if (hotelCityCode) {
					$.ajax({
						type: 'post',
						url: $.session.get('ajaxUrl'),
						dataType: 'json',
						data: {
							url: $.session.get('obtCompany') + "/QueryService.svc/GetHotelPolicyPricePost",
							jsonStr: '{"cityCode":"' + hotelCityCode + '","id":' + netUserId + ',"checkIn":"' + $("#hotelDepartureDate")
								.val() + '","checkOut":"' + $("#hotelReturnDate").val() + '"}'
						},
						success: function(data) {
							var res = JSON.parse(data);
							console.log(res);
							$('body').mLoading("hide");
							// 12.24  删除币种符号
							// $("#hotelPrice").val(''+res.minFare+'-'+res.maxFare+ProfileInfo.OfficeCurrency);
							if ($(".searchHotelBtn").attr("state") == "intlHotel") {
								$("#hotelPrice").val(res.minFare + '-' + res.maxFare);
							}else{
								$("#hotelPrice").val(''+res.minFare+'-'+res.maxFare+ProfileInfo.OfficeCurrency);
							}
							$("#hotelPrice").attr("minPrice", res.minFare);
							$("#hotelPrice").attr("maxPrice", res.maxFare);
						},
						error: function() {
							// alert('fail'); 
						}
					});
				}
			}
		}
	});
}

function getNextDay(d) {
	d = new Date(d);
	d.setTime(d.getTime() + 1000 * 60 * 60 * 24);
	var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
	var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
	//格式化
	return d.getFullYear() + "-" + month + "-" + day;
}
//日期
function GetDateStr(AddDayCount) {
	var dd = new Date();
	dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
	var y = dd.getFullYear();
	var m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);
	var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
	return y + "-" + m + "-" + d;
}
//我的订单
function myOrderTableInfo() {
	if(ProfileInfo.onlineStyle=="APPLE"){
		$("#tableBody").html(
			'\
		    <div id="orderTable">\
		      <div class="tr flexRow">\
		        <div style="width: 130px;padding-left:20px;box-sizing:border-box;">'+get_lan('table').orderNumber+'</div>\
		        <div style="width: 159px;padding-left: 10px;">'+get_lan('table').traveler+'</div>\
		        <div style="width: 40px;"></div>\
		        <div style="width: 200px;">'+get_lan('table').roundTime+'</div>\
		        <div style="width: 68px;"></div>\
		        <div style="width: 378px;">'+get_lan('table').route+'</div>\
		        <div style="width: 100px;">'+get_lan('table').price+'</div>\
		        <div style="width: 100px;">'+get_lan('table').status+'</div>\
		      </div>\
		    </div>\
		')
	}else{
		$("#tableBody").html(
			'\
		    <div id="orderTable">\
		      <div class="tr flexRow">\
		        <div style="width: 130px;padding-left:20px;min-width: 130px;max-width: 130px;">' +
			get_lan('table').orderNumber + '</div>\
		        <div style="width: 160px;padding-left: 10px;display:none">' +
			get_lan(
				'table').traveler + '</div>\
		        <div style="min-width: 40px;max-width: 40px;"></div>\
		        <div style="min-width: 175px;max-width: 175px;">' +
			get_lan('table').roundTime +
			'</div>\
		        <div style="min-width: 92px;max-width: 92px;"></div>\
		        <div style="min-width: 340px;max-width: 340px;">' + get_lan(
				'table').route +
			'</div>\
		        <div style="width: 100px;min-width: 100px;max-width: 100px;">' + get_lan('table').price +
			'</div>\
		        <div style="width: 100px;min-width: 100px;max-width: 100px;">' + get_lan('table').status +
			'</div>\
		      </div>\
		    </div>\
		')
	}
	$('#tableBody').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/OrderService.svc/MyTripListPost",
			jsonStr: '{"id":' + netUserId + ',"Language":"' + $.session.get('obtLanguage') + '"}'
		},
		success: function(data) {
			if (btnIndex != 1) {
				return false;
			} else {
				// btnIndex = 3
			}
			if (data != '') {
				var res = JSON.parse(data)
				console.log(res);
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/OrderService.svc/getContinueOrder",
						jsonStr: '{"id":' + netUserId + '}'
					},
					success: function(data) {
						if (data != '') {
							var res = JSON.parse(data)
							console.log(res);
							if (res != '') {
								var tripRemind = confirm(get_lan("tripRemind"));
								if (tripRemind == true) {
									var finishedInfo = {
										'orderNo': res,
									}
									console.log($.session.get('finishedInfo'));
									$.session.set('finishedInfo', JSON.stringify(finishedInfo));
									window.location.href = '../../purchaseTrip/purchaseTrip.html';

								}
							}
						}
					},
					error: function() {
						// alert('fail');
					}
				});
				var noTravelData = [];
				res.map(function(item) {
					if (!item.isHistory) {
						noTravelData.push(item);
					}
				})
				if (noTravelData.length == 0) {
					$('#tableBody').mLoading("hide");
					$("#tableBody").html('\
                          <div class="ordersRemind">' + get_lan('tableRemind') +
						'</div>\
                    ')
				} else {
					noTravelData.map(function(item, index) {
						// console.log(item.OrderItems[0].ItemName.length)

						if (TAnumber != undefined && TAnumberIndex == 1) {
							if (TAorderNo != item.OrderNo) {
								return false
							}
						}
						var tableCell = item.OrderItems.length > 1 || item.OrderItems[0].ItemName.length > 40 ? "table-cell" :
							"cellLine";
						var ShowApproval = item.ShowApproval ? "hide" : "hide";
						// 苹果
						if (ProfileInfo.onlineStyle == "APPLE") {
							$("#orderTable").append(
								'\
							    <div class="flexRow" style="border-bottom:1px solid #d8d8d8;">\
							       <div class="ellipsis" style="width: 130px;border-right:1px solid #d8d8d8;box-sizing:border-box;padding-left:20px;"><span class="orderNoClick specificFontColor ' +
								tableCell + '" style="text-decoration:underline;cursor:pointer;">' + item.OrderNo +
								'</span></div>\
							       <div class="ellipsis" style="width: 160px;border-right:1px solid #d8d8d8;box-sizing:border-box;padding-left: 10px;"><span class="' +
								tableCell + '">' + item.OrderCustomer +
								'</span></div>\
							       <table class="orderDetailsTable" border="0">\
							         <tr>\
							           <th style="width:30px;"></th>\
							           <th style="width:200px;"></th>\
							           <th style="width:75px;"></th>\
							           <th style="width:380px;"></th>\
							           <th style="width:100px;"></th>\
							           <th style="width:100px;"></th>\
							         </tr>\
							       </table>\
							       <div style="width: 100px;" class="hide">\
							         <div class="submit ' +
								tableCell + ' ' + ShowApproval + '" orderNumber="' + item.OrderNo + '">' + get_lan('table').approval +
								'</div>\
							       </div>\
							    </div>\
							'
							)
						} else {
							$("#orderTable").append(
								'\
							    <div class="flexRow" style="border-bottom:1px solid #d8d8d8;">\
							       <div class="" style="min-width: 130px;max-width: 130px;border-right:1px solid #d8d8d8;box-sizing:border-box;padding-left:20px;display: inline-block;">\
								   <div class="ellipsis ' +
								tableCell + '">' + item.OrderCustomer +
								'</div>\
								   <div class="ellipsis orderNoClick specificFontColor ' + tableCell +
								'" style="text-decoration:underline;cursor:pointer;">' + item.OrderNo +
								'</div>\
								   </div>\
							       <div class="ellipsis" style="display: inline-block;display:none;width: 160px;border-right:1px solid #d8d8d8;box-sizing:border-box;padding-left: 10px;"></div>\
							       <table class="orderDetailsTable" border="0">\
							         <tr>\
							           <th style="width:30px;"></th>\
							           <th style="width:200px;"></th>\
							           <th style="width:75px;"></th>\
							           <th style="width:340px;"></th>\
							           <th style="width:100px;"></th>\
							           <th style="width:100px;"></th>\
							         </tr>\
							       </table>\
							       <div style="width: 100px;" class="hide">\
							         <div class="submit ' +
								tableCell + ' ' + ShowApproval + '" orderNumber="' + item.OrderNo + '">' + get_lan('table').approval +
								'</div>\
							       </div>\
							    </div>\
							'
							)
						}


						item.OrderItems.map(function(aitem) {
							var liIcon;
							switch (aitem.ItemType) {
								case '1':
									liIcon = "planeIcon"
									break;
								case '2':
									liIcon = "hotelIcon"
									break;
								case '3':
									liIcon = "trainIcon"
									break;
								case '4':
									liIcon = "carIcon"
									break;
							}
							var stateColor = "#1E66AE";
							if (ProfileInfo.onlineStyle == "APPLE") {
								if (aitem.itemState == "已完成" || aitem.itemState == "Completed" || aitem.itemState == "已改签" || aitem.itemState ==
									"Changed" || aitem.itemState == "已确认" || aitem.itemState == "Confirmed" || aitem.itemState == "已退票" ||
									aitem.itemState == "Refunded") {
									stateColor = "#222";
								} else {
									stateColor = "#222";
								}
							} else {
								if (aitem.itemState == "已完成" || aitem.itemState == "Completed") {
									stateColor = "#1E66AE";
								} else if (aitem.itemState == "已改签" || aitem.itemState == "Changed") {
									stateColor = "#1E66AE";
								} else if (aitem.itemState == "退票中" || aitem.itemState == "Refunding") {
									stateColor = "#D0021B";
								} else if (aitem.itemState == "已确认" || aitem.itemState == "Confirmed") {
									stateColor = "#1E66AE";
								} else if (aitem.itemState == "未出票" || aitem.itemState == "Reserved") {
									stateColor = "#F58C06";
								} else if (aitem.itemState == "已退票" || aitem.itemState == "Refunded") {
									stateColor = "#1E66AE";
								} else if (aitem.itemState == "出票中" || aitem.itemState == "In process") {
									stateColor = "#7ED321";
								} else if (aitem.itemState == "处理中" || aitem.itemState == "On request") {
									stateColor = "#7ED321";
								}
							}
							$(".orderDetailsTable").eq(index).append(
								'\
                              <tr class="myOrdersTr">\
                                <td><div class="' +
								liIcon + '"></div></td>\
                                <td style="padding-left:10px;">' + aitem.ItemDate +
								'</td>\
                                <td>' + aitem.flightAndTrainNo +
								'</td>\
                                <td style="padding-right:10px;" title="' + aitem.ItemName +
								'">' + aitem.ItemName + '</td>\
                                <td>' + aitem.ItemFare +
								'</td>\
                                <td style="color:' + stateColor + '">' + aitem.itemState +
								'</td>\
                              </tr>\
                          ')
						})
					})
					altRows(".myOrdersTr");
					$(".submit").unbind("click").click(function() {
						var searchOrderInfo = {
							'orderNo': $(this).attr("orderNumber"),
							'approval': true,
						}
						$.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
						window.location.href = '../../orders/orderDetails.html';
					})
					$('#tableBody').mLoading("hide");
					// altRows('orderTable');//表格
					$(".orderNoClick").unbind("click").click(function() {
						var searchOrderInfo = {
							'orderNo': $(this).text(),
						}
						$.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
						window.location.href = '../../orders/orderDetails.html';
					})
					if (ProfileInfo.NoQueryOrder) {
						$(".orderNoClick").unbind("click");
						$(".orderNoClick").css("color", "#000");
						$(".orderNoClick").css("text-decoration", "none");
					}
				}
			} else {
				$('#tableBody').mLoading("hide");
				// alert(get_lan('accountRemind'));
				// window.location.href='../../login/loginPage.html';
			}
		},
		error: function() {
			// alert('fail');
		}
	});
}
//待审核订单
function pendingApproval() {
	if(ProfileInfo.onlineStyle=="APPLE"){
		$("#tableBody").html(
			'\
		    <div id="orderTable">\
		      <div class="tr flexRow">\
		        <div style="width: 130px;padding-left:20px;">' +
			get_lan('table').orderNumber + '</div>\
		        <div style="width: 100px;">' + get_lan('table').traveler +
			'</div>\
		        <div style="width: 100px;">' + get_lan('table').applyDate +
			'</div>\
		        <div style="width: 40px;"></div>\
		        <div style="width: 170px;">' + get_lan('table').roundTime +
			'</div>\
		        <div style="width: 90px;">' + get_lan('table').shift +
			'</div>\
		        <div style="width: 300px;">' + get_lan('table').route +
			'</div>\
		        <div style="width: 100px;">' + get_lan('table').price +
			'</div>\
		        <div style="width: 150px;">' + get_lan('table').operation +
			'</div>\
		      </div>\
		    </div>\
		')
	}else{
		$("#tableBody").html(
			'\
		    <div id="orderTable">\
		      <div class="tr flexRow">\
		        <div style="min-width: 143px;max-width: 143px;padding-left:20px;">' +
			get_lan('table').orderNumber + '</div>\
		        <div style="min-width: 82px;">' + get_lan('table').applyDate +
			'</div>\
		        <div style="min-width: 31px;"></div>\
		        <div style="min-width: 182px;">' + get_lan('table').roundTime +
			'</div>\
		        <div style="min-width: 75px;">' + get_lan('table').shift +
			'</div>\
		        <div style="min-width: 201px;">' + get_lan('table').route +
			'</div>\
		        <div style="min-width: 100px;">' + get_lan('table').price +
			'</div>\
		        <div style="min-width: 150px;text-align: center;">' + get_lan('table').operation +
			'</div>\
		      </div>\
		    </div>\
		')
	}
	$('#tableBody').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/OrderService.svc/ApproveListPost",
			jsonStr: '{"id":' + netUserId + ',"Language":"' + $.session.get('obtLanguage') + '"}'
		},
		success: function(data) {
			if (btnIndex != 2) {
				return false;
			} else {
				// btnIndex = 3
			}
			if (data != '') {
				var res = JSON.parse(data);
				$('#tableBody').mLoading("hide");
				console.log(res);
				if (res.length == 0) {
					$("#tableBody").html('\
                          <div class="ordersRemind">' + get_lan('tableRemind2') +
						'</div>\
                    ')
				} else {
					var approveList = [];
					res.map(function(item) {
						if (!item.IsHistory) {
							approveList.push(item);
						}
					})
					console.log(approveList);
					if (approveList.length == 0) {
						$(".ApproveLengthIcon").addClass("hide");
					}
					$(".ApproveLengthIcon").text(approveList.length);
					
					
					if (ProfileInfo.onlineStyle == "APPLE") {
						approveList.map(function(item, index) {
							var tableCell = item.Segment.length + item.Hotel.length + item.Train.length > 1 ? "table-cell" : "cellLine";
							$("#orderTable").append(
								'\
						        <div class="flexRow" style="border-bottom:1px solid #d8d8d8;">\
						           <div class="ellipsis" style="width: 130px;border-right:1px solid #d8d8d8;box-sizing:border-box;padding-left:20px;"><span class="approveNoClick mainFontColor ' +
								tableCell + '" style="text-decoration:underline;cursor:pointer;">' + item.OrderNo +
								'</span></div>\
						           <div class="ellipsis" style="width: 100px;border-right:1px solid #d8d8d8;box-sizing:border-box;"><span class="' +
								tableCell + '">' + item.Passenger +
								'</span></div>\
						           <div class="ellipsis" style="width: 100px;border-right:1px solid #d8d8d8;box-sizing:border-box;"><span class="' +
								tableCell + '">' + item.BookTime.split(' ')[0] +
								'</span></div>\
						           <table class="orderDetailsTable" border="0" style="width:580px;">\
						             <tr>\
						               <th style="width:40px;"></th>\
						               <th style="width:170px;"></th>\
						               <th style="width:90px;"></th>\
						               <th style="width:300px;"></th>\
						               <th style="width:100px;"></th>\
						             </tr>\
						           </table>\
						           <div class="flexRow" style="width: 150px;">\
						              <div class="agreeBtn ' +
								tableCell + '" ApplicationNo="' + item.ApplicationNo + '">' + get_lan('table').agree +
								'</div>\
						              <div class="denyBtn ' + tableCell +
								'" style="background: #d02239;" ApplicationNo="' + item.ApplicationNo + '">' + get_lan('table').deny +
								'</div>\
						           </div>\
						        </div>\
						    '
							)
							/*机票*/
							item.Segment.map(function(sItem) {
								$(".orderDetailsTable").eq(index).append(
									'\
						            <tr class="pendingTr">\
						              <td><div class="planeIcon"></div></td>\
						              <td>' +
									sItem[0].DepartureTime + '~' + sItem[0].ArrivalTime.substring(sItem[0].ArrivalTime.length - 5, sItem[0]
										.ArrivalTime.length) + '</td>\
						              <td>' + sItem[0].FlightNo +
									'</td>\
						              <td>' + sItem[0].OrgAirport + '-' + sItem[0].DesAirport +
									'</td>\
						              <td>' + sItem[0].AirFareAmount +
									'</td>\
						            </tr>\
						        ')
							})
							/*酒店*/
							item.Hotel.map(function(hItem) {
								$(".orderDetailsTable").eq(index).append(
									'\
						            <tr class="pendingTr">\
						              <td><div class="hotelIcon"></div></td>\
						              <td>' +
									hItem.CheckIn + '~' + hItem.CheckOut +
									'</td>\
						              <td></td>\
						              <td>' + hItem.HotelName +
									'</td>\
						              <td>' + hItem.HotelFareAmount +
									'</td>\
						            </tr>\
						        ')
							})
							/*火车*/
							item.Train.map(function(tItem) {
								$(".orderDetailsTable").eq(index).append(
									'\
						            <tr class="pendingTr">\
						              <td><div class="trainIcon"></div></td>\
						              <td>' +
									tItem.TrainDepartureTime + '~' + tItem.TrainArrivalTime.substring(tItem.TrainArrivalTime.length - 5,
										tItem.TrainArrivalTime.length) + '</td>\
						              <td>' + tItem.TrainCode +
									'</td>\
						              <td>' + tItem.TrainDeparte + '-' + tItem.TrainArrive +
									'</td>\
						              <td>' + tItem.TrainFareAmount +
									'</td>\
						            </tr>\
						        ')
							})
						})
					} else {
						approveList.map(function(item, index) {
							var tableCell = item.Segment.length + item.Hotel.length + item.Train.length > 1 ? "table-cell" : "cellLine";
							$("#orderTable").append(
								'\
						        <div class="flexRow" style="border-bottom:1px solid #d8d8d8;">\
						           <div class="" style="max-width: 130px;min-width: 130px;border-right:1px solid #d8d8d8;box-sizing:border-box;padding-left:20px;">\
									<div class="ellipsis ' +
									tableCell + '">' + item.Passenger +
									'</div>\
									   <div class=" ellipsis approveNoClick mainFontColor ' +
									tableCell + '" style="text-decoration:underline;cursor:pointer;">' + item.OrderNo +
									'</div>\
								</div>\
						           <div class="ellipsis" style="min-width: 100px;max-width: 100px;border-right:1px solid #d8d8d8;box-sizing:border-box;display:none"></div>\
						           <div class="ellipsis flexRow" style="align-items: center;justify-content: center;min-width: 100px;max-width: 100px;border-right:1px solid #d8d8d8;box-sizing:border-box;"><div class="">' + item.BookTime.split(' ')[0] +
								'</div></div>\
						           <table class="orderDetailsTable" border="0" style="width:580px;">\
						             <tr>\
						                        <th style="width:30px;"></th>\
						                        <th style="width:180px;"></th>\
						                        <th style="width:75px;"></th>\
						                        <th style="width:200px;"></th>\
						                        <th style="width:100px;"></th>\
						             </tr>\
						           </table>\
						           <div class="flexRow" style="width: 150px;align-items: center;">\
						              <div class="agreeBtn" ApplicationNo="' + item.ApplicationNo + '">' + get_lan('table').agree +
								'</div>\
						              <div class="denyBtn" style="background: #d02239;" ApplicationNo="' + item.ApplicationNo + '">' + get_lan('table').deny +
								'</div>\
						           </div>\
						        </div>\
						    '
							)
							/*机票*/
							item.Segment.map(function(sItem) {
								$(".orderDetailsTable").eq(index).append(
									'\
						            <tr class="pendingTr">\
						              <td><div class="planeIcon"></div></td>\
						              <td>' +
									sItem[0].DepartureTime + '~' + sItem[0].ArrivalTime.substring(sItem[0].ArrivalTime.length - 5, sItem[0]
										.ArrivalTime.length) + '</td>\
						              <td>' + sItem[0].FlightNo +
									'</td>\
						              <td>' + sItem[0].OrgAirport + '-' + sItem[0].DesAirport +
									'</td>\
						              <td>' + sItem[0].AirFareAmount +
									'</td>\
						            </tr>\
						        ')
							})
							/*酒店*/
							item.Hotel.map(function(hItem) {
								$(".orderDetailsTable").eq(index).append(
									'\
						            <tr class="pendingTr">\
						              <td><div class="hotelIcon"></div></td>\
						              <td>' +
									hItem.CheckIn + '~' + hItem.CheckOut +
									'</td>\
						              <td></td>\
						              <td>' + hItem.HotelName +
									'</td>\
						              <td>' + hItem.HotelFareAmount +
									'</td>\
						            </tr>\
						        ')
							})
							/*火车*/
							item.Train.map(function(tItem) {
								$(".orderDetailsTable").eq(index).append(
									'\
						            <tr class="pendingTr">\
						              <td><div class="trainIcon"></div></td>\
						              <td>' +
									tItem.TrainDepartureTime + '~' + tItem.TrainArrivalTime.substring(tItem.TrainArrivalTime.length - 5,
										tItem.TrainArrivalTime.length) + '</td>\
						              <td>' + tItem.TrainCode +
									'</td>\
						              <td>' + tItem.TrainDeparte + '-' + tItem.TrainArrive +
									'</td>\
						              <td>' + tItem.TrainFareAmount +
									'</td>\
						            </tr>\
						        ')
							})
						})
					}
					
					
					
					
					altRows(".pendingTr");
					$(".agreeBtn").unbind("click").click(function() {
						$('body').mLoading("show");
						$.ajax({
							type: 'post',
							url: $.session.get('ajaxUrl'),
							dataType: 'json',
							data: {
								url: $.session.get('obtCompany') + "/OrderService.svc/ApproveAgreePost",
								jsonStr: '{"id":' + netUserId + ',"Language":"' + $.session.get('obtLanguage') + '","applicationNo":"' +
									$(this).attr("ApplicationNo") + '"}'
							},
							success: function(data) {
								$('body').mLoading("hide");
								var res = JSON.parse(data)
								console.log(res);
								pendingApproval();
								// window.location.href = '../../application/queryApplication.html';
							},
							error: function() {
								// alert('fail');
							}
						});
					})
					$(".denyBtn").unbind("click").click(function() {
						$('body').mLoading("show");
						$.ajax({
							type: 'post',
							url: $.session.get('ajaxUrl'),
							dataType: 'json',
							data: {
								url: $.session.get('obtCompany') + "/OrderService.svc/ApproveDenyPost",
								jsonStr: '{"id":' + netUserId + ',"Language":"' + $.session.get('obtLanguage') + '","applicationNo":"' +
									$(this).attr("ApplicationNo") + '"}'
							},
							success: function(data) {
								$('body').mLoading("hide");
								var res = JSON.parse(data)
								console.log(res);
								pendingApproval();
								// window.location.href = '../../application/queryApplication.html';
							},
							error: function() {
								// alert('fail');
							}
						});
					})
					$(".approveNoClick").unbind("click").click(function() {
						var applicationDetailInfo = {
							'orderNo': $(this).text(),
							'IsHistory': false,
						}
						$.session.set('applicationDetailInfo', JSON.stringify(applicationDetailInfo));
						window.location.href = '../../application/applicationDetail.html';
					})
					$('#tableBody').mLoading("hide");
					// altRows('orderTable');//表格
				}
			} else {
				// alert(get_lan('accountRemind'));
				// window.location.href='../../login/loginPage.html';
			}
		},
		error: function() {
			// alert('fail');
		}
	});
}
//表格颜色
function altRows(tr) {
	for (i = 0; i < $(tr).length; i++) {
		if (i % 2 == 0) {
			$(tr).eq(i).addClass("evenrowcolor");
		} else {
			$(tr).eq(i).addClass("oddrowcolor");
		}
	}
}
//公司新闻
function showCompanyNews(companyId) {
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/GetCompanyInfoPost",
			jsonStr: '{"id":' + netUserId + ',"companyID":"' + companyId + '","language":"' + obtLanguage + '"}'
		},
		success: function(data) {
			var res = JSON.parse(data);
			console.log(res);
			res.companyNews.map(function(item, index) {
				if(index<6){
					$(".newsList").append('\<div class="newsLi" index="' + index +
						'"><span class="l">' + item.Title + '</span><div class="line"></div> <span class="r">'+res.companyNews[index].Time+'</span></div>\
					')
				}
			})
			$(".articlePop").html(
				'\
            <div class="articlePopHeader"><div class="closeAretcleIcon">x</div></div>\
            <div class="articlePopHeaderBody">\
            </div>\
            '
			)
			if (obtLanguage == "EN") {
				$(".articlePop").css("width", "800px");
			}
			$(".newsLi").unbind("click").click(function() {
				var index = parseInt($(this).attr("index"));
				openArticlePop();
				$(".articlePopHeaderBody").html('\
                <div class="articlePopTittle">' + res.companyNews[index].Title +
					'</div>\
                <div class="articlePopDate">' + res.companyNews[index].Time +
					'</div>\
                <div class="articlePopContent autoScrollY">' + res.companyNews[index].Content +
					'</div>\
                ')
			})
			$("#cover,.closeAretcleIcon").unbind("click").click(function() {
				closeArticlePop();
			})
		},
		error: function(data) {
			console.log(data);
		}
	});
}
// //业界动态
// function showIndustryNews(){
//     $.ajax(
//       {
//         type:'post',
//         url : $.session.get('obtCompanyJava')+'/AndroidService/getIndustryNews.action',
//         dataType : 'json',
//         data:{
//             'culture': 'CN',
//             'uuid':$.session.get('javaLoginId')
//         },
//         success : function(data) {
//           var res = JSON.parse(data);
//           console.log(res);
//           res.map(function(item,index){
//             $(".industryNews").append('\
//                 <div class="companyNewsLi" index="'+index+'">'+item.titleCn+'</div>\
//                 ')
//           })
//         },
//         error : function(data) {
//           console.log(data);
//         }
//       }
//     );
// }
// //证件过期提醒
// function showDocumentRemaind(ID){
//     var data = new Object();
//     data["culture"]='CN';
//     // data.culture = 'CN';
//     data["uuid"]=$.session.get('javaLoginId');
//     data["list[0].customerId"]=ID;
//     console.log(data);
//     $.ajax(
//       {
//         type:'post',
//         url : $.session.get('obtCompanyJava')+'/AndroidService/GetDocumentRemaind.action',
//         dataType : 'json',
//         data:data,
//         success : function(data) {
//           console.log(data);
//         },
//         error : function(data) {
//           console.log(data);
//         }
//       }
//     );
// }
function openArticlePop() {
	$("#cover").show();
	$(".articlePop").css("display", "block");
}

function closeArticlePop() {
	$("#cover").hide();
	$(".articlePop").css("display", "none");
}
// TA单号,自动填充城市
function getCity() {
	if ($.session.get('TAnumber')) {
		var userid = netUserId.split("\"")[1]
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/SystemService.svc/GetTravelRequestCityInfo",
				jsonStr: '{"travelRequestNo":"' + $.session.get('TAnumber') + '","key":"' + userid + '","count":""}'
			},
			success: function(data) {
				$('body').mLoading("hide");
				if (data == '' || data == "[]") {
					// alert('没有权限')
					// HotelGKBooking(orderRes,type,false);
				} else {
					
					var resArr = JSON.parse(data);
					var newRes=[]
					for(var i=0;i<resArr.length-1;i=i+2){
						// if(i<2){
							var a=[]
							a.push(resArr[i])
							a.push(resArr[i+1])
							newRes.push(a)
						// }
					}
					console.log(newRes)					
					
					// var res = JSON.parse(data);
					// console.log(res)
					var domAirFlag=false,intlAirFlag=false,hotelFlag=false,trainFlag=false;
					newRes.map(function(item){
						setDefaultCity(item)
					})
					
					function setDefaultCity(res){
						var travelObj = {
							"ArriveCityCode": '',
							"ArriveCityEN": '',
							"ArriveCityCN": '',
							"leaveCityCode": '',
							"leaveCityEN": '',
							"leaveCityCN": '',
							"type": true,
							"starTime": '',
							"endTime": '',
						}
						var arriveType = true
						var leaveType = true
						// res type  0出发 1到达  res[0]和res[1] 一组 res[2]和res[3] 一组，但是一般只需要第一组就行
						// serviceType 0.全部 1.机票 2.酒店 3.租车 4.火车
						res.map(function(item) {
							if (item.type == 0 || item.type == "0") {
								travelObj.ArriveCityCode = item.Code
								travelObj.ArriveCityCN = item.NameCN
								travelObj.ArriveCityEN = item.NameEN
								if (item.CountryId != 46 && item.CountryId != "46") {
									arriveType = false
								}
								travelObj.starTime = item.StartTime
							}
							if (item.type == 1 || item.type == "1") {
								travelObj.leaveCityCode = item.Code
								travelObj.leaveCityCN = item.NameCN
								travelObj.leaveCityEN = item.NameEN
								if (item.CountryId != 46 && item.CountryId != "46") {
									leaveType = false
								}
								travelObj.endTime = item.EndTime
							}
						})
						
						TAminDate = travelObj.starTime.split(' ')[0];
						TAmaxDate = travelObj.endTime.split(' ')[0];
						MultipleDepartureDate()
						if (!arriveType || !leaveType) {
							travelObj.type = false
						}
						// 默认
						// 国内
						
						// serviceType 0.全部 1.机票 2.酒店 3.租车 4.火车
						var serviceType = res.length > 0 ? res[0].serviceType : ""
						if (travelObj.type && (serviceType == 0 || serviceType == 1) && !domAirFlag) {
								domAirFlag=true
								// 国内机票限制
								$.session.set("domAirSession",JSON.stringify(travelObj))
							$('#domDepartureCity').attr('code', travelObj.ArriveCityCode)
							$('#domDepartureCity').val($.session.get('obtLanguage') == "CN" ? travelObj.ArriveCityCN : travelObj.ArriveCityEN)
							$('#domArrivalCity').attr('code', travelObj.leaveCityCode)
							$('#domArrivalCity').val($.session.get('obtLanguage') == "CN" ? travelObj.leaveCityCN : travelObj.leaveCityEN)
							// setTimeout(function(){
							// 	$('#domDepartureDate').val(Dateformat(travelObj.starTime,0))
							// 	$('#domReturnDate').val(Dateformat(travelObj.starTime,1))
							// 	limitTime("#domDepartureDate",travelObj.starTime,travelObj.endTime)
							// 	limitTime("#domReturnDate",travelObj.starTime,travelObj.endTime)
							// },100)
						} else {
							// 国际
							if ((serviceType == 0 || serviceType == 1) && !intlAirFlag && !travelObj.type) {
								intlAirFlag=true
								// 国际机票限制
								$.session.set("intlAirSession",JSON.stringify(travelObj))
								$('#intlDepartureCity').attr('code', travelObj.ArriveCityCode)
								$('#intlDepartureCity').val($.session.get('obtLanguage') == "CN" ? travelObj.ArriveCityCN : travelObj.ArriveCityEN)
								$('#intlArrivalCity').attr('code', travelObj.leaveCityCode)
								$('#intlArrivalCity').val($.session.get('obtLanguage') == "CN" ? travelObj.leaveCityCN : travelObj.leaveCityEN)
								setTimeout(function() {
									// $('#intlDepartureDate').val(Dateformat(travelObj.starTime,0))
									// $('#intlReturnDate').val(Dateformat(travelObj.starTime,1))
									// limitTime("#intlDepartureDate",travelObj.starTime,travelObj.endTime)
									// limitTime("#intlReturnDate",travelObj.starTime,travelObj.endTime)
								}, 100)
							}
						}
						// 酒店
						if ((serviceType == 0 || serviceType == 2)&& !hotelFlag) {
							hotelFlag=true;
							// 酒店限制
						
							$.session.set("hotelSession",JSON.stringify(travelObj))
							$('#hotelCity').attr('code', travelObj.leaveCityCode)
							$('#hotelCity').val($.session.get('obtLanguage') == "CN" ? travelObj.leaveCityCN : travelObj.leaveCityEN)
							setTimeout(function() {
								// $('#hotelDepartureDate').val(Dateformat(travelObj.starTime,0))
								// $('#hotelReturnDate').val(Dateformat(travelObj.starTime,1))
								// limitTime("#hotelDepartureDate",travelObj.starTime,travelObj.endTime)
								// limitTime("#hotelReturnDate",travelObj.starTime,travelObj.endTime)
							}, 100)
							// 是否是国际
							if(!travelObj.type){
								$('.Hotel').click(function() {
										$('#intlHotel').attr('checked', 'checked')
										$('#intlHotel').click()
								})
							}
						}
						// 火车
						if (travelObj.type && (serviceType == 0 || serviceType == 4) && !trainFlag) {
							trainFlag=true
							// 火车限制
							$.session.set("trainSession",JSON.stringify(travelObj))
							$('#trainDepartureCity').attr('code', travelObj.ArriveCityCode)
							$('#trainDepartureCity').val($.session.get('obtLanguage') == "CN" ? travelObj.ArriveCityCN : travelObj.ArriveCityEN)
							$('#trainArrivalCity').attr('code', travelObj.leaveCityCode)
							$('#trainArrivalCity').val($.session.get('obtLanguage') == "CN" ? travelObj.leaveCityCN : travelObj.leaveCityEN)
							setTimeout(function() {
								// $('#trainDepartureDate').val(Dateformat(travelObj.starTime,0))
								// $('#trainReturnDate').val(Dateformat(travelObj.starTime,1))
								// limitTime("#trainDepartureDate",travelObj.starTime,travelObj.endTime)
								// limitTime("#trainReturnDate",travelObj.starTime,travelObj.endTime)
							}, 100)
						}
						$.session.set('goOnBooktravelInfo', JSON.stringify(travelObj));
						
						// 限制时间范围
						setTimeout(function() {
							$('#domDepartureDate').val(Dateformat(travelObj.starTime, 0))
							$('#domReturnDate').val(Dateformat(travelObj.starTime, 1))
							limitTime("#domDepartureDate", travelObj.starTime, travelObj.endTime,"#domReturnDate")
							// limitTime("#domReturnDate", travelObj.starTime, travelObj.endTime)
						
							$('#intlDepartureDate').val(Dateformat(travelObj.starTime, 0))
							$('#intlReturnDate').val(Dateformat(travelObj.starTime, 1))
							limitTime("#intlDepartureDate", travelObj.starTime, travelObj.endTime,"#intlReturnDate")
							// limitTime("#intlReturnDate", travelObj.starTime, travelObj.endTime)
						
							$('#hotelDepartureDate').val(Dateformat(travelObj.starTime, 0))
							$('#hotelReturnDate').val(Dateformat(travelObj.starTime, 1))
							limitTime("#hotelDepartureDate", travelObj.starTime, travelObj.endTime,"#hotelReturnDate")
							limitTime("#hotelReturnDate", travelObj.starTime, travelObj.endTime)
						
							$('#trainDepartureDate').val(Dateformat(travelObj.starTime, 0))
							$('#trainReturnDate').val(Dateformat(travelObj.starTime, 1))
							limitTime("#trainDepartureDate", travelObj.starTime, travelObj.endTime,"#trainReturnDate")
							// limitTime("#trainReturnDate", travelObj.starTime, travelObj.endTime)
						}, 100)
						
						// 日期格式，获取几天后的日期
						function Dateformat(dateTime, AddDayCount) {
							dateTime=dateTime.replace(/-/g,'/')
							var dd = new Date(dateTime);
							if (dd.getTime() < new Date().getTime()) {
								dd = new Date()
							}
							dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
							// dd.setDate(dd.getDate()); 
							var y = dd.getFullYear();
							var m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);
							var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
							return y + "-" + m + "-" + d;
						}
						
						function limitTime(id, min, max,returnDate) {
							var minTime=new Date().getTime()
							var minTime2=new Date(min.replace(/-/g,"/")).getTime()
							min=minTime<minTime2?min:new Date()
							$(id).datepicker('destroy'); //销毁原来的日期插件
							$(id).datepicker({
								dateFormat: 'yy-mm-dd',
								timeFormat: "HH:mm",
								changeMonth: true,
								minDate: min, // 当前日期之后的 0 天，就是当天
								maxDate: max, // 当前日期之后的 0 天，就是当天
								hideIfNoPrevNext: true,
								showOtherMonths: true,
								selectOtherMonths: true,
								changeYear: true,
								onSelect: function() {
									$(returnDate).datepicker('destroy');
									$(returnDate).val(getNextDay($(id).val()));
									$(returnDate).datepicker({
										dateFormat: 'yy-mm-dd',
										timeFormat: "HH:mm",
										changeMonth: true,
										minDate: $(id).val(), // 当前日期之后的 0 天，就是当天
										maxDate: max, // 当前日期之后的 0 天，就是当天
										hideIfNoPrevNext: true,
										showOtherMonths: true,
										selectOtherMonths: true,
										changeYear: true,
									});
								}
							});
							
						}
					}
				}
			},
		})
	}
}
// 获取证件有效期提醒
if(ProfileInfo.onlineStyle!="APPLE"){
	credentInfo()
}
function credentInfo(){
	var num=$.session.get("CustomerNum")
	if(num==2){
		return false
	}
	$.session.set("CustomerNum",2)
	var userid = netUserId.split("\"")[1]
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/GetCustomerDocumentPost",
			jsonStr: '{"id":"' + userid + '","customerId":"'+ ProfileInfo.ID +'","language":"'+obtLanguage+'"}'
		},
		success: function(data) {
			var res=JSON.parse(data)
			var newCustomerList=[]
			res.map(function(item){
				if(item.ExpiryType==1 || item.ExpiryType==2){
					newCustomerList.push(item)
				}
			})
			if(newCustomerList.length>0){
				var title=obtLanguage=="CN"?"证件有效期提醒":"Reminder of Expiration Date";
				var str1=obtLanguage=="CN"?"已过期":"Expired";
				var str2=obtLanguage=="CN"?"即将过期":"Expire Soon";
				// var tips=obtLanguage=="CN"?"请注意更新您的证件以免耽误您的行程。":"Please renew it so as not to delay your trip.";
				var tips=obtLanguage=="CN"?"请注意更新您的证件以免耽误您的行程。":"";
				var btn=obtLanguage=="CN"?"立即更新":"Update Now";
				var btn2=obtLanguage=="CN"?"以后提醒":"Remind Later";
				$('body').append('\
					<div id="coverCredent">\
						<div class="credentGroupPop">\
							<div class="closeCredent"></div>\
							<div class="credentTitle">'+title+'</div>\
							<div class="credentList">\
							</div>\
							<div class="credentTips">'+tips+'</div>\
							<div class="credentBtnGroup">\
								<div class="credentBtn credentBtn2">'+btn2+'</div>\
								<div class="credentBtn credentBtn1">'+btn+'</div>\
							</div>\
						</div>\
					</div>\
				')
					
				newCustomerList.map(function(item){
					if(item.ExpiryType==1){
						$(".credentList").append('\
							<div class="credent">\
								<span>'+ item.nameDoc +'</span>\
								<span>'+ item.docExpiryDate +'</span>\
								<span style="color:#ff7a00">'+str1+'</span>\
							</div>\
						')
					}else if(item.ExpiryType==2){
						$(".credentList").append('\
							<div class="credent">\
								<span>'+ item.nameDoc +'</span>\
								<span>'+ item.docExpiryDate +'</span>\
								<span>'+str2+'</span>\
							</div>\
						')
					}
				})
				// 关闭按钮
				$(".closeCredent").click(function(){
					$("#coverCredent").remove()
				})
				//立即更新，跳转
				$(".credentBtn1").click(function(){
					window.location.href='../profile/profilePage.html'
				})
				//以后提醒
				$(".credentBtn2").click(function(){
					$.ajax({
						type: 'post',
						url: $.session.get('ajaxUrl'),
						dataType: 'json',
						data: {
							url: $.session.get('obtCompany') + "/SystemService.svc/ModifyCustomerDocumentUpdatePost",
							jsonStr: '{"id":"' + userid + '","customerId":"'+ ProfileInfo.ID +'","language":"'+obtLanguage+'"}'
						},
						success: function(data) {
							var res=JSON.parse(data)
							if(res.code==200){
								$('#coverCredent').remove()
							}else{
								alert(res.message)
							}
						},
						})
				})
			}
		},
		})
		
}