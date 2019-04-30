function greet(callback){
    const data = {
        name: 'John Doe',
    }
    console.log('Hello ' + data.name + '!');
    callback(data);
}
greet(function(data){
    console.log(data.name + ', the function was invoked!');
})
greet(function(data){
    console.log(data.name + ', second function was invoked!');
})
