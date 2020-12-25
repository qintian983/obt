//原型链修改文件



/****************************** 字符串方法 String start ***************************/

//去除字符串头尾的引号
String.prototype.removeQuotation = function () {
    if ((this[0] == '"' && this[this.length - 1] == '"') || (this[0] == "'" && this[this.length - 1] == "'")){
        return this.slice(1,this.length-1)
    }else{
        return this
    }
}


/****************************** 字符串方法 String end ***************************/
