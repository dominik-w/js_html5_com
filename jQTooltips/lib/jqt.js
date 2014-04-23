/*
 * Wlasne tooltipy w jQuery 
 * 
 * Dominik Wlazlowski
 * http://javascript-html5-tutorial.pl/tutorial-jquery-wlasne-tooltipy.html
 */

$(document).ready(function() {
    // dodajemy element do ciala dokumentu
    $("body").append("<span id='own-tooltip'></span>");
    
    // dla elementu a posiadajacego atrybut title pokazujemy tooltip
    $("a[title]").each(function() {
        $(this).hover(function(e) {
            // pokaz tooltip pod elementem
            $().mousemove(function(e) {
                var dY = e.pageY + 4;
                var dX = e.pageX + 4;
                $("#own-tooltip").css({'top': dY, 'left': dX});
            });
            $("#own-tooltip").stop(true, true);
            
            // pobierz tekst z atrybutu title i ustaw go jako 
            // tekst tooltipa
            $("#own-tooltip")
                .html($(this).attr('title'))
                // i pokaz tooltip z efektem fadeIn
                .fadeIn(100);
            $(this).removeAttr('title');
        }, function() {
            $("#own-tooltip").stop(true, true);
            // ukryj z efektem fadeOut
            $("#own-tooltip").fadeOut(100);
            // wyczysc
            $(this).attr('title', $("#own-tooltip").html());
        });
    });
});
