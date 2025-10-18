$(document).ready(function () {
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



    const tab = document.querySelector('.products__tab');
    const buttons = tab.querySelectorAll('.products__tab-choice-btn');
    let activeBtn = tab.querySelector('.active');

    function moveHighlight(btn) {
        const rect = btn.getBoundingClientRect();
        const tabRect = tab.getBoundingClientRect();

        const width = rect.width;
        tab.style.setProperty('--hl-width', `${width}px`);
        const left = rect.left - tabRect.left - 1.6;
        tab.style.setProperty('--hl-left', `${left}px`);
    }

    moveHighlight(activeBtn);

    buttons.forEach((btn) => {
        btn.addEventListener('mouseenter', () => {
            moveHighlight(btn);
            if (btn !== activeBtn) {
                activeBtn.classList.remove('active');
            }
        });

        btn.addEventListener('mouseleave', () => {
            moveHighlight(activeBtn);
            activeBtn.classList.add('active');
        });

        btn.addEventListener('click', () => {
            if (activeBtn !== btn) {
                activeBtn.classList.remove('active');
                btn.classList.add('active');
                activeBtn = btn;
                moveHighlight(activeBtn);
            }
        });
    });

})