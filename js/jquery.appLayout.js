/**
 * @fileOverview
 * the script for app layout
 * @author kuangyi
 * @version 2013-6-20
 */
 
 ;(function($){
 
    $.fn.appLayout = function(ops){
        var defaults = {
            "desktopContainer":"",
            "appBtnClass":"",
            "appWidth":150,
            "appHeight":100
        }
        var op = $.extend(defaults,ops);
        var $this = $(this);
        var wrapperHeight = $this.height();
        var $desktopContainer = op.desktopContainer;
        var appBtnClass = op.appBtnClass;
        var appWidth = op.appWidth;
        var appHeight = op.appHeight;

        $desktopContainer.each(function(){
            var $that = $(this);
            var $appBtns = $that.find("."+appBtnClass);
            var appNum = $appBtns.length;
            var lineNum = Math.floor(wrapperHeight/appHeight);
            $appBtns.each(function(index,domElem){
                var leftPos = Math.floor(index/lineNum) * appWidth;
                var topPos = (index%lineNum) * appHeight;
                $(domElem).css({"left":leftPos+"px","top":topPos+"px"});
            });
        });

    }
 
 })(jQuery);