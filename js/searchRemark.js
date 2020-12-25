(function($) {
    var SearchRemark = function(target) {
        this.target = target; // 输入框
        this.container = null; //插件容器
        this.resultct = null; //搜索结果容器
        this.isKeyslect = false; //是否在用上下键选择
        this.isContainerExit = false; // 插件容器是否已存在
        this.targetId = '';
    };
    SearchRemark.prototype = {
        constructor: SearchRemark,
        //初始化
        init: function() {
            this.creatItem();
            this.inputSearch();
            this.keySelect();
            this.stopPropagation();
        },
        //创建市列表
        creatItem: function() {
            var targetId = this.targetId;            

            // if(this.isContainerExit) return;
            $(".searchRemarkBody").remove();
            var template = '<div class="searchRemarkBody"><ul class="result"></ul></div>';
            $(".result").html('');
            $('body').append(template);

            this.container = $('.searchRemarkBody');
            this.resultct = $('.result');
            this.isContainerExit = true;
        },
        //创建搜索结果列表
        creatResult: function(value,CompanyID,remarkIndex) {

            var allRemark = [];
            var self = this;
            // console.log(value)
            $.ajax(
              {
                type:'post',
                url : $.session.get('ajaxUrl'), 
                dataType : 'json',
                data:{
                    url: $.session.get('obtCompany')+"/SystemService.svc/SearchRemarkItem",
                    jsonStr:'{"remarkIndex":"'+remarkIndex+'","content":"'+value+'","companyId":"'+CompanyID+'"}'
                },
                success : function(data) {
                    $('body').mLoading("hide");
                    var res = JSON.parse(data);
                    // console.log(res);
                    res.map(function(item){
                        allRemark.push(item);
                    })
                    var len = allRemark.length,
                        str = '';
                    if (!!len) {
                        for (var i = 0; i < len; i++) {
                            var name = allRemark[i].Value!=""?allRemark[i].Value:allRemark[i].Key;
                            str += '<li><span class="name" Key="'+allRemark[i].Key+'">' + name + '</span></li>'
                        }
                        self.container.find('.result').html('').html(str).find('li').eq(0).addClass('active');
                    } else {
                        if($.session.get('obtLanguage')=="CN"){
                            self.container.find('.result').html('<li>没有找到<span class="noresult">' + value + '</span>相关信息</li>');
                        }else if($.session.get('obtLanguage')=="EN"){
                            self.container.find('.result').html('<li> No information about<span class="noresult">' + value + '</span>was found</li>');
                        }
                    }
                },
                error : function() {
                  // alert('fail');
                }
              }
            );
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
                            searchRemark.target.val($(this).find('.name').text());
                            searchRemark.target.attr("key",$(this).find('.name').attr('Key'));
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
            this.target.off("keyup").on('keyup', function(e) {
                if(!self.isKeyslect){
                    self.throttle(search, this);
                }
            })
            // 输入框搜索
            function search(e) {
                var targetId = self.targetId;
                // console.log(targetId)
                var container = self.container;
                self.triggleShow(false);
                var value = $(this).val().toUpperCase();//.split(' ').join('')
                var CompanyID = $(this).attr("CompanyID");
                var remarkIndex = $(this).attr("index");
                if (value) {
                    self.creatResult(value,CompanyID,remarkIndex);
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
                container.find('.result').hide();
            } else {
                container.find('.result').show();
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

    var searchRemark = null;
    $.fn.searchRemark = function(options) {
        var target = $(this);
        target.on('focus', function(e) {
            var top = $(this).offset().top + $(this).outerHeight()-5,
                left = $(this).offset().left+20;
            if(window.location.href.indexOf("order") != -1){
                left = $(this).offset().left;
            }
            searchRemark = searchRemark ? searchRemark : new SearchRemark(target);
            searchRemark.target = $(e.target);
            searchRemark.targetId = $(e.target).attr('id');
            searchRemark.init();
            searchRemark.container.show().offset({
                'top': top + 7,
                'left': left
            });
            searchRemark.triggleShow(true);
            searchRemark.resultct.on('click', 'li', function() {
                searchRemark.target.val($(this).find('.name').text());
                searchRemark.target.attr("key",$(this).find('.name').attr('Key'));
                searchRemark.triggleShow('all');
            })
        })
        return this;
    };
})(jQuery)
