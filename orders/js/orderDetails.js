var netUserId = $.session.get('netLoginId');
var obtLanguage = $.session.get('obtLanguage');
var searchOrderInfo = JSON.parse($.session.get('searchOrderInfo'));
console.log(searchOrderInfo);
var orderNo = searchOrderInfo.orderNo;
var searchApproval = searchOrderInfo.approval;
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
//支付宝信息
var out_trade_no = tools.queryString().out_trade_no;
var method = tools.queryString().method;
var sign = tools.queryString().sign;
var auth_app_id = tools.queryString().auth_app_id;
var seller_id = tools.queryString().seller_id;
var trade_no = tools.queryString().trade_no;
// 申请理由是否必填
var reasonNecessary = true;
var bookState = tools.queryString().state;
// 缓存订单详情
var orderDetaile;


//中英文对象
// "onlinePayRemind":"请选择支付方式",
var cn = {
	"approveBumber": "差旅审批单号:",
	"finalbtn": "支付已完成",
	"cancelbtn": "稍后支付",
	"tipsClass": "",
	"tipsText": "需要您自行完成支付后才能出票，请选择支付方式",
	"clickRemind": "点击可继续预订",
	"finishRemind1left": "待支付!",
	"finishRemind2left": "待审核!",
	"finishRemind3left": "待出票!",
	"finishRemind1": "请尽快支付",
	"finishRemind2": "请尽快审核",
	"finishRemind3": "请尽快出票",
	"onlinePayRemind": "请支付您的订单",
	"autoIssueRemind": "温馨提示：审核通过后，系统将自动出票",
	"autoIssueRemind2": "温馨提示：请在审核通过后及时支付，以免影响您的行程。",
	"continueUl": {
		'air': "机票",
		'hotel': "酒店",
		'train': "火车",
	},
	"remarkPop": {
		"businessTripTittle": "出差信息：",
		"remarkInfoTittle": "账单信息：",
		"tripNameTittle": "员工姓名",
		"tripCompanyTittle": "公司",
		"confirm": "确认",
		"cancel": "取消",
		"confirm2": "立即预订",
		"companyRemindTittle": "温馨提示",
		"companyRemindText": "因为您已更换出差公司，请确认更改后的公司抬头信息是否正确。",
		"modifySuccess": "修改成功",
		"Choose": "请选择",
		"search": "请搜索",
		"remarkInfoRemind": "红色标志为必填项",
		"remarkRemind": "请将红色备注项填写完整",
	},
	'refundTicketPop': {
		"refundTicketTittle": "退票后无法恢复，是否确认提交退票申请？",
		"refundTittle1": "退票后",
		"refundTittle2": "无法恢复",
		"refundTittle3": "，是否确认提交退票申请？",
		"refundTicketPassenger": "退票人:",
		"refundTicketLimit": "退票限制",
		"refundTicketReason": "退票原因",
		"refundTicketReason1": "主动自愿退票（非航空公司原因）",
		"refundTicketReason2": "航班取消/由航空公司延误取消行程",
		"refundRemind": "退票申请已提交,请等待处理结果",
		"refundPopRemind": "如因为航班取消/由航空公司延误取消行程，请联系服务小组退票。",
		"refundPopRemind2": "如已办理值机，请先取消值机再点击确认，否则可能引起退票费用的差异。如果您需要部分更改，请联系服务团队。",
		"refundSuccess": "退票申请成功",
		"refundBrokerage": "预计航空公司手续费",
		"refundMoney": "预计退款金额",
		"refundAmount": "预计退款金额:",
		"refundFee": "预计退票手续费:",
		"refundTips": "具体费用以实际退款为准",
	},
	'intlRefundRemind': "请联系线下服务组做申请。",
	'alterTicketPop': {
		"alterTicketTittleRemind": "改签后原订单无法恢复，是否确认提交改签申请？",
		"alterTicket1": "改签后原订单",
		"alterTicket2": "无法恢复",
		"alterTicket3": "，是否确认提交改签申请？",
		"alterTicketTittleAir": "请选择改签时间、舱位类型以完成申请",
		"alterTicketTittleTrain": "请选择改签时间、列车车次以完成申请",
		"alterTicketPassenger": "乘客:",
		"alterTicketLimit": "改签限制",
		"alterTicketDateTittle": "改签查询",
		"alterDateTittle": "改签日期:",
		"alterCabinTittle": "改签舱位:",
		'cabins': {
			'cabin1': '不限',
			'cabin2': '经济舱',
			'cabin3': '公务舱',
			'cabin4': '头等舱',
			'cabin5': '公务舱/头等舱',
		},
		"alterTrainNumber": '列车车次:',
		"optional": "选填",
		"intlAlterRemind": "国际票在线改签请联系线下服务小组。",
		"domAlterRemind": "如需部分改签，请联系线下服务小组。",
		"allDay": "全天",
		"alterTicketRemark": "1.一张车票仅可以办理一次改签。</br>2. 对于没有换取纸质车票且不晚于开车前60分钟的，可在线办理改签。</br>3.开车前48小时(不含)以上，在线可改签预售期内的其他列车；开车前48小时以内，在线仅可改签开车前的其他列车和开车后至票面日期当日24:00之间的其他列车。</br>4.只可变更乘车日期、车次、席位，不可变更发站和到站（同城车站除外）,不可变更乘客名字及证件号。</br>5. 更改规则会因12306的调整而不同。</br>6. 高票价车票更改到低票价车票后，差价将退回到对应支付账户。</br>另注:车票改签后，旅客取消旅行的，可以按规定退票。改签后的退票，按12306的规定。",
		"AlterRemindLine": "*如已办理值机，请先取消值机再点击确认，否则将会改签失败。如果您需要部分更改，请联系服务团队。",
	},
	'approvalPop': {
		"approvalTittle": "审核信息",
		"selectTittle": "审核人选择",
		"approvalPrice": "总金额:",
		"commentsApple": "申请理由:",
		"comments": "申请理由:",
		"after": "审核后出票选项",
		"reason1": "直接出票-审核完成后直接出票，无需再次确认",
		"reason2": "暂缓出票-审核完成后不直接出票，请在出票时限前及时通知出票",
		"Approver1": "审核人：",
		"Approver2": "级",
		"ApproveRemind": "请正确填写！",
		"ApproveRemind2": "提交失败。",
		"success": "提交成功",
	},
	'orderInfo': {
		'OrderNo': "订单号：",
		'BookTime': "预订时间：",
		'State': "审核状态：",
		'OrderFare': "总金额：",
		'OrderCustomer': '旅客姓名：',
		'goOnBook': "继续预订",
		"approval": "提交审核",
		"cancelapproval": "取消审核",
		"cancelapprovalRemind": "请确认是否要取消审核?",
		"ticket": "出票",
		"ticketRemind": "提交出票成功",
		'onlinePay': "在线支付",
		'uploadFile': "上传审核单",
		'DownloadItinerary': "下载行程单",
		'DownloadInvoice': "下载账单",
	},
	'fileListInfo': {
		'fileListTittle': "附件信息:",
		"uploadFile": "上传文件",
		"uploadDate": "上传时间",
		"edit": "操作",
		"delect": "删除",
	},
	'approvalInfo': {
		'approvalTittle': "审核信息：",
		'approvalLevel': "审核等级",
		'Approver': "审核人",
		'approvalPhone': "电话",
		'approvalEmail': "邮箱",
		'approvalResult': "审核结果",
		'approvalTime': "审核时间",
		'approvalReason': "审核建议",
		'approvalPhoneRemind': "是否重新发送审批短信？",
		'approvalEmailRemind': "是否重新发送审批邮件？",
	},
	"approvalRemind": "请选择审核后出票选项",
	'orderCustomerInfo': {
		'orderCustomerTittle': '旅客信息：',
		"popNameCn": "中文姓名:",
		"popNameEn": "英文姓名:",
		"popPhone": "手机号码:",
		"PsgType": "旅客类别:",
		"popDocuments": "证件信息:",
		"remarks": "账单信息",
	},
	'orderDetailsTabBar': {
		'airTicket': '机票',
		'hotel': '酒店',
		'train': '火车',
		'otherExpenses': "其他费用",
		'car': "租车",
	},
	'orderDetails': {
		'orderState': "订单状态：",
		'price': "总金额：",
		'cabin': '舱位： ',
		'craft': '机型：',
		'seat': '座位类型：',
		'orderCancel': '取消订单',
		'orderModify': '修改',
		'orderExtend': '延住',
		'onlineCheckIn': '在线值机',
		'refund': '退票',
		'endorse': '改签',
		'CancelPolicy': "取消政策：",
		'address': "地址：",
		'RoomName': "房型：",
		'BedName': "床型：",
		'Breakfast': "早餐：",
		'Rooms': "房间数：",
		'Nights': "入住天数：",
		'cancelRemind': "确定取消吗？",
		"cancelSuccess": "取消成功",
		"cancelUnSuccess": "取消失败",
		'alterMessage': '确定改签吗？',
		'alterRemind': '请联系线下改签',
		'TicketDate': "出票时限：",
		'TicketNo': "票号：",
		'Rebooking': '改签规则:',
		'Refund': '退票规则:',
		'Res': '变更规则:',
		'CancelDeadLine': '最晚取消时间:',
		'PayType': "支付方式:",
		'CabinCustomerName': "同住人:",
		'LastTime': '最晚到店时间:',
		'selectSeat': "在线选座",
		'passengerSeatInfo': "座位/餐食信息",
		'State': '状态：',
		'StateInfo': '候补',
		'selectSeatRemind': "该航班无座位图可选",
		'AirlineReference': "航空公司大编号：",
		'serviceFare': "服务费:",
		'tax': "税:",
		'nominalFare': "票面价:",
		'SeatNo': '座位号:',
		'CoachNo': '车厢:',
		'trainTicketNo': '取票号:',
		'TicketGate': "检票口:",
		'busInfo':"班车信息:",
		"showMore":"展开 ∨",
		"retract":"收起 ∧",
	},
	"uploadFilePop": {
		"browse": "浏览",
		"chooseFile": "选择文件:",
		"success": "成功!",
		"uploadRemind1": "不接受此文件类型！",
		"uploadRemind2": "附件大小不能大于 ",
		"uploadRemind3": "请先选择需要上传的文件!",
	},
	"GKbookingPop": {
		"GKbookingBodyTittle": "提交你的酒店信息",
		"GKRemindText": "您的行程经过一夜并且没有预订酒店，请选择一项让我们知道你住在哪里。",
		"GKRemindText2": "我想选择一个原因并提交",
		"GKRemindText3": "您的行程有一个没有酒店预订的过夜停留。</br>请预订酒店或给出原因。",
		"city": "请选择入住的城市:",
		"hotel": "请输入入住的酒店:",
		"address": "请输入入住的地址",
		"checkIn": "入住时间:",
		"CheckOut": "离店时间:",
		"search": "搜索",
		"searchRemind": "请正确填写！",
	},
	"selectSeatPop": {
		"notes": "图标说明:",
		"available": "可选择",
		"blocked": "不可选择",
		"select": "当前选择",
		"ocuppied": "他人已选",
		"selectRemind": "请选择完座位。",
	},
	"combineOrderPop": {
		"RemindText": "你的行程是单程，请选择一个订单去合并:",
		"option": "我不需要合并我的订单",
	},
	"onlinePayPop": {
		"yeePay": "易宝支付",
		"alipay": "支付宝",
		"wechat": "微信支付",
		"quickPayment": "快捷支付",
		"nopayment": "未配置支付方式，请联系服务组",
	},
	"otherExpensesList": {
		"miscell": "杂项",
		"amount": "金额",
		"remark": "备注",
		"companyPay": "公司支付",
		"modify": "修改",
		"save": "保存",
	},
	"carBody": {
		"pickUp": "取车:",
		"pickOff": "还车:",
	},
	// 无卡支付
	"noCard": {
		"title": "请支付您的订单",
		"tips": "温馨提示：确认付款前请确认支付卡号",
		"name": "持卡人姓名:",
		"carNum": "信用卡卡号:",
		"overTime": "有效期:",
		"CVV": "CVV:",
		"domType": "证件类型:",
		"domNum": "证件号码:",
		"phoneNum": "银行预留手机:",
		"pay": "支付",
		"tips2": "为保障您支付过程的安全，已向您手机上发送短信验证码，请查看并填写：",
		"codeText": "请输入验证码：",
		"lineText": "重新获取",
		"payBtn": "确认支付",
		"Maintain": "请维护信用卡卡号",
	},

}
var en = {
	"approveBumber": "Travel Request No:",
	"cancelbtn": "Pay later",
	"tipsClass": "",
	"tipsText": " can only be issued after you complete the payment. Please choose the payment method",
	"clickRemind": "Click To Continue Booking",
	"finishRemind1left": "Pay Now!",
	"finishRemind2left": "Submit Now!",
	"finishRemind3left": "Ticket Now!",
	"finishRemind1": "Please complete the payment immediately.",
	"finishRemind2": "Please submit the approval immediately.",
	"finishRemind3": "Please submit the ticketing immediately.",
	"onlinePayRemind": "Please pay for your order",
	"autoIssueRemind": "Reminder: The ticket will be issued automatically after it is approved.",
	"autoIssueRemind2": "Friendly Reminder: Please settle your payment right after it's approved to avoid unnecessary impact to your travel.",
	"continueUl": {
		'air': "Air",
		'hotel': "Hotel",
		'train': "Train",
	},
	"remarkPop": {
		"businessTripTittle": "Billing Information：",
		"remarkInfoTittle": "Remarks：",
		"tripNameTittle": "Employee Name",
		"tripCompanyTittle": "Company",
		"confirm": "Confirm",
		"cancel": "Cancel",
		"confirm2": "Book Hotel Now",
		"companyRemindTittle": "Kindly Reminder",
		"companyRemindText": "Because you have changed the travel company, please confirm whether the company's information is correct after the change.",
		"modifySuccess": "Modification Successful",
		"Choose": "Please Select",
		"search": "Please Search",
		"remarkRemind": "Please complete the mandatory remark.",
		"remarkInfoRemind": "The remark in red is mandatory.",
	},
	'refundTicketPop': {
		"refundTicketTittle": "Confirm to refund the ticket ? The booking will be cancelled after it is refunded.",
		"refundTittle1": "Confirm to refund the ticket ? The booking will be ",
		"refundTittle2": "cancelled",
		"refundTittle3": " after it is refunded.",
		"refundTicketPassenger": "Refund Passenger:",
		"refundTicketLimit": "Restriction",
		"refundTicketReason": "Refund Reason",
		"refundTicketReason1": "Voluntary Refund (non-airline reason)",
		"refundTicketReason2": "Flight cancellations/cancellations delayed by airlines",
		"refundRemind": "The refund application has been submitted, please wait for the update of the refund status.",
		"refundPopRemind": "For involuntary refund(it's cancelled/delayed by the airline), please reach out to your service team for the assistance ",
		"refundPopRemind2": "If you have already checked in. please cancel the check-in first, otherwise it may cause extra refund fee. Please contact the service team if you need change partially.",
		"refundSuccess": "Refund Request Successful",
		"refundBrokerage": "Estimated Airline Deduction",
		"refundMoney": "Estimated Refund Fee",
		"refundAmount": "Estimated Refund Amount:",
		"refundFee": "Estimated Service Charge:",
		"refundTips": "The specific fee is subject to the actual refund.",
	},
	'intlRefundRemind': "Please contact service team per the request.",
	'alterTicketPop': {
		"alterTicketTittleRemind": "The booking will be cancelled after it is changed.",
		"alterTicket1": "The booking will be ",
		"alterTicket2": "cancelled",
		"alterTicket3": "， after it is changed.",
		"alterTicketTittleAir": "Please select the change information.",
		"alterTicketTittleTrain": "Please select the time of renewal and train number to complete the application.",
		"alterTicketPassenger": "Passenger:",
		// "alterTicketLimit": "Alter Limit",
		"alterTicketLimit": "Restriction",
		"alterTicketDateTittle": "Alter Search",
		"alterDateTittle": "Alter Date:",
		"alterCabinTittle": "Cabin Type:",
		'cabins': {
			'cabin1': 'Unlimited',
			'cabin2': 'Ecomomy',
			'cabin3': 'Business',
			'cabin4': 'First',
			'cabin5': 'Business/First',
		},
		"alterTrainNumber": 'Train No:',
		"optional": "Optional",
		"intlAlterRemind": "Please contact the service team for International air change.",
		"domAlterRemind": "Please contact service team if you need change partially.",
		"allDay": "All Day",
		"alterTicketRemark": "1.Change is only permissible once. </br>2.Online change can be made before 60 minutes prior to original departure time provided paper ticket is not obtained.</br> 3.Outside of 48 hours of original train departure time , online change can be made to available trains. Within 48 hours of original train departure time , Online change can be made to the train which departure prior to the original train departure time (change before original departure time) or to the train which departure by 24:00 of same day to original train departure time (change after original departure time).</br> 4.Change can be made on the travel date, train number and seat type only. No change can be made passenger name, travel document number and on original and final destination station unless it is within same city. </br>5.Terms and conditions are subjected to 12306’s discretion.</br> 6.The price difference between original and new ticket will be refunded to corresponding payment account. </br>Cancellation after changes made is allowed for refund but according to 12306’s regulations.",
		"AlterRemindLine": "*If you have already checked in, please cancel the check-in first, otherwise your change request will failed.Please contact the service team if you need change partially.",
	},
	'approvalPop': {
		"approvalTittle": "Approval Info",
		"selectTittle": "Approver Selection",
		"approvalPrice": "Total Price:",
		"commentsApple": "Comments:",
		"comments": "Reason for Travel/Remark:",
		"after": "After Approval：",
		"reason1": "Issue ticket immediately - Tickets will be issued immediately upon approval.",
		"reason2": "Issue ticket on further request - Tickets will not be issued until your further notification.Please inform us before the ticket deadline.",
		"Approver1": "Approver: Level",
		"Approver2": "",
		"ApproveRemind": "Please fill in correctly.",
		"ApproveRemind2": "Failure to submit.",
		"success": "Submitted successfully",
	},
	'orderInfo': {
		'OrderNo': "Order No：",
		'BookTime': "Booking Time：",
		'State': "Status：",
		'OrderFare': "Total Fare：",
		'OrderCustomer': 'Passenger Name:',
		'goOnBook': "Continue Booking",
		"approval": "Submit For Approval",
		"cancelapproval": "Cancel Applicaction",
		"cancelapprovalRemind": "Do you want to cancel the approval?",
		"ticket": "Issue Ticket",
		"ticketRemind": "Ticketing request submitted successfully.",
		'onlinePay': "Online Payment",
		'uploadFile': "Upload Approval File",
		'DownloadItinerary': "Download Itinerary",
		'DownloadInvoice': "Download Invoice",
	},
	'fileListInfo': {
		'fileListTittle': "Files Info:",
		"uploadFile": "Upload File",
		"uploadDate": "Upload Time",
		"edit": "Edit",
		"delect": "Delect",
	},
	'approvalInfo': {
		'approvalTittle': "Approval Information：",
		'approvalLevel': "Level",
		'Approver': "Approver",
		'approvalPhone': "Phone",
		'approvalEmail': "Email",
		'approvalResult': "Result",
		'approvalTime': "Time",
		'approvalReason': "Approval Comments",
		'approvalPhoneRemind': "Do you want to send the approval SMS to the approver again?",
		'approvalEmailRemind': "Do you want to send the approval email to the approver again?",
	},
	"approvalRemind": "Please select an option as below",
	'orderCustomerInfo': {
		'orderCustomerTittle': 'Passenger Information：',
		"popNameCn": "Chinese Name:",
		"popNameEn": "English Name:",
		"popPhone": "Phone:",
		"PsgType": "Passenger Type:",
		"popDocuments": "Document:",
		"remarks": "Billing Information",
	},
	'orderDetailsTabBar': {
		'airTicket': 'Air Ticket',
		'hotel': 'Hotel',
		'train': 'Train',
		'otherExpenses': "Other Expenses",
		'car': "Car",
	},
	'orderDetails': {
		'orderState': "Status:",
		'price': "Price:",
		'cabin': 'Cabin: ',
		'craft': 'Craft：',
		'seat': 'Seat:',
		'orderCancel': 'Cancel Segment',
		'orderModify': 'Modify',
		'orderExtend': 'Extend',
		'onlineCheckIn': 'Online check-in',
		'refund': 'Refund',
		'endorse': 'Change',
		'CancelPolicy': "Cancel Policy:",
		'address': "Address:",
		'RoomName': "Room Type:",
		'BedName': "Bed Type:",
		'Breakfast': "Breakfast:",
		'Rooms': "Rooms:",
		'Nights': "Nights:",
		'cancelRemind': "Do you want to cancel the reservation?",
		"cancelSuccess": "Cancel Successful",
		"cancelUnSuccess": "Cancel Unsuccessful",
		'alterMessage': 'Do you want to alter this ticket?',
		'alterRemind': 'Please contact offline to alter tickets',
		'TicketDate': "Ticketing Deadline:",
		'TicketNo': "TicketNo:",
		'Rebooking': 'Reissue Rule:',
		'Refund': 'Refund Rule:',
		'Res': 'Reissue Rule:',
		'CancelDeadLine': 'Latest Cancellation Time:',
		'PayType': "Pay Type:",
		'CabinCustomerName': "Roommate:",
		'LastTime': 'Latest Check-in Time:',
		'selectSeat': "Select Seat",
		'passengerSeatInfo': "Seat/Meal Info",
		'State': 'State:',
		'StateInfo': 'Waitlist',
		'selectSeatRemind': "There is no seat selection map for the segment",
		'AirlineReference': "Airline Reference:",
		'serviceFare': "Service Fare:",
		'tax': "Tax Fare:",
		'nominalFare': "Nominal Fare:",
		'SeatNo': 'Seat No:',
		'CoachNo': ' Coach No:',
		'trainTicketNo': 'E Ticket No:',
		'TicketGate': "Check in:",
		'busInfo':"Shuttle Bus:",
		"showMore":"Show More ∨",
		"retract":"Retract ∧",
	},
	"uploadFilePop": {
		"browse": "Browse",
		"chooseFile": "Choose File:",
		"success": "Success!",
		"uploadRemind1": "This file type is not accepted!",
		"uploadRemind2": "The size of the upload file can't larger than",
		"uploadRemind3": "Please choose the upload file!",
	},
	"GKbookingPop": {
		"GKbookingBodyTittle": "Submit your hotel information",
		"GKRemindText": "Your trip has an overnight stay without a hotel reservation. Please select an option below to let us know where you will be staying.",
		"GKRemindText2": "I would like to choose a reason and submit it！",
		"GKRemindText3": "Your trip has an overnight stay without a hotel reservation.</br> Please book a hotel or give a reason.",
		"city": "Please enter the city for check in:",
		"hotel": "Please enter the hotel name for check in:",
		"address": "Please enter the address of where you will be staying:",
		"checkIn": "Check-in:",
		"CheckOut": "Check-out:",
		"search": "Search",
		"searchRemind": "Please fill in correctly.",
	},
	"selectSeatPop": {
		"notes": "Notes:",
		"available": "Available",
		"blocked": "Blocked",
		"select": "Select",
		// "ocuppied": "Ocuppied",
		"ocuppied": "Occupied",
		"selectRemind": "Please choose your seat.",
	},
	"combineOrderPop": {
		"RemindText": "Your trip is an one-way trip,please choose an order to combine it:",
		"option": "I don’t need combine my order.",
	},
	"onlinePayPop": {
		"yeePay": "Credit Card",
		"alipay": "Alipay",
		"wechat": "Wechat",
		"quickPayment": "Quick payment",
		"nopayment": "Can not find payment method, please contact service team for help.",
	},
	"otherExpensesList": {
		"miscell": "Miscell",
		"amount": "Amount",
		"remark": "Remark",
		"companyPay": "Company Bill",
		"modify": "Modify",
		"save": "Save",
	},
	"carBody": {
		"pickUp": "pick-up:",
		"pickOff": "pick-off:",
	},
	// 无卡支付
	"noCard": {
		"title": "Please pay for your order",
		"tips": "Reminder: please confirm the payment card number before confirming the payment!",
		"name": "Name:",
		"carNum": "Credit Card:",
		"overTime": "Expiration Date：:",
		"CVV": "CVV:",
		"domType": "Document Type:",
		"domNum": "ID Number:",
		"phoneNum": "Phone Number Reserved by Bank:",
		"pay": "pay now",
		"tips2": "To ensure the safety of your payment process, SMS verification code has been sent to your mobile phone. Please check and fill in:",
		"codeText": "Please enter the verification code:",
		"lineText": "Regain",
		"payBtn": "Confirm Payment",
		"Maintain": "Please complete your credit card info.",
	}
}
if (ProfileInfo.onlineStyle == "APPLE") {
	cn.remarkPop.remarkInfoRemind = "";
	en.remarkPop.remarkInfoRemind = "";
	en.orderDetails.price = "Total Price:";
	en.refundTicketPop.refundPopRemind2 =
		"If you already checked in online, please cancel it. Otherwise the ticket cannot be refund.";
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
$(function () {
	showContent(); //内容展示
	orderDetails(); //
	deleteTAnumber()
});


function showContent() {
	$(".remarkPop").html('\
	    <div class="businessTripTittle">' + get_lan('remarkPop').businessTripTittle +
		'</div>\
	    <div class="businessTripBody"></div>\
	    <div class="remarkInfoTittle">' + get_lan('remarkPop').remarkInfoTittle +
		'</div>\
        <div style="padding-bottom:10px;border-bottom:1px solid #f3f3f3;">\
	      <div class="remarkInfoBody autoScrollY"></div>\
        </div>\
        <div style="box-sizing:border-box;padding-left:20px;font-size:14px;height: 19px;line-height: 19px;" class="colorRed">' +
		get_lan('remarkPop').remarkInfoRemind + '</div>\
	    <div class="remarkFooter flexRow"></div>\
	    ')
	$("#main").html(
		'\
	    <div class="autoCenter">\
	        <div style="height:10px;"></div>\
	        <div class="orderInfo"></div>\
            <div class="fileListInfo hide">\
              <div class="fileListTittle">' +
		get_lan('fileListInfo').fileListTittle +
		'</div>\
              <div class="filesListBar flexRow">\
                  <div class="filesListBarLi" style="width:180px;">' +
		get_lan('fileListInfo').uploadFile + '</div>\
                  <div class="filesListBarLi" style="width:180px;">' +
		get_lan('fileListInfo').uploadDate +
		'</div>\
                  <div class="filesListBarLi delectFileBar" style="width:180px;">' + get_lan('fileListInfo')
			.edit +
		'</div>\
              </div>\
            </div>\
            <div class="approvalInfo">\
              <div class="approvalInfoTittle">' +
		get_lan('approvalInfo').approvalTittle +
		'</div>\
              <div class="passengerBar flexRow">\
                  <div class="passengerBarLi" style="width:100px;">' +
		get_lan('approvalInfo').approvalLevel +
		'</div>\
                  <div class="passengerBarLi" style="width:150px;">' + get_lan('approvalInfo').Approver +
		'</div>\
                  <div class="passengerBarLi" style="width:150px;">' + get_lan('approvalInfo').approvalPhone +
		'</div>\
                  <div class="passengerBarLi" style="width:250px;">' + get_lan('approvalInfo').approvalEmail +
		'</div>\
                  <div class="passengerBarLi" style="width:150px;">' + get_lan('approvalInfo').approvalResult +
		'</div>\
                  <div class="passengerBarLi" style="width:230px;">' + get_lan('approvalInfo').approvalTime +
		'</div>\
                  <div class="passengerBarLi" style="width:160px;">' + get_lan('approvalInfo').approvalReason +
		'</div>\
              </div>\
              <div class="approvalList">\
              </div>\
            </div>\
	        <div class="orderCustomerInfo">\
	          <div class="orderCustomerTittle">' +
		get_lan('orderCustomerInfo').orderCustomerTittle +
		'</div>\
	          <div class="passengerBar flexRow">\
		          <div class="passengerBarLi" style="width:180px;">' +
		get_lan('orderCustomerInfo').popNameCn + '</div>\
		          <div class="passengerBarLi" style="width:150px;">' +
		get_lan('orderCustomerInfo').popNameEn + '</div>\
		          <div class="passengerBarLi" style="width:150px;">' +
		get_lan('orderCustomerInfo').popPhone + '</div>\
		          <div class="passengerBarLi" style="width:300px;">' +
		get_lan('orderCustomerInfo').popDocuments + '</div>\
		          <div class="passengerBarLi" style="width:170px;">' +
		get_lan('orderCustomerInfo').PsgType +
		'</div>\
	          </div>\
	          <div class="passengerList">\
	          </div>\
	        </div>\
	        <div class="orderDetailsBody">\
	          <div class="orderDetailsTabBar flexRow">\
	          </div>\
	          <div class="orderList segmentList"></div>\
	          <div class="orderList hotelList"></div>\
	          <div class="orderList trainList"></div>\
			  <div class="orderList otherExpensesList"></div>\
			  <div class="orderList carList"></div>\
	        </div>\
	    </div>\
	'
	)
	$(".refundTicketPop").html('\
        <div class="refundTicketTittle">' + get_lan("refundTicketPop").refundTittle1 + '<span class="orangeColor">' + get_lan("refundTicketPop").refundTittle2 + '</span>' + get_lan("refundTicketPop").refundTittle3 +
		'</div>\
        <div class="refundTicketBody"></div>\
        <div class="refundTicketFooter flexRow">\
          <div class="closeRefundTicketBtn">' +
		get_lan("remarkPop").cancel + '</div>\
          <div class="sureRefundTicketBtn">' + get_lan("remarkPop").confirm +
		'</div>\
        </div>\
        ')
	// get_lan("alterTicketPop").alterTicketTittleRemind + '</span><br>'
	if (ProfileInfo.onlineStyle == "APPLE") {
		var grayColor = "activeFontColor"
	} else {
		var grayColor = ""
	}
	$(".alterPop").html('\
        <div class="alterTicketTittle">'+
		'<span class="' + grayColor + '" style="font-size:22px;">' +
		get_lan("alterTicketPop").alterTicket1 + '<span class="orangeColor">' + get_lan("alterTicketPop").alterTicket2 + '</span>' + get_lan("alterTicketPop").alterTicket3 + '</span><br>'
		+ get_lan("alterTicketPop").alterTicketTittleAir +
		'</div>\
        <div class="alterTicketBody"></div>\
        <div class="alterTicketFooter flexRow">\
          <div class="closeAlterTicketBtn">' +
		get_lan("remarkPop").cancel + '</div>\
          <div class="sureAlterTicketBtn">' + get_lan("remarkPop").confirm +
		'</div>\
        </div>\
        ')
	// $.ajax(
	//   {
	//     type:'post',
	//     url : $.session.get('ajaxUrl'), 
	//     dataType : 'json',
	//     data:{
	//         url: $.session.get('obtCompany')+"/QueryService.svc/QueryDateLimit",
	//         jsonStr:'{"id":'+netUserId+',"Language":"'+obtLanguage+'"}'
	//     },
	//     success : function(data) {
	//         var res = JSON.parse(data);
	//         console.log(res);
	//         res.map(function(item){
	//             if(item.LimitType==1){
	//                 $(".sureAlterTicketBtn").attr("CanSearch",item.CanSearch);
	//                 $(".sureAlterTicketBtn").attr("StartLimit",item.StartLimit);
	//                 $(".sureAlterTicketBtn").attr("Message",item.Message);
	//             }
	//             if(item.LimitType==2){
	//                 $(".sureAlterTicketBtn").attr("CanSearch",item.CanSearch);
	//                 $(".sureAlterTicketBtn").attr("StartLimit",item.StartLimit);
	//                 $(".sureAlterTicketBtn").attr("Message",item.Message);
	//             }
	//         })
	//     },
	//     error : function() {
	//       // alert('fail');
	//     }
	//   }
	// );
	var approvalText = ProfileInfo.onlineStyle == "APPLE" ? get_lan("approvalPop").commentsApple : get_lan("approvalPop").comments



	$(".approvalPop").html('\
        <div class="approvalTittle">' + get_lan("approvalPop").approvalTittle +
		'</div>\
        <div class="approvalBody">\
          <div class="selectTittle">' + get_lan("approvalPop").selectTittle +
		'</div>\
          <div class="selectBody"></div>\
          <div class="flexRow">\
            <div class="popLiTittle">' +
		get_lan("approvalPop").approvalPrice +
		'</div>\
            <div class="approvalPrice"></div>\
          </div>\
          <div class="flexRow">\
            <div class="popLiTittle">' +
		approvalText +
		'</div>\
            <textarea class="commentsBody" maxlength="80"></textarea>\
          </div>\
          <div class="ticketOption">\
            <div class="selectTittle">' +
		get_lan("approvalPop").after +
		'</div>\
            <div class="flexRow" style="margin:10px 0 10px 0;"><input class="approveReason" type="radio" name="approveReason"><div style="min-height: 20px;width: 500px;margin-left: 10px;">' +
		get_lan("approvalPop").reason1 +
		'</div></div>\
            <div class="flexRow" style="margin-bottom:10px;"><input class="approveReason" type="radio" name="approveReason" checked><div style="min-height: 20px;width: 500px;margin-left: 10px;">' +
		get_lan("approvalPop").reason2 +
		'</div></div>\
          </div>\
        </div>\
        <div class="approvalFooter flexRow">\
          <div class="closeApprovalBtn">' +
		get_lan("remarkPop").cancel + '</div>\
          <div class="sureApprovalBtn">' + get_lan("remarkPop").confirm +
		'</div>\
        </div>\
        ')
	$(".uploadFilePop").html('\
        <div class="uploadFileTittle">' + get_lan("orderInfo").uploadFile +
		'</div>\
        <div class="uploadFileContent">\
          <div class="chooseFileText">' + get_lan("uploadFilePop")
			.chooseFile +
		'</div>\
          <div class="chooseFilePath"></div>\
          <div class="browseBtn"><input id="file" type="file">' +
		get_lan("uploadFilePop").browse +
		'</div>\
        </div>\
        <div class="uploadFileFooter flexRow">\
          <div class="closeUploadFileBtn">' +
		get_lan("remarkPop").cancel + '</div>\
          <div class="sureUploadFileBtn">' + get_lan("remarkPop").confirm +
		'</div>\
        </div>\
        ')
}
// 支付方式
function paymentMethod(res) {
	// 0：不限制
	// 1：支付宝
	// 2：yeepay
	var s = orderDetaile.PayChannel
	if (s == 0) {
		// onlinePay(res);
		onlinePay(orderDetaile);
	}
	if (s == 1) {
		var type = ProfileInfo.onlineStyle == "APPLE" ? 4 : 1;
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/QueryService.svc/QueryOrderPayInfo",
				jsonStr: '{"request":{"id":' + netUserId + ',"orderNo":"' + $(".onlinePayBtn").attr("orderNo") +
					'","language":"' + obtLanguage + '","payChannel":"1"}}'
			},
			success: function (data) {
				// $('body').mLoading("hide");
				var res = JSON.parse(data);
				console.log(res);
				var subject = obtLanguage == "CN" ? cn.tipsClass : en.tipsClass;
				// return false;
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/SystemService.svc/GetAopBodyNew",
						jsonStr: '{"request":{"subject":"' + subject + '","totalAmount":"' + res.payAmount + '","exMechantNO":"' +
							res.exMechantNO + '","type":"' + type + '"}}'
					},
					success: function (data) {
						// $('body').mLoading("hide");
						var res = JSON.parse(data);
						console.log(res);
						$('body').append(res);
					},
					error: function () {
						// alert('fail');
					}
				});
			},
			error: function () {
				// alert('fail');
			}
		});
	}
	if (s == 2) {
		// CreditCardYeepay=true& CloseCreditCardGateway =true，默认跳无卡支付
		// CreditCardYeepay=true& CloseCreditCardGateway =false，可选择易宝支付或无卡支付
		// CreditCardYeepay=false& CloseCreditCardGateway =false，默认跳易宝支付
		if (ProfileInfo.CreditCardYeepay && ProfileInfo.CloseCreditCardGateway) {
			nocardPay(orderDetaile)
		} else if (!ProfileInfo.CreditCardYeepay && !ProfileInfo.CloseCreditCardGateway) {
			yeePay(orderDetaile);
		} else {
			onlinePay(orderDetaile, "", "CreditCardPay");
		}
		// yeePay(res);
	}
}

/*订单详细*/
function orderDetails() {
	$('body').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/OrderService.svc/ListDetailPost",
			jsonStr: '{"orderNo":"' + orderNo + '","id":' + netUserId + ',"Language":"' + obtLanguage + '"}'
		},
		success: function (data) {
			$('body').mLoading("hide");
			var res = JSON.parse(data)
			orderDetaile = res;
			var detailInfo = res;
			console.log(res);
			if (res.OrderNo == null || res.OrderNo == "") {
				alert("No Order");
				window.location.href = '../../index/index.html';
			}
			$(".approvalPrice").text(res.OrderFare);
			// 根据状态判断右上角出现的按钮，继续预订、提交审核、取消审核、出票、在线支付、上传审核单
			var showGoOnBook = res.ShowGoOnBook ? "" : "hide";
			// var showGoHome = res.ShowGoOnBook?"":"goHome";
			var ShowApproval = res.ShowApproval && !res.UploadFileApprove ? "" : "hide";
			var ShowCancelApproval = res.ShowCancel ? "" : "hide";
			var showTicket = res.ShowTicket && !res.ShowApproval && !res.ShowPayment ? "show" : "hide";
			var showOnlinePay = res.ShowPayment && !res.Offline_Pay ? "" : "hide";
			var showUpLoadFile = res.UploadFileApprove && res.ShowApproval && res.FileUploadTime == null ? "" : "hide";
			var showState = ProfileInfo.onlineStyle != "APPLE" ? "" : "hide";
			if (res.ShowApproval && res.ShowPayment && !res.Offline_Pay) {
				showOnlinePay = "hide";
			}
			// OrderFare  换成  PaidAmount
			$(".orderInfo").html('\
                <div class="orderInfoTittle">' + get_lan('orderInfo').OrderNo + ' ' + res
					.OrderNo +
				'</div>\
                <div class="flexRow">\
                	<div class="orderInfoLeft">\
                	<div class="orderDetailInfo">\
                	  <div class="orderDetailInfoNo" style="font-weight:bold;">' +
				get_lan('orderInfo').OrderCustomer + ' ' + res.OrderCustomer +
				'</div>\
                	  <div class="orderDetailInfoDate">' + get_lan('orderInfo').BookTime + ' ' + res.BookTime
					.substring(0, 10) + '</div>\
                	  <div class="orderDetailInfoState ' + showState + '">' + get_lan(
						'orderInfo').State + ' <span class="activeFontColor" style="font-size:20px;">' + res.ApplicationState +
				'</span></div>\
                	  <div class="orderDetailInfoPrice">' + get_lan('orderInfo').OrderFare +
				' <span class="activeFontColor" style="font-size:22px;">' + res.PaidAmount +
				'</span></div>\
                	</div>\
                	<div class="orderApproveInfo"></div>\
                	</div>\
                    <div class="orderInfoRight">\
                      <div class="orderInfoRightBtn btnBackColor goOnBookBtn ' +
				showGoOnBook + '">' + get_lan('orderInfo').goOnBook +
				'</div>\
                      <div class="orderInfoRightBtn btnBackColor approvalBtn ' + ShowApproval + '">' +
				get_lan('orderInfo').approval +
				'</div>\
                      <div class="orderInfoRightBtn btnBackColor cancelApprovalBtn ' +
				ShowCancelApproval + '">' + get_lan('orderInfo').cancelapproval +
				'</div>\
                      <div class="orderInfoRightBtn btnBackColor ticketBtn ' + showTicket + '">' +
				get_lan('orderInfo').ticket +
				'</div>\
                      <div class="orderInfoRightBtn btnBackColor onlinePayBtn ' + showOnlinePay + ' ' +
				showState +
				'" orderNo="' + res.OrderNo + '">' + get_lan('orderInfo').onlinePay +
				'</div>\
                      <div class="orderInfoRightBtn btnBackColor uploadFileBtn ' + showUpLoadFile +
				'" orderNo="' + res.OrderNo + '" customerId="' + res.OrderCustomerDetailList[0].CompanyId + '">' + get_lan(
					'orderInfo').uploadFile + '</div>\
                    </div>\
                </div>\
			')
			
			//<div class="orderDetailInfoState">'+get_lan('orderInfo').State+' <span style="font-size:20px;color:#F58A00">'+res.State+'</span></div>
			// 2020.1.9 苹果隐藏右边的所有按钮
			if (ProfileInfo.onlineStyle == "APPLE") {
				$(".orderInfoRight").hide()
			}
			/*文件上传*/
			if (res.FileUploadTime != null) {
				$(".fileListInfo").removeClass("hide");
				$(".fileListInfo").append(
					'\
                    <div class="filesList flexRow">\
                        <div class="filesListBarLi" style="width:180px;"><img src="../../orders/images/file.png" style="width:20px;height:24px;margin-top:3px;" /></div>\
                        <div class="filesListBarLi" style="width:180px;">' +
					res.FileUploadTime +
					'</div>\
                        <div class="filesListBarLi" style="width:180px;"><span class="delectFile ' +
					showTicket + '" orderNo="' + res.OrderNo + '">' + get_lan('fileListInfo').delect +
					'</span></div>\
                    </div>\
                    ')
			}
			if (res.ShowTicket) {
				$(".delectFile").unbind("click").click(function () {
					$('body').mLoading("show");
					$.ajax({
						type: 'post',
						url: $.session.get('ajaxUrl'),
						dataType: 'json',
						data: {
							url: $.session.get('obtCompany') + "/orderService.svc/FileDeletePost",
							jsonStr: '{"orderNo":"' + $(this).attr("orderNo") + '","id":' + netUserId + '}'
						},
						success: function (data) {
							var res = JSON.parse(data);
							console.log(res);
							$('body').mLoading("hide");
							if (res == true) {
								alert('ok');
								location.reload();
							}
						},
						error: function () {
							// alert('fail');
						}
					});
				})
			} else {
				$(".delectFileBar").hide();
			}
			/*上传*/
			$(".uploadFileBtn").unbind("click").click(function () {
				if (ProfileInfo.HotelGKBooking) {
					// HotelGKBooking(res, "file");
					CheckHotelTrip(res, "file")
				} else {
					uploadFile(res);
				}
			})
			/*继续预订*/
			goOnBook(res);
			/*提交审核*/
			$(".approvalBtn").unbind("click").click(function () {
				if (res.HasTicketTimeOut) {
					alert(res.TicketTimeOutMessage)
					return false;
				}
				if (ProfileInfo.HotelGKBooking) {
					// HotelGKBooking(res, "approval");
					CheckHotelTrip(res, "approval")
				} else {
					checkRemark(res, 'approval');
				}
			})
			if (searchApproval && res.ShowApproval) {
				$(".approvalBtn").click();
			}
			/*支付宝支付完成*/
			if (out_trade_no && method && sign && auth_app_id && seller_id && trade_no) {
				$('body').mLoading("show");
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/OrderService.svc/ReceiveOrderPayInfo",
						jsonStr: '{"request":{"id":' + netUserId + ',"aliPayNO":"' + trade_no + '","language":"' + obtLanguage +
							'","exMechantNO":"' + out_trade_no + '","payAccount":""}}'
					},
					success: function (data) {
						// $('body').mLoading("hide");
						var res = JSON.parse(data);
						console.log(res);
						if (res.code == 200) {
							alert("OK");
							$.ajax({
								type: 'post',
								url: $.session.get('ajaxUrl'),
								dataType: 'json',
								data: {
									url: $.session.get('obtCompany') + "/OrderService.svc/ListDetailPost",
									jsonStr: '{"orderNo":"' + detailInfo.OrderNo + '","id":' + netUserId + ',"Language":"' + obtLanguage +
										'"}'
								},
								success: function (data) {
									var res = JSON.parse(data);
									$('body').mLoading("hide");
									console.log(res);
									if (res.ShowApproval && !res.UploadFileApprove) {
										if (ProfileInfo.HotelGKBooking) {
											// HotelGKBooking(res, "approval");
											CheckHotelTrip(res, "approval")
										} else {
											checkRemark(res, 'approval');
										}
									} else {
										location.replace("../../orders/orderDetails.html");
									}
								},
								error: function () {
									// alert('fail');
								}
							});
							// location.replace("../../orders/orderDetails.html");
						} else {
							alert(res.message);
						}
					},
					error: function () {
						// alert('fail');
					}
				});
			}
			/*取消审核*/
			$(".cancelApprovalBtn").unbind("click").click(function () {
				var r = confirm(get_lan('orderInfo').cancelapprovalRemind);
				if (r == true) {
					$('body').mLoading("show");
					$.ajax({
						type: 'post',
						url: $.session.get('ajaxUrl'),
						dataType: 'json',
						data: {
							url: $.session.get('obtCompany') + "/SystemService.svc/CancelApplicationPost",
							jsonStr: '{"OrderNO":"' + res.OrderNo + '","key":' + netUserId + '}'
						},
						success: function (data) {
							var res = JSON.parse(data);
							console.log(res);
							$('body').mLoading("hide");
							// alert('ok');
							location.reload();
						},
						error: function () {
							// alert('fail');
						}
					});
				}
			})
			/*在线支付*/
			$(".onlinePayBtn").unbind("click").click(function () {
				if (res.HasTicketTimeOut) {
					alert(res.TicketTimeOutMessage)
					return false;
				}

				if (ProfileInfo.HotelGKBooking) {
					// HotelGKBooking(res, "pay");
					CheckHotelTrip(res, "pay")
				} else {
					paymentMethod()
				}
			})
			/*出票*/
			$(".ticketBtn").unbind("click").click(function () {
				if (res.HasTicketTimeOut) {
					alert(res.TicketTimeOutMessage)
					return false;
				}
				if (ProfileInfo.SingleAirCombine) {
					openCombineOrderPop();
					$(".combineOrderPop").html(
						'\
                        <div class="combineOrderTittle"><div class="closeCombineOrderIcon">x</div></div>\
                        <div class="combineOrderBody">\
                          <div class="remindIcon"></div>\
                          <div class="combineRemindText">' +
						get_lan("combineOrderPop").RemindText +
						'</div>\
                          <select class="combineOrderSelect"></select>\
                        </div>\
                        <div class="combineOrderFooter flexRow">\
                          <div class="closeCombineBtn">' +
						get_lan("remarkPop").cancel + '</div>\
                          <div class="sureCombineBtn">' + get_lan(
							"remarkPop").confirm + '</div>\
                        </div>\
                        ')
					$(".closeCombineOrderIcon,.closeCombineBtn").unbind("click").click(function () {
						closeCombineOrderPop();
					})
					$('body').mLoading("show");
					var customerIdList = '';
					detailInfo.OrderCustomerDetailList.map(function (item) {
						customerIdList += item.Uid;
						customerIdList += ',';
					})
					customerIdList = customerIdList.substring(0, customerIdList.length - 1);
					$.ajax({
						type: 'post',
						url: $.session.get('ajaxUrl'),
						dataType: 'json',
						data: {
							url: $.session.get('obtCompany') + "/OrderService.svc/GetMergeOrderList",
							jsonStr: '{"request":{"BCN":"' + detailInfo.OrderNo + '","customerIdList":[' + customerIdList + '],"id":' +
								netUserId + '}}'
						},
						success: function (data) {
							$('body').mLoading("hide");
							var res = JSON.parse(data);
							console.log(res);
							if (res.length == 0) {
								closeCombineOrderPop();
								if (ProfileInfo.HotelGKBooking) {
									// HotelGKBooking(detailInfo, "ticket");
									CheckHotelTrip(detailInfo, "ticket")
								} else {
									checkRemark(detailInfo, 'ticket');
								}
							} else {
								res.map(function (item) {
									var hotelName = obtLanguage == "CN" ? item.hotelName_CN : item.hotelName_EN;
									$(".combineOrderSelect").append('\
                                    <option value="' + item.orderNo +
										'">' + hotelName + ' ' + item.checkIn.split(' ')[0] + '~' + item.checkOut.split(' ')[0] +
										'</option>\
                                    ')
								})
								$(".combineOrderSelect").append('\
                                <option value="no">' + get_lan(
									"combineOrderPop").option + '</option>\
                                ')
							}
							$(".sureCombineBtn").unbind("click").click(function () {
								if ($(".combineOrderSelect").val() == "no") {
									closeCombineOrderPop();
									if (ProfileInfo.HotelGKBooking) {
										// HotelGKBooking(detailInfo, "ticket");
										CheckHotelTrip(detailInfo, "ticket")
									} else {
										checkRemark(detailInfo, 'ticket');
									}
								} else {
									$('body').mLoading("show");
									$.ajax({
										type: 'post',
										url: $.session.get('ajaxUrl'),
										dataType: 'json',
										data: {
											url: $.session.get('obtCompany') + "/OrderService.svc/UpdateAirOrderNo",
											jsonStr: '{"orgOrderNo":"' + detailInfo.OrderNo + '","newOrderNo":"' + $(".combineOrderSelect").val() +
												'","id":' + netUserId + '}'
										},
										success: function (data) {
											$('body').mLoading("hide");
											var res = JSON.parse(data);
											console.log(res);
											if (res || res == "true") {
												alert("ok");
												var searchOrderInfo = {
													'orderNo': $(".combineOrderSelect").val(),
												}
												$.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
												window.location.href = '../../orders/orderDetails.html';
												// closeCombineOrderPop();
											} else {
												alert(res);
											}
										},
										error: function () {
											// alert('fail');
										}
									});
								}
							})
						},
						error: function () {
							// alert('fail');
						}
					});
				} else {
					if (ProfileInfo.HotelGKBooking) {
						// HotelGKBooking(detailInfo, "ticket");
						CheckHotelTrip(detailInfo, "ticket")
					} else {
						checkRemark(detailInfo, 'ticket');
					}
				}
			})
			/*预订完成后点击事件*/
			if ("finish" == bookState) {
				$(".uploadFileImg").unbind("click").click(function () {
					closeGoOnBookPop();
					$(".uploadFileBtn").click();
				})
				$(".approveImg").unbind("click").click(function () {
					closeGoOnBookPop();
					$(".approvalBtn").click();
				})
				$(".payImg").unbind("click").click(function () {
					closeGoOnBookPop();
					$(".onlinePayBtn").click();
				})
				$(".ticketImg").unbind("click").click(function () {
					closeGoOnBookPop();
					$(".ticketBtn").click();
				})
			}
			/*审核详情*/
			if (res.ApproveDtailList.length == 0) {
				$(".approvalInfo").remove();
			} else {
				res.ApproveDtailList.map(function (item) {
					$(".approvalList").append(
						'\
                        <div class="approvalLi flexRow">\
                        <div class="approvalLiDiv" style="width:100px;">' +
						item.ApproverLevel + '</div>\
                        <div class="approvalLiDiv" style="width:150px;">' +
						item.Approver + '</div>\
                        <div class="approvalLiDiv" style="width:150px;">' + item.ApproverPhone +
						'<img src="../../orders/images/phoneIcon.png" class="phoneIcon" applicationNo="' + item.ApplicationNo +
						'" approvor="' + item.ApproverID +
						'"></div>\
                        <div class="approvalLiDiv" style="width:250px;">' + hideEmail(ProfileInfo, item.ApproverEmail) +
						'<img src="../../orders/images/emailIcon.png" class="emailIcon" applicationNo="' + item.ApplicationNo +
						'" approvor="' + item.ApproverID +
						'"></div>\
                        <div class="approvalLiDiv" style="width:150px;">' + item.ApprovalResult +
						'</div>\
                        <div class="approvalLiDiv" style="width:230px;">' + item.ApprovalDate +
						'</div>\
                        <div class="approvalLiDiv ellipsis" style="width:160px;" title="' + item.ApprovalReason +
						'"><xmp>' + item.ApprovalReason + '</xmp></div>\
                        </div>\
                        ')
				})
				$(".phoneIcon").unbind("click").click(function () {
					var r = confirm(get_lan("approvalInfo").approvalPhoneRemind);
					if (r == true) {
						$.ajax({
							type: 'post',
							url: $.session.get('ajaxUrl'),
							dataType: 'json',
							data: {
								url: $.session.get('obtCompany') + "/OrderService.svc/ApplicationResendPost",
								jsonStr: '{"applicationNo":"' + $(this).attr("applicationNo") + '","approvor":"' + $(this).attr(
									"approvor") + '","type":"2","id":' + netUserId + ',"Language":"' + obtLanguage + '"}'
							},
							success: function (data) {
								var res = JSON.parse(data);
								console.log(res);
								if (res.code == "200") {
									alert("ok");
								} else {
									alert(res.data);
								}
							},
							error: function () {
								// alert('fail');
							}
						})
					}
				})
				$(".emailIcon").unbind("click").click(function () {
					var r = confirm(get_lan("approvalInfo").approvalEmailRemind);
					if (r == true) {
						$.ajax({
							type: 'post',
							url: $.session.get('ajaxUrl'),
							dataType: 'json',
							data: {
								url: $.session.get('obtCompany') + "/OrderService.svc/ApplicationResendPost",
								jsonStr: '{"applicationNo":"' + $(this).attr("applicationNo") + '","approvor":"' + $(this).attr(
									"approvor") + '","type":"1","id":' + netUserId + ',"Language":"' + obtLanguage + '"}'
							},
							success: function (data) {
								var res = JSON.parse(data);
								console.log(res);
								if (res.code == "200") {
									alert("ok");
								} else {
									alert(res.data);
								}
							},
							error: function () {
								// alert('fail');
							}
						});
					}
				})
			}
			/*订单详情*/
			res.OrderCustomerDetailList.map(function (item, index) {
				$(".passengerList").append('\
                    <div class="passengerLi flexRow" customerId="' + item.Uid +
					'">\
                    <div class="passengerLiDiv ellipsis" style="width:180px;" title="' + item.NameCn +
					'">' + item.NameCn +
					'</div>\
                    <div class="passengerLiDiv ellipsis" style="width:150px;" title="' + item.NameEn +
					'">' + item.NameEn +
					'</div>\
                    <div class="passengerLiDiv passengerPhone" style="width:150px;">' + item.Tel +
					'</div>\
                    <div class="passengerLiDiv passengerLiDocuments" style="width:300px;">' + hideDocument(ProfileInfo, item.DocumentNOs[
						0], 2) + '</div>\
                    <div class="passengerLiDiv" style="width:170px;">' + item.PsgType +
					'</div>\
                    <div class="passengerLiDiv" style="width:100px;"></div>\
                    <div class="passengerLiDiv changeRemarkBtn" index="' +
					index + '"  style="width:130px;text-decoration: underline;color:#1e66ae;cursor:pointer">' + get_lan(
						'orderCustomerInfo').remarks +
					'</div>\
                    </div>\
                    \
                    ')
				$(".changeRemarkBtn").unbind("click").click(function () {
					var index = parseInt($(this).attr("index"));
					var customerId = res.OrderCustomerDetailList[index].Uid;
					var employeeName = res.OrderCustomerDetailList[index].NameCn;
					remarkInfoPop(customerId, employeeName, res.OrderCustomerDetailList[index].Remarks, 'order', '', '');
				})
			})

			/*订单详情*/
			if (res.Segment.length != 0) {
				$(".orderList").addClass("hide");
				$(".segmentList").removeClass("hide");
			} else if (res.Hotel.length != 0) {
				$(".orderList").addClass("hide");
				$(".hotelList").removeClass("hide");
			} else if (res.Train.length != 0) {
				$(".orderList").addClass("hide");
				$(".trainList").removeClass("hide");
			}
			//租车
			else if (res.Car.length != 0) {
				$(".orderList").addClass("hide");
				$(".carList").removeClass("hide");
			}

			if (res.Segment.length != 0) {
				$(".orderDetailsTabBar").append('<div class="orderDetailsTab" name="Segment">' + get_lan('orderDetailsTabBar').airTicket +
					'</div>');
				segmentList(res);
			}
			if (res.Hotel.length != 0) {
				$(".orderDetailsTabBar").append('<div class="orderDetailsTab" name="Hotel">' + get_lan('orderDetailsTabBar').hotel +
					'</div>');
				hotelList(res);
			}
			if (res.Train.length != 0) {
				$(".orderDetailsTabBar").append('<div class="orderDetailsTab" name="Train">' + get_lan('orderDetailsTabBar').train +
					'</div>');
				trainList(res);
			}
			/*2020-2-16 租车*/
			if (res.Car.length != 0) {
				$(".orderDetailsTabBar").append('<div class="orderDetailsTab" name="Car">' + get_lan('orderDetailsTabBar').car +
					'</div>');
				carList(res);
			}
			// 2020-3-26 下载行程单
			showDownloadBtn()
			/*end*/

			// 支付订单显示字段
			var enStr = '',
				cnStr = '';
			var airCNStr = '',
				HotelCNStr = '',
				TrainCNStr = '',
				carCNStr = '';
			var airENStr = '',
				HotelENStr = '',
				TrainENStr = '',
				carENStr = '';
			console.log(res.Segment)
			console.log(res.Segment[0])
			res.Segment.map(function (airList) {
				// 飞机票是嵌套的数组
				airList.map(function (airItem) {
					if (airItem.ItemPayment == "Credit Card") {
						airCNStr = '机票、'
						airENStr = 'air,'
					}
				})
			})
			res.Hotel.map(function (hotelItem) {
				if (hotelItem.ItemPayment == "Credit Card") {
					HotelCNStr = '酒店、'
					HotelENStr = 'hotel,'
				}
			})
			res.Train.map(function (trainItem) {
				if (trainItem.ItemPayment == "Credit Card") {
					TrainCNStr = '火车、'
					TrainENStr = 'train,'
				}
			})
			res.Car.map(function (carItem) {
				if (carItem.ItemPayment == "Credit Card") {
					carCNStr = '租车、'
					carENStr = 'car rental,'
				}
			})

			enStr = airENStr + HotelENStr + carENStr + TrainENStr;
			en.tipsClass = enStr.substring(0, enStr.length - 1)
			// 将首字母大写
			en.tipsClass = en.tipsClass.charAt(0).toUpperCase() + en.tipsClass.slice(1)

			en.tipsText = en.tipsClass + en.tipsText

			cnStr = airCNStr + HotelCNStr + carCNStr + TrainCNStr;
			cn.tipsClass = cnStr.substring(0, cnStr.length - 1)
			cn.tipsText = cn.tipsClass + cn.tipsText
			// travXpense(detailInfo);
			if ($(".orderDetailsTab").eq(0)) {
				$(".orderDetailsTab").eq(0).addClass("tabActive");
			}
			$(".orderDetailsTab").unbind("click").click(function () {
				scrollTo(0, 0);
				$(".orderDetailsTab").removeClass("tabActive");
				$(this).addClass("tabActive");
				switch ($(this).attr("name")) {
					case 'Segment':
						$(".orderList").addClass("hide");
						$(".segmentList").removeClass("hide");
						break;
					case 'Hotel':
						$(".orderList").addClass("hide");
						$(".hotelList").removeClass("hide");
						break;
					case 'Train':
						$(".orderList").addClass("hide");
						$(".trainList").removeClass("hide");
						break;
					case 'Car':
						$(".orderList").addClass("hide");
						$(".carList").removeClass("hide");
						break;
				}
			})
		},
		error: function () {
			// alert('fail');
		}
	});
}


// 是否显示现在按钮

function showDownloadBtn() {
	// 判断条件3.24 显示下载按钮
	// DownloadItinerary  下载行程单
	// DownloadBill  下载账单
	$(".orderDetailsTabBar").append('<div class="downloadBtnGroup"></div>');
	// if(ProfileInfo.DownloadItinerary){
	// 	$(".downloadBtnGroup").append('<div class="x">下载行程单</div>');
	// }
	// if(ProfileInfo.DownloadItinerary){
	// 	$(".downloadBtnGroup").append('<div class="xx">下载账单</div>');
	// }
	var showItinerary = ProfileInfo.DownloadItinerary ? "" : "hide"
	var showInvoice = orderDetaile.CanDownloadBill ? "" : "hide"

	$(".orderDetailsTabBar").append('<div class="downloadBtnGroup">' +
		'<span class="itinerary ">' + get_lan('orderInfo').DownloadItinerary + '</span>' +
		'<span class="invoice">' + get_lan('orderInfo').DownloadInvoice + '</span>' +
		'</div>');

	if (showItinerary == "hide") {
		$('.itinerary').remove()
	} else {
		$(".itinerary").unbind().click(function () {
			getItineraryFile(orderDetaile)
		})
	}
	if (showInvoice == "hide") {
		$('.invoice').remove()
	} else {
		$(".invoice").unbind().click(function () {
			getInvoiceFile(orderDetaile)
		})
	}



}
// 行程单
function getItineraryFile(orderDetaile) {
	$('body').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/orderService.svc/getItineraryFile",
			jsonStr: '{"orderNo":"' + orderDetaile.OrderNo + '","id":' + netUserId + ',"language":"' + obtLanguage +
				'","fileName":"Itinerary-' + orderDetaile.OrderNo + '"}'
		},
		success: function (data) {
			if (data == "") {
				alert("生成订单失败")
				return false;
			}
			var res = JSON.parse(data)
			// 预览行程单
			getPdf(res, "Itinerary")
		},
	})
}
// 账单
function getInvoiceFile(orderDetaile) {
	$('body').mLoading("show");
	//string orderType 机票 1  酒店2  租车3 火车4
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/orderService.svc/getInvoiceFile",
			jsonStr: '{"orderNo":"' + orderDetaile.OrderNo + '","id":' + netUserId + ',"language":"' + obtLanguage +
				'","fileName":"Invoice-' + orderDetaile.OrderNo + '","orderType":"1"}'
		},
		success: function (data) {
			$('body').mLoading("hide");
			var res = JSON.parse(data)
			if (res == "") {
				alert("生成账单失败")
				return false;
			}
			// 预览行程单
			getPdf(res, "Invoice")
		},
	})
}
// 获取pdf
function getPdf(fileName, type) {
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/orderService.svc/DownloadFile",
			jsonStr: '{"id":' + netUserId + ',"fileName":"' + fileName + '","type":"' + type + '"}'
		},
		timeout: 10000,
		success: function (data, s) {
			$('body').mLoading("hide");
			var res = JSON.parse(data)
			console.log(res)
			sessionStorage.setItem('localPdfUrl', res.fileModelList[0].FileStr)
			sessionStorage.setItem('localPdfName', fileName)
			window.open("../../js/pdfjs/web/viewer.html")
		},
		complete: function (x, s) {
			$('body').mLoading("hide");
			if (s == 'timeout') {//超时,s还有success,error等值的情况
				// 　　				ajaxTimeoutTest.abort();
				alert("timeout");
			}
		}

	})
}


function travXpense(orderRes) {
	console.log(orderRes);
	$('body').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/orderService.svc/GetTravelRequestData",
			jsonStr: '{"request":{"BCN":"' + orderRes.OrderNo + '","id":' + netUserId + ',"language":"' + obtLanguage +
				'","companyId":"' + ProfileInfo.companyId + '"}}'
		},
		success: function (data) {
			var res = JSON.parse(data);
			console.log(res);
			$('body').mLoading("hide");
			if (res.TravelRequestNewMiscell[0].MiscellBookList.length != 0) {
				$(".orderDetailsTabBar").append('<div class="orderDetailsTab otherExpenses" name="otherExpenses">' + get_lan(
					'orderDetailsTabBar').otherExpenses + '</div>');
			}
			otherExpensesList(res);
			$(".otherExpenses").unbind("click").click(function () {
				scrollTo(0, 0);
				$(".orderDetailsTab").removeClass("tabActive");
				$(this).addClass("tabActive");
				$(".orderList").addClass("hide");
				$(".otherExpensesList").removeClass("hide");
			})
		},
		error: function () {
			// alert('fail');
		}
	});

	function otherExpensesList(travelRequestRes) {
		console.log(travelRequestRes);
		$(".otherExpensesList").html('\
            <div class="otherFareTittle">' + get_lan("otherExpensesList").miscell +
			'</div>\
            <div class="MiscellList"></div>\
            ')
		travelRequestRes.TravelRequestNewMiscell[0].MiscellBookList.map(function (item, index) {
			$(".MiscellList").append(
				'\
                <div class="MiscellLi flexRow">\
                  <div class="MiscellLiTittle">' + item.ProductCode +
				'</div>\
                  <div class="MiscellLiTittle" style="width:60px;">' + get_lan("otherExpensesList").amount +
				'</div>\
                  <input type="text" class="miscellLiInput miscellLiInputAmount" value="' + item.Farepaid +
				'" readonly>\
                  <div class="activeFontColor" style="margin:0 20px 0 10px;">' + item.Currency +
				'</div>\
                  <div class="MiscellLiTittle" style="width:60px;">' + get_lan("otherExpensesList").remark +
				'</div>\
                  <input type="text" class="miscellLiInput miscellLiInputRemark" value="' + item.BookRemark +
				'" readonly>\
                  <div class="flexRow">\
                    <input type="checkbox" class="miscellPayCheck">\
                    ' +
				get_lan("otherExpensesList").companyPay +
				'\
                  </div>\
                  <div class="modifyMiscell" index="' + index + '" state="modify">' +
				get_lan("otherExpensesList").modify + '</div>\
                </div>\
            ')
			if (item.Payment != "cash") {
				$(".miscellPayCheck").eq(index).prop("checked", true);
			}
		})
		$(".modifyMiscell").unbind("click").click(function () {
			var index = parseInt($(this).attr("index"));
			if ($(this).attr("state") == "modify") {
				$(".miscellLiInputAmount").eq(index).removeAttr("readonly");
				$(".miscellLiInputRemark").eq(index).removeAttr("readonly");
				$(this).attr("state", "save");
				$(this).text(get_lan("otherExpensesList").save);
			} else if ($(this).attr("state") == "save") {
				$(".miscellLiInputAmount").eq(index).attr("readonly", "readonly");
				$(".miscellLiInputRemark").eq(index).attr("readonly", "readonly");
				$(this).attr("state", "modify");
				$(this).text(get_lan("otherExpensesList").modify);
			}
		})
		$(".MiscellLi").eq($(".MiscellLi").length - 1).css("border", "0");
	}
}
/*在线支付*/
function onlinePay(orderRes, operationType, payType) {
	//  无卡支付权限 CreditCardYeepay
	if (!ProfileInfo.AliPay && !ProfileInfo.WechatPay && !ProfileInfo.CreditCardYeepay && ProfileInfo.CloseCreditCardGateway) {
		alert(get_lan('onlinePayPop').nopayment)
		return false;
	}
	if (payType == "CreditCardPay" && !ProfileInfo.CreditCardYeepay && ProfileInfo.CloseCreditCardGateway) {
		alert(get_lan('onlinePayPop').nopayment)
		return false;
	}
	if (!ProfileInfo.AliPay && !ProfileInfo.WechatPay && !ProfileInfo.CreditCardYeepay) {
		// 仅有易宝支付
		yeePay(orderRes);
	} else if (ProfileInfo.AliPay && !ProfileInfo.WechatPay && !ProfileInfo.CreditCardYeepay && ProfileInfo.CloseCreditCardGateway) {
		// 仅有支付宝支付
		apilyPay(orderRes);
	} else if (!ProfileInfo.AliPay && !ProfileInfo.WechatPay && ProfileInfo.CreditCardYeepay && ProfileInfo.CloseCreditCardGateway) {
		// 仅有无卡支付
		nocardPay(orderRes);
	} else {
		openOnlinePayPop();
		$(".onlinePayPop").html('\
            <div class="onlinePayTittle tittleBackColor">' + get_lan('onlinePayRemind') +
			'<div class="closeOnlinePayIcon" style="color:#fff;">x</div></div>\
            <div class="tipsGroup">' + get_lan(
				'tipsText') +
			'</div>\
			<div class="flexRow onlinePayUl">\
                <div class="onlinePayLi yeePayLi">\
                  <div class="onlinePayImg yeePayImg" name="yeePay"></div>\
                  <div class="onlineLiText">' +
			get_lan('onlinePayPop').yeePay +
			'</div>\
                </div>\
				<div class="onlinePayLi quickLi">\
				      <div class="onlinePayImg nocardImg" name="quick"></div>\
				      <div class="onlineLiText">' +
			get_lan('onlinePayPop').quickPayment +
			'</div>\
				    </div>\
                <div class="onlinePayLi alipayLi">\
                  <div class="onlinePayImg alipayImg" name="alipay"></div>\
                  <div class="onlineLiText">' +
			get_lan('onlinePayPop').alipay +
			'</div>\
                </div>\
                <div class="onlinePayLi wechatLi">\
                  <div class="onlinePayImg wechatImg" name="wechat"></div>\
                  <div class="onlineLiText">' +
			get_lan('onlinePayPop').wechat +
			'</div>\
                </div>\
            </div>\
				<div class="cancelbtnGroup">\
				  <div class="cancelbtn btnBackColor">' +
			get_lan('cancelbtn') + '</div>\
				</div>\
            ')
		// $(".onlinePayPop").css("background-color","#ececec");
		$(".closeOnlinePayIcon").unbind("click").click(function () {
			closeOnlinePayPop(operationType);
		})
		$(".cancelbtn").unbind("click").click(function () {
			closeOnlinePayPop(operationType);
		})

		$(".wechatLi").remove();

		if (!ProfileInfo.CreditCardYeepay) {
			$(".quickLi").remove();
		}
		if (ProfileInfo.CloseCreditCardGateway) {
			$(".yeePayLi").remove();
		}
		if (!ProfileInfo.AliPay) {
			$(".alipayLi").remove();
		}
		if ("CreditCardPay" == payType) {
			$(".alipayLi").remove();
		}
		// $(".onlinePayLi").eq(1).remove(); 600 - 900
		$(".onlinePayLi").css("width", (600 / parseInt($(".onlinePayLi").length)) + "px");
		$(".onlineLiText").css("width", (600 / parseInt($(".onlinePayLi").length) - 100) + "px");
		$(".onlinePayImg").css("margin", "15px auto");
		// $(".onlinePayImg").css("margin", "15px " + (300 / parseInt($(".onlinePayLi").length) - 85) + "px");

		$(".onlinePayImg").unbind("click").click(function () {
			if ($(this).attr("name") == "yeePay") {
				yeePay(orderRes);
			} else if ($(this).attr("name") == "alipay") {
				$('body').mLoading("show");
				var type = ProfileInfo.onlineStyle == "APPLE" ? 4 : 1;
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/QueryService.svc/QueryOrderPayInfo",
						jsonStr: '{"request":{"id":' + netUserId + ',"orderNo":"' + $(".onlinePayBtn").attr("orderNo") +
							'","language":"' + obtLanguage + '","payChannel":"1"}}'
					},
					success: function (data) {
						// $('body').mLoading("hide");
						var res = JSON.parse(data);
						console.log(res);
						var subject = obtLanguage == "CN" ? cn.tipsClass : en.tipsClass;
						// return false;
						$.ajax({
							type: 'post',
							url: $.session.get('ajaxUrl'),
							dataType: 'json',
							data: {
								url: $.session.get('obtCompany') + "/SystemService.svc/GetAopBodyNew",
								jsonStr: '{"request":{"subject":"' + subject + '","totalAmount":"' + res.payAmount + '","exMechantNO":"' +
									res.exMechantNO + '","type":"' + type + '"}}'
							},
							success: function (data) {
								// $('body').mLoading("hide");
								var res = JSON.parse(data);
								console.log(res);
								$('body').append(res);
							},
							error: function () {
								// alert('fail');
							}
						});
					},
					error: function () {
						// alert('fail');
					}
				});
			} else if ($(this).attr("name") == "wechat") {

			} else if ($(this).attr("name") == "quick") {
				nocardPay(orderRes)
			}
		})
	}
}
/*易pay支付*/
function yeePay(orderRes) {
	$('body').mLoading("show");
	var subject = obtLanguage == "CN" ? cn.tipsClass : en.tipsClass;
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/OrderService.svc/SubmitGotoYeepayLink",
			jsonStr: '{"orderNo":"' + $(".onlinePayBtn").attr("orderNo") + '","id":' + netUserId + ',"phone":"' + $(
				".onlinePayBtn").attr("phone") + '"}'
		},
		success: function (data) {
			var res = JSON.parse(data);
			console.log(res);
			$('body').mLoading("hide");
			if (res.status == "S") {
				window.open("" + res.salelink + "");
				setTimeout(function () {
					closeOnlinePayPop();
					if (orderRes.ShowApproval && !orderRes.UploadFileApprove) {
						// approvalInfoPop(orderRes);
						//11月11日，取消打开审核页面；流程为先审核再支付，没有后续操作，但是要刷新一下页面
						location.reload()
					}
					get_lan('onlinePayRemind')
					$(".onlinePayPop").html('\
					    <div class="onlinePayTittle tittleBackColor">' + '请在新页面完成付款' +
						'<div class="closeOnlinePayIcon" style="color:#fff;">x</div></div>\
						<div class="flexRow onlinePayUl">\
					       <p>完成付款后请根据情况点击下面按钮：</p>\
					        </div>\
					    </div>\
							<div class="cancelbtnGroup">\
							  <div class="cancelbtn tittleBackColor">' +
						get_lan('finalbtn') + '</div>\
						<div class="cancelbtn btnBackColor">' +
						get_lan('cancelbtn') + '</div>\
							</div>\
					    ')
				}, 1000); //30000修改为1000，不清楚为何加上延迟
				// window.location.href = '../../orders/orders.html'
			} else {
				alert(res.msg);
				$(".onlinePayPop").html('\
				    <div class="onlinePayTittle tittleBackColor">' + '请在新页面完成付款' +
					'</div>\
					<div class="flexRow onlinePayUl">\
				       <p class="" style="width: 100%;display: flex;justify-content: center;align-items: center;font-size:18px">完成付款后请根据情况点击下面按钮：</p>\
				        </div>\
				    </div>\
						<div class="cancelbtnGroup">\
						  <div class="cancelbtn tittleBackColor refresh">' +
					get_lan('finalbtn') + '</div>\
					<div class="cancelbtn btnBackColor">' +
					get_lan('cancelbtn') + '</div>\
						</div>\
				    ')
				$(".refresh").unbind("click").click(function () {
					closeOnlinePayPop('approval');
				})
				$(".cancelbtn").eq(1).unbind("click").click(function () {
					closeOnlinePayPop(); //不刷新页面
				})
			}
		},
		error: function () {
			// alert('fail');
		}
	})
}
/*无卡支付*/
function nocardPay(orderRes) {
	console.log(orderRes)
	$("#cover").hide();
	$(".onlinePayPop").css("display", "none");

	// GetCustomerCreditCardInfoPost参数 customerId
	// 弹窗
	// 支付按钮
	// var payNum=orderDetaile.OrderFare.split('CNY')
	$("body").append('<div id="cover2" class="quickPay">' +
		'<div class="quickGroup">' +
		'<div class="quickTitle">' + get_lan('noCard').title + '<span class="quickClose">X</span></div>' +
		'<div class="quickTip">' + get_lan('noCard').tips + '</div>' +
		'<div class="quickbody">' +
		'<div class="quickLine CreditCardName clearfix">' +
		'<div class="lineTitle">' + get_lan('noCard').name + '</div>' +
		'<div class="lineContent">' +
		'<select class="cardholder" ></select>' +
		'</div>' +
		'</div>' +
		'<div class="quickLine clearfix">' +
		'<div class="lineTitle">' + get_lan('noCard').carNum + '</div>' +
		'<div class="lineContent">' +
		'<select class="customerCardList"></select>' +
		'</div>' +
		'</div>' +
		'<div class="quickLine overTimeLine clearfix">' +
		'<div class="lineTitle">' + get_lan('noCard').overTime + '</div>' +
		'<div class="lineContent">' +
		'<input class="overTime" id="overTimeID" type="text" readonly>' +
		'</div>' +
		'</div>' +
		'<div class="quickLine CVVline clearfix">' +
		'<div class="lineTitle">' + get_lan('noCard').CVV + '</div>' +
		'<div class="lineContent"><input type="text" class="cvvNum"></div>' +
		'</div>' +
		'<div class="quickLine domline clearfix">' +
		'<div class="lineTitle">' + get_lan('noCard').domType + '</div>' +
		'<div class="lineContent">' +
		'<select class="documentType"></select>' +
		'</div>' +
		'</div>' +
		'<div class="quickLine domline clearfix">' +
		'<div class="lineTitle">' + get_lan('noCard').domNum + '</div>' +
		'<div class="lineContent"><input type="text" class="domNum"></div>' +
		'</div>' +
		'<div class="quickLine phoneline clearfix">' +
		'<div class="lineTitle">' + get_lan('noCard').phoneNum + '</div>' +
		'<div class="lineContent"><input type="text" class="phoneNum"></div>' +
		'</div>' +
		'</div>' +
		'<div class="quickFoot">' +
		'<div class="quickBtn payBtn">' + orderDetaile.YeePayInfoAmount + '，' + get_lan('noCard').pay + '</div>' +
		'</div>' +
		'</div>' +
		'</div>')
	// '<div class="quickBtn">888.00<span>CNY，</span>支付</div>'+

	//填充订单旅客
	orderDetaile.OrderCustomerDetailList.map(function (user) {
		if (obtLanguage == "EN") {
			$('.cardholder').append('<option value ="' + user.Uid + '">' + user.NameCn + '</option>')
		} else {
			$('.cardholder').append('<option value ="' + user.Uid + '">' + user.NameCn + '</option>')
		}
	})
	// 2020-3-11 如果订单内旅客只有一个，隐藏持卡人姓名

	if (orderDetaile.OrderCustomerDetailList.length < 2) {
		$('.CreditCardName').hide()
	}
	// 不显示有效期，证件类型，证件号，手机号
	$('.overTimeLine').hide()
	$('.domline').hide()
	$('.phoneline').hide()
	// 绑定改变事件
	$('.cardholder').change(function () {
		getcustomerInfo()
	})
	$('.payBtn').click(function () {
		payWithNocard()
	})

	// 根据持卡人获取信息
	// 第一次打开先获取一次   默认订单内第一个人
	getcustomerInfo()
	var requireInfo = ""
	//无卡支付，换新方法，且UseType传2，其他传1
	function getcustomerInfo() {
		var customerId = $('.cardholder').val()
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				// url: $.session.get('obtCompany') + "/SystemService.svc/GetCustomerCreditCardInfoPost",
				// jsonStr: '{"id":' + netUserId + ',"Language ":"' + obtLanguage + '","customerId":"' + customerId + '"}'
				url: $.session.get('obtCompany') + "/SystemService.svc/GetAllCreditCardInfoPost",
				jsonStr: '{"request":{"Id":' + netUserId + ',"CustomerId":"' + customerId + '","UseType":"2","Language ":"' + obtLanguage + '"}}'
			},
			success: function (data) {
				var res = JSON.parse(data);
				console.log(res);
				$(".quickClose").click(function () {
					$('#cover2').remove()
				})
				// 证件类型
				// 信用卡号
				$('.customerCardList').empty()
				if (res.customerCCIs.length > 0) {
					res.customerCCIs.map(function (item) {
						$(".customerCardList").append('<option value="' + item.DelRefId + '"CreditCardExpire="' + item.CreditCardExpire +
							'" CreditCardNumber="' + item.CreditCardNumber + '" NeedCvv="' + item.NeedCvv + '" NeedDocument="' + item.NeedDocument +
							'" NeedPhone="' + item.NeedPhone + '">' + item.CardNum + '</option>')
					})
					$(".CVVline").show(100)
					changeCardNum()
				} else {
					$(".CVVline").hide(100)
				}

				$('.customerCardList').change(function () {
					changeCardNum("click")
				})
				// 获取该信用卡,及条件
				function changeCardNum(selectType) {

					var card_num = $(".customerCardList").val();
					var opt = $(".customerCardList").find("option[value =" + card_num + "]")
					// CreditCardExpire 信用卡过期时间
					var tArr = opt.attr("CreditCardExpire").split("-")
					$('.overTime').val(tArr[0] + "-" + tArr[1])
					// 最小时间
					var minDate = new Date();
					$("#overTimeID").datepicker({
						dateFormat: 'yy-mm',
						// dateFormat: 'yy-mm-dd',
						changeMonth: true,
						minDate: minDate, // 当前日期之后的 0 天，就是当天
						hideIfNoPrevNext: true,
						showOtherMonths: true,
						selectOtherMonths: true,
					});

					console.log(opt.attr("NeedCvv"))
					requireInfo = opt
					if (opt.attr("NeedCvv") == "false") {
						// NeedCvv=true时，表示需要填CVV
						$(".CVVline").hide(100)
					} else {
						$(".CVVline").show(100)
					}
					// if(!res.companyCCI.NeedPhone){
					if (opt.attr("NeedPhone") == "false") {
						// NeedPhone=true时，表示需要填手机号
						$(".phoneline").hide(100)
					} else {
						$(".phoneline").show(100)
					}
					// if(!res.companyCCI.NeedDocument){
					if (opt.attr("NeedDocument") == "false") {
						// NeedDocument=true时，表示需要填证件号
						$(".domline").hide(100)

					} else {
						if (selectType != "click") {
							res.DocumentTypeList.map(function (item) {
								if (obtLanguage == "EN") {
									$(".documentType").append('<option value ="' + item.Rid + '">' + item.NameEn + '</option>')
								} else {
									$(".documentType").append('<option value ="' + item.Rid + '">' + item.NameCn + '</option>')
								}
							})
						}
					}
					var h = $('.quickGroup').height() / 2
					$('.quickGroup').css('marginTop', 'calc(50vh - ' + h + 'px)')
				}
				// 改变证件类型
				function changeDocType() {
					// 获取选中的rid即value
					var type = $(".documentType").val()
					var docNum = ""
					res.DocumentList.map(function (docItem) {
						if (docItem.Rid == type) {
							docNum = docItem.DocumentNumber
						}
					})
					$(".domNum").val(docNum)
				}
				changeDocType()
				$('.documentType').change(function () {
					changeDocType()
				})
				// 默认手机号
				$(".phoneNum").val(res.PhoneNumber)

			},
			error: function () {
				// alert('fail');
			}
		});

	}
	// 无卡支付
	function payWithNocard() {
		// id:""
		var docType = $(".documentType").val() ? $(".documentType").val() : ""

		// 信用卡卡号
		var card_num = $(".customerCardList").val()
		var opt = $(".customerCardList").find("option[value =" + card_num + "]")
		var cardNum = opt.attr("creditcardnumber")
		if (cardNum == undefined || cardNum == "" || cardNum == null) {
			alert(get_lan("noCard").Maintain)
			return false;
		}
		// var s=tools.Decrypt(cardNum)
		// return false


		var subid = netUserId.split("\"")[1]
		var optName = $(".cardholder").find('option[value ="' + $(".cardholder").val() + '"]')
		var request = {
			id: subid,
			orderNo: orderDetaile.OrderNo,
			cardNumber: cardNum,
			// vailDate: $(".overTime").val(),
			cvv: $(".cvvNum").val(),
			holderName: optName.text(),
			// docType: docType,
			// docNumber: $(".domNum").val(),
			// phone: $(".phoneNum").val(),
			language: obtLanguage,
			customerId: $('.cardholder').val(),
		}
		//验证是否为空
		console.log(requireInfo)
		if (requireInfo.attr("NeedCvv") == "true" && request.cvv == "") {
			// NeedCvv=true时，表示需要填CVV
			if (obtLanguage == "EN") {
				alert("请填写CVV")
			} else {
				alert("请填写CVV")
			}
			return false;
		}
		if (requireInfo.attr("NeedPhone") == "true" && request.phone == "") {
			// NeedPhone=true时，表示需要填手机号
			if (obtLanguage == "EN") {
				alert("请填写银行预留手机号")
			} else {
				alert("请填写银行预留手机号")
			}
			return false;
		}
		if (requireInfo.attr("NeedDocument") == "true" && request.docNumber == "") {
			// NeedDocument=true时，表示需要填证件号
			if (obtLanguage == "EN") {
				alert("请填写证件号")
			} else {
				alert("请填写证件号")
			}
			return false;
		}


		console.log(request)
		// return false;
		$('body').mLoading("show");
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/OrderService.svc/SubmitYeePayInfoPost",
				jsonStr: '{"request":' + JSON.stringify(request) + '}'
			},
			success: function (data) {
				var res = JSON.parse(data);
				console.log(res);
				$('body').mLoading("hide");
				if (res.code == "200") {
					// res.YeepayOrder  生成订单号
					// res.Amount  订单金额

					if (res.NeedVerifyCode) {
						// 弹出验证码弹窗
						// 完成支付  如果需要验证码
						//1.隐藏支付框

						$(".quickbody").html("")
						$(".quickBtn").remove()
						$(".quickTip").html(get_lan('noCard').tips2)
						$(".quickTip").css({
							"font-size": "16px",
							"color": "rgb(102,102,102)",
							"padding-top": "60px",
							"padding-bottom": "28px"
						})
						// 2.添加验证码获取
						$('.quickbody').append('<div class="quickLine  clearfix">' +
							'<div class="lineTitle">' + get_lan('noCard').codeText + '</div>' +
							'<div class="lineContent checkCodeline">' +
							'<input class="checkCode" maxlength="6"/>' +
							'</div>' +
							'<div class="linebtn">' + get_lan('noCard').lineText +
							'</div>' +
							'</div>')
						$('.quickFoot').append('<div class="quickBtn confirmPay">' + get_lan('noCard').payBtn + '</div>')
						// 计时器
						function myTimer() {
							var time = 60
							$('.linebtn').text(time + "s")
							$('.linebtn').css({
								"color": "#333333",
								"cursor": "none"
							})
							var interval = setInterval(function () {
								time--
								if (time > 0) {
									$('.linebtn').text(time + "s")
									$('.linebtn').attr('click', 'no')
								} else {
									$('.linebtn').text(get_lan('noCard').lineText)
									$('.linebtn').css({
										"color": "#094B90",
										"cursor": "pointer"
									})
									$('.linebtn').attr('click', 'yes')
									clearTimeout(interval)
								}
							}, 1000)
						}
						myTimer()
						$('.linebtn').click(function () {
							console.log($(this).attr('click'))
							// 获取验证码
							if ($(this).attr('click') == 'yes') {
								myTimer()
								$.ajax({
									type: 'post',
									url: $.session.get('ajaxUrl'),
									dataType: 'json',
									data: {
										url: $.session.get('obtCompany') + "/OrderService.svc/GetVerifyCodePost",
										jsonStr: '{"yeepayOrder":' + res.YeepayOrder + '","language":"' + obtLanguage + '"}'
									},
									success: function (data) {
										var codeRes = JSON.parse(data);
										console.log(codeRes);
										if (codeRes.code != "200") {
											alert("获取验证码失败,请稍后再试")
										}
									},
								})
							} else {
								return false
							}
						})
						$('.confirmPay').click(function () {
							var yeepayStr = {
								id: netUserId.split("\"")[1],
								orderNo: orderDetaile.OrderNo,
								yeepayOrder: res.YeepayOrder,
								amount: res.Amount,
								verifyCode: $('.checkCode').val(),
								language: obtLanguage,
							}
							$.ajax({
								type: 'post',
								url: $.session.get('ajaxUrl'),
								dataType: 'json',
								data: {
									url: $.session.get('obtCompany') + "/OrderService.svc/YeePayPost",
									jsonStr: '{"request":' + JSON.stringify(yeepayStr) + '}'
								},
								success: function (data) {
									var payRes = JSON.parse(data);
									console.log(payRes);
									if (payRes.code == "200") {
										// alert("支付成功")
										alert(res.message)	//打印后台返回的参数，不确定是不是这个
										$('#cover2').remove()
										window.location.reload();
									} else {
										alert(payRes.message)
									}
								},
							})

						})
					} else {
						// alert("支付成功")
						alert(res.message)	//打印后台返回的参数，不确定是不是这个
						window.location.reload();
						$("#cover2").remove()
					}
				} else {
					alert(res.message)
				}
			},
		})
	}
}
function apilyPay() {
	$('body').mLoading("show");
	var type = ProfileInfo.onlineStyle == "APPLE" ? 4 : 1;
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/QueryService.svc/QueryOrderPayInfo",
			jsonStr: '{"request":{"id":' + netUserId + ',"orderNo":"' + $(".onlinePayBtn").attr("orderNo") +
				'","language":"' + obtLanguage + '","payChannel":"1"}}'
		},
		success: function (data) {
			// $('body').mLoading("hide");
			var res = JSON.parse(data);
			console.log(res);
			var subject = obtLanguage == "CN" ? cn.tipsClass : en.tipsClass;
			// return false;
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/SystemService.svc/GetAopBodyNew",
					jsonStr: '{"request":{"subject":"' + subject + '","totalAmount":"' + res.payAmount + '","exMechantNO":"' +
						res.exMechantNO + '","type":"' + type + '"}}'
				},
				success: function (data) {
					// $('body').mLoading("hide");
					var res = JSON.parse(data);
					console.log(res);
					$('body').append(res);
				},
				error: function () {
					// alert('fail');
				}
			});
		},
		error: function () {
			// alert('fail');
		}
	});
}

/*文件上传*/
function uploadFile(res) {
	openUploadPop();
	$("#file").change(function (event) {
		// 获取当前选中的文件
		var file = $("#file")[0].files[0];
		// console.log(file);
		var fileSize = 0;
		var filetypes = [".xls", ".xlsx", ".xlsm", ".xlt", ".ppt", ".pptx", ".doc", ".docx", ".rtf", ".wps", ".pdf", ".jpg",
			".bmp", ".png", ".gif", ".eml", ".msg", ".txt"
		];
		var filepath = event.target.value;
		var filemaxsize = 1024 * 10; //10M
		if (filepath) {
			$(".chooseFilePath").text(filepath);
			var isnext = false;
			var fileend = filepath.substring(filepath.indexOf("."));
			if (filetypes && filetypes.length > 0) {
				for (var i = 0; i < filetypes.length; i++) {
					if (filetypes[i] == fileend) {
						isnext = true;
						break;
					}
				}
			}
			if (!isnext) {
				alert(get_lan("uploadFilePop").uploadRemind1);
				event.target.value = "";
				$(".chooseFilePath").text("");
				return false;
			}
			fileSize = $("#file")[0].files[0].size;
			var size = fileSize / 1024;
			if (size > filemaxsize) {
				alert(get_lan("uploadFilePop").uploadRemind2 + filemaxsize / 1024 + "M！");
				event.target.value = "";
				$(".chooseFilePath").text("");
				return false;
			}
		} else {
			return false;
		}
	});
	$(".sureUploadFileBtn").unbind("click").click(function () {
		if ($('#file')[0].files.length != 1) {
			alert(get_lan("uploadFilePop").uploadRemind3)
			return;
		} else {
			var formData = new FormData();
			var file_obj = $('#file')[0].files[0]
			console.log(file_obj)
			formData.append('orderNo', res.OrderNo);
			formData.append('companyID', res.OrderCustomerDetailList[0].CompanyId);
			formData.append('file', file_obj);
			formData.append('language', obtLanguage);
			$('body').mLoading("show");
			var orderRes = res;
			$.ajax({
				url: 'https://online.bcdtravel.cn/SystemAPI_PostSend/api/SystemAPI/UploadFilePost',
				type: 'POST',
				data: formData,
				processData: false, //tell jQuery not to process the data
				contentType: false, //tell jQuery not to set contentType。
				success: function (res) {
					$('body').mLoading("hide");
					console.log(res);
					if (res.isSuccess) {
						alert(get_lan("uploadFilePop").success);
						ticket(orderRes);
					} else {
						alert(res.errorMsg);
					}
				},
				error: function () {
					alert('fail');
				}
			})
		}
	})
	$(".closeUploadFileBtn").unbind("click").click(function () {
		closeUploadPop();
	})
}
// 
// 12.11日 
function CheckHotelTrip(orderRes, type) {
	// function CheckHotelTrip(){
	$('body').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/CheckHotelTripOrder",
			jsonStr: '{"orderNo":"' + orderRes.OrderNo + '","id":' + netUserId + '}'
		},
		success: function (data) {
			$('body').mLoading("hide");
			if (data == '' || ProfileInfo.onlineStyle == "APPLE") {
				// alert('没有权限')
				HotelGKBooking(orderRes, type, false);
			} else {
				var res = JSON.parse(data)
				console.log(res);
				if (res.TripType == "HOTEL") {
					// if(orderRes.Hotel.length==0){
					if (ProfileInfo.onlineStyle != "APPLE") {
						HotelGKBooking(orderRes, type, true);
					}
				} else {
					// 1.9新增
					checkRemark(orderRes, type);
				}
			}
		},
		error: function () { }
	});
};

/*HotelGKBooking*/
function HotelGKBooking(orderRes, clickType, showMore) {
	$(".GKbookingPop").html(
		'\
        <div class="GKbookingTittle"><div class="closeGKbookingIcon">x</div></div>\
        <div class="GKbookingBody"></div>\
        <div class="GKbookingFooter flexRow">\
          <div class="closeGKBookingBtn">' +
		get_lan("remarkPop").cancel + '</div>\
          <div class="sureGKBookingBtn">' + get_lan("remarkPop").confirm +
		'</div>\
        </div>\
        ')
	$('body').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/CheckNeedGKBookingHotelPost",
			jsonStr: '{"request":{"id":' + netUserId + ',"orderNo":"' + orderRes.OrderNo + '","language":"' + obtLanguage +
				'"}}'
		},
		success: function (data) {
			$('body').mLoading("hide");
			var res = JSON.parse(data);
			console.log(res);
			if (res.code == "200") {
				if (res.needShow) {
					openGKbookingPop();
					if (showMore) {
						//如果允许继续预订酒店
						$(".GKbookingBody").html(
							'\
							<div class="bookhotel">\
							    <p>' + get_lan("GKbookingPop").GKRemindText3 +
							'</p>\
							    <div class="btngroup"><div class="bookhotelBtn">' + get_lan("remarkPop").confirm2 +
							'</div></div>\
							</div>\
						<div class="GKGroup" style="">\
							<div class="GKRemindText2">' +
							get_lan("GKbookingPop").GKRemindText2 +
							'</div>\
							<select class="GKRemarkSelect"></select>\
						</div>\
						');
						$(".bookhotelBtn").unbind("click").click(function () {
							var goOnBookHotelInfo = {
								"ArriveCityCode": res.HotelCityCode,
								"ArriveCity": obtLanguage == "EN" ? res.HotelCityNameEN : res.HotelCityNameCN,
								"ArrivesDate": res.FirstArrivalTime,
								"leaveDate": res.LastDepartureTime,
								"type": !res.hasInter, //是否是国内
							}
							console.log(goOnBookHotelInfo);

							$.session.set('trainTicketChanges', '');
							$.session.set('goOnBookOrderNo', orderRes.OrderNo);
							$.session.set('goOnBookHotelInfo', JSON.stringify(goOnBookHotelInfo));
							window.location.href = '../../search/queryHotel.html';
						})
					} else {
						$(".GKbookingBody").html(
							'\
						<div class="remindIcon"></div>\
						<div class="GKRemindText">' +
							get_lan("GKbookingPop").GKRemindText2 +
							'</div>\
						<select class="GKRemarkSelect"></select>\
						');
					}

					$(".closeGKbookingIcon,.closeGKBookingBtn").unbind("click").click(function () {
						closeGKbookingPop();
					})
					res.remark.Items.map(function (item) {
						$(".GKRemarkSelect").append('\
                        <option value="' + res.remark.Index + '-' + item.Key +
							'-' + item.OperationType + '">' + item.Value + '</option>\
                    ')
					})
					$(".sureGKBookingBtn").attr("state", "chooseRemark");
					$(".sureGKBookingBtn").unbind("click").click(function () {
						if ($(this).attr("state") == "chooseRemark") {
							$(".sureGKBookingBtn").removeAttr("state");
							$(".sureGKBookingBtn").attr("remarkInfo", $(".GKRemarkSelect").val());
							var OperationType = $(this).attr("remarkInfo").split('-')[2];
							if (OperationType == 2) {
								if (!res.hasInter) {
									var GKCityId = "hotelCity";
								} else {
									var GKCityId = "hotelIntlCity";
								}
								$(".GKbookingBody").html(
									'\
                                <div class="GKbookingBodyTittle activeFontColor">' + get_lan(
										"GKbookingPop").GKbookingBodyTittle +
									'</div>\
                                <div class="GKHotelTittle">' + get_lan("GKbookingPop").city +
									'</div>\
                                <input class="GKCityInput" id="' + GKCityId +
									'" autocomplete="off">\
                                <div class="GKHotelTittle">' + get_lan(
										"GKbookingPop").hotel +
									'</div>\
                                <input class="GKHotelInput">\
                                <div class="flexRow" style="box-sizing:border-box;padding-left:100px;">\
                                  <div class="GKHotelHalfTittle">' +
									get_lan("GKbookingPop").checkIn +
									'</div>\
                                  <input class="GKCheckInInput" readonly>\
                                  <div class="GKHotelHalfTittle">' +
									get_lan("GKbookingPop").CheckOut +
									'</div>\
                                  <input class="GKCheckOutInput" readonly>\
                                </div>\
                                <div class="searchGkBtn btnBackColor">' +
									get_lan("GKbookingPop").search +
									'</div>\
                                <div class="searchGkList autoScrollY"></div>\
                            '
								);
								$("#hotelCity").kuCity();
								$("#hotelIntlCity").kuCity();

								// 国内
								$("#hotelCity").attr('code', res.HotelCityCode)
								switch (obtLanguage) {
									case 'EN':
										$("#hotelCity").val(res.HotelCityNameEN);
										break;
									case 'CN':
										$("#hotelCity").val(res.HotelCityNameCN);
										break;
									default:
										$("#hotelCity").val('')
										break;
								}
								// 国际
								$("#hotelIntlCity").attr('code', res.HotelCityCode)
								switch (obtLanguage) {
									case 'EN':
										$("#hotelIntlCity").val(res.HotelCityNameEN);
										break;
									case 'CN':
										$("#hotelIntlCity").val(res.HotelCityNameCN);
										break;
									default:
										$("#hotelIntlCity").val('')
										break;
								}
								$(".GKCheckInInput").val(res.FirstArrivalTime);
								$(".GKCheckOutInput").val(res.LastDepartureTime);
								var departureValue = new Date($(".GKCheckInInput").val().replace(/-/g, "/"));
								$(".GKCheckOutInput").datepicker('destroy');
								$(".GKCheckOutInput").datepicker({
									dateFormat: 'yy-mm-dd',
									changeMonth: true,
									changeYear: true,
									minDate: departureValue, // 当前日期之后的 0 天，就是当天
									maxDate: 365, // 当前日期之后的 0 天，就是当天
									hideIfNoPrevNext: true,
									showOtherMonths: true,
									selectOtherMonths: true,
								});
								$(".GKCheckInInput").datepicker({
									dateFormat: 'yy-mm-dd',
									changeMonth: true,
									changeYear: true,
									minDate: 0, // 当前日期之后的 0 天，就是当天
									maxDate: 365, // 当前日期之后的 0 天，就是当天
									hideIfNoPrevNext: true,
									showOtherMonths: true,
									selectOtherMonths: true,
									onSelect: function () {
										var departureValue = new Date($(".GKCheckInInput").val().replace(/-/g, "/"));
										$(".GKCheckOutInput").datepicker('destroy');
										$(".GKCheckOutInput").datepicker({
											dateFormat: 'yy-mm-dd',
											changeMonth: true,
											changeYear: true,
											minDate: departureValue, // 当前日期之后的 0 天，就是当天
											maxDate: 365, // 当前日期之后的 0 天，就是当天
											hideIfNoPrevNext: true,
											showOtherMonths: true,
											selectOtherMonths: true,
										});
										$(".GKCheckOutInput").val(getNextDay($(".GKCheckInInput").val()));
									}
								});
								//日期
								function GetDateStr(AddDayCount) {
									var dd = new Date();
									dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
									var y = dd.getFullYear();
									var m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);
									var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
									return y + "-" + m + "-" + d;
								}
								$(".searchGkBtn").unbind("click").click(function () {
									if ($(".GKCityInput").attr("code") && $(".GKHotelInput").val() != "") {
										$('body').mLoading("show");
										var queryKey = $(".GKCityInput").attr("code") + ',' + $(".GKHotelInput").val();
										$.ajax({
											type: 'post',
											url: $.session.get('ajaxUrl'),
											dataType: 'json',
											data: {
												url: $.session.get('obtCompany') + "/SystemService.svc/QueryCityLocalHotelPost",
												jsonStr: '{"id":' + netUserId + ',"language":"' + obtLanguage + '","queryKey":"' + queryKey + '"}'
											},
											success: function (data) {
												var res = JSON.parse(data);
												console.log(res);
												$('body').mLoading("hide");
												$(".searchGkList").html("");
												res.map(function (item, index) {
													var name = obtLanguage == "CN" ? item.NameCN : item.NameEN;
													$(".searchGkList").append(
														'\
                                                <div class="GKHotelLi flexRow">\
                                                  <input type="radio" name="GKHotel" id="GKHotel' +
														index + '"class="GKHotelRadio" value="' + item.HotelID +
														'">\
                                                  <label title="' + name +
														'" class="ellipsis" style="width:340px;cursor:pointer;" for="GKHotel' + index + '">' + name +
														'</label>\
                                                </div>\
                                            '
													)
												})
												$(".sureGKBookingBtn").attr("state", "hotelInfo");
											},
											error: function () {
												// alert('fail');
											}
										});
									} else {
										alert(get_lan("GKbookingPop").searchRemind);
									}
								})
							} else if (OperationType == 1) {
								if (!res.hasInter) {
									var GKCityId = "hotelCity";
								} else {
									var GKCityId = "hotelIntlCity";
								}
								$(".GKbookingBody").html(
									'\
                                <div class="GKbookingBodyTittle activeFontColor">' + get_lan(
										"GKbookingPop").GKbookingBodyTittle +
									'</div>\
                                <div class="GKHotelTittle">' + get_lan("GKbookingPop").city +
									'</div>\
                                <input class="GKCityInput" id="' + GKCityId +
									'" autocomplete="off">\
                                <div class="GKHotelTittle">' + get_lan(
										"GKbookingPop").address +
									'</div>\
                                <input class="GKAddressInput">\
                            ');
								$("#hotelCity").kuCity();
								$("#hotelIntlCity").kuCity();
								$(".sureGKBookingBtn").attr("state", "addressInfo");
							} else if (OperationType == 0 || OperationType == 3) {
								SubmitGKBooking($(this).attr("remarkInfo"), "", orderRes, clickType);
							}
						} else if ($(this).attr("state") == "hotelInfo") {
							if ($(".GKHotelRadio:checked").val()) {
								var hotelInfo = $(".GKCityInput").attr("code") + ',' + $(".GKHotelRadio:checked").val() + ',' + $(
									".GKCheckInInput").val() + ',' + $(".GKCheckOutInput").val();
								SubmitGKBooking($(this).attr("remarkInfo"), hotelInfo, orderRes, clickType);
							} else {
								alert(get_lan("GKbookingPop").searchRemind);
							}
						} else if ($(this).attr("state") == "addressInfo") {
							if ($(".GKCityInput").attr("code") && $(".GKAddressInput").val() != "") {
								var hotelInfo = $(".GKCityInput").attr("code") + ',' + $(".GKAddressInput").val();
								SubmitGKBooking($(this).attr("remarkInfo"), hotelInfo, orderRes, clickType);
							} else {
								alert(get_lan("GKbookingPop").searchRemind);
							}
						} else {
							alert(get_lan("GKbookingPop").searchRemind);
						}

						function SubmitGKBooking(remarkInfo, hotelInfo, orderRes, clickType) {
							$('body').mLoading("show");
							$.ajax({
								type: 'post',
								url: $.session.get('ajaxUrl'),
								dataType: 'json',
								data: {
									url: $.session.get('obtCompany') + "/SystemService.svc/SubmitGKBookingPost",
									jsonStr: '{"request":{"id":' + netUserId + ',"language":"' + obtLanguage + '","remarkInfo":"' +
										remarkInfo + '","hotelInfo":"' + hotelInfo + '","orderNo":"' + orderRes.OrderNo + '"}}'
								},
								success: function (data) {
									var res = JSON.parse(data);
									console.log(res);
									$('body').mLoading("hide");
									closeGKbookingPop();
									if (res.code == 200) {
										if (clickType == "file") {
											uploadFile(orderRes);
										} else if (clickType == "approval") {
											checkRemark(orderRes, 'approval');
										} else if (clickType == "pay") {
											onlinePay(orderRes);
										} else if (clickType == "ticket") {
											checkRemark(orderRes, 'ticket');
										}
									} else {
										alert(res.message);
									}
								},
								error: function () {
									// alert('fail');
								}
							});
						}
					})
				} else {

					if (clickType == "file") {
						uploadFile(orderRes);
					} else if (clickType == "approval") {
						checkRemark(orderRes, 'approval');
					} else if (clickType == "pay") {
						var s = orderDetaile.PayChannel
						if (s == 0) {
							onlinePay(orderRes);
						}
						if (s == 1) {
							var type = ProfileInfo.onlineStyle == "APPLE" ? 4 : 1;
							$.ajax({
								type: 'post',
								url: $.session.get('ajaxUrl'),
								dataType: 'json',
								data: {
									url: $.session.get('obtCompany') + "/QueryService.svc/QueryOrderPayInfo",
									jsonStr: '{"request":{"id":' + netUserId + ',"orderNo":"' + $(".onlinePayBtn").attr("orderNo") +
										'","language":"' + obtLanguage + '","payChannel":"1"}}'
								},
								success: function (data) {
									// $('body').mLoading("hide");
									var res = JSON.parse(data);
									console.log(res);
									var subject = obtLanguage == "CN" ? cn.tipsClass : en.tipsClass;
									// return false;
									$.ajax({
										type: 'post',
										url: $.session.get('ajaxUrl'),
										dataType: 'json',
										data: {
											url: $.session.get('obtCompany') + "/SystemService.svc/GetAopBodyNew",
											jsonStr: '{"request":{"subject":"' + subject + '","totalAmount":"' + res.payAmount +
												'","exMechantNO":"' +
												res.exMechantNO + '","type":"' + type + '"}}'
										},
										success: function (data) {
											// $('body').mLoading("hide");
											var res = JSON.parse(data);
											console.log(res);
											$('body').append(res);
										},
										error: function () {
											// alert('fail');
										}
									});
								},
								error: function () {
									// alert('fail');
								}
							});
						}
						if (s == 2) {
							// yeePay(orderRes);
							if (ProfileInfo.CreditCardYeepay && ProfileInfo.CloseCreditCardGateway) {
								nocardPay(orderDetaile)
							} else if (!ProfileInfo.CreditCardYeepay && !ProfileInfo.CloseCreditCardGateway) {
								yeePay(orderDetaile);
							} else {
								onlinePay(orderDetaile, "", "CreditCardPay");
							}
						}
						// onlinePay(orderRes);
					} else if (clickType == "ticket") {
						checkRemark(orderRes, 'ticket');
					}
				}
			} else {
				alert(res.message);
			}
		},
		error: function () {
			// alert('fail');
		}
	});
}
/*出票*/
function ticket(orderRes) {
	$('body').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/OrderService.svc/TicketPost",
			jsonStr: '{"orderNo":"' + orderRes.OrderNo + '","type":"M","id":' + netUserId + '}'
		},
		success: function (data) {
			var res = JSON.parse(data);
			console.log(res);
			$('body').mLoading("hide");
			alert(get_lan("orderInfo").ticketRemind);
			location.reload();
		},
		error: function () {
			// alert('fail');
		}
	});
}

function getNextDay(d) {
	d = d.replace(/-/g, "/")
	d = new Date(d);
	d = +d + 1000 * 60 * 60 * 24;
	d = new Date(d);
	var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
	var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
	//格式化
	return d.getFullYear() + "-" + month + "-" + day;
}
/*备注信息弹窗*/
function remarkInfoPop(CustomerID, employeeName, remarks, remarkType, orderRes, operationType) {
	openRemarkPop();
	if (remarkType == "invoice") {
		console.log(cn)
		cn.remarkPop.remarkInfoTittle = "请将您的账单信息补充完整：";
		en.remarkPop.remarkInfoTittle = "Please complete the billing information:";
	} else {
		cn.remarkPop.remarkInfoTittle = "账单信息：";
		en.remarkPop.remarkInfoTittle = "Billing Information:";
	}
	$(".remarkInfoTittle").text(get_lan("remarkPop").remarkInfoTittle);
	$(".businessTripBody").html('\
        <div class="businessTripLi flexRow">\
            <div class="tripLiTittle">' +
		get_lan('remarkPop').tripNameTittle + '</div>\
            <div class="employeeName">' + employeeName +
		'</div>\
        </div>\
        ')
	remark(remarks, CustomerID, orderRes);

	function remark(remarks, CustomerID, orderRes) {
		console.log(remarks)
		$(".remarkInfoBody").html('');
		var redTips = false;
		remarks.map(function (item, index) {
			var colorRed = item.Input.indexOf("4") != -1 || item.Input == "" ? "" : "colorRed";
			var starIcon = item.Input.indexOf("4") != -1 || item.Input == "" ? "" : "*";
			if (ProfileInfo.onlineStyle != "APPLE") {
				starIcon = "";
			}
			if (colorRed == "colorRed") {
				redTips = true
			}
			if (!item.CanModify) {
				$(".remarkInfoBody").append('\
                    <div id="liTittle' + item.Index +
					'" class="remarkLi flexRow">\
                      <div class="liTittle ellipsis ' + colorRed + '" title="' +
					item.Title + '">' + starIcon + item.Title + '</div>\
                      <div class="liContent" index="' +
					item.Index + '"><input id="remarkInput' + item.Index + '" CompanyID="' + ProfileInfo.companyId +
					'" class="remarkLiInput" require="' + colorRed + '" index="' + item.Index + '" value="' + item.Content +
					'" key="' + item.SubmitContent + '" disabled></div>\
                    </div>\
                ')
			} else if (item.CanModify && item.InList) {
				if (!item.ListCanSearch) {
					$(".remarkInfoBody").append(
						'\
                        <div class="remarkLi flexRow">\
                          <div id="liTittle' + item
							.Index + '" class="liTittle ellipsis ' + colorRed + '" title="' + item.Title + '">' + starIcon + item.Title +
						'</div>\
                          <div class="liContent">\
                            <select class="remarkSelect" index="' +
						index + '">\
                              <option>' + get_lan("remarkPop").Choose +
						'</option>\
                            </select>\
                            <input id="remarkInput' + item.Index +
						'" class="remarkLiInput" require="' + colorRed + '" index="' + item.Index + '" value="' + item.Content +
						'" key="' + item.SubmitContent + '" readonly placeholder="' + get_lan("remarkPop").Choose +
						'">\
                          </div>\
                        </div>\
                    ')
				} else {
					$(".remarkInfoBody").append(
						'\
                        <div class="remarkLi flexRow">\
                          <div id="liTittle' + item
							.Index + '" class="liTittle ' + colorRed + '" title="' + item.Title + '">' + starIcon + item.Title +
						'</div>\
                          <div class="liContent">\
                            <select class="remarkSelect" index="' +
						index + '">\
                              <option>' + get_lan("remarkPop").Choose +
						'</option>\
                            </select>\
                            <input class="remarkLiInput" CompanyID="' +
						ProfileInfo.companyId + '" id="remarkInput' + item.Index + '"  require="' + colorRed + '" value="' + item.Content +
						'" index="' + item.Index + '"  key="' + item.SubmitContent + '" placeholder="' + get_lan("remarkPop").search +
						'">\
                          </div>\
                        </div>\
                    ')
					$("#remarkInput" + item.Index + "").searchRemark();
				}
			} else if (item.CanModify && !item.InList) {
				$(".remarkInfoBody").append(
					'\
                    <div class="remarkLi flexRow">\
                      <div id="liTittle' + item.Index +
					'" class="liTittle ellipsis ' + colorRed + '" title="' + item.Title + '">' + starIcon + item.Title +
					'</div>\
                      <div class="liContent">\
                        <select class="remarkSelect" index="' +
					index + '">\
                          <option>' + get_lan("remarkPop").Choose +
					'</option>\
                        </select>\
                        <input id="remarkInput' + item.Index +
					'" class="remarkLiInput" require="' + colorRed + '" index="' + item.Index + '" value="' + item.Content +
					'">\
                      </div>\
                    </div>\
                ')
				// <input id="remarkInput' + item.Index +
				// '" class="remarkLiInput" require="' + colorRed + '" index="' + item.Index + '" value="' + item.Content +
				// '">
			}
		})
		// 红的提示字 是否显示
		if (!redTips && ProfileInfo.onlineStyle != "APPLE") {
			$('.colorRed').hide()
		}
		for (var i = 0; i < $(".remarkSelect").length; i++) {
			var index = parseInt($(".remarkSelect").eq(i).attr("index"));
			if (remarks[index].Items.length != 0) {
				remarks[index].Items.map(function (item) {
					var itemValue = item.Value == null || item.Value == "" ? item.Key : item.Value;
					$(".remarkSelect").eq(i).append('\
                        <option class="remarkOption" key="' + item.Key +
						'" index="' + index + '">' + itemValue + '</option>\
                        ')
				})
			} else {
				$(".remarkSelect").eq(i).hide();
			}
			$(".remarkSelect").eq(i).change(function () {
				var index = parseInt($(this).find("option:selected").attr("index"));
				$(".remarkLiInput").eq(index).val($(this).find("option:selected").text());
				$(".remarkLiInput").eq(index).attr('key', $(this).find("option:selected").attr("key"));
			})
		}
		//选择remark关联其他remark
		$(".remarkSelect").change(function () {
			// console.log($(this).find("option:selected").attr("key"));
			// console.log($(this).find("option:selected").attr("index"));
			var selectKey = $(this).find("option:selected").attr("key");
			var selectIndex = parseInt($(this).find("option:selected").attr("index"));
			remarks[selectIndex].RelatedRemarkList.map(function (rItem) {
				if (rItem.ChooseMainValue == selectKey) {
					rItem.SubRemarkRuleList.map(function (sItem) {
						$("#remarkInput" + rItem.SubRemarkIndex + "").val("");
						$("#remarkInput" + rItem.SubRemarkIndex + "").removeAttr("key");
						if (sItem.SubRemarkRule == 1) {
							// console.log(sItem)
							var colorRed = sItem.SubRemarkValue.indexOf("4") != -1 || sItem.SubRemarkValue == "" ? "" : "colorRed";
							if (colorRed == "") {
								$("#liTittle" + rItem.SubRemarkIndex + "").removeClass("colorRed");
								$("#remarkInput" + rItem.SubRemarkIndex + "").attr("require", "");
							} else if (colorRed == "colorRed") {
								$("#liTittle" + rItem.SubRemarkIndex + "").addClass("colorRed");
								$("#remarkInput" + rItem.SubRemarkIndex + "").attr("require", "colorRed");
							}
						} else if (sItem.SubRemarkRule == 2) {
							// $("#remarkInput"+rItem.SubRemarkIndex+"").val("");
							if (sItem.SubRemarkValue == "true") {
								$("#remarkInput" + rItem.SubRemarkIndex + "").attr("placeholder", get_lan("remarkPop").search);
								$("#remarkInput" + rItem.SubRemarkIndex + "").removeAttr("disabled");
								$("#remarkSelect" + rItem.SubRemarkIndex + "").show();
								$("#remarkInput" + rItem.SubRemarkIndex + "").searchRemark();
								// 12.13新增
								$("#remarkInput" + rItem.SubRemarkIndex + "").prev().removeAttr("disabled");
							} else if (sItem.SubRemarkValue == "false") {
								$("#remarkInput" + rItem.SubRemarkIndex + "").attr("placeholder", "");
								$("#remarkInput" + rItem.SubRemarkIndex + "").attr("disabled", "disabled");
								$("#remarkSelect" + rItem.SubRemarkIndex + "").hide();
								// 12.13新增
								$("#remarkInput" + rItem.SubRemarkIndex + "").prev().attr("disabled", "disabled");
							}
						}
					})
				}
			})
		})

		$(".remarkFooter").html('\
            <div class="closeRemarkBtn" style="margin-left:10%;">' + get_lan('remarkPop').cancel +
			'</div>\
            <div class="sureRemarkBtn" style="margin-left:38%;">' + get_lan('remarkPop').confirm +
			'</div>\
            ')
		// if(orderRes.ShowApproval){
		//     $(".remarkFooter").html('\
		//         <div class="closeRemarkBtn" style="margin:0 auto;">'+get_lan('remarkPop').cancel+'</div>\
		//     ')
		// }
		/*关闭remark*/
		$(".closeRemarkBtn").unbind("click").click(function () {
			closeRemarkPop();
		})
		$(".sureRemarkBtn").unbind("click").click(function () {
			var remarks = '';
			var remarkCorrect = '';
			for (var i = 0; i < $(".remarkLiInput").length; i++) {
				if ($(".remarkLiInput").eq(i).attr("require") == "colorRed") {
					if ($(".remarkLiInput").eq(i).val() == "") {
						remarkCorrect += '1';
					}
				}
				if (!$(".remarkLiInput").eq(i).attr("key")) {
					remarks += $(".remarkLiInput").eq(i).attr("index") + '-' + $(".remarkLiInput").eq(i).val().split(',').join('##') +
						',';
				}
				if ($(".remarkLiInput").eq(i).attr("key")) {
					remarks += $(".remarkLiInput").eq(i).attr("index") + '-' + $(".remarkLiInput").eq(i).attr("key").split(',').join(
						'##') + ',';
				}
			}
			if (remarkCorrect != '') {
				alert(get_lan("remarkPop").remarkRemind);
				return false;
			}
			var isCopy = false;
			$('body').mLoading("show");
			if (remarkType == "order") {
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/SystemService.svc/UpdateOrderRemark",
						jsonStr: '{"id":' + netUserId + ',"orderNo":"' + orderNo + '","customerId":"' + CustomerID +
							'","remarkStr":"' + remarks.substring(0, remarks.length - 1) + '","Language":"' + obtLanguage + '"}'
					},
					success: function (data) {
						$('body').mLoading("hide");
						var res = JSON.parse(data);
						console.log(res);
						if (res == "true") {
							alert(get_lan("remarkPop").modifySuccess);
							window.location.reload();
						} else {
							alert(res);
						}
					},
					error: function () {
						// alert('fail');
					}
				});
			} else if (remarkType == "invoice") {
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/SystemService.svc/UpdateCustomerRemarkForInvoicePost",
						jsonStr: '{"id":' + netUserId + ',"orderNo":"' + orderNo + '","customerId":"' + CustomerID + '","remarks":"' +
							remarks.substring(0, remarks.length - 1) + '","Language":"' + obtLanguage + '","isCopy":""}'
					},
					success: function (data) {
						$('body').mLoading("hide");
						var res = JSON.parse(data);
						console.log(res);
						if (res.code == 200) {
							alert(get_lan("remarkPop").modifySuccess);
							checkRemark(orderRes, operationType);
						} else {
							alert(res.message);
						}
					},
					error: function () {
						// alert('fail');
					}
				});
			}
		})
	}
}

//删除TAnumber
function deleteTAnumber() {
	var TAnumberIndex = $.session.get("TAnumberIndex")
	if (TAnumberIndex != 1) {
		$.session.remove("TAnumber")
	}
}
// 获取TAnumber
function getTAnumber(callback,type) {
	var userid = netUserId.split("\"")[1]
	$('body').mLoading("show")
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/GetTravelRequestByContinueBookPost",
			jsonStr: '{"orderNo":"' + orderNo + '","id":"' + userid + '","language":"' + obtLanguage + '"}'
		},
		success: function (data) {
			$('body').mLoading("hide")
			if(type=='start'){
				var res = JSON.parse(data)
				if (res.code == "200"&&res.data!="") {
					callback();
				}
			}else{
				if (data == '' || data == null) {
					// alert('没有权限')
					// HotelGKBooking(orderRes,type,false);
				} else {
					var res = JSON.parse(data)
					if (res.code == "200") {
						$.session.set("TAnumber", res.data)
					}
				}
				callback();
				// 这里获取到TAnumber按照原流程进行
				//如果有审批单权限，但是没有返回审批单号，给出提示不能继续预定
				if (ProfileInfo.HotelNoNeedTR && !res.data) {
					var continueRemind = obtLanguage == "CN" ? "该订单无法继续预订" : "The order cannot continue book"
					alert(continueRemind)
					$('body').mLoading("hide")
				} else {
					callback()
				}
			}
		}
	})
}
//继续预订
function goOnBook(orderRes) {
	$(".GoOnBookPop").html(
		'\
        <div class="GoOnBookTittle"><div class="closeGoOnBookIcon">x</div></div>\
        <div>\
          <div class="finishRemind hide"><span style="font-size:18px;color:#2577e3;margin-right:30px;">' +
		get_lan('finishRemind2left') + '</span>' + get_lan('finishRemind2') +
		'</div>\
          <div class="finishLi hide">\
            <div class="finishLiImg approveImg" name="approve"></div>\
            <div class="finishLiText">' +
		get_lan('orderInfo').approval +
		'</div>\
            <div class="finishLiLine"></div>\
          </div>\
          <div class="bookRemind">' +
		get_lan('clickRemind') +
		'▼</div>\
          <div class="flexRow continueUl">\
              <div class="continueLi airIconLi">\
                <div class="continueLiImg airImg" name="air"></div>\
                <div class="continueLiText">' +
		get_lan('continueUl').air +
		'</div>\
              </div>\
              <div class="continueLi hotelIconLi">\
                <div class="continueLiImg hotelImg" id="indexHotelTab" name="hotel"></div>\
                <div class="continueLiText">' +
		get_lan('continueUl').hotel +
		'</div>\
              </div>\
              <div class="continueLi trainIconLi">\
                <div class="continueLiImg trainImg" name="train"></div>\
                <div class="continueLiText">' +
		get_lan('continueUl').train + '</div>\
              </div>\
          </div>\
        </div>\
        ')
	if (ProfileInfo.onlineStyle == "APPLE") {
		$(".airImg").css("background-image", 'url(../../bookFinished/images/appleAir.png)');
		$(".hotelImg").css("background-image", 'url(../../bookFinished/images/appleHotel.png)');
		$(".trainImg").css("background-image", 'url(../../bookFinished/images/appleRail.png)');
	}
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/ProfilePost",
			jsonStr: '{"key":' + netUserId + '}'
		},
		success: function (data) {
			var res = JSON.parse(data);
			console.log(res);
			reasonNecessary = res.NoApprovalReason
			$(".onlinePayBtn").attr("phone", res.Phone);
			if (!res.isDomesticAir && !res.isInterAir) {
				$(".airIconLi ").remove();
			}
			if (!res.isHotel) {
				$(".hotelIconLi").remove();
			}
			if (!res.isTrain) {
				$(".trainIconLi").remove();
			}
			if (res.ApproveAutoIssue) {
				if (orderDetaile.ShowPaymentByApprovedA) {
					$(".ticketOption").html(get_lan("autoIssueRemind2"));
				} else {
					$(".ticketOption").html(get_lan("autoIssueRemind"));
				}
				$(".ticketOption").css("color", "red");
			}
			if (res.IsTicket == 1) {
				$(".approveReason").eq(0).prop("checked", true);
				$(".approveReason").eq(1).removeAttr("checked");
			}
			// $(".continueLi").css("width",(600/parseInt($(".continueLi").length))+"px");
			// $(".continueLiText").css("width",(600/parseInt($(".continueLi").length)-100)+"px");
			// $(".continueLiImg").css("margin","15px "+(300/parseInt($(".continueLi").length)-85)+"px");

			// 12.11日添加
			// if(res.HotelGKBooking==true){
			// 	CheckHotelTrip()
			// }
		},
		error: function () {
			// alert('fail');
		}
	});

	$(".goOnBookBtn").unbind("click").click(function () {
		openGoOnBookPop();
		$(".closeGoOnBookIcon").unbind("click").click(function () {
			closeGoOnBookPop();
		})
		$(".continueLiImg").unbind("click").click(function () {
			$.session.set('trainTicketChanges', '');
			$.session.set('goOnBookOrderNo', orderRes.OrderNo);
			// 如果有TA单号,需要GetTravelRequestCityInfo接口获取行程

			if ($(this).attr("name") == "air") {
				getTAnumber(function () {
					if ($.session.get('TAnumber')) {
						getTAtime("../../search/queryAir.html", 1)
						// GetTravelRequestCityInfo由getTAtime方法执行
					} else {
						window.location.href = '../../search/queryAir.html';
					}
				})
			} else if ($(this).attr("name") == "hotel") {
				if (ProfileInfo.HotelJumpHRS) {
					window.open(ProfileInfo.HotelJumpHRS_Url);
					var orderno = orderRes.OrderNo.split("\"")[0]
					var userid = netUserId.split("\"")[1]
					console.log(netUserId.split("\""))
					// jsonStr:'{"orderNo":"'+orderno+'","id":"'+userid+'","hotelType":"2"}'
					$.ajax({
						type: 'post',
						url: $.session.get('ajaxUrl'),
						dataType: 'json',
						data: {
							url: $.session.get('obtCompany') + "/SystemService.svc/CheckHotelTripOrderNew",
							jsonStr: '{"request":{"orderNo":' + orderno + ',"id":"' + userid + '","hotelType":"2"}}'
						},
						success: function (data) {
							$('body').mLoading("hide");
							if (data == '') {
								// alert('没有权限')
								getTAnumber(function () {
									if ($.session.get('TAnumber')) {
										$.session.set('goOnBookHotelInfo', "");
										getTAtime("../../search/queryHotel.html", 2)
									} else {
										window.location.href = '../../search/queryHotel.html';
									}
								})
								// HotelGKBooking(orderRes,type,false);
							} else {
								var res = JSON.parse(data);
								var hotelType = true
								if (res.HotelCityType == "D") {
									hotelType = true
								} else {
									hotelType = false
								}
								var goOnBookHotelInfo = {
									"ArriveCityCode": res.HotelCityCode,
									"ArriveCity": obtLanguage == "EN" ? res.HotelCityNameEN : res.HotelCityNameCN,
									"ArrivesDate": res.TripStartTimeCN,
									"leaveDate": res.TripEndTimeCN,
									"type": hotelType, //是否是国内
								}
								console.log(goOnBookHotelInfo);
								$.session.set('trainTicketChanges', '');
								$.session.set('goOnBookHotelInfo', JSON.stringify(goOnBookHotelInfo));

								getTAnumber(function () {
									if ($.session.get('TAnumber')) {
										$.session.set('goOnBookHotelInfo', "");
										getTAtime("../../search/queryHotel.html", 2)
									} else {
										window.location.href = '../../search/queryHotel.html';
									}
								})


							}
						},
					})
				} else {
					// 检查是否需要预订酒店
					var orderno = orderRes.OrderNo.split("\"")[0]
					var userid = netUserId.split("\"")[1]
					console.log(netUserId.split("\""))
					// jsonStr:'{"orderNo":"'+orderno+'","id":"'+userid+'","hotelType":"2"}'
					$.ajax({
						type: 'post',
						url: $.session.get('ajaxUrl'),
						dataType: 'json',
						data: {
							url: $.session.get('obtCompany') + "/SystemService.svc/CheckHotelTripOrderNew",
							jsonStr: '{"request":{"orderNo":' + orderno + ',"id":"' + userid + '","hotelType":"2"}}'
						},

						success: function (data) {
							$('body').mLoading("hide");

							if (data == '') {
								// alert('没有权限')
								getTAnumber(function () {
									if ($.session.get('TAnumber')) {
										$.session.set('goOnBookHotelInfo', "");
										getTAtime("../../search/queryHotel.html", 2)
									} else {
										window.location.href = '../../search/queryHotel.html';
									}
								})

								// HotelGKBooking(orderRes,type,false);
							} else {
								var res = JSON.parse(data);
								var hotelType = true
								if (res.HotelCityType == "D") {
									hotelType = true
								} else {
									hotelType = false
								}
								var goOnBookHotelInfo = {
									"ArriveCityCode": res.HotelCityCode,
									"ArriveCity": obtLanguage == "EN" ? res.HotelCityNameEN : res.HotelCityNameCN,
									"ArrivesDate": res.TripStartTimeCN,
									"leaveDate": res.TripEndTimeCN,
									"type": hotelType, //是否是国内
								}
								console.log(goOnBookHotelInfo);
								$.session.set('trainTicketChanges', '');
								$.session.set('goOnBookHotelInfo', JSON.stringify(goOnBookHotelInfo));
								getTAnumber(function () {
									if ($.session.get('TAnumber')) {
										getTAtime("../../search/queryHotel.html", 2)
										$.session.set('goOnBookHotelInfo', "");
									} else {
										window.location.href = '../../search/queryHotel.html';
									}
								})
							}
						},
					})

					// if (orderRes.Segment.length > 0 && compareDate(orderRes.Segment[0][0].ArrivesDate)) {
					// 	var goOnBookHotelInfo = {
					// 		"ArriveCityCode": orderRes.Segment[0][0].ArriveCityCode,
					// 		"ArriveCity": orderRes.Segment[0][0].ArriveCity,
					// 		"ArrivesDate": orderRes.Segment[0][0].ArrivesDate,
					// 		"type": orderRes.Segment[0][0].IsDomestic,
					// 	}
					// 	console.log(goOnBookHotelInfo);
					// 	$.session.set('goOnBookHotelInfo', JSON.stringify(goOnBookHotelInfo));
					// 	window.location.href = '../../search/queryHotel.html';
					// } else {
					// 	window.location.href = '../../search/queryHotel.html';
					// }
				}
			} else if ($(this).attr("name") == "train") {
				getTAnumber(function () {
					if ($.session.get('TAnumber')) {
						getTAtime("../../search/queryTrain.html", 4)
					} else {
						window.location.href = '../../search/queryTrain.html';
					}
				})
				// window.location.href = '../../search/queryTrain.html';
			}
		})
		// 2020.11.26 酒店跳转
		if(ProfileInfo.HotelJumpHRSWeb){
			$('#indexHotelTab').unbind("click").click(function(){
				window.open(ProfileInfo.HRSWebsite);
			})
		}
	})
	// 判断
	function getTAtime(url, searchType) {
		// 0.全部 1.机票 2.酒店 3.租车 4.火车
		var userid = netUserId.split("\"")[1]
		console.log(netUserId.split("\""))
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/SystemService.svc/GetTravelRequestCityInfo",
				jsonStr: '{"travelRequestNo":"' + $.session.get('TAnumber') + '","key":"' + userid + '","count":""}'
			},
			success: function (data) {
				$('body').mLoading("hide");
				if (data == '') {
					// alert('没有权限')
					$.session.set('goOnBookHotelInfo', '')
					window.location.href = url;
					// HotelGKBooking(orderRes,type,false);
				} else {
					var res = JSON.parse(data);
					console.log(res);
					$.session.remove('TAOneCity')
					if(res.length>1){
						var newRes = []
						for (var i = 0; i < res.length - 1; i = i + 2) {
							var a = []
							a.push(res[i])
							a.push(res[i + 1])
							newRes.push(a)
						}
						console.log(newRes);
						var domAirFlag = false, intlAirFlag = false;
						var airFlag = false, hotelFlag = false, trainFlag = false;
						newRes.map(function (item) {
							setDefaultCity(item)
						})

						if (!hotelFlag && searchType == 2) {
							var hoteltips = obtLanguage == "CN" ? "该审批单无法预订酒店" : "The travel request cannot book hotel";
							alert(hoteltips)
						}

						function setDefaultCity(res) {
							var travelObj = {
								"ArriveCityCode": '',
								"ArriveCityEN": '',
								"ArriveCityCN": '',
								"leaveCityCode": '',
								"leaveCityEN": '',
								"leaveCityCN": '',
								"type": true,
								"starTime": '',
								"endTime": '',
							}
							var arriveType = true
							var leaveType = true
							// res type  0出发 1到达  res[0]和res[1] 一组 res[2]和res[3] 一组，但是一般只需要第一组就行
							// serviceType 0.全部 1.机票 2.酒店 3.租车 4.火车
							res.map(function (item) {
								if (item.type == 0 || item.type == "0") {
									travelObj.ArriveCityCode = item.Code
									travelObj.ArriveCityCN = item.NameCN
									travelObj.ArriveCityEN = item.NameEN
									if (item.CountryId != 46 && item.CountryId != "46") {
										arriveType = false
									}
									travelObj.starTime = item.StartTime
								}
								if (item.type == 1 || item.type == "1") {
									travelObj.leaveCityCode = item.Code
									travelObj.leaveCityCN = item.NameCN
									travelObj.leaveCityEN = item.NameEN
									if (item.CountryId != 46 && item.CountryId != "46") {
										leaveType = false
									}
									travelObj.endTime = item.EndTime
								}
							})
							if (!arriveType || !leaveType) {
								travelObj.type = false
							}
							// serviceType 0.全部 1.机票 2.酒店 3.租车 4.火车
							var serviceType = res.length > 0 ? res[0].serviceType : ""
							if (!airFlag && (serviceType == 0 || serviceType == 1) && searchType == 1) {
								airFlag = true;
								$.session.set('goOnBooktravelInfo', JSON.stringify(travelObj));
								window.location.href = url;
							}
							if (!hotelFlag && (serviceType == 0 || serviceType == 2) && searchType == 2) {
								hotelFlag = true;
								$.session.set('goOnBooktravelInfo', JSON.stringify(travelObj));
								window.location.href = url;
							}
							if (!trainFlag && (serviceType == 0 || serviceType == 4) && searchType == 4) {
								trainFlag = true;
								$.session.set('goOnBooktravelInfo', JSON.stringify(travelObj));
								window.location.href = url;
							}
						}
					}else{
						$.session.set('TAOneCity', '1');
						$.session.set('goOnBookHotelInfo', '')
						window.location.href = url;
					}
				}
			},
		})
	}

	/*预订完成后*/
	if (bookState == "finish") {
		if (orderRes.ShowGoOnBook) {
			$(".goOnBookBtn").click();
		}
		if ($.session.get('TAnumber')) {

		} else {
			if (orderRes.ShowPayment && !orderRes.Offline_Pay && !orderRes.ShowApproval) {
				$(".closeGoOnBookIcon").remove();
			}
		}


		$(".finishRemind").css("color", "#999");
		$(".bookRemind").css("color", "#5ba2ff");
		$(".bookRemind").css("font-size", "16px");
		$(".finishRemind,.bookRemind").css("text-align", "left");
		$(".finishRemind,.bookRemind").css("padding-left", "35px");
		$(".finishRemind,.bookRemind").css("margin-top", "10px");
		// $(".GoOnBookPop").css("height","460px");//11月11日修改，去掉固定高度
		$(".finishRemind").removeClass("hide");
		$(".finishLi").removeClass("hide");
		if (orderRes.UploadFileApprove && orderRes.ShowApproval && orderRes.FileUploadTime == null) {
			$(".finishLiImg").removeClass("approveImg").addClass("uploadFileImg");
			$(".finishLiText").text(get_lan('orderInfo').uploadFile);
		}
		if (orderRes.ShowPayment && !orderRes.Offline_Pay && !orderRes.ShowApproval) {
			$(".finishRemind").html('<span style="font-size:18px;color:#2577e3;margin-right:30px;">' + get_lan(
				'finishRemind1left') + '</span>' + get_lan('finishRemind1') + '');
			$(".finishLiImg").removeClass("approveImg").addClass("payImg");
			$(".finishLiText").text(get_lan('orderInfo').onlinePay);
		}
		if (orderRes.ShowTicket && !orderRes.ShowApproval && !orderRes.ShowPayment) {
			$(".finishRemind").html('<span style="font-size:18px;color:#2577e3;margin-right:30px;">' + get_lan(
				'finishRemind3left') + '</span>' + get_lan('finishRemind3') + '');
			$(".finishLiImg").removeClass("approveImg").addClass("ticketImg");
			$(".finishLiText").text(get_lan('orderInfo').ticket);
		}
		if (!orderRes.ShowTicket && !orderRes.ShowApproval && !orderRes.ShowPayment) {
			$(".finishRemind").addClass("hide");
			$(".finishLi").addClass("hide");
			$(".GoOnBookPop").css("width", "600px");
		}
	}
	/*TA单*/
	// if ($.session.get('TAnumber') && searchOrderInfo.TAnumber) {
	if ($.session.get('TAnumber')) {
		$(".goOnBookBtn").click();
		// $(".orderInfoTittle").append("<span style='margin-left:30px;'>TA No:" + $.session.get('TAnumber') + "</span>");
		// 有TA单号显示继续预定按钮
		if ($.session.set('TAnumberIndex') == 1) {
			$(".menu").css("height", "40px");
			$(".menu").html("<p>" + get_lan('approveBumber') + $.session.get('TAnumber') + "</p>");
			$(".menu p").css({
				'color': '#fff',
				'height': '40px',
				'line-height': '40px',
				'width': '1200px',
				'padding-left': '27px',
				'margin': '0 auto',
				'box-sizing': 'border-box'
			})
			$(".menusLi").remove();
		}
		$('.goOnBookBtn').removeClass('hide')

	}

	function compareDate(date1) {
		var oDate1 = new Date(date1);
		var oDate2 = new Date();
		if (oDate1.getTime() > oDate2.getTime()) {
			return true;
		} else {
			return false;
		}
	}
}

function checkRemark(orderRes, operationType) {
	$('body').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/CheckCustomerRemarkForInvoicePost",
			jsonStr: '{"id":' + netUserId + ',"orderNo":"' + orderRes.OrderNo + '","language":"' + obtLanguage + '"}'
		},

		success: function (data) {
			$('body').mLoading("hide");
			var res = JSON.parse(data);
			console.log(res);
			if (res.code == "200") {
				if (res.needShowRemark) {
					var customerId = res.customerRemarkList[0].customerId;
					var employeeName = res.customerRemarkList[0].customerName;
					remarkInfoPop(customerId, employeeName, res.customerRemarkList[0].remarkList, 'invoice', orderRes,
						operationType);
				} else {
					closeRemarkPop();
					if (operationType == "approval") {
						submitApproval(orderRes, operationType);
					} else if (operationType == "ticket") {
						ticket(orderRes);
					} else if (operationType == "pay") {
						// 1.9新增,如果"pay",弹出选择支付方式的弹窗
						paymentMethod()
					}
				}
			}
		},
		error: function () {
			// alert('fail');
		}
	});
}
//提交审核
function submitApproval(orderRes, operationType) {
	// if(orderRes.ShowPayment&&!orderRes.Offline_Pay){
	//     $(".onlinePayBtn").click();
	// }else{
	//     approvalInfoPop(orderRes);
	// }

	approvalInfoPop(orderRes, operationType);

	// $('body').mLoading("show");
	// $.ajax(
	//   {
	//     type:'post',
	//     url : $.session.get('ajaxUrl'), 
	//     dataType : 'json',
	//     data:{
	//         url: $.session.get('obtCompany')+"/OrderService.svc/GetApprovalInfoPost",
	//         jsonStr:'{"id":'+netUserId+',"orderNo":"'+orderRes.OrderNo+'","maxLevel":"'+orderRes.ApprovalLevel+'"}'
	//     },
	//     success : function(data) {
	//         $('body').mLoading("hide");
	//         var res = JSON.parse(data);
	//         console.log(res);
	//         openApprovalPop();
	//         $(".selectBody").html('');
	//         if(!orderRes.MoreApproversSubmit){
	//             res.Approvers.map(function(item,index){
	//                 $(".selectBody").append('\
	//                     <div class="flexRow" style="margin-top:5px;">\
	//                       <div class="popLiTittle">'+get_lan("approvalPop").Approver1+(index+1)+' '+get_lan("approvalPop").Approver2+'</div>\
	//                       <select class="ApproverSelect">\
	//                         \
	//                       </select>\
	//                     </div>\
	//                     ')
	//                 if(item.Value.length>1){
	//                     $(".ApproverSelect").eq(index).html('\
	//                         <option value="">'+get_lan("remarkPop").Choose+'</option>\
	//                         ')
	//                 }
	//                 item.Value.map(function(vItem){
	//                     var name = obtLanguage=="CN"?vItem.NameCN:vItem.NameEN
	//                     $(".ApproverSelect").eq(index).append('\
	//                         <option value="'+vItem.CustomerId+'">'+name+'</option>\
	//                     ')
	//                 })
	//             })
	//         }else{
	//             res.Approvers.map(function(item,index){
	//                 $(".selectBody").append('\
	//                     <div class="flexRow" style="margin-top:5px;">\
	//                       <div class="popLiTittle">'+get_lan("approvalPop").Approver1+(index+1)+' '+get_lan("approvalPop").Approver2+'</div>\
	//                       <div class="ApproverSelectBody">\
	//                         \
	//                       </div>\
	//                     </div>\
	//                     ')
	//                 if(item.Value.length>2){
	//                     $(".ApproverSelectBody").eq(index).addClass("autoScrollY");
	//                 }
	//                 item.Value.map(function(vItem){
	//                     var name = obtLanguage=="CN"?vItem.NameCN:vItem.NameEN
	//                     $(".ApproverSelectBody").eq(index).append('\
	//                         <div class="ApproverSelectLi" value="'+(index+1)+'-'+vItem.CustomerId+'">'+name+'</div>\
	//                     ')
	//                 })
	//             })
	//         }

	//         /*弹窗高度*/
	//         var popHeight = $(".approvalPop").height()%2==1?$(".approvalPop").height()+1:$(".approvalPop").height();
	//         $(".approvalPop").css("height",popHeight+'px');

	//         $(".closeApprovalBtn").unbind("click").click(function(){
	//             closeApprovalPop();
	//         })
	//         if(orderRes.ApproveWithoutChoose){
	//             $(".approveReason").removeAttr("checked");
	//         }
	//         $(".sureApprovalBtn").unbind("click").click(function(){
	//             if($(".commentsBody").val()==""){
	//                 alert(get_lan("approvalPop").ApproveRemind);
	//             }else{
	//                 if($(".approveReason").eq(0).prop("checked")||$(".approveReason").length==0){
	//                     var isTicket = '1';
	//                 }else if($(".approveReason").eq(1).prop("checked")){
	//                     var isTicket = '0';
	//                 }else{
	//                     alert(get_lan("approvalRemind"));
	//                     return false;
	//                 }
	//                 if(!orderRes.MoreApproversSubmit){
	//                     var approvers = '';
	//                     for(var i=0;i<$(".ApproverSelect").length;i++){
	//                         if($('.ApproverSelect option:selected').eq(i).val()!=""){
	//                             approvers += (i+1)+'-'+$('.ApproverSelect option:selected').eq(i).val();
	//                             approvers += ',';
	//                         }else{
	//                             alert(get_lan("approvalPop").ApproveRemind);
	//                             return false;
	//                         }
	//                     }
	//                     approvers = approvers.substring(0,approvers.length-1);
	//                 }else{
	//                     var approvers = '';
	//                     for(var i=0;i<$(".ApproverSelectLi").length;i++){
	//                         approvers += $('.ApproverSelectLi').eq(i).attr("value");
	//                         approvers += ',';
	//                     }
	//                     approvers = approvers.substring(0,approvers.length-1);
	//                     console.log(approvers);
	//                 }

	//                 var key = res.ApplicationNO+','+orderRes.OrderNo+','+orderRes.ApprovalLevel;
	//                 $('body').mLoading("show");
	//                 $.ajax(
	//                   {
	//                     type:'post',
	//                     url : $.session.get('ajaxUrl'),
	//                     dataType : 'json',
	//                     data:{
	//                         url: $.session.get('obtCompany')+"/OrderService.svc/ApprovalSubmitNew",
	//                         jsonStr:'{"id":'+netUserId+',"reasonContent":"'+$(".commentsBody").val().replace(/\n/g, " ").replace(/\s/g, " ")+'","approvers":"'+approvers+'","key":"'+key+'","remarkKey":"no","isTicket":"'+isTicket+'","language":"'+obtLanguage+'"}'
	//                     },
	//                     success : function(data) {
	//                         $('body').mLoading("hide");
	//                         var res = JSON.parse(data);
	//                         console.log(res);
	//                         if(res=="SUCCESS"){
	//                             alert(get_lan("approvalPop").success)
	//                             location.reload();
	//                         }
	//                     },
	//                     error : function() {
	//                       // alert('fail');
	//                     }
	//                   }
	//                 );
	//             }
	//         })
	//     },
	//     error : function() {
	//       // alert('fail');
	//     }
	//   }
	// );
}

function approvalInfoPop(orderRes, operationType) {
	$('body').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/OrderService.svc/GetApprovalInfoPost",
			jsonStr: '{"id":' + netUserId + ',"orderNo":"' + orderRes.OrderNo + '","maxLevel":"' + orderRes.ApprovalLevel +
				'"}'
		},
		success: function (data) {
			$('body').mLoading("hide");
			var res = JSON.parse(data);
			console.log(res);
			openApprovalPop();
			$(".selectBody").html('');

			if (!orderRes.MoreApproversSubmit) {
				res.Approvers.map(function (item, index) {
					$(".selectBody").append(
						'\
                        <div class="flexRow" style="margin-top:5px;">\
                          <div class="popLiTittle">' +
						get_lan("approvalPop").Approver1 + (index + 1) + ' ' + get_lan("approvalPop").Approver2 +
						'</div>\
                          <select class="ApproverSelect">\
                            \
                          </select>\
                        </div>\
                        '
					)
					if (item.Value.length > 1) {
						$(".ApproverSelect").eq(index).html('\
                            <option value="">' + get_lan("remarkPop")
								.Choose + '</option>\
                            ')
					}
					item.Value.map(function (vItem) {
						var name = obtLanguage == "CN" ? vItem.NameCN : vItem.NameEN
						$(".ApproverSelect").eq(index).append('\
                            <option value="' + vItem.CustomerId +
							'">' + name + '</option>\
                        ')
					})
				})
			} else {
				res.Approvers.map(function (item, index) {
					$(".selectBody").append(
						'\
                        <div class="flexRow" style="margin-top:5px;">\
                          <div class="popLiTittle">' +
						get_lan("approvalPop").Approver1 + (index + 1) + ' ' + get_lan("approvalPop").Approver2 +
						'</div>\
                          <div class="ApproverSelectBody">\
                            \
                          </div>\
                        </div>\
                        '
					)
					if (item.Value.length > 2) {
						$(".ApproverSelectBody").eq(index).addClass("autoScrollY");
					}
					item.Value.map(function (vItem) {
						var name = obtLanguage == "CN" ? vItem.NameCN : vItem.NameEN
						$(".ApproverSelectBody").eq(index).append(
							'\
                            <div class="ApproverSelectLi" value="' + (index + 1) + '-' + vItem.CustomerId +
							'">' + name + '</div>\
                        ')
					})
				})
			}
			// 11.28审核人少于审核等级时
			// if(orderRes.ApprovalLevel>res.Approvers.length){
			// 	for(let i=res.Approvers.length;i<orderRes.ApprovalLevel;i++){
			// 		$(".selectBody").append(
			// 			'\
			// 		    <div class="flexRow" style="margin-top:5px;">\
			// 		      <div class="popLiTittle">' +
			// 			get_lan("approvalPop").Approver1 + (i + 1) + ' ' + get_lan("approvalPop").Approver2 +
			// 			'</div>\
			// 		    </div>\
			// 		    '
			// 		)
			// 	}
			// }
			/*弹窗高度*/
			var popHeight = $(".approvalPop").height() % 2 == 1 ? $(".approvalPop").height() + 1 : $(".approvalPop").height();
			$(".approvalPop").css("height", popHeight + 'px');

			$(".closeApprovalBtn").unbind("click").click(function () {
				closeApprovalPop();
			})
			if (orderRes.ApproveWithoutChoose) {
				$(".approveReason").removeAttr("checked");
			}
			$(".sureApprovalBtn").unbind("click").click(function () {
				// 11.28添加提交失败
				// if(orderRes.ApprovalLevel!=res.Approvers.length){
				// 	alert(get_lan("approvalPop").ApproveRemind2);
				// 	return false;
				// }
				if ($(".commentsBody").val() == "" && (reasonNecessary == false || reasonNecessary == "false")) {
					alert(get_lan("approvalPop").ApproveRemind);
				} else {
					// CTL需求
					// if ($(".approveReason").eq(0).prop("checked") || $(".approveReason").length == 0) {
					if ($(".approveReason").eq(0).prop("checked") || $(".approveReason").length == 0) {
						var isTicket = '1';
					} else if ($(".approveReason").eq(1).prop("checked")) {
						var isTicket = '0';
					} else {
						alert(get_lan("approvalRemind"));
						return false;
					}
					if (!orderRes.MoreApproversSubmit) {
						var approvers = '';
						for (var i = 0; i < $(".ApproverSelect").length; i++) {
							if ($('.ApproverSelect option:selected').eq(i).val() != "") {
								approvers += (i + 1) + '-' + $('.ApproverSelect option:selected').eq(i).val();
								approvers += ',';
							} else {
								alert(get_lan("approvalPop").ApproveRemind);
								return false;
							}
						}
						approvers = approvers.substring(0, approvers.length - 1);
					} else {
						var approvers = '';
						for (var i = 0; i < $(".ApproverSelectLi").length; i++) {
							approvers += $('.ApproverSelectLi').eq(i).attr("value");
							approvers += ',';
						}
						approvers = approvers.substring(0, approvers.length - 1);
						console.log(approvers);
					}

					var key = res.ApplicationNO + ',' + orderRes.OrderNo + ',' + orderRes.ApprovalLevel;
					$('body').mLoading("show");

					$.ajax({
						type: 'post',
						url: $.session.get('ajaxUrl'),
						dataType: 'json',
						data: {
							url: $.session.get('obtCompany') + "/OrderService.svc/ApprovalSubmitNew",
							jsonStr: '{"id":' + netUserId + ',"reasonContent":"' + $(".commentsBody").val().replace(/\n/g, " ").replace(
								/\s/g, " ") + '","approvers":"' + approvers + '","key":"' + key + '","remarkKey":"no","isTicket":"' +
								isTicket + '","language":"' + obtLanguage + '"}'
						},
						success: function (data) {
							$('body').mLoading("hide");
							var res = JSON.parse(data);
							console.log(res);
							if (res == "SUCCESS") {
								closeApprovalPop();
								alert(get_lan("approvalPop").success)
								// location.reload();
								// 11月11日修改，不刷新页面，弹出支付页面，为保险起见继续检测一下GKBooking
								// 12月17日修改，ShowPaymentByApprovedA为true时不显示支付弹框
								// 2020.1.7修改，ProfileInfo.Offline_Pay为true时 走线下支付

								if (ProfileInfo.Offline_Pay) {
									window.location.reload()
								} else {
									if (en.tipsClass != '' && !orderDetaile.ShowPaymentByApprovedA) {
										onlinePay(orderRes, operationType);
									} else {
										window.location.reload()
									}
								}


								// if(en.tipsClass != ''&& !orderDetaile.ShowPaymentByApprovedA) {
								// 	onlinePay(orderRes, operationType);
								// } else {
								// 	window.location.reload()
								// }
							}
						},
						error: function () {
							// alert('fail');
						}
					});
				}
			})
		},
		error: function () {
			// alert('fail');
		}
	});
}
/*隐藏证件信息*/
function hideDocument(profile, document, rid) {
	if (profile.HideMyPersonalInfo && document != "") {
		if (rid == 1 && document.length > 10) {
			var starLength = document.length - 10;
			var starString = "";
			for (var i = 0; i < starLength; i++) {
				starString += "*";
			}
			var DocumentNumber = document.substring(0, 6) + starString + document.substring(document.length - 4, document.length);
		} else if (document.length > 3) {
			var starLength = document.length - 3;
			var starString = "";
			for (var i = 0; i < starLength; i++) {
				starString += "*";
			}
			var DocumentNumber = document.substring(0, 1) + starString + document.substring(document.length - 2, document.length);
		} else {
			var DocumentNumber = document;
		}
	} else {
		var DocumentNumber = document
	}

	return DocumentNumber;
}
/*end*/
/*隐藏邮箱*/
function hideEmail(profile, email) {
	if (profile.HideMyPersonalInfo && email != "") {
		var starLength = email.split("@")[0].length;
		var starString = "";
		for (var i = 0; i < starLength - 2; i++) {
			starString += "*"
		}
		var profileEmail = email.substring(0, 1) + starString + email.substring(starLength - 1, starLength) + '@' + email.split("@")[1];
	} else {
		var profileEmail = email;
	}
	return profileEmail;
}
/*end*/
//机票
function segmentList(res) {
	var orderInfo = res;
	console.log(orderInfo)
	res.Segment.map(function (sitem, index) {
		var showTicketDate = sitem[0].TicketDate != '' ? "" : "hide";
		var passengerString = '';
		var showAirlineReference = sitem[0].AirlineReference != '' ? "" : "hide";
		for (var i = 0; i < sitem[0].Passengers.length; i++) {
			passengerString += sitem[0].Passengers[i].PassengerName;
			passengerString += ' ';
		}
		var ServiceFee = sitem[0].ServiceFee == "0CNY" ? "" : '\n' + get_lan("orderDetails").serviceFare + sitem[0].ServiceFee;
		var fareAmountDetail = get_lan("orderDetails").nominalFare + sitem[0].NominalFare + '\n' + get_lan("orderDetails").tax +
			sitem[0].TaxFee + ServiceFee;


		$(".segmentList").append(
			'\
			<div class="segmentLi">\
			  <div class="segmentLiTittle flexWrap">\
                <div style="margin-left:27px;">' +
			passengerString + '</div>\
                <div style="margin-left:30px;">' + get_lan('orderCustomerInfo').popDocuments +
			hideDocument(ProfileInfo, sitem[0].Passengers[0].DocumentNo, sitem[0].Passengers[0].DocumentType) + '</div>\
			    <div style="margin-left:27px;">' + sitem[0].DeparteDate +
			'</div>\
			    <div style="margin-left:30px;">' + get_lan('orderDetails').orderState +
			'<span class="activeFontColor">' + sitem[0].StateDes +
			'</span></div>\
                <div style="margin-left:30px;">' + get_lan('orderDetails').price +
			'<span class="activeFontColor" title="' + fareAmountDetail + '">' + sitem[0].AirFareAmount +
			'</span></div>\
                <div style="margin-left:30px;" class="' + showTicketDate + '">' + get_lan(
				'orderDetails').TicketDate + '<span class="keypoint">' + sitem[0].TicketDate +
			'</span></div>\
                <div style="margin-left:30px;width:200px;" class="' + showAirlineReference +
			' ellipsis">' + get_lan('orderDetails').AirlineReference + '<span class="keypoint" title="' + sitem[0].AirlineReference +
			'">' + sitem[0].AirlineReference +
			'</span></div>\
			  </div>\
			  <div class="segmentLiBody flexRow">\
			     <div class="segmentDetailsList"></div>\
			     <div class="segmentBtnList"></div>\
			  </div>\
			</div>\
	    '
		)
		//<div style="margin-left:30px;">'+sitem[0].DeparteCity+' - '+sitem[0].ArriveCity+'</div>
		sitem.map(function (item) {
			var showBtn1 = sitem[0].AirCanChangeTicket ? "show" : "hide";
			var showBtn2 = sitem[0].AirCanReFund ? "show" : "hide";
			var showBtn3 = sitem[0].AirCanCancel ? "show" : "hide";
			var showBtn4 = sitem[0].AirCanCheckIn ? "show" : "hide";
			var showTicketNo = item.Passengers[0].TicketNo != "" ? "" : "hide";
			var showState = (item.StateCode == "HL" || item.StateCode == "HL1") ? "" : "hide"
			var changeInfo = '';
			var PassengersInfo = '';
			sitem[0].Passengers.map(function (item) {
				changeInfo += item.PassengerID + '_' + item.TicketNo;
				changeInfo += ',';
				PassengersInfo += item.PassengerID + '_' + item.PassengerName;
				PassengersInfo += ',';
			})
			var AirNewInsurancesInfo = '';
			sitem[0].AirNewInsurances.map(function (aitem) {
				AirNewInsurancesInfo += aitem.AirInsuranceName + ' (' + aitem.InsuranceNameP + ') ' + aitem.AirInsuranceAmount +
					'CNY,';
			})
			AirNewInsurancesInfo = AirNewInsurancesInfo.substring(0, AirNewInsurancesInfo.length - 1);
			var DeparteTerminal = item.DeparteTerminal == null ? "" : item.DeparteTerminal;
			var ArriveTerminal = item.ArriveTerminal == null ? "" : item.ArriveTerminal;
			var showRebooking = item.Rebooking == null || item.Rebooking == "" ? "hide" : "";
			var day = GetDateDiff(item.DepartsDate, item.ArrivesDate);
			var showDay = day == 0 ? 'hide' : '';
			var showBookSeat = item.AirCanBookSeat == 0 ? "hide" : "";
			//||(item.Passengers[0].SeatNum!=""&&item.Passengers.length>2)
			//||(item.Passengers[0].SeatNum!=""&&item.Passengers.length<=2)
			var showPassengerSeat = (item.AirCanBookSeat == 0 && item.Passengers.length > 1 && item.Passengers[0].SeatNum !=
				"") || (item.Passengers[0].MealInfo != "" && item.Passengers.length > 1) ? "" : "hide";
			var showSeatInfo = (item.AirCanBookSeat == 0 && item.Passengers.length <= 1 && item.Passengers[0].SeatNum != "") ||
				(item.Passengers[0].MealInfo != "" && item.Passengers.length <= 1) ? "" : "hide";
			var passengersSeatInfo = '';
			var passengerSeatInfo = '';
			item.Passengers.map(function (pItem) {
				passengersSeatInfo += pItem.PassengerName + '  :  ';
				passengersSeatInfo += pItem.SeatNum;
				passengersSeatInfo += '  ' + pItem.MealInfo;
				passengersSeatInfo += '\n';
				passengerSeatInfo += pItem.PassengerName + '  :  ';
				passengerSeatInfo += pItem.SeatNum;
				// passengerSeatInfo+='<br>';
				passengerSeatInfo += '<span style="margin-left:10px;">' + pItem.MealInfo + '</span>';
				// passengerSeatInfo+='<br>';
			})
			$(".segmentDetailsList").eq(index).append(
				'\
				<div class="segmentDetailsLi">\
                  <div style="height:105px;position: relative;">\
                      <div class="segmentAirLine ellipsis" title="' +
				item.AirportName + '">' + item.AirportName + '</div>\
                      <div class="segmentDepartDate">' +
				item.DeparteDate + '</div>\
                      <div class="segmentDepartTime">' + item.ScheduleDepart +
				'</div>\
                      <div class="segmentArrow"></div>\
                      <div class="segmentArriveTime">' +
				item.ScheduleArrive + '</div>\
                      <div class="segmentDay ' + showDay + '">+' + day +
				'</div>\
                      <div class="segmentDepartAirport ellipsis" title="' + item.DeparteAirport + ' ' +
				DeparteTerminal + '">' + item.DeparteAirport + ' ' + DeparteTerminal +
				'</div>\
                      <div class="segmentArriveAirport ellipsis" title="' + item.ArriveAirport + ' ' +
				ArriveTerminal + '">' + item.ArriveAirport + ' ' + ArriveTerminal +
				'</div>\
                      <div class="segmentFlightNo">' + item.FlightNo +
				'</div>\
                      <div class="segmentDurnturn flexRow"><img src="../orders/images/clock.png" style="display:block;margin-right:5px;">' +
				item.Durnturn +
				'</div>\
                      \
                      \
                      <div class="segmentSelectSeat btnBackColor ' +
				showBookSeat + '" orderNo="' + res.OrderNo + '" PassengersInfo="' + PassengersInfo + '" flightInfo="' + item.DeparteCity +
				'-' + item.ArriveCity + '&&' + item.FlightNo + ' ' + item.DepartsDate + ' ' + item.ScheduleDepart +
				'" airline="' + item.AirlineCode + '" departureTime="' + item.DepartsDate + '" dstCity="' + item.ArriveAirportCode +
				'" flightNo="' + item.FlightNo.substring(2, item.FlightNo.length) + '" orgCity="' + item.DeparteAirportCode +
				'" pnrCode="' + item.PnrCode + '">' + get_lan("orderDetails").selectSeat +
				'</div>\
				<div class="infoGroup">\
                      <div class="segmentCabin">' + get_lan(
					'orderDetails').cabin + item.Cabin +
				'</div>\
                      <div class="segmentCraft">' + get_lan('orderDetails').craft + item.AirCraft +
				'</div>\
				<div class="segmentState ' + showState + '">' + get_lan('orderDetails').State + get_lan(
					'orderDetails').StateInfo +
				'</div>\
                      <div class="segmentMeal">' + item.Meal + ' ' + AirNewInsurancesInfo +
				'<span class="TicketNoText ' + showTicketNo + '" style="margin-left:20px;">' + get_lan('orderDetails').TicketNo +
				item.Passengers[0].TicketNo + '</span><span class="segmentSeat ' + showSeatInfo + ' mainFontColor" title="' +
				passengersSeatInfo + '">' + passengerSeatInfo + '</span><sapn class="segmentSeatInfo ' + showPassengerSeat +
				' mainFontColor" title="' + passengersSeatInfo + '">' + get_lan('orderDetails').passengerSeatInfo +
				'</span>\
				</div>\
				</div>\
                  </div>\
                  <div style="position:relative;">\
                      <div class="segmentRebooking ' +
				showRebooking + '"><span class="ruleColor" style="font-weight:bold;margin-right:10px;">' + get_lan(
					'orderDetails').Rebooking + '</span>' + item.Rebooking +
				'</div>\
                      <div class="segmentRefund ' + showRebooking +
				'"><span class="ruleColor" style="font-weight:bold;margin-right:10px;">' + get_lan('orderDetails').Refund +
				'</span>' + item.Refund +
				'</div>\
                      <div class="segmentRes hide"><span class="ruleColor" style="font-weight:bold;margin-right:10px;">' +
				get_lan('orderDetails').Res + '</span>' + item.Res + '</div>\
                  </div>\
				</div>\
			')
			$(".segmentBtnList").eq(index).html('\
				<div class="segmentBtn airCheckInBtn ' + showBtn4 + '" AirlineCode="' +
				sitem[0].AirlineCode + '">' + get_lan('orderDetails').onlineCheckIn +
				'</div>\
				<div class="segmentBtn cancelBtnAir ' + showBtn3 + '" ItemId="' + sitem[0].AirItemId +
				'" orderNo="' + sitem[0].PnrCode + '">' + get_lan('orderDetails').orderCancel +
				'</div>\
				<div class="segmentBtn ChangeTicketBtnAir ' + showBtn2 + '" index="' + index + '" orderId="' +
				sitem[0].AirItemId + '" IsDomestic="' + sitem[0].IsDomestic + '">' + get_lan('orderDetails').refund +
				'</div>\
				<div class="segmentBtn alterBtnAir ' + showBtn1 + '" index="' + index + '" changeInfo="' +
				changeInfo.substring(0, changeInfo.length - 1) + '" alterTicketInfo="' + changeInfo.substring(0, changeInfo.length -
					1) + ',' + sitem[0].Passengers[0].DocumentNo + ',' + orderInfo.OrderCustomerDetailList[0].CompanyId + ',' +
				orderInfo.OrderNo + ',' + sitem[0].PnrCode + ',' + sitem[0].NominalFare.split('CNY')[0] + ',' + sitem[0].CabinCode +
				',' + sitem[0].AirItemId + ','+sitem[0].Passengers[0].PassengerName+'" IsDomestic="' + sitem[0].IsDomestic + '" isSamePNR="' + sitem[0].isSamePNR +
				'">' + get_lan('orderDetails').endorse + '</div>\
				')
		})
		getTAnumber(function(){
			if(JSON.parse($.session.get('ProfileInfo')).SelectNoTrOption){
				$(".alterBtnAir").addClass("hide");
			}
		},'start');
		


		function GetDateDiff(startDate, endDate) {
			var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
			var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
			var dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
			return dates;
		}
	})
	//机票在线选座
	$(".segmentSelectSeat").unbind("click").click(function () {
		$('body').mLoading("show");
		var flightInfo = $(this).attr("flightInfo");
		var PassengersInfo = $(this).attr("PassengersInfo");
		var PassengersList = PassengersInfo.substring(0, PassengersInfo.length - 1).split(',');
		console.log(PassengersList);
		var pnrCode = $(this).attr('pnrCode');
		var orderNo = $(this).attr('orderNo');
		var flightNo = flightInfo.split("&&")[1].split(' ')[0].substring(2, flightInfo.split("&&")[1].split(' ')[0].length);
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/QueryService.svc/QuerySeatMapPost",
				jsonStr: '{"airline":"' + $(this).attr('airline') + '","departureTime":"' + $(this).attr('departureTime') +
					'","dstCity":"' + $(this).attr('dstCity') + '","flightNo":"' + $(this).attr('flightNo') + '","orgCity":"' + $(
						this).attr('orgCity') + '","pnrCode":"' + $(this).attr('pnrCode') + '","id":' + netUserId + '}'
			},
			success: function (data) {
				var res = JSON.parse(data);
				console.log(res);
				$('body').mLoading("hide");
				if (res.length == 0) {
					alert(get_lan("orderDetails").selectSeatRemind);
				} else {
					openSelectSeatPop();
					$(".selectSeatPop").html(
						'\
                        <div class="flexRow">\
                          <div class="customerContent">\
                            <div class="seatCustomerTittle mainBackColor">' +
						flightInfo.split("&&").join('<br>') +
						'</div>\
                            <div class="seatCustomerList autoScrollY"></div>\
                          </div>\
                          <div class="seatContent">\
                            <div class="seatContentTittle flexRow">\
                              <div style="width:120px;text-align:center;line-height:80px;" class="activeFontColor">' +
						get_lan("selectSeatPop").notes +
						'</div>\
                              <div style="width:120px;text-align:center;"><div class="seatIcon1" style="margin: 0 auto;margin-top: 15px;"></div>' +
						get_lan("selectSeatPop").available +
						'</div>\
                              <div style="width:120px;text-align:center;"><div class="seatIcon2" style="margin: 0 auto;margin-top: 15px;"></div>' +
						get_lan("selectSeatPop").blocked +
						'</div>\
                              <div style="width:120px;text-align:center;"><div class="seatIcon3" style="margin: 0 auto;margin-top: 15px;"></div>' +
						get_lan("selectSeatPop").select +
						'</div>\
                              <div style="width:120px;text-align:center;"><div class="seatIcon4" style="margin: 0 auto;margin-top: 15px;"></div>' +
						get_lan("selectSeatPop").ocuppied +
						'</div>\
                            </div>\
                            <div class="seatContentBody autoScrollX">\
                              <div class="seatContentBodyTittle flexRow"><div class="columnsField"></div>\</div>\
                              <div id="seatScroll">\
                                <div class="seatContentBodyContent autoScrollY"></div>\
                              </div>\
                            </div>\
                          </div>\
                        </div>\
                        <div class="flexRow">\
                          <div class="cancelSeatBtn" style="background-color: #9b9b9b;">' +
						get_lan("remarkPop").cancel + '</div>\
                          <div class="confirmSeatBtn btnBackColor">' +
						get_lan("remarkPop").confirm + '</div>\
                        </div>\
                    ')
					PassengersList.map(function (item) {
						$(".seatCustomerList").append(
							'\
                            <div class="seatCustomerLi ellipsis" customerId="' + item.split('_')[0] +
							'">' + item.split('_')[1] +
							'<div class="seatCustomerLiText" style="position:absolute;left:220px;top:0;"></div></div>\
                            '
						)
					})
					$(".seatCustomerLi").eq(0).addClass("seatCustomerLiActive");
					seatInfo(res, pnrCode, orderNo, flightNo);
					$(".cancelSeatBtn").unbind("click").click(function () {
						closeSelectSeatPop();
					})
				}
			},
			error: function () {
				// alert('fail');
			}
		});
	})

	function seatInfo(res, pnrCode, orderNo, flightNo) {
		$(".seatContentBodyTittle").css("width", (res[0].columnsField.length + 2) * 60 + 'px');
		$(".seatContentBodyContent").css("width", (res[0].columnsField.length + 2) * 60 + 20 + 'px');
		res[0].columnsField.map(function (item) {
			var codeField = item.codeField == "走道" ? "" : item.codeField
			$(".seatContentBodyTittle").append('\
                <div class="columnsField">' + codeField +
				'</div>\
                ')
		})
		$(".seatContentBodyTittle").append('\
            <div class="columnsField"></div>\
        ')
		res[0].rowsField.map(function (item) {
			$(".seatContentBodyContent").append('\
                <div class="seatContentBodyContentLi flexRow" codeField="' +
				item.codeField + '"></div>\
                ')
		})
		var columnsField = res[0].columnsField;
		var rowsField = [];
		res[0].rowsField.map(function (item) {
			rowsField.push(item);
		})
		console.log(rowsField);
		rowsField.map(function (item, index) {
			$(".seatContentBodyContentLi").eq(index).html('\
                <div class="seatInfo">' + item.codeField +
				'</div>\
            ')
			item.columnsField = res[0].columnsField;
			item.columnsField.map(function (cItem, cIndex) {
				$(".seatContentBodyContentLi").eq(index).append(
					'\
                    <div class="seatInfo"></div>\
                    ')
				item.seatsField.map(function (sItem, sIndex) {
					if (cItem.codeField == sItem.codeField && cItem.descriptionField == 1) {
						if (sItem.isAvailField) {
							$(".seatContentBodyContentLi").eq(index).children(".seatInfo").eq(cIndex + 1).append(
								'\
                                <div class="seatIcon1" style="margin:0 auto;margin:11px 0 0 15px;" seatNo="' +
								item.codeField + sItem.codeField + '"></div>\
                                ')
						} else {
							$(".seatContentBodyContentLi").eq(index).children(".seatInfo").eq(cIndex + 1).append(
								'\
                                <div class="seatIcon2" style="margin:0 auto;margin:11px 0 0 15px;"></div>\
                                '
							)
						}
					}
				})
			})
			$(".seatContentBodyContentLi").eq(index).append('\
                <div class="seatInfo">' + item.codeField +
				'</div>\
            ')
		})
		var dragX = function (obj) {
			obj.bind("mousedown", start);

			function start(event) {
				if (event.button == 0) { //判断是否点击鼠标左键  
					gapX = event.clientX;
					startx = obj.scrollLeft(); // scroll的初始位置
					// console.log(startx)
					//movemove事件必须绑定到$(document)上，鼠标移动是在整个屏幕上的
					obj.bind("mousemove", move);
					//此处的$(document)可以改为obj  
					obj.bind("mouseup", stop);
				}
				return false; //阻止默认事件或冒泡
			}

			function move(event) {
				var left = event.clientX - gapX; // 鼠标移动的相对距离
				obj.scrollLeft(startx - left);
				return false; //阻止默认事件或冒泡
			}

			function stop() {
				//解绑定，这一步很必要，前面有解释
				obj.unbind("mousemove", move);
				obj.unbind("mouseup", stop);
			}
		}
		dragX($(".seatContentBody"));
		/*点击座位*/
		$(".seatInfo .seatIcon1").unbind("click").click(function () {
			if ($(this).hasClass("seatIcon1")) {
				if ($(".seatInfo .seatIcon3").length != 0) {
					$(".seatInfo .seatIcon3").removeAttr("customerId");
					$(".seatInfo .seatIcon3").removeClass("seatIcon3").addClass("seatIcon1");
				}
				$(this).attr("customerId", $(".seatCustomerLiActive").attr("customerId"));
				$(this).attr("name", $(".seatCustomerLiActive").text());
				$(this).removeClass("seatIcon1").addClass("seatIcon3");
				$(".seatCustomerLiActive").children(".seatCustomerLiText").text($(this).attr("seatNo"));
			}
		})
		$(".seatCustomerLi").unbind("click").click(function () {
			var that = this;
			if (!$(that).hasClass("seatCustomerLiActive")) {
				$(".seatCustomerLi").removeClass("seatCustomerLiActive");
				$(that).addClass("seatCustomerLiActive");
				if ($(".seatInfo .seatIcon3").length != 0) {
					$(".seatInfo .seatIcon3").removeClass("seatIcon3").addClass("seatIcon4");
				}
				if ($(".seatInfo .seatIcon4").length != 0) {
					for (var i = 0; i < $(".seatInfo .seatIcon4").length; i++) {
						if ($(".seatInfo .seatIcon4").eq(i).attr("customerId") == $(that).attr("customerId")) {
							$(".seatInfo .seatIcon4").eq(i).removeClass("seatIcon4").addClass("seatIcon3");
						}
					}
				}
			}
		})
		$(".confirmSeatBtn").unbind("click").click(function () {
			if ($(".seatInfo .seatIcon4").length + $(".seatInfo .seatIcon3").length != $(".seatCustomerLi").length) {
				alert(get_lan("selectSeatPop").selectRemind);
			} else {
				var seatList = '[';
				for (var i = 0; i < $(".seatInfo .seatIcon4").length; i++) {
					seatList += '{"seatNo":"' + $(".seatInfo .seatIcon4").eq(i).attr("seatNo") + '",';
					seatList += '"name":"' + $(".seatInfo .seatIcon4").eq(i).attr("name") + '"},';
				}
				seatList += '{"seatNo":"' + $(".seatInfo .seatIcon3").attr("seatNo") + '",';
				seatList += '"name":"' + $(".seatInfo .seatIcon3").attr("name") + '"}]';
				console.log(seatList);
				$('body').mLoading("show");
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/OrderService.svc/BookAirSeat",
						jsonStr: '{"request":{"id":' + netUserId + ',"pnrCode":"' + pnrCode + '","orderNo":"' + orderNo +
							'","flightNo":"' + flightNo + '","seatList":' + seatList + ',"language":"' + obtLanguage + '"}}'
					},
					success: function (data) {
						var res = JSON.parse(data);
						console.log(res);
						if (res != "OK") {
							$('body').mLoading("hide");
							alert(res);
						} else {
							location.reload();
							// closeSelectSeatPop();
						}
					},
					error: function () {
						// alert('fail');
					}
				});
			}
		})
	}
	//在线值机
	$('.airCheckInBtn').unbind('click').click(function () {
		$('body').mLoading("show");
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/SystemService.svc/GetCheckInNew",
				jsonStr: '{"Airline":"' + $(this).attr('AirlineCode') + '","AirType":"3"}'
			},
			success: function (data) {
				var res = JSON.parse(data);
				console.log(res);
				$('body').mLoading("hide");
				if (res != '') {
					window.open(res);
				}
			},
			error: function () {
				// alert('fail');
			}
		});
	})
	//取消订单
	$(".cancelBtnAir").unbind("click").click(function () {
		var itemID = $(this).attr("ItemId");
		var pnrCode = $(this).attr("orderNo");
		var cancelMessage = confirm(get_lan("orderDetails").cancelRemind);
		if (cancelMessage == true) {
			$('body').mLoading("show");
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/OrderService.svc/DeleteAirItemPost",
					jsonStr: '{"itemID":"' + itemID + '","pnrCode":"' + pnrCode + '","id":' + netUserId + '}'
				},
				success: function (data) {
					$('body').mLoading("hide");
					var res = JSON.parse(data)
					console.log(res);
					if (res == "OK" || res.indexOf("成功") != -1) {
						alert(get_lan("orderDetails").cancelSuccess);
						location.reload();
					} else {
						alert(res);
					}
				},
				error: function () {
					// alert('fail');
				}
			});
		}
	})
	//退票
	$(".ChangeTicketBtnAir").unbind("click").click(function () {
		var index = parseInt($(this).attr("index"));
		// 获取退票费
		var tktType = res.Segment[index][0].IsDomestic ? "D" : "I"
		var ticketNo = res.Segment[index][0].Passengers[0].TicketNo
		var ticket = {}
		$('body').mLoading("show");
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			async: false,
			data: {
				url: $.session.get('obtCompany') + "/OrderService.svc/GetAirTicketRefundInfo",
				jsonStr: '{"ticketNo":"' + ticketNo + '","tktType":"' + tktType + '","key":' + netUserId + '}'
			},
			success: function (data) {
				$('body').mLoading("hide");
				ticket = JSON.parse(data)
				console.log(ticket);
			},
			error: function () {
				// alert('fail');
			}
		});
		if(ticket.code == "502"){
			alert(ticket.errorMsg);
			return false;
		}
		if ($(this).attr("IsDomestic") == "false" && ProfileInfo.onlineStyle == "BCD") {
			alert(get_lan("intlRefundRemind"));
			return false;
		}

		var refundTicketInfoBody = '';
		res.Segment[index].map(function (item) {
			refundTicketInfoBody +=
				'\
            <div class="refundTicketInfo">\
             <div class="refundFlightNo">' + item.FlightNo +
				'</div>\
             <div class="refundDepartureTime">' + item.ScheduleDepart +
				'</div>\
             <div class="refundArriveTime">' + item.ScheduleArrive +
				'</div>\
             <div class="refundArrow"></div>\
             <div class="refundDepartureCity">' + item.DeparteCity +
				'</div>\
             <div class="refundArriveCity">' + item.ArriveCity +
				'</div>\
            </div>\
            '
		})
		// "refundBrokerage":"预计航空公司手续费",
		// "refundMoney":"预计退款金额",
		$(".refundTicketBody").html('\
            <div class="refundTicketPassenger">' + get_lan("refundTicketPop").refundTicketPassenger +
			' ' + res.Segment[index][0].Passengers[0].PassengerName +
			'</div>\
            <div class="autoScrollY" style="min-height:85px;max-height:170px;">\
            ' +
			refundTicketInfoBody +
			'\
            </div>\
			<p class="refundBrokerage hide" style="padding-top: 20px;">'+ get_lan("refundTicketPop").refundBrokerage + '<span class="money" style="color:#ED8322;float:right">-</span></p>\
			<p class="refundMoney hide" style="padding-top: 20px;">'+ get_lan("refundTicketPop").refundMoney + '<span class="money" style="color:#ED8322;font-size:18px;float:right">-</span></p>\
            <div class="refundTicketLimit">\
              <div class="refundTicketLimitTittle">' +
			get_lan("refundTicketPop").refundTicketLimit + '</div>\
              <div class="refundTicketLimitBody">' + res.Segment[
				index][res.Segment[index].length - 1].Refund +
			'</div>\
            </div>\
            <div class="refundTicketReason">\
              <div class="refundTicketReasonTittle">' +
			get_lan("refundTicketPop").refundTicketReason +
			'</div>\
              <div class="refundTicketReasonBody">\
              <div class="flexRow" style="margin-bottom:10px;"><input class="refundReason" type="radio" name="refundReason" checked><div style="height:20px;margin-left:10px;">' +
			get_lan("refundTicketPop").refundTicketReason1 +
			'</div></div>\
              <div class="flexRow"><input class="refundReason" type="radio" name="refundReason"><div style="height:20px;margin-left:10px;">' +
			get_lan("refundTicketPop").refundTicketReason2 +
			'</div></div>\
              </div>\
            </div>\
            ')
		if (ticket.code == "200") {
			// "refundBrokerage":"预计航空公司手续费",
			// "refundMoney":"预计退款金额",
			$('.refundBrokerage').removeClass("hide")
			$('.refundMoney').removeClass("hide")
			$('.refundBrokerage .money').text(ticket.refundInfo.deduction + "" + ticket.refundInfo.currencyType)
			$('.refundMoney .money').text(ticket.refundInfo.refundPrice + "" + ticket.refundInfo.currencyType)
		}

		openRefundTicketPop();
		$(".closeRefundTicketBtn").unbind("click").click(function () {
			closeRefundTicketPop();
		})
		$(".refundTicketReason").append('<br><br><span style="color:#3083fb;font-size:16px;">' + get_lan("refundTicketPop")
			.refundPopRemind2 + '</span>');
		if (JSON.parse($.session.get('ProfileInfo')).IsBCD) {
			$(".refundTicketReason").html(get_lan("refundTicketPop").refundPopRemind);
			$(".refundTicketReason").append('<br><br><span style="color:#3083fb;font-size:16px;">' + get_lan("refundTicketPop")
				.refundPopRemind2 + '</span>');
			$(".refundTicketReason").css("color", "red");
			$(".refundTicketReason").css("margin-top", "80px");
		}
		$(".sureRefundTicketBtn").unbind("click").click(function () {
			if ($(".refundReason").eq(0).prop("checked")) {
				$('body').mLoading("show");
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/SystemService.svc/AutoRefundAirTicketPost",
						jsonStr: '{"isConfirmRefund":"true","Language":"' + obtLanguage + '","id":' + netUserId + ',"orderId":"' +
							res.Segment[index][0].AirItemId + '"}'
					},
					success: function (data) {
						var res = JSON.parse(data);
						console.log(res);
						$('body').mLoading("hide");
						if (res.netRefundField == 0) {
							alert(get_lan("refundTicketPop").refundRemind);
							location.reload();
						} else {
							alert(get_lan("refundTicketPop").refundSuccess);
							location.reload();
						}
					},
					error: function () {
						// alert('fail');
					}
				});
			} else if ($(".refundReason").eq(1).prop("checked")) {
				$('body').mLoading("show");
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/SystemService.svc/RefundAirAutoQ",
						jsonStr: '{"isConfirmRefund":"true","Language":"' + obtLanguage + '","id":' + netUserId + ',"orderId":"' +
							res.Segment[index][0].AirItemId + '"}'
					},
					success: function (data) {
						var res = JSON.parse(data);
						console.log(res);
						$('body').mLoading("hide");
						alert(res);
						location.reload();
					},
					error: function () {
						// alert('fail');
					}
				});
			} else if ($(".refundReason").length == 0) {
				$('body').mLoading("show");
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/SystemService.svc/AutoRefundAirTicketPost",
						jsonStr: '{"isConfirmRefund":"true","Language":"' + obtLanguage + '","id":' + netUserId + ',"orderId":"' +
							res.Segment[index][0].AirItemId + '"}'
					},
					success: function (data) {
						var res = JSON.parse(data);
						console.log(res);
						$('body').mLoading("hide");
						if (res.netRefundField == 0) {
							alert(get_lan("refundTicketPop").refundRemind);
							location.reload();
						} else {
							alert(get_lan("refundTicketPop").refundSuccess);
							location.reload();
						}
					},
					error: function () {
						// alert('fail');
					}
				});
			}
		})
	})
	//改签机票
	$(".alterBtnAir").unbind("click").click(function () {
		if ($(this).attr("IsDomestic") == "true" && ProfileInfo.onlineStyle == "BCD" && $(this).attr("isSamePNR") == "true") {
			alert(get_lan("intlRefundRemind"));
			return false;
		}
		var index = parseInt($(this).attr("index"));
		var changeInfo = $(this).attr("changeInfo");
		var alterTicketInfo = $(this).attr("alterTicketInfo");
		var IsDomestic = $(this).attr("IsDomestic");
		if (ProfileInfo.HideInterChange && IsDomestic == "false") {
			alert(get_lan("alterTicketPop").intlAlterRemind);
			return false;
		}
		openAlterPop();
		$(".closeAlterTicketBtn").unbind("click").click(function () {
			closeAlterPop();
		})
		var alterTicketInfoBody = '';
		res.Segment[index].map(function (item) {
			alterTicketInfoBody += '\
            <div class="alterTicketInfo">\
             <div class="alterFlightNo">' +
				item.FlightNo + '</div>\
             <div class="alterDepartureTime">' + item.ScheduleDepart +
				'</div>\
             <div class="alterArriveTime">' + item.ScheduleArrive +
				'</div>\
             <div class="refundArrow"></div>\
             <div class="alterDepartureCity">' + item.DeparteCity +
				'</div>\
             <div class="alterArriveCity">' + item.ArriveCity +
				'</div>\
            </div>\
            '
		})
		$(".alterTicketBody").html('\
            <div class="alterTicketPassenger">' + get_lan("alterTicketPop").alterTicketPassenger +
			' ' + res.Segment[index][0].Passengers[0].PassengerName +
			'</div>\
              <div class="autoScrollY" style="min-height:85px;max-height:170px;">\
              ' +
			alterTicketInfoBody +
			'\
              </div>\
            <div class="alterTicketDate">\
              <div class="alterTicketDateBody">\
                <div class="alterTicketDateTittle">' +
			get_lan("alterTicketPop").alterTicketDateTittle +
			'</div>\
              </div>\
            </div>\
            <div class="alterTicketLimit">\
              <div class="alterTicketLimitTittle">' +
			get_lan("alterTicketPop").alterTicketLimit + '</div>\
              <div class="alterTicketLimitBody">' + res.Segment[
				index][res.Segment[index].length - 1].Rebooking + '<span class="domAlterRemindText hide"><br>' + get_lan(
					"alterTicketPop").domAlterRemind + '</span></div>\
            </div>\
			<p style="font-size: 12px;font-weight: 400;color: #3083fb;line-height: 17px;">'+ get_lan("alterTicketPop").AlterRemindLine + '</p>\
            ')
		if (IsDomestic == 'true') {
			var alterInputBody =
				'\
            <div class="alterInputBody flexRow">\
              <input id="alterDateInput" readonly>\
              <select id="alterTimeInput">\
                <option value="all" class="domAllDay">' +
				get_lan("alterTicketPop").allDay +
				'</option>\
                <option value="0">0:00</option>\
                <option value="1">1:00</option>\
                <option value="2">2:00</option>\
                <option value="3">3:00</option>\
                <option value="4">4:00</option>\
                <option value="5">5:00</option>\
                <option value="6">6:00</option>\
                <option value="7">7:00</option>\
                <option value="8">8:00</option>\
                <option value="9">9:00</option>\
                <option value="10">10:00</option>\
                <option value="11">11:00</option>\
                <option value="12">12:00</option>\
                <option value="13">13:00</option>\
                <option value="14">14:00</option>\
                <option value="15">15:00</option>\
                <option value="16">16:00</option>\
                <option value="17">17:00</option>\
                <option value="18">18:00</option>\
                <option value="19">19:00</option>\
                <option value="20">20:00</option>\
                <option value="21">21:00</option>\
                <option value="22">22:00</option>\
                <option value="23">23:00</option>\
              </select>\
            </div>\
            '
			if (res.Segment[index].length == 2) {
				alterInputBody =
					'\
                <div class="alterInputBody flexRow">\
                  <input id="alterDateInput" readonly>\
                  <select id="alterTimeInput">\
                    <option value="all" class="domAllDay">' +
					get_lan("alterTicketPop").allDay +
					'</option>\
                    <option value="0">0:00</option>\
                    <option value="1">1:00</option>\
                    <option value="2">2:00</option>\
                    <option value="3">3:00</option>\
                    <option value="4">4:00</option>\
                    <option value="5">5:00</option>\
                    <option value="6">6:00</option>\
                    <option value="7">7:00</option>\
                    <option value="8">8:00</option>\
                    <option value="9">9:00</option>\
                    <option value="10">10:00</option>\
                    <option value="11">11:00</option>\
                    <option value="12">12:00</option>\
                    <option value="13">13:00</option>\
                    <option value="14">14:00</option>\
                    <option value="15">15:00</option>\
                    <option value="16">16:00</option>\
                    <option value="17">17:00</option>\
                    <option value="18">18:00</option>\
                    <option value="19">19:00</option>\
                    <option value="20">20:00</option>\
                    <option value="21">21:00</option>\
                    <option value="22">22:00</option>\
                    <option value="23">23:00</option>\
                  </select>\
                </div>\
                <div class="alterReturnInputBody flexRow">\
                  <input id="alterReturnDateInput" readonly>\
                  <select id="alterReturnTimeInput">\
                    <option value="all" class="domAllDay">' +
					get_lan("alterTicketPop").allDay +
					'</option>\
                    <option value="0">0:00</option>\
                    <option value="1">1:00</option>\
                    <option value="2">2:00</option>\
                    <option value="3">3:00</option>\
                    <option value="4">4:00</option>\
                    <option value="5">5:00</option>\
                    <option value="6">6:00</option>\
                    <option value="7">7:00</option>\
                    <option value="8">8:00</option>\
                    <option value="9">9:00</option>\
                    <option value="10">10:00</option>\
                    <option value="11">11:00</option>\
                    <option value="12">12:00</option>\
                    <option value="13">13:00</option>\
                    <option value="14">14:00</option>\
                    <option value="15">15:00</option>\
                    <option value="16">16:00</option>\
                    <option value="17">17:00</option>\
                    <option value="18">18:00</option>\
                    <option value="19">19:00</option>\
                    <option value="20">20:00</option>\
                    <option value="21">21:00</option>\
                    <option value="22">22:00</option>\
                    <option value="23">23:00</option>\
                  </select>\
                </div>\
                '
			}
			$(".alterTicketDateBody").append('\
                <div class="alterDateTittle">' + get_lan("alterTicketPop").alterDateTittle +
				'</div>\
                <div class="alterCabinTittle">' + get_lan("alterTicketPop").alterCabinTittle +
				'</div>\
                ' + alterInputBody +
				'\
                <select id="alterCabinSelect">\
                  <option berthType="0">' + get_lan(
					'alterTicketPop').cabins.cabin1 + '</option>\
                  <option berthType="1">' + get_lan(
						'alterTicketPop').cabins.cabin2 + '</option>\
                  <option berthType="2">' + get_lan(
							'alterTicketPop').cabins.cabin3 + '</option>\
                  <option berthType="3">' + get_lan(
								'alterTicketPop').cabins.cabin4 + '</option>\
                  <option berthType="23">' + get_lan(
									'alterTicketPop').cabins.cabin5 + '</option>\
                </select>\
                ')
			if (ProfileInfo.DomesticHideAllDay) {
				$(".domAllDay").remove();
				$("#alterTimeInput").val("8");
				$("#alterReturnTimeInput").val("8");
			}
			if (ProfileInfo.onlineStyle == "APPLE") {
				$(".alterCabinTittle").remove();
				$("#alterCabinSelect").remove();
			}
			if (res.Segment.length > 1) {
				$(".domAlterRemindText").removeClass("hide");
			}
		} else {
			var alterInputBody =
				'\
            <div class="alterInputBody flexRow">\
                <input id="alterDateInput" readonly>\
            </div>\
            '
			if (res.Segment[index].length == 2) {
				alterInputBody =
					'\
                <div class="alterInputBody flexRow">\
                    <input id="alterDateInput" readonly>\
                </div>\
                <div class="alterReturnInputBody flexRow">\
                  <input id="alterReturnDateInput" readonly>\
                </div>\
                '
			}
			$(".alterTicketDateBody").append('\
                <div class="alterDateTittle">' + get_lan("alterTicketPop").alterDateTittle +
				'</div>\
                <div class="alterCabinTittle">' + get_lan("alterTicketPop").alterCabinTittle +
				'</div>\
                ' + alterInputBody +
				'\
                <select id="alterCabinSelect">\
                  <option berthType="1">' + get_lan(
					'alterTicketPop').cabins.cabin2 + '</option>\
                  <option berthType="2">' + get_lan(
						'alterTicketPop').cabins.cabin3 + '</option>\
                  <option berthType="3">' + get_lan(
							'alterTicketPop').cabins.cabin4 + '</option>\
                </select>\
            ')
		}

		if (!ProfileInfo.QueryDomesticTicketsWithTime) {
			$("#alterTimeInput").remove();
			$("#alterReturnTimeInput").remove();
		}
		// if (ProfileInfo.onlineStyle == "APPLE") {
		// 	var minDate = 1;
		// 	$("#alterDateInput").val(getNextDay(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date()
		// 		.getDate()));
		// } else {
		// 	var minDate = 0;
		// 	$("#alterDateInput").val(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
		// }
		var minDate = 0;
		$("#alterDateInput").val(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
		if (res.Segment[index].length == 1) {
			$("#alterDateInput").datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				changeYear: true,
				minDate: minDate, // 当前日期之后的 0 天，就是当天
				maxDate: 365, // 当前日期之后的 0 天，就是当天
				hideIfNoPrevNext: true,
				showOtherMonths: true,
				selectOtherMonths: true,
			});
		} else if (res.Segment[index].length == 2) {
			$("#alterDateInput").datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				changeYear: true,
				minDate: minDate, // 当前日期之后的 0 天，就是当天
				maxDate: 365, // 当前日期之后的 0 天，就是当天
				hideIfNoPrevNext: true,
				showOtherMonths: true,
				selectOtherMonths: true,
				onSelect: function () {
					var departureValue = new Date($("#alterDateInput").val().replace(/-/g, "/"));
					$("#alterReturnDateInput").datepicker('destroy');
					$("#alterReturnDateInput").datepicker({
						dateFormat: 'yy-mm-dd',
						changeMonth: true,
						changeYear: true,
						minDate: departureValue, // 当前日期之后的 0 天，就是当天
						maxDate: 365, // 当前日期之后的 0 天，就是当天
						hideIfNoPrevNext: true,
						showOtherMonths: true,
						selectOtherMonths: true,
					});
					$("#alterReturnDateInput").val(getNextDay($("#alterDateInput").val()));
				}
			});
			$("#alterReturnDateInput").val(getNextDay($("#alterDateInput").val()));
		}

		function getNextDay(d) {
			d = d.replace(/-/g, "/")
			d = new Date(d);
			d = +d + 1000 * 60 * 60 * 24;
			d = new Date(d);
			var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
			var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
			//格式化
			return d.getFullYear() + "-" + month + "-" + day;
		}
		var alterPopHeight = $(".alterPop").height() % 2 == 1 ? $(".alterPop").height() + 1 : $(".alterPop").height();
		$(".alterPop").css("height", alterPopHeight + 'px');

		$(".sureAlterTicketBtn").unbind("click").click(function () {
			if (new Date($("#alterDateInput").val().replace(/-/g, "\/")) < new Date(res.DateTimeNowString.replace(/-/g,
				"\/"))) {
				return false;
			}

			var alterMessage = confirm(get_lan("orderDetails").alterMessage);
			if (alterMessage == true) {
				$('body').mLoading("show");
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/SystemService.svc/CanTicketChangePost",
						jsonStr: '{"type":"1","Language":"CN","id":' + netUserId + ',"changeInfo":"' + changeInfo + '"}'
					},
					success: function (data) {
						$('body').mLoading("hide");
						var res = JSON.parse(data)
						console.log(res);
						if (res.Status) {
							if (res.Message == null) {
								if (res.CanChange) {
									if (orderInfo.BookInOrgOrderForAT) {
										$.session.set('goOnBookOrderNo', orderInfo.OrderNo);
									}
									// 12.27缓存飞机的OrderNo
									$.session.set('changeOrderNo', orderInfo.OrderNo);
									// 缓存飞机的乘客语言
									$.session.set('changeOrderPassengerLanguage', orderInfo.Segment[0][0].Passengers[0].PassengerLanguage);
									if (IsDomestic == 'true') {
										if ($(".sureAlterTicketBtn").attr("startlimit") && parseInt($(".sureAlterTicketBtn").attr("startlimit")) >
											0) {
											if (datedifference(getNowFormatDate(), $('#alterDateInput').val()) < parseInt($(".sureAlterTicketBtn")
												.attr("startlimit"))) {
												var mymessage = confirm($(".sureAlterTicketBtn").attr("Message"));
												if (mymessage == true) {
													if ($(".sureAlterTicketBtn").attr("CanSearch") != "true") {
														return false;
													}
												} else {
													return false;
												}
											}
										}
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
										if (ProfileInfo.ChangeSameAirline) {
											var sameAirline = orderInfo.Segment[index][0].AirlineCode;
										} else {
											var sameAirline = "ALL";
										}
										if (ProfileInfo.onlineStyle == "APPLE") {
											var showCabins = 1;
										} else {
											var showCabins = $("#alterCabinSelect  option:selected").attr("berthtype");
										}
										// 获取TA单号
										if ($("#alterReturnDateInput").length == 0) {
											// var searchDomInfo = {
											//     'type':'oneWay','departureCityText':orderInfo.Segment[index][0].DeparteCity,'arrivalCityText':orderInfo.Segment[index][0].ArriveCity,'departureCity':orderInfo.Segment[index][0].DeparteAirportCode,'date':$('#alterDateInput').val(),'queryKey':orderInfo.Segment[index][0].DeparteCityCode+','+orderInfo.Segment[index][0].ArriveCityCode+','+$('#alterDateInput').val()+','+sameAirline,'showCabins':showCabins,
											//     'codeShare':false,'isDirect':false,'alterTicketInfo':alterTicketInfo,
											// }
											// 到达城市和起飞城市名称
											var searchDomInfo = {
												'type': 'oneWay',
												'departureCityText': orderInfo.Segment[index][0].DeparteAirport,
												'arrivalCityText': orderInfo.Segment[index][0].ArriveAirport,
												'departureCity': orderInfo.Segment[index][0].DeparteAirportCode,
												'arrivalCity': orderInfo.Segment[index][0].ArriveAirportCode,
												'date': $('#alterDateInput').val(),
												'queryKey': orderInfo.Segment[index][0].DeparteCityCode + ',' + orderInfo.Segment[index][0].ArriveCityCode +
													',' + $('#alterDateInput').val() + ',' + sameAirline,
												'showCabins': showCabins,
												'codeShare': false,
												'isDirect': false,
												'alterTicketInfo': alterTicketInfo,
											}
											if (ProfileInfo.QueryDomesticTicketsWithTime) {
												if ($("#alterTimeInput  option:selected").val() == "all") {
													var DepartureSelectValue = ''
												} else {
													var DepartureSelectValue = ' ' + $("#alterTimeInput  option:selected").val() + ':00:00';
												}
												searchDomInfo.queryKey = orderInfo.Segment[index][0].DeparteCityCode + ',' + orderInfo.Segment[index]
												[0].ArriveCityCode + ',' + $('#alterDateInput').val() + DepartureSelectValue + ',' + sameAirline
											}
											$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
											window.location.href = '../../domesticAir/airTicketList.html';
										} else {
											var searchDomInfo = {
												'type': 'roundTrip',
												'departureCityText': orderInfo.Segment[index][0].DeparteAirport,
												'arrivalCityText': orderInfo.Segment[index][0].ArriveAirport,
												'departureCity': orderInfo.Segment[index][0].DeparteAirportCode,
												'arrivalCity': orderInfo.Segment[index][0].ArriveAirportCode,
												'date': $('#alterDateInput').val(),
												'returndate': $('#alterReturnDateInput').val(),
												'queryKey': orderInfo.Segment[index][0].DeparteCityCode + ',' + orderInfo.Segment[index][0].ArriveCityCode +
													',' + $('#alterDateInput').val() + ',' + sameAirline,
												'queryKeyReturn': orderInfo.Segment[index][0].ArriveCityCode + ',' + orderInfo.Segment[index][0].DeparteCityCode +
													',' + $('#alterDateInput').val() + ',' + $('#alterReturnDateInput').val() + ',',
												'showCabins': showCabins,
												'codeShare': false,
												'isDirect': false,
												'alterTicketInfo': alterTicketInfo,
											}
											if (ProfileInfo.QueryDomesticTicketsWithTime) {
												if ($("#alterTimeInput  option:selected").val() == "all") {
													var DepartureSelectValue = ''
												} else {
													var DepartureSelectValue = ' ' + $("#alterTimeInput  option:selected").val() + ':00:00';
												}
												if ($("#alterReturnTimeInput  option:selected").val() == "all") {
													var ReturnSelectValue = ''
												} else {
													var ReturnSelectValue = ' ' + $("#alterReturnTimeInput  option:selected").val() + ':00:00';
												}
												searchDomInfo.queryKey = orderInfo.Segment[index][0].DeparteCityCode + ',' + orderInfo.Segment[index]
												[0].ArriveCityCode + ',' + $('#alterDateInput').val() + DepartureSelectValue + ',' + sameAirline;
												searchDomInfo.queryKeyReturn = orderInfo.Segment[index][0].ArriveCityCode + ',' + orderInfo.Segment[
													index][0].DeparteCityCode + ',' + $('#alterDateInput').val() + DepartureSelectValue + ',' + $(
														'#alterReturnDateInput').val() + ReturnSelectValue + ',' + sameAirline;
											}
											$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
											window.location.href = '../../domesticAir/airTicketList.html';
										}
									} else if (IsDomestic == 'false') {
										if ($("#alterReturnDateInput").length == 0) {
											var searchIntlInfo = {
												'type': 'oneWay',
												'departureCityText': orderInfo.Segment[index][0].DeparteCity,
												'arrivalCityText': orderInfo.Segment[index][0].ArriveCity,
												'departureCity': orderInfo.Segment[index][0].DeparteAirportCode,
												'arrivalCity': orderInfo.Segment[index][0].ArriveAirportCode,
												'date': $('#alterDateInput').val(),
												'queryKey': orderInfo.Segment[index][0].DeparteAirportCode + ',' + orderInfo.Segment[index][0].ArriveAirportCode +
													',' + $('#alterDateInput').val(),
												'showCabins': $("#alterCabinSelect  option:selected").attr("berthtype"),
												'isDirect': false,
												'alterTicketInfo': alterTicketInfo,
												'transitCityCode': "",
											}
											$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
											window.location.href = '../../intlAir/airTicketList.html';
										} else {
											var searchIntlInfo = {
												'type': 'roundTrip',
												'departureCityText': orderInfo.Segment[index][0].DeparteCity,
												'arrivalCityText': orderInfo.Segment[index][0].ArriveCity,
												'departureCity': orderInfo.Segment[index][0].DeparteAirportCode,
												'arrivalCity': orderInfo.Segment[index][0].ArriveAirportCode,
												'date': $('#alterDateInput').val(),
												'returndate': $('#alterReturnDateInput').val(),
												'queryKey': orderInfo.Segment[index][0].DeparteAirportCode + ',' + orderInfo.Segment[index][0].ArriveAirportCode +
													',' + $('#alterDateInput').val(),
												'queryKeyReturn': orderInfo.Segment[index][0].DeparteAirportCode + ',' + orderInfo.Segment[index][0]
													.ArriveAirportCode + ',' + $('#alterDateInput').val() + ',' + $('#alterReturnDateInput').val(),
												'showCabins': $("#alterCabinSelect  option:selected").attr("berthtype"),
												'isDirect': false,
												'alterTicketInfo': alterTicketInfo,
												'transitCityCode': "",
											}
											$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
											window.location.href = '../../intlAir/airTicketList.html';
										}
									}
								} else {
									alert(get_lan('orderDetails').alterRemind);
								}
							} else {
								alert(res.Message)
							}
						} else {
							alert(get_lan('orderDetails').alterRemind);
						}
					},
					error: function () {
						// alert('fail');
					}
				});
			}
		})
	})
}
//酒店
function hotelList(res) {
	res.Hotel.map(function (hitem, index) {
		if (hitem.CancelPolicy == null) {
			hitem.CancelPolicy = ""
		}
		var showLastTime = ProfileInfo.onlineStyle == "APPLE" ? "hide" : "";
		var showPolicy = ProfileInfo.onlineStyle == "APPLE" ? "" : "hide";
		var showBtn1 = hitem.HotelCanCancel ? "show" : "hide";
		var showBtn2 = hitem.HotelCanModify ? "show" : "hide";
		var showBtn3 = hitem.CanPay ? "show" : "hide";
		var htelText = hitem.IsShowDelay ? get_lan('orderDetails').orderExtend : get_lan('orderDetails').orderModify;
		var showCabinCustomer = hitem.CabinCustomerName != "" && hitem.CabinCustomerName != null ? "" : "hide";
		$(".hotelList").append(
			'\
			<div class="hotelLi">\
			  <div class="hotelLiTittle flexRow">\
                <div style="margin-left:27px;">' +
			hitem.HotelnameP +
			'</div>\
			    <div style="margin-left:50px;"><span style="font-size:16px;" class="mainFontColor">' + hitem.CheckIn +
			' - ' + hitem.CheckOut + '</span></div>\
			    <div style="margin-left:50px;">' + get_lan('orderDetails').orderState +
			'<span class="activeFontColor">' + hitem.HotelState +
			'</span></div>\
                <div style="margin-left:50px;">' + hitem.ConfirmNo +
			'</span></div>\
			    <div style="margin-left:50px;">' + get_lan('orderDetails').price +
			'<span class="activeFontColor">' + hitem.HotelFareAmount +
			'</span></div>\
			  </div>\
			  <div class="hotelLiBody flexRow">\
			     <div class="hotelDetailsList"></div>\
			     <div class="hotelBtnList"></div>\
			  </div>\
			</div>\
	    '
		)
		var showBus = hitem.ShuttleBusInfoList&&hitem.ShuttleBusInfoList.length>0?"":"hide";
		$(".hotelDetailsList").eq(index).append(
			'\
	    	<div class="hotelDetailsLi">\
              <div class="hotelName">' + hitem.HotelName +
			'</div>\
              <div class="hotelLastTime flexRow ' + showLastTime +
			'">\
                <div class="flexRow" style="width:220px;"><div class="lastTimeIcon">!</div>' + get_lan(
				'orderDetails').CancelDeadLine + '</div>\
                <span class="keypoint">' + hitem.CancelDeadLine +
			'</span>\
              </div>\
              <div class="hotelCancelPolicy flexRow ' + showPolicy +
			'"><div style="width:220px;">' + get_lan('orderDetails').CancelPolicy + '</div>' + hitem.CancelPolicy +
			'</div>\
	    	  <div class="hotelAddress flexRow"><div style="width:220px;">' + get_lan('orderDetails').address +
			'</div><span class="mainFontColor">' + hitem.HotelAddress +
			'</span></div>\
	    	  <div class="hotelRoomName flexRow"><div style="width:220px;">' + get_lan('orderDetails').RoomName +
			'</div>' + hitem.RoomName + '</div>\
	    	  <div class="hotelBedName flexRow"><div style="width:220px;">' +
			get_lan('orderDetails').BedName + '</div>' + hitem.BedName +
			'</div>\
	    	  <div class="hotelBreakfast flexRow"><div style="width:220px;">' + get_lan('orderDetails').Breakfast +
			'</div>' + hitem.Breakfast + '</div>\
              <div class="hotelPayType flexRow"><div style="width:220px;">' +
			get_lan('orderDetails').PayType + '</div>' + hitem.PayType +
			'</div>\
              <div class="hotelLastArriveTime flexRow"><div style="width:220px;">' + get_lan(
				'orderDetails').LastTime + '</div>' + hitem.LastTime +
			'</div>\
              <div class="hotelInfo flexRow">\
                <div class="hotelRooms" style="width:220px;">' + get_lan('orderDetails').Rooms + hitem.Rooms + '</div>\
                <div class="hotelNights flexRow"><img class="searchInputImg" src="../orders/images/nights.png" style="display:none">' +get_lan('orderDetails').Nights + hitem.Nights +'</div>\
                <div class="hotelWifi flexRow hide"><img class="searchInputImg" src="../orders/images/wifi.png" style="display:none">Wifi</div>\
			  </div>\
			  <div class="hotelBusInfo flexRow '+showBus+'" style="min-height:0px;">\
				<div style="width:220px;">'+get_lan('orderDetails').busInfo+'</div>\
				<div style="width:500px;">\
					<div class="hotelBusList"></div>\
					<div class="hotelBusHide hide"></div>\
					<div style="color:#3083FB;"><span class="busShowMore" style="cursor:pointer;" type="hide">'+get_lan('orderDetails').showMore+'</span></div>\
				</div>\
			  </div>\
              <div class="CabinCustomerName flexRow ' +
			showCabinCustomer + '"><div style="width:220px;">' + get_lan('orderDetails').CabinCustomerName + '</div>' + hitem
				.CabinCustomerName + '</div>\
	    	</div>\
		')
		if(hitem.ShuttleBusInfoList){
			if(hitem.ShuttleBusInfoList.length<3){
				$(".busShowMore").eq(index).addClass("hide");
			}
			hitem.ShuttleBusInfoList.map(function(bItem,bIndex){
				if(bIndex<2){
					$(".hotelBusList").eq(index).append('\
					<div class="flexRow" style="margin-bottom:10px;">\
					  <div style="width:140px;">'+bItem.DepTime+'</div>\
					  <div>\
						<div class="flexRow"><img class="hotelBusIcon" src="./images/busDeparture.png">'+bItem.Departure+'</div>\
						<div class="flexRow"><img class="hotelBusIcon" src="./images/busDestination.png">'+bItem.Destination+'</div>\
					  </div>\
					</div>\
					')
				}else{
					$(".hotelBusHide").eq(index).append('\
					<div class="flexRow" style="margin-bottom:10px;">\
					  <div style="width:140px;">'+bItem.DepTime+'</div>\
					  <div>\
						<div class="flexRow"><img class="hotelBusIcon" src="./images/busDeparture.png">'+bItem.Departure+'</div>\
						<div class="flexRow"><img class="hotelBusIcon" src="./images/busDestination.png">'+bItem.Destination+'</div>\
					  </div>\
					</div>\
					')
				}
			})
			$(".busShowMore").eq(index).unbind("click").click(function(){
				if($(this).attr("type")=="hide"){
					$(".hotelBusHide").eq(index).removeClass("hide");
					$(this).text(get_lan("orderDetails").retract);
					$(this).attr("type","show");
				}else if($(this).attr("type")=="show"){
					$(".hotelBusHide").eq(index).addClass("hide");
					$(this).text(get_lan("orderDetails").showMore);
					$(this).attr("type","hide");
				}
			})
		}
		$(".hotelBtnList").eq(index).html('\
	    	<div class="hotelBtn cancelBtnHotel ' + showBtn1 + '" ItemId="' + hitem.HotelItemId +
			'" orderNo="' + hitem.orderNo + '">' + get_lan('orderDetails').orderCancel +
			'</div>\
            <div class="hotelBtn PayStatusBtn ' + showBtn2 + ' changeHotelBtn" extendedInfo="' + hitem.CheckOut +
			',' + hitem.CityName + ',' + hitem.CityCode + ',' + hitem.HotelName + ',' + hitem.orderNo + ',' + hitem.HotelItemId +
			'">' + htelText + '</div>\
            <div class="hotelBtn PayStatusBtn leaveAhead ' + showBtn3 + '" index="' +
			index + '">' + hitem.PayStatus + '</div>\
	    ')
	})
	//取消订单
	$(".cancelBtnHotel").unbind("click").click(function () {
		var itemID = $(this).attr("ItemId");
		var orderNo = $(this).attr("orderNo");
		var cancelMessage = confirm(get_lan("orderDetails").cancelRemind);
		if (cancelMessage == true) {
			$('body').mLoading("show");
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/OrderService.svc/DeleteHotelItemPost",
					jsonStr: '{"hotelItemID":"' + itemID + '","orderNo":"' + orderNo + '","id":' + netUserId + '}'
				},
				success: function (data) {
					$('body').mLoading("hide");
					var res = JSON.parse(data);
					console.log(res);
					if (res == "OK" || res.indexOf("成功") != -1) {
						alert(get_lan("orderDetails").cancelSuccess);
						location.reload();
					} else {
						alert(get_lan("orderDetails").cancelUnSuccess);
					}
				},
				error: function () {
					// alert('fail');
				}
			});
		}
	})
	//修改酒店
	$(".changeHotelBtn").hide();
	//提前离店
	$(".leaveAhead").hide();
}
//火车
function trainList(res) {
	var orderInfo = res;
	console.log(orderInfo)
	// ',' + sitem[0].Passengers[0].DocumentNo + ',' + orderInfo.OrderCustomerDetailList[0].CompanyId
	res.Train.map(function (titem, index) {
		var showBtn1 = titem.TrainCanReIssue && res.HideTrainChange ? "show" : "hide";
		// 11月12日，res.HideTrainChange=true时显示改签按钮
		var showBtn2 = titem.TrainCanReFund ? "show" : "hide";
		var showBtn3 = titem.TrainCanCancel ? "show" : "hide";
		$(".trainList").append(
			'\
			<div class="trainLi">\
			  <div class="trainLiTittle flexRow">\
                <div style="margin-left:27px;">' +
			titem.nameP + '</div>\
			<div style="margin-left:30px;">' + get_lan('orderCustomerInfo').popDocuments +
			titem.customerDocment + '</div>\
			    <div style="margin-left:27px;">' + titem.TrainDate +
			'</div>\
			    <div style="margin-left:50px;">' + titem.TrainDeparte + ' - ' + titem.TrainArrive +
			'</div>\
			    <div style="margin-left:50px;">' + get_lan('orderDetails').orderState +
			'<span class="activeFontColor">' + titem.TrainState + '</span></div>\
			    <div style="margin-left:50px;">' +
			get_lan('orderDetails').price + '<span class="activeFontColor">' + titem.TrainFareAmount +
			'</span></div>\
			  </div>\
			  <div class="trainLiBody flexRow">\
			     <div class="trainDetailsList"></div>\
			     <div class="trainBtnList"></div>\
			  </div>\
			</div>\
	    '
		)
		var SeatNoStr = titem.SeatNo ? '&nbsp;&nbsp;&nbsp;' + get_lan('orderDetails').SeatNo + titem.SeatNo : "";
		var CoachNoStr = titem.CoachNo ? '&nbsp;&nbsp;&nbsp;' + get_lan('orderDetails').CoachNo + titem.CoachNo : "";
		var TicketNoStr = titem.TrainTicketNo ? '&nbsp;&nbsp;&nbsp;' + get_lan('orderDetails').trainTicketNo + titem.TrainTicketNo : "";
		var TicketGateStr = titem.TicketGate ? '&nbsp;&nbsp;&nbsp;' + get_lan('orderDetails').TicketGate + titem.TicketGate : "";

		$(".trainDetailsList").eq(index).append('\
	    	<div class="trainDetailsLi">\
	    	  <div class="trainType">' +
			titem.TrainType + '</div>\
	    	  <div class="trainDepartTime">' + titem.TrainDeparteTime +
			'</div>\
	    	  <div class="trainArrow"></div>\
	    	  <div class="trainArriveTime">' + titem.TrainArriveTime +
			'</div>\
	    	  <div class="trainDepart">' + titem.TrainDeparte + '</div>\
	    	  <div class="trainArrive">' +
			titem.TrainArrive + '</div>\
	    	  <div class="trainCode">' + titem.TrainCode +
			'</div>\
	    	  <div class="trainDurnturn flexRow"><img src="../orders/images/clock.png" style="display:block;margin-right:5px;">' +
			titem.Durnturn + '</div>\
	    	  <div class="trainSeat">' + get_lan('orderDetails').seat + titem.TrainSeat +
			TicketNoStr +
			CoachNoStr +
			SeatNoStr +
			TicketGateStr +
			'</div>\
	    	</div>\
	    ')
		console.log(index)
		$(".trainBtnList").eq(index).html('\
	    	<div class="trainBtn cancelBtnTrain ' + showBtn3 + '" ItemId="' + titem.TrainItemId +
			'" orderNo="' + titem.orderNo + '">' + get_lan('orderDetails').orderCancel +
			'</div>\
	    	<div class="trainBtn ChangeTicketBtnTrain ' + showBtn2 + '" index="' + index + '" trainItemId="' +
			titem.TrainItemId + '" searchTime="' + titem.TrainDeparteDate + '">' + get_lan('orderDetails').refund +
			'</div>\
	    	<div class="trainBtn alterBtnTrain ' + showBtn1 + '" index="' + index + '" trainItemId="' + titem.TrainItemId +
			'" searchTime="' + titem.TrainDeparteDate + '" changeInfo="' + titem.TrainItemId + '-' + titem.TrainFareAmount +
			'" alterTicketInfo="' + titem.customerID + '_' + titem.TrainItemId + '-' + titem.TrainFareAmount + ', ,' +
			orderInfo.OrderCustomerDetailList[0].CompanyId + ','+titem.nameP+'">' + get_lan(
				'orderDetails').endorse + '</div>\
	    	')

		// 火车 旧
		// <div class="trainBtn alterBtnTrain ' + showBtn1 + '" index="' + index + '" trainItemId="' + titem.TrainItemId +
		// '" searchTime="' + titem.TrainDeparteDate + '" changeInfo="' + titem.TrainItemId + '-' + titem.TrainFareAmount +
		// '" alterTicketInfo="' + titem.customerID + '_' + titem.TrainItemId + '-' + titem.TrainFareAmount + '">' + get_lan(
		// 	'orderDetails').endorse + '</div>
		// 飞机
		// alterTicketInfo="' + changeInfo.substring(0, changeInfo.length -
		// 	1) + ',' + sitem[0].Passengers[0].DocumentNo + ',' + orderInfo.OrderCustomerDetailList[0].CompanyId + ',' +
		// orderInfo.OrderNo + ',' + sitem[0].PnrCode + ',' + sitem[0].NominalFare.split('CNY')[0] + ',' + sitem[0].CabinCode +
		// ',' + sitem[0].AirItemId + '"
	})
	getTAnumber(function(){
		if(JSON.parse($.session.get('ProfileInfo')).SelectNoTrOption){
			$(".alterBtnTrain").addClass("hide");
		}
	},'start');
	//取消订单
	$(".cancelBtnTrain").unbind("click").click(function () {
		var itemID = $(this).attr("ItemId");
		var pnrCode = $(this).attr("orderNo");
		var cancelMessage = confirm(get_lan("orderDetails").cancelRemind);
		if (cancelMessage == true) {
			$('body').mLoading("show");
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/OrderService.svc/DeleteTrainItemPost",
					jsonStr: '{"itemID":"' + itemID + '","pnrCode":"' + pnrCode + '","id":' + netUserId + '}'
				},
				success: function (data) {
					$('body').mLoading("hide");
					var res = JSON.parse(data)
					console.log(res);
					if (res == "OK" || res.indexOf("成功") != -1) {
						alert(get_lan("orderDetails").cancelSuccess);
						location.reload();
					} else {
						alert(res);
					}
				},
				error: function () {
					// alert('fail');
				}
			});
		}
	})
	//退票
	// 获取退票费
	function getTrainRefund(trainId) {
		$('body').mLoading("show");
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/OrderService.svc/GetTrainRefundFare",
				jsonStr: '{"id":' + netUserId + ',"itemId":"' + trainId + '","language":"' + obtLanguage + '"}'
			},
			success: function (data) {
				var res = JSON.parse(data);
				console.log(res);
				$('body').mLoading("hide");
				if (res.code == 200) {
					$('.refundBrokerageTrain').removeClass('hide')
					$('.refundMoneyTrain').removeClass('hide')
					$('.refundTips').removeClass('hide')
					$('.refundBrokerageTrain .money').text(res.refundFee + " " + ProfileInfo.OfficeCurrency)
					$('.refundMoneyTrain .money').text(res.refundServiceFee + " " + ProfileInfo.OfficeCurrency)
					// 苹果更换字体颜色
					if (ProfileInfo.onlineStyle == "APPLE") {
						$('.refundBrokerageTrain .money').css('color', "#3083FB")
						$('.refundMoneyTrain .money').css('color', "#3083FB")
					}
				} else {
					alert(res.message)
				}
			},
			error: function () {
				// alert('fail');
			}
		});
	}
	$(".ChangeTicketBtnTrain").unbind("click").click(function () {
		var index = parseInt($(this).attr("index"));
		if (obtLanguage == "CN") {
			var refundTicketLimitBodyText =
				'\
              购票后，请按以下方式办理退票：<br/>\
              1.没有换取纸质车票且不晚于开车前30分钟的，可以在线退票。<br/>\
              2.已经换取纸质车票或者在开车前30分钟之内的，请携带购票时所使用的乘车人有效身份证件原件到车站售票窗口办理。<br/>\
              3.使用居民身份证购票且持居民身份证办理进站检票后，未乘车即出站的，请经车站确认后按规定办理。\
            '
		} else {
			var refundTicketLimitBodyText =
				'\
              After ticket is issued, please follow below instructions for the refund: <br/>\
              1. If the paper ticket is not printed out and out of 30 minutes prior to departure, it applies for the online refund. <br/>\
              2. If the paper ticket is printed and within 30 minutes prior to departure, please take the original identification which was used to purcahse the ticket to apply the refund in person at the ticketing office/railway station ticketing window. <br/>\
              3. For the situation, using local ID card to purcahse the ticket and enter the gate by using the local ID card then out with not taking the rail. Please confirm with the raiway staff with following the instruction given by them to refund the ticket.\
            '
		}
		$(".refundTicketBody").html('\
            <div class="refundTicketPassenger">' + get_lan("refundTicketPop").refundTicketPassenger +
			' ' + res.Train[index].nameP +
			'</div>\
            <div class="refundTicketInfo">\
             <div class="refundDepartureTime">' + res.Train[
				index].TrainDeparteTime +
			'</div>\
             <div class="refundArrow"></div>\
             <div class="refundArriveTime">' + res.Train[
				index].TrainArriveTime + '</div>\
             <div class="refundDepartureCity">' + res.Train[index].TrainDeparte +
			'</div>\
             <div class="refundArriveCity">' + res.Train[index].TrainArrive +
			'</div>\
            </div>\
			<p class="refundBrokerage refundBrokerageTrain hide" style="padding-top: 20px;text-align:right;">'+ get_lan("refundTicketPop").refundAmount + '<span class="money" style="color:#ED8322;font-size:16px;padding-left:10px;width: 110px;display: inline-block;">-</span></p>\
			<p class="refundMoney refundMoneyTrain hide" style="padding-top: 10px;text-align:right;">'+ get_lan("refundTicketPop").refundFee + '<span class="money" style="color:#ED8322;font-size:16px;padding-left:10px;width: 110px;display: inline-block;">-</span></p>\
			<p class="refundTips hide" style="padding-top: 10px;text-align:right;color:#999999;font-size: 12px;border-bottom: 1px solid #ECECEC;padding-bottom: 12px;"><img class="tipsIcon" style="display: inline-block;height: 14px;width: 14px;position: relative;top: 2px;" src="../orders/images/icon_hotts.png"/>'+ get_lan("refundTicketPop").refundTips + '</p>\
            <div class="refundTicketLimit">\
              <div class="refundTicketLimitTittle">' +
			get_lan("refundTicketPop").refundTicketLimit +
			'</div>\
              <div class="refundTicketLimitBody">\
                ' + refundTicketLimitBodyText +
			'\
              </div>\
            </div>\
            ')
		//火车票退票费 icon_hotts
		getTrainRefund(res.Train[index].TrainItemId)
		openRefundTicketPop();
		$(".closeRefundTicketBtn").unbind("click").click(function () {
			closeRefundTicketPop();
		})
		$(".sureRefundTicketBtn").unbind("click").click(function () {
			$('body').mLoading("show");
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/OrderService.svc/TrainRefundPost",
					jsonStr: '{"id":' + netUserId + ',"trainItemId":"' + res.Train[index].TrainItemId + '",}'
				},
				success: function (data) {
					var res = JSON.parse(data);
					console.log(res);
					$('body').mLoading("hide");
					if (res.netRefundField == 0) {
						alert(get_lan("refundTicketPop").refundRemind);
						location.reload();
					} else {
						alert(get_lan("refundTicketPop").refundSuccess);
						location.reload();
					}
				},
				error: function () {
					// alert('fail');
				}
			});
		})
	})
	//改签火车票
	$(".alterBtnTrain").unbind("click").click(function () {
		var index = parseInt($(this).attr("index"));
		var changeInfo = $(this).attr("changeInfo");
		console.log(changeInfo)
		var alterTicketInfo = $(this).attr("alterTicketInfo");
		var trainItemId = $(this).attr("trainItemId");
		var searchTime = $(this).attr("searchTime");
		//缓存改签车票的信息
		// alert(get_lan("alterTicketPop").alterTicketRemark)

		// <div id="dialog" title="基本的对话框">
		//   <p>这是一个默认的对话框，用于显示信息。对话框窗口可以移动，调整尺寸，默认可通过 'x' 图标关闭。</p>
		// </div>


		openAlterPop();
		$(".closeAlterTicketBtn").unbind("click").click(function () {
			closeAlterPop();
		})
		$(".alterTicketTittle").text(get_lan("alterTicketPop").alterTicketTittleTrain);
		$(".alterTicketBody").html('\
            <div class="alterTicketPassenger">' + get_lan("alterTicketPop").alterTicketPassenger +
			' ' + res.Train[index].nameP +
			'</div>\
            <div class="alterTicketInfo">\
             <div class="alterDepartureTime">' + res.Train[
				index].TrainDeparteTime +
			'</div>\
             <div class="refundArrow"></div>\
             <div class="alterArriveTime">' + res.Train[
				index].TrainArriveTime + '</div>\
             <div class="alterDepartureCity">' + res.Train[index].TrainDeparte +
			'</div>\
             <div class="alterArriveCity">' + res.Train[index].TrainArrive +
			'</div>\
            </div>\
            <div class="alterTicketDate">\
              <div class="alterTicketDateBody">\
                <div class="alterTicketDateTittle">' +
			get_lan("alterTicketPop").alterTicketDateTittle +
			'</div>\
              </div>\
            </div>\
            <div class="alterTicketLimit">\
              <div class="alterTicketLimitTittle">' +
			get_lan("alterTicketPop").alterTicketLimit + '</div>\
              <div class="alterTicketLimitBody">' +
			get_lan("alterTicketPop").alterTicketRemark +
			'</div>\
            </div>\
            ')
		// $(".alterTicketLimit").hide();
		$(".alterTicketDateBody").append('\
            <div class="alterDateTittle">' + get_lan("alterTicketPop").alterDateTittle +
			'</div>\
            <div class="alterCabinTittle">' + get_lan("alterTicketPop").alterTrainNumber +
			'</div>\
            <input id="alterDateInputTrain" readonly>\
            <input id="alterCabinSelect" placeholder="' +
			get_lan("alterTicketPop").optional + '">\
            ')
		if (ProfileInfo.onlineStyle == "APPLE") {
			// var minDate = 1;

			// 12.16苹果-火车票可以改签当天
			$("#alterDateInputTrain").val(getNextDay(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date()
				.getDate()));
			var minDate = 0;
			$("#alterDateInputTrain").val(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date()
				.getDate());
		} else {
			var minDate = 0;
			$("#alterDateInputTrain").val(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
		}
		$("#alterDateInputTrain").datepicker({
			dateFormat: 'yy-mm-dd',
			changeMonth: true,
			minDate: minDate, // 当前日期之后的 0 天，就是当天
			hideIfNoPrevNext: true,
			showOtherMonths: true,
			selectOtherMonths: true,
		});
		// $("#alterDateInputTrain").val(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate());
		$(".sureAlterTicketBtn").unbind("click").click(function () {
			$.session.set('trainTicketChanges', JSON.stringify(orderDetaile.Train));
			canChangeTrain()
		})

		// 检测火车票是否能够改签 
		function canChangeTrain() {
			console.log(changeInfo)

			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/SystemService.svc/CanTicketChangePost",
					jsonStr: '{"type":"4","Language":"CN","id":' + netUserId + ',"changeInfo":"' + changeInfo + '"}'
				},
				success: function (data) {
					$('body').mLoading("hide");
					var res = JSON.parse(data)
					console.log(res);
					if (res.Status) {
						var alterMessage = confirm(get_lan("orderDetails").alterMessage);
						if (alterMessage == true) {
							$('body').mLoading("show");
							$.ajax({
								type: 'post',
								url: $.session.get('ajaxUrl'),
								dataType: 'json',
								data: {
									url: $.session.get('obtCompany') + "/OrderService.svc/TrainRemindInfoPost",
									jsonStr: '{"trainItemId":"' + trainItemId + '","Language":"' + obtLanguage + '","id":' + netUserId +
										',"searchTime":"' + searchTime + '","type":"2"}'
								},
								success: function (data) {
									$('body').mLoading("hide");
									var res = JSON.parse(data)
									console.log(res);
									// 2020.1.17暂时不做提示,以后流程再说
									// if (res != "") {
									// 	alert(res);
									// } else {
									// 12.05删除继续预定订单
									if (orderInfo.BookInOrgOrderForAT) {
										$.session.set('goOnBookOrderNo', orderInfo.OrderNo);
									}

									if (!ProfileInfo.SearchTrainWithTimeDetail) {
										var DepartureSelectValue = ''
										var domTime = ''
									} else {
										var DepartureSelectValue = ' ' + orderInfo.Train[index].TrainDeparteTime.split(':')[0] + ':00:00';
										var domTime = orderInfo.Train[index].TrainDeparteTime.split(':')[0]
									}

									var searchTrainInfo = {
										'type': 'oneWay',
										'departureCityText': orderInfo.Train[index].TrainDeparte,
										'arrivalCityText': orderInfo.Train[index].TrainArrive,
										'departureCity': orderInfo.Train[index].TrainDeparteCode,
										'arrivalCity': orderInfo.Train[index].TrainArriveCode,
										'date': $('#alterDateInputTrain').val(),
										'queryKey': orderInfo.Train[index].TrainDeparte + ',' + orderInfo.Train[index].TrainArrive + ',' +
											$('#alterDateInputTrain').val() + ',' + $("#alterCabinSelect").val(),
										'alterTicketInfo': alterTicketInfo,
										'domqueryKey': orderInfo.Train[index].TrainDeparteCode + ',' + orderInfo.Train[index].TrainArriveCode + ',' + $('#alterDateInputTrain').val() + DepartureSelectValue + ',' + $("#alterCabinSelect").val() + ',ALL',
										'domTime': domTime,
									}
									// 1.可以加判断 苹果searchTrainInfo.goOnBookOrderNo为空
									// 2.bookTrainTicket页面  获取乘客信息
									$.session.set('searchTrainInfo', JSON.stringify(searchTrainInfo));
									window.location.href = '../../train/trainTicketList.html';
									// }
								},
								error: function () {
									// alert('fail');
								}
							});
						}
					} else {
						alert(get_lan('orderDetails').alterRemind);
						return false;
					}
				},
				error: function () {
					// alert('fail');
				}
			});
		}
	})
}

/*2020-2-16  租车*/
function carList(res) {
	var orderInfo = res;
	res.Car.map(function (cItem, cIndex) {
		var showBtn = cItem.CarCanCancel ? "show" : "hide";
		$(".carList").append(
			'\
			<div class="carLi">\
			  <div class="carLiTittle flexRow">\
                <div style="margin-left:27px;">' +
			orderInfo.OrderCustomer + '</div>\
			    <div style="margin-left:50px;">' + cItem.CarDepAddress + ' - ' + cItem.CarArrAddress +
			'</div>\
			    <div style="margin-left:50px;">' + get_lan('orderDetails').orderState +
			'<span class="activeFontColor">' + cItem.CarState + '</span></div>\
			    <div style="margin-left:50px;">' +
			get_lan('orderDetails').price + '<span class="activeFontColor">' + cItem.CarFareAmount +
			'</span></div>\
			  </div>\
			  <div class="carLiBody flexRow">\
			     <div class="carDetailsList"></div>\
			     <div class="carBtnList"></div>\
			  </div>\
			</div>\
	    '
		)
		var carCompany = obtLanguage == "CN" ? cItem.CarCompanyCN : cItem.CarCompanyEN;
		var carType = obtLanguage == "CN" ? cItem.CarTypeCN : cItem.CarTypeEN;
		$(".carDetailsList").eq(cIndex).append('\
			<div class="carDetailsLi">\
			  <div class="carCompany">' +
			carCompany + '</div>\
			  <div class="carType">' + carType +
			'</div>\
			  <div class="carPickUp"><span style="color:#041e58;">' + get_lan("carBody").pickUp + '</span> ' +
			cItem.PickTime.split(" ")[0] + '</div>\
			  <div class="carPickOff"><span style="color:#041e58;">' + get_lan(
				"carBody").pickOff + '</span> ' + cItem.ReturnTime.split(" ")[0] + '</div>\
			  <div class="carPickUpTime">' +
			cItem.PickTime.split(" ")[1] + '</div>\
			  <div class="carPickOffTime">' + cItem.ReturnTime.split(" ")[1] +
			'</div>\
			  <div class="carPickUpAddress">' + cItem.CarDepAddress +
			'</div>\
			  <div class="carPickOffAddress">' + cItem.CarArrAddress +
			'</div>\
			  <div class="carPointLeft"></div>\
			  <div class="carLine"></div>\
			  <div class="carPointRight"></div>\
	    	</div>\
	    '
		)
		$(".carBtnList").eq(cIndex).html('\
	    	<div class="carBtn cancelBtnCar ' + showBtn + '" ItemId="' + cItem.CarItemId +
			'" orderNo="' + cItem.orderNo + '">' + get_lan('orderDetails').orderCancel +
			'</div>\
	    	')
	})
	//取消订单
	$(".cancelBtnCar").unbind("click").click(function () {
		var itemID = $(this).attr("ItemId");
		var orderNo = $(this).attr("orderNo");
		var cancelMessage = confirm(get_lan("orderDetails").cancelRemind);
		if (cancelMessage == true) {
			$('body').mLoading("show");
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/OrderService.svc/DeleteCarItemPost",
					jsonStr: '{"carItemID":"' + itemID + '","orderNo":"' + orderNo + '","id":' + netUserId + '}'
				},
				success: function (data) {
					$('body').mLoading("hide");
					var res = JSON.parse(data)
					console.log(res);
					if (res == "OK" || res.indexOf("成功") != -1) {
						alert(get_lan("orderDetails").cancelSuccess);
						location.reload();
					} else {
						alert(res);
					}
				},
				error: function () {
					// alert('fail');
				}
			});
		}
	})
}
/*end*/
function openApprovalPop() {
	$("#cover").show();
	$(".approvalPop").css("display", "block");
}

function closeApprovalPop() {
	$("#cover").hide();
	$(".approvalPop").css("display", "none");
}

function openRemarkPop() {
	$("#cover").show();
	$(".remarkPop").css("display", "block");
}

function closeRemarkPop() {
	$("#cover").hide();
	$(".remarkPop").css("display", "none");
}

function openAlterPop() {
	$("#cover").show();
	$(".alterPop").css("display", "block");
}

function closeAlterPop() {
	$("#cover").hide();
	$(".alterPop").css("display", "none");
}

function openRefundTicketPop() {
	$("#cover").show();
	$(".refundTicketPop").css("display", "block");
}

function closeRefundTicketPop() {
	$("#cover").hide();
	$(".refundTicketPop").css("display", "none");
}

function openGoOnBookPop() {
	$("#cover").show();
	$(".GoOnBookPop").css("display", "block");
}

function closeGoOnBookPop() {
	$("#cover").hide();
	$(".GoOnBookPop").css("display", "none");
}

function openOnlinePayPop() {
	$("#cover").show();
	$(".onlinePayPop").css("display", "block");
}

function closeOnlinePayPop(operationType) {
	$("#cover").hide();
	$(".onlinePayPop").css("display", "none");
	if (operationType == "approval") {
		window.location.reload();
	}
}

function openUploadPop() {
	$("#cover").show();
	$(".uploadFilePop").css("display", "block");
}

function closeUploadPop() {
	$("#cover").hide();
	$(".uploadFilePop").css("display", "none");
}

function openGKbookingPop() {
	$("#cover").show();
	$(".GKbookingPop").css("display", "block");
}

function closeGKbookingPop() {
	$("#cover").hide();
	$(".GKbookingPop").css("display", "none");
}

function openSelectSeatPop() {
	$("#cover").show();
	$(".selectSeatPop").css("display", "block");
}

function closeSelectSeatPop() {
	$("#cover").hide();
	$(".selectSeatPop").css("display", "none");
}

function openCombineOrderPop() {
	$("#cover").show();
	$(".combineOrderPop").css("display", "block");
}

function closeCombineOrderPop() {
	$("#cover").hide();
	$(".combineOrderPop").css("display", "none");
}


// 改签或者权限设置
function onlyOnePayment(orderDetaile) {
	var s = orderDetaile.PayChannel
	if (s == 0) {
		onlinePay(orderDetaile);
	}
	if (s == 1) {
		var type = ProfileInfo.onlineStyle == "APPLE" ? 4 : 1;
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/QueryService.svc/QueryOrderPayInfo",
				jsonStr: '{"request":{"id":' + netUserId + ',"orderNo":"' + $(".onlinePayBtn").attr("orderNo") +
					'","language":"' + obtLanguage + '","payChannel":"1"}}'
			},
			success: function (data) {
				// $('body').mLoading("hide");
				var res = JSON.parse(data);
				console.log(res);
				var subject = obtLanguage == "CN" ? cn.tipsClass : en.tipsClass;
				// return false;
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/SystemService.svc/GetAopBodyNew",
						jsonStr: '{"request":{"subject":"' + subject + '","totalAmount":"' + res.payAmount + '","exMechantNO":"' +
							res.exMechantNO + '","type":"' + type + '"}}'
					},
					success: function (data) {
						// $('body').mLoading("hide");
						var res = JSON.parse(data);
						console.log(res);
						$('body').append(res);
					},
					error: function () {
						// alert('fail');
					}
				});
			},
			error: function () {
				// alert('fail');
			}
		});
	}
	if (s == 2) {
		// yeePay(orderDetaile);
		if (ProfileInfo.CreditCardYeepay && ProfileInfo.CloseCreditCardGateway) {
			nocardPay(orderDetaile)
		} else if (!ProfileInfo.CreditCardYeepay && !ProfileInfo.CloseCreditCardGateway) {
			yeePay(orderDetaile);
		} else {
			onlinePay(orderDetaile, "", "CreditCardPay");
		}
	}
}
