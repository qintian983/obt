(function($) {
    var hotelCityString = '';
	var TAnumber=$.session.get('TAnumber')?$.session.get('TAnumber'):'';
	var TAnumberIndex=$.session.get('TAnumberIndex');
	var obtLanguage=$.session.get('obtLanguage');
	// var netUserId = $.session.get('netLoginId');
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
	
	var hotelCity = {
	    hot: {hot:[]},
	    ABCDEFGH: {},
	    IJKLMNOP: {},
	    QRSTUVWXYZ: {}
	};
	var hotelIntlCity = {
	    hot: {hot:[]},
	    ABCDEFGH: {},
	    IJKLMNOP: {},
	    QRSTUVWXYZ: {}
	};
	var hotelCityJson = "";
	var hotelIntlCityJson = "";
	function cityList(json,city,cityType){
			cityData(json,city,cityType);
	}
	// 获取TA单限制的城市
	function cityFilter(cityType,jsonList,cityDom,airType){
		cityData(jsonList,cityDom,cityType)
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
						if(cityType==2 && airType=="intel"){
							//酒店
							hotelIntlCityJson=newobjArr
						}
						if(cityType==2 && airType=="dom"){
							//酒店
							hotelCityJson=newobjArr
						}
					},100)
				}
			},
			})
	}
	
	var data1;
	// if(TAnumber && TAnumberIndex==1){
    if(TAnumber&&$.session.get('TAOneCity')!=1){
		// 第一次获取订单号TAnumber,如果存在订单号就用新接口，InitLimitCitys，否则InitCityPost
		data1={
			url: $.session.get('obtCompany')+"/SystemService.svc/InitHotelLimitCity",
			jsonStr:'{"key":'+$.session.get('netLoginId')+',"travelRequestNo":"' + TAnumber + '"}'
		}
	}else{
		data1={
			url: $.session.get('obtCompany')+"/SystemService.svc/InitHotelCityPost",
			jsonStr:'{"key":'+$.session.get('netLoginId')+'}'
		}
	}
    $.ajax(
      { 
        type:'post', 
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:data1,
        async:false,
        success : function(data) {
            // hotelCityString = data;
			if(!isJsonString(data) && TAnumber && TAnumberIndex){
				if(obtLanguage=='CN'){
					alert("出差城市信息缺失！")
				}else{
					alert("City business information missing!")
				}
			}else{
				// hotelCityString = data;
				hotelCityJson = JSON.parse(data)
				console.log(JSON.parse(data))
				if(TAnumber&&$.session.get('TAOneCity')!=1){
					cityFilter("2",hotelCityJson,hotelCity,"dom")
				}else{
					// cityData(JSON.parse(data),intlDomCity)
					cityData(hotelCityJson,hotelCity);
				}
			}
            // var res = JSON.parse(data);
            // console.log(res);
        },
        error : function() {
          // alert('fail');
        }
      }
    );
	
    // var hotelCityJson = JSON.parse(hotelCityString).DomsticCitys;
    // var hotelIntlCityJson = JSON.parse(hotelCityString).InterCitys;
var data6;
	// if(TAnumber && TAnumberIndex==1){
    if(TAnumber&&$.session.get('TAOneCity')!=1){
		// 第一次获取订单号TAnumber,如果存在订单号就用新接口，InitLimitCitys，否则InitCityPost
		data6={
			url: $.session.get('obtCompany')+"/SystemService.svc/InitAllHotelLimitCity",
			jsonStr:'{"key":'+$.session.get('netLoginId')+',"travelRequestNo":"' + TAnumber + '"}'
		}
	}else{
		data6={
			url: $.session.get('obtCompany')+"/SystemService.svc/InitAllHotelCityPost",
			jsonStr:'{"key":'+$.session.get('netLoginId')+'}'
		}
	}
    $.ajax(
      { 
        type:'post', 
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:data6,
        async:false,
        success : function(data) {
            // hotelCityString = data;
			if(!isJsonString(data) && TAnumber && TAnumberIndex){
				if(obtLanguage=='CN'){
					alert("出差城市信息缺失！")
				}else{
					alert("City business information missing!")
				}
			}else{
				// hotelCityString = data;
				// hotelCityJson = JSON.parse(data).DomsticCitys;
				hotelIntlCityJson = JSON.parse(data).InterCitys;
				console.log(JSON.parse(data))
				if(TAnumber&&$.session.get('TAOneCity')!=1){
					// cityFilter("2",hotelCityJson,hotelCity,"dom")
					cityFilter("2",hotelIntlCityJson,hotelIntlCity,"intel")
				}else{
					// cityData(JSON.parse(data),intlDomCity)
					// cityData(hotelCityJson,hotelCity);
					cityData(hotelIntlCityJson,hotelIntlCity);
				}
			}
            // var res = JSON.parse(data);
            // console.log(res);
        },
        error : function() {
          // alert('fail');
        }
      }
    );
	
    // var hotelCityJson = JSON.parse(hotelCityString).DomsticCitys;
    // var hotelIntlCityJson = JSON.parse(hotelCityString).InterCitys;

    
    //城市按首字母分类，填充到分类字面量
    (function() {
        // cityData(hotelCityJson,hotelCity);
        // cityData(hotelIntlCityJson,hotelIntlCity);
    })();
    function cityData(cityJson,city){
		if(TAnumber&&$.session.get('TAOneCity')!=1){
			//city=hotelCity
			//city=hotelIntlCity
			cityJson.shift()
			cityJson.map(function(item){
			        if(item.Value.length!=0){
			            item.Value.map(function(sItem){
							var f=true
							city.hot["hot"].map(function(cItem){
								if(cItem.ThreeCode==sItem.ThreeCode){
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
    // console.log(hotelCity);

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
            else if(targetId == "hotelIntlCity"){
                var city = hotelIntlCity;
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
                        switch($.session.get('obtLanguage'))
                        {
                        case 'CN':
                          str += '<span code='+code+'>' + city[group][itemKey[i]][j].NameCN + '</span>'
                          break;
                        case 'EN':
                          str += '<span code='+code+'>' + city[group][itemKey[i]][j].NameEN + '</span>'
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
                if(item.Key!="热门"&&item.Key!="#"){
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
                    var searchCode = allCity[i].Code==null?allCity[i].ThreeCode:allCity[i].Code;
                    str += '<li><span class="name" code="'+searchCode+'">' + allCity[i].NameCN + '</span><span class="letter">' + allCity[i].NameEN + '</span></li>'
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
                if(self.target.attr("id")=="hotelCity"||self.target.attr("id")=="hotelIntlCity"){
                    $('body').mLoading("show");
                    $.ajax(
                      {
                        type:'post',
                        url : $.session.get('ajaxUrl'), 
                        dataType : 'json',
                        data:{
                            url: $.session.get('obtCompany')+"/QueryService.svc/GetHotelPolicyPricePost",
                            jsonStr:'{"cityCode":"'+($(e.target).attr('code'))+'","id":'+netUserId+',"checkIn":"'+$("#hotelDepartureDate").val()+'","checkOut":"'+$("#hotelReturnDate").val()+'"}'
                        },
                        success : function(data) {
                            var res = JSON.parse(data);
                            console.log(res);
                            $(".searchMinPrice").val(res.minFare);
                            $(".searchMaxPrice").val(res.maxFare);
                            $.ajax(
                              {
                                type:'post',
                                url : $.session.get('ajaxUrl'), 
                                dataType : 'json',
                                data:{
                                    url: $.session.get('obtCompany')+"/QueryService.svc/GetCustomerCompanyAddressPost",
                                    jsonStr:'{"cityCode":"'+($(e.target).attr('code'))+'","id":'+netUserId+',"Language":"'+$.session.get('obtLanguage')+'"}'
                                },
                                success : function(data) {
                                    $('body').mLoading("hide");
                                    var res = JSON.parse(data);
                                    console.log(res);
                                    $("#hotelAddress").val('');
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
                                                    <option value="'+item.CompanyAddress+'">'+item.CompanyName+'</option>\
                                                    ')
                                            }
                                        })
                                       /*酒店位置*/
                                       $("#hotelAddressSelect").change(function(){
                                           $("#hotelAddress").val($('#hotelAddressSelect option:selected').val());
                                       }) 
                                    }
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
                }
                self.target.val(($(e.target).text()));
                self.target.attr("code",($(e.target).attr('code')));
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
                            if(self.target.attr("id")=="hotelCity"||self.target.attr("id")=="hotelIntlCity"){
                                $('body').mLoading("show");
                                $.ajax(
                                  {
                                    type:'post',
                                    url : $.session.get('ajaxUrl'), 
                                    dataType : 'json',
                                    data:{
                                        url: $.session.get('obtCompany')+"/QueryService.svc/GetHotelPolicyPricePost",
                                        jsonStr:'{"cityCode":"'+($(e.target).attr('code'))+'","id":'+netUserId+',"checkIn":"'+$("#hotelDepartureDate").val()+'","checkOut":"'+$("#hotelReturnDate").val()+'"}'
                                    },
                                    success : function(data) {
                                        var res = JSON.parse(data);
                                        console.log(res);
                                        $(".searchMinPrice").val(res.minFare);
                                        $(".searchMaxPrice").val(res.maxFare);
                                        $.ajax(
                                          {
                                            type:'post',
                                            url : $.session.get('ajaxUrl'), 
                                            dataType : 'json',
                                            data:{
                                                url: $.session.get('obtCompany')+"/QueryService.svc/GetCustomerCompanyAddressPost",
                                                jsonStr:'{"cityCode":"'+($(e.target).attr('code'))+'","id":'+netUserId+',"Language":"'+$.session.get('obtLanguage')+'"}'
                                            },
                                            success : function(data) {
                                                $('body').mLoading("hide");
                                                var res = JSON.parse(data);
                                                console.log(res);
                                                $("#hotelAddress").val('');
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
                                                                <option value="'+item.CompanyAddress+'">'+item.CompanyName+'</option>\
                                                                ')
                                                        }
                                                    })
                                                   /*酒店位置*/
                                                   $("#hotelAddressSelect").change(function(){
                                                       $("#hotelAddress").val($('#hotelAddressSelect option:selected').val());
                                                   }) 
                                                }
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
                            }
                            self.target.attr("code",self.resultct.find('.active .name').attr("code"));
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
                else if(targetId == "hotelIntlCity"){
                    var city = hotelIntlCityJson;
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
                kucity.triggleShow('all');
                /*酒店*/
                if(kucity.target.attr("id")=="hotelCity"||kucity.target.attr("id")=="hotelIntlCity"){
                    $('body').mLoading("show");
                    $.ajax(
                      {
                        type:'post',
                        url : $.session.get('ajaxUrl'), 
                        dataType : 'json',
                        data:{
                            url: $.session.get('obtCompany')+"/QueryService.svc/GetHotelPolicyPricePost",
                            jsonStr:'{"cityCode":"'+($(kucity.target).attr('code'))+'","id":'+netUserId+',"checkIn":"'+$("#hotelDepartureDate").val()+'","checkOut":"'+$("#hotelReturnDate").val()+'"}'
                        },
                        success : function(data) {
                            var res = JSON.parse(data);
                            console.log(res);
                            $(".searchMinPrice").val(res.minFare);
                            $(".searchMaxPrice").val(res.maxFare);
                            $.ajax(
                              {
                                type:'post',
                                url : $.session.get('ajaxUrl'), 
                                dataType : 'json',
                                data:{
                                    url: $.session.get('obtCompany')+"/QueryService.svc/GetCustomerCompanyAddressPost",
                                    jsonStr:'{"cityCode":"'+($(kucity.target).attr('code'))+'","id":'+netUserId+',"Language":"'+$.session.get('obtLanguage')+'"}'
                                },
                                success : function(data) {
                                    $('body').mLoading("hide");
                                    var res = JSON.parse(data);
                                    console.log(res);
                                    $("#hotelAddress").val('');
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
                                                    <option value="'+item.CompanyAddress+'">'+item.CompanyName+'</option>\
                                                    ')
                                            }
                                        })
                                       /*酒店位置*/
                                       $("#hotelAddressSelect").change(function(){
                                           $("#hotelAddress").val($('#hotelAddressSelect option:selected').val());
                                       }) 
                                    }
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
                }
            })
        })
        return this;
    };
})(jQuery)
