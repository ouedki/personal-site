$(function() {

    var Page = (function() {

        var $navArrows = $( '#nav-arrows' ).hide(),
            $shadow = $( '#shadow' ).hide(),
            slicebox = $( '#sb-slider' ).slicebox( {
                onReady : function() {

                    $navArrows.show();
                    $shadow.show();

                },
                orientation : 'r',
                cuboidsRandom : true,
                disperseFactor : 30
            } ),

            init = function() {

                initEvents();

            },
            initEvents = function() {

                // add navigation events
                var next = function() {

                    slicebox.next();
                    return false;
                };

                setInterval(next, 2000);

                $navArrows.children( ':last' ).on( 'click', function() {

                    slicebox.previous();
                    return false;

                } );

            };

        return { init : init };

    })();

    Page.init();

});