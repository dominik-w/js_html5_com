
/**
 * jQuery plugins dev
 */

/* template
(function($){
    $.fn.extend({
        pluginname: function(options) {
            this.defaultOptions = {};

            var settings = $.extend({}, this.defaultOptions, options);

            return this.each(function() {
                var $this = $(this);
            });
        }
    });
})(jQuery);
*/

// our simple app as jQ plugin
(function($) {
    var myApp = {};
    
    $.extend(myApp, {
        name: 'jQuery plugin demo',
        version: '0.1',
        
        init: function() {
            alert(this.name + " v. " + this.version);
        }
    });
    
    // init / run
    $(function() {
        // myApp.name = 'Changed name';
        // myApp.version = '0.3';
        myApp.init();
        
    });
    
})(jQuery);


