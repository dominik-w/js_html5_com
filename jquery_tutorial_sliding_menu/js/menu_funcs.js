
/**
 * Sliding horizontal menu, using jQuery and jquery.easing plugin
 * 
 * by http://javascript-html5-tutorial.com/
 */

$(document).ready(function () {
    
    $("div#jq_menu ul li a").hover(function() {
        
        if ($(this).is(":animated")) {
            $(this).stop().animate({width: "300px"}, {duration: 360, easing: "easeOutQuad"});
        } else {
            $(this).stop().animate({width: "300px"}, {duration: 360, easing: "easeOutQuad"});
        }
    },
    turn_back = function () {
        
        if ($(this).is(":animated")) {
            $(this).stop().animate({width: "90px"}, {duration: 360, easing: "easeInOutQuad"});
        } else {
            $(this).stop(":animated").animate({width: "90px"}, {duration: 360, easing: "easeInOutQuad"});
        }
    });
    
});
