const request = new XMLHttpRequest();
request.open('GET', './data.txt', true);
request.onreadystatechange = function() {
    if ((request.status === 200) && (request.readyState === 4)) {
        console.log(request);
        const para1 = document.createElement('H1');
        // para1.appendChild(text1);
        para1.innerHTML = `AJAX PAge`;
        document.querySelector('body').appendChild(para1);
        const para2 = document.createElement('P');
        const text2 = document.createTextNode(`${request.responseText}`);
        para2.appendChild(text2);
        document.querySelector('body').appendChild(para2);
    }
};
request.send();

