/**
 * @fileOverview
 * the script for app move in global view
 * @author kuangyi
 * @version 2013-7-5
 */
 
 ;(function($){
 
    $.fn.appMove = function(ops){
        var defaults = {
           "dragClass":"",
           "folderContainer":"",
           "folderItemWrapper":""
        }
        var op = $.extend(defaults,ops);
        var wrapperWidth = $(window).width()/5;
        var wrapperTop = op.folderContainer.offset().top;
        
        return this.each(function(){
            var $this = $(this);
            var isMouseDown = false;
            var $cloneApp;
            var eventX;
            var eventY;
            var left;
            var top;
            var initOrder;
            $this.live("mousedown",function(e){               
                isMouseDown = true;
                eventX = e.pageX;
                eventY = e.pageY;
                left = $this.offset().left;
                top = $this.offset().top;
                initOrder = $this.closest(op.folderItemWrapper).attr("_order");
                $cloneApp = $this.clone();
                $cloneApp.appendTo("body").css({"position":"absolute","left":left,"top":top});
                $this.addClass(op.dragClass);
                disableSelection(document.body);
            });
            $(document).live("mousemove",function(e){
                if(isMouseDown){
                    var distanceX = e.pageX - eventX;
                    var distanceY = e.pageY - eventY;
                    $cloneApp.css({"left":left+distanceX,"top":top+distanceY});
                }
            });
            $(document).live("mouseup",function(){
                if(isMouseDown){
                    isMouseDown = false;
                    if($cloneApp.position().top >= wrapperTop){
                        var order = Math.floor($cloneApp.position().left/wrapperWidth);
                        if(order<0){
                            order = 0;
                        }
                        $this.appendTo($(op.folderItemWrapper).eq(order));
                        var appId = $this.attr("_appId");
                        var thisObj;
                        $.each(apps[initOrder],function(i,n){
                            if(n.appId == appId){
                                thisObj = n;
                                apps[initOrder].splice(i,1);
                                return false;
                            }
                        });
                        apps[order].push(thisObj);                      
                    }
                    $cloneApp.remove();
                    $this.removeClass(op.dragClass);
                    enableSelection(document.body);                
                }
            });
        });
        
        //设置dom节点不可选
        function disableSelection(target){
            if (typeof target.style.WebkitUserSelect!="undefined") //Chrome route
                target.style.WebkitUserSelect="none"; 
            else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
                target.style.MozUserSelect="none";
            else if (typeof target.onselectstart!="undefined") //IE route
                target.onselectstart=function(){return false}
            else //All other route (ie: Opera)
                target.onmousedown=function(){return false}
        }
        //恢复节点可选
        function enableSelection(target){
            if(typeof target.style.WebkitUserSelect!="undefined") //Chrome route
                target.style.WebkitUserSelect=""; 
            else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
                target.style.MozUserSelect="";
            else if (typeof target.onselectstart!="undefined") //IE route
                target.onselectstart=function(){return true}
            else //All other route (ie: Opera)
                target.onmousedown=function(){return true}
        }

    }
 
 })(jQuery);