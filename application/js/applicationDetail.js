var netUserId = $.session.get('netLoginId');
var obtLanguage = $.session.get('obtLanguage');
if(tools.queryString().orderNo){
    var orderNo = tools.queryString().orderNo;
}else{
    var applicationDetailInfo = JSON.parse($.session.get('applicationDetailInfo'));
    console.log(applicationDetailInfo);
    var orderNo = applicationDetailInfo.orderNo;
}
// console.log(orderNo);
//中英文对象
var cn = {
	"remarkPop":{
	    "businessTripTittle":"出差信息：",
	    "remarkInfoTittle":"备注信息：",
	    "tripNameTittle":"员工姓名",
	    "tripCompanyTittle":"公司",
	    "confirm":"确认",
	    "cancel":"取消",
	},
	'orderInfo':{
		'OrderNo':"订单号：",
		'BookTime':"预订时间：",
		'State':"审核状态：",
		'OrderFare':"总金额：",
        'OrderCustomer':'旅客姓名：',
        'reason':"申请理由",
        'distance':"距离提交时间",
	},
	'orderCustomerInfo':{
		'orderCustomerTittle':'旅客信息：',
		"popNameCn":"中文姓名:",
		"popNameEn":"英文姓名:",
		"popPhone":"手机号码:",
		"PsgType":"旅客类别:",
		"popDocuments":"证件信息:",
		"remarks":"修改备注",
	},
	'orderDetailsTabBar':{
		'airTicket':'机票',
		'hotel':'酒店',
		'train':'火车',
	},
	'orderDetails':{
		'orderState':"订单状态：",
		'price':"金额：",
        'lowestprice':'最低价：',
        'savePrice':'可节省：',
		'cabin':'舱位： ',
		'craft':'机型：',
		'seat':'座位类型：',
		'orderCancel':'取消订单',
		'orderModify':'修改',
		'orderExtend':'延住',
		'onlineCheckIn':'在线值机',
		'refund':'退票',
		'endorse':'改签',
		'address':"地址：",
		'RoomName':"房型：",
		'BedName':"床型：",
		'Breakfast':"早餐：",
		'Rooms':"房间数：",
		'Nights':"入住天数：",
		'cancelRemind':"确定取消吗？",
		'alterMessage':'确定改签吗？',
		'alterRemind':'请联系线下改签',
        'airDom':'国内机票',
        'airIntl':'国际机票',
        'hotel':'酒店',
        'train':'火车',
        'DenyReason':'未选择最低价原因:',
        'lowestAir':'最低价航班:',
        'lowestAirTime':'起飞时间:',
        'HotelName':"酒店姓名:",
		'SeatNo': '座位号:',
		'CoachNo': '车厢:',
		'trainTicketNo': '取票号:',
	},
    'approveCommentsTittle':"审核理由:",
    'approveCommentsRemind':"请填写拒绝理由。",
    'agree':'同意',
    'deny':"拒绝",
}
var en = {
	"remarkPop":{
	    "businessTripTittle":"Travel Information：",
	    "remarkInfoTittle":"Remarks：",
	    "tripNameTittle":"Employee Name",
	    "tripCompanyTittle":"Company",
	    "confirm":"Confirm",
	    "cancel":"Cancel",
	},
	'orderInfo':{
		'OrderNo':"Order No：",
		'BookTime':"Submit Time：",
		'State':"State：",
		'OrderFare':"Total Fare：",
        'OrderCustomer':'Traveler:',
        'reason':"Application Reason",
        'distance':"Time From Application",
	},
	'orderCustomerInfo':{
		'orderCustomerTittle':'Passenger Information：',
		"popNameCn":"Chinese Name:",
		"popNameEn":"English Name:",
		"popPhone":"Phone:",
		"PsgType":"Passenger Category:",
		"popDocuments":"Document:",
		"remarks":"Remarks",
	},
	'orderDetailsTabBar':{
		'airTicket':'Air Ticket',
		'hotel':'Hotel',
		'train':'Train',
	},
	'orderDetails':{
		'orderState':"State:",
		'price':"Price:",
        'lowestprice':'Lowest Logical Fare:',
        // 'savePrice':'Miss Saving:',
        'savePrice':'Lost Saving:',
		'cabin':'Cabin: ',
		'craft':'Aircraft:',
		'seat':'Seat:',
		'orderCancel':'Cancel',
		'orderModify':'Modify',
		'orderExtend':'Extend',
		'onlineCheckIn':'Online Check-in',
		'refund':'Refund',
		'endorse':'Endorse',
		'address':"Address:",
		'RoomName':"Room Type:",
		'BedName':"Bed Type:",
		'Breakfast':"Breakfast:",
		'Rooms':"Rooms:",
		'Nights':"Nights:",
		'cancelRemind':"Are you sure you want to cancel?",
		'alterMessage':'Do you want to alter this ticket?',
		'alterRemind':'Please contact offline to alter tickets',
        'airDom':'Air Dom',
        'airIntl':'Air Intl',
        'hotel':'Hotel',
        'train':'Train',
        'DenyReason':'Reason Code Deny:',
        'lowestAir':'Lowest Fare Flight:',
        'lowestAirTime':'Departure Time:',
        'HotelName':"Hotel Name:",
		'SeatNo': 'Seat No:',
		'CoachNo': ' Coach No:' ,
		'TicketNo': 'E Ticket No:', 
	},
    'approveCommentsTittle':"Approve Comments:",
    'approveCommentsRemind':"Please fill your comments for rejecting the approval.",
    'agree':'Approve',
    'deny':"Reject",
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

// 按键监听事件
	function check(e,dom) {
			//获取键盘输入的keyCode 
			var keycode = (Number)(e.keyCode);
			// 中文输入法下keyCode为229
			// var CnList=['Enter','ArrowDown','ArrowLeft','ArrowRight','Delete','Insert','Space','Backspace','KeyA','KeyB','KeyC','KeyD','KeyE','KeyF','KeyG','KeyH','KeyI','KeyJ','KeyK','KeyL','KeyM','KeyN','KeyO','KeyP','KeyQ','KeyR','KeyS','KeyT','KeyU','KeyV','KeyW','KeyX','KeyY','KeyZ']
			var CnList =['Enter']
			if (e.keyCode == 229) {
				if(CnList.indexOf(e.code)>-1){
					e.returnValue = false;
				}else{
					// var str=$(dom).val()
					// $(dom).val(str.substring(0,str.length-1))
					// setTimeout(function() {
					// 	$(dom).val(str.replace(/[^\u4e00-\u9fa5a-zA-Z]/g,''))
					// }, 10);
				}
			}else if (keycode == 13) {
				//键盘上方数字键        
				//小数字键盘         
				e.returnValue = false;
			}else{
				e.returnValue = true;
			}
		}
$(function(){
   showContent();//内容展示
   orderDetails();//
});

function showContent(){
    if(applicationDetailInfo.Email==true){
        $(".menu").remove();
    }
	$(".remarkPop").html('\
	    <div class="businessTripTittle">'+get_lan('remarkPop').businessTripTittle+'</div>\
	    <div class="businessTripBody"></div>\
	    <div class="remarkInfoTittle">'+get_lan('remarkPop').remarkInfoTittle+'</div>\
	    <div style="padding-bottom:10px;border-bottom:1px solid #f3f3f3;">\
          <div class="remarkInfoBody autoScrollY"></div>\
        </div>\
	    <div class="remarkFooter flexRow"></div>\
	    ')
	$("#main").html('\
	    <div class="autoCenter">\
	        <div style="height:10px;"></div>\
	        <div class="orderInfo"></div>\
	        <div class="orderCustomerInfo">\
	          <div class="orderCustomerTittle">'+get_lan('orderCustomerInfo').orderCustomerTittle+'</div>\
	          <div class="passengerBar flexRow">\
		          <div class="passengerBarLi" style="width:180px;">'+get_lan('orderCustomerInfo').popNameCn+'</div>\
		          <div class="passengerBarLi" style="width:150px;">'+get_lan('orderCustomerInfo').popNameEn+'</div>\
		          <div class="passengerBarLi" style="width:150px;">'+get_lan('orderCustomerInfo').popPhone+'</div>\
		          <div class="passengerBarLi" style="width:300px;">'+get_lan('orderCustomerInfo').popDocuments+'</div>\
		          <div class="passengerBarLi" style="width:170px;">'+get_lan('orderCustomerInfo').PsgType+'</div>\
	          </div>\
	          <div class="passengerList">\
	          </div>\
	        </div>\
	        <div class="orderDetailsBody">\
	          <div class="orderList segmentList"></div>\
	          <div class="orderList hotelList"></div>\
	          <div class="orderList trainList"></div>\
	        </div>\
            <div class="approveReasonBody flexRow">\
              <div class="approveCommentsTittle">'+get_lan('approveCommentsTittle')+'</div>\
              <textarea class="approveComments" maxlength="100" onkeydown="check(event,this)"></textarea>\
            </div>\
            <div class="approveBtnBody flexRow">\
              <div class="approveBtn" style="background-color:#8DB15C">'+get_lan("agree")+'</div>\
              <div class="denyBtn" style="background-color:#D12238">'+get_lan("deny")+'</div>\
            </div>\
	    </div>\
	')
	
	
    $(".orderCustomerInfo").hide();
    $(".approveBtn").unbind("click").click(function(){
		var refuseTxt=$(".approveComments").val()

		// if($(".approveComments").val()==""){
		    // alert(get_lan("approveCommentsRemind"))
		    // return false;
		// }
		// 2.6,回车换成空格
		refuseTxt=refuseTxt.replace(/\n/g," ") 
        $('body').mLoading("show");
        $.ajax( 
          { 
            type:'post', 
            url : $.session.get('ajaxUrl'), 
            dataType : 'json',
            data:{
                // url: $.session.get('obtCompany')+"/OrderService.svc/ApproveAgreePost",
                url: $.session.get('obtCompany')+"/OrderService.svc/ApproveAgreeWithReason",
                jsonStr:'{"id":'+netUserId+',"Language":"'+$.session.get('obtLanguage')+'","applicationNo":"'+$(this).attr("ApplicationNo")+'","context":"'+refuseTxt+'"}'
            },
            success : function(data) {
                $('body').mLoading("hide");
                var res = JSON.parse(data)
                console.log(res);
                window.location.href = '../../application/queryApplication.html';
            },
            error : function() {
              // alert('fail');
            }
          }
        );
    })
    $(".denyBtn").unbind("click").click(function(){
		var refuseTxt=$(".approveComments").val()
        if($(".approveComments").val()==""){
            alert(get_lan("approveCommentsRemind"))
            return false;
        }
        $('body').mLoading("show");
		// 2.6,回车换成空格
		refuseTxt=refuseTxt.replace(/\n/g," ") 
        $.ajax(
          {
            type:'post', 
            url : $.session.get('ajaxUrl'),
            dataType : 'json',
            data:{
                url: $.session.get('obtCompany')+"/OrderService.svc/ApproveDenyWithReason",
                // jsonStr:'{"id":'+netUserId+',"Language":"'+$.session.get('obtLanguage')+'","applicationNo":"'+$(this).attr("ApplicationNo")+'","context":"'+$(".approveComments").val()+'"}'
                jsonStr:'{"id":'+netUserId+',"Language":"'+$.session.get('obtLanguage')+'","applicationNo":"'+$(this).attr("ApplicationNo")+'","context":"'+refuseTxt+'"}'
            },
            success : function(data) {
                $('body').mLoading("hide");
                var res = JSON.parse(data)
                console.log(res);
                window.location.href = '../../application/queryApplication.html';
            },
            error : function() {
              // alert('fail');
            }
          }
        );
    })
}
function orderDetails(){
	$('body').mLoading("show");
	$.ajax( 
	  {
	    type:'post',
	    url : $.session.get('ajaxUrl'),
	    dataType : 'json',
	    data:{
	        url: $.session.get('obtCompany')+"/OrderService.svc/ApproveDetailPost",
	        jsonStr:'{"orderNo":"'+orderNo+'","id":'+netUserId+',"Language":"'+obtLanguage+'"}'
	    },
	    success : function(data) {
			$('body').mLoading("hide")
            var res = JSON.parse(data)
            console.log(res);
            if(applicationDetailInfo&&applicationDetailInfo.IsHistory == "true"){
                $(".approveBtnBody").remove();
                $(".approveReasonBody").remove();
            }
            $(".approveBtn").attr("ApplicationNo",res.ApplicationNo);
            $(".denyBtn").attr("ApplicationNo",res.ApplicationNo);
            var leftTime = new Date().getTime() - new Date(res.BookTime.replace(/-/g,'\/')).getTime();
            // console.log(leftTime);
            var leftSecond = parseInt(leftTime / 1000);
            var Day = Math.floor(leftSecond / (60 * 60 * 24));
            var Hour = Math.floor((leftSecond - Day * 24 * 60 * 60) / 3600);
            var Minute = Math.floor((leftSecond - Day * 24 * 60 * 60 - Hour * 3600) / 60);
            var Second = Math.floor(leftSecond - Day * 24 * 60 * 60 - Hour * 3600 - Minute * 60);
            if(obtLanguage == "CN"){
                var distanceTime = Day+'天 '+Hour+'小时'
            }else{
                var distanceTime = Day+'D '+Hour+'H'
            }
            var Passenger = '<div class="flexRow">';
            res.OrderCustomerDetailList.map(function(item){
                var remark = '';
                item.Remarks.map(function(rItem){
                    remark += rItem.Title+' : '+rItem.Content;
                    remark += '\n';
                })
                // console.log(remark);
                var name = obtLanguage=="CN"?item.NameCn:item.NameEn;
                Passenger+='<span>'+name+'</span><img title="'+remark+'" src="../../application/images/remark.png" style="width:18px;height:18px;display: block;margin-top: 3px;cursor:pointer;">'
                Passenger+=' &nbsp; '
            })
            Passenger +="</div>"
            // console.log(Passenger);
			// 未修改前
            // $(".orderInfo").html('\
            //     <div class="orderInfoTittle">'+get_lan('orderInfo').OrderNo+' '+res.OrderNo+'</div>\
            // 	<div class="orderInfoLeft">\
            // 	<div class="orderDetailInfo">\
            // 	  <div class="orderDetailInfoNo flexRow" style="font-weight:bold;">'+get_lan('orderInfo').OrderCustomer+' '+Passenger+'</div>\
            // 	  <div class="orderDetailInfoDate">'+get_lan('orderInfo').BookTime+' '+res.BookTime.substring(0,10)+'</div>\
            // 	  <div class="orderDetailInfoState">'+get_lan('orderInfo').State+' <span style="font-size:20px;color:#F58A00">'+res.State+'</span></div>\
            //       <div class="orderDetailInfoReason flexRow"><span style="color:#F58A00;min-width:70px">'+get_lan('orderInfo').reason+'：</span> <span style="margin:0;">'+res.ApplyReason+'</span></span></div>\
            //       <div class="orderDetailInfoDistance">'+get_lan('orderInfo').distance+'： '+distanceTime+'</span></div>\
            // 	  <div class="orderDetailInfoPrice">'+get_lan('orderInfo').OrderFare+' <span style="font-size:22px;color:#F58A00">￥'+res.Price+'</span></div>\
            // 	</div>\
            // 	<div class="orderApproveInfo"></div>\
            // 	</div>\
            // ')
			
			// 
			$(".orderInfo").html('\
			    <div class="orderInfoTittle">'+get_lan('orderInfo').OrderNo+' '+res.OrderNo+'</div>\
				<div class="orderInfoLeft">\
				<div class="orderDetailInfo">\
					<div class="lineInfo lineInfoBetween">\
						<div class="orderDetailInfoNo flexRow" style="font-weight:bold;">'+get_lan('orderInfo').OrderCustomer+' '+Passenger+'</div>\
						<div class="orderDetailInfoPrice">'+get_lan('orderInfo').OrderFare+' <span style="font-size:22px;color:#F58A00">￥'+res.Price+'</span></div>\
					</div>\
					<div class="lineInfo mt20">\
						<div class="orderDetailInfoDate">'+get_lan('orderInfo').BookTime+' '+res.BookTime.substring(0,10)+'</div>\
						<div class="orderDetailInfoReason flexRow"><span style="color:#F58A00;min-width:70px">'+get_lan('orderInfo').reason+'：</span> <span style="margin:0;word-break: break-all;">'+res.ApplyReason+'</span></span></div>\
					</div>\
					<div class="lineInfo mt20">\
						<div class="orderDetailInfoState">'+get_lan('orderInfo').State+' <span style="font-size:20px;color:#F58A00">'+res.State+'</span></div>\
						<div class="orderDetailInfoDistance">'+get_lan('orderInfo').distance+'： '+distanceTime+'</span></div>\
					</div>\
				</div>\
				<div class="orderApproveInfo"></div>\
				</div>\
			')
			// 修改申请理由样式
			// <div class="orderDetailInfoReason flexRow"><span style="color:#F58A00;min-width:70px">'+get_lan('orderInfo').reason+'：</span> <xmp style="margin:0;">'+res.ApplyReason+'</xmp></span></div>\
            /*订单详情*/
            if(res.Segment.length != 0){
                segmentList(res);
            }else{
                $(".segmentList").addClass("hide");
            }
			/*订单详情*/
			if(res.Hotel.length != 0){
			    hotelList(res);
			}else{
			    $(".hotelList").addClass("hide");
			}
			if(res.Train.length != 0){
			    trainList(res);
			}else{
			    $(".trainList").addClass("hide");
			}
			// 2020.1.16 注释掉,不知道为什么会跑一个新接口
			// $('body').mLoading("show");
            // $.ajax(
            //   {
            //     type:'post',
            //     url : $.session.get('ajaxUrl'),
            //     dataType : 'json',
            //     data:{
            //         url: $.session.get('obtCompany')+"/OrderService.svc/ListDetailPost",
            //         jsonStr:'{"orderNo":"'+orderNo+'","id":'+netUserId+',"Language":"'+obtLanguage+'"}'
            //     },
            //     success : function(data) {
            //         $('body').mLoading("hide");
            //         var res = JSON.parse(data)
            //         console.log(res);
            //         /*订单详情*/
            //         // if(res.Hotel.length != 0){
            //         //     hotelList(res);
            //         // }else{
            //         //     $(".hotelList").addClass("hide");
            //         // }
            //         // if(res.Train.length != 0){
            //         //     trainList(res);
            //         // }else{
            //         //     $(".trainList").addClass("hide");
            //         // }
            //     },
            //     error : function() { 
            //       // alert('fail');
            //     }
            //   }
            // );
	    },
	    error : function() { 
	      // alert('fail');
	    }
	  }
	);
}
//机票
function segmentList(res){
    var orderInfo = res;
    var segDetailList = [];
	res.Segment.map(function(sitem,index){
		$(".segmentList").append('\
			<div class="segmentLi">\
			  <div class="segmentLiTittle flexRow">\
			    <div style="margin-left:27px;color: #1e66ae;">'+sitem[0].DepartureTime.substring(0,10)+'</div>\
                <div style="margin-left:50px;">'+sitem[0].OrgAirport+' - '+sitem[0].DesAirport+'</div>\
                <div style="margin-left:50px;">'+get_lan('orderDetails').orderState+'<span style="color:#F58A00">'+sitem[0].OrderStatus+'</span></div>\
			  </div>\
			  <div class="segmentLiBody flexRow">\
                 <div style="width:100px;">\
                   <div class="labelIconBody" style="width:60px;height:50px;margin:20px 0 0 40px;">\
                   </div>\
                 </div>\
			     <div class="segmentDetailsList"></div>\
			     <div class="segmentPriceList"></div>\
			  </div>\
			</div>\
	    ')
		sitem.map(function(item,pIndex){
            segDetailList.push(item);
            var showDenyReason = item.DenyReason==''||item.DenyReason==null?'hide':'';
			//11月15日修改
            // var savePrice = parseFloat(parseFloat(sitem[0].NominalFare.substring(0,sitem[0].AirFareAmount.length-3)))-parseFloat(parseFloat(sitem[0].LowFare.substring(0,sitem[0].LowFare.length-3)))+'CNY'
            var savePrice = parseFloat(parseFloat(sitem[0].AirFareAmount.substring(0,sitem[0].AirFareAmount.length-3)))-parseFloat(parseFloat(sitem[0].LowFare.substring(0,sitem[0].LowFare.length-3)))+'CNY'
            if(savePrice=='0CNY'){
                var showPrice = 'hide';
            }
			$(".segmentDetailsList").eq(index).append('\
                <div class="segmentDetailsLi">\
                  <div class="segmentAirLine">'+item.AirportName+'</div>\
                  <div class="segmentDepartTime">'+item.DepartureTime.substring(11,16)+'</div>\
                  <div class="segmentArrow"></div>\
                  <div class="segmentArriveTime">'+item.ArrivalTime.substring(11,16)+'</div>\
                  <div class="segmentDepartAirport">'+item.OrgAirport+'</div>\
                  <div class="segmentArriveAirport">'+item.DesAirport+'</div>\
                  <div class="segmentFlightNo">'+item.FlightNo+'</div>\
                  <div class="segmentDurnturn flexRow"><img src="../orders/images/clock.png" style="display:block;margin-right:5px;">'+item.UseTime+'</div>\
                  <div class="segmentCabin">'+get_lan('orderDetails').cabin+item.Cabin+'</div>\
                  <div class="segmentCraft">'+get_lan('orderDetails').craft+item.AirCraft+'</div>\
                  <div class="segmentMeal">'+item.Meal+'</div>\
                  <div style="height:123px;"></div>\
                  <div class="DenyReason '+showDenyReason+'">\
                     '+get_lan('orderDetails').lowestprice+'<span style="color:#D12238">'+sitem[0].LowFare+'</span>&nbsp;&nbsp;\
                     <span class="'+showPrice+'">'+get_lan('orderDetails').savePrice+'<span style="color:#D12238">'+savePrice+'</span>&nbsp;&nbsp</span>\
                     <br/>'+get_lan('orderDetails').DenyReason+' '+item.DenyReason+'\
                     <span class="lowestFlightNo" style="margin-left:20px;color:#1e66ae"></span>\
                  </div>\
                </div>\
            ')
            // console.log(item);
            // console.log(item.IsDomestic);
            if(item.IsDomestic){
                $(".labelIconBody").eq(index).html('\
                    <div class="labelIcon" style="background-color:#f6aa25;">'+get_lan('orderDetails').airDom+'</div>\
                    <div class="triangleTopLeft"></div>\
                    ')
            }else{
                $(".labelIconBody").eq(index).html('\
                    <div class="labelIcon" style="background-color:#f58a00;">'+get_lan('orderDetails').airIntl+'</div>\
                    <div class="triangleTopLeft"></div>\
                    ')
            }
			$(".segmentPriceList").eq(index).html('\
                <div class="FareAmount">'+get_lan('orderDetails').price+'<span style="color:#F58A00">'+sitem[0].AirFareAmount+'</span></div>\
                \
				')
            // <div class="FareAmount '+showDenyReason+'">'+get_lan('orderDetails').lowestprice+'<span style="color:#F58A00">'+sitem[0].LowFare+'</span></div>\
            // <div class="FareAmount '+showDenyReason+'">'+get_lan('orderDetails').savePrice+'<span style="color:#F58A00">'+savePrice+'</span></div>
		})
        segDetailList.map(function(sdItem,sdIndex){
            res.LowestAirlineList.map(function(lItem){
                if(lItem.AirInfoID == sdItem.ID){
                    $(".lowestFlightNo").eq(sdIndex).html(get_lan('orderDetails').lowestAir+lItem.FlightNo+'<span style="margin-left:30px;">'+get_lan('orderDetails').lowestAirTime+lItem.timeStr.substring(11,16))+'</span>';
                }
            })
        })
	})
}
//酒店
function hotelList(res){
	res.Hotel.map(function(hitem,index){
		if(hitem.CancelPolicy==null){
		  hitem.CancelPolicy = ""
		}
		var showBtn1 = hitem.HotelCanCancel?"show":"hide";
		var showBtn2 = hitem.HotelCanModify?"show":"hide";
		var showBtn3 = hitem.CanPay?"show":"hide";
		var htelText = hitem.IsShowDelay?get_lan('orderDetails').orderExtend:get_lan('orderDetails').orderModify;
		$(".hotelList").append('\
			<div class="hotelLi">\
			  <div class="hotelLiTittle flexRow">\
			    <div style="margin-left:27px;"><span style="color:#1e66ae;font-size:16px;">'+hitem.CheckIn+' - '+hitem.CheckOut+'</span></div>\
                <div style="margin-left:50px;">'+hitem.CityName+'</div>\
			    <div style="margin-left:50px;">'+get_lan('orderDetails').orderState+'<span style="color:#F58A00">'+hitem.HotelState+'</span></div>\
			    <div style="margin-left:50px;">'+get_lan('orderDetails').price+'<span style="color:#F58A00">'+hitem.HotelFareAmount+'</span></div>\
			  </div>\
			  <div class="hotelLiBody flexRow">\
                 <div style="width:100px;">\
                 <div class="labelIconBodyHotel" style="width:60px;height:50px;margin:20px 0 0 40px;">\
                 </div>\
                 </div>\
			     <div class="hotelDetailsList"></div>\
			     <div class="hotelBtnList"></div>\
			  </div>\
			</div>\
	    ')
	    $(".hotelDetailsList").eq(index).append('\
	    	<div class="hotelDetailsLi">\
              <div class="hotelName flexRow"><div style="width:110px">'+get_lan('orderDetails').HotelName+'</div><span>'+hitem.HotelName+'</span></div>\
	    	  <div class="hotelAddress flexRow"><div style="width:110px">'+get_lan('orderDetails').address+'</div><span style="color:#1e66ae">'+hitem.HotelAddress+'</span></div>\
	    	  <div class="hotelRoomName flexRow"><div style="width:110px">'+get_lan('orderDetails').RoomName+'</div>'+hitem.RoomName+'</div>\
	    	  <div class="hotelBedName flexRow"><div style="width:110px">'+get_lan('orderDetails').BedName+'</div>'+hitem.BedName+'</div>\
	    	  <div class="hotelBreakfast flexRow"><div style="width:110px">'+get_lan('orderDetails').Breakfast+'</div>'+hitem.Breakfast+'</div>\
	    	  <div class="hotelRooms">'+get_lan('orderDetails').Rooms+hitem.Rooms+'</div>\
	    	  <div class="hotelNights flexRow"><img class="searchInputImg" src="../orders/images/nights.png" style="display:block">'+get_lan('orderDetails').Nights+hitem.Nights+'</div>\
	    	</div>\
	    ')
        $(".labelIconBodyHotel").eq(index).html('\
            <div class="labelIcon" style="background-color:#8DC73F;">'+get_lan('orderDetails').hotel+'</div>\
            <div class="triangleTopLeft" style="border-top: 6px solid #446A10;"></div>\
            ')
	    $(".hotelBtnList").eq(index).html('\
            <div class="FareAmount">'+get_lan('orderDetails').price+'<span style="color:#F58A00">'+hitem.HotelFareAmount+'</span></div>\
	    ')     
        //<div class="hotelWifi flexRow"><img class="searchInputImg" src="../orders/images/wifi.png" style="display:block">Wifi</div>
	})
}

function trainList(res){
    var orderInfo = res;
	res.Train.map(function(titem,index){
		var showBtn1 = titem.TrainCanReIssue?"show":"hide";
		var showBtn2 = titem.TrainCanReFund?"show":"hide";
		var showBtn3 = titem.TrainCanCancel?"show":"hide";
		$(".trainList").append('\
			<div class="trainLi">\
			  <div class="trainLiTittle flexRow">\
			    <div style="margin-left:27px;color: #1e66ae;">'+titem.TrainDate+'</div>\
			    <div style="margin-left:50px;">'+titem.TrainDeparte+' - '+titem.TrainArrive+'</div>\
			    <div style="margin-left:50px;">'+titem.nameP+'</div>\
			    <div style="margin-left:50px;">'+get_lan('orderDetails').orderState+'<span style="color:#F58A00">'+titem.State+'</span></div>\
			    <div style="margin-left:50px;">'+get_lan('orderDetails').price+'<span style="color:#F58A00">'+titem.TrainFareAmount+'</span></div>\
			  </div>\
			  <div class="trainLiBody flexRow">\
                 <div style="width:100px;">\
                 <div class="labelIconBodyTrain" style="width:60px;height:50px;margin:20px 0 0 40px;">\
                 </div>\
                 </div>\
			     <div class="trainDetailsList"></div>\
			     <div class="trainBtnList"></div>\
			  </div>\
			</div>\
	    ')
		var SeatNoStr=titem.SeatNo?'&nbsp;&nbsp;&nbsp;' + get_lan('orderDetails').SeatNo+titem.SeatNo:"";
		var CoachNoStr=titem.CoachNo?'&nbsp;&nbsp;&nbsp;' + get_lan('orderDetails').CoachNo+titem.CoachNo:"";
		var TicketNoStr=titem.TrainTicketNo?'&nbsp;&nbsp;&nbsp;' + get_lan('orderDetails').trainTicketNo+titem.TrainTicketNo:"";
	    $(".trainDetailsList").eq(index).append('\
	    	<div class="trainDetailsLi">\
	    	  <div class="trainType">'+titem.TrainType+'</div>\
	    	  <div class="trainDepartTime">'+titem.TrainDeparteTime+'</div>\
	    	  <div class="trainArrow"></div>\
	    	  <div class="trainArriveTime">'+titem.TrainArriveTime+'</div>\
	    	  <div class="trainDepart">'+titem.TrainDeparte+'</div>\
	    	  <div class="trainArrive">'+titem.TrainArrive+'</div>\
	    	  <div class="trainCode">'+titem.TrainCode+'</div>\
	    	  <div class="trainDurnturn flexRow"><img src="../orders/images/clock.png" style="display:block;margin-right:5px;">'+titem.Durnturn+'</div>\
	    	  <div class="trainSeat">'+get_lan('orderDetails').seat+titem.TrainSeat+
			  TicketNoStr+
			  CoachNoStr+
			  SeatNoStr+
			  '</div>\
	    	</div>\
	    ')
        $(".labelIconBodyTrain").eq(index).html('\
            <div class="labelIcon" style="background-color:#5A88C6;">'+get_lan('orderDetails').train+'</div>\
            <div class="triangleTopLeft" style="border-top: 6px solid #193A8B;"></div>\
            ')
	    $(".trainBtnList").eq(index).html('\
            <div class="FareAmount">'+get_lan('orderDetails').price+'<span style="color:#F58A00">'+titem.TrainFareAmount+'</span></div>\
	    	')
	})
}
//酒店-旧
function hotelListOld(res){
	res.Hotel.map(function(hitem,index){
		if(hitem.CancelPolicy==null){
		  hitem.CancelPolicy = ""
		}
		var showBtn1 = hitem.HotelCanCancel?"show":"hide";
		var showBtn2 = hitem.HotelCanModify?"show":"hide";
		var showBtn3 = hitem.CanPay?"show":"hide";
		var htelText = hitem.IsShowDelay?get_lan('orderDetails').orderExtend:get_lan('orderDetails').orderModify;
		$(".hotelList").append('\
			<div class="hotelLi">\
			  <div class="hotelLiTittle flexRow">\
			    <div style="margin-left:27px;"><span style="color:#1e66ae;font-size:16px;">'+hitem.CheckIn+' - '+hitem.CheckOut+'</span></div>\
                <div style="margin-left:50px;">'+hitem.CityName+'</div>\
			    <div style="margin-left:50px;">'+get_lan('orderDetails').orderState+'<span style="color:#F58A00">'+hitem.HotelState+'</span></div>\
			    <div style="margin-left:50px;">'+get_lan('orderDetails').price+'<span style="color:#F58A00">'+hitem.HotelFareAmount+'</span></div>\
			  </div>\
			  <div class="hotelLiBody flexRow">\
                 <div style="width:100px;">\
                 <div class="labelIconBodyHotel" style="width:60px;height:50px;margin:20px 0 0 40px;">\
                 </div>\
                 </div>\
			     <div class="hotelDetailsList"></div>\
			     <div class="hotelBtnList"></div>\
			  </div>\
			</div>\
	    ')
	    $(".hotelDetailsList").eq(index).append('\
	    	<div class="hotelDetailsLi">\
              <div class="hotelName flexRow"><div style="width:110px">'+get_lan('orderDetails').HotelName+'</div><span>'+hitem.HotelName+'</span></div>\
	    	  <div class="hotelAddress flexRow"><div style="width:110px">'+get_lan('orderDetails').address+'</div><span style="color:#1e66ae">'+hitem.HotelAddress+'</span></div>\
	    	  <div class="hotelRoomName flexRow"><div style="width:110px">'+get_lan('orderDetails').RoomName+'</div>'+hitem.RoomName+'</div>\
	    	  <div class="hotelBedName flexRow"><div style="width:110px">'+get_lan('orderDetails').BedName+'</div>'+hitem.BedName+'</div>\
	    	  <div class="hotelBreakfast flexRow"><div style="width:110px">'+get_lan('orderDetails').Breakfast+'</div>'+hitem.Breakfast+'</div>\
	    	  <div class="hotelRooms">'+get_lan('orderDetails').Rooms+hitem.Rooms+'</div>\
	    	  <div class="hotelNights flexRow"><img class="searchInputImg" src="../orders/images/nights.png" style="display:block">'+get_lan('orderDetails').Nights+hitem.Nights+'</div>\
	    	</div>\
	    ')
        $(".labelIconBodyHotel").eq(index).html('\
            <div class="labelIcon" style="background-color:#8DC73F;">'+get_lan('orderDetails').hotel+'</div>\
            <div class="triangleTopLeft" style="border-top: 6px solid #446A10;"></div>\
            ')
	    $(".hotelBtnList").eq(index).html('\
            <div class="FareAmount">'+get_lan('orderDetails').price+'<span style="color:#F58A00">'+hitem.HotelFareAmount+'</span></div>\
	    ')     
        //<div class="hotelWifi flexRow"><img class="searchInputImg" src="../orders/images/wifi.png" style="display:block">Wifi</div>
	})
}
//火车 -旧
function trainListOld(res){
    var orderInfo = res;
	res.Train.map(function(titem,index){
		var showBtn1 = titem.TrainCanReIssue?"show":"hide";
		var showBtn2 = titem.TrainCanReFund?"show":"hide";
		var showBtn3 = titem.TrainCanCancel?"show":"hide";
		$(".trainList").append('\
			<div class="trainLi">\
			  <div class="trainLiTittle flexRow">\
			    <div style="margin-left:27px;color: #1e66ae;">'+titem.TrainDate+'</div>\
			    <div style="margin-left:50px;">'+titem.TrainDeparte+' - '+titem.TrainArrive+'</div>\
			    <div style="margin-left:50px;">'+titem.nameP+'</div>\
			    <div style="margin-left:50px;">'+get_lan('orderDetails').orderState+'<span style="color:#F58A00">'+titem.State+'</span></div>\
			    <div style="margin-left:50px;">'+get_lan('orderDetails').price+'<span style="color:#F58A00">'+titem.TrainFareAmount+'</span></div>\
			  </div>\
			  <div class="trainLiBody flexRow">\
                 <div style="width:100px;">\
                 <div class="labelIconBodyTrain" style="width:60px;height:50px;margin:20px 0 0 40px;">\
                 </div>\
                 </div>\
			     <div class="trainDetailsList"></div>\
			     <div class="trainBtnList"></div>\
			  </div>\
			</div>\
	    ')
	    $(".trainDetailsList").eq(index).append('\
	    	<div class="trainDetailsLi">\
	    	  <div class="trainType">'+titem.TrainType+'</div>\
	    	  <div class="trainDepartTime">'+titem.TrainDeparteTime+'</div>\
	    	  <div class="trainArrow"></div>\
	    	  <div class="trainArriveTime">'+titem.TrainArriveTime+'</div>\
	    	  <div class="trainDepart">'+titem.TrainDeparte+'</div>\
	    	  <div class="trainArrive">'+titem.TrainArrive+'</div>\
	    	  <div class="trainCode">'+titem.TrainCode+'</div>\
	    	  <div class="trainDurnturn flexRow"><img src="../orders/images/clock.png" style="display:block;margin-right:5px;">'+titem.Durnturn+'</div>\
	    	  <div class="trainSeat">'+get_lan('orderDetails').seat+titem.TrainSeat+'</div>\
	    	</div>\
	    ')
        $(".labelIconBodyTrain").eq(index).html('\
            <div class="labelIcon" style="background-color:#5A88C6;">'+get_lan('orderDetails').train+'</div>\
            <div class="triangleTopLeft" style="border-top: 6px solid #193A8B;"></div>\
            ')
	    $(".trainBtnList").eq(index).html('\
            <div class="FareAmount">'+get_lan('orderDetails').price+'<span style="color:#F58A00">'+titem.TrainFareAmount+'</span></div>\
	    	')
	})
}
function openRemarkPop(){
    $("#cover").show();
    $(".remarkPop").css("display","block");
}
function closeRemarkPop(){
    $("#cover").hide();
    $(".remarkPop").css("display","none");
}