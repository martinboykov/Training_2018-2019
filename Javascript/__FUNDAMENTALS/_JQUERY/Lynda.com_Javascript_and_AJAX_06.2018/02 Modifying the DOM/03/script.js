const request = new XMLHttpRequest();
request.open('GET', './data.xml');
request.onreadystatechange = function() {
    if ((request.status === 200) && (request.readyState === 4)) {
        // console.log(request.responseURL);
        // console.log(request.responseXML);
        // console.log(request.responseType);
        const speakers = request.responseXML.querySelectorAll('speaker');
        let counter = 1;
        speakers.forEach((speaker) => {
            const wrapper = document.createElement('DIV');
            wrapper.className = 'speaker-' + counter;
            wrapper.innerHTML = `
            <h2 class="name"><strong>Name: </strong></h2>
            <h3 class="shortname"><strong>Shortname: </strong></h3>
            <p class="reknown"><strong>Reknown: </strong></p>
            <p class="bio"></p>`;
            // console.log(wrapper);
            document.querySelector('.container').appendChild(wrapper);
            let descCounter = 0;
            Array.prototype.slice.call(speaker.children).forEach((child) => {
                // console.log(child);
                const text = document.createTextNode(`${child.innerHTML}`);
                document.querySelector(`.speaker-${counter} .${child.localName}`).appendChild(text);
                descCounter += 1;
            });
            counter += 1;
        });
    }
};
request.send();

