console.log($('h1').text('New Text...'));
console.log($('h1').text());
$('li').text('Rusty, Josh, Molly');
console.log($('ul').html());
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


// $('input').change(function() {
//     console.log($('input').val());
//     $('img').css('border-color', `${$('input').val()}`);
// })
// $('select').change(function() {
//     console.log($('select').val());
//     $('img').css('border-style', `${$('select').val()}`);
// })


const colorWell = document.querySelector("#colorWell");
const defaultColor = "#ffffff";
// colorWell.addEventListener("input", updateFirst);

//  function updateFirst(event) {
//      var img = document.querySelector("img");
//      if (img) {
//         img.style.borderColor = event.target.value;
//      }
//  }
colorWell.addEventListener('change', updateAll);
function updateAll(event) {
    console.log(event.target.value);
    document.querySelectorAll("img").forEach(function(img) {
        img.style.borderColor = event.target.value;
    });
}


// window.addEventListener("load", startup);
// function startup() {
//     colorWell = document.querySelector("#colorWell");
//     colorWell.value = defaultColor;
//     colorWell.addEventListener("input", updateFirst);
//     colorWell.addEventListener("change", updateAll);
//     colorWell.select();
// }
// function updateFirst(event) {
//     var li = document.querySelector("li");

//     if (li) {
//         li.style.color = event.target.value;
//     }
// } function updateAll(event) {
//     document.querySelectorAll("li").forEach(function(p) {
//         p.style.color = event.target.value;
//     });
// }

