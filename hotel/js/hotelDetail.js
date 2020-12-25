var netUserId = $.session.get('netLoginId');
var obtLanguage = $.session.get('obtLanguage');
var hotelDetailInfo = JSON.parse($.session.get('hotelDetailInfo'));
console.log(hotelDetailInfo);
var queryKeyList = hotelDetailInfo.queryKey.split(',');
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
var TAorderNo = $.session.get('TAorderNo');
// 有TA单时，时间进行限制
	var TAnumber = $.session.get('TAnumber');
	var TAminDate=0,TAmaxDate=365
	if(TAnumber!=undefined && TAnumber!=""){
		var goOnBooktravelInfo=JSON.parse($.session.get('goOnBooktravelInfo'));
		TAminDate=goOnBooktravelInfo.starTime.split(" ")[0]
		TAmaxDate=goOnBooktravelInfo.endTime.split(" ")[0]
	}
//中英文对象
var cn = {
    "progressBar":{
        "search":"查询",
        "book":"预订",
        "complete":"完成",
    },
    "imgPop":{
    	"tittle":"酒店图片",
    },
    "hotelInfoBody":{
    	"telephone":"电话：",
    	"fax":"传真：",
    	"score":"评分：",
    	"lowest":"起",
    	"reselection":"[重新选择]",
		"showMore":"查看更多",
		"hideMore":"收起",
    },
    "hotelTabBody":{
    	"rooms":"房型列表",
    	"serviceIntro":"服务介绍",
    	"commentList":"评论列表",
    },
    "hotelRoomList":{
    	"weekDay":'星期天, 星期一, 星期二, 星期三, 星期四, 星期五, 星期六',
    	"search":"查询",
    	"roomType":"房型",
    	"bedType":"床型",
    	"breakfast":"早餐",
    	"price":"价格(含税)",
    	"book":"预订",
    	"Finish":"订完",
    	"Request":"申请",
    	"wifiTittle":"宽带",
    	"violation":"费用超标",
    	"violationApple":"违反政策",
    	"dailyRateBodyTittle1":"您已选择",
    	"dailyRateBodyTittle2":"至",
    	"dailyRateBodyTittle3":" 共 ",
    	"dailyRateBodyTittle4":" 晚",
		"bedTypeList":"单床/双床",
		"companyAgreement":"公司协议",
		"agreementTips":"预订前请务必仔细阅读酒店价格条款及早餐宽带情况",
    },
    "hotelIntroBody":{
    	"LeisureService":"休闲服务",
    	"MeetingService":"会议服务",
    	"HotelService":"酒店服务",
    	"FoodService":"餐饮服务",
    	"TrafficInfo":"周边交通",
    },
	"hotelRemind":"该酒店暂时无法预订，请重新选择",
	"shuttleRemind":"APPLE在该酒店提供班车服务。",
}
var en = {
    "progressBar":{
        "search":"Search",
        "book":"Book",
        "complete":"Complete",
    },
    "imgPop":{
    	"tittle":"Hotel Pictures",
    },
    "hotelInfoBody":{
    	"telephone":"Telephone:",
    	"fax":"Fax:",
    	"score":"Score:",
    	"lowest":"Up",
    	"reselection":"[Modify]",
		"showMore":"View more",
		"hideMore":"Retract",
    },
    "hotelTabBody":{
    	"rooms":"Rooms",
    	"serviceIntro":"Service Intro",
    	"commentList":"Comment List",
    },
    "hotelRoomList":{
    	"weekDay":'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    	"search":"Search",
    	"roomType":"Room Type",
    	"bedType":"Bed Type",
    	"breakfast":"Breakfast",
    	"price":"Price (Tax Included)",
    	"book":"Book",
    	"Finish":"Finish",
		"Request":"Apply",
    	"wifiTittle":"Internet",
    	"violation":"Out of Policy",
    	"violationApple":"Out of Policy",
    	"dailyRateBodyTittle1":"You have chosen",
    	"dailyRateBodyTittle2":"to",
    	"dailyRateBodyTittle3":" total ",
    	"dailyRateBodyTittle4":" nights",
		// "bedTypeList":"Single beds / double bed",
		"bedTypeList":"Single/ double beds",
		"companyAgreement":"Corporate rate",
		"agreementTips":"Please always carefully review hotel rate terms and inclusions before booking."
    },
    "hotelIntroBody":{
    	"LeisureService":"Leisure Service",
    	"MeetingService":"Meeting Service",
    	"HotelService":"Hotel Service",
    	"FoodService":"Food Service",
    	"TrafficInfo":"Traffic Info",
    },
	"hotelRemind":"The hotel is not available now, please choose other hotel.",
	"shuttleRemind":"APPLE provides shuttle service support in this hotel.",
}
if(ProfileInfo.onlineStyle=="APPLE"){
    en.hotelRoomList.book = "Select";
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
	$('body').mLoading("show");
	$.ajax(
	  {
	    type:'post',
	    url : $.session.get('ajaxUrl'), 
	    dataType : 'json',
	    data:{
	    	url: $.session.get('obtCompany')+"/QueryService.svc/QueryHotelDetailPost",
	    	jsonStr:'{"queryKey":"'+hotelDetailInfo.queryKey+'","id":'+netUserId+',"Language":"'+obtLanguage+'"}'
	    },
	    success : function(data) {
	    	$('body').mLoading("hide");
	    	var res = JSON.parse(data);
	    	console.log(res);
	    	if(res.CheckIn!=null){
	    		showContent(res);//内容展示
	    	}else{
	    		$('body').mLoading("show");
	    		alert(get_lan("hotelRemind"));
	    		// window.location.href='../../hotel/hotelList.html?cache=1';
	    		window.history.go(-1);
	    	}
	    },
	    error : function() {
	      // alert('fail');
	    }
	  }
	);
})
function showContent(res){
	res.Telephone = res.Telephone == null?"":res.Telephone;
	res.Fax = res.Fax == null?"":res.Fax;
	res.Address = res.Address == null?"":res.Address;
	res.LeisureService = res.LeisureService == null?"":res.LeisureService;
	res.MeetingService = res.MeetingService == null?"":res.MeetingService;
	res.HotelService = res.HotelService == null?"":res.HotelService;
	res.FoodService = res.FoodService == null?"":res.FoodService;
	res.TrafficInfo = res.TrafficInfo == null?"":res.TrafficInfo;
	var showBusRemind = res.HasShuttleBus?"":"hide";
	$("#main").html('\
		<div class="hotelImgPop hide">\
		  <div id="cover"></div>\
          <div class="pic_pop">\
            <div style="text-align:right;text-align: right;position: absolute;width: 100%;left: 0;padding-right: 10px;box-sizing: border-box;height: 52px;line-height: 52px;">\
              <span class="closeImgPop">×</span>\
            </div>\
            <div class="pop_tittle">'+get_lan('imgPop').tittle+'</div>\
			<div style="float: left;height: 388px;width: 388px;position: relative; display: -moz-box;display: -ms-flexbox;display: -webkit-box;display: -webkit-flex;display: box;display: flexbox;display: flex;align-items: center;border: 1px solid #d3e0ff;box-sizing: border-box;">\
					<img  src="" class="bigImg" alt="" width="100%" height="100%">\
					<div class="left"></div>\
					<div class="right"></div>\
			</div>\
			<div style="float: left;height: 350px;width: 312px;">\
				<div class="imgBtnList flexWrap"></div>\
				<div class="imgListBody autoScrollY">\
				   <ul id="imgList" class="flexWrap"></ul>\
				</div>\
			</div>\
			<div class="imgFoot">\
				<div class="title"></div>\
			</div>\
          </div>\
		</div>\
		<div class="autoCenter">\
		  <div class="progressBar flexRow mainFontColor"></div>\
		  <div class="hotelImgBody flexRow"></div>\
		  <div style="position:relative;margin-top:28px;">\
		    <div class="hotelInfoBody"></div>\
		    <div class="agreementHotel"></div>\
		    <div class="hotelTabBody flexRow">\
		      <div class="hotelTab hotelTabActive" name="roomList">'+get_lan('hotelTabBody').rooms+'</div>\
		      <div class="hotelTab" name="introList">'+get_lan('hotelTabBody').serviceIntro+'</div>\
		      <div class="hotelTab" name="commentList">'+get_lan('hotelTabBody').commentList+'</div>\
		    </div>\
		    <div class="hotelRoomBody">\
		      <div class="hotelRoomSearch flexRow">\
		        <div class="checkInDateSearch">\
		          <div class="checkInDateIcon"></div>\
		          <input type="text" id="checkInDate" readonly="" value="">\
		          <div class="checkInWeek"></div>\
		        </div>\
		        <div style="width:24px;height:32px;border-bottom:1px solid #979797;"></div>\
		        <div class="checkOutDateSearch">\
		          <div class="checkOutDateIcon"></div>\
		          <input type="text" id="checkOutDate" readonly="" value="">\
		          <div class="checkOutWeek"></div>\
		        </div>\
		        <div class="hotelRoomSearchBtn">'+get_lan('hotelRoomList').search+'</div>\
		      </div>\
		      <div class="hotelRoomListTittle flexRow">\
		        <div class="RoomTypeTittle">'+get_lan('hotelRoomList').roomType+'</div>\
		        <div class="bedTypeTittle">'+get_lan('hotelRoomList').bedType+'</div>\
		        <div class="breakfastTittle">'+get_lan('hotelRoomList').breakfast+'</div>\
		        <div class="wifiTittle">'+get_lan('hotelRoomList').wifiTittle+'</div>\
		        <div class="priceTittle">'+get_lan('hotelRoomList').price+'</div>\
		      </div>\
		      <div class="hotelRoomList"></div>\
		    </div>\
		    <div class="hotelIntroBody hide"></div>\
		    <div class="commentListBody hide"></div>\
		    <div class="hotelMapBody">\
		    <div class="mapIcon"></div>\
		    <div class="hotelAddress">'+res.Address+'</div>\
		    <div class="mapTrafficTittle">'+get_lan('hotelIntroBody').TrafficInfo+'</div>\
		    <div class="mapTrafficInfo">'+res.TrafficInfo+'</div>\
		    <div id="hotelMap"></div>\
		    </div>\
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
	if(res.AbacusPriceNotContainTax){
		if(obtLanguage=="CN"){
			$(".priceTittle").text("价格(不含税)");
		}else{
			$(".priceTittle").text("Price (Tax Excluded)");
		}
	}
	/*地图*/
	var map = new BMap.Map("hotelMap");    // 创建Map实例
	// 百度地图API功能
	var Longitude=parseFloat(res.Longitude);
	var Laitude=parseFloat(res.Laitude);
	var hotelName = res.Name;
	var hotelAddress = res.Address;
	var hotelPhone = res.Telephone;
	var imgSrc = res.ImageUrl[0];
	var poi = new BMap.Point(Longitude,Laitude);
	map.centerAndZoom(poi, 16);
	map.enableScrollWheelZoom();

	setTimeout(function(){
	    var convertor = new BMap.Convertor();
	    var pointArr = [];
	    pointArr.push(poi);
	    convertor.translate(pointArr, 3, 5, translateCallback)
	}, 50);
	//坐标转换完之后的回调函数
	translateCallback = function (data){
	  if(data.status === 0) {
	    var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
	                    '<img src="'+imgSrc+'" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
	                    '地址：'+hotelAddress+'<br/>电话：'+hotelPhone+'<br/>' +
	                  '</div>';

	    //创建检索信息窗口对象
	    var searchInfoWindow = null;
	    searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
	            title  : hotelName,      //标题
	            width  : 290,             //宽度
	            height : 105,              //高度
	            panel  : "panel",         //检索结果面板
	            enableAutoPan : true,     //自动平移
	            searchTypes   :[
	                BMAPLIB_TAB_SEARCH,   //周边检索
	                BMAPLIB_TAB_TO_HERE,  //到这里去
	                BMAPLIB_TAB_FROM_HERE //从这里出发
	            ]
	        });
	    var marker = new BMap.Marker(data.points[0]); //创建marker对象
	    marker.addEventListener("click", function(e){
	            searchInfoWindow.open(marker);
	    })
	    map.addOverlay(marker); //在地图中添加marke
	    map.setCenter(data.points[0]);
	  }
	}

	$(".progressBar").html('\
	    <div class="progressLine progressActiveBack"></div><div class="progressCircle progressActiveBack"></div><span class="progressActiveFont">'+get_lan('progressBar').search+'</span>\
	    <div class="progressLine progressBackColor"></div><div class="progressCircle progressBackColor"></div>'+get_lan('progressBar').book+'\
	    <div class="progressLine progressBackColor"></div><div class="progressCircle progressBackColor"></div>'+get_lan('progressBar').complete+'\
	')
	for(var i=0;i<4;i++){
		if(res.ImageUrl.length>=4){
			$(".hotelImgBody").append('\
				<img class="hotelImg" src="'+res.ImageUrl[i]+'">\
			')
		}else if(res.ImageUrl.length==0){
			$(".hotelImgBody").hide();
		}
		else{
			$(".hotelImgBody").append('\
				<img class="hotelImg" >\
			')
		}
	}
	hotelImgPop(res);//酒店图片弹窗
	$(".hotelImg").unbind("click").click(function(){
		hotelImgPop(res);//酒店图片弹窗
		
		setTimeout(function(){
			$(".hotelImgPop").removeClass("hide");
			$("#cover").css("display","block");
			var h=$('.pic_pop').height()
			var w=$('.pic_pop').width()
			// $('.pic_pop').css('margin-left',-w/2+'px')
			// $('.pic_pop').css('margin-top',-h/2+'px')
		},50)
	})
	var showScore = res.HotelRating==0?"hide":"";
	var hotelInfoPrice = res.LocalCurrency==null?res.LowestPrice+'<span style="font-size:18px;margin:0 5px 0 5px">CNY</span>':res.LocalLowestPrice+'<span style="font-size:18px;margin:0 5px 0 5px">'+res.LocalCurrency+'</span>';
	var hotelDescription = res.Description == null?"":res.Description;
	$(".hotelInfoBody").html('\
		<div class="hotelInfoName flexRow"><div title="'+res.Name+'" class="ellipsis" style="max-width:700px;">'+res.Name+'</div><span class="hotelReselection">'+get_lan('hotelInfoBody').reselection+'</span>\</div>\
		<div class="hotelInfoBusRemind flexRow '+showBusRemind+'">\
			<img src="./images/shuttlebus.png" style="display:block;width:16px;height:16px;margin:2px 5px 0 0;">\
			'+get_lan("shuttleRemind")+'\
		</div>\
		<div class="hotelInfoStar"><div class="hotelLiStarHalf"></div></div>\
		<div class="hotelInfoScore '+showScore+'">'+get_lan('hotelInfoBody').score+res.HotelRating+'</div>\
		<div class="hotelInfoTelephone">'+get_lan('hotelInfoBody').telephone+res.Telephone+'</div>\
		<div class="hotelInfoFax">'+get_lan('hotelInfoBody').fax+res.Fax+'</div>\
		<div class="hotelInfoDescription">'+hotelDescription+'</div>\
		<div class="hotelInfoPrice"><span style="font-size:30px;">'+hotelInfoPrice+'</span>'+get_lan('hotelInfoBody').lowest+'</div>\
		<p class="showMoreLine" style="text-align: center;padding: 10px 0;"><span class="showMore">'+get_lan('hotelInfoBody').showMore+'<span class="showMoreimg"></span></span></p>\
		<p class="hideMoreLine" style="text-align: center;padding: 10px 0;"><span class="hideMore">'+get_lan('hotelInfoBody').hideMore+'<span class="hideMoreimg"></span></span></p>\
	')
	// 如果hotelInfoDescription 高度低于40px，移除hotelInfoHide
	if($(".hotelInfoDescription").height()>40){
		$('.hotelInfoDescription').addClass("hotelInfoHide")
		$('.showMoreLine').show()
		$('.hideMoreLine').hide()
		$('.showMore').click(function(){
			$('.hotelInfoDescription').removeClass("hotelInfoHide")
			$('.hideMoreLine').show()
			$('.showMoreLine').hide()
		})
		$('.hideMore').click(function(){
			$('.hotelInfoDescription').addClass("hotelInfoHide")
			$('.hideMoreLine').hide()
			$('.showMoreLine').show()
		})
	}else{
		$('.showMoreLine').hide()
		$('.hideMoreLine').hide()
	}
	
	$(".hotelReselection").unbind("click").click(function(){
		// window.location.href='../../hotel/hotelList.html?cache=1';
		window.history.go(-1);
	})
	switch(res.StarCode)
	{
	case "0":
	  $(".hotelInfoStar").css("width","0px");
	  break;
	case "1":
	  $(".hotelInfoStar").css("width","16px");
	  break;
	case "2":
	  $(".hotelInfoStar").css("width","32px");
	  break;
	case "3":
	  $(".hotelInfoStar").css("width","48px");
	  break;
	case "4":
	  $(".hotelInfoStar").css("width","64px");
	  break;
	case "5":
	  $(".hotelInfoStar").css("width","80px");
	  break;
	  case "0.0":
	    $(".hotelInfoStar").css("width","0px");
	    break;
	  case "1.0":
	    $(".hotelInfoStar").css("width","16px");
	    break;
	  case "2.0":
	    $(".hotelInfoStar").css("width","32px");
	    break;
	  case "3.0":
	    $(".hotelInfoStar").css("width","48px");
	    break;
	  case "4.0":
	    $(".hotelInfoStar").css("width","64px");
	    break;
	  case "5.0":
	    $(".hotelInfoStar").css("width","80px");
	    break;
	}
	if(!(res.ExtStarCode > 0)){
		$('.hotelLiStarHalf').css('display','none')
	}
	if(ProfileInfo.onlineStyle=="APPLE"){
	    $(".hotelInfoStar").remove();
	    $(".hotelInfoScore").remove();
	}
	$(".hotelTab").unbind("click").click(function(){
		$(".hotelTab").removeClass("hotelTabActive");
		$(this).addClass("hotelTabActive");
		switch($(this).attr("name"))
		{
		case "roomList":
		  $(".hotelRoomBody").removeClass("hide");
		  $(".hotelIntroBody").addClass("hide");
		  $(".commentListBody").addClass("hide");
		  break;
		case "introList":
		  $(".hotelIntroBody").removeClass("hide");
		  $(".hotelRoomBody").addClass("hide");
		  $(".commentListBody").addClass("hide");
		  break;
		case "commentList":
		  $(".hotelIntroBody").addClass("hide");
		  $(".hotelRoomBody").addClass("hide");
		  $(".commentListBody").removeClass("hide");
		  break;
		}
	})
	hotelRoomList(res);
	serviceList(res);
	$.ajax(
	  { 
	    type:'post',
	    url : $.session.get('ajaxUrl'), 
	    dataType : 'json',
	    data:{
	    	url: $.session.get('obtCompany')+"/QueryService.svc/QueryHotelRatingInfo",
	    	jsonStr:'{"hotelId":"'+queryKeyList[2]+'","id":'+netUserId+'}'
	    },
	    success : function(data) {
	    	var res = JSON.parse(data);
	        console.log(res);
	        if(res.length==0){
	        	$(".hotelTab").eq(2).hide();
	        }
	        commentList(res);
	    },
	    error : function() {
	      // alert('fail');
	    } 
	  }
	);
}
function hotelImgPop(res){
		var hotelImgArray = [];
		res.HotelImages.map(function(item){
			hotelImgArray.push({"type":item.Type,"TypeDes":item.TypeDes,"images":[]});
		});
		Array.prototype.distinct = function(){
		 var arr = this,
		  result = [],
		  i,
		  j,
		  len = arr.length;
		 for(i = 0; i < len; i++){
		  for(j = i + 1; j < len; j++){
		   if(arr[i].type === arr[j].type){
		    j = ++i;
		   }
		  }
		  result.push(arr[i]);
		 }
		 return result;
		}
		res.HotelImages.map(function(item){
			hotelImgArray.distinct().map(function(typeItem){
				if(item.Type == typeItem.type){
					typeItem.images.push(item);
				}
			})
		});
		// console.log(hotelImgArray.distinct());
		$(".imgBtnList").html('');
		hotelImgArray.distinct().map(function(item,index){
			$(".imgBtnList").append('<div class="imgBtn" index="'+index+'">'+item.TypeDes+'</div>')
		})
		$(".imgBtn").unbind("click").click(function(){
			$("#imgList").html('');
			hotelImgArray.distinct()[parseInt($(this).attr('index'))].images.map(function(item,index){
				$("#imgList").append('<li><img src="'+item.ImageUrl+'" title="'+item.TypeDes+parseInt(index+1)+'" class="imgLi" alt="'+item.TypeDes+'"></li>')
			})
			// $('#imgList').viewer('destroy');
			// $('#imgList').viewer({
			// 	  transition:false,
			// 	  // toolbar:false,
			// 	  title:false,
			// 	  zoomable:false,
			// 	  rotatable:false,
			// 	  scalable:false,
			// 	});
			$(".imgBtn").removeClass('imgBtnChecked')
			$(this).addClass('imgBtnChecked')
			
			$('.imgFoot .title').text($(this).text())
			$('.imgFoot .page').remove()
			$('.imgFoot').append('\
				<div class="page">\
					<span></span>/'+hotelImgArray.distinct()[parseInt($(this).attr('index'))].images.length+'\
				</div>\
			')
			// 每个图片绑定事件
			$('#imgList li').unbind('click').click(function(){
				$('.bigImg').attr('src',$(this).find('img').attr('src'))
				$('.bigImg').attr('alt',$(this).find('img').attr('alt'))
				$('.bigImg').attr('title',$(this).find('img').attr('title'))
				$('#imgList .imgLi').removeClass('checkedImg')
				$(this).find('img').addClass('checkedImg')
				//图片个数
				$('.page span').text(parseInt($(this).index()+1))
			})
			$("#imgList li").eq(0).click();
			
			//左侧按钮
			$('.left').unbind('click').click(function(){
				var index=$('#imgList li').find('.checkedImg').parent().index()
				$("#imgList li").eq(index-1).click();
			
			})
			//右侧按钮
			$('.right').unbind('click').click(function(){
				var index=$('#imgList li').find('.checkedImg').parent().index()
				var length=$('#imgList li').length
				if(index==length-1){
					index=-1
				}
				$("#imgList li").eq(index+1).click();
				
			})
		})
		$(".imgBtn").eq(0).click();
	    $(".closeImgPop").unbind("click").click(function(){
	    	$(".hotelImgPop").addClass("hide");
	    	$("#cover").css("display","none");
	    })
}
/*酒店房间列表*/
function hotelRoomList(res){
	
	$("#checkInDate").val(res.CheckIn);
	$("#checkOutDate").val(res.CheckOut);
	$(".checkInWeek").text(getWeek(res.CheckIn));
	$(".checkOutWeek").text(getWeek(res.CheckOut));
	var departureValue = new Date($("#checkInDate").val().replace(/-/g, "/"));
	$("#checkOutDate").datepicker('destroy');
	$("#checkOutDate").datepicker({
	    dateFormat: 'yy-mm-dd',
	    changeMonth: true,
	    changeYear: true,
	    minDate: departureValue,  // 当前日期之后的 0 天，就是当天
	    maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
	    hideIfNoPrevNext: true,
	    showOtherMonths: true,
	    selectOtherMonths: true,
	    onSelect:function(){
	        $(".checkOutWeek").text(getWeek($("#checkOutDate").val()));
	    }
	});
	$("#checkInDate").datepicker({
	    dateFormat: 'yy-mm-dd',
	    changeMonth: true,
	    changeYear: true,
	    minDate: TAminDate,  // 当前日期之后的 0 天，就是当天
	    maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
	    hideIfNoPrevNext: true,
	    showOtherMonths: true,
	    selectOtherMonths: true,
	    onSelect:function(){
	    	$(".checkInWeek").text(getWeek($("#checkInDate").val()));
	        var departureValue = new Date($("#checkInDate").val().replace(/-/g, "/"));
	        $("#checkOutDate").datepicker('destroy');
	        $("#checkOutDate").datepicker({
	            dateFormat: 'yy-mm-dd',
	            changeMonth: true,
	            changeYear: true,
	            minDate: departureValue,  // 当前日期之后的 0 天，就是当天
	            maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
	            hideIfNoPrevNext: true,
	            showOtherMonths: true,
	            selectOtherMonths: true,
	            onSelect:function(){
	                $(".checkOutWeek").text(getWeek($("#checkOutDate").val()));
	            }
	        });
			$("#checkOutDate").val(getNextDay($("#checkInDate").val()));
			$(".checkOutWeek").text(getWeek($("#checkOutDate").val()));
	    }
	});
	
	
	
	
	var agreementIndex=0
	var agreementHotelShow=false;
	var hotelInfo=""
	var bedInfo=""
	var bedIndex=""
	var bedTotalFare=0
	
	var hotelDailyRate=""
	var hotelDailyCurrency=""
	
	res.RoomTypes.map(function(item,index){
		// var roomImg = item.RoomImgs.length==0?'../hotel/images/hotelRoomImg.jpg':item.RoomImgs[0];
		// 12.05新增BCD默认图片
		let onlineStyle = ProfileInfo.onlineStyle;
		let noimgUrl=onlineStyle=="BCD"?"../../hotel/images/BCDnoPicture.png":"../../hotel/images/noPicture.png";
		
		var roomImg = item.RoomImgs.length==0?noimgUrl:item.RoomImgs[0];
		var remark = item.Remark==null?'':item.Remark;
		$(".hotelRoomList").append('\
			<div class="hotelRoomLi">\
			  <div class="liRoomType">'+item.RoomTypeName+'</div>\
			  <div class="flexRow" style="min-height:120px;">\
			    <div class="roomImg" style="background-image:url('+roomImg+')" index="'+index+'"></div>\
			    <div class="bedList"></div>\
			  </div>\
			  <div class="liRoomRemark">'+item.Remark+'</div>\
			</div>\
		')
		
		// 协议酒店是否显示
		
		item.RateInfos.map(function(bedItem){
			var PolicyRuleShow = bedItem.PolicyRule==null?"hide":"";
			//免费取消
			var freeCancel = bedItem.PolicyRule==null?"":"hide";
			var cancelText=obtLanguage=="CN"?"免费取消":"Free CNCL"
			var policyUnderline = bedItem.Policy == null?"":"policyUnderline";
			var RateType = bedItem.RateType==null?"":bedItem.RateType;
			if(bedItem.PolicyTime){
				var a = parseInt(bedItem.PolicyTime.split(":")[0]);
				var s= ''
				s += a-2+'01';
				s += ',';
				s += a-1+'59';
			}
			else{
				var s ='1601,1759';
			}
			var showViolation = bedItem.Type==3||bedItem.Type==4?"":"hide";
			var ruleMarginLeft = bedItem.Type==3||bedItem.Type==4?"":"ruleMarginLeft";
			var canNotBook = (bedItem.Type==3||bedItem.Type==4)&&res.HotelOutPolicyNoBook?"canNotBook":"";
			if(ProfileInfo.onlineStyle=="APPLE"){
			    var DailyRateColor = '222';
			    var showRate = "hide";
			}else{
				// var DailyRateColor=item.IsAgreement||item.IsTMCAgreement?'8dc73f':'EF7908';
				// 3.23 修改,绿色加深
				var DailyRateColor=item.IsAgreement||item.IsTMCAgreement?'599903':'EF7908';
				var shakeHands = item.IsAgreement||item.IsTMCAgreement?'shakeHands':'';
				var showRate = "";
			}
			hotelDailyRate = bedItem.LocalDailyRate == ""||bedItem.LocalDailyRate == null?bedItem.DailyRate:bedItem.LocalDailyRate;
			hotelDailyCurrency = bedItem.LocalDailyRate == ""||bedItem.LocalDailyRate == null?bedItem.Currency:bedItem.LocalCurrency;
			
			var btnText = bedItem.HotelResourceType == 1 ? get_lan('hotelRoomList').Request : get_lan('hotelRoomList').book
			var bookHotelText = bedItem.HasRoom==2?get_lan('hotelRoomList').Finish:btnText;
			
			var hotelRoomFinish = bedItem.HasRoom==2?"hotelRoomFinish":"";
			var RateStartDate = bedItem.RateGroups[0].StartDate!=null&&bedItem.RateGroups[0].StartDate!=""?bedItem.RateGroups[0].StartDate.substring(0,10):"";
			var RateEndDate = bedItem.RateGroups[bedItem.RateGroups.length-1].EndDate!=null&&bedItem.RateGroups[bedItem.RateGroups.length-1].EndDate!=""?bedItem.RateGroups[bedItem.RateGroups.length-1].EndDate.substring(0,10):"";
			var rateUnderline = bedItem.RateGroups.length>1&&bedItem.RateGroups.length<10?"rateUnderline":"";
			var dailyRateBodyString = '';
			if(bedItem.RateGroups.length < 10){
				bedItem.RateGroups.map(function(rItem){
					if(rItem.StartDate!=null){
						dailyRateBodyString+='<div class="dailyRateBodyLi"><div class="dailyRateBodyLiTittle">'+rItem.StartDate.substring(5,10)+'</div><div class="dailyRateBodyLiContent">'+rItem.Price+'</div></div>'
					}
				})
			}
			var showBookBtn = ProfileInfo.ManualPriceNoBook&&bedItem.HotelResourceType==1?"hide":"";
			var violationText=ProfileInfo.onlineStyle=="APPLE"?get_lan('hotelRoomList').violationApple:get_lan('hotelRoomList').violation
			var lastTime=bedItem.PolicyTime==null?"18:00":bedItem.PolicyTime;//后台返回空时，默认18点
			var typeClass="hide";
			var cancelPolicy = '';
			if(ProfileInfo.onlineStyle!="APPLE" && bedItem.CancelPolicy){
				cancelPolicy = '<div class="cancelPolicy">'+bedItem.CancelPolicy+'</div>';
			}
			if(ProfileInfo.onlineStyle!="APPLE" && bedItem.FuXunPayType){
				if(bedItem.FuXunPayType=="到店付" || bedItem.FuXunPayType.indexOf("site")>-1){
					typeClass="paySelf"
				}
				if(bedItem.FuXunPayType=="公司支付" || bedItem.FuXunPayType.indexOf("Central")>-1){
					typeClass="payCompany"
				}
			}
			$(".bedList").eq(index).append('\
				<div class="bedLi flexRow ">\
				  <div style="width: 60px;margin-left: 16px;">'+item.BedType+'</div>\
				  <div style="width: 85px;margin-left: 50px;">'+bedItem.BreakFast+'</div>\
				  <div style="width: 50px;margin-left: 19px;">'+item.WLAN+'</div>\
				  <div style="width: 105px;margin-left: 5px;font-size: 18px;text-align: center;color: #'+DailyRateColor+';" class="'+shakeHands+'"><span class="hotelDailyRateText '+rateUnderline+'" roomInfo="'+item.HotelRoomType+','+bedItem.RatePlanCode+'">'+hotelDailyRate+'</span><span style="font-size:14px;margin-left:3px;">'+hotelDailyCurrency+'</span></div>\
				  <div class="violationIcon '+showViolation+'">'+violationText+'</div>\
				  <div class="bedLiPolicyRule '+PolicyRuleShow+' '+policyUnderline+' '+ruleMarginLeft+'" Policy="'+bedItem.Policy+'">'+bedItem.PolicyRule + cancelPolicy + '</div>\
				  <div class="bedLiPolicyRule '+freeCancel+' '+policyUnderline+' '+ruleMarginLeft+'" Policy="'+bedItem.Policy+'">'+cancelText+'</div>\
				  <div class="bedLiBookBody '+showBookBtn+'">\
				    <div class="bedLiBook '+hotelRoomFinish+' '+canNotBook+'" FuXunPayType="'+bedItem.FuXunPayType+'" GuestType="'+bedItem.GuestType+'" DailyRate="'+bedItem.DailyRate+'" TotalFare="'+bedItem.TotalFare+'" HotelRoomInfo="'+item.HotelRoomType+','+bedItem.RatePlanCode+','+s+'" LocalDailyRate="'+bedItem.LocalDailyRate+'" LocalCurrency="'+bedItem.LocalCurrency+'" LocalTotalFare="'+bedItem.LocalTotalFare+'" lastestTime="'+lastTime+'">'+bookHotelText+'</div>\
				    <div class="bedLiRateType '+showRate+'" Policy="'+bedItem.Policy+'"><span class="RateTypeText">'+RateType+'</span></div>\
				  </div>\
				  <div class="payType '+typeClass+'">'+bedItem.FuXunPayType+'</div>\
				  <div class="dailyRateBody" roomInfo="'+item.HotelRoomType+','+bedItem.RatePlanCode+'">\
				    <div class="dailyRateBodyTittle">'+get_lan('hotelRoomList').dailyRateBodyTittle1+' '+RateStartDate+' '+get_lan('hotelRoomList').dailyRateBodyTittle2+' '+RateEndDate+get_lan('hotelRoomList').dailyRateBodyTittle3+' '+bedItem.RateGroups.length+' '+get_lan('hotelRoomList').dailyRateBodyTittle4+'</div>\
				    <div class="dailyRateBodyContent flexWrap">\
				    '+dailyRateBodyString+'\
				    </div>\
				  </div>\
				</div>\
			')
			if(ProfileInfo.onlineStyle=="APPLE"){
			    $(".bedLiBook").css("border-radius","4px");
			}
			// 是否有协议酒店 IsManualAgreement 
			if(showBookBtn=="hide"){
				agreementHotelShow=true;
				if(agreementIndex==0){
					hotelInfo=item
					bedInfo=bedItem
					bedIndex=index
					agreementIndex++
					bedTotalFare=hotelDailyRate
				}
				// 隐藏所有协议酒店
				if(res.ManualHotelReferenceDisplay && agreementHotelShow){
					$(".hotelRoomLi").eq(index).hide()
				}
			}
		})
		// 协议酒店价格 ManualHotelReferenceDisplay==true
		
		// if(!res.ManualHotelReferenceDisplay || !agreementHotelShow){
		// // if(res.ManualHotelReferenceDisplay){
		// 	$('.agreementHotel').remove()
		// }else{
		// 	// 协议酒店 agreementHotel
		// 	// if(agreementHotelShow){
		// 		// $(".hotelRoomLi").eq(bedIndex).hide()
		// 		// 只有存在协议酒店时才显示上面的
		// 		// if(agreementIndex==0){
		// 			$('.agreementHotel').html('\
		// 				<div class="item companyLogo"><img src="../companyLogoImg/BCD.png"></div>\
		// 				<div class="item item1">'+hotelInfo.RoomTypeName.split('(')[0]+'</div>\
		// 				<div class="item item2"><img src="./images/hotelType/icon_bed_single_double.png"><div>'+get_lan('hotelRoomList').bedTypeList+'</div></div>\
		// 				<div class="item item3"><img src="./images/hotelType/icon_breakf_single.png"><div>'+bedInfo.BreakFast+'</div></div>\
		// 				<div class="item item4"><img src="./images/hotelType/icon_wifi.png"><div>'+hotelInfo.WLAN+'</div></div>\
		// 				<div class="item item5">'+bedTotalFare+'<span>'+hotelDailyCurrency+'</span></div>\
		// 				<div class="lineType"><img src="./images/icon_hotts.png">'+get_lan('hotelRoomList').agreementTips+'</div>\
		// 				<div class="agreementLabel">'+get_lan('hotelRoomList').companyAgreement+'</div>\
		// 			')
		// 			// 早餐
		// 			if(bedInfo.BreakFast=="单早" || bedInfo.BreakFast=="One Breakfast"){
		// 				$('.agreementHotel .item3 img').attr('src','./images/hotelType/icon_breakf_single.png')
		// 			}else if(bedInfo.BreakFast=="不含早" || bedInfo.BreakFast=="No Breakfast"){
		// 				$('.agreementHotel .item3 img').attr('src','./images/hotelType/icon_breakf_no.png')
		// 			}else if(bedInfo.BreakFast=="双早" || bedInfo.BreakFast=="Two Breakfast"){
		// 				$('.agreementHotel .item3 img').attr('src','./images/hotelType/icon_breakf_double.png')
		// 			}else{
		// 				$('.agreementHotel .item3 img').attr('src','./images/hotelType/icon_breakf_single.png')
		// 			}
		// 			// wifi
		// 			if(item.WLAN=="有"||item.WLAN=="包宽带" || item.WLAN=="Free"){
		// 				$('.agreementHotel .item4 img').attr('src','./images/hotelType/icon_wifi.png')
		// 			}else{
		// 				$('.agreementHotel .item4 img').attr('src','./images/hotelType/icon_wifi_no.png')
		// 			}
		// 			// 公司logo
		// 			// $('.companyLogo img').attr('src',$('.logoImg').css('background-image').split('\"')[1])
		// 			tools.isHasImg($('.logoImg').css('background-image').split('\"')[1],".companyLogo img")
		// 			// agreementIndex++
		// 		// }
		// 	// }
			
		// }
		
		
		$(".bedLiRateType,.bedLiPolicyRule").unbind("click").click(function(){
			if($(this).attr("Policy")!="null"){
				alert($(this).attr("Policy"));
			}
		})
		// $(".hotelDailyRateText").unbind("click").click(function(){
		// 	console.log($(this).attr("index"))
		// })
	})
	// 协议酒店
	if(!res.ManualHotelReferenceDisplay || !agreementHotelShow){
	// if(res.ManualHotelReferenceDisplay){
		$('.agreementHotel').remove()
	}else{
		//显示协议酒店时，隐藏价格,2020.05.22
		$('.hotelInfoPrice').remove()
		// 协议酒店 agreementHotel
		// if(agreementHotelShow){
			// 只隐藏第一个酒店
			// $(".hotelRoomLi").eq(bedIndex).hide()
			// 只有存在协议酒店时才显示上面的
			// if(agreementIndex==0){
				var agreementTips=hotelInfo.ManualAgreementRemark
				
				if(agreementTips=="" || agreementTips==null){
					agreementTips=get_lan('hotelRoomList').agreementTips
				}
				$('.agreementHotel').html('\
					<div class="item companyLogo"><img src="../companyLogoImg/BCD.png"></div>\
					<div class="item item1">'+hotelInfo.RoomTypeName.split('(')[0]+'</div>\
					<div class="item item2"><img src="./images/hotelType/icon_bed_single_double.png"><div>'+get_lan('hotelRoomList').bedTypeList+'</div></div>\
					<div class="item item3"><img src="./images/hotelType/icon_breakf_single.png"><div>'+bedInfo.BreakFast+'</div></div>\
					<div class="item item4"><img src="./images/hotelType/icon_wifi.png"><div>'+hotelInfo.WLAN+'</div></div>\
					<div class="item item5">'+bedTotalFare+'<span>'+hotelDailyCurrency+'</span></div>\
					<div class="lineType"><img src="./images/icon_hotts.png">'+agreementTips+'</div>\
					<div class="agreementLabel">'+get_lan('hotelRoomList').companyAgreement+'</div>\
				')
				// 早餐
				if(bedInfo.BreakFast=="不含早" || bedInfo.BreakFast=="No Breakfast"){
					$('.agreementHotel .item3 img').attr('src','./images/hotelType/icon_breakf_no.png')
				}else{
					$('.agreementHotel .item3 img').attr('src','./images/hotelType/icon_breakf_single.png')
				}
				// wifi
				if(hotelInfo.WLAN=="有"||hotelInfo.WLAN=="包宽带" || hotelInfo.WLAN=="Free" || hotelInfo.WLAN=="宽带"){
					$('.agreementHotel .item4 img').attr('src','./images/hotelType/icon_wifi.png')
				}else{
					$('.agreementHotel .item4 img').attr('src','./images/hotelType/icon_wifi_no.png')
				}
				// 公司logo
				// $('.companyLogo img').attr('src',$('.logoImg').css('background-image').split('\"')[1])
				tools.isHasImg($('.logoImg').css('background-image').split('\"')[1],".companyLogo img")
				// agreementIndex++
			// }
		// }
		
	}
	
	
	$(".hotelDailyRateText").hover(function(){
		if($(this).hasClass("rateUnderline")){
			for(var i=0;i<$(".dailyRateBody").length;i++){
				if($(".dailyRateBody").eq(i).attr("roomInfo")==$(this).attr("roomInfo")){
					$(".dailyRateBody").eq(i).css("display","block");
				}
			}
		}
	},function(){
	    $(".dailyRateBody").css("display","none");
	});
	//房间图片
	$(".roomImg").unbind("click").click(function(){
		// 新版
		var imgList={
			HotelImages:[]
		}
		var room=obtLanguage=="CN"?"房间":"Room"
		res.RoomTypes[parseInt($(this).attr('index'))].RoomImgs.map(function(item){
			imgList.HotelImages.push({
				ImageUrl: item,
				Type: "10",
				TypeDes: room,
			})
		})
		if(imgList.HotelImages==0){
			return false;
		}
		hotelImgPop(imgList);//酒店图片弹窗
		
		setTimeout(function(){
			$(".hotelImgPop").removeClass("hide");
			$("#cover").css("display","block");
			var h=$('.pic_pop').height()
		    var w=$('.pic_pop').width()
			// $('.pic_pop').css('margin-left',-w/2+'px')
			// $('.pic_pop').css('margin-top',-h/2+'px')
		},50)
	})
	
	//酒店提前天数提醒
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/QueryService.svc/QueryDateLimit",
			jsonStr: '{"id":' + netUserId + ',"Language":"' + obtLanguage + '"}'
		},
		success: function(data) {
			var res = JSON.parse(data);
			console.log(res);
			res.map(function(item) {
				if (item.LimitType == 3) {
					$(".hotelRoomSearchBtn").attr("CanSearch", item.CanSearch);
					$(".hotelRoomSearchBtn").attr("StartLimit", item.StartLimit);
					$(".hotelRoomSearchBtn").attr("Message", item.Message);
				}
			})
		},
		error: function() {
			// alert('fail');
		}
	});
	//搜索酒店
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
	$(".hotelRoomSearchBtn").unbind("click").click(function(){
		
		if ($(this).attr("startlimit") && parseInt($(this).attr("startlimit")) > 0) {
			if (datedifference(getNowFormatDate(), $('#checkInDate').val()) < parseInt($(this).attr("startlimit"))) {
				if ($(this).attr("Message").indexOf("\\n") != -1) {
					var mymessage = confirm($(this).attr("Message").split("\\n").join('\n'));
				} else {
					var mymessage = confirm($(this).attr("Message"));
				}
				if (mymessage == true) {
					if ($(this).attr("CanSearch") != "true") {
						return false;
					}
				} else {
					return false;
				}
			}
		}
		
		var queryKeyList = hotelDetailInfo.queryKey.split(',');
		queryKeyList[0] = $("#checkInDate").val();
		queryKeyList[1] = $("#checkOutDate").val();
		$(".hotelTab").eq(0).click();
		$('.hotelRoomList').html('');
		$('.hotelRoomBody').mLoading("show");
		hotelDetailInfo.queryKey = queryKeyList.join(',');
		$.session.set('hotelDetailInfo', JSON.stringify(hotelDetailInfo));
		$.ajax(
		  {
		    type:'post',
		    url : $.session.get('ajaxUrl'), 
		    dataType : 'json',
		    data:{
		    	url: $.session.get('obtCompany')+"/QueryService.svc/QueryHotelDetailPost",
		    	jsonStr:'{"queryKey":"'+queryKeyList.join(',')+'","id":'+netUserId+',"Language":"'+obtLanguage+'"}'
		    },
		    success : function(data) {
		    	$('.hotelRoomBody').mLoading("hide");
		    	var res = JSON.parse(data);
				console.log(res);
				if(res.CheckIn){
					hotelRoomList(res);
				}else{
					console.log('cannot find the result');
				}
		    },
		    error : function() {
		      // alert('fail');
		    } 
		  }
		);
	})
	$(".bedLiBook").unbind("click").click(function(){
		queryKeyList = JSON.parse($.session.get('hotelDetailInfo')).queryKey.split(',');
		var hotelChooseInfo = {
	        'queryKey':queryKeyList[0]+','+queryKeyList[1]+','+queryKeyList[2]+','+$(this).attr("HotelRoomInfo"),
	        'GuestType':$(this).attr("GuestType"),
	        'TotalFare':$(this).attr("TotalFare"),
	        'DailyRate':$(this).attr("DailyRate"),
	        'LocalDailyRate':$(this).attr("LocalDailyRate"),
	        'LocalCurrency':$(this).attr("LocalCurrency"),
	        'LocalTotalFare':$(this).attr("LocalTotalFare"),
			'lastestTime':$(this).attr("lastestTime"),
			'FuXunPayType':$(this).attr("FuXunPayType"),
			
	    }
	    $.session.set('hotelChooseInfo', JSON.stringify(hotelChooseInfo));
		window.location.href='../../hotel/bookHotelRoom.html';
	})
	$(".hotelRoomFinish,.canNotBook").unbind('click');
}
/*服务列表*/
function serviceList(res){
	$(".hotelIntroBody").html('\
		<div class="serviceTittle">'+get_lan('hotelIntroBody').LeisureService+'</div>\
		<div class="serviceBody">'+res.LeisureService+'</div>\
		<div class="serviceTittle">'+get_lan('hotelIntroBody').MeetingService+'</div>\
		<div class="serviceBody">'+res.MeetingService+'</div>\
		<div class="serviceTittle">'+get_lan('hotelIntroBody').HotelService+'</div>\
		<div class="serviceBody">'+res.HotelService+'</div>\
		<div class="serviceTittle">'+get_lan('hotelIntroBody').FoodService+'</div>\
		<div class="serviceBody">'+res.FoodService+'</div>\
	')
}
// 删除周边交通
// <div class="serviceTittle">'+get_lan('hotelIntroBody').TrafficInfo+'</div>
// 		<div class="serviceBody">'+res.TrafficInfo+'</div>
/*酒店评论列表*/
function commentList(res){
	res.map(function(item,index){
		if(item.nameEN!="Anonymous"){
			var name = obtLanguage=="CN"?'*'+item.nameCN.substring(1,item.nameCN.length):'*'+item.nameEN.split('/')[1];
		}else{
			var name = obtLanguage=="CN"?item.nameCN:item.nameEN;
		}
		$(".commentListBody").append('\
			<div class="commentListLi flexRow">\
			  <div class="commentListLiName">'+name+'</div>\
			  <div class="commentListLiBody">\
			    <div class="commentListLiDate">'+item.dateTime+'</div>\
			    <div class="commentListLiStar"></div>\
			    <div class="commentListLiContent">'+item.ratingContent+'</div>\
			  </div>\
			</div>\
		')
		switch(parseInt(item.ratingAvg))
		{
		case 0:
		  $(".commentListLiStar").eq(index).css("width","0px");
		  break;
		case 1:
		  $(".commentListLiStar").eq(index).css("width","16px");
		  break;
		case 2:
		  $(".commentListLiStar").eq(index).css("width","32px");
		  break;
		case 3:
		  $(".commentListLiStar").eq(index).css("width","48px");
		  break;
		case 4:
		  $(".commentListLiStar").eq(index).css("width","64px");
		  break;
		case 5:
		  $(".commentListLiStar").eq(index).css("width","80px");
		  break;
		default:
		  $(".commentListLiStar").eq(index).css("width","0px");
		  break;
		}
	})
}
function getNextDay(d){
    d = new Date(d);
    d = +d + 1000*60*60*24;
    d = new Date(d);
	var day = d.getDate()<10?'0'+d.getDate():d.getDate();
	var month = ("00"+(d.getMonth()+1)).substr(-2);
    //格式化
    return d.getFullYear()+"-"+month+"-"+day;
}
function getWeek(dateStr){
    var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
    return get_lan('hotelRoomList').weekDay.split(',')[myDate.getDay()];
}