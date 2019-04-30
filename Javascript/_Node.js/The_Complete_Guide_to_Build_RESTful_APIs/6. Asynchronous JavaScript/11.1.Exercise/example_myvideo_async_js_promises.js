function fakeAjax(url) {
	const fakeResponses = {
		'file1': 'the first text',
		'file2': 'the middle text',
		'file3': 'the last text',
	};
	const randomDelay = (Math.round(Math.random() * 1E3) % 8000) + 1000;

	console.log('Requesting: ' + url);

	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			if (!fakeResponses[url]) {
				reject(new Error('No such url!'));
			}
			console.log(`data from ${fakeResponses[url]} recieved`);
			resolve(fakeResponses[url]);
		}, randomDelay);
	});
}

function output(text) {
	console.log(text);
}

function getFiles1(file1, file2, file3) {
	console.log(
		`***************************************
| TRUE PARRALLEL WITH PROMISE.THEN |
***************************************`);
	Promise.resolve(fakeAjax(file1)).then((result) => output(result));
	Promise.resolve(fakeAjax(file2)).then((result) => output(result));
	Promise.resolve(fakeAjax(file3)).then((result) => output(result));
	// reject(new Error('some error'));
}

function getFiles2(file1, file2, file3) {
	console.log(
		`***************************************
| CONCURRENT START WITH PROMISE.ALL |
***************************************`);
	Promise.all(
		[fakeAjax(file1), fakeAjax(file2), fakeAjax(file3)])
		.then(([first, middle, last]) => {
			output(first);
			output(middle);
			output(last);
		});
	// reject(new Error('some error'));
}


function getFiles3(file1, file2, file3) {
	console.log(
		`***************************************
| SEQUENTIAL START WITH PROMISE.THEN |
***************************************`);
	fakeAjax(file1)
		.then((result) => output(result))
		.then(() => fakeAjax(file2))
		.then((result) => output(result))
		.then(() => fakeAjax(file3))
		.then((result) => output(result));
	// reject(new Error('some error'));
}


getFiles1('file1', 'file2', 'file3');
setTimeout(function() {
	return getFiles2('file1', 'file2', 'file3');
}, 2000);

setTimeout(function() {
	return getFiles3('file1', 'file2', 'file3');
}, 4000);
