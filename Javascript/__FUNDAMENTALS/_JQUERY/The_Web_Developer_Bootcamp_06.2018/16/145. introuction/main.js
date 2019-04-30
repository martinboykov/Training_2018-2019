// $('.adorable').css('color', 'red');
// document.querySelector('.adorable').setAttribute('style', 'color: red; ');
const styles = {
    color: 'red',
    background: 'yellow',
    border: '2px solid purple',
};
$('h1').css(styles);

$('li').css('color', 'blue');
// [].slice.call(document.
//     querySelectorAll(`li`)).forEach((li) => {
//         li.setAttribute('style', 'color: blue;');
//     });

$('a').css('font-size', '18px');
$('li').css({
    fontSize: '16px',
    border: '1px dashed purple',
    background: 'rgba(89,45,20,0.1)',
});
