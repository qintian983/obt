//
function PopUpWindow(textObj) {
    this.window = 'popUpWindow--mask';
    this.title = textObj.title;
    this.body = textObj.body;
    this.btnText = textObj.btnText;
    this.closePopWindow = function(e){
        if(!e){
            e = this;
        }
        $('#'+e.window).remove();
    }
    this.popUp = function (root, success, close) {
        var that = this;
        var close = close || this.closePopWindow;
        var html = "<div class='popUpWindow--mask' id='"+this.window+"'>\
                        <section class='popUpWindow--box'>\
                            <img src='../css/images/icon_cha.svg' class='popUpWindow--close'>\
                            <header>\
                                <h1 class='popUpWindow--title'>"+ this.title + "</h1>\
                            </header>\
                            <div class='popUpWindow--body'>"+ this.body + "</div>\
                            <div class='popUpWindow--btn'>" + this.btnText + "</div>\
                        </section>\
                    </div>";
        $(root).append(html);
        $('.popUpWindow--close').bind('click',function(){
            close(that);
        });
        $('.popUpWindow--btn').bind('click',function(){
            that.closePopWindow();
            success();
        });
    }
}

function currentTime() {
    var c = new Date();
    return c;
}
function flightTime(flightTimeStr){
    var flightTimeObj = {
        yy:parseInt(flightTimeStr.slice(0,4)),
        mm:parseInt(flightTimeStr.slice(4,6))-1,
        dd:parseInt(flightTimeStr.slice(6,8)),
        hh:parseInt(flightTimeStr.slice(8,10)),
        min:parseInt(flightTimeStr.slice(10,12))
    }
    var f = new Date();
    f.setFullYear(flightTimeObj.yy);
    f.setMonth(flightTimeObj.mm);
    f.setDate(flightTimeObj.dd);
    f.setHours(flightTimeObj.hh);
    f.setMinutes(flightTimeObj.min);
    return f;
}