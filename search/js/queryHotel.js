var netUserId = $.session.get('netLoginId');
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
var TAorderNo = $.session.get('TAorderNo');
var TAnumber = $.session.get('TAnumber');
var TAnumberIndex = $.session.get('TAnumberIndex');
console.log(ProfileInfo)

//货币单位
var curreny= ProfileInfo.OfficeCurrency? ProfileInfo.OfficeCurrency : ""

//当前最小日期
function nowMinDate(d){
	var t1=new Date(d.replace(/-/g,'/')).getTime()
	var newDate=new Date()
	var t2=newDate.getTime()
	return t1>t2?d:newDate.getFullYear()+'-'+parseInt(newDate.getMonth()+1)+'-'+newDate.getDate()
}
var TAminDate=0,TAmaxDate=365
	if(TAnumber!=undefined && TAnumber!="" && $.session.get('goOnBooktravelInfo')!=undefined && $.session.get('goOnBooktravelInfo')!=""){
		var goOnBooktravelInfo=JSON.parse($.session.get('goOnBooktravelInfo'));
		TAminDate=nowMinDate(goOnBooktravelInfo.starTime.split(" ")[0])
		TAmaxDate=goOnBooktravelInfo.endTime.split(" ")[0]
	}
	
$(function(){
    showContent();//内容展示
    searchBody();//搜索部分
    myOrderTableInfo();//我的订单
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
        'transit':"Transit",
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
    cn.searchBody.hotelKeyInput = "酒店名/苹果办公点";
    en.searchBody.hotelKeyInput = "Hotel name or Apple point of interest";
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
                <div class="myOrderTab orderTittleActive" style="margin: 0 56px 0 13px;cursor:pointer;">'+get_lan('table').myOrders+'</div>\
                <div class="pendTab hide" style="cursor:pointer;">'+get_lan('table').pendingApproval+'</div>\
                <div class="ApproveLengthIcon hide"></div>\
                <span style="position: absolute;right: 45px;" class="moreOrderText">\
                    '+get_lan('table').more+'\
                </span>\
                <img src="../index/images/rightArrow.png" class="rightArrow" linkState="myOrders"/>\
            </div>\
            <div class="autoCenter autoScrollY" id="tableBody">\
            </div>\
            <div class="reminder hide">\
                <div class="autoCenter">\
                    <span class="reminderText">'+get_lan('expiration')+'</span>\
                </div>\
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
    if(ProfileInfo.onlineStyle=="APPLE"){
        $(".newsBody").remove();
        $("footer").css("height","60px");
        $(".myOrderTab").text(get_lan("table").myTrips);
    }
    if(ProfileInfo.NeedApproval){
        $(".pendTab").removeClass("hide");
        $.ajax(
          {
            type:'post',
            url : $.session.get('ajaxUrl'), 
            dataType : 'json',
            data:{
                url: $.session.get('obtCompany')+"/OrderService.svc/ApproveListPost",
                jsonStr:'{"id":'+netUserId+',"Language":"'+$.session.get('obtLanguage')+'"}'
            },
            success : function(data) {
                if(data != ''){
                    var res = JSON.parse(data)
                    console.log(res);
                    var approveList = [];
                    res.map(function(item){
                        if(!item.IsHistory){
                            approveList.push(item);
                        }
                    })
                    if(approveList.length==0){
                        $(".ApproveLengthIcon").addClass("hide");
                    }else{
                        $(".ApproveLengthIcon").removeClass("hide");
                        $(".ApproveLengthIcon").text(approveList.length);
                    }
                }else{
                    alert(get_lan('accountRemind'));
                }
            },
            error : function() {
              // alert('fail');
            }
          }
        );
    }
    if(ProfileInfo.NoQueryOrder){
        $(".moreOrderText").hide();
        $(".rightArrow").hide();
    }
    //点击我的订单，待审核订单
    $(".myOrderTab").unbind('click').click(function(){
        $(".rightArrow").attr("linkState","myOrders");
        $(".myOrderTab,.pendTab").removeClass("orderTittleActive");
        $(".myOrderTab").addClass("orderTittleActive");
        myOrderTableInfo();
    })
    $(".pendTab").unbind('click').click(function(){
        $(".rightArrow").attr("linkState","approvals");
        $(".myOrderTab,.pendTab").removeClass("orderTittleActive");
        $(".pendTab").addClass("orderTittleActive");
        pendingApproval();
    })
    $(".rightArrow").unbind("click").click(function(){
        if($(this).attr("linkState")=="myOrders"){
            window.location.href = '../../orders/orders.html';
        }else if($(this).attr("linkState")=="approvals"){
            window.location.href = '../../application/queryApplication.html';
        }
    })
}
// 搜索界面
function searchBody(){
    $('.searchBody').html('\
        <ul class="tabBar flexRow">\
            <li class="tab Hotel">'+get_lan('searchBody').hotel+'</li>\
        </ul>\
        <div class="searchPage hotelBody">\
            <div class="hotelTabBar mainFontColor">\
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
                <input type="text" id="hotelPrice" value="0-5000'+curreny+'" minPrice="0" maxPrice="5000">\
                <div class="hotelPriceBody">\
                    <div class="hotelPriceLi" minPrice="0" maxPrice="5000">'+get_lan('searchBody').all+'</div>\
                    <div class="hotelPriceLi" minPrice="0" maxPrice="150">0-150'+curreny+'</div>\
                    <div class="hotelPriceLi" minPrice="151" maxPrice="300">151-300'+curreny+'</div>\
                    <div class="hotelPriceLi" minPrice="301" maxPrice="450">301-450'+curreny+'</div>\
                    <div class="hotelPriceLi" minPrice="451" maxPrice="600">451-600'+curreny+'</div>\
                    <div class="hotelPriceLi" minPrice="601" maxPrice="1000">601-1000'+curreny+'</div>\
                    <div class="hotelPriceLi" minPrice="1000" maxPrice="5000">1000+'+curreny+'</div>\
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
                <div class="dateTittle">'+get_lan('searchBody').hotelKeyWords+'</div>\
                <div class="flexRow" style="width:80%;">\
                <input type="text" id="keyWordInput" placeholder="'+get_lan('searchBody').hotelKeyInput+'">\
                </div>\
                <div class="keyWordBody autoScrollY"></div>\
            </div>\
            <div class="searchHotelBtn btnBackColor" state="domHotel" >'+get_lan('searchBody').search+'</div>\
        </div>\
        <div class="searchPage appleHotelBody hide">\
            <div class="hotelTabBar">\
                <span style="position:relative">\
                  <input type="radio" id="domHotel" name="applehotel" checked="checked"><label for="domHotel" style="margin-left:15px;cursor: pointer;">'+get_lan('searchBody').domHotel+'</label>\
                </span>\
                <span style="position:relative">\
                  <input type="radio" id="intlHotel" name="applehotel" style="margin-left:56px"><label for="intlHotel" style="margin-left:71px;cursor: pointer;">'+get_lan('searchBody').intlHotel+'</label>\
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
            <div class="hotelKey flexRow">\
                <div class="dateTittle">'+get_lan('searchBody').hotelKeyWords+'</div>\
                <div class="flexRow" style="width:80%;">\
                <input type="text" autocomplete="off" id="appleKeyWordInput" placeholder="'+get_lan('searchBody').hotelKeyInput+'">\
                </div>\
                <div class="keyWordBody"></div>\
            </div>\
            <div class="searchAppleHotelBtn" state="domHotel" >'+get_lan('searchBody').search+'</div>\
        </div>\
    ')
    //<option berthType="">'+get_lan('searchBody').cabins.cabin1+'</option>\
    $(".selectTimeStyle").remove();
    $("#hotelAddress").on('input propertychange',function(){
        $("#hotelAddress").removeAttr("key");
    })
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
            if(res.onlineStyle=="APPLE"){
                $('.hotelBody').remove();
                $('.appleHotelBody').removeClass("hide");
            }else{
                $(".appleHotelBody").remove();
            }
            chooseHotel();//酒店
        },
        error : function() {
          // alert('fail');
        }
      }
    );
	
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
						var hotelImg=''
						res.CompanyImageList.map(function(item){
							if(item.type==12){
								hotelImg=item.path
							}
						})
						if(hotelImg==""|| hotelImg==null){
							$('.bannerImg').attr('src','../search/images/bgImgHotel.jpg')
						}else{
							$('.bannerImg').attr('src',hotelImg)
						}
					}else{
						$('.bannerImg').attr('src','../search/images/bgImgHotel.jpg')
						// alert(res.errMsg)
					}
				},
				error: function() {
					// alert('fail');
				}
			});
	}
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
    //         if(ProfileInfo.HotelJumpHRS){
    //             window.open(ProfileInfo.HotelJumpHRS_Url);
    //             $(".tab").eq(0).click();
    //         }else{
    //             $('.hotelBody').show();
    //         }
    //     }else if($(this).hasClass('Train')){
    //         $('.trainBody').show();
    //     }else if($(this).hasClass('appleHotel')){
    //         $('.appleHotelBody').show();
    //     }
    //     else if($(this).hasClass('Visa')){
    //         $('.visaBody').show();
    //         // window.location.href='../visa/visaPage.html'
    //     }
    // })
}
//酒店
function chooseHotel(){
    $("input[name=hotel],input[name=applehotel]").each(function(){
            $(this).click(function(){
                var discount = $(this).attr('id');
                if(discount=="domHotel"){
                    $(".hotelCityChange").val('');
                    $(".hotelCityChange").removeAttr('code');
                    $(".hotelCityChange").removeAttr("id").attr("id","hotelCity");
                    $("#hotelCity").kuCity();
                    $('.searchHotelBtn').attr('state','domHotel');
                    $('.searchAppleHotelBtn').attr('state','domHotel');
                }
                if(discount=="intlHotel"){
                    $(".hotelCityChange").val('');
                    $(".hotelCityChange").removeAttr('code');
                    $(".hotelCityChange").removeAttr("id").attr("id","hotelIntlCity");
                    $("#hotelIntlCity").kuCity();
                    $('.searchHotelBtn').attr('state','intlHotel');
                    $('.searchAppleHotelBtn').attr('state','intlHotel');
                }
            });
        });
    $("#hotelCity").kuCity();
    if(goOnBooktravelInfo){
		$("#hotelDepartureDate").val(nowMinDate(goOnBooktravelInfo.starTime.split(" ")[0]));
		$("#hotelReturnDate").val(goOnBooktravelInfo.endTime.split(" ")[0]);
	}else{
		$("#hotelDepartureDate").val(GetDateStr(0));
		$("#hotelReturnDate").val(GetDateStr(1));
	}
    $("#hotelReturnDate").css('color','#000');
    $("#hotelReturnDate").css('border','1px solid #000');
    dateChoose("hotelDepartureDate","hotelReturnDate");

    if($.session.get('goOnBookHotelInfo')){
        var goOnBookHotelInfo = JSON.parse($.session.get('goOnBookHotelInfo'));
        console.log(goOnBookHotelInfo)
        if(goOnBookHotelInfo.type)
        {
			// var goOnBookHotelInfo = {
			// 						"ArriveCityCode": res.HotelCityCode,
			// 						"ArriveCity":obtLanguage=="EN"?res.HotelCityNameEN:res.HotelCityNameCN,
			// 						"ArrivesDate": res.TripStartTimeCN,
			// 						"leaveDate": res.TripEndTimeCN,
			// 						"type": res.itemIndex==0?false:true,//是否是国内
			// 					}
            $("#hotelCity").val(goOnBookHotelInfo.ArriveCity);
            $("#hotelCity").attr("code",goOnBookHotelInfo.ArriveCityCode);
        }else{
            $("#intlHotel").click();
            $("#hotelIntlCity").val(goOnBookHotelInfo.ArriveCity);
            $("#hotelIntlCity").attr("code",goOnBookHotelInfo.ArriveCityCode);
        }
        $("#hotelDepartureDate").val(goOnBookHotelInfo.ArrivesDate);
        $("#hotelReturnDate").val(goOnBookHotelInfo.leaveDate);
    }
    /*改变酒店金额*/
    $("#hotelPrice").unbind("change").change(function(){
        if($("#hotelPrice").val().indexOf("-") != -1){
            var hotelPriceList = $("#hotelPrice").val().substring(1,$("#hotelPrice").val().length).split('-');
            $("#hotelPrice").attr('minPrice',hotelPriceList[0]);
            $("#hotelPrice").attr('maxPrice',hotelPriceList[1]);
        }
    })

    $("input[name=hotelCheck]").each(function(){
            $(this).click(function(){
                if($(this).is(':checked')){
                   $(this).next(".star").css("color", "#F58A00");
                }else{
                    $(this).next(".star").css("color", "#000");
                }
            });
        });
    $("#keyWordInput").unbind("click").click(function(){
        if($(".searchHotelBtn").attr("state")=="domHotel"){
            var hotelCityCode = $('#hotelCity').attr("code");
        }else if($(".searchHotelBtn").attr("state")=="intlHotel"){
            var hotelCityCode = $('#hotelIntlCity').attr("code");
        }
        if(!hotelCityCode){
            $(".keyWordBody").html('');
            alert(get_lan('searchBody').keyWordRemind);
        }else{
            $("#keyWordInput").on('input propertychange',function(){
                $(".keyWordBody").html("");
                $.ajax(
                  { 
                    type:'post', 
                    url : $.session.get('ajaxUrl'),
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/QueryService.svc/SearchHotelRelatedInfoPost",
                        jsonStr:'{"cityCode":"'+hotelCityCode+'","id":'+netUserId+',"language":"'+obtLanguage+'","queryKey":"'+$("#keyWordInput").val()+'"}'
                    },
                    success : function(data) {
                        var res = JSON.parse(data);
                        // console.log(res);
                        $(".keyWordBody").html('<ul class="keyWordBodyList"></ul>');
                        res.RelatedInfos.map(function(item){
                            $(".keyWordBodyList").append('\
                                <li class="keyWordBodyLi" type="'+item.Type+'" relationId="'+item.ID+'">'+item.Content+'</li>\
                                ')
                        })
                        $(".keyWordBodyLi").on('mousedown',function(){
                            $("#keyWordInput").val($(this).text());
                            $("#keyWordInput").attr("relationId",$(this).attr("relationId"));
                            $("#keyWordInput").attr("hoteltype",$(this).attr("type"));
                            $(".keyWordBody").hide();
                        })
                    },
                    error : function() {
                      // alert('fail');
                    } 
                  } 
                );
            })
            $('body').mLoading("show");
            $.ajax(
              { 
                type:'post', 
                url : $.session.get('ajaxUrl'), 
                dataType : 'json',
                data:{
                    url: $.session.get('obtCompany')+"/QueryService.svc/GetHotelRelatedInfoPost",
                    jsonStr:'{"cityCode":"'+hotelCityCode+'","id":'+netUserId+',"language":"'+$.session.get('obtLanguage')+'"}'
                },
                success : function(data) {
                    $('body').mLoading("hide");
                    var res = JSON.parse(data);
                    console.log(res);
                    //推荐酒店
                    var hotelLength = res.HistoryHotelList.length>4?4:res.HistoryHotelList.length;
                    var hotelStr = '';
                    for(var i=0;i<hotelLength;i++){
                        if(obtLanguage=="CN"){
                            hotelStr+='<div class="relationLi" style="width:48%;" type="'+res.HistoryHotelList[i].Type+'" relationId="'+res.HistoryHotelList[i].ID+'">'+res.HistoryHotelList[i].NameCn+'</div>';
                        }else if(obtLanguage=="EN"){
                            hotelStr+='<div class="relationLi" style="width:48%;" type="'+res.HistoryHotelList[i].Type+'" relationId="'+res.HistoryHotelList[i].ID+'">'+res.HistoryHotelList[i].NameEn+'</div>';
                        }
                    }
                    //品牌
                    var brandLength = res.BrandList.length>8?8:res.BrandList.length;
                    var brandStr = '';
                    for(var i=0;i<brandLength;i++){
                        if(obtLanguage=="CN"){
                            brandStr+='<div class="relationLi" type="'+res.BrandList[i].Type+'" relationId="'+res.BrandList[i].ID+'">'+res.BrandList[i].NameCn+'</div>';
                        }else if(obtLanguage=="EN"){
                            brandStr+='<div class="relationLi" type="'+res.BrandList[i].Type+'" relationId="'+res.BrandList[i].ID+'">'+res.BrandList[i].NameEn+'</div>';
                        }
                    }
                    //行政区
                    var districtLength = res.DistrictList.length>8?8:res.DistrictList.length;
                    var districtStr = '';
                    for(var i=0;i<districtLength;i++){
                        if(obtLanguage=="CN"){
                            districtStr+='<div class="relationLi" type="'+res.DistrictList[i].Type+'" relationId="'+res.DistrictList[i].ID+'">'+res.DistrictList[i].NameCn+'</div>';
                        }else if(obtLanguage=="EN"){
                            districtStr+='<div class="relationLi" type="'+res.DistrictList[i].Type+'" relationId="'+res.DistrictList[i].ID+'">'+res.DistrictList[i].NameEn+'</div>';
                        }
                    }
                    //商圈
                    var commercialLength = res.CommercialList.length>8?8:res.CommercialList.length;
                    var commercialStr = '';
                    for(var i=0;i<commercialLength;i++){
                        if(obtLanguage=="CN"){
                            commercialStr+='<div class="relationLi" type="'+res.CommercialList[i].Type+'" relationId="'+res.CommercialList[i].ID+'">'+res.CommercialList[i].NameCn+'</div>';
                        }else if(obtLanguage=="EN"){
                            commercialStr+='<div class="relationLi" type="'+res.CommercialList[i].Type+'" relationId="'+res.CommercialList[i].ID+'">'+res.CommercialList[i].NameEn+'</div>';
                        }
                    }
                    //附属商圈
                    var extCommercialLength = res.ExtCommercialList.length>8?8:res.ExtCommercialList.length;
                    var extCommercialStr = '';
                    for(var i=0;i<extCommercialLength;i++){
                        if(obtLanguage=="CN"){
                            extCommercialStr+='<div class="relationLi" type="'+res.ExtCommercialList[i].Type+'" relationId="'+res.ExtCommercialList[i].ID+'">'+res.ExtCommercialList[i].NameCn+'</div>';
                        }else if(obtLanguage=="EN"){
                            extCommercialStr+='<div class="relationLi" type="'+res.ExtCommercialList[i].Type+'" relationId="'+res.ExtCommercialList[i].ID+'">'+res.ExtCommercialList[i].NameEn+'</div>';
                        }
                    }
                    $(".keyWordBody").html('\
                        <div class="relationBody">\
                          <div class="relationTittle flexRow">\
                            <div style="width:50%">'+get_lan('keyWordBody').hotel+'</div>\
                          </div>\
                          <div class="relationContent flexWrap">\
                            '+hotelStr+'\
                          </div>\
                        </div>\
                        <div class="relationBody">\
                          <div class="relationTittle flexRow">\
                            <div style="width:50%">'+get_lan('keyWordBody').brand+'</div>\
                          </div>\
                          <div class="relationContent flexWrap">\
                            '+brandStr+'\
                          </div>\
                        </div>\
                        <div class="relationBody">\
                          <div class="relationTittle flexRow">\
                            <div style="width:50%">'+get_lan('keyWordBody').district+'</div>\
                          </div>\
                          <div class="relationContent flexWrap">\
                            '+districtStr+'\
                          </div>\
                        </div>\
                        <div class="relationBody">\
                          <div class="relationTittle flexRow">\
                            <div style="width:50%">'+get_lan('keyWordBody').commercial+'</div>\
                          </div>\
                          <div class="relationContent flexWrap">\
                            '+commercialStr+'\
                          </div>\
                        </div>\
                        <div class="relationBody">\
                          <div class="relationTittle flexRow">\
                            <div style="width:20%">'+get_lan('keyWordBody').extCommercial+'</div>\
                          </div>\
                          <div class="relationContent flexWrap">\
                            '+extCommercialStr+'\
                          </div>\
                        </div>\
                    ')
                    $(".relationLi").on('mousedown',function(){
                        $("#keyWordInput").val($(this).text());
                        $("#keyWordInput").attr("relationId",$(this).attr("relationId"));
                        $("#keyWordInput").attr("hoteltype",$(this).attr("type"));
                        $(".keyWordBody").hide();
                    })
                },
                error : function() {
                  // alert('fail'); 
                } 
              } 
            );
        }
    })
    //苹果关键字
    $("#appleKeyWordInput").unbind("click").click(function(){
        if($(".searchAppleHotelBtn").attr("state")=="domHotel"){
            var hotelCityCode = $('#hotelCity').attr("code");
        }else if($(".searchAppleHotelBtn").attr("state")=="intlHotel"){
            var hotelCityCode = $('#hotelIntlCity').attr("code");
        }
        if(!hotelCityCode){
            $(".keyWordBody").html('');
            alert(get_lan('searchBody').keyWordRemind);
        }else{
            // $('body').mLoading("show");
            $.ajax(
              { 
                type:'post', 
                url : $.session.get('ajaxUrl'),
                dataType : 'json',
                data:{
                    url: $.session.get('obtCompany')+"/QueryService.svc/GetQueryHotelConditionPost",
                    jsonStr:'{"cityCode":"'+hotelCityCode+'","id":'+netUserId+',"language":"'+obtLanguage+'"}'
                },
                success : function(data) {
                    $('body').mLoading("hide");
                    var res = JSON.parse(data);
                    console.log(res);
                    $(".keyWordBody").html('<ul class="keyWordBodyList"></ul>');
                    res.infoList.map(function(item){
                        if(item.Address!=""){
                            $(".keyWordBodyList").append('\
                                <li class="keyWordBodyLi" type="'+item.Type+'" name="'+item.Name+'" address="'+item.Key+'">\
                                  <div class="keyWordBodyLiName" title="'+item.Name+'">'+item.Name+'</div>\
                                  <div class="keyWordBodyLiAddress" title="'+item.Address+'">'+item.Address+'</div>\
                                </li>\
                                ')
                        }
                    })
                    altRows(".keyWordBodyLi");
                    $(".keyWordBody").addClass("autoScrollY");
                    $("#appleKeyWordInput").off('input propertychange');
                    $("#appleKeyWordInput").on('input propertychange',function(){
                        $("#appleKeyWordInput").removeAttr("appleType");
                        $("#appleKeyWordInput").removeAttr('key');
                        $(".keyWordBodyList").html("");
                        console.log($("#appleKeyWordInput").val());
                        if($("#appleKeyWordInput").val()!=""){
                            res.infoList.map(function(item){
                                if(item.Name.toUpperCase().indexOf($("#appleKeyWordInput").val().toUpperCase()) != -1||item.Address.toUpperCase().indexOf($("#appleKeyWordInput").val().toUpperCase()) != -1){
                                    if(item.Address!=""){
                                        $(".keyWordBodyList").append('\
                                            <li class="keyWordBodyLi" type="'+item.Type+'" name="'+item.Name+'" address="'+item.Key+'">\
                                              <div class="keyWordBodyLiName" title="'+item.Name+'">'+item.Name+'</div>\
                                              <div class="keyWordBodyLiAddress" title="'+item.Address+'">'+item.Address+'</div>\
                                            </li>\
                                            ')
                                    }
                                }
                            })
                            altRows(".keyWordBodyLi");
                        }
                        clickKeyWordBodyLi();
                    })
                    clickKeyWordBodyLi();
                    function clickKeyWordBodyLi(){
                        $(".keyWordBodyLi").on('mousedown',function(){
                            $("#appleKeyWordInput").val($(this).attr("name"));
                            if($(this).attr("type")=="1"){
                                $("#appleKeyWordInput").attr("appleType","hotel");
                                $("#appleKeyWordInput").attr('key',$(this).attr("name"));
                            }else if($(this).attr("type")=="2"){
                                $("#appleKeyWordInput").attr("appleType","company");
                                $("#appleKeyWordInput").attr('key',$(this).attr("address"));
                            }
                            $(".keyWordBody").hide();
                        })
                    }
                },
                error : function() {
                  // alert('fail');
                }
              }
            );
        }
    })
    $("#hotelPrice").on('focus',function(){
        $(".hotelPriceBody").show();
    })
    .on('blur',function(){
        $(".hotelPriceBody").hide();
    })
    $(".hotelPriceLi").on('mousedown',function(){
        $("#hotelPrice").val($(this).text());
        $("#hotelPrice").attr("minPrice",$(this).attr("minPrice"));
        $("#hotelPrice").attr("maxPrice",$(this).attr("maxPrice"));
    })
    $("#keyWordInput,#appleKeyWordInput").on('focus',function(){
        $(".keyWordBody").show();
    })
    .on('blur',function(){
        $(".keyWordBody").hide();
    })
    $(".searchHotelBtn").unbind("click").click(function(){
        if($(this).attr("state")=="domHotel"){
            var hotelCityCode = $('#hotelCity').attr("code");
            var hotelCityText = $('#hotelCity').val();
            var hotelState = "domHotel";
        }else if($(this).attr("state")=="intlHotel"){
            var hotelCityCode = $('#hotelIntlCity').attr("code");
            var hotelCityText = $('#hotelIntlCity').val();
            var hotelState = "intlHotel";
        }
        if(hotelCityCode){
            var hotelAreaTypeID = $("#keyWordInput").attr("hoteltype")&&$("#keyWordInput").attr("hoteltype")!=5?$("#keyWordInput").attr("relationId")+'-'+$("#keyWordInput").attr("hoteltype"):'';
            var hotelname = !$("#keyWordInput").attr("hoteltype")||$("#keyWordInput").attr("hoteltype")==5?$("#keyWordInput").val().split(",").join(' '):'';
            if($(this).attr("state")=="domHotel"){
                if($("#hotelAddress").val()!=""){
                    if($("#hotelAddress").attr("key")){
                        var address = $("#hotelCity").val()+$("#hotelAddress").attr("key").split(",").join(' ');
                    }else{
                        var address = $("#hotelCity").val()+$("#hotelAddress").val().split(",").join(' ');
                    }
                }else{
                    var address = "";
                }
            }else if($(this).attr("state")=="intlHotel"){
                if($("#hotelAddress").val()!=""){
                    if($("#hotelAddress").attr("key")){
                        var address = $("#hotelIntlCity").val()+$("#hotelAddress").attr("key").split(",").join(' ');
                    }else{
                        var address = $("#hotelIntlCity").val()+$("#hotelAddress").val().split(",").join(' ');
                    }
                }else{
                    var address = "";
                }
            }
            var stars = '0-';
            console.log(stars);
            for(var i=0;i<$('input[name=hotelCheck]:checked').length;i++){
                stars += $('input[name=hotelCheck]:checked').eq(i).val();
                stars += '-';
            }
            stars = stars.substring(0,stars.length-1);
            var queryKey = hotelCityCode+','+hotelAreaTypeID+','+hotelname+','+address+','+$("#hotelDepartureDate").val()+','+$("#hotelReturnDate").val()+','+stars+','+$("#hotelPrice").attr("minPrice")+','+$("#hotelPrice").attr("maxPrice")+",1,1,1,2000,,";
            var searchHotelInfo = {
                'queryKey':queryKey,
                'hotelCode':hotelCityCode,
                'hotelCityText':hotelCityText,
                'hotelState':hotelState,
                'hotelAddressText':$("#hotelAddress").val(),
            }
            $.session.set('searchHotelInfo', JSON.stringify(searchHotelInfo));
            window.location.href='../../hotel/hotelList.html';
        }else{
            alert(get_lan('searchRemind'))
        }
    })
    //apple酒店查询
    $(".searchAppleHotelBtn").unbind("click").click(function(){
        if($(this).attr("state")=="domHotel"){
            var hotelCityCode = $('#hotelCity').attr("code");
            var hotelCityText = $('#hotelCity').val();
            var hotelState = "domHotel";
        }else if($(this).attr("state")=="intlHotel"){
            var hotelCityCode = $('#hotelIntlCity').attr("code");
            var hotelCityText = $('#hotelIntlCity').val();
            var hotelState = "intlHotel";
        }
        cityList = '"'+hotelCityCode+'"';
        tools.appleRemindPop(cityList,2,netUserId,function(){searchAppleHotel(hotelCityCode,hotelCityText,hotelState)});
        function searchAppleHotel(hotelCityCode,hotelCityText,hotelState){
            if(hotelCityCode){
                var hotelAreaTypeID = '';
                if(!$("#appleKeyWordInput").attr("appleType")||$("#appleKeyWordInput").attr("appleType")=="company"){
                    if(!$("#appleKeyWordInput").attr("appleType")&&$("#appleKeyWordInput").val()!=""){
                        var hotelname = $("#appleKeyWordInput").val()
                    }else{
                        var hotelname = "";
                    }
                }else if($("#appleKeyWordInput").attr("appleType")=="hotel"){
                    var hotelname = $("#appleKeyWordInput").attr("key");
                }
                var stars = '0-1-2-3-4-5';
                if(!$("#appleKeyWordInput").attr("appleType")||$("#appleKeyWordInput").attr("appleType")=="hotel"){
                    var address = "";
                }else if($("#appleKeyWordInput").attr("appleType")=="company"){
                    var address = $("#appleKeyWordInput").attr("key").split(",").join(" ");
                }
                // var queryKey = hotelCityCode+','+hotelAreaTypeID+','+hotelname+','+address+','+$("#hotelDepartureDate").val()+','+$("#hotelReturnDate").val()+','+stars+',0,5000,1,1,1,2000,,';
                // var searchHotelInfo = {
                //     'queryKey':queryKey,
                //     'hotelCode':hotelCityCode,
                //     'hotelCityText':hotelCityText,
                //     'hotelState':hotelState,
                //     'appleType':$("#appleKeyWordInput").attr("appleType"),
                //     'appleKey':$("#appleKeyWordInput").attr("key"),
                //     'appleValue':$("#appleKeyWordInput").val(),
                // }
                // $.session.set('searchHotelInfo', JSON.stringify(searchHotelInfo));
                // window.location.href='../../hotel/mapHotelList.html';
                $('body').mLoading("show");
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
                        if(res.HasManual){
                            maxFare = res.manualMaxFare;
                        }else{
                            maxFare = res.maxFare;
                        }
                        // $('body').mLoading("hide");
                        // $("#hotelPrice").val('￥'+res.minFare+'-'+res.maxFare);
                        // $("#hotelPrice").attr("minPrice",res.minFare);
                        // $("#hotelPrice").attr("maxPrice",res.maxFare);
                        var queryKey = hotelCityCode+','+hotelAreaTypeID+','+hotelname+','+address+','+$("#hotelDepartureDate").val()+','+$("#hotelReturnDate").val()+','+stars+','+res.minFare+','+maxFare+',1,1,1,2000,,';
                        var searchHotelInfo = {
                            'queryKey':queryKey,
                            'hotelCode':hotelCityCode,
                            'hotelCityText':hotelCityText,
                            'hotelState':hotelState,
                            'appleType':$("#appleKeyWordInput").attr("appleType"),
                            'appleKey':$("#appleKeyWordInput").attr("key"),
                            'appleValue':$("#appleKeyWordInput").val(),
                        }
                        $.session.set('searchHotelInfo', JSON.stringify(searchHotelInfo));
                        window.location.href='../../hotel/mapHotelList.html';
                    },
                    error : function() {
                    // alert('fail'); 
                    } 
                }
                );
            }else{
                alert(get_lan('searchRemind'))
            }
        }
    })
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
            if(returnDate!="domReturnDate"){
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
                            $("#hotelPrice").val(res.minFare+'-'+res.maxFare+curreny);
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
