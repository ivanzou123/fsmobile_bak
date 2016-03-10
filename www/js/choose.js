function getScreenWidth()
{
  
  return $(window).width(); 
}
function getScreenHeight()
{
 return $(window).height() ;
}
function waitLockScreen()
{
  var width = getScreenWidth()/2-25;
  var height = getScreenHeight()/2-25;
  var div = "<div id='waitLoading'><div class='process' style='top:"+height+"px;left:"+width+"px'>"+
     "<i class='fa fa-circle-o-notch fa-spin'></i></div>"+
     "<div class='process-bg'></div></div>";
  $(document.body).append(div);
}

function unLockWaitScreen()
{
  $('#waitLoading').remove();
}

//get 参数获取
function getUrlParam(name)
{
    var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");

    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
        return unescape(r[2]);
    return null;
}
//获得项目
function getProject()
{
    methodNoPara("getProject",funProjectResult);
}
function funProjectResult(result)
{
 
    var ListMode = eval(result);
    var html = "";

    var firsLoadProject;
    for(var i=0;i<ListMode.length;i++)
    {
        var project=ListMode[i];
      if(i ==0)
      {
          firsLoadProject=project.ID;
          html+= "<li><a href='javascript:getPhase("+project.ID+")' class='active'>"+project.NAME+" </a></li>";
      }
      else
      {
          html+= "<li><a href='contacts.html'>"+project.NAME+"</a> </li>";
      }
    }
   
    $('#projectDis').html(html);
    getPhase(firsLoadProject);
}
//获得期
function getPhase(projectId){
 waitLockScreen();
methodPara("getPhase",'['+projectId+']',funPhaseResult);
}
function clearSelectUnit()
{
    $('#hidUnitId').val('');
    $('#unitTable').html('');
    $('#saleInfomation').css('display','none');
}
function funPhaseResult(result)
{
    unLockWaitScreen();
    $('#liPhase .detial').html('');
    clearSelectUnit();
    var ListMode = eval(result);
    var html = "";
    for(var i=0;i<ListMode.length;i++)
    {
        var phase=ListMode[i];
        html+="<a href='javascript:getGarden("+phase.ID+")' class='btn' >"+phase.NAME+"</a>";
    
    }
   
    $('#liPhase .detial').append(html);
}
//获得圆
function getGarden(phaseId)
{
waitLockScreen();
methodPara("getGarden",'['+phaseId+']',funGardenResult);
}
function funGardenResult(result)
{
    unLockWaitScreen();
    clearSelectUnit();
    $('#liGarden .detial').html('');
    $('#liTower .detial').html('');
    $('#liFloor .detial').html('');
    var ListMode = eval(result);
    var html = "";
    for(var i=0;i<ListMode.length;i++)
    {
        var garden=ListMode[i];
        html+="<a href='javascript:getTower("+garden.ID+")' class='btn' >"+garden.NAME+"</a>";
        
    }
    
    $('#liGarden .detial').append(html);

}
//获得栋

function getTower(gardentID)
{
    waitLockScreen();
    methodPara("getTower",'['+gardentID+']',funTowerResult);

}
function funTowerResult(result)
{
    unLockWaitScreen();
    clearSelectUnit();
    $('#liTower .detial').html('');
     $('#liFloor .detial').html('');
    var ListMode = eval(result);
    var html = "";
    for(var i=0;i<ListMode.length;i++)
    {
        var tower=ListMode[i];
        html+="<a href='javascript:getFloorUnit("+tower.ID+")' class='btn' >"+tower.NAME+"</a>";
        
    }
    
    $('#liTower .detial').append(html);
}
//获得层
function getFloor(towerID)
{
  methodPara("getFloor",'['+towerID+']',funFloorResult);
}
function funFloorResult(result)
{
    $('#liFloor .detial').html('');
     $('#units').html('');
    var ListMode = eval(result);
    var html = "";
    for(var i=0;i<ListMode.length;i++)
    {
        var floor=ListMode[i];
        html+="<a href='javascript:getUnit("+floor.ID+")' class='btn' >"+floor.NAME+"</a>";
        
    }
    
    $('#liFloor .detial').append(html);

}
function getUnit(floorId)
{
   methodPara("getUnit",'['+floorId+']',funUnitResult);
}

function funUnitResult(result)
{
    $('#units').html('');
    var ListMode = eval(result);
    var html = "";
    for(var i=0;i<ListMode.length;i++)
    {
        var unit=ListMode[i];
        html+="<li><a href='javascript:SelectUnit("+unit.ID+")' class='btn' id='"+unit.ID+"'>"+unit.NAME+"</a></li>";
        
    }
    
    $('#units').append(html);
}
function SelectUnit(obj,unitID)
{
  
  $(obj).parent().parent().find('td').removeClass('td-active');
  
   methodPara("getSelectUnit",'['+unitID+']',funSelectUnitResult);
   $('#hidUnitId').val(unitID);
    $(obj).addClass('td-active');
    
   
}
function clearUnitInfo()
{
    $('#listPriceId').html('0.00');
    $('#baseListPrice').html('0.00');
    $('#discountId').html('0.00');
    $('#areaId').html('0.00');
    $('#flattypeId').html('');
    $('#unitNameInfo').html('');
}
function funSelectUnitResult(result)
{
    
    clearUnitInfo();
    var ListMode = eval(result);
    var html = "";
   
    for(var i=0;i<ListMode.length;i++)
    {
        var unit=ListMode[i];
        
        $('#listPriceId').html(formatNum(unit.LISTPRICE));
        $('#baseListPrice').html(formatNum(parseFloat(unit.LISTPRICE)));
        $('#discountId').html('0.00');
        $('#unitNameInfo').html(unit.NAME);
        $('#areaId').html(unit.AREA);
        $('#flattypeId').html(unit.FLATTYPE);
        var listPrice = $('#listPriceId').html();
        var discountPrice =parseFloat(unit.LISTPRICE)*(0);
        if($('#discountPrice') !=undefined)
        {
           
            $('#discountPrice').html(formatNum(discountPrice));
            $('#listPriceId').html(formatNum(parseFloat(listPrice)*(1)));
            $('#discountId').html(formatNum(discountPrice));
        }
        $('#saleInfomation').css('display','');
        
    }

}
function convertToDecaimal(num)
{
  var f = parseFloat(num);
  if(isNaN(f))
  {
    return false;
  }
  var s = f.toString();
  var rs = s.indexOf('.');
  if(rs<0)
  {
    return s;
  }else
  {
   var x = s.substring(0,rs);
   return x;
  }
}

function nextPage()
{
 
    if( !($('#units li').find('a').hasClass('curr')) )
    {
       reminder('请选择一个单位');
       return;
    }
    var unitid=$('#units li').find('.curr').attr('id');
    
    window.location = "step2.html?unitId="+unitid;
//    {'listPrice':+listPrice,'bListPrice':baseListPrice,'area':+area,'discountPrice':discountPrice,'flatType':flatType,'unitname':unitname,'unitid':unitid}
}
//
//
//
//page 2
function getSaleInfo(unitid)
{
waitLockScreen();
    methodPara("getSaleInfo",'['+unitid+']',funSaleInfoResult);
}
function funSaleInfoResult(result)
{
   unLockWaitScreen();
    var i=0;
    var dataObj = eval("("+result+")");
    //遍历销售员
    $('#seller').html('');
    $('#saleAgent').html('');
    $('#laywer').html('');
    $('#payItem').html('');
    $.each(dataObj.seller,function(i,item){
           $.each(item,function(key,value){
                  if(i==0)
                  {
                    $('#seller').append("<option value=''>销售员</option>");
                  }
                  $('#seller').append("<option value='"+key+"'>"+value+"</option>");
        });
    });
    //遍历代理
    $.each(dataObj.SALEAGENT,function(i,item){
           $.each(item,function(key,value){
                  if(i==0)
                  
                  $('#saleAgent').append("<option value=''>代理</option>");
                  $('#saleAgent').append("<option value='"+key+"'>"+value+"</option>");
                  });
           });
    //遍历代理
    $.each(dataObj.LAYWER,function(i,item){
           $.each(item,function(key,value){
                  if(i==0)
                  $('#laywer').append("<option value=''>律师楼</option>");
                  $('#laywer').append("<option value='"+key+"'>"+value+"</option>");
                  });
           });

    //遍历付款方式
    $.each(dataObj.PAYITEM,function(i,item){
           $.each(item,function(key,value){
                  $('#payItem').append("<option value='"+key+"'>"+value+"</option>");
                  });
            var obj = document.getElementById('payItem');
            var strsel = obj.options[obj.selectedIndex].text;
            if(strsel.split('一次性').length >=2)
            {
             $('#bankYear').attr('disabled','disabled');
             $('#bankpercent').attr('disabled','disabled');
           
            }else
           {
            selectBankInfo(obj);
           }
           });
    //
   

}
function selectBankInfo(obj)
{
    var payitemId= obj.value.substring(0,obj.value.indexOf('_'));
    
    if(payitemId == "")
    {
        return;
    }
    
   var strsel = obj.options[obj.selectedIndex].text;
   if(strsel.split('一次性').length >=2)
   {
       $('#bankpercent').attr('disabled','disabled');
       $('#bankYear').attr('disabled','disabled');
       return;
   }
    $('#bankYear').attr('disabled',false);
    $('#bankpercent').attr('disabled',false);
    methodPara('getBankPercent',"["+payitemId+"]",funBankPercentResult);
}
function funBankPercentResult(result)
{
    var arr = eval(result).split(',');
   
    $('#bankpercent').html('<option value="">成</option>');
    for(var i=arr[1];i>=arr[0];i--)
    {
      $('#bankpercent').append("<option value='"+i+"'>"+i+"</option>");
    }
}

function getCutomerInfo()
{
    var inputValue = $('#custValue').val();
    waitLockScreen();
  methodPara("getMutilCustmer","["+inputValue+"]",funMutiCustomerResult)
}
function funMutiCustomerResult(result)
{
  unLockWaitScreen();
   
    $('#searchResult').html('');
    var ListMode = eval(result);
    var html = "";
    for(var i=0;i<ListMode.length;i++)
    {
        var cust=ListMode[i];
        html+="<li><a  href='javascript:selectCustomerFun("+cust.CUSTID+",\""+cust.CUSTNO+"\",\""+cust.NAME+"\",\""+cust.TELEPHONE+"\",\""+cust.IDENTITY+"\","+cust.ISBUY+")'><p>";
        
        html+=cust.NAME+"</p><p>"+cust.TELEPHONE+"</p><p>"+cust.IDENTITY+"</p></a></li>";
        
    }
    if(ListMode.length ==0)
    {
     html+="<li ><a href='javascript:void(0)'><p>无记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p></p></a></li>";
    }
    
    $('#searchResult').append(html);
}
function test123()
{
 alert("213");
}
function selectCustomerFun(custId,custno,custName,custTelephone,custIdentify,isbuy)
{
    if(isbuy != "0")
    {
        reminder("该登记号已经买过单位");
        return;
    }
    $('#hidCustId').val(custId);
    $('#custValue').val(custno);
    $('#searchResult').toggle();
    
    $('#custName').val(custName);    
    $('#custIdentify').val(custTelephone);
    $('#custTelephone').val(custIdentify);
}
function submit()
{
   
    var unitId =  $('#hidUnitId').val();
    var custId =$('#hidCustId').val();
    var custNo =$('#custValue').val();
    var listPrice = deParseNum($('#baseListPrice').html());
    var salePrice = deParseNum($('#listPriceId').html());
    var seller = $('#seller').val();
    var laywerId =$('#laywer').val();
    var saleAgent =$('#saleAgent').val();
    var perItem = $('#payItem').val();
    var bankpercent = ($('#bankpercent').val()==""?"0":$('#bankpercent').val());
    var bankyear = ($('#bankYear').val()==""?"0":$('#bankYear').val());
    if(custId == "")
    {
     reminder("请选一个客户");
        return;
    }
    if(seller == "")
    {
        reminder("请选择销售员");
        return;
    }
    if(laywerId == "")
    {
        reminder("请选择法律代表");
        return;
    }
    if(saleAgent == "")
    {
        reminder("请选择销售代理");
        return;
    }
    if(perItem == "")
    {
        reminder("请选择支付方式");
        return;
    }
    var obj = document.getElementById('payItem');
    var strsel = obj.options[obj.selectedIndex].text;
    if(strsel.split('一次性').length >=2)
    {
         bankpercent = "0";
         bankyear = "0";
        
    }else
    {
        bankpercent =$('#bankpercent').val();
        bankyear =$('#bankYear').val();
        if(bankpercent == "")
        {
             reminder("请选择层数");
            return;
        }
        if(bankyear == "")
        {
            reminder("请选择年限");
            return;
        }
    }
    //    if(bankYear == "")
//    {
//        reminder("请选择年限");
//        return;
//    }
    waitLockScreen();
    methodPara("saleAdd","["+unitId+","+custId+","+custNo+","+listPrice+","+salePrice+","+seller+","+laywerId+","+saleAgent+","+perItem+","+bankpercent+","+bankyear+"]",funSaleAddResult);
}
function funSaleAddResult(result)
{
    unLockWaitScreen();
    var j = eval("("+result+")");
    var dataObj = JSON.parse(j);
    if(dataObj.code == 0)
    {
        //var custNO = $('#custValue').val();
        //var unitId =  $('#hidUnitId').val();
        //window.location="step3.html?custNo="+custNO+"&unitid="+unitId
        $('#addSaleTotal').html($('#listPriceId').html());
         $('#addSalePrice').html($('#baseListPrice').html());
          $('#addSaleDisPrice').html($('#discountId').html());
           $('#addSaleArea').html($('#areaId').html());
            $('#addSaleType').html($('#flattypeId').html());
             $('#addSaleCustName').html($('#custName').val());
              $('#addSaleIdentier').html($('#custIdentify').val());
               $('#addSalePhone').html($('#custTelephone').val());
             var  saleAgent= document.getElementById('saleAgent');
             var agentTexy = saleAgent.options[saleAgent.selectedIndex].text;
             var seller = document.getElementById('seller');
             var sellerText = seller.options[seller.selectedIndex].text;
              var laywer = document.getElementById('laywer');
            var laywerText = laywer.options[laywer.selectedIndex].text;
             $('#addSaleName').html(sellerText);
             $('#addSaleAgent').html(agentTexy);
             $('#addSalelawyer').html(laywerText);
               $('#step1').hide();
			   $('#step2').hide();
			    $('#step3').show();
        
    }else
    {
        reminder(dataObj.msg);
    }
    
}
function formatNum(number) {
    
    number = number+"";
    number = number.replace(/,/g, "");
    
    var digit = number.indexOf("."); // 取得小数点的位置
    var int = number.substr(0, digit); // 取得小数中的整数部分
    
    var i;
    var mag = new Array();
    var word;
   
    if (number.indexOf(".") == -1) { // 整数时
        i = number.length; // 整数的个数
        while (i > 0) {
            word = number.substring(i, i - 3); // 每隔3位截取一组数字
            i -= 3;
    
            if(i<0)
            {
            mag.unshift(word); // 分别将截取的数字压入数组
            }
            else
            {
             mag.unshift(","+word);
            }
        }
        number = mag;
    } else { // 小数时
        i = int.length; // 除小数外，整数部分的个数
        while (i > 0) {
            word = int.substring(i, i - 3); // 每隔3位截取一组数字
            i -= 3;
            
            if(i<=0)
            {
            mag.unshift(","+word);
            }
            else
            {
              mag.unshift(word);
            }
        }
       // number = mag + number.substring(digit);
    }
   //number.substr(0,digit);
 
    return number;
}

function deParseNum(num)
{
    
  var reNum = "";
  if(num == "")
      return num;
    var arr = num.split(",");
    if(arr.length >0)
    {
        for(var i=0;i<arr.length;i++)
        {
            reNum = reNum+arr[i];
        }
        return convertToDecaimal(reNum);
    }else
    {
        return num;
    }
}

function addCustomerInfo(name,phoneNumber,identity)
{
  methodPara("addCustomerInfo","["+name+","+phoneNumber+","+identity+"]",funCunstomerInfo);
}

function getPayItem()
{

}

function getSellerAgent()
{

}

function getSeller()
{

}

function getLawyer()
{
 
}

