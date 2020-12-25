var netUserId = $.session.get('netLoginId');
var obtLanguage = $.session.get('obtLanguage');
var searchCarInfo = JSON.parse($.session.get('searchCarInfo'));
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
// console.log(ProfileInfo)
console.log(searchCarInfo);

//中英文对象
var cn = {
	"progressBar": {
		"search": "查询",
		"book": "预订",
		"complete": "完成",
	},
    "searchBody":{
		'carCompany': "租车公司",
        "pickUpLocation":"取车地点",
        "dropOffLocation":"还车地点",
        "pickUpDate":"取车日期",
        "dropOffDate":"还车日期",
        "vehicleType":"车型",
        "grade":"等级",
        "type":"类型",
        "gear":"排挡",
        "airConditioner":"空调",
        "service":"特色服务",
        "noLimit":"不限",
        "search":"查询",
    },
    "carBody":{
        "price":"价格",
        "daily":"/天",
        "total":"总金额:",
        "choose":"选择",
        "mileLimit":"里程限制:",
		"expenseDetails":"费用明细",
		"morePrices":"更多价格",
    },
	"rateDetails":{
		"OperationTime":"营业时间",
		"DailyPrice":"每日价",
		"ExtraFee":"额外费用",
	},
    'searchRemind':'请正确填写！',
    'searchDetailRemind':"等级、类型、排挡、空调必须全部选择。",
	"ticketList": {
		"protocol": "协议价",
	},
}
var en = {
	"progressBar": {
		"search": "Search",
		"book": "Book",
		"complete": "Complete",
    },
    "searchBody":{
		'carCompany': "Car Rental Company",
        "pickUpLocation":"Pick-up Location",
        "dropOffLocation":"Drop-off  Location",
        "pickUpDate":"Pick-up Date",
        "dropOffDate":"Drop-off Date",
        "vehicleType":"Vehicle type",
        "grade":"Grade",
        "type":"Type",
        "gear":"Gear",
        "airConditioner":"Air Conditioner",
        "service":"Characteristic Service",
        "noLimit":"No Limit",
        "search":"Search",
    },
    "carBody":{
        "price":"Price",
        "daily":"/day",
        "total":"Total:",
        "choose":"Choose",
        "mileLimit":"Mile Limit:",
		"expenseDetails":"Rate Detail",
		"morePrices":"More Prices",
    },
	"rateDetails":{
		"OperationTime":"Operation Time",
		"DailyPrice":"Daily Price",
		"ExtraFee":"Extra Fee",
	},
    'searchRemind':'Please fill in correctly!',
    'searchDetailRemind':"Please choose the grade, type, gear and air conditioner before search.",
	"ticketList": {
		"protocol": "Corporate",
	},
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
$(function() {
	showContent(); //内容展示
	carList(); //租车列表
})

function showContent(){
    $("#main").html('\
        <div class="autoCenter">\
          <div class="progressBar flexRow"></div>\
          <div class="searchBody">\
          </div>\
          <div class="carBody">\
            <div class="siftBody">\
              <div class="priceSort flexRow">'+get_lan('carBody').price+'<div class="priceSortIcon"></div></div>\
            </div>\
            <div class="carList"></div>\
          </div>\
        </div>\
    ')
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
    $(".searchBody").html('\
      <div class="carDateBody">\
        <div class="flexRow">\
            <div class="dateTittle carCompanyTittle">'+get_lan('searchBody').carCompany+'</div>\
            <div class="dateTittle">'+get_lan('searchBody').pickUpLocation+'</div>\
            <div class="dateTittle">'+get_lan('searchBody').dropOffLocation+'</div>\
            <div class="dateTittle" style="width:285px;">'+get_lan('searchBody').pickUpDate+'</div>\
            <div class="dateTittle" style="width:285px;">'+get_lan('searchBody').dropOffDate+'</div>\
        </div>\
        <div class="dateInputBody flexRow">\
			<div class="flexRow carCompanyTittle" style="width:190px;">\
				<select style="width:180px" id="carCompany" name=""></select>\
			</div>\
            <div class="flexRow" style="width:190px;">\
              <input type="text" id="carDeparture">\
            </div>\
            <div class="flexRow" style="width:190px;">\
              <input type="text" id="carArrival">\
            </div>\
            <div class="flexRow" style="width:285px;">\
              <input type="text" id="carFromDate">\
              <select id="carFromHour">\
              </select>\
              <select id="carFromMin">\
                <option value="00">00</option>\
                <option value="30">30</option>\
              </select>\
            </div>\
            <div class="flexRow" style="width:285px;">\
              <input type="text" id="carToDate">\
              <select id="carToHour">\
              </select>\
              <select id="carToMin">\
                <option value="00">00</option>\
                <option value="30">30</option>\
              </select>\
            </div>\
        </div>\
      </div>\
      <div class="vehicleTypeBody flexRow">\
            <div style="width:100px;">'+get_lan("searchBody").vehicleType+'</div>\
            <div style="width:50px;">'+get_lan("searchBody").grade+'</div>\
            <select id="vehicleGrade">\
              <option value="">'+get_lan("searchBody").noLimit+'</option>\
            </select>\
            <div style="width:50px;">'+get_lan("searchBody").type+'</div>\
            <select id="vehicleType">\
              <option value="">'+get_lan("searchBody").noLimit+'</option>\
            </select>\
            <div style="width:50px;" >'+get_lan("searchBody").gear+'</div>\
            <select id="vehicleGear">\
              <option value="">'+get_lan("searchBody").noLimit+'</option>\
            </select>\
            <span style="margin-right:15px;">'+get_lan("searchBody").airConditioner+'</span>\
            <select id="vehicleConditioner">\
              <option value="">'+get_lan("searchBody").noLimit+'</option>\
            </select>\
       </div>\
       <div class="serviceBody flexRow">\
            <div style="width:150px;">'+get_lan("searchBody").service+'</div>\
            <select id="characteristicService">\
              <option value="">'+get_lan("searchBody").noLimit+'</option>\
            </select>\
            <div id="searchCarBtn">'+get_lan("searchBody").search+'</div>\
       </div>\
    ')
    for(var i=0;i<24;i++){
        $("#carFromHour,#carToHour").append('\
            <option value="'+i+'">'+i+'</option>\
        ')
    }
    /*根据查询条件重置显示*/
    $("#carDeparture").val(searchCarInfo.departureCityText);
    $("#carDeparture").attr("code",searchCarInfo.departureCity);
    $("#carDeparture").attr("vendervode",searchCarInfo.carCompany);
	
    $("#carArrival").val(searchCarInfo.arrivalCityText);
    $("#carArrival").attr("code",searchCarInfo.arrivalCity);
    $("#carArrival").attr("vendervode",searchCarInfo.carCompany);
    $("#carFromDate").val(searchCarInfo.date.split(' ')[0]);
    $("#carToDate").val(searchCarInfo.returndate.split(' ')[0]);
    $("#carFromHour").val(searchCarInfo.date.split(' ')[1].split(":")[0]);
    $("#carToHour").val(searchCarInfo.returndate.split(' ')[1].split(":")[0]);
    $("#carFromMin").val(searchCarInfo.date.split(' ')[1].split(":")[1]);
    $("#carToMin").val(searchCarInfo.returndate.split(' ')[1].split(":")[1]);
	
	if(searchCarInfo.isCitycar){
		$('#carCompany').attr('disabled','disabled')
	}else{
		$('#carCompany').removeAttr('disabled')
	}
	
	//隐藏租车公司
	// carCompany
	if(ProfileInfo.HideCarRentalCompany){
		$('.carCompanyTittle').remove()
	}
	$("#carDeparture").attr("locationcode",searchCarInfo.pickupAdd);
	$("#carArrival").attr("locationcode",searchCarInfo.pickupAdd);
    
    /*end*/
    // $("#carFromDate").val(GetDateStr(0));
    // $("#carToDate").val(GetDateStr(1));
    dateChoose("carFromDate","carToDate");
    $("#carDeparture").kuCity();
    $("#carArrival").kuCity();
    
    /*车型*/
    var option = {
        url:$.session.get('ajaxUrl'),
        data: {
			url: $.session.get('obtCompany') + "/QueryService.svc/GetCarTypePost",
			jsonStr: '{"Language":"' +obtLanguage + '"}'
		},
    }
    tools.ajax(option,function(data){
        var res = JSON.parse(data);
        console.log(res);
        res.LevelList.map(function(item){
            var name = obtLanguage=="CN"?item.NameCN:item.NameEN;
            $("#vehicleGrade").append('\
              <option value="'+item.Code+'">'+name+'</option>\
            ')
        })
        res.TypeList.map(function(item){
            var name = obtLanguage=="CN"?item.NameCN:item.NameEN;
            $("#vehicleType").append('\
              <option value="'+item.Code+'">'+name+'</option>\
            ')
        })
        res.TransDriveList.map(function(item){
            var name = obtLanguage=="CN"?item.NameCN:item.NameEN;
            $("#vehicleGear").append('\
              <option value="'+item.Code+'">'+name+'</option>\
            ')
        })
        res.AirconFuelList.map(function(item){
            var name = obtLanguage=="CN"?item.NameCN:item.NameEN;
            $("#vehicleConditioner").append('\
              <option value="'+item.Code+'">'+name+'</option>\
            ')
        })
        res.SpecialEquipPrefList.map(function(item){
            var name = obtLanguage=="CN"?item.NameCN:item.NameEN;
            $("#characteristicService").append('\
              <option value="'+item.Code+'">'+name+'</option>\
            ')
        })

        if(searchCarInfo.vehicleTypeLevel){
            $("#vehicleGrade").val(searchCarInfo.vehicleTypeLevel);
            $("#vehicleType").val(searchCarInfo.vehicleTypeType);
            $("#vehicleGear").val(searchCarInfo.vehicleTypeTrans);
            $("#vehicleConditioner").val(searchCarInfo.vehicleTypeAircon);
            $("#characteristicService").val(searchCarInfo.specialEquipPref);
        }
    })
	/*租车公司*/
	// 更换接口  GetInformationsPost 换成 GetNewInformationsPost多一个参数id
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
			  console.log(res);
			// res.CarInformationList.map(function(item) {
			res.map(function(item) {
				$("#carCompany").append('\
	              <option value="' + item.Code + '">' + item.Name +
					'</option>\
	              ')
			})
			$('#carCompany').val(JSON.parse($.session.get('searchCarInfo')).carCompany)
		},
		error: function() {
			// alert('fail');
		}
	});
	
    /*查询*/
    $("#searchCarBtn").unbind("click").click(function(){
        if($('#carDeparture').attr("code")&&$('#carArrival').attr("code")){

            if($("#vehicleGear").val()==""&&$("#vehicleConditioner").val()==""&&$("#vehicleGrade").val()==""&&$("#vehicleType").val()==""){

            }else if($("#vehicleGear").val()==""||$("#vehicleConditioner").val()==""||$("#vehicleGrade").val()==""||$("#vehicleType").val()==""){
                alert(get_lan("searchDetailRemind"));
                return false;
            }
            
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
                'departureCityText':$('#carDeparture').val(),
                'arrivalCityText':$('#carArrival').val(),
                'departureCity':$('#carDeparture').attr("code"),
                'arrivalCity':$('#carArrival').attr("code"),
                'date':$('#carFromDate').val()+' '+$("#carFromHour").val()+':'+$("#carFromMin").val(),
                'returndate':$('#carToDate').val()+' '+$("#carToHour").val()+':'+$("#carToMin").val(),
                'carCompany':carCompany,
                'specialEquipPref' : $("#characteristicService").val(),
                'vehicleTypeTrans' : $('#vehicleGear').val(),
                'vehicleTypeAircon' : $('#vehicleConditioner').val(),
                'vehicleTypeLevel' : $('#vehicleGrade').val(),
                'vehicleTypeType' : $('#vehicleType').val(),
				'pickupAdd':$('#carDeparture').attr("locationcode"),
				'returnAdd':$('#carArrival').attr("locationcode"),
				'isCitycar':isCitycar,
            }
            $.session.set('searchCarInfo', JSON.stringify(searchCarInfo));
            location.replace("../../car/carList.html");
        }else{
            alert(get_lan('searchRemind'))
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
        minDate: departureValue,  // 当前日期之后的 0 天，就是当天
        maxDate: 365,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        changeYear: true,
    });
    $( "#"+departure).datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        minDate: 0,  // 当前日期之后的 0 天，就是当天
        maxDate: 365,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        changeYear: true,
        onSelect:function(){
            var departureValue = new Date($("#"+departure).val().replace(/-/g, "/"));
            $("#"+returnDate).datepicker('destroy');
            $("#"+returnDate).datepicker({
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                minDate: departureValue,  // 当前日期之后的 0 天，就是当天
                maxDate: 365,  // 当前日期之后的 0 天，就是当天
                hideIfNoPrevNext: true,
                showOtherMonths: true,
                selectOtherMonths: true,
                changeYear: true,
            });
            $("#"+returnDate).val(getNextDay($("#"+departure).val()));
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
function carList(code){
    $('body').mLoading("show");
    if(searchCarInfo.specialEquipPref!=undefined){
        var specialEquipPref = searchCarInfo.specialEquipPref;
        var vehicleTypeTrans = searchCarInfo.vehicleTypeTrans;
        var vehicleTypeAircon = searchCarInfo.vehicleTypeAircon;
        var vehicleTypeLevel = searchCarInfo.vehicleTypeLevel;
        var vehicleTypeType = searchCarInfo.vehicleTypeType;
    }else{
        var specialEquipPref = '';
        var vehicleTypeTrans = '';
        var vehicleTypeAircon = '';
        var vehicleTypeLevel = '';
        var vehicleTypeType = '';
    }
	
	if(code){
		var vendorCode = code;
	}else{
		var vendorCode = searchCarInfo.carCompany ? searchCarInfo.carCompany:"";
	}
	
    var option = {
        url:$.session.get('ajaxUrl'),
        data: {
            url: $.session.get('obtCompany') + "/QueryService.svc/GetCarListPost",
            jsonStr: '{"request":{"pickupTime":"' + searchCarInfo.date + '","pickoffTime":"' + searchCarInfo.returndate + '","pickupCity":"' +
                 searchCarInfo.departureCity+ '","id":' + netUserId + ',"language":"' + obtLanguage + '","returnCity":"' + searchCarInfo.arrivalCity +
                '","pickupAdd":"'+searchCarInfo.pickupAdd+'","returnAdd":"'+searchCarInfo.returnAdd+'","vendorCode":"' + vendorCode + '","specialEquipPref":"' +
                specialEquipPref + '","vehicleTypeTrans":"' +vehicleTypeTrans + '","vehicleTypeAircon":"' +vehicleTypeAircon + '","vehicleTypeLevel":"' +vehicleTypeLevel + '","vehicleTypeType":"' +vehicleTypeType + '"}}'
        },
    }
    tools.ajax(option,function(data){
        var res = JSON.parse(data);
        console.log(res);
        $('body').mLoading("hide");
        if(res.code==200){
            carListInfo(res.CarModelList);
            //价格排序
            //排序数组
            var priceSortAscList = [];
            var priceSortDesList = [];
            res.CarModelList.map(function(item){
                priceSortAscList.push(item);
                priceSortDesList.push(item);
            })
            //排序
            //价格升序
            var priceSortAsc=function(arr){
                for(var i=0;i<arr.length-1;i++){  
                    for(var j=i+1;j<arr.length;j++){  
                        if(parseFloat(arr[i].DailyRate)>parseFloat(arr[j].DailyRate)){
                            var temp=arr[i];
                            arr[i]=arr[j];  
                            arr[j]=temp;  
                        }  
                    }  
                }
                return arr;
            }
            //价格降序
            var priceSortDes=function(arr){
                for(var i=0;i<arr.length-1;i++){  
                    for(var j=i+1;j<arr.length;j++){
                        if(parseFloat(arr[i].DailyRate)<parseFloat(arr[j].DailyRate)){
                            var temp=arr[i];
                            arr[i]=arr[j];  
                            arr[j]=temp;  
                        }
                    }  
                }
                return arr;
            }
            $(".priceSort").unbind("click").click(function(){
                // $(".recommendList").css("color","#000");
                $(".sortTab ").css("color",'#000');
                $(".sortTabIcon").css("background-position","0px 0px");
                $(this).css("color",'#1e66ae');
                if(!$(this).attr("sortType")||$(this).attr("sortType")=="acs"){
                    carListInfo(priceSortAsc(priceSortAscList));
                    $(this).attr("sortType","desc");
                    $(".priceSortIcon").css("background-position","-18px 0px");
                }
                else if($(this).attr("sortType")=="desc"){
                    carListInfo(priceSortDes(priceSortDesList));
                    $(this).attr("sortType","acs");
                    $(".priceSortIcon").css("background-position","-36px 0px");
                }
            })
        }else{
            alert(res.message);
        }
    })
}
function carListInfo(res){
    $(".carList").html("");
    res.map(function(item,index){
        var vendorTypeSrc = item.VehicleType=="手动挡"||item.VehicleType=="Manual Unspecified Drive"?"Manual":"auto";
        var allowanceSrc = item.Allowance=="无里程限制"||item.Allowance=="Unlimited Mileage Allowance"?"Allowance1":"Allowance2";
        var AllowanceText = item.Allowance=="无里程限制"||item.Allowance=="Unlimited Mileage Allowance"?item.Allowance:get_lan("carBody").mileLimit+item.Allowance;
        var VehicleLevel = item.VehicleLevel==null?"":item.VehicleLevel;
        $(".carList").append('\
            <div class="carLi">\
                <div class="vendorName">'+item.VendorShortName+'</div>\
                <div class="vendorLevel">'+VehicleLevel+'</div>\
                <div class="vendorType flexRow"><img class="carLiIcon" src="../car/images/vendorType.png">'+item.VehicleType+'</div>\
                <div class="vendorTrans flexRow"><img class="carLiIcon" src="../car/images/'+vendorTypeSrc+'.png">'+item.VehicleTransDrive+'</div>\
                <div class="vendorAir flexRow"><img class="carLiIcon" src="../car/images/vendorAir.png">'+item.VehicleAirConditionFuel+'</div>\
                <div class="expenseDetails flexRow" rph="'+item.Rph+'">'+get_lan("carBody").expenseDetails+'</div>\
                <div class="vendorAllowance flexRow"><img class="carLiIcon" src="../car/images/'+allowanceSrc+'.png">'+AllowanceText+'</div>\
                <div class="carLiLine"></div>\
                <div class="carLiPrice"><span style="font-size:24px;color:#041e5b">'+item.DailyRate+item.CurrencyCode+'</span><span style="font-size:18px;color:#4a4a4a;">'+get_lan("carBody").daily+'</span></div>\
                <div class="carLiTotal">'+get_lan("carBody").total+'<span class="totalText">'+item.TotalAmount+item.CurrencyCode+'</span></div>\
                <div class="moreprices" code="'+item.VendorCode+'">'+get_lan("carBody").morePrices+'</div>\
                <div class="chooseCar" Rph="'+item.Rph+'">'+get_lan("carBody").choose+'</div>\
				<div class="protocolBody hide">\
				      <div class="protocolText">' + get_lan(
					'ticketList').protocol +
				'</div>\
				      <div class="triangleTopRight"></div>\
				    </div>\
            </div>\
        ')
		
                // <div class="carLiPrice">'+get_lan("carBody").price+':<br><span style="font-size:24px;color:#041e5b">'+item.DailyRate+item.CurrencyCode+'</span><span style="font-size:18px;color:#4a4a4a;">'+get_lan("carBody").daily+'</span></div>
			if (item.IsAgreement){
				$(".protocolBody").eq(index).removeClass("hide");
			}
		
        CheckImgExists('../car/images/'+item.VendorShortName+'.png',function(){
            var vendorName = '<img class="vendorNameImg" src="'+'../car/images/'+item.VendorShortName+'.png'+'">';
            $(".vendorName").eq(index).html(vendorName);
        },function(){
        })
    })
	
	//选择租车
    $(".chooseCar").unbind("click").click(function(){
        var selectCarInfo = {
            "Rph":$(this).attr("Rph"),
        }
        $.session.set('selectCarInfo', JSON.stringify(selectCarInfo));
        window.location.href = '../car/bookCar.html';
    })
	//费用详情
	$(".expenseDetails").unbind("click").click(function(){
		var rph=$(this).attr("Rph")
		$('body').mLoading("show");
		var option = {
		    url:$.session.get('ajaxUrl'),
		    data: {
				url: $.session.get('obtCompany') + "/QueryService.svc/QueryCarRulePost",
				jsonStr: '{"rph":"'+rph+'","id":'+netUserId+',"language":"' +obtLanguage + '"}',
			},
		}
		tools.ajax(option,function(data){
			$('body').mLoading("hide");
		    var res = JSON.parse(data);
		    console.log(res);
			if(res.code==200){
				//每日价 
			var showDay='hide'
			var DayStr1='<div style="float:left;">',DayStr2='<div style="float:left;">';
			var unitDay=obtLanguage=="CN"?"天":"Day";
			var unitHour=obtLanguage=="CN"?"小时":"Hour";
			res.DayHourList.map(function(item){
				if(item.DayRate!="" || item.HourRate!=""){
					showDay="show"
				}
				// DayRate/天-按天  HourRate/小时-按小时
				var rateNum=item.DayRate?item.DayRate:(item.HourRate?item.HourRate:"")//价格
				var showLine=rateNum==""?"hide":"show";//是否显示当前行
				var unit=item.DayRate?unitDay:unitHour//单位
				DayStr1=DayStr1+'<div class="'+showLine+'">'+rateNum+'</div>'
				DayStr2=DayStr2+'<div class="'+showLine+'">'+item.DayCurrencyCode+'/'+unit+'</div>'
				
			})
			DayStr1=DayStr1+'</div>'
			DayStr2=DayStr2+'</div>'
				var hideExtra='';var ExtraStr=""
			if(res.FeeInfoList.length>0){
				hideExtra='show'
				//额外费用
				ExtraStr='<table class="detaileTable" border="0" cellspacing="0" cellpadding="0"><tr>\
						<td>Amount<br><span>('+res.FeeInfoList[0].FeeList[0].CurrencyCode+')</span></td><td>Amount<br><span>('+res.FeeInfoList[0].FeeList[1].CurrencyCode+')</span></td><td>Description</td>\
					</tr>'
					
				res.FeeInfoList.map(function(item){
					ExtraStr=ExtraStr+'<tr>\
						<td>'+item.FeeList[0].Amount+'</td><td>'+item.FeeList[1].Amount+'</td><td>'+item.Des+'</td>\
					</tr>'
				})
				ExtraStr=ExtraStr+'</table>'
			}else{
				hideExtra='hide'
			}
			
				$('body').append('<div class="rateDetailsFix">\
					<div class="rateDetails">\
					 <div class="rateTitle">'+get_lan("carBody").expenseDetails+'<div class="closeBtn">x</div></div>\
					 <div class="headline">'+get_lan("rateDetails").OperationTime+'</div>\
					 <div class="detailList">'+res.OpenTime+'-'+res.CloseTime+'</div>\
					 <div class="headline '+showDay+'">'+get_lan("rateDetails").DailyPrice+'</div>\
					 <div class="detailList '+showDay+'">\
						<div style="float: left;">'+DayStr1+'</div>\
						<div style="float: left;margin-left:20px">'+DayStr2+'</div>\
					 </div>\
					 <div class="headline '+hideExtra+'">'+get_lan("rateDetails").ExtraFee+'</div>\
					 <div class="detailList '+hideExtra+'">'+ExtraStr+'</div>\
				</div>')
				document.body.style.overflow = "hidden";
				$('.closeBtn').click(function(){
					document.body.style.overflow = "auto";
					$('.rateDetailsFix').remove()
				})
			}else{
				
			}
			
		})
		
	})
	//是否显示更多价格
	if(searchCarInfo.carCompany==null||searchCarInfo.carCompany==""){
		$('.moreprices').show()
	}else{
		$('.moreprices').hide()
	}
	//更多价格
	$(".moreprices").unbind("click").click(function(){
		var code=$(this).attr('code');
		searchCarInfo.carCompany=code;
		$.session.set('searchCarInfo',JSON.stringify(searchCarInfo))
		$('#carCompany').val(code)
		carList(code)
	})
	
}
//判断图片是否存在
function CheckImgExists(imgurl,success,err) {
    var ImgObj = new Image(); 
    ImgObj.onload=function(){
        success && success(ImgObj)
    }
    ImgObj.onerror=function(){
        err && err(ImgObj)
    }
    ImgObj.src = imgurl;
}
