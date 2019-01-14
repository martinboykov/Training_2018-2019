function fakeAjax(url, cb) {
	const fake_responses = {
		'file1': 'The first text',
		'file2': 'The middle text',
		'file3': 'The last text',
	};
	const randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;
	// console.log(randomDelay);
	console.log('Requesting: ' + url);

	setTimeout(function() {
		cb(fake_responses[url]);
	}, randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
// The old-n-busted callback way
const arr = [];
function getFile(file) {
	fakeAjax(file, function(text) {
		// what do we do here? => callback
		if (text === 'The first text') {
			arr[0] = (text);
			console.log(arr[0]);
		} else if (text === 'The middle text') {
			arr[1] = (text);
			console.log(arr[1]);
		} else if (text === 'The last text') {
			arr[2] = (text);
			console.log(arr[2]);
		}
		if (arr[0] && arr[1] && arr[2]) {
			console.log('Complete');
		}
	});
}

// request all files at once in "parallel"
getFile('file1');
getFile('file2');
getFile('file3');
