// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

// fake http request
const resolveAfter2Seconds = function() {
  console.log('starting slow promise');
  return new Promise((resolve) => {
    setTimeout(function() {
      resolve(20);
      console.log('slow promise is done');
    }, 2000);
  });
};

// fake http request
const resolveAfter1Second = function() {
  console.log('starting fast promise');
  return new Promise((resolve) => {
    setTimeout(function() {
      resolve(10);
      console.log('fast promise is done');
    }, 1000);
  });
};

const sequentialStart = async function() {
  console.log('==SEQUENTIAL START==');
  // eslint-disable-next-line max-len
  const slow = await resolveAfter2Seconds(); // If the value of the expression following the await operator is not a Promise, it's converted to a resolved Promise.
  const fast = await resolveAfter1Second();
  console.log(slow);
  console.log(fast);
};

const concurrentStart = async function() {
  console.log('==CONCURRENT START with await==');
  const slow = resolveAfter2Seconds(); // starts timer immediately
  const fast = resolveAfter1Second();

  console.log(await slow);
  // eslint-disable-next-line max-len
  console.log(await fast); // waits for slow to finish, even though fast is already done!
};

const stillSerial = function() {
  console.log('==CONCURRENT START with Promise.all==');
  // eslint-disable-next-line max-len
  Promise.all([resolveAfter1Second(), resolveAfter2Seconds()]).then(([slow, fast]) => {
    console.log(slow);
    console.log(fast);
  });
};

const parallel = function() {
  console.log('==PARALLEL with Promise.then==');
  // eslint-disable-next-line max-len
  resolveAfter2Seconds().then((message) => console.log(message)); // in this case could be simply written as console.log(resolveAfter2Seconds());
  resolveAfter1Second().then((message) => console.log(message));
};

sequentialStart(); // takes 2+1 seconds in total
// wait above to finish
setTimeout(concurrentStart, 4000); // takes 2 seconds in total
// wait again
setTimeout(stillSerial, 7000); // same as before (2s)
// wait again
setTimeout(parallel, 10000); // trully parallel (2s)
