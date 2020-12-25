var Language = tools.queryString().Language;
var invoiceNo = tools.queryString().invoiceNo;
var apiUrl = tools.queryString().apiUrl;
var url = tools.queryString().url;

//语言转换
function get_lan(m)
{
    //获取文字
    var lan = tools.queryString().Language;     //语言版本
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
	"invoice":"账单",
    "to":"至:",
    "attn":"收件人:",
    "NO":"编号: ",
    "AcNo":"客户编号: ",
    "date":"日期: ",
    "ourSo":"销售档案:",
    "staffId":"列印人:",
    "description":"描述",
    "Tkt":"票据",
    "unitFare":"单价",
    "Tax":"税金",
    "qty":"数量",
    "amount":"金额",
    "totalFare":"总计:",
    "serviceFee":"服务费:",
    "invoiceOperator":"操作员 : ",
}
var en = {
	"invoice":"INVOICE",
	"to":"To:",
	"attn":"Attn:",
	"NO":"No.: ",
	"AcNo":"A/C No: ",
	"date":"Date: ",
	"ourSo":"XO No:",
	"staffId":"Staff ID:",
	"description":"Description",
	"Tkt":"Tkt/Voucher",
	"unitFare":"Unit Fare",
	"Tax":"Tax",
	"qty":"Qty",
	"amount":"Amount",
	"totalFare":"Total:",
	"serviceFee":"Service Fee:",
	"invoiceOperator":"Invoice Operator : ",
}
$(function(){
	$("#main").html('\
		<div class="autoCenter">\
		  <div class="billHeader">\
		    <div class="billLogoImg"></div>\
		    <div class="companyTittle"></div>\
		    <div class="companyInfo"></div>\
		  </div>\
		  <div class="billContent">\
		    \
		  </div>\
		</div>\
		')
	$('body').mLoading("show");
	$.ajax(
	  {
	    type:'post',
	    url : apiUrl, 
	    dataType : 'json',
	    data:{
	    	url: url,
	    	jsonStr:'{"invoiceNo":"'+invoiceNo+'","Language":"'+Language+'"}',
	    },
	    success : function(data) {
	    	$('body').mLoading("hide");
	        var res = JSON.parse(data);
	        console.log(res);
	        $(".companyTittle").html(res.companyInfo.companyTitle);
	        $(".companyInfo").html(res.companyInfo.addressCn+'<br/>'+res.companyInfo.addressEn+'<br/>Fax:'+res.companyInfo.fax+'<br/>Email:'+res.companyInfo.email);

	        var addressEn = res.companyInfo.addressEn!=""?res.companyInfo.addressEn+'<br/>':"";
	        $(".billLogoImg").css("background-image","url('../../bill/images/companyLogo.png')");
	        var companyFullName = Language=="CN"?res.companyInfo.companyFullNameCn:res.companyInfo.companyFullNameEn;
	        $(".billContent").append('\
	        	<div class="billTittle">'+get_lan("invoice")+'</div>\
	        	<div class="flexRow">\
	        	  <div style="width:900px;margin-top:60px;">\
	        	    <div class="toBody flexRow">\
	        	      <div class="toTittle">'+get_lan("to")+'</div>\
	        	      <div class="toText">'+addressEn+companyFullName+'</div>\
	        	    </div>\
	        	    <div class="attnBody flexRow">\
	        	      <div class="attnTittle">'+get_lan("attn")+'</div>\
	        	      <div class="attnText">'+res.customerList[0].nameCn+'</div>\
	        	    </div>\
	        	  </div>\
	        	  <div class="billInfo">\
	        	    <div style="font-size:20px;">'+get_lan("NO")+res.invoiceNo+'</div>\
	        	    <div>'+get_lan("AcNo")+res.companyInfo.companyName+'</div>\
	        	    <div>'+get_lan("date")+res.createDate+'</div>\
	        	  </div>\
	        	</div>\
	        	<div class="billList">\
	        	  <div class="billListTittle flexRow">\
	        	    <div style="width:350px;">'+get_lan("description")+'</div>\
	        	    <div style="width:200px;">'+get_lan("Tkt")+'</div>\
	        	    <div style="width:200px;">'+get_lan("unitFare")+'</div>\
	        	    <div style="width:150px;">'+get_lan("Tax")+'</div>\
	        	    <div style="width:100px;">'+get_lan("qty")+'</div>\
	        	    <div style="width:160px;">'+get_lan("amount")+'</div>\
	        	  </div>\
	        	</div>\
	        	<div class="remarkInfo">\
	        	</div>\
	        	<div class="totalFare"><span style="position:absolute;left:20px;">'+get_lan("invoiceOperator")+res.invoiceOperator+'</span>'+get_lan("totalFare")+'<span class="currency" style="margin:0 50px 0 50px;"></span>'+res.totalAmount+'</div>\
	        	<div style="height:200px;width:500px;font-size:13px;margin:50px 0 0 20px;">\
	        	'+res.detail+'\
	        	</div>\
	        ')
	        if(res.airList.length>0){
	        	res.airList.map(function(aItem){
	        		var segmentsInfo = '';
	        		aItem.SegmentsList.map(function(sItem){
	        			if(Language=="CN"){
	        				segmentsInfo += sItem.orgAirPortNameCn+sItem.desAirPortNameCn+'<br/>';
	        			}else{
	        				segmentsInfo += sItem.orgAirPortNameEn+sItem.desAirPortNameEn+'<br/>';
	        			}
	        			segmentsInfo += sItem.depTime +'~' +sItem.arrTime;
	        		})
	        		$(".billList").append('\
	        			<div class="billLi flexRow">\
	        			  <div style="width:350px;">\
	        			    '+aItem.customerNameCn+' '+aItem.customerNameEn+'<br>\
	        			    '+aItem.region+'<br>\
	        			    '+segmentsInfo+'\
	        			  </div>\
	        			  <div style="width:200px;">'+aItem.ticketNo+'</div>\
	        			  <div style="width:200px;">'+aItem.netFare+aItem.currency+'</div>\
	        			  <div style="width:150px;">'+aItem.tax+'</div>\
	        			  <div style="width:100px;">1</div>\
	        			  <div style="width:160px;">'+aItem.netFare+aItem.currency+'</div>\
	        			</div>\
	        		')
	        	})
	        	$(".currency").text(res.airList[0].currency);
	        }
	        if(res.hotelList.length>0){
	        	res.hotelList.map(function(hItem){
	        		$(".billList").append('\
	        			<div class="billLi flexRow">\
	        			  <div style="width:350px;">\
	        			    '+hItem.customerNameCn+' '+hItem.customerNameEn+'<br>\
	        			    '+hItem.hotelNameCn+'<br>\
	        			    '+hItem.hotelNameEn+'<br>\
	        			    '+hItem.roomType+'<br>\
	        			    '+hItem.bedType+'<br>\
	        			    '+hItem.checkin+'~'+hItem.checkin+'<br>\
	        			  </div>\
	        			  <div style="width:200px;"></div>\
	        			  <div style="width:200px;">'+hItem.dailyRate+hItem.currency+'</div>\
	        			  <div style="width:150px;">0</div>\
	        			  <div style="width:100px;">'+hItem.nights+'</div>\
	        			  <div style="width:160px;">'+(parseInt(hItem.dailyRate)*parseInt(hItem.nights))+hItem.currency+'<br>'+get_lan("serviceFee")+hItem.serviceFee+hItem.currency+'</div>\
	        			</div>\
	        		')
	        	})
	        	$(".currency").text(res.hotelList[0].currency);
	        }
	        if(res.otherList.length>0){
	        	res.otherList.map(function(oItem){
	        		$(".billList").append('\
	        			<div class="billLi flexRow">\
	        			  <div style="width:350px;">\
	        			    '+oItem.customerNameCn+' '+oItem.customerNameEn+'<br>\
	        			    '+oItem.trainCode+'<br>\
	        			    '+oItem.orgCityNameCn+'~'+oItem.desCityNameCn+'<br>\
	        			    '+oItem.orgCityNameEn+'~'+oItem.desCityNameEn+'<br>\
	        			    '+oItem.depTime+'~'+oItem.arrTime+'<br>\
	        			  </div>\
	        			  <div style="width:200px;"></div>\
	        			  <div style="width:200px;">'+oItem.netFare+oItem.currency+'</div>\
	        			  <div style="width:150px;">0</div>\
	        			  <div style="width:100px;">1</div>\
	        			  <div style="width:160px;">'+oItem.netFare+oItem.currency+'<br>'+get_lan("serviceFee")+oItem.serviceFee+oItem.currency+'</div>\
	        			</div>\
	        		')
	        	})
	        	$(".currency").text(res.otherList[0].currency);
	        }
	        res.customerList.map(function(item,index){
	        	$(".remarkInfo").append('\
	        		<div>'+item.nameCn+' '+item.nameEn+'</div>\
	        		<div class="remarkList flexWrap">\
	        		</div>\
	        	')
	        	var remarks = "";
	        	item.customerRemarks.map(function(rItem){
	        		remarks+='<div style="margin-right:20px;">'+rItem.remarkName+' : '+rItem.remarkValue+'</div>'
	        	})
	        	$(".remarkList").eq(index).html(remarks);
	        })
	        $('body').append("<p class='hide'>completed</p>");
	    },
	    error : function() {
	      // alert('fail');
	    }
	  }
	);
})