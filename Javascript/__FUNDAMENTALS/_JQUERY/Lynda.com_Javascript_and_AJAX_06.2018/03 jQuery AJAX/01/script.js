$('.update:even').load('./data.txt');

$.getJSON('./data.json', (data) => {
    $.each(data, function(i, obj) {
        // const wrapper = $('<div></div>').addClass('wrapper')
        //     .append(`<h2 ></h2>`).addClass('name').append('<strong></strong>').text(`Name: ${obj.name}`);
        const name = $(`<h2 class="name"></h2>`);
        const shortname = $(`<h3 class="shortname"><strong>Shortname: ${obj.shortname}</strong></h3>`);
        const reknown = $(`<p class="reknown"><strong>Reknown: ${obj.reknown}</strong></h3>`);
        const bio = $(`<p class="bio"> ${obj.bio}</p>`);
        const wrapper = $('<div class="wrapper"></div>').append(name, shortname, reknown, bio);
        console.log(obj.name); console.log(obj.shortname); console.log(obj.reknown); console.log(obj.bio);
        $('.container').append(wrapper);
        const stylesWrapper = {
            border: '2px solid green',
            padding: `0 20px`,
        };
        $('.wrapper').css(stylesWrapper);
    });
    // $('.update:last').html($(this));
    console.log('JSON loaded');
});
