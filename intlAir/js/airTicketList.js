var netUserId = $.session.get('netLoginId');
var obtLanguage = $.session.get('obtLanguage');
var isReturn = tools.queryString().isReturn;
var searchIntlInfo = JSON.parse($.session.get('searchIntlInfo'));
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
var TAorderNo = $.session.get('TAorderNo');
console.log(searchIntlInfo);
// 有TA单时，时间进行限制
var TAnumber = $.session.get('TAnumber');
var TAminDate = 0,
	TAmaxDate = 365
if (TAnumber != undefined && TAnumber != "" && $.session.get('goOnBooktravelInfo') != undefined && $.session.get(
		'goOnBooktravelInfo') != "") {
	var goOnBooktravelInfo = JSON.parse($.session.get('goOnBooktravelInfo'));
	TAminDate = goOnBooktravelInfo.starTime.split(" ")[0]
	TAmaxDate = goOnBooktravelInfo.endTime.split(" ")[0]
	var minTime=new Date().getTime()
	var minTime2
	if(TAminDate==0){
		minTime2=new Date().getTime()
	}else{
		minTime2=new Date(TAminDate.replace(/-/g,"/")).getTime()
	}
	TAminDate=minTime<minTime2?TAminDate:new Date()
}
// console.log(JSON.parse($.session.get('returnTicket')));

// 时间选择
var day = $.session.get('searchIntelDay');
var returnday = $.session.get('searchIntelReturnDay');
var setTime = 'all'
var setReturnTime = 'all'

function showPlusMinus() {
	if ($('#domDepartureSelect').val() != "all") {
		// $('#DepartPlusMinus').css('color','#000000')
		$('#DepartPlusMinus').removeAttr('disabled')
	} else {
		// $('#DepartPlusMinus').css('color':'#000000')
		$('#DepartPlusMinus').attr('disabled', 'disabled')
	}
	if ($('#domReturnSelect').val() != "all") {
		// $('#returnPlusMinus').css('color','#000000')
		$('#returnPlusMinus').removeAttr('disabled')
	} else {
		// $('#DepartPlusMinus').css('color':'#000000')
		$('#returnPlusMinus').attr('disabled', 'disabled')
	}
}

//中英文对象
var cn = {
	"progressBar": {
		"search": "查询",
		"book": "预订",
		"complete": "完成",
	},
	"searchBody": {
		"oneWay": "单程",
		"roundTrip": "来回程",
		"allDay": "全天",
		"search": "查询",
		"weekDay": '星期天, 星期一, 星期二, 星期三, 星期四, 星期五, 星期六',
		'cabins': {
			// 'cabin1': '不限',
			'cabin1': '全部',
			'cabin2': '经济舱',
			'cabin3': '公务舱',
			'cabin4': '头等舱',
			'cabin5': '公务舱/头等舱',
			'cabin6': "超级经济舱",
		},
	},
	'siftBody': {
		"departureTime": "起飞时间",
		"arrivalTime": "到达时间",
		"all": "全部出发机场",
		"all2": "全部到达机场",
		"price": "价格",
		"stopTitle": "转机",
		"recommendText": "推荐航班",
	},
	'airportName': {
		'all': '全部航空公司',
	},
	"ticketList": {
		"listRemind": "没有相关的航班信息或违反公司政策！",
		"tittle": "机票列表",
		"FlightNo": "航班",
		"PlaneType": "机型",
		"Punctuality": "准点率",
		"Duration": "用时",
		"LowestFare": "最低价",
		"LowestFareFlight": "该航班最低价",
		"PreferredAirline": "协议航空公司",
		"CompanyPreferred": "公司推荐",
		"preDay": "前一天",
		"nextDay": "后一天",
		"Code_share": "(共享)",
		"Tax": "税",
		"includeTax": "含税",
		"roundTittleGo": "去程票",
		"roundTittleReturn": "回程票",
		// "stopIcon":"经停",
		"stopIcon": "转机",
		"protocol": "协议价",
		"flightDetail": "航班详情",
		"BaggageInfo": "行李:",
		"noStop": "无转机",
		"stopOver": "转机",
	},
	"flightDetailPop": {
		"Flytime": "飞行",
		"transfer": "中转 ",
	},
	"ticketSpread": {
		"cabinCode": "舱位",
		"seatsNum": "座位数",
		"cabinType": "舱位类型",
		"NominalPrice": "票面价",
		"Tax": "税",
		"choose": "选择",
		'restriction': "限制条件",
		"violation": "违反政策",
	},
	"LowestAirlineRemind": "该航班为廉价航空，托运行李额须以航司规则为准，详情请咨询差旅顾问。",
	"popBody": {
		"popTittle": "您的预订与贵公司差旅政策不符，请选择原因",
		"confirm": "确定",
		"reasonTittle": "根据贵公司差旅政策规定， 因您未选择最低价格航班，请您选择原因：",
		"lowestTittle": "根据贵公司差旅政策规定， 全天最低价航班为：",
		"lowestTittle1": "根据贵公司差旅政策规定， 前后",
		"lowestTittle2": "小时最低价航班为：",
		"chooseLowest": "预订最低票价",
		"rasonRemind": "请选择理由",
		"ticketPrice": "票价:",
		"save": "可节省:",
		"true": "实际承运:",
	},
	"rulePopHeader": "退改签规则",
	"cabinRemind": "您选择的行程没有可销售运价",
	"pointBody":{
		"lowest":"最低票价",
		"recommend":"协议航空公司",
		"or":"或",
		"points":" 分",
	},
	"approachingTakeoff":{
		"title":"临近起飞",
		"para1":"1. 本航班已临近起飞时间，购票前请先到值机柜台确认出票后仍有时间值机 (支付成功后至少需 5-10 分钟完成出票) 。",
		"para2":"2. 若出票失败，订单自动取消并全额退款，若已出票，退改损失需自行承担",
		"btn":"确认预订"
	}
}
var en = {
	"progressBar": {
		"search": "Search",
		"book": "Book",
		"complete": "Complete",
	},
	"searchBody": {
		"oneWay": "One-way",
		"roundTrip": "Round-Trip",
		'allDay': "24hours",
		"search": "Search",
		"weekDay": 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
		'cabins': {
			'cabin1': 'All Classes',
			'cabin2': 'Economy',
			'cabin3': 'Business',
			'cabin4': 'First',
			'cabin5': 'Business/First',
			'cabin6': "Economy Extra",
		},
	},
	'siftBody': {
		"departureTime": "Departure Time",
		"arrivalTime": "Arrival Time",
		"all": "All Departure Airports",
		"all2": "All Arrival Airports",
		"price": "Price",
		"stopTitle": "Stopover",
		"recommendText": "Recommend",
	},
	'airportName': {
		'all': 'All Airlines',
	},
	"ticketList": {
		"listRemind": "No relevant flight available or out of policy",
		"tittle": "Segment List",
		"FlightNo": "Flight",
		"PlaneType": "Aircraft",
		"Punctuality": "Punctuality",
		"Duration": "Duration",
		"LowestFare": "Lowest Fare",
		"LowestFareFlight": "Lowest Fare of the same Flight",
		"PreferredAirline": "Preferred Airline",
		"CompanyPreferred": "Company Preferred",
		"preDay": "Previous Day",
		"nextDay": "Next Day",
		"Code_share": "(share)",
		"Tax": "Tax",
		"includeTax": "Tax Included",
		"roundTittleGo": "Departure",
		"roundTittleReturn": "Return",
		// "stopIcon":"Connecting",
		"stopIcon": "Stopover",
		"protocol": "Corporate",
		"flightDetail": "Flight Details",
		"BaggageInfo": "Baggage:",
		"noStop": "Nonstop",
		"stopOver": "stop",
	},
	"flightDetailPop": {
		"Flytime": "Flying Time",
		"transfer": "Layover",
	},
	"ticketSpread": {
		"cabinCode": "Cabin Code",
		"seatsNum": "Seats Num",
		"cabinType": "Cabin Type",
		"NominalPrice": "Nominal Price",
		"Tax": "Tax",
		"choose": "Choose",
		'restriction': "Restriction",
		"violation": "Out of Policy",
	},
	"LowestAirlineRemind": "This is a low-cost flight, the checked-in baggage allowance will be subject to airline's policy. Please contact your consultant for details of luggage issue.",
	"popBody": {
		"popTittle": "Your reservation does not match your company's travel policy, please select the reason",
		"confirm": "Confirm",
		"reasonTittle": "According to your company's travel policy, if you have not selected the lowest price flight, please choose the reason:",
		"lowestTittle": "According to your company's travel policy, the lowest fare of flight in this day is：",
		"lowestTittle1": "According to your company's travel policy, the ",
		"lowestTittle2": "-hour minimum flight is",
		"chooseLowest": "Book the lowest fare",
		"rasonRemind": "Please choose reasons.",
		"ticketPrice": "Ticket Price:",
		"save": "Save:",
		"true": "True:",
	},
	"rulePopHeader": "Restriction",
	"cabinRemind": "No fare available for the flights you selected.",
	"pointBody":{
		"lowest":"lowest price",
		"recommend":"recommended airline's",
		"or":"/",
		"points":" Points",
	},
	"approachingTakeoff":{
		"title":"Approaching Takeoff",
		"para1":"1. The flight is approaching the departure time. Please confirm at the airlines counter if you have enough time to complete the check in process. (it will take at least 5-10 minutes to complete the ticket issuance after successful payment).",
		"para2":"2. If travelers are refused to check in at airline counter once ticket issued, they need to pay the change fee and refund penalty at their own account.",
		"btn":"Confirm Booking"
	}
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
//弹窗
var textObj = {
	title:get_lan('approachingTakeoff').title,
	body:"<p>" + get_lan('approachingTakeoff').para1 + "</p>\
			<br>\
			<p>" + get_lan('approachingTakeoff').para2 + "</p>",
	btnText:get_lan('approachingTakeoff').btn
}
var start = new PopUpWindow(textObj);
$(function() {
	showContent(); //内容展示
	ticketList(); //机票列表
})
//内容展示
function showContent() {
	$("#main").html(
		'\
        <div class="autoCenter">\
            <div class="progressBar flexRow mainFontColor"></div>\
            <div class="searchBody flexRow"></div>\
			<div class="picBody"><img class="picGroupImg" src="../staticFile/query.png"/><a class="picHref" target="_blank" href=""></a></div>\
            <div class="ticketBody">\
                <div class="listTittle">' +get_lan('ticketList').tittle +'</div>\
                <div class="chooseDate specificFontColor"></div>\
                <div class="listRemind flexRow">\
                   <div style="width:90%;font-weight:bold;padding-left:40px" class="roundTittle">' +get_lan('searchBody').oneWay +'</div>\
                </div>\
                <div class="siftBody"></div>\
			</div>\
			<div class="pointsHeader hide"></div>\
            <div class="ticketList"></div>\
        </div>\
        '
	)
	if (TAorderNo != undefined) {
		console.log('隐藏')
		$('.menu .autoCenter').addClass('hide')
		$('.orderTittle').addClass('hide')
		$('.autoScrollY').addClass('hide')
		$('footer').addClass('hide')
		$('.menu').css("height", '40px')
	}
	$(".progressBar").html(
		'\
        <div class="progressLine progressActiveBack"></div><div class="progressCircle progressActiveBack"></div><span class="progressActiveFont">' +
		get_lan('progressBar').search +
		'</span>\
        <div class="progressLine progressBackColor"></div><div class="progressCircle progressBackColor"></div>' +
		get_lan('progressBar').book +
		'\
        <div class="progressLine progressBackColor"></div><div class="progressCircle progressBackColor"></div>' +
		get_lan('progressBar').complete + '\
        ')
	var showOneWay = ProfileInfo.onlineStyle == "APPLE" ? "hide" : "";
	var optionStr = ''
	if (ProfileInfo.onlineStyle == "APPLE") { //苹果的舱位两个,其他的为全部
		optionStr = '<option value="1" berthType="1">' + get_lan('searchBody').cabins.cabin2 +
			'</option>\
		<option value="2" berthType="2">' + get_lan('searchBody').cabins.cabin3 + '</option>'
	} else {
		optionStr = '<option value="0" berthType="0">' + get_lan('searchBody').cabins.cabin1 +
			'</option>\
		<option value="1" berthType="1">' + get_lan('searchBody').cabins.cabin2 +
			'</option>\
		<option value="2" berthType="2">' + get_lan('searchBody').cabins.cabin3 +
			'</option>\
		<option value="3" berthType="3">' + get_lan('searchBody').cabins.cabin4 +
			'</option>\
		<option value="4" berthType="4">' + get_lan('searchBody').cabins.cabin6 + '</option>'
	}

	// 2020.1.20  修改304行 <div class="intlDepartureWeek">'+getWeek(searchIntlInfo.date)+'</div></div>
	// 335行  <div class="intlReturnDateWeek">'+getWeek(GetDateStr(1,searchIntlInfo.date))+'</div></div>
	$(".searchBody").html('\
        <select class="searchState ' + showOneWay +
		'">\
        <option state="1" value="1">' + get_lan('searchBody').oneWay +
		'</option>\
        <option state="2" value="2">' + get_lan('searchBody').roundTrip +
		'</option>\
        </select>\
        <div class="intlDepartureCitySearch"><div class="departureAirIcon"></div><input type="text" id="intlDepartureCity" value="' +
		searchIntlInfo.departureCityText + '" code="' + searchIntlInfo.departureCity +
		'"></div>\
        <div class="intlArrivalCitySearch"><div class="arrivalAirIcon"></div><input type="text" id="intlArrivalCity" value="' +
		searchIntlInfo.arrivalCityText + '" code="' + searchIntlInfo.arrivalCity +
		'"></div>\
        <div class="intlDepartureDateSearch"><div class="departureDateIcon"></div><input type="text" id="intlDepartureDate" readonly value="' +
		searchIntlInfo.date +
		'">\
        <select type="text" id="intlDepartureSelect" onchange="showPlusMinus()">\
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
        <div class="intlDepartureWeek">' +
		'<select type="text" id="DepartPlusMinusintel"  class="plusMinus">\
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
		</select>' +
		'</div>\
		</div>\
        <div class="intlReturnDateSearch"><div class="returnDateIcon"></div><input type="text" id="intlReturnDate" readonly value="' +
		GetDateStr(1, searchIntlInfo.date) +
		'">\
        <select type="text" id="intlReturnSelect" onchange="showPlusMinus()">\
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
        <div class="intlReturnDateWeek">' +
		'<select type="text" id="returnPlusMinusintel"  class="plusMinus">\
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
		</select>' +
		'</div></div>\
        <select type="text" id="intlCabin">' +
		optionStr +
		'</select>\
        <div class="searchAirBtn btnBackColor">' + get_lan('searchBody').search +
		'</div></div>\
        ')
	if(ProfileInfo.NeedSpecialPolicy){
		$("#intlCabin  option:first").prop("selected", 'selected');
		$("#intlCabin").attr('disabled','disabled')
	}
	//时间限制
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
				if (item.LimitType == 2) {
					$(".searchAirBtn").attr("CanSearch", item.CanSearch);
					$(".searchAirBtn").attr("StartLimit", item.StartLimit);
					$(".searchAirBtn").attr("Message", item.Message);
					// if(item.CanSearch==false){
					$(".chooseDate").hide();
					// }
				}
			})
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
			url: $.session.get('obtCompany') + "/SystemService.svc/ProfilePost",
			jsonStr: '{"key":' + netUserId + '}'
		},
		success: function(data) {
			var res = JSON.parse(data);
			console.log(res);
			if (res.SearchInterAirWTime && res.DomesticHideAllDay) {
				$(".intlAllDay").remove();
				$("#intlDepartureSelect").val("8");
				$("#intlReturnSelect").val("17");
			}
			if (!res.SearchInterAirWTime) {
				$("#intlDepartureSelect").remove();
				$("#intlReturnSelect").remove();
			} else {
				if (searchIntlInfo.queryKey.split(',')[2].indexOf(' ') != -1) {
					var departureHour = searchIntlInfo.queryKey.split(',')[2].split(' ')[1].split(':')[0];
					$("#intlDepartureSelect").val(departureHour);
				} else {
					$("#intlDepartureSelect").val('all');
				}
				if (searchIntlInfo.queryKeyReturn && searchIntlInfo.queryKeyReturn.split(',')[3].indexOf(' ') != -1) {
					var arrivalHour = searchIntlInfo.queryKeyReturn.split(',')[3].split(' ')[1].split(':')[0];
					$("#intlReturnSelect").val(arrivalHour);
				} else {
					$("#intlReturnSelect").val('all');
				}
			}
		},
		error: function() {
			// alert('fail');
		}
	});
	$("#intlCabin").val(searchIntlInfo.showCabins);
	// 202.1.20 新增
	if (!ProfileInfo.QueryDomesticTicketsWithTime) {
		$("#DepartPlusMinus").remove();
		$("#DepartPlusMinus").remove();
		// 检查是否有±几小时的权限
		if (!ProfileInfo.ShowDomesticTimeSlt) {
			$(".intlDepartureWeek").remove();
			$('.intlReturnDateWeek').remove()
		}
	} else {
		if (searchIntlInfo.queryKey.split(',')[2].indexOf(' ') != -1) {
			var departureHour = searchIntlInfo.queryKey.split(',')[2].split(' ')[1].split(':')[0];
			$("#intlDepartureSelect").val(departureHour);
		} else {
			$("#intlDepartureSelect").val('all');
		}
		if (searchIntlInfo.queryKeyReturn && searchIntlInfo.queryKeyReturn.split(',')[3].indexOf(' ') != -1) {
			var arrivalHour = searchIntlInfo.queryKeyReturn.split(',')[3].split(' ')[1].split(':')[0];
			$("#intlReturnSelect").val(arrivalHour);
		} else {
			$("#intlReturnSelect").val('all');
		}
		// 检查是否有±几小时的权限
		if (!ProfileInfo.ShowDomesticTimeSlt) {
			$(".intlDepartureWeek").remove();
			$('.intlReturnDateWeek').remove()
		}

		// 正负小时,±小时默认值 以及状态显示
		if (day > 0) {
			$('#DepartPlusMinusintel').val(day)
		} else {
			$('#DepartPlusMinusintel').val(12)//5改为12
		}
		if (returnday > 0) {
			$('#returnPlusMinusintel').val(returnday)
		} else {
			$('#returnPlusMinusintel').val(12)
		}
		// 默认值设置后
		showPlusMinus()
	}
	if (searchIntlInfo.alterTicketInfo) {
		$(".searchBody").hide();
	}
	$(".searchState").change(function() {
		if ($('.searchState option:selected').attr("state") == '1') {
			$(".intlReturnDateSearch").hide();
		} else if ($('.searchState option:selected').attr("state") == '2') {
			$(".intlReturnDateSearch").show();
			var departureValue = new Date($("#intlDepartureDate").val().replace(/-/g, "/"));
			$("#intlReturnDate").datepicker('destroy');
			$("#intlReturnDate").datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				changeYear: true,
				minDate: departureValue, // 当前日期之后的 0 天，就是当天
				maxDate: TAmaxDate, // 当前日期之后的 0 天，就是当天
				hideIfNoPrevNext: true,
				showOtherMonths: true,
				selectOtherMonths: true,
				onSelect: function() {
					$(".intlReturnDateWeek").text(getWeek($("#intlReturnDate").val()));
				}
			});
			if (ProfileInfo.SearchInterAirWTime && ProfileInfo.DomesticHideAllDay) {
				$('#intlReturnSelect').val(17)
			} else {
				$('#intlReturnSelect').val('all')
			}
			$('#returnPlusMinusintel').val(12)//5换成12

		}
	})
	$(".searchAirBtn").unbind("click").click(function() {
		var that = this;
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
		// if (ProfileInfo.onlineStyle == "APPLE") {
			var cityList = '"' + $('#intlDepartureCity').attr("code") + '","' + $('#intlArrivalCity').attr("code") + '"';
			tools.appleRemindPop(cityList, 1, netUserId, function() {
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
							}else{
								searchIntl()
							}
						} else {
							return false;
						}
					}else{
						searchIntl()
					}
				}else{
					searchIntl()
				}
			});
		// } else {
		// 	searchIntl();
		// }

		function searchIntl() {
			var Direct = JSON.parse($.session.get('searchIntlInfo')).isDirect;
			var transitCityCode = JSON.parse($.session.get('searchIntlInfo')).transitCityCode;
			if ($('.searchState option:selected').attr("state") == '1') {
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
					'isDirect': Direct,
					'transitCityCode': transitCityCode,
				}
				if (ProfileInfo.SearchInterAirWTime) {
					if ($("#intlDepartureSelect option:selected").val() == "all") {
						var DepartureSelectValue = ''
					} else {
						var DepartureSelectValue = ' ' + $("#intlDepartureSelect option:selected").val() + ':00:00';
					}


					searchIntlInfo.queryKey = $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") + ',' +
						$('#intlDepartureDate').val() + DepartureSelectValue;
				}

				if ($('#DepartPlusMinusintel').val() == undefined || $('#DepartPlusMinusintel').val() == "undefined") {
					$.session.set('searchIntelDay', '');
				} else {
					$.session.set('searchIntelDay', $('#DepartPlusMinusintel').val());
				}
				// 2020.1.20缓存更改后的正负±小时

				$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
				location.replace('../../intlAir/airTicketList.html');
			} else if ($('.searchState option:selected').attr("state") == '2') {
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
					'isDirect': Direct,
					'transitCityCode': transitCityCode,
				}
				if (ProfileInfo.SearchInterAirWTime) {
					if ($("#intlDepartureSelect option:selected").val() == "all") {
						var DepartureSelectValue = ''
					} else {
						var DepartureSelectValue = ' ' + $("#intlDepartureSelect option:selected").val() + ':00:00';
					}
					if ($("#intlReturnSelect option:selected").val() == "all") {
						var ReturnSelectValue = ''
					} else {
						var ReturnSelectValue = ' ' + $("#intlReturnSelect option:selected").val() + ':00:00';
					}
					$.session.set('searchIntelDay', $('#DepartPlusMinusintel').val());
					$.session.set('searchIntelReturnDay', $('#returnPlusMinusintel').val())
					searchIntlInfo.queryKey = $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") + ',' +
						$('#intlDepartureDate').val() + DepartureSelectValue;
					searchIntlInfo.queryKeyReturn = $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") +
						',' + $('#intlDepartureDate').val() + DepartureSelectValue + ',' + $('#intlReturnDate').val() +
						ReturnSelectValue;
				}

				// 2020.1.20缓存更改后的正负±小时
				if ($('#DepartPlusMinusintel').val() == undefined || $('#DepartPlusMinusintel').val() == "undefined") {
					$.session.set('searchIntelDay', '');
				} else {
					$.session.set('searchIntelDay', $('#DepartPlusMinusintel').val());
				}

				if ($('#returnPlusMinusintel').val() == undefined || $('#returnPlusMinusintel').val() == "undefined") {
					$.session.set('searchIntelReturnDay', '');
				} else {
					$.session.set('searchIntelReturnDay', $('#returnPlusMinusintel').val());
				}
				$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
				location.replace('../../intlAir/airTicketList.html');
			}
		}
	})
	$("#intlDepartureCity").kuCity();
	$("#intlArrivalCity").kuCity();
	$("#intlDepartureDate").datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		changeYear: true,
		minDate: TAminDate, // 当前日期之后的 0 天，就是当天
		maxDate: TAmaxDate, // 当前日期之后的 0 天，就是当天
		hideIfNoPrevNext: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		onSelect: function() {
			// $(".intlDepartureWeek").text(getWeek($("#intlDepartureDate").val()));
			var departureValue = new Date($("#intlDepartureDate").val().replace(/-/g, "/"));
			$("#intlReturnDate").datepicker('destroy');
			$("#intlReturnDate").datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				changeYear: true,
				minDate: departureValue, // 当前日期之后的 0 天，就是当天
				maxDate: TAmaxDate, // 当前日期之后的 0 天，就是当天
				hideIfNoPrevNext: true,
				showOtherMonths: true,
				selectOtherMonths: true,
				onSelect: function() {
					// $(".intlReturnDateWeek").text(getWeek($("#intlReturnDate").val()));
				}
			});
			$("#intlReturnDate").val(getNextDay($("#intlDepartureDate").val()));
			// $(".intlReturnDateWeek").text(getWeek(getNextDay($("#intlDepartureDate").val())));
		}
	});

	function getNextDay(d) {
		d = new Date(d);
		d = +d + 1000 * 60 * 60 * 24;
		d = new Date(d);
		var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
		var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
		//格式化
		return d.getFullYear() + "-" + month + "-" + day;
	}
	//筛选排序模块
	$(".siftBody").html('\
        <select class="airLineChoose">\
        <option airCode="All">' + get_lan('airportName')
		.all +
		'</option>\
        </select>\
        <div class="siftLine" style="left:200px;"></div>\
        <select class="departAirPortChoose">\
          <option value="all" airport="all">' +
		get_lan('siftBody').all +
		'</option>\
        </select>\
        <div class="siftLine" style="left:400px;"></div>\
        <select class="arrivalAirPortChoose">\
          <option value="all" airport="all">' +
		get_lan('siftBody').all2 +
		'</option>\
        </select>\
        <div class="siftLine" style="left:600px;"></div>\
        <div class="departureTimeSort flexRow">' +
		get_lan('siftBody').departureTime +
		'<div class="departureTimeSortIcon"></div></div>\
        <div class="durationSort flexRow">' + get_lan('ticketList')
		.Duration + '<div class="durationSortIcon"></div></div>\
        <div class="priceSort flexRow">' + get_lan(
			'siftBody').price + '<div class="priceSortIcon"></div></div>\
        <div class="stopSort flexRow">' + get_lan(
			'siftBody').stopTitle + '</div>\
		<div class="recommed flexRow hide"><input type="checkbox" name="recommed" id="recommed" />\
		<label for="recommed">' + get_lan('siftBody').recommendText + '</label></div>\
        ')
	//<div class="arrivalTimeSort flexRow">'+get_lan('siftBody').arrivalTime+'<div class="arrivalTimeSortIcon"></div></div>
	GetCompanyImageInfos()

	/*2020-10-9 积分*/
	var PointTypeId2;
	var PointTypeId3;
	var pointsType = '';
	if(ProfileInfo.PointInfo&&ProfileInfo.PointInfo.PointRuleList){
		ProfileInfo.PointInfo.PointRuleList.map(function(item){
			if(item.PointTypeId==2&&(item.RegionType=="ALL"||item.RegionType=="I")&&(item.PointServiceType==0||item.PointServiceType==1)){
				pointsType += get_lan("pointBody").lowest+' ';
				PointTypeId2 = '2';
			}
			if(item.PointTypeId==3&&(item.RegionType=="ALL"||item.RegionType=="I")&&(item.PointServiceType==0||item.PointServiceType==1)){
				if(PointTypeId2=='2'){
					pointsType += get_lan("pointBody").or+' '+get_lan("pointBody").recommend+' ';
				}else{
					pointsType += get_lan("pointBody").recommend+' ';
				}
				PointTypeId3 = '3';
			}
		})
	}
	if(PointTypeId2=='2'||PointTypeId3=='3'){
		$(".pointsHeader").removeClass("hide");
	}
	if(obtLanguage=="CN"){
		$(".pointsHeader").text("ⓘ 预订 "+pointsType+"的机票即可获得积分奖励");
	}else if(obtLanguage=="EN"){
		$(".pointsHeader").text("ⓘ Book the "+pointsType+"ticket  to get bonus points");
	}
	if(isReturn==1){
		$(".pointsHeader").addClass("hide");
	}
	/*end*/
}
// 广告图片接口
function GetCompanyImageInfos(){
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/GetCompanyImageInfosWType",
			jsonStr: '{"key":' + netUserId + ',"appType":"WEB"}',
		},
		success: function(data) {
			if(data=="" || data.indexOf("404")>-1){
				$('.picBody').remove()
				return false
			}
			var res = JSON.parse(data);
			console.log(res);
			if(res.code==200){
				res.CompanyImageList.map(function(item){
					if(item.type==5){
						$('.picGroupImg').attr("src",item.path)
						if(item.hyperLink==""){
							$(".picHref").remove()
						}else{
							$(".picHref").attr("href",item.hyperLink)
						}
					}
				})
				
			}else{
				$('.picGroupImg').attr("src","../staticFile/query.png")
				$(".picHref").remove()
				if(ProfileInfo.onlineStyle=="APPLE"){
					$('.picBody').remove()
				}
				// 应该不需要提示
			}
		},
		error: function() {
			// alert('fail');
		}
	});
};


function getWeek(dateStr) {
	var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
	return get_lan('searchBody').weekDay.split(',')[myDate.getDay()];
}

function GetDateStr(AddDayCount, date) {
	var dd = new Date(date.replace(/-/g, '/'));
	dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
	var y = dd.getFullYear();
	// var m = dd.getMonth()+1;//获取当前月份的日期 
	// var d = dd.getDate();
	var m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);
	var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
	return y + "-" + m + "-" + d;
}

//机票列表
function ticketList() {
	// $('body').mLoading("show");
	tools.searchLoadingShow()
	if (searchIntlInfo.type == "oneWay") {
		var queryKey = searchIntlInfo.queryKey;
		var preDayDate = GetDateStr(-1, searchIntlInfo.date);
		var nextDayDate = GetDateStr(1, searchIntlInfo.date);
		$(".chooseDate").html('\
            <span class="preDay" style="margin-right:20px;">(' + preDayDate.substring(5,
				preDayDate.length) + ')' + get_lan('ticketList').preDay + '</span>\
            <span class="nextDay">(' +
			nextDayDate.substring(5, nextDayDate.length) + ')' + get_lan('ticketList').nextDay + '</span>\
            ')
		//前一天 后一天
		if (new Date() >= new Date(GetDateStr(0, searchIntlInfo.date).replace(/\-/g, "\/"))) {
			$(".preDay").hide();
		}
		$(".preDay").unbind("click").click(function() {
			if (new Date() < new Date(GetDateStr(0, searchIntlInfo.date).replace(/\-/g, "\/"))) {
				var queryKeyList = queryKey.split(',');
				// queryKeyList[2] = preDayDate;
				if ($('#intlDepartureSelect').val() == undefined || $('#intlDepartureSelect').val() == "undefined") {
					queryKeyList[2] = preDayDate;
				} else {
					queryKeyList[2] = preDayDate + " " + $('#intlDepartureSelect').val() + ":00";
				}
				searchIntlInfo.date = preDayDate;
				searchIntlInfo.queryKey = queryKeyList.join(",");
				$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
				location.reload();
			} else {
				$(".preDay").hide();
			}
		})
		$(".nextDay").unbind("click").click(function() {
			var queryKeyList = queryKey.split(',');
			// queryKeyList[2] = nextDayDate;
			if ($('#intlDepartureSelect').val() == undefined || $('#intlDepartureSelect').val() == "undefined") {
				queryKeyList[2] = nextDayDate;
			} else {
				queryKeyList[2] = nextDayDate + " " + $('#intlDepartureSelect').val() + ":00";
			}
			searchIntlInfo.date = nextDayDate;
			searchIntlInfo.queryKey = queryKeyList.join(",");
			$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
			location.reload();
		})
		var nonStop = "false";
		// url: $.session.get('obtCompany')+"/QueryService.svc/InterAirSearchNew",
		var goTimeLimite = $.session.get('searchIntelDay') ? $.session.get('searchIntelDay') : ""
		// var backTimeLimite=''
		var backTimeLimite = $.session.get('searchIntelReturnDay') ? $.session.get('searchIntelReturnDay') : ""

		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/QueryService.svc/InterSegmentSearchNew ",
				// jsonStr:'{"request":{"queryKey":"'+queryKey+'","airlineKey":"ALL","id":'+netUserId+',"Language":"'+obtLanguage+'","cabinType":"'+searchIntlInfo.showCabins+'","isDirect":"'+searchIntlInfo.isDirect+'","connectionLocationStr":"'+searchIntlInfo.transitCityCode+'"}}'
				jsonStr: '{"request":{"goTimeLimite":"' + goTimeLimite + '","backTimeLimite":"' + backTimeLimite +
					'","queryKey":"' + queryKey + '","airlineKey":"ALL","id":' + netUserId + ',"Language":"' + obtLanguage +
					'","cabinType":"' + searchIntlInfo.showCabins + '","isDirect":"' + searchIntlInfo.isDirect +
					'","connectionLocationStr":"' + searchIntlInfo.transitCityCode + '"}}'
			},
			success: function(data) {
				// $('body').mLoading("hide");
				tools.searchLoadingHide()
				var res = JSON.parse(data);
				console.log(res);
				
				setTime = $('#intlDepartureSelect').val()
				day = $.session.get('searchIntelDay');

				if (res.code == 200) {
					ticketListInfo(res.segmentList); //渲染列表
					chooseAirLine(res.segmentList); //选择航空公司
					sortTicketInfo(res.segmentList); //排序
				} else {
					alert(res.errMsg)
				}
			},
			error: function() {
				// alert('fail');
			}
		});
	} else if (searchIntlInfo.type == "roundTrip") {
		if (!isReturn || isReturn != 1) {
			var preDayDate = GetDateStr(-1, searchIntlInfo.date);
			var nextDayDate = GetDateStr(1, searchIntlInfo.date);
			$(".chooseDate").html('\
                <span class="preDay" style="margin-right:20px;">(' + preDayDate.substring(5,
					preDayDate.length) + ')' + get_lan('ticketList').preDay + '</span>\
                <span class="nextDay">(' +
				nextDayDate.substring(5, nextDayDate.length) + ')' + get_lan('ticketList').nextDay + '</span>\
                ')
			//前一天 后一天
			if (new Date() >= new Date(GetDateStr(0, searchIntlInfo.date).replace(/\-/g, "\/"))) {
				$(".preDay").hide();
			}
			if (searchIntlInfo.date == searchIntlInfo.returndate) {
				$(".nextDay").hide();
			}
			$(".preDay").unbind("click").click(function() {
				if (new Date() < new Date(GetDateStr(0, searchIntlInfo.date).replace(/\-/g, "\/"))) {
					var queryKeyReturnList = searchIntlInfo.queryKeyReturn.split(',');
					// queryKeyReturnList[2] = preDayDate;
					// queryKeyReturnList[2] = preDayDate+" "+$('#intlDepartureSelect').val()+":00";

					if ($('#intlDepartureSelect').val() == undefined || $('#intlDepartureSelect').val() == "undefined") {
						queryKeyReturnList[2] = preDayDate;
					} else {
						queryKeyReturnList[2] = preDayDate + " " + $('#intlDepartureSelect').val() + ":00";
					}

					searchIntlInfo.date = preDayDate;
					searchIntlInfo.queryKeyReturn = queryKeyReturnList.join(",");
					$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
					location.reload();
				} else {
					$(".preDay").hide();
				}
			})
			$(".nextDay").unbind("click").click(function() {
				var queryKeyReturnList = searchIntlInfo.queryKeyReturn.split(',');
				// queryKeyReturnList[2] = nextDayDate;
				// queryKeyReturnList[2] = nextDayDate+" "+$('#intlDepartureSelect').val()+":00";

				if ($('#intlDepartureSelect').val() == undefined || $('#intlDepartureSelect').val() == "undefined") {
					queryKeyReturnList[2] = nextDayDate;
				} else {
					queryKeyReturnList[2] = nextDayDate + " " + $('#intlDepartureSelect').val() + ":00";
				}
				searchIntlInfo.date = nextDayDate;
				searchIntlInfo.queryKeyReturn = queryKeyReturnList.join(",");
				$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
				location.reload();
			})
			$(".roundTittle").text(get_lan('ticketList').roundTittleGo);
			var queryKey = searchIntlInfo.queryKeyReturn;
			// url: $.session.get('obtCompany')+"/QueryService.svc/InterAirSearchNew",
			var goTimeLimite = $.session.get('searchIntelDay') ? $.session.get('searchIntelDay') : ""
			var backTimeLimite = $.session.get('searchIntelReturnDay') ? $.session.get('searchIntelReturnDay') : ""
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/QueryService.svc/InterSegmentSearchNew ",
					// jsonStr:'{"request":{"queryKey":"'+queryKey+'","id":'+netUserId+',"Language":"'+obtLanguage+'","airlineKey":"ALL","cabinType":"'+searchIntlInfo.showCabins+'","isDirect":"'+searchIntlInfo.isDirect+'","connectionLocationStr":"'+searchIntlInfo.transitCityCode+'"}}'
					jsonStr: '{"request":{"goTimeLimite":"' + goTimeLimite + '","backTimeLimite":"' + backTimeLimite +
						'","queryKey":"' + queryKey + '","airlineKey":"ALL","id":' + netUserId + ',"Language":"' + obtLanguage +
						'","cabinType":"' + searchIntlInfo.showCabins + '","isDirect":"' + searchIntlInfo.isDirect +
						'","connectionLocationStr":"' + searchIntlInfo.transitCityCode + '"}}'
				},
				success: function(data) {
					// $('body').mLoading("hide");
					tools.searchLoadingHide()
					var res = JSON.parse(data);
					console.log(res);
					var airTicketList = [];
					setTime = $('#intlDepartureSelect').val()
					day = $.session.get('searchIntelDay');
					setReturnTime = $('#intlReturnSelect').val()
					returnday = $.session.get('searchIntelReturnDay');


					if (res.code == 200) {
						res.segmentList.map(function(item) {
							if (item.RouteType == 1) {
								airTicketList.push(item);
							}
						})
						ticketListInfo(airTicketList); //渲染页面
						chooseAirLine(airTicketList); //选择航空公司
						sortTicketInfo(airTicketList); //排序
					} else {
						alert(res.errMsg)
					}



				},
				error: function() {
					// alert('fail');
				}
			});
		} else if (isReturn == 1) {
			$(".chooseDate").hide();
			$(".roundTittle").text(get_lan('ticketList').roundTittleReturn);
			var queryKey = searchIntlInfo.queryKeyReturn;
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/QueryService.svc/GetInterAirFreeInCache",
					jsonStr: '{"queryKey":"' + queryKey + '","id":' + netUserId + ',"Language":"' + obtLanguage +
						'","airlineKey":"ALL","cabinType":"' + searchIntlInfo.showCabins + '","isDirect":"' + searchIntlInfo.isDirect +
						'"}'
				},
				success: function(data) {
					// $('body').mLoading("hide");
					tools.searchLoadingHide()
					var res = JSON.parse(data);
					console.log(res);
					var airTicketListReturn = [];

					setTime = $('#intlDepartureSelect').val()
					day = $.session.get('searchIntelDay');
					setReturnTime = $('#intlReturnSelect').val()
					returnday = $.session.get('searchIntelReturnDay');

					res[0].map(function(item) {
						if (item.RouteType != 1) {
							airTicketListReturn.push(item);
						}
					})
					var returnAirLineCode = JSON.parse($.session.get('returnTicket')).AirLineCode;
					var returnSegIdList = JSON.parse(JSON.parse($.session.get('returnTicket')).returnSegIdList)
					var returnAirLine = [];
					airTicketListReturn.map(function(item) {
						returnSegIdList.map(function(sItem) {
							if (item.SegID == sItem) {
								returnAirLine.push(item)
							}
						})
					})
					console.log(returnAirLine)
					ticketListInfo(returnAirLine);
					// chooseAirLine(airTicketList);//选择航空公司
					sortTicketInfo(returnAirLine); //排序
				},
				error: function() {
					// alert('fail');
				}
			});
		}
		$(".searchState").val("2");
		// $(".searchState").find("option").eq(1).attr("selected",true);
		$(".intlReturnDateSearch").css("display", "block");
		var departureValue = new Date($("#intlDepartureDate").val().replace(/-/g, "/"));
		$("#intlReturnDate").val(searchIntlInfo.returndate);
		// $(".intlReturnDateWeek").text(getWeek($("#intlReturnDate").val()));
		$("#intlReturnDate").datepicker('destroy');
		$("#intlReturnDate").datepicker({
			dateFormat: 'yy-mm-dd',
			changeMonth: true,
			changeYear: true,
			minDate: departureValue, // 当前日期之后的 0 天，就是当天
			maxDate: TAmaxDate, // 当前日期之后的 0 天，就是当天
			hideIfNoPrevNext: true,
			showOtherMonths: true,
			selectOtherMonths: true,
			onSelect: function() {
				// $(".intlReturnDateWeek").text(getWeek($("#intlReturnDate").val()));
			}
		});
	}
}
//选择航空公司
function chooseAirLine(res) {
	var alineLineList = [],
		i,
		j,
		len = res.length;
	for (i = 0; i < len; i++) {
		for (j = i + 1; j < len; j++) {
			if (res[i].AirLineSort === res[j].AirLineSort) {
				j = ++i;
			}
		}
		alineLineList.push(res[i]);
	}
	var alineLineSort = function(arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (arr[i].AirLineCode.charCodeAt() > arr[j].AirLineCode.charCodeAt()) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}
	var AirportList = [],
		AirportArriveList = [];
	i,
	j,
	len = res.length;
	for (i = 0; i < len; i++) {
		for (j = i + 1; j < len; j++) {
			if (res[i].Departure === res[j].Departure) {
				j = ++i;
			}
		}
		AirportList.push(res[i]);
	}
	for (i = 0; i < len; i++) {
		for (j = i + 1; j < len; j++) {
			if (res[i].Destination === res[j].Destination) {
				j = ++i;
			}
		}
		AirportArriveList.push(res[i]);
	}
	// console.log(AirportList)
	alineLineSort(alineLineList).map(function(item) {
		$(".airLineChoose").append('\
        <option airCode="' + item.AirLineCode + '">' + item.AirLineCode + '-' + item.AirLineSort +
			'</option>\
        ')
	})
	AirportList.map(function(item) {
		$(".departAirPortChoose").append('\
        <option airport="' + item.Departure + '">' + item.Departure +
			'</option>\
        ')
	})
	AirportArriveList.map(function(item) {
		$(".arrivalAirPortChoose").append('\
        <option airport="' + item.Destination + '">' + item.Destination +
			'</option>\
        ')
	})
	var airlineAirList = [],
		departAirPortList = [],
		arrivalAirPortList = [],
		recommedList=[];
	res.map(function(item) {
		airlineAirList.push(item);
		departAirPortList.push(item);
		arrivalAirPortList.push(item);
	})

	$(".airLineChoose").change(function() {
		airlineAirList = [];
		if ($('.airLineChoose option:selected').attr("airCode") == 'All') {
			res.map(function(item) {
				airlineAirList.push(item);
			})
		} else {
			res.map(function(item) {
				item.InterSegments.map(function(sItem) {
					if (sItem.MarketingCode == $('.airLineChoose option:selected').attr("airCode")) {
						airlineAirList.push(item);
					}
				})
			})
		}
		siftAirList(airlineAirList, departAirPortList, arrivalAirPortList);
		$(".priceSort,.departureTimeSort,.durationSort").css("color", '#000');
		$(".priceSortIcon,.departureTimeSortIcon,.durationSortIcon").css("background-position", "0px 0px");
	})
	$(".departAirPortChoose").change(function() {
		departAirPortList = [];
		if ($('.departAirPortChoose option:selected').attr("airport") == 'all') {
			res.map(function(item) {
				departAirPortList.push(item);
			})
		} else {
			res.map(function(item) {
				if (item.Departure == $('.departAirPortChoose option:selected').attr('airport')) {
					departAirPortList.push(item)
				}
			})
		}
		siftAirList(airlineAirList, departAirPortList, arrivalAirPortList);
		$(".priceSort,.departureTimeSort,.durationSort").css("color", '#000');
		$(".priceSortIcon,.departureTimeSortIcon,.durationSortIcon").css("background-position", "0px 0px");
	})
	$(".arrivalAirPortChoose").change(function() {
		arrivalAirPortList = [];
		if ($('.arrivalAirPortChoose option:selected').attr("airport") == 'all') {
			res.map(function(item) {
				arrivalAirPortList.push(item);
			})
		} else {
			res.map(function(item) {
				if (item.Destination == $('.arrivalAirPortChoose option:selected').attr('airport')) {
					arrivalAirPortList.push(item)
				}
			})
		}
		siftAirList(airlineAirList, departAirPortList, arrivalAirPortList);
		$(".priceSort,.departureTimeSort,.durationSort").css("color", '#000');
		$(".priceSortIcon,.departureTimeSortIcon,.durationSortIcon").css("background-position", "0px 0px");
	})
	
	//推荐航班
	$('#recommed').change(function(){
		console.log($(this).is(":checked"))
		if(ProfileInfo.ShowDAgreementOrLevel3){
			recommedList = [];
			if (!$(this).is(":checked")) {
				res.map(function(item) {
					recommedList.push(item);
				})
			} else {
				res.map(function(item) {
					if (item.isAgreementOrLevel3) {
						recommedList.push(item)
					}
				})
			}
		}
		siftAirList(airlineAirList, departAirPortList, arrivalAirPortList,recommedList);
	})
	if(ProfileInfo.ShowDAgreementOrLevel3 && (searchIntlInfo.type=='oneWay' || (searchIntlInfo.type=='roundTrip' && isReturn != 1))){
		// $('#recommed').prop('checked',"true")
		$('#recommed').click()
		$('.recommed').removeClass('hide')//注意类名和ID
	}else{
		$('.recommed').remove()
	}
}

function siftAirList(airlineList, departAirPortList, arrivalAirPortList,recommedList) {
	var chooseAirLine = [];
	var hasRecommed=[]
	var result = [];
	airlineList.map(function(item) {
		departAirPortList.map(function(dItem) {
			if (item.SegID == dItem.SegID) {
				chooseAirLine.push(item);
			}
		})
	})
	// console.log(chooseAirLine)
	chooseAirLine.map(function(item) {
		arrivalAirPortList.map(function(aItem) {
			if (item.SegID == aItem.SegID) {
				// result.push(item);
				hasRecommed.push(item);
			}
		})
	})
	hasRecommed.map(function(item) {
		if(recommedList && recommedList.length>0 && $('#recommed').is(':checked')){
			recommedList.map(function(aItem) {
				if (item.SegID == aItem.SegID) {
					result.push(item);
				}
			})
		}else{
			if(ProfileInfo.ShowDAgreementOrLevel3 && $('#recommed').is(':checked')){
				result=[]
			}else{
				result=hasRecommed
			}
		}
	})
	// console.log(result);
	ticketListInfo(result,"recommed");
	sortTicketInfo(result); //排序
}
//机票排序
function sortTicketInfo(res) {
	var date = new Date();
	var timeSortAsc = [];
	var timeSortDes = [];
	var useTimeSortAsc = [];
	var useTimeSortDes = [];
	var priceSortAsc = [];
	var priceSortDes = [];
	res.map(function(item) {
		timeSortAsc.push(item);
		timeSortDes.push(item);
		useTimeSortAsc.push(item);
		useTimeSortDes.push(item);
		priceSortAsc.push(item);
		priceSortDes.push(item);
	})
	var bubbleSortAsc = function(arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (date.setHours(arr[i].DateStart.split(":")[0], arr[i].DateStart.split(":")[1]) > date.setHours(arr[j].DateStart
						.split(":")[0], arr[j].DateStart.split(":")[1])) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}
	var bubbleSortDes = function(arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (date.setHours(arr[i].DateStart.split(":")[0], arr[i].DateStart.split(":")[1]) < date.setHours(arr[j].DateStart
						.split(":")[0], arr[j].DateStart.split(":")[1])) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}
	var usetimebubbleSortAsc = function(arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (parseFloat(arr[i].Duration.split('h')[0] + '.' + arr[i].Duration.split('h')[1].split('m')[0]) > parseFloat(arr[
						j].Duration.split('h')[0] + '.' + arr[j].Duration.split('h')[1].split('m')[0])) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}
	var usetimebubbleSortDes = function(arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (parseFloat(arr[i].Duration.split('h')[0] + '.' + arr[i].Duration.split('h')[1].split('m')[0]) < parseFloat(arr[
						j].Duration.split('h')[0] + '.' + arr[j].Duration.split('h')[1].split('m')[0])) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}
	var pricebubbleSortAsc = function(arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (parseInt(arr[i].Fare) + parseInt(arr[i].TotalTax) > parseInt(arr[j].Fare) + parseInt(arr[j].TotalTax)) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}
	var pricebubbleSortDes = function(arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (parseInt(arr[i].Fare) + parseInt(arr[i].TotalTax) < parseInt(arr[j].Fare) + parseInt(arr[j].TotalTax)) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}
	$(".departureTimeSort").unbind("click").click(function() {
		$(".priceSort,.durationSort").css("color", '#000');
		$(".priceSortIcon.durationSortIcon").css("background-position", "0px 0px");
		if ($(".departureTimeSort").attr("sortType") == "acs") {
			ticketListInfo(bubbleSortDes(timeSortDes));
			$(".departureTimeSort").attr("sortType", "desc");
			$(".departureTimeSort").css("color", '#1e66ae');
			$(".departureTimeSortIcon").css("background-position", "-36px 0px");
		} else if (!$(".departureTimeSort").attr("sortType") || $(".departureTimeSort").attr("sortType") == "desc") {
			ticketListInfo(bubbleSortAsc(timeSortAsc));
			$(".departureTimeSort").attr("sortType", "acs");
			$(".departureTimeSortIcon").css("background-position", "-18px 0px");
		}
	})
	$(".durationSort").unbind("click").click(function() {
		$(".priceSort,.departureTimeSort").css("color", '#000');
		$(".priceSortIcon,.departureTimeSortIcon").css("background-position", "0px 0px");
		if ($(".durationSort").attr("sortType") == "acs") {
			ticketListInfo(usetimebubbleSortDes(useTimeSortDes));
			$(".durationSort").attr("sortType", "desc");
			$(".durationSort").css("color", '#1e66ae');
			$(".durationSortIcon").css("background-position", "-36px 0px");
		} else if (!$(".durationSort").attr("sortType") || $(".durationSort").attr("sortType") == "desc") {
			ticketListInfo(usetimebubbleSortAsc(useTimeSortAsc));
			$(".durationSort").attr("sortType", "acs");
			$(".durationSortIcon").css("background-position", "-18px 0px");
		}
	})
	$(".priceSort").unbind("click").click(function() {
		$(".departureTimeSort,.durationSort").css("color", '#000');
		$(".departureTimeSortIcon,.durationSortIcon").css("background-position", "0px 0px");
		if ($(".priceSort").attr("sortType") == "acs") {
			ticketListInfo(pricebubbleSortDes(priceSortDes));
			$(".priceSort").attr("sortType", "desc");
			$(".priceSort").css("color", '#1e66ae');
			$(".priceSortIcon").css("background-position", "-36px 0px");
		} else if (!$(".priceSort").attr("sortType") || $(".priceSort").attr("sortType") == "desc") {
			ticketListInfo(pricebubbleSortAsc(priceSortAsc));
			$(".priceSort").attr("sortType", "acs");
			$(".priceSortIcon").css("background-position", "-18px 0px");
		}
	})
}

function ticketListInfo(res,recommed) {
	// console.log(res);
	if (res.length == 0) {
		if(recommed=="recommed" && ProfileInfo.ShowDAgreementOrLevel3){
			//有推荐航班权限 且推荐航班被选中
		}else{
			alert(get_lan("ticketList").listRemind);
		}
	}
	$(".ticketList").html('');
	// 时间过滤
	// var res=fillterTimeList(res)
	// var priceList =[];
	// res.map(function(item){
	//     priceList.push(parseInt(item.Fare)+parseInt(item.TotalTax));
	// })
	// var minPrice = Math.min.apply(null,priceList);

	/*2020-10-9积分*/
	var PointTypeId2;
	var PointTypeId3;
	var PointValue2;
	var PointValue3;
	if(ProfileInfo.PointInfo&&ProfileInfo.PointInfo.PointRuleList){
		ProfileInfo.PointInfo.PointRuleList.map(function(item){
			if(item.PointTypeId==2&&(item.RegionType=="ALL"||item.RegionType=="I")&&(item.PointServiceType==0||item.PointServiceType==1)){
				PointTypeId2 = '2';
				PointValue2 = item.PointValue;
			}
			if(item.PointTypeId==3&&(item.RegionType=="ALL"||item.RegionType=="I")&&(item.PointServiceType==0||item.PointServiceType==1)){
				PointTypeId3 = '3';
				PointValue3 = item.PointValue;
			}
		})
	}
	/*end*/
	res.map(function(item, index) {
		var ticketPriceColor = item.ShowLowestFare == 1 ? "ticketPriceColor" : "";
		// if(isReturn==1){
		//     ticketPriceColor = "";
		// }
		var showStop = item.InterSegments.length > 1 ? "" : "hide";
		var stopAirport = item.Transit != null ? item.Transit : '';
		var showTicketViolation = item.SegPolicyType == 4 || item.SegPolicyType == 3 ? "" : "hide";
		var ticketAirLineColor = item.isCodeShare ? "ticketAirLineColor" : "";
		var protocolShow = item.FareType == 2 ? "" : "hide";
		if (ProfileInfo.onlineStyle == "APPLE") {
			protocolShow = "hide";
		}
		if (item.AirLineCode == "3U") {
			var airlineIcon = "a3u";
		} else if (item.AirLineCode == "3W") {
			var airlineIcon = "a3w";
		} else if (item.AirLineCode == "8L") {
			var airlineIcon = "a8l";
		} else if (item.AirLineCode == "9C") {
			var airlineIcon = "a9C";
		} else {
			var airlineIcon = item.AirLineCode;
		}
		var showTicketDays = item.Days > 0 ? "" : "hide";
		var showBaggageInfo = item.BaggageInfo == null ? "hide" : "";
		if (obtLanguage == "CN") {
			var BaggageInfo = item.BaggageInfo.baggagePiecesField == "" ? item.BaggageInfo.baggageWeightField + ' ' + item.BaggageInfo
				.baggageWeightUnitField : item.BaggageInfo.baggagePiecesField + " 件";
		} else if (obtLanguage == "EN") {
			var BaggageInfo = item.BaggageInfo.baggagePiecesField == "" ? item.BaggageInfo.baggageWeightField + ' ' + item.BaggageInfo
				.baggageWeightUnitField : item.BaggageInfo.baggagePiecesField + " Piece(s)";
		}
		var DepTerm = item.InterSegments[0].DepTerm == null || item.InterSegments[0].DepTerm == "" ? "" : '(' + item.InterSegments[
			0].DepTerm + ')';
		var ArrTerm = item.InterSegments[item.InterSegments.length - 1].ArrTerm == null || item.InterSegments[item.InterSegments
			.length - 1].ArrTerm == '' ? "" : '(' + item.InterSegments[item.InterSegments.length - 1].ArrTerm + ')';
		var intlFlightNo = '';
		item.InterSegments.map(function(item) {
			intlFlightNo += item.FlightNo;
			intlFlightNo += ',';
		})
		var ShowCabinDetail = res[0].ShowCabinDetail ? "hide" : "";
		var showStopOver = "",
			hideStopOver = "hide",
			StayTime = "",
			stopNum = '1'
		if (item.InterSegments.length > 1) {
			showStopOver = ""
			hideStopOver = "hide"
			StayTime = item.InterSegments[1].StayTime
		} else {
			showStopOver = "hide"
			hideStopOver = ""
			StayTime = ""
		}
		var dateStartDay = item.Date.split(' ')[0].split('-').join('');
		var dateStartTime = item.DateStart.split(':').join('');
		var dateStart = dateStartDay + dateStartTime;
		stopNum = item.InterSegments.length - 1
		$(".ticketList").append('\
            <div class="ticketLi">\
                <div class="ticketAirLineIcon ' +
			airlineIcon + '"></div>\
                <div title="' + item.AirLine + '" class="ticketAirLine ' +
			ticketAirLineColor + ' ellipsis">' + item.AirLine + '</div>\
                <div class="ticketFlightNo">' +
			intlFlightNo.substring(0, intlFlightNo.length - 1) + '</div>\
                <div class="ticketPlaneType">' +
			get_lan('ticketList').PlaneType + ' ' + item.InterSegments[0].PlaneType +
			'</div>\
                <div class="ticketTimeStart">' + item.DateStart +
			'</div>\
                <div class="stopIcon ' + showStop + '">' + get_lan('ticketList').stopIcon +
			'</div>\
                <div class="ticketArrow"></div>\
                <div class="stopBody ' + showStop +
			'" title="' + stopAirport + '">' + stopAirport + '</div>\
                <div class="ticketTimeArrive">' + item.DateArrive +
			'</div>\
                <div class="ticketAirportDeparte">' + item.Departure + DepTerm +
			'</div>\
                <div class="ticketAirportArrive">' + item.Destination + ArrTerm +
			'</div>\
                <div class="ticketDays ' + showTicketDays + '">+' + item.Days +
			'</div>\
                <div class="ticketOntime">' + get_lan('ticketList').Punctuality + '<br/>' + '61%' +
			'</div>\
                <div class="ticketFlightDetail ' + showStop + '" index="' + index + '">' + get_lan(
				"ticketList").flightDetail + '</div>\
                <div class="ticketRestriction ' + ShowCabinDetail +
			'" ruleSegID="' + item.SegID + '" CabinID="' + item.InterCabins[0].CabinID + '">' + get_lan('ticketSpread').restriction +
			'</div>\
                <div class="ticketDuration">' + item.Duration +
			'</div>\
                <div class="ticketBaggageInfo ' + showBaggageInfo + '">' + get_lan('ticketList').BaggageInfo +
			'<span style="color:#000">' + BaggageInfo + '</span></div>\
                <div class="ticketViolationIcon ' +
			showTicketViolation + '">' + get_lan('ticketSpread').violation +
			'</div>\
				<div class="stopOver "><span class="' + showStopOver + '">' + stopNum + get_lan('ticketList').stopOver +
			'</span> <span class="' + hideStopOver + '">' + get_lan('ticketList').noStop +
			'</span></div>\
				<div class="stopOverTime ' + showStopOver + '">' + StayTime +
			'</div>\
				<div class="ticketFareAmount ' + ticketPriceColor + '" dateStart="' + dateStart + '" CabinID="' + item.InterCabins[0].CabinID +
			'" spread="off" AirLineCode="' + item.AirLineCode + '" SegID="' + item.SegID + '" ticketTax="' + item.TotalTax +
			'" ticketPrice="' + item.Fare +'" LimitFare="'+item.LimitFare+'"'+
			'"><span class="ticketPriceText" style="text-decoration: underline;">' +
			(parseInt(item.Fare) + parseInt(item.TotalTax)) + '</span><span style="font-size:14px;color:#4d4d4d;">'+item.Curreny+'</span><span style="font-size:14px;color:#4d4d4d">(' + get_lan(
				'ticketList').includeTax + ')</span></div>\
                <div class="ticketCabin flexRow"><img src="../images/honeyIcon.png" class="honeyIcon hide" style="width:14px;height:14px;margin: 1px 5px 0 0;">' + item.CabinName +
			'  &nbsp;/&nbsp;  ' + get_lan('ticketList').Tax + ' ' + item.TotalTax +
			'</div>\
			    <div class="ticketLiPointsBody hide"></div>\
                <div class="protocolBody ' + protocolShow +
			'">\
                  <div class="protocolText">' + get_lan('ticketList').protocol +
			'</div>\
                  <div class="triangleTopRight"></div>\
                </div>\
            </div>\
            <div class="ticketLiSpread"></div>\
        '
		)

		if(item.ShowLowestFare == 1){
			if(PointTypeId2 == "2"){
				if(!ProfileInfo.PointHoney){
					$(".ticketLiPointsBody").eq(index).text('+'+PointValue2+get_lan("pointBody").points);
					$(".ticketLiPointsBody").eq(index).removeClass("hide");
				}else{
					$(".honeyIcon").eq(index).removeClass("hide");
				}
			}
		}
		if(item.FareType == 2){
			if(PointTypeId3 == "3"){
				if(!ProfileInfo.PointHoney){
					$(".ticketLiPointsBody").eq(index).text('+'+PointValue3+get_lan("pointBody").points);
					$(".ticketLiPointsBody").eq(index).removeClass("hide");
				}else{
					$(".honeyIcon").eq(index).removeClass("hide");
				}
			}
			if(item.ShowLowestFare == 1){
				if(PointTypeId2 == "2"&&PointTypeId3 == "3"){
					if(!ProfileInfo.PointHoney){
						$(".ticketLiPointsBody").eq(index).text('+'+(parseInt(PointValue2)+parseInt(PointValue3))+get_lan("pointBody").points);
					}else{
						$(".honeyIcon").eq(index).removeClass("hide");
					}
				}
			}
		}
		if(isReturn==1){
		    $(".ticketLiPointsBody").addClass("hide");
		}

		if (searchIntlInfo.type == "roundTrip" && !isReturn) {
			$(".ticketRestriction").addClass("hide");
		}
		$(".ticketRestriction").unbind("click").click(function() {
			$('body').mLoading("show");
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/QueryService.svc/InterRuleSearch",
					jsonStr: '{"OptionId":"' + $(this).attr("ruleSegID") + '","CabinId":"' + $(this).attr("CabinId") + '","id":' +
						netUserId + ',"Language":"' + obtLanguage + '"}'
				},
				success: function(data) {
					$('body').mLoading("hide");
					var res = JSON.parse(data);
					console.log(res);
					$(".rulePop").html('\
                        <div class="rulePopHeader">' + get_lan("rulePopHeader") +
						'<div class="closeRule">x</div></div>\
                        ');
					if (res.ErrMsg != "") {
						alert(res.ErrMsg);
					} else {
						res.Rules.map(function(item) {
							$(".rulePop").append(
								'\
                                <div class="flexRow" style="border-bottom:1px solid #cdcdcd;">\
                                  <div class="rulePopTittle"><span style="line-height:60px;">' +
								item.Title + '</span></div>\
                                  <div class="rulePopBody">' + item.Content +
								'</div>\
                                </div>\
                            ')
						})
						openRulePop();
						$("#cover,.closeRule").unbind("click").click(function() {
							closeRulePop();
						})
					}
					// var rulePopHeight = $(".rulePop").height()%2==1?$(".rulePop").height()+1:$(".rulePop").height();
					// $(".rulePop").css("height",rulePopHeight+'px');
				},
				error: function() {
					// alert('fail'); 
				}
			});
		})
	})
	$(".ticketFlightDetail").unbind("click").click(function() {
		var index = parseInt($(this).attr("index"));
		// console.log(res[index].InterSegments);
		$(".flightDetailPop").html('\
            <div class="flightDetailPopTittle tittleBackColor">' + get_lan(
			"ticketList").flightDetail + '<div class="closeFlight">x</div></div>\
            ')
		res[index].InterSegments.map(function(item) {
			airlineIcon = item.MarketingCode == "3U" ? "a3u" : item.MarketingCode;
			airlineIcon = item.MarketingCode == "3W" ? "a3w" : item.MarketingCode;
			airlineIcon = item.MarketingCode == "8L" ? "a8l" : item.MarketingCode;
			airlineIcon = item.MarketingCode == "9C" ? "a9c" : item.MarketingCode;
			var showStayTime = item.StayTime != "" ? "" : "hide";
			var DepTerm = item.DepTerm == null || item.DepTerm == "" ? "" : '(' + item.DepTerm + ')';
			var ArrTerm = item.ArrTerm == null || item.ArrTerm == "" ? "" : '(' + item.ArrTerm + ')';
			$(".flightDetailPop").append('\
                <div class="flightDetailLi">\
                 <div class="' +
				showStayTime + ' flightDetailStayTime"><span class="tabBarColor">' + get_lan("flightDetailPop").transfer +
				'</span> ' + item.AirportDeparte + ' ' + item.StayTime +
				'</div>\
                 <div class="flightDetailLiHeader">\
                   <div class="flightAirLineIcon ' +
				airlineIcon + '"></div>\
                   <span style="font-size:14px;position:absolute;top:0;left:38px;">' +
				item.Marketing + ' ' + item.FlightNo + ' &nbsp;&nbsp;&nbsp;' + get_lan('ticketList').PlaneType + ':' + item.PlaneType +
				'</span>\
                   <div class="flightDetailFlytime">' + get_lan("flightDetailPop").Flytime + ' ' +
				item.FlyTime +
				'</div>\
                 </div>\
                 <div class="flightDetailLiBody">\
                   <div class="flightStartTime">' +
				item.DateBegin.split(' ')[0].split('-')[1] + '-' + item.DateBegin.split(' ')[0].split('-')[2] + ' ' + item.TimeStart +
				'</div>\
                   <div class="flightArriveTime">' + item.DateEnd.split(' ')[0].split('-')[1] + '-' +
				item.DateEnd.split(' ')[0].split('-')[2] + ' ' + item.TimeArrive +
				'</div>\
                   <div class="flightLine"></div>\
                   <div class="flightStartAirport ellipsis" title="' +
				item.AirportDeparte + DepTerm + '">' + item.AirportDeparte + DepTerm +
				'</div>\
                   <div class="flightArriveAirport ellipsis" title="' + item.AirportArrive + ArrTerm +
				'">' + item.AirportArrive + ArrTerm +
				'</div>\
                 </div>\
                </div>\
                ')
		})
		$(".flightStartTime").eq(0).css("color", "#000");
		$(".flightStartAirport").eq(0).css("color", "#000");
		$(".flightStartTime").eq(0).css("font-size", "16px");
		$(".flightStartAirport").eq(0).css("font-size", "16px");
		$(".flightArriveTime").eq($(".flightStartTime").length - 1).css("color", "#000");
		$(".flightArriveAirport").eq($(".flightStartAirport").length - 1).css("color", "#000");
		$(".flightArriveTime").eq($(".flightStartTime").length - 1).css("font-size", "16px");
		$(".flightArriveAirport").eq($(".flightStartAirport").length - 1).css("font-size", "16px");
		openFlightDetailPop();
		$("#cover,.closeFlight").unbind("click").click(function() {
			closeFlightDetailPop();
		})
	})
	$(".ticketFareAmount").unbind("click").click(function() {
		if (searchIntlInfo.type == "oneWay") {
			var SegID = $(this).attr("SegID");
			if (res[0].ShowCabinDetail) {
				MoreIntlPrice(SegID, this);
			} else {
				var that = this;
				approachingRemind(this,function(){
					searchIntlTicket($(that).attr("CabinID"), SegID, $(that).attr("AirLineCode"));
				})
			}
		} else if (searchIntlInfo.type == "roundTrip" && !isReturn) {
			var SegID = $(this).attr("SegID");
			var AirLineCode = $(this).attr("AirLineCode");
			var ticketPrice = $(this).attr("ticketPrice");
			var ticketTax = $(this).attr("ticketTax");
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/QueryService.svc/GetNextSegmentIDs",
					jsonStr: '{"id":' + netUserId + ',"selectedId":"' + SegID + '"}'
				},
				success: function(data) {
					var res = JSON.parse(data);
					console.log(res);
					var returnTicket = {
						'type': 'roundTrip',
						'SegID': SegID,
						"AirLineCode": AirLineCode,
						'returnSegIdList': data,
						"ticketPrice": ticketPrice,
						"ticketTax": ticketTax,
					}
					$.session.set('returnTicket', JSON.stringify(returnTicket));
					window.location.href = '../../intlAir/airTicketList.html?isReturn=1';
				},
				error: function() {
					//alert('fail');
				}
			});

		} else if (searchIntlInfo.type == "roundTrip" && isReturn == 1) {
			var SegID = JSON.parse($.session.get('returnTicket')).SegID + ',' + $(this).attr("SegID");
			if (res[0].ShowCabinDetail) {
				MoreIntlPrice(SegID, this);
			} else {
				var that = this;
				approachingRemind(this,function(){
					searchIntlTicket($(that).attr("CabinID"), SegID, $(that).attr("AirLineCode"));
				})
			}
		}

		function MoreIntlPrice(SegID, that) {
			//换新接口
			// url: $.session.get('obtCompany') + "/QueryService.svc/InterAirCabinSearchPost",
			if(ProfileInfo.HideOutLimitFareAir){
				var limitfare=$(that).attr("limitfare")
			}else{
				var limitfare=""
			}
			var jsonStr='{"request":{"queryKey":"' + SegID + '","id":' + netUserId + ',"Language":"' + obtLanguage + '","maxFare":"'+limitfare+'"}}'
			console.log(jsonStr)
					
			if ($(that).attr("spread") == 'off') {
				$(that).attr("spread", "on");
				$(that).parent().next().show();
				$('body').mLoading("show");
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/QueryService.svc/InterAirCabinSearchNew",
						jsonStr:'{"request":{"queryKey":"' + SegID + '","id":' + netUserId + ',"Language":"' + obtLanguage + '","maxFare":"'+limitfare+'"}}'
						// jsonStr: '{"queryKey":"' + SegID + '","id":' + netUserId + ',"Language":"' + obtLanguage + '"}'
					},
					success: function(data) {
						$('body').mLoading("hide");
						var res = JSON.parse(data);
						console.log(res);
						if (res.length != 0) {
							$(that).parent().next().html(
								'\
                                <table class="spreadTable" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:3px;">\
                                <tr style="background-color: #e9f0f6;">\
                                <th style="width:100px;">' +
								get_lan('ticketSpread').cabinCode + '</th>\
                                <th style="width:100px;">' +
								get_lan('ticketSpread').seatsNum + '</th>\
                                <th style="width:150px;">' +
								get_lan('ticketSpread').cabinType +
								'</th>\
                                <th style="width:30px;"></th>\
                                <th style="width:120px;">' +
								get_lan('ticketSpread').NominalPrice + '</th>\
                                <th style="width:100px;">' +
								get_lan('ticketSpread').Tax +
								'</th>\
                                <th style="width:160px;"></th>\
                                <th style="width:150px;"></th>\
                                <th style="width:190px;"></th>\
                                <th style="width:100px;"></th>\
                                </tr>\
                                </table>\
                                '
							);
							$(that).children(".ticketPriceText").text(parseInt(res[0].CabinFare) + parseInt(res[0].CabinTax));
							res.map(function(item) {
								var showViolation = item.PolicyType == 4 || item.PolicyType == 3 ? "" : "hide";
								var showBaggageInfo = item.BaggageInfo == null ? "hide" : "";
								var showHandImg = item.FareTypeCode == 2 ? "" : "hide";
								if (obtLanguage == "CN") {
									var BaggageInfo = item.BaggageInfo.baggagePiecesField == "" ? item.BaggageInfo.baggageWeightField + ' ' +
										item.BaggageInfo.baggageWeightUnitField : item.BaggageInfo.baggagePiecesField + " 件";
								} else if (obtLanguage == "EN") {
									var BaggageInfo = item.BaggageInfo.baggagePiecesField == "" ? item.BaggageInfo.baggageWeightField + ' ' +
										item.BaggageInfo.baggageWeightUnitField : item.BaggageInfo.baggagePiecesField + " Piece(s)";
								}
								$(that).parent().next().children(".spreadTable").append(
									'\
                                    <tr style="background-color:#f9f9f9;">\
                                    <td>' +
									item.CabinCode + '</td>\
                                    <td>' + item.Seats +
									'</td>\
                                    <td>' + item.CabinType +
									'</td>\
                                    <td><img class="' + showHandImg +
									'" src="../../css/images/handImg.png" style="margin-top:2px;width:26px;height:15px;"></td>\
                                    <td>' +
									item.CabinFare + '</td>\
                                    <td>' + item.CabinTax +
									'</td>\
                                    <td class="restrictionBtn" CabinID="' + item.CabinID +
									'" style="cursor:pointer;text-decoration:underline;">' + get_lan('ticketSpread').restriction +
									'</td>\
                                    <td><div class="' + showBaggageInfo + '">' + get_lan(
										'ticketList').BaggageInfo + BaggageInfo +
									'</div></td>\
                                    <td><div class="violationIcon ' + showViolation +
									'">' + get_lan('ticketSpread').violation +
									'</div></td>\
                                    <td><div class="chooseTicket" CabinID="' + item.CabinID +
									'">' + get_lan('ticketSpread').choose +
									'</div></td>\
                                    </tr>\
                                    ');
							})
							if (searchIntlInfo.type == "roundTrip" && isReturn == 1) {
								ruleSegID = SegID.split(',')[1];
							} else if (searchIntlInfo.type == "oneWay") {
								ruleSegID = SegID;
							}
							$(".restrictionBtn").unbind("click").click(function() {
								$('body').mLoading("show");
								$.ajax({
									type: 'post',
									url: $.session.get('ajaxUrl'),
									dataType: 'json',
									data: {
										url: $.session.get('obtCompany') + "/QueryService.svc/InterRuleSearch",
										jsonStr: '{"OptionId":"' + ruleSegID + '","CabinId":"' + $(this).attr("CabinId") + '","id":' +
											netUserId + ',"Language":"' + obtLanguage + '"}'
									},
									success: function(data) {
										$('body').mLoading("hide");
										var res = JSON.parse(data);
										console.log(res);
										$(".rulePop").html('\
                                            <div class="rulePopHeader">' +
											get_lan("rulePopHeader") +
											'<div class="closeRule">x</div></div>\
                                            ');
										if (res.ErrMsg != "") {
											alert(res.ErrMsg);
										} else {
											res.Rules.map(function(item) {
												$(".rulePop").append(
													'\
                                                    <div class="flexRow" style="border-bottom:1px solid #cdcdcd;">\
                                                      <div class="rulePopTittle"><span style="line-height:60px;">' +
													item.Title +
													'</span></div>\
                                                      <div class="rulePopBody">' +
													item.Content +
													'</div>\
                                                    </div>\
                                                    '
												)
											})
											openRulePop();
											$("#cover,.closeRule").unbind("click").click(function() {
												closeRulePop();
											})
										}
										// var rulePopHeight = $(".rulePop").height()%2==1?$(".rulePop").height()+1:$(".rulePop").height();
										// $(".rulePop").css("height",rulePopHeight+'px');
									},
									error: function() {
										// alert('fail'); 
									}
								});
							})
							$(".chooseTicket").unbind("click").click(function() {
								var target = this;
								approachingRemind(that,function(){
									searchIntlTicket($(target).attr("CabinID"), SegID, $(that).attr("AirLineCode"));
								})
							})
						} else {
							alert(get_lan("cabinRemind"));
							$(that).attr("spread", "off");
						}
					},
					error: function() {
						// alert('fail'); 
					}
				});
			} else if ($(that).attr("spread") == 'on') {
				$(that).attr("spread", "off");
				$(that).parent().next().hide();
			}
		}
	})
}
function approachingRemind(that,success){
	var flightTimeStr = $(that).attr('dateStart').split(',')[0];
	if(flightTimeStr.length<12){
		console.log('时间格式不对，请检查');
	}else{
		var REMINDTIME = 3*60*60*1000;
		if(flightTime(flightTimeStr)-currentTime()<REMINDTIME){
			start.popUp('body',function(){
				success(that);
			});
		}else{
			success(that);
		}
	}
}
function searchIntlTicket(CabinID, SegID, AirLineCode) {
	var intlTicketInfo = {
		'type': searchIntlInfo.type,
		'segmentKey': SegID + '-' + CabinID,
		'AirLineCode': AirLineCode,
	}
	$.session.set('intlTicketInfo', JSON.stringify(intlTicketInfo));
	window.location.href = '../../intlAir/bookIntlAirTicket.html';
}

function openRulePop() {
	$("#cover").show();
	$(".rulePop").show();
}

function closeRulePop() {
	$("#cover").hide();
	$(".rulePop").hide();
}

function openFlightDetailPop() {
	$("#cover").show();
	$(".flightDetailPop").show();
}

function closeFlightDetailPop() {
	$("#cover").hide();
	$(".flightDetailPop").hide();
}

// 时间段筛选
function fillterTimeList(res) {
	console.log(ProfileInfo.ShowDomesticTimeSlt)
	// 有权限,不是allday,正负时间不为空
	var flag = ''
	var dayTime = ''
	var fillterArr = [];

	if (searchIntlInfo.type == "oneWay" || (searchIntlInfo.type == "roundTrip" && isReturn != 1)) {
		flag = setTime
		if (typeof day == "undefined") {
			// dayTime=3
			dayTime = 5
		} else {
			// dayTime=day
			dayTime = $('#DepartPlusMinusintel').val()
			// dayTime=3
		}
	} else if (searchIntlInfo.type == "roundTrip") {
		flag = setReturnTime
		if (typeof returnday == "undefined") {
			// dayTime=3
			dayTime = 5
		} else {
			// dayTime=returnday
			dayTime = $('#returnPlusMinusintel').val()
			// dayTime=3
		}
	}
	if (ProfileInfo.ShowDomesticTimeSlt && flag != "all") {
		var date = new Date('2019/8/8 12:00');
		var t1 = flag;
		var a = t1.split(":")[0];
		date.setHours(a)

		res.map(function(item) {
			// var t2=item.TimeStart
			var t2 = item.DateStart

			var b = t2.split(":");

			var minTime = date.getTime() - dayTime * 3600 * 1000
			var maxTime = date.getTime() + dayTime * 3600 * 1000
			// var maxTime=date.setHours(parseInt(a[0])+parseInt(dayTime))
			var iTime = new Date('2019/8/8 12:00')
			iTime.setHours(parseInt(b[0]))
			iTime.setMinutes(parseInt(b[1]))
			var itemTime = iTime.getTime()
			// if(item.TimeStart=="06:50"){
			// 	fliiterGeTime(minTime)
			// 	fliiterGeTime(maxTime)
			// 	fliiterGeTime(itemTime)
			// }
			// if((minTime <itemTime || minTime ==itemTime) && (maxTime>itemTime || (maxTime==itemTime && b[1]=="00"))){
			if ((minTime < itemTime || minTime == itemTime) && (maxTime > itemTime || maxTime == itemTime)) {
				fillterArr.push(item)
			} else {}
		})

		return fillterArr;
	} else {
		return res
	}
}
