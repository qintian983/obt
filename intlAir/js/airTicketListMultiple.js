var netUserId = $.session.get('netLoginId');
var obtLanguage = $.session.get('obtLanguage');
var searchIntlInfo = JSON.parse($.session.get('searchIntlInfo'));
console.log(searchIntlInfo);
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
var intlState = parseInt(tools.queryString().intlState);
var TAorderNo = $.session.get('TAorderNo');
//中英文对象
var cn = {
    "progressBar":{
        "search":"查询",
        "book":"预订",
        "complete":"完成",
    },
    'siftBody':{
        "departureTime":"起飞时间",
        "arrivalTime":"到达时间",
        "price":"价格",
    },
    'airportName':
    {'all':'全部航班',
    },
	"ticketList":{
        "listRemind":"该运价无法预订，请线下联系服务组！",
        "tittle":"机票列表",
        "FlightNo":"航班",
        "PlaneType":"机型",
        "Punctuality":"准点率",
        "Duration":"用时",
        "LowestFare":"最低价",
        "LowestFareFlight":"该航班最低价",
        "PreferredAirline":"协议航空公司",
        "CompanyPreferred":"公司推荐",
        "preDay":"前一天",
        "nextDay":"后一天",
        "Code_share":"(共享)",
        "Tax":"税",
        "includeTax":"含税",
        "roundTittleGo":"去程票",
        "roundTittleReturn":"回程票",
        // "stopIcon":"经停",
		"stopIcon":"转机",
        "protocol":"协议价",
        "flightDetail":"航班详情",
        "BaggageInfo":"行李:",
    },
    "flightDetailPop":{
        "Flytime":"飞行",
        "transfer":"中转 ",
    },
    "ticketSpread":{
        "cabinCode":"舱位",
        "seatsNum":"座位数",
        "cabinType":"舱位类型",
        "NominalPrice":"票面价",
        "Tax":"税",
        "choose":"选择",
        'restriction':"限制条件",
        "violation":"违反政策",
    },
    "LowestAirlineRemind":"该航班为廉价航空，托运行李额须以航司规则为准，详情请咨询差旅顾问。",
    "popBody":{
        "popTittle":"您的预订与贵公司差旅政策不符，请选择原因",
        "confirm":"确定",
        "reasonTittle":"根据贵公司差旅政策规定， 因您未选择最低价格航班，请您选择原因：",
        "lowestTittle":"根据贵公司差旅政策规定， 全天最低价航班为：",
        "lowestTittle1":"根据贵公司差旅政策规定， 前后",
        "lowestTittle2":"小时最低价航班为：",
        "chooseLowest":"预订最低票价",
        "rasonRemind":"请选择理由",
        "ticketPrice":"票价:",
        "save":"可节省:",
        "true":"实际承运:",
    }
}
var en = {
    "progressBar":{
        "search":"Search",
        "book":"Book",
        "complete":"Complete",
    },
    'siftBody':{
        "departureTime":"Departure Time",
        "arrivalTime":"Arrival Time",
        "price":"Price",
    },
    'airportName':
    {'all':'All',
    },
   "ticketList":{
        "listRemind":"No relevant flight available or out of policy",
        "tittle":"Segment list",
        "FlightNo":"Flight",
        "PlaneType":"AirCraft",
        "Punctuality":"Punctuality",
        "Duration":"Duration",
        "LowestFare":"Lowest Fare",
        "LowestFareFlight":"Lowest Fare of the same Flight",
        "PreferredAirline":"Preferred Airline",
        "CompanyPreferred":"Company Preferred",
        "preDay":"PreDay",
        "nextDay":"NextDay",
        "Code_share":"(share)",
        "Tax":"Tax",
        "includeTax":"Tax include",
        "roundTittleGo":"Departure",
        "roundTittleReturn":"Return",
        "stopIcon":"Stopover",
        "protocol":"Corporate",
        "flightDetail":"Flight Details",
        "BaggageInfo":"Baggage:",
    },
    "flightDetailPop":{
        "Flytime":"Fly",
        "transfer":"Transfer in ",
    },
    "ticketSpread":{
        "cabinCode":"Cabin Code",
        "seatsNum":"Seats Num",
        "cabinType":"Cabin Type",
        "NominalPrice":"Nominal Price",
        "Tax":"Tax",
        "choose":"Choose",
        'restriction':"Restriction",
        "violation":"Out of Policy",
    },
    "LowestAirlineRemind":"This is a low-cost flight, the checked-in baggage allowance will be subject to airline's policy. Please contact your consultant for details of luggage issue.",
    "popBody":{
        "popTittle":"Your reservation does not match your company's travel policy, please select the reason",
        "confirm":"Confirm",
        "reasonTittle":"According to your company's travel policy, if you have not selected the lowest price flight, please choose the reason:",
        "lowestTittle":"According to your company's travel policy, the lowest fare of flight in this day is：",
        "lowestTittle1":"According to your company's travel policy, the ",
        "lowestTittle2":"-hour minimum flight is",
        "chooseLowest":"Book the lowest fare",
        "rasonRemind":"Please choose reasons.",
        "ticketPrice":"Ticket Price:",
        "save":"Save:",
        "true":"True:",
    }
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
$(function(){
   showContent();//内容展示
   ticketList();//机票列表
	GetCompanyImageInfos()
})
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
				return false;
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
				// alert(res.errMsg)
			}
		},
		error: function() {
			// alert('fail');
		}
	});
};
//内容展示
function showContent(){
    $("#main").html('\
        <div class="autoCenter">\
            <div class="progressBar flexRow mainFontColor"></div>\
			<div class="picBody"><img class="picGroupImg" src="../staticFile/query.png"/><a class="picHref" target="_blank" href=""></a></div>\
            <div class="ticketBody">\
                <div class="listTittle">'+get_lan('ticketList').tittle+'</div>\
                <div class="listRemind flexRow">\
                   <div style="width:20%;font-weight:bold;padding-left:40px" class="roundTittle">'+'</div>\
                </div>\
                <div class="siftBody"></div>\
            </div>\
            <div class="ticketList"></div>\
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
    $(".progressBar").html('\
        <div class="progressLine progressActiveBack"></div><div class="progressCircle progressActiveBack"></div><span class="progressActiveFont">'+get_lan('progressBar').search+'</span>\
        <div class="progressLine progressActiveBack"></div><div class="progressCircle progressActiveBack"></div>'+get_lan('progressBar').book+'\
        <div class="progressLine progressBackColor"></div><div class="progressCircle progressBackColor"></div>'+get_lan('progressBar').complete+'\
        ')
    //筛选排序模块
    $(".siftBody").html('\
        <select class="airLineChoose">\
        <option airCode="All">'+get_lan('airportName').all+'</option>\
        </select>\
        <div class="departureTimeSort flexRow">'+get_lan('siftBody').departureTime+'<div class="departureTimeSortIcon"></div></div>\
        <div class="priceSort flexRow">'+get_lan('siftBody').price+'<div class="priceSortIcon"></div></div>\
        ')
    //<div class="arrivalTimeSort flexRow">'+get_lan('siftBody').arrivalTime+'<div class="arrivalTimeSortIcon"></div></div>\
}
function getWeek(dateStr){
    var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
    return get_lan('searchBody').weekDay.split(',')[myDate.getDay()];
}

function GetDateStr(AddDayCount,date) {
    var dd = new Date(date.replace(/-/g, '/'));
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();
    return y+"-"+m+"-"+d;
}

//机票列表
function ticketList(){
    // $('body').mLoading("show");
	tools.searchLoadingShow()
    if(intlState==1){
		
                // url: $.session.get('obtCompany')+"/QueryService.svc/InterAirSearchFree",
        $.ajax(
          {
            type:'post',
            url : $.session.get('ajaxUrl'), 
            dataType : 'json',
            data:{
                url: $.session.get('obtCompany')+"/QueryService.svc/InterSegmentSearchFreeNew",
                jsonStr:'{"request":{"airlineKey":"ALL","id":'+netUserId+',"Language":"'+obtLanguage+'","orgList":"'+searchIntlInfo.orgList+'","dstList":"'+searchIntlInfo.dstList+'","dateList":"'+searchIntlInfo.dateList+'","cabinType":"'+searchIntlInfo.cabinType+'"}}'
            },
            success : function(data) {
                // $('body').mLoading("hide");
				tools.searchLoadingHide()
                var res = JSON.parse(data);
                console.log(res);
				if(res.code==200){
					if(res.segmentList.length!=0){
					    ticketListInfo(res.segmentList[intlState-1],res.segmentList.length);
					    chooseAirLine(res.segmentList[intlState-1]);//选择航空公司
					    sortTicketInfo(res.segmentList[intlState-1]);//排序
					}else{
					    alert(get_lan("ticketList").listRemind);
					}
				}else{
					alert(res.errMsg)
				}
				
               
            },
            error : function() {
              // alert('fail');
            }
          }
        );
    }
    else{
        $.ajax(
          {
            type:'post',
            url : $.session.get('ajaxUrl'), 
            dataType : 'json',
            data:{
                url: $.session.get('obtCompany')+"/QueryService.svc/GetInterAirFreeInCache",
                jsonStr:'{"id":'+netUserId+'}'
            },
            success : function(data) {
                // $('body').mLoading("hide");
				tools.searchLoadingHide()
                var res = JSON.parse(data);
                console.log(res);
                if(res.length!=0){
                    console.log($.session.get('NextSegmentIDs'+(intlState-1)));
                    var NextSegmentIDs = JSON.parse($.session.get('NextSegmentIDs'+(intlState-1)));
                    console.log(NextSegmentIDs);
                    var ticketList = [];
                    res[intlState-1].map(function(item){
                        NextSegmentIDs.map(function(sItem){
                            if(item.SegID==sItem){
                                ticketList.push(item);
                            }
                        })
                    })
                    console.log(ticketList);
                    ticketListInfo(ticketList,res.length);
                    chooseAirLine(ticketList);//选择航空公司
                    sortTicketInfo(ticketList);//排序


                    // ticketListInfo(res[intlState-1],res.length);
                    // chooseAirLine(res[intlState-1]);//选择航空公司
                    // sortTicketInfo(res[intlState-1]);//排序
                }else{
                    alert(get_lan("ticketList").listRemind);
                }
            },
            error : function() {
              // alert('fail');
            }
          }
        );
    }
}
//机票信息
function ticketListInfo(res,index){
    console.log(res);
    $(".ticketList").html('');
    // var priceList =[];
    // res.map(function(item){
    //     priceList.push(parseInt(item.Fare)+parseInt(item.TotalTax));
    // })
    // var minPrice = Math.min.apply(null,priceList);
    res.map(function(item,index){
        var ticketPriceColor = item.ShowLowestFare==1?"ticketPriceColor":"";
        // if(intlState>1){
        //     ticketPriceColor = "";
        // }
        var showStop = item.InterSegments.length > 1?"":"hide";
        var stopAirport = item.Transit!=null?item.Transit:'';
        var showTicketViolation = item.SegPolicyType == 4||item.SegPolicyType == 3?"":"hide";
        var ticketAirLineColor = item.isCodeShare?"ticketAirLineColor":"";
        var protocolShow = item.FareType==2?"":"hide";
        if(ProfileInfo.onlineStyle=="APPLE"){
            protocolShow = "hide";
        }
        if(item.AirLineCode == "3U"){
            var airlineIcon = "a3u";
        }else if(item.AirLineCode == "3W"){
            var airlineIcon = "a3w";
        }else if(item.AirLineCode == "8L"){
            var airlineIcon = "a8l";
        }else if(item.AirLineCode == "9C"){
            var airlineIcon = "a9C";
        }else{
            var airlineIcon = item.AirLineCode;
        }
        var showTicketDays = item.Days>0?"":"hide";
        var showBaggageInfo = item.BaggageInfo==null?"hide":"";
        var BaggageInfo = item.BaggageInfo.baggagePiecesField==""?item.BaggageInfo.baggageWeightField+item.BaggageInfo.baggageWeightUnitField:item.BaggageInfo.baggagePiecesField;
        var DepTerm = item.InterSegments[0].DepTerm==null?"":item.InterSegments[0].DepTerm;
        var ArrTerm = item.InterSegments[item.InterSegments.length-1].ArrTerm==null?"":item.InterSegments[item.InterSegments.length-1].ArrTerm;
        var intlFlightNo = '';
        item.InterSegments.map(function(item){
            intlFlightNo+=item.FlightNo;
            intlFlightNo+=',';
        })
        var ShowCabinDetail = res[0].ShowCabinDetail?"hide":"";
        $(".ticketList").append('\
            <div class="ticketLi">\
                <div class="ticketAirLineIcon '+airlineIcon+'"></div>\
                <div title="'+item.AirLine+'" class="ticketAirLine '+ticketAirLineColor+' ellipsis">'+item.AirLine+'</div>\
                <div class="ticketFlightNo">'+intlFlightNo.substring(0,intlFlightNo.length-1)+'</div>\
                <div class="ticketPlaneType">'+get_lan('ticketList').PlaneType+' '+item.InterSegments[0].PlaneType+'</div>\
                <div class="ticketTimeStart">'+item.DateStart+'</div>\
                <div class="stopIcon '+showStop+'">'+get_lan('ticketList').stopIcon+'</div>\
                <div class="ticketArrow"></div>\
                <div class="stopBody '+showStop+'" title="'+stopAirport+'">'+stopAirport+'</div>\
                <div class="ticketTimeArrive">'+item.DateArrive+'</div>\
                <div class="ticketAirportDeparte">'+item.Departure+' '+DepTerm+'</div>\
                <div class="ticketAirportArrive">'+item.Destination+' '+ArrTerm+'</div>\
                <div class="ticketDays '+showTicketDays+'">+'+item.Days+'</div>\
                <div class="ticketOntime">'+get_lan('ticketList').Punctuality+'<br/>'+'61%'+'</div>\
                <div class="ticketFlightDetail '+showStop+' specificFontColor" index="'+index+'">'+get_lan("ticketList").flightDetail+'</div>\
                <div class="ticketRestriction '+ShowCabinDetail+'" ruleSegID="'+item.SegID+'" CabinID="'+item.InterCabins[0].CabinID+'">'+get_lan('ticketSpread').restriction+'</div>\
                <div class="ticketDuration">'+item.Duration+'</div>\
                <div class="ticketBaggageInfo '+showBaggageInfo+'">'+get_lan('ticketList').BaggageInfo+BaggageInfo+'</div>\
                <div class="ticketViolationIcon '+showTicketViolation+'">'+get_lan('ticketSpread').violation+'</div>\
                <div class="ticketFareAmount '+ticketPriceColor+'" LimitFare="'+item.LimitFare+'" CabinID="'+item.InterCabins[0].CabinID+'" spread="off" AirLineCode="'+item.AirLineCode+'" SegID="'+item.SegID+'"><span class="ticketPriceText" style="text-decoration: underline;">'+(parseInt(item.Fare)+parseInt(item.TotalTax))+'</span><span style="font-size:14px;color:#4d4d4d;">'+ProfileInfo.OfficeCurrency+'</span><span style="font-size:14px;color:#4d4d4d">('+get_lan('ticketList').includeTax+')</span></div>\
                <div class="ticketCabin">'+item.CabinName+' '+get_lan('ticketList').Tax+' '+item.TotalTax+'</div>\
                <div class="protocolBody '+protocolShow+'">\
                  <div class="protocolText">'+get_lan('ticketList').protocol+'</div>\
                  <div class="triangleTopRight"></div>\
                </div>\
            </div>\
            <div class="ticketLiSpread"></div>\
        ')
    })
    if(intlState != index){
        $(".ticketRestriction").hide();
    }
    $(".ticketRestriction").unbind("click").click(function(){
        $('body').mLoading("show");
        $.ajax(
          {
            type:'post',
            url : $.session.get('ajaxUrl'), 
            dataType : 'json',
            data:{
                url: $.session.get('obtCompany')+"/QueryService.svc/InterRuleSearch",
                jsonStr:'{"OptionId":"'+$(this).attr("ruleSegID")+'","CabinId":"'+$(this).attr("CabinId")+'","id":'+netUserId+',"Language":"'+obtLanguage+'"}'
            },
            success : function(data) {
                $('body').mLoading("hide");
                var res = JSON.parse(data);
                console.log(res);
                $(".rulePop").html('\
                    <div class="rulePopHeader">'+get_lan("ticketSpread").restriction+'<div class="closeRule">x</div></div>\
                    ');
                if(res.ErrMsg!=""){
                    alert(res.ErrMsg);
                }else{
                    res.Rules.map(function(item){
                        $(".rulePop").append('\
                            <div class="flexRow" style="border-bottom:1px solid #cdcdcd;">\
                              <div class="rulePopTittle"><span style="line-height:60px;">'+item.Title+'</span></div>\
                              <div class="rulePopBody">'+item.Content+'</div>\
                            </div>\
                            ')
                    })
                    openRulePop();
                    $("#cover,.closeRule").unbind("click").click(function(){
                        closeRulePop();
                    })
                }
                // $(".rulePop").css("height",'80px');
                // var rulePopHeight = $(".rulePop").height()%2==1?$(".rulePop").height()+1:$(".rulePop").height();
                // $(".rulePop").css("height",rulePopHeight+'px');
            },
            error : function() {
              // alert('fail'); 
            }
          } 
        );
    })
    
    $(".ticketFlightDetail").unbind("click").click(function(){
        var index = parseInt($(this).attr("index"));
        // console.log(res[index].InterSegments);
        $(".flightDetailPop").html('\
            <div class="flightDetailPopTittle tittleBackColor">'+get_lan("ticketList").flightDetail+'<div class="closeFlight">x</div></div>\
            ')
        res[index].InterSegments.map(function(item){
            if(item.AirLineCode == "3U"){
                var airlineIcon = "a3u";
            }else if(item.AirLineCode == "3W"){
                var airlineIcon = "a3w";
            }else if(item.AirLineCode == "8L"){
                var airlineIcon = "a8l";
            }else if(item.AirLineCode == "9C"){
                var airlineIcon = "a9C";
            }else{
                var airlineIcon = item.AirLineCode;
            }
            var showStayTime = item.StayTime!=""?"":"hide";
            var DepTerm = item.DepTerm==null?"":item.DepTerm;
            var ArrTerm = item.ArrTerm==null?"":item.ArrTerm;
            $(".flightDetailPop").append('\
                <div class="flightDetailLi">\
                 <div class="'+showStayTime+' flightDetailStayTime"><span class="tabBarColor">'+get_lan("flightDetailPop").transfer+'</span> '+item.AirportDeparte+' '+item.StayTime+'</div>\
                 <div class="flightDetailLiHeader">\
                   <div class="flightAirLineIcon '+airlineIcon+'"></div>\
                   <span style="font-size:14px;position:absolute;top:0;left:38px;">'+item.Marketing+' '+item.FlightNo+'</span>\
                   <div class="flightDetailFlytime">'+get_lan("flightDetailPop").Flytime+' '+item.FlyTime+'</div>\
                 </div>\
                 <div class="flightDetailLiBody">\
                   <div class="flightStartTime">'+item.DateBegin.split(' ')[0].split('-')[1]+'-'+item.DateBegin.split(' ')[0].split('-')[2]+' '+item.TimeStart+'</div>\
                   <div class="flightArriveTime">'+item.DateEnd.split(' ')[0].split('-')[1]+'-'+item.DateEnd.split(' ')[0].split('-')[2]+' '+item.TimeArrive+'</div>\
                   <div class="flightLine"></div>\
                   <div class="flightStartAirport ellipsis" title="'+item.AirportDeparte+' '+DepTerm+'">'+item.AirportDeparte+' '+DepTerm+'</div>\
                   <div class="flightArriveAirport ellipsis" title="'+item.AirportArrive+' '+ArrTerm+'">'+item.AirportArrive+' '+ArrTerm+'</div>\
                 </div>\
                </div>\
                ')
        })
        $(".flightStartTime").eq(0).css("color","#000");
        $(".flightStartAirport").eq(0).css("color","#000");
        $(".flightStartTime").eq(0).css("font-size","16px");
        $(".flightStartAirport").eq(0).css("font-size","16px");
        $(".flightArriveTime").eq($(".flightStartTime").length-1).css("color","#000");
        $(".flightArriveAirport").eq($(".flightStartAirport").length-1).css("color","#000");
        $(".flightArriveTime").eq($(".flightStartTime").length-1).css("font-size","16px");
        $(".flightArriveAirport").eq($(".flightStartAirport").length-1).css("font-size","16px");
        openFlightDetailPop();
        $("#cover,.closeFlight").unbind("click").click(function(){
            closeFlightDetailPop();
        })
    })
    $(".ticketFareAmount").unbind("click").click(function(){
        if(intlState != index){
            if(intlState == 1){
                var multipleTicket = {
                    'SegID':$(this).attr("SegID"),
                }
                $.session.set('multipleTicket', JSON.stringify(multipleTicket));
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'),
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/QueryService.svc/GetNextSegmentIDs",
                        jsonStr:'{"id":'+netUserId+',"selectedId":"'+JSON.parse($.session.get('multipleTicket')).SegID+'"}'
                    },
                    success : function(data) {
                        var res = JSON.parse(data);
                        console.log(res);
                        $.session.set('NextSegmentIDs'+intlState, data);
                        window.location.href='../../intlAir/airTicketListMultiple.html?intlState=2';
                    },
                    error : function() {
                      //alert('fail');
                    }
                  }
                );
            }else{
                var SegIDList = JSON.parse($.session.get('multipleTicket')).SegID.split(',');
                if(SegIDList.length<intlState){
                    var SegID = JSON.parse($.session.get('multipleTicket')).SegID+','+$(this).attr("SegID");
                }else{
                    SegIDList[intlState-1] = $(this).attr("SegID");
                    var SegID = SegIDList.join(',');
                }
                
                var multipleTicket = {
                    'SegID':SegID,
                }
                $.session.set('multipleTicket', JSON.stringify(multipleTicket));
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'),
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/QueryService.svc/GetNextSegmentIDs",
                        jsonStr:'{"id":'+netUserId+',"selectedId":"'+JSON.parse($.session.get('multipleTicket')).SegID+'"}'
                    },
                    success : function(data) {
                        var res = JSON.parse(data);
                        console.log(res);
                        $.session.set('NextSegmentIDs'+intlState, data);
                        window.location.href='../../intlAir/airTicketListMultiple.html?intlState='+(intlState+1);
                    },
                    error : function() {
                      //alert('fail');
                    }
                  }
                );
            }
        }else{
            var SegID = JSON.parse($.session.get('multipleTicket')).SegID+','+$(this).attr("SegID");
            console.log(SegID);
            if(res[0].ShowCabinDetail){
                MoreIntlPrice(SegID,this);
            }else{
                searchIntlTicket($(this).attr("CabinID"),SegID,$(this).attr("AirLineCode"));
            }
        }
        function MoreIntlPrice(SegID,that){
			if(ProfileInfo.HideOutLimitFareAir){
				var limitfare=$(that).attr("limitfare")
			}else{
				var limitfare=""
			}
            if($(that).attr("spread") == 'off'){
                $(that).attr("spread","on");
                $(that).parent().next().show();
                $('body').mLoading("show");
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'), 
                    dataType : 'json',
                    // data:{
                    //     url: $.session.get('obtCompany')+"/QueryService.svc/InterAirCabinSearchFree",
                    //     jsonStr:'{"queryKey":"'+SegID+'","id":'+netUserId+',"isFreeType":"true","Language":"'+obtLanguage+'"}'
                    // },
					data: {
						url: $.session.get('obtCompany') + "/QueryService.svc/InterAirCabinSearchNew",
						jsonStr:'{"request":{"queryKey":"' + SegID + '","id":' + netUserId + ',"isFreeType":"true","Language":"' + obtLanguage + '","maxFare":"'+limitfare+'"}}'
					},
                    success : function(data) {
                        $('body').mLoading("hide");
                        var res = JSON.parse(data);
                        console.log(res);
                        if(res.length != 0){
                            $(that).parent().next().html('\
                                <table class="spreadTable" border="0" cellpadding="0" cellspacing="0">\
                                <tr style="background-color: #e9f0f6;">\
                                <th style="width:200px;">'+get_lan('ticketSpread').cabinType+'</th>\
                                <th style="width:200px;">'+get_lan('ticketSpread').seatsNum+'</th>\
                                <th style="width:200px;"></th>\
                                <th style="width:30px;"></th>\
                                <th style="width:170px;">'+get_lan('ticketSpread').NominalPrice+'</th>\
                                <th style="width:200px;">'+get_lan('ticketSpread').Tax+'</th>\
                                <th style="width:260px;"></th>\
                                <th style="width:100px;"></th>\
                                </tr>\
                                </table>\
                                ');
                            //'+get_lan('ticketSpread').cabinCode+'
                            //'+item.CabinCode+'
                            res.map(function(item){
                                var showHandImg = item.FareTypeCode==2?"":"hide";
                                var showBaggageInfo = item.BaggageInfo==null?"hide":"";
                                var BaggageInfo = item.BaggageInfo.baggagePiecesField==""?item.BaggageInfo.baggageWeightField+item.BaggageInfo.baggageWeightUnitField:item.BaggageInfo.baggagePiecesField;
                                $(that).parent().next().children(".spreadTable").append('\
                                    <tr>\
                                    <td>'+item.CabinType+'</td>\
                                    <td>'+item.Seats+'</td>\
                                    <td><div class="'+showBaggageInfo+'">'+get_lan('ticketList').BaggageInfo+BaggageInfo+'</div></td>\
                                    <td><img class="'+showHandImg+'" src="../../css/images/handImg.png" style="margin-top:2px;width:26px;height:15px;"></td>\
                                    <td>'+item.CabinFare+'</td>\
                                    <td>'+item.CabinTax+'</td>\
                                    <td class="restrictionBtn" CabinID="'+item.CabinID+'" style="cursor:pointer;text-decoration:underline;">'+get_lan('ticketSpread').restriction+'</td>\
                                    <td><div class="chooseTicket" CabinID="'+item.CabinID+'">'+get_lan('ticketSpread').choose+'</div></td>\
                                    </tr>\
                                    ');
                            })
                            $(that).children(".ticketPriceText").text(parseInt(res[0].CabinFare)+parseInt(res[0].CabinTax));
                            var ruleSegID = SegID.split(',')[SegID.split(',').length-1];
                            $(".restrictionBtn").unbind("click").click(function(){
                                $('body').mLoading("show");
                                $.ajax(
                                  {
                                    type:'post',
                                    url : $.session.get('ajaxUrl'), 
                                    dataType : 'json',
                                    data:{
                                        url: $.session.get('obtCompany')+"/QueryService.svc/InterRuleSearch",
                                        jsonStr:'{"OptionId":"'+ruleSegID+'","CabinId":"'+$(this).attr("CabinId")+'","id":'+netUserId+',"Language":"'+obtLanguage+'"}'
                                    },
                                    success : function(data) {
                                        $('body').mLoading("hide");
                                        var res = JSON.parse(data);
                                        console.log(res);
                                        $(".rulePop").html('\
                                            <div class="rulePopHeader">'+get_lan("ticketSpread").restriction+'<div class="closeRule">x</div></div>\
                                            ');
                                        if(res.ErrMsg!=""){
                                            alert(res.ErrMsg);
                                        }else{
                                            res.Rules.map(function(item){
                                                $(".rulePop").append('\
                                                    <div class="flexRow" style="border-bottom:1px solid #cdcdcd;">\
                                                      <div class="rulePopTittle"><span style="line-height:60px;">'+item.Title+'</span></div>\
                                                      <div class="rulePopBody">'+item.Content+'</div>\
                                                    </div>\
                                                    ')
                                            })
                                            openRulePop();
                                            $("#cover,.closeRule").unbind("click").click(function(){
                                                closeRulePop();
                                            })
                                        }
                                        // $(".rulePop").css("height",'80px');
                                        // var rulePopHeight = $(".rulePop").height()%2==1?$(".rulePop").height()+1:$(".rulePop").height();
                                        // $(".rulePop").css("height",rulePopHeight+'px');
                                    },
                                    error : function() {
                                      // alert('fail'); 
                                    }
                                  } 
                                );
                            })
                            $(".chooseTicket").unbind("click").click(function(){
                                searchIntlTicket($(this).attr("CabinID"),SegID,$(that).attr("AirLineCode"));
                            })
                        }
                    },
                    error : function() {
                      // alert('fail'); 
                    }
                  } 
                );
            }else if($(this).attr("spread") == 'on'){
                $(this).attr("spread","off");
                $(this).parent().next().hide();
            }
        }
    })
}
function searchIntlTicket(CabinID,SegID,AirLineCode){
    var SegIDList = SegID.split(',');
    for(var i=0;i<SegIDList.length;i++){
        SegIDList[i] = SegIDList[i]+'-'+CabinID;
    }
    var segmentKey = SegIDList.join(',');
    console.log(segmentKey);
    var intlTicketInfo = {
        'type':'multiple',
        'segmentKey':segmentKey,
        'AirLineCode':AirLineCode,
    }
    $.session.set('intlTicketInfo', JSON.stringify(intlTicketInfo));
    window.location.href='../../intlAir/bookIntlAirTicket.html';
}
//选择航空公司
function chooseAirLine(res){
    var alineLineList=[],
        i,
        j,
        len = res.length;
    for(i = 0; i < len; i++){
     for(j = i + 1; j < len; j++){
      if(res[i].AirLineSort === res[j].AirLineSort){
       j = ++i;
      }
     }
     alineLineList.push(res[i]);
    }
    var alineLineSort=function(arr){
        for(var i=0;i<arr.length-1;i++){  
            for(var j=i+1;j<arr.length;j++){
                if(arr[i].AirLineCode.charCodeAt()>arr[j].AirLineCode.charCodeAt()){
                    var temp=arr[i];
                    arr[i]=arr[j];  
                    arr[j]=temp;  
                }  
            }
        }
        return arr;
    }
    // console.log(AirportList)
    alineLineSort(alineLineList).map(function(item){
        $(".airLineChoose").append('\
        <option airCode="'+item.AirLineCode+'">'+item.AirLineCode+'-'+item.AirLineSort+'</option>\
        ')
    })

    $(".airLineChoose").change(function(){
        airlineAirList = [];
        if($('.airLineChoose option:selected').attr("airCode")=='All'){
            res.map(function(item){
                airlineAirList.push(item);
            })
        }else{
            res.map(function(item){
                item.InterSegments.map(function(sItem){
                    if(sItem.MarketingCode==$('.airLineChoose option:selected').attr("airCode")){
                        airlineAirList.push(item);
                    }
                })
                // if(item.AirLineCode==$('.airLineChoose option:selected').attr("airCode")){
                //     airlineAirList.push(item)
                // }
            })
        }
        ticketListInfo(airlineAirList);
        sortTicketInfo(airlineAirList);//排序
    })
}
//机票排序
function sortTicketInfo(res){
    var date = new Date();
    var timeSortAsc = [];
    var timeSortDes = [];
    var priceSortAsc = [];
    var priceSortDes = [];
    res.map(function(item){
        timeSortAsc.push(item);
        timeSortDes.push(item);
        priceSortAsc.push(item);
        priceSortDes.push(item);
    })
    var bubbleSortAsc=function(arr){
        for(var i=0;i<arr.length-1;i++){
            for(var j=i+1;j<arr.length;j++){
                if(date.setHours(arr[i].DateStart.split(":")[0],arr[i].DateStart.split(":")[1])>date.setHours(arr[j].DateStart.split(":")[0],arr[j].DateStart.split(":")[1])){
                    var temp=arr[i];
                    arr[i]=arr[j];  
                    arr[j]=temp;  
                }  
            }  
        }
        return arr;
    }
    var bubbleSortDes=function(arr){
        for(var i=0;i<arr.length-1;i++){  
            for(var j=i+1;j<arr.length;j++){  
                if(date.setHours(arr[i].DateStart.split(":")[0],arr[i].DateStart.split(":")[1])<date.setHours(arr[j].DateStart.split(":")[0],arr[j].DateStart.split(":")[1])){
                    var temp=arr[i];
                    arr[i]=arr[j];  
                    arr[j]=temp;  
                }
            }  
        }
        return arr;
    }
    var pricebubbleSortAsc=function(arr){
        for(var i=0;i<arr.length-1;i++){
            for(var j=i+1;j<arr.length;j++){
                if(parseInt(arr[i].Fare)+parseInt(arr[i].TotalTax)>parseInt(arr[j].Fare)+parseInt(arr[j].TotalTax)){
                    var temp=arr[i];
                    arr[i]=arr[j];  
                    arr[j]=temp;  
                }  
            }  
        }
        return arr;
    }
    var pricebubbleSortDes=function(arr){
        for(var i=0;i<arr.length-1;i++){  
            for(var j=i+1;j<arr.length;j++){  
                if(parseInt(arr[i].Fare)+parseInt(arr[i].TotalTax)<parseInt(arr[j].Fare)+parseInt(arr[j].TotalTax)){
                    var temp=arr[i];
                    arr[i]=arr[j];  
                    arr[j]=temp;  
                }
            }  
        }
        return arr;
    }
    $(".departureTimeSort").unbind("click").click(function(){
        $(".priceSort ").css("color",'#000');
        $(".priceSortIcon").css("background-position","0px 0px");
        if(!$(".departureTimeSort").attr("sortType")||$(".departureTimeSort").attr("sortType")=="acs"){
            ticketListInfo(bubbleSortDes(timeSortDes));
            $(".departureTimeSort").attr("sortType","desc");
            $(".departureTimeSort").css("color",'#1e66ae');
            $(".departureTimeSortIcon").css("background-position","-36px 0px");
        }
        else if($(".departureTimeSort").attr("sortType")=="desc"){
            ticketListInfo(bubbleSortAsc(timeSortAsc));
            $(".departureTimeSort").attr("sortType","acs");
            $(".departureTimeSortIcon").css("background-position","-18px 0px");
        }
    })
    $(".priceSort").unbind("click").click(function(){
        $(".departureTimeSort ").css("color",'#000');
        $(".departureTimeSortIcon").css("background-position","0px 0px");
        if($(".priceSort").attr("sortType")=="acs"){
            ticketListInfo(pricebubbleSortDes(priceSortDes));
            $(".priceSort").attr("sortType","desc");
            $(".priceSort").css("color",'#1e66ae');
            $(".priceSortIcon").css("background-position","-36px 0px");
        }
        else if(!$(".priceSort").attr("sortType")||$(".priceSort").attr("sortType")=="desc"){
            ticketListInfo(pricebubbleSortAsc(priceSortAsc));
            $(".priceSort").attr("sortType","acs");
            $(".priceSortIcon").css("background-position","-18px 0px");
        }
    })
}
function openRulePop(){
    $("#cover").show();
    $(".rulePop").show();
}
function closeRulePop(){
    $("#cover").hide();
    $(".rulePop").hide();
}
function openFlightDetailPop(){
    $("#cover").show();
    $(".flightDetailPop").show();
}
function closeFlightDetailPop(){
    $("#cover").hide();
    $(".flightDetailPop").hide();
}