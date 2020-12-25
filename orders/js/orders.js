var netUserId = $.session.get('netLoginId');
var obtLanguage = $.session.get('obtLanguage');
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
//中英文对象
var cn = {
	'searchOrderBody':{
		'travelerName':'旅客姓名',
		'orderStyle':'订单类型',
		'cratedDate':'行程日期',
		'orderNo':'订单号',
		'orderStatus':'订单状态',
		'remarks':'备注信息',
		'searchOrder':'订单查询',
		'all':'全部',
		'airTicket':'机票',
		'hotel':"酒店",
		'train':'杂项',
		'searchRemind':"请选择行程日期",
	},
	'table':{
		'all':'全部订单',
		'noTravel':'未出行订单',
		'history':'历史订单',
		'reviews':'待点评订单',
	    'type':'类型',
	    'orderNumber':'订单号',
	    'traveler':'旅客',
	    'roundTime':'行程时间',
	    'shift':'班次',
	    'price':'价格',
	    'route':'行程',
	    'status':'订单状态',
	},
	'hotelPop':{
		'hotelPopTittle':"撰写评论",
		'travelType':"出行类型",
		'textareaHolder':"留下点评，帮助更多人。分享您的入住体验吧~",
		'recommend':"我希望推荐这家酒店作为公司协议酒店",
		"isAnonymous":"是否匿名",
	}
}
var en = {
	'searchOrderBody':{
		'travelerName':'Traveler Name',
		'orderStyle':'Order Style',
		'cratedDate':'Travel Date',
		'orderNo':'Order No',
		'orderStatus':'Order Status',
		'remarks':'Remarks',
		'searchOrder':'Search Orders',
		'all':'All',
		'airTicket':'Air Ticket',
		'hotel':"Hotel",
		'train':'Sundries',
		'searchRemind':"Please select travel date.",
	},
	'table':{
		'all':'All',
		'noTravel':'Upcoming Trip',
		'history':'History',
		'reviews':'Reviews',
	    'type':'Type',
	    'orderNumber':'Order Number',
	    'traveler':'Traveler',
	    'roundTime':'Travel Time',
	    'shift':'Shift',
	    'price':'Price',
	    'route':'Route',
	    'status':'Status',
	},
	'hotelPop':{
		'hotelPopTittle':"Write Reviews",
		'travelType':"Travel type",
		'textareaHolder':"Leave a comment, help more people, share your stay experience ~",
		'recommend':"Recommend this hotel as agreement hotel",
		"isAnonymous":"Whether Anonymous",
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
})

function showContent(){
	$("#main").html('\
	    <div class="autoCenter">\
	        <div style="height:15px;"></div>\
	        <div class="searchOrderBody">\
	           <div class="searchOrderLine1"></div>\
	           <div class="searchOrderLine2"></div>\
	           <div class="flexWrap">\
	             <div class="searchInputBody">\
		             <div class="searchInputTittle">'+get_lan('searchOrderBody').travelerName+'</div>\
		             <div class="searchInputMain flexRow">\
		               <div class="searchInputIcon">\
		                 <img class="searchInputImg" src="../orders/images/man_user.png">\
		               </div>\
		               <input type="text" class="searchInput" id="searchName">\
		             </div>\
	             </div>\
	             <div class="searchInputBody">\
		             <div class="searchInputTittle">'+get_lan('searchOrderBody').orderStyle+'</div>\
		             <div class="searchInputMain flexRow">\
		               <div class="searchInputIcon">\
		                 <img class="searchInputImg" src="../orders/images/icon.png">\
		               </div>\
		               <select class="searchInput" id="searchType">\
		                 <option value="0">'+get_lan('searchOrderBody').all+'</option>\
		                 <option value="1">'+get_lan('searchOrderBody').airTicket+'</option>\
		                 <option value="2">'+get_lan('searchOrderBody').hotel+'</option>\
		                 <option value="4">'+get_lan('searchOrderBody').train+'</option>\
		               </select>\
		             </div>\
	             </div>\
	             <div class="searchInputBody">\
		             <div class="searchInputTittle">'+get_lan('searchOrderBody').cratedDate+'</div>\
		             <div class="searchInputMain flexRow">\
		               <div class="searchInputIcon">\
		                 <img class="searchInputImg" src="../orders/images/calendar.png">\
		               </div>\
		               <input type="text" id="startTime" class="searchInput" readonly>\
		             </div>\
	             </div>\
	             <div class="searchInputBody">\
		             <div class="searchInputTittle"></div>\
		             <div class="searchInputMain flexRow">\
		               <div class="searchInputIcon">\
		                 <img class="searchInputImg" src="../orders/images/calendar.png">\
		               </div>\
		               <input type="text" id="endTime" class="searchInput" readonly>\
		             </div>\
	             </div>\
	             <div class="searchInputBody">\
		             <div class="searchInputTittle">'+get_lan('searchOrderBody').orderNo+'</div>\
		             <div class="searchInputMain flexRow">\
		               <div class="searchInputIcon">\
		                 <img class="searchInputImg" src="../orders/images/countdown.png">\
		               </div>\
		               <input type="text" class="searchInput" id="searchOrderNo">\
		             </div>\
	             </div>\
	             <div class="searchInputBody">\
		             <div class="searchInputTittle">'+get_lan('searchOrderBody').remarks+'</div>\
		             <div class="searchInputMain flexRow">\
		               <div class="searchInputIcon">\
		                 <img class="searchInputImg" src="../orders/images/planet_earth.png">\
		               </div>\
		               <select class="searchInput" id="remarkIndex">\
		                 <option value="">'+get_lan('searchOrderBody').all+'</option>\
		               </select>\
		             </div>\
	             </div>\
	             <div class="searchInputBody">\
		             <div class="searchInputTittle"></div>\
		             <div class="searchInputMain flexRow">\
		               <input type="text" class="searchInput" id="remarkValue">\
		             </div>\
	             </div>\
	           </div>\
	           <div class="searchOrderBtn flexRow btnBackColor"><img class="searchImg" src="../orders/images/search.png">'+get_lan('searchOrderBody').searchOrder+'</div>\
	        </div>\
	        <div class="orderListBody">\
	          <div class="orderTabBar flexRow">\
	            <div class="orderTab orderTabActive" name="noTravel">'+get_lan('table').noTravel+'</div>\
	            <div class="orderTab" name="history">'+get_lan('table').history+'</div>\
	            <div class="orderTab" name="reviews">'+get_lan('table').reviews+'</div>\
	          </div>\
	          <div class="orderTableBody">\
	          </div>\
	        </div>\
	    </div>\
	')
	$(".hotelPop").html('\
		<div class="hotelPopTittle">'+get_lan("hotelPop").hotelPopTittle+'<div class="closeHotelPop">x</div></div>\
		<div class="stars">\
		</div>\
		<div class="commentTextArea">\
			<textarea placeholder="'+get_lan("hotelPop").textareaHolder+'" class="commentText" maxlength="200"></textarea>\
			<div class="recommendHotelBody flexRow">\
			  <input type="checkbox" name="" class="isRecommend">'+get_lan("hotelPop").recommend+'\
			</div>\
			<div class="commentList flexRow">\
				<div class="isAnonymousText">'+get_lan("hotelPop").isAnonymous+'</div>\
				<input type="checkbox" name="" class="isAnonymous">\
			</div>\
		</div>\
		<div class="submitComment">提交</div>\
	')
	$.ajax(
	  { 
	    type:'post', 
	    url : $.session.get('ajaxUrl'), 
	    dataType : 'json',
	    data:{
	        url: $.session.get('obtCompany')+"/SystemService.svc/GetBasicRatingInfo",
	        jsonStr:'{"key":'+netUserId+'}'
	    },
	    success : function(data) {
	    	var res = JSON.parse(data);
	    	console.log(res);
	    	res.ratingTypeList.map(function(item){
	    		var RatingType = obtLanguage=="CN"?item.RatingTypeCn:item.RatingTypeEn;
	    		$(".stars").append('\
	    			<div class="commentLi flexRow">\
	    				<div class="commentLiTittle">'+RatingType+'</div>\
	    				<div class="commentLiContent '+item.RatingTypeEn.split(' ')[1]+'" score="0" type="'+item.Rid+'"></div>\
	    			</div>\
	    			')
	    		$('.'+item.RatingTypeEn.split(' ')[1]+'').raty({
	    			path: 'images',
		    		click: function(score, evt) {
		    		  console.log('ID: ' + this.id + "\nscore: " + score + "\nevent: " + evt);
		    		  $(this).attr("score",score);
		    		}
	    		});
	    	})
	    	$(".stars").append('\
	    		<div class="commentLi flexRow">\
					<div class="commentLiTittle">'+get_lan("hotelPop").travelType+'</div>\
					<select class="selectTravelType">\
					</select>\
				</div>\
	    		')
	    	res.ratingTripTypeList.map(function(item){
	    		var name = obtLanguage=="CN"?item.nameCn:item.nameEn;
	    		$(".selectTravelType").append('\
	    			<option value="'+item.rid+'">'+name+'</option>\
	    		')
	    	})
	    },
	    error : function() {
	      // alert('fail');
	    }
	  } 
	);
	
    if(JSON.parse($.session.get('ProfileInfo')).NoShowHotelCommentsFromCompany){
    	$(".orderTab").eq(2).remove();
    }
    //<div class="orderTab orderTabActive" name="all">'+get_lan('table').all+'</div>\
	searchOrders();
	allOrderList();
}
function getNextDay(d){
    d = new Date(d);
    d = +d + 1000*60*60*24;
    d = new Date(d);
    var month = (d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1);
    var day = d.getDate()<10?'0'+d.getDate():d.getDate();
    //格式化
    return d.getFullYear()+"-"+month+"-"+day;
}
function getNextYear(d){
    d = new Date(d);
    d = +d + 1000*60*60*24*360;
    d = new Date(d);
    //格式化
    return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
}
function searchOrders(){
	$("#startTime").datepicker({
	    dateFormat: 'yy-mm-dd',
	    changeMonth: true,
	    // minDate: 0,  // 当前日期之后的 0 天，就是当天
	    hideIfNoPrevNext: true,
	    showOtherMonths: true,
	    selectOtherMonths: true,
	    onSelect:function(){
	        var departureValue = new Date($("#startTime").val().replace(/-/g, "/"));
	        $("#endTime").datepicker('destroy');
	        $("#endTime").datepicker({
	            dateFormat: 'yy-mm-dd',
	            changeMonth: true,
	            minDate: departureValue,  // 当前日期之后的 0 天，就是当天
	            maxDate: getNextYear(departureValue),  // 当前日期之后的 0 天，就是当天
	            hideIfNoPrevNext: true,
	            showOtherMonths: true,
	            selectOtherMonths: true,
	        });
	        $("#endTime").val(getNextDay($("#startTime").val()));
	    }
	});
	
	setTimeout(function(){
		var departureValue = new Date($("#startTime").val().replace(/-/g, "/"));
		// var nowdate = new Date();
		// var onemonthdate = new Date(nowdate.getTime() + 30*24*3600*1000);//一个月后
		$("#endTime").datepicker('destroy');
		$("#endTime").datepicker({
		    dateFormat: 'yy-mm-dd',
		    changeMonth: true,
		    minDate: departureValue,  // 当前日期之后的 0 天，就是当天
			maxDate: getNextYear(departureValue),  // 当前日期之后的 0 天，就是当天
		    // maxDate: onemonthdate,
		    hideIfNoPrevNext: true,
		    showOtherMonths: true,
		    selectOtherMonths: true,
		});
	},10)
	
	$.ajax(
	  { 
	    type:'post', 
	    url : $.session.get('ajaxUrl'), 
	    dataType : 'json',
	    data:{
	        url: $.session.get('obtCompany')+"/SystemService.svc/GetCompanyRemarkItem",
	        jsonStr:'{"key":'+netUserId+'}'
	    },
	    success : function(data) {
	    	var res = JSON.parse(data);
	    	// console.log(res);
	    	res.map(function(item){
	    		$("#remarkIndex").append('<option value="'+item.Key+'">'+item.Value+'</option>')
	    	})
	    },
	    error : function() { 
	      // alert('fail');
	    } 
	  } 
	);
	$(".searchOrderBtn").unbind("click").click(function(){
		var searchName = $("#searchName").val();
		var startTime = $("#startTime").val() ;
		var endTime = $("#endTime").val();
		var searchOrderNo = $("#searchOrderNo").val();
		var searchType = $('#searchType option:selected').val();
		var remarkIndex = $('#remarkIndex option:selected').val();
		var remarkValue = $("#remarkValue").val();
		// console.log(searchType);
		if(startTime == ''||endTime == ''){
			alert(get_lan('searchOrderBody').searchRemind);
		}else{
			$('.orderTableBody').mLoading("show");
			startTime=startTime+ " 00:00:00";
			endTime=endTime+ " 23:59:59"
			
			var o={
				"id":netUserId.split("\"")[1],
				"Language":obtLanguage,
				"startTime":startTime,
				"endTime":endTime,
				"searchType":searchType,
				"searchName":searchName,
				"remarkIndex":remarkIndex,
				"remarkValue":remarkValue,
				"searchOrderNo":searchOrderNo,
				}
			console.log(o)
			$.ajax(
			  { 
			    type:'post', 
			    url : $.session.get('ajaxUrl'), 
			    dataType : 'json',
			    data:{
			        url: $.session.get('obtCompany')+"/OrderService.svc/NewTripList",
			        // jsonStr:'{"id":'+netUserId+',"Language":"'+obtLanguage+'","startTime":"'+startTime+'","endTime":"'+endTime+'","searchType":"'+searchType+'","searchName":"'+searchName+'","remarkIndex":"'+remarkIndex+'","remarkValue":"'+remarkValue+'","searchOrderNo":"'+searchOrderNo+'"}'
			        jsonStr:JSON.stringify(o)
			    },
			    success : function(data) {
			    	$('.orderTableBody').mLoading("hide");
			    	var res = JSON.parse(data);
			    	// console.log(res);
			    	showOrderList(res.reverse());
			    },
			    error : function() {
			      // alert('fail');
			    } 
			  } 
			);
		}
	})
}
function allOrderList(){
	var searchName = $("#searchName").val();
	
	var nowdate = new Date();
	var onemonthdate = new Date(nowdate.getTime() + 30*24*3600*1000);//一个月后
	$('#startTime').val(dateForma(nowdate,'-'))
	$('#endTime').val(dateForma(onemonthdate,'-'))
	var startTime = dateForma(nowdate)+' 00:00:00';
	var endTime = dateForma(onemonthdate)+' 23:59:59' ;
	
	function dateForma(time,splitSign){
		splitSign=splitSign?splitSign:"/"
		var y = time.getFullYear();
		var m = time.getMonth()+1;
		var d = time.getDate()
		return y + splitSign + m + splitSign + d
	}
	var searchOrderNo = $("#searchOrderNo").val();
	var searchType = $('#searchType option:selected').val();
	var remarkIndex = $('#remarkIndex option:selected').val();
	var remarkValue = $("#remarkValue").val();
	// console.log(searchType);
		var o={
			"id":netUserId.split("\"")[1],
			"Language":obtLanguage,
			"startTime":startTime,
			"endTime":endTime,
			"searchType":searchType,
			"searchName":searchName,
			"remarkIndex":remarkIndex,
			"remarkValue":remarkValue,
			"searchOrderNo":searchOrderNo,
			}
		console.log(o)
	$('body').mLoading("show");
	$.ajax( 
	  { 
	    type:'post', 
	    url : $.session.get('ajaxUrl'), 
	    dataType : 'json',
	    data:{
	        url: $.session.get('obtCompany')+"/OrderService.svc/NewTripList",
			jsonStr: JSON.stringify(o),
	        // url: $.session.get('obtCompany')+"/OrderService.svc/MyTripListPost",//更换为查询按钮得接口
	        // jsonStr:'{"id":'+netUserId+',"Language":"'+obtLanguage+'"}'
	    },
	    success : function(data) {
	    	$('body').mLoading("hide");
	        if(data != ''){
	            var res = JSON.parse(data)
	            // console.log(res);
	            // if(res.length == 0){
	            //     $("#orderTable").html('\
	            //         <tr>\
	            //           <th style="width: 100%">'+get_lan('tableRemind')+'</th>\
	            //         </tr>\
	            //     ')
	            // }else{
	            	classifyOrder(res);
	            // }
	        }else{
	            // window.location.href='../../login/loginPage.html';
	        }
	    },
	    error : function() { 
	      // alert('fail');
	    } 
	  } 
	);
}
function classifyOrder(res){
	var noTravelData = [];
	res.map(function(item){
		if(!item.isHistory ){
			noTravelData.push(item);
		}
	})
	// console.log(noTravelData);
	var historyOrderData = [];
	res.map(function(item){
		if(item.isHistory ){
		    historyOrderData.push(item);
		}
	})
	// console.log(noTravelData);
	showOrderList(noTravelData);
	var reviewsData = [];
	historyOrderData.map(function(item){
	    item.OrderItems.map(function(aitem){
	      	if(aitem.ItemType == "2" && aitem.isShowRating){
	      	    reviewsData.push(item);
	        }
	    })
	})
	// console.log(reviewsData);
	$(".orderTab").unbind("click").click(function(){
		$(".orderTab").removeClass("orderTabActive");
		$(this).addClass("orderTabActive");
		switch($(this).attr("name")){
			case "all":
			  showOrderList(res)
			break;
			case "noTravel":
			  showOrderList(noTravelData)
			break;
			case "history":
			  showOrderList(historyOrderData)
			break;
			case "reviews":
			  showOrderList(reviewsData)
			break;
		}
	})
}
function showOrderList(res){
	console.log(res);
	$(".orderTableBody").html('\
	    <div id="orderTable">\
	      <div class="tr flexRow">\
	        <div style="width: 130px;padding-left:20px;box-sizing:border-box;">'+get_lan('table').orderNumber+'</div>\
	        <div style="width: 148px;padding-left: 10px;">'+get_lan('table').traveler+'</div>\
	        <div style="width: 40px;"></div>\
	        <div style="width: 200px;">'+get_lan('table').roundTime+'</div>\
	        <div style="width: 90px;"></div>\
	        <div style="width: 380px;">'+get_lan('table').route+'</div>\
	        <div style="width: 100px;">'+get_lan('table').price+'</div>\
	        <div style="width: 100px;">'+get_lan('table').status+'</div>\
	      </div>\
	    </div>\
	')
	if(res.length == 0){
	    $('#tableBody').mLoading("hide");
	    $("#tableBody").html('\
	          <div class="ordersRemind">'+get_lan('tableRemind')+'</div>\
	    ')
	}else{
	    res.map(function(item,index){
	        var tableCell = item.OrderItems.length>1||item.OrderItems[0].ItemName.length>40?"table-cell":"cellLine";
	        var ShowApproval = item.ShowApproval?"hide":"hide";
	        $("#orderTable").append('\
	            <div class="flexRow" style="border-bottom:1px solid #d8d8d8;">\
	               <div class="ellipsis" style="width: 130px;border-right:1px solid #d8d8d8;box-sizing:border-box;padding-left:20px;"><span class="orderNoClick specificFontColor '+tableCell+'" style="text-decoration:underline;cursor:pointer;">'+item.OrderNo+'</span></div>\
	               <div class="ellipsis" style="width: 160px;border-right:1px solid #d8d8d8;box-sizing:border-box;padding-left: 10px;"><span class="'+tableCell+'">'+item.OrderCustomer+'</span></div>\
	               <table class="orderDetailsTable" border="0">\
	                 <tr>\
	                   <th style="width:30px;"></th>\
	                   <th style="width:210px;"></th>\
	                   <th style="width:90px;"></th>\
	                   <th style="width:380px;"></th>\
	                   <th style="width:100px;"></th>\
	                   <th style="width:100px;"></th>\
	                 </tr>\
	               </table>\
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
	                <td title="'+aitem.ItemName+'" style="width:380px;">'+aitem.ItemName+'</td>\
	                <td>'+aitem.ItemFare+'</td>\
	                <td style="color:'+stateColor+'">'+aitem.itemState+'</td>\
	              </tr>\
	          ')
	      })
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
 //    $(".orderTableBody").html('\
 //        <table id="orderTable" border="0">\
 //          <tr>\
 //            <th style="width: 90px;">'+get_lan('table').type+'</th>\
 //            <th style="width: 130px;">'+get_lan('table').orderNumber+'</th>\
 //            <th style="width: 160px;">'+get_lan('table').traveler+'</th>\
 //            <th style="width: 210px;">'+get_lan('table').roundTime+'</th>\
 //            <th style="width: 100px;">'+get_lan('table').shift+'</th>\
 //            <th style="width: 100px;">'+get_lan('table').price+'</th>\
 //            <th style="width: 270px;">'+get_lan('table').route+'</th>\
 //            <th style="width: 140px;">'+get_lan('table').status+'</th>\
 //          </tr>\
 //        </table>\
 //    ')
	// res.map(function(item){
	//   item.OrderItems.map(function(aitem){
	//       var liIcon;
	//       switch(aitem.ItemType)
	//       {
	//         case '1':
	//         liIcon="planeIcon"
	//         break;
	//         case '2':
	//         liIcon="hotelIcon"
	//         break;
	//         case '3':
	//         liIcon="trainIcon"
	//         break;
	//         case '4':
	//         liIcon="carIcon"
	//         break;
	//       }
	//       var stateColor = "#1E66AE";
	//       if(ProfileInfo.onlineStyle=="APPLE"){
	//         if(aitem.itemState == "已完成" || aitem.itemState == "Finished"||aitem.itemState == "已改签" || aitem.itemState == "Changed"||aitem.itemState == "已确认" || aitem.itemState == "Confirmed"||aitem.itemState == "已退票" || aitem.itemState == "Refunded"){
	//             stateColor = "#222";
	//         }else{
	//             stateColor = "#222";
	//         }
	//       }else{
	//         if(aitem.itemState == "已完成" || aitem.itemState == "Finished"){
	//           stateColor = "#1E66AE";
	//         }
	//         else if(aitem.itemState == "已改签" || aitem.itemState == "Changed"){
	//           stateColor = "#1E66AE";
	//         }
	//         else if(aitem.itemState == "退票中" || aitem.itemState == "Refunding"){
	//           stateColor = "#D0021B";
	//         }
	//         else if(aitem.itemState == "已确认" || aitem.itemState == "Confirmed"){
	//           stateColor = "#1E66AE";
	//         }
	//         else if(aitem.itemState == "未出票" || aitem.itemState == "Reservation"){
	//           stateColor = "#F58C06";
	//         }
	//         else if(aitem.itemState == "已退票" || aitem.itemState == "Refunded"){
	//           stateColor = "#1E66AE";
	//         }
	//         else if(aitem.itemState == "出票中" || aitem.itemState == "In process"){
	//           stateColor = "#7ED321";
	//         }
	//         else if(aitem.itemState == "处理中" || aitem.itemState == "On request"){
	//           stateColor = "#7ED321";
	//         }
	//       }
	//       if(!$(".orderTab").eq(2).hasClass("orderTabActive")){
	//       	$("#orderTable").append('\
	//       	    <tr>\
	//       	      <td><div class="'+liIcon+'"></div></td>\
	//       	      <td class="orderNoClick specificFontColor" hotelId="'+aitem.hotelId+'" ItemId="'+aitem.ItemId+'" style="text-decoration: underline;cursor:pointer">'+item.OrderNo+'</td>\
	//       	      <td>'+item.OrderCustomer+'</td>\
	//       	      <td>'+aitem.ItemDate+'</td>\
	//       	      <td>'+aitem.flightAndTrainNo+'</td>\
	//       	      <td>'+aitem.ItemFare+'</td>\
	//       	      <td>'+aitem.ItemName+'</td>\
	//       	      <td style="color:'+stateColor+'">'+aitem.itemState+'</td>\
	//       	    </tr>\
	//       	')
	//       }else{
	//       	if(aitem.ItemType=="2"&& aitem.isShowRating){
	//       		$("#orderTable").append('\
	//       		    <tr>\
	//       		      <td><div class="'+liIcon+'"></div></td>\
	//       		      <td class="orderNoClick" hotelId="'+aitem.hotelId+'" ItemId="'+aitem.ItemId+'" style="color:#1e66ae;text-decoration: underline;cursor:pointer">'+item.OrderNo+'</td>\
	//       		      <td>'+item.OrderCustomer+'</td>\
	//       		      <td>'+aitem.ItemDate+'</td>\
	//       		      <td>'+aitem.flightAndTrainNo+'</td>\
	//       		      <td>'+aitem.ItemFare+'</td>\
	//       		      <td>'+aitem.ItemName+'</td>\
	//       		      <td style="color:'+stateColor+'">'+aitem.itemState+'</td>\
	//       		    </tr>\
	//       		')
	//       	}
	//       }
	      
	//   }) 
	// })
	// altRows('orderTable');//表格
	// $(".orderNoClick").unbind("click").click(function(){
	// 	if(!$(".orderTab").eq(2).hasClass("orderTabActive")){
	// 		var searchOrderInfo = {
	// 		    'orderNo':$(this).text(),
	// 		}
	// 		$.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
	// 		window.location.href='../../orders/orderDetails.html';
	// 	}else{
	// 		$(".submitComment").attr("hotelId",$(this).attr("hotelId"));
	// 		$(".submitComment").attr("ItemId",$(this).attr("ItemId"));
	// 		$(".closeHotelPop").unbind("click").click(function(){
	// 			closeHotelPop();
	// 		})
	// 		openHotelPop();
	// 		$(".submitComment").unbind("click").click(function(){
	// 			var hotelRatingDetailList = '[';
	// 			for(var i=0;i<$(".commentLiContent").length;i++){
	// 				hotelRatingDetailList+='{"Rating":'+$('.commentLiContent').eq(i).attr("score")+',"RatingType":'+$('.commentLiContent').eq(i).attr("type")+'},'
	// 			}
	// 			hotelRatingDetailList = hotelRatingDetailList.substring(0,hotelRatingDetailList.length-1)+']';
	// 			console.log(hotelRatingDetailList)
	// 			$.ajax( 
	// 			  { 
	// 			    type:'post', 
	// 			    url : $.session.get('ajaxUrl'), 
	// 			    dataType : 'json',
	// 			    data:{
	// 			        url: $.session.get('obtCompany')+"/SystemService.svc/AddRatingInfo",
	// 			        jsonStr:'{"request":{"Language":"'+obtLanguage+'","companyId":"'+JSON.parse($.session.get('ProfileInfo')).companyId+'","cutomerId":"'+JSON.parse($.session.get('ProfileInfo')).customerId+'","hotelId":"'+$(this).attr("hotelId")+'","hotelItemId":"'+$(this).attr("ItemId")+'","hotelRatingContent":{"RatingDetail":"'+$(".commentText").val()+'"},"hotelRatingDetailList":'+hotelRatingDetailList+',"isAnonymous":'+$(".isAnonymous").is(':checked')+',"isRecommend":'+$(".isRecommend").is(':checked')+',"key":'+netUserId+',"tripType":'+$(".selectTravelType").val()+'}}'
	// 			    },
	// 			    success : function(data) {
	// 			    	$('body').mLoading("hide");
	// 			        var res = JSON.parse(data)
	// 			        console.log(res);
	// 			        if(res.code==1){
	// 			        	location.reload();
	// 			        }else{
	// 			        	alert(res.message);
	// 			        }
	// 			    },
	// 			    error : function() { 
	// 			      // alert('fail');
	// 			    } 
	// 			  } 
	// 			);
	// 		})
	// 	}
	// })
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
function openHotelPop(){
    $("#cover").show();
    $(".hotelPop").css("display","block");
}
function closeHotelPop(){
    $("#cover").hide();
    $(".hotelPop").css("display","none");
}