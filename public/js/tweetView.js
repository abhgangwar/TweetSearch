jQuery(document).ready(function($) {
    $(".clickable").click(function() {
        window.open($(this).data("href"), "_blank");
    });
});