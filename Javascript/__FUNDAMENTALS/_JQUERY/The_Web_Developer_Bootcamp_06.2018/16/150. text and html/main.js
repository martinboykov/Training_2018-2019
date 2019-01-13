console.log($('h1').text('New Text...'));
console.log($('h1').text());
$('li').text('Rusty, Josh, Molly');
console.log($('ul').html());
$('ul').html('<li>New Li 1</li><li>New Li 2</li><li>New Li 3</li>');
$('li:nth-child(3)').css('color', 'blue')
    .html(`<a href='google.com'>CLICK ME TO GO TO GOOGLE</a>`);
