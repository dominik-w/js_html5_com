
/**
 * jQuery plugins development demo
 * 
 * by javascript-html5-tutorial.com
 */

(function($) {
    
    // we extend jQ by new simple function 
    $.fn.myFunctionExt = function(param) {
        alert("The parameter is: " + param);
    };
    
    // standard CSS modifier for elements
    $.fn.myCSSModifier = function() {
        
        return this.css({
            margin: '5px',
            padding: '5px',
            border: 'solid 2px #f00',
        });
    };
    
    // plugin code
    $.mySimplePlugin = function(options) {
        
        // define properties and methods
        var str = 'abdef',
        number = 128,
        arr = ['One', 'Two', 'Three', '...'],
        
        actions = {
            test_alert: function() {
                this.myFunctionExt('X1');
                
                // this.myFunctionExt(str);
                this.myFunctionExt(arr[1]);
            },
            
            test_css: function() {
                // apply for all elements in body
                // this.myCSSModifier();
                
                // apply only for specified element
                $('#d2').myCSSModifier();
            },
            
            default_action:  function() {
                alert('Bye bye!');
            }
        },
        
        // core processing - options
        
        body = $('body');
        
        if (options) {
            // multiple options
            if (typeof options == 'object') {
                for(i in options) {
                    if (options[i] != false && actions[i]) {
                        actions[i].call(body);
                    }
                }
            } else {
                // string - one option
                if (actions[options]) {
                    actions[options].call(body);
                }
            }
        } else {
            // no option specified - call default
            return actions['default_action'].call(body);
        }
        
    };
    
})(jQuery);

