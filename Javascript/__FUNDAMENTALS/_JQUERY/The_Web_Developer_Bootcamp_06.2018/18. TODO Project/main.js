const plusSign = $('.header__icon');
const addNEwTodo = $('.main__add--new-todo');
let mainList = $('.main__list');
let mainListItem = $('.main__list--item');
let mainListItemText = $('.main__list--item-text');
let trashIcon = $('.main__list--item-icon');

console.log(trashIcon);

plusSign.on('click', function() {
    addNEwTodo.toggle();
});
function functionAddEventListeners() {
    // mainListItem.on('mouseenter ', function() {
    //     // $(this).children('.main__list--item-icon').css('display', 'flex');
    //     // const styles = {
    //     //     display: 'flex',
    //     //     marginLeft: '-52px',
    //     //     opacity: '0',
    //     // };
    //     $(this).children('.main__list--item-icon').animate({
    //         opacity: 1,
    //         width: '52px',
    //     }, 200);
    //     // // $(this).children('.main__list--item-icon').fadeIn(1000, function(){
    //     // //     $(this).css('display', 'flex');
    //     // // });
    // });
    // mainListItem.on('mouseleave ', function() {
    //     $(this).children('.main__list--item-icon').animate({
    //         opacity: 0,
    //         width: '0px',
    //     }, 200);
    // });
    mainListItemText.on('click', function() {
        const stylesOn = {
            textDecoration: 'line-through',
            color: '#afafae',
        };
        const stylesOff = {
            textDecoration: 'none',
            color: '#838382',
        };
        const textDecorText = $(this).css('text-decoration').split(' ')[0];
        // console.log(textDecorText);
        if (textDecorText !== 'line-through') {
            $(this).css(stylesOn);
        } else {
            $(this).css(stylesOff);
        }
    });
    trashIcon.on('click', function(e) {
        $(this).parent().fadeOut(1000, function() {
            console.log($(this));
            $(this).remove();
        });

        // e.target.pa.toggle();
    });
}
functionAddEventListeners();


addNEwTodo.keyup(function(event) {
    // console.log(event);
    const value = $(event.target).val();
    // console.log(value);
    if (event.which === 13 && value.length > 0) {
        const currentHtml = mainList.html();
        const addition = `<div class="main__list--item">
            <div class="main__list--item-icon">
                <i class="fa fa-trash-o"></i>
            </div>
            <div class="main__list--item-text">${value}</div>`;
        mainList.html(`${currentHtml + addition}`);
        mainList = $('.main__list');
        mainListItem = $('.main__list--item');
        mainListItemText = $('.main__list--item-text');
        trashIcon = $('.main__list--item-icon');
        functionAddEventListeners();
        addNEwTodo.val('');

    }
    // if (addNEwTodo.length !== 0) {
    //     const value = $(this).val();
    //     console.log(value);
    //     addNEwTodo.('keypress')

    // }
});

addNEwTodo.on('mouseleave ', function() {
    addNEwTodo.val('');
});
