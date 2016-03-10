function methodPara(key, parameter, fun) {
    var resultVal;
    var isAsync = false;
    if(fun !="")
    {
     isAsync = true; //false同步true异步
    }
   var funName =  "getFuntionByPara";
    var dataVal = "{key:'" + key + "', parameter:" + JSON.stringify(parameter) + "}";
    $.ajax({
        type: "POST", //访问WebService使用Post方式请求
        contentType: "application/json", //WebService 会返回Json类型
        url: "http://172.21.111.124:388/Service.asmx/" + funName, //调用WebService的地址和方法名称组�?---- WsURL/方法�?
        data: dataVal, //这里是要传递的参数，格式为 data: "{paraName:paraValue}",下面将会看到　　　
        dataType: "json",
        async: isAsync,
        success: function (result) { //回调函数，result，返回�?
            resultVal = result.d;
            if (fun != undefined && fun != "") {
               eval(fun + "(result)");             
            }
           
        },
        error: function (e,x,et) { //回调函数，result，返回�?
           
            alert(et);
           
        }
    });
    return resultVal;
}
function methodPara(key,para,fun)
{
    
    $.post("http://172.21.111.124:388/Service.asmx/getFunctionInterface",{'method':key, 'parameter':para},fun);

}
function methodNoPara(key,fun)
{
    
    $.post("http://172.21.111.124:388/Service.asmx/getFunctionInterface",{'method':key},fun);
    
}

function JSONstringify(Json){
	    if($.browser.msie){
	       if($.browser.version=="7.0"||$.browser.version=="6.0"){
	          var  result=jQuery.parseJSON(Json);
	       }else{
	          var result=JSON.stringify(Json);  
	       }       
	    }else{
	        var result=JSON.stringify(Json);           
	    }
	    return result;
	}
//
//function getParameter(param)
//{
//        var query = window.location.search;
//        var iLen = param.length;
//        var iStart = query.indexOf(param);
//        if (iStart == -1)
//　        return "";
//        iStart += iLen + 1;
//        var iEnd = query.indexOf("&", iStart);
//        if (iEnd == -1)
//　        return query.substring(iStart);
//        return query.substring(iStart, iEnd);
//}