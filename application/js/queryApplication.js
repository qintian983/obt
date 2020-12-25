var netUserId = $.session.get('netLoginId');
var obtLanguage = $.session.get('obtLanguage');
$(function(){
    showContent();//内容展示
})
//中英文对象
var cn = {
    "applicationTittle":"审批单列表",
    "approvalSearch":{
        "dateTittle":"申请时间",
        "applicant":"申请人",
        "status":"状态",
        "applicationType":"审核类型",
        "searchApplication":"审核查询",
        "pending":"审核中",
        "approved":"审核通过",
        "declined":"审核未通过",
    },
    "approveTabbar":{
        "approveTab1":"当前审核单",
        "approveTab2":"历史审核单",
    },
    "approvalList":{
        "employee":"员工",
        "orderNo":"订单号",
        "applicationDate":"申请时间",
        "distance":"距离提交时间",
        "applicationReason":"申请理由",
        "estimmatedAmount":"预估金额",
        "details":"详细",
    },
    'table':{
        'type':'类型',
        'route':'行程',
        'travelTime':'行程时间',
        'reason':'金额',
    },
}
var en = {
    "applicationTittle":"Approval List",
    "approvalSearch":{
        "dateTittle":"Application Date",
        "applicant":"Applicant",
        "status":"Status",
        "applicationType":"Application Type",
        "searchApplication":"Search Application",
        "pending":"Pending",
        "approved":"Approved",
        "declined":"Declined",
    },
    "approveTabbar":{
        "approveTab1":"Current Application",
        "approveTab2":"Historical Application",
    },
    "approvalList":{
        "employee":"Employee",
        "orderNo":"Order No.",
        "applicationDate":"Application Date",
        "distance":"Time From Application",
        "applicationReason":"Application Reason",
        "estimmatedAmount":"Estimated Amount",
        "details":"Details",
    },
    'table':{
        'type':'Type',
        'route':'Route',
        'travelTime':'Travel Time',
        'reason':'Amount',
    },
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
//内容展示
function showContent(){
    $("#main").html('\
        <div class="autoCenter">\
          <div style="height:19px;"></div>\
          <div class="applicationTittle">'+get_lan("applicationTittle")+'</div>\
        <div>\
        <div class="approvalSearch">\
          <div class="approvalSearchDate flexRow">\
            <div style="width:120px;">'+get_lan("approvalSearch").dateTittle+'</div>\
            <input id="approveDepartDate">\
            <div style="width:30px;height:1px;background:#555;margin:39px 50px 0 50px;"></div>\
            <input id="approveArriveDate">\
          </div>\
          <div class="approvalSearchInfo flexRow">\
              <div style="width:120px;">'+get_lan("approvalSearch").applicant+'</div>\
              <input id="applicantInput">\
              <div style="width:95px;text-align:right;margin-right:35px;">'+get_lan("approvalSearch").status+'</div>\
              <select id="statusInput">\
                <option>'+get_lan("approvalSearch").pending+'</option>\
                <option>'+get_lan("approvalSearch").approved+'</option>\
                <option>'+get_lan("approvalSearch").declined+'</option>\
              </select>\
              <div style="width:115px;text-align:right;margin-right:25px;">'+get_lan("approvalSearch").applicationType+'</div>\
              <input id="applicationTypeInput">\
          </div>\
          <div class="searchApplication">'+get_lan("approvalSearch").searchApplication+'</div>\
        </div>\
        <div class="approveTabbar flexRow">\
          <div class="approveTab approveTabActive">'+get_lan("approveTabbar").approveTab1+'</div>\
          <div class="approveTab">'+get_lan("approveTabbar").approveTab2+'</div>\
        </div>\
        <div class="approvalList">\
          <div class="approvalListTittle flexRow">\
            <div style="width:16px"></div>\
            <input type="checkbox" class="allCheckBox">\
            <div style="width:100px;margin-left:10px;">'+get_lan("approvalList").employee+'</div>\
            <div style="width:150px;margin-left:5px;">'+get_lan("approvalList").orderNo+'</div>\
            <div style="width:150px;margin-left:5px;">'+get_lan("approvalList").applicationDate+'</div>\
            <div style="width:220px;margin-left:5px;">'+get_lan("approvalList").distance+'</div>\
            <div style="width:260px;margin-left:5px;">'+get_lan("approvalList").applicationReason+'</div>\
            <div style="width:160px;margin-left:5px;">'+get_lan("approvalList").estimmatedAmount+'</div>\
          </div>\
        </div>\
    ')
    $(".allCheckBox").hide();
    $('body').mLoading("show");
    $(".approvalSearch").hide();
    /*申请时间*/
    $("#approveDepartDate").datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        // minDate: 0,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        onSelect:function(){
            var departureValue = new Date($("#approveDepartDate").val().replace(/-/g, "/"));
            $("#approveArriveDate").datepicker('destroy');
            $("#approveArriveDate").datepicker({
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                minDate: departureValue,  // 当前日期之后的 0 天，就是当天
                maxDate: getNextYear(departureValue),  // 当前日期之后的 0 天，就是当天
                hideIfNoPrevNext: true,
                showOtherMonths: true,
                selectOtherMonths: true,
            });
            $("#approveArriveDate").val(getNextDay($("#approveDepartDate").val()));
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
    function getNextYear(d){
        d = new Date(d);
        d = +d + 1000*60*60*24*360;
        d = new Date(d);
        //格式化
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    }
    /*审核列表*/
    $.ajax( 
      { 
        type:'post', 
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/OrderService.svc/ApproveListPost",
            jsonStr:'{"id":'+netUserId+',"Language":"'+$.session.get('obtLanguage')+'"}'
        },
        success : function(data) {
            $('body').mLoading("hide");
            var res = JSON.parse(data)
            // console.log(res);
            if(res.length != 0){
                var approveList = [];
                var approveListHistory = [];
                res.map(function(item){
                    if(!item.IsHistory){
                        approveList.push(item);
                    }else{
                        approveListHistory.push(item);
                    }
                })
                console.log(approveList);
                approveListShow(approveList);
                $(".approveTab").eq(0).unbind("click").click(function(){
                    approveListShow(approveList);
                    $(".approveTab").removeClass("approveTabActive");
                    $(this).addClass("approveTabActive");
                })
                $(".approveTab").eq(1).unbind("click").click(function(){
                    approveListShow(approveListHistory);
                    $(".approveTab").removeClass("approveTabActive");
                    $(this).addClass("approveTabActive");
                })
            }
        },
        error : function() { 
          // alert('fail');
        } 
      } 
    );
}
function approveListShow(approveList){
    $(".approvalList").html('\
        <div class="approvalListTittle flexRow">\
          <div style="width:16px"></div>\
          <input type="checkbox" class="allCheckBox">\
          <div style="width:100px;margin-left:10px;">'+get_lan("approvalList").employee+'</div>\
          <div style="width:150px;margin-left:5px;">'+get_lan("approvalList").orderNo+'</div>\
          <div style="width:150px;margin-left:5px;">'+get_lan("approvalList").applicationDate+'</div>\
          <div style="width:220px;margin-left:5px;">'+get_lan("approvalList").distance+'</div>\
          <div style="width:260px;margin-left:5px;">'+get_lan("approvalList").applicationReason+'</div>\
          <div style="width:160px;margin-left:5px;">'+get_lan("approvalList").estimmatedAmount+'</div>\
        </div>\
        ');
    $(".allCheckBox").hide();
    approveList.map(function(item,index){
		// 2020-2-11
		item.BookTime=item.BookTime.replace(/-/g,"/")
        var leftTime = new Date().getTime() - new Date(item.BookTime).getTime();
        // console.log(leftTime)
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
        $(".approvalList").append('\
            <div class="approvalLi flexRow">\
              <div style="width:16px"></div>\
              <input type="checkbox" class="employeeCheckBox">\
              <div class="ellipsis" style="width:100px;margin-left:10px;">'+item.Passenger+'</div>\
              <div style="width:150px;margin-left:5px;">'+item.OrderNo+'</div>\
              <div style="width:150px;margin-left:5px;">'+item.BookTime.substring(0,10)+'</div>\
              <div style="width:220px;margin-left:5px;">'+distanceTime+'</div>\
              <div style="width:260px;margin-left:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+item.ApplyReason+'</div>\
              <div style="width:120px;margin-left:5px;">'+item.Price+'</div>\
              <div style="width:50px;margin-left:5px;" class="detailsBtn" orderNo="'+item.OrderNo+'" IsHistory="'+item.IsHistory+'">'+get_lan("approvalList").details+'</div>\
              <div class="triangle-down"></div>\
            </div>\
            <div class="approvalDetails hide">\
              <table class="approveTable" border="0">\
                <tr>\
                  <th style="width: 90px;">'+get_lan('table').type+'</th>\
                  <th style="width: 450px;">'+get_lan('table').route+'</th>\
                  <th style="width: 210px;">'+get_lan('table').travelTime+'</th>\
                  <th style="width: 440px;">'+get_lan('table').reason+'</th>\
                </tr>\
              </table>\
            </div>\
            ')
        $(".employeeCheckBox").hide();
        /*机票*/
        item.Segment.map(function(sItem){
            $(".approveTable").eq(index).append('\
                <tr>\
                    <td><div class="planeIcon"></div></td>\
                    <td>'+sItem[0].OrgAirport+'-'+sItem[0].DesAirport+'</td>\
                    <td>'+sItem[0].DepartureTime+'~'+sItem[0].ArrivalTime.substring(sItem[0].ArrivalTime.length-5,sItem[0].ArrivalTime.length)+'</td>\
                    <td>'+sItem[0].AirFareAmount+'</td>\
                </tr>\
            ')
        })
        /*酒店*/
        item.Hotel.map(function(hItem){
            $(".approveTable").eq(index).append('\
                <tr>\
                  <td><div class="hotelIcon"></div></td>\
                  <td>'+hItem.HotelName+'</td>\
                  <td>'+hItem.CheckIn+'~'+hItem.CheckOut+'</td>\
                  <td>'+hItem.HotelFareAmount+'</td>\
                </tr>\
            ')
        })
        /*火车*/
        item.Train.map(function(tItem){
            $(".approveTable").eq(index).append('\
                <tr>\
                  <td><div class="trainIcon"></div></td>\
                  <td>'+tItem.TrainDeparte+'-'+tItem.TrainArrive+'</td>\
                  <td>'+tItem.TrainDepartureTime+'~'+tItem.TrainArrivalTime.substring(tItem.TrainArrivalTime.length-5,tItem.TrainArrivalTime.length)+'</td>\
                  <td>'+tItem.TrainFareAmount+'</td>\
                </tr>\
            ')
        })
        $(".triangle-down").unbind("click").click(function(){
            if(!$(this).attr("spread")||$(this).attr("spread")=="false"){
                $(this).parent().next().removeClass("hide");
                $(this).attr("spread","true");
            }else if($(this).attr("spread")=="true"){
                $(this).attr("spread","false");
                $(this).parent().next().addClass("hide");
            }
        })
    })
    for(i = 0; i < $(".approvalLi").length; i++){       
        if(i % 2 == 0){
          $(".approvalLi").eq(i).addClass("oddrowcolor");
        }else{
          $(".approvalLi").eq(i).addClass("evenrowcolor");
        }
    }
    $(".detailsBtn").unbind("click").click(function(){
        var applicationDetailInfo = {
            'orderNo':$(this).attr("orderNo"),
            'IsHistory':$(this).attr("IsHistory"),
        }
        $.session.set('applicationDetailInfo', JSON.stringify(applicationDetailInfo));
        window.location.href='../../application/applicationDetail.html';
    })
}