/**
 * @fileOverview
 * the script for drag
 * @author kuangyi
 * @version 2013-6-18
 */

;(function($){

    $.fn.drag = function(ops){
        var $this = $(this);
        var defaults = {
            "dragElem":$this
        };
        var op = $.extend(defaults,ops);
        var $dragElem = op.dragElem;
        $this.live("mousedown",function(e){
            $this.attr("_offsetLeft",$dragElem.position().left); 
            $this.attr("_offsetTop",$dragElem.position().top);
            $this.attr("_ePageX",e.pageX);
            $this.attr("_ePageY",e.pageY);
            $this.attr("_isDrag","1");
            $dragElem.find("div.popWindow-bg-container:first").css({zIndex:5});
            disableSelection(document.body);
        });
        $(document).live({
            mousemove:function(e){
                if($this.attr("_isDrag")){
                    var left = parseInt($this.attr("_offsetLeft"))+(e.pageX-parseInt($this.attr("_ePageX")));
                    var top = parseInt($this.attr("_offsetTop"))+(e.pageY-parseInt($this.attr("_ePageY")));
                    if(top >= 0 && top < $(window).height()-28){
                        $dragElem.css({"top":top+"px"});
                    }
                    //if(left > 0 && left < $(window).width() - $this.width()){
                        $dragElem.css({"left":parseInt(left)+"px"});
                    //}
                }            
            },
            mouseup:function(e){
                $this.removeAttr("_isDrag");
                $dragElem.find("div.popWindow-bg-container:first").css({zIndex:-1});
                enableSelection(document.body);
            }
        });
        
        //判断鼠标是否移出浏览器或移到iframe
        document.onmouseout = function(e){
            var e = e||window.event;
            if(!(e.relatedTarget || e.toElement) || (e.relatedTarget || e.relatedTarget.tagName == "HTML") || (e.toElement || e.toElement.tagName == "HTML")  || (e.relatedTarget || e.relatedTarget.tagName == "IFRAME") || (e.toElement || e.toElement.tagName == "IFRAME")){
                if($this.attr("_isDrag")){
                    $this.attr("_isDocMouseout","1");
                }
            }
        }
        document.onmouseover = function(e){
            var e = e||window.event;
            if($this.attr("_isDrag")){
                $this.removeAttr("_isDocMouseout");
            }            
        }

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

})(jQuery)