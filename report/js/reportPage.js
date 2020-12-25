var netUserId = $.session.get('netLoginId');
//中英文对象
var cn = {
    "tabList":{
    	"air":"机票",
    	"hotel":"酒店",
    	"train":"火车",
    }
}
var en = {
    "tabList":{
    	"air":"Air",
    	"hotel":"Hotel",
    	"train":"Train",
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
	var myiframeH = $(document).height()-172;
	$("#reportIframe").height(myiframeH);
	$(".tabList").css("height",myiframeH+"px");
	$(".tabList").html('\
		<div class="tabLi AirTab flexRow tabLiActive"><img src="../report/images/airIcon.png" class="tabIcon">'+get_lan("tabList").air+'</div>\
		<div class="tabLi HotelTab flexRow"><img src="../report/images/hotelIcon.png" class="tabIcon">'+get_lan("tabList").hotel+'</div>\
		<div class="tabLi TrainTab flexRow"><img src="../report/images/trainIcon.png" class="tabIcon">'+get_lan("tabList").train+'</div>\
		')
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
	        if(!res.isDomesticAir&&!res.isInterAir){
	            $(".AirTab").hide();
	        }
	        if(!res.isHotel){
	            $(".HotelTab").hide();
	        }
	        if(!res.isTrain){
	            $(".TrainTab").hide();
	        }
	        $.ajax(
	          {
	            type:'post',
	            url : $.session.get('ajaxUrl'),
	            dataType : 'json',
	            data:{
	                url: $.session.get('obtCompany')+"/OrderService.svc/GetCompanyReportPost",
	                jsonStr:'{"id":'+netUserId+',"companyID":"'+res.CompanyID+'","Language":"'+obtLanguage+'"}'
	            },
	            success : function(data) {
	                var res = JSON.parse(data);
	                console.log(res);
	                res.map(function(item){
	                	if(item.ReportType==1){
	                		$(".AirTab").attr("url",item.CompanyReportUrl);
	                		$("#reportIframe").attr("src",item.CompanyReportUrl);
	                	}
	                	if(item.ReportType==2){
	                		$(".HotelTab").attr("url",item.CompanyReportUrl);
	                	}
	                	if(item.ReportType==3){
	                		$(".TrainTab").attr("url",item.CompanyReportUrl);
	                	}
	                })
	                $(".tabLi").unbind("click").click(function(){
	                	if(!$(this).hasClass("tabLiActive")){
	                		$(".tabLi").removeClass("tabLiActive");
	                		$(this).addClass("tabLiActive");
	                		$("#reportIframe").attr("src",$(this).attr("url"));
	                	}
	                })
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
})
