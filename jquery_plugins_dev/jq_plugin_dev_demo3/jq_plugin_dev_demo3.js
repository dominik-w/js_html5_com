
/**
 * jQuery plugins development demo
 * 
 * by javascript-html5-tutorial.com
 */

(function($) {
    
    $.fn.randStrGenerator = function(options) {
        
        options = $.extend({
            minLength: 7,
            randomStrLength: 12,
            theBox: this
        }, options);
        
        return this.each(function(index) {
            
            // run automatically
            evaluate();
            
            function evaluate() {
                var randomPassword = generate();
                
                $(options.theBox).val(randomPassword);
            }
            
            function generate() {
                var input_chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!?$?%^&*()";
                var str_length = options.randomStrLength;
                var rnd_str = '';
                
                for (var i = 0; i < str_length; i++) {
                    var rnd_num = Math.floor(Math.random() * input_chars.length);
                    rnd_str += input_chars.substring(rnd_num, rnd_num + 1);
                }
                
                return rnd_str;
            }
        });
        
    }

})(jQuery)

