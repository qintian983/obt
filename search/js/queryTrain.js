var netUserId = $.session.get('netLoginId');
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
var TAorderNo = $.session.get('TAorderNo');
var TAnumber = $.session.get('TAnumber');
var TAnumberIndex = $.session.get('TAnumberIndex');
console.log(ProfileInfo)

var TAminDate=0,TAmaxDate=365
	if(TAnumber!=undefined && TAnumber!="" && $.session.get('goOnBooktravelInfo')!=undefined && $.session.get('goOnBooktravelInfo')!=""){
		var goOnBooktravelInfo=JSON.parse($.session.get('goOnBooktravelInfo'));
		// TAminDate=goOnBooktravelInfo.starTime.split(" ")[0]
		TAminDate=Dateformat(goOnBooktravelInfo.starTime.split(" ")[0],0)
		TAmaxDate=goOnBooktravelInfo.endTime.split(" ")[0]
	}
//货币单位
var curreny= ProfileInfo.OfficeCurrency? ProfileInfo.OfficeCurrency : "￥"

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
            'cabin1':'不限',
            'cabin2':'经济舱',
            'cabin3':'公务舱',
            'cabin4':'头等舱',
            'cabin5':'公务舱/头等舱',
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
        'isDirect':'Direct Flight Only',
        'codeShare':'Codeshare Flight',
        'addAirIntl':"Add Segment",
        'multipleRemind':"Please fill out first.",
        'domHotel':"Domestic",
        'intlHotel':"International/Regional",
        'allDay':"24hours",
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
    },
    'expiration':'Expiration',
    'footer':{
        'industryNews':'Industry News',
        'companyNews':'Company News',
    },
    'accountRemind':'Account expired, please re login.',
    'contactType':"For technical support, please contact BCD helpdesk：021-61327099 &nbsp;9:00-18:00(working day)",
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
	
    $(".rightArrow").unbind("click").click(function(){
        if($(this).attr("linkState")=="myOrders"){
            window.location.href = '../../orders/orders.html';
        }
    })
}
// 搜索界面
function searchBody(){
    $('.searchBody').html('\
        <ul class="tabBar flexRow">\
            <li class="tab airDom tabActive">'+get_lan('searchBody').airDom+'</li>\
            <li class="tab airIntl" style="width: 120px;">'+get_lan('searchBody').airIntl+'</li>\
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
            </div>\
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
                  <select type="text" id="domDepartureSelect">\
                    <option value="all">'+get_lan("searchBody").allDay+'</option>\
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
                <div class="dateTittle domDateTittle" style="color:#9B9B9B;">'+get_lan('searchBody').returnDate+'</div>\
                <div class="domDateBody domReturnDateBody flexRow">\
                  <input type="text" id="domReturnDate" readonly="readonly">\
                  <select type="text" id="domReturnSelect">\
                    <option value="all">'+get_lan("searchBody").allDay+'</option>\
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
                <div class="cabinTittle">'+get_lan('searchBody').cabin+'</div>\
                <select type="text" id="domCabin">\
                  <option berthType="0">'+get_lan('searchBody').cabins.cabin1+'</option>\
                  <option berthType="1">'+get_lan('searchBody').cabins.cabin2+'</option>\
                  <option berthType="2">'+get_lan('searchBody').cabins.cabin3+'</option>\
                  <option berthType="3">'+get_lan('searchBody').cabins.cabin4+'</option>\
                  <option berthType="23">'+get_lan('searchBody').cabins.cabin5+'</option>\
                </select>\
                <div class="cabinTittle" style="text-align:right;padding-right: 10px;"><input type="checkbox" class="domCodeShareCheckBox"></div>\
                <span class="domCodeShareText" style="font-weight:bold;">'+get_lan('searchBody').codeShare+'</span>\
            </div>\
            <div class="searchDomBtn" state="oneWay">'+get_lan('searchBody').search+'</div>\
        </div>\
        <div class="searchPage airIntlBody">\
            <div class="intlTabBar" style="width:380px;">\
                <span style="position:relative">\
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
                <div class="switchIconIntl"></div>\
                <div class="dateStyle flexRow">\
                    <div class="dateTittle">'+get_lan('searchBody').departureDate+'</div>\
                    <input type="text" id="intlDepartureDate" readonly="readonly">\
                    <div class="dateTittle intlDateTittle" style="color:#9B9B9B;">'+get_lan('searchBody').returnDate+'</div>\
                    <input type="text" id="intlReturnDate" readonly="readonly">\
                </div>\
                <div class="cabinStyle flexRow">\
                    <div class="cabinTittle">'+get_lan('searchBody').cabin+'</div>\
                    <select type="text" id="intlCabin">\
                      \
                      <option berthType="1">'+get_lan('searchBody').cabins.cabin2+'</option>\
                      <option berthType="2">'+get_lan('searchBody').cabins.cabin3+'</option>\
                      <option berthType="3">'+get_lan('searchBody').cabins.cabin4+'</option>\
                    </select>\
                    <div class="cabinTittle" style="text-align:right;padding-right: 10px;"><input type="checkbox" class="intlDirectCheckBox"></div>\
                    <span style="font-weight:bold;">'+get_lan('searchBody').isDirect+'</span>\
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
                <input class="MultipleLiInput MultipleDepartureDate">\
              </div>\
              <div class="intlAirMultipleLi flexRow">\
                <div class="MultipleLiIcon">2</div>\
                <div class="MultipleLiText">'+get_lan('searchBody').departure+'</div>\
                <input class="MultipleLiInput MultipleDepartureCity">\
                <div class="MultipleLiText">'+get_lan('searchBody').arrival+'</div>\
                <input class="MultipleLiInput MultipleArrivelCity" inputIndex="1">\
                <div class="MultipleLiText">'+get_lan('searchBody').departureDate+'</div>\
                <input class="MultipleLiInput MultipleDepartureDate">\
              </div>\
              <div class="addAirIntlBody"><span style="font-weight:bold;margin-right:15px;font-size:16px;">+</span>'+get_lan("searchBody").addAirIntl+'</div>\
              <div class="flexRow" style="margin-top:5px;">\
                <div class="MultipleLiIcon" style="background:#fff;"></div>\
                <div class="MultipleLiText">'+get_lan('searchBody').cabin+'</div>\
                <select type="text" class="MultipleLiInput" id="MultipleCabin">\
                  <option berthType="1">'+get_lan('searchBody').cabins.cabin2+'</option>\
                  <option berthType="2">'+get_lan('searchBody').cabins.cabin3+'</option>\
                  <option berthType="3">'+get_lan('searchBody').cabins.cabin4+'</option>\
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
					<div class="dateTittle trainDateTittle" style="color:#9B9B9B;">'+get_lan('searchBody').returnDate+'</div>\
				<div class="trainDateBody trainReturnDateBody flexRow">\
					<input type="text" id="trainReturnDate" readonly="readonly">\
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
        $(".intlTabBar").css("margin-left","100px");
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
            $(".airDom ").hide();
            $(".airIntl ").hide();
            $(".Hotel ").hide();
            $('.searchPage').hide();
            $(".trainBody ").show();
            if(!res.isTrain){
                $(".searchBody").hide();
            }
			if (res.SearchTrainWithTimeDetail) {
				$(".trainAllDay").remove();
				// domDepartureSelect
				$(".trainDepartureSelect").val("8");
				$('.trainReturnSelect').val('17')
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
	if (!ProfileInfo.SearchTrainWithTimeDetail) {
		$(".trainDepartureSelect,.trainReturnSelect").remove();
	}
    $('.searchPage').hide();
    $('.airDomBody').show();
    //tab切换
    // $(".tab").unbind("click").click(function(){
    //     $('.tab').removeClass('tabActive');
    //     $(this).addClass('tabActive');
    //     $('.searchPage').hide();
    //     if($(this).hasClass('airDom')){
    //         $('.airDomBody').show();
    //     }else if($(this).hasClass('airIntl')){
    //         $('.airIntlBody').show();
    //     }else if($(this).hasClass('Hotel')){
    //         $('.hotelBody').show();
    //     }else if($(this).hasClass('Train')){
    //         $('.trainBody').show();
    //     }else if($(this).hasClass('Visa')){
    //         $('.visaBody').show();
    //         // window.location.href='../visa/visaPage.html'
    //     }
    // })
    // chooseDom();//国内机票
    // chooseIntl();//国际机票
	GetImageInfo()
	//获取图片
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
						var trainImg=''
						res.CompanyImageList.map(function(item){
							if(item.type==14){
								trainImg=item.path
							}
						})
						if(trainImg==""|| trainImg==null){
							$('.bannerImg').attr('src','../search/images/bgImgTrain.jpg')
						}else{
							$('.bannerImg').attr('src',trainImg)
						}
					}else{
						$('.bannerImg').attr('src','../search/images/bgImgTrain.jpg')
						// alert(res.errMsg)
					}
				},
				error: function() {
					// alert('fail');
				}
			});
	}
	
	
    chooseTrain();//国内火车票
    // chooseHotel();//酒店
	if(TAnumber!=undefined){
		if($.session.get('goOnBooktravelInfo')){
            setCity();
        }
	}
}
//国内机票
// function chooseDom(){
//     $("input[name=domTrip]").each(function(){
//             $(this).click(function(){
//                 var discount = $(this).attr('id');
//                 if(discount=="domOneWay"){
//                     $(".domDateTittle,#domReturnDate,#domReturnSelect").css('color','#9b9b9b');
//                     $(".domDateBody").eq(1).css('border','1px solid #9b9b9b');
//                     $("#domDepartureDate").datepicker('destroy');
//                     $("#domReturnDate").datepicker('destroy');
//                     $( "#domDepartureDate").datepicker({
//                         dateFormat: 'yy-mm-dd',
//                         timeFormat: "HH:mm",
//                         changeMonth: true,
//                         minDate: 0,  // 当前日期之后的 0 天，就是当天
//                         hideIfNoPrevNext: true,
//                         showOtherMonths: true,
//                         selectOtherMonths: true,
//                     });
//                     $('.searchDomBtn').attr('state','oneWay')
//                 }
//                 if(discount=="domRoundTrip"){
//                     $(".domDateTittle,#domReturnDate,#domReturnSelect").css('color','#000');
//                     $(".domDateBody").eq(1).css('border','1px solid #000');
//                     $("#domReturnDate").val(getNextDay($("#domDepartureDate").val()));
//                     $("#domDepartureDate").datepicker('destroy');
//                     dateChoose("domDepartureDate","domReturnDate");
//                     $('.searchDomBtn').attr('state','roundTrip');
//                 }
//             });
//         });
//     $("#domDepartureCity").kuCity();
//     $("#domArrivalCity").kuCity();
//     $( "#domDepartureDate").datepicker({
//         dateFormat: 'yy-mm-dd',
//         changeMonth: true,
//         minDate: 0,  // 当前日期之后的 0 天，就是当天
//         hideIfNoPrevNext: true,
//         showOtherMonths: true,
//         selectOtherMonths: true,
//     });
//     $("#domDepartureDate").val(GetDateStr(0));
//     $("#domReturnDate").val(GetDateStr(1));
//     $(".switchIconDom").unbind("click").click(function(){
//         cityConversion("domDepartureCity","domArrivalCity")
//     })
//     $(".searchDomBtn").unbind("click").click(function(){
//         if($('#domDepartureCity').attr("code")&&$('#domArrivalCity').attr("code")){
//             if($(this).attr("startlimit")&&parseInt($(this).attr("startlimit"))>0){
//                 if(datedifference(getNowFormatDate(), $('#domDepartureDate').val())<parseInt($(this).attr("startlimit"))){
//                     var mymessage=confirm($(this).attr("Message"));
//                     if(mymessage==true)
//                     {
//                         if($(this).attr("CanSearch")!="true"){
//                             return false;
//                         }
//                     }else{
//                         return false;
//                     }
//                 }
//             }
//             if($(".searchDomBtn").attr("state") == "oneWay"){
//                 var searchDomInfo = {
//                     'type':'oneWay',
//                     'departureCityText':$('#domDepartureCity').val(),
//                     'arrivalCityText':$('#domArrivalCity').val(),
//                     'departureCity':$('#domDepartureCity').attr("code"),
//                     'arrivalCity':$('#domArrivalCity').attr("code"),
//                     'date':$('#domDepartureDate').val(),
//                     'queryKey':$('#domDepartureCity').attr("code")+','+$('#domArrivalCity').attr("code")+','+$('#domDepartureDate').val()+','+'ALL',
//                     'showCabins':$("#domCabin  option:selected").attr("berthtype"),
//                     'codeShare':$('.domCodeShareCheckBox').is(':checked'),
//                 }
//                 if(ProfileInfo.QueryDomesticTicketsWithTime){
//                     if($("#domDepartureSelect  option:selected").val()=="all"){
//                         var DepartureSelectValue = ''
//                     }else{
//                         var DepartureSelectValue = ' '+$("#domDepartureSelect  option:selected").val()+':00:00';
//                     }
//                     searchDomInfo.queryKey = $('#domDepartureCity').attr("code")+','+$('#domArrivalCity').attr("code")+','+$('#domDepartureDate').val()+DepartureSelectValue+',ALL'
//                 }
//                 $.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
//                 window.location.href='../../domesticAir/airTicketList.html';
//             }else if($(".searchDomBtn").attr("state") == "roundTrip"){
//                 var searchDomInfo = {
//                     'type':'roundTrip',
//                     'departureCityText':$('#domDepartureCity').val(),
//                     'arrivalCityText':$('#domArrivalCity').val(),
//                     'departureCity':$('#domDepartureCity').attr("code"),
//                     'arrivalCity':$('#domArrivalCity').attr("code"),
//                     'date':$('#domDepartureDate').val(),
//                     'returndate':$('#domReturnDate').val(),
//                     'queryKey':$('#domDepartureCity').attr("code")+','+$('#domArrivalCity').attr("code")+','+$('#domDepartureDate').val()+','+'ALL',
//                     'queryKeyReturn':$('#domArrivalCity').attr("code")+','+$('#domDepartureCity').attr("code")+','+$('#domDepartureDate').val()+','+$('#domReturnDate').val()+',',
//                     'showCabins':$("#domCabin  option:selected").attr("berthtype"),
//                     'codeShare':$('.domCodeShareCheckBox').is(':checked'),
//                 }
//                 if(ProfileInfo.QueryDomesticTicketsWithTime){
//                     if($("#domDepartureSelect  option:selected").val()=="all"){
//                         var DepartureSelectValue = ''
//                     }else{
//                         var DepartureSelectValue = ' '+$("#domDepartureSelect  option:selected").val()+':00:00';
//                     }
//                     if($("#domReturnSelect  option:selected").val()=="all"){
//                         var ReturnSelectValue = ''
//                     }else{
//                         var ReturnSelectValue = ' '+$("#domReturnSelect  option:selected").val()+':00:00';
//                     }
//                     searchDomInfo.queryKey = $('#domDepartureCity').attr("code")+','+$('#domArrivalCity').attr("code")+','+$('#domDepartureDate').val()+DepartureSelectValue+',ALL';
//                     searchDomInfo.queryKeyReturn = $('#domArrivalCity').attr("code")+','+$('#domDepartureCity').attr("code")+','+$('#domDepartureDate').val()+DepartureSelectValue+','+$('#domReturnDate').val()+ReturnSelectValue+',ALL';
//                 }
//                 $.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
//                 window.location.href='../../domesticAir/airTicketList.html';
//             }
//         }else{
//             alert(get_lan('searchRemind'));
//         }
//     })
// }
//国际机票
// function chooseIntl(){
//     $("input[name=intlTrip]").each(function(){
//             $(this).click(function(){
//                 var discount = $(this).attr('id');
//                 if(discount=="intlOneWay"){
//                     $(".intlAirBody").removeClass("hide");
//                     $(".intlAirMultipleBody").addClass("hide");
//                     $(".intlDateTittle,#intlReturnDate").css('color','#9b9b9b');
//                     $("#intlReturnDate").css('border','1px solid #9b9b9b');
//                     $("#intlDepartureDate").datepicker('destroy');
//                     $("#intlReturnDate").datepicker('destroy');
//                     $( "#intlDepartureDate").datepicker({
//                         dateFormat: 'yy-mm-dd',
//                         changeMonth: true,
//                         minDate: 0,  // 当前日期之后的 0 天，就是当天
//                         hideIfNoPrevNext: true,
//                         showOtherMonths: true,
//                         selectOtherMonths: true,
//                     });
//                     $('.searchIntlBtn').attr('state','oneWay')
//                 }
//                 if(discount=="intlRoundTrip"){
//                     $(".intlAirBody").removeClass("hide");
//                     $(".intlAirMultipleBody").addClass("hide");
//                     $(".intlDateTittle,#intlReturnDate").css('color','#000');
//                     $("#intlReturnDate").css('border','1px solid #000');
//                     $("#intlReturnDate").val(getNextDay($("#intlDepartureDate").val()));
//                     $("#intlDepartureDate").datepicker('destroy');
//                     dateChoose("intlDepartureDate","intlReturnDate");
//                     $('.searchIntlBtn').attr('state','roundTrip')
//                 }
//                 if(discount=="intlMultipleTrip"){
//                     $(".intlAirBody").addClass("hide");
//                     $(".intlAirMultipleBody").removeClass("hide");
//                     $('.searchIntlBtn').attr('state','multiple')
//                 }
//             });
//         });
//     /*单程往返*/
//     $("#intlDepartureCity").kuCity();
//     $("#intlArrivalCity").kuCity();
//     $( "#intlDepartureDate").datepicker({
//         dateFormat: 'yy-mm-dd',
//         changeMonth: true,
//         minDate: 0,  // 当前日期之后的 0 天，就是当天
//         hideIfNoPrevNext: true,
//         showOtherMonths: true,
//         selectOtherMonths: true,
//     });
//     $("#intlDepartureDate").val(GetDateStr(0));
//     $("#intlReturnDate").val(GetDateStr(1));
//     $(".switchIconIntl").unbind("click").click(function(){
//         cityConversion("intlDepartureCity","intlArrivalCity");
//     })
//     /*多段*/
//     $(".MultipleDepartureDate").eq(0).val(GetDateStr(0));
//     MultipleDepartureDate();
//     $(".addAirIntlBody").unbind("click").click(function(){
//         var multipleLiLength = $(".MultipleDepartureDate").length-1;
//         if(!$(".MultipleDepartureCity").eq(multipleLiLength).attr("code")||!$(".MultipleArrivelCity").eq(multipleLiLength).attr("code")){
//             alert(get_lan("searchBody").multipleRemind);
//             return false;
//         }
//         $(this).before('\
//             <div class="intlAirMultipleLi flexRow">\
//                 <div class="MultipleLiIcon">'+($(".intlAirMultipleLi").length+1)+'</div>\
//                 <div class="MultipleLiText">'+get_lan('searchBody').departure+'</div>\
//                 <input class="MultipleLiInput MultipleDepartureCity">\
//                 <div class="MultipleLiText">'+get_lan('searchBody').arrival+'</div>\
//                 <input class="MultipleLiInput MultipleArrivelCity" inputIndex="'+$(".MultipleArrivelCity").length+'">\
//                 <div class="MultipleLiText">'+get_lan('searchBody').departureDate+'</div>\
//                 <input class="MultipleLiInput MultipleDepartureDate">\
//                 <div class="delMultipleLi">x</div>\
//               </div>\
//             ')
//         $(".MultipleDepartureCity").eq($(".MultipleDepartureCity").length-1).val($(".MultipleArrivelCity").eq($(".MultipleArrivelCity").length-2).val());
//         $(".MultipleDepartureCity").eq($(".MultipleDepartureCity").length-1).attr("code",$(".MultipleArrivelCity").eq($(".MultipleArrivelCity").length-2).attr("code"));
//         $(".MultipleDepartureCity").kuCity();
//         $(".MultipleArrivelCity").kuCity();
//         // MultipleDepartureDate();
//         // var prevMultipVal = $(".MultipleDepartureDate").eq(multipleLiLength-2).val();
//         // $(".MultipleDepartureDate").eq(multipleLiLength-1).val(prevMultipVal);
//         // $(".MultipleDepartureDate").eq(multipleLiLength-1).datepicker({
//         //     dateFormat: 'yy-mm-dd',
//         //     changeMonth: true,
//         //     minDate: $(".MultipleDepartureDate").eq(multipleLiLength-1).val(),  // 当前日期之后的 0 天，就是当天
//         //     hideIfNoPrevNext: true,
//         //     showOtherMonths: true,
//         //     selectOtherMonths: true,
//         // });
//         $(".delMultipleLi").unbind("click").click(function(){
//             $(this).parent().remove();
//             for(var i =0;i<$(".MultipleLiIcon").length;i++){
//                 $(".MultipleLiIcon").eq(i).text(i+1);
//             }
//         })
//         MultipleDepartureDate();
//     })
//     $(".MultipleDepartureCity").kuCity();
//     $(".MultipleArrivelCity").kuCity();
//     function MultipleDepartureDate(){
//         for(var i=0;i<$(".MultipleDepartureDate").length;i++){
//             if(i==$(".MultipleDepartureDate").length-2){
//                 var dateIndex = i;
//                 console.log($(".MultipleDepartureDate").eq(dateIndex).val());
//                 $(".MultipleDepartureDate").eq(dateIndex+1).val($(".MultipleDepartureDate").eq(dateIndex).val());
//                 $( ".MultipleDepartureDate").eq(dateIndex).datepicker({
//                     dateFormat: 'yy-mm-dd',
//                     changeMonth: true,
//                     minDate: 0,  // 当前日期之后的 0 天，就是当天
//                     hideIfNoPrevNext: true,
//                     showOtherMonths: true,
//                     selectOtherMonths: true,
//                     onSelect:function(){
//                         // MultipleDepartureDate();
//                         $(".MultipleDepartureDate").eq(dateIndex+1).val($(".MultipleDepartureDate").eq(dateIndex).val());
//                         $( ".MultipleDepartureDate").eq(dateIndex+1).datepicker('destroy');
//                         $( ".MultipleDepartureDate").eq(dateIndex+1).datepicker({
//                             dateFormat: 'yy-mm-dd',
//                             changeMonth: true,
//                             minDate: $(".MultipleDepartureDate").eq(dateIndex+1).val(),  // 当前日期之后的 0 天，就是当天
//                             hideIfNoPrevNext: true,
//                             showOtherMonths: true,
//                             selectOtherMonths: true,
//                         });
//                     }
//                 });
//                 $( ".MultipleDepartureDate").eq(dateIndex+1).datepicker({
//                    dateFormat: 'yy-mm-dd',
//                    changeMonth: true,
//                    minDate: $(".MultipleDepartureDate").eq(dateIndex+1).val(),  // 当前日期之后的 0 天，就是当天
//                    hideIfNoPrevNext: true,
//                    showOtherMonths: true,
//                    selectOtherMonths: true,
//                    onSelect:function(){
//                        // MultipleDepartureDate();
//                    }
//                 }); 
//             }
//         }
//     }
//     /*搜索国际机票*/
//     $(".searchIntlBtn").unbind("click").click(function(){
//         if($(".searchIntlBtn").attr("state") == "oneWay"||$(".searchIntlBtn").attr("state") == "roundTrip"){
//             if($('#intlDepartureCity').attr("code")&&$('#intlArrivalCity').attr("code")){
//                 if($(this).attr("startlimit")&&parseInt($(this).attr("startlimit"))>0){
//                     if(datedifference(getNowFormatDate(), $('#intlDepartureDate').val())<parseInt($(this).attr("startlimit"))){
//                         var mymessage=confirm($(this).attr("Message"));
//                         if(mymessage==true)
//                         {
//                             if($(this).attr("CanSearch")!="true"){
//                                 return false;
//                             }
//                         }else{
//                             return false;
//                         } 
//                     }
//                 }
//                 if($(".searchIntlBtn").attr("state") == "oneWay"){
//                     var searchIntlInfo = {
//                         'type':'oneWay',
//                         'departureCityText':$('#intlDepartureCity').val(),
//                         'arrivalCityText':$('#intlArrivalCity').val(),
//                         'departureCity':$('#intlDepartureCity').attr("code"),
//                         'arrivalCity':$('#intlArrivalCity').attr("code"),
//                         'date':$('#intlDepartureDate').val(),
//                         'queryKey':$('#intlDepartureCity').attr("code")+','+$('#intlArrivalCity').attr("code")+','+$('#intlDepartureDate').val(),
//                         'showCabins':$("#intlCabin  option:selected").attr("berthtype"),
//                         'isDirect':$('.intlDirectCheckBox').is(':checked'),
//                     }
//                     $.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
//                     window.location.href='../../intlAir/airTicketList.html';
//                 }else if($(".searchIntlBtn").attr("state") == "roundTrip"){
//                     var searchIntlInfo = {
//                         'type':'roundTrip',
//                         'departureCityText':$('#intlDepartureCity').val(),
//                         'arrivalCityText':$('#intlArrivalCity').val(),
//                         'departureCity':$('#intlDepartureCity').attr("code"),
//                         'arrivalCity':$('#intlArrivalCity').attr("code"),
//                         'date':$('#intlDepartureDate').val(),
//                         'returndate':$('#intlReturnDate').val(),
//                         'queryKey':$('#intlDepartureCity').attr("code")+','+$('#intlArrivalCity').attr("code")+','+$('#intlDepartureDate').val(),
//                         'queryKeyReturn':$('#intlDepartureCity').attr("code")+','+$('#intlArrivalCity').attr("code")+','+$('#intlDepartureDate').val()+','+$('#intlReturnDate').val(),
//                         'showCabins':$("#intlCabin  option:selected").attr("berthtype"),
//                         'isDirect':$('.intlDirectCheckBox').is(':checked'),
//                     }
//                     $.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
//                     window.location.href='../../intlAir/airTicketList.html?intlState=1';
//                 }
//             }else{
//                 alert(get_lan('searchRemind'));
//             }
//         }
//         else if($(".searchIntlBtn").attr("state") == "multiple"){
//             if($(this).attr("startlimit")&&parseInt($(this).attr("startlimit"))>0){
//                 if(datedifference(getNowFormatDate(), $('.MultipleDepartureDate ').eq(0).val())<parseInt($(this).attr("startlimit"))){
//                     var mymessage=confirm($(this).attr("Message"));
//                     if(mymessage==true)
//                     {
//                         if($(this).attr("CanSearch")!="true"){
//                             return false;
//                         }
//                     }else{
//                         return false;
//                     }
//                 }
//             }
//             var orgList = '';
//             var dstList = '';
//             var dateList = '';
//             for(var i=0;i<$(".intlAirMultipleLi").length;i++){
//                 if(!$(".MultipleDepartureCity").eq(i).attr("code")||!$(".MultipleArrivelCity").eq(i).attr("code")||$(".MultipleDepartureDate").eq(i).val()==""){
//                     alert(get_lan('searchRemind'));
//                     return false;
//                 }
//                 orgList += $(".MultipleDepartureCity").eq(i).attr("code");
//                 orgList += ',';
//                 dstList += $(".MultipleArrivelCity").eq(i).attr("code");
//                 dstList += ',';
//                 dateList += $(".MultipleDepartureDate").eq(i).val();
//                 dateList += ',';
//             }
//             var searchIntlInfo = {
//                 'type':'multiple',
//                 "orgList":orgList.substring(0,orgList.length-1),
//                 "dstList":dstList.substring(0,dstList.length-1),
//                 "dateList":dateList.substring(0,dateList.length-1),
//                 "cabinType":$("#MultipleCabin  option:selected").attr("berthtype"),
//             }
//             $.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
//             window.location.href='../../intlAir/airTicketListMultiple.html?intlState=1';
//         }
//     })
// }
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
function chooseTrain(){
    $("input[name=trainTrip]").each(function(){
            $(this).click(function(){
                var discount = $(this).attr('id');
                if(discount=="trainOneWay"){
                    $(".trainDateTittle,#trainReturnDate").css('color','#9b9b9b');
                    $("#trainReturnDate").css('border','1px solid #9b9b9b');
                    $("#trainDepartureDate").datepicker('destroy');
                    $("#trainReturnDate").datepicker('destroy');
					$(".trainReturnSelect").css('border', '1px solid #9b9b9b');
					$(".trainReturnSelect").attr("disabled","disabled")
                    $( "#trainDepartureDate").datepicker({
                        dateFormat: 'yy-mm-dd',
                        changeMonth: true,
						minDate: TAminDate,  // 当前日期之后的 0 天，就是当天
						maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
                        hideIfNoPrevNext: true,
                        showOtherMonths: true,
                        selectOtherMonths: true,
                    });
                    $('.searchTrainBtn').attr('state','oneWay')
                }
                if(discount=="trainRoundTrip"){
                    $(".trainDateTittle,#trainReturnDate").css('color','#000');
                    $("#trainReturnDate").css('border','1px solid #000');
                    $("#trainReturnDate").val(getNextDay($("#trainDepartureDate").val()));
					$(".trainReturnSelect").css('border', '1px solid #000');
					$(".trainReturnSelect").removeAttr("disabled")
                    // $("#trainDepartureDate").val(GetDateStr(0));
                    // $("#trainReturnDate").val(GetDateStr(1));
                    $("#trainDepartureDate").datepicker('destroy');
                    dateChoose("trainDepartureDate","trainReturnDate");
                    $('.searchTrainBtn').attr('state','roundTrip')
                }
            });
        });
    $("#trainDepartureCity").kuCity();
    $("#trainArrivalCity").kuCity();
    $( "#trainDepartureDate").datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        minDate: TAminDate,  // 当前日期之后的 0 天，就是当天
        maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    });
    $("#trainDepartureDate").val(GetDateStr(0));
    $("#trainReturnDate").val(GetDateStr(1));
    $(".switchIconTrain").unbind("click").click(function(){
        cityConversion("trainDepartureCity","trainArrivalCity");
    })
    $(".searchTrainBtn").unbind("click").click(function(){
        if($('#trainDepartureCity').attr("code")&&$('#trainArrivalCity').attr("code")){
            // if(ProfileInfo.onlineStyle=="APPLE"){
                var cityList = '"'+$('#trainDepartureCity').attr("code")+'","'+$('#trainArrivalCity').attr("code")+'"';
                tools.appleRemindPop(cityList,4,netUserId,function(){searchTrain()});
            // }else{
            //     searchTrain();
            // }
            function searchTrain(){
                if($(".searchTrainBtn").attr("state") == "oneWay"){
					//整点
					if ($(".trainDepartureSelect  option:selected").val() == "all") {
						var DepartureSelectValue = ''
					} else {
						var DepartureSelectValue = ' ' + $(".trainDepartureSelect  option:selected").val() + ':00:00';
					}
                    var searchTrainInfo = {
                        'type':'oneWay',
                        'departureCityText':$('#trainDepartureCity').val(),
                        'arrivalCityText':$('#trainArrivalCity').val(),
                        'departureCity':$('#trainDepartureCity').attr("code"),
                        'arrivalCity':$('#trainArrivalCity').attr("code"),
                        'date':$('#trainDepartureDate').val(),
                        'queryKey':$('#trainDepartureCity').val()+','+$('#trainArrivalCity').val()+','+$('#trainDepartureDate').val()+',',
						'domqueryKey':$('#trainDepartureCity').attr('code') + ',' + $('#trainArrivalCity').attr('code') + ',' + $('#trainDepartureDate').val() + DepartureSelectValue+',' + $("#trainCabin").val()+ 'ALL',
                    }
                    $.session.set('searchTrainInfo', JSON.stringify(searchTrainInfo));
                    window.location.href='../../train/trainTicketList.html';
                }else if($(".searchTrainBtn").attr("state") == "roundTrip"){
					//整点
					if ($(".trainDepartureSelect  option:selected").val() == "all") {
						var DepartureSelectValue = ''
					} else {
						var DepartureSelectValue = ' ' + $(".trainDepartureSelect  option:selected").val() + ':00:00';
					}
					if ($(".trainReturnSelect option:selected").val() == "all") {
						var ReturnSelectValue = ''
					} else {
						var ReturnSelectValue = ' ' + $(".trainReturnSelect  option:selected").val() + ':00:00';
					}
                    var searchTrainInfo = {
                        'type':'roundTrip',
                        'departureCityText':$('#trainDepartureCity').val(),
                        'arrivalCityText':$('#trainArrivalCity').val(),
                        'departureCity':$('#trainDepartureCity').attr("code"),
                        'arrivalCity':$('#trainArrivalCity').attr("code"),
                        'date':$('#trainDepartureDate').val(),
                        'returndate':$('#trainReturnDate').val(),
                        'queryKey':$('#trainDepartureCity').val()+','+$('#trainArrivalCity').val()+','+$('#trainDepartureDate').val()+',',
                        'queryKeyReturn':$('#trainArrivalCity').val()+','+$('#trainDepartureCity').val()+','+$('#trainReturnDate').val()+',',
						'domqueryKey':$('#trainDepartureCity').attr('code') + ',' + $('#trainArrivalCity').attr('code') + ',' + $('#trainDepartureDate').val() + DepartureSelectValue+',' + $("#trainCabin").val()+ ',ALL',
						'domqueryKeyReturn':$('#trainArrivalCity').attr('code') + ',' + $('#trainDepartureCity').attr('code') + ',' + $('#trainReturnDate').val() +ReturnSelectValue+ ',' + $("#trainCabin").val()+ ',ALL',
                    }
                    $.session.set('searchTrainInfo', JSON.stringify(searchTrainInfo));
                    window.location.href='../../train/trainTicketList.html';
                }
            }
        }else{
            alert(get_lan('searchRemind'))
        }
    })
}
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
        minDate: departureValue,  // 当前日期之后的 0 天，就是当天
		maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    });
    $( "#"+departure).datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        minDate: TAminDate,  // 当前日期之后的 0 天，就是当天
        maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        onSelect:function(){
            $(".domDateTittle,.intlDateTittle,.trainDateTittle,#"+returnDate).css('color','#000');
            if(returnDate!="domReturnDate"){
                $("#"+returnDate).css('border','1px solid #000');
            }
            var departureValue = new Date($("#"+departure).val().replace(/-/g, "/"));
            $("#"+returnDate).datepicker('destroy');
            $("#"+returnDate).datepicker({
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
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
					var showLine=true
                    noTravelData.map(function(item,index){
                        console.log(item.OrderItems[0].ItemName.length)
						// 2020.1.10 只显示TAorderNo
						if(TAnumber!=undefined  && TAnumberIndex!=undefined && TAnumberIndex!=''){
							if(TAorderNo!=item.OrderNo){
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
	console.log(cityObj)
	// 是国内
	if(cityObj.type){
		$('#trainDepartureCity').attr('code',cityObj.ArriveCityCode)
		$('#trainDepartureCity').val($.session.get('obtLanguage')=="CN"?cityObj.ArriveCityCN:cityObj.ArriveCityEN)
		$('#trainArrivalCity').attr('code',cityObj.leaveCityCode)
		$('#trainArrivalCity').val($.session.get('obtLanguage')=="CN"?cityObj.leaveCityCN:cityObj.leaveCityEN)
		setTimeout(function(){
			$('#trainDepartureDate').val(Dateformat(cityObj.starTime,0))
			$('#trainReturnDate').val(Dateformat(cityObj.starTime,1))
		},100)
	}
}