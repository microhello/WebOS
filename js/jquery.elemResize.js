/**
 * @fileOverview
 * the script for Element resize
 * @author kuangyi
 * @version 2013-6-18
 */

;(function($){

    $.fn.elemResize = function(ops){
        var $this = $(this);
        var defaults = {
            "topLine":"",
            "rightLine":"",
            "bottomLine":"",
            "leftLine":"",
            "rightTopLine":"",
            "rightBottomLine":"",
            "leftBottomLine":"",
            "leftTopLine":""
        }
        var op = $.extend(defaults,ops);
        var $topLine = $this.find(op.topLine);
        var $rightLine = $this.find(op.rightLine);
        var $bottomLine = $this.find(op.bottomLine);
        var $leftLine = $this.find(op.leftLine);
        var $rightTopLine = $this.find(op.rightTopLine);
        var $rightBottomLine = $this.find(op.rightBottomLine);
        var $leftBottomLine = $this.find(op.leftBottomLine);
        var $leftTopLine = $this.find(op.leftTopLine);
        
        //上
        $topLine.live({         
            mousedown:function(e){
                $topLine.attr("_top",$this.position().top);
                $topLine.attr("_height",$this.height());
                $topLine.attr("_ePageY",e.pageY);
                $topLine.attr("_isMouseDown","1"); 
                $this.find("div.popWindow-bg-container:first").css({zIndex:5});
            }
        });
        $(document).live({
            mousemove:function(e){
                if($topLine.attr("_isMouseDown")){
                    var distanceY = parseInt($topLine.attr("_ePageY") - e.pageY);
                    if(!((distanceY <= 0 && $this.height() <= 185) || (distanceY >= 0 && $this.position().top <= 5))){
                        $this.css({"top":(parseInt($topLine.attr("_top"))-distanceY)+"px","height":(parseInt($topLine.attr("_height"))+distanceY)+"px"});
                    }                    
                }            
            },
            mouseup:function(e){
                $topLine.removeAttr("_isMouseDown");
                $this.find("div.popWindow-bg-container:first").css({zIndex:-1});
            }           
        });
        
        //右
        $rightLine.live({         
            mousedown:function(e){
                $rightLine.attr("_width",$this.width());
                $rightLine.attr("_ePageX",e.pageX);
                $rightLine.attr("_isMouseDown","1"); 
                $this.find("div.popWindow-bg-container:first").css({zIndex:5});
            }
        });
        $(document).live({
            mousemove:function(e){
                if($rightLine.attr("_isMouseDown")){
                    var distanceX = e.pageX - parseInt($rightLine.attr("_ePageX"));
                    if(!((distanceX <= 0 && $this.width() <= 250) || (distanceX >= 0 && $this.width() >= ($(window).width() - $this.position().left - 10)))){
                        $this.css({"width":(parseInt($rightLine.attr("_width"))+distanceX)+"px"});   
                    }                  
                }            
            },
            mouseup:function(e){
                $rightLine.removeAttr("_isMouseDown");
                $this.find("div.popWindow-bg-container:first").css({zIndex:-1});
            }           
        }); 

        //下        
        $bottomLine.live({         
            mousedown:function(e){
                $bottomLine.attr("_height",$this.height());
                $bottomLine.attr("_ePageY",e.pageY);
                $bottomLine.attr("_isMouseDown","1"); 
                $this.find("div.popWindow-bg-container:first").css({zIndex:5});
            }
        });
        $(document).live({
            mousemove:function(e){
                if($bottomLine.attr("_isMouseDown")){
                    var distanceY = e.pageY - parseInt($bottomLine.attr("_ePageY"));
                    $this.css({"height":(parseInt($bottomLine.attr("_height"))+distanceY)+"px"});                  
                }            
            },
            mouseup:function(e){
                $bottomLine.removeAttr("_isMouseDown");
                $this.find("div.popWindow-bg-container:first").css({zIndex:-1});
            }           
        });   

        //左
        $leftLine.live({         
            mousedown:function(e){
                $leftLine.attr("_left",$this.position().left);
                $leftLine.attr("_width",$this.width());
                $leftLine.attr("_ePageX",e.pageX);
                $leftLine.attr("_isMouseDown","1"); 
                $this.find("div.popWindow-bg-container:first").css({zIndex:5});
            }
        });
        $(document).live({
            mousemove:function(e){
                if($leftLine.attr("_isMouseDown")){
                    var distanceX = parseInt($leftLine.attr("_ePageX")) - e.pageX;
                    if(!((distanceX <= 0 && $this.width() <= 250) || (distanceX >= 0 && $this.width() >= ($(window).width() - $this.position().left - 10)))){
                        $this.css({"left":$leftLine.attr("_left")-distanceX,"width":(parseInt($leftLine.attr("_width"))+distanceX)+"px"});   
                    }                       
                }            
            },
            mouseup:function(e){
                $leftLine.removeAttr("_isMouseDown");
                $this.find("div.popWindow-bg-container:first").css({zIndex:-1});
            }           
        }); 

        //右上
        $rightTopLine.live({         
            mousedown:function(e){
                $rightTopLine.attr("_left",$this.position().left);
                $rightTopLine.attr("_top",$this.position().top);
                $rightTopLine.attr("_width",$this.width());
                $rightTopLine.attr("_height",$this.height());
                $rightTopLine.attr("_ePageX",e.pageX);  
                $rightTopLine.attr("_ePageY",e.pageY);          
                $rightTopLine.attr("_isMouseDown","1"); 
                $this.find("div.popWindow-bg-container:first").css({zIndex:5});
            }
        });
        $(document).live({
            mousemove:function(e){
                if($rightTopLine.attr("_isMouseDown")){
                    var distanceX = e.pageX - parseInt($rightTopLine.attr("_ePageX"));
                    var distanceY = parseInt($rightTopLine.attr("_ePageY") - e.pageY);
                    if(!((distanceX <= 0 && $this.width() <= 250) || (distanceX >= 0 && $this.width() >= ($(window).width() - $this.position().left - 10)))){
                        $this.css({"width":(parseInt($rightTopLine.attr("_width"))+distanceX)+"px"});   
                    }                    
                    if(!((distanceY <= 0 && $this.height() <= 185) || (distanceY >= 0 && $this.position().top <= 5))){
                        $this.css({"top":(parseInt($rightTopLine.attr("_top"))-distanceY)+"px","height":(parseInt($rightTopLine.attr("_height"))+distanceY)+"px"});
                    }                    
                }            
            },
            mouseup:function(e){
                $rightTopLine.removeAttr("_isMouseDown");
                $this.find("div.popWindow-bg-container:first").css({zIndex:-1});
            }           
        });   

        //右下
        $rightBottomLine.live({         
            mousedown:function(e){
                $rightBottomLine.attr("_width",$this.width());
                $rightBottomLine.attr("_height",$this.height());
                $rightBottomLine.attr("_ePageX",e.pageX);                               
                $rightBottomLine.attr("_ePageY",e.pageY);
                $rightBottomLine.attr("_isMouseDown","1"); 
                $this.find("div.popWindow-bg-container:first").css({zIndex:5});
            }
        });
        $(document).live({
            mousemove:function(e){
                if($rightBottomLine.attr("_isMouseDown")){
                    var distanceX = e.pageX - parseInt($rightBottomLine.attr("_ePageX"));
                    var distanceY = e.pageY - parseInt($rightBottomLine.attr("_ePageY"));                    
                    if(!((distanceX <= 0 && $this.width() <= 250) || (distanceX >= 0 && $this.width() >= ($(window).width() - $this.position().left - 10)))){
                        $this.css({"width":(parseInt($rightBottomLine.attr("_width"))+distanceX)+"px"});   
                    }
                    $this.css({"height":(parseInt($rightBottomLine.attr("_height"))+distanceY)+"px"});                     
                }            
            },
            mouseup:function(e){
                $rightBottomLine.removeAttr("_isMouseDown");
                $this.find("div.popWindow-bg-container:first").css({zIndex:-1});
            }           
        });  

        //左下
        $leftBottomLine.live({         
            mousedown:function(e){
                $leftBottomLine.attr("_left",$this.position().left);
                $leftBottomLine.attr("_width",$this.width());
                $leftBottomLine.attr("_height",$this.height());
                $leftBottomLine.attr("_ePageX",e.pageX);
                $leftBottomLine.attr("_ePageY",e.pageY);
                $leftBottomLine.attr("_isMouseDown","1"); 
                $this.find("div.popWindow-bg-container:first").css({zIndex:5});
            }
        });
        $(document).live({
            mousemove:function(e){
                if($leftBottomLine.attr("_isMouseDown")){
                    var distanceX = parseInt($leftBottomLine.attr("_ePageX")) - e.pageX;
                    var distanceY = e.pageY - parseInt($leftBottomLine.attr("_ePageY"));
                    if(!((distanceX <= 0 && $this.width() <= 250) || (distanceX >= 0 && $this.width() >= ($(window).width() - $this.position().left - 10)))){
                        $this.css({"left":$leftBottomLine.attr("_left")-distanceX,"width":(parseInt($leftBottomLine.attr("_width"))+distanceX)+"px"});   
                    }
                    $this.css({"height":(parseInt($leftBottomLine.attr("_height"))+distanceY)+"px"});                    
                }            
            },
            mouseup:function(e){
                $leftBottomLine.removeAttr("_isMouseDown");
                $this.find("div.popWindow-bg-container:first").css({zIndex:-1});
            }           
        }); 
        
        //左上
        $leftTopLine.live({         
            mousedown:function(e){
                $leftTopLine.attr("_left",$this.position().left);
                $leftTopLine.attr("_top",$this.position().top);
                $leftTopLine.attr("_width",$this.width());
                $leftTopLine.attr("_height",$this.height());
                $leftTopLine.attr("_ePageX",e.pageX);
                $leftTopLine.attr("_ePageY",e.pageY);
                $leftTopLine.attr("_isMouseDown","1"); 
                $this.find("div.popWindow-bg-container:first").css({zIndex:5});
            }
        });
        $(document).live({
            mousemove:function(e){
                if($leftTopLine.attr("_isMouseDown")){
                    var distanceX = parseInt($leftTopLine.attr("_ePageX")) - e.pageX;
                    var distanceY = parseInt($leftTopLine.attr("_ePageY") - e.pageY);
                    if(!((distanceX <= 0 && $this.width() <= 250) || (distanceX >= 0 && $this.width() >= ($(window).width() - $this.position().left - 10)))){
                        $this.css({"left":$leftTopLine.attr("_left")-distanceX,"width":(parseInt($leftTopLine.attr("_width"))+distanceX)+"px"});   
                    }  
                    if(!((distanceY <= 0 && $this.height() <= 185) || (distanceY >= 0 && $this.position().top <= 5))){
                        $this.css({"top":(parseInt($leftTopLine.attr("_top"))-distanceY)+"px","height":(parseInt($leftTopLine.attr("_height"))+distanceY)+"px"});
                    }                      
                }            
            },
            mouseup:function(e){
                $leftTopLine.removeAttr("_isMouseDown");
                $this.find("div.popWindow-bg-container:first").css({zIndex:-1});
            }           
        });         
    }

})(jQuery)