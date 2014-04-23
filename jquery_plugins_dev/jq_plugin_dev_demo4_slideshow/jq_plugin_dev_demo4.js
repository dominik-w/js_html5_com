
/**
 * jQuery plugins development demo - slide show
 * 
 * by javascript-html5-tutorial.com
 */

(function($) {
    $.mySlideShow = function(element, settings) {
        
        // setup
        var config = {
            'fadeSpeed': 500,
            'delay': 1000
        };
        
        if (settings) {
            $.extend(config, settings);
        }
        
        var obj = $(element);
        var img = obj.children('img');
        var count = img.length;
        var i = 0;
        
        // display first image
        img.eq(0).show();
        
        // run
        setInterval(function() {
            img.eq(i).fadeOut(config.fadeSpeed);
            
            i = (i + 1 == count) ? 0 : i + 1;
            img.eq(i).fadeIn(config.fadeSpeed);
        }, config.delay);
        
        return this;
    };
	
})(jQuery);
