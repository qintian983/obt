var netUserId = $.session.get('netLoginId');
var obtLanguage = $.session.get('obtLanguage');
var isReturn = tools.queryString().isReturn;
var searchHotelInfo = JSON.parse($.session.get('searchHotelInfo'));
console.log(searchHotelInfo);
var TAorderNo = $.session.get('TAorderNo');
var queryKey = searchHotelInfo.queryKey;
var queryKeyList = queryKey.split(",");
queryKeyList[12] = "2500";
var NotNeedGaranteeQueryKey = queryKeyList.join(",")+',1';

// 有TA单时，时间进行限制
	var TAnumber = $.session.get('TAnumber');
	var TAminDate=0,TAmaxDate=365
	if(TAnumber!=undefined && TAnumber!="" && $.session.get('goOnBooktravelInfo')!=undefined && $.session.get('goOnBooktravelInfo')!=""){
		var goOnBooktravelInfo=JSON.parse($.session.get('goOnBooktravelInfo'));
		TAminDate=goOnBooktravelInfo.starTime.split(" ")[0]
		TAmaxDate=goOnBooktravelInfo.endTime.split(" ")[0]
		var minTime=new Date().getTime()
		var minTime2
		if(TAminDate==0){
			minTime2=new Date().getTime()
		}else{
			minTime2=new Date(TAminDate.replace(/-/g,"/")).getTime()
		}
		TAminDate=minTime<minTime2?TAminDate:new Date()
	}
	
// 缓存酒店列表
var cacheHotelList=[]
	//页数,默认是2
	var pageIndex=2;
	// 是否有下一页,GUID
	var SabreShopKey =''
	// 是否正在加载下一页
	var getNextPage=false;
// 缓存列表信息
var resAll=''
//防抖函数
function debounce(func, delay) {
	var delay = delay || 200;
	var timeout = null;
	return function () {
		clearTimeout(timeout);
		timeout = setTimeout(function(){
			func.apply(this, arguments);
		}, delay);
	};
}
//中英文对象
var cn = {
    "progressBar":{
        "search":"查询",
        "book":"预订",
        "complete":"完成",
    },
    "searchBody":{
        "condition":"条件",
        "hotelCity":"入住城市",
        "hotelCityInput":"请输入入住城市",
        'hotelCheckInDate':'入住日期',
        'hotelCheckOutDate':'离店日期',
        "hotelAddress":"酒店地址",
        'hotelKeyWords':'关键字',
        'hotelKeyInput':'(选填)酒店名/地标/商圈/地铁线',
        "star":"星级",
        "allStar":"不限",
        "star12":"二星级及以下/经济",
        "star3":"三星级/舒适",
        "star4":"四星级/高档",
        "star5":"五星级/奢华",
        "price":"价格",
        "search":"查询",
    },
    'keyWordBody':{
        'hotel':'推荐酒店',
        'brand':'品牌',
        'district':'行政区',
        'commercial':'商圈',
        'extCommercial':'附属商圈',
        'keywordHotel': '热门',
		'keywordBrand': '品牌',
		'keywordDistrict': '行政区',
		'keywordCommercial': '商圈',
		'keywordExtCommercial': '附属商圈',
    },
    "hotelList":{
        "distance1":"距离目的地",
        "distance2":"公里",
        "address":"酒店地址： ",
        "telephone":"电话：  ",
        "comment":"条评论",
        "fantastic":"极赞",
        "wonderful":"超棒",
        "great":"很好",
        "good":"不错",
        "lowest":"起",
        "search":"查看详情",
        "protocol":"协议酒店",
        // "protocol2":"客户优选",
        "protocol2":"公司优选",
        "allMapBtn":"查看地图",
		"noTax":"不含税",
    },
    "hotelChooseBody":{
    	"remind":"差旅政策：您做选择的城市酒店预算为",
    },
    "siftBody":{
        "sort":"排序：",
    	"recommend":"推荐",
    	"score":"评分",
    	"star":"星级",
        "distance":"距离",
    	"price":"价格",
        "filter":"筛选：",
        "breakfast":"含早餐",
        "freeCancel":"免费取消",
        "noGuarantee":"免担保",
        "protocol":"协议酒店",
        "companyBill":"公司支付"
    },
    "hotelsNumber":{
        "hotelsNumber1":"根据您的需求，共有",
        "hotelsNumber2":"家酒店供您选择",
    },
    'searchRemind':'请正确填写！',
    'points':" 分",
}
var en = {
    "progressBar":{
        "search":"Search",
        "book":"Book",
        "complete":"Complete",
    },
    "searchBody":{
        "condition":"Condition",
        "hotelCity":"Destination",
        "hotelCityInput":"Please enter the city for checking in.",
        'hotelCheckInDate':'Check-in',
        'hotelCheckOutDate':'Check-out',
        "hotelAddress":"Hotel Address",
        'hotelKeyWords':'Keywords',
        'hotelKeyInput':'Hotel Name/Landmark/Business Circle/Metro Line',
        "star":"Star",
        "allStar":"No Limit",
        "star12":"1-star&2-star/economy",
        "star3":"3-star/comfortable",
        "star4":"4-star/upscale",
        "star5":"5-star/deluxe",
        "price":"Price",
        "search":"Search",
    },
    'keyWordBody':{
        'hotel':'Recommended Hotel',
        'brand':'Brand',
        'district':'District',
        'commercial':'Commercial',
        'extCommercial':'ExtCommercial',
        'keywordHotel': 'Top',
		'keywordBrand': 'Brand',
		'keywordDistrict': 'District',
		'keywordCommercial': 'Business Area',
		'keywordExtCommercial': 'Land Mark',
    },
    "hotelList":{
        "distance1":"Distance to destination",
        "distance2":"Km",
        "address":"Hotel Address： ",
        "telephone":"Telephone： ",
        "comment":"Comment",
        "fantastic":"Fantastic",
        "wonderful":"Wonderful",
        "great":"Great",
        "good":"Good",
        "lowest":"Up",
        "search":"View Details",
        "protocol":"Corporate",
        "protocol2":"Most preferred",
        "allMapBtn":"View Map",
		"noTax":"Tax Exclusive",
    },
    "hotelChooseBody":{
        "remind":"The city cap is approx ",
    },
    "siftBody":{
    	"sort":"Sort:",
        "recommend":"Recommend",
        "score":"Score",
        "star":"Star",
        "distance":"Distance",
        "price":"Price",
        "filter":"Filter：",
        "breakfast":"Breakfast",
        "freeCancel":"Free Cancellation",
        "noGuarantee":"Without Guarantee",
        "protocol":"Corporate",
        "companyBill":"Company Bill"

    },
    "hotelsNumber":{
        "hotelsNumber1":"According to your needs, there are",
        "hotelsNumber2":"hotels",
    },
    'searchRemind':'Please fill in correctly!',
    'points':" Points",
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
   hotelList();//酒店列表
})
//内容展示
function showContent(){
    $("#main").html('\
        <div id="cover"></div>\
        <div class="autoCenter">\
            <div class="mapBody hide">\
              <div id="mapTittle"><span class="mapTittleText">x</span></div>\
              <div id="map"></div>\
            </div>\
            <div class="progressBar flexRow"></div>\
            <div class="searchBody"></div>\
			<div class="picBody"><img class="picGroupImg" src="../staticFile/query.png"/><a class="picHref" target="_blank" href=""></a></div>\
            <div class="infoBody">\
              <div class="hotelChooseBody flexRow"></div>\
              <div class="siftBody flexRow"></div>\
            </div>\
            <div class="hotelsNumber flexRow mainFontColor"></div>\
            <div class="hotelList"></div>\
           <div class="listEnd"><span class="loadingSpan"></span><span class="textSpan">正在加载...</span></div>\
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
        <div class="progressLine progressBackColor"></div><div class="progressCircle progressBackColor"></div>'+get_lan('progressBar').book+'\
        <div class="progressLine progressBackColor"></div><div class="progressCircle progressBackColor"></div>'+get_lan('progressBar').complete+'\
        ')
    $(".hotelChooseBody").html('\
        '+get_lan('hotelChooseBody').remind+'<span class="policyPrice"></span><span class="unit" style="margin-left:5px"></span>\
        ')
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/QueryService.svc/GetHotelPolicyPricePost",
            jsonStr:'{"cityCode":"'+searchHotelInfo.hotelCode+'","id":'+netUserId+',"checkIn":"'+queryKeyList[4]+'","checkOut":"'+queryKeyList[5]+'"}'
        },
        success : function(data) {
            var res = JSON.parse(data);
            console.log(res);
            if(parseInt(res.maxFare)!=0){
                $(".policyPrice").text(parseInt(res.maxFare)-1);
                $(".unit").text(res.Unit);
            }else{
                $(".policyPrice").text(parseInt(res.maxFare));
				$('.hotelChooseBody').addClass('hide')
            }
            // $(".searchMaxPrice").val(res.maxFare);
        },
        error : function() {
          // alert('fail');
        }
      }
    );
    // <div class="flexRow" style="width:300px;">\
    //   <span style="margin:0 15px 0 15px;">'+get_lan('searchBody').hotelKeyWords+'</span>\
    //   <input type="text" id="keyWordInput" placeholder="'+get_lan('searchBody').hotelKeyInput+'" readonly>\
    // </div>\
    //查询模块
	
	// 12.24 hotelPriceBtn  删除币种
    $(".searchBody").html('\
        <div class="searchConditionBody flexRow" style="height:50px;line-height:50px;font-size:14px;">\
          <div class="flexRow" style="width:230px;">\
            <span style="margin:0 10px 0 10px;">'+get_lan('searchBody').hotelCity+'</span>\
            <input type="text" id="hotelCity" autocomplete="off" placeholder="'+get_lan('searchBody').hotelCityInput+'">\
          </div>\
          <div class="flexRow" style="width:220px;">\
            <span style="margin:0 10px 0 10px;">'+get_lan('searchBody').hotelCheckInDate+'</span>\
            <input type="text" id="hotelDepartureDate" readonly="readonly">\
          </div>\
          <div class="flexRow" style="width:220px;">\
            <span style="margin:0 10px 0 10px;">'+get_lan('searchBody').hotelCheckOutDate+'</span>\
            <input type="text" id="hotelReturnDate" readonly="readonly">\
          </div>\
          <div class="flexRow" style="width:240px;">\
            <span style="margin:0 10px 0 10px;">'+get_lan('searchBody').hotelAddress+'</span>\
            <div class="hotelAddressBody">\
              <input type="text" id="hotelAddress" autocomplete="off">\
              <select id="hotelAddressSelect"></select>\
            </div>\
          </div>\
          <div class="flexRow" style="width:300px;">\
            <span style="margin:0 10px 0 10px;">'+get_lan('searchBody').hotelKeyWords+'</span>\
            <input type="text" id="keyWordInput" autocomplete="off">\
          </div>\
          <div class="keyWordBody"></div>\
        </div>\
        <div class="searchStarBody flexRow" style="height:50px;line-height:50px;font-size:14px;">\
          <div style="width:85px;background-color:#d8d8d8;text-align:center;">\
            '+get_lan('searchBody').star+'\
          </div>\
          <div class="hotelStarBtn starChoose" star="1-2-3-4-5">'+get_lan('searchBody').allStar+'</div>\
          <div class="hotelStarBtn" star="1-2">'+get_lan('searchBody').star12+'</div>\
          <div class="hotelStarBtn" star="3">'+get_lan('searchBody').star3+'</div>\
          <div class="hotelStarBtn" star="4">'+get_lan('searchBody').star4+'</div>\
          <div class="hotelStarBtn" star="5">'+get_lan('searchBody').star5+'</div>\
        </div>\
        <div class="searchPriceBody flexRow" style="height:50px;line-height:50px;font-size:14px;">\
          <div style="width:85px;background-color:#d8d8d8;text-align:center;">\
            '+get_lan('searchBody').price+'\
          </div>\
          <div class="hotelPriceBtn" minPrice="0" maxPrice="5000">'+get_lan('searchBody').allStar+'</div>\
          <div class="hotelPriceBtn" id="price1" minPrice="0" maxPrice="150">0-150</div>\
          <div class="hotelPriceBtn" id="price2" minPrice="150" maxPrice="300">150-300</div>\
          <div class="hotelPriceBtn" id="price3" minPrice="300" maxPrice="450">300-450</div>\
          <div class="hotelPriceBtn" id="price4" minPrice="450" maxPrice="600">450-600</div>\
          <div class="hotelPriceBtn" id="price5" minPrice="600" maxPrice="1000">600-1000</div>\
          <div class="hotelPriceBtn" id="price6" minPrice="1000" maxPrice="5000">1000-5000</div>\
          <input type="text" value="0" class="searchMinPrice">\
          <div style="height:23px;width:30px;border-bottom:2px solid #979797"></div>\
          <input type="text" value="700" class="searchMaxPrice">\
          <div class="searchHotelBtn btnBackColor" state="domHotel">'+get_lan('searchBody').search+'</div>\
        </div>\
        ')
    $(".searchMinPrice").val(queryKeyList[7]);
    $(".searchMaxPrice").val(queryKeyList[8]);
    
	//默认选择星级
	var choosedStars = queryKey.split(',')[6]
	if(choosedStars=="0-1-2-3-4-5"){
		$('.hotelStarBtn').removeClass('starChoose')
		$('.hotelStarBtn').eq(0).addClass('starChoose')
	}else{
		$('.hotelStarBtn').removeClass('starChoose')
		if(choosedStars.indexOf('1-2')>-1){//二星级以及一下
			$('.hotelStarBtn').eq(1).addClass('starChoose')
		}
		if(choosedStars.indexOf('3')>-1){//三星级
			$('.hotelStarBtn').eq(2).addClass('starChoose')
		}
		if(choosedStars.indexOf('4')>-1){//四星级
			$('.hotelStarBtn').eq(3).addClass('starChoose')
		}
		if(choosedStars.indexOf('5')>-1){//五星级
			$('.hotelStarBtn').eq(4).addClass('starChoose')
			
		}
	}
    $("#hotelAddress").on('input propertychange',function(){
        $("#hotelAddress").removeAttr("key");
    })
    if(searchHotelInfo.hotelState=="intlHotel"){
        $("#hotelCity").removeAttr("id").attr("id","hotelIntlCity");
        $("#hotelIntlCity").val(searchHotelInfo.hotelCityText);
        $("#hotelIntlCity").attr("code",searchHotelInfo.hotelCode);
        $("#hotelIntlCity").kuCity();
        $(".searchHotelBtn").attr("state","intlHotel");
		// 12.25修改  删除币种
		$('#price1').text("0-150")
		$('#price2').text("150-300")
		$('#price3').text("300-450")
		$('#price4').text("450-600")
		$('#price5').text("600-1000")
		$('#price6').text("1000-5000")
		
    }
    //关键字
    $("#keyWordInput").attr("key",queryKeyList[2]);
    $("#keyWordInput").val(searchHotelInfo.hotelKeyWordText);
    // $("#keyWordInput").unbind("click").click(function(){
    //     if($(".searchHotelBtn").attr("state")=="domHotel"){
    //         var hotelCityCode = $('#hotelCity').attr("code");
    //     }else if($(".searchHotelBtn").attr("state")=="intlHotel"){
    //         var hotelCityCode = $('#hotelIntlCity').attr("code");
    //     }
    //     if(!hotelCityCode){
    //         $(".keyWordBody").html('');
    //         alert(get_lan('searchBody').keyWordRemind);
    //     }else{
    //         $("#keyWordInput").on('input propertychange',function(){
    //             $(".keyWordBody").html("");
    //             $.ajax(
    //               { 
    //                 type:'post', 
    //                 url : $.session.get('ajaxUrl'),
    //                 dataType : 'json',
    //                 data:{
    //                     url: $.session.get('obtCompany')+"/QueryService.svc/SearchHotelRelatedInfoPost",
    //                     jsonStr:'{"cityCode":"'+hotelCityCode+'","id":'+netUserId+',"language":"'+obtLanguage+'","queryKey":"'+$("#keyWordInput").val()+'"}'
    //                 },
    //                 success : function(data) {
    //                     var res = JSON.parse(data);
    //                     // console.log(res);
    //                     $(".keyWordBody").html('<ul class="keyWordBodyList"></ul>');
    //                     res.RelatedInfos.map(function(item){
    //                         $(".keyWordBodyList").append('\
    //                             <li class="keyWordBodyLi" type="'+item.Type+'" relationId="'+item.ID+'" key="'+item.Key+'">'+item.Content+'</li>\
    //                             ')
    //                     })
    //                     $(".keyWordBodyLi").on('mousedown',function(){
    //                         $("#keyWordInput").val($(this).text());
    //                         $("#keyWordInput").attr("relationId",$(this).attr("relationId"));
    //                         $("#keyWordInput").attr("hoteltype",$(this).attr("type"));
    //                         $("#keyWordInput").attr("key",$(this).attr("key"));
    //                         $(".keyWordBody").hide();
    //                     })
    //                 },
    //                 error : function() {
    //                   // alert('fail');
    //                 } 
    //               } 
    //             );
    //         })
    //         $('body').mLoading("show");
    //         $.ajax(
    //           { 
    //             type:'post', 
    //             url : $.session.get('ajaxUrl'),
    //             dataType : 'json',
    //             data:{
    //                 url: $.session.get('obtCompany')+"/QueryService.svc/GetHotelRelatedInfoPost",
    //                 jsonStr:'{"cityCode":"'+hotelCityCode+'","id":'+netUserId+',"language":"'+$.session.get('obtLanguage')+'"}'
    //             },
    //             success : function(data) {
    //                 $('body').mLoading("hide");
    //                 var res = JSON.parse(data);
    //                 console.log(res);
    //                 //推荐酒店
    //                 var hotelLength = res.HistoryHotelList.length>4?4:res.HistoryHotelList.length;
    //                 var hotelStr = '';
    //                 for(var i=0;i<hotelLength;i++){
    //                     if(obtLanguage=="CN"){
    //                         hotelStr+='<div class="relationLi" style="width:48%;" type="'+res.HistoryHotelList[i].Type+'" relationId="'+res.HistoryHotelList[i].ID+'" key="'+res.HistoryHotelList[i].NameCn+'">'+res.HistoryHotelList[i].NameCn+'</div>';
    //                     }else if(obtLanguage=="EN"){
    //                         hotelStr+='<div class="relationLi" style="width:48%;" type="'+res.HistoryHotelList[i].Type+'" relationId="'+res.HistoryHotelList[i].ID+'" key="'+res.HistoryHotelList[i].NameCn+'">'+res.HistoryHotelList[i].NameEn+'</div>';
    //                     }
    //                 }
    //                 //品牌
    //                 var brandLength = res.BrandList.length>8?8:res.BrandList.length;
    //                 var brandStr = '';
    //                 for(var i=0;i<brandLength;i++){
    //                     if(obtLanguage=="CN"){
    //                         brandStr+='<div class="relationLi" type="'+res.BrandList[i].Type+'" relationId="'+res.BrandList[i].ID+'" key="'+res.BrandList[i].NameCn+'">'+res.BrandList[i].NameCn+'</div>';
    //                     }else if(obtLanguage=="EN"){
    //                         brandStr+='<div class="relationLi" type="'+res.BrandList[i].Type+'" relationId="'+res.BrandList[i].ID+'" key="'+res.BrandList[i].NameCn+'">'+res.BrandList[i].NameEn+'</div>';
    //                     }
    //                 }
    //                 //行政区
    //                 var districtLength = res.DistrictList.length>8?8:res.DistrictList.length;
    //                 var districtStr = '';
    //                 for(var i=0;i<districtLength;i++){
    //                     if(obtLanguage=="CN"){
    //                         districtStr+='<div class="relationLi" type="'+res.DistrictList[i].Type+'" relationId="'+res.DistrictList[i].ID+'" key="'+res.DistrictList[i].NameCn+'">'+res.DistrictList[i].NameCn+'</div>';
    //                     }else if(obtLanguage=="EN"){
    //                         districtStr+='<div class="relationLi" type="'+res.DistrictList[i].Type+'" relationId="'+res.DistrictList[i].ID+'" key="'+res.DistrictList[i].NameCn+'">'+res.DistrictList[i].NameEn+'</div>';
    //                     }
    //                 }
    //                 //商圈
    //                 var commercialLength = res.CommercialList.length>8?8:res.CommercialList.length;
    //                 var commercialStr = '';
    //                 for(var i=0;i<commercialLength;i++){
    //                     if(obtLanguage=="CN"){
    //                         commercialStr+='<div class="relationLi" type="'+res.CommercialList[i].Type+'" relationId="'+res.CommercialList[i].ID+'" key="'+res.CommercialList[i].NameCn+'">'+res.CommercialList[i].NameCn+'</div>';
    //                     }else if(obtLanguage=="EN"){
    //                         commercialStr+='<div class="relationLi" type="'+res.CommercialList[i].Type+'" relationId="'+res.CommercialList[i].ID+'" key="'+res.CommercialList[i].NameCn+'">'+res.CommercialList[i].NameEn+'</div>';
    //                     }
    //                 }
    //                 //附属商圈
    //                 var extCommercialLength = res.ExtCommercialList.length>8?8:res.ExtCommercialList.length;
    //                 var extCommercialStr = '';
    //                 for(var i=0;i<extCommercialLength;i++){
    //                     if(obtLanguage=="CN"){
    //                         extCommercialStr+='<div class="relationLi" type="'+res.ExtCommercialList[i].Type+'" relationId="'+res.ExtCommercialList[i].ID+'" key="'+res.ExtCommercialList[i].NameCn+'">'+res.ExtCommercialList[i].NameCn+'</div>';
    //                     }else if(obtLanguage=="EN"){
    //                         extCommercialStr+='<div class="relationLi" type="'+res.ExtCommercialList[i].Type+'" relationId="'+res.ExtCommercialList[i].ID+'" key="'+res.ExtCommercialList[i].NameCn+'">'+res.ExtCommercialList[i].NameEn+'</div>';
    //                     }
    //                 }
    //                 $(".keyWordBody").html('\
    //                     <div class="relationBody">\
    //                       <div class="relationTittle flexRow">\
    //                         <div style="width:50%">'+get_lan('keyWordBody').hotel+'</div>\
    //                       </div>\
    //                       <div class="relationContent flexWrap">\
    //                         '+hotelStr+'\
    //                       </div>\
    //                     </div>\
    //                     <div class="relationBody">\
    //                       <div class="relationTittle flexRow">\
    //                         <div style="width:20%">'+get_lan('keyWordBody').brand+'</div>\
    //                       </div>\
    //                       <div class="relationContent flexWrap">\
    //                         '+brandStr+'\
    //                       </div>\
    //                     </div>\
    //                     <div class="relationBody">\
    //                       <div class="relationTittle flexRow">\
    //                         <div style="width:20%">'+get_lan('keyWordBody').district+'</div>\
    //                       </div>\
    //                       <div class="relationContent flexWrap">\
    //                         '+districtStr+'\
    //                       </div>\
    //                     </div>\
    //                     <div class="relationBody">\
    //                       <div class="relationTittle flexRow">\
    //                         <div style="width:20%">'+get_lan('keyWordBody').commercial+'</div>\
    //                       </div>\
    //                       <div class="relationContent flexWrap">\
    //                         '+commercialStr+'\
    //                       </div>\
    //                     </div>\
    //                     <div class="relationBody">\
    //                       <div class="relationTittle flexRow">\
    //                         <div style="width:20%">'+get_lan('keyWordBody').extCommercial+'</div>\
    //                       </div>\
    //                       <div class="relationContent flexWrap">\
    //                         '+extCommercialStr+'\
    //                       </div>\
    //                     </div>\
    //                 ')
    //                 $(".relationLi").on('mousedown',function(){
    //                     $("#keyWordInput").val($(this).text());
    //                     $("#keyWordInput").attr("relationId",$(this).attr("relationId"));
    //                     $("#keyWordInput").attr("hoteltype",$(this).attr("type"));
    //                     $("#keyWordInput").attr("key",$(this).attr("key"));
    //                     $(".keyWordBody").hide();
    //                 })
    //             },
    //             error : function() {
    //               // alert('fail'); 
    //             } 
    //           } 
    //         );
    //     }
    // })

    $("#keyWordInput").unbind("click").click(function() {
		if ($(".searchHotelBtn").attr("state") == "domHotel") {
			var hotelCityCode = $('#hotelCity').attr("code");
		} else if ($(".searchHotelBtn").attr("state") == "intlHotel") {
			var hotelCityCode = $('#hotelIntlCity').attr("code");
		}
		if (!hotelCityCode) {
			$(".keyWordBody").html('');
			alert(get_lan('searchBody').keyWordRemind);
		} else {
			$("#keyWordInput").on('input propertychange', function() {
				debounceSearchHotel();
			})
			var debounceSearchHotel = debounce(searchHotel,500);
			function searchHotel(){
				$(".keyWordBody").html("");
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/QueryService.svc/SearchHotelRelatedInfoPost",
						jsonStr: '{"cityCode":"' + hotelCityCode + '","id":' + netUserId + ',"language":"' + obtLanguage +
							'","queryKey":"' + $("#keyWordInput").val() + '"}'
					},
					success: function(data) {
						var res = JSON.parse(data);
						console.log(res);
						$(".keyWordBody").html('<ul class="keyWordBodyList"></ul>');
						res.RelatedInfos.map(function(item) {
							var keyWordType = '', keyWordTypeText = '';
							switch(parseInt(item.Type)){
								case 1: 
									keyWordType = 'keywordTitle--district'; 
									keyWordTypeText = get_lan('keyWordBody').keywordDistrict; 
									break;
								case 2: 
									keyWordType = 'keywordTitle--commercial';
									keyWordTypeText = get_lan('keyWordBody').keywordCommercial; 
									break;
								case 3: 
									keyWordType = 'keywordTitle--extCommercial';
									keyWordTypeText = get_lan('keyWordBody').keywordExtCommercial; 
									break;
								case 4: 
									keyWordType = 'keywordTitle--brand';
									keyWordTypeText = get_lan('keyWordBody').keywordBrand; 
									break;
								case 5: 
									keyWordType = 'keywordTitle--hotel';
									keyWordTypeText = get_lan('keyWordBody').keywordHotel; 
									break;
								default: 
									keyWordType = '';
									keyWordTypeText = ''; 
									break;
							}
							var contentDom = "<span class='content'>"+item.Content.replace($('#keyWordInput').val(),"<b>"+$('#keyWordInput').val()+"</b>")+"</span>";
							var keyWordTypeHTML = '<span class="keyWordBodyLi--type">'+keyWordTypeText+'</span>';
							$(".keyWordBodyList").append('\
                                <li class="keyWordBodyLi ' + keyWordType +'" type="' +
								item.Type + '" relationId="' + item.ID + '" key="' + item.Key + '">' + contentDom + keyWordTypeHTML +
								'</li>\
                                ')
						})
						$(".keyWordBodyLi").on('mousedown', function() {
							$("#keyWordInput").val($(this).find('.content').text());
							$("#keyWordInput").attr("relationId", $(this).attr("relationId"));
							$("#keyWordInput").attr("hoteltype", $(this).attr("type"));
							$("#keyWordInput").attr("key", $(this).attr("key"));
							$(".keyWordBody").hide();
						})
					},
					error: function() {
						// alert('fail');
					}
				});
			}
			$('body').mLoading("show");
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/QueryService.svc/GetHotelRelatedInfoPost",
					jsonStr: '{"cityCode":"' + hotelCityCode + '","id":' + netUserId + ',"language":"' + $.session.get(
						'obtLanguage') + '"}'
				},
				success: function(data) {
					$('body').mLoading("hide");
					var res = JSON.parse(data);
					console.log(res);
					//推荐酒店
					var hotelLength = res.HistoryHotelList.length > 4 ? 4 : res.HistoryHotelList.length;
					var hotelStr = '';
					for (var i = 0; i < hotelLength; i++) {
						if (obtLanguage == "CN") {
							hotelStr += '<div class="relationLi" type="' + res.HistoryHotelList[i].Type +
								'" relationId="' + res.HistoryHotelList[i].ID + '" key="' + res.HistoryHotelList[i].NameCn + '">' + res.HistoryHotelList[
									i].NameCn + '</div>';
						} else if (obtLanguage == "EN") {
							hotelStr += '<div class="relationLi" type="' + res.HistoryHotelList[i].Type +
								'" relationId="' + res.HistoryHotelList[i].ID + '" key="' + res.HistoryHotelList[i].NameCn + '">' + res.HistoryHotelList[
									i].NameEn + '</div>';
						}
					}
					
					var brandLength = res.BrandList.length > 10 ? 10 : res.BrandList.length;
					var districtLength = res.DistrictList.length > 10 ? 10 : res.DistrictList.length;
					var commercialLength = res.CommercialList.length > 10 ? 10 : res.CommercialList.length;
					var extCommercialLength = res.ExtCommercialList.length > 10 ? 10 : res.ExtCommercialList.length;

					function moreBtn(cls){
						return '<div class="moreBtn '+cls+'">More</div>'
					}
					var brandMore = res.BrandList.length > 10 ? moreBtn('brand') : '';
					var districtMore = res.DistrictList.length > 10 ? moreBtn('district') : '';
					var commercialMore = res.CommercialList.length > 10 ? moreBtn('commercial') : '';
					var extCommercialMore = res.ExtCommercialList.length > 10 ? moreBtn('extCommercial') : '';

					var keyWordsIndexNormal = {
						brandLength:brandLength, 
						districtLength:districtLength,
						commercialLength:commercialLength,
						extCommercialLength:extCommercialLength
					}
					var keyWordsIndexPopWindow = {
						brandLength:res.BrandList.length, 
						districtLength:res.DistrictList.length,
						commercialLength:res.CommercialList.length,
						extCommercialLength:res.ExtCommercialList.length
					}
					function getKeyWordsDom(lengthObj){
						//品牌
						var brandStr = '';
						for (var i = 0; i < lengthObj.brandLength; i++) {
							if (obtLanguage == "CN") {
								brandStr += '<div class="relationLi" type="' + res.BrandList[i].Type + '" relationId="' + res.BrandList[i].ID +
									'" key="' + res.BrandList[i].NameCn + '">' + res.BrandList[i].NameCn + '</div>';
							} else if (obtLanguage == "EN") {
								brandStr += '<div class="relationLi" type="' + res.BrandList[i].Type + '" relationId="' + res.BrandList[i].ID +
									'" key="' + res.BrandList[i].NameCn + '">' + res.BrandList[i].NameEn + '</div>';
							}
						}
						//行政区
						var districtStr = '';
						for (var i = 0; i < lengthObj.districtLength; i++) {
							if (obtLanguage == "CN") {
								districtStr += '<div class="relationLi" type="' + res.DistrictList[i].Type + '" relationId="' + res.DistrictList[
									i].ID + '" key="' + res.DistrictList[i].NameCn + '">' + res.DistrictList[i].NameCn + '</div>';
							} else if (obtLanguage == "EN") {
								districtStr += '<div class="relationLi" type="' + res.DistrictList[i].Type + '" relationId="' + res.DistrictList[
									i].ID + '" key="' + res.DistrictList[i].NameCn + '">' + res.DistrictList[i].NameEn + '</div>';
							}
						}
						//商圈
						var commercialStr = '';
						for (var i = 0; i < lengthObj.commercialLength; i++) {
							if (obtLanguage == "CN") {
								commercialStr += '<div class="relationLi" type="' + res.CommercialList[i].Type + '" relationId="' + res.CommercialList[
									i].ID + '" key="' + res.CommercialList[i].NameCn + '">' + res.CommercialList[i].NameCn + '</div>';
							} else if (obtLanguage == "EN") {
								commercialStr += '<div class="relationLi" type="' + res.CommercialList[i].Type + '" relationId="' + res.CommercialList[
									i].ID + '" key="' + res.CommercialList[i].NameCn + '">' + res.CommercialList[i].NameEn + '</div>';
							}
						}
						//附属商圈
						var extCommercialStr = '';
						for (var i = 0; i < lengthObj.extCommercialLength; i++) {
							if (obtLanguage == "CN") {
								extCommercialStr += '<div class="relationLi" type="' + res.ExtCommercialList[i].Type + '" relationId="' +
									res.ExtCommercialList[i].ID + '" key="' + res.ExtCommercialList[i].NameCn + '">' + res.ExtCommercialList[i]
									.NameCn + '</div>';
							} else if (obtLanguage == "EN") {
								extCommercialStr += '<div class="relationLi" type="' + res.ExtCommercialList[i].Type + '" relationId="' +
									res.ExtCommercialList[i].ID + '" key="' + res.ExtCommercialList[i].NameCn + '">' + res.ExtCommercialList[i]
									.NameEn + '</div>';
							}
						}
						return {
							brandStr:brandStr,
							districtStr:districtStr,
							commercialStr:commercialStr,
							extCommercialStr:extCommercialStr
						}
					}
					var keyWordsNormalObj = getKeyWordsDom(keyWordsIndexNormal);
					var keyWordsIndexPopWindowObj = getKeyWordsDom(keyWordsIndexPopWindow);	//弹窗用的对象
					var showHotel = hotelStr == "" ? "hide" : "";
					var showBrand = keyWordsNormalObj.brandStr == "" ? "hide" : "";
					var showDistrict = keyWordsNormalObj.districtStr == "" ? "hide" : "";
					var showCommercial = keyWordsNormalObj.commercialStr == "" ? "hide" : "";
					var showExtCommercial = keyWordsNormalObj.extCommercialStr == "" ? "hide" : "";
					$(".keyWordBody").html('\
                        <div class="relationBody ' + showHotel +
						'">\
                          <div class="relationTittle flexRow keywordTitle--hotel">\
                            <div>' +
						get_lan('keyWordBody').hotel +
						'</div>\
                          </div>\
                          <div class="relationContent flexWrap">\
                            ' +
						hotelStr +
						'\
                          </div>\
                        </div>\
                        <div class="relationBody ' +
						showBrand +
						'">\
                          <div class="relationTittle flexRow keywordTitle--brand">\
                            <div>' +
						get_lan('keyWordBody').brand +
						'</div>\
                          </div>\
                          <div class="relationContent flexWrap">\
                            ' +
						keyWordsNormalObj.brandStr +
						'\
                          </div>\
                        </div>\
                        <div class="relationBody ' +
						showDistrict +
						'">\
                          <div class="relationTittle flexRow keywordTitle--district">\
                            <div>' +
						get_lan('keyWordBody').district +
						'</div>\
                          </div>\
                          <div class="relationContent flexWrap">\
                            ' +
						keyWordsNormalObj.districtStr +
						'\
                          </div>\
                        </div>\
                        <div class="relationBody ' +
						showCommercial +
						'">\
                          <div class="relationTittle flexRow keywordTitle--commercial">\
                            <div>' +
						get_lan('keyWordBody').commercial +
						'</div>\
                          </div>\
                          <div class="relationContent flexWrap">\
                            ' +
						keyWordsNormalObj.commercialStr +
						'\
                          </div>\
                        </div>\
                        <div class="relationBody ' +
						showExtCommercial +
						'">\
                          <div class="relationTittle flexRow keywordTitle--extCommercial">\
                            <div>' +
						get_lan('keyWordBody').extCommercial +
						'</div>\
                          </div>\
                          <div class="relationContent flexWrap">\
                            ' +
						keyWordsNormalObj.extCommercialStr +
						'\
                          </div>\
                        </div>\
                    ')
					$(".relationLi").on('mousedown', function() {
						$("#keyWordInput").val($(this).text());
						$("#keyWordInput").attr("relationId", $(this).attr("relationId"));
						$("#keyWordInput").attr("hoteltype", $(this).attr("type"));
						$("#keyWordInput").attr("key", $(this).attr("key"));
						$(".keyWordBody").hide();
					})
				},
				error: function() {
					// alert('fail'); 
				}
			});
		}
	})
    $("#keyWordInput").on('focus',function(){
        $(".keyWordBody").show();
    })
    .on('blur',function(){
        $(".keyWordBody").hide();
    })
    //选择城市
    $("#hotelCity").val(searchHotelInfo.hotelCityText);
    $("#hotelCity").attr("code",searchHotelInfo.hotelCode);
    $("#hotelCity").kuCity();
    //酒店地址
    $("#hotelAddress").val(searchHotelInfo.hotelAddressText);
    $("#hotelAddress").attr("key",queryKeyList[3]);
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/QueryService.svc/GetCustomerCompanyAddressPost",
            jsonStr:'{"cityCode":"'+(searchHotelInfo.hotelCode)+'","id":'+netUserId+',"Language":"'+$.session.get('obtLanguage')+'"}'
        },
        success : function(data) {
            var res = JSON.parse(data);
            console.log(res);
            if(res.companyInfos.length == 0){
                $("#hotelAddressSelect").addClass("hide");
            }else{
                $("#hotelAddressSelect").removeClass("hide");
                if($.session.get('obtLanguage')=="CN"){
                    $("#hotelAddressSelect").html('<option value="">请选择公司</option>');
                }else if($.session.get('obtLanguage')=="EN"){
                    $("#hotelAddressSelect").html('<option value="">Please select</option>');
                }
                res.companyInfos.map(function(item){
                    if(item.CompanyAddress!=""){
                        $("#hotelAddressSelect").append('\
                            <option value="'+item.CompanyAddress+'" key="'+item.Key+'">'+item.CompanyName+'</option>\
                            ')
                    }
                })
               /*酒店位置*/
               $("#hotelAddressSelect").change(function(){
                    $("#hotelAddress").val($('#hotelAddressSelect option:selected').val());
                    $("#hotelAddress").attr("key",$('#hotelAddressSelect option:selected').attr("key"));
               }) 
            }
        },
        error : function() {
          // alert('fail'); 
        } 
      }
    );
    //选择日期
    $("#hotelDepartureDate").val(queryKeyList[4]);
    $("#hotelReturnDate").val(queryKeyList[5]);
    var departureValue = new Date($("#hotelDepartureDate").val().replace(/-/g, "/"));
    $("#hotelReturnDate").datepicker('destroy');
    $("#hotelReturnDate").datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        minDate: departureValue,  // 当前日期之后的 0 天，就是当天
        maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    });
    $("#hotelDepartureDate").datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        minDate: TAminDate,  // 当前日期之后的 0 天，就是当天
        maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        onSelect:function(){
            var departureValue = new Date($("#hotelDepartureDate").val().replace(/-/g, "/"));
            $("#hotelReturnDate").datepicker('destroy');
            $("#hotelReturnDate").datepicker({
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                changeYear: true,
                minDate: departureValue,  // 当前日期之后的 0 天，就是当天
                maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
                hideIfNoPrevNext: true,
                showOtherMonths: true,
                selectOtherMonths: true,
            });
            $("#hotelReturnDate").val(getNextDay($("#hotelDepartureDate").val()));
        }
    });
    function getNextDay(d){
        d = new Date(d);
        d = +d + 1000*60*60*24;
        d = new Date(d);
        var month = (d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1);
        var day = d.getDate()<10?'0'+d.getDate():d.getDate();
        //格式化
        return d.getFullYear()+"-"+month+"-"+day;
    }
    //选择星级
    $(".hotelStarBtn").unbind("click").click(function(){
        if($(this).attr("star")=="1-2-3-4-5"){
            $(".hotelStarBtn").removeClass("starChoose");
            $(this).addClass("starChoose");
        }else{
            $(".hotelStarBtn").eq(0).removeClass("starChoose");
            if($(this).hasClass("starChoose")){
                $(this).removeClass("starChoose");
            }else{
                $(this).addClass("starChoose");
            }
            if($(".starChoose").length == 0){
                $(".hotelStarBtn").eq(0).addClass("starChoose");
            }
        }  
    })
    //选择价格
    $(".hotelPriceBtn").unbind("click").click(function(){
		$('.hotelPriceBtn').removeClass('starChoose')
		$(this).addClass('starChoose')
        $(".searchMinPrice").val($(this).attr("minPrice"));
        $(".searchMaxPrice").val($(this).attr("maxPrice"));
    })
	var minIndex,maxIndex
	$(".searchMinPrice").unbind("change").change(function(){
		getinputPrice()
	})
	$(".searchMaxPrice").unbind("change").change(function(){
		getinputPrice()
	})
	
	function getinputPrice(){
		var inputMin=$(".searchMinPrice").val()
		var inputMax=$(".searchMaxPrice").val()
		$(".hotelPriceBtn").map(function(index){
			var max=$(this).attr("maxPrice")
			var min=$(this).attr("minPrice")
			if(max==inputMax){
				maxIndex=index
			}
			if(min==inputMin){
				minIndex=index
			}
		})
		$('.hotelPriceBtn').removeClass('starChoose')
		if(maxIndex==minIndex){
			$($('.hotelPriceBtn')[maxIndex]).addClass('starChoose')
		}
	}
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
    				$(".searchHotelBtn").attr("CanSearch", item.CanSearch);
    				$(".searchHotelBtn").attr("StartLimit", item.StartLimit);
    				$(".searchHotelBtn").attr("Message", item.Message);
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
    $(".searchHotelBtn").unbind("click").click(function(){
        var that = this;
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
			var cityList = '"' + hotelCityCode + '"';
            tools.appleRemindPop(cityList, 2, netUserId, function() {
                if ($(that).attr("startlimit") && parseInt($(that).attr("startlimit")) > 0) {
                    if (datedifference(getNowFormatDate(), $('#hotelDepartureDate').val()) < parseInt($(that).attr("startlimit"))) {
                        if ($(that).attr("CanSearch") != "true") {
                            if ($(that).attr("Message").indexOf("\\n") != -1) {
                                alert($(that).attr("Message").split("\\n").join('\n'));
                            } else {
                                alert($(that).attr("Message"));
                            }
                            return false;
                        }else{
                            if ($(that).attr("Message").indexOf("\\n") != -1) {
                                var mymessage = confirm($(that).attr("Message").split("\\n").join('\n'));
                            } else {
                                var mymessage = confirm($(that).attr("Message"));
                            }
                            if (mymessage == true) {
                                if ($(that).attr("CanSearch") != "true") {
                                    return false;
                                }else{
                                    searchHotel()
                                }
                            } else {
                                return false;
                            }
                        }
                    }else{
                        searchHotel()
                    }
                }else{
                    searchHotel()
                }
            });
            function searchHotel(){
                var hotelAreaTypeID = $("#keyWordInput").attr("hoteltype")&&$("#keyWordInput").attr("hoteltype")!=5?$("#keyWordInput").attr("relationId")+'-'+$("#keyWordInput").attr("hoteltype"):'';
                var hotelname = !$("#keyWordInput").attr("hoteltype")||$("#keyWordInput").attr("hoteltype")==5?$("#keyWordInput").val().split(",").join(' '):'';
                if($(that).attr("state")=="domHotel"){
                    if($("#hotelAddress").val()!=""){
                        if($("#hotelAddress").attr("key")){
                            var address = $("#hotelCity").val()+$("#hotelAddress").attr("key").split(",").join(' ');
                        }else{
                            var address = $("#hotelCity").val()+$("#hotelAddress").val().split(",").join(' ');
                        }
                    }else{
                        var address = "";
                    }
                }else if($(that).attr("state")=="intlHotel"){
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
                for(var i=0;i<$('.searchStarBody .starChoose').length;i++){
                    stars += $('.searchStarBody .starChoose').eq(i).attr("star");
                    stars += '-';
                }
                stars = stars.substring(0,stars.length-1);
                var queryKey = hotelCityCode+','+hotelAreaTypeID+','+hotelname+','+address+','+$("#hotelDepartureDate").val()+','+$("#hotelReturnDate").val()+','+stars+','+$(".searchMinPrice").val()+','+$(".searchMaxPrice").val()+",1,1,1,2000,,";
                var searchHotelInfo = {
                    'queryKey':queryKey,
                    'hotelCode':hotelCityCode,
                    'hotelCityText':hotelCityText,
                    'hotelState':hotelState,
                    'hotelAddressText':$("#hotelAddress").val(),
                }
                $.session.set('searchHotelInfo', JSON.stringify(searchHotelInfo));
                location.reload();
            }
            
        }else{
            alert(get_lan('searchRemind'))
        }
    })
    //排序模块
    $(".siftBody").html('\
        <div style="min-width:50px;margin-left:20px;color:#1e66ae;">'+get_lan('siftBody').sort+'</div>\
        <div class="priceSort flexRow sortTab" style="min-width:50px;margin-left:30px;;cursor:pointer">'+get_lan('siftBody').price+'<div class="priceSortIcon sortTabIcon"></div></div>\
        <div class="starSort flexRow sortTab" style="min-width:50px;margin-left:30px;;cursor:pointer">'+get_lan('siftBody').star+'<div class="starSortIcon sortTabIcon"></div></div>\
        <div class="scoreSort flexRow sortTab" style="min-width:50px;margin-left:30px;;cursor:pointer">'+get_lan('siftBody').score+'<div class="scoreSortIcon sortTabIcon"></div></div>\
        <div class="distanceSort flexRow sortTab" style="min-width:50px;margin-left:30px;;cursor:pointer">'+get_lan('siftBody').distance+'<div class="distanceSortIcon sortTabIcon"></div></div>\
        <div class="filterText" style="min-width:50px;margin-left:150px;color:#1e66ae;">'+get_lan('siftBody').filter+'</div>\
        <div class="tabBtn breakfastBtn" state="none">'+get_lan('siftBody').breakfast+'</div>\
        <div class="tabBtn freeCancelBtn" state="none">'+get_lan('siftBody').freeCancel+'</div>\
        <div class="tabBtn noGuaranteeBtn" state="none">'+get_lan('siftBody').noGuarantee+'</div>\
        <div class="protocolBtn">'+get_lan('siftBody').protocol+'</div>\
        <div class="companyBillBtn" state="none">'+get_lan('siftBody').companyBill+'</div>\
    ')
    //<div class="recommendList" style="min-width:50px;margin-left:30px;color:#F58A00;cursor:pointer">'+get_lan('siftBody').recommend+'</div>
    $(".hotelsNumber").html('\
        <img class="allMap" src="../../hotel/images/allMap.png" style="width:40px;height:34px;margin-top:13px;pointer:cursor;">\
        '+get_lan('hotelsNumber').hotelsNumber1+'<span style="font-size:26px;margin:0 8px 0 8px" class="hotelsNumberText"></span>'+get_lan('hotelsNumber').hotelsNumber2+'\
        <div class="allMapBtn btnBackColor">'+get_lan("hotelList").allMapBtn+'</div>\
        ')
    if(searchHotelInfo.hotelState=="intlHotel"){
        $(".scoreSort").addClass("hide");
        $(".filterText").addClass("hide");
        $(".tabBtn").addClass("hide");
        $(".protocolBtn").addClass("hide");
    }
	GetCompanyImageInfos()
}

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
				return false
			}
			var res = JSON.parse(data);
			console.log(res);
			if(res.code==200){
				res.CompanyImageList.map(function(item){
					if(item.type==2){
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
//日期
function GetDateStr(AddDayCount) {
    var dd = new Date(); 
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    // var m = dd.getMonth()+1;//获取当前月份的日期 
    // var d = dd.getDate();
    var m = (dd.getMonth()+1)<10?'0'+(dd.getMonth()+1):(dd.getMonth()+1);
    var d = dd.getDate()<10?'0'+dd.getDate():dd.getDate();
    return y+"-"+m+"-"+d;
}
//酒店列表
function hotelList(){
    // $('body').mLoading("show");
	tools.searchLoadingShow()
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/QueryService.svc/QueryHotelPost",
            jsonStr:'{"queryKey":"'+queryKey+'","id":'+netUserId+',"Language":"'+obtLanguage+'"}'
        },
        success : function(data) {
            // $('body').mLoading("hide");
			tools.searchLoadingHide()
            var res = JSON.parse(data);
            console.log(res);
			resAll=res
			cacheHotelList=res.hotels;
            hotelListInfo(cacheHotelList);
            // hotelListInfo(res.hotels);
            hotelFilter(res);
            //排序
            // hotelSort(res.hotels);
            hotelSort(cacheHotelList);
			// 翻页相关
			SabreShopKey=res.SabreShopKey;
			if(SabreShopKey=='' || SabreShopKey==null){
				if(obtLanguage=="EN"){
					$('.loadingSpan').hide()
					$('.listEnd .textSpan').text("No more hotels")
				}else{
					$('.loadingSpan').hide()
					$('.listEnd .textSpan').text("没有更多酒店了")
				}
			}else{
				if(obtLanguage=="EN"){
					$('.loadingSpan').show()
					$('.listEnd .textSpan').text("Loading...")
				}else{
					$('.loadingSpan').show()
					$('.listEnd .textSpan').text("正在加载...")
				}
			}
			pageIndex=2;
        },
        error : function() {
          // alert('fail');
        }
      }
    );
}
function setInactiveStyleForFilterBtn(btn){
    $(btn).css("background-color","#fff");
    $(btn).css("color","#000");
    $(btn).attr("state","none");
}
//酒店筛选新
function hotelFilter(allData){
	
    var breakfastData = [];
    var freeCancelData = [];
    var protocolData = [];
    var breakfastAndFreeCancel = [];
    var companyBillData = [];
    
    allData.hotels.map(function(item){
        if(item.Breakfast>0){
            breakfastData.push(item);
        }
        if(item.CancelRuleType>0){
            freeCancelData.push(item);
        }
        if(item.IsAgreement||item.IsTMCAgreement){
            protocolData.push(item);
        }
        if(item.IsFXHotel){
            companyBillData.push(item);
        }
    })
    if(companyBillData.length == 0){
        $('.companyBillBtn').hide();
    }
    breakfastData.map(function(item){
        if(item.CancelRuleType>0){
            breakfastAndFreeCancel.push(item);
        }
    })
	console.log("allData")
	console.log(allData)
    // $.ajax(
    //   { 
    //     type:'post',
    //     url : $.session.get('ajaxUrl'), 
    //     dataType : 'json',
    //     data:{
    //         url: $.session.get('obtCompany')+"/QueryService.svc/QueryHotelPost",
    //         jsonStr:'{"queryKey":"'+NotNeedGaranteeQueryKey+'","id":'+netUserId+',"Language":"'+obtLanguage+'"}'
    //     },
    //     success : function(data) {
    //         var res = JSON.parse(data);
    //         console.log("res");
    //         console.log(res);
            // tools.Loading.hide();
			var res=allData
            var NotNeedGaranteeData = [];
            res.hotels.map(function(item){
                if(item.NotNeedGarantee){
                    NotNeedGaranteeData.push(item);
                }
            })
            var breakfastAndNotNeedGarantee = [];
            NotNeedGaranteeData.map(function(item){
                if(item.Breakfast>0){
                    breakfastAndNotNeedGarantee.push(item);
                }
            })
            // console.log(breakfastAndNotNeedGarantee);
            //顶部免担保
            $(".tabBtn").eq(2).unbind("click").click(function(){
                // $(".recommendList").css("color","#F58A00");
                $(".priceSort,.starSort,.scoreSort,.distanceSort").css("color","#000");
                $(".sortTabIcon").css("background-position","0px 0px");
                setInactiveStyleForFilterBtn(".protocolBtn");
                setInactiveStyleForFilterBtn(".companyBillBtn");
                if($(".tabBtn").eq(0).attr("state")=="none"){
                    $(".tabBtn").css("background-color","#f2f2f2");
                    $(".tabBtn").css("color","#000");
                    $(".tabBtn").eq(1).attr("state","none");
                    if($(this).attr("state")=="none"){
                        $(this).css("background-color","#1e66ae");
                        $(this).css("color","#fff");
                        $(this).attr("state","click");
                        hotelListInfo(NotNeedGaranteeData);
                        hotelSort(NotNeedGaranteeData);
                        clickHotelLi();
                    }else if($(this).attr("state")=="click"){
                        $(this).css("background-color","#f2f2f2");
                        $(this).css("color","#000");
                        $(this).attr("state","none");
                        hotelListInfo(allData.hotels);
                        hotelSort(allData.hotels);
                        clickHotelLi();
                    }
                }else if($(".tabBtn").eq(0).attr("state")=="click"){
                    $(".tabBtn").eq(1).css("background-color","#f2f2f2");
                    $(".tabBtn").eq(1).css("color","#000");
                    $(".tabBtn").eq(1).attr("state","none");
                    if($(this).attr("state")=="none"){
                        $(this).css("background-color","#1e66ae");
                        $(this).css("color","#fff");
                        $(this).attr("state","click");
                        hotelListInfo(breakfastAndNotNeedGarantee);
                        hotelSort(breakfastAndNotNeedGarantee);
                        clickHotelLi();
                    }else if($(this).attr("state")=="click"){
                        $(this).css("background-color","#f2f2f2");
                        $(this).css("color","#000");
                        $(this).attr("state","none");
                        hotelListInfo(breakfastData);
                        hotelSort(breakfastData);
                        clickHotelLi();
                    }
                }
            })
            //顶部含早
            $(".tabBtn").eq(0).unbind("click").click(function(){
                // $(".recommendList").css("color","#F58A00");
                $(".priceSort,.starSort,.scoreSort,.distanceSort").css("color","#000");
                $(".sortTabIcon").css("background-position","0px 0px");
                setInactiveStyleForFilterBtn(".protocolBtn");
                setInactiveStyleForFilterBtn(".companyBillBtn");
                if($(".tabBtn").eq(1).attr("state")=="none"&&$(".tabBtn").eq(2).attr("state")=="none"){
                    if($(this).attr("state")=="none"){
                        $(this).css("background-color","#1e66ae");
                        $(this).css("color","#fff");
                        $(this).attr("state","click");
                        hotelListInfo(breakfastData);
                        hotelSort(breakfastData);
                        clickHotelLi();
                    }else if($(this).attr("state")=="click"){
                        $(this).css("background-color","#f2f2f2");
                        $(this).css("color","#000");
                        $(this).attr("state","none");
                        hotelListInfo(allData.hotels);
                        hotelSort(allData.hotels);
                        clickHotelLi();
                    }
                }else if($(".tabBtn").eq(1).attr("state")=="click"&&$(".tabBtn").eq(2).attr("state")=="none"){
                    if($(this).attr("state")=="none"){
                        $(this).css("background-color","#1e66ae");
                        $(this).css("color","#fff");
                        $(this).attr("state","click");
                        hotelListInfo(breakfastAndFreeCancel);
                        hotelSort(breakfastAndFreeCancel);
                        clickHotelLi();
                    }else if($(this).attr("state")=="click"){
                        $(this).css("background-color","#f2f2f2");
                        $(this).css("color","#000");
                        $(this).attr("state","none");
                        hotelListInfo(freeCancelData);
                        hotelSort(freeCancelData);
                        clickHotelLi();
                    }
                }else if($(".tabBtn").eq(1).attr("state")=="none"&&$(".tabBtn").eq(2).attr("state")=="click"){
                    if($(this).attr("state")=="none"){
                        $(this).css("background-color","#1e66ae");
                        $(this).css("color","#fff");
                        $(this).attr("state","click");
                        hotelListInfo(breakfastAndNotNeedGarantee);
                        hotelSort(breakfastAndNotNeedGarantee);
                        clickHotelLi();
                    }else if($(this).attr("state")=="click"){
                        $(this).css("background-color","#f2f2f2");
                        $(this).css("color","#000");
                        $(this).attr("state","none");
                        hotelListInfo(NotNeedGaranteeData);
                        hotelSort(NotNeedGaranteeData);
                        clickHotelLi();
                    }
                }
            })
            //顶部免费取消
            $(".tabBtn").eq(1).unbind("click").click(function(){
                // $(".recommendList").css("color","#F58A00");
                $(".priceSort,.starSort,.scoreSort,.distanceSort").css("color","#000");
                $(".sortTabIcon").css("background-position","0px 0px");
                setInactiveStyleForFilterBtn(".protocolBtn");
                setInactiveStyleForFilterBtn(".companyBillBtn");
                if($(".tabBtn").eq(0).attr("state")=="none"){
                    $(".tabBtn").css("background-color","#f2f2f2");
                    $(".tabBtn").css("color","#000");
                    $(".tabBtn").eq(2).attr("state","none");
                    if($(this).attr("state")=="none"){
                        $(this).css("background-color","#1e66ae");
                        $(this).css("color","#fff");
                        $(this).attr("state","click");
                        hotelListInfo(freeCancelData);
                        hotelSort(freeCancelData);
                        clickHotelLi();
                    }else if($(this).attr("state")=="click"){
                        $(this).css("background-color","#f2f2f2");
                        $(this).css("color","#000");
                        $(this).attr("state","none");
                        hotelListInfo(allData.hotels);
                        hotelSort(allData.hotels);
                        clickHotelLi();
                    }
                }else if($(".tabBtn").eq(0).attr("state")=="click"){
                    $(".tabBtn").eq(2).css("background-color","#f2f2f2");
                    $(".tabBtn").eq(2).css("color","#000");
                    $(".tabBtn").eq(2).attr("state","none");
                    if($(this).attr("state")=="none"){
                        $(this).css("background-color","#1e66ae");
                        $(this).css("color","#fff");
                        $(this).attr("state","click");
                        hotelListInfo(breakfastAndFreeCancel);
                        hotelSort(breakfastAndFreeCancel);
                        clickHotelLi();
                    }else if($(this).attr("state")=="click"){
                        $(this).css("background-color","#f2f2f2");
                        $(this).css("color","#000");
                        $(this).attr("state","none");
                        hotelListInfo(breakfastData);
                        hotelSort(breakfastData);
                        clickHotelLi();
                    }
                }
            })
            //是否协议价
            $(".protocolBtn").unbind("click").click(function(){
                // $(".recommendList").css("color","#F58A00");
                $(".priceSort,.starSort,.scoreSort,.distanceSort").css("color","#000");
                $(".sortTabIcon").css("background-position","0px 0px");
                console.log(protocolData);
                setInactiveStyleForFilterBtn(".companyBillBtn");
                $(".tabBtn").css("background-color","#fff");
                $(".tabBtn").css("color","#000");
                $(".tabBtn").attr("state","none");
                if(!$(this).attr("state")||$(this).attr("state")=="none"){
                    $(this).css("background-color","#4c81dd");
                    $(this).css("color","#fff");
                    $(this).attr("state","click");
                    hotelListInfo(protocolData);
                    hotelSort(protocolData);
                    clickHotelLi();
                }else if($(this).attr("state")=="click"){
                    $(this).css("background-color","#fff");
                    $(this).css("color","#000");
                    $(this).attr("state","none");
                    hotelListInfo(allData.hotels);
                    hotelSort(allData.hotels);
                    clickHotelLi();
                }
            })
            //是否公司支付
            $(".companyBillBtn").unbind("click").click(function(){
                // $(".recommendList").css("color","#F58A00");
                $(".priceSort,.starSort,.scoreSort,.distanceSort").css("color","#000");
                $(".sortTabIcon").css("background-position","0px 0px");
                console.log(companyBillData);
                setInactiveStyleForFilterBtn(".protocolBtn");
                $(".tabBtn").css("background-color","#fff");
                $(".tabBtn").css("color","#000");
                $(".tabBtn").attr("state","none");
                if(!$(this).attr("state")||$(this).attr("state")=="none"){
                    $(this).css("background-color","#4c81dd");
                    $(this).css("color","#fff");
                    $(this).attr("state","click");
                    hotelListInfo(companyBillData);
                    hotelSort(companyBillData);
                    clickHotelLi();
                }else if($(this).attr("state")=="click"){
                    $(this).css("background-color","#fff");
                    $(this).css("color","#000");
                    $(this).attr("state","none");
                    hotelListInfo(allData.hotels);
                    hotelSort(allData.hotels);
                    clickHotelLi();
                }
            })
      //   },
      //   error : function() {
      //     // alert('fail');
      //   } 
      // }
    // );
}
//酒店筛选 旧
// function hotelFilterOld(allData){
//     var breakfastData = [];
//     var freeCancelData = [];
//     var protocolData = [];
//     var breakfastAndFreeCancel = [];
//     allData.hotels.map(function(item){
//         if(item.Breakfast>0){
//             breakfastData.push(item);
//         }
//         if(item.CancelRuleType>0){
//             freeCancelData.push(item);
//         }
//         if(item.IsAgreement||item.IsTMCAgreement){
//             protocolData.push(item);
//         }
//     })
//     breakfastData.map(function(item){
//         if(item.CancelRuleType>0){
//             breakfastAndFreeCancel.push(item);
//         }
//     })
//     $.ajax(
//       { 
//         type:'post',
//         url : $.session.get('ajaxUrl'), 
//         dataType : 'json',
//         data:{
//             url: $.session.get('obtCompany')+"/QueryService.svc/QueryHotelPost",
//             jsonStr:'{"queryKey":"'+NotNeedGaranteeQueryKey+'","id":'+netUserId+',"Language":"'+obtLanguage+'"}'
//         },
//         success : function(data) {
//             var res = JSON.parse(data);
//             console.log(res);
//             tools.Loading.hide();
//             var NotNeedGaranteeData = [];
//             res.hotels.map(function(item){
//                 if(item.NotNeedGarantee){
//                     NotNeedGaranteeData.push(item);
//                 }
//             })
//             var breakfastAndNotNeedGarantee = [];
//             NotNeedGaranteeData.map(function(item){
//                 if(item.Breakfast>0){
//                     breakfastAndNotNeedGarantee.push(item);
//                 }
//             })
//             // console.log(breakfastAndNotNeedGarantee);
//             //顶部免担保
//             $(".tabBtn").eq(2).unbind("click").click(function(){
//                 // $(".recommendList").css("color","#F58A00");
//                 $(".priceSort,.starSort,.scoreSort,.distanceSort").css("color","#000");
//                 $(".sortTabIcon").css("background-position","0px 0px");
//                 $(".protocolBtn").css("background-color","#fff");
//                 $(".protocolBtn").css("color","#000");
//                 $(".protocolBtn").attr("state","none");
//                 if($(".tabBtn").eq(0).attr("state")=="none"){
//                     $(".tabBtn").css("background-color","#f2f2f2");
//                     $(".tabBtn").css("color","#000");
//                     $(".tabBtn").eq(1).attr("state","none");
//                     if($(this).attr("state")=="none"){
//                         $(this).css("background-color","#1e66ae");
//                         $(this).css("color","#fff");
//                         $(this).attr("state","click");
//                         hotelListInfo(NotNeedGaranteeData);
//                         hotelSort(NotNeedGaranteeData);
//                         clickHotelLi();
//                     }else if($(this).attr("state")=="click"){
//                         $(this).css("background-color","#f2f2f2");
//                         $(this).css("color","#000");
//                         $(this).attr("state","none");
//                         hotelListInfo(allData.hotels);
//                         hotelSort(allData.hotels);
//                         clickHotelLi();
//                     }
//                 }else if($(".tabBtn").eq(0).attr("state")=="click"){
//                     $(".tabBtn").eq(1).css("background-color","#f2f2f2");
//                     $(".tabBtn").eq(1).css("color","#000");
//                     $(".tabBtn").eq(1).attr("state","none");
//                     if($(this).attr("state")=="none"){
//                         $(this).css("background-color","#1e66ae");
//                         $(this).css("color","#fff");
//                         $(this).attr("state","click");
//                         hotelListInfo(breakfastAndNotNeedGarantee);
//                         hotelSort(breakfastAndNotNeedGarantee);
//                         clickHotelLi();
//                     }else if($(this).attr("state")=="click"){
//                         $(this).css("background-color","#f2f2f2");
//                         $(this).css("color","#000");
//                         $(this).attr("state","none");
//                         hotelListInfo(breakfastData);
//                         hotelSort(breakfastData);
//                         clickHotelLi();
//                     }
//                 }
//             })
//             //顶部含早
//             $(".tabBtn").eq(0).unbind("click").click(function(){
//                 // $(".recommendList").css("color","#F58A00");
//                 $(".priceSort,.starSort,.scoreSort,.distanceSort").css("color","#000");
//                 $(".sortTabIcon").css("background-position","0px 0px");
//                 $(".protocolBtn").css("background-color","#fff");
//                 $(".protocolBtn").css("color","#000");
//                 $(".protocolBtn").attr("state","none");
//                 if($(".tabBtn").eq(1).attr("state")=="none"&&$(".tabBtn").eq(2).attr("state")=="none"){
//                     if($(this).attr("state")=="none"){
//                         $(this).css("background-color","#1e66ae");
//                         $(this).css("color","#fff");
//                         $(this).attr("state","click");
//                         hotelListInfo(breakfastData);
//                         hotelSort(breakfastData);
//                         clickHotelLi();
//                     }else if($(this).attr("state")=="click"){
//                         $(this).css("background-color","#f2f2f2");
//                         $(this).css("color","#000");
//                         $(this).attr("state","none");
//                         hotelListInfo(allData.hotels);
//                         hotelSort(allData.hotels);
//                         clickHotelLi();
//                     }
//                 }else if($(".tabBtn").eq(1).attr("state")=="click"&&$(".tabBtn").eq(2).attr("state")=="none"){
//                     if($(this).attr("state")=="none"){
//                         $(this).css("background-color","#1e66ae");
//                         $(this).css("color","#fff");
//                         $(this).attr("state","click");
//                         hotelListInfo(breakfastAndFreeCancel);
//                         hotelSort(breakfastAndFreeCancel);
//                         clickHotelLi();
//                     }else if($(this).attr("state")=="click"){
//                         $(this).css("background-color","#f2f2f2");
//                         $(this).css("color","#000");
//                         $(this).attr("state","none");
//                         hotelListInfo(freeCancelData);
//                         hotelSort(freeCancelData);
//                         clickHotelLi();
//                     }
//                 }else if($(".tabBtn").eq(1).attr("state")=="none"&&$(".tabBtn").eq(2).attr("state")=="click"){
//                     if($(this).attr("state")=="none"){
//                         $(this).css("background-color","#1e66ae");
//                         $(this).css("color","#fff");
//                         $(this).attr("state","click");
//                         hotelListInfo(breakfastAndNotNeedGarantee);
//                         hotelSort(breakfastAndNotNeedGarantee);
//                         clickHotelLi();
//                     }else if($(this).attr("state")=="click"){
//                         $(this).css("background-color","#f2f2f2");
//                         $(this).css("color","#000");
//                         $(this).attr("state","none");
//                         hotelListInfo(NotNeedGaranteeData);
//                         hotelSort(NotNeedGaranteeData);
//                         clickHotelLi();
//                     }
//                 }
//             })
//             //顶部免费取消
//             $(".tabBtn").eq(1).unbind("click").click(function(){
//                 // $(".recommendList").css("color","#F58A00");
//                 $(".priceSort,.starSort,.scoreSort,.distanceSort").css("color","#000");
//                 $(".sortTabIcon").css("background-position","0px 0px");
//                 $(".protocolBtn").css("background-color","#fff");
//                 $(".protocolBtn").css("color","#000");
//                 $(".protocolBtn").attr("state","none");
//                 if($(".tabBtn").eq(0).attr("state")=="none"){
//                     $(".tabBtn").css("background-color","#f2f2f2");
//                     $(".tabBtn").css("color","#000");
//                     $(".tabBtn").eq(2).attr("state","none");
//                     if($(this).attr("state")=="none"){
//                         $(this).css("background-color","#1e66ae");
//                         $(this).css("color","#fff");
//                         $(this).attr("state","click");
//                         hotelListInfo(freeCancelData);
//                         hotelSort(freeCancelData);
//                         clickHotelLi();
//                     }else if($(this).attr("state")=="click"){
//                         $(this).css("background-color","#f2f2f2");
//                         $(this).css("color","#000");
//                         $(this).attr("state","none");
//                         hotelListInfo(allData.hotels);
//                         hotelSort(allData.hotels);
//                         clickHotelLi();
//                     }
//                 }else if($(".tabBtn").eq(0).attr("state")=="click"){
//                     $(".tabBtn").eq(2).css("background-color","#f2f2f2");
//                     $(".tabBtn").eq(2).css("color","#000");
//                     $(".tabBtn").eq(2).attr("state","none");
//                     if($(this).attr("state")=="none"){
//                         $(this).css("background-color","#1e66ae");
//                         $(this).css("color","#fff");
//                         $(this).attr("state","click");
//                         hotelListInfo(breakfastAndFreeCancel);
//                         hotelSort(breakfastAndFreeCancel);
//                         clickHotelLi();
//                     }else if($(this).attr("state")=="click"){
//                         $(this).css("background-color","#f2f2f2");
//                         $(this).css("color","#000");
//                         $(this).attr("state","none");
//                         hotelListInfo(breakfastData);
//                         hotelSort(breakfastData);
//                         clickHotelLi();
//                     }
//                 }
//             })
//             //是否协议价
//             $(".protocolBtn").unbind("click").click(function(){
//                 // $(".recommendList").css("color","#F58A00");
//                 $(".priceSort,.starSort,.scoreSort,.distanceSort").css("color","#000");
//                 $(".sortTabIcon").css("background-position","0px 0px");
//                 console.log(protocolData);
//                 $(".tabBtn").css("background-color","#fff");
//                 $(".tabBtn").css("color","#000");
//                 $(".tabBtn").attr("state","none");
//                 if(!$(this).attr("state")||$(this).attr("state")=="none"){
//                     $(this).css("background-color","#4c81dd");
//                     $(this).css("color","#fff");
//                     $(this).attr("state","click");
//                     hotelListInfo(protocolData);
//                     hotelSort(protocolData);
//                     clickHotelLi();
//                 }else if($(this).attr("state")=="click"){
//                     $(this).css("background-color","#fff");
//                     $(this).css("color","#000");
//                     $(this).attr("state","none");
//                     hotelListInfo(allData.hotels);
//                     hotelSort(allData.hotels);
//                     clickHotelLi();
//                 }
//             })
//         },
//         error : function() {
//           // alert('fail');
//         } 
//       }
//     );
// }
function hotelSort(res){
    if(res[0]){
        if(res[0].HotelDistance==null||res[0].HotelDistance==''){
            $(".distanceSort").hide();
        }
        // else{
        //     $("#hotelAddress").val(queryKeyList[3]);
        // }
    }
    //排序数组
    var priceSortAscList = [];
    var priceSortDesList = [];
    var starSortAscList = [];
    var starSortDesList = [];
    var scoreSortAscList = [];
    var scoreSortDesList = [];
    res.map(function(item){
        priceSortAscList.push(item);
        priceSortDesList.push(item);
        starSortAscList.push(item);
        starSortDesList.push(item);
        scoreSortAscList.push(item);
        scoreSortDesList.push(item);
    })
    //排序
    //价格升序
    var priceSortAsc=function(arr){
        for(var i=0;i<arr.length-1;i++){  
            for(var j=i+1;j<arr.length;j++){  
                if(parseInt(arr[i].Price)>parseInt(arr[j].Price)){
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
                if(parseInt(arr[i].Price)<parseInt(arr[j].Price)){
                    var temp=arr[i];
                    arr[i]=arr[j];  
                    arr[j]=temp;  
                }
            }  
        }
        return arr;
    }
    //星级升序
    var starSortAsc=function(arr){
        for(var i=0;i<arr.length-1;i++){  
            for(var j=i+1;j<arr.length;j++){  
                if(parseInt(arr[i].StarLevel)>parseInt(arr[j].StarLevel)){
                    var temp=arr[i];
                    arr[i]=arr[j];  
                    arr[j]=temp;  
                }  
            }  
        }
        return arr;
    }
    //星级降序
    var starSortDes=function(arr){
        for(var i=0;i<arr.length-1;i++){  
            for(var j=i+1;j<arr.length;j++){
                if(parseInt(arr[i].StarLevel)<parseInt(arr[j].StarLevel)){
                    var temp=arr[i];
                    arr[i]=arr[j];  
                    arr[j]=temp;  
                }
            }  
        }
        return arr;
    }
    //评分降序
    var scoreSortAsc=function(arr){
        for(var i=0;i<arr.length-1;i++){  
            for(var j=i+1;j<arr.length;j++){
                if(parseFloat(arr[i].HotelRating)>parseFloat(arr[j].HotelRating)){
                    var temp=arr[i];
                    arr[i]=arr[j];  
                    arr[j]=temp;  
                }
            }  
        }
        return arr;
    }
    //评分降序
    var scoreSortDes=function(arr){
        for(var i=0;i<arr.length-1;i++){  
            for(var j=i+1;j<arr.length;j++){
                if(parseFloat(arr[i].HotelRating)<parseFloat(arr[j].HotelRating)){
                    var temp=arr[i];
                    arr[i]=arr[j];  
                    arr[j]=temp;  
                }
            }  
        }
        return arr;
    }
    // $(".recommendList").unbind("click").click(function(){
    //     $(this).css("color","#F58A00");
    //     $(".priceSort,.starSort,.scoreSort").css("color","#000");
    //     $(".sortTabIcon").css("background-position","0px 0px");
    //     hotelListInfo(res);
    //     clickHotelLi();
    // })
    $(".priceSort").unbind("click").click(function(){
        // $(".recommendList").css("color","#000");
        $(".sortTab ").css("color",'#000');
        $(".sortTabIcon").css("background-position","0px 0px");
        $(this).css("color",'#1e66ae');
        if(!$(this).attr("sortType")||$(this).attr("sortType")=="acs"){
            hotelListInfo(priceSortAsc(priceSortAscList));
            $(this).attr("sortType","desc");
            $(".priceSortIcon").css("background-position","-18px 0px");
        }
        else if($(this).attr("sortType")=="desc"){
            hotelListInfo(priceSortDes(priceSortDesList));
            $(this).attr("sortType","acs");
            $(".priceSortIcon").css("background-position","-36px 0px");
        }
    })
    $(".starSort").unbind("click").click(function(){
        // $(".recommendList").css("color","#000");
        $(".sortTab ").css("color",'#000');
        $(".sortTabIcon").css("background-position","0px 0px");
        $(this).css("color",'#1e66ae');
        if(!$(this).attr("sortType")||$(this).attr("sortType")=="acs"){
            hotelListInfo(starSortAsc(starSortAscList));
            $(this).attr("sortType","desc");
            $(".starSortIcon").css("background-position","-18px 0px");
        }
        else if($(this).attr("sortType")=="desc"){
            hotelListInfo(starSortDes(starSortDesList));
            $(this).attr("sortType","acs");
            $(".starSortIcon").css("background-position","-36px 0px");
        }
    })
    $(".scoreSort").unbind("click").click(function(){
        // $(".recommendList").css("color","#000");
        $(".sortTab ").css("color",'#000');
        $(".sortTabIcon").css("background-position","0px 0px");
        $(this).css("color",'#1e66ae');
        if(!$(this).attr("sortType")||$(this).attr("sortType")=="acs"){
            hotelListInfo(scoreSortAsc(scoreSortAscList));
            $(this).attr("sortType","desc");
            $(".scoreSortIcon").css("background-position","-18px 0px");
        }
        else if($(this).attr("sortType")=="desc"){
            hotelListInfo(scoreSortDes(scoreSortDesList));
            $(this).attr("sortType","acs");
            $(".scoreSortIcon").css("background-position","-36px 0px");
        }
    })
    $(".distanceSort").unbind("click").click(function(){
        // $(".recommendList").css("color","#000");
        $(".sortTab ").css("color",'#000');
        $(".sortTabIcon").css("background-position","0px 0px");
        $(this).css("color",'#1e66ae');
        if(!$(this).attr("sortType")||$(this).attr("sortType")=="acs"){
            hotelListInfo(res.reverse());
            $(this).attr("sortType","desc");
            $(".distanceSortIcon").css("background-position","-36px 0px");
        }
        else if($(this).attr("sortType")=="desc"){
            hotelListInfo(res.reverse());
            $(this).attr("sortType","acs");
            $(".distanceSortIcon").css("background-position","-18px 0px");
        }
    })
}
function hotelListInfo(res){
    if(res.length>0){
        $(".allMap,.allMapBtn").unbind("click").click(function(){
            $(".mapBody").removeClass("hide");
            var map = new BMap.Map("map");    // 创建Map实例
            $("#cover").css("display","block");
            $(".mapTittleText,#cover").unbind("click").click(function(){
                $(".mapBody").addClass("hide");
                $("#cover").css("display","none");
            })
            var data_info = [];
            res.map(function(item){
                data_info.push([item.Longitude,item.Laitude,item.HotelName,item.HotelAddress,item.HotelPhone,item.imageUrl])
            })
            // console.log(data_info);
            
            // 百度地图API功能
            var poi = new BMap.Point(data_info[0][0],data_info[0][1]);
            map.centerAndZoom(poi, 16);
            map.enableScrollWheelZoom();
            var pointList = [];
            var datainfoLength = data_info.length>10?10:data_info.length;
            for(var i=0;i<datainfoLength;i++){
                pointList.push(new BMap.Point(data_info[i][0],data_info[i][1]));
            }
            console.log(pointList);

            setTimeout(function(){
                var convertor = new BMap.Convertor();
                convertor.translate(pointList, 3, 5, translateCallback)
            }, 50);
            //坐标转换完之后的回调函数
            translateCallback = function (data){
                console.log(data)
              if(data.status === 0) {
                for(var i=0;i<10;i++){
                        var marker = new BMap.Marker(data.points[i]);  // 创建标注
                        var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                                '<img src="'+data_info[i][5]+'" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
                                '地址：'+data_info[i][3]+'<br/>电话：'+data_info[i][4]+'<br/>' +
                              '</div>';
                        addClickHandler(data_info[i][2],content,marker);
                        map.addOverlay(marker);               // 将标注添加到地图中
                    }
                map.setCenter(data.points[0]);
              }
            }
            function addClickHandler(hotelName,content,marker){
                    // console.log(content);
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
                    marker.addEventListener("click",function(e){
                        searchInfoWindow.open(marker);
                    }
                    );
                }
        })
    }
    
    /*酒店列表*/
    $(".hotelList").html("");
    $(".hotelsNumberText").text(res.length);
	var onlineStyle = JSON.parse($.session.get('ProfileInfo')).onlineStyle;
	var showHotelTax=resAll.HotelListTipExcludingTax?"":"hide"
    res.map(function(item,index){
		// if(resAll.GDSHotelDifferPreferenceAndAgreement!=undefined){
		// 	if(resAll.GDSHotelDifferPreferenceAndAgreement==true){
		// 		if(item.IsAgreement ==true){
		// 			var showHandimgOrange=""
		// 			var showHandImg="hide"
		// 		 //橙色
		// 		}
		// 		if(item.IsCommonAgreement == true && item.IsAgreement == false){
		// 		  //绿色
		// 			var showHandimgOrange="hide"
		// 			var showHandImg=""
		// 		}
		// 		if(item.IsAgreement == false){
		// 		 //不显示
		// 			var showHandimgOrange="hide"
		// 			var showHandImg="hide"
		// 		}
		// 	}else{
		// 		var showHandimgOrange="hide"
		// 		var showHandImg = item.IsAgreement ||item.IsTMCAgreement?"":"hide";
		// 	}
		// }else{
		// 	var showHandimgOrange="hide"
		// 	var showHandImg = item.IsAgreement ||item.IsTMCAgreement?"":"hide";
		// }
		
		var showHandimgOrange="hide"
		var showHandImg="hide"
		if(resAll.GDSHotelDifferPreferenceAndAgreement==true){
			if(item.IsAgreement == true){
				showHandimgOrange=""
				showHandImg="hide"
				//橙色,客户优选
			}
			if(item.IsCommonAgreement == true){
				showHandimgOrange="hide"
				showHandImg=""
				// 绿色,普通协议酒店
			}
			if(item.IsCommonAgreement == true && ProfileInfo.DomesticGDSHotelOnlyShowPreference && !resAll.IsInter){
				showHandImg="hide"
				// 新参数,去掉 国内 普通协议酒店
			}
			if(item.IsAgreement == false && item.IsCommonAgreement == false){
				showHandimgOrange="hide"
				showHandImg="hide"
				// 都不显示
			}
		}else{
			showHandimgOrange="hide"
			showHandImg = item.IsAgreement ||item.IsTMCAgreement?"":"hide";
		}
		
		
        var grade = parseFloat(item.HotelRating)>=4.5?get_lan('hotelList').nice:"";
        if(parseFloat(item.HotelRating)>=4.9){
            var grade = get_lan('hotelList').fantastic
        }else if(parseFloat(item.HotelRating)>=4.6&&parseFloat(item.HotelRating)<4.9){
            var grade = get_lan('hotelList').wonderful
        }else if(parseFloat(item.HotelRating)>=4.4&&parseFloat(item.HotelRating)<4.6){
            var grade = get_lan('hotelList').great
        }else if(parseFloat(item.HotelRating)>=4.2&&parseFloat(item.HotelRating)<4.4){
            var grade = get_lan('hotelList').good
        }else{
            var grade = '';
        }
        var showDistance = item.HotelDistance!=null?"":"hide";
        var showHotelLiScore = item.HotelRating==0?"hide":"";
		// 12.05 新增判断
		var noimgUrl=onlineStyle=="BCD"?"../../hotel/images/BCDnoPicture.png":"../../hotel/images/noPicture.png";
		var imageUrl = item.imageUrl==null||item.imageUrl==""? noimgUrl:item.imageUrl;
		 
		 // 12.24 hotelLiPrice 删除币种
		 if(item.IsFXHotel){
			 var companyPayshow=""
			 var companyPay=obtLanguage=="CN"?"公司支付":"Company bill"
		 }else{
			 var companyPayshow="hide"
		 }
        $(".hotelList").append('\
            <div class="hotelLi">\
              <div class="hotelLiImg" style="background-image:url('+imageUrl+')">\
              <div class="hotelHoneyPoint hide" style="width:48px;height:36px;line-height:36px;border-radius:0 0 40px 0;top:0;text-align:center;background:rgb(0,0,0,0.6);">\
                <img src="../images/honeyIcon.png" class="honeyIcon" style="width:14px;height:14px;">\
              </div>\
              </div>\
              <div class="hotelLiName mainFontColor" hotelId="'+item.ID+'" hotelType="'+item.HotelType+'" cityCode="'+item.CityCode+'">'+item.HotelName+'<div class="companyPay '+companyPayshow+'">'+companyPay+'</div> <div class="companyPay '+showHandimgOrange+' HandimgOrange">'+get_lan('hotelList').protocol2+'</div> <div class="companyPay '+showHandImg+' Handimg">'+get_lan('hotelList').protocol+'</div></div>\
              <div class="hotelLiScore '+showHotelLiScore+' btnBackColor">'+item.HotelRating+'</div>\
              <div class="hotelLiGrade">'+grade+'</div>\
              <div class="hotelLiLine"></div>\
              <div class="hotelLiInfo">\
                <div class="hotelLiDistance '+showDistance+'">'+get_lan('hotelList').distance1+item.HotelDistance+get_lan('hotelList').distance2+'</div>\
                <div class="hotelLiStar"><div class="hotelLiStarHalf"></div></div>\
                <div class="hotelLiAddress flexRow"><div class="mapIcon" imgSrc="'+item.imageUrl+'" name="'+item.HotelName+'" address="'+item.HotelAddress+'" telePhone="'+item.HotelPhone+'" Longitude="'+item.Longitude+'" Laitude="'+item.Laitude+'"></div>'+get_lan('hotelList').address+item.HotelAddress+'</div>\
                <div class="hotelLiTelephone">'+get_lan('hotelList').telephone+item.HotelPhone+'</div>\
                <div class="hotelPoints hide"></div>\
              </div>\
				<div class="hotelLiPrice">\
					<span style="font-size:26px;margin-right:5px">'+item.Price+'</span>\
					'+item.Currency+'  '+get_lan('hotelList').lowest+'\
					<div class='+showHotelTax+'>'+get_lan('hotelList').noTax+'</div>\
				</div>\
              <div class="searchHotelDetailBtn mainBackColor" hotelId="'+item.ID+'" hotelType="'+item.HotelType+'" cityCode="'+item.CityCode+'">'+get_lan('hotelList').search+'</div>\
              <div class="protocolBody '+showHandImg+'">\
                <div class="protocolText">'+get_lan('hotelList').protocol+'</div>\
                <div class="triangleTopRight"></div>\
              </div>\
			  <div class="protocolBody '+showHandimgOrange+'">\
			    <div class="protocolText protocolTextOrg">'+get_lan('hotelList').protocol2+'</div>\
			    <div class="triangleTopRight triangleTopRightOrg"></div>\
			  </div>\
            </div>\
            ')
        /*积分*/
        var PointValue = '';
        if(ProfileInfo.PointInfo&&ProfileInfo.PointInfo.PointRuleList){
        ProfileInfo.PointInfo.PointRuleList.map(function(item){
            if(searchHotelInfo.hotelState=="intlHotel"){
                if(item.PointTypeId==3&&(item.RegionType=="ALL"||item.RegionType=="I")&&(item.PointServiceType==0||item.PointServiceType==2)){
                    PointValue = item.PointValue;
                }
            }else{
                if(item.PointTypeId==3&&(item.RegionType=="ALL"||item.RegionType=="D")&&(item.PointServiceType==0||item.PointServiceType==2)){
                    PointValue = item.PointValue;
                }
            }
        })
        if(PointValue!=''&&(showHandImg!="hide"||showHandimgOrange!="hide")){
            if(!ProfileInfo.PointHoney){
                $(".hotelPoints").eq(index).removeClass("hide");
                $(".hotelPoints").eq(index).text("+"+PointValue+get_lan("points"));
            }else{
                $(".hotelHoneyPoint").eq(index).removeClass("hide");
            }
        }
        }
        /*end*/
        //<div class="hotelLiComment">'+item.ReviewInfo.Count+get_lan('hotelList').comment+'</div>
        switch(item.StarLevel)
        {
        case "0":
          $(".hotelLiStar").eq(index).css("width","0px");
          break;
        case "1":
          $(".hotelLiStar").eq(index).css("width","16px");
          break;
        case "2":
          $(".hotelLiStar").eq(index).css("width","32px");
          break;
        case "3":
          $(".hotelLiStar").eq(index).css("width","48px");
          break;
        case "4":
          $(".hotelLiStar").eq(index).css("width","64px");
          break;
        case "5":
          $(".hotelLiStar").eq(index).css("width","80px");
          break;
		 case "1.0":
		   $(".hotelLiStar").eq(index).css("width","16px");
		   break;
		 case "2.0":
		   $(".hotelLiStar").eq(index).css("width","32px");
		   break;
		 case "3.0":
		   $(".hotelLiStar").eq(index).css("width","48px");
		   break;
		 case "4.0":
		   $(".hotelLiStar").eq(index).css("width","64px");
		   break;
		 case "5.0":
		   $(".hotelLiStar").eq(index).css("width","80px");
		   break;
        }
		// 是否存在半星  item.ExtStarLevel=5
		if(!(item.ExtStarLevel > 0)){
			$('.hotelLiStarHalf').eq(index).css('display','none')
		}
    })
    $(".mapIcon").unbind("click").click(function(){
        // 百度地图API功能
        $(".mapBody").removeClass("hide");
        var map = new BMap.Map("map");    // 创建Map实例
        $("#cover").css("display","block");
        var Longitude=parseFloat($(this).attr("Longitude"));
        var Laitude=parseFloat($(this).attr("Laitude"));
        var hotelName = $(this).attr("name");
        var hotelAddress = $(this).attr("address");
        var hotelPhone = $(this).attr("telePhone");
        var imgSrc = $(this).attr("imgSrc");
        $(".mapTittleText,#cover").unbind("click").click(function(){
            $(".mapBody").addClass("hide");
            $("#cover").css("display","none");
        })
        // 百度地图API功能
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
    })
    clickHotelLi();
}
function clickHotelLi(){
    $(".searchHotelDetailBtn,.hotelLiName").unbind("click").click(function(){
        var detailQueryKey = queryKeyList[4]+','+queryKeyList[5]+','+$(this).attr("hotelId")+','+$(this).attr("citycode")+','+$(this).attr("hotelType");
        var hotelDetailInfo = {
            'queryKey':detailQueryKey,
        }
        $.session.set('hotelDetailInfo', JSON.stringify(hotelDetailInfo));
        window.location.href='../../hotel/hotelDetail.html';
    })
}

function removeFilter(dom){
    console.log($(dom).attr("state"));

    if($(dom).attr("state")=="click"){
        $(dom).click();
    }
}
// 2020.1.10新增 瀑布流
window.onscroll=function(){
		if(checkScrollSlide() && SabreShopKey!='' && SabreShopKey!=null){
			if(!getNextPage){
                getNextPage=true;
                $(".tabBtn").map(function(index){
                    // console.log(value);
                    removeFilter($('.tabBtn').eq(index));
                });
                removeFilter('.protocolBtn');
                removeFilter('.companyBillBtn');
                nextHotelList();
			}
		}
	}
function checkScrollSlide(){
		// 获取最后一个模块的位置
		var index=$('.hotelLi').length;
		if(index==0){
			return false
		}
		console.log($('.hotelLi')[index-1].offsetTop)
		// 加不加上最后一个元素的高度 offsetHeight
		var lastBoxH=$('.hotelLi')[index-1].offsetTop
	    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	    var totalH=scrollTop+document.documentElement.clientHeight;
	    return (lastBoxH<=totalH)?true:false;
	}
	// 翻页
	function nextHotelList(){
		// tools.searchLoadingShow()
		
		var jsonDate={
			queryKey:queryKey,
			id:netUserId.split('\"')[1],
			shopKey:SabreShopKey,
			index:pageIndex,
			Language:obtLanguage,
		}
	    $.ajax(
	      {
	        type:'post',
	        url : $.session.get('ajaxUrl'), 
	        dataType : 'json',
	        data:{
	            url: $.session.get('obtCompany')+"/QueryService.svc/GetNextPageHotelPost",
	            // jsonStr:'{"queryKey":"'+queryKey+'","id":'+netUserId+',"Language":"'+obtLanguage+'"}'
	            jsonStr:JSON.stringify(jsonDate)
	        },
			// Hotels GetNextPageHotelPost(string queryKey, string id, string shopKey, string index, string Language);
	        success : function(data) {
				getNextPage=false;
				// tools.searchLoadingHide()
	            var res = JSON.parse(data);
	            console.log(res);
				// resAll=res //不需要再次缓存
				
				SabreShopKey=res.SabreShopKey;
				if(SabreShopKey=='' || SabreShopKey==null){
					if(obtLanguage=="EN"){
						$('.loadingSpan').hide()
						$('.listEnd .textSpan').text("No more hotels")
					}else{
						$('.loadingSpan').hide()
						$('.listEnd .textSpan').text("没有更多酒店了")
					}
					
				}else{
					if(obtLanguage=="EN"){
						$('.loadingSpan').show()
						$('.listEnd .textSpan').text("Loading...")
					}else{
						$('.loadingSpan').show()
						$('.listEnd .textSpan').text("正在加载...")
					}
					pageIndex++
				}
				
	            res.hotels.map(function(item){
	            	cacheHotelList.push(item);
	            })
				
				var  breakdast=$('.breakfastBtn').attr('state')
				var  freeCancel=$('.freeCancelBtn').attr('state')
				var  noGuarantee=$('.noGuaranteeBtn').attr('state')
				var  protocol=$('.protocolBtn').attr('state')
				// 含早
				if(breakdast=='click'){
					res.hotels = res.hotels.filter(function(item) {
						if(item.Breakfast>0){
							return item;
						}
					})
				}
				//免费取消
				if(freeCancel=='click'){
					res.hotels = res.hotels.filter(function(item) {
						if(item.CancelRuleType>0){
							return item;
						}
					})
				}
				// 免担保
				if(noGuarantee=='click'){
					res.hotels = res.hotels.filter(function(item) {
						if(item.NotNeedGarantee){
							return item;
						}
					})
				}
				//协议酒店
				if(protocol=='click'){
					res.hotels = res.hotels.filter(function(item) {
						if(item.IsAgreement||item.IsTMCAgreement){
							return item;
						}
					})
				}
	            // hotelListInfo(res.hotels);
	            // hotelFilter(res);
	            //排序
	            // hotelSort(res.hotels);
				if(res.hotels.length==0){
					if(obtLanguage=="EN"){
						$('.loadingSpan').hide()
						$('.listEnd .textSpan').text("No more hotels")
					}else{
						$('.loadingSpan').hide()
						$('.listEnd .textSpan').text("没有更多酒店了")
					}
					return false;
				}
				if(breakdast=='click' || freeCancel=='click'|| noGuarantee=='click'|| protocol=='click'){
					var newlist=[]
					res.hotels.map(function(item){
						newlist.push(item);
					})
					hotelListInfo(newlist);
					// hotelSort(newlist);
					// hotelFilter(newlist)
					hotelSort(cacheHotelList);
					var hotelobt={hotels:cacheHotelList}
					hotelFilter(hotelobt)
				}else{
					hotelListInfo(cacheHotelList);
					hotelSort(cacheHotelList);
					var hotelobt={hotels:cacheHotelList}
					hotelFilter(hotelobt)
				}
				
	        },
	        error : function() {
				getNextPage=false;
	          // alert('fail');
	        }
	      }
	    );
	}
