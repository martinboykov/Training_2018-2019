const request = new XMLHttpRequest();
request.open('GET', './data.txt', true);
request.onreadystatechange = function() {
    if ((request.status === 200) && (request.readyState === 4)) {
        console.log(request);
        const para1 = document.querySelector('h1');
        para1.innerHTML = `AJAX Page`;
        const para2 = document.querySelectorAll('li');
        const text2 = request.responseText;
        // para2[2].innerHTML = text2;
        let count = 1;
        para2.forEach(function(para) {
            para.innerHTML = text2 + `li - ` + count;
            count += 1;
        });
    }
};
request.send();

