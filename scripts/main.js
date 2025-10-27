$(document).ready(function () {
    new WOW({
        animateClass: 'animate__animated',
    }).init();

    $('.day-product__slider').slick({
        arrows: true,
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        centerPadding: 0,
        responsive: [{
            breakpoint: 1120, settings: {
                vertical: false, verticalSwiping: false, centerMode: false, slidesToShow: 3, slidesToScroll: 1
            }
        }]
    });

    $('.reviews__slider').slick({
        slidesToShow: 2, slidesToScroll: 1, infinite: true, responsive: [{
            breakpoint: 1079, settings: {
                slidesToShow: 1,
            }
        }]
    });

    $("#accordion").accordion();

    $('.main__btn').click(function () {
        $('#products')[0].scrollIntoView({behavior: 'smooth'});
    });

    $('#burger').click(function () {
        $('.menu').addClass('open');
    });

    $('.menu *').each(function () {
        $(this).click(function () {
            $('.menu').removeClass('open');
        });
    });

    let endTime = new Date().getTime() + (26 * 60 * 60 + 55 * 60 + 30) * 1000;

    let timerInterval = setInterval(function () {
        let now = new Date().getTime();
        let diff = Math.floor((endTime - now) / 1000);

        if (diff < 0) diff = 0;

        let hours = Math.floor(diff / 3600);
        let minutes = Math.floor((diff % 3600) / 60);
        let seconds = diff % 60;

        $('#hours').text(hours);
        $('#minutes').text(minutes);
        $('#seconds').text(seconds);

        if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(timerInterval);
        }

    }, 1000);

    const tab = $('.products__tab');
    const buttons = tab.find('.products__tab-choice-btn');
    let activeBtn = tab.find('.active');
    let buttonPositions = [];

    function cacheButtonPositions() {
        buttonPositions = [];
        const tabRect = tab[0].getBoundingClientRect();

        buttons.each(function () {
            const rect = this.getBoundingClientRect();
            buttonPositions.push({
                left: rect.left - tabRect.left,
                width: rect.width
            });
        });
    }

    function moveHighlight(btn) {
        const index = buttons.index(btn);
        if (index === -1) return;
        const pos = buttonPositions[index];
        if (!pos) return;

        tab.css('--hl-width', `${pos.width}px`);
        tab.css('--hl-left', `${pos.left}px`);
    }

    cacheButtonPositions();
    moveHighlight(activeBtn);

    buttons.on('mouseenter', function () {
        const btn = $(this);
        moveHighlight(btn);
        if (btn[0] !== activeBtn[0]) {
            activeBtn.removeClass('active');
        }
    });

    buttons.on('mouseleave', function () {
        moveHighlight(activeBtn);
        activeBtn.addClass('active');
    });

    buttons.on('click', function () {
        const btn = $(this);
        if (activeBtn[0] !== btn[0]) {
            activeBtn.removeClass('active');
            btn.addClass('active');
            activeBtn = btn;
            moveHighlight(activeBtn);
        }

        const filter = btn.data('filter');
        const cards = $('.products__item');

        cards.each(function () {
            const item = $(this);
            const categories = item.data('category')?.split(' '); // например data-category="rare new"

            if (filter === 'all' || (categories.includes(filter))) {
                item.fadeIn(300);
            } else {
                item.hide();
            }
        });
    });

    const mainImg = $('.day-product__img');

    $('.day-product__slider__item').click(function () {
        const newSrc = $(this).find('.day-product__slider__img').attr('src');

        mainImg.fadeOut(200, function () {
            mainImg.attr('src', newSrc).fadeIn(200);
        });
    });

    const makeOrderButtons = $('.make-order');
    const orderWindow = $('.order');

    $('.order__close').click(function () {
        orderWindow.hide();
    });

    makeOrderButtons.click(function () {
        orderWindow.css('display', 'flex');
        const fruit = $(this).data('fruit');
        $(`input[name="fruits"][value="${fruit}"]`).prop('checked', true);
    });

    let form = $('form');
// let loader = $('.loader__display');
    let thankYouMsg = $('#thankYouMessage');
    let orderTittle = $('.order__title');
    let orderText = $('.order__text');
    let phone = $('#phone');

    phone.inputmask({"mask": "+7 (999) 999-99-99"});


    $('#submit').click(function () {
        let name = $('#name');
        let errorInput = $('.order__error');
        let hasError = false;
        let fruits = $('input[name="fruits"]:checked')
            .map(function () {
                return $(this).val();
            })
            .get();

        errorInput.hide();
        name.css('border-color', 'rgb(30, 51, 19)');
        phone.css('border-color', 'rgb(30, 51, 19)');


        if (!(fruits[0])) {
            errorInput.eq(0).show();
            hasError = true;
        }

        if (!name.val()) {
            name.css('border-color', 'red');
            name.next().show();
            hasError = true;
        }

        if (!phone.inputmask('isComplete')) {
            phone.css('border-color', 'red');
            phone.next().show();
            hasError = true;
        }

        if (!hasError) {
            //ajax запрос
            // loader.css('display', 'flex');

            $.ajax({
                method: "POST",
                url: "http://testologia.ru/checkout",
                data: {name: name.val(), phone: phone.val(), fruits: fruits}
            })
                .done(function (msg) {
                    // loader.hide();
                    if (msg.success) {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    } else {
                        form.hide();
                        orderTittle.hide()
                        orderText.hide()
                        thankYouMsg.css('display', 'flex');
                        setTimeout(function () {
                            form[0].reset();
                            thankYouMsg.hide();
                            orderTittle.fadeIn("slow", function () {
                            });
                            orderText.fadeIn("slow", function () {
                            });
                            form.fadeIn("slow", function () {
                            });
                        }, 3000);
                    }
                });
        }
    });
})