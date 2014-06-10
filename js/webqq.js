(function(){
    //多屏外层容器宽高计算和应用排列
    function layoutApp(){
        $(".desktopWrapper").width($(window).width()-200);
        $(".desktopWrapper").height($(window).height()-100);
        $(".desktopWrapper").appLayout({
            "desktopContainer":$(".desktopContainer"),
            "appBtnClass":"appBtn" 
        });    
    }
    layoutApp();
    $(window).resize(function(){
        layoutApp();      
    });


    //多屏切换
    var screenIndex = 2;
    $(".screenOrder a").eq(screenIndex).addClass(getScreenOrder(screenIndex)+"Selected");
    $(".screenOrder").on("click","a",function(){
        var curIndex = $(this).index();
        $(this).addClass(getScreenOrder(curIndex)+"Selected");
        $(".screenOrder a").eq(screenIndex).removeClass(getScreenOrder(screenIndex)+"Selected");
        if(curIndex > screenIndex){
            $(".desktopContainer").eq(screenIndex).removeClass("desktop-show-animation").addClass("desktop-disappear-animation1");
        }
        if(curIndex < screenIndex){
            $(".desktopContainer").eq(screenIndex).removeClass("desktop-show-animation").addClass("desktop-disappear-animation2");
        }
        $(".desktopContainer").eq(curIndex).removeClass("desktop-disappear-animation1").removeClass("desktop-disappear-animation2").addClass("desktop-show-animation");       
        screenIndex = curIndex;
    });
    function getScreenOrder(index){
        switch(index){
            case 0:return "one";
            case 1:return "two";
            case 2:return "three";
            case 3:return "four";
            case 4:return "five";           
        }
    }
    
    //打开应用
    $(".appBtn,.leftApp").live("click",function(e){
        var $this = $(this);       
        if(!$this.attr("_isOpen")){
            var appId = $this.attr("_appId");
            var appName = $this.attr("_appName");
            var iframeSrc = $this.attr("_iframeSrc");
            var imgSrc = $this.attr("_appImg");
            var $appWindow = $("<div class='popWindow appWindow' _appId='" + appId + "'><div class='popWindow-titleBar'><div class='popWindow-title'>" + appName + "</div><div class='popWindow-Btn'><a href='###' class='popWindow-Btn-close'></a><a href='###' class='popWindow-Btn-max'></a><a href='###' class='popWindow-Btn-min'></a></div></div><div class='popWindow-bg-container'></div><div class='popWindow-content'><iframe src='" + iframeSrc + "' scrolling='auto' frameborder='0'></iframe></div><div class='popWindow-resize-t'></div><div class='popWindow-resize-r'></div><div class='popWindow-resize-b'></div><div class='popWindow-resize-l'></div><div class='popWindow-resize-rt'></div><div class='popWindow-resize-rb'></div><div class='popWindow-resize-lb'></div><div class='popWindow-resize-lt'></div></div>");
            var $appTaskBox = $("<div class='taskItem' _appId='" + appId + "'><img src='" + imgSrc + "' alt='" + appName + "' title='" + appName + "' width='32' height='32' /><span>" + appName + "</span></div>");     
            $("#desktop").append($appWindow)
            if($(".appWindow").length > 1){
                $(".appWindow").css("z-index",10);
                $appWindow.css("z-index",11);
            }
            $(".taskBox").append($appTaskBox)
            $(".taskItem").removeClass("taskItemActive");
            $appTaskBox.addClass("taskItemActive");
            $this.attr("_isOpen","1");
            /* 窗口拖拽 */
            $(".popWindow[_appId='" + appId + "'] .popWindow-titleBar").drag({
                "dragElem":$(".popWindow[_appId='" + appId + "']")
            });
            //resize应用窗口大小
            $(".popWindow[_appId='" + appId + "']").elemResize({
                "topLine":".popWindow-resize-t",
                "rightLine":".popWindow-resize-r",
                "bottomLine":".popWindow-resize-b",
                "leftLine":".popWindow-resize-l",
                "rightTopLine":".popWindow-resize-rt",
                "rightBottomLine":".popWindow-resize-rb",
                "leftBottomLine":".popWindow-resize-lb",
                "leftTopLine":".popWindow-resize-lt"
            });
        }       
    });
    
    //右键菜单
    $('.appBtn:not(".addAppBtn")').live('contextmenu', function(e){
       var $this = $(this);
       var appId = $this.attr("_appId");
       var order = $this.closest(".desktopContainer").attr("_order");
       var $rightMenu = $("<div class='rightMenu'><ul><li><a href='javascript:;' class='deleteApp'>删除应用</a></li></ul></div>");
       $("#desktop").append($rightMenu);
       $rightMenu.css({"left":e.clientX,"top":e.clientY});
       e.preventDefault();
        //删除应用
        $(".deleteApp").live("click",function(){
            $this.remove();
            layoutApp();
            $.each(apps[order],function(i,n){
                if(n.appId == appId){
                    apps[order].splice(i,1);
                    return false;
                }
            });            
        });
        $(document).click(function(e){
            var e = e || window.event;
            var el = e.target || e.srcElement;
            if(!$(el).hasClass("appBtn") && e.which != 3){
                $rightMenu.remove();
            }
        });
    });
    
    
    //应用最小化
    $(".popWindow-Btn-min").live("click",function(){
        var $this = $(this);
        var $appWindow = $this.closest(".appWindow");
        $appWindow.hide();
    });
    
    //显示被最小化的应用
    $(".taskItem").live("click",function(){
        var $this = $(this);
        var appid = $this.attr("_appId");
        var $appWindow = $(".appWindow[_appId='" + appid + "']");
        if($appWindow.is(":hidden")){
            $(".appWindow").css("z-index",10);
            $appWindow.fadeIn().css("z-index",11);
            $(".taskItem").removeClass("taskItemActive");
            $this.addClass("taskItemActive");
        }else{
            if($appWindow.css("z-index") == 10 && $(".appWindow").length > 1){
                $(".appWindow").css("z-index",10);
                $appWindow.css("z-index",11);   
                $(".taskItem").removeClass("taskItemActive");
                $this.addClass("taskItemActive");                
            }else{
                $appWindow.fadeOut();
                $this.removeClass("taskItemActive");
            }           
        }
    });
    $(".appWindow").live("click",function(){
        var $this = $(this);
        var appid = $this.attr("_appId");
        var $taskItem = $(".taskItem[_appId='" + appid + "']");
        $(".appWindow").css("z-index",10);
        $this.css("z-index",11);   
        $(".taskItem").removeClass("taskItemActive");
        $taskItem.addClass("taskItemActive");         
    });
    
    //应用最大化
    $(".popWindow-Btn-max").live("click",function(){
        var $this = $(this);
        var $appWindow = $this.closest(".appWindow");   
        var winWidth = 0;
        var winHeight = 0;
        var winLeft = 0;
        var winTop = 0;
        if(!$appWindow.attr("_isMax")){
            $appWindow.attr("_width",$appWindow.width());
            $appWindow.attr("_height",$appWindow.height())
            $appWindow.attr("_left",$appWindow.position().left)
            $appWindow.attr("_top",$appWindow.position().top)
            $appWindow.width($(document).width()-2);
            $appWindow.height($(document).height()+15);   
            $appWindow.css({"left":0,"top":0});
            $this.addClass("popWindow-Btn-max-restore");
            $appWindow.attr("_isMax","1");
        }else{
            $appWindow.width($appWindow.attr("_width"));
            $appWindow.height($appWindow.attr("_height"));
            $appWindow.css({"left":$appWindow.attr("_left")+"px","top":$appWindow.attr("_top")+"px"});
            $this.removeClass("popWindow-Btn-max-restore");
            $appWindow.removeAttr("_isMax");            
        }
    });
    
    //关闭应用
    $(".popWindow-Btn-close").live("click",function(){
        var $this = $(this);
        var $appWindow = $this.closest(".appWindow");
        var appId = $appWindow.attr("_appId");
        var $taskItem = $(".taskItem[_appId='" + appId + "']");
        $appWindow.remove();
        $taskItem.remove();
        $(".appBtn[_appId='" + appId + "']").removeAttr("_isOpen");
    });
    
    //添加应用
    function addApp(screenOrder,appId,appName,appImg,iframeSrc){
        var $desktopContainer = $(".desktopContainer:eq(" + screenOrder + ")");
        var $addAppBtn = $desktopContainer.find(".addAppBtn");
        var appBtnHtml = "<div class='appBtn' _appId='"+appId+"' _appName='"+appName+"' _iframeSrc='"+iframeSrc+"'><div class='appBtn-appIcon'><img src='"+appImg+"' alt='"+appName+"' title='"+appName+"' width='48' height='48' /></div><div class='appBtn-appName'>"+appName+"</div></div>";
        var $appBtn = $(appBtnHtml);
        var obj = {};
        obj.appId = appId;
        obj.appName = appName;
        obj.appImg = appImg;
        obj.iframeSrc = iframeSrc;
        apps[screenOrder].push(obj);        
        $appBtn.insertBefore($addAppBtn);
        layoutApp();
    }
    //addApp(2,"weather","天气","../img/ph/weather.png","");
    
    /*
    //设置最外层容器desktop宽度
    function setDesktopSize(){
        $("#desktop").width($(document).width());
        $("#desktop").height($(document).height());
        $("#desktop").css("overflow","hidden");
    }
    //setDesktopSize();*/
    
    
    
    //主题设置弹窗
    $(".toolIcon-theme").live("click",function(e){
        var $this = $(this);
        $(".themeWindow").show();
        $(".themeWindow .popWindow-titleBar").drag({
            "dragElem":$(".themeWindow")
        });
    });
    //关闭主题设置
    $(".popWindow-Btn-close").live("click",function(){
        var $this = $(this);
        var $themeWindow = $this.closest(".themeWindow");
        $themeWindow.hide();
    });
    //修改主题
    $(".theme").live("click",function(){
        var $this = $(this);
        var imgSrc = $this.attr("_src");
        //图片预加载
        var img = new Image();
        img.src = imgSrc;
        if (img.complete) {
            $("body").css("background-image","url(" + imgSrc + ")");
        } else {
            img.onload = function () {
                $("body").css("background-image","url(" + imgSrc + ")");
                img.onload = null;
            };
        };                
    });
    
    
    /* 打开全局视图 */
    $(".globalView").live("click",function(){
        $("#desktop").hide();
        $("#appManagerPanel").show();
        $(".folderItem").addClass("folderItemTurn");
        loadGlobalApps();
        /* 全局视图中的应用整理 */
        $(".aMgApp").appMove({
            "dragClass":"aMgAppDrag",
            "folderContainer":$(".aMgFolderContainer"),
            "folderItemWrapper":".folderItemInner"
        });
    });
    /* 退出全局视图 */
    $(".quit").live("click",function(){
        $(".folderItem").removeClass("folderItemTurn");
        $("#appManagerPanel").hide();
        $("#desktop").show();
        loadApps();
        layoutApp();
    });
    
    
})();