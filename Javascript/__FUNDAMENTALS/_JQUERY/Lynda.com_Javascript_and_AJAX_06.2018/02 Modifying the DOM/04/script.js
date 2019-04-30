const button = document.querySelector('.load');
window.addEventListener('load', loadAJAX);
button.addEventListener('click', () => {
    document.querySelector('.container').classList.toggle('show');
});
// button.addEventListener('click', loadAJAX);
function loadAJAX() {
    const request = new XMLHttpRequest();
    request.open('GET', './data.json', true);
    request.addEventListener('progress', updateProgress);
    request.addEventListener('load', transferComplete);
    request.addEventListener('error', transferFailed);
    request.addEventListener('abort', transferCanceled);
    const progressBar = document.querySelector('#progress');

    function updateProgress(oEvent) {
        const percentComplete = oEvent.loaded / oEvent.total * 100;
        progressBar.max = oEvent.total;
        progressBar.value = oEvent.loaded;
        console.log(progressBar.value);
        console.log(percentComplete);
    }

    function transferComplete(evt) {
        console.log('The transfer is complete.');
    }

    function transferFailed(evt) {
        console.log('An error occurred while transferring the file.');
    }

    function transferCanceled(evt) {
        console.log('The transfer has been canceled by the user.');
    }

    request.onreadystatechange = function() {
        if ((request.status === 200) && (request.readyState === 4)) {
            // console.log(request);
            const h1 = document.querySelector('h1');
            h1.innerHTML = `AJAX Page`;
            const speakers = JSON.parse(request.responseText);
            console.log(speakers);
            // const speakers = request.responseXML.querySelectorAll('speaker');
            let counter = 1;
            speakers.forEach((speaker) => {
                const wrapper = document.createElement('DIV');
                wrapper.className = 'wrapper-' + counter;
                wrapper.innerHTML = `
                 <h2 class='name'><strong>Name: </strong></h2>
                 <h3 class='shortname'><strong>Shortname: </strong></h3>
                 <p class='reknown'><strong>Reknown: </strong></p>
                 <p class='bio'></p>`;
                document.querySelector('.container').appendChild(wrapper);
                for (const child in speaker) {
                    if (speaker.hasOwnProperty(child)) {
                        // console.log(speaker[child]);
                        // console.log(`.wrapper-${counter} .${child}`);
                        const text = document.createTextNode(`${speaker[child]}`);
                        document.querySelector(`.wrapper-${counter} .${child}`).appendChild(text);
                    }
                }
                counter += 1;
            });
        } else {
            console.log('...');
        }
    };
    request.send();
}

