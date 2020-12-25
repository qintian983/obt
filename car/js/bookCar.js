var netUserId = $.session.get('netLoginId');
var obtLanguage = $.session.get('obtLanguage');
var selectCarInfo = JSON.parse($.session.get('selectCarInfo'));
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
var searchCarInfo = JSON.parse($.session.get('searchCarInfo'));
var regPhone = tools.regPhone;

// console.log(ProfileInfo)
console.log(selectCarInfo);

//中英文对象
var cn = {
    "closeText": "确定",
	"currentText":"当月",
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
    "orderDetail":{
        "orderDetailTittle":"订单详情：",
        "weekDay":'周日, 周一, 周二, 周三, 周四, 周五, 周六',
    },
    "passengerPop":{
        "popTittle":"旅客信息",
        "remind":"（'*'为必填项）",
        "chooseName":"选择购票姓名：",
        "nameRemind":"(购票姓名需与登机所持证件保持一致)",
        "popNameCn":"中文姓名:",
        "popNameEn":"英文姓名:",
        "ticketName":"旅客姓名:",
        "popPhone":"手机号码:",
        "popMail":"邮箱:",
        "popDocuments":"证件信息:",
        "popDocumentsRemind":"请选择证件类型",
        "popDocumentsTime":"证件有效期:",
        "timeRemind":"请选择有效期",
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
    },
	"progressBar": {
		"search": "查询",
		"book": "预订",
		"complete": "完成",
	},
    "carBody":{
        "price":"每日价",
        "daily":"/天",
        "total":"总金额:",
		"stroeMoney":"到店付",
		"about":"约",
		"tips":"(由于汇率浮动，人民币金额以实际为准)",
        "choose":"选择",
        "pickUpTime":"取车时间",
        "dropOffTime":"还车时间",
        "mileLimit":"里程限制:",
        "pickUp":"取:",
        "pickOff":"还:",
    },
    "passengerInfo":{
        "passengerTittle":"旅客信息",
        "remarks":"账单信息",
        "changePassengerInfo":"[修改信息]",
        "choosePassenger":"选择旅客",
        "selectPassengerRemind":"查找代订旅客 可输入姓名",
        "selectPassengerSearch":"搜索",
        "commonPassengers":"常用代订旅客",
        "chooseResidents":"选择同住人",
        "ResidentsName":"同住人：",
        "selectResidentsRemind":"查找同住人 可输入姓名/邮箱",
        'delMsg':'是否删除该订单中此旅客?',
        'addNewCustomer':"[添加新旅客]",
    },
    "creditCardInfo":{
        "creditCardTittle":"信用卡",
        "creditCardName":"持卡人姓名",
        "creditCardNumber":"信用卡卡号",
        "creditCardDate":"信用卡有效期",
        "creditCardCvv":"Cvv",
        "creditCardDocumentType":"证件类型",
        "creditCardDocumentNumber":"证件号码",
        "cancelPolicy":"取消政策",
        "surname":"姓",
        "givenName":"名",
        "guarantee":"信用卡担保",
    },
	"Conditions":"费用说明",
	"Notice":"注意事项",
    "bookCar":"预订",
}
var en = {
    "closeText": "Confirm",
	"currentText":"thisMonth",
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
        "popTittle":"Traveler Information",
        "remind":"（'*' Required field）",
        "chooseName":"Choose the name of Traveler：",
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
    },
	"progressBar": {
		"search": "Search",
		"book": "Book",
		"complete": "Complete",
    },
    "carBody":{
        "price":"Price",
        "daily":"/day",
        "total":"Total:",
		"stroeMoney":"Payment upon arrival",
		"about":"About",
		"tips":"(Due to the floating exchange rate, the amount of RMB is subject to the actual.)",
        "choose":"Choose",
        "pickUpTime":"Pick-up Time",
        "dropOffTime":"Drop-off Time",
        "mileLimit":"Mile Limit:",
        "pickUp":"pick-up:",
        "pickOff":"pick-off:",
    },
    "orderDetail":{
        "orderDetailTittle":"Order Details：",
        "weekDay":'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    },
    "passengerInfo":{
        "passengerTittle":"Traveler Information",
        "remarks":"Billing Information",
        "changePassengerInfo":"[Modify]",
        "choosePassenger":"Select Traveler",
        "selectPassengerRemind":"Enter First Name to search traveler",
        "selectPassengerSearch":"Search",
        "commonPassengers":"Common Traveler",
        "chooseResidents":"Select Roommate",
        "ResidentsName":"Roommate：",
        "selectResidentsRemind":"Enter Name/Email to search roommates",
        'delMsg':'Do you want to remove this traveler from this order?',
        'addNewCustomer':"[Add new travelers]",
    },
    "creditCardInfo":{
        "creditCardTittle":"Credit Card",
        "creditCardName":"*Cardholder",
        "creditCardNumber":"*Card Number",
        "creditCardDate":"*Expiry Date",
        "creditCardCvv":"Cvv",
        "creditCardDocumentType":"Certificate Type",
        "creditCardDocumentNumber":"Document Number",
        "cancelPolicy":"Cancel policy",
        "surname":"Surname",
        "givenName":"Given Name",
        "guarantee":"Credit card guarantee",
    },
	"Conditions":"Terms and Conditions",
	"Notice":"Notice",
    "bookCar":"Book",
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
	showContent();//内容展示
    surePassengerInfo();//旅客信息确认
    passengerPop();//个人信息弹窗
	getCarRule()//费用说明及注意事项
})
function getWeek(dateStr){
    var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
    return get_lan('orderDetail').weekDay.split(',')[myDate.getDay()];
}
//内容展示
function showContent(){
	$(".remarkPop").html('\
	    <div class="businessTripTittle tittleBackColor">'+get_lan('remarkPop').businessTripTittle+'</div>\
	    <div class="businessTripBody"></div>\
	    <div class="remarkInfoTittle tittleBackColor">'+get_lan('remarkPop').remarkInfoTittle+'</div>\
	    <div style="padding-bottom:10px;border-bottom:1px solid #f3f3f3;">\
          <div class="remarkInfoBody autoScrollY"></div>\
        </div>\
        <div class="colorRed" style="box-sizing:border-box;padding-left:20px;font-size:14px;height: 19px;line-height: 19px;">'+get_lan('remarkPop').remarkInfoRemind+'</div>\
	    <div class="remarkFooter flexRow"></div>\
	')
	$("#main").html('\
        <div class="autoCenter">\
            <div class="progressBar flexRow activeFontColor"></div>\
            <div class="orderDetail">\
            <div class="orderDetailTittle tittleBackColor">'+get_lan('orderDetail').orderDetailTittle+'</div>\
            </div>\
            <div class="orderList flexRow hide">\
               <div class="orderListTittle">'+get_lan('orderListTittle')+'</div>\
               <div class="orderListBody"></div>\
            </div>\
            <div class="passengerInfo">\
	          <div class="passengerTittle">'+get_lan('passengerInfo').passengerTittle+'</div>\
	            <div class="passengerBody">\
	              <div class="choosePassengerBody flexRow activeFontColor"></div>\
    	          <div class="passengerBar flexRow">\
    	              <div class="passengerBarLi" style="width:250px;box-sizing:border-box;padding-left:45px;">'+get_lan('passengerPop').ticketName+'</div>\
                      <div class="passengerBarLi" style="width:150px;">'+get_lan('passengerPop').popPhone+'</div>\
                      <div class="passengerBarLi" style="width:200px;">'+get_lan('passengerPop').popMail+'</div>\
                      <div class="passengerBarLi" style="width:300px;">'+get_lan('passengerPop').popDocuments+'</div>\
	              </div>\
	              <div class="passengerList">\
	              </div>\
	          </div>\
            </div>\
            <div class="creditCardInfo hide">\
              <div class="creditCardTittle">'+get_lan('creditCardInfo').creditCardTittle+'\
                <input type="checkbox" class="checkCreditCard" checked><span style="font-size:14px;">'+get_lan('creditCardInfo').guarantee+'</span>\
              </div>\
              <div class="creditCardBody flexWrap">\
                <div class="creditCardName flexRow">\
                  <div class="creditCardDetailTittle">'+get_lan('creditCardInfo').creditCardName+'</div>\
                  <input class="creditCardInput creditCardSurname" placeholder="'+get_lan('creditCardInfo').surname+'" style="width:78px;">\
                  <input class="creditCardInput creditCardGivenName" placeholder="'+get_lan('creditCardInfo').givenName+'" style="width:80px;margin-left:20px;">\
                </div>\
                <div class="creditCardNumber flexRow">\
                  <div class="creditCardDetailTittle">'+get_lan('creditCardInfo').creditCardNumber+'</div>\
                  <input class="creditCardInput creditCardNumberInput">\
                </div>\
                <div class="creditCardDate flexRow">\
                  <div class="creditCardDetailTittle">'+get_lan('creditCardInfo').creditCardDate+'</div>\
                  <input class="creditCardInput creditCardDateInput" readonly>\
                </div>\
                \
              </div>\
            </div>\
			<div class="feeDetails hide">\
			  <div class="feeDetailsBody flexWrap">\
				<div class="tabGroup"><div class="tabLi hide" model="feeDescription">'+get_lan('Conditions')+'</div><div class="tabLi hide" model="rule">'+get_lan('Notice')+'</div></div>\
				<div class="feeDescription tabcontent hide "></div>\
				<div class="rule tabcontent hide"></div>\
			  </div>\
			</div>\
            <div class="totalFareBody activeFontColor" style="text-align:right;"></div>\
            <div class="bookCarBody flexRow">\
              <div class="bookCarBtn btnBackColor">'+get_lan('bookCar')+'</div>\
            </div>\
          </div>\
    ')
    // <div class="creditCardCvv flexRow">\
    //     <div class="creditCardDetailTittle">'+get_lan('creditCardInfo').creditCardCvv+'</div>\
    //     <input class="creditCardInput creditCardCvvInput" maxlength="3">\
    // </div>\
    // <div class="creditCardDocumentType flexRow">\
    //     <div class="creditCardDetailTittle">'+get_lan('creditCardInfo').creditCardDocumentType+'</div>\
    //     <select class="creditCardInput creditCardDocumentTypeSelect"></select>\
    // </div>\
    // <div class="creditCardDocumentNumber flexRow">\
    //     <div class="creditCardDetailTittle">'+get_lan('creditCardInfo').creditCardDocumentNumber+'</div>\
    //     <input class="creditCardInput creditCardDocumentNumberInput">\
    // </div>\
    // <div class="creditCardPolicy flexRow">\
    //     <div class="creditCardPolicyTittle">'+get_lan('creditCardInfo').cancelPolicy+'</div>\
    //     <div class="creditCardPolicyBody"></div>\
    // </div>
    $(".bookCarBtn").unbind("click").click(function(){
        if($(".passengerLi").length == 0){
            alert(get_lan('bookTicketRemind'));
        }
    })

	$(".progressBar").html('\
	    <div class="progressLine progressActiveBack"></div><div class="progressCircle progressActiveBack"></div><span class="progressActiveFont">'+get_lan('progressBar').search+'</span>\
	    <div class="progressLine progressActiveBack"></div><div class="progressCircle progressActiveBack"></div><span class="progressActiveFont">'+get_lan('progressBar').book+'</span>\
	    <div class="progressLine progressBackColor"></div><div class="progressCircle progressBackColor"></div>'+get_lan('progressBar').complete+'\
	')
    $(".creditCardDateInput").datepicker({
        dateFormat: 'yy-mm',
        changeMonth: true,
        changeYear: true,
        minDate: 30,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
		
		showButtonPanel: true,//显示按钮,没有按钮不可传入日期
		closeText: get_lan('closeText'),
		currentText:get_lan('currentText'),
		onChangeMonthYear:function(year,month,inst){
			console.log(inst.id)
			setTimeout(function() {
			  var buttonPane = $('#'+inst.id)
			    .datepicker( "widget" )
			    .find( ".ui-datepicker-buttonpane" );
				$(buttonPane).html('')
			  $( "<button>", {
			    text: get_lan('closeText'),
			    click: function() {
			      $.datepicker._clearDate( $('#'+inst.id) );
				  var month = $("#ui-datepicker-div .ui-datepicker-month option:selected").val();//得到选中的月份值
				  var year = $("#ui-datepicker-div .ui-datepicker-year option:selected").val();//得到选中的年份值
				  $('.creditCardDateInput').val(year+'-'+(parseInt(month)+1));//给input赋值，其中要对月值加1才是实际的月份
			    }
			  }).appendTo( buttonPane );
			}, 1 );
		},
		beforeShow: function( input ) {
			$('style').append('.ui-datepicker-calendar{display: none;}')
			$(".creditCardDateInput").datepicker('setDate',new Date($(".creditCardDateInput").val())); //设置为当前日期
		      },
		
    });
    /*租车详情*/
    var carOption = {
        url:$.session.get('ajaxUrl'),
        data: {
			url: $.session.get('obtCompany') + "/QueryService.svc/QuerySelectedCarInfo",
			jsonStr: '{"language":"' +obtLanguage + '","rph":"' +selectCarInfo.Rph + '","id":' +netUserId + '}'
		},
    }
    tools.ajax(carOption,function(data){
        var res = JSON.parse(data);
        console.log(res);
        if(res.code==200){
            res.CarModelList.map(function(item,index){
                var AllowanceText = item.Allowance=="无里程限制"||item.Allowance=="Unlimited Mileage Allowance"?item.Allowance:get_lan("carBody").mileLimit+item.Allowance;
                $(".orderDetail").append('\
                    <div class="orderDetailBody">\
                        <div class="vendorName">'+item.VendorShortName+'</div>\
                        <div class="vendorLevel">'+item.VehicleLevel+'</div>\
                        <div class="vendorInfo">\
                        '+item.VehicleType+'&nbsp;|&nbsp;'+item.VehicleTransDrive+'&nbsp;|&nbsp;'+item.VehicleAirConditionFuel+'&nbsp;|&nbsp;'+AllowanceText+'\
                        </div>\
                        <div class="vendorAddress">\
                          <span style="color:#3083FB">'+get_lan("carBody").pickUp+'&nbsp;&nbsp; </span>'+searchCarInfo.departureCityText+'<br>\
                          <span style="color:#D0021B">'+get_lan("carBody").pickOff+'&nbsp;&nbsp; </span>'+searchCarInfo.arrivalCityText+'\
                        </div>\
                        <div class="pickUpTime">\
                            <span style="font-size:14px;color:#666">'+get_lan("carBody").pickUpTime+'</span><br>\
                            <span style="font-size:20px;color:#4a4a4a">'+searchCarInfo.date.split(' ')[1]+'</span><br>\
                            <span style="font-size:14px;color:#666">'+searchCarInfo.date.split(' ')[0].split('-')[1]+'-'+searchCarInfo.date.split(' ')[0].split('-')[2]+' '+getWeek(searchCarInfo.date.split(' ')[0])+'</span>\
                        </div>\
                        <div class="carArrow"></div>\
                        <div class="dropOffTime">\
                            <span style="font-size:14px;color:#666">'+get_lan("carBody").dropOffTime+'</span><br>\
                            <span style="font-size:20px;color:#4a4a4a">'+searchCarInfo.returndate.split(' ')[1]+'</span><br>\
                            <span style="font-size:14px;color:#666">'+searchCarInfo.returndate.split(' ')[0].split('-')[1]+'-'+searchCarInfo.returndate.split(' ')[0].split('-')[2]+' '+getWeek(searchCarInfo.returndate.split(' ')[0])+'</span>\
                        </div>\
                        <div class="carLiLine"></div>\
                        <div class="carLiPrice" style="font-size: 14px;">'+get_lan("carBody").price+':<br><span style="font-size:24px;color:#041e5b">'+item.DailyRate+item.CurrencyCode+'</span><span style="font-size:14px;color:#4a4a4a;">'+get_lan("carBody").daily+'</span></div>\
                    </div>\
                ')
                CheckImgExists('../car/images/'+item.VendorShortName+'.png',function(){
                    var vendorName = '<img class="vendorNameImg" src="'+'../car/images/'+item.VendorShortName+'.png'+'">';
                    console.log('index:'+index);
                    $(".vendorName").eq(index).html(vendorName);
                },function(){
                })
                // $(".totalFareBody").html('\
                //     <span style="font-size:13px;color:#000;margin-right:20px;">'+get_lan("carBody").total+'</span>'+item.TotalAmount+item.CurrencyCode+'\
                // ')
            })
            
        }else{
            alert(res.message);
        }
        
    })
}
/*信用卡*/
function needCreditCard(){
        $(".creditCardInfo").removeClass("hide");
        $(".creditCardPolicyBody").html('');
        $(".checkCreditCard").change(function(){
            if($(this).is(":checked")){
                $(".creditCardBody").removeClass("hide");
            }else{
                $(".creditCardBody").addClass("hide");
            }
        })
        $.ajax(
          {
            type:'post',
            url : $.session.get('ajaxUrl'),
            dataType : 'json',
            data:{
                // url: $.session.get('obtCompany')+"/SystemService.svc/GetCustomerCreditCardInfoPost",
                // jsonStr:'{"id":'+netUserId+',"Language ":"'+obtLanguage+'","customerId":"'+$(".passengerLi").eq(0).attr("customerId")+'"}',
				url: $.session.get('obtCompany') + "/SystemService.svc/GetAllCreditCardInfoPost",
				jsonStr: '{"request":{"Id":'+netUserId+',"CustomerId":"'+ $(".passengerLi").eq(0).attr("customerId") +'","UseType":"1","Language ":"' + obtLanguage + '"}}'
            },
            success : function(data) {
                var res = JSON.parse(data);
                console.log(res);
                var CreditCardNumber = res.customerCCIs.length==0||res.customerCCIs[0].CreditCardNumber==null?"":tools.Decrypt(res.customerCCIs[0].CreditCardNumber);
                var CreditCardExpire = res.customerCCIs.length==0||res.customerCCIs[0].CreditCardExpire==null?"":res.customerCCIs[0].CreditCardExpire;
                // console.log(CreditCardNumber);
                
                var date = new Date(CreditCardExpire);
                Y = date.getFullYear() + '-';
                M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
                var format=Y+M
                if(CreditCardNumber!=""){
                  $(".creditCardNumberInput").attr("CreditCardNumber",CreditCardNumber);
                  $(".creditCardNumberInput").val("****************"+CreditCardNumber.substring(CreditCardNumber.length-4,CreditCardNumber.length));
                  $(".creditCardDateInput").val(format);
                }
                clickReserveBtn();//点击预定按钮
            },
            error : function() {
              // alert('fail');
            }
          }
        );
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
        if(isFirst=="true"){
            $.ajax(
              {
                type:'post',
                url : $.session.get('ajaxUrl'), 
                dataType : 'json',
                data:{
                    url: $.session.get('obtCompany')+"/SystemService.svc/GetRemarkConfigInfoNew",
                    jsonStr:'{"request":{"customerId":'+CustomerID+',"companyID":"'+CompanyId+'","key":'+netUserId+',"tripType":"HOTEL"}}'
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
                },
                error : function() {
                  // alert('fail');
                }
              } 
            );
        }else if(isFirst.split(',')[0]=="Residents"){
            $.ajax(
              {
                type:'post',
                url : $.session.get('ajaxUrl'),
                dataType : 'json',
                data:{
                    url: $.session.get('obtCompany')+"/SystemService.svc/GetRemarkConfigInfo",
                    jsonStr:'{"id":'+CustomerID+',"companyID":"'+CompanyId+'","key":'+netUserId+'}'
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
        }
    }
    openRemarkPop();
    function remark(remarks,CustomerID,CompanyID,isFirst){
        $(".remarkInfoBody").html('');
		var redTips=false;
        remarks.map(function(item,index){
            var colorRed = item.Input.indexOf("4") != -1||item.Input==""?"":"colorRed";
            var starIcon = item.Input.indexOf("4") != -1||item.Input==""?"":"*";
            if(ProfileInfo.onlineStyle!="APPLE"){
                starIcon = "";
            }
            if(colorRed=="colorRed"){
                redTips=true;
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
                          <div class="liContent">\
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
                          <div class="liContent">\
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
                      <div class="liContent">\
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
        for(var i=0;i<$(".remarkSelect").length;i++){
            var index = parseInt($(".remarkSelect").eq(i).attr("index"));
            // console.log(index);
            if(remarks[index].Items.length!=0){
                remarks[index].Items.map(function(item){
                    var itemValue = item.Value==null||item.Value==""?item.Key:item.Value;
                    $(".remarkSelect").eq(i).append('\
                        <option class="remarkOption" key="'+item.Key+'" index="'+index+'">'+itemValue+'</option>\
                        ')
                })
            }else{
                $(".remarkSelect").eq(i).hide();
            }
            
            // var inputIndex = parseInt($(".remarkSelect").eq(i).find("option:selected").attr("index"));
            // $(".remarkLiInput").eq(inputIndex).val($(".remarkSelect").eq(i).find("option:selected").text());
            $(".remarkSelect").eq(i).change(function(){
                var index = parseInt($(this).find("option:selected").attr("index"));
                $(".remarkLiInput").eq(index).val($(this).find("option:selected").text());
                $(".remarkLiInput").eq(index).attr('key',$(this).find("option:selected").attr("key"));
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
                    remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).val().split(',').join('##')+','
                }
                if($(".remarkLiInput").eq(i).attr("key")){
                    remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).attr("key").split(',').join('##')+','
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
                        var res = JSON.parse(data);
                        console.log(res);
                        $(".orderDetail").attr("CompanyID",CompanyID);
                        // console.log(queryKeys);
                        if(res == "1"){
                            closeRemarkPop();
                            passengerPopChange(CustomerID,isFirst,1);
                        }else{
							$('body').mLoading("hide");
                            alert(res);
                        }
                    },
                    error : function() {
                      // alert('fail');
                    }
                  } 
                );
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
            }else if(isFirst.split(',')[0] == "Residents"){
                var queryKey = isFirst.split(',')[1]+','+CustomerID;
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'), 
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/SystemService.svc/SelectHotelLivingPost",
                        jsonStr:'{"queryKey":"'+queryKey+'","remarks":"'+remarks.substring(0,remarks.length-1)+'","id":'+netUserId+',"Language":"'+obtLanguage+'"}'
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
function surePassengerInfo(){
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
            // console.log(passengerJson);
            $(".orderDetail").attr("CompanyID",passengerJson.CompanyID);
            $(".popNameCnText").text(passengerJson.CustomerCN);
            $(".popNameEnText").text(passengerJson.CustomerEN);
            $(".popNameCn .popNameRadio").attr("PassengerName",passengerJson.CustomerCN);
            $(".popNameEn .popNameRadio").attr("PassengerName",passengerJson.CustomerEN);
            //无审批单
            // if(!passengerJson.HasTravelRequest){//原逻辑
			if(!passengerJson.HasTravelRequest || passengerJson.HasTravelRequest){//火车的逻辑
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'),
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/SystemService.svc/ShowMatchedPassengersPost",
                        jsonStr:'{"goAirline":"null","backAirline":"null","newOrder":"0","key":'+netUserId+',"Language":"'+obtLanguage+'"}'
                    },
                    success : function(data) {
                        var res = JSON.parse(data);
                        console.log(res);
                        $('body').mLoading("hide");
                        //备注信息展示
                        var employeeName = obtLanguage =="CN"?passengerJson.CustomerCN:passengerJson.CustomerEN;
                        if(!$.session.get('goOnBookOrderNo')){
                            remarkInfoPop(passengerJson.CompanyID,passengerJson.ID,employeeName,"true");
                        }else{
                            //继续预订
                            $(".choosePassengerBody").hide();
                            $('body').mLoading("show");
                            var queryKey = ","+$(".orderDetail").attr("city")+","+$(".orderDetail").attr("DateStart")+","+$(".orderDetail").attr("DateReturn");
							//暂无继续预定租车，reginType是在预订飞机时使用 ，dstCode为空
							var jsonStr={
									request:{
										"id":netUserId.split('"')[1],
										"bcn":$.session.get('goOnBookOrderNo'),
										"Language":obtLanguage,
										"itemID":"0",
										"queryKey":queryKey,
										"reginType":"",
										"dstCode":""
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
                                    var res = JSON.parse(data);
                                    console.log(res);
                                    $(".passengerList").html('');
                                    if(res.Message){
                                        $('body').mLoading("hide");
                                        alert(res.Message)
                                    }else{
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
                                error : function() {
                                  // alert('fail');
                                }
                              } 
                            );
                        }
                        //有代订权限
                        if(res.length > 1){
                            $(".choosePassengerBody").html('\
                                <div style="min-width:110px;">'+get_lan('passengerInfo').choosePassenger+'</div>\
                                <div class="selectPassengerBody">\
                                <input type="text" class="selectPassengerInput" autocomplete="off" placeholder="'+get_lan('passengerInfo').selectPassengerRemind+'">\
                                <div class="selectPassengerSearch btnBackColor">'+get_lan('passengerInfo').selectPassengerSearch+'</div>\
                                <div class="selectPassengerArrow">▼</div>\
                                <div class="selectPassengerList autoScrollY"></div>\
                                </div>\
                                <span class="addNewCustomer hide">'+get_lan('passengerInfo').addNewCustomer+'</span>\
                                ')
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
                                        $(".addNewCustomer").removeClass('hide');
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
                        }
                        //无代订权限
                        else{
                            $(".passengerBody").attr("state","true");
                            $(".choosePassengerBody").hide();
                            // $(".closeRemarkBtn").remove();
                            // $(".sureRemarkBtn").css("margin","0 auto");
                            $(".remarkFooter").html('\
                                <div class="sureRemarkBtn btnBackColor" style="margin:0 auto;">'+get_lan('remarkPop').confirm+'</div>\
                            ')     
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
            // console.log(searchCarInfo);
            var queryKey = $(this).attr("searchId")+',1,'+searchCarInfo.departureCityText+','+searchCarInfo.arrivalCityText+','+searchCarInfo.date.split(' ')[0]+','+searchCarInfo.returndate.split(' ')[0];
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
			
            // $.ajax(
            //   {
            //     type:'post',
            //     url : $.session.get('ajaxUrl'),
            //     dataType : 'json',
            //     data:{
            //         url: $.session.get('obtCompany')+"/SystemService.svc/CheckCustomerHasTravelRequestPost",
            //         jsonStr:'{"queryKey":"'+queryKey+'","id":'+netUserId+',"Language":"'+obtLanguage+'"}'
            //     },
            //     success : function(data) {
            //         $('body').mLoading("hide");
            //         var res = JSON.parse(data);
            //         console.log(res);
            //         if(res.Remarks.length != 0){
            //             $(".passengerBody").attr("state","true");
            //             if($(".passengerLi").length == 0){
            //                 remarkInfoPop(CompanyID,customerId,employeeName,"true");
            //             }else{
            //                 remarkInfoPop($(".passengerLi").eq(0).attr("companyId"),customerId,employeeName,"true");
            //             }
            //         }
            //     },
            //     error : function() {
            //     }
            //   } 
            // );
			$(".passengerBody").attr("state","true");
			// 有审批单权限
			var city=$('.orderDetail').attr('departecity')+','+$('.orderDetail').attr('arrivecity')
			if(JSON.parse($.session.get('ProfileInfo')).HasTravelRequest){
				city=""//租车目前不需要传othercity，而且没有做审批单
			    tools.customerTravelRequest(netUserId,queryKey,function(){
			        $(".requestCover").remove();
			        if($(".passengerLi").length == 0){
			            remarkInfoPop(CompanyID,customerId,employeeName,"true");
			        }else{
			            remarkInfoPop($(".passengerLi").eq(0).attr("companyId"),customerId,employeeName,"true");
			        }
			    },1,city)
			}else{
				$(".passengerBody").attr("state","true");
				if($(".passengerLi").length == 0){
					remarkInfoPop(CompanyID,customerId,employeeName,"true");
				}else{
					remarkInfoPop($(".passengerLi").eq(0).attr("companyId"),customerId,employeeName,"true");
				}
			}
			
        })
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
        <div class="popNameCn flexRow">\
        <input type="radio" name="popName" class="popNameRadio" checked><div style="width:105px;">'+get_lan('passengerPop').popNameCn+'</div><span class="popNameCnText"></span>\
        </div>\
        <div class="popNameEn flexRow">\
        <input type="radio" name="popName" class="popNameRadio"><div style="width:105px;">'+get_lan('passengerPop').popNameEn+'</div><span class="popNameEnText"></span>\
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
        minDate: 0,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
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
                $(".popDocumentsSelect").append('<option value="'+item.Rid+'">'+item.Name+'</option>');
                $(".creditCardDocumentTypeSelect").append('<option Rid="'+item.Rid+'">'+item.Name+'</option>');
            })
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
            <div class="newCustomerLi flexRow">\
                <div style="width:105px;">'+get_lan('passengerPop').popNameCn+'</div>\
                <input type="text" class="newCustomerHalfInput newCustomerInputSurNameCn" placeholder="'+get_lan('newCustomerPop').surname+'">\
                <input type="text" class="newCustomerHalfInput newCustomerInputGivenNameCn" placeholder="'+get_lan('newCustomerPop').givenName+'" style="margin-left:8px;">\
            </div>\
            <div class="newCustomerLi flexRow">\
                <div style="width:105px;">'+get_lan('passengerPop').popNameEn+'</div>\
                <input type="text" class="newCustomerHalfInput newCustomerInputSurNameEn" placeholder="'+get_lan('newCustomerPop').surname+'">\
                <input type="text" class="newCustomerHalfInput newCustomerInputGivenNameEn" placeholder="'+get_lan('newCustomerPop').givenName+'" style="margin-left:8px;">\
            </div>\
            <div class="newCustomerLi flexRow">\
                <div style="width:105px;">'+get_lan('newCustomerPop').nick+'</div>\
                <input type="text" class="newCustomerInput newCustomerInputNick">\
            </div>\
            <div class="newCustomerLi flexRow">\
                <div style="width:105px;">'+get_lan('newCustomerPop').sex+'</div>\
                <div style="width:43px;text-align:center;">'+get_lan('newCustomerPop').male+'</div>\
                <input type="radio" name="newPopSex" class="newPopSexRadio" checked sexValue="false">\
                <div style="width:43px;text-align:center;">'+get_lan('newCustomerPop').female+'</div>\
                <input type="radio" name="newPopSex" class="newPopSexRadio" sexValue="true">\
            </div>\
            <div class="newCustomerLi flexRow">\
                <div style="width:105px;">'+get_lan('passengerPop').popPhone+'</div>\
                <input type="text" class="newCustomerInput newCustomerInputPhone" maxlength="11">\
            </div>\
            <div class="newCustomerLi flexRow">\
                <div style="width:105px;">'+get_lan('passengerPop').popMail+'</div>\
                <input type="text" class="newCustomerInput newCustomerInputEmail">\
            </div>\
            <div class="newCustomerLi flexRow">\
                <div style="width:105px;">'+get_lan('passengerPop').popDocuments+'</div>\
                <select class="newPopDocumentsSelect">\
                  <option>'+get_lan('passengerPop').popDocumentsRemind+'</option>\
                </select>\
                <input type="text" class="newCustomerInput newCustomerInputDocuments">\
            </div>\
            <div class="newCustomerLi flexRow hide newCustomerTime">\
                <div style="width:105px;">'+get_lan('passengerPop').popDocumentsTime+'</div>\
                <input type="text" class="newCustomerInput newCustomerInputTime" readonly placeholder="'+get_lan('passengerPop').timeRemind+'">\
            </div>\
            <div class="newCustomerLi flexRow">\
                <div style="width:105px;">'+get_lan('newCustomerPop').nationality+'</div>\
                <input type="text" class="newCustomerInput newCustomerInputNationality" id="countryInput" autocomplete="off">\
            </div>\
            <div class="newCustomerLi flexRow">\
                <div style="width:105px;">'+get_lan('newCustomerPop').birthday+'</div>\
                <input type="text" class="newCustomerInput newCustomerInputBirthday" readonly value="1985-1-1">\
            </div>\
        </div>\
        <div class="newCustomerPopBottom flexRow">\
          <div class="newCustomerPopCancel" style="background-color:#979797;margin:16px 0 27px 30px;">'+get_lan('remarkPop').cancel+'</div>\
          <div class="newCustomerPopBtn" style="margin:16px 0 27px 190px;">'+get_lan('remarkPop').confirm+'</div>\
        <div>\
        ');
    $(".newCustomerPopCancel").unbind("click").click(function(){
        closeNewCustomer();
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
		beforeShow:function(){
			$('style').text('')
		},
    });
    $(".newCustomerInputBirthday").datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        minDate: '1930-1-1',  // 当前日期之后的 0 天，就是当天
		maxDate:0,
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
		yearRange:'c-50:c+50',//选择框，前后多少年
		beforeShow:function(){
			$('style').text('')
		},
    });
	// 更换接口  GetInformationsPost 换成 GetNewInformationsPost多一个参数id
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/SystemService.svc/GetCarRentalCompanyPost",
            jsonStr: '{"id":'+netUserId+',"culture":"' + obtLanguage + '"}'
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
function passengerPopChange(customerId,isFirst,customerRid){
    openPassengerPop();
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
            console.log($(".popDocumentsSelect").length);
            res.map(function(item,index){
                if(item.ID == customerId){
                    $(".popNameCnText").text(item.NameCN);
                    $(".popNameEnText").text(item.NameEN);
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
                    if(item.Documents.length != 0){
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
                    }
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
                            closePassengerPop();
                            passengersInOrder();
                        }
                    }else if(isFirst == "false"){
                        item.Documents.map(function(ditem){
                            if(customerRid==ditem.Rid){
                                // $(".popDocumentsInput").val(ditem.DocumentNumber);
                                /*隐藏证件信息*/
                                $(".popDocumentsInput").attr("hideNo",ditem.DocumentNumber);
                                $(".popDocumentsInput").val(hideDocument(ProfileInfo,ditem.DocumentNumber,ditem.Rid));
                                /*end*/
                                $(".popDocumentsSelect").val(customerRid);
                                $(".popDocumentsTimeInput").val(hideDocDate(ProfileInfo,ditem.docExpiryDate.substring(0,10)));
                                $(".popDocumentsTimeInput").attr("hideNo",ditem.docExpiryDate.substring(0,10));
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
                            $('body').mLoading("hide");
                            var res = JSON.parse(data);
                            console.log(res);
                            if(res.message){
                                alert(res.message);
                            }else{
                                closePassengerPop();
                                chooseNameAndDocument(customerId,$('.popNameRadio:checked').attr("PassengerName"),$('.popDocumentsSelect option:selected').val(),'','');
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
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/SystemService.svc/GetPassengersInOrder",
            jsonStr:'{"request":{"key":'+netUserId+',"Language":"'+obtLanguage+'","HotelChain":"'+$(".orderDetail").attr("HotelChain")+'"}}'
        },
        success : function(data) {
            $('body').mLoading("hide");
            var res = JSON.parse(data);
            console.log(res);
            /*国籍*/
            res.map(function(item){
                if(item.Nationality=="CN"){
                    $(".bookHotelBtn").attr('nation',"cn");
                }
            })
            /*乘客信息*/
            $(".passengerList").html('');
            res.map(function(item,index){
                var passengerName = item.Documents[0].DocNameCn!=null&&item.Documents[0].DocNameCn!=""?item.Documents[0].DocNameCn:item.NameCN;
                var profilePhone = ProfileInfo.HideMyPersonalInfo&&item.Phones!=""?"*******"+item.Phones.substring(item.Phones.length-4,item.Phones.length):item.Phones;
                $(".passengerList").append('\
                    <div class="passengerLi flexRow" customerId="'+item.ID+'" companyId="'+item.OrderCompanyId+'">\
                    <div class="passengerLiDiv" style="width:250px;text-align:left;padding-left:45px;box-sizing:border-box;"><span class="PassengerNameText">'+passengerName+'</span><span class="changePassengerInfo specificFontColor" index="'+index+'" customerId="'+item.ID+'" style="margin-left:5px;cursor:pointer;">'+get_lan('passengerInfo').changePassengerInfo+'</span></div>\
                    <div class="passengerLiDiv passengerPhone" style="width:150px;" hideNo="'+item.Phones+'">'+profilePhone+'</div>\
                    <div class="passengerLiDiv" style="width:200px;">'+hideEmail(ProfileInfo,item.Email)+'</div>\
                    <div class="passengerLiDiv passengerLiDocuments" style="width:300px;"><select class="documentsSelect"></select></div>\
                    <div class="passengerLiDiv roommateName flexRow" style="width:170px;color:#1e66ae" index="'+index+'"></div>\
                    <div class="passengerLiDiv changeRemarkBtn specificFontColor" index="'+index+'"  style="width:125px;text-decoration: underline;cursor:pointer">'+get_lan('passengerInfo').remarks+'</div>\
                    <div><img src="../../css/images/delIcon.png" class="delIcon" style="margin-top:3px;cursor:pointer;position:absolute;left:5px;" customerId="'+item.ID+'"></div>\
                    </div>\
                    \
                    ')
                item.Documents.map(function(ditem){
                    $(".documentsSelect").eq(index).append('\
                        <option value="'+ditem.Rid+'" docText="'+ditem.DocumentNumber+'">'+ditem.nameDoc+':'+hideDocument(ProfileInfo,ditem.DocumentNumber,ditem.Rid)+'</option>\
                    ')
                })
                if(item.UpdatedCustomerInfo!=""&&item.UpdatedCustomerInfo!=null){
                    var UpdatedCustomerList = item.UpdatedCustomerInfo.split(',');
                    $(".PassengerNameText").text(UpdatedCustomerList[1]);
                    $(".documentsSelect").val(UpdatedCustomerList[2]);
                }
            })
            if(res.length>0){
                if($(".orderDetail").attr("HotelType")=="1B"||$(".orderDetail").attr("HotelType")=="4"||$(".orderDetail").attr("HotelType")=="3"||$(".orderDetail").attr("HotelType")=="HRS"){
                        $(".creditCardSurname").val(res[0].NameEN.split("/")[0]);
                        $(".creditCardGivenName").val(res[0].NameEN.split("/")[1]);
                }else{
                    if(res[0].NameCN!=res[0].NameEN){
                        $(".creditCardSurname").val(res[0].NameCN.substring(0,1));
                        $(".creditCardGivenName").val(res[0].NameCN.substring(1,res[0].NameCN.length));
                    }else{
                        $(".creditCardSurname").val(res[0].NameCN.split("/")[0]);
                        $(".creditCardGivenName").val(res[0].NameCN.split("/")[1]);
                    }
                }
            }
            needCreditCard();/*信用卡*/
            /*删除旅客*/
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
                passengerPopChange(customerId,"false",customerRid);
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
            /*苹果*/
            if($(".passengerLi").length==1&&ProfileInfo.onlineStyle=="APPLE"){
                $(".selectPassengerArrow,.selectPassengerSearch").unbind("click").click(function(){
                    alert("There is already a traveler in the order.");
                })
            }else{
                $(".selectPassengerArrow").removeAttr("spread");
                selectPassengers();
            }
        },
        error : function() {
          // alert('fail');
        }
      } 
    );
}
//点击预订
function clickReserveBtn(){
    $(".bookCarBtn").unbind("click").click(function(){
        var creditCardNumber = $(".creditCardNumberInput").val().indexOf("*") != -1 ? $(".creditCardNumberInput").attr(
            "CreditCardNumber") : $(".creditCardNumberInput").val();
        creditCardNumber = tools.Encrypt(creditCardNumber);
        if($(".checkCreditCard").is(":checked")){
            if($(".creditCardSurname").val()==""||$(".creditCardGivenName").val()==""||creditCardNumber==""||$(".creditCardDateInput").val()==""){
                alert(get_lan('passengerPop').clickRemind);
                return false;
            }
            var han = /^[\u4e00-\u9fa5]+$/;
            if (!han.test($(".creditCardSurname").val())) {
              var creditCardName = $(".creditCardSurname").val()+'/'+$(".creditCardGivenName").val();
            }else{
              var creditCardName = $(".creditCardSurname").val()+$(".creditCardGivenName").val();
            }
            var creditCard = $(".passengerLi").eq(0).attr("customerId")+","+creditCardName+",,,"+creditCardNumber+","+$(".creditCardDateInput ").val().split('-')[0]+","+$(".creditCardDateInput ").val().split('-')[1]+","
        }else{
            var creditCard = "";
        }
        $('body').mLoading("show");
        var bookOption = {
            url:$.session.get('ajaxUrl'),
            data: {
                url: $.session.get('obtCompany') + "/OrderService.svc/BookCarPost",
                jsonStr: '{"Language":"' +obtLanguage + '","queryKey":"' +selectCarInfo.Rph + '","id":' +netUserId + ',"creditCard":"' +creditCard + '"}'
            },
        }
        tools.ajax(bookOption,function(data){
            var res = JSON.parse(data);
            console.log(res);
            $('body').mLoading("hide");
            if(res.OrderNo != null){
                var orderNo = res.OrderNo;
                changeNewUid(orderNo);
            }else if(res.ErrorMsg){
                alert(res.ErrorMsg);
            }
            else{
                alert("fail");
            }
        })

    })
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
function getCarRule(){
	    $('body').mLoading("show");
	    $.ajax(
	      {
	        type:'post',
	        url : $.session.get('ajaxUrl'), 
	        dataType : 'json',
	        data:{
	            url: $.session.get('obtCompany')+"/QueryService.svc/QueryCarRulePost",
	            jsonStr:'{"rph":"'+selectCarInfo.Rph+'","id":'+netUserId+',"language":"'+obtLanguage+'"}',
	        },
	        success : function(data) {
	            $('body').mLoading("hide");
	            var res = JSON.parse(data);
	            console.log(res);
				//费用说明
				if(res.FeeDescriptionList.length>0 || res.RuleList.length>0){
					$('.feeDetails').removeClass('hide')
				}
				$('.tabLi').click(function(){
					$('.tabLi').removeClass('tabActive')
					$(this).addClass("tabActive")
					
					$('.tabcontent').addClass("hide")
					$('.'+$(this).attr('model')).removeClass('hide')
				})
				if(res.FeeDescriptionList.length>0){
					$('.tabLi').eq(0).removeClass('hide')
					$('.tabLi').eq(0).addClass('tabActive')
					$('.feeDescription').removeClass('hide')
					var FeeDescriptionStr=""
					
					res.FeeDescriptionList.map(function(item){
						$('.feeDescription').append('<p>'+item+'</p>')
					})
					$('.feeDescription').append('<div>'+FeeDescriptionStr+'</div>')
				}else{
					$('.tabLi').eq(0).hide()
					$('.feeDescription').hide()
				}
				if(res.RuleList.length>0){
					$('.tabLi').eq(1).removeClass('hide')
					if(res.FeeDescriptionList.length<1){
						$('.tabLi').eq(1).addClass('tabActive')
						$('.rule').removeClass('hide')
					}
					var RuleStr=""
					res.RuleList.map(function(item){
						// $('.rule').append('<p>'+item+'</p>')
						RuleStr+= item+' ';
					})
					$('.rule').append('<div>'+RuleStr+'</div>')
					$('.rule').removeClass('hide')
				}else{
					$('.tabLi').eq(1).hide()
					$('.rule').hide()
				}
				//到店付
				var storeMoney='';
				var aboutMoney='';
				res.DayHourList.map(function(item){
					if(item.HourCurrencyCode!='CNY'){
						storeMoney=item.TotalRate+item.HourCurrencyCode;
					}else{
						aboutMoney=item.TotalRate+item.HourCurrencyCode;
					}
				})
				$(".totalFareBody").html('\
				    <span style="font-size:14px;color:#666;margin-right:10px;">'+get_lan("carBody").stroeMoney+':</span><span style="">'+storeMoney+'</span>\
					<div style="height: 20px;line-height: 20px;text-align: right;"><span style="font-size:14px;color:#666666;line-height:20px">'+get_lan("carBody").about+' '+aboutMoney+'</span></div>\
				')
			}
	})
}


//打开remark弹窗
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