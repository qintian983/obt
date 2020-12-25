var netUserId = $.session.get('netLoginId');
var obtLanguage = $.session.get('obtLanguage');
var TAorderNo = $.session.get('TAorderNo');
if($.session.get('intlTicketInfo')){
    var intlTicketInfo = JSON.parse($.session.get('intlTicketInfo'));
}
if($.session.get('searchIntlInfo')){
    var searchIntlInfo = JSON.parse($.session.get('searchIntlInfo'));
    console.log(searchIntlInfo)
}
var regPhone = tools.regPhone;

console.log(intlTicketInfo);
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));

//置顶，多出用到的参数
var goOptionID="" ,goCabinID="",backOptionID="",backCabinID=""
//货币单位
var curreny="￥"
$(function(){
   showContent();//内容展示
   clickBookBtn();
})
//中英文对象
var cn = {
    "remarkPop":{
        "businessTripTittle":"出差信息：",
        "remarkInfoTittle":"备注信息：",
        "tripNameTittle":"员工姓名",
        "tripCompanyTittle":"公司",
        "confirm":"确认",
        "cancel":"取消",
        "companyRemindTittle":"温馨提示",
        "companyRemindText":"因为您已更换出差公司，请确认更改后的公司抬头信息是否正确。",
        "Choose":"请选择",
        "search":"请搜索",
        "remarkRemind":"请将红色备注项填写完整",
        "remarkInfoRemind":"红色标志为必填项",
    },
    "passengerPop":{
        "popTittle":"乘客信息",
        "remind":"（'*'为必填项）",
        "chooseName":"选择购票姓名：",
        "nameRemind":"(购票姓名需与登机所持证件保持一致)",
        "popNameCn":"中文姓名:",
        "popNameEn":"英文姓名:",
        "ticketName":"购票姓名:",
        "popPhone":"手机号码:",
        "popMail":"邮箱:",
        "popDocuments":"证件信息:",
        "popDocumentsRemind":"请选择证件类型",
        "popDocumentsTime":"证件有效期:",
        "timeRemind":"请选择有效期",
        "popFrequentFlier":"常旅客卡:",
        "popFrequentFlierStart":"去程",
        "popFrequentFlierReturn":"回程",
        "clickRemind":"请正确填写",
        "phoneRemind":"手机号填写有误",
        "emailRemind":"邮箱信息填写有误",
    },
    "newCustomerPop":{
        "nick":"昵称:",
        "sex":"性别:",
        'male':"男",
        'female':"女",
        'nationality':"国籍:",
        'birthday':"生日:",
        "surname":"姓",
        "givenName":"名",
		"required":"为必填项",
    },
    "progressBar":{
        "search":"查询",
        "book":"预订",
        "complete":"完成",
    },
    "orderDetail":{
        "orderDetailTittle":"订单详情：",
        "weekDay":'周日, 周一, 周二, 周三, 周四, 周五, 周六',
        "reselection":"重新选择",
        "meal":"餐食",
        "cabin":"舱位",
        "planeType":"机型",
        "ticketPrice":"票价：",
        "tax":"税费：",
        "serviceFare":"代理服务费：",
        "stay":"停留:",
    },
    "passengerInfo":{
        "passengerTittle":"乘客信息",
        "remarks":"账单信息",
        "changePassengerInfo":"[修改信息]",
        "choosePassenger":"选择乘客",
        "selectPassengerRemind":"查找代订旅客 可输入姓名",
        "selectPassengerSearch":"搜索",
        "commonPassengers":"常用代订旅客",
        'delMsg':'是否删除该订单中此乘客?',
        'addNewCustomer':"[添加新乘客]",
    },
    "frequentCardsInfo":{
        "cardholder":"持卡人 : ",
        "number":"卡号 : ",
    },
    "serviceInfo":{
        "serviceTittle":"增值服务",
        "insuranceTittle":"出行保障",
        "person":"人",
    },
    "ricketOut":"预订后直接出票",
    "bookTicket":"预订",
    "bookTicketRemind":"请先选择乘客",
    "success":"预订成功！",
    "totalAmount":"总金额:",
    "lowestPrice":"最低票价:",
    "intlReason":"未选择最低票价理由:",
    "intlReasonRemind":"请选择",
    "reasonRemind":"请先选择理由",
    "intlRemind":"该价格目前无法预订，请选择其他价格或航班",
    "intlNotice1":"请核对您的姓名是否与护照、港澳通行证等国际通行证件一致，如不一致请联系服务小组，否则将无法登机。",
    "intlNotice2":"请确保您已获得目的地的有效签证，如果是转机航班也确保您已获得转机国的有效签证。",
    "InterSingleReason":"预订单程的原因",
    "documentRemind":"请正确填写证件号",
    "reasonText":"请填写理由",
    "airlineRemind":"请阅读并接受服务协议",
    "airlineRemind1":"我已阅读并同意",
    "airlineRemind2":"中国南方航空公司重要提示",
    "airlineRemind3":"2019年逾重行李价格",
}
var en = {
    "remarkPop":{
        "businessTripTittle":"Travel Information：",
        "remarkInfoTittle":"Remarks：",
        "tripNameTittle":"Employee Name",
        "tripCompanyTittle":"Company",
        "confirm":"Confirm",
        "cancel":"Cancel",
        "companyRemindTittle":"Kindly Reminder",
        "companyRemindText":"Because you have changed the travel company, please confirm whether the company's information is correct after the change.",
        "Choose":"Please Select",
        "search":"Please Search",
        "remarkRemind":"Please complete the mandatory remark.",
        "remarkInfoRemind":"The remark in red is mandatory.",
    },
    "passengerPop":{
        "popTittle":"Passenger Information",
        "remind":"（'*' Required field）",
        "chooseName":"Choose the name of passenger：",
        // "nameRemind":"(The name of ticket must be the same as  the travel document)",
        "nameRemind":"(Name on the ticket must be the same as it displays on the travel document)",
        "popNameCn":"Chinese Name:",
        "popNameEn":"English Name:",
        "ticketName":"Traveler:",
        "popPhone":"Phone:",
        "popMail":"Email:",
        "popDocuments":"Document:",
        "popDocumentsRemind":"Please select the type of certificate",
        "popDocumentsTime":"Validity:",
        "timeRemind":"Please choose the validity period.",
        "popFrequentFlier":"Loyalty Membership:",
        "popFrequentFlierStart":"Departe",
        "popFrequentFlierReturn":"Return",
        "clickRemind":"Please fill in correctly.",
        "phoneRemind":"Wrong phone number filling.",
        "emailRemind":"Wrong number of mailbox number.",
    },
    "newCustomerPop":{
        "nick":"Nick:",
        "sex":"Sex:",
        'male':"Male",
        'female':"Female",
        'nationality':"Nationality:",
        'birthday':"Birthday:",
        "surname":"Surname",
        "givenName":"Given Name",
		"required":"is required",
    },
    "progressBar":{
        "search":"Search",
        "book":"Book",
        "complete":"Complete",
    },
    "orderDetail":{
        "orderDetailTittle":"Order Details：",
        "weekDay":'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
        "reselection":"Modify",
        "meal":"Meal",
        "cabin":"Cabin",
        "planeType":"Aircraft",
        "ticketPrice":"Ticket Price:",
        "tax":"Tax:",
        "serviceFare":"Agent Service Fee:",
        "stay":"Layover:",
    },
    "passengerInfo":{
        "passengerTittle":"Traveler Information",
        "remarks":"Billing Information",
        "changePassengerInfo":"[Modify]",
        "choosePassenger":"Select Travelers",
        "selectPassengerRemind":"Enter First Name to search traveler",
        "selectPassengerSearch":"Search",
        "commonPassengers":"Common Travelers",
        'delMsg':'Do you want to remove this traveler from this order?',
        'addNewCustomer':"[Add New Travelers]",
    },
    "frequentCardsInfo":{
        "cardholder":"Name Of Cardholder : ",
        "number":"Number : ",
    },
    "serviceInfo":{
        "serviceTittle":"Value-added Service",
        "insuranceTittle":"Insurance",
        "person":"person",
    },
    "ricketOut":"Ticket Immediately",
    "bookTicket":"Book",
    "bookTicketRemind":"Please select travelers first.",
    "success":"Booking Successful!",
    "totalAmount":"Total:",
    "lowestPrice":"Lowest Logical Fare:",
    "intlReason":"Lowest Logical Fare Policy Violation:",
    "intlReasonRemind":"Please Select",
    "reasonRemind":"Please choose reasons first.",
    "intlRemind":"The price is not available at present. Please choose other prices or flights.",
    "intlNotice1":"Please check whether your name is consistent with international passports, Hong Kong and Macao passes and other international passes. If not, please contact the service team, otherwise you will not be able to board the plane.",
    "intlNotice2":"Please make sure that you have obtained valid destination VISA or when you take connecting flight please also make sure that you have obtained valid transit VISA when necessary.",
    "InterSingleReason":"Reason For Choosing One-way",
    "documentRemind":"Please fill the document no.",
    "reasonText":"Please fill in the reasons.",
    "airlineRemind":"Please read and accept the service agreement",
    "airlineRemind1":"I have read and agree with",
    "airlineRemind2":"China southern airlines' important tips",
    "airlineRemind3":"2019 excess baggage prices",
}
if(ProfileInfo.onlineStyle=="APPLE"){
    cn.remarkPop.remarkInfoRemind = "";
    en.remarkPop.remarkInfoRemind = "";
    cn.intlReason = "Out of Policy Reason  ";
    en.intlReason = "Out of Policy Reason  ";
    en.intlNotice1 = "";
    en.intlNotice2 = "Ensure that you have the correct documentation for travel. Please check whether your name is consistent with international passports, Hong Kong and Macao passes, visas and other international passes. If not, please contact Apple Travel. ";
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
function getWeek(dateStr){
    var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
    return get_lan('orderDetail').weekDay.split(',')[myDate.getDay()];
}
//内容展示
function showContent(){
    if(searchIntlInfo.type == 'oneWay'){
        var travelQueryKey = ",5,"+searchIntlInfo.departureCityText+","+searchIntlInfo.arrivalCityText+","+searchIntlInfo.date+",";
    }else if(searchIntlInfo.type == 'roundTrip'){
        var travelQueryKey = ",5,"+searchIntlInfo.departureCityText+","+searchIntlInfo.arrivalCityText+","+searchIntlInfo.date+","+searchIntlInfo.returndate;
    }else if(searchIntlInfo.type == 'multiple'){
        var travelQueryKey = ",5,"+searchIntlInfo.departureCityText+","+searchIntlInfo.arrivalCityText+","+searchIntlInfo.date+","+searchIntlInfo.returndate;
    }
    $(".remarkPop").html('\
        <div class="businessTripTittle tittleBackColor">'+get_lan('remarkPop').businessTripTittle+'</div>\
        <div class="businessTripBody"></div>\
        <div class="remarkInfoTittle tittleBackColor">'+get_lan('remarkPop').remarkInfoTittle+'</div>\
        <div style="padding-bottom:10px;border-bottom:1px solid #f3f3f3;">\
          <div class="remarkInfoBody autoScrollY"></div>\
        </div>\
        <div style="box-sizing:border-box;padding-left:20px;font-size:14px;height: 19px;line-height: 19px;" class="colorRed">'+get_lan('remarkPop').remarkInfoRemind+'</div>\
        <div class="remarkFooter flexRow"></div>\
        ')
    $("#main").html('\
        <div class="autoCenter">\
            <div class="progressBar flexRow activeFontColor"></div>\
            <div class="orderDetail" queryKey="'+travelQueryKey+'">\
            <div class="orderDetailTittle">'+get_lan('orderDetail').orderDetailTittle+'</div>\
            </div>\
            <div class="passengerInfo">\
                <div class="passengerTittle">'+get_lan('passengerInfo').passengerTittle+'</div>\
                <div class="passengerBody">\
                  <div class="choosePassengerBody flexRow activeFontColor"></div>\
                  <div class="passengerBar flexRow">\
                  <div class="passengerBarLi" style="width:250px;">'+get_lan('passengerPop').ticketName+'</div>\
                  <div class="passengerBarLi" style="width:150px;">'+get_lan('passengerPop').popPhone+'</div>\
                  <div class="passengerBarLi" style="width:200px;">'+get_lan('passengerPop').popMail+'</div>\
                  <div class="passengerBarLi" style="width:300px;">'+get_lan('passengerPop').popDocuments+'</div>\
                  <div class="passengerBarLi" style="width:170px;"></div>\
                  </div>\
                  <div class="passengerList">\
                  </div>\
                </div>\
            </div>\
            <div class="frequentCardsInfo hide">\
                <div class="frequentCardsTittle">'+get_lan('passengerPop').popFrequentFlier+'</div>\
                <div class="frequentCardsBody">\
                </div>\
            </div>\
            <div class="remindInfo">\
              <br><span class="activeFontColor intlNotice1">'+get_lan("intlNotice1")+'</span><br>\
              <span class="intlNotice2 mainFontColor">'+get_lan("intlNotice2")+'</span><br><br>\
            </div>\
            <div class="intlReasonBody">\
              <div class="intlReason flexRow">\
               <span class="resonTitle"> '+get_lan('intlReason')+'</span>\
                <select class="intlReasonSelect">\
                </select>\
                <input class="reasonText hide" placeholder="'+get_lan('reasonText')+'">\
              </div>\
            </div>\
            <div class="InterSingleReasonBody hide">\
              <div class="InterSingleReason">\
                '+get_lan('InterSingleReason')+'\
                <select class="InterSingleReasonSelect">\
                </select>\
              </div>\
            </div>\
            <div class="totalAmount">\
            '+get_lan("totalAmount")+'<span class="totalAmountText"></span>\
            </div>\
            <div class="someAirlineRemind hide">\
              <input type="checkbox" class="airlineRemindCheck">\
              '+get_lan("airlineRemind1")+' \
              <span class="airlineRemind2">'+get_lan("airlineRemind2")+'</span> 、 \
              <span class="airlineRemind3">'+get_lan("airlineRemind3")+'</span>\
            </div>\
            <div class="bookTicketBody flexRow">\
              <div class="ricketOutBody"></div>\
              <div class="bookTicketBtn btnBackColor">'+get_lan('bookTicket')+'</div>\
            </div>\
        </div>\
        ')
		if(TAorderNo!=undefined){
			console.log('隐藏')
			$('.menu .autoCenter').addClass('hide')
			$('.orderTittle').addClass('hide')
			$('.autoScrollY').addClass('hide')
			$('footer').addClass('hide')
			$('.menu').css("height",'40px')
		}
    $(".airlineRemind2").unbind("click").click(function(){
        window.open('../../tips/tip1.html');
    })
    $(".airlineRemind3").unbind("click").click(function(){
        window.open('../../tips/tip2.html');
    })
    $(".progressBar").html('\
        <div class="progressLine progressActiveBack"></div><div class="progressCircle progressActiveBack"></div><span class="progressActiveFont">'+get_lan('progressBar').search+'</span>\
        <div class="progressLine progressActiveBack"></div><div class="progressCircle progressActiveBack"></div><span class="progressActiveFont">'+get_lan('progressBar').book+'</span>\
        <div class="progressLine progressBackColor"></div><div class="progressCircle progressBackColor"></div>'+get_lan('progressBar').complete+'\
        ')
    $('body').mLoading("show");
    if(intlTicketInfo.type=="multiple"){
        var searchType = 'FR'
    }else if(intlTicketInfo.type=="oneWay"){
        var searchType = 'OW'
    }else if(intlTicketInfo.type=="roundTrip"){
        var searchType = 'RT'
    }
    if($.session.get('goOnBookOrderNo')){
        var BCN = $.session.get('goOnBookOrderNo');
    }else{
        var BCN = "";
    }

    if(ProfileInfo.onlineStyle=="APPLE"){
        $(".intlReason").append('\
            <div style="color:#000;margin-left:15px;">Or<span style="color:#3083fb;margin-left:30px;cursor:pointer;" class="reSelectText">Search again to book lower fare</span></div>\
            ')
    }
    
    $.ajax(
       {
         type:'post',
         url : $.session.get('ajaxUrl'), 
         dataType : 'json',
         data:{
            url: $.session.get('obtCompany')+"/QueryService.svc/InterAirRecommendNew",
            jsonStr:'{"request":{"segmentKey":"'+intlTicketInfo.segmentKey+'","goAirline":"'+intlTicketInfo.AirLineCode+'","searchType":"'+searchType+'","includeTax":"true","id":'+netUserId+',"Language":"'+obtLanguage+'","BCN":"'+BCN+'"}}'
         },
         success : function(data) {
            var res = JSON.parse(data);
			var resDate=JSON.parse(data)
            console.log(res);
            if(res.length==0){
                alert(get_lan("intlRemind"));
                window.history.back(-1);
                return false;
            }
            if(!res[0].canBookInterAir){
              $(".bookTicketBtn").attr("canBookInterAir","false");
              $(".bookTicketBtn").css("background-color","#979797");
            }
            $(".orderDetail").attr("airInfoTime",res[res.length-1].DateArrive.split(':').join('@')+'@00');
            var dstCode = '';
            res.map(function(rItem){
                rItem.InterSegments.map(function(item){
                    dstCode += item.AirportArriveCode;
                    dstCode += ',';
                })
            })
            // dstCode = res[0].InterSegments[0].AirportArriveCode+',';
            $(".orderDetail").attr("dstCode",dstCode.substring(0,dstCode.length-1));
            var airportCode = '';
            res.map(function(rItem){
                rItem.InterSegments.map(function(item){
                    airportCode += item.AirportDeparteCode;
                    airportCode += ',';
                    airportCode += item.AirportArriveCode;
                    airportCode += ',';
                })
            })

            airportCode.split(',').map(function(item){
                if(item=="KHH"||item=="LHN"||item=="TXG"||item=="RMQ"||item=="TNN"||item=="TPE"||item=="TSA"||item=="TTT"||item=="MZG"||item=="KNH"){
                    $(".bookTicketBtn").attr("tw","no");
                }
            })
            /*城市*/
            var cityList = '';
            res.map(function(rItem){
                rItem.InterSegments.map(function(item){
                    cityList += '"'+item.AirportDeparteCode+'"';
                    cityList += ',';
                    cityList += '"'+item.AirportArriveCode+'"';
                    cityList += ',';
                })
            })
			if(searchIntlInfo.type=="oneWay"){
				var searchCity=searchIntlInfo.queryKey.split(',')
				// cityList='"'+searchCity[0]+'","'+searchCity[1]+'"'
				cityList='"'+searchIntlInfo.departureCity+'","'+searchIntlInfo.arrivalCity+'"'
				cityList += ',';
			}
			if(searchIntlInfo.type=="roundTrip"){
				var searchCity=searchIntlInfo.queryKey.split(',')
				cityList='"'+searchIntlInfo.departureCity+'","'+searchIntlInfo.arrivalCity+'"'
				cityList += ',';
			}
			if(searchIntlInfo.type=="multiple"){
				var orgList=searchIntlInfo.orgList.split(",")//出发
				var dstList=searchIntlInfo.dstList.split(",")//到达
				cityList=""
				orgList.map(function(item,orgIndex){
					cityList=cityList+'"'+orgList[orgIndex]+'","'+dstList[orgIndex]+'"'
					cityList += ',';
				})
			}
            $(".orderDetail").attr("cityList",cityList.substring(0,cityList.length-1));
			
			var citys=''
			res.map(function(rItem){
				citys += rItem.Departure + ',' + rItem.Destination + ',';
			})
            $(".orderDetail").attr("citys",citys.substring(0,cityList.length-1));
			
            /*日期*/
            var timeList = '';
            res.map(function(rItem){
                rItem.InterSegments.map(function(item){
                    timeList += '"'+item.DateBegin.split(" ")[0]+'"';
                    timeList += ',';
                    timeList += '"'+item.DateEnd.split(" ")[0]+'"';
                    timeList += ',';
                })
            })
			if(searchIntlInfo.type=="oneWay"){
				var searchCity=searchIntlInfo.queryKey.split(',')
				// timeList='"'+searchCity[2].split(" ")[0]+'"'
				timeList='"'+searchIntlInfo.date+'"'
				timeList += ',';
			}
			if(searchIntlInfo.type=="roundTrip"){
				timeList='"'+searchIntlInfo.date+'","'+searchIntlInfo.returndate+'"'
				timeList += ',';
			}
			if(searchIntlInfo.type=="multiple"){
				var dateList=searchIntlInfo.dateList.split(",")
				timeList=""
				dateList.map(function(item,dateIndex){
					timeList=timeList+'"'+dateList[dateIndex].split(' ')[0]+'"'
					timeList += ',';
				})
			}
            $(".orderDetail").attr("timeList",timeList.substring(0,timeList.length-1));
            // $('body').mLoading("hide");
            surePassengerInfo(res);//旅客信息确认
            passengerPop();//个人信息弹窗
            res.map(function(item,index){
				curreny=item.Curreny
                $(".orderDetail").append('\
                    <div class="orderDetailBody flexRow">\
                        <div  class="orderDetailLeft">\
                        </div>\
                        <div class="orderDetailRight">\
                        </div>\
                    </div>\
                    ')
                $(".orderDetail").attr('totalPrice',parseInt(item.FaceValue)+parseInt(item.TaxValue)+parseInt(item.ServiceValue));
                $(".totalAmountText").html($(".orderDetail").attr('totalPrice')+'<span style="font-size:16px;">'+item.Curreny+'</span>');
                var showServiceFare = item.ServiceValue == 0?"hide":"";
                $(".orderDetailRight").eq(0).html('\
                    <div class="orderFareAmount flexRow"><div style="width:120px;">'+get_lan('orderDetail').ticketPrice+'</div><span class="mainFontColor" style="font-size:20px;">'+item.FaceValue+'</span>'+item.Curreny+'</div>\
                    <div class="orderTotalTax flexRow"><div style="width:120px;">'+get_lan('orderDetail').tax+'</div><span class="mainFontColor">'+item.TaxValue+item.Curreny+'</span></div>\
                    <div class="orderServiceFare flexRow '+showServiceFare+'"><div style="width:120px;">'+get_lan('orderDetail').serviceFare+'</div><span class="mainFontColor">'+item.ServiceValue+item.Curreny+'</span></div>\
                    ')
                item.InterSegments.map(function(sItem,sIndex){
                    if(sItem.MarketingCode=="CZ"&&ProfileInfo.onlineStyle!="APPLE"){
                        $(".someAirlineRemind").removeClass("hide");
                    }
                    var showStay = sItem.StayTime == ""?"hide":"";
                    var DepTerm = sItem.DepTerm==null||sItem.DepTerm==""?"":'('+sItem.DepTerm+')';
                    var ArrTerm = sItem.ArrTerm==null||sItem.ArrTerm==""?"":'('+sItem.ArrTerm+')';
                    var day = GetDateDiff(sItem.DateBegin.substring(0,10),sItem.DateEnd.substring(0,10));
                    var showDay = day == 0?'hide':'';
                	$(".orderDetailLeft").eq(index).append('\
                		<div class="orderDetailLeftBody">\
                          <div class="flexRow orderStayTime '+showStay+'">\
                            <div style="width:420px;height:9px;border-bottom:1px dashed #c2c2c2"></div>\
                            <div style="width:130px;text-align:center">'+get_lan('orderDetail').stay+' '+sItem.StayTime+'</div>\
                            <div style="width:420px;height:9px;border-bottom:1px dashed #c2c2c2"></div>\
                          </div>\
                		  <div class="orderDateStart">'+sItem.DateBegin+'</div>\
                		  <div class="orderAirLine" code="'+sItem.MarketingCode+'">'+sItem.Marketing+'</div>\
                		  <div class="orderFlightNo">'+sItem.FlightNo+'</div>\
                		  <div class="orderNewOrder"></div>\
                		  <div class="orderTimeStart mainFontColor">'+sItem.TimeStart+'</div>\
                		  <div class="orderArrowIcon"></div>\
                		  <div class="orderTimeArrive mainFontColor">'+sItem.TimeArrive+'</div>\
                          <div class="orderDay '+showDay+'">+'+day+'</div>\
                		  <div class="orderAirportDeparte">'+sItem.AirportDeparte+' '+DepTerm+'</div>\
                		  <div class="orderAirportArrive">'+sItem.AirportArrive+' '+ArrTerm+'</div>\
                		  <div class="orderCabin">'+get_lan('orderDetail').cabin+': '+sItem.Cabin+'</div>\
                		  <div class="orderPlaneType">'+get_lan('orderDetail').planeType+': '+sItem.PlaneType+'</div>\
                		</div>\
                		')
                })
            })
            
            function GetDateDiff(startDate,endDate)
            {
                var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();     
                var endTime = new Date(Date.parse(endDate.replace(/-/g,   "/"))).getTime();     
                var dates = Math.abs((startTime - endTime))/(1000*60*60*24);     
                return  dates;    
            }
            if(intlTicketInfo.type=="oneWay"&&ProfileInfo.InterSingleReason){
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'),
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/SystemService.svc/QuerySingleRemark",
                        jsonStr:'{"customerId":"'+ProfileInfo.customerId+'","type":"1"}'
                    },
                    success : function(data) {
                        // $('body').mLoading("hide");
                        var res = JSON.parse(data);
                        console.log(res);
                        res.Items.map(function(item){
                            $(".InterSingleReasonSelect").append('\
                                <option value="'+item.Key+'" Index="'+res.Index+'">'+item.Value+'</option>\
                            ')
                        })
                    },
                    error : function() {
                      // alert('fail');
                    }
                  }
                );
            }else{
                $(".InterSingleReasonBody").remove();
            }
            // if(!res[0].isShowReason){
            if(!res[0].isShowReason && !ProfileInfo.NeedSpecialPolicy){//方糖权限NeedSpecialPolicy 为true显示违反政策
                $(".intlReasonBody").remove();
            }else{
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'),
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/QueryService.svc/CheapestSegmentInter",
                        jsonStr:'{"id":'+netUserId+',"Language":"'+obtLanguage+'"}'
                    },
                    success : function(data) {
                        // $('body').mLoading("hide");
                        var res = JSON.parse(data);
                        console.log(res);
                        if(res.length>0){
                            $(".intlReason").css("border-bottom","1px solid #9b9b9b");
                            res.map(function(item){
                                item.InterSegments.map(function(sItem){
                                    $(".intlReasonBody").append('\
                                        <div class="intlReasonLi">\
                                          <div class="intlReasonLiDate">'+sItem.DateBegin+'</div>\
                                          <div class="intlReasonLiFlightNo">'+sItem.FlightNo+'</div>\
                                          <div class="intlReasonLiCompany">'+sItem.Marketing+'</div>\
                                          <div class="intlReasonLiDeparture" title="'+sItem.AirportDeparte+'">'+sItem.AirportDeparte+'</div>\
                                          <div class="intlReasonLiArrow"></div>\
                                          <div class="intlReasonLiDestination" title="'+sItem.AirportArrive+'">'+sItem.AirportArrive+'</div>\
                                          <div class="intlReasonLiTimeStart">'+sItem.TimeStart+'</div>\
                                          <div class="intlReasonLiTimeArrive">'+sItem.TimeArrive+'</div>\
                                        </div>\
                                    ')
                                })
                            })
                            $(".intlReason").append('\
                                <div class="intlReasonPrice"><span class="intlReasonPriceTittle">'+get_lan("lowestPrice")+'</span><span class="minPrice">'+(parseInt(res[0].Fare)+parseInt(res[0].TotalTax))+res[0].Curreny+'</span></div>\
                            ')
                        }
                        $(".intlReasonLi").eq($(".intlReasonLi").length-1).css("border","0");
						
						if(ProfileInfo.NeedSpecialPolicy && res.length>0){
							if(searchIntlInfo.type=='roundTrip'){
								// res 改成 resDate
								// intlTicketInfo.segmentKey="1000601,2000601-0"
								// goOptionID=res[0].SegID;
								// goCabinID=res[0].InterCabins[0].CabinID;
								// backOptionID=res[1].SegID;
								// backCabinID=res[1].InterCabins[0].CabinID;
								var cabin = intlTicketInfo.segmentKey.split(',')[1].split('-')[1];
								goOptionID=intlTicketInfo.segmentKey.split(',')[0];
								goCabinID=cabin;
								backOptionID=intlTicketInfo.segmentKey.split(',')[1].split('-')[0];
								backCabinID=cabin;
							}
							if(searchIntlInfo.type=='oneWay'){
								// goOptionID=res[0].SegID;
								// goCabinID=res[0].InterCabins[0].CabinID;
								goOptionID=intlTicketInfo.segmentKey.split('-')[0];
								goCabinID=intlTicketInfo.segmentKey.split('-')[1];
							}
							SwCheapestSegmentInter(goOptionID,goCabinID,backOptionID,backCabinID)
						}
						
                    },
                    error : function() {
                      // alert('fail');
                    }
                  }
                );
				
				function SwCheapestSegmentInter(goOptionID,goCabinID,backOptionID,backCabinID){
					var jsonStr={
						'id':netUserId.split('"')[1],
						'goOptionID':goOptionID.toString(),
						'goCabinID':goCabinID,
						'backOptionID':backOptionID.toString(),
						'backCabinID':backCabinID,
						'language':obtLanguage,
					}
					$.ajax(
					  {
					    type:'post',
					    url : $.session.get('ajaxUrl'),
					    dataType : 'json',
					    data:{
					        url: $.session.get('obtCompany')+"/QueryService.svc/SwCheapestSegmentInter",
					        // jsonStr:'{"id":'+netUserId+',"Language":"'+obtLanguage+'"}'
					        jsonStr:JSON.stringify(jsonStr)
					    },
					    success : function(data) {
					        // $('body').mLoading("hide");
					        var res = JSON.parse(data);
					        console.log(res);
							// var reasonIndex=0//显示第几条的理由，目前不需要这个逻辑
					        if(res.length>0){
								$('.resonTitle').text(res[0].DisplayMessage+":")
								$(".intlReasonSelect").html('<option value="">'+get_lan("intlReasonRemind")+'</option>')
								res[0].SwFavorableReasons.map(function(item){
									var DescriptionCn="",DescriptionEn="",Code=""
									for(var k in item){
										if(k=="<DescriptionCn>k__BackingField"){DescriptionCn=item[k]}
										if(k=="<DescriptionEn>k__BackingField"){DescriptionEn=item[k]}
										if(k=="<Code>k__BackingField"){Code=item[k]}
									}
									var Name=obtLanguage=="CN"?DescriptionCn:DescriptionEn
									$(".intlReasonSelect").append('\
										<option value="'+Code+'">'+Name+'</option>\
										')
								})
								// 推荐航班
								//删除原数据
								$('.intlReasonLi').remove()
								$('.intlReasonPrice').remove()
								
								res.map(function(item,index){
									// if(item.ReasonCodeType==3){
									// 	reasonIndex=index;
									// }
								    item.InterSegments.map(function(sItem){
								        $(".intlReasonBody").append('\
								            <div class="intlReasonLi">\
								              <div class="intlReasonLiDate">'+sItem.DateBegin+'</div>\
								              <div class="intlReasonLiFlightNo">'+sItem.FlightNo+'</div>\
								              <div class="intlReasonLiCompany">'+sItem.Marketing+'</div>\
								              <div class="intlReasonLiDeparture" title="'+sItem.AirportDeparte+'">'+sItem.AirportDeparte+'</div>\
								              <div class="intlReasonLiArrow"></div>\
								              <div class="intlReasonLiDestination" title="'+sItem.AirportArrive+'">'+sItem.AirportArrive+'</div>\
								              <div class="intlReasonLiTimeStart">'+sItem.TimeStart+'</div>\
								              <div class="intlReasonLiTimeArrive">'+sItem.TimeArrive+'</div>\
								            </div>\
								        ')
								    })
								})
								$(".intlReason").append('\
								    <div class="intlReasonPrice"><span class="intlReasonPriceTittle">'+get_lan("lowestPrice")+'</span><span class="minPrice">'+(parseInt(res[0].Fare)+parseInt(res[0].TotalTax))+res[0].Curreny+'</span></div>\
								')
						  
								//     $(".intlReason").append('\
								//         <div class="intlReasonPrice"><span class="intlReasonPriceTittle">'+get_lan("lowestPrice")+'</span><span class="minPrice">￥'+(parseInt(res[0].Fare)+parseInt(res[0].TotalTax))+'</span></div>\
								//     ')
					        }
							
							//违反政策理由
							
							
					        // $(".intlReasonLi").eq($(".intlReasonLi").length-1).css("border","0");
					    },
					    error : function() {
					      // alert('fail');
					    }
					  }
					);
				}
            }
            $(".orderNewOrder").eq(0).text(get_lan('orderDetail').reselection);
            $(".orderNewOrder").eq(0).unbind("click").click(function(){
                window.history.go(-$(".orderDetailBody").length);
            })
            $(".reSelectText").unbind("click").click(function(){
                window.history.go(-$(".orderDetailBody").length);
            })
            // $(".orderNewOrder").hide();//隐藏重新选择
            $(".orderDetail").attr("DeparteCity",res[0].Departure);
            $(".orderDetail").attr("ArriveCity",res[0].Destination);
            $(".orderDetail").attr("DateStart",res[0].DateStart.substring(0,10));
            $(".orderDetail").attr("DateReturn",'');
            if(intlTicketInfo.type == "roundTrip"){
                $(".orderDetail").attr("DateReturn",res[1].DateStart.substring(0,10));
            }
         },
         error : function() {
           // alert('fail');
         }
       }
    );
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
function surePassengerInfo(airlineInfo){
    $('body').mLoading("show");
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
            var passengerJson = JSON.parse(data);
            console.log(passengerJson);
            $(".intlReasonSelect").html('<option value="">'+get_lan("intlReasonRemind")+'</option>')
            passengerJson.AirDenyReasons.map(function(item){
                $(".intlReasonSelect").append('\
                    <option value="'+item.Code+'">'+item.Name+'</option>\
                    ')
            })
            $(".intlReasonSelect").change(function(){
                if($(this).val()=="OT"){
                    $(".reasonText").removeClass("hide");
                }else{
                    $(".reasonText").addClass("hide");
                }
				
				// 是否符合政策
				if(ProfileInfo.NeedSpecialPolicy){
					$('.newRemark').remove()
					if($('.intlReasonSelect').val()==""){
						//理论上删除新的remark行后不需要再弹窗，看需求
					}else{
						if(searchIntlInfo.type == 'oneWay'){
							var policyCodes=$('.intlReasonSelect').val()
						}else{
							var policyCodes=$('.intlReasonSelect').val()+","+$('.intlReasonSelect').val()
						}
						QuerySwRemark(passengerJson.CompanyID,policyCodes)
					}
					
				}
				
            })
            if(passengerJson.isDirectTicket){
                $(".ricketOutBody").html('<input type="checkbox" class="ricketOutCheckBox"><span style="margin-left:21px;">'+get_lan('ricketOut')+'</span>')
                $(".ricketOutCheckBox").prop("checked",true);
            }else{
                $(".ricketOutBody").html('');
            }
            $(".orderDetail").attr("CompanyID",passengerJson.CompanyID);
            $(".popNameCnText").text(passengerJson.CustomerCN);
            $(".popNameEnText").text(passengerJson.CustomerEN);
            $(".popNameCn .popNameRadio").attr("PassengerName",passengerJson.CustomerCN);
            $(".popNameEn .popNameRadio").attr("PassengerName",passengerJson.CustomerEN);
            var backAirline = airlineInfo.length == 2?airlineInfo[1].AirLineCode:"null"
            //全部
            if(!passengerJson.HasTravelRequest || passengerJson.HasTravelRequest){
                $('body').mLoading("show");
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'),
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/SystemService.svc/ShowMatchedPassengersPost",
                        jsonStr:'{"goAirline":"'+airlineInfo[0].AirLineCode+'","backAirline":"'+backAirline+'","newOrder":"0","key":'+netUserId+',"Language":"'+obtLanguage+'"}'
                    },
                    success : function(data) {
                        var res = JSON.parse(data);
                        console.log(res);
                        $('body').mLoading("hide");
                        //备注信息展示
                        var employeeName = obtLanguage =="CN"?passengerJson.CustomerCN:passengerJson.CustomerEN;
                        if(searchIntlInfo.alterTicketInfo&&!$.session.get('goOnBookOrderNo')){
                            employeeName = searchIntlInfo.alterTicketInfo.split(',')[8];
                            $(".remarkFooter").html('\
                                <div class="sureRemarkBtn btnBackColor" style="margin:0 auto;">'+get_lan('remarkPop').confirm+'</div>\
                            ')
                            $(".choosePassengerBody").addClass("hide");
                            var customerId = searchIntlInfo.alterTicketInfo.split(',')[0].split('_')[0];
                            if(!JSON.parse($.session.get('ProfileInfo')).HasTravelRequest||(passengerJson.HasTravelRequest&&passengerJson.SelectNoTrOption)){
                                remarkInfoPop(passengerJson.CompanyID,customerId,employeeName,"true");
                                // $.ajax(
                                //     {
                                //       type:'post',
                                //       url : $.session.get('ajaxUrl'), 
                                //       dataType : 'json',
                                //       data:{
                                //           url: $.session.get('obtCompany')+"/SystemService.svc/AddOrderCustomerPost",
                                //           jsonStr:'{"key":'+netUserId+',"companyId":"'+searchIntlInfo.alterTicketInfo.split(',')[2]+'","customerId":"'+customerId+'","remarks":"","isCopy":"false","language":"'+obtLanguage+'"}'
                                //       },
                                //       success : function(data) {
                                //           $('body').mLoading("hide");
                                //           var res = JSON.parse(data);
                                //           console.log(res); 
                                //           $(".orderDetail").attr("CompanyID",searchIntlInfo.alterTicketInfo.split(',')[2]);
                                //           if(res == "1"){
                                //               passengersInOrder();
                                //           }
                                //       },
                                //       error : function() {
                                //         // alert('fail');
                                //       }
                                //     }
                                //   );
                            }else{
                                __initIfTravelRequest(customerId);
                            }
                            
                        }else if($.session.get('goOnBookOrderNo')&&!searchIntlInfo.alterTicketInfo){
                            //继续预订
                            $('body').mLoading("show");
                            $(".choosePassengerBody").hide();
                            var queryKey = $(".orderDetail").attr("departecity")+","+$(".orderDetail").attr("arrivecity")+","+$(".orderDetail").attr("datestart")+","+$(".orderDetail").attr("datereturn");
                            var jsonStr={
                            	request:{
                            		"id":netUserId.split('"')[1],
                            		"bcn":$.session.get('goOnBookOrderNo'),
                            		"Language":obtLanguage,
                            		"itemID":"0",
                            		"queryKey":queryKey,
                            		"reginType":"I",
                            		"dstCode":$(".orderDetail").attr("dstCode")
                            	}
                            }
							$.ajax(
                              {
                                type:'post',
                                url : $.session.get('ajaxUrl'), 
                                dataType : 'json',
                                // data:{
                                //     url: $.session.get('obtCompany')+"/SystemService.svc/BookInOneOrderPost",
                                //     jsonStr:'{"id":'+netUserId+',"bcn":"'+$.session.get('goOnBookOrderNo')+'","Language":"'+obtLanguage+'","itemID":"0","queryKey":"'+queryKey+'"}'
                                // },
								data:{
								    url: $.session.get('obtCompany')+"/SystemService.svc/BookInOneOrderNew",
								    jsonStr:JSON.stringify(jsonStr)
								},
                                success : function(data) {
                                    $('body').mLoading("hide");
                                    var res = JSON.parse(data);
                                    console.log(res);
                                    $(".passengerList").html('');
                                    if(res.Message){
                                        alert(res.Message);
                                    }else{
                                        res.Customers.map(function(item,index){
                                            var profilePhone = ProfileInfo.HideMyPersonalInfo&&item.Phone!=""?"*******"+item.Phone.substring(item.Phone.length-4,item.Phone.length):item.Phone;
                                            $(".passengerList").append('\
                                                <div class="passengerLi flexRow" customerId="'+item.CustomerID+'">\
                                                <div class="passengerLiDiv" style="width:250px;"><span class="PassengerNameText">'+item.NameEN+'</span><span class="changePassengerInfo specificFontColor" index="'+index+'" customerId="'+item.CustomerID+'" style="margin-left:5px;cursor:pointer;">'+get_lan('passengerInfo').changePassengerInfo+'</span></div>\
                                                <div class="passengerLiDiv passengerPhone" style="width:150px;" hideNo="'+item.Phone+'">'+profilePhone+'</div>\
                                                <div class="passengerLiDiv" style="width:200px;">'+hideEmail(ProfileInfo,item.Email)+'</div>\
                                                <div class="passengerLiDiv passengerLiDocuments" style="width:300px;"><select class="documentsSelect" index="'+index+'"></select></div>\
                                                </div>\
                                                \
                                                ')
                                            item.DocumentsDetail.map(function(ditem){
                                                if(ditem.Rid!=1){
                                                    $(".documentsSelect").eq(index).append('\
														<option value="'+ditem.Rid+'" docText="'+ditem.DocumentNumber+'" name="'+ditem.DocNameEn+'" cName="'+item.NameEN+'" index="'+index+'" docDelId="'+ditem.delDocId+'">'+ditem.nameDoc+':<pre>'+tools.innerHtml(ditem.DocumentNumber)+'</pre></option>\
                                                    ')
                                                }
                                            })
                                        })
                                        $(".changePassengerInfo").unbind("click").click(function(){
                                            var customerId = $(this).attr("customerId");
                                            var index = parseInt($(this).attr("index"));
                                            var customerRid = $(".documentsSelect").eq(index).val();
                                            passengerPopChange(customerId,"false",customerRid);
                                        })
                                        for(var i=0;i<$(".documentsSelect").length;i++){
                                            if($(".documentsSelect").eq(i).find("option[value='2']").length==1){
                                                $(".documentsSelect").eq(i).val('2');
												var nameDoc=$(".documentsSelect").eq(0).find('option:checked').attr('name')
												var nameItem=$(".documentsSelect").eq(0).find('option:checked').attr('cname')
												var name=nameDoc!="" && nameDoc!=null?nameDoc:nameItem
												$('.PassengerNameText').eq(i).text(name)
                                            }else if($(".documentsSelect:eq("+i+") option").length==0){
                                                var customerId = $(".changePassengerInfo").eq(i).attr("customerId");
                                                passengerPopChange(customerId,"true",2);
                                            }
                                        }
										//修改名字
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
										// 11.26 显示常旅客卡
										// $('.frequentCardsInfo').show()
										passengersInOrder2()
                                        totalAmount();
                                    }
                                },
                                error : function() {
                                  // alert('fail');
                                }
                              } 
                            );
                        }else if(!searchIntlInfo.alterTicketInfo&&!$.session.get('goOnBookOrderNo')&&!$.session.get('TACustomerId')){
                            //有代订权限
                            if(res.length > 1){
                                if(!passengerJson.HasTravelRequest||(passengerJson.HasTravelRequest&&!$.session.get('TAnumber'))){
                                    $(".choosePassengerBody").html('\
                                        <div style="min-width:110px;margin-right:10px;">'+get_lan('passengerInfo').choosePassenger+'</div>\
                                        <div class="selectPassengerBody">\
                                        <input type="text" class="selectPassengerInput" autocomplete="off" placeholder="'+get_lan('passengerInfo').selectPassengerRemind+'">\
                                        <div class="selectPassengerSearch btnBackColor">'+get_lan('passengerInfo').selectPassengerSearch+'</div>\
                                        <div class="selectPassengerArrow">▼</div>\
                                        <div class="selectPassengerList autoScrollY"></div>\
                                        </div>\
                                        <span class="addNewCustomer hide">'+get_lan('passengerInfo').addNewCustomer+'</span>\
                                        ')
                                    // if(searchIntlInfo.alterTicketInfo){
                                    //     $(".choosePassengerBody").hide();
                                    //     $(".closeRemarkBtn").remove();
                                    //     $(".sureRemarkBtn").css("margin","0 auto");
                                    //     $(".ricketOutBody").html('');
                                    // }
                                    $(".remarkFooter").html('\
                                        <div class="closeRemarkBtn mainBackColor" style="margin-left:10%;">'+get_lan('remarkPop').cancel+'</div>\
                                        <div class="sureRemarkBtn btnBackColor" style="margin-left:38%;">'+get_lan('remarkPop').confirm+'</div>\
                                        ')
                                    closeRemarkPop();
                                    selectPassengers();
                                    /*添加新旅客*/
                                    $.ajax(
                                    {
                                        type:'post',
                                        url : $.session.get('ajaxUrl'), 
                                        dataType : 'json',
                                        data:{
                                            url: $.session.get('obtCompany')+"/SystemService.svc/CheckAddNewCustomerPost",
                                            jsonStr:'{"language":"'+obtLanguage+'","id":'+netUserId+'}'
                                        },
                                        success : function(data) {
                                            var res = JSON.parse(data);
                                            console.log(res);
                                            if(res.CanAddNewCustomer){
                                                $(".addNewCustomer").removeClass("hide");
                                                $(".addNewCustomer").unbind("click").click(function(){
                                                    newCustomerPop(res.CompanyId);
                                                    openNewCustomer();
                                                })
                                            }else{
                                                $(".addNewCustomer").remove();
                                            }
                                        },
                                        error : function() {
                                        // alert('fail');
                                        }
                                    } 
                                    );
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
                            else{
                                oneCustomer();
                                // 有审批单权限
                                if(passengerJson.HasTravelRequest&&!$.session.get('goOnBookOrderNo')&&!$.session.get('TAnumber')){
                                    __initIfTravelRequest();
                                }else{
                                    remarkInfoPop(passengerJson.CompanyID,passengerJson.ID,employeeName,"true");
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
                        }
                        function __initIfTravelRequest(passengerID){
                            var passengerID = passengerID || passengerJson.ID;
                            var city=$('.orderDetail').attr('citys')?$('.orderDetail').attr('citys'):"";
                            if(searchIntlInfo.type == "oneWay"){
                                city=""
                            }
                            var queryKey = passengerID+$(".orderDetail").attr("queryKey");
                            tools.customerTravelRequest(netUserId,queryKey,function(){
                                $(".requestCover").remove();
                                remarkInfoPop(passengerJson.CompanyID,passengerID,employeeName,"true");
                            },2,city)
                        }
                    },
                    error : function() {
                    }
                  } 
                );
            }else{
                $('body').mLoading("hide");
            }
        },
        error : function() {
          // alert('fail');
        }
      }
    );
}
/*代订*/
function selectPassengers(){
    $(".selectPassengerArrow").unbind("click").click(function(){
        if(!$(this).attr("spread")||$(this).attr("spread")=="no"){
            $(".selectPassengerList").html('\
                <div class="selectPassengerListTittle">'+get_lan('passengerInfo').commonPassengers+'</div>\
                ')
            $('.selectPassengerList').mLoading("show");
            $.ajax(
              {
                type:'post',
                url : $.session.get('ajaxUrl'),
                dataType : 'json',
                data:{
                    url: $.session.get('obtCompany')+"/SystemService.svc/GetCommonPassengersPost",
                    jsonStr:'{"key":'+netUserId+',"Language":"'+obtLanguage+'"}'
                },
                success : function(data) {
                    $('.selectPassengerList').mLoading("hide");
                    var res = JSON.parse(data);
                    console.log(res);
                    res.map(function(item){
                        var name = obtLanguage=="CN"?item.NameCN:item.NameEN;
                        $(".selectPassengerList").append('\
                            <div class="selectPassengerLi ellipsis" CompanyID="'+item.CompanyID+'" searchId="'+item.ID+'" employeeName="'+item.NameCN+'">'+name+'('+hideEmail(ProfileInfo,item.Email)+')'+'</div>\
                            ')
                    })
                    clickPassengerLi();
                },
                error : function() {
                }
              } 
            );
            $(".selectPassengerList").css("display","block");
            $(this).attr("spread","yes");
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
        var queryKeys = obtLanguage+","+$(".selectPassengerInput").val();
        $('.selectPassengerList').mLoading("show");
		// 有没有已选中乘客
		var haveCustomer=$('.passengerLi').length
		if(haveCustomer>0){
			var request={key:netUserId.split("\"")[1],Language:queryKeys,GoAirline:"null",BackAirline:"null",NewOrder:'1',CompanyId:$('.passengerLi').eq(0).attr('companyid'),ReginType:"",DstCode:""}
			var data={
			    url: $.session.get('obtCompany')+"/SystemService.svc/ShowMatchedPassengerList",
			    jsonStr:'{"request":'+JSON.stringify(request)+'}'
			}
		}else{
			var request={key:netUserId.split("\"")[1],Language:queryKeys,GoAirline:"null",BackAirline:"null",NewOrder:'1',CompanyId:"",ReginType:"",DstCode:""}
			var data={
			    url: $.session.get('obtCompany')+"/SystemService.svc/ShowMatchedPassengerList",
			    jsonStr:'{"request":'+JSON.stringify(request)+'}'
			}
			// var data={
		 //        url: $.session.get('obtCompany')+"/SystemService.svc/ShowMatchedPassengersPost",
		 //        jsonStr:'{"goAirline":"null","backAirline":"null","newOrder":"1","key":'+netUserId+',"Language":"'+queryKeys+'"}'
		 //    }
		}
		console.log(data)
		
		
        $.ajax(
          {
            type:'post',
            url : $.session.get('ajaxUrl'), 
            dataType : 'json',
            data:data,
            success : function(data) {
                $('.selectPassengerList').mLoading("hide");
                var res = JSON.parse(data);
                console.log(res);
                $(".selectPassengerList").html('');
                res.map(function(item){
                    var name = obtLanguage=="CN"?item.NameCN:item.NameEN;
                    $(".selectPassengerList").append('\
                        <div class="selectPassengerLi ellipsis" CompanyID="'+item.CompanyID+'" searchId="'+item.ID+'" employeeName="'+item.NameCN+'">'+name+'('+hideEmail(ProfileInfo,item.Email)+')'+'</div>\
                        ')
                })
                clickPassengerLi();
            },
            error : function() {
              // alert('fail');
            }
          } 
        );
    })
    function clickPassengerLi(){
        $(".selectPassengerLi").unbind("click").click(function(){
            $('body').mLoading("show");
            $(".selectPassengerList").css("display","none");
            if(JSON.parse($.session.get('intlTicketInfo')).type == "oneWay"){
                var queryKey = $(this).attr("searchId")+',5,'+$(".orderDetail").attr("DeparteCity")+','+$(".orderDetail").attr("ArriveCity")+','+$(".orderDetail").attr("DateStart")+',';
            }
            else if(JSON.parse($.session.get('intlTicketInfo')).type == "roundTrip"){
                var queryKey = $(this).attr("searchId")+',5,'+$(".orderDetail").attr("DeparteCity")+','+$(".orderDetail").attr("ArriveCity")+','+$(".orderDetail").attr("DateStart")+','+$(".orderDetail").attr("DateReturn");
            }else if(JSON.parse($.session.get('intlTicketInfo')).type == "multiple"){
                var queryKey = $(this).attr("searchId")+',5,'+$(".orderDetail").attr("DeparteCity")+','+$(".orderDetail").attr("ArriveCity")+','+$(".orderDetail").attr("DateStart")+','+$(".orderDetail").attr("DateReturn");
            }
            var CompanyID = $(this).attr("CompanyID");
			
			// 12.17修改
			var haveCustomer=$('.passengerLi').length
			if(haveCustomer>0){
			console.log(CompanyID)
			console.log($('.passengerLi').eq(0).attr('companyid'))
				if(CompanyID!=$('.passengerLi').eq(0).attr('companyid')){
					var CNStr="当前乘机人与其他乘机人不属于同一公司账户/支付方式不同，请分别预订。"
					var ENStr="This traveler is not under the same company account/legal entity、or payment method with others. Please book separately."
					if(obtLanguage=="CN"){
						alert(CNStr)
					}else{
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
			var city=$('.orderDetail').attr('citys')?$('.orderDetail').attr('citys'):""
            if(JSON.parse($.session.get('ProfileInfo')).HasTravelRequest&&$('.passengerLi').length==0){
				if(searchIntlInfo.type == "oneWay"){
					city=""
				}
                tools.customerTravelRequest(netUserId,queryKey,function(){
                    $(".requestCover").remove();
                    if($(".passengerLi").length == 0){
                        remarkInfoPop(CompanyID,customerId,employeeName,"true");
                    }else{
                        remarkInfoPop($(".passengerLi").eq(0).attr("companyId"),customerId,employeeName,"true");
                    }
                },1,city)
            }else{
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
/*备注信息弹窗*/
function remarkInfoPop(CompanyID,CustomerID,employeeName,isFirst){
    $('body').mLoading("show");
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/SystemService.svc/CurrentPassengersInOrderPost",
            jsonStr:'{"key":'+netUserId+',"Language":"'+obtLanguage+'"}'
        },
        success : function(data) {
            $('body').mLoading("hide");
            var res = JSON.parse(data);
            console.log(res);
			//弹窗中的用户名，需求未知
			var serverName=""
			if(res.length>0){
				serverName=obtLanguage=="CN"?res[0].NameCN:res[0].NameEN;
			}
			employeeName= serverName?serverName:employeeName;
			
            if(res.length==0){
                $(".businessTripBody").html('\
                    <div class="businessTripLi flexRow">\
                    <div class="tripLiTittle">'+get_lan('remarkPop').tripNameTittle+'</div>\
                    <div class="employeeName">'+employeeName+'</div>\
                    </div>\
                    <div class="businessTripLi flexRow">\
                    <div class="tripLiTittle">'+get_lan('remarkPop').tripCompanyTittle+'</div>\
                    <select class="chooseCompany">\
                    </select>\
                    </div>\
                    <div class="companyRemind hide">\
                      <div class="companyRemindTittle">'+get_lan('remarkPop').companyRemindTittle+'</div>\
                      <div class="companyRemindText">'+get_lan('remarkPop').companyRemindText+'</div>\
                    </div>\
                ')
                $('body').mLoading("show");
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'), 
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/SystemService.svc/HasBGMCPost",
                        jsonStr:'{"key":'+netUserId+',"customerId":"'+CustomerID+'","Language":"'+obtLanguage+'"}'
                    },
                    success : function(data) {
                        var res = JSON.parse(data);
                        console.log(res);
                        $('body').mLoading("hide");
                        if(res.length==0){
                            $(".businessTripLi").eq(1).hide();
                        }
                        res.map(function(item){
                            if(item.CompanyId==JSON.parse($.session.get('ProfileInfo')).companyId){
                                $(".chooseCompany").append('\
                                    <option value="'+item.CompanyId+'">'+item.CompanyName+'</option>\
                                ')
                            }
                        })
                        res.map(function(item){
                            if(item.CompanyId!=JSON.parse($.session.get('ProfileInfo')).companyId){
                                $(".chooseCompany").append('\
                                    <option value="'+item.CompanyId+'">'+item.CompanyName+'</option>\
                                ')
                            }
                        })
                        $(".chooseCompany").change(function(){
                            var changeCompanyId=$('.chooseCompany option:selected').val();
                            if(changeCompanyId!=$('.chooseCompany option').eq(0).val()){
                                $(".companyRemind").removeClass("hide");
                            }else{
                                $(".companyRemind").addClass("hide");
                            }
                            getNewRemark(CustomerID,changeCompanyId,isFirst)
                        })
                        getNewRemark(CustomerID,CompanyID,isFirst)
                    },
                    error : function() {
                      // alert('fail');
                    }
                  } 
                );
            }else{
                $(".businessTripBody").html('\
                    <div class="businessTripLi flexRow">\
                    <div class="tripLiTittle">'+get_lan('remarkPop').tripNameTittle+'</div>\
                    <div class="employeeName">'+employeeName+'</div>\
                    </div>\
                    ')
                getNewRemark(CustomerID,CompanyID,isFirst);
            }
        },
        error : function() {
          // alert('fail');
        }
      }
    );
    function getNewRemark(CustomerID,CompanyId,isFirst){
        $('body').mLoading("show");
        if($.session.get('TAnumber')){
            var queryKey = CustomerID+$(".orderDetail").attr("queryKey");
            tools.getTravelRequestRemark(netUserId,queryKey,function(data){
                var res = JSON.parse(data);
                console.log(res.Remarks);
                remark(res.Remarks,CustomerID,ProfileInfo.CompanyID,"true");
            })
        }else{
            if(isFirst=="true"){
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'), 
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/SystemService.svc/GetRemarkConfigInfoNew",
                        jsonStr:'{"request":{"customerId":'+CustomerID+',"companyID":"'+CompanyId+'","key":'+netUserId+',"tripType":"INTER"}}'
                    },
                    success : function(data) {
                        var res = JSON.parse(data);
                        console.log(res);
                        $('body').mLoading("hide");
                        remark(res,CustomerID,CompanyId,isFirst);
                    },
                    error : function() {
                      // alert('fail');
                    }
                  } 
                );
            }else if(isFirst=="false"){
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'), 
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/SystemService.svc/GetOrderCustomerRemark",
                        jsonStr:'{"id":'+netUserId+',"customerId":"'+CustomerID+'","companyID":"'+CompanyId+'"}'
                    },
                    success : function(data) {
                        var res = JSON.parse(data);
                        console.log(res);
                        $('body').mLoading("hide");
                        remark(res,CustomerID,CompanyId,isFirst);
						setTimeout(function(){
							// remark(res,CustomerID,CompanyId,'false',true);
							if(searchIntlInfo.type == 'oneWay'){
								var policyCodes=$('.intlReasonSelect').val()
							}else{
								var policyCodes=$('.intlReasonSelect').val()+","+$('.intlReasonSelect').val()
							}
							QuerySwRemark(CompanyId,policyCodes)
						},100)
                    },
                    error : function() {
                      // alert('fail');
                    }
                  } 
                );
            }
        }
    }
    openRemarkPop();
}
//SW  方糖获取更多remark
function QuerySwRemark(CompanyId,policyCodes){
	var type=""
	if(intlTicketInfo.type=='roundTrip'){
		type="I2"
	}
	if(intlTicketInfo.type=='oneWay'){
		type="I1"
	}
	var jsonStr={
		"request":{
			"id":netUserId.split('"')[1],
			"companyId":CompanyId,
			"goOptionID":goOptionID+"","goCabinID":goCabinID,
			"backOptionID":backOptionID+"","backCabinID":backCabinID,
			"language":obtLanguage,
			"type":type,
			"policyCodes":policyCodes.split(',')
			}
		}
	$.ajax(
	  {
	    type:'post',
	    url : $.session.get('ajaxUrl'), 
	    dataType : 'json',
	    data:{
	        url: $.session.get('obtCompany')+"/QueryService.svc/QuerySwRemarkList",
			jsonStr:JSON.stringify(jsonStr)
	    },
		//goOptionID
	    success : function(data) {
	        var res = JSON.parse(data);
	        console.log(res);
	        $('body').mLoading("hide");
			var CustomerID = $('.passengerLi').eq(0).attr('customerid') 
			$('.newRemark').remove()//无论有无数据，都删除新remark；
			if(res.length==0){
				//没有数据，不再弹窗
				//remarkInfoPop(CompanyId,CustomerID,"UserName","false")
			}else{
				openRemarkPop()//打开remark,重新跑一遍接口
				// $.ajax(
				//   {
				//     type:'post',
				//     url : $.session.get('ajaxUrl'), 
				//     dataType : 'json',
				//     data:{
				//         url: $.session.get('obtCompany')+"/SystemService.svc/GetOrderCustomerRemark",
				//         jsonStr:'{"id":'+netUserId+',"customerId":"'+CustomerID+'","companyID":"'+CompanyId+'"}'
				//     },
				//     success : function(data) {
				//         var oldres = JSON.parse(data);
				//         console.log(oldres);
				//         $('body').mLoading("hide");
				//         remark(oldres,CustomerID,CompanyId,"false");
						openRemarkPop()
						setTimeout(function(){
							remark(res,CustomerID,CompanyId,'false',true);
						},100)
				//     },
				//     error : function() {
				//       // alert('fail');
				//     }
				//   } 
				// );
			}
	    },
	    error : function() {
	      // alert('fail');
	    }
	  } 
	);
}
function remark(remarks,CustomerID,CompanyID,isFirst,newRemark){
		//方糖 新remark 
		var remarkClass="",newSelect="",newInput=""
		if(newRemark){
			remarkClass="newRemark"
			newSelect="newSelect"
			newInput="newInput"
		}else{
			$(".remarkInfoBody").html('');
		}
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
                <div class="remarkLi flexRow '+ remarkClass +'">\
                  <div id="liTittle'+item.Index+'" class="liTittle '+colorRed+'" title="'+item.Title+'">'+starIcon+item.Title+'</div>\
                  <div class="liContent" index="'+item.Index+'"><input id="remarkInput'+item.Index+'" class="remarkLiInput '+newInput+'" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'" key="'+item.SubmitContent+'" disabled></div>\
                </div>\
            ')
        }else if(item.CanModify&&item.InList){
            if(!item.ListCanSearch){
                $(".remarkInfoBody").append('\
                    <div class="remarkLi flexRow '+ remarkClass +'">\
                      <div id="liTittle'+item.Index+'" class="liTittle '+colorRed+'" title="'+item.Title+'">'+starIcon+item.Title+'</div>\
                      <div class="liContent" index="'+item.Index+'">\
                        <select class="remarkSelect '+newSelect+'" index="'+index+'" id="remarkSelect'+item.Index+'">\
                          <option>'+get_lan("remarkPop").Choose+'</option>\
                        </select>\
                        <input id="remarkInput'+item.Index+'" class="remarkLiInput '+newInput+'" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'" key="'+item.SubmitContent+'" readonly placeholder="'+get_lan("remarkPop").Choose+'">\
                      </div>\
                    </div>\
                ')
            }else{
                $(".remarkInfoBody").append('\
                    <div class="remarkLi flexRow '+ remarkClass +'">\
                      <div id="liTittle'+item.Index+'" class="liTittle '+colorRed+'" title="'+item.Title+'">'+starIcon+item.Title+'</div>\
                      <div class="liContent" index="'+item.Index+'">\
                        <select class="remarkSelect '+newSelect+'" index="'+index+'" id="remarkSelect'+item.Index+'">\
                          <option>'+get_lan("remarkPop").Choose+'</option>\
                        </select>\
                        <input class="remarkLiInput '+newInput+'" CompanyID="'+CompanyID+'" id="remarkInput'+item.Index+'" require="'+colorRed+'" value="'+item.Content+'" index="'+item.Index+'"  key="'+item.SubmitContent+'" placeholder="'+get_lan("remarkPop").search+'">\
                      </div>\
                    </div>\
                ')
                $("#remarkInput"+item.Index+"").searchRemark();
            }
        }else if(item.CanModify&&!item.InList){
            $(".remarkInfoBody").append('\
                <div class="remarkLi flexRow '+ remarkClass +'">\
                  <div id="liTittle'+item.Index+'" class="liTittle '+colorRed+'" title="'+item.Title+'">'+starIcon+item.Title+'</div>\
                  <div class="liContent" index="'+item.Index+'">\
                    <select class="remarkSelect '+newSelect+'" index="'+index+'">\
                      <option>'+get_lan("remarkPop").Choose+'</option>\
                    </select>\
                    <input id="remarkInput'+item.Index+'" CompanyID="'+CompanyID+'" class="remarkLiInput '+newInput+'" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'" key="">\
                  </div>\
                </div>\
            ')
                    // <input id="remarkInput'+item.Index+'" CompanyID="'+CompanyID+'" class="remarkLiInput" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'" key="'+item.SubmitContent+'">
        }
    })
    // 红的提示字 是否显示
    if(!redTips && ProfileInfo.onlineStyle!="APPLE"){
        $('.colorRed').hide()
    }
	var selectLength=0
	if(newRemark){
		selectLength=$(".newSelect").length
	}else{
		selectLength=$(".remarkSelect").length
	}
    for(var i=0;i<selectLength;i++){
		if(newRemark){
			var index = parseInt($(".newSelect").eq(i).attr("index"));
		}else{
			var index = parseInt($(".remarkSelect").eq(i).attr("index"));
		}
        // console.log(index);
        if(remarks[index].Items.length!=0){
            remarks[index].Items.map(function(item){
                var itemValue = item.Value==null||item.Value==""?item.Key:item.Value;
				if(newRemark){
					$(".newSelect").eq(i).append('\
							<option class="remarkOption" key="'+item.Key+'" index="'+index+'">'+itemValue+'</option>\
							')
				}else{
					$(".remarkSelect").eq(i).append('\
						<option class="remarkOption" key="'+item.Key+'" index="'+index+'">'+itemValue+'</option>\
						')
				}
            })
        }else{
			if(newRemark){
				$(".newSelect").eq(i).hide();
			}else{
				$(".remarkSelect").eq(i).hide();
			}
        }
        
        // var inputIndex = parseInt($(".remarkSelect").eq(i).find("option:selected").attr("index"));
        // $(".remarkLiInput").eq(inputIndex).val($(".remarkSelect").eq(i).find("option:selected").text());
        $(".remarkSelect").eq(i).change(function(){
            var index = parseInt($(this).find("option:selected").attr("index"));
			$(".remarkLiInput").eq(index).val($(this).find("option:selected").text());
			$(".remarkLiInput").eq(index).attr('key',$(this).find("option:selected").attr("key"));
        })
		$(".newSelect").eq(i).change(function(){
		    var index = parseInt($(this).find("option:selected").attr("index"));
				$(".newInput").eq(index).val($(this).find("option:selected").text());
				$(".newInput").eq(index).attr('key',$(this).find("option:selected").attr("key"));
		})
		
    }
    //选择remark关联其他remark
    $(".remarkSelect").change(function(){
        // console.log($(this).find("option:selected").attr("key"));
        // console.log($(this).find("option:selected").attr("index"));
        var selectKey = $(this).find("option:selected").attr("key");
        var selectIndex = parseInt($(this).find("option:selected").attr("index"));
        remarks[selectIndex].RelatedRemarkList.map(function(rItem){
            if(rItem.ChooseMainValue==selectKey){
			var rIndex=rItem.SubRemarkIndex;
                rItem.SubRemarkRuleList.map(function(sItem){
                    $("#remarkInput"+rItem.SubRemarkIndex+"").val("");
                    $("#remarkInput"+rItem.SubRemarkIndex+"").removeAttr("key");
                    if(sItem.SubRemarkRule==1){
                        // console.log(sItem)
                        var colorRed = sItem.SubRemarkValue.indexOf("4") != -1||sItem.SubRemarkValue==""?"":"colorRed";
                        if(colorRed==""){
                            $("#liTittle"+rItem.SubRemarkIndex+"").removeClass("colorRed");
                            $("#remarkInput"+rItem.SubRemarkIndex+"").attr("require","");
                        }else if(colorRed=="colorRed"){
                            $("#liTittle"+rItem.SubRemarkIndex+"").addClass("colorRed");
                            $("#remarkInput"+rItem.SubRemarkIndex+"").attr("require","colorRed");
                        }
                    }else if(sItem.SubRemarkRule==2){
                        // $("#remarkInput"+rItem.SubRemarkIndex+"").val("");
                        if(sItem.SubRemarkValue=="true"){
                            // $("#remarkInput"+rItem.SubRemarkIndex+"").attr("placeholder",get_lan("remarkPop").search);
                            $("#remarkInput"+rItem.SubRemarkIndex+"").removeAttr("disabled");
                            $("#remarkSelect"+rItem.SubRemarkIndex+"").show();
                            // $("#remarkInput"+rItem.SubRemarkIndex+"").searchRemark();
                            // 12.13新增
                            $("#remarkInput"+rItem.SubRemarkIndex+"").prev().removeAttr("disabled");
							
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
                        }else if(sItem.SubRemarkValue=="false"){
                            $("#remarkInput"+rItem.SubRemarkIndex+"").attr("placeholder","");
                            $("#remarkInput"+rItem.SubRemarkIndex+"").attr("disabled","disabled");
                            $("#remarkSelect"+rItem.SubRemarkIndex+"").hide();
                            // 12.13新增
                            $("#remarkInput"+rItem.SubRemarkIndex+"").prev().attr("disabled","disabled");
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
    $(".closeRemarkBtn").unbind("click").click(function(){
        closeRemarkPop();
		if($('.passengerLi').length<1){
			$.session.set('TAnumber','')
		}
		$(".selectPassengerArrow").click();
    })
    $(".sureRemarkBtn").unbind("click").click(function(){
        var remarks = '';
        var remarkCorrect = '';
        for(var i = 0;i<$(".remarkLiInput").length;i++){
            if($(".remarkLiInput").eq(i).attr("require")=="colorRed"){
                if($(".remarkLiInput").eq(i).val()==""){
                    remarkCorrect += '1';
                }
            }
            if(!$(".remarkLiInput").eq(i).attr("key")){
                remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).val().split(',').join('##')+',';
            }
            if($(".remarkLiInput").eq(i).attr("key")){
                remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).attr("key").split(',').join('##')+',';
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
        if(remarkCorrect!=''){
            alert(get_lan("remarkPop").remarkRemind);
            return false;
        }
        var isCopy = false;
        $('body').mLoading("show");
        if(isFirst == "true"){
            // if(!JSON.parse($.session.get('ProfileInfo')).HasTravelRequest){
                if(!$.session.get('TAnumber')){
                $.ajax(
                    {
                      type:'post',
                      url : $.session.get('ajaxUrl'), 
                      dataType : 'json',
                      data:{
                          url: $.session.get('obtCompany')+"/SystemService.svc/AddOrderCustomerPost",
                          jsonStr:'{"key":'+netUserId+',"customerId":"'+CustomerID+'","companyId":"'+CompanyID+'","remarks":"'+remarks.substring(0,remarks.length-1)+'","isCopy":"'+isCopy+'","language":"'+obtLanguage+'"}'
                      },
                      success : function(data) {
                          $('body').mLoading("hide");
                          var res = JSON.parse(data);
                          console.log(res);
                          $(".orderDetail").attr("CompanyID",CompanyID);
                          // console.log(queryKeys);
                          if(res == "1"){
                              closeRemarkPop();
                              passengerPopChange(CustomerID,isFirst,1);
                          }else{
                              alert(res);
                          }
                      },
                      error : function() {
                        // alert('fail');
                      }
                    } 
                  );
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
                        $(".orderDetail").attr("CompanyID",CompanyID);
                        // console.log(queryKeys);
                        if(res == "1"){
                            closeRemarkPop();
                            passengerPopChange(CustomerID,isFirst,1);
                        }else{
                            alert(res);
                        }
                    },
                    error : function() {
                      // alert('fail');
                    }
                  }
                );
            }
            
        }else if(isFirst == "false"){
            $.ajax(
              {
                type:'post',
                url : $.session.get('ajaxUrl'), 
                dataType : 'json',
                data:{
                    url: $.session.get('obtCompany')+"/SystemService.svc/ModifyOrderCustomerRemark",
                    jsonStr:'{"key":'+netUserId+',"customerId":"'+CustomerID+'","companyId":"'+CompanyID+'","remarks":"'+remarks.substring(0,remarks.length-1)+'","isCopy":"'+isCopy+'"}'
                },
                success : function(data) {
                    $('body').mLoading("hide");
                    var res = JSON.parse(data);
                    console.log(res);
                    // console.log(queryKeys);
                    if(res == "1"){
                        closeRemarkPop();
                        passengersInOrder();
                    }else{
                        alert(res);
                    }
                },
                error : function() {
                  // alert('fail');
                }
              } 
            );
        }
    })
    if(isFirst == "true"&&$(".passengerBody").attr("state")=="true"&&ProfileInfo.IsHideRemarkInput){
        $(".sureRemarkBtn").click();
    }
}
/*个人信息弹窗*/
function passengerPop(){
    $(".PassengerPop").html('\
        <div class="passengerPopTittle tittleBackColor">'+get_lan('passengerPop').popTittle+get_lan('passengerPop').remind+'</div>\
        <div class="passengerPopList">\
        <div class="popChooseName">\
          '+get_lan('passengerPop').chooseName+'<span class="colorRed">'+get_lan('passengerPop').nameRemind+'</span>\
        </div>\
        <div class="popNameCn flexRow hide">\
        <input type="radio" name="popName" class="popNameRadio"><div style="width:105px;">'+get_lan('passengerPop').popNameCn+'</div><span class="popNameCnText"></span>\
        </div>\
        <div class="popNameEn flexRow">\
        <input type="radio" name="popName" class="popNameRadio" checked><div style="width:105px;">'+get_lan('passengerPop').popNameEn+'</div><span class="popNameEnText"></span>\
        </div>\
        <div class="popPhone flexRow">\
        <div style="width:130px;">'+get_lan('passengerPop').popPhone+'<span class="colorRed">*</span></div>\
        <input type="text" class="popPhoneInput" maxlength="11">\
        </div>\
        <div class="popMail flexRow">\
        <div style="width:130px;">'+get_lan('passengerPop').popMail+'<span class="colorRed">*</span></div>\
        <input type="text" class="popMailInput">\
        </div>\
        <div class="popDocuments flexRow">\
        <div style="width:130px;">'+get_lan('passengerPop').popDocuments+'<span class="colorRed">*</span></div>\
        <select class="popDocumentsSelect">\
          <option value="">'+get_lan('passengerPop').popDocumentsRemind+'</option>\
        </select>\
        <input type="text" class="popDocumentsInput" disabled>\
        </div>\
        <div class="popDocumentsTime flexRow hide">\
        <div style="width:130px;">'+get_lan('passengerPop').popDocumentsTime+'<span class="colorRed">*</span></div>\
        <input type="text" class="popDocumentsTimeInput" disabled placeholder="'+get_lan('passengerPop').timeRemind+'">\
        </div>\
        <div class="popFrequentFlierBody">\
        </div>\
        </div>\
        <div class="passengerPopBottom">\
          <div class="passengerPopBtn mainBackColor">'+get_lan('remarkPop').confirm+'</div>\
        <div>\
        ');
    if(ProfileInfo.onlineStyle=="APPLE"){
        $(".popPhoneInput").attr("readonly","readonly");
        $(".popMailInput").attr("readonly","readonly");
    }
    $(".popDocumentsTimeInput").datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        minDate: 0,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    });
    // if(JSON.parse($.session.get('intlTicketInfo')).type == "oneWay"){
    //     $(".popFrequentFlierBody").html('\
    //         <div class="popFrequentFlier flexRow">\
    //             <div style="width:130px;">'+get_lan('passengerPop').popFrequentFlier+'</div>\
    //             <select class="popFrequentFlierSelect"></select>\
    //             <input type="text" class="popFrequentFlierInput">\
    //         </div>\
    //     ')
    // }else if(JSON.parse($.session.get('intlTicketInfo')).type == "roundTrip"){
    //     $(".popFrequentFlierBody").html('\
    //         <div class="popFrequentFlier flexRow">\
    //             <div style="width:130px;">'+get_lan('passengerPop').popFrequentFlier+'</div>\
    //             <select class="popFrequentFlierSelectStart"></select>\
    //             <input type="text" class="popFrequentFlierInputStart">\
    //             <div style="margin-left:2px;">'+get_lan('passengerPop').popFrequentFlierStart+'</div>\
    //         </div>\
    //         <div class="popFrequentFlier flexRow">\
    //             <div style="width:130px;"></div>\
    //             <select class="popFrequentFlierSelectReturn"></select>\
    //             <input type="text" class="popFrequentFlierInputReturn">\
    //             <div style="margin-left:2px;">'+get_lan('passengerPop').popFrequentFlierReturn+'</div>\
    //         </div>\
    //     ')
    // }
    $.ajax(
      {
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
            res.DocumentTypeList.map(function(item){
                $(".popDocumentsSelect").append('<option value="'+item.Rid+'">'+item.Name+'</option>');
            })
            for(var i=0;i<$(".popDocumentsSelect option").length;i++){
                if($(".popDocumentsSelect option").eq(i).val()==1){
                    $(".popDocumentsSelect option").eq(i).remove();
                }
            }
            // res.airLineLists.map(function(item){
            //     if(JSON.parse($.session.get('intlTicketInfo')).type="oneWay"){
            //         $(".popFrequentFlierSelect").append('<option value="'+item.Code+'">'+item.Name+'</option>');
            //     }
            //     if(JSON.parse($.session.get('intlTicketInfo')).type="roundTrip"){
            //         $(".popFrequentFlierSelectStart").append('<option value="'+item.Code+'">'+item.Name+'</option>');
            //         $(".popFrequentFlierSelectReturn").append('<option value="'+item.Code+'">'+item.Name+'</option>');
            //     }
            // })
        },
        error : function() {
          // alert('fail');
        }
      }
    );
}
/*添加新旅客弹窗*/
function newCustomerPop(CompanyId){
    $(".newCustomerPop").html('\
        <div class="newCustomerPopTittle tittleBackColor">'+get_lan('passengerPop').popTittle+'</div>\
        <div class="passengerPopList">\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">'+get_lan('passengerPop').popNameCn+'</div>\
                <input type="text" class="newCustomerHalfInput newCustomerInputSurNameCn" placeholder="'+get_lan('newCustomerPop').surname+'">\
                <input type="text" class="newCustomerHalfInput newCustomerInputGivenNameCn" placeholder="'+get_lan('newCustomerPop').givenName+'" style="margin-left:8px;">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">'+get_lan('passengerPop').popNameEn+'</div>\
                <input type="text" class="newCustomerHalfInput newCustomerInputSurNameEn" placeholder="'+get_lan('newCustomerPop').surname+'">\
                <input type="text" class="newCustomerHalfInput newCustomerInputGivenNameEn" placeholder="'+get_lan('newCustomerPop').givenName+'" style="margin-left:8px;">\
            </div>\
            <div class="newCustomerLi flexRow">\
                <div style="width:105px;">'+get_lan('newCustomerPop').nick+'</div>\
                <input type="text" class="newCustomerInput newCustomerInputNick">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">'+get_lan('newCustomerPop').sex+'</div>\
                <div style="width:43px;text-align:center;">'+get_lan('newCustomerPop').male+'</div>\
                <input type="radio" name="newPopSex" class="newPopSexRadio" checked sexValue="false">\
                <div style="width:43px;text-align:center;">'+get_lan('newCustomerPop').female+'</div>\
                <input type="radio" name="newPopSex" class="newPopSexRadio" sexValue="true">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">'+get_lan('passengerPop').popPhone+'</div>\
                <input type="text" class="newCustomerInput newCustomerInputPhone" maxlength="11">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">'+get_lan('passengerPop').popMail+'</div>\
                <input type="text" class="newCustomerInput newCustomerInputEmail">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">'+get_lan('passengerPop').popDocuments+'</div>\
                <select class="newPopDocumentsSelect">\
                  <option>'+get_lan('passengerPop').popDocumentsRemind+'</option>\
                </select>\
                <input type="text" class="newCustomerInput newCustomerInputDocuments">\
            </div>\
            <div class="newCustomerLi require flexRow hide newCustomerTime">\
                <div style="width:105px;">'+get_lan('passengerPop').popDocumentsTime+'</div>\
                <input type="text" class="newCustomerInput newCustomerInputTime" readonly placeholder="'+get_lan('passengerPop').timeRemind+'">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">'+get_lan('newCustomerPop').nationality+'</div>\
                <input type="text" class="newCustomerInput newCustomerInputNationality" id="countryInput" autocomplete="off">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">'+get_lan('newCustomerPop').birthday+'</div>\
                <input type="text" class="newCustomerInput newCustomerInputBirthday" readonly value="1985-1-1">\
            </div>\
			<div class="newCustomerLi require flexRow remarkTips">\
			    <div style="width:100%;font-size: 12px;color: red;">'+get_lan('newCustomerPop').required+'</div>\
			</div>\
        </div>\
        <div class="newCustomerPopBottom flexRow">\
          <div class="newCustomerPopCancel" style="background-color:#979797;margin:16px 0 27px 30px;">'+get_lan('remarkPop').cancel+'</div>\
          <div class="newCustomerPopBtn mainBackColor" style="margin:16px 0 27px 190px;">'+get_lan('remarkPop').confirm+'</div>\
        <div>\
        ');
	// 隐藏必填项
	if(ProfileInfo.onlineStyle!="eTravel"){
		$(".remarkTips").remove()
	}
    $(".newCustomerPopCancel").unbind("click").click(function(){
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
        minDate: 0,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    });
    $(".newCustomerInputBirthday").datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        minDate: '1930-1-1',  // 当前日期之后的 0 天，就是当天
		maxDate:0,
        hideIfNoPrevNext: true,
        showOtherMonths: true,
		yearRange:'c-50:c+50',//选择框，前后多少年
        selectOtherMonths: true,
    });
    $.ajax(
      {
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
            res.DocumentTypeList.map(function(item){
                $(".newPopDocumentsSelect").append('<option value="'+item.Rid+'">'+item.Name+'</option>');
            })
            $(".newPopDocumentsSelect").unbind("change").change(function(){
                if($('.newPopDocumentsSelect option:selected').val()==1){
                    $(".newCustomerTime").addClass("hide");
					testIDCard()
                }else{
                    $(".newCustomerTime").removeClass("hide");
                }
            })
        },
        error : function() {
          // alert('fail');
        }
      } 
    );
    $(".newCustomerPopBtn").unbind("click").click(function(){
        // console.log($('.popNameRadio:checked').attr("PassengerName"));
        var regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		var regEmail2 = /^[\w\-]+@[a-zA-Z\d\-]+(\.[a-zA-Z]{2,8}){1,2}$/ig;
        // var regPhone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        if(!regPhone.test($(".newCustomerInputPhone").val())){
           alert(get_lan('passengerPop').phoneRemind);
        }else if(!regEmail.test($(".newCustomerInputEmail").val()) && !regEmail2.test($(".newCustomerInputEmail").val())){
            alert(get_lan('passengerPop').emailRemind);
        }
        else if($(".newCustomerInputSurNameCn").val()==""||$(".newCustomerInputGivenNameCn").val()==""||$(".newCustomerInputSurNameEn").val()==""||$(".newCustomerInputGivenNameEn").val()==""||$(".newCustomerInputDocuments").val()==""||!$("#countryInput").attr("code")){
            alert(get_lan('passengerPop').clickRemind);
        }else if($('.newPopDocumentsSelect option:selected').val()!=1&&$(".newCustomerInputTime ").val()==""){
            alert(get_lan('passengerPop').clickRemind);
        }
        else{
            if($(".newCustomerInputSurNameCn").val()==$(".newCustomerInputSurNameEn").val()){
                var NameCN = $(".newCustomerInputSurNameCn").val()+'/'+$(".newCustomerInputGivenNameCn").val();
            }else{
                var NameCN = $(".newCustomerInputSurNameCn").val()+$(".newCustomerInputGivenNameCn").val();
            }
            var NameEN = $(".newCustomerInputSurNameEn").val()+'/'+$(".newCustomerInputGivenNameEn").val();
            var Nick = $(".newCustomerInputNick").val();
            var sex = $('.newPopSexRadio:checked').attr("sexValue");
            var phone = $(".newCustomerInputPhone").val();
            var email = $(".newCustomerInputEmail").val();
            var rid = $('.newPopDocumentsSelect option:selected').val();
            var documentTime = '';
            if(rid !=1){
                documentTime = $(".newCustomerInputTime ").val();
            }
            var documentNumbers = $(".newCustomerInputDocuments").val();
            var nationality = $("#countryInput").attr("code");
            var birthday = $(".newCustomerInputBirthday").val();
            $('body').mLoading("show");
            $.ajax(
              {
                type:'post',
                url : $.session.get('ajaxUrl'), 
                dataType : 'json',
                data:{
                    url: $.session.get('obtCompany')+"/SystemService.svc/AddNewCustomerPost",
                    jsonStr:'{"language":"'+obtLanguage+'","id":'+netUserId+',"nameCn":"'+NameCN+'","nameEn":"'+NameEN+'","nickname":"'+Nick+'","gender":"'+sex+'","nation":"'+nationality+'","birthday":"'+birthday+'","NameS":"'+NameCN+'","email":"'+email+'","phoneNumber":"'+phone+'","groupIDs":"0"}'
                },
                success : function(data) {
                    var res = JSON.parse(data);
                    console.log(res);
                    var customerId = res.data;
                    var docInfo = rid+','+documentNumbers+','+nationality+','+documentTime;
                    $.ajax(
                      {
                        type:'post',
                        url : $.session.get('ajaxUrl'), 
                        dataType : 'json',
                        data:{
                            url: $.session.get('obtCompany')+"/SystemService.svc/AddNewCustomerInfoPost",
                            jsonStr:'{"customerId":"'+customerId+'","id":'+netUserId+',"memberShipInfo":"","remarks":"","language":"'+obtLanguage+'","docInfo":"'+docInfo+'"}'
                        },
                        success : function(data) {
                            var res = JSON.parse(data);
                            console.log(res);
                            $.ajax(
                              {
                                type:'post',
                                url : $.session.get('ajaxUrl'),
                                dataType : 'json',
                                data:{
                                    url: $.session.get('obtCompany')+"/SystemService.svc/AddOrderCustomerPost",
                                    jsonStr:'{"key":'+netUserId+',"companyId":"'+CompanyId+'","customerId":"'+customerId+'","remarks":"","isCopy":"false","language":"'+obtLanguage+'"}'
                                },
                                success : function(data) {
                                    $('body').mLoading("hide");
                                    var res = JSON.parse(data);
                                    console.log(res);
                                    if(res == "1"){
                                        closeNewCustomer();
                                        passengersInOrder("newCustomer");
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
                },
                error : function() {
                  // alert('fail');
                }
              } 
            );
        }
    })
}
/*个人信息弹窗修改*/
function passengerPopChange(customerId,isFirst,customerRid,docDelId){
    openPassengerPop();
    $('body').mLoading("show");
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/SystemService.svc/CurrentPassengersInOrderNew",
            jsonStr:'{"key":'+netUserId+',"Language":"'+obtLanguage+'","reginType":"I","dstCode":"'+$(".orderDetail").attr("dstCode")+'"}'
        },
        success : function(data) {
            $('body').mLoading("hide");
            var res = JSON.parse(data);
            console.log(res);
            console.log($(".popDocumentsSelect").length);
            res.map(function(item,index){
                if(item.ID == customerId){
                    $(".popNameCnText").text(item.NameCN);
                    $(".popNameEnText").text(item.NameEN);
					//乘客中英文姓名，按照证件信息的显示
					item.Documents.map(function(ditem){
					    if(customerRid==ditem.Rid){
							 var passengerNameCN = ditem.DocNameCn!=null&&ditem.DocNameCn!=""?ditem.DocNameCn:item.NameCN;
							 var passengerNameEN = ditem.DocNameEn!=null&&ditem.DocNameEn!=""?ditem.DocNameEn:item.NameEN;
							 $(".popNameCnText").text(passengerNameCN);
							 $(".popNameEnText").text(passengerNameEN);
					    }
					})
                    $(".popNameCn .popNameRadio").attr("PassengerName",item.NameCN);
                    $(".popNameEn .popNameRadio").attr("PassengerName",item.NameEN);
                    if(item.Phones !=null){
                        $(".popPhoneInput").val(hidePhones(ProfileInfo,item.Phones));
                        $(".popPhoneInput").attr("hideNo",item.Phones);
                    }
                    if(item.Email !=null){
                        $(".popMailInput").val(hideEmail(ProfileInfo,item.Email));
                        $(".popMailInput").attr("hideNo",item.Email);
                    }

                    if(item.Documents.length != 0&&item.Documents[0].Rid!=1){
                        $(".popDocumentsSelect").val(item.Documents[0].Rid);
                        
                        // $(".popDocumentsInput").val(item.Documents[0].DocumentNumber);
                        /*隐藏证件信息*/
                        $(".popDocumentsInput").attr("hideNo",item.Documents[0].DocumentNumber);
                        $(".popDocumentsInput").val(hideDocument(ProfileInfo,item.Documents[0].DocumentNumber,item.Documents[0].Rid));
                        /*end*/
                        $(".popDocumentsTimeInput").val(hideDocDate(ProfileInfo,item.Documents[0].docExpiryDate.substring(0,10)));
                        $(".popDocumentsTimeInput").attr("hideNo",item.Documents[0].docExpiryDate.substring(0,10));
                        if(item.Documents[0].Rid!=1){
                            $(".popDocumentsTime ").removeClass("hide");
                        }
                        // var popNameCnText = item.Documents[0].DocNameCn!=null&&item.Documents[0].DocNameCn!=""?item.Documents[0].DocNameCn:item.NameCN;
                        // var popNameEnText = item.Documents[0].DocNameEn!=null&&item.Documents[0].DocNameEn!=""?item.Documents[0].DocNameEn:item.NameEN;
                        // $(".popNameCn .popNameRadio").attr("PassengerName",popNameCnText);
                        // $(".popNameEn .popNameRadio").attr("PassengerName",popNameEnText);
                        // $(".popNameCnText").text(popNameCnText);
                        // $(".popNameEnText").text(popNameEnText);
                    }
                    // if(item.cardsGo.length != 0){
                    //     $(".popFrequentFlierSelect").val(item.cardsGo[0].SupplierCode);
                    //     $(".popFrequentFlierInput").val(item.cardsGo[0].CardNumbers);
                    // }
                    $(".popDocumentsSelect").unbind("change").change(function(){
                        if($('.popDocumentsSelect option:selected').val()==1){
                            $(".popDocumentsTime").addClass("hide");
                        }else{
                            $(".popDocumentsTime").removeClass("hide");
                        }
                        var ridList=[];
                        item.Documents.map(function(ditem){
                            if($('.popDocumentsSelect').val()==ditem.Rid){
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
                                if(ditem.docExpiryDate.length>=10){
                                    $(".popDocumentsTimeInput").val(hideDocDate(ProfileInfo,ditem.docExpiryDate.substring(0,10)));
                                    $(".popDocumentsTimeInput").attr("hideNo",ditem.docExpiryDate.substring(0,10));
                                }
                            }
                            ridList.push(ditem.Rid);
                        })
                        if(ridList.indexOf($('.popDocumentsSelect').val()) <= -1){
                            $(".popDocumentsInput").val('');
                            $(".popDocumentsInput").attr("hideNo",'');
                        }
                    })
                    if(isFirst == "true"){
                        $(".passengerPopBottom").html('<div class="passengerPopBtn mainBackColor" style="margin:16px 0 27px 188px;">'+get_lan('remarkPop').confirm+'</div>')
                        if(item.Phones != null&&item.Email != null&&item.Documents.length != 0){
                            if(item.Documents.length>1||item.Documents[0].Rid!=1){
                                closePassengerPop();
                                passengersInOrder();
                            }
                        }
                    }else if(isFirst == "false"){
                        item.Documents.map(function(ditem){
                            if(docDelId==ditem.delDocId){
                                // $(".popDocumentsInput").val(ditem.DocumentNumber);
                                /*隐藏证件信息*/
                                $(".popDocumentsInput").attr("hideNo",ditem.DocumentNumber);
                                $(".popDocumentsInput").val(hideDocument(ProfileInfo,ditem.DocumentNumber,ditem.Rid));
                                /*end*/
                                $(".popDocumentsSelect").val(customerRid);
                                $(".popDocumentsTimeInput").val(hideDocDate(ProfileInfo,ditem.docExpiryDate.substring(0,10)));
                                $(".popDocumentsTimeInput").attr("hideNo",ditem.docExpiryDate.substring(0,10));
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
                        if(customerRid!=1){
                            $(".popDocumentsTime ").removeClass("hide");
                        }else{
                            $(".popDocumentsTime ").addClass("hide");
                        }
                        $(".passengerPopBottom").addClass("flexRow");
                        $(".passengerPopBottom").html('\
                            <div class="passengerPopCancel" style="background-color:#979797;margin:16px 0 27px 30px;">'+get_lan('remarkPop').cancel+'</div>\
                            <div class="passengerPopBtn mainBackColor" style="margin:16px 0 27px 190px;">'+get_lan('remarkPop').confirm+'</div>'
                        )
                        $(".passengerPopCancel").unbind("click").click(function(){
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
            $(".passengerPopBtn").unbind("click").click(function(){
                // console.log($('.popNameRadio:checked').attr("PassengerName"));
                var regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				var regEmail2 = /^[\w\-]+@[a-zA-Z\d\-]+(\.[a-zA-Z]{2,8}){1,2}$/ig;
                // var regPhone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
                var phoneInfo = $(".popPhoneInput").attr("hideNo")?$(".popPhoneInput").attr("hideNo"):$(".popPhoneInput").val();
                var emailInfo = $(".popMailInput").attr("hideNo")?$(".popMailInput").attr("hideNo"):$(".popMailInput").val();
                
                if(!regPhone.test(phoneInfo)){
                   alert(get_lan('passengerPop').phoneRemind);
                }else if(!regEmail.test(emailInfo) && !regEmail2.test(emailInfo)){
                    alert(get_lan('passengerPop').emailRemind);
                }
                else if(!$('.popNameRadio:checked').attr("PassengerName")||$(".popDocumentsInput").attr("hideNo")==""||$('.popDocumentsSelect option:selected').val()==""){
                    alert(get_lan('passengerPop').clickRemind);
                }else if($('.popDocumentsSelect option:selected').val()!=1&&$(".popDocumentsTimeInput").val()==""){
                    alert(get_lan('passengerPop').clickRemind);
                }
                else{

                    if($('.popDocumentsSelect option:selected').val()==1){
                        var docInfo = $('.popDocumentsSelect option:selected').val()+','+$(".popDocumentsInput").attr("hideNo")+',,,,'
                    }else{
                        var docInfo = $('.popDocumentsSelect option:selected').val()+','+$(".popDocumentsInput").attr("hideNo")+',,,,'+$(".popDocumentsTimeInput").attr("hideNo");
                    }
                    // if(JSON.parse($.session.get('intlTicketInfo')).type == "oneWay"){
                    //     var memberShipInfo = '1,'+$('.popFrequentFlierSelect option:selected').val()+','+$('.popFrequentFlierSelect option:selected').val()+$(".popFrequentFlierInput").val()+','+'2030-1-1';
                    // }
                    // else if(JSON.parse($.session.get('intlTicketInfo')).type == "roundTrip"){
                    //     var memberShipInfo = '1,'+$('.popFrequentFlierSelectStart option:selected').val()+','+$('.popFrequentFlierSelectStart option:selected').val()+$(".popFrequentFlierInputStart").val()+','+'2030-1-1'+'_'+'1,'+$('.popFrequentFlierSelectReturn option:selected').val()+','+$('.popFrequentFlierSelectReturn option:selected').val()+$(".popFrequentFlierInputReturn").val()+','+'2030-1-1';
                    // }
                    var memberShipInfo = '';
                    $('body').mLoading("show");
                    $.ajax(
                      {
                        type:'post',
                        url : $.session.get('ajaxUrl'), 
                        dataType : 'json',
                        data:{
                            url: $.session.get('obtCompany')+"/SystemService.svc/CustomerInfoUpdateOrAddPost",
                            jsonStr:'{"id":'+netUserId+',"language":"'+obtLanguage+'","customerId":"'+customerId+'","emailInfo":"'+emailInfo+'","docInfo":"'+docInfo+'","phoneInfo":"'+phoneInfo+'","memberShipInfo":"'+memberShipInfo+'"}'
                        },
                        success : function(data) {
                            var res = JSON.parse(data);
                            console.log(res);
                            $('body').mLoading("hide");
                            if(res.message){
                                alert(res.message);
                            }else{
                                closePassengerPop();
                                if($('.popDocumentsSelect option:selected').val()==1){
                                    var documentInfo = customerId+','+$('.popDocumentsSelect option:selected').val()+','+$(".popDocumentsInput").attr("hideNo")+','
                                }else{
                                    var documentInfo = customerId+','+$('.popDocumentsSelect option:selected').val()+','+$(".popDocumentsInput").attr("hideNo")+','+$(".popDocumentsTimeInput").val();
                                }
                                var airInfo = $(".orderDetail").attr("airInfoTime").split(" ").join('');
                                $.ajax(
                                  {
                                    type:'post',
                                    url : $.session.get('ajaxUrl'), 
                                    dataType : 'json',
                                    data:{
                                        url: $.session.get('obtCompany')+"/SystemService.svc/InterAirAddDocumentPost",
                                        jsonStr:'{"id":'+netUserId+',"language":"'+obtLanguage+'","airInfo":"'+airInfo+'","documentInfo":"'+documentInfo+'"}'
                                    },
                                    success : function(data) {
                                        $('body').mLoading("hide");
                                        var res = JSON.parse(data);
                                        console.log(res);
                                        if(res.RemindMessage){
                                            alert(res.RemindMessage)
                                        }
                                        var frequentCardsStart = '';
                                        var frequentCardsReturn = '';
                                        // if(JSON.parse($.session.get('intlTicketInfo')).type == "oneWay"){
                                        //     var frequentCardsStart = $('.popFrequentFlierSelect option:selected').val()+$(".popFrequentFlierInput").val();
                                        //     if($(".popFrequentFlierInput").val()==""){
                                        //         frequentCardsStart = '';
                                        //     }
                                        //     var frequentCardsReturn = '';
                                        // }
                                        // else if(JSON.parse($.session.get('intlTicketInfo')).type == "roundTrip"){
                                        //     var frequentCardsStart = $('.popFrequentFlierSelectStart option:selected').val()+$(".popFrequentFlierInputStart").val();
                                        //     if($(".popFrequentFlierInputStart").val()==""){
                                        //         frequentCardsStart = '';
                                        //     }
                                        //     var frequentCardsReturn = $('.popFrequentFlierSelectReturn option:selected').val()+$(".popFrequentFlierInputReturn").val();
                                        //     if($(".popFrequentFlierInputReturn").val()==""){
                                        //         frequentCardsReturn = '';
                                        //     }
                                        // }
                                        chooseNameAndDocument(customerId,$('.popNameRadio:checked').attr("PassengerName"),$('.popDocumentsSelect option:selected').val(),frequentCardsStart,frequentCardsReturn);
                                    },
                                    error : function() {
                                      // alert('fail');
                                    }
                                  } 
                                );
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
//选择后的旅客订票姓名和证件号常旅客卡
function chooseNameAndDocument(customerId,orderName,documentRid,frequentCardsStart,frequentCardsReturn){
    $('body').mLoading("show");
    var content = customerId+','+orderName+','+documentRid+','+frequentCardsStart+','+frequentCardsReturn;
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'),
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/SystemService.svc/AddUpdatedCustomerInfoPost",
            jsonStr:'{"id":'+netUserId+',"content":"'+content+'","language":"'+obtLanguage+'","customerId":"'+customerId+'"}'
        },
        success : function(data) {
            $('body').mLoading("hide");
            var res = JSON.parse(data);
            console.log(res);
            if(res.code == 200){
                passengersInOrder();
            }
        },
        error : function() {
          // alert('fail');
        }
      } 
    );
}
//订单内旅客
function passengersInOrder(customerState){
    $('body').mLoading("show");
    var airLineListString =  '[';
    for(var i=0;i<$(".orderAirLine").length;i++){
        airLineListString+='"'+$(".orderAirLine").eq(i).attr("code")+'"';
        airLineListString+=',';
    }
    airLineListString = airLineListString.substring(0,airLineListString.length-1)+']';
    console.log(airLineListString);
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'),
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/SystemService.svc/GetPassengersInOrder",
            jsonStr:'{"request":{"key":'+netUserId+',"Language":"'+obtLanguage+'","reginType":"I","dstCode":"'+$(".orderDetail").attr("dstCode")+'","airlines":'+airLineListString+'}}'
        },
        success : function(data) {
            $('body').mLoading("hide");
            var res = JSON.parse(data);
            console.log(res);
            /*国籍*/
            res.map(function(item){
                if(item.Nationality=="CN"){
                    $(".bookTicketBtn").attr('nation',"cn");
                }
            })
            /*乘客信息*/
            $(".passengerList").html('');
            res.map(function(item,index){
                var passengerName = item.Documents[0].DocNameEn!=null&&item.Documents[0].DocNameEn!=""?item.Documents[0].DocNameEn:item.NameEN;
                var profilePhone = ProfileInfo.HideMyPersonalInfo&&item.Phones!=""?"*******"+item.Phones.substring(item.Phones.length-4,item.Phones.length):item.Phones;
                $(".passengerList").append('\
                    <div class="passengerLi flexRow" customerId="'+item.ID+'" companyId="'+item.OrderCompanyId+'">\
                    <div class="passengerLiDiv" style="width:250px;text-align:left;padding-left:45px;box-sizing:border-box;"><span class="PassengerNameText">'+passengerName+'</span><span class="changePassengerInfo specificFontColor" index="'+index+'" customerId="'+item.ID+'" style="margin-left:5px;cursor:pointer;">'+get_lan('passengerInfo').changePassengerInfo+'</span></div>\
                    <div class="passengerLiDiv passengerPhone" style="width:150px;" hideNo="'+item.Phones+'">'+profilePhone+'</div>\
                    <div class="passengerLiDiv" style="width:200px;">'+hideEmail(ProfileInfo,item.Email)+'</div>\
                    <div class="passengerLiDiv passengerLiDocuments" style="width:300px;"><select class="documentsSelect"></select></div>\
                    <div class="passengerLiDiv frequentCardsText" style="width:175px;"></div>\
                    <div class="passengerLiDiv changeRemarkBtn specificFontColor" index="'+index+'"  style="width:125px;text-decoration: underline;cursor:pointer">'+get_lan('passengerInfo').remarks+'</div>\
                    <div><img src="../../css/images/delIcon.png" class="delIcon" style="margin-top:3px;cursor:pointer;position:absolute;left:5px;" customerId="'+item.ID+'"></div>\
                    </div>\
                    \
                    ')
                item.Documents.map(function(ditem){
                    $(".documentsSelect").eq(index).append('\
                        <option value="'+ditem.Rid+'" docText="'+ditem.DocumentNumber+'" name="'+ditem.DocNameEn+'" cName="'+item.NameEN+'" index="'+index+'" docDelId="'+ditem.delDocId+'">'+ditem.nameDoc+':'+hideDocument(ProfileInfo,ditem.DocumentNumber,ditem.Rid)+'</option>\
                    ')
                })
                $(".frequentCardsText").html("");
                // if(item.cardsGo==null||item.cardsGo.length==0){
                //     $(".frequentCardsText").eq(index).html("");
                // }else{
                //     item.cardsGo.map(function(cItem){
                //         $(".frequentCardsSelect").eq(index).append('\
                //             <option value="'+cItem.CardNumbers+'">'+cItem.SupplierCode+'-'+cItem.CardNumbers+'</option>\
                //             ')
                //         $(".frequentCardsSelect").eq(index).attr("customerId",cItem.CustomerId);
                //     })
                // }
                // if($(".documentsSelect").eq(index).find("option[value='2']").length==1){
                //     $(".documentsSelect").eq(index).val('2');
                // }
                if(item.UpdatedCustomerInfo!=""&&item.UpdatedCustomerInfo!=null){
                    var UpdatedCustomerList = item.UpdatedCustomerInfo.split(',');
                    $(".PassengerNameText").text(UpdatedCustomerList[1]);
                    $(".documentsSelect").val(UpdatedCustomerList[2]);
                    // if(JSON.parse($.session.get('intlTicketInfo')).type == "oneWay"){
                    //     $(".frequentCardsText").text(UpdatedCustomerList[3])
                    // }else if(JSON.parse($.session.get('intlTicketInfo')).type == "roundTrip"){
                    //     $(".frequentCardsText").html(get_lan("passengerPop").popFrequentFlierStart+':<span class="frequentCardsNoStart">'+UpdatedCustomerList[3]+'</span> '+get_lan("passengerPop").popFrequentFlierReturn+':<span class="frequentCardsNoReturn">'+UpdatedCustomerList[4])+'</span>';
                    // }
                }
            })
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

            totalAmount();
            if(searchIntlInfo.alterTicketInfo){
                $(".changePassengerInfo").remove();
                $(".changeRemarkBtn").remove();
                $(".delIcon").remove();
            }
            if($.session.get("TAnumber")){
                $(".delIcon").remove();
            }
            for(var i=0;i<$(".documentsSelect option").length;i++){
                if($(".documentsSelect option").eq(i).val()==1){
                    $(".documentsSelect option").eq(i).remove();
                }
            }
            // $(".changeRemarkBtn").hide();
            $(".delIcon").unbind("click").click(function(){
                var customerId = $(this).attr("customerId");
                var delMsg=confirm(get_lan("passengerInfo").delMsg);
                 if (delMsg==true){
                    $('body').mLoading("show");
                    $.ajax(
                      {
                        type:'post',
                        url : $.session.get('ajaxUrl'), 
                        dataType : 'json',
                        data:{
                            url: $.session.get('obtCompany')+"/SystemService.svc/DelPsgPost",
                            jsonStr:'{"key":'+netUserId+',"customerId":"'+customerId+'"}'
                        },
                        success : function(data) {
                            $('body').mLoading("hide");
                            var res = JSON.parse(data);
                            console.log(res);
                            if(res == "Success"){
                                passengersInOrder();
                            }
                        },
                        error : function() {
                          // alert('fail');
                        }
                      } 
                    );
                 } 
            })
            if($(".choosePassengerBody").css("display")=="none"){
                $(".delIcon").remove();
            }
            $(".changePassengerInfo").unbind("click").click(function(){
                var customerId = $(this).attr("customerId");
                var index = parseInt($(this).attr("index"));
                var customerRid = $(".documentsSelect").eq(index).val();
                var docDelId = $(".documentsSelect").eq(index).children('option:selected').attr("docDelId");
                passengerPopChange(customerId,"false",customerRid,docDelId);
                $("#cover").unbind("click").click(function(){
                    closePassengerPop();
                })
            })
            $(".changeRemarkBtn").unbind("click").click(function(){
                var index = parseInt($(this).attr("index"));
                $("#cover").unbind("click");
                var CompanyID = res[index].OrderCompanyId;
                var customerId = res[index].ID;
                var employeeName = res[index].NameCN;
                remarkInfoPop(CompanyID,customerId,employeeName,"false");
            })
            if(customerState=="newCustomer"){
                $(".changeRemarkBtn").eq($(".changeRemarkBtn").length-1).click();
            }
            /*常旅客卡*/
            if(!ProfileInfo.HideMeberShip){
                if(res.length==0){
                    $(".frequentCardsInfo").addClass("hide");
                }
                $(".frequentCardsBody").html('');
                var showFrequentCard = false;
                var listIndex = 0;
                var cardIndex = 0;
                res.map(function(item,index){
                    var name = obtLanguage=="CN"?item.NameCN:item.NameEN;
                    if(item.memberShipList.length>0){
                        $(".frequentCardsBody").append('\
                            <div class="frequentCardsName">'+get_lan("frequentCardsInfo").cardholder+name+'</div>\
                            <div class="frequentCardsList"></div>\
                        ')
                        item.memberShipList.map(function(mItem,mIndex){
                            console.log(mItem);
                            var airlineName = obtLanguage == "CN"?mItem[0].usedAirlineNameCn:mItem[0].usedAirlineNameEn;
                            $(".frequentCardsList").eq(listIndex).append('\
                                <div class="frequentCardsLi flexRow">\
                                  <div class="frequentCardsLiCompany">'+airlineName+'</div>\
                                  <div class="frequentCardsLiNumber">'+get_lan("frequentCardsInfo").number+'<select class="frequentCardsSelect"></select></div>\
                                </div>\
                            ')
                            console.log(cardIndex);
                            mItem.map(function(cItem){
                                $(".frequentCardsSelect").eq(cardIndex).append('\
                                    <option code="'+item.ID+"_"+cItem.usedAirlineCode+'">'+cItem.CardNumbers+'</option>\
                                    ')
                            })
                            cardIndex++;
                        })
                        showFrequentCard = true;
                        listIndex++;
                    }
                })
                if(ProfileInfo.onlineStyle=="APPLE"){
                    $(".frequentCardsName").hide();
                }
                if(showFrequentCard){
                    $(".frequentCardsInfo").removeClass("hide");
                }else{
                    $(".frequentCardsInfo").addClass("hide");
                }
                $(".frequentCardsLi").eq($(".frequentCardsLi").length-1).css("border","0");
            }
            /*苹果*/
            if($(".passengerLi").length==1&&ProfileInfo.onlineStyle=="APPLE"){
                $(".selectPassengerArrow,.selectPassengerSearch").unbind("click").click(function(){
                    alert("There is already a traveler in the order.");
                })
            }else{
                $(".selectPassengerArrow").removeAttr("spread");
                selectPassengers();
            }
            /*有审批单*/
            if(($(".passengerLi").length==1&&$.session.get('TAnumber'))||searchDomInfo.alterTicketInfo){
            // if(JSON.parse($.session.get('ProfileInfo')).HasTravelRequest&&$(".passengerLi").length==1&&!JSON.parse($.session.get('ProfileInfo')).SelectNoTrOption){
                $(".choosePassengerBody").addClass("hide");
            }else{
                $(".choosePassengerBody").removeClass("hide");
            }
        },
        error : function() {
          // alert('fail');
        }
      }
    );
}

//订单内常旅客卡
function passengersInOrder2(customerState){
    $('body').mLoading("show");
    var airLineListString =  '[';
    for(var i=0;i<$(".orderAirLine").length;i++){
        airLineListString+='"'+$(".orderAirLine").eq(i).attr("code")+'"';
        airLineListString+=',';
    }
    console.log(airLineListString);
    airLineListString = airLineListString.substring(0,airLineListString.length-1)+']';
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'),
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/SystemService.svc/GetPassengersInOrder",
            jsonStr:'{"request":{"key":'+netUserId+',"Language":"'+obtLanguage+'","reginType":"I","dstCode":"'+$(".orderDetail").attr("dstCode")+'","airlines":'+airLineListString+'}}'
        },
        success : function(data) {
            $('body').mLoading("hide");
            var res = JSON.parse(data);
            console.log(res);
            /*国籍*/
            // res.map(function(item){
            //     if(item.Nationality=="CN"){
            //         $(".bookTicketBtn").attr('nation',"cn");
            //     }
            // })
            // /*乘客信息*/
            // $(".passengerList").html('');
            // res.map(function(item,index){
            //     var passengerName = item.Documents[0].DocNameEn!=null&&item.Documents[0].DocNameEn!=""?item.Documents[0].DocNameEn:item.NameEN;
            //     $(".passengerList").append('\
            //         <div class="passengerLi flexRow" customerId="'+item.ID+'" companyId="'+item.OrderCompanyId+'">\
            //         <div class="passengerLiDiv" style="width:250px;text-align:left;padding-left:45px;box-sizing:border-box;"><span class="PassengerNameText">'+passengerName+'</span><span class="changePassengerInfo specificFontColor" index="'+index+'" customerId="'+item.ID+'" style="margin-left:5px;cursor:pointer;">'+get_lan('passengerInfo').changePassengerInfo+'</span></div>\
            //         <div class="passengerLiDiv passengerPhone" style="width:150px;">'+item.Phones+'</div>\
            //         <div class="passengerLiDiv" style="width:200px;">'+item.Email+'</div>\
            //         <div class="passengerLiDiv passengerLiDocuments" style="width:300px;"><select class="documentsSelect"></select></div>\
            //         <div class="passengerLiDiv frequentCardsText" style="width:175px;"></div>\
            //         <div class="passengerLiDiv changeRemarkBtn specificFontColor" index="'+index+'"  style="width:125px;text-decoration: underline;cursor:pointer">'+get_lan('passengerInfo').remarks+'</div>\
            //         <div><img src="../../css/images/delIcon.png" class="delIcon" style="margin-top:3px;cursor:pointer;position:absolute;left:5px;" customerId="'+item.ID+'"></div>\
            //         </div>\
            //         \
            //         ')
            //     item.Documents.map(function(ditem){
            //         $(".documentsSelect").eq(index).append('\
            //             <option value="'+ditem.Rid+'" docText="'+ditem.DocumentNumber+'" name="'+ditem.DocNameEn+'" cName="'+item.NameEN+'" index="'+index+'" docDelId="'+ditem.delDocId+'">'+ditem.nameDoc+':'+ditem.DocumentNumber+'</option>\
            //         ')
            //     })
            //     $(".frequentCardsText").html("");
            //     // if(item.cardsGo==null||item.cardsGo.length==0){
            //     //     $(".frequentCardsText").eq(index).html("");
            //     // }else{
            //     //     item.cardsGo.map(function(cItem){
            //     //         $(".frequentCardsSelect").eq(index).append('\
            //     //             <option value="'+cItem.CardNumbers+'">'+cItem.SupplierCode+'-'+cItem.CardNumbers+'</option>\
            //     //             ')
            //     //         $(".frequentCardsSelect").eq(index).attr("customerId",cItem.CustomerId);
            //     //     })
            //     // }
            //     // if($(".documentsSelect").eq(index).find("option[value='2']").length==1){
            //     //     $(".documentsSelect").eq(index).val('2');
            //     // }
            //     if(item.UpdatedCustomerInfo!=""&&item.UpdatedCustomerInfo!=null){
            //         var UpdatedCustomerList = item.UpdatedCustomerInfo.split(',');
            //         $(".PassengerNameText").text(UpdatedCustomerList[1]);
            //         $(".documentsSelect").val(UpdatedCustomerList[2]);
            //         // if(JSON.parse($.session.get('intlTicketInfo')).type == "oneWay"){
            //         //     $(".frequentCardsText").text(UpdatedCustomerList[3])
            //         // }else if(JSON.parse($.session.get('intlTicketInfo')).type == "roundTrip"){
            //         //     $(".frequentCardsText").html(get_lan("passengerPop").popFrequentFlierStart+':<span class="frequentCardsNoStart">'+UpdatedCustomerList[3]+'</span> '+get_lan("passengerPop").popFrequentFlierReturn+':<span class="frequentCardsNoReturn">'+UpdatedCustomerList[4])+'</span>';
            //         // }
            //     }
            // })
            // $(".documentsSelect").change(function(){
            //     var name = $(this).children('option:selected').attr("name");
            //     var cName = $(this).children('option:selected').attr("cName");
            //     var index = parseInt($(this).children('option:selected').attr("index"));
            //     if(name!="null"&&name!=""){
            //         $(".PassengerNameText").eq(index).text(name);
            //     }else{
            //         $(".PassengerNameText").eq(index).text(cName);
            //     }
            // })

            // totalAmount();
            // if(searchIntlInfo.alterTicketInfo){
            //     $(".changePassengerInfo").remove();
            //     $(".changeRemarkBtn").remove();
            //     $(".delIcon").remove();
            // }
            // for(var i=0;i<$(".documentsSelect option").length;i++){
            //     if($(".documentsSelect option").eq(i).val()==1){
            //         $(".documentsSelect option").eq(i).remove();
            //     }
            // }
            // // $(".changeRemarkBtn").hide();
            // $(".delIcon").unbind("click").click(function(){
            //     var customerId = $(this).attr("customerId");
            //     var delMsg=confirm(get_lan("passengerInfo").delMsg);
            //      if (delMsg==true){
            //         $('body').mLoading("show");
            //         $.ajax(
            //           {
            //             type:'post',
            //             url : $.session.get('ajaxUrl'), 
            //             dataType : 'json',
            //             data:{
            //                 url: $.session.get('obtCompany')+"/SystemService.svc/DelPsgPost",
            //                 jsonStr:'{"key":'+netUserId+',"customerId":"'+customerId+'"}'
            //             },
            //             success : function(data) {
            //                 $('body').mLoading("hide");
            //                 var res = JSON.parse(data);
            //                 console.log(res);
            //                 if(res == "Success"){
            //                     passengersInOrder();
            //                 }
            //             },
            //             error : function() {
            //               // alert('fail');
            //             }
            //           } 
            //         );
            //      } 
            // })
            // if($(".choosePassengerBody").css("display")=="none"){
            //     $(".delIcon").remove();
            // }
            // $(".changePassengerInfo").unbind("click").click(function(){
            //     var customerId = $(this).attr("customerId");
            //     var index = parseInt($(this).attr("index"));
            //     var customerRid = $(".documentsSelect").eq(index).val();
            //     var docDelId = $(".documentsSelect").eq(index).children('option:selected').attr("docDelId");
            //     passengerPopChange(customerId,"false",customerRid,docDelId);
            //     $("#cover").unbind("click").click(function(){
            //         closePassengerPop();
            //     })
            // })
            // $(".changeRemarkBtn").unbind("click").click(function(){
            //     var index = parseInt($(this).attr("index"));
            //     $("#cover").unbind("click");
            //     var CompanyID = res[index].OrderCompanyId;
            //     var customerId = res[index].ID;
            //     var employeeName = res[index].NameCN;
            //     remarkInfoPop(CompanyID,customerId,employeeName,"false");
            // })
            // if(customerState=="newCustomer"){
            //     $(".changeRemarkBtn").eq($(".changeRemarkBtn").length-1).click();
            // }
            /*常旅客卡*/
            if(!ProfileInfo.HideMeberShip){
                if(res.length==0){
                    $(".frequentCardsInfo").addClass("hide");
                }
                $(".frequentCardsBody").html('');
                var showFrequentCard = false;
                var listIndex = 0;
                var cardIndex = 0;
                res.map(function(item,index){
                    var name = obtLanguage=="CN"?item.NameCN:item.NameEN;
                    if(item.memberShipList.length>0){
                        $(".frequentCardsBody").append('\
                            <div class="frequentCardsName">'+get_lan("frequentCardsInfo").cardholder+name+'</div>\
                            <div class="frequentCardsList"></div>\
                        ')
                        item.memberShipList.map(function(mItem,mIndex){
                            console.log(mItem);
                            var airlineName = obtLanguage == "CN"?mItem[0].usedAirlineNameCn:mItem[0].usedAirlineNameEn;
                            $(".frequentCardsList").eq(listIndex).append('\
                                <div class="frequentCardsLi flexRow">\
                                  <div class="frequentCardsLiCompany">'+airlineName+'</div>\
                                  <div class="frequentCardsLiNumber">'+get_lan("frequentCardsInfo").number+'<select class="frequentCardsSelect"></select></div>\
                                </div>\
                            ')
                            console.log(cardIndex);
                            mItem.map(function(cItem){
                                $(".frequentCardsSelect").eq(cardIndex).append('\
                                    <option code="'+item.ID+"_"+cItem.usedAirlineCode+'">'+cItem.CardNumbers+'</option>\
                                    ')
                            })
                            cardIndex++;
                        })
                        showFrequentCard = true;
                        listIndex++;
                    }
                })
                if(ProfileInfo.onlineStyle=="APPLE"){
                    $(".frequentCardsName").hide();
                }
                if(showFrequentCard){
                    $(".frequentCardsInfo").removeClass("hide");
                }else{
                    $(".frequentCardsInfo").addClass("hide");
                }
                $(".frequentCardsLi").eq($(".frequentCardsLi").length-1).css("border","0");
            }
            /*苹果*/
            if($(".passengerLi").length==1&&ProfileInfo.onlineStyle=="APPLE"){
                $(".selectPassengerArrow,.selectPassengerSearch").unbind("click").click(function(){
                    alert("There is already a traveler in the order.");
                })
            }else{
                $(".selectPassengerArrow").removeAttr("spread");
                selectPassengers();
            }
            /*有审批单*/
            if(($(".passengerLi").length==1&&$.session.get('TAnumber'))||searchDomInfo.alterTicketInfo){
            // if(JSON.parse($.session.get('ProfileInfo')).HasTravelRequest&&$(".passengerLi").length==1&&!JSON.parse($.session.get('ProfileInfo')).SelectNoTrOption){
                $(".choosePassengerBody").addClass("hide");
            }else{
                $(".choosePassengerBody").removeClass("hide");
            }
        },
        error : function() {
          // alert('fail');
        }
      }
    );
}
//总价格
function totalAmount(){
    var total = parseInt($(".orderDetail").attr('totalPrice'));
    var passengersLength = $(".passengerLi").length==0?1:$(".passengerLi").length;
    total = passengersLength*total;
    // $(".totalAmountText").html('<span style="font-size:16px;">￥</span>'+total);
    $(".totalAmountText").html(total+'<span style="font-size:16px;">'+curreny+'</span>');
	
}
//预订机票
function clickBookBtn(){
    $(".bookTicketBtn").unbind("click").click(function(){
		$('body').mLoading("show");
        if($(this).attr("canBookInterAir")=="false"){
			$('body').mLoading("hide");
            return false;
        }
        if($(".intlReason").length==1){
            var val = $('.intlReasonSelect option:selected').eq(0).val();
            if(val==""){
                alert(get_lan("reasonRemind"));
				$('body').mLoading("hide");
                return false;
            }else if(val =="OT"){
                if($(".reasonText").val()!=""){
                    val = 'OT,'+$(".reasonText").val();
                }else{
                    alert(get_lan("reasonText"));
					$('body').mLoading("hide");
                    return false;
                }
            }
            var queryKey = '0,'+val;
        }else{
            var queryKey = '1,CC';
        }
        // console.log(intlReason);
        if($(".passengerLi").length == 0){
            alert(get_lan('bookTicketRemind'));
        }else{
            if($(this).attr('tw')=="no"&&$(this).attr('nation')=="cn"&&ProfileInfo.onlineStyle=="APPLE"){
                if(obtLanguage=="CN"){
                    alert("台湾的行程，请直接联系Apple Travel预订。");
                }else if(obtLanguage=="EN"){
                    alert("For travel to Taiwan, please contact Apple Travel directly.");
                }
				$('body').mLoading("hide");
                return false;
            }

            if($.session.get('TAnumber')){
                var customerList = '';
                for(var i=0;i<$(".passengerLi").length;i++){
                    customerList += '"'+$(".passengerLi").eq(i).attr("customerId")+'"';
                    customerList += ',';
                }
                customerList = customerList.substring(0,customerList.length-1);
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'), 
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/OrderService.svc/CheckTripCompareTA",
                        jsonStr:'{"request":{"key":'+netUserId+',"TANo":"'+$.session.get('TAnumber')+'","Language":"'+obtLanguage+'","cityList":['+$(".orderDetail").attr("cityList")+'],"timeList":['+$(".orderDetail").attr("timeList")+'],"tripType":"1","customerList":['+customerList+']}}'
                    },
                    success : function(data) {
                        var res = JSON.parse(data);
                        console.log(res);
                        if(res.code==200){
                            checkRepeat();
                        }else{
							$('body').mLoading("hide");
                            alert(res.message);
                        }
                    },
                    error : function() {
                      // alert('fail');
                    }
                  }
                );
            }else{
                checkRepeat();
            }
            function checkRepeat(){
                if(!$(".someAirlineRemind").hasClass("hide")&&!$(".airlineRemindCheck").prop("checked")){
                    alert(get_lan("airlineRemind"));
                    return false;
                }
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'), 
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/OrderService.svc/CheckRepeatOrderBookStrictPost",
                        jsonStr:'{"id":'+netUserId+',"segmentKey":"'+'NO'+'","Language":"'+obtLanguage+'"}'
                    },
                    success : function(data) {
                        $('body').mLoading("hide");
                        var res = JSON.parse(data);
                        console.log(res);
                        if(res.stateValue == 1){
                            alert(res.message.split('<br>').join('\n'));
                        }else if(res.stateValue == 2){
                            var r=confirm(res.message.split('<br>').join('\n'));
                             if (r==true){bookTicket(queryKey);}
                        }else if(res.stateValue == 3){
                            $('body').mLoading("hide");
							alert(res.message.split('<br>').join('\n'))
							if(ProfileInfo.onlineStyle=="APPLE"){
							    var finishedInfo = {
							        'orderNo':res.orderNo,
							    }
							    console.log($.session.get('finishedInfo'));
							    $.session.set('finishedInfo', JSON.stringify(finishedInfo));
							    window.location.href='../../purchaseTrip/purchaseTrip.html';
							}else{
							    /*订单号*/
							    // var searchOrderInfo = {
							    //     'orderNo':res.orderNo,
							    // }
							    // $.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
							    // console.log($.session.get('searchOrderInfo'));
							    // window.location.href='../../orders/orderDetails.html?state=finish';
							}
							
							
                        }else{
                            bookTicket(queryKey);
                        }
                    },
                    error : function() {
                      // alert('fail');
                    }
                  } 
                );
            }
        }
    })
}

function bookTicket(queryKey){
    var otherKey = '';
    var frequentCards = '';
    for(var i=0;i<$(".passengerLi").length;i++){
        if($('.documentsSelect option:selected').eq(i).attr("docText")==""||$('.documentsSelect option:selected').eq(i).attr("docText")==null){
            alert(get_lan("documentRemind"));
            return false;
        }
        otherKey += $(".passengerLi").eq(i).attr("customerId")+"-"+$('.documentsSelect option:selected').eq(i).val()+'-'+$('.documentsSelect option:selected').eq(i).attr("docText")+'-'+$(".passengerPhone").eq(i).attr("hideNo");
        otherKey += ',';
    }
    otherKey = otherKey.substring(0,otherKey.length-1);
    /*常旅客卡*/
    if($(".frequentCardsSelect").length>0&&!$(".frequentCardsInfo").hasClass("hide")){
        for(var i=0;i<$(".frequentCardsSelect").length;i++){
            if($(".frequentCardsSelect").eq(i).find("option:selected").attr("code").split("_")[1]!=""&&$(".frequentCardsSelect").eq(i).find("option:selected").attr("code").split("_")[1]!=null){
                frequentCards+=$(".frequentCardsSelect").eq(i).find("option:selected").attr("code")+'-'+$(".frequentCardsSelect").eq(i).val();
                frequentCards+=','
            }
        }
        frequentCards = frequentCards.substring(0,frequentCards.length-1);
    }
    // frequentCards = frequentCards.substring(0,frequentCards.length-1);
    // frequentCards = ''
    console.log(otherKey);
    console.log(frequentCards);
    // return false;
    var remarkKey ='NO';
    /*改签信息*/
    if(!searchIntlInfo.alterTicketInfo){
        var orgTicketInfo = "NO";
    }else{
        var orgTicketInfo = searchIntlInfo.alterTicketInfo.split(',')[0];
    }
    var isDirectTicket = $(".ricketOutCheckBox").is(':checked');

    if($(".InterSingleReason").length==1){
        var val = $('.InterSingleReasonSelect option:selected').eq(0).val();
        var remarkList = '[{"cutomerId":"'+$(".passengerLi").eq(0).attr("customerId")+'","remarkIndex":"'+$('.InterSingleReasonSelect option:selected').eq(0).attr("Index")+'","remarkValue":"'+val+'"}]';
    }else{
        var remarkList = '[]';
    }
    
    $('body').mLoading("show");
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/OrderService.svc/InterAirBook",
            jsonStr:'{"request":{"id":'+netUserId+',"queryKey":"'+queryKey+'","otherKey":"'+otherKey+'","frequentCards":"'+frequentCards+'","remarkKey":"'+remarkKey+'","includeTax":"true","orgTicketInfo":"'+orgTicketInfo+'","isDirectTicket":"'+isDirectTicket+'","Language":"'+obtLanguage+'","phones":"","orgOrderNo":"","orgPNR":"","remarkList":'+remarkList+'}}'
        },
        success : function(data) {
            $('body').mLoading("hide");
            if(data == ''){
                alert("no return");
            }else{
                var res = JSON.parse(data);
                console.log(res);
                if(res.OrderNo != null){
                    var orderNo = res.OrderNo;
					if($.session.get("TAnumber")&&!$.session.get("TAnumberIndex")){
						$.session.remove("TAnumber");
						$.session.remove("TACustomerId");
					}
					if(orderNo=="SucceedIntExcApplication"){
						alert(res.ErrorMsg)
						// 跳转到原订单详情页
						window.location.href='../../orders/orderDetails.html?state=finish'
					}else{
						changeNewUid(orderNo);
					}
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
                }else if(res.ErrorMsg){
                    alert(res.ErrorMsg);
                }
                else{
                    alert("fail");
                }
            }
        },
        error : function() {
          // alert('fail');
        }
      } 
    );
}

function changeNewUid(orderNo){
    $('body').mLoading("show");
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/SystemService.svc/ChangeNewUid",
            jsonStr:'{"uid":'+netUserId+'}'
        },
        success : function(data) {
            $('body').mLoading("hide");
            var res = JSON.parse(data);
            console.log(res);
            var code = res.code;
            var data = '"'+res.data+'"';
            var message = res.message;
            console.log(code);
            console.log(data);
            console.log(message);
            if(code==200){
                $.session.set('netLoginId', data);
                if(ProfileInfo.onlineStyle=="APPLE"){
                    var finishedInfo = {
                        'orderNo':orderNo,
                    }
                    console.log($.session.get('finishedInfo'));
                    $.session.set('finishedInfo', JSON.stringify(finishedInfo));
                    window.location.href='../../purchaseTrip/purchaseTrip.html';
                }else{
                    /*订单号*/
                    var searchOrderInfo = {
                        'orderNo':orderNo,
                    }
                    $.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
                    console.log($.session.get('searchOrderInfo'));
                    // window.location.href='../../bookFinished/bookFinished.html';
					var TAnumberIndex=$.session.get('TAnumberIndex');
					if(TAnumberIndex != 1){
						$.session.remove("TAnumber")
					}
                    window.location.href='../../orders/orderDetails.html?state=finish';
                }
            }else if(code==504){
                if(obtLanguage=="EN"){
                    alert('Login Timeout.')
                }else if(obtLanguage=="CN"){
                    alert('您的账号已过期，请重新登陆。')
                }
                if(ProfileInfo){
                    window.location.href = ProfileInfo.loginOutUrl;
                }
            }else{
                alert(message)
            }
        },
        error : function() {
          // alert('fail');
        }
      } 
    );
}

function openRemarkPop(){
    $("#cover").show();
    $(".remarkPop").css("display","block");
}
function closeRemarkPop(){
    $("#cover").hide();
    $(".remarkPop").css("display","none");
}
function openPassengerPop(){
    $("#cover").show();
    $(".PassengerPop").css("display","block");
}
function closePassengerPop(){
    $("#cover").hide();
    $(".PassengerPop").css("display","none");
}
//打开关闭newCustomer弹窗
function openNewCustomer(){
    $("#cover").show();
    $(".newCustomerPop").css("display","block");
}
function closeNewCustomer(){
    $("#cover").hide();
    $(".newCustomerPop").css("display","none");
}