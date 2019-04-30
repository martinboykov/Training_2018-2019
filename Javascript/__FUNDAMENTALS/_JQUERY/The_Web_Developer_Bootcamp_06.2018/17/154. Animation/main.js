$('.click-items').on('click', function() {
    $('.item').fadeToggle(1600, "linear", (function() {
        console.log('show');
    }));
    // if ($('.item').css('display') === 'none') {
    //     $('.item').fadeIn(1600, "linear", (function() {
    //         console.log('show');
    //     }));
    // } else {
    //     $('.item').fadeOut(1600, "linear", (function() {
    //         console.log('hide');
    //         // $(this).remove();
    //     }));
    // }
    //
});

$('.item').on('click', function() {
    if ($(this).css('display') === 'none') {
        $(this).slideDown(1600, "linear");
        console.log('show');
    } else {
        $(this).slideUp(1600, "linear");
        console.log('hide');
    }
})


$('h1').addClass('correct');
$('h1').removeClass('correct');


$('li').text('Rusty, Josh, Molly');
$('ul').html('<li>New Li 1</li><li>New Li 2</li><li>New Li 3</li>');
$('li:nth-child(3)').css('color', 'blue')
    .html(`<a href='google.com'>CLICK ME TO GO TO GOOGLE</a>`);

$('img').attr('alt', );
$('img').attr('width', '120px');
const styles = {
    border: `3px ${$('select').val()} ${$('input').val()}`,
    boxShadow: '10px 10px 8px #888888',
};
$('img').attr({
    alt: 'Picture of Georg Karl Julius Hackenschmidt',
    title: 'Photo by Kelly Clark',
    width: '120px',
    // style: 'border: 3px dashed green; box-shadow: 10px 10px 8px #888888;',
}).css(styles);

$('li').addClass('wrong');
$('li').removeClass('wrong').addClass('correct');
$('li').first().toggleClass('done');
$('li').toggleClass('done');


$('img').click(function() {
    $(this).toggleClass('selected');
});
$(".title-input")
    .keyup(function(event) {
        console.log(event);
        if ($('.selected').length !== 0) {
            const value = $(this).val();
            $('.selected').attr('title', value);
            console.log(value);
        }
    });
$('input').change(function() {
    if ($('.selected').length !== 0) {
        $('.selected').css('border-color', `${$('input').val()}`);
    }
})
$('select').change(function() {
    if ($('.selected').length !== 0) {
        $('.selected').css('border-style', `${$('select').val()}`);
    }
});

