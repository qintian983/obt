// 构造函数CreditDate
		function CreditDate(o){
			var timeObj=new Object()
			// 最小时间（年），节点名字“id”
			var id=o.id || "#dateYM";
			var minYY=o.minY || "2010";
			var newTime=o.newTime || true;//默认值
			var language=o.language || "EN";//语言
			var zINdex=o.zIndex || 101
			
			// 月份列表
			var monthEN=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
			var monthCN=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
			
			// input 点击事件
			$(id).click(function(){
				$(this).unbind("click")
				showMonth(this)
			})
			function showMonth(e){
				// 位置信息
				var Y = $(e).offset().top;
				var X = $(e).offset().left;
				var h = $(e).height();
				// 时间限制
				// var minYY=2010
				// 时间
				if($(id).val()==""){
					var newDate=new Date()
				}else{
					var newDate=new Date($(id).val())
					if(newDate.getFullYear()<minYY){
						newDate=new Date()
					}
				}
				var yy=newDate.getFullYear();
				var mm=newDate.getMonth();
				$("body").append('<div class="dateFix"><div class="dateGroup">'
						+'<p class="dateTitle"><span class="monthreduce"><</span><span class="yy">'+yy+'</span><span class="monthadd">></span></p>'
						+'<div class="monthGroup" ></div>'
						+'<div class="topArrow"></div>'
					+'</div></div>')
					$(".dateGroup").css({"left":X,"top":Y+h+10})
					$(".dateFix").css({"z-index":zINdex})
					
					
				if(language=="CN"){
					for(var i=0;i<monthCN.length;i++){
						$(".monthGroup").append("<div class='monthCell' index='"+i+"'>"+monthCN[i]+"</div>")
					}
				}else{
					for(var i=0;i<monthEN.length;i++){
						$(".monthGroup").append("<div class='monthCell' index='"+i+"'>"+monthEN[i]+"</div>")
					}
				}
				
				$(".dateGroup").unbind().click(function(){
					// 防止事件传播
					return false
				})
				
				$(".dateFix").unbind().click(function(event){
					// 关闭时间
					$(".dateFix").remove()
					$(id).unbind("click").click(function(){
						showMonth(this)
					})
				})
				$(".monthCell").unbind().click(function(e){
					// 点击事件
					var checkedY=$(".yy").text()
					var checkedM=parseInt($(this).attr("index"))+1
					eclickMonth(this,checkedY,checkedM)
				})
				function eclickMonth(e,checkedY,checkedM){
					// 点击事件
					// var checkedY=$(".yy").text()
					// var checkedM=parseInt($(this).attr("index"))+1
					checkedM=checkedM<10?"0"+checkedM:checkedM
					$(id).val(checkedY+'-'+checkedM)
					$(".dateFix").remove()
					$(id).unbind("click").click(function(){
						showMonth(this)
					})
				}
				$(".monthreduce").click(function(e){
					// 减少年份
					if(parseInt($(".yy").text())-1<minYY){
						return false;
					}
					$(".yy").text(parseInt($(".yy").text())-1)
					refreshStyle()
				})
				$(".monthadd").click(function(e){
					// 增加年份
					$(".yy").text(parseInt($(".yy").text())+1)
					refreshStyle()
				})
				
				refreshStyle()
				function refreshStyle(){
					// 当前时间
						// 初始化
					$(".monthCell").removeClass("monthChecked")
					$(".monthCell").removeClass("monthNone")
					$(".monthCell").unbind().click(function(e){
						// 点击事件
						var checkedY=$(".yy").text()
						var checkedM=parseInt($(this).attr("index"))+1
						eclickMonth(this,checkedY,checkedM)
					})
					
					var nowYY=$(".yy").text()
					var d1=new Date()
					if(d1.getFullYear()==nowYY){
						$(".monthCell").eq(d1.getMonth()).addClass("monthChecked")
					}
					if($(".yy").text()==yy){
						$(".monthCell").eq(mm).addClass("monthChecked")
					}else{
						// $(".monthCell").removeClass("monthChecked")
					}
					if(nowYY<d1.getFullYear()){
						$(".monthCell").removeClass("monthChecked")
						$(".monthCell").addClass("monthNone")
						$(".monthCell").unbind()
					}else if(nowYY==d1.getFullYear()){
						for(var i=0;i<12;i++){
							if(i<d1.getMonth()){
								$(".monthCell").eq(i).removeClass("monthChecked")
								$(".monthCell").eq(i).addClass("monthNone")
								$(".monthCell").eq(i).unbind()
							}
						}
					}else{
						
						// $(".monthCell").removeClass("monthNone")
					}
				}
			}
		}