(function($) {
    var trainCityString = '';
	var TAnumber=$.session.get('TAnumber')?$.session.get('TAnumber'):'';
	var TAnumberIndex=$.session.get('TAnumberIndex');
	var obtLanguage=$.session.get('obtLanguage');
	// 判断是否是json字符串
	function isJsonString(str) {  
	        try {  
	            if (typeof JSON.parse(str) == "object") {  
	                return true;  
	            }  
	        } catch(e) {  
	        }  
	        return false;  
	    } 
		// 火车城市列表模型
		var trainCity = {
		    hot: {hot:[]},
		    ABCDEFGH: {},
		    IJKLMNOP: {},
		    QRSTUVWXYZ: {}
		};
		var trainCityJson = ""
		// 生成城市列表
		function cityList(json,city,cityType){
				cityData(json,city,cityType);
		}
		// 获取TA单限制的城市
		function cityFilter(cityType,jsonList,cityDom,airType){
			cityList(jsonList,cityDom,cityType)
			return false;
			
			var userid = netUserId.split("\"")[1]
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/SystemService.svc/GetTravelRequestCityInfo",
					jsonStr: '{"travelRequestNo":"' + TAnumber + '","key":"' + userid + '","count":""}'
				},
				success: function(data) {
					if (data == '' || data=="[]") {
						// alert('没有权限')
						// HotelGKBooking(orderRes,type,false);
						return "[]"
					} else {
						var o1 = JSON.parse(data)
						var o2 = jsonList
						o2.shift()
						
						// a1去重
						var a1New=[]
						o1.map(function(aItem){
							var f=true
							if(aItem.serviceType==cityType || aItem.serviceType==0){
								a1New.push(aItem)
							}
						})
						// a2去重
						var endArr=[]
						var a2 = o2.filter(function(item) {
							return item.Value.length>0
						})
						// endArr 是所有的城市
						// 遍历原数组
						var newobjArr=[]
						a2.map(function(a2Item){
							var arr=a2Item.Value.filter(function(vItem){
								var f=false
								a1New.map(function(nItem){
									if(cityType==1 && (airType=="intel" || airType=="dom")){
										if(nItem.Code==vItem.CityCode){
											f=true
										}
									}else if(cityType==2){
										if(nItem.Code==vItem.ThreeCode){
											f=true
										}
									}else if(cityType==4){
										if(nItem.NameCN==vItem.NameCN){
											f=true
										}
									}else{
										if(nItem.Code==vItem.Code){
											f=true
										}
									}
								})
								if(f){return vItem}
							})
							var o={
								Key:a2Item.Key,
								Value:arr
							}
							if(arr.length>0){
								newobjArr.push(o)
							}
						})
						// console.log(newobjArr)
						setTimeout(function(){
							cityList(newobjArr,cityDom,cityType)
							if(cityType==4){
								//火车
								trainCityJson=newobjArr
							}
						},100)
					}
				},
				})
		}
		
		
		
	var data4;
	// if(TAnumber && TAnumberIndex==1){
    if(TAnumber&&$.session.get('TAOneCity')!=1){
		// 第一次获取订单号TAnumber,如果存在订单号就用新接口，InitLimitCitys，否则InitCityPost
		data4={
			url: $.session.get('obtCompany')+"/SystemService.svc/InitLimitTrainCity",
			jsonStr:'{"key":'+$.session.get('netLoginId')+',"travelRequestNo":"' + TAnumber + '"}'
		}
	}else{
		data4={
			url: $.session.get('obtCompany')+"/SystemService.svc/InitTrainCityPost",
			jsonStr:'{"key":'+$.session.get('netLoginId')+'}'
		}
	}
    $.ajax(
      { 
        type:'post', 
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:data4,
        async:false,
        success : function(data) {
			if(!isJsonString(data)&&TAnumber&&TAnumberIndex){
				if(obtLanguage=='CN'){
					alert("出差城市信息缺失！")
				}else{
					alert("City business information missing!")
				}
			}else{
				// trainCityString = data;
				if(TAnumber&&$.session.get('TAOneCity')!=1){
					// domCityString=data
					cityFilter("4",JSON.parse(data),trainCity)
				}else{
					// domCityString = data;
					cityData(JSON.parse(data),trainCity)
				}
				trainCityJson = JSON.parse(data);
			}
            // var res = JSON.parse(data);
            // console.log(res);
        },
        error : function() {
          // alert('fail');
        }
      }
    );
    // var trainCityJson = JSON.parse(trainCityString);

    //构建城市分类字面量
    // var trainCity = {
    //     hot: {hot:[]},
    //     ABCDEFGH: {},
    //     IJKLMNOP: {},
    //     QRSTUVWXYZ: {}
    // };
    //城市按首字母分类，填充到分类字面量
    // (function() {
    //     cityData(trainCityJson,trainCity);
    // })();
    function cityData(cityJson,city){
		if(TAnumber&&$.session.get('TAOneCity')!=1){
			cityJson.shift();
			cityJson.map(function(item){
			        if(item.Value.length!=0){
			            item.Value.map(function(sItem){
							var f=true
							city.hot["hot"].map(function(cItem){
								if(cItem.Code==sItem.Code){
									f=false
								}
							})
							if(f){
								city.hot["hot"].push(sItem);
							}
			            })
			        }
			})
		}else{
			cityJson.map(function(item){
			    if(item.Key == "热门"||item.Key == "#"){
			        if(item.Value.length!=0){
			            item.Value.map(function(sItem){
			                city.hot["hot"].push(sItem);
			            })
			        }
			    }
			    var list1 = ["A",'B','C','D','E','F','G','H'];
			    list1.map(function(letter){
			        if(item.Key == letter){
			            if(item.Value.length!=0){
			                item.Value.map(function(sItem){
			                    city["ABCDEFGH"][letter] ? city["ABCDEFGH"][letter].push(sItem) : (city["ABCDEFGH"][letter] = [], city["ABCDEFGH"][letter].push(sItem));
			                })
			            }
			        }
			    })
			    var list2 = ['I','J','K','L','M','N','O','P'];
			    list2.map(function(letter){
			        if(item.Key == letter){
			            if(item.Value.length!=0){
			                item.Value.map(function(sItem){
			                    city["IJKLMNOP"][letter] ? city["IJKLMNOP"][letter].push(sItem) : (city["IJKLMNOP"][letter] = [], city["IJKLMNOP"][letter].push(sItem));
			                })
			            }
			        }
			    })
			    var list3 = ['Q','R','S','T','U','V','W','X','Y','Z'];
			    list3.map(function(letter){
			        if(item.Key == letter){
			            if(item.Value.length!=0){
			                item.Value.map(function(sItem){
			                    city["QRSTUVWXYZ"][letter] ? city["QRSTUVWXYZ"][letter].push(sItem) : (city["QRSTUVWXYZ"][letter] = [], city["QRSTUVWXYZ"][letter].push(sItem));
			                })
			            }
			        }
			    })
			})
		}
		
        
    }

    var KuCity = function(target) {
        this.target = target; // 输入框
        this.container = null; //插件容器
        this.resultct = null; //搜索结果容器
        this.isKeyslect = false; //是否在用上下键选择
        this.isContainerExit = false; // 插件容器是否已存在
        this.targetId = '';
    };

    KuCity.prototype = {
        constructor: KuCity,
        //初始化
        init: function() {
            this.creatItem();
            this.tabChange();
            this.citySelect();
            this.inputSearch();
            this.keySelect();
            this.stopPropagation();
        },
        //创建市列表
        creatItem: function() {
            var targetId = this.targetId;
            if(targetId == "domDepartureCity" || targetId == "domArrivalCity"){
                var city = domCity;
            }
            else if(targetId == "intlDepartureCity" || targetId == "intlArrivalCity"){
                var city = intlCity;
            }
            else if(targetId == "trainDepartureCity" || targetId == "trainArrivalCity"){
                var city = trainCity;
            }
            else if(targetId == "hotelCity"){
                var city = hotelCity;
            }
            

            // if(this.isContainerExit) return;
            $(".kucity").remove();
            var template = '<div class="kucity"><div class="citybox"><h3 class="kucity_header"></h3><ul class="kucity_nav flexRow"><li class="active">Key</li><li>ABCDEFGH</li><li>IJKLMNOP</li><li>QRSTUVWXYZ</li></ul><div class="kucity_body"></div></div><ul class="result"></ul></div>';
			if(TAnumber&&$.session.get('TAOneCity')!=1){
				template = '<div class="kucity"><div class="citybox"><h3 class="kucity_header"></h3><ul class="kucity_nav flexRow"></ul><div class="kucity_body"></div></div><ul class="result"></ul></div>';
			}
            $(".kucity_body").html('');
            $(".result").html('');
            $('body').append(template);

            this.container = $('.kucity');
            this.resultct = $('.result');

            for (var group in city) {
                var itemKey = [];

                for (var item in city[group]) {
                    itemKey.push(item);
                }
                itemKey.sort();
                var itembox = $('<div class="kucity_item">');
                itembox.addClass(group);

                for (var i = 0, iLen = itemKey.length; i < iLen; i++) {

                    var dl = $('<dl>'),
                        dt = '<dt>' + (itemKey[i] == 'hot' ? '' : itemKey[i]) + '</dt>',
                        dd = $('<dd>'),
                        str = '';

                    for (var j = 0, jLen = city[group][itemKey[i]].length; j < jLen; j++) {
                        var code = city[group][itemKey[i]][j].Code == null?city[group][itemKey[i]][j].ThreeCode:city[group][itemKey[i]][j].Code;
                        var citycode = city[group][itemKey[i]][j].CityCode == null?city[group][itemKey[i]][j].ThreeCode:city[group][itemKey[i]][j].CityCode;
                        switch($.session.get('obtLanguage'))
                        {
                        case 'CN':
                          str += '<span code="'+code+'" citycode="'+citycode+'">' + city[group][itemKey[i]][j].NameCN + '</span>'
                          break;
                        case 'EN':
                          str += '<span code="'+code+'" citycode="'+citycode+'">' + city[group][itemKey[i]][j].NameEN + '</span>'
                          break;
                        }
                        // str += '<span>' + city[group][itemKey[i]][j].NameCN + '</span>'
                    }

                    dd.append(str);
                    dl.append(dt).append(dd);
                    itembox.append(dl);
                }
                $('.kucity_body').append(itembox);
                this.container.find('.hot').addClass('active');
            }
            if(JSON.parse($.session.get('ProfileInfo')).onlineStyle=="APPLE"){
              $(".kucity_item dd span").css("width","100%");
            }
            this.isContainerExit = true;
        },
        //创建搜索结果列表
        creatResult: function(city, value) {
            var allCity = [];
            city.map(function(item){
                if(item.Key!="热门"&&item.Key!="hot"){
                    item.Value.map(function(cItem){
                        var searchCode = cItem.Code==null?cItem.ThreeCode:cItem.Code;
                        if(cItem.NameCN.indexOf(value) != -1||cItem.NameEN.toUpperCase().split(' ').join('').indexOf(value.toUpperCase()) != -1||searchCode.toUpperCase().indexOf(value.toUpperCase()) != -1){
                            allCity.push(cItem);
                        }
                    })
                }
            })
            var len = allCity.length,
                str = '';
            if (!!len) {
                for (var i = 0; i < len; i++) {
                    var CityCode = allCity[i].Code==null?allCity[i].ThreeCode:allCity[i].CityCode;
                    str += '<li><span class="name" code="'+allCity[i].Code+'" citycode="'+CityCode+'">' + allCity[i].NameCN + '</span><span class="letter">' + allCity[i].NameEN + '</span></li>'
                }
                this.container.find('.result').html('').html(str).find('li').eq(0).addClass('active');
            } else {
                if($.session.get('obtLanguage')=="CN"){
                    this.container.find('.result').html('<li>没有找到<span class="noresult">' + value + '</span>相关信息</li>');
                }else if($.session.get('obtLanguage')=="EN"){
                    this.container.find('.result').html('<li> No information about<span class="noresult">' + value + '</span>was found</li>');
                }
            }
        },
        //列表切换
        tabChange: function() {
            $('.kucity_nav').on('click', 'li', function(e) {
                var current = $(e.target),
                    index = current.index();

                current.addClass('active').siblings().removeClass('active');
                $('.kucity_item').eq(index).addClass('active').siblings().removeClass('active');
                $(' .kucity_body').scrollTop(0);

            })
        },
        //城市选择
        citySelect: function() {
            var self = this;
            $('.kucity_item dd').on('click', 'span', function(e) {
                self.target.val(($(e.target).text()));
                self.target.attr("code",($(e.target).attr('code')));
				self.target.attr("citycode",($(e.target).attr('citycode')));
                self.container.hide();
            })
        },
        //上下键选择搜索结果
        keySelect: function() {
            var self = this;
            this.target.unbind('keydown').on('keydown', function(e){
                var current = self.resultct.find('.active').index();
                if(current !== -1){
                    switch(e.keyCode){
                        //上
                        case 38: 
                            keyActive(false);
                            break;
                        //下
                        case 40:
                            keyActive(true);
                            break;
                        //确定
                        case 13: 
                            self.isKeyslect = false;
                            if($.session.get('obtLanguage')=="EN"){
                                self.target.val(self.resultct.find('.active .letter').text());
                            }else if($.session.get('obtLanguage')=="CN"){
                                self.target.val(self.resultct.find('.active .name').text());
                            }
                            self.target.attr("code",self.resultct.find('.active .name').attr("code"));
                            self.target.attr("citycode",self.resultct.find('.active .name').attr("citycode"));
                            self.triggleShow('all');
                            self.target.blur();
                            break;
                        default: 
                            self.isKeyslect = false;
                            break;
                    }

                    function keyActive(isInorder) {
                        var max = self.resultct.find('li').length - 1;
                        if(isInorder){
                            current = current == max ? 0 : current + 1;
                        }else{
                            current = current == 0 ? max : current - 1;
                        }
                        self.resultct.find('li').eq(current).addClass('active').siblings().removeClass('active');
                        self.isKeyslect = true;
                    }
                }
            })
        },
        //搜索
        inputSearch: function() {
            var self = this;
            this.target.on('keyup', function(e) {
                if(!self.isKeyslect){
                    self.throttle(search, this);
                }
            })
            // 输入框搜索
            function search(e) {
                var targetId = self.targetId;
                // console.log(targetId)
                if(targetId == "domDepartureCity" || targetId == "domArrivalCity"){
                    var city = domCityJson;
                }
                else if(targetId == "intlDepartureCity" || targetId == "intlArrivalCity"){
                    var city = intlCityJson;
                }
                else if(targetId == "trainDepartureCity" || targetId == "trainArrivalCity"){
                    var city = trainCityJson;
                }
                else if(targetId == "hotelCity"){
                    var city = hotelCityJson;
                }
                var container = self.container;
                self.triggleShow(false);
                var value = $(this).val().split(' ').join('');

                if (value) {
                    self.creatResult(city, value);
                    // var url = 'https://sjipiao.alitrip.com/city_search.do?_ksTS=1439362066383_11337&lines=10&_input_charset=utf-8&needProvince=true&q=' + value;
                    // $.ajax({
                    //     url: url,
                    //     type: 'get',
                    //     dataType: 'jsonp'
                    // }).done(function(re) {
                    //     // console.log(re)
                    //     self.creatResult(re, value);
                    // })
                } else {
                    self.triggleShow(true);
                }
            }
        },
        //列表，结果，整体 显示切换
        triggleShow: function(open) {
            var container = this.container;
            if (open === 'all') {
                container.hide()
            } else if (open) {
                container.find('.citybox').show().end().find('.result').hide();
            } else {
                container.find('.citybox').hide().end().find('.result').show();
            }
        },
        //函数节流
        throttle: function(fn, context) {
            clearTimeout(fn.tId);
            fn.tId = setTimeout(function(){
                fn.call(context);
            }, 100)
        },
        //阻止事件冒泡
        stopPropagation: function() {
            var self = this;
            //阻止事件冒泡
            this.container.on('click', stopPropagation);
            this.target.on('click', stopPropagation);
            //页面点击 隐藏
            $(document).on('click', function() {
                self.container.hide();
            })
            function stopPropagation(e) {
                e.stopPropagation();
            }
        }
    };

    var kucity = null;
    $.fn.kuCity = function(options) {
        var target = $(this);
        target.on('focus', function(e) {
            var top = $(this).offset().top + $(this).outerHeight(),
                left = $(this).offset().left;
            kucity = kucity ? kucity : new KuCity(target);
            kucity.target = $(e.target);
            kucity.targetId = $(e.target).attr('id');
            kucity.init();
            kucity.container.show().offset({
                'top': top + 7,
                'left': left
            });
            kucity.triggleShow(true);
            kucity.resultct.on('click', 'li', function() {
                if($.session.get('obtLanguage')=="EN"){
                    kucity.target.val($(this).find('.letter').text());
                }else if($.session.get('obtLanguage')=="CN"){
                    kucity.target.val($(this).find('.name').text());
                }
                kucity.target.attr("code",$(this).find('.name').attr('code'));
                kucity.target.attr("citycode",$(this).find('.name').attr('citycode'));
                kucity.triggleShow('all');
            })
        })
        return this;
    };
})(jQuery)
