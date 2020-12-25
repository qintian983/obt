var language = tools.queryString().language;
var orderNo = tools.queryString().orderNo;
var apiUrl = tools.queryString().apiUrl;
var url = tools.queryString().url;
var customerIds = tools.queryString().customerIds;
var setOption = tools.queryString().setOption;



//语言转换
function get_lan(m)
{
    //获取文字
    var lan = tools.queryString().language;     //语言版本
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
    "itinerary":"行程",
	"headerRemind1":"准备好!",
    "headerRemind2":"这是你新旅行的行程表。",
    "orderFare":"订单总计:",
    "travelInfo":"行程信息:",
    "air":"机票",
    "hotel":"酒店",
    "train":"火车",
    "car":"租车",
    "other":"其他服务",
    "orderNo":"订单编号:",
    "tel":"办公室电话:",
    "emergencyTel":"紧急服务电话:",
    "CompanyName":"公司名:",
    "fax":"传真:",
    "email":"电子邮件:",
    "passenger":"旅客:",
    "status":"状态:",
    "aircraft":"机型:",
    "cabin":"舱位:",
    "meal":"餐食:",
	"seatNum":"座位:",
    "luggage":"行李:",
    "perFare":"单成人费用(CNY):",
    "perChildFare":"单儿童费用(CNY):",
    "perInfantFare":"单婴儿费用(CNY):",
    "tax":"税:",
    "ServiceFee":"服务费:",
    "identityNo":"证件号:",
    "MemberShipCard":"常旅客卡:",
    "ResNumber":"航空公司预订编号:",
    "ETicketNo":"电子机票票号:",
    "total":"总计(CNY):",
    "Restrictions":"客票限制条件:",
    "Validity":"客票有效期:",
    "MinStay":"最短逗留时间:",
    "MaxStay":"最长逗留时间:",
    "RefundCharge":"退票费:",
    "Rebookingfee":"改期费:",
    "city":"城市:",
    "hotelTel":"酒店电话:",
    "hotelFax":"酒店传真:",
    "address":"酒店地址:",
    "checkIn":"入住日期:",
    "checkOut":"离店日期:",
    "roomType":"房型:",
    "rooms":"房间数:",
    "nights":"入住天数:",
    "roomHold":"房间最晚保留时间:",
    "comfirmNo":"确认号:",
    "guaranteed":"信用卡担保:",
    "dailyRate":"销售价(间/夜):",
    "internet":"宽带:",
    "breakfast":"早餐:",
    "totalPrice":"总价:",
	"BookRemark":"订票信息:",
    "trainCode":"车次:",
    "seatType":"座位类型:",
    "seat":"座位:",
    "carType":"车型:",
    "Quantity":"车辆数:",
    "rate":"每日均价:",
    "carTotalPrice":"预估总价:",
    "MandatoryFees":"强制性收费:",
    "Product":"服务项目:",
    "Service":"服务类型:",
    "Client":"客户姓名:",
    "date":"日期:",
    "remark":"备注:",
	"whyNotChosen":"未使用最低票价理由:",
	"passengerInformation":"乘客信息",
	"ticketInformation":"机票信息",
	"Restrictions":"客票限制"
}
var en = {
    "itinerary":"Itinerary",
	"headerRemind1":"GET READY!",
    "headerRemind2":"Here is the itinerary for your upcoming trip.",
    "orderFare":"Order Total:",
    "travelInfo":"Travel information:",
    "air":"Air",
    "hotel":"Hotel",
    "train":"Train",
    "car":"Car",
    "other":"Other Services",
    "orderNo":"Booking Ref:",
    "tel":"Telephone:",
    "emergencyTel":"Emergency service:",
    "CompanyName":"Company Name:",
    "fax":"Fax:",
    "email":"Email:",
    "passenger":"Passenger:",
    "status":"Status:",
    "aircraft":"Aircraft:",
    "cabin":"Cabin:",
    "meal":"Meal:",
	"seatNum":"seatNum:",
    "luggage":"Luggage:",
    "perFare":"Per Adult Fare(CNY):",
    "perChildFare":"Per Child Fare(CNY)(CNY):",
    "perInfantFare":"Per Infant Fare(CNY)(CNY):",
    "tax":"Tax:",
    "ServiceFee":"Service Fee:",
    "identityNo":"Identity No.:",
    "MemberShipCard":"Membership Card:",
    "ResNumber":"Reservation Number:",
    "ETicketNo":"E Ticket No.:",
    "total":"Total(CNY):",
    "Restrictions":"Restrictions:",
    "Validity":"Validity:",
    "MinStay":"Min Stay:",
    "MaxStay":"Max Stay:",
    "RefundCharge":"Refund Charge:",
    "Rebookingfee":"Rebooking fee:",
    "city":"City:",
    "hotelTel":"Tel:",
    "hotelFax":"Fax:",
    "address":"Address:",
    "checkIn":"Check in:",
    "checkOut":"Check out:",
    "roomType":"Room Type:",
    "rooms":"Rooms:",
    "nights":"Nights:",
    "roomHold":"Room Hold Until:",
    "comfirmNo":"Confirmation No.:",
    "guaranteed":"Guaranteed:",
    "dailyRate":"Daily Rate(Room):",
    "internet":"Internet:",
    "breakfast":"Breakfast:",
    "totalPrice":"Total Price:",
	"BookRemark":"Ticket information:",
    "trainCode":"Train code:",
    "seatType":"Seat Type:",
    "seat":"Seat:",
    "carType":"Car Type:",
    "Quantity":"Quantity:",
    "rate":"Average Daily Rate:",
    "carTotalPrice":"Estimated Total Rate",
    "MandatoryFees":"Mandatory Fees:",
    "Product":"Product:",
    "Service":"Service:",
    "Client":"Client:",
    "date":"Date:",
    "remark":"Remark:",
	"whyNotChosen":"Lowest Fare Not Chosen:",
	"passengerInformation":"Passenger information：",
	"ticketInformation":"Ticket information",
	"Restrictions":"Restrictions:"
}
$(function(){
    if(url){
      $('body').mLoading("show");
      $.ajax(
        {
          type:'post',
          url : apiUrl,
          dataType : 'json',
          data:{
              url: url+'/OrderService.svc/GetTravelItineraryReportPost',
              jsonStr:'{"request":{"orderNo":"'+orderNo+'","customerIds":"'+customerIds+'","setOption":"'+setOption+'","language":"'+language+'"}}',
          },
          success : function(data) {
              $('body').mLoading("hide");
              var res = JSON.parse(data);
              console.log(res);
              showContent(res);
              // itineraryInfo(res);
          },
          error : function() {
            // alert('fail');
          }
        }
      );
	  // var rus={"Customers":[{"CustomerRemarks":[{"Name":"分公司(三级单位)","Value":"科技与信息管理处"},{"Name":"档级","Value":"2"},{"Name":"职务级别","Value":"副处级"},{"Name":"职称","Value":"高级工程师"},{"Name":"CNPC 订票单号/授权号/团号","Value":"201908674001"}],"Name":"FANG/HUI","PsgType":"Adult"}],"FeetInfo":"温馨提示\r\n********************************************************************************************************************************\r\n                                                                                           旅行文件\r\n********************************************************************************************************************************\r\n请携带好您的机票,护照及其他入境所必须的旅行文件\r\n1.\t请再次检查确认签证及护照有效期符合目的国入境规定，如有效签证在旧护照上，请提前确认目的国入境规定；如短期签证应持有返程机票；\r\n2.\t因公护照前往免签、电子签或落地签等国家请务必提前开具并携带出境证明，并建议携带免签证明；\r\n3.\t因公出国（境）建议携带邀请函原件或复印件；\r\n4.\t持有中国护照和美国10年签证B1/B2签证类型的旅客，赴美前需携带有效EVUS 确认页；\r\n5.\t乘坐卡塔尔航空（QR）前往伊拉克的旅客，如目的站为NAJAF, 或持有非内政部签发的邀请函前往BAGHDAD或BASRA，请至少提前3个 工作日确认是否需要办理入境确认；\r\n6.\t请提前确认入境国对健康证，预防接种证（疫苗）要求，并携带相应证件。\r\n********************************************************************************************************************************\r\n                                                                                           旅行提示\r\n********************************************************************************************************************************\r\n1.\t请注意：因公出国团组在外时间按离、抵我国国境之日计算，包含出、入境当日。\r\n2.\t国内航班提前45分钟截止办理乘机登记手续；国际航班提前1小时截止办理乘机登记手续；如是代码共享航班，请前往实际承运航空公司柜台办理值机。并请确认您的行李符合机场安检及航空公司的规定。\r\n3.\t请按照客票航程从始发地开始按顺序使用，未按顺序使用可能导致客票全部失效。\r\n4.\t如果您的行程发生变更,请务必于原航班起飞前（至少提前24小时）与当地航空公司或与我们联系,避免因误机或不符合航空公司改期规定而导致机票失效或其它各种不便及损失；\r\n5.\t火车票原件是财务报销凭证，请使用后务必保留好\r\n6.\t请勿轻信关于航班变更的陌生短信！请务必联系百思达旅行顾问或航空公司的官方客服热线。\r\n********************************************************************************************************************************\r\n                                                                                           协议优享\r\n********************************************************************************************************************************\r\n更多折扣、更多免费行李额、更宽松的改退条件尽在专属优选大客户协议价格 (专属价格除中国始发外，还包括中东、非洲、中南美洲多国始发航线），详情请垂询您的旅行顾问或邮件我们cnpc@tour-best.com.\r\n\r\n","HeadInfo":{"CompanyID":"IY5N","CompanyLogo":"..\\..\\itinerary\\images\\companylogo.png","CompanyName":"CNPC ECONOMICS & TECHNOLOGY RESEARCH INSTITUTE","Logo":"..\\..\\itinerary\\images\\logo.png","OrderNo":"201910160081","ServiceOfficeEmail":"mail@tour-best.com","ServiceOfficeEmergencyTel":"13910558621","ServiceOfficeFax":"010-64049866","ServiceOfficeName":"BEST INTERNATIONAL TRAVEL","ServiceOfficeTel":"4006 500 566"},"Option":{"AirHaveCabin":true,"AirHaveIdentity":true,"AirHaveTktNo":true,"HaveCustomerRemark":true,"HaveDetailFare":true,"HavePayment":true,"HavePrice":true,"HaveRang1":true,"HaveRestrict":true,"PriceNotContainServiceFee":true,"SegmentShowPrice":false,"ShowBouncedSegment":true,"ShowCostCenter":false,"ShowLower":true,"ShowOutTicket":true,"ShowReasonCode":true,"showSpCustomer":true},"OrderFare":"61065.00CNY","RptAirExtModel":{"extAdultFare":{"extNominalFare":"53350CNY","extServiceFee":"","extTaxFee":"7715CNY"},"extAirFareAmount":"61065CNY","extChildFare":{"extNominalFare":"","extServiceFee":null,"extTaxFee":null},"extInfantFare":{"extNominalFare":"","extServiceFee":null,"extTaxFee":null},"extPsgInfo":[{"ExtDocumentCard":"PE1025604","ExtMemberShipCard":"CA005180219233","ExtPassengerID":"1558628","ExtPassengerName":"FANG/HUI","ExtTicketNo":"999-6360123694"}],"extRebooking":[{"extFlightNo":"CA931","extLimitInfo":"Free"},{"extFlightNo":"LH500","extLimitInfo":"Free"},{"extFlightNo":"LH501","extLimitInfo":"Free"},{"extFlightNo":"CA966","extLimitInfo":"Free"}],"extRefund":[{"extFlightNo":"CA931","extLimitInfo":"Applied"},{"extFlightNo":"LH500","extLimitInfo":"Applied"},{"extFlightNo":"LH501","extLimitInfo":"Applied"},{"extFlightNo":"CA966","extLimitInfo":"Applied"}],"extReservationNumber":["CA/MJJFSX  1A/QVL66V"],"extRestrictions":[{"extFlightNo":"CA931","extLimitInfo":"Restricted fare valid on selected airlines only"},{"extFlightNo":"LH500","extLimitInfo":"Restricted fare valid on selected airlines only"},{"extFlightNo":"LH501","extLimitInfo":"Restricted fare valid on selected airlines only"},{"extFlightNo":"CA966","extLimitInfo":"Restricted fare valid on selected airlines only"}],"extStayMaxs":[{"extFlightNo":"CA931","extLimitInfo":"1 Year"}],"extStayMins":[{"extFlightNo":"CA931","extLimitInfo":"0 Day"}],"extUnUseLowestPriceReason":["FULL SAVINGS ACHIEVED (LOWER FARE TAKEN - NO MISSED SAVINGS)"],"extValidities":[{"extFlightNo":"CA931","extLimitInfo":"1 Year"}]},"RptAirList":[{"AdultFare":{"NominalFare":"53350CNY","ServiceFee":"","TaxFee":"7715CNY"},"AirFareAmount":"61065CNY","ChildFare":{"NominalFare":null,"ServiceFee":null,"TaxFee":null},"InfantFare":{"NominalFare":null,"ServiceFee":null,"TaxFee":null},"OrderState":"2","OrderStateDes":"Finished","ReservationNumber":"CA/MJJFSX  1A/QVL66V","SegInfoList":[{"AirCraft":"747","AirItemId":"2039734","AirLuggageInfo":"Baggage:2 piece(s) per traveler   ","AirlineCode":"CA","AirlineName":"AIR CHINA","ArrivalDate":"2019-10-26","ArrivalTime":"18:15","ArriveAirport":"FRANKFURT","ArriveAirportCode":"FRA","ArriveCity":"FRANKFURT","ArriveCityCode":"FRA","ArriveTerminal":"1","Cabin":"BusinessC","DeparteAirport":"PEK,CAPITAL AIRPORT","DeparteAirportCode":"PEK","DeparteCity":"BEIJING","DeparteCityCode":"PEK","DeparteTerminal":"T3","DepartureDate":"2019-10-26","DepartureDateOfWeek":"SAT","DepartureTime":"14:00","Durnturn":"10H 15M","FlightNo":"CA931","IsDomestic":false,"Meal":"","PnrCode":"JFSVPB","PsgInfoList":[{"DocumentCard":"PE1025604","MemberShipCard":"CA005180219233","PassengerID":"1558628","PassengerName":"FANG/HUI","TicketNo":"999-6360123694"}]},{"AirCraft":"744","AirItemId":"2039734","AirLuggageInfo":"Baggage:2 piece(s) per traveler   ","AirlineCode":"LH","AirlineName":"LUFTHANSA","ArrivalDate":"2019-10-27","ArrivalTime":"04:50","ArriveAirport":"RIO DE JANEIRO INTERNATIONAL APT","ArriveAirportCode":"GIG","ArriveCity":"RIO DE JANEIRO","ArriveCityCode":"RIO","ArriveTerminal":"2","Cabin":"BusinessC","DeparteAirport":"FRANKFURT","DeparteAirportCode":"FRA","DeparteCity":"FRANKFURT","DeparteCityCode":"FRA","DeparteTerminal":"1","DepartureDate":"2019-10-26","DepartureDateOfWeek":"SAT","DepartureTime":"22:15","Durnturn":"11H 35M","FlightNo":"LH500","IsDomestic":false,"Meal":"MEAL","PnrCode":"JFSVPB","PsgInfoList":[{"DocumentCard":"PE1025604","MemberShipCard":"CA005180219233","PassengerID":"1558628","PassengerName":"FANG/HUI","TicketNo":"999-6360123694"}]},{"AirCraft":"744","AirItemId":"2039734","AirLuggageInfo":"Baggage:2 piece(s) per traveler   ","AirlineCode":"LH","AirlineName":"LUFTHANSA","ArrivalDate":"2019-11-02","ArrivalTime":"10:55","ArriveAirport":"FRANKFURT","ArriveAirportCode":"FRA","ArriveCity":"FRANKFURT","ArriveCityCode":"FRA","ArriveTerminal":"1","Cabin":"BusinessC","DeparteAirport":"RIO DE JANEIRO INTERNATIONAL APT","DeparteAirportCode":"GIG","DeparteCity":"RIO DE JANEIRO","DeparteCityCode":"RIO","DeparteTerminal":"2","DepartureDate":"2019-11-01","DepartureDateOfWeek":"FRI","DepartureTime":"19:35","Durnturn":"10H 20M","FlightNo":"LH501","IsDomestic":false,"Meal":"MEAL","PnrCode":"JFSVPB","PsgInfoList":[{"DocumentCard":"PE1025604","MemberShipCard":"CA005180219233","PassengerID":"1558628","PassengerName":"FANG/HUI","TicketNo":"999-6360123694"}]},{"AirCraft":"773","AirItemId":"2039734","AirLuggageInfo":"Baggage:2 piece(s) per traveler   ","AirlineCode":"CA","AirlineName":"AIR CHINA","ArrivalDate":"2019-11-03","ArrivalTime":"06:15","ArriveAirport":"PEK,CAPITAL AIRPORT","ArriveAirportCode":"PEK","ArriveCity":"BEIJING","ArriveCityCode":"PEK","ArriveTerminal":"T3","Cabin":"BusinessC","DeparteAirport":"FRANKFURT","DeparteAirportCode":"FRA","DeparteCity":"FRANKFURT","DeparteCityCode":"FRA","DeparteTerminal":"1","DepartureDate":"2019-11-02","DepartureDateOfWeek":"SAT","DepartureTime":"14:05","Durnturn":"10H 10M","FlightNo":"CA966","IsDomestic":false,"Meal":"","PnrCode":"JFSVPB","PsgInfoList":[{"DocumentCard":"PE1025604","MemberShipCard":"CA005180219233","PassengerID":"1558628","PassengerName":"FANG/HUI","TicketNo":"999-6360123694"}]}],"StayMaxs":"1 Year","StayMins":"0 Day","TktRebooking":"Free","TktRefund":"Applied","TktRestrictions":"Restricted fare valid on selected airlines only","TktValidities":"1 Year","UnUseLowestPriceReason":"FULL SAVINGS ACHIEVED (LOWER FARE TAKEN - NO MISSED SAVINGS)","ticketDeadLine":"2019-10-21 15:13"}],"RptCarList":[],"RptHotelList":[],"RptMiscellList":[],"RptTrainList":[],"code":"200","message":null}
	  // showContent(rus);
	  // itineraryInfo(rus);
    }
})
function showContent(res){
    var showFax = res.HeadInfo.ServiceOfficeFax==""?"hide":"";
	var showOrder=res.Option.HavePrice?'':'hide'
    $("#main").html('\
        <div class="autoCenter">\
          <div class="header">\
            <div class="tittle">\
              <img class="logo">\
              '+get_lan("itinerary")+'\
              <img class="companyLogo">\
            </div>\
            <div class="flexWrap tittleInfo">\
              <div >'+res.HeadInfo.ServiceOfficeName+'</div>\
              <div >'+get_lan("fax")+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+res.HeadInfo.ServiceOfficeFax+'</div>\
              <div >'+get_lan("tel")+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+res.HeadInfo.ServiceOfficeTel+'</div>\
              <div >'+get_lan("emergencyTel")+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+res.HeadInfo.ServiceOfficeEmergencyTel+'</div>\
              <div >'+get_lan("email")+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+res.HeadInfo.ServiceOfficeEmail+'</div>\
            </div>\
            <div class="headerInfo flexWrap"></div>\
            <div class="headerRemind">\
              <span style="color:#041E5B;font-size:36px;">'+get_lan("headerRemind1")+'</span>\
              <span style="color:#5A88C6;font-size:24px;">'+get_lan("headerRemind2")+'</span>\
              <div class="orderFare '+showOrder+'">'+get_lan("orderFare")+'</div>\
            </div>\
          </div>\
          <div class="airInfo hide">\
            <div class="infoTittle">'+get_lan("air")+'</div>\
            <div class="airInfoBody"></div>\
          </div>\
          <div class="hotelInfo hide">\
            <div class="infoTittle">'+get_lan("hotel")+'</div>\
            <div class="hotelInfoBody"></div>\
          </div>\
          <div class="trainInfo hide">\
            <div class="infoTittle">'+get_lan("train")+'</div>\
            <div class="trainInfoBody"></div>\
          </div>\
          <div class="footer" style="font-size:16px;box-sizing:border-box;padding:20px;">'+res.FeetInfo+'</div>\
        </div>\
        ')
		itineraryInfo(res);
}
 /*10-23移除
		<div class="carInfo hide">\
            <div class="infoTittle">'+get_lan("car")+'</div>\
            <div class="carInfoBody"></div>\
          </div>\
          <div class="otherInfo hide">\
            <div class="infoTittle">'+get_lan("other")+'</div>\
            <div class="otherInfoBody"></div>\
          </div>\*/

function itineraryInfo(res){
    $(".logo").attr("src",res.HeadInfo.Logo);
	// var imgHad=tools.isHasImg(res.HeadInfo.CompanyLogo)
	// console.log(imgHad)
	// tools.isHasImg(res.HeadInfo.CompanyLogo,'.companyLogo',1)
	
	tools.isHasImg("..\/..\/itinerary\/images\/"+res.HeadInfo.CompanyID+".png",'.companyLogo',1)
	
	// if(imgHad){
	// 	$(".companyLogo").attr("src",res.HeadInfo.CompanyLogo);
	// }else{
	// 	$(".companyLogo").remove()
	// }
    $(".orderFare").append(res.OrderFare);
    if(!res.Option.HavePrice){
      $(".orderFare").remove();
    }
    $(".headerInfo").html('\
        <div class="headerInfoLi flexRow">\
          <div class="headerInfoLiTittle" style="width:550px;font-weight:bold;font-size:20px;">'+get_lan("travelInfo")+'</div>\
          <div class="headerInfoLiBody"></div>\
        </div>\
        <div class="headerInfoLi flexRow">\
          <div class="headerInfoLiTittle"></div>\
          <div class="headerInfoLiBody"></div>\
        </div>\
        <div class="headerInfoLi flexRow">\
          <div class="headerInfoLiTittle">'+get_lan("CompanyName")+'</div>\
          <div class="headerInfoLiBody">'+res.HeadInfo.CompanyName+'</div>\
        </div>\
        <div class="headerInfoLi flexRow">\
          <div class="headerInfoLiTittle">'+get_lan("orderNo")+'</div>\
          <div class="headerInfoLiBody">'+res.HeadInfo.OrderNo+'</div>\
        </div>\
        <div class="customerInfoLi flexRow">\
          <div class="headerInfoLiTittle">'+get_lan("passenger")+'</div>\
          <div class="customerLiBody"></div>\
        </div>\
    ')
	var showRemark=res.Option.HaveCustomerRemark;
	// 12.24机票按照时间排序
	var finaAirList=[]
	
    res.Customers.map(function(item,index){
      $(".customerLiBody").append('\
        <div><span style="margin-right:30px;"">'+item.Name+'&nbsp;&nbsp;&nbsp;&nbsp;'+item.PsgType+'</span></div>\
        <div class="customerRemark"></div>\
        ')
		if(showRemark){
		  item.CustomerRemarks.map(function(cItem){
			$(".customerRemark").eq(index).append('\
			  <div class="flexRow">\
				<div class="remarkTittle">'+cItem.Name+':</div>\
				<div class="remarkBody">'+cItem.Value+'</div>\
			  </div>\
			')
		  })
		}
    })
    /*机票*/
    if(res.RptAirList.length>0){
      $(".airInfo").removeClass("hide");
      $(".airInfoBody").append('\
          <div class="flightList"></div>\
      ')
      res.RptAirList.map(function(item,index){
		  
        var showFee = item.AdultFare.NominalFare==""||item.AdultFare.NominalFare==null||!res.Option.HaveDetailFare?"hide":"";
        var showServiceFee = item.AdultFare.ServiceFee==""?"hide":"";
        var showChildFare = item.ChildFare.NominalFare==null?"hide":"";
        var showInfantFare = item.InfantFare.NominalFare==null?"hide":"";
        var showHaveRestrict = res.Option.HaveRestrict?"":"hide";
        var showTotal = item.AirFareAmount=="0CNY"?"hide":"";
		var opt=res.Option;
		var caption = opt.AirHaveCabin?'':'hide'// 显示舱位
		item.SegInfoList.map(function(airItem){
			  airItem.caption=caption
			  airItem.OrderStateDes=item.OrderStateDes
			  finaAirList.push(airItem)
		  })
			return false;
		  
        $(".flightList").append('\
          <div class="flightLi">\
            \
          </div>\
          ')
        // item.SegInfoList[0].PsgInfoList.map(function(pItem){
        //   $(".passengerAir").eq(index).append("<span style='margin-right:20px;'>"+pItem.PassengerName+"</span>")
        //   $(".documentAir").eq(index).append("<span style='margin-right:20px;'>"+pItem.DocumentCard+";"+pItem.PassengerName+"</span>")
        //   if(pItem.MemberShipCard!=null&&pItem.MemberShipCard!=""){
        //     $(".membershipAir").eq(index).append("<span style='margin-right:20px;'>"+pItem.MemberShipCard+";"+pItem.PassengerName+"</span>")
        //   }
        //   $(".eTicket").eq(index).append("<span style='margin-right:20px;'>"+pItem.TicketNo+";</span>")
        // })
		//12.17去掉宽度
		//  <div class="airlineInfoLi flexRow" style="width:15%;">
		
		
		
		
		
		item.SegInfoList.map(function(sItem){
		// 12.17
		// 座位号是否显示
		var showSeat=sItem.PsgInfoList[0].SeatNum?"":"hide"
			var SeatNumStr=""
			sItem.PsgInfoList.map(function(PsgInfo){
				SeatNumStr=SeatNumStr+PsgInfo.SeatNum+","
			})
			SeatNumStr=SeatNumStr.substring(0,SeatNumStr.length-1)
          $(".flightLi").eq(index).append('\
            <div class="flightInfo">\
              <div style="height:100px;">\
                <div class="airlineName">'+'<span style="color:#ED8322;padding-right:35px">'+sItem.FlightNo+'</span>'+sItem.AirlineName+'</div>\
                <div class="airlineInfo flexRow">\
                  <div class="airlineInfoLi flexRow">\
                    <div class="airlineInfoLiTittle">'+get_lan("status")+'</div>\
                    <div style="color:#599903">'+item.OrderStateDes+'</div>\
                  </div>\
                  <div class="airlineInfoLi flexRow">\
                    <div class="airlineInfoLiTittle">'+get_lan("aircraft")+'</div>\
                    <div style="color:#000">'+sItem.AirCraft+'</div>\
                  </div>\
                  <div class="airlineInfoLi flexRow ' + caption +'">\
                    <div class="airlineInfoLiTittle">'+get_lan("cabin")+'</div>\
                    <div style="color:#000">'+sItem.Cabin+'</div>\
                  </div>\
                  <div class="airlineInfoLi flexRow" >\
                    <div class="airlineInfoLiTittle">'+get_lan("meal")+'</div>\
                    <div style="color:#000">'+sItem.Meal+'</div>\
                  </div>\
				  <div class="airlineInfoLi flexRow '+ showSeat +'" style="width:15%;">\
				    <div class="airlineInfoLiTittle">'+get_lan("seatNum")+'</div>\
				    <div style="color:#000">'+SeatNumStr+'</div>\
				  </div>\
                  <div class="airlineInfoLi flexRow" style="width:15%;">\
                    <div class="airlineInfoLiTittle hide">'+get_lan("luggage")+'</div>\
                    <div style="color:#000">'+sItem.AirLuggageInfo+'</div>\
                  </div>\
                </div>\
              </div>\
              <div style="min-height:198px;background:#fff;">\
                <div class="tripInfo">\
                  <div class="flexRow" style="padding-top:30px;box-sizing:border-box;">\
                    <div class="airportInfo">'+sItem.DeparteAirport+'</div>\
                    <div class="airportInfo"></div>\
                    <div class="airportInfo">'+sItem.ArriveAirport+'</div>\
                  </div>\
                  <div class="flexRow">\
                    <div class="airportInfo">('+sItem.DeparteAirportCode+')<span style="color:#599903;margin-left:10px;">'+sItem.DeparteTerminal+'</span></div>\
                    <div class="airportInfo"></div>\
                    <div class="airportInfo">('+sItem.ArriveAirportCode+')<span style="color:#599903;margin-left:10px;">'+sItem.ArriveTerminal+'</span></div>\
                  </div>\
                  <div class="flexRow">\
                    <div class="airportInfo" style="color:#000;font-size:16px;">'+sItem.DepartureDate+' '+sItem.DepartureTime+'</div>\
                    <div class="airportInfo" style="color:#000;font-size:16px;"></div>\
                    <div class="airportInfo" style="color:#000;font-size:16px;">'+sItem.ArrivalDate+' '+sItem.ArrivalTime+'</div>\
                  </div>\
                  <div class="line1"></div>\
                  <div class="line2"></div>\
                  <div class="Durnturn">'+sItem.Durnturn+'</div>\
                </div>\
              </div>\
            </div>\
            ')
        })
      })
	  
	 
	  // 机票排序
	  finaAirList.sort(function(m,n){
		  var mDate=new Date(m.DepartureDate+" "+m.DepartureTime).getTime()
		  var nDate=new Date(n.DepartureDate+" "+n.DepartureTime).getTime()
		  if(mDate>nDate){
			return 1
			}else if(mDate<nDate){
			  return -1
			}else{
				return 0
			}
	  })
	  sortAir(finaAirList)
	  // 显示机票信息
	  function sortAir(finaAirList){
		  console.log(finaAirList)
		  finaAirList.map(function(sItem,index){
		  // 12.17
		  // 座位号是否显示
		  $(".flightList").append('\
		    <div class="flightLi">\
		      \
		    </div>\
		    ')
		  var showSeat=sItem.PsgInfoList[0].SeatNum?"":"hide"
		  	var SeatNumStr=""
		  	sItem.PsgInfoList.map(function(PsgInfo){
		  		SeatNumStr=SeatNumStr+PsgInfo.SeatNum+","
		  	})
		  	SeatNumStr=SeatNumStr.substring(0,SeatNumStr.length-1)
		    $(".flightLi").eq(index).append('\
		      <div class="flightInfo">\
		        <div style="height:100px;">\
		          <div class="airlineName">'+'<span style="color:#ED8322;padding-right:35px">'+sItem.FlightNo+'</span>'+sItem.AirlineName+'</div>\
		          <div class="airlineInfo flexRow">\
		            <div class="airlineInfoLi flexRow">\
		              <div class="airlineInfoLiTittle">'+get_lan("status")+'</div>\
		              <div style="color:#599903">'+sItem.OrderStateDes+'</div>\
		            </div>\
		            <div class="airlineInfoLi flexRow">\
		              <div class="airlineInfoLiTittle">'+get_lan("aircraft")+'</div>\
		              <div style="color:#000">'+sItem.AirCraft+'</div>\
		            </div>\
		            <div class="airlineInfoLi flexRow ' + sItem.caption +'">\
		              <div class="airlineInfoLiTittle">'+get_lan("cabin")+'</div>\
		              <div style="color:#000">'+sItem.Cabin+'</div>\
		            </div>\
		            <div class="airlineInfoLi flexRow" >\
		              <div class="airlineInfoLiTittle">'+get_lan("meal")+'</div>\
		              <div style="color:#000">'+sItem.Meal+'</div>\
		            </div>\
		  		  <div class="airlineInfoLi flexRow '+ showSeat +'" style="width:15%;">\
		  		    <div class="airlineInfoLiTittle">'+get_lan("seatNum")+'</div>\
		  		    <div style="color:#000">'+SeatNumStr+'</div>\
		  		  </div>\
		            <div class="airlineInfoLi flexRow" style="width:15%;">\
		              <div class="airlineInfoLiTittle hide">'+get_lan("luggage")+'</div>\
		              <div style="color:#000">'+sItem.AirLuggageInfo+'</div>\
		            </div>\
		          </div>\
		        </div>\
		        <div style="min-height:198px;background:#fff;">\
		          <div class="tripInfo">\
		            <div class="flexRow" style="padding-top:30px;box-sizing:border-box;">\
		              <div class="airportInfo">'+sItem.DeparteAirport+'</div>\
		              <div class="airportInfo"></div>\
		              <div class="airportInfo">'+sItem.ArriveAirport+'</div>\
		            </div>\
		            <div class="flexRow">\
		              <div class="airportInfo">('+sItem.DeparteAirportCode+')<span style="color:#599903;margin-left:10px;">'+sItem.DeparteTerminal+'</span></div>\
		              <div class="airportInfo"></div>\
		              <div class="airportInfo">('+sItem.ArriveAirportCode+')<span style="color:#599903;margin-left:10px;">'+sItem.ArriveTerminal+'</span></div>\
		            </div>\
		            <div class="flexRow">\
		              <div class="airportInfo" style="color:#000;font-size:16px;">'+sItem.DepartureDate+' '+sItem.DepartureTime+'</div>\
		              <div class="airportInfo" style="color:#000;font-size:16px;"></div>\
		              <div class="airportInfo" style="color:#000;font-size:16px;">'+sItem.ArrivalDate+' '+sItem.ArrivalTime+'</div>\
		            </div>\
		            <div class="line1"></div>\
		            <div class="line2"></div>\
		            <div class="Durnturn">'+sItem.Durnturn+'</div>\
		          </div>\
		        </div>\
		      </div>\
		      ')
		  })
	  }
	  
	   console.log(finaAirList)
	  
    }
	
	
	// 详细信息
	var detailedInfo=res.RptAirExtModel
	console.log()
	// 证件号
	var identltyStr='';
	// 常旅客卡
	var MemberShipCardStr=''
	
	// 电子机票票号
	var ETicketNoStr=''
	if(detailedInfo.extPsgInfo.length>0){
		identltyStr=detailedInfo.extPsgInfo[0].ExtDocumentCard+';'+detailedInfo.extPsgInfo[0].ExtPassengerName
		ETicketNoStr=detailedInfo.extPsgInfo[0].ExtTicketNo+';'+detailedInfo.extPsgInfo[0].ExtPassengerName
		MemberShipCardStr=detailedInfo.extPsgInfo[0].ExtMemberShipCard;
		for(let i=1;i<detailedInfo.extPsgInfo.length;i++){
			identltyStr=identltyStr+'</br>'+detailedInfo.extPsgInfo[i].ExtDocumentCard+';'+detailedInfo.extPsgInfo[i].ExtPassengerName
			ETicketNoStr=ETicketNoStr+'</br>'+detailedInfo.extPsgInfo[i].ExtTicketNo+';'+detailedInfo.extPsgInfo[i].ExtPassengerName
		}
	}
	console.log(ETicketNoStr)
	if(MemberShipCardStr==''){
		MemberShipCardStr='-'
	}
	// 改期费
	var rebooking='';
	if(detailedInfo.extRebooking.length>0){
		rebooking=detailedInfo.extRebooking[0].extFlightNo+';'+detailedInfo.extRebooking[0].extLimitInfo
		for(let i=1;i<detailedInfo.extRebooking.length;i++){
			rebooking=rebooking+'</br>'+detailedInfo.extRebooking[i].extFlightNo+';'+detailedInfo.extRebooking[i].extLimitInfo
		}
	}
	//退票费
	var refund=''
	if(detailedInfo.extRefund.length>0){
		refund=detailedInfo.extRefund[0].extFlightNo+';'+detailedInfo.extRefund[0].extLimitInfo
		for(let i=1;i<detailedInfo.extRefund.length;i++){
			refund=refund+'</br>'+detailedInfo.extRefund[i].extFlightNo+';'+detailedInfo.extRefund[i].extLimitInfo
		}
	}
	// 滞留时间
	// var minStay=detailedInfo.extStayMins[0].extLimitInfo,
	// 	maxStay=detailedInfo.extStayMaxs[0].extLimitInfo,
	// 	Validities=detailedInfo.extValidities[0].extLimitInfo
	var minStay='',
		maxStay='',
		Validities=''
	if(detailedInfo.extStayMins.length>0){
		minStay=detailedInfo.extStayMins[0].extFlightNo+';'+detailedInfo.extStayMins[0].extLimitInfo
		for(let i=1;i<detailedInfo.extStayMins.length;i++){
			minStay=minStay+'</br>'+detailedInfo.extStayMins[i].extFlightNo+';'+detailedInfo.extStayMins[i].extLimitInfo
		}
	}
	if(detailedInfo.extStayMaxs.length>0){
		maxStay=detailedInfo.extStayMaxs[0].extFlightNo+';'+detailedInfo.extStayMaxs[0].extLimitInfo
		for(let i=1;i<detailedInfo.extStayMaxs.length;i++){
			maxStay=maxStay+'</br>'+detailedInfo.extStayMaxs[i].extFlightNo+';'+detailedInfo.extStayMaxs[i].extLimitInfo
		}
	}
	if(detailedInfo.extValidities.length>0){
		Validities=detailedInfo.extValidities[0].extFlightNo+';'+detailedInfo.extValidities[0].extLimitInfo;
		for(let i=1;i<detailedInfo.extValidities.length;i++){
			Validities=Validities+'</br>'+detailedInfo.extValidities[i].extFlightNo+';'+detailedInfo.extValidities[i].extLimitInfo
		}
	}
	// 客票限制条件
	// var RestrictionsStr=detailedInfo.extRestrictions[0].extLimitInfo
	var RestrictionsStr='';
	if(detailedInfo.extRestrictions.length>0){
		RestrictionsStr=detailedInfo.extRestrictions[0].extFlightNo+';'+detailedInfo.extRestrictions[0].extLimitInfo;
		for(let i=1;i<detailedInfo.extRestrictions.length;i++){
			RestrictionsStr=RestrictionsStr+'</br>'+detailedInfo.extRestrictions[i].extFlightNo+';'+detailedInfo.extRestrictions[i].extLimitInfo
		}
	}
	// 在最后一个.flightList插入所有信息
	// 机票信息是否显示
	var opt=res.Option;
	console.log(opt)
	
	var price = opt.HavePrice?'':'hide';//显示价格
	var priceDatile= opt.HavePrice && opt.HaveDetailFare ? '':'hide';//显示价格详情
	var ShowReasonCode=opt.ShowReasonCode?'':'hide' ;//未使用最低票价理由
	var ticketInformation=(price=='' || ShowReasonCode=='') ?'':'hide'
	var showHaveRestrict=opt.HaveRestrict?'':'hide';//显示航空条件限制
	var showIdentity=opt.AirHaveIdentity?'':'hide';//显示证件
	var showTktNo=opt.AirHaveTktNo?'':'hide';//显示电子票号
	
	
	
	if(detailedInfo.extAdultFare.extServiceFee==''){
		detailedInfo.extAdultFare.extServiceFee='0CNY'
	}
	if(detailedInfo.extAdultFare.extNominalFare==''){
		detailedInfo.extAdultFare.extNominalFare='0CNY'
	}
	if(detailedInfo.extAdultFare.extTaxFee==''){
		detailedInfo.extAdultFare.extTaxFee='0CNY'
	}
	if(detailedInfo.extAirFareAmount==''){
		detailedInfo.extAirFareAmount='0CNY'
	}
	
	// var showFee = opt.AdultFare.NominalFare==""||opt.AdultFare.NominalFare==null?"hide":"";
	// var showServiceFee = opt.AdultFare.ServiceFee==""?"hide":"";
	// var showChildFare = opt.ChildFare.NominalFare==null?"hide":"";
	// var showInfantFare = opt.InfantFare.NominalFare==null?"hide":"";
	// var showHaveRestrict = res.Option.HaveRestrict?"":"hide";
	$(".flightList").append('\
	 <div class="flightLiInfo">\
	 		  <div class="flightLiInfoTittle black3">'+get_lan("passengerInformation")+'</div>\
	 		  <div class="flexRow '+showIdentity+'">\
	 		    <div class="flightLiInfoTittle">'+get_lan("identityNo")+'</div>\
	 		    <div class="flightLiInfoBody documentAir">'+identltyStr+'</div>\
	 		  </div>\
	             <div class="flexRow">\
	               <div class="flightLiInfoTittle">'+get_lan("MemberShipCard")+'</div>\
	               <div class="flightLiInfoBody membershipAir">'+MemberShipCardStr+'</div>\
	             </div>\
	             <div class="flexRow '+showTktNo+'">\
	               <div class="flightLiInfoTittle">'+get_lan("ETicketNo")+'</div>\
	               <div class="flightLiInfoBody eTicket">'+ETicketNoStr+'</div>\
	             </div>\
	             <div class="flexRow">\
	               <div class="flightLiInfoTittle">'+get_lan("ResNumber")+'</div>\
	               <div class="flightLiInfoBody">'+detailedInfo.extReservationNumber+'</div>\
	             </div>\
	 			<div class="flightLiInfoTittle black3 '+ ticketInformation +'">'+get_lan("ticketInformation")+'</div>\
	 			<div class="flexRow '+ priceDatile +'">\
	 			  <div class="flightLiInfoTittle">'+get_lan("perFare")+'</div>\
	 			  <div class="taxInfoBody">'+detailedInfo.extAdultFare.extNominalFare+'</div>\
	 			  <div class="taxTittle">'+get_lan("tax")+'</div>\
	 			  <div class="taxInfoBody">'+detailedInfo.extAdultFare.extTaxFee+'</div>\
	 			  <div class="taxTittle">'+get_lan("ServiceFee")+'</div>\
	 			  <div class="taxInfoBody">'+detailedInfo.extAdultFare.extServiceFee+'</div>\
	 			</div>\
	 			<div class="flexRow '+ price +'">\
	 			  <div class="flightLiInfoTittle">'+get_lan("total")+'</div>\
	 			  <div class="flightLiInfoBody">'+detailedInfo.extAirFareAmount+'</div>\
	 			</div>\
	 			<div class="flexRow">\
	 			  <div class="flightLiInfoTittle '+ ShowReasonCode +'">'+get_lan("whyNotChosen")+'</div>\
	 			  <div class="flightLiInfoBody '+ ShowReasonCode +'">'+detailedInfo.extUnUseLowestPriceReason[0]+'</div>\
	 			</div>\
	 			<div class="flightLiInfoTittle black3 ' + showHaveRestrict +'">'+get_lan("Restrictions")+'</div>\
	 			<div class="' + showHaveRestrict +'">\
					<div class="flexRow">\
					  <div class="flightLiInfoTittle">'+get_lan("RefundCharge")+'</div>\
					  <div class="flightLiInfoBody">'+refund+'</div>\
					</div>\
					<div class="flexRow">\
					  <div class="flightLiInfoTittle">'+get_lan("Rebookingfee")+'</div>\
					  <div class="flightLiInfoBody">'+rebooking+'</div>\
					</div>\
					<div class="flexRow">\
					  <div class="flightLiInfoTittle">'+get_lan("Restrictions")+'</div>\
					  <div class="flightLiInfoBody">'+RestrictionsStr+'</div>\
					</div>\
					<div class="flexRow">\
					  <div class="flightLiInfoTittle">'+get_lan("Validity")+'</div>\
					  <div class="flightLiInfoBody">'+Validities+'</div>\
					</div>\
					<div class="flexRow">\
					  <div class="flightLiInfoTittle">'+get_lan("MinStay")+'</div>\
					  <div class="flightLiInfoBody">'+minStay+'</div>\
					</div>\
					<div class="flexRow">\
					  <div class="flightLiInfoTittle">'+get_lan("MaxStay")+'</div>\
					  <div class="flightLiInfoBody">'+maxStay+'</div>\
					</div>\
					<div class="flexRow">\
					  <div class="flightLiInfoTittle">'+get_lan("remark")+'</div>\
					  <div class="flightLiInfoBody">-</div>\
					</div>\
	 			</div>\
	           </div>\
	  ')
	
    /*酒店*/
    if(res.RptHotelList.length>0){
      $(".hotelInfo").removeClass("hide");
      res.RptHotelList.map(function(item){
        var showLan = item.LAN==""?"hide":"";
        var showBreakfast = item.Breakfast==""?"hide":"";
        $(".hotelInfoBody").append('\
          <div class="hotelLi">\
            <div class="hotelLiInfo">\
              <div class="flexRow">\
                <div style="width:324px;color:#041E5B;">'+item.HotelName+'</div>\
                <div class="hotelInfoTittle">'+get_lan("city")+'</div>\
                <div>'+item.CityName+'</div>\
              </div>\
              <div class="flexRow">\
                <div class="hotelInfoTittle">'+get_lan("hotelTel")+'</div>\
                <div style="width:224px;">'+item.HotelTel+'</div>\
                <div class="hotelInfoTittle">'+get_lan("hotelFax")+'</div>\
                <div style="width:200px;">'+item.HotelFaxNo+'</div>\
                <div class="hotelInfoTittle">'+get_lan("address")+'</div>\
                <div>'+item.HotelAddress+'</div>\
              </div>\
            </div>\
            <div class="hotelLiBody">\
              <div class="flexRow">\
                <div class="hotelLiTittle">'+get_lan("passenger")+'</div>\
                <div class="hotelLiContent">'+item.PassengerName+'</div>\
              </div>\
              <div class="flexRow">\
                <div class="hotelLiTittle">'+get_lan("checkIn")+'</div>\
                <div class="hotelLiContent" style="width:150px;">'+item.CheckIn+'</div>\
                <div class="hotelLiTittle">'+get_lan("checkOut")+'</div>\
                <div class="hotelLiContent">'+item.CheckOut+'</div>\
              </div>\
              <div class="flexRow">\
                <div class="hotelLiTittle">'+get_lan("roomType")+'</div>\
                <div class="hotelLiContent" style="width:150px;">'+item.RoomName+'</div>\
                <div class="hotelLiTittle">'+get_lan("rooms")+'</div>\
                <div class="hotelLiContent" style="width:150px;">'+item.Rooms+'</div>\
                <div class="hotelLiTittle">'+get_lan("nights")+'</div>\
                <div class="hotelLiContent">'+item.Nights+'</div>\
              </div>\
              <div class="flexRow">\
                <div class="hotelLiTittle">'+get_lan("roomHold")+'</div>\
                <div class="hotelLiContent">'+item.Deadline+'</div>\
              </div>\
              <div class="flexRow">\
                <div class="hotelLiTittle">'+get_lan("comfirmNo")+'</div>\
                <div class="hotelLiContent">'+item.ConfirmNo+'</div>\
              </div>\
              <div class="flexRow">\
                <div class="hotelLiTittle">'+get_lan("dailyRate")+'</div>\
                <div class="hotelLiContent">'+item.HotelDailyFare+'</div>\
              </div>\
              <div class="flexRow '+showLan+'">\
                <div class="hotelLiTittle">'+get_lan("internet")+'</div>\
                <div class="hotelLiContent">'+item.LAN+'</div>\
              </div>\
              <div class="flexRow '+showBreakfast+'">\
                <div class="hotelLiTittle">'+get_lan("breakfast")+'</div>\
                <div class="hotelLiContent">'+item.Breakfast+'</div>\
              </div>\
              <div class="flexRow">\
                <div class="hotelLiTittle">'+get_lan("totalPrice")+'</div>\
                <div class="hotelLiContent">'+item.HotelFareAmount+'</div>\
              </div>\
            </div>\
          </div>\
          ');
      })
    }
    /*火车*/
    if(res.RptTrainList.length>0){
      $(".trainInfo").removeClass("hide");
      res.RptTrainList.map(function(item){
		var TrainServiceFee=item.TrainServiceFee?item.TrainServiceFee:"0.00CNY"
        $(".trainInfoBody").append('\
          <div class="trainInfoLi">\
            <div class="railInfo flexRow">\
              <div class="railInfoLi flexRow">\
                <div class="airlineInfoLiTittle">'+get_lan("trainCode")+'</div>\
                <div>'+item.TrainCode+'</div>\
              </div>\
              <div class="railInfoLi flexRow">\
                <div class="airlineInfoLiTittle">'+get_lan("seatType")+'</div>\
                <div>'+item.TrainSeat+'</div>\
              </div>\
            </div>\
            <div class="tripInfo" style="background:#fff;border-bottom:1px solid #d8d8d8;">\
              <div class="flexRow" style="padding-top:30px;box-sizing:border-box;">\
                <div class="airportInfo">'+item.TrainDeparte+'</div>\
                <div class="airportInfo"></div>\
                <div class="airportInfo">'+item.TrainArrive+'</div>\
              </div>\
              <div class="flexRow">\
                <div class="airportInfo">('+item.TrainDeparteCode+')</div>\
                <div class="airportInfo"></div>\
                <div class="airportInfo">('+item.TrainArriveCode+')</div>\
              </div>\
              <div class="flexRow">\
                <div class="airportInfo" style="color:#000;font-size:16px;">'+item.TrainDepartureDate+' '+item.TrainDepartureTime+'</div>\
                <div class="airportInfo" style="color:#000;font-size:16px;"></div>\
                <div class="airportInfo" style="color:#000;font-size:16px;">'+item.TrainArriveDate+' '+item.TrainArriveTime+'</div>\
              </div>\
              <div class="line1"></div>\
              <div class="line2"></div>\
              <div class="Durnturn">'+item.Durnturn+'</div>\
            </div>\
            <div class="trainFeeInfo">'+get_lan("perFare")+item.TrainNominalFare+'<span style="margin-left:60px;">'+get_lan("tax")+item.TrainTaxFee+'</span>'+'<span style="margin-left:60px;">'+get_lan("ServiceFee")+TrainServiceFee+'</span></div>\
            <div class="trainLiBody">\
              <div class="flexRow">\
                <div class="trainLiTittle">'+get_lan("passenger")+'</div>\
                <div class="trainLiContent">'+item.PsgName+'&nbsp;&nbsp;'+item.PsgDocment+'</div>\
              </div>\
			  <div class="flexRow">\
			    <div class="trainLiTittle">'+get_lan("BookRemark")+'</div>\
			    <div class="trainLiContent">'+item.BookRemark+'</div>\
			  </div>\
              <div class="flexRow">\
                <div class="trainLiTittle">'+get_lan("totalPrice")+'</div>\
                <div class="trainLiContent">'+item.TrainFareAmount+'</div>\
              </div>\
            </div>\
          </div>\
          ')
      })
    }
    /*租车 移除10-23*/
    if(res.RptCarList.length>0){
		return false;/*移除10-23*/
      $(".carInfo").removeClass("hide");
      res.RptCarList.map(function(item){
        var showCarAddress = item.CarDepAddress==null?"hide":"";
        $(".carInfoBody").append('\
          <div class="carInfoLi">\
            <div style="height:100px;">\
              <div class="airlineName">'+item.CarCompanyName+'</div>\
              <div class="airlineInfo flexRow">\
                <div class="airlineInfoLi flexRow">\
                  <div class="airlineInfoLiTittle">'+get_lan("carType")+'</div>\
                  <div>'+item.CarTypeName+'</div>\
                </div>\
                <div class="airlineInfoLi flexRow">\
                  <div class="airlineInfoLiTittle">'+get_lan("Quantity")+'</div>\
                  <div>'+item.Cars+'</div>\
                </div>\
                <div class="airlineInfoLi flexRow">\
                  <div class="airlineInfoLiTittle">'+get_lan("rate")+'</div>\
                  <div>'+item.CarDailyFare+'</div>\
                </div>\
              </div>\
            </div>\
            <div style="min-height:198px;background:#fff;">\
              <div class="tripInfo">\
                <div class="flexRow" style="padding-top:30px;box-sizing:border-box;">\
                  <div class="airportInfo">'+item.PickCity+'</div>\
                  <div class="airportInfo"></div>\
                  <div class="airportInfo">'+item.ReturnCity+'</div>\
                </div>\
                <div class="flexRow">\
                  <div class="airportInfo '+showCarAddress+'" style="font-size:18px;">('+item.CarDepAddress+')</div>\
                  <div class="airportInfo"></div>\
                  <div class="airportInfo '+showCarAddress+'" style="font-size:18px;">('+item.CarArrAddress+')</div>\
                </div>\
                <div class="flexRow">\
                  <div class="airportInfo" style="color:#000;font-size:16px;">'+item.PickTime+'</div>\
                  <div class="airportInfo" style="color:#000;font-size:16px;"></div>\
                  <div class="airportInfo" style="color:#000;font-size:16px;">'+item.ReturnTime+'</div>\
                </div>\
                <div class="line1"></div>\
                <div class="line2"></div>\
                <div class="Durnturn">'+item.ReturnCity+'</div>\
              </div>\
            </div>\
            <div class="carLiBody">\
              <div class="flexRow">\
                <div class="carLiTittle">'+get_lan("passenger")+'</div>\
                <div class="carLiContent">'+item.CarPassengerName+'</div>\
              </div>\
              <div class="flexRow">\
                <div class="carLiTittle">'+get_lan("MandatoryFees")+'</div>\
                <div class="carLiContent">'+item.CarExtensionRate+'</div>\
              </div>\
              <div class="flexRow">\
                <div class="carLiTittle">'+get_lan("carTotalPrice")+'</div>\
                <div class="carLiContent">'+item.CarFareAmount+'</div>\
              </div>\
            </div>\
          </div>\
        ');
      })
    }
    /*其他服务 移除10-23*/
    if(res.RptMiscellList.length>0){
		return false;/*移除10-23*/
      $(".otherInfo").removeClass("hide");
      res.RptMiscellList.map(function(item){
        var showCarAddress = item.CarDepAddress==null?"hide":"";
        $(".otherInfoBody").append('\
          <div class="otherInfoLi" style="border-bottom:1px solid #d8d8d8;">\
            <div class="otherLiBody">\
              <div class="flexRow">\
                <div class="otherLiTittle">'+get_lan("Product")+'</div>\
                <div class="otherLiContent">'+item.VacationName+'</div>\
              </div>\
              <div class="flexRow">\
                <div class="otherLiTittle">'+get_lan("date")+'</div>\
                <div class="otherLiContent">'+item.StartDate+'</div>\
              </div>\
              <div class="flexRow">\
                <div class="otherLiTittle">'+get_lan("Client")+'</div>\
                <div class="otherLiContent">'+item.PsgName+'</div>\
              </div>\
              <div class="flexRow">\
                <div class="otherLiTittle">'+get_lan("totalPrice")+'</div>\
                <div class="otherLiContent">'+item.VacationTotalAmount+'</div>\
              </div>\
              <div class="flexRow">\
                <div class="otherLiTittle">'+get_lan("remark")+'</div>\
                <div class="otherLiContent">'+item.BookRemark+'</div>\
              </div>\
            </div>\
          </div>\
        ');
      })
    }
    $('body').append("<p class='hide'>completed</p>");
}