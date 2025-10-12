$(document).ready(function () {
    $('.day-product__slider').slick({
        arrows: true,
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        centerPadding: 0,
        responsive: [
            {
                breakpoint: 1120,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                    centerMode: false,
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.reviews__slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        responsive: [
            {
                breakpoint: 1079,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    })

    $( function() {
        $( "#accordion" ).accordion();
    } );
})