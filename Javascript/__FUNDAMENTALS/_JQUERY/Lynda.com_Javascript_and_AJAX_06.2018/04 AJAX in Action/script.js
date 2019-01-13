$('.search').bind('input', function() {
    console.log($('.search').val().length);
    if ($('.search').val().length === 0) {
        $('.container').html('');
    }
    $('.search').keyup(() => {
        if ($('.search').val().length === 0) {
            $('.container').html('');
            console.log($('.search').val().length);
        }
        const searchStr = $('.search').val().trim();
        // console.log(searchStr);
        const myExp = new RegExp(searchStr, 'i');
        // console.log(myExp);
        $.get('./data.json', (data) => {
            // console.log(data);
            let output = `<ul class="search-results">`;
            $.each(data, (index, val) => {
                // console.log(val.name);
                // console.log(val.name.search(myExp));
                if (searchStr.length !== 0) {
                    if (val.name.search(myExp) !== -1 ||
                        val.bio.search(myExp) !== -1) {
                        output += '<li class="search-results__item">';
                        output += '<h2 class="search-results__item--name">' + val.name + '</h2>';
                        output += `<img class="search-results__item--image" src='./images/${val.shortname}_tn.jpg'></img>`;
                        output += '<p class="search-results__item--bio">' + val.bio + '</p>';
                        output += '</li>';
                    }
                }
            });
            output += '</ul>';
            $('.container').html(output);
        });
        // .done(function() {
        //     console.log("second success");
        // })
        // .fail(function() {
        //     console.log("error");
        // })
        // .always(function() {
        //     console.log("finished");
        // });
    });
});
