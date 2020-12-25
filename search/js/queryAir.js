var netUserId = $.session.get('netLoginId');
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
var TAorderNo = $.session.get('TAorderNo');
var TAnumber = $.session.get('TAnumber');
var TAnumberIndex = $.session.get('TAnumberIndex');
	var TAminDate=0,TAmaxDate=365
	if(TAnumber!=undefined && TAnumber!="" && $.session.get('goOnBooktravelInfo')!=undefined && $.session.get('goOnBooktravelInfo')!=""){
		var goOnBooktravelInfo=JSON.parse($.session.get('goOnBooktravelInfo'));
		// TAminDate=goOnBooktravelInfo.starTime.split(" ")[0]
		TAminDate=Dateformat(goOnBooktravelInfo.starTime.split(" ")[0],0)
		TAmaxDate=goOnBooktravelInfo.endTime.split(" ")[0]
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
	
$(function(){
    showContent();//内容展示
    searchBody();//搜索部分
    myOrderTableInfo();
})
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
    "appleIntlRemind":"国际票单程价格较贵，请确认是否继续查询？",
    'searchBody':{
        'airDom':'国内机票',
        'airIntl':'国际机票',
        'hotel':'酒店',
        'train':'火车',
        'visa':'签证',
        'oneWay':'单程',
        'roundTrip':'往返',
        "Multiple":"多段",
        'from':'出发城市',
        'to':'到达城市',
        'departure':'出发城市',
        'arrival':'到达城市',
        'departureDate':'出发日期',
        'returnDate':'回程日期',
        'departureTime':'出发时间',
        'returnTime':'回程时间',
        'cabin':'舱位类型',
        'search':'搜索',
        'cabins':{
            // 'cabin1':'不限',
			'cabin1': '全部',
            'cabin2':'经济舱',
            'cabin3':'公务舱',
            'cabin4':'头等舱',
            'cabin5':'公务舱/头等舱',
            'cabin6':"超级经济舱",
        },
        'switch':'换',
        'trainNo':'车次查询',
        'trainNoText':'请输入查询车次',
        'hotelCity':'入住城市',
        'hotelCityInput':'请输入入住城市',
        'hotelCheckInDate':'入住日期',
        'hotelCheckOutDate':'离店日期',
        'hotelPrice':'金额',
        'all':'全部',
        'hotelAddress':'位置',
        'hotelRank':'酒店星级',
        'hotelKeyWords':'关键字',
        'hotelKeyInput':'(选填)酒店名/地标/商圈/地铁线',
        'keyWordRemind':'请先选择城市',
        'isDirect':'仅查询直飞',
        'codeShare':'代码共享航班',
        'addAirIntl':"添加航程",
        'multipleRemind':"请先填写完",
        'domHotel':"国内",
        'intlHotel':"国际",
        'allDay':"全天",
        'addTransit':"指定转机",
        'transit':"转机城市",
        'transitRemind':"转机城市(选填)",
    },
    'keyWordBody':{
        'hotel':'推荐酒店',
        'brand':'品牌',
        'district':'行政区',
        'commercial':'商圈',
        'extCommercial':'附属商圈',
    },
    'searchRemind':'请正确填写！',
    'tableRemind':'您暂无有效订单!',
    'tableRemind2':'您暂无待审核订单!',
    'table':{
        'myOrders':'我的订单',
        'pendingApproval':'待审核订单',
        'more':'更多订单',
        'type':'类型',
        'orderNumber':'订单号',
        'traveler':'旅客',
        'roundTime':'行程时间',
        'shift':'班次',
        'price':'价格',
        'route':'行程',
        'status':'订单状态',
        "approval":"提交审核",
        "applyDate":"申请时间",
        "operation":"操作",
        "agree":"同意",
        "deny":"拒绝",
        "myTrips":'我的行程',
    },
    'expiration':'证件过期提醒',
    'footer':{
        'industryNews':'业界动态',
        'companyNews':'公司新闻',
    },
    'accountRemind':'账号过期，请重新登陆',
    'contactType':"技术支持，请联系 BCD helpdesk：021-61327099 &nbsp;9:00-18:00(工作日)",
}
var en = {
    "appleIntlRemind":"The fare of one-way ticket is expensive, would you like to continue?",
    'searchBody':{
        'airDom':'Air Domestic',
        'airIntl':'Air International',
        'hotel':'Hotel',
        'train':'Rail',
        'visa':'Visa',
        'oneWay':'One-way',
        'roundTrip':'Round-trip',
        "Multiple":"Multiple",
        'from':'From',
        'to':'To',
        'departure':'Departure',
        'arrival':'Arrival',
        'departureDate':'Departure',
        'returnDate':'Return',
        'departureTime':'Dep Time',
        'returnTime':'Return Time',
        'cabin':'Class',
        'search':'Search',
        'cabins':{
            'cabin1':'All Classes',
            'cabin2':'Economy',
            'cabin3':'Business',
            'cabin4':'First',
            'cabin5':'Business/First',
            'cabin6':"Economy Extra",
        },
        'switch':'Switch',
        'trainNo':'Train no.',
        'trainNoText':'e.g K8410',
        'hotelCity':'Destination',
        'hotelCityInput':'Please enter the city for checking in.',
        'hotelCheckInDate':'Check-in',
        'hotelCheckOutDate':'Check-out',
        'hotelPrice':'Price',
        'all':'All',
        'hotelAddress':'Location',
        'hotelRank':'Rank',
        'hotelKeyWords':'Key Words',
        'hotelKeyInput':'Hotel Name/Landmark/Business Circle/Metro Line',
        'keyWordRemind':'Please choose the city first.',
        'isDirect':'Direct Flight',
        'codeShare':'Codeshare',
        'addAirIntl':"Add Segment",
        'multipleRemind':"Please fill out first.",
        'domHotel':"Domestic",
        'intlHotel':"International/Regional",
        'allDay':"All Day",
        'addTransit':"Add Transit",
        'transit':"Transi",
        'transitRemind':"Transit(Optional)",
    },
    'keyWordBody':{
        'hotel':'Recommended Hotel',
        'brand':'Brand',
        'district':'District',
        'commercial':'Business Area',
        'extCommercial':'Land Mark',
    },
    'searchRemind':'Please fill in correctly!',
    'tableRemind':'You have no valid orders !',
    'tableRemind2':'You have no pending approvals !',
    'table':{
        'myOrders':'My Orders',
        'pendingApproval':'Pending Approval',
        'more':'More',
        'type':'Type',
        'orderNumber':'Order Number',
        'traveler':'Traveler',
        'roundTime':'Travel Time',
        'shift':'',
        'price':'Price',
        'route':'Route',
        'status':'Status',
        "approval":"Submit Audit",
        "applyDate":"Apply Date",
        "operation":"Approval",
        "agree":"Approve",
        "deny":"Reject",
        "myTrips":'My Trips',
    },
    'expiration':'Expiration',
    'footer':{
        'industryNews':'Industry News',
        'companyNews':'Company News',
    },
    'accountRemind':'Account expired, please re login.',
    'contactType':"For technical support, please contact BCD helpdesk：021-61327099 &nbsp;9:00-18:00(working day)",
}
if(ProfileInfo.onlineStyle=="APPLE"){
    cn.appleIntlRemind = "对于国际票的行程的最佳运价，您应该选择“往返”。";
    en.appleIntlRemind = "For international return trips you should select 'Round-trip' for the best fares.";
}
if(ProfileInfo.onlineStyle=="BCD"){
    cn.searchBody.airDom = "国内";
    en.searchBody.airDom = "Dom";
    cn.searchBody.airIntl = "国际/港澳台";
    en.searchBody.airIntl = "Rgl/Intl";
}
//内容展示
function showContent(){
    //<img src="../index/images/bgImg.jpg" class="bgImg">
    $("#main").html('\
        <article>\
            <div style="position: relative;height: 340px;">\
                <img class="bannerImg" src="" style="width:100%;height:340px;">\
                <div class="bgShadow"></div>\
                <div class="bgBody">\
                    <div class="autoCenter">\
                      <div class="searchBody"></div>\
                    </div>\
                </div>\
            </div>\
            <div class="orderTittle flexRow autoCenter">\
                <div class="myOrderTab orderTittleActive" style="margin: 0 56px 0 13px;">'+get_lan('table').myOrders+'</div>\
                <span style="position: absolute;right: 45px;" class="moreOrderText">\
                    '+get_lan('table').more+'\
                </span>\
                <img src="../index/images/rightArrow.png" class="rightArrow" linkState="myOrders"/>\
            </div>\
            <div class="autoCenter autoScrollY" id="tableBody">\
            </div>\
        </article>\
        <footer>\
            <div class="copyright">\
            </div>\
        </footer>\
    ')
    $(".rightArrow").unbind("click").click(function(){
        if($(this).attr("linkState")=="myOrders"){
            window.location.href = '../../orders/orders.html';
        }
    })
	// if(TAorderNo!=undefined){

	if(TAnumber!=undefined && TAnumber!='' && TAnumberIndex!=undefined && TAnumberIndex!=''){
		console.log('隐藏')
		$('.menu .autoCenter').addClass('hide')
		// $('.orderTittle').addClass('hide')
		// $('.autoScrollY').addClass('hide')
		$('footer').addClass('hide')
		$('.menu').css("height",'40px')
		$('.moreOrderText').hide()
		$('.rightArrow').hide()
	}
		
}
// 搜索界面
function searchBody(){
	var optionStr='<option berthType="0">'+get_lan('searchBody').cabins.cabin1+'</option>\
					<option berthType="1">'+get_lan('searchBody').cabins.cabin2+'</option>\
					<option berthType="4">'+get_lan('searchBody').cabins.cabin6+'</option>\
					<option berthType="2">'+get_lan('searchBody').cabins.cabin3+'</option>\
					<option berthType="3">'+get_lan('searchBody').cabins.cabin4+'</option>'
	if(ProfileInfo.onlineStyle=="APPLE"){
		optionStr='<option berthType="1">'+get_lan('searchBody').cabins.cabin2+'</option>\
	                  <option berthType="2">'+get_lan('searchBody').cabins.cabin3+'</option>'
	}
    $('.searchBody').html('\
        <ul class="tabBar flexRow">\
            <li class="tab airDom tabActive">'+get_lan('searchBody').airDom+'</li>\
            <li class="tab airIntl">'+get_lan('searchBody').airIntl+'</li>\
            <li class="tab Hotel">'+get_lan('searchBody').hotel+'</li>\
            <li class="tab Train">'+get_lan('searchBody').train+'</li>\
        </ul>\
        <div class="searchPage airDomBody">\
            <div class="domTabBar">\
                <span style="position:relative">\
                  <input type="radio" id="domOneWay" name="domTrip" checked="checked"><label for="domOneWay" style="margin-left:15px;cursor: pointer;">'+get_lan('searchBody').oneWay+'</label>\
                </span>\
                <span style="position:relative">\
                  <input type="radio" id="domRoundTrip" name="domTrip" style="margin-left:56px"><label for="domRoundTrip" style="margin-left:71px;cursor: pointer;">'+get_lan('searchBody').roundTrip+'</label>\
                </span>\
				<span style="position:relative">\
				          <input type="radio" id="domMultiple" name="domTrip" style="margin-left:56px"><label for="domMultiple" style="margin-left:71px;cursor: pointer;">' +get_lan('searchBody').Multiple +'</label>\
				</span>\
            </div>\
<div class="domnotMultiple">\
            <div class="cityStyle flexRow">\
                <div class="cityTittle">'+get_lan('searchBody').from+'</div>\
                <input autocomplete="off" type="text" id="domDepartureCity" placeholder="'+get_lan('searchBody').departure+'">\
                <div style="width:26px;height:12px;margin-top:6px;border-width:1px 1px 0 0;border-color:#979797;border-style: solid;"></div>\
            </div>\
            <div class="cityStyle flexRow">\
                <div class="cityTittle">'+get_lan('searchBody').to+'</div>\
                <input autocomplete="off" type="text" id="domArrivalCity" placeholder="'+get_lan('searchBody').arrival+'">\
                <div style="width:26px;height:12px;margin-top:6px;border-width:0 1px 1px 0;border-color:#979797;border-style: solid;"></div>\
            </div>\
            <div class="switchIconDom"></div>\
            <div class="dateStyle flexRow">\
                <div class="dateTittle">'+get_lan('searchBody').departureDate+'</div>\
                <div class="domDateBody flexRow">\
                  <input type="text" id="domDepartureDate" readonly="readonly">\
                  <select type="text" id="domDepartureSelect" onchange="GrayDepartPlusMinus()">\
                    <option value="all" class="domAllDay">'+get_lan("searchBody").allDay+'</option>\
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
                <div class="dateTittle domDateTittle" style="color:#9B9B9B;">'+get_lan('searchBody').returnDate+'</div>\
                <div class="domDateBody domReturnDateBody flexRow">\
                  <input type="text" id="domReturnDate" readonly="readonly">\
                  <select type="text" id="domReturnSelect" onchange="GrayreturnPlusMinus()">\
                    <option value="all" class="domAllDay">'+get_lan("searchBody").allDay+'</option>\
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
                <div class="dateTittle">'+get_lan('searchBody').departureTime+'</div>\
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
                <div class="dateTittle domDateTittle" style="color:#9B9B9B;">'+get_lan('searchBody').returnTime+'</div>\
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
            <div class="cabinStyle flexRow">\
                <div class="cabinTittle domCabinTittle">'+get_lan('searchBody').cabin+'</div>\
                <select type="text" id="domCabin">\
                  <option berthType="0">'+get_lan('searchBody').cabins.cabin1+'</option>\
                  <option berthType="1">'+get_lan('searchBody').cabins.cabin2+'</option>\
                  <option berthType="2">'+get_lan('searchBody').cabins.cabin3+'</option>\
                  <option berthType="3">'+get_lan('searchBody').cabins.cabin4+'</option>\
                  <option berthType="23">'+get_lan('searchBody').cabins.cabin5+'</option>\
                </select>\
                <input type="checkbox" class="domCodeShareCheckBox" style="margin:7px 5px 0 25px;">\
                <span class="domCodeShareText" style="font-weight:bold;">'+get_lan('searchBody').codeShare+'</span>\
                <input type="checkbox" class="domDirectCheckBox" style="margin:7px 5px 0 5px;" checked>\
                <span class="domDirectText" style="font-weight:bold;">'+get_lan('searchBody').isDirect+'</span>\
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
	      <div style="width:100%;height:30px;"></div>\
	      <div class="flexRow" style="margin-top:5px;">\
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
            <div class="searchDomBtn" state="oneWay">'+get_lan('searchBody').search+'</div>\
        </div>\
        <div class="searchPage airIntlBody">\
            <div class="intlTabBar" style="/*width:380px;*/">\
                <span style="position:relative" class="oneWayIntl">\
                  <input type="radio" id="intlOneWay" name="intlTrip" checked="checked"><label for="intlOneWay" style="margin-left:15px;cursor: pointer;">'+get_lan('searchBody').oneWay+'</label>\
                </span>\
                <span style="position:relative">\
                  <input type="radio" id="intlRoundTrip" name="intlTrip" style="margin-left:56px"><label for="intlRoundTrip" style="margin-left:71px;cursor: pointer;">'+get_lan('searchBody').roundTrip+'</label>\
                </span>\
                <span style="position:relative">\
                  <input type="radio" id="intlMultipleTrip" name="intlTrip" style="margin-left:56px"><label for="intlMultipleTrip" style="margin-left:71px;cursor: pointer;">'+get_lan('searchBody').Multiple+'</label>\
                </span>\
            </div>\
            <div class="intlAirBody">\
                <div class="cityStyle flexRow">\
                    <div class="cityTittle">'+get_lan('searchBody').from+'</div>\
                    <input autocomplete="off" type="text" id="intlDepartureCity" placeholder="'+get_lan('searchBody').departure+'">\
                    <div style="width:26px;height:12px;margin-top:6px;border-width:1px 1px 0 0;border-color:#979797;border-style: solid;"></div>\
                </div>\
                <div class="cityStyle flexRow">\
                    <div class="cityTittle">'+get_lan('searchBody').to+'</div>\
                    <input autocomplete="off" type="text" id="intlArrivalCity" placeholder="'+get_lan('searchBody').arrival+'">\
                    <div style="width:26px;height:12px;margin-top:6px;border-width:0 1px 1px 0;border-color:#979797;border-style: solid;"></div>\
                </div>\
                <div class="cityStyle flexRow addTransitBody">\
                    <div class="transitText">'+get_lan('searchBody').addTransit+'</div>\
                    <div class="transitIcon addTransitIcon">+</div>\
                </div>\
                <div class="cityStyle flexRow transitCityBody hide">\
                    <div class="cityTittle">'+get_lan('searchBody').transit+'</div>\
                    <input autocomplete="off" type="text" id="transitCity" placeholder="'+get_lan('searchBody').transitRemind+'">\
                    <div class="transitIcon hideTransitIcon">-</div>\
                </div>\
                <div class="switchIconIntl"></div>\
                <div class="dateStyle flexRow">\
                    <div class="dateTittle">'+get_lan('searchBody').departureDate+'</div>\
                    <div class="intlDateBody flexRow">\
                      <input type="text" id="intlDepartureDate" readonly="readonly">\
                      <select type="text" id="intlDepartureSelect">\
                        <option value="all" class="intlAllDay">'+get_lan("searchBody").allDay+'</option>\
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
                    <div class="dateTittle intlDateTittle" style="color:#9B9B9B;">'+get_lan('searchBody').returnDate+'</div>\
                    <div class="intlDateBody intlReturnDateBody flexRow">\
                      <input type="text" id="intlReturnDate" readonly="readonly">\
                      <select type="text" id="intlReturnSelect">\
                        <option value="all" class="intlAllDay">'+get_lan("searchBody").allDay+'</option>\
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
                <div class="cabinStyle flexRow">\
                    <div class="cabinTittle">'+get_lan('searchBody').cabin+'</div>\
                    <select type="text" id="intlCabin">\
                      \
                     '+optionStr+'\
					 \
                    </select>\
                    <div class="intlDirectCheckBoxBody flexRow">\
                      <div class="cabinTittle" style="text-align:right;padding-right: 10px;width:102px;"><input type="checkbox" class="intlDirectCheckBox"></div>\
                      <span style="font-weight:bold;">'+get_lan('searchBody').isDirect+'</span>\
                    </div>\
                </div>\
            </div>\
            <div class="intlAirMultipleBody hide">\
              <div class="intlAirMultipleLi flexRow">\
                <div class="MultipleLiIcon">1</div>\
                <div class="MultipleLiText">'+get_lan('searchBody').departure+'</div>\
                <input class="MultipleLiInput MultipleDepartureCity">\
                <div class="MultipleLiText">'+get_lan('searchBody').arrival+'</div>\
                <input class="MultipleLiInput MultipleArrivelCity" inputIndex="0">\
                <div class="MultipleLiText">'+get_lan('searchBody').departureDate+'</div>\
                <div class="MultipleLiInputBody flexRow">\
                  <input class="MultipleLiInput MultipleDepartureDate">\
                  <select type="text" class="MultipleSelect">\
                    <option value="all" class="intlAllDay">'+get_lan("searchBody").allDay+'</option>\
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
                <div class="MultipleLiText">'+get_lan('searchBody').departure+'</div>\
                <input class="MultipleLiInput MultipleDepartureCity">\
                <div class="MultipleLiText">'+get_lan('searchBody').arrival+'</div>\
                <input class="MultipleLiInput MultipleArrivelCity" inputIndex="1">\
                <div class="MultipleLiText">'+get_lan('searchBody').departureDate+'</div>\
                <div class="MultipleLiInputBody flexRow">\
                  <input class="MultipleLiInput MultipleDepartureDate">\
                  <select type="text" class="MultipleSelect">\
                    <option value="all" class="intlAllDay">'+get_lan("searchBody").allDay+'</option>\
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
              <div class="addAirIntlBody specificFontColor"><span style="font-weight:bold;margin-right:15px;font-size:16px;">+</span>'+get_lan("searchBody").addAirIntl+'</div>\
              <div class="flexRow" style="margin-top:5px;">\
                <div class="MultipleLiIcon" style="background:#fff;"></div>\
                <div class="MultipleLiText">'+get_lan('searchBody').cabin+'</div>\
                <select type="text" class="MultipleLiInput" id="MultipleCabin">\
                  <option berthType="1">'+get_lan('searchBody').cabins.cabin2+'</option>\
                  <option berthType="2">'+get_lan('searchBody').cabins.cabin3+'</option>\
                </select>\
              </div>\
            </div>\
            <div class="searchIntlBtn" state="oneWay">'+get_lan('searchBody').search+'</div>\
        </div>\
        <div class="searchPage hotelBody">\
            <div class="hotelTabBar">\
                <span style="position:relative">\
                  <input type="radio" id="domHotel" name="hotel" checked="checked"><label for="domHotel" style="margin-left:15px;cursor: pointer;">'+get_lan('searchBody').domHotel+'</label>\
                </span>\
                <span style="position:relative">\
                  <input type="radio" id="intlHotel" name="hotel" style="margin-left:56px"><label for="intlHotel" style="margin-left:71px;cursor: pointer;">'+get_lan('searchBody').intlHotel+'</label>\
                </span>\
            </div>\
            <div class="cityStyle flexRow" style="margin-top:5px">\
                <div class="cityTittle">'+get_lan('searchBody').hotelCity+'</div>\
                <input autocomplete="off" type="text" id="hotelCity" class="hotelCityChange" placeholder="'+get_lan('searchBody').hotelCityInput+'">\
            </div>\
            <div class="dateStyle flexRow">\
                <div class="dateTittle">'+get_lan('searchBody').hotelCheckInDate+'</div>\
                <input type="text" id="hotelDepartureDate" readonly="readonly">\
                <div class="dateTittle hotelDateTittle">'+get_lan('searchBody').hotelCheckOutDate+'</div>\
                <input type="text" id="hotelReturnDate" readonly="readonly">\
            </div>\
            <div class="dateStyle flexRow">\
                <div class="dateTittle">'+get_lan('searchBody').hotelPrice+'</div>\
                <input type="text" id="hotelPrice" value="￥0-5000" minPrice="0" maxPrice="5000">\
                <div class="hotelPriceBody">\
                    <div class="hotelPriceLi" minPrice="0" maxPrice="5000">'+get_lan('searchBody').all+'</div>\
                    <div class="hotelPriceLi" minPrice="0" maxPrice="150">￥0-150</div>\
                    <div class="hotelPriceLi" minPrice="151" maxPrice="300">￥151-300</div>\
                    <div class="hotelPriceLi" minPrice="301" maxPrice="450">￥301-450</div>\
                    <div class="hotelPriceLi" minPrice="451" maxPrice="600">￥451-600</div>\
                    <div class="hotelPriceLi" minPrice="601" maxPrice="1000">￥601-1000</div>\
                    <div class="hotelPriceLi" minPrice="1000" maxPrice="5000">￥1000+</div>\
                </div>\
                <div class="dateTittle">'+get_lan('searchBody').hotelAddress+'</div>\
                <div class="hotelAddressBody">\
                  <input type="text" id="hotelAddress" autocomplete="off">\
                  <select id="hotelAddressSelect"></select>\
                </div>\
            </div>\
            <div class="hotelStar flexRow">\
                <div class="dateTittle">'+get_lan('searchBody').hotelRank+'</div>\
                <div class="flexRow" style="width:80%;">\
                    <div class="hotelCheckBox">\
                        <input type="checkbox" name="hotelCheck" style="width:15px;height:15px;" checked value="1-2"> ≤2<span class="star">☆</span>\
                    </div>\
                    <div class="hotelCheckBox">\
                        <input type="checkbox" name="hotelCheck" style="width:15px;height:15px;" checked value="3"> 3<span class="star">☆</span>\
                    </div>\
                    <div class="hotelCheckBox">\
                        <input type="checkbox" name="hotelCheck" style="width:15px;height:15px;" checked value="4"> 4<span class="star">☆</span>\
                    </div>\
                    <div class="hotelCheckBox">\
                        <input type="checkbox" name="hotelCheck" style="width:15px;height:15px;" checked value="5"> 5<span class="star">☆</span>\
                    </div>\
                </div>\
            </div>\
            <div class="hotelKey flexRow">\
                <div class="dateTittle">'+get_lan('searchBody').hotelKeyWords+'</div>\
                <div class="flexRow" style="width:80%;">\
                <input type="text" id="keyWordInput" placeholder="'+get_lan('searchBody').hotelKeyInput+'">\
                </div>\
                <div class="keyWordBody"></div>\
            </div>\
            <div class="searchHotelBtn" state="domHotel" >'+get_lan('searchBody').search+'</div>\
        </div>\
        <div class="searchPage trainBody">\
            <div class="trainTabBar">\
                <span style="position:relative">\
                  <input type="radio" id="trainOneWay" name="trainTrip" checked="checked"><label for="trainOneWay" style="margin-left:15px;cursor: pointer;">'+get_lan('searchBody').oneWay+'</label>\
                </span>\
                <span style="position:relative">\
                  <input type="radio" id="trainRoundTrip" name="trainTrip" style="margin-left:56px"><label for="trainRoundTrip" style="margin-left:71px;cursor: pointer;">'+get_lan('searchBody').roundTrip+'</label>\
                </span>\
            </div>\
            <div class="cityStyle flexRow">\
                <div class="cityTittle">'+get_lan('searchBody').from+'</div>\
                <input autocomplete="off" type="text" id="trainDepartureCity" placeholder="'+get_lan('searchBody').departure+'">\
                <div style="width:26px;height:12px;margin-top:6px;border-width:1px 1px 0 0;border-color:#979797;border-style: solid;"></div>\
            </div>\
            <div class="cityStyle flexRow">\
                <div class="cityTittle">'+get_lan('searchBody').to+'</div>\
                <input autocomplete="off" type="text" id="trainArrivalCity" placeholder="'+get_lan('searchBody').arrival+'">\
                <div style="width:26px;height:12px;margin-top:6px;border-width:0 1px 1px 0;border-color:#979797;border-style: solid;"></div>\
            </div>\
            <div class="switchIconTrain"></div>\
            <div class="dateStyle flexRow">\
                <div class="dateTittle">'+get_lan('searchBody').departureDate+'</div>\
                <input type="text" id="trainDepartureDate" readonly="readonly">\
                <div class="dateTittle trainDateTittle" style="color:#9B9B9B;">'+get_lan('searchBody').returnDate+'</div>\
                <input type="text" id="trainReturnDate" readonly="readonly">\
            </div>\
            <div class="cabinStyle flexRow">\
                <div class="cabinTittle">'+get_lan('searchBody').trainNo+'</div>\
                <input type="text" id="trainCabin" placeholder="'+get_lan('searchBody').trainNoText+'">\
            </div>\
            <div class="searchTrainBtn" state="oneWay">'+get_lan('searchBody').search+'</div>\
        </div>\
        <div class="searchPage visaBody">\
        </div>\
    ')
    //<option berthType="">'+get_lan('searchBody').cabins.cabin1+'</option>\
    $(".selectTimeStyle").remove();
    if(obtLanguage=="EN"){
        // $(".intlTabBar").css("margin-left","100px");
    }
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
            var res = JSON.parse(data);
            console.log(res);
            if(!res.isDomesticAir){
                $(".airDom ").hide();
            }
            if(!res.isInterAir){
                $(".airIntl ").hide();
            }
            $(".Hotel ").hide();
            $(".Train").hide();
            if(!res.isDomesticAir&&!res.isInterAir){
                $(".searchBody").hide();
            }
            if(res.InterDirectSearch){
                $(".intlDirectCheckBox").prop("checked",true);
            }
            if(res.QueryDomesticTicketsWithTime&&res.DomesticHideAllDay){
                $(".domAllDay").remove();
                $("#domDepartureSelect").val("8");
                $("#domReturnSelect").val("8");
				// setTimeout(function(){
					GrayDepartPlusMinus()
				// },10)
            }
            if(res.SearchInterAirWTime&&res.DomesticHideAllDay){
                $(".intlAllDay").remove();
                $("#intlDepartureSelect").val("8");
                $("#intlReturnSelect").val("8");
                $(".MultipleSelect").val("8");
				
				GrayIntelDepartPlusMinus()
            }
			if(res.HideInterMutiple){
				$('#intlMultipleTrip+label').remove()
				$('#intlMultipleTrip').remove()
			}
        },
        error : function() {
          // alert('fail');
        }
      }
    );
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/QueryService.svc/QueryDateLimit",
            jsonStr:'{"id":'+netUserId+',"Language":"'+obtLanguage+'"}'
        },
        success : function(data) {
            var res = JSON.parse(data);
            console.log(res);
            res.map(function(item){
                if(item.LimitType==1){
                    $(".searchDomBtn").attr("CanSearch",item.CanSearch);
                    $(".searchDomBtn").attr("StartLimit",item.StartLimit);
                    $(".searchDomBtn").attr("Message",item.Message);
                }
                if(item.LimitType==2){
                    $(".searchIntlBtn").attr("CanSearch",item.CanSearch);
                    $(".searchIntlBtn").attr("StartLimit",item.StartLimit);
                    $(".searchIntlBtn").attr("Message",item.Message);
                }
            })
        },
        error : function() {
          // alert('fail');
        }
      }
    );
    /*根据profile的改变*/
    if(!ProfileInfo.isCodeShare){
        $(".domCodeShareText").remove();
        $(".domCodeShareCheckBox").remove();
    }
    if(!ProfileInfo.QueryDomesticTicketsWithTime){
        $("#domDepartureSelect,#domReturnSelect").remove();
    }
    if(!ProfileInfo.SearchInterAirWTime){
        $("#intlDepartureSelect,#intlReturnSelect,.MultipleSelect").remove();
    }
	if (!ProfileInfo.ShowDomesticTimeSlt) {
		$(".plusMinus").remove();
	}
	if(ProfileInfo.NeedSpecialPolicy){
		$("#domCabin  option:first").prop("selected", 'selected');
		$("#domCabin").attr('disabled','disabled')
		$("#intlCabin  option:first").prop("selected", 'selected');
		$("#intlCabin").attr('disabled','disabled')
	}
    $('.searchPage').hide();
    $('.airDomBody').show();
    //tab切换
    $(".tab").unbind("click").click(function(){
        $('.tab').removeClass('tabActive');
        $(this).addClass('tabActive');
        $('.searchPage').hide();
        if($(this).hasClass('airDom')){
            $('.airDomBody').show();
        }else if($(this).hasClass('airIntl')){
            $('.airIntlBody').show();
            $("#intlRoundTrip").click();
            // if(ProfileInfo.onlineStyle=="APPLE"){
            //     $(".oneWayIntl").hide();
            // }
        }else if($(this).hasClass('Hotel')){
            $('.hotelBody').show();
        }else if($(this).hasClass('Train')){
            $('.trainBody').show();
        }else if($(this).hasClass('Visa')){
            $('.visaBody').show();
            // window.location.href='../visa/visaPage.html'
        }
		totlePic()
    })
	GetImageInfo()
	//获取图片
	var domImg='',interImg=''
	function GetImageInfo(){
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/SystemService.svc/GetCompanyImageInfosWType",
					jsonStr: '{"key":' + netUserId + ',"appType":"WEB"}',
				},
				success: function(data) {
					var res=JSON.parse(data)
					console.log(res);
					if(res.code==200){
						res.CompanyImageList.map(function(item){
							if(item.type==11){
								domImg=item.path
							}
							if(item.type==15){
								interImg=item.path
							}
						})
						totlePic()
					}else{
						$('.bannerImg').attr('src','../search/images/bgImgAir.jpg')
						// alert(res.errMsg)
					}
				},
				error: function() {
					// alert('fail');
				}
			});
	}
	//切换图片
	function totlePic(){
		if($('.airDom').hasClass('tabActive')){
			if(domImg==''||domImg==null){
				$('.bannerImg').attr('src','../search/images/bgImgAir.jpg')
			}else{
				$('.bannerImg').attr('src',domImg)
			}
		}else{
			if(interImg==''||interImg==null){
				$('.bannerImg').attr('src','../search/images/bgImgAir.jpg')
			}else{
				$('.bannerImg').attr('src',interImg)
			}
		}
	}
	
    chooseDom();//国内机票
    chooseIntl();//国际机票
    // chooseTrain();//国内火车票
    // chooseHotel();//酒店
	
	// TA单城市
	if(TAnumber!=undefined && TAnumber!=''){
        if($.session.get('goOnBooktravelInfo')){
            setCity();
        }
	}
	
}
//国内机票
function chooseDom(){
    $("input[name=domTrip]").each(function(){
            $(this).click(function(){
                var discount = $(this).attr('id');
                if(discount=="domOneWay"){
					$('.domnotMultiple').show()
					$('.domMultiple').hide()
					$('.domAirMultipleBody').hide()
					
                    $(".domDateTittle,#domReturnDate,#domReturnSelect").css('color','#9b9b9b');
                    $(".domDateBody").eq(1).css('border','1px solid #9b9b9b');
                    $("#domDepartureDate").datepicker('destroy');
                    $("#domReturnDate").datepicker('destroy');
                    $( "#domDepartureDate").datepicker({
                        dateFormat: 'yy-mm-dd',
                        timeFormat: "HH:mm",
                        changeMonth: true,
                        changeYear: true,
                        minDate: TAminDate,  // 当前日期之后的 0 天，就是当天
                        maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
                        hideIfNoPrevNext: true,
                        showOtherMonths: true,
                        selectOtherMonths: true,
                    });
                    $('.searchDomBtn').attr('state','oneWay')
                }
                if(discount=="domRoundTrip"){
					$('.domnotMultiple').show()
					$('.domMultiple').hide()
					$('.domAirMultipleBody').hide()
					
					
                    $(".domDateTittle,#domReturnDate,#domReturnSelect").css('color','#000');
                    $(".domDateBody").eq(1).css('border','1px solid #000');
                    $("#domReturnDate").val(getNextDay($("#domDepartureDate").val()));
					
					GrayreturnPlusMinus()
					$("#domReturnDate").removeAttr('disabled')
					$("#domReturnSelect").removeAttr('disabled')
					
                    $("#domDepartureDate").datepicker('destroy');
                    dateChoose("domDepartureDate","domReturnDate");
                    $('.searchDomBtn').attr('state','roundTrip');
                }
				if(discount=='domMultiple'){
					$('.domnotMultiple').hide()
					$('.domMultiple').show()
					$('.domAirMultipleBody').show()
					$('.searchDomBtn').attr('state', 'multiple')
				}
            });
        });
		$("#returnPlusMinus").css({
			'color': '#9b9b9b',
			'border': '1px solid #9b9b9b'
		});
		$("#returnPlusMinus").attr('disabled', 'disabled')
		$("#domReturnSelect").attr('disabled', 'disabled')
		$('.plusMinus').val('12')
		$('#DepartPlusMinusintel').val('12')//5换成12
		$('#returnPlusMinusintel').val('12')
		
		
    $("#domDepartureCity").kuCity();
    $("#domArrivalCity").kuCity();
	$('.domMultipleDeparture').kuCity()
	$('.domMultipleArrivel').kuCity()
    $( "#domDepartureDate").datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        minDate: TAminDate,  // 当前日期之后的 0 天，就是当天
        maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    });
    $("#domDepartureDate").val(GetDateStr(0));
    $("#domReturnDate").val(GetDateStr(1));
	// 国内票多段时间
	$(".domMultipleDepartureDate").eq(0).val(GetDateStr(0));
	domMultipleDepartureDate();
    /*apple*/
    if(ProfileInfo.onlineStyle=="APPLE"){
        $("#domCabin").remove();
        $(".domCabinTittle").remove();
		
		$('.domTabBar span').eq(2).remove()
    }
    /*交换*/
    $(".switchIconDom").unbind("click").click(function(){
        cityConversion("domDepartureCity","domArrivalCity")
    })
    $(".searchDomBtn").unbind("click").click(function(){
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
        // if($('#domDepartureCity').attr("code")&&$('#domArrivalCity').attr("code")){
			var starDom = $('input[name="domTrip"]:checked').attr('id')=="domMultiple"?$('.domMultipleDepartureDate').eq(0).val():$('#domDepartureDate').val()
            if(ProfileInfo.onlineStyle=="APPLE"){
                var berthtype = 1;
            }else{
                var berthtype = $("#domCabin  option:selected").attr("berthtype");
            }
            var cityList = '"'+$('#domDepartureCity').attr("code")+'","'+$('#domArrivalCity').attr("code")+'"';
            tools.appleRemindPop(cityList,1,netUserId,function(){
                if($(that).attr("startlimit")&&parseInt($(that).attr("startlimit"))>0){
                    if(datedifference(getNowFormatDate(), starDom)<parseInt($(that).attr("startlimit"))){
                        if($(that).attr("Message").indexOf("\\n") != -1){
                            var mymessage = confirm($(that).attr("Message").split("\\n").join('\n'));
                        }else{
                            var mymessage = confirm($(that).attr("Message"));
                        }
                        if(mymessage==true)
                        {
                            if($(that).attr("CanSearch")!="true"){
                                return false;
                            }else{
                                searchDom(berthtype)
                            }
                        }else{
                            return false;
                        }
                    }else{
                        searchDom(berthtype)
                    }
                }else{
                    searchDom(berthtype)
                }
            });
            function searchDom(berthtype){
                if($(".searchDomBtn").attr("state") == "oneWay"){
                    var searchDomInfo = {
                        'type':'oneWay',
                        'departureCityText':$('#domDepartureCity').val(),
                        'arrivalCityText':$('#domArrivalCity').val(),
                        'departureCity':$('#domDepartureCity').attr("code"),
                        'arrivalCity':$('#domArrivalCity').attr("code"),
                        'date':$('#domDepartureDate').val(),
                        'queryKey':$('#domDepartureCity').attr("code")+','+$('#domArrivalCity').attr("code")+','+$('#domDepartureDate').val()+','+'ALL',
                        'showCabins':berthtype,
                        'codeShare':$('.domCodeShareCheckBox').is(':checked'),
                        'isDirect':$('.domDirectCheckBox').is(':checked'),
                    }
                    if(ProfileInfo.QueryDomesticTicketsWithTime){
                        if($("#domDepartureSelect  option:selected").val()=="all"){
                            var DepartureSelectValue = ''
                        }else{
                            var DepartureSelectValue = ' '+$("#domDepartureSelect  option:selected").val()+':00:00';
                        }
                        searchDomInfo.queryKey = $('#domDepartureCity').attr("code")+','+$('#domArrivalCity').attr("code")+','+$('#domDepartureDate').val()+DepartureSelectValue+',ALL'
                    }
					//2020.5.20修改
					if (ProfileInfo.ShowDomesticTimeSlt) {
						$.session.set('searchDomesticDay', $('#DepartPlusMinus').val());
					} else {
						$.session.set('searchDomesticDay', '');
					}
                    $.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
                    window.location.href='../../domesticAir/airTicketList.html';
                }else if($(".searchDomBtn").attr("state") == "roundTrip"){
                    var searchDomInfo = {
                        'type':'roundTrip',
                        'departureCityText':$('#domDepartureCity').val(),
                        'arrivalCityText':$('#domArrivalCity').val(),
                        'departureCity':$('#domDepartureCity').attr("code"),
                        'arrivalCity':$('#domArrivalCity').attr("code"),
                        'date':$('#domDepartureDate').val(),
                        'returndate':$('#domReturnDate').val(),
                        'queryKey':$('#domDepartureCity').attr("code")+','+$('#domArrivalCity').attr("code")+','+$('#domDepartureDate').val()+','+'ALL',
                        'queryKeyReturn':$('#domArrivalCity').attr("code")+','+$('#domDepartureCity').attr("code")+','+$('#domDepartureDate').val()+','+$('#domReturnDate').val()+',',
                        'showCabins':berthtype,
                        'codeShare':$('.domCodeShareCheckBox').is(':checked'),
                        'isDirect':$('.domDirectCheckBox').is(':checked'),
                    }
                    if(ProfileInfo.QueryDomesticTicketsWithTime){
                        if($("#domDepartureSelect  option:selected").val()=="all"){
                            var DepartureSelectValue = ''
                        }else{
                            var DepartureSelectValue = ' '+$("#domDepartureSelect  option:selected").val()+':00:00';
                        }
                        if($("#domReturnSelect  option:selected").val()=="all"){
                            var ReturnSelectValue = ''
                        }else{
                            var ReturnSelectValue = ' '+$("#domReturnSelect  option:selected").val()+':00:00';
                        }
						//2020.5.20修改
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
                        searchDomInfo.queryKey = $('#domDepartureCity').attr("code")+','+$('#domArrivalCity').attr("code")+','+$('#domDepartureDate').val()+DepartureSelectValue+',ALL';
                        searchDomInfo.queryKeyReturn = $('#domArrivalCity').attr("code")+','+$('#domDepartureCity').attr("code")+','+$('#domDepartureDate').val()+DepartureSelectValue+','+$('#domReturnDate').val()+ReturnSelectValue+',ALL';
                    }
                    $.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
                    window.location.href='../../domesticAir/airTicketList.html';
                }else if($(".searchDomBtn").attr("state") == "multiple"){
					var searchDomInfo = {
						'type': 'multiple',
						'departureCityText': $('.domMultipleDeparture').eq(0).val(),
						'arrivalCityText':  $('.domMultipleArrivel').eq(0).val(),
						'departureCity': $('.domMultipleDeparture').eq(0).attr('code'),
						'arrivalCity': $('.domMultipleArrivel').eq(0).attr("code"),
						'lastCityText':  $('.domMultipleArrivel').eq(1).val(),
						'lastCity': $('.domMultipleArrivel').eq(1).attr('code'),
						'date': $('.domMultipleDepartureDate').eq(0).val(),
						'returndate':$('.domMultipleDepartureDate').eq(1).val(),
						'queryKey': $('.domMultipleDeparture').eq(0).attr('code') + ',' + $('.domMultipleArrivel').eq(0).attr('code') + ',' + $(
							'.domMultipleDepartureDate').eq(0).val() + ',' + 'ALL',
						'queryKeyReturn': $('.domMultipleDeparture').eq(1).attr('code') + ',' + $('.domMultipleArrivel').eq(1).attr('code') + ','+$(
							'.domMultipleDepartureDate').eq(0).val() +','+ $('.domMultipleDepartureDate').eq(1).val(),
						'showCabins': berthtype,
						'codeShare': $('.domCodeShareCheckBox').is(':checked'),
						'isDirect': $('.domDirectCheckBox').is(':checked'),
					}
					$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
					window.location.href = '../../domesticAir/airTicketList.html';
				}
            }
        }else{
            alert(get_lan('searchRemind'));
        }
    })
}
//国际机票
function chooseIntl(){
    $("input[name=intlTrip]").each(function(){
            $(this).click(function(){
                var discount = $(this).attr('id');
                if(discount=="intlOneWay"){
                    $(".intlAirBody").removeClass("hide");
                    $(".intlAirMultipleBody").addClass("hide");
                    $(".intlDateTittle,#intlReturnDate,#intlReturnSelect").css('color','#9b9b9b');
                    $(".intlDateBody").eq(1).css('border','1px solid #9b9b9b');
                    $("#intlDepartureDate").datepicker('destroy');
                    $("#intlReturnDate").datepicker('destroy');
                    $( "#intlDepartureDate").datepicker({
                        dateFormat: 'yy-mm-dd',
                        changeMonth: true,
                        minDate: TAminDate,  // 当前日期之后的 0 天，就是当天
                        maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
                        hideIfNoPrevNext: true,
                        showOtherMonths: true,
                        selectOtherMonths: true,
                        changeYear: true,
                    });
                    $('.searchIntlBtn').attr('state','oneWay');
                    if(ProfileInfo.onlineStyle=="APPLE"){
                        var r=confirm(get_lan("appleIntlRemind"))
                          if (r==true)
                            {
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
                if(discount=="intlRoundTrip"){
                    $(".intlAirBody").removeClass("hide");
                    $(".intlAirMultipleBody").addClass("hide");
                    $(".intlDateTittle,#intlReturnDate,#intlReturnSelect").css('color','#000');
                    $(".intlDateBody").eq(1).css('border','1px solid #000');
                    $("#intlReturnDate").val(getNextDay($("#intlDepartureDate").val()));
                    $("#intlDepartureDate").datepicker('destroy');
                    dateChoose("intlDepartureDate","intlReturnDate");
                    $('.searchIntlBtn').attr('state','roundTrip')
					
					$("#returnPlusMinusintel").css({
						// 'color': '#555555',
						// 'border': '1px solid #555555'
						'color': '#000000',
						'border': '1px solid #000000'
					});
					$("#returnPlusMinusintel").removeAttr('disabled')
					$("#intlReturnSelect").removeAttr('disabled')
				}
                if(discount=="intlMultipleTrip"){
                    $(".intlAirBody").addClass("hide");
                    $(".intlAirMultipleBody").removeClass("hide");
                    $('.searchIntlBtn').attr('state','multiple')
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
    $(".transitText,.addTransitIcon").unbind("click").click(function(){
        $(".transitCityBody").removeClass("hide");
        $(".addTransitBody").addClass("hide");
        $(".intlDirectCheckBoxBody").addClass("hide");
    })
    $(".hideTransitIcon").unbind("click").click(function(){
        $(".transitCityBody").addClass("hide");
        $(".addTransitBody").removeClass("hide");
        $(".intlDirectCheckBoxBody").removeClass("hide");
    })
    $("#intlDepartureDate").datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        minDate: TAminDate,  // 当前日期之后的 0 天，就是当天
        maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    });
    $("#intlDepartureDate").val(GetDateStr(0));
    $("#intlReturnDate").val(GetDateStr(1));
    $(".switchIconIntl").unbind("click").click(function(){
        cityConversion("intlDepartureCity","intlArrivalCity");
    })
    /*多段*/
    $(".MultipleDepartureDate").eq(0).val(GetDateStr(0));
    MultipleDepartureDate();
    $(".addAirIntlBody").unbind("click").click(function(){
        var multipleLiLength = $(".MultipleDepartureDate").length-1;
        if(!$(".MultipleDepartureCity").eq(multipleLiLength).attr("code")||!$(".MultipleArrivelCity").eq(multipleLiLength).attr("code")){
            alert(get_lan("searchBody").multipleRemind);
            return false;
        }
        $(this).before('\
            <div class="intlAirMultipleLi flexRow">\
                <div class="MultipleLiIcon">'+($(".intlAirMultipleLi").length+1)+'</div>\
                <div class="MultipleLiText">'+get_lan('searchBody').departure+'</div>\
                <input class="MultipleLiInput MultipleDepartureCity">\
                <div class="MultipleLiText">'+get_lan('searchBody').arrival+'</div>\
                <input class="MultipleLiInput MultipleArrivelCity" inputIndex="'+$(".MultipleArrivelCity").length+'">\
                <div class="MultipleLiText">'+get_lan('searchBody').departureDate+'</div>\
                <div class="MultipleLiInputBody flexRow">\
                  <input class="MultipleLiInput MultipleDepartureDate">\
                  <select type="text" class="MultipleSelect">\
                    <option value="all" class="intlAllDay">'+get_lan("searchBody").allDay+'</option>\
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
            ')
        if(ProfileInfo.SearchInterAirWTime&&ProfileInfo.DomesticHideAllDay){
            $(".intlAllDay").remove();
            $(".MultipleSelect").eq($(".MultipleSelect").length-1).val("8");
        }
        if(!ProfileInfo.SearchInterAirWTime){
            $(".MultipleSelect").remove();
        }
        $(".MultipleDepartureCity").eq($(".MultipleDepartureCity").length-1).val($(".MultipleArrivelCity").eq($(".MultipleArrivelCity").length-2).val());
        $(".MultipleDepartureCity").eq($(".MultipleDepartureCity").length-1).attr("code",$(".MultipleArrivelCity").eq($(".MultipleArrivelCity").length-2).attr("code"));
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
        $(".delMultipleLi").unbind("click").click(function(){
            $(this).parent().remove();
            for(var i =0;i<$(".MultipleLiIcon").length;i++){
                $(".MultipleLiIcon").eq(i).text(i+1);
            }
        })
        MultipleDepartureDate();
    })
    $(".MultipleDepartureCity").kuCity();
    $(".MultipleArrivelCity").kuCity();
    function MultipleDepartureDate(){
        for(var i=0;i<$(".MultipleDepartureDate").length;i++){
            if(i==$(".MultipleDepartureDate").length-2){
                var dateIndex = i;
                console.log($(".MultipleDepartureDate").eq(dateIndex).val());
                $(".MultipleDepartureDate").eq(dateIndex+1).val($(".MultipleDepartureDate").eq(dateIndex).val());
                $( ".MultipleDepartureDate").eq(dateIndex).datepicker({
                    dateFormat: 'yy-mm-dd',
                    changeMonth: true,
                    changeYear: true,
                    minDate: TAminDate,  // 当前日期之后的 0 天，就是当天
                    maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
                    hideIfNoPrevNext: true,
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    onSelect:function(){
                        // MultipleDepartureDate();
                        $(".MultipleDepartureDate").eq(dateIndex+1).val($(".MultipleDepartureDate").eq(dateIndex).val());
                        $( ".MultipleDepartureDate").eq(dateIndex+1).datepicker('destroy');
                        $( ".MultipleDepartureDate").eq(dateIndex+1).datepicker({
                            dateFormat: 'yy-mm-dd',
                            changeMonth: true,
                            changeYear: true,
                            minDate: $(".MultipleDepartureDate").eq(dateIndex+1).val(),  // 当前日期之后的 0 天，就是当天
							maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
                            hideIfNoPrevNext: true,
                            showOtherMonths: true,
                            selectOtherMonths: true,
                        });
                    }
                });
                $( ".MultipleDepartureDate").eq(dateIndex+1).datepicker({
                   dateFormat: 'yy-mm-dd',
                   changeMonth: true,
                   changeYear: true,
                   minDate: $(".MultipleDepartureDate").eq(dateIndex+1).val(),  // 当前日期之后的 0 天，就是当天
				   maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
                   hideIfNoPrevNext: true,
                   showOtherMonths: true,
                   selectOtherMonths: true,
                   onSelect:function(){
                       // MultipleDepartureDate();
                   }
                }); 
            }
        }
    }
    /*搜索国际机票*/
    $(".searchIntlBtn").unbind("click").click(function(){
        var that = this;
        if($(".searchIntlBtn").attr("state") == "oneWay"||$(".searchIntlBtn").attr("state") == "roundTrip"){
            if($('#intlDepartureCity').attr("code")&&$('#intlArrivalCity').attr("code")){
                // alert($("#transitCity").length);
                // if (ProfileInfo.onlineStyle == "APPLE") {
                    var cityList = '"'+$('#intlDepartureCity').attr("code")+'","'+$('#intlArrivalCity').attr("code")+'"';
                    tools.appleRemindPop(cityList,1,netUserId,function(){
                        if($(that).attr("startlimit")&&parseInt($(that).attr("startlimit"))>0){
                            if(datedifference(getNowFormatDate(), $('#intlDepartureDate').val())<parseInt($(that).attr("startlimit"))){
                                if($(that).attr("Message").indexOf("\\n") != -1){
                                    var mymessage = confirm($(that).attr("Message").split("\\n").join('\n'));
                                }else{
                                    var mymessage = confirm($(that).attr("Message"));
                                }
                                if(mymessage==true)
                                {
                                    if($(that).attr("CanSearch")!="true"){
                                        return false;
                                    }else{
                                        searchIntl()
                                    }
                                }else{
                                    return false;
                                }
                            }else{
                                searchIntl()
                            }
                        }else{
                            searchIntl()
                        }
                    });
                // }else{
                //     searchIntl();
                // }
                function searchIntl(){
                    if(!$(".transitCityBody").hasClass("hide")&&$("#transitCity").attr("code")){
                        var transitCityCode = $("#transitCity").attr("code");
                        var isDirect = false;
                    }else{
                        var transitCityCode = "";
                        var isDirect = $('.intlDirectCheckBox').is(':checked');
                    }
                    if($(".searchIntlBtn").attr("state") == "oneWay"){
                        if(ProfileInfo.onlineStyle!="APPLE"){
                            var r=confirm(get_lan("appleIntlRemind"))
                            if (r==false)
                                {
                                return false;
                                }
                        }
                        var searchIntlInfo = {
                            'type':'oneWay',
                            'departureCityText':$('#intlDepartureCity').val(),
                            'arrivalCityText':$('#intlArrivalCity').val(),
                            'departureCity':$('#intlDepartureCity').attr("code"),
                            'arrivalCity':$('#intlArrivalCity').attr("code"),
                            'date':$('#intlDepartureDate').val(),
                            'queryKey':$('#intlDepartureCity').attr("code")+','+$('#intlArrivalCity').attr("code")+','+$('#intlDepartureDate').val(),
                            'showCabins':$("#intlCabin  option:selected").attr("berthtype"),
                            'isDirect':isDirect,
                            'transitCityCode':transitCityCode,
                        }
                        if(ProfileInfo.SearchInterAirWTime){
                            if($("#intlDepartureSelect  option:selected").val()=="all"){
                                var DepartureSelectValue = ''
                            }else{
                                var DepartureSelectValue = ' '+$("#intlDepartureSelect  option:selected").val()+':00:00';
                            }
                            searchIntlInfo.queryKey = $('#intlDepartureCity').attr("code")+','+$('#intlArrivalCity').attr("code")+','+$('#intlDepartureDate').val()+DepartureSelectValue;
                        }
						
						// 2020.5.20 国际机票  时间筛选
						if (ProfileInfo.ShowDomesticTimeSlt) {
							if ($('#intlDepartureSelect').val() == 'all') {
								$.session.set('searchIntelDay', '');
							} else {
								$.session.set('searchIntelDay', $('#DepartPlusMinusintel').val());
							}
						} else {
							$.session.set('searchIntelDay', '');
						}
						
                        $.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
                        window.location.href='../../intlAir/airTicketList.html';
                    }else if($(".searchIntlBtn").attr("state") == "roundTrip"){
                        var searchIntlInfo = {
                            'type':'roundTrip',
                            'departureCityText':$('#intlDepartureCity').val(),
                            'arrivalCityText':$('#intlArrivalCity').val(),
                            'departureCity':$('#intlDepartureCity').attr("code"),
                            'arrivalCity':$('#intlArrivalCity').attr("code"),
                            'date':$('#intlDepartureDate').val(),
                            'returndate':$('#intlReturnDate').val(),
                            'queryKey':$('#intlDepartureCity').attr("code")+','+$('#intlArrivalCity').attr("code")+','+$('#intlDepartureDate').val(),
                            'queryKeyReturn':$('#intlDepartureCity').attr("code")+','+$('#intlArrivalCity').attr("code")+','+$('#intlDepartureDate').val()+','+$('#intlReturnDate').val(),
                            'showCabins':$("#intlCabin  option:selected").attr("berthtype"),
                            'isDirect':isDirect,
                            'transitCityCode':transitCityCode,
                        }
                        if(ProfileInfo.SearchInterAirWTime){
                            if($("#intlDepartureSelect option:selected").val()=="all"){
                                var DepartureSelectValue = ''
                            }else{
                                var DepartureSelectValue = ' '+$("#intlDepartureSelect option:selected").val()+':00:00';
                            }
                            if($("#intlReturnSelect option:selected").val()=="all"){
                                var ReturnSelectValue = ''
                            }else{
                                var ReturnSelectValue = ' '+$("#intlReturnSelect option:selected").val()+':00:00';
                            }
                            searchIntlInfo.queryKey = $('#intlDepartureCity').attr("code")+','+$('#intlArrivalCity').attr("code")+','+$('#intlDepartureDate').val()+DepartureSelectValue;
                            searchIntlInfo.queryKeyReturn = $('#intlDepartureCity').attr("code")+','+$('#intlArrivalCity').attr("code")+','+$('#intlDepartureDate').val()+DepartureSelectValue+','+$('#intlReturnDate').val()+ReturnSelectValue;
                        }
						
						// 2020.5.20 国际机票  时间筛选
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
                        window.location.href='../../intlAir/airTicketList.html?intlState=1';
                    }
                }
            }else{
                alert(get_lan('searchRemind'));
            }
        }
        else if($(".searchIntlBtn").attr("state") == "multiple"){
            var orgList = '';
            var dstList = '';
            var dateList = '';
            /*2020-2-26*/
            var cityList = ''
            /*end*/
            for(var i=0;i<$(".intlAirMultipleLi").length;i++){
                if(!$(".MultipleDepartureCity").eq(i).attr("code")||!$(".MultipleArrivelCity").eq(i).attr("code")||$(".MultipleDepartureDate").eq(i).val()==""){
                    alert(get_lan('searchRemind'));
                    return false;
                }
                if(ProfileInfo.SearchInterAirWTime){
                    if($(".MultipleSelect").eq(i).val()=="all"){
                        var MultipleTime = '';
                    }else{
                        var MultipleTime = ' '+$(".MultipleSelect").eq(i).val()+':00:00';
                    }
                }else{
                    var MultipleTime = '';
                }
                orgList += $(".MultipleDepartureCity").eq(i).attr("code");
                orgList += ',';
                dstList += $(".MultipleArrivelCity").eq(i).attr("code");
                dstList += ',';
                dateList += $(".MultipleDepartureDate").eq(i).val()+MultipleTime;
                dateList += ',';
                cityList += '"'+$(".MultipleDepartureCity").eq(i).attr("code")+'","'+$(".MultipleArrivelCity").eq(i).attr("code")+'",';
            }
            // if (ProfileInfo.onlineStyle == "APPLE") {
                var cityList = cityList.substring(0, cityList.length - 1);
                // console.log(Array.from(new Set(cityList.split(','))));
                tools.appleRemindPop(cityList,1,netUserId,function(){
                    if($(that).attr("startlimit")&&parseInt($(that).attr("startlimit"))>0){
                        if(datedifference(getNowFormatDate(), $('.MultipleDepartureDate ').eq(0).val())<parseInt($(that).attr("startlimit"))){
                            if($(that).attr("Message").indexOf("\\n") != -1){
                                var mymessage = confirm($(that).attr("Message").split("\\n").join('\n'));
                            }else{
                                var mymessage = confirm($(that).attr("Message"));
                            }
                            if(mymessage==true)
                            {
                                if($(that).attr("CanSearch")!="true"){
                                    return false;
                                }else{
                                    searchMultipleIntl(orgList,dstList,dateList)
                                }
                            }else{
                                return false;
                            }
                        }else{
                            searchMultipleIntl(orgList,dstList,dateList)
                        }
                    }else{
                        searchMultipleIntl(orgList,dstList,dateList)
                    }
                });
            // }else{
            //     searchMultipleIntl(orgList,dstList,dateList);
            // }
            function searchMultipleIntl(orgList,dstList,dateList){
                var searchIntlInfo = {
                    'type':'multiple',
                    "orgList":orgList.substring(0,orgList.length-1),
                    "dstList":dstList.substring(0,dstList.length-1),
                    "dateList":dateList.substring(0,dateList.length-1),
                    "cabinType":$("#MultipleCabin  option:selected").attr("berthtype"),
                }
                $.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
                window.location.href='../../intlAir/airTicketListMultiple.html?intlState=1';
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
// function chooseHotel(){
//     $("input[name=hotel]").each(function(){
//             $(this).click(function(){
//                 var discount = $(this).attr('id');
//                 if(discount=="domHotel"){
//                     $(".hotelCityChange").val('');
//                     $(".hotelCityChange").removeAttr('code');
//                     $(".hotelCityChange").removeAttr("id").attr("id","hotelCity");
//                     $("#hotelCity").kuCity();
//                     $('.searchHotelBtn').attr('state','domHotel');
//                 }
//                 if(discount=="intlHotel"){
//                     $(".hotelCityChange").val('');
//                     $(".hotelCityChange").removeAttr('code');
//                     $(".hotelCityChange").removeAttr("id").attr("id","hotelIntlCity");
//                     $("#hotelIntlCity").kuCity();
//                     $('.searchHotelBtn').attr('state','intlHotel');
//                 }
//             });
//         });
//     $("#hotelCity").kuCity();
//     $("#hotelDepartureDate").val(GetDateStr(0));
//     $("#hotelReturnDate").val(GetDateStr(1));
//     $("#hotelReturnDate").css('color','#000');
//     $("#hotelReturnDate").css('border','1px solid #000');
//     dateChoose("hotelDepartureDate","hotelReturnDate");

//     /*改变酒店金额*/
//     $("#hotelPrice").unbind("change").change(function(){
//         if($("#hotelPrice").val().indexOf("-") != -1){
//             var hotelPriceList = $("#hotelPrice").val().substring(1,$("#hotelPrice").val().length).split('-');
//             $("#hotelPrice").attr('minPrice',hotelPriceList[0]);
//             $("#hotelPrice").attr('maxPrice',hotelPriceList[1]);
//         }
//     })

//     $("input[name=hotelCheck]").each(function(){
//             $(this).click(function(){
//                 if($(this).is(':checked')){
//                    $(this).next(".star").css("color", "#F58A00");
//                 }else{
//                     $(this).next(".star").css("color", "#000");
//                 }
//             });
//         });
//     $("#keyWordInput").unbind("click").click(function(){
//         if($(".searchHotelBtn").attr("state")=="domHotel"){
//             var hotelCityCode = $('#hotelCity').attr("code");
//         }else if($(".searchHotelBtn").attr("state")=="intlHotel"){
//             var hotelCityCode = $('#hotelIntlCity').attr("code");
//         }
//         if(!hotelCityCode){
//             $(".keyWordBody").html('');
//             alert(get_lan('searchBody').keyWordRemind);
//         }else{
//             $("#keyWordInput").on('input propertychange',function(){
//                 $(".keyWordBody").html("");
//                 $.ajax(
//                   { 
//                     type:'post', 
//                     url : $.session.get('ajaxUrl'),
//                     dataType : 'json',
//                     data:{
//                         url: $.session.get('obtCompany')+"/QueryService.svc/SearchHotelRelatedInfoPost",
//                         jsonStr:'{"cityCode":"'+hotelCityCode+'","id":'+netUserId+',"language":"'+obtLanguage+'","queryKey":"'+$("#keyWordInput").val()+'"}'
//                     },
//                     success : function(data) {
//                         var res = JSON.parse(data);
//                         // console.log(res);
//                         $(".keyWordBody").html('<ul class="keyWordBodyList"></ul>');
//                         res.RelatedInfos.map(function(item){
//                             $(".keyWordBodyList").append('\
//                                 <li class="keyWordBodyLi" type="'+item.Type+'" relationId="'+item.ID+'">'+item.Content+'</li>\
//                                 ')
//                         })
//                         $(".keyWordBodyLi").on('mousedown',function(){
//                             $("#keyWordInput").val($(this).text());
//                             $("#keyWordInput").attr("relationId",$(this).attr("relationId"));
//                             $("#keyWordInput").attr("hoteltype",$(this).attr("type"));
//                             $(".keyWordBody").hide();
//                         })
//                     },
//                     error : function() {
//                       // alert('fail');
//                     } 
//                   } 
//                 );
//             })
//             $('body').mLoading("show");
//             $.ajax(
//               { 
//                 type:'post', 
//                 url : $.session.get('ajaxUrl'), 
//                 dataType : 'json',
//                 data:{
//                     url: $.session.get('obtCompany')+"/QueryService.svc/GetHotelRelatedInfoPost",
//                     jsonStr:'{"cityCode":"'+hotelCityCode+'","id":'+netUserId+',"language":"'+$.session.get('obtLanguage')+'"}'
//                 },
//                 success : function(data) {
//                     $('body').mLoading("hide");
//                     var res = JSON.parse(data);
//                     console.log(res);
//                     //推荐酒店
//                     var hotelLength = res.HistoryHotelList.length>4?4:res.HistoryHotelList.length;
//                     var hotelStr = '';
//                     for(var i=0;i<hotelLength;i++){
//                         if(obtLanguage=="CN"){
//                             hotelStr+='<div class="relationLi" style="width:48%;" type="'+res.HistoryHotelList[i].Type+'" relationId="'+res.HistoryHotelList[i].ID+'">'+res.HistoryHotelList[i].NameCn+'</div>';
//                         }else if(obtLanguage=="EN"){
//                             hotelStr+='<div class="relationLi" style="width:48%;" type="'+res.HistoryHotelList[i].Type+'" relationId="'+res.HistoryHotelList[i].ID+'">'+res.HistoryHotelList[i].NameEn+'</div>';
//                         }
//                     }
//                     //品牌
//                     var brandLength = res.BrandList.length>8?8:res.BrandList.length;
//                     var brandStr = '';
//                     for(var i=0;i<brandLength;i++){
//                         if(obtLanguage=="CN"){
//                             brandStr+='<div class="relationLi" type="'+res.BrandList[i].Type+'" relationId="'+res.BrandList[i].ID+'">'+res.BrandList[i].NameCn+'</div>';
//                         }else if(obtLanguage=="EN"){
//                             brandStr+='<div class="relationLi" type="'+res.BrandList[i].Type+'" relationId="'+res.BrandList[i].ID+'">'+res.BrandList[i].NameEn+'</div>';
//                         }
//                     }
//                     //行政区
//                     var districtLength = res.DistrictList.length>8?8:res.DistrictList.length;
//                     var districtStr = '';
//                     for(var i=0;i<districtLength;i++){
//                         if(obtLanguage=="CN"){
//                             districtStr+='<div class="relationLi" type="'+res.DistrictList[i].Type+'" relationId="'+res.DistrictList[i].ID+'">'+res.DistrictList[i].NameCn+'</div>';
//                         }else if(obtLanguage=="EN"){
//                             districtStr+='<div class="relationLi" type="'+res.DistrictList[i].Type+'" relationId="'+res.DistrictList[i].ID+'">'+res.DistrictList[i].NameEn+'</div>';
//                         }
//                     }
//                     //商圈
//                     var commercialLength = res.CommercialList.length>8?8:res.CommercialList.length;
//                     var commercialStr = '';
//                     for(var i=0;i<commercialLength;i++){
//                         if(obtLanguage=="CN"){
//                             commercialStr+='<div class="relationLi" type="'+res.CommercialList[i].Type+'" relationId="'+res.CommercialList[i].ID+'">'+res.CommercialList[i].NameCn+'</div>';
//                         }else if(obtLanguage=="EN"){
//                             commercialStr+='<div class="relationLi" type="'+res.CommercialList[i].Type+'" relationId="'+res.CommercialList[i].ID+'">'+res.CommercialList[i].NameEn+'</div>';
//                         }
//                     }
//                     //附属商圈
//                     var extCommercialLength = res.ExtCommercialList.length>8?8:res.ExtCommercialList.length;
//                     var extCommercialStr = '';
//                     for(var i=0;i<extCommercialLength;i++){
//                         if(obtLanguage=="CN"){
//                             extCommercialStr+='<div class="relationLi" type="'+res.ExtCommercialList[i].Type+'" relationId="'+res.ExtCommercialList[i].ID+'">'+res.ExtCommercialList[i].NameCn+'</div>';
//                         }else if(obtLanguage=="EN"){
//                             extCommercialStr+='<div class="relationLi" type="'+res.ExtCommercialList[i].Type+'" relationId="'+res.ExtCommercialList[i].ID+'">'+res.ExtCommercialList[i].NameEn+'</div>';
//                         }
//                     }
//                     $(".keyWordBody").html('\
//                         <div class="relationBody">\
//                           <div class="relationTittle flexRow">\
//                             <div style="width:50%">'+get_lan('keyWordBody').hotel+'</div>\
//                           </div>\
//                           <div class="relationContent flexWrap">\
//                             '+hotelStr+'\
//                           </div>\
//                         </div>\
//                         <div class="relationBody">\
//                           <div class="relationTittle flexRow">\
//                             <div style="width:50%">'+get_lan('keyWordBody').brand+'</div>\
//                           </div>\
//                           <div class="relationContent flexWrap">\
//                             '+brandStr+'\
//                           </div>\
//                         </div>\
//                         <div class="relationBody">\
//                           <div class="relationTittle flexRow">\
//                             <div style="width:50%">'+get_lan('keyWordBody').district+'</div>\
//                           </div>\
//                           <div class="relationContent flexWrap">\
//                             '+districtStr+'\
//                           </div>\
//                         </div>\
//                         <div class="relationBody">\
//                           <div class="relationTittle flexRow">\
//                             <div style="width:50%">'+get_lan('keyWordBody').commercial+'</div>\
//                           </div>\
//                           <div class="relationContent flexWrap">\
//                             '+commercialStr+'\
//                           </div>\
//                         </div>\
//                         <div class="relationBody">\
//                           <div class="relationTittle flexRow">\
//                             <div style="width:20%">'+get_lan('keyWordBody').extCommercial+'</div>\
//                           </div>\
//                           <div class="relationContent flexWrap">\
//                             '+extCommercialStr+'\
//                           </div>\
//                         </div>\
//                     ')
//                     $(".relationLi").on('mousedown',function(){
//                         $("#keyWordInput").val($(this).text());
//                         $("#keyWordInput").attr("relationId",$(this).attr("relationId"));
//                         $("#keyWordInput").attr("hoteltype",$(this).attr("type"));
//                         $(".keyWordBody").hide();
//                     })
//                 },
//                 error : function() {
//                   // alert('fail'); 
//                 } 
//               } 
//             );
//         }
//     })
//     $("#hotelPrice").on('focus',function(){
//         $(".hotelPriceBody").show();
//     })
//     .on('blur',function(){
//         $(".hotelPriceBody").hide();
//     })
//     $(".hotelPriceLi").on('mousedown',function(){
//         $("#hotelPrice").val($(this).text());
//         $("#hotelPrice").attr("minPrice",$(this).attr("minPrice"));
//         $("#hotelPrice").attr("maxPrice",$(this).attr("maxPrice"));
//     })
//     $("#keyWordInput").on('focus',function(){
//         $(".keyWordBody").show();
//     })
//     .on('blur',function(){
//         $(".keyWordBody").hide();
//     })
//     $(".searchHotelBtn").unbind("click").click(function(){
//         if($(this).attr("state")=="domHotel"){
//             var hotelCityCode = $('#hotelCity').attr("code");
//             var hotelCityText = $('#hotelCity').val();
//             var hotelState = "domHotel";
//         }else if($(this).attr("state")=="intlHotel"){
//             var hotelCityCode = $('#hotelIntlCity').attr("code");
//             var hotelCityText = $('#hotelIntlCity').val();
//             var hotelState = "intlHotel";
//         }
//         if(hotelCityCode){
//             var hotelAreaTypeID = $("#keyWordInput").attr("hoteltype")&&$("#keyWordInput").attr("hoteltype")!=5?$("#keyWordInput").attr("relationId")+'-'+$("#keyWordInput").attr("hoteltype"):'';
//             var hotelname = !$("#keyWordInput").attr("hoteltype")||$("#keyWordInput").attr("hoteltype")==5?$("#keyWordInput").val():'';
//             if($(this).attr("state")=="domHotel"){
//                 if($("#hotelAddress").val()!=""){
//                     var address = $("#hotelCity").val()+$("#hotelAddress").val();
//                 }else{
//                     var address = "";
//                 }
//             }else if($(this).attr("state")=="intlHotel"){
//                 if($("#hotelAddress").val()!=""){
//                     var address = $("#hotelIntlCity").val()+$("#hotelAddress").val();
//                 }else{
//                     var address = "";
//                 }
//             }
//             var stars = '0-';
//             console.log(stars);
//             for(var i=0;i<$('input[name=hotelCheck]:checked').length;i++){
//                 stars += $('input[name=hotelCheck]:checked').eq(i).val();
//                 stars += '-';
//             }
//             stars = stars.substring(0,stars.length-1);
//             var queryKey = hotelCityCode+','+hotelAreaTypeID+','+hotelname+','+address+','+$("#hotelDepartureDate").val()+','+$("#hotelReturnDate").val()+','+stars+','+$("#hotelPrice").attr("minPrice")+','+$("#hotelPrice").attr("maxPrice")+",1,1,1,2000,,";
//             var searchHotelInfo = {
//                 'queryKey':queryKey,
//                 'hotelCode':hotelCityCode,
//                 'hotelCityText':hotelCityText,
//                 'hotelState':hotelState,
//             }
//             $.session.set('searchHotelInfo', JSON.stringify(searchHotelInfo));
//             window.location.href='../../hotel/hotelList.html';
//         }else{
//             alert(get_lan('searchRemind'))
//         }
//     })
// }
//国内火车票
// function chooseTrain(){
//     $("input[name=trainTrip]").each(function(){
//             $(this).click(function(){
//                 var discount = $(this).attr('id');
//                 if(discount=="trainOneWay"){
//                     $(".trainDateTittle,#trainReturnDate").css('color','#9b9b9b');
//                     $("#trainReturnDate").css('border','1px solid #9b9b9b');
//                     $("#trainDepartureDate").datepicker('destroy');
//                     $("#trainReturnDate").datepicker('destroy');
//                     $( "#trainDepartureDate").datepicker({
//                         dateFormat: 'yy-mm-dd',
//                         changeMonth: true,
//                         changeYear: true,
//                         minDate: 0,  // 当前日期之后的 0 天，就是当天
//                         maxDate: 365,  // 当前日期之后的 0 天，就是当天
//                         hideIfNoPrevNext: true,
//                         showOtherMonths: true,
//                         selectOtherMonths: true,
//                     });
//                     $('.searchTrainBtn').attr('state','oneWay')
//                 }
//                 if(discount=="trainRoundTrip"){
//                     $(".trainDateTittle,#trainReturnDate").css('color','#000');
//                     $("#trainReturnDate").css('border','1px solid #000');
//                     $("#trainReturnDate").val(getNextDay($("#trainDepartureDate").val()));
//                     // $("#trainDepartureDate").val(GetDateStr(0));
//                     // $("#trainReturnDate").val(GetDateStr(1));
//                     $("#trainDepartureDate").datepicker('destroy');
//                     dateChoose("trainDepartureDate","trainReturnDate");
//                     $('.searchTrainBtn').attr('state','roundTrip')
//                 }
//             });
//         });
//     $("#trainDepartureCity").kuCity();
//     $("#trainArrivalCity").kuCity();
//     $( "#trainDepartureDate").datepicker({
//         dateFormat: 'yy-mm-dd',
//         changeMonth: true,
//         changeYear: true,
//         minDate: 0,  // 当前日期之后的 0 天，就是当天
//         hideIfNoPrevNext: true,
//         showOtherMonths: true,
//         selectOtherMonths: true,
//     });
//     $("#trainDepartureDate").val(GetDateStr(0));
//     $("#trainReturnDate").val(GetDateStr(1));
//     $(".switchIconTrain").unbind("click").click(function(){
//         cityConversion("trainDepartureCity","trainArrivalCity");
//     })
//     $(".searchTrainBtn").unbind("click").click(function(){
//         if($('#trainDepartureCity').attr("code")&&$('#trainArrivalCity').attr("code")){
//             if($(".searchTrainBtn").attr("state") == "oneWay"){
//                 var searchTrainInfo = {
//                     'type':'oneWay',
//                     'departureCityText':$('#trainDepartureCity').val(),
//                     'arrivalCityText':$('#trainArrivalCity').val(),
//                     'departureCity':$('#trainDepartureCity').attr("code"),
//                     'arrivalCity':$('#trainArrivalCity').attr("code"),
//                     'date':$('#trainDepartureDate').val(),
//                     'queryKey':$('#trainDepartureCity').val()+','+$('#trainArrivalCity').val()+','+$('#trainDepartureDate').val()+',',
//                 }
//                 $.session.set('searchTrainInfo', JSON.stringify(searchTrainInfo));
//                 window.location.href='../../train/trainTicketList.html';
//             }else if($(".searchTrainBtn").attr("state") == "roundTrip"){
//                 var searchTrainInfo = {
//                     'type':'roundTrip',
//                     'departureCityText':$('#trainDepartureCity').val(),
//                     'arrivalCityText':$('#trainArrivalCity').val(),
//                     'departureCity':$('#trainDepartureCity').attr("code"),
//                     'arrivalCity':$('#trainArrivalCity').attr("code"),
//                     'date':$('#trainDepartureDate').val(),
//                     'returndate':$('#trainReturnDate').val(),
//                     'queryKey':$('#trainDepartureCity').val()+','+$('#trainArrivalCity').val()+','+$('#trainDepartureDate').val()+',',
//                     'queryKeyReturn':$('#trainArrivalCity').val()+','+$('#trainDepartureCity').val()+','+$('#trainReturnDate').val()+',',
//                 }
//                 $.session.set('searchTrainInfo', JSON.stringify(searchTrainInfo));
//                 window.location.href='../../train/trainTicketList.html';
//             }
//         }else{
//             alert(get_lan('searchRemind'))
//         }
//     })
// }
/*交换城市*/
function cityConversion(startCityId,arrivalCityId){
    var startCityText = $('#'+startCityId+'').val();
    var arrivalText = $('#'+arrivalCityId+'').val();
    var startCityCode = $('#'+startCityId+'').attr('code');
    var arrivalCode = $('#'+arrivalCityId+'').attr('code');
    if($('#'+startCityId+'').attr('code')&&$('#'+arrivalCityId+'').attr('code')){
        $('#'+startCityId+'').val(arrivalText);
        $('#'+startCityId+'').attr('code',arrivalCode);
        $('#'+arrivalCityId+'').val(startCityText);
        $('#'+arrivalCityId+'').attr('code',startCityCode);
    }else if(!$('#'+startCityId+'').attr('code')&&$('#'+arrivalCityId+'').attr('code')){
        $('#'+startCityId+'').val(arrivalText);
        $('#'+startCityId+'').attr('code',arrivalCode);
        $('#'+arrivalCityId+'').val('');
        $('#'+arrivalCityId+'').removeAttr('code');
    }else if($('#'+startCityId+'').attr('code')&&!$('#'+arrivalCityId+'').attr('code')){
        $('#'+arrivalCityId+'').val(startCityText);
        $('#'+arrivalCityId+'').attr('code',startCityCode);
        $('#'+startCityId+'').val('');
        $('#'+startCityId+'').removeAttr('code');
    }
}
//日期选择插件
function dateChoose(departure,returnDate){
    var departureValue = new Date($("#"+departure).val().replace(/-/g, "/"));
    $("#"+returnDate).datepicker('destroy');
    $("#"+returnDate).datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        minDate: departureValue,  // 当前日期之后的 0 天，就是当天
		maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    });
    $( "#"+departure).datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
       minDate: TAminDate,  // 当前日期之后的 0 天，就是当天
       maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        onSelect:function(){
            $(".domDateTittle,.intlDateTittle,.trainDateTittle,#"+returnDate).css('color','#000');
            if(returnDate!="domReturnDate"&&returnDate!="intlReturnDate"){
                $("#"+returnDate).css('border','1px solid #000');
            }
            var departureValue = new Date($("#"+departure).val().replace(/-/g, "/"));
            $("#"+returnDate).datepicker('destroy');
            $("#"+returnDate).datepicker({
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                changeYear: true,
                minDate: departureValue,  // 当前日期之后的 0 天，就是当天
				maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
                hideIfNoPrevNext: true,
                showOtherMonths: true,
                selectOtherMonths: true,
            });
            $("#"+returnDate).val(getNextDay($("#"+departure).val()));
            if(departure=="hotelDepartureDate"){
                if($(".searchHotelBtn").attr("state")=="domHotel"){
                    var hotelCityCode = $('#hotelCity').attr("code");
                }else if($(".searchHotelBtn").attr("state")=="intlHotel"){
                    var hotelCityCode = $('#hotelIntlCity').attr("code");
                }
                if(hotelCityCode){
                    $.ajax(
                      {
                        type:'post',
                        url : $.session.get('ajaxUrl'), 
                        dataType : 'json',
                        data:{
                            url: $.session.get('obtCompany')+"/QueryService.svc/GetHotelPolicyPricePost",
                            jsonStr:'{"cityCode":"'+hotelCityCode+'","id":'+netUserId+',"checkIn":"'+$("#hotelDepartureDate").val()+'","checkOut":"'+$("#hotelReturnDate").val()+'"}'
                        },
                        success : function(data) {
                            var res = JSON.parse(data);
                            console.log(res);
                            $('body').mLoading("hide");
                            $("#hotelPrice").val('￥'+res.minFare+'-'+res.maxFare);
                            $("#hotelPrice").attr("minPrice",res.minFare);
                            $("#hotelPrice").attr("maxPrice",res.maxFare);
                        },
                        error : function() {
                          // alert('fail'); 
                        } 
                      }
                    );
                }
            }
        }
    });
}
function getNextDay(d){
        d = new Date(d);
        d.setTime(d.getTime() + 1000*60*60*24);
        var month = (d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1);
        var day = d.getDate()<10?'0'+d.getDate():d.getDate();
        //格式化
        return d.getFullYear()+"-"+month+"-"+day;
    }
//日期
function GetDateStr(AddDayCount) {
    var dd = new Date(); 
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth()+1)<10?'0'+(dd.getMonth()+1):(dd.getMonth()+1);
    var d = dd.getDate()<10?'0'+dd.getDate():dd.getDate();
    return y+"-"+m+"-"+d;
}
//我的订单
function myOrderTableInfo(){
    $("#tableBody").html('\
        <div id="orderTable">\
          <div class="tr flexRow">\
            <div style="width: 130px;padding-left:20px;">'+get_lan('table').orderNumber+'</div>\
            <div style="width: 160px;padding-left: 10px;">'+get_lan('table').traveler+'</div>\
            <div style="width: 40px;"></div>\
            <div style="width: 175px;">'+get_lan('table').roundTime+'</div>\
            <div style="width: 90px;"></div>\
            <div style="width: 380px;">'+get_lan('table').route+'</div>\
            <div style="width: 100px;">'+get_lan('table').price+'</div>\
            <div style="width: 100px;">'+get_lan('table').status+'</div>\
          </div>\
        </div>\
    ')
    $('#tableBody').mLoading("show");
    $.ajax( 
      {
        type:'post', 
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/OrderService.svc/MyTripListPost",
            jsonStr:'{"id":'+netUserId+',"Language":"'+$.session.get('obtLanguage')+'"}'
        },
        success : function(data) {
            if(data != ''){
                var res = JSON.parse(data)
                console.log(res);
                var noTravelData = [];
                res.map(function(item){
                    if(!item.isHistory ){
                        noTravelData.push(item);
                    }
                })
                if(noTravelData.length == 0){
                    $('#tableBody').mLoading("hide");
                    $("#tableBody").html('\
                          <div class="ordersRemind">'+get_lan('tableRemind')+'</div>\
                    ')
                }else{
					var showLine=true;
                    noTravelData.map(function(item,index){
                        console.log(item.OrderItems[0].ItemName.length)
						// 2020.1.10 只显示TAorderNo
						if(TAnumber!=undefined){
							if(TAorderNo!=item.OrderNo && TAnumberIndex!=""&& TAnumberIndex!=undefined){
								// return false
								showLine=false
							}else{
								showLine=true
							}
						}
                        var tableCell = item.OrderItems.length>1||item.OrderItems[0].ItemName.length>40?"table-cell":"cellLine";
                        var ShowApproval = item.ShowApproval?"hide":"hide";
                        $("#orderTable").append('\
                            <div class="flexRow" style="border-bottom:1px solid #d8d8d8;">\
                               <div class="ellipsis" style="width: 130px;border-right:1px solid #d8d8d8;box-sizing:border-box;padding-left:20px;"><span class="orderNoClick specificFontColor '+tableCell+'" style="text-decoration:underline;cursor:pointer;">'+item.OrderNo+'</span></div>\
                               <div class="ellipsis" style="width: 160px;border-right:1px solid #d8d8d8;box-sizing:border-box;padding-left: 10px;"><span class="'+tableCell+'">'+item.OrderCustomer+'</span></div>\
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
                                 <div class="submit '+tableCell+' '+ShowApproval+'" orderNumber="'+item.OrderNo+'">'+get_lan('table').approval+'</div>\
                               </div>\
                            </div>\
                        ')
                      item.OrderItems.map(function(aitem){
                          var liIcon;
                          switch(aitem.ItemType)
                          {
                            case '1':
                            liIcon="planeIcon"
                            break;
                            case '2':
                            liIcon="hotelIcon"
                            break;
                            case '3':
                            liIcon="trainIcon"
                            break;
                            case '4':
                            liIcon="carIcon"
                            break;
                          }
                          var stateColor = "#1E66AE";
                          if(ProfileInfo.onlineStyle=="APPLE"){
                            if(aitem.itemState == "已完成" || aitem.itemState == "Completed"||aitem.itemState == "已改签" || aitem.itemState == "Changed"||aitem.itemState == "已确认" || aitem.itemState == "Confirmed"||aitem.itemState == "已退票" || aitem.itemState == "Refunded"){
                                stateColor = "#222";
                            }else{
                                stateColor = "#222";
                            }
                          }else{
                            if(aitem.itemState == "已完成" || aitem.itemState == "Completed"){
                              stateColor = "#1E66AE";
                            }
                            else if(aitem.itemState == "已改签" || aitem.itemState == "Changed"){
                              stateColor = "#1E66AE";
                            }
                            else if(aitem.itemState == "退票中" || aitem.itemState == "Refunding"){
                              stateColor = "#D0021B";
                            }
                            else if(aitem.itemState == "已确认" || aitem.itemState == "Confirmed"){
                              stateColor = "#1E66AE";
                            }
                            else if(aitem.itemState == "未出票" || aitem.itemState == "Reserved"){
                              stateColor = "#F58C06";
                            }
                            else if(aitem.itemState == "已退票" || aitem.itemState == "Refunded"){
                              stateColor = "#1E66AE";
                            }
                            else if(aitem.itemState == "出票中" || aitem.itemState == "In process"){
                              stateColor = "#7ED321";
                            }
                            else if(aitem.itemState == "处理中" || aitem.itemState == "On request"){
                              stateColor = "#7ED321";
                            }
                          }
                          
                          $(".orderDetailsTable").eq(index).append('\
                              <tr class="myOrdersTr">\
                                <td><div class="'+liIcon+'"></div></td>\
                                <td style="padding-left:10px;">'+aitem.ItemDate+'</td>\
                                <td>'+aitem.flightAndTrainNo+'</td>\
                                <td title="'+aitem.ItemName+'">'+aitem.ItemName+'</td>\
                                <td>'+aitem.ItemFare+'</td>\
                                <td style="color:'+stateColor+'">'+aitem.itemState+'</td>\
                              </tr>\
                          ')
						  
                      })
					  if(!showLine){
						$('#orderTable .flexRow').eq(index+1).hide()
					  }
                    })
                    altRows(".myOrdersTr");
                    $(".submit").unbind("click").click(function(){
                        var searchOrderInfo = {
                            'orderNo':$(this).attr("orderNumber"),
                            'approval':true,
                        }
                        $.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
                        window.location.href='../../orders/orderDetails.html';
                    })
                    $('#tableBody').mLoading("hide");
                    // altRows('orderTable');//表格
                    $(".orderNoClick").unbind("click").click(function(){
                        var searchOrderInfo = {
                            'orderNo':$(this).text(),
                        }
                        $.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
                        window.location.href='../../orders/orderDetails.html';
                    })
                    if(ProfileInfo.NoQueryOrder){
                        $(".orderNoClick").unbind("click");
                        $(".orderNoClick").css("color","#000");
                        $(".orderNoClick").css("text-decoration","none");
                    }
                }
            }else{
                // alert(get_lan('accountRemind'));
                // window.location.href='../../login/loginPage.html';
            }
        },
        error : function() { 
          // alert('fail');
        } 
      } 
    );
}
//表格颜色
function altRows(tr){
    for(i = 0; i < $(tr).length; i++){          
        if(i % 2 == 0){
          $(tr).eq(i).addClass("evenrowcolor");
        }else{
          $(tr).eq(i).addClass("oddrowcolor");
        }      
    }
}


function Dateformat(dateTime,AddDayCount) {
						var dd = new Date(dateTime);
						if(dd.getTime()<new Date().getTime()){
							dd=new Date()
						}
						dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
						// dd.setDate(dd.getDate()); 
						var y = dd.getFullYear();
						var m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);
						var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
						return y + "-" + m + "-" + d;
					}

// 默认地点
function setCity(){
	var cityObj=JSON.parse($.session.get('goOnBooktravelInfo'))
	if(cityObj.type){
		// 国内
		$('#domDepartureCity').attr('code',cityObj.ArriveCityCode)
		$('#domDepartureCity').val($.session.get('obtLanguage')=="CN"?cityObj.ArriveCityCN:cityObj.ArriveCityEN)
		$('#domArrivalCity').attr('code',cityObj.leaveCityCode)
		$('#domArrivalCity').val($.session.get('obtLanguage')=="CN"?cityObj.leaveCityCN:cityObj.leaveCityEN)
		setTimeout(function(){
			$('#domDepartureDate').val(Dateformat(cityObj.starTime,0))
			$('#domReturnDate').val(Dateformat(cityObj.starTime,1))
		},100)
		
	}else{
		$('.airIntl').click()
		// 国际
		$('#intlDepartureCity').attr('code',cityObj.ArriveCityCode)
		$('#intlDepartureCity').val($.session.get('obtLanguage')=="CN"?cityObj.ArriveCityCN:cityObj.ArriveCityEN)
		$('#intlArrivalCity').attr('code',cityObj.leaveCityCode)
		$('#intlArrivalCity').val($.session.get('obtLanguage')=="CN"?cityObj.leaveCityCN:cityObj.leaveCityEN)
		setTimeout(function(){
			$('#intlDepartureDate').val(Dateformat(cityObj.starTime,0))
			$('#intlReturnDate').val(Dateformat(cityObj.starTime,1))
		},100)
	}
}
