// Fires whenever a player has finished loading
function onPlayerReady(event) {
    event.target.playVideo();
}

// Fires when the player's state changes.
function onPlayerStateChange(event) {
    // Go to the next video after the current one is finished playing
    if (event.data === 0) {
        $.fancybox.close();
    }
}

$(document).ready(function () {
    $(".fancybox")
        .attr('rel', 'gallery')
        .fancybox({
            openEffect  : 'none',
            closeEffect : 'none',
            nextEffect  : 'none',
            prevEffect  : 'none',
            padding     : 0,
            margin      : 50,
            beforeShow  : function() {
                // Find the iframe ID
                var id = $.fancybox.inner.find('iframe').attr('id');
                
                // Create video player object and add event listeners
                var player = new YT.Player(id, {
                    events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onPlayerStateChange
                    }
                });
            }
        });
});