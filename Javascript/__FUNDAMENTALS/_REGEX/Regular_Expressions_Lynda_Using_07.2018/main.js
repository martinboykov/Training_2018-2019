let regex = '';
let searchStr = '';
let flags = '';
let myExp = new RegExp(regex, `${flags}`);

$('.flags').keyup(() => {
    if ($('.flags').val().length === 0) {
        $('.container-flags').html('');
        // console.log($('.regex').val());
    }
    flags = $('.flags').val().trim();
    // console.log(myExp);
    // myArray = searchStr.match(regex);
    myExp = new RegExp(regex, `${flags}`);
    findMatch(regex, flags, searchStr);
});
$('.regex').keyup(() => {
    if ($('.regex').val().length === 0) {
        $('.container-regex').html('');
        // console.log($('.regex').val());
    }
    regex = $('.regex').val().trim();
    findMatch(regex, flags, searchStr);
});


$('.search').keyup(() => {
    if ($('.search').val().length === 0) {
        // $('.container-searched').html('');
        // console.log($('.search').val());
    }
    searchStr = $('.search').val().trim();
    findMatch(regex, flags, searchStr);
});

function findMatch(r, f, s) {
    myExp = new RegExp(r, `${f}`);
    // console.log(searchStr);
    // myArray = searchStr.match(regex);
    const arrayMatch = s.match(myExp);

    $('.container-searched').html(arrayMatch.toString());
    // console.log(arrayMatch);
    let arraySearch;
    if (f.length !== 0 && s.length !== 0) {
        while ((arraySearch = myExp.exec(s)) !== null) {
           console.log(`Found ${arraySearch[0]} at ${arraySearch.index}. Next starts at ${myExp.lastIndex}.`);
            // // expected output: "Found foo. Next starts at 9."
            // // expected output: "Found foo. Next starts at 19."
            // s = s.slice(myExp.lastIndex);
            // console.log(s);
            // console.log(arraySearch);
            console.log(f);
        }
    }
    // for (let index = 0; index < arraySearch.length; index++) {
    //     console.log(arraySearch[index]);
    // }
}
