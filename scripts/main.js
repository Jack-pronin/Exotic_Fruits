$(document).ready(function () {
    $('.day-product__slider').slick({
        arrows: true,
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        centerMode: true,
        centerPadding: 0,
    });

    $('.reviews__slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
    })
})