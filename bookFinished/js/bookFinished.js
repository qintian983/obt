var netUserId = $.session.get('netLoginId');
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
var finishedInfo = JSON.parse($.session.get('finishedInfo'));
var obtLanguage = $.session.get('obtLanguage');
console.log(finishedInfo)
//语言转换
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
    //如果所选语言的json中没有此内容就选取其他语言显示
    if(t==undefined) t = cn[m];
    if(t==undefined) t = en[m];
    return t;
}
//中英文对象
var cn = {
    "autoIssueRemind":"温馨提示：审核通过后，系统将自动出票",
	"progressBar":{
        "search":"查询",
        "book":"预订",
        "complete":"完成",
    },
    "finishedBody":{
    	"OrderNo":"订单号:",
    	"finishedText":"预订成功!",
    	"orderDetail":"查看订单",
        'onlinePay':"在线支付",
    },
    "approveBody":{
        "approveTittle":"审核信息",
        "selectTittle":"审核人选择",
        "approvalPrice":"总金额:",
        "comments":"申请理由:",
        "after":"审核后出票选项",
        "reason1":"直接出票-审核完成后直接出票，无需再次确认",
        "reason2":"暂缓出票-审核完成后不直接出票，请在出票时限前及时通知出票",
        "Approver1":"审核人：",
        "Approver2":"级",
        "ApproveRemind":"请正确填写！",
        "success":"提交成功",
        "confirm":"确认",
        "toApproval":"提交审核",
    },
    "clickRemind":"点击可继续预订▼",
    "continueUl":{
        'air':"机票",
        'hotel':"酒店",
        'train':"火车",
        'continue':"继续",
    },
    "remarkPop":{
        "businessTripTittle":"出差信息：",
        "remarkInfoTittle":"账单信息：",
        "tripNameTittle":"员工姓名",
        "tripCompanyTittle":"公司",
        "confirm":"确认",
        "cancel":"取消",
        "companyRemindTittle":"温馨提示",
        "companyRemindText":"因为您已更换出差公司，请确认更改后的公司抬头信息是否正确。",
        "modifySuccess":"修改成功",
        "Choose":"请选择",
        "remarkInfoRemind":"红色标志为必填项",
    },
}
var en = {
    "autoIssueRemind":"The ticket will be issued automatically after it is approved.",
	"progressBar":{
        "search":"Search",
        "book":"Book",
        "complete":"Complete",
    },
    "finishedBody":{
    	"OrderNo":"Order No:",
    	"finishedText":"Booking Successful!",
    	"orderDetail":"Order Details",
        'onlinePay':"Online Payment",
    },
    "approveBody":{
        "approveTittle":"Approval Info",
        "selectTittle":"Approver Selection",
        "approvalPrice":"Total Price:",
        "comments":"Comments:",
        "after":"After Approval：",
        "reason1":"Issue ticket immediately - Tickets will be issued immediately upon approval.",
        "reason2":"Issue ticket on further request - Tickets will not be issued until your further notification.Please inform us before the ticket deadline.",
        "Approver1":"Approver: Level",
        "Approver2":"",
        "ApproveRemind":"Please fill in correctly.",
        "success":"Submitted successfully",
        "confirm":"Confirm",
        "toApproval":"Submit For Approval",
    },
    "clickRemind":"Click To Continue Booking▼",
    "continueUl":{
        'air':"Air",
        'hotel':"Hotel",
        'train':"Train",
        'continue':"Continue",
    },
    "remarkPop":{
        "businessTripTittle":"Billing Information：",
        "remarkInfoTittle":"Remarks：",
        "tripNameTittle":"Employee Name",
        "tripCompanyTittle":"Company",
        "confirm":"Confirm",
        "cancel":"Cancel",
        "companyRemindTittle":"Kindly Reminder",
        "companyRemindText":"Because you have changed the travel company, please confirm whether the company's information is correct after the change.",
        "modifySuccess":"Modification Successful",
        "Choose":"Please Select",
        "remarkInfoRemind":"The remark in red is mandatory.",
    },
}
if(ProfileInfo.onlineStyle=="APPLE"){
    cn.clickRemind = "";
    en.clickRemind = "";
    en.continueUl.air = 'Add Air';
    en.continueUl.hotel = 'Add Hotel';
    en.continueUl.train = 'Add Train';
}
$(function(){
    showContent();//内容展示
    orderDetail();
})

function showContent(){
    $(".remarkPop").html('\
        <div class="businessTripTittle">'+get_lan('remarkPop').businessTripTittle+'</div>\
        <div class="businessTripBody"></div>\
        <div class="remarkInfoTittle">'+get_lan('remarkPop').remarkInfoTittle+'</div>\
        <div style="padding-bottom:10px;border-bottom:1px solid #f3f3f3;">\
          <div class="remarkInfoBody autoScrollY"></div>\
        </div>\
        <div style="box-sizing:border-box;padding-left:20px;font-size:14px;" class="colorRed">'+get_lan('remarkPop').remarkInfoRemind+'</div>\
        <div class="remarkFooter flexRow"></div>\
        ')
    var showOrderBtn = ProfileInfo.onlineStyle=="APPLE"?"hide":"";
	$("#main").html('\
		<div class="autoCenter">\
		    <div class="progressBar flexRow"></div>\
		    <div class="finishedBody">\
		      <div class="finishedTittle">'+get_lan('finishedBody').OrderNo+finishedInfo.orderNo+'</div>\
		      <div class="finishedText flexRow">\
		      <img class="completeIcon" src="../bookFinished/images/completeIcon.png">'+get_lan("finishedBody").finishedText+'\
		      </div>\
              <div class="flexRow '+showOrderBtn+'">\
                <div class="orderDetail">'+get_lan('finishedBody').orderDetail+'</div>\
                <div class="onlinePayBtn hide">'+get_lan('finishedBody').onlinePay+'</div>\
              </div>\
		    </div>\
            <div class="approveBody hide">\
              <div class="approveTittle">'+get_lan('approveBody').approveTittle+'</div>\
              <div class="approveContent">\
                <div class="selectTittle">'+get_lan("approveBody").selectTittle+'</div>\
                <div class="selectBody"></div>\
                <div class="flexRow">\
                  <div class="popLiTittle">'+get_lan("approveBody").approvalPrice+'</div>\
                  <div class="approvalPrice"></div>\
                </div>\
                <div class="flexRow">\
                  <div class="popLiTittle">'+get_lan("approveBody").comments+'</div>\
                  <textarea class="commentsBody" maxlength="80"></textarea>\
                </div>\
                <div class="ticketOption">\
                  <div class="selectTittle">'+get_lan("approveBody").after+'</div>\
                  <div class="flexRow" style="margin:10px 0 10px 0;"><input class="approveReason" type="radio" name="approveReason"><div style="min-height: 20px;width: 500px;margin-left: 10px;">'+get_lan("approveBody").reason1+'</div></div>\
                  <div class="flexRow" style="margin-bottom:10px;"><input class="approveReason" type="radio" name="approveReason" checked><div style="min-height: 20px;width: 500px;margin-left: 10px;">'+get_lan("approveBody").reason2+'</div></div>\
                </div>\
              </div>\
              <div class="approvalFooter">\
                <div class="sureApprovalBtn">'+get_lan("approveBody").confirm+'</div>\
              </div>\
            </div>\
            <div class="footer flexRow">\
              <div class="continueBookBody">\
                <div class="bookRemind">'+get_lan('clickRemind')+'</div>\
                <div class="flexRow continueUl">\
                    <div class="continueLi airLi">\
                      <div class="continueLiImg airImg" name="air"></div>\
                      <div class="continueLiText">'+get_lan('continueUl').air+'</div>\
                    </div>\
                    <div class="continueLi hotelLi">\
                      <div class="continueLiImg hotelImg" id="indexHotelTab" name="hotel"></div>\
                      <div class="continueLiText">'+get_lan('continueUl').hotel+'</div>\
                    </div>\
                    <div class="continueLi trainLi">\
                      <div class="continueLiImg trainImg" name="train"></div>\
                      <div class="continueLiText">'+get_lan('continueUl').train+'</div>\
                    </div>\
                </div>\
              </div>\
            </div>\
		</div>\
	')
    if(ProfileInfo.onlineStyle=="APPLE"){
        $(".completeIcon").attr("src","../bookFinished/images/appleCompleteIcon.png");
        $(".airImg").css("background-image",'url(../../bookFinished/images/appleAir.png)');
        $(".hotelImg").css("background-image",'url(../../bookFinished/images/appleHotel.png)');
        $(".trainImg").css("background-image",'url(../../bookFinished/images/appleRail.png)');
        $(".continueBookBody").css("width","65%");
        $(".footer").append('\
            <div style="width:100px;height:180px;margin-top:78px;font-size:22px;line-height:180px;">OR</div>\
            <div class="continueBody" style="margin-top:78px;">\
              <div class="continueLiImg continueImg" name="continue"></div>\
              <div class="continueLiText">'+get_lan('continueUl').continue+'</div>\
            </div>\
            ')
        $(".continueBody").unbind("click").click(function(){
            var searchOrderInfo = {
                'orderNo':finishedInfo.orderNo,
            }
            $.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
            window.location.href='../../orders/orderDetails.html';
        })
    }
    approvalInfo();
	$(".progressBar").html('\
	    <div class="progressLine"></div><div class="progressCircle"></div>'+get_lan('progressBar').search+'\
	    <div class="progressLine"></div><div class="progressCircle"></div>'+get_lan('progressBar').book+'\
	    <div class="progressLine"></div><div class="progressCircle"></div><span>'+get_lan('progressBar').complete+'</span>\
	')
	if(obtLanguage=="EN"){
		$(".completeIcon").css("margin-left","35%");
	}
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
            $(".onlinePayBtn").attr("phone",res.Phone);
            if(!res.isDomesticAir&&!res.isInterAir){
                $(".airLi ").remove();
            }
            if(!res.isHotel){
                $(".hotelLi ").remove();
            }
            if(!res.isTrain){
                $(".trainLi").remove();
            }
            $(".continueLi").css("width",(600/parseInt($(".continueLi").length))+"px");
            $(".continueLiText").css("width",(600/parseInt($(".continueLi").length)-100)+"px");
            $(".continueLiImg").css("margin","15px "+(300/parseInt($(".continueLi").length)-85)+"px");
            $("#main").attr("ApproveAutoIssue",res.ApproveAutoIssue);
            $("#main").attr("IsTicket",res.IsTicket);
        },
        error : function() {
          // alert('fail');
        }
      }
    );
}
function orderDetail(){
    $(".orderDetail").unbind("Click").click(function(){
        var searchOrderInfo = {
            'orderNo':finishedInfo.orderNo,
        }
        $.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
        window.location.href='../../orders/orderDetails.html';
    })
}
function approvalInfo(){
    $('body').mLoading("show");
    $.ajax( 
      {
        type:'post',
        url : $.session.get('ajaxUrl'),
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/OrderService.svc/ListDetailPost",
            jsonStr:'{"orderNo":"'+finishedInfo.orderNo+'","id":'+netUserId+',"Language":"'+obtLanguage+'"}'
        },
        success : function(data) {
            var res = JSON.parse(data);
            var detailInfo = res;
            console.log(res);
            // if(res.ShowPayment&&!res.Offline_Pay){
            //     $(".onlinePayBtn").removeClass("hide");
            //     $(".orderDetail").css("margin","20px 0 0 470px");
            //     $(".onlinePayBtn").attr("orderNo",res.orderNo);
            //     $(".onlinePayBtn").unbind("click").click(function(){
            //         $.ajax(
            //           {
            //             type:'post',
            //             url : $.session.get('ajaxUrl'),
            //             dataType : 'json',
            //             data:{
            //               url: $.session.get('obtCompany')+"/OrderService.svc/SubmitGotoYeepayLink",
            //               jsonStr:'{"orderNo":"'+finishedInfo.orderNo+'","id":'+netUserId+',"phone":"'+$(this).attr("phone")+'"}'
            //             },
            //             success : function(data) {
            //               var res = JSON.parse(data);
            //               console.log(res);
            //               if(res.status=="S"){
            //                 window.open(""+res.salelink+"");
            //                 window.location.href = '../../orders/orders.html';
            //               }else{
            //                 alert(res.msg);
            //               }
            //             },
            //             error : function() {
            //               // alert('fail');
            //             }
            //           }
            //         )
            //     })
            // }
            $(".continueLiImg").unbind("click").click(function(){
                $.session.set('goOnBookOrderNo', finishedInfo.orderNo);
                if($(this).attr("name")=="air"){
                    window.location.href='../../search/queryAir.html';
                }else if($(this).attr("name")=="hotel"){
                    if(ProfileInfo.HotelJumpHRS){
                        window.open(ProfileInfo.HotelJumpHRS_Url);
                    }else{
                        if(detailInfo.Segment.length>0&&compareDate(detailInfo.Segment[0][0].ArrivesDate)){
                            var goOnBookHotelInfo = {
                                "ArriveCityCode":detailInfo.Segment[0][0].ArriveCityCode,
                                "ArriveCity":detailInfo.Segment[0][0].ArriveCity,
                                "ArrivesDate":detailInfo.Segment[0][0].ArrivesDate,
                                "type":detailInfo.Segment[0][0].IsDomestic,
                            }
                            $.session.set('goOnBookHotelInfo', JSON.stringify(goOnBookHotelInfo));
                            window.location.href='../../search/queryHotel.html';
                        }else{
                            window.location.href='../../search/queryHotel.html';
                        }
                    }
                }else if($(this).attr("name")=="train"){
                    window.location.href='../../search/queryTrain.html';
                }
            })
            // 2020.11.26 酒店跳转
            if(ProfileInfo.HotelJumpHRSWeb){
                $('#indexHotelTab').unbind("click").click(function(){
                    window.open(ProfileInfo.HRSWebsite);
                })
            }
            $(".approvalPrice").text(res.OrderFare);
            if(res.ShowApproval&&!res.UploadFileApprove){
                checkRemark(detailInfo);
                // approvalBody(detailInfo);
            }else{
                $('body').mLoading("hide");
                $(".approveBody").remove();
            }
        },
        error : function() { 
          // alert('fail');
        }
      }
    );
}
function compareDate(date1){
    var oDate1 = new Date(date1);
    var oDate2 = new Date();
    if(oDate1.getTime() > oDate2.getTime()){
        return true;
    } else {
        return false;
    }
}
function checkRemark(orderRes){
    $('body').mLoading("show");
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'),
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/SystemService.svc/CheckCustomerRemarkForInvoicePost",
            jsonStr:'{"id":'+netUserId+',"orderNo":"'+orderRes.OrderNo+'","language":"'+obtLanguage+'"}'
        },
        success : function(data) {
            $('body').mLoading("hide");
            var res = JSON.parse(data);
            console.log(res);
            if(res.code=="200"){
                if(res.needShowRemark||ProfileInfo.HotelGKBooking){
                    $(".approveBody").removeClass("hide");
                    $(".approveBody").css("min-height","100px");
                    $(".approveBody").html('\
                        <div class="approveTittle">'+get_lan('approveBody').approveTittle+'</div>\
                        <div class="toApproval" style="width: 200px; height: 20px;line-height: 20px;border: 1px solid #C2C2C2;margin: 0 auto;border-radius: 5px;text-align: center;font-size: 14px;margin-top: 20px;cursor: pointer;">'+get_lan('approveBody').toApproval+'</div>\
                        ')
                    $(".toApproval").unbind("click").click(function(){
                        var searchOrderInfo = {
                            'orderNo':finishedInfo.orderNo,
                            'approval':true,
                        }
                        $.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
                        window.location.href='../../orders/orderDetails.html';
                    })
                    // var customerId = res.customerRemarkList[0].customerId;
                    // var employeeName = res.customerRemarkList[0].customerName;
                    // remarkInfoPop(customerId,employeeName,res.customerRemarkList[0].remarkList,'invoice',orderRes);
                }else{
                    // closeRemarkPop();
                    approvalBody(orderRes);
                }
            }
        },
        error : function() {
          // alert('fail');
        }
      }
    );
}
/*备注信息弹窗*/
// function remarkInfoPop(CustomerID,employeeName,remarks,remarkType,orderRes){
//     openRemarkPop();
//     if(remarkType=="invoice"){
//         console.log(cn)
//         cn.remarkPop.remarkInfoTittle="请将您的账单信息补充完整：";
//         en.remarkPop.remarkInfoTittle="Pleasecompletethebillinginformation:";
//     }else{
//         cn.remarkPop.remarkInfoTittle="账单信息：";
//         en.remarkPop.remarkInfoTittle="Billing Information:";
//     }
//     $(".remarkInfoTittle").text(get_lan("remarkPop").remarkInfoTittle);
//     $(".businessTripBody").html('\
//         <div class="businessTripLi flexRow">\
//             <div class="tripLiTittle">'+get_lan('remarkPop').tripNameTittle+'</div>\
//             <div class="employeeName">'+employeeName+'</div>\
//         </div>\
//         ')
//     remark(remarks,CustomerID);
//     function remark(remarks,CustomerID){
//         $(".remarkInfoBody").html('');
//         remarks.map(function(item,index){
//             var colorRed = item.Input.indexOf("4") != -1||item.Input==""?"":"colorRed";
//             if(!item.CanModify){
//                 $(".remarkInfoBody").append('\
//                     <div class="remarkLi flexRow">\
//                       <div class="liTittle ellipsis '+colorRed+'">'+item.Title+'</div>\
//                       <div class="liContent" index="'+item.Index+'"><input class="remarkLiInput" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'" key="'+item.SubmitContent+'" disabled></div>\
//                     </div>\
//                 ')
//             }else if(item.CanModify&&item.InList){
//                 $(".remarkInfoBody").append('\
//                     <div class="remarkLi flexRow">\
//                       <div class="liTittle ellipsis '+colorRed+'">'+item.Title+'</div>\
//                       <div class="liContent">\
//                         <select class="remarkSelect" index="'+index+'">\
//                           <option>'+get_lan("remarkPop").Choose+'</option>\
//                         </select>\
//                         <input class="remarkLiInput" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'" key="'+item.SubmitContent+'" readonly>\
//                       </div>\
//                     </div>\
//                 ')
//             }else if(item.CanModify&&!item.InList){
//                 $(".remarkInfoBody").append('\
//                     <div class="remarkLi flexRow">\
//                       <div class="liTittle ellipsis '+colorRed+'">'+item.Title+'</div>\
//                       <div class="liContent">\
//                         <select class="remarkSelect" index="'+index+'">\
//                           <option>'+get_lan("remarkPop").Choose+'</option>\
//                         </select>\
//                         <input class="remarkLiInput" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'">\
//                       </div>\
//                     </div>\
//                 ')
//             }
//         })
//         for(var i=0;i<$(".remarkSelect").length;i++){
//             var index = parseInt($(".remarkSelect").eq(i).attr("index"));
//             if(remarks[index].Items.length!=0){
//                 remarks[index].Items.map(function(item){
//                     var itemValue = item.Value==null?item.Key:item.Value;
//                     $(".remarkSelect").eq(i).append('\
//                         <option class="remarkOption" key="'+item.Key+'" index="'+index+'">'+itemValue+'</option>\
//                         ')
//                 })
//             }else{
//                 $(".remarkSelect").eq(i).hide();
//             }
//             $(".remarkSelect").eq(i).change(function(){
//                 var index = parseInt($(this).find("option:selected").attr("index"));
//                 $(".remarkLiInput").eq(index).val($(this).find("option:selected").text());
//                 $(".remarkLiInput").eq(index).attr('key',$(this).find("option:selected").attr("key"));
//             })
//         }
//         $(".remarkFooter").html('\
//             <div class="closeRemarkBtn" style="margin-left:10%;">'+get_lan('remarkPop').cancel+'</div>\
//             <div class="sureRemarkBtn" style="margin-left:38%;">'+get_lan('remarkPop').confirm+'</div>\
//             ')
//         $(".closeRemarkBtn").unbind("click").click(function(){
//             closeRemarkPop();
//         })
//         $(".sureRemarkBtn").unbind("click").click(function(){
//             var remarks = '';
//             for(var i = 0;i<$(".remarkLiInput").length;i++){
//                 if(!$(".remarkLiInput").eq(i).attr("key")){
//                     remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).val()+',';
//                 }
//                 if($(".remarkLiInput").eq(i).attr("key")){
//                     remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).attr("key")+',';
//                 }
//             }
//             var isCopy = false;
//             $('body').mLoading("show");
//             $.ajax(
//               {
//                 type:'post',
//                 url : $.session.get('ajaxUrl'), 
//                 dataType : 'json',
//                 data:{
//                     url: $.session.get('obtCompany')+"/SystemService.svc/UpdateOrderRemark",
//                     jsonStr:'{"id":'+netUserId+',"orderNo":"'+orderNo+'","customerId":"'+CustomerID+'","remarkStr":"'+remarks.substring(0,remarks.length-1)+'","Language":"'+obtLanguage+'"}'
//                 },
//                 success : function(data) {
//                     $('body').mLoading("hide");
//                     var res = JSON.parse(data);
//                     console.log(res);
//                     if(res == "true"){
//                         if(remarkType=="order"){
//                             alert(get_lan("remarkPop").modifySuccess);
//                             window.location.reload();
//                         }else if(remarkType=="invoice"){
//                             checkRemark(orderRes);
//                         }
//                     }else{
//                         alert(res);
//                     }
//                 },
//                 error : function() {
//                   // alert('fail');
//                 }
//               }
//             );
//         })
//     }
// }
function approvalBody(orderRes){
    if($("#main").attr("ApproveAutoIssue")=="true"){
        $(".ticketOption").html(get_lan("autoIssueRemind"));
        $(".ticketOption").css("color","red");
    }
    if($("#main").attr("IsTicket")=="1"){
        $(".approveReason").eq(0).prop("checked",true);
        $(".approveReason").eq(1).removeAttr("checked");
    }
    $(".approveBody").removeClass("hide");
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/OrderService.svc/GetApprovalInfoPost",
            jsonStr:'{"id":'+netUserId+',"orderNo":"'+orderRes.OrderNo+'","maxLevel":"'+orderRes.ApprovalLevel+'"}'
        },
        success : function(data) {
            $('body').mLoading("hide");
            var res = JSON.parse(data);
            console.log(res);
            $(".selectBody").html('');
            if(!orderRes.MoreApproversSubmit){
            res.Approvers.map(function(item,index){
                $(".selectBody").append('\
                    <div class="flexRow" style="margin-top:5px;">\
                      <div class="popLiTittle">'+get_lan("approveBody").Approver1+(index+1)+' '+get_lan("approveBody").Approver2+'</div>\
                      <select class="ApproverSelect"></select>\
                    </div>\
                    ')
                if(item.Value.length>1){
                    $(".ApproverSelect").eq(index).html('\
                        <option value="">'+get_lan("remarkPop").Choose+'</option>\
                        ')
                }
                item.Value.map(function(vItem){
                    var name = obtLanguage=="CN"?vItem.NameCN:vItem.NameEN
                    $(".ApproverSelect").eq(index).append('\
                        <option value="'+vItem.CustomerId+'">'+name+'</option>\
                    ')
                })
            })
            }else{
                res.Approvers.map(function(item,index){
                    $(".selectBody").append('\
                        <div class="flexRow" style="margin-top:5px;">\
                          <div class="popLiTittle">'+get_lan("approveBody").Approver1+(index+1)+' '+get_lan("approveBody").Approver2+'</div>\
                          <div class="ApproverSelectBody">\
                            \
                          </div>\
                        </div>\
                        ')
                    if(item.Value.length>2){
                        $(".ApproverSelectBody").eq(index).addClass("autoScrollY");
                    }
                    item.Value.map(function(vItem){
                        var name = obtLanguage=="CN"?vItem.NameCN:vItem.NameEN
                        $(".ApproverSelectBody").eq(index).append('\
                            <div class="ApproverSelectLi" value="'+(index+1)+'-'+vItem.CustomerId+'">'+name+'</div>\
                        ')
                    })
                })
            }
            // $('body').mLoading("show");
            // $.ajax(
            //   {
            //     type:'post',
            //     url : $.session.get('ajaxUrl'), 
            //     dataType : 'json',
            //     data:{
            //         url: $.session.get('obtCompany')+"/SystemService.svc/ProfilePost",
            //         jsonStr:'{"key":'+netUserId+'}'
            //     },
            //     success : function(data) {
            //         var res = JSON.parse(data);
            //         console.log(res);
            //         $('body').mLoading("hide");
            //         if(res.ApproveAutoIssue){
            //             $(".ticketOption").html(get_lan("autoIssueRemind"));
            //             $(".ticketOption").css("color","red");
            //         }
            //         if(res.IsTicket==1){
            //             $(".approveReason").eq(0).prop("checked",true);
            //             $(".approveReason").eq(1).removeAttr("checked");
            //         }
            //     },
            //     error : function() {
            //       // alert('fail');
            //     }
            //   }
            // );
            $(".sureApprovalBtn").unbind("click").click(function(){
                if($(".commentsBody").val()==""){
                    alert(get_lan("approveBody").ApproveRemind);
                }else{
                    if($(".approveReason").eq(0).prop("checked")||$(".approveReason").length==0){
                        var isTicket = '1';
                    }else if($(".approveReason").eq(1).prop("checked")){
                        var isTicket = '0';
                    }
                    if(!orderRes.MoreApproversSubmit){
                        var approvers = '';
                        for(var i=0;i<$(".ApproverSelect").length;i++){
                            if($('.ApproverSelect option:selected').eq(i).val()!=""){
                                approvers += (i+1)+'-'+$('.ApproverSelect option:selected').eq(i).val();
                                approvers += ',';
                            }else{
                                alert(get_lan("approvalPop").ApproveRemind);
                                return false;
                            }
                        }
                        approvers = approvers.substring(0,approvers.length-1);
                    }else{
                        var approvers = '';
                        for(var i=0;i<$(".ApproverSelectLi").length;i++){
                            approvers += $('.ApproverSelectLi').eq(i).attr("value");
                            approvers += ',';
                        }
                        approvers = approvers.substring(0,approvers.length-1);
                        console.log(approvers);
                    }
                    
                    var key = res.ApplicationNO+','+orderRes.OrderNo+','+orderRes.ApprovalLevel;
                    $('body').mLoading("show");
                    $.ajax(
                      {
                        type:'post',
                        url : $.session.get('ajaxUrl'),
                        dataType : 'json',
                        data:{
                            url: $.session.get('obtCompany')+"/OrderService.svc/ApprovalSubmitNew",
                            jsonStr:'{"id":'+netUserId+',"reasonContent":"'+$(".commentsBody").val().replace(/\n/g, " ").replace(/\s/g, " ")+'","approvers":"'+approvers+'","key":"'+key+'","remarkKey":"no","isTicket":"'+isTicket+'","language":"'+obtLanguage+'"}'
                        },
                        success : function(data) {
                            $('body').mLoading("hide");
                            var res = JSON.parse(data);
                            console.log(res);
                            if(res=="SUCCESS"){
                                alert(get_lan("approveBody").success)
                                var searchOrderInfo = {
                                    'orderNo':finishedInfo.orderNo,
                                }
                                $.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
                                window.location.href='../../orders/orderDetails.html';
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

function openRemarkPop(){
    $("#cover").show();
    $(".remarkPop").css("display","block");
}
function closeRemarkPop(){
    $("#cover").hide();
    $(".remarkPop").css("display","none");
}